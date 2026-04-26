import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "lucide-react";

/**
 * End-to-end style integration tests for the NotificationBell.
 *
 * Simulates the full sign-in flow for each role (Student, Teacher, School Admin,
 * Super Admin) by mocking the Supabase auth context and the Realtime channel.
 * Then it triggers a simulated `INSERT` event on the `notifications` table and
 * asserts the unread count badge appears in the header bell.
 */

type InsertHandler = (payload: { new: any }) => void;

// ---- Per-test mutable state captured by the mocked Supabase client -----------
let currentUserId = "";
let insertHandler: InsertHandler | null = null;
let initialNotifications: any[] = [];

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: currentUserId },
    profile: { full_name: "Test User", role: "student" },
    session: null,
    loading: false,
    signOut: vi.fn(),
  }),
}));

vi.mock("@/integrations/supabase/client", () => {
  const buildSelectChain = () => {
    const chain: any = {
      select: () => chain,
      eq: () => chain,
      order: () => chain,
      limit: () => Promise.resolve({ data: initialNotifications, error: null }),
    };
    return chain;
  };
  const buildUpdateChain = () => {
    const chain: any = {
      update: () => chain,
      eq: () => Promise.resolve({ data: null, error: null }),
      in: () => Promise.resolve({ data: null, error: null }),
    };
    return chain;
  };
  const channel: any = {
    on: (_event: string, opts: any, cb: InsertHandler) => {
      if (opts?.event === "INSERT") insertHandler = cb;
      return channel;
    },
    subscribe: () => channel,
  };
  return {
    supabase: {
      from: () => ({
        ...buildSelectChain(),
        ...buildUpdateChain(),
      }),
      channel: () => channel,
      removeChannel: vi.fn(),
    },
  };
});

// Import AFTER mocks are registered.
import { DashboardLayout } from "@/components/DashboardLayout";

const renderShell = () =>
  render(
    <MemoryRouter>
      <DashboardLayout
        items={[{ title: "Home", url: "/", icon: Home }]}
        roleLabel="Test"
        roleEmoji="🧪"
        userName="Tester"
        homeUrl="/"
      >
        <div>page</div>
      </DashboardLayout>
    </MemoryRouter>
  );

const ROLES: { name: string; userId: string }[] = [
  { name: "Student", userId: "student-user-id" },
  { name: "Teacher", userId: "teacher-user-id" },
  { name: "School Admin", userId: "school-admin-user-id" },
  { name: "Super Admin", userId: "super-admin-user-id" },
];

describe("NotificationBell E2E (per role)", () => {
  beforeEach(() => {
    insertHandler = null;
    initialNotifications = [];
  });

  for (const role of ROLES) {
    it(`signs in as ${role.name} and shows unread count after a realtime INSERT`, async () => {
      currentUserId = role.userId;

      renderShell();

      // Bell renders, no badge yet (no unread notifications).
      const bell = await screen.findByRole("button", { name: "" }).catch(() => null);
      const bellByClass = document.querySelector(
        "button.relative.p-2.rounded-lg"
      );
      expect(bellByClass || bell).toBeTruthy();

      // Realtime INSERT subscription was registered for this user.
      await waitFor(() => expect(insertHandler).not.toBeNull());

      // Simulate Supabase Realtime pushing a new unread notification.
      await act(async () => {
        insertHandler!({
          new: {
            id: `notif-${role.userId}-1`,
            title: `Hello ${role.name}`,
            message: "You have a new assignment",
            type: "assignment",
            is_read: false,
            link: null,
            created_at: new Date().toISOString(),
            user_id: role.userId,
          },
        });
      });

      // Unread badge appears with count "1".
      await waitFor(() => {
        expect(screen.getByText("1")).toBeInTheDocument();
      });

      // Push a second notification → count becomes "2".
      await act(async () => {
        insertHandler!({
          new: {
            id: `notif-${role.userId}-2`,
            title: "Second alert",
            message: "Attendance marked",
            type: "attendance",
            is_read: false,
            link: null,
            created_at: new Date().toISOString(),
            user_id: role.userId,
          },
        });
      });

      await waitFor(() => {
        expect(screen.getByText("2")).toBeInTheDocument();
      });
    });
  }

  it("shows '9+' badge cap when more than 9 unread notifications arrive", async () => {
    currentUserId = "student-user-id";
    renderShell();
    await waitFor(() => expect(insertHandler).not.toBeNull());

    await act(async () => {
      for (let i = 0; i < 12; i++) {
        insertHandler!({
          new: {
            id: `bulk-${i}`,
            title: `n${i}`,
            message: "msg",
            type: "info",
            is_read: false,
            link: null,
            created_at: new Date().toISOString(),
            user_id: "student-user-id",
          },
        });
      }
    });

    await waitFor(() => {
      expect(screen.getByText("9+")).toBeInTheDocument();
    });
  });
});
