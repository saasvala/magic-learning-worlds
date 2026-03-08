import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { TrendingUp, BookOpen, Trophy, CalendarCheck, Star, Flame, Shield } from "lucide-react";

const children = [
  { name: "Maria Santos", grade: "Grade 7", avatar: "M", xp: 4250, level: 12, streak: 15, rank: "Arcane Scholar", attendance: "96%", gpa: "92%" },
  { name: "Juan Santos", grade: "Grade 4", avatar: "J", xp: 2100, level: 7, streak: 8, rank: "Apprentice Mage", attendance: "98%", gpa: "88%" },
];

const recentActivity = [
  { child: "Maria", action: "Completed Chapter Test: Algebra Mastery", xp: "+150 XP", time: "2h ago", emoji: "⚔️" },
  { child: "Juan", action: "Earned Badge: Science Explorer", xp: "+100 XP", time: "5h ago", emoji: "🏅" },
  { child: "Maria", action: "Submitted Assignment: History Essay", xp: "+50 XP", time: "1d ago", emoji: "📜" },
  { child: "Juan", action: "Perfect Attendance Bonus", xp: "+75 XP", time: "1d ago", emoji: "✨" },
];

function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">👨‍👩‍👧 Family Command Center</h1>
        <p className="text-sm text-muted-foreground">Track your children's learning adventures</p>
      </motion.div>

      {/* Children Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {children.map((child, i) => (
          <motion.div key={child.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-lg font-bold text-primary-foreground">{child.avatar}</div>
              <div>
                <div className="font-bold">{child.name}</div>
                <div className="text-xs text-muted-foreground">{child.grade} • {child.rank}</div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-streak-orange">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-bold">{child.streak}d</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "XP", value: child.xp.toLocaleString(), icon: Star, color: "text-primary" },
                { label: "Level", value: child.level, icon: Shield, color: "text-secondary" },
                { label: "Attend.", value: child.attendance, icon: CalendarCheck, color: "text-xp-green" },
                { label: "GPA", value: child.gpa, icon: Trophy, color: "text-streak-orange" },
              ].map(s => (
                <div key={s.label} className="glass rounded-lg p-2 text-center">
                  <s.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${s.color}`} />
                  <div className="text-sm font-bold">{s.value}</div>
                  <div className="text-[10px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            {/* XP Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>Level {child.level}</span>
                <span>Level {child.level + 1}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(child.xp % 500) / 5}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full bg-gradient-to-r from-primary to-streak-orange" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-bold mb-3">📜 Quest Log</h2>
        <div className="space-y-2">
          {recentActivity.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="glass rounded-xl p-3 flex items-center gap-3">
              <span className="text-xl">{a.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{a.action}</div>
                <div className="text-[10px] text-muted-foreground">{a.child} • {a.time}</div>
              </div>
              <span className="text-xs font-bold text-xp-green">{a.xp}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ParentDashboard() {
  return <ParentPageShell><DashboardContent /></ParentPageShell>;
}
