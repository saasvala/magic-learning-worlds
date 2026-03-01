import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Clock, Star, Trophy, BookOpen, Target, Flame } from "lucide-react";
import { StudentPageShell } from "@/components/StudentPageShell";
import { useAuth } from "@/contexts/AuthContext";

const subjectProgress = [
  { name: "English", emoji: "📖", mastery: 85, chaptersComplete: 7, totalChapters: 10, grade: "A" },
  { name: "Mathematics", emoji: "🔢", mastery: 72, chaptersComplete: 5, totalChapters: 12, grade: "B+" },
  { name: "Science", emoji: "🔬", mastery: 60, chaptersComplete: 4, totalChapters: 10, grade: "B" },
  { name: "Filipino", emoji: "🇵🇭", mastery: 90, chaptersComplete: 8, totalChapters: 9, grade: "A+" },
  { name: "Araling Panlipunan", emoji: "🌏", mastery: 45, chaptersComplete: 3, totalChapters: 10, grade: "C+" },
  { name: "MAPEH", emoji: "🎵", mastery: 30, chaptersComplete: 2, totalChapters: 8, grade: "C" },
];

const weeklyActivity = [
  { day: "Mon", hours: 2.5, xp: 150 },
  { day: "Tue", hours: 1.8, xp: 100 },
  { day: "Wed", hours: 3.0, xp: 200 },
  { day: "Thu", hours: 0.5, xp: 30 },
  { day: "Fri", hours: 2.0, xp: 120 },
  { day: "Sat", hours: 4.0, xp: 280 },
  { day: "Sun", hours: 1.0, xp: 60 },
];

const achievements = [
  { label: "Total Study Time", value: "128h", icon: Clock },
  { label: "Lessons Complete", value: "89", icon: BookOpen },
  { label: "Quizzes Passed", value: "34", icon: Target },
  { label: "Current Streak", value: "12 days", icon: Flame },
];

function ProgressPage() {
  const { profile } = useAuth();
  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow-gold">
            <BarChart3 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Progress Report</h1>
            <p className="text-muted-foreground text-sm">Your learning journey at a glance</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {achievements.map((a, i) => (
            <motion.div key={a.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass rounded-xl p-4 text-center">
              <a.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">{a.value}</div>
              <div className="text-[10px] text-muted-foreground">{a.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Subject Mastery */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Trophy className="w-4 h-4 text-primary" /> Subject Mastery</h3>
            <div className="space-y-3">
              {subjectProgress.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{s.emoji} {s.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${
                        s.mastery >= 80 ? "text-xp-green" : s.mastery >= 60 ? "text-primary" : "text-streak-orange"
                      }`}>{s.grade}</span>
                      <span className="text-xs text-muted-foreground">{s.chaptersComplete}/{s.totalChapters}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.mastery}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full rounded-full ${
                        s.mastery >= 80 ? "bg-xp-green" : s.mastery >= 60 ? "bg-gradient-gold" : "bg-streak-orange"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-magic-blue" /> Weekly Activity</h3>
            <div className="flex items-end gap-2 h-40">
              {weeklyActivity.map((d, i) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-primary font-medium">+{d.xp}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="w-full rounded-t-lg bg-gradient-gold min-h-[4px]"
                  />
                  <span className="text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center text-xs text-muted-foreground">
              Total: {weeklyActivity.reduce((s, d) => s + d.hours, 0).toFixed(1)}h • {weeklyActivity.reduce((s, d) => s + d.xp, 0)} XP earned
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Overall Standing</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{Math.round(subjectProgress.reduce((s, p) => s + p.mastery, 0) / subjectProgress.length)}%</div>
              <div className="text-xs text-muted-foreground">Avg. Mastery</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-xp-green">{subjectProgress.reduce((s, p) => s + p.chaptersComplete, 0)}</div>
              <div className="text-xs text-muted-foreground">Chapters Done</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-magic-purple">Level {profile?.level || 1}</div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function StudentProgress() {
  return (
    <StudentPageShell>
      <ProgressPage />
    </StudentPageShell>
  );
}
