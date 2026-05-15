import { motion } from "framer-motion";
import { DemoBadge } from "@/components/states/DemoBadge";
import { Activity, CheckCircle2, AlertCircle, Server, Cpu, HardDrive, Wifi } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";

const services = [
  { name: "API Server", status: "operational", latency: "45ms", uptime: "99.99%", icon: Server },
  { name: "Database (Primary)", status: "operational", latency: "12ms", uptime: "99.97%", icon: HardDrive },
  { name: "Database (Replica)", status: "operational", latency: "18ms", uptime: "99.95%", icon: HardDrive },
  { name: "AI Tutor Engine", status: "operational", latency: "180ms", uptime: "99.90%", icon: Cpu },
  { name: "CDN / Static Assets", status: "operational", latency: "22ms", uptime: "99.99%", icon: Wifi },
  { name: "Backup Service", status: "maintenance", latency: "—", uptime: "98.5%", icon: Server },
  { name: "Email Service", status: "operational", latency: "350ms", uptime: "99.80%", icon: Wifi },
];

const metrics = [
  { label: "CPU Usage", value: 42, max: 100, unit: "%" },
  { label: "Memory", value: 6.2, max: 16, unit: "GB" },
  { label: "Storage", value: 180, max: 500, unit: "GB" },
  { label: "Bandwidth", value: 2.4, max: 10, unit: "TB" },
];

function HealthPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-xp-green/20 flex items-center justify-center"><Activity className="w-5 h-5 text-xp-green" /></div>
          <div>
            <h1 className="text-2xl font-bold">System Health</h1>
            <div className="mt-1"><DemoBadge /></div>
            <p className="text-muted-foreground text-sm">Real-time monitoring and performance metrics</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((m, i) => {
            const pct = (m.value / m.max) * 100;
            return (
              <motion.div key={m.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }} className="glass rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-2">{m.label}</div>
                <div className="text-lg font-bold">{m.value}{m.unit} <span className="text-xs text-muted-foreground font-normal">/ {m.max}{m.unit}</span></div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`h-full rounded-full ${pct < 60 ? "bg-xp-green" : pct < 80 ? "bg-primary" : "bg-destructive"}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Service Status</h3>
          <div className="space-y-2">
            {services.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <s.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                {s.status === "operational" ? <CheckCircle2 className="w-4 h-4 text-xp-green shrink-0" /> : <AlertCircle className="w-4 h-4 text-streak-orange shrink-0" />}
                <div className="flex-1"><div className="text-sm font-medium">{s.name}</div></div>
                <span className="text-xs text-muted-foreground">{s.latency}</span>
                <span className="text-xs text-muted-foreground">{s.uptime}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.status === "operational" ? "bg-xp-green/20 text-xp-green" : "bg-streak-orange/20 text-streak-orange"}`}>{s.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminHealth() {
  return (<SuperAdminPageShell><HealthPage /></SuperAdminPageShell>);
}
