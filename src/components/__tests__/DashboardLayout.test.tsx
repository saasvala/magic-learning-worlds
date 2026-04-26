import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "test-user-id" },
    profile: { full_name: "Test User", role: "student" },
    session: null,
    loading: false,
    signOut: vi.fn(),
  }),
}));

vi.mock("@/integrations/supabase/client", () => {
  const builder: any = {
    select: () => builder,
    eq: () => builder,
    order: () => builder,
    limit: () => Promise.resolve({ data: [], error: null }),
    update: () => builder,
    in: () => Promise.resolve({ data: null, error: null }),
  };
  const channel: any = {
    on: () => channel,
    subscribe: () => channel,
  };
  return {
    supabase: {
      from: () => builder,
      channel: () => channel,
      removeChannel: vi.fn(),
    },
  };
});

const renderLayout = () =>
  render(
    <MemoryRouter>
      <DashboardLayout
        items={[{ title: "Home", url: "/test", icon: Home }]}
        roleLabel="Test Role"
        roleEmoji="🧪"
        userName="Tester"
        homeUrl="/test"
      >
        <div>page content</div>
      </DashboardLayout>
    </MemoryRouter>
  );

describe("DashboardLayout", () => {
  it("renders the NotificationBell in the header", () => {
    renderLayout();
    const bellButtons = document.querySelectorAll(
      "button.relative.p-2.rounded-lg"
    );
    expect(bellButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the role label and child content", () => {
    renderLayout();
    expect(screen.getAllByText("Test Role").length).toBeGreaterThan(0);
    expect(screen.getByText("page content")).toBeInTheDocument();
  });
});
