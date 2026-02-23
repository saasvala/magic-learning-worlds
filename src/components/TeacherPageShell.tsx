import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home, Users, BookOpen, FileText, GraduationCap, CalendarCheck,
  BarChart3, MessageSquare, Settings, LogOut
} from "lucide-react";

const sidebarItems: SidebarItem[] = [
  { title: "Home", url: "/teacher", icon: Home },
  { title: "My Classes", url: "/teacher/classes", icon: Users },
  { title: "Lessons", url: "/teacher/lessons", icon: BookOpen },
  { title: "Assignments", url: "/teacher/assignments", icon: FileText },
  { title: "Exams", url: "/teacher/exams", icon: GraduationCap },
  { title: "Attendance", url: "/teacher/attendance", icon: CalendarCheck },
  { title: "Analytics", url: "/teacher/analytics", icon: BarChart3 },
  { title: "Messages", url: "/teacher/messages", icon: MessageSquare },
  { title: "Settings", url: "/teacher/settings", icon: Settings },
  { title: "Logout", url: "/auth", icon: LogOut },
];

interface TeacherPageShellProps {
  children: React.ReactNode;
}

export function TeacherPageShell({ children }: TeacherPageShellProps) {
  const { profile } = useAuth();
  return (
    <DashboardLayout
      items={sidebarItems}
      roleLabel="Teacher"
      roleEmoji="📚"
      userName={profile?.full_name || "Teacher"}
      homeUrl="/teacher"
    >
      {children}
    </DashboardLayout>
  );
}

export function TeacherPlaceholderPage({ title, icon: Icon, description }: { title: string; icon: any; description: string }) {
  return (
    <TeacherPageShell>
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-magic flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
          <div className="mt-6 glass rounded-xl p-8 max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground">Connect your classes and start managing content to see data here.</p>
          </div>
        </motion.div>
      </div>
    </TeacherPageShell>
  );
}
