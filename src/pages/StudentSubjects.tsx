import CurriculumExplorer from "@/components/CurriculumExplorer";
import {
  Home, Globe, BookOpen, FileText, GraduationCap, Bot,
  Trophy, BarChart3, Settings, LogOut,
} from "lucide-react";
import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";

const sidebarItems: SidebarItem[] = [
  { title: "Home", url: "/student", icon: Home },
  { title: "My Worlds", url: "/student/worlds", icon: Globe },
  { title: "Subjects", url: "/student/subjects", icon: BookOpen },
  { title: "Assignments", url: "/student/assignments", icon: FileText },
  { title: "Exams", url: "/student/exams", icon: GraduationCap },
  { title: "AI Tutor", url: "/student/ai-tutor", icon: Bot },
  { title: "Rewards", url: "/student/rewards", icon: Trophy },
  { title: "Leaderboard", url: "/student/leaderboard", icon: BarChart3 },
  { title: "Progress Report", url: "/student/progress", icon: BarChart3 },
  { title: "Settings", url: "/student/settings", icon: Settings },
  { title: "Logout", url: "/", icon: LogOut },
];

export default function StudentSubjects() {
  return (
    <DashboardLayout items={sidebarItems} roleLabel="Student" roleEmoji="🎮" userName="Miguel" homeUrl="/student">
      <CurriculumExplorer />
    </DashboardLayout>
  );
}
