import { motion } from "framer-motion";
import { Swords, Shield, Clock, Zap, Trophy } from "lucide-react";
import { StudentPageShell } from "@/components/StudentPageShell";
import { FloatingStars } from "@/components/animations/MagicEffects";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState, EmptyState, ErrorState } from "@/components/states";

const typeLabels: Record<string, { label: string; color: string; emoji: string }> = {
  diagnostic: { label: "Diagnostic", color: "text-magic-blue", emoji: "🎯" },
  practice_quiz: { label: "Quick Battle", color: "text-primary", emoji: "⚡" },
  chapter_test: { label: "Chapter Battle", color: "text-magic-purple", emoji: "⚔️" },
  monthly_test: { label: "Monthly Siege", color: "text-streak-orange", emoji: "📋" },
  quarterly_exam: { label: "Castle Raid", color: "text-coral", emoji: "🏰" },
  boss_battle: { label: "Boss Fight", color: "text-destructive", emoji: "🐉" },
};

function ExamsPage() {
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    enabled: !!user?.id,
    queryKey: ["student-exams", user?.id],
    queryFn: async () => {
      const [{ data: exams }, { data: results }] = await Promise.all([
        supabase.from("exams").select("*").eq("is_published", true).order("starts_at", { ascending: true }),
        supabase.from("results").select("*").eq("student_id", user!.id),
      ]);
      return { exams: exams || [], results: results || [] };
    },
  });

  const now = Date.now();
  const items = (data?.exams ?? []).map((e: any) => {
    const result = (data?.results ?? []).find((r: any) => r.exam_id === e.id);
    let status: "completed" | "available" | "upcoming" = "available";
    if (result) status = "completed";
    else if (e.starts_at && new Date(e.starts_at).getTime() > now) status = "upcoming";
    return { ...e, status, percentage: result?.percentage };
  });

  const won = items.filter((i) => i.status === "completed").length;
  const winRate = won
    ? Math.round(((data?.results ?? []).filter((r: any) => r.passed).length / won) * 100)
    : 0;

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
            { label: "Battles Won", value: String(won), icon: Trophy, color: "text-primary" },
            { label: "Win Rate", value: `${winRate}%`, icon: Shield, color: "text-xp-green" },
            { label: "Available Now", value: String(items.filter((i) => i.status === "available").length), icon: Zap, color: "text-magic-purple" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4 text-center">
              <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {isLoading ? (
          <LoadingState variant="skeleton" rows={5} />
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : items.length === 0 ? (
          <EmptyState title="No battles scheduled" description="Your teacher hasn't published any exams yet." />
        ) : (
          <div className="space-y-3">
            {items.map((e: any, i: number) => {
              const tl = typeLabels[e.exam_type] || { label: e.exam_type, color: "text-muted-foreground", emoji: "📝" };
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className={`glass rounded-xl p-4 flex items-center gap-4 ${
                    e.status === "available" ? "ring-1 ring-primary/40 shadow-glow-gold" :
                    e.exam_type === "boss_battle" ? "ring-1 ring-destructive/30" : ""
                  }`}
                >
                  <div className="text-3xl">{tl.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{e.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-medium ${tl.color}`}>{tl.label}</span>
                      <span className="text-[10px] text-muted-foreground">• {e.total_marks} marks</span>
                    </div>
                    {e.status === "available" && (
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.duration_minutes} min</span>
                      </div>
                    )}
                    {e.status === "upcoming" && e.starts_at && (
                      <div className="text-[10px] text-streak-orange mt-1">📅 Starts: {new Date(e.starts_at).toLocaleDateString()}</div>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    {e.status === "completed" && (
                      <div>
                        <div className="text-lg font-bold text-xp-green">{Math.round(Number(e.percentage ?? 0))}%</div>
                        <div className="text-[10px] text-muted-foreground">Score</div>
                      </div>
                    )}
                    {e.status === "available" && (
                      <button className="px-4 py-2 rounded-xl bg-gradient-gold text-primary-foreground text-xs font-bold shadow-glow-gold flex items-center gap-1">
                        <Swords className="w-3 h-3" /> Fight!
                      </button>
                    )}
                    {e.status === "upcoming" && <Clock className="w-5 h-5 text-streak-orange" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
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
