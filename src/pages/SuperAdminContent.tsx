import CurriculumExplorer from "@/components/CurriculumExplorer";
import {
  Globe, Building2, CreditCard, BookOpen, Bot, DollarSign,
  ShieldCheck, Activity, Database, Settings, LogOut,
} from "lucide-react";
import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";

const sidebarItems: SidebarItem[] = [
  { title: "Global Dashboard", url: "/super-admin", icon: Globe },
  { title: "Schools", url: "/super-admin/schools", icon: Building2 },
  { title: "Subscriptions", url: "/super-admin/subscriptions", icon: CreditCard },
  { title: "Content Control", url: "/super-admin/content", icon: BookOpen },
  { title: "AI Control", url: "/super-admin/ai", icon: Bot },
  { title: "Revenue", url: "/super-admin/revenue", icon: DollarSign },
  { title: "Security Logs", url: "/super-admin/security", icon: ShieldCheck },
  { title: "System Health", url: "/super-admin/health", icon: Activity },
  { title: "Backup", url: "/super-admin/backup", icon: Database },
  { title: "Settings", url: "/super-admin/settings", icon: Settings },
  { title: "Logout", url: "/", icon: LogOut },
];

export default function SuperAdminContent() {
  return (
    <DashboardLayout items={sidebarItems} roleLabel="Super Admin" roleEmoji="👑" userName="SuperAdmin" homeUrl="/super-admin">
      <CurriculumExplorer />
    </DashboardLayout>
  );
}
