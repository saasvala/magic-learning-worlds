import { motion } from "framer-motion";
import { Swords, Shield, Crown, Lock, Clock, Zap, Trophy, ChevronRight } from "lucide-react";
import { StudentPageShell } from "@/components/StudentPageShell";
import { FloatingStars } from "@/components/animations/MagicEffects";

const exams = [
  { id: 1, title: "Diagnostic Test: English Proficiency", type: "diagnostic", subject: "English", status: "completed", score: 88, total: 100, emoji: "🎯" },
  { id: 2, title: "Chapter Quiz: Fractions & Decimals", type: "practice_quiz", subject: "Mathematics", status: "available", duration: 15, questions: 10, emoji: "⚡" },
  { id: 3, title: "Chapter Test: Parts of Speech", type: "chapter_test", subject: "English", status: "available", duration: 30, questions: 25, emoji: "⚔️" },
  { id: 4, title: "Monthly Test: Science Feb 2026", type: "monthly_test", subject: "Science", status: "upcoming", date: "Mar 10", emoji: "📋" },
  { id: 5, title: "Quarterly Exam: Mathematics Q1", type: "quarterly_exam", subject: "Mathematics", status: "upcoming", date: "Mar 25", emoji: "🏰" },
  { id: 6, title: "BOSS BATTLE: Filipino Mastery", type: "boss_battle", subject: "Filipino", status: "locked", requirement: "Complete all chapters", emoji: "🐉" },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  diagnostic: { label: "🎯 Diagnostic", color: "text-magic-blue" },
  practice_quiz: { label: "⚡ Quick Battle", color: "text-primary" },
  chapter_test: { label: "⚔️ Chapter Battle", color: "text-magic-purple" },
  monthly_test: { label: "📋 Monthly Siege", color: "text-streak-orange" },
  quarterly_exam: { label: "🏰 Castle Raid", color: "text-coral" },
  boss_battle: { label: "🐉 Boss Fight", color: "text-destructive" },
};

function ExamsPage() {
  return (
    <div className="p-6 relative">
      <FloatingStars />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-magic flex items-center justify-center shadow-glow-purple">
            <Swords className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Battle Arena</h1>
            <p className="text-muted-foreground text-sm">Prove your mastery — defeat quizzes, tests, and bosses!</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Battles Won", value: "12", icon: Trophy, color: "text-primary" },
            { label: "Win Rate", value: "85%", icon: Shield, color: "text-xp-green" },
            { label: "Total XP Earned", value: "2,450", icon: Zap, color: "text-magic-purple" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4 text-center">
              <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          {exams.map((e, i) => {
            const tl = typeLabels[e.type];
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={e.status !== "locked" ? { scale: 1.01, y: -2 } : {}}
                className={`glass rounded-xl p-4 flex items-center gap-4 ${
                  e.status === "locked" ? "opacity-40" :
                  e.status === "available" ? "ring-1 ring-primary/40 shadow-glow-gold" :
                  e.type === "boss_battle" ? "ring-1 ring-destructive/30" : ""
                }`}
              >
                <div className="text-3xl">{e.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{e.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-medium ${tl.color}`}>{tl.label}</span>
                    <span className="text-[10px] text-muted-foreground">• {e.subject}</span>
                  </div>
                  {e.status === "available" && (
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.duration} min</span>
                      <span>{e.questions} questions</span>
                    </div>
                  )}
                  {e.status === "upcoming" && <div className="text-[10px] text-streak-orange mt-1">📅 Scheduled: {e.date}</div>}
                  {e.status === "locked" && <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Lock className="w-3 h-3" />{e.requirement}</div>}
                </div>
                <div className="shrink-0 text-right">
                  {e.status === "completed" && (
                    <div>
                      <div className="text-lg font-bold text-xp-green">{e.score}%</div>
                      <div className="text-[10px] text-muted-foreground">Score</div>
                    </div>
                  )}
                  {e.status === "available" && (
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-4 py-2 rounded-xl bg-gradient-gold text-primary-foreground text-xs font-bold shadow-glow-gold flex items-center gap-1">
                      <Swords className="w-3 h-3" /> Fight!
                    </motion.button>
                  )}
                  {e.status === "upcoming" && <Clock className="w-5 h-5 text-streak-orange" />}
                  {e.status === "locked" && <Lock className="w-5 h-5 text-muted-foreground" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function StudentExams() {
  return (
    <StudentPageShell>
      <ExamsPage />
    </StudentPageShell>
  );
}
