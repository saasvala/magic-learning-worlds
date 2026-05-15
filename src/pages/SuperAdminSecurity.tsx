import { motion } from "framer-motion";
import { DemoBadge } from "@/components/states/DemoBadge";
import { ShieldCheck, AlertTriangle, Eye, Lock, Search } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";

const logs = [
  { event: "Failed login attempt (5x)", user: "unknown@test.com", ip: "192.168.1.45", time: "5m ago", severity: "high" },
  { event: "Admin role assigned to user", user: "admin@mabini.edu", ip: "10.0.0.12", time: "1h ago", severity: "medium" },
  { event: "Password changed", user: "teacher@rizal.edu", ip: "172.16.0.8", time: "2h ago", severity: "low" },
  { event: "API rate limit exceeded", user: "api-key-rizal", ip: "203.0.113.5", time: "3h ago", severity: "medium" },
  { event: "New school registered", user: "system", ip: "—", time: "4h ago", severity: "low" },
  { event: "Bulk user import (450 records)", user: "admin@bonifacio.edu", ip: "10.0.1.5", time: "5h ago", severity: "medium" },
  { event: "Failed login attempt (3x)", user: "student@luna.edu", ip: "192.168.2.100", time: "6h ago", severity: "high" },
  { event: "Database backup completed", user: "system", ip: "—", time: "8h ago", severity: "low" },
];

function SecurityPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-destructive" /></div>
            <div>
              <h1 className="text-2xl font-bold">Security Logs</h1>
            <div className="mt-1"><DemoBadge /></div>
              <p className="text-muted-foreground text-sm">Monitor security events and access patterns</p>
            </div>
          </div>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input placeholder="Search logs..." className="pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-1 focus:ring-primary w-48" /></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-destructive">{logs.filter(l => l.severity === "high").length}</div><div className="text-xs text-muted-foreground">High Severity</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-streak-orange">{logs.filter(l => l.severity === "medium").length}</div><div className="text-xs text-muted-foreground">Medium</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">{logs.filter(l => l.severity === "low").length}</div><div className="text-xs text-muted-foreground">Low</div></div>
        </div>

        <div className="space-y-2">
          {logs.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-3 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full shrink-0 ${l.severity === "high" ? "bg-destructive" : l.severity === "medium" ? "bg-streak-orange" : "bg-xp-green"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{l.event}</div>
                <div className="text-xs text-muted-foreground">{l.user} • {l.ip} • {l.time}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-medium ${
                l.severity === "high" ? "bg-destructive/20 text-destructive" : l.severity === "medium" ? "bg-streak-orange/20 text-streak-orange" : "bg-xp-green/20 text-xp-green"
              }`}>{l.severity}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminSecurity() {
  return (<SuperAdminPageShell><SecurityPage /></SuperAdminPageShell>);
}
