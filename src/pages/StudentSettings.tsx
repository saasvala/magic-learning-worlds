import { motion } from "framer-motion";
import { Settings, User, Globe, Bell, Palette, Shield, LogOut } from "lucide-react";
import { StudentPageShell } from "@/components/StudentPageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function SettingsPage() {
  const { profile, signOut } = useAuth();
  const [language, setLanguage] = useState(profile?.language || "en");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-magic flex items-center justify-center">
            <Settings className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground text-sm">Customize your adventure</p>
          </div>
        </div>

        <div className="max-w-2xl space-y-4">
          {/* Profile */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Profile</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center text-2xl font-bold text-primary-foreground">
                {(profile?.full_name || "S")[0]}
              </div>
              <div>
                <div className="font-semibold">{profile?.full_name || "Student"}</div>
                <div className="text-sm text-muted-foreground">{profile?.grade || "Explorer"} • {profile?.rank_title || "Beginner"}</div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Display Name</label>
                <input defaultValue={profile?.full_name || ""} className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-magic-blue" /> Language</h3>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="en">English</option>
              <option value="tl">Tagalog / Filipino</option>
              <option value="ceb">Cebuano</option>
              <option value="ilo">Ilocano</option>
              <option value="hil">Hiligaynon</option>
              <option value="bik">Bikol</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-streak-orange" /> Notifications</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Push Notifications</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? "bg-xp-green" : "bg-muted"}`}
              >
                <motion.div
                  animate={{ x: notifications ? 24 : 2 }}
                  className="w-5 h-5 rounded-full bg-foreground absolute top-0.5"
                />
              </motion.button>
            </div>
          </div>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signOut()}
            className="w-full glass rounded-xl p-4 flex items-center justify-center gap-2 text-destructive font-medium"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default function StudentSettings() {
  return (
    <StudentPageShell>
      <SettingsPage />
    </StudentPageShell>
  );
}
