import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Home } from "lucide-react";

/**
 * RBAC Role-Matrix E2E.
 *
 * For every role, asserts:
 *   1. Allowed route prefixes render the page content + the NotificationBell.
 *   2. Disallowed route prefixes are blocked by ProtectedRoute and redirect
 *      to the role's home (NOT the requested page).
 */

type Role = "student" | "teacher" | "school_admin" | "super_admin" | "parent";

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

// Role → allowed/denied path prefixes (mirrors App.tsx route definitions).
const MATRIX: Record<
  Role,
  { home: string; allowed: string[]; denied: string[] }
> = {
  student: {
    home: "/student",
    allowed: ["/student", "/student/subjects", "/student/ai-tutor"],
    denied: ["/teacher", "/admin", "/super-admin", "/parent"],
  },
  teacher: {
    home: "/teacher",
    allowed: ["/teacher", "/teacher/classes", "/teacher/lessons"],
    denied: ["/student", "/admin", "/super-admin", "/parent"],
  },
  school_admin: {
    home: "/admin",
    allowed: ["/admin", "/admin/students", "/admin/curriculum-editor"],
    denied: ["/student", "/teacher", "/super-admin", "/parent"],
  },
  super_admin: {
    home: "/super-admin",
    allowed: ["/super-admin", "/super-admin/schools", "/super-admin/security"],
    denied: ["/student", "/teacher", "/admin", "/parent"],
  },
  parent: {
    home: "/parent",
    allowed: ["/parent", "/parent/attendance", "/parent/results"],
    denied: ["/student", "/teacher", "/admin", "/super-admin"],
  },
};

const ROLE_TO_ALLOWED: Record<Role, string> = {
  student: "student",
  teacher: "teacher",
  school_admin: "school_admin",
  super_admin: "super_admin",
  parent: "parent",
};

// Build a mini app with a representative wrapped route per role section,
// so we can probe Allow/Deny behavior without loading 60 real page modules.
function MiniApp({ initialPath }: { initialPath: string }) {
  const wrap = (path: string, allowed: Role) => (
    <Route
      key={path}
      path={path}
      element={
        <ProtectedRoute allowedRoles={[ROLE_TO_ALLOWED[allowed]]}>
          <DashboardLayout
            items={[{ title: "Home", url: path, icon: Home }]}
            roleLabel={allowed}
            roleEmoji="🧪"
            userName="Tester"
            homeUrl={path}
          >
            <div data-testid="page-content" data-path={path}>
              page:{path}
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  );

  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        {MATRIX.student.allowed.map((p) => wrap(p, "student"))}
        {MATRIX.teacher.allowed.map((p) => wrap(p, "teacher"))}
        {MATRIX.school_admin.allowed.map((p) => wrap(p, "school_admin"))}
        {MATRIX.super_admin.allowed.map((p) => wrap(p, "super_admin"))}
        {MATRIX.parent.allowed.map((p) => wrap(p, "parent"))}
      </Routes>
    </MemoryRouter>
  );
}

describe("RBAC role matrix", () => {
  beforeEach(() => {
    state.insertHandler = null;
  });

  for (const role of Object.keys(MATRIX) as Role[]) {
    const { allowed, denied, home } = MATRIX[role];

    describe(`role: ${role}`, () => {
      beforeEach(() => {
        state.currentRole = role;
        state.currentUser = { id: `${role}-uid` };
      });

      for (const path of allowed) {
        it(`ALLOW ${path} → renders page + NotificationBell`, async () => {
          render(<MiniApp initialPath={path} />);

          // Page content rendered for the requested path.
          await waitFor(() => {
            const el = screen.getByTestId("page-content");
            expect(el.getAttribute("data-path")).toBe(path);
          });

          // NotificationBell mounted and subscribed for this signed-in user.
          const bell = document.querySelector("button.relative.p-2.rounded-lg");
          expect(bell).toBeTruthy();
          await waitFor(() => expect(state.insertHandler).not.toBeNull());
        });
      }

      for (const path of denied) {
        it(`DENY ${path} → redirected away (not rendered)`, async () => {
          render(<MiniApp initialPath={path} />);

          // The denied page must NOT render. ProtectedRoute redirects to the
          // role's home; if home is in our mini-app routes, we'll see its
          // page-content. Either way, the rendered path !== the denied path.
          await waitFor(() => {
            const el = screen.queryByTestId("page-content");
            // Either nothing renders, or it renders the role's home — never
            // the denied path.
            if (el) {
              expect(el.getAttribute("data-path")).not.toBe(path);
              expect(el.getAttribute("data-path")).toBe(home);
            } else {
              expect(el).toBeNull();
            }
          });
        });
      }
    });
  }

  it("unauthenticated user is redirected to /auth (no page, no bell)", async () => {
    state.currentUser = null;
    state.currentRole = "student";

    render(<MiniApp initialPath="/student" />);

    await waitFor(() => {
      expect(screen.queryByTestId("page-content")).toBeNull();
    });
    // Bell must not mount for an unauthenticated session.
    expect(
      document.querySelector("button.relative.p-2.rounded-lg")
    ).toBeNull();
  });
});
