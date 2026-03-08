import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { Trophy, Star, TrendingUp } from "lucide-react";

const results = [
  { child: "Maria", exam: "Algebra Chapter Test", subject: "Math", score: 92, total: 100, passed: true, date: "Mar 5", grade: "A" },
  { child: "Maria", exam: "History Quarterly Exam", subject: "History", score: 88, total: 100, passed: true, date: "Feb 28", grade: "B+" },
  { child: "Juan", exam: "Science Boss Battle", subject: "Science", score: 95, total: 100, passed: true, date: "Mar 4", grade: "A+" },
  { child: "Juan", exam: "English Reading Test", subject: "English", score: 76, total: 100, passed: true, date: "Feb 25", grade: "B" },
  { child: "Maria", exam: "Filipino Practice Quiz", subject: "Filipino", score: 85, total: 100, passed: true, date: "Feb 20", grade: "B+" },
  { child: "Juan", exam: "Math Monthly Test", subject: "Math", score: 68, total: 100, passed: false, date: "Feb 18", grade: "C+" },
];

function ResultsPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><Trophy className="w-5 h-5 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">🏆 Battle Results</h1><p className="text-sm text-muted-foreground">Exam scores and performance grades</p></div>
        </div>

        <div className="space-y-3">
          {results.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${r.passed ? "bg-xp-green/20 text-xp-green" : "bg-destructive/20 text-destructive"}`}>
                {r.grade}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{r.exam}</div>
                <div className="text-xs text-muted-foreground">{r.child} • {r.subject} • {r.date}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{r.score}<span className="text-xs text-muted-foreground">/{r.total}</span></div>
                <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${r.score}%` }} transition={{ duration: 0.8, delay: 0.3 }} className={`h-full rounded-full ${r.score >= 80 ? "bg-xp-green" : r.score >= 60 ? "bg-streak-orange" : "bg-destructive"}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ParentExamResults() {
  return <ParentPageShell><ResultsPage /></ParentPageShell>;
}
