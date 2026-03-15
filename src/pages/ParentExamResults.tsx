import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { Trophy, Loader2 } from "lucide-react";
import { useParentResults } from "@/hooks/useParentData";

function ResultsPage() {
  const { results, children, loading } = useParentResults();

  if (loading) {
    return <div className="p-6 flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const childMap = Object.fromEntries(children.map(c => [c.id, c.full_name]));

  const getGrade = (pct: number) => pct >= 95 ? "A+" : pct >= 90 ? "A" : pct >= 85 ? "B+" : pct >= 80 ? "B" : pct >= 75 ? "C+" : pct >= 70 ? "C" : "D";

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">🏆 Battle Results</h1><p className="text-sm text-muted-foreground">Exam scores and performance grades</p></div>
        </div>

        {results.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center text-muted-foreground">No exam results found for your children.</div>
        ) : (
          <div className="space-y-3">
            {results.map((r: any, i: number) => {
              const pct = Number(r.percentage) || 0;
              const grade = getGrade(pct);
              return (
                <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${r.passed ? "bg-xp-green/20 text-xp-green" : "bg-destructive/20 text-destructive"}`}>
                    {grade}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{r.exams?.title || "Exam"}</div>
                    <div className="text-xs text-muted-foreground">
                      {childMap[r.student_id] || "—"} • {new Date(r.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{r.score}<span className="text-xs text-muted-foreground">/{r.total_marks}</span></div>
                    <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }} className={`h-full rounded-full ${pct >= 80 ? "bg-xp-green" : pct >= 60 ? "bg-streak-orange" : "bg-destructive"}`} />
                    </div>
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

export default function ParentExamResults() {
  return <ParentPageShell><ResultsPage /></ParentPageShell>;
}
