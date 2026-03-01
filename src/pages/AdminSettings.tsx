import { motion } from "framer-motion";
import { Settings, Building2, Users, Bell, Shield, LogOut } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function AdminSettingsPage() {
  const { profile, signOut } = useAuth();
  const [autoEnroll, setAutoEnroll] = useState(true);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><Settings className="w-5 h-5 text-primary" /></div>
          <h1 className="text-2xl font-bold">School Settings</h1>
        </div>

        <div className="max-w-2xl space-y-4">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> School Profile</h3>
            <div className="space-y-3">
              <div><label className="text-xs text-muted-foreground block mb-1">School Name</label><input defaultValue="Mabini Academy" className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none focus:ring-1 focus:ring-primary" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">School Code</label><input defaultValue="MAB-2025" className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none" readOnly /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-muted-foreground block mb-1">City</label><input defaultValue="Manila" className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none focus:ring-1 focus:ring-primary" /></div>
                <div><label className="text-xs text-muted-foreground block mb-1">Region</label><input defaultValue="NCR" className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none focus:ring-1 focus:ring-primary" /></div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-magic-purple" /> Enrollment</h3>
            <div className="flex items-center justify-between">
              <div><div className="text-sm font-medium">Auto-Enroll Students</div><div className="text-xs text-muted-foreground">Automatically assign students to classes</div></div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setAutoEnroll(!autoEnroll)} className={`w-12 h-6 rounded-full relative ${autoEnroll ? "bg-xp-green" : "bg-muted"}`}>
                <motion.div animate={{ x: autoEnroll ? 24 : 2 }} className="w-5 h-5 rounded-full bg-foreground absolute top-0.5" />
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

export default function AdminSettingsExport() {
  return (<AdminPageShell><AdminSettingsPage /></AdminPageShell>);
}
