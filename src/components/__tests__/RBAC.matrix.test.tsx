import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Home } from "lucide-react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * RBAC Role-Matrix E2E (exhaustive).
 *
 * Parses the REAL src/App.tsx route table and, for every (role × route),
 * asserts ProtectedRoute behavior + that the NotificationBell mounts on
 * allowed routes. We don't import the real page components (heavy + need
 * QueryClient, etc.) — instead we re-mount each extracted route through
 * ProtectedRoute + DashboardLayout with a sentinel page body. This still
 * exercises the actual allowedRoles matrix from App.tsx.
 */

type Role = "student" | "teacher" | "school_admin" | "super_admin" | "parent";

// ---------- Hoisted shared state for mocks ----------
const state = vi.hoisted(() => ({
  currentUser: { id: "u" } as { id: string } | null,
  currentRole: "student" as Role,
  insertHandler: null as ((p: { new: any }) => void) | null,
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: state.currentUser,
    profile: { id: "u", full_name: "Test", role: state.currentRole },
    session: null,
    loading: false,
    signOut: vi.fn(),
  }),
}));

vi.mock("@/integrations/supabase/client", () => {
  const makeChain = () => {
    const chain: any = {
      select: () => chain,
      eq: () => {
        const hybrid: any = {
          select: () => chain,
          eq: () => hybrid,
          order: () => chain,
          limit: () => Promise.resolve({ data: [], error: null }),
          then: (res: any) =>
            Promise.resolve({ data: null, error: null }).then(res),
        };
        return hybrid;
      },
      order: () => chain,
      limit: () => Promise.resolve({ data: [], error: null }),
      update: () => chain,
      in: () => Promise.resolve({ data: null, error: null }),
    };
    return chain;
  };
  const channel: any = {
    on: (_e: string, opts: any, cb: any) => {
      if (opts?.event === "INSERT") state.insertHandler = cb;
      return channel;
    },
    subscribe: () => channel,
  };
  return {
    supabase: {
      from: () => makeChain(),
      channel: () => channel,
      removeChannel: vi.fn(),
    },
  };
});

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";

// ---------- Extract the real route table from App.tsx ----------
interface RouteDef {
  path: string;
  allowedRoles: Role[];
}

const ROLE_HOME: Record<Role, string> = {
  student: "/student",
  teacher: "/teacher",
  school_admin: "/admin",
  super_admin: "/super-admin",
  parent: "/parent",
};

const ALL_ROLES: Role[] = [
  "student",
  "teacher",
  "school_admin",
  "super_admin",
  "parent",
];

function parseAppRoutes(): RouteDef[] {
  const src = readFileSync(
    resolve(__dirname, "../../App.tsx"),
    "utf8"
  );
  const routeRegex =
    /<Route\s+path="([^"]+)"\s+element=\{<ProtectedRoute\s+allowedRoles=\{(\[[^\]]+\])\}>/g;
  const routes: RouteDef[] = [];
  let m: RegExpExecArray | null;
  while ((m = routeRegex.exec(src)) !== null) {
    const path = m[1];
    const rolesArr = m[2]
      .replace(/[\[\]"\s]/g, "")
      .split(",")
      .filter(Boolean) as Role[];
    routes.push({ path, allowedRoles: rolesArr });
  }
  return routes;
}

const ALL_ROUTES = parseAppRoutes();

// Build a synthetic <Routes> tree mirroring the real route table, but with
// ProtectedRoute wrapping a DashboardLayout + sentinel content. We also need
// the role's home route present so we can detect redirects.
function MiniApp({ initialPath }: { initialPath: string }) {
  // De-dupe (some paths may map to same component twice — irrelevant for RBAC).
  const seen = new Set<string>();
  const routes = ALL_ROUTES.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });

  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        {routes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              <ProtectedRoute allowedRoles={r.allowedRoles}>
                <DashboardLayout
                  items={[{ title: "Home", url: r.path, icon: Home }]}
                  roleLabel={r.allowedRoles[0]}
                  roleEmoji="🧪"
                  userName="Tester"
                  homeUrl={r.path}
                >
                  <div data-testid="page-content" data-path={r.path}>
                    page:{r.path}
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        ))}
        {/* /auth landing pad so unauthenticated redirects don't warn */}
        <Route
          path="/auth"
          element={<div data-testid="auth-page">auth</div>}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("RBAC role matrix (exhaustive, parsed from App.tsx)", () => {
  beforeEach(() => {
    state.insertHandler = null;
  });

  it("parsed at least one protected route per role from App.tsx", () => {
    expect(ALL_ROUTES.length).toBeGreaterThan(20);
    for (const role of ALL_ROLES) {
      const owned = ALL_ROUTES.filter((r) => r.allowedRoles.includes(role));
      expect(owned.length, `role ${role} has zero routes`).toBeGreaterThan(0);
    }
  });

  for (const role of ALL_ROLES) {
    describe(`role: ${role}`, () => {
      beforeEach(() => {
        state.currentRole = role;
        state.currentUser = { id: `${role}-uid` };
      });

      const allowed = ALL_ROUTES.filter((r) => r.allowedRoles.includes(role));
      const denied = ALL_ROUTES.filter((r) => !r.allowedRoles.includes(role));

      describe("ALLOW", () => {
        for (const r of allowed) {
          it(`${r.path} → renders + NotificationBell mounts`, async () => {
            render(<MiniApp initialPath={r.path} />);

            await waitFor(() => {
              const el = screen.getByTestId("page-content");
              expect(el.getAttribute("data-path")).toBe(r.path);
            });

            const bell = document.querySelector(
              "button.relative.p-2.rounded-lg"
            );
            expect(bell).toBeTruthy();
            await waitFor(() =>
              expect(state.insertHandler).not.toBeNull()
            );
          });
        }
      });

      describe("DENY", () => {
        for (const r of denied) {
          it(`${r.path} → blocked, redirected away`, async () => {
            render(<MiniApp initialPath={r.path} />);

            await waitFor(() => {
              const el = screen.queryByTestId("page-content");
              if (el) {
                // Must have been redirected to the role's home — never the
                // denied path.
                expect(el.getAttribute("data-path")).not.toBe(r.path);
                expect(el.getAttribute("data-path")).toBe(ROLE_HOME[role]);
              } else {
                expect(el).toBeNull();
              }
            });
          });
        }
      });
    });
  }

  it("unauthenticated user is redirected to /auth (no page, no bell)", async () => {
    state.currentUser = null;
    state.currentRole = "student";

    render(<MiniApp initialPath="/student" />);

    await waitFor(() => {
      expect(screen.queryByTestId("page-content")).toBeNull();
      expect(screen.getByTestId("auth-page")).toBeInTheDocument();
    });
    expect(
      document.querySelector("button.relative.p-2.rounded-lg")
    ).toBeNull();
  });
});
