import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";
import {
  LayoutDashboard, CalendarCheck, BookOpen, Trophy, MessageSquare,
  CreditCard, Bell, LogOut
} from "lucide-react";

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", url: "/parent", icon: LayoutDashboard },
  { title: "Attendance", url: "/parent/attendance", icon: CalendarCheck },
  { title: "Homework", url: "/parent/homework", icon: BookOpen },
  { title: "Exam Results", url: "/parent/results", icon: Trophy },
  { title: "Messages", url: "/parent/messages", icon: MessageSquare },
  { title: "Fee Status", url: "/parent/fees", icon: CreditCard },
  { title: "Activity Alerts", url: "/parent/alerts", icon: Bell },
  { title: "Logout", url: "/auth", icon: LogOut },
];

export function ParentPageShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      items={sidebarItems}
      roleLabel="Parent / Guardian"
      roleEmoji="👨‍👩‍👧"
      userName="Parent User"
      homeUrl="/parent"
    >
      {children}
    </DashboardLayout>
  );
}
