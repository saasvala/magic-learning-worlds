import { motion } from "framer-motion";
import { DemoBadge } from "@/components/states/DemoBadge";
import { Bot, Zap, BarChart3, Settings, Globe, Brain } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { useState } from "react";

const models = [
  { name: "Gemini 2.5 Flash", provider: "Google", status: "active", usage: 15200, cost: "₱2,400", speed: "Fast" },
  { name: "Gemini 3 Flash Preview", provider: "Google", status: "active", usage: 8500, cost: "₱1,800", speed: "Very Fast" },
  { name: "GPT-5 Mini", provider: "OpenAI", status: "standby", usage: 0, cost: "₱0", speed: "Medium" },
];

const stats = [
  { label: "Total AI Queries", value: "23,700", icon: Brain, color: "text-magic-purple" },
  { label: "Avg Response Time", value: "1.2s", icon: Zap, color: "text-primary" },
  { label: "Languages Used", value: "12", icon: Globe, color: "text-magic-blue" },
  { label: "Monthly Cost", value: "₱4,200", icon: BarChart3, color: "text-xp-green" },
];

function AIControlPage() {
  const [safeMode, setSafeMode] = useState(true);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-magic-purple/20 flex items-center justify-center"><Bot className="w-5 h-5 text-magic-purple" /></div>
          <div>
            <h1 className="text-2xl font-bold">AI Control Center</h1>
            <div className="mt-1"><DemoBadge /></div>
            <p className="text-muted-foreground text-sm">Configure AI Tutor models and settings</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }} className="glass rounded-xl p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-xl p-5 mb-6">
          <h3 className="font-semibold mb-4">AI Models</h3>
          <div className="space-y-3">
            {models.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className={`w-3 h-3 rounded-full ${m.status === "active" ? "bg-xp-green" : "bg-muted-foreground"}`} />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.provider} • {m.speed}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">{m.usage.toLocaleString()} queries</div>
                  <div className="text-xs text-muted-foreground">{m.cost}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.status === "active" ? "bg-xp-green/20 text-xp-green" : "bg-muted text-muted-foreground"}`}>{m.status}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Settings className="w-4 h-4" /> Safety Settings</h3>
          <div className="flex items-center justify-between">
            <div><div className="text-sm font-medium">Safe Mode</div><div className="text-xs text-muted-foreground">Filter inappropriate content from AI responses</div></div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSafeMode(!safeMode)} className={`w-12 h-6 rounded-full relative ${safeMode ? "bg-xp-green" : "bg-muted"}`}>
              <motion.div animate={{ x: safeMode ? 24 : 2 }} className="w-5 h-5 rounded-full bg-foreground absolute top-0.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminAI() {
  return (<SuperAdminPageShell><AIControlPage /></SuperAdminPageShell>);
}
