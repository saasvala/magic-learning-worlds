import CurriculumExplorer from "@/components/CurriculumExplorer";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Layers, FileText,
  CalendarCheck, DollarSign, BarChart3, Settings, LogOut,
} from "lucide-react";
import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Teachers", url: "/admin/teachers", icon: GraduationCap },
  { title: "Classes", url: "/admin/classes", icon: Layers },
  { title: "Subjects", url: "/admin/subjects", icon: BookOpen },
  { title: "Curriculum", url: "/admin/curriculum", icon: FileText },
  { title: "Exams", url: "/admin/exams", icon: FileText },
  { title: "Attendance", url: "/admin/attendance", icon: CalendarCheck },
  { title: "Finance", url: "/admin/finance", icon: DollarSign },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
  { title: "Logout", url: "/", icon: LogOut },
];

export default function AdminCurriculum() {
  return (
    <DashboardLayout items={sidebarItems} roleLabel="School Admin" roleEmoji="🏫" userName="Admin" homeUrl="/admin">
      <CurriculumExplorer />
    </DashboardLayout>
  );
}
