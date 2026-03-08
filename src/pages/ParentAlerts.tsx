import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { Bell, Trophy, AlertTriangle, BookOpen, Star, CalendarCheck } from "lucide-react";

const alerts = [
  { type: "achievement", title: "Maria earned 'Algebra Master' badge!", desc: "Completed all algebra chapters with 90%+ mastery", time: "1h ago", icon: Trophy, color: "text-primary bg-primary/20" },
  { type: "warning", title: "Juan's Science Lab Report is overdue", desc: "Due date was March 8. Please remind to submit.", time: "3h ago", icon: AlertTriangle, color: "text-destructive bg-destructive/20" },
  { type: "activity", title: "Maria submitted History Essay", desc: "Assignment submitted before the deadline", time: "5h ago", icon: BookOpen, color: "text-xp-green bg-xp-green/20" },
  { type: "xp", title: "Juan leveled up to Level 8!", desc: "Earned 200 XP from Science Boss Battle", time: "1d ago", icon: Star, color: "text-streak-orange bg-streak-orange/20" },
  { type: "attendance", title: "Juan was marked late today", desc: "Arrived 10 minutes after class started", time: "1d ago", icon: CalendarCheck, color: "text-streak-orange bg-streak-orange/20" },
  { type: "achievement", title: "Maria reached a 15-day streak!", desc: "Consistent daily learning earns bonus XP", time: "1d ago", icon: Star, color: "text-primary bg-primary/20" },
];

function AlertsPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center"><Bell className="w-5 h-5 text-destructive" /></div>
          <div><h1 className="text-2xl font-bold">🔔 Alert Scroll</h1><p className="text-sm text-muted-foreground">Activity notifications for your children</p></div>
        </div>

        <div className="space-y-3">
          {alerts.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${a.color}`}>
                <a.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.desc}</div>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{a.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ParentAlerts() {
  return <ParentPageShell><AlertsPage /></ParentPageShell>;
}
