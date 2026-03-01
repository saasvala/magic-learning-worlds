import { motion } from "framer-motion";
import { Settings, User, Bell, Globe, LogOut } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function TeacherSettingsPage() {
  const { profile, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-magic flex items-center justify-center">
            <Settings className="w-5 h-5 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="max-w-2xl space-y-4">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Profile</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-magic flex items-center justify-center text-2xl font-bold text-secondary-foreground">{(profile?.full_name || "T")[0]}</div>
              <div>
                <div className="font-semibold">{profile?.full_name || "Teacher"}</div>
                <div className="text-sm text-muted-foreground">Teacher</div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Full Name</label>
                <input defaultValue={profile?.full_name || ""} className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-streak-orange" /> Notifications</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Notifications</span>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full relative ${notifications ? "bg-xp-green" : "bg-muted"}`}>
                <motion.div animate={{ x: notifications ? 24 : 2 }} className="w-5 h-5 rounded-full bg-foreground absolute top-0.5" />
              </motion.button>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} onClick={() => signOut()} className="w-full glass rounded-xl p-4 flex items-center justify-center gap-2 text-destructive font-medium">
            <LogOut className="w-4 h-4" /> Log Out
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherSettingsPage2() {
  return (
    <TeacherPageShell>
      <TeacherSettingsPage />
    </TeacherPageShell>
  );
}
