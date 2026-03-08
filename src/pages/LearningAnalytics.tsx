import { motion } from "framer-motion";
import { AdminPageShell } from "@/components/AdminPageShell";
import { BarChart3, Brain, BookOpen, TrendingDown, TrendingUp, Sparkles, Target } from "lucide-react";

const topicCompletion = [
  { subject: "Mathematics", grade: "G7", completion: 78, trend: "up", weakTopics: ["Geometry Proofs", "Word Problems"] },
  { subject: "Science", grade: "G7", completion: 82, trend: "up", weakTopics: ["Chemical Equations", "Lab Analysis"] },
  { subject: "English", grade: "G7", completion: 91, trend: "up", weakTopics: ["Essay Structure"] },
  { subject: "Filipino", grade: "G7", completion: 65, trend: "down", weakTopics: ["Pagsusuri ng Akda", "Balarila"] },
  { subject: "History", grade: "G7", completion: 73, trend: "up", weakTopics: ["Timeline Analysis", "Source Evaluation"] },
];

const weaknessMap = [
  { student: "Group A (15 students)", weakness: "Algebraic Expressions", severity: "high", recommendation: "Assign extra practice sets" },
  { student: "Group B (22 students)", weakness: "Reading Comprehension", severity: "medium", recommendation: "Enable AI tutor sessions" },
  { student: "Group C (8 students)", weakness: "Chemical Bonding", severity: "high", recommendation: "Schedule review lesson" },
  { student: "Group D (30 students)", weakness: "Essay Writing", severity: "low", recommendation: "Provide writing templates" },
];

const aiUsage = [
  { day: "Mon", sessions: 142 }, { day: "Tue", sessions: 189 }, { day: "Wed", sessions: 215 },
  { day: "Thu", sessions: 198 }, { day: "Fri", sessions: 167 }, { day: "Sat", sessions: 45 }, { day: "Sun", sessions: 32 },
];
const maxSessions = Math.max(...aiUsage.map(d => d.sessions));

function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-magic-blue/20 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-magic-blue" /></div>
          <div><h1 className="text-2xl font-bold">📊 Intelligence Crystal</h1><p className="text-sm text-muted-foreground">Deep learning analytics and insights</p></div>
        </div>

        {/* Topic Completion */}
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Target className="w-5 h-5 text-primary" />Topic Completion Rate</h2>
        <div className="space-y-2 mb-6">
          {topicCompletion.map((t, i) => (
            <motion.div key={t.subject} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-3 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{t.subject}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{t.grade}</span>
                  {t.trend === "up" ? <TrendingUp className="w-3 h-3 text-xp-green" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                </div>
                <div className="text-[10px] text-muted-foreground">Weak: {t.weakTopics.join(", ")}</div>
              </div>
              <div className="w-24">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${t.completion}%` }} transition={{ duration: 0.8, delay: 0.3 }} className={`h-full rounded-full ${t.completion >= 80 ? "bg-xp-green" : t.completion >= 60 ? "bg-streak-orange" : "bg-destructive"}`} />
                </div>
                <div className="text-xs font-bold text-right mt-0.5">{t.completion}%</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weakness Detection */}
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Brain className="w-5 h-5 text-magic-purple" />AI Weakness Detection</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {weaknessMap.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{w.weakness}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${w.severity === "high" ? "bg-destructive/20 text-destructive" : w.severity === "medium" ? "bg-streak-orange/20 text-streak-orange" : "bg-xp-green/20 text-xp-green"}`}>{w.severity}</span>
              </div>
              <div className="text-[10px] text-muted-foreground mb-1">{w.student}</div>
              <div className="text-[10px] text-magic-purple flex items-center gap-1"><Sparkles className="w-3 h-3" />{w.recommendation}</div>
            </motion.div>
          ))}
        </div>

        {/* AI Tutor Usage Chart */}
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-streak-orange" />AI Tutor Usage</h2>
        <div className="glass rounded-xl p-4">
          <div className="flex items-end gap-2 h-32">
            {aiUsage.map((d, i) => (
              <motion.div key={d.day} initial={{ height: 0 }} animate={{ height: `${(d.sessions / maxSessions) * 100}%` }} transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/80 to-primary/30 relative group cursor-pointer">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{d.sessions}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {aiUsage.map(d => (
              <div key={d.day} className="flex-1 text-center text-[10px] text-muted-foreground">{d.day}</div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LearningAnalytics() {
  return <AdminPageShell><AnalyticsPage /></AdminPageShell>;
}
