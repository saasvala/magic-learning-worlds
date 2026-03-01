import { motion } from "framer-motion";
import { Settings, Globe, Shield, Bell, Database, LogOut } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function SuperAdminSettingsPage() {
  const { profile, signOut } = useAuth();
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-magic-purple/20 flex items-center justify-center"><Settings className="w-5 h-5 text-magic-purple" /></div>
          <h1 className="text-2xl font-bold">Platform Settings</h1>
        </div>

        <div className="max-w-2xl space-y-4">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-magic-blue" /> Platform</h3>
            <div className="space-y-3">
              <div><label className="text-xs text-muted-foreground block mb-1">Platform Name</label><input defaultValue="Magic Learning World" className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none focus:ring-1 focus:ring-primary" /></div>
              <div><label className="text-xs text-muted-foreground block mb-1">Support Email</label><input defaultValue="support@magiclearning.ph" className="w-full px-3 py-2 rounded-lg bg-muted text-sm border-none outline-none focus:ring-1 focus:ring-primary" /></div>
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-destructive" /> Maintenance Mode</h3>
            <div className="flex items-center justify-between">
              <div><div className="text-sm font-medium">Enable Maintenance</div><div className="text-xs text-muted-foreground">Takes the platform offline for all users</div></div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMaintenance(!maintenance)} className={`w-12 h-6 rounded-full relative ${maintenance ? "bg-destructive" : "bg-muted"}`}>
                <motion.div animate={{ x: maintenance ? 24 : 2 }} className="w-5 h-5 rounded-full bg-foreground absolute top-0.5" />
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

export default function SuperAdminSettings() {
  return (<SuperAdminPageShell><SuperAdminSettingsPage /></SuperAdminPageShell>);
}
