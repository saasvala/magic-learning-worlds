import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home, Globe, BookOpen, FileText, GraduationCap, Bot,
  Trophy, BarChart3, Settings, LogOut, FolderOpen
} from "lucide-react";

const sidebarItems: SidebarItem[] = [
  { title: "Home", url: "/student", icon: Home },
  { title: "My Worlds", url: "/student/worlds", icon: Globe },
  { title: "Subjects", url: "/student/subjects", icon: BookOpen },
  { title: "Assignments", url: "/student/assignments", icon: FileText },
  { title: "Exams", url: "/student/exams", icon: GraduationCap },
  { title: "AI Tutor", url: "/student/ai-tutor", icon: Bot },
  { title: "Portfolio", url: "/student/portfolio", icon: FolderOpen },
  { title: "Rewards", url: "/student/rewards", icon: Trophy },
  { title: "Leaderboard", url: "/student/leaderboard", icon: BarChart3 },
  { title: "Progress Report", url: "/student/progress", icon: BarChart3 },
  { title: "Settings", url: "/student/settings", icon: Settings },
  { title: "Logout", url: "/auth", icon: LogOut },
];

interface StudentPageShellProps {
  children: React.ReactNode;
}

export function StudentPageShell({ children }: StudentPageShellProps) {
  const { profile } = useAuth();
  return (
    <DashboardLayout
      items={sidebarItems}
      roleLabel="Student"
      roleEmoji="🎮"
      userName={profile?.full_name || "Student"}
      homeUrl="/student"
    >
      {children}
    </DashboardLayout>
  );
}

// Generic placeholder page for sub-routes
export function StudentPlaceholderPage({ title, icon: Icon, description }: { title: string; icon: any; description: string }) {
  return (
    <StudentPageShell>
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
          <div className="mt-6 glass rounded-xl p-8 max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground">This section will be populated with your data once you start learning. Complete missions to see your progress here!</p>
          </div>
        </motion.div>
      </div>
    </StudentPageShell>
  );
}
