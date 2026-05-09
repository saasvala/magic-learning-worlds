import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Users, Target, Award } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { DemoBadge } from "@/components/states/DemoBadge";

const subjectStats = [
  { subject: "English", emoji: "📖", avg: 82, trend: "+5%", highest: 98, lowest: 45 },
  { subject: "Mathematics", emoji: "🔢", avg: 75, trend: "+2%", highest: 100, lowest: 38 },
  { subject: "Science", emoji: "🔬", avg: 78, trend: "+3%", highest: 95, lowest: 42 },
  { subject: "Filipino", emoji: "🇵🇭", avg: 85, trend: "+7%", highest: 96, lowest: 55 },
];

const performanceDistribution = [
  { range: "90-100%", count: 18, color: "bg-xp-green" },
  { range: "80-89%", count: 32, color: "bg-primary" },
  { range: "70-79%", count: 28, color: "bg-magic-blue" },
  { range: "60-69%", count: 15, color: "bg-streak-orange" },
  { range: "Below 60%", count: 7, color: "bg-destructive" },
];

const topPerformers = [
  { name: "Maria Santos", score: 98, subject: "English" },
  { name: "Juan Dela Cruz", score: 96, subject: "Filipino" },
  { name: "Bea Reyes", score: 95, subject: "Science" },
  { name: "Diego Rivera", score: 94, subject: "Math" },
  { name: "Luna Cruz", score: 92, subject: "English" },
];

function AnalyticsPage() {
  const maxCount = Math.max(...performanceDistribution.map(d => d.count));

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-magic flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2"><h1 className="text-2xl font-bold">Analytics</h1><DemoBadge /></div>
            <p className="text-muted-foreground text-sm">Student performance insights across all classes</p>
          </div>
        </div>

        {/* Subject Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {subjectStats.map((s, i) => (
            <motion.div key={s.subject} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4">
              <div className="text-xl mb-1">{s.emoji}</div>
              <div className="text-sm font-semibold">{s.subject}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold">{s.avg}%</span>
                <span className="text-xs text-xp-green flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />{s.trend}</span>
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">H: {s.highest}% • L: {s.lowest}%</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Distribution */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> Score Distribution</h3>
            <div className="space-y-3">
              {performanceDistribution.map((d, i) => (
                <motion.div key={d.range} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20">{d.range}</span>
                  <div className="flex-1 h-6 bg-muted rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`h-full ${d.color} rounded-lg flex items-center justify-end pr-2`}
                    >
                      <span className="text-[10px] font-bold text-foreground">{d.count}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Top Performers</h3>
            <div className="space-y-2">
              {topPerformers.map((p, i) => (
                <motion.div key={p.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <span className="text-xs font-black text-primary w-6">#{i + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{p.name[0]}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.subject}</div>
                  </div>
                  <span className="text-sm font-bold text-xp-green">{p.score}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherAnalytics() {
  return (
    <TeacherPageShell>
      <AnalyticsPage />
    </TeacherPageShell>
  );
}
