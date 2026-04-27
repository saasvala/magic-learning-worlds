import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Layers, FileText,
  CalendarCheck, DollarSign, BarChart3, Settings, LogOut, Brain, Edit, Shield
} from "lucide-react";

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Teachers", url: "/admin/teachers", icon: GraduationCap },
  { title: "Classes", url: "/admin/classes", icon: Layers },
  { title: "Subjects", url: "/admin/subjects", icon: BookOpen },
  { title: "Curriculum", url: "/admin/curriculum", icon: FileText },
  { title: "Curriculum Editor", url: "/admin/curriculum-editor", icon: Edit },
  { title: "Exams", url: "/admin/exams", icon: FileText },
  { title: "Attendance", url: "/admin/attendance", icon: CalendarCheck },
  { title: "Finance", url: "/admin/finance", icon: DollarSign },
  { title: "Analytics", url: "/admin/analytics", icon: Brain },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
  { title: "Permissions", url: "/admin/permissions", icon: Shield },
  { title: "Logout", url: "/auth", icon: LogOut },
];

interface AdminPageShellProps {
  children: React.ReactNode;
}

export function AdminPageShell({ children }: AdminPageShellProps) {
  const { profile } = useAuth();
  return (
    <DashboardLayout
      items={sidebarItems}
      roleLabel="School Admin"
      roleEmoji="🏫"
      userName={profile?.full_name || "Admin"}
      homeUrl="/admin"
    >
      {children}
    </DashboardLayout>
  );
}

export function AdminPlaceholderPage({ title, icon: Icon, description }: { title: string; icon: any; description: string }) {
  return (
    <AdminPageShell>
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
          <div className="mt-6 glass rounded-xl p-8 max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground">Set up your school to populate this section with real data.</p>
          </div>
        </motion.div>
      </div>
    </AdminPageShell>
  );
}
