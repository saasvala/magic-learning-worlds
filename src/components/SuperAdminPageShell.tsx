import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Globe, Building2, CreditCard, BookOpen, Bot, DollarSign,
  ShieldCheck, Activity, Database, Settings, LogOut, Image,
  Gamepad2, Languages, Smartphone, Layers
} from "lucide-react";

const sidebarItems: SidebarItem[] = [
  { title: "Global Dashboard", url: "/super-admin", icon: Globe },
  { title: "Schools", url: "/super-admin/schools", icon: Building2 },
  { title: "Subscriptions", url: "/super-admin/subscriptions", icon: CreditCard },
  { title: "Content Library", url: "/super-admin/content-library", icon: Layers },
  { title: "Media Assets", url: "/super-admin/media", icon: Image },
  { title: "Content Control", url: "/super-admin/content", icon: BookOpen },
  { title: "Gamification", url: "/super-admin/gamification", icon: Gamepad2 },
  { title: "Translations", url: "/super-admin/translations", icon: Languages },
  { title: "AI Control", url: "/super-admin/ai", icon: Bot },
  { title: "Revenue", url: "/super-admin/revenue", icon: DollarSign },
  { title: "Devices", url: "/super-admin/devices", icon: Smartphone },
  { title: "Security Logs", url: "/super-admin/security", icon: ShieldCheck },
  { title: "System Health", url: "/super-admin/health", icon: Activity },
  { title: "Backup", url: "/super-admin/backup", icon: Database },
  { title: "Settings", url: "/super-admin/settings", icon: Settings },
  { title: "Logout", url: "/auth", icon: LogOut },
];

interface SuperAdminPageShellProps {
  children: React.ReactNode;
}

export function SuperAdminPageShell({ children }: SuperAdminPageShellProps) {
  const { profile } = useAuth();
  return (
    <DashboardLayout
      items={sidebarItems}
      roleLabel="Super Admin"
      roleEmoji="👑"
      userName={profile?.full_name || "SuperAdmin"}
      homeUrl="/super-admin"
    >
      {children}
    </DashboardLayout>
  );
}

export function SuperAdminPlaceholderPage({ title, icon: Icon, description }: { title: string; icon: any; description: string }) {
  return (
    <SuperAdminPageShell>
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-magic-purple/20 flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-magic-purple" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
          <div className="mt-6 glass rounded-xl p-8 max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground">Platform data will appear here once schools are onboarded.</p>
          </div>
        </motion.div>
      </div>
    </SuperAdminPageShell>
  );
}
