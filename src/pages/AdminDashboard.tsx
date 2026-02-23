import { motion } from "framer-motion";
import {
  Users, GraduationCap, TrendingUp, UserCheck, Search, Bell
} from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";

const stats = [
  { label: "Total Students", value: "2,847", change: "+12%", icon: Users, color: "text-magic-blue" },
  { label: "Active Teachers", value: "156", change: "+3%", icon: GraduationCap, color: "text-xp-green" },
  { label: "Avg. Mastery", value: "78%", change: "+5%", icon: TrendingUp, color: "text-primary" },
  { label: "Attendance Today", value: "94%", change: "+1%", icon: UserCheck, color: "text-magic-purple" },
];

const recentActivity = [
  { text: "Maria Santos completed Grade 5 Math Boss Fight", time: "2m ago", emoji: "⚔️" },
  { text: "New quiz published: Science Ch. 4 by Mr. Cruz", time: "15m ago", emoji: "📝" },
  { text: "Grade 3 English curriculum updated", time: "1h ago", emoji: "📖" },
  { text: "45 students earned 7-day streak badge", time: "2h ago", emoji: "🔥" },
  { text: "Quarterly exam results published for Grade 6", time: "3h ago", emoji: "🏆" },
];

const gradePerformance = [
  { grade: "LKG", mastery: 92 }, { grade: "UKG", mastery: 89 },
  { grade: "Grade 1", mastery: 88 }, { grade: "Grade 2", mastery: 82 },
  { grade: "Grade 3", mastery: 76 }, { grade: "Grade 4", mastery: 71 },
  { grade: "Grade 5", mastery: 68 }, { grade: "Grade 6", mastery: 74 },
  { grade: "Grade 7", mastery: 70 }, { grade: "Grade 8", mastery: 66 },
  { grade: "Grade 9", mastery: 63 }, { grade: "Grade 10", mastery: 72 },
  { grade: "Grade 11", mastery: 75 }, { grade: "Grade 12", mastery: 78 },
];

function AdminHome() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Mabini Academy • School Year 2025–2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search..." className="pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary w-48" />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className="text-xs font-medium text-xp-green">{s.change}</span>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-lg shrink-0">{a.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p>{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4">Grade Performance (LKG–12)</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {gradePerformance.map((g) => (
                <div key={g.grade} className="flex items-center gap-3">
                  <span className="text-xs w-16 text-muted-foreground shrink-0">{g.grade}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${g.mastery}%` }} />
                  </div>
                  <span className={`text-xs font-medium w-8 text-right ${g.mastery >= 80 ? "text-xp-green" : g.mastery >= 70 ? "text-primary" : "text-streak-orange"}`}>
                    {g.mastery}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminPageShell>
      <AdminHome />
    </AdminPageShell>
  );
}
