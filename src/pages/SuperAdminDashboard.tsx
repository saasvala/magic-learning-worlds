import { motion } from "framer-motion";
import {
  Globe, Building2, DollarSign, Activity,
  Server, AlertCircle, CheckCircle2, ShieldCheck
} from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";

const globalStats = [
  { label: "Total Schools", value: "48", change: "+6", icon: Building2, color: "text-magic-blue" },
  { label: "Total Users", value: "34,200", change: "+2.1k", icon: Globe, color: "text-xp-green" },
  { label: "Monthly Revenue", value: "₱1.2M", change: "+18%", icon: DollarSign, color: "text-primary" },
  { label: "System Uptime", value: "99.97%", change: "", icon: Activity, color: "text-magic-purple" },
];

const schools = [
  { name: "Mabini Academy", location: "Manila", students: 2847, plan: "Premium", status: "active" },
  { name: "Rizal National HS", location: "Laguna", students: 4200, plan: "Enterprise", status: "active" },
  { name: "Bonifacio School", location: "Cebu", students: 1580, plan: "Standard", status: "active" },
  { name: "Luna Academy", location: "Davao", students: 980, plan: "Premium", status: "trial" },
  { name: "Del Pilar Institute", location: "Iloilo", students: 650, plan: "Standard", status: "active" },
];

const securityLogs = [
  { event: "Failed login attempt (3x)", user: "unknown@test.com", time: "5m ago", severity: "high" },
  { event: "Admin role assigned", user: "admin@mabini.edu", time: "1h ago", severity: "medium" },
  { event: "Backup completed", user: "system", time: "2h ago", severity: "low" },
  { event: "API rate limit reached", user: "rizal-api-key", time: "3h ago", severity: "medium" },
];

const systemHealth = [
  { service: "API Server", status: "operational", latency: "45ms" },
  { service: "Database", status: "operational", latency: "12ms" },
  { service: "AI Tutor", status: "operational", latency: "180ms" },
  { service: "CDN / Assets", status: "operational", latency: "22ms" },
  { service: "Backup Service", status: "maintenance", latency: "—" },
];

function SuperAdminHome() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Global Dashboard</h1>
        <p className="text-muted-foreground text-sm mb-6">Magic Learning World • Platform Overview</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {globalStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                {s.change && <span className="text-xs font-medium text-xp-green">{s.change}</span>}
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-magic-blue" /> Schools</h3>
            <div className="space-y-2">
              {schools.map((s) => (
                <div key={s.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.location} • {s.students.toLocaleString()} students</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    s.plan === "Enterprise" ? "bg-magic-purple/20 text-magic-purple" :
                    s.plan === "Premium" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}>{s.plan}</span>
                  <span className={`w-2 h-2 rounded-full ${s.status === "active" ? "bg-xp-green" : "bg-streak-orange"}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Server className="w-4 h-4 text-xp-green" /> System Health</h3>
            <div className="space-y-2">
              {systemHealth.map((s) => (
                <div key={s.service} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                  {s.status === "operational" ? <CheckCircle2 className="w-4 h-4 text-xp-green shrink-0" /> : <AlertCircle className="w-4 h-4 text-streak-orange shrink-0" />}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{s.service}</div>
                    <div className="text-xs text-muted-foreground capitalize">{s.status}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{s.latency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-destructive" /> Security Logs</h3>
          <div className="space-y-2">
            {securityLogs.map((l, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  l.severity === "high" ? "bg-destructive" : l.severity === "medium" ? "bg-streak-orange" : "bg-xp-green"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{l.event}</div>
                  <div className="text-xs text-muted-foreground">{l.user} • {l.time}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-medium ${
                  l.severity === "high" ? "bg-destructive/20 text-destructive" :
                  l.severity === "medium" ? "bg-streak-orange/20 text-streak-orange" : "bg-xp-green/20 text-xp-green"
                }`}>{l.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminDashboard() {
  return (
    <SuperAdminPageShell>
      <SuperAdminHome />
    </SuperAdminPageShell>
  );
}
