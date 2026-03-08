import { motion } from "framer-motion";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { Smartphone, MapPin, LogOut, Clock, Monitor, Tablet, Shield } from "lucide-react";

const devices = [
  { user: "Maria Santos", device: "Samsung Galaxy A54", type: "phone", os: "Android 14", location: "Manila", lastActive: "Active now", ip: "192.168.1.45", sessions: 1 },
  { user: "Juan Dela Cruz", device: "iPad Air 5", type: "tablet", os: "iPadOS 17", location: "Quezon City", lastActive: "5 min ago", ip: "192.168.1.82", sessions: 1 },
  { user: "Ms. Reyes", device: "MacBook Pro", type: "desktop", os: "macOS 14", location: "Makati", lastActive: "Active now", ip: "10.0.0.15", sessions: 2 },
  { user: "Admin Garcia", device: "Windows Desktop", type: "desktop", os: "Windows 11", location: "Pasig", lastActive: "2h ago", ip: "10.0.0.22", sessions: 1 },
  { user: "Pedro Garcia", device: "Xiaomi Redmi Note 12", type: "phone", os: "Android 13", location: "Cavite", lastActive: "1d ago", ip: "192.168.2.10", sessions: 0 },
  { user: "Ana Reyes", device: "iPhone 15", type: "phone", os: "iOS 17", location: "Manila", lastActive: "30 min ago", ip: "192.168.1.99", sessions: 1 },
];

const deviceIcon = (type: string) => type === "phone" ? <Smartphone className="w-5 h-5" /> : type === "tablet" ? <Tablet className="w-5 h-5" /> : <Monitor className="w-5 h-5" />;

function DevicePage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center"><Shield className="w-5 h-5 text-secondary" /></div>
          <div><h1 className="text-2xl font-bold">📱 Device Watchtower</h1><p className="text-sm text-muted-foreground">Active sessions and device management</p></div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">{devices.filter(d => d.lastActive.includes("Active") || d.lastActive.includes("min")).length}</div><div className="text-xs text-muted-foreground">Active Now</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-primary">{devices.length}</div><div className="text-xs text-muted-foreground">Total Devices</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-streak-orange">{devices.reduce((a, d) => a + d.sessions, 0)}</div><div className="text-xs text-muted-foreground">Active Sessions</div></div>
        </div>

        <div className="space-y-3">
          {devices.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${d.lastActive.includes("Active") ? "bg-xp-green/20 text-xp-green" : "bg-muted text-muted-foreground"}`}>
                {deviceIcon(d.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{d.user}</div>
                <div className="text-[10px] text-muted-foreground">{d.device} • {d.os}</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{d.location}</span>
                  <span>{d.ip}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-[10px] ${d.lastActive.includes("Active") ? "text-xp-green" : "text-muted-foreground"}`}>{d.lastActive}</div>
                <div className="text-[10px] text-muted-foreground">{d.sessions} session(s)</div>
              </div>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors">
                <LogOut className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function DeviceSessionManager() {
  return <SuperAdminPageShell><DevicePage /></SuperAdminPageShell>;
}
