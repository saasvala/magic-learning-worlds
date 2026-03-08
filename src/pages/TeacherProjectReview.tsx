import { motion } from "framer-motion";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { ClipboardCheck, Star, MessageSquare, CheckCircle2, RotateCcw, Download } from "lucide-react";

const submissions = [
  { student: "Maria Santos", project: "Water Cycle Diorama", subject: "Science", submitted: "Mar 6", score: null, status: "pending", rubric: { creativity: 0, accuracy: 0, presentation: 0 } },
  { student: "Juan Dela Cruz", project: "Philippine Heroes Essay", subject: "History", submitted: "Mar 5", score: 88, status: "graded", rubric: { creativity: 18, accuracy: 22, presentation: 18 } },
  { student: "Ana Reyes", project: "Math Problem Solver App", subject: "Math", submitted: "Mar 4", score: 95, status: "graded", rubric: { creativity: 24, accuracy: 25, presentation: 21 } },
  { student: "Pedro Garcia", project: "Ecosystem Model", subject: "Science", submitted: "Mar 3", score: null, status: "revision", rubric: { creativity: 15, accuracy: 12, presentation: 10 } },
  { student: "Liza Mendoza", project: "Creative Writing Portfolio", subject: "English", submitted: "Mar 7", score: null, status: "pending", rubric: { creativity: 0, accuracy: 0, presentation: 0 } },
];

const statusBadge = (s: string) => {
  const m: Record<string, { cls: string; label: string }> = {
    pending: { cls: "bg-streak-orange/20 text-streak-orange", label: "⏳ Review" },
    graded: { cls: "bg-xp-green/20 text-xp-green", label: "✅ Graded" },
    revision: { cls: "bg-destructive/20 text-destructive", label: "🔄 Revision" },
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${m[s].cls}`}>{m[s].label}</span>;
};

function ReviewPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-magic-purple/20 flex items-center justify-center"><ClipboardCheck className="w-5 h-5 text-magic-purple" /></div>
          <div><h1 className="text-2xl font-bold">📋 Project Review Chamber</h1><p className="text-sm text-muted-foreground">Rubric scoring, feedback, and portfolio export</p></div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-streak-orange">{submissions.filter(s => s.status === "pending").length}</div><div className="text-xs text-muted-foreground">Pending Review</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">{submissions.filter(s => s.status === "graded").length}</div><div className="text-xs text-muted-foreground">Graded</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-destructive">{submissions.filter(s => s.status === "revision").length}</div><div className="text-xs text-muted-foreground">Needs Revision</div></div>
        </div>

        <div className="space-y-3">
          {submissions.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-9 h-9 rounded-full bg-secondary/30 flex items-center justify-center text-xs font-bold">{s.student[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{s.project}</div>
                  <div className="text-[10px] text-muted-foreground">{s.student} • {s.subject} • {s.submitted}</div>
                </div>
                {statusBadge(s.status)}
                {s.score && <span className="text-lg font-bold text-xp-green">{s.score}%</span>}
              </div>
              {/* Rubric */}
              <div className="grid grid-cols-3 gap-2">
                {["Creativity", "Accuracy", "Presentation"].map((r, ri) => {
                  const val = Object.values(s.rubric)[ri];
                  return (
                    <div key={r} className="glass rounded-lg p-2 text-center">
                      <div className="text-[10px] text-muted-foreground mb-1">{r}</div>
                      <div className="text-sm font-bold">{val || "—"}<span className="text-[10px] text-muted-foreground">/25</span></div>
                      <div className="h-1 rounded-full bg-muted mt-1 overflow-hidden">
                        <div className={`h-full rounded-full ${val >= 20 ? "bg-xp-green" : val >= 10 ? "bg-streak-orange" : "bg-muted"}`} style={{ width: `${(val / 25) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-xp-green/20 text-xp-green hover:bg-xp-green/30 transition-colors"><CheckCircle2 className="w-3 h-3" />Approve</button>
                <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-streak-orange/20 text-streak-orange hover:bg-streak-orange/30 transition-colors"><RotateCcw className="w-3 h-3" />Revise</button>
                <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"><MessageSquare className="w-3 h-3" />Comment</button>
                <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors ml-auto"><Download className="w-3 h-3" />Export</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherProjectReview() {
  return <TeacherPageShell><ReviewPage /></TeacherPageShell>;
}
