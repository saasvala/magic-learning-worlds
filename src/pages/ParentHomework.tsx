import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { BookOpen, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const assignments = [
  { child: "Maria", title: "Algebra Practice Set 5", subject: "Math", due: "Mar 10", status: "pending", emoji: "📐" },
  { child: "Maria", title: "Essay: Philippine Revolution", subject: "History", due: "Mar 12", status: "submitted", emoji: "📜" },
  { child: "Juan", title: "Science Lab Report", subject: "Science", due: "Mar 8", status: "overdue", emoji: "🔬" },
  { child: "Juan", title: "Reading Comprehension Ch.8", subject: "English", due: "Mar 11", status: "pending", emoji: "📖" },
  { child: "Maria", title: "Art Project: Watercolor", subject: "Art", due: "Mar 15", status: "pending", emoji: "🎨" },
  { child: "Juan", title: "Times Table Quiz Prep", subject: "Math", due: "Mar 9", status: "submitted", emoji: "✖️" },
];

const statusBadge = (s: string) => {
  const map: Record<string, { icon: any; color: string; label: string }> = {
    submitted: { icon: CheckCircle2, color: "text-xp-green bg-xp-green/20", label: "Submitted" },
    pending: { icon: Clock, color: "text-streak-orange bg-streak-orange/20", label: "Pending" },
    overdue: { icon: AlertTriangle, color: "text-destructive bg-destructive/20", label: "Overdue" },
  };
  const m = map[s];
  return <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${m.color}`}><m.icon className="w-3 h-3" />{m.label}</span>;
};

function HomeworkPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">📚 Quest Assignments</h1><p className="text-sm text-muted-foreground">Track homework and assignment progress</p></div>
        </div>

        <div className="space-y-3">
          {assignments.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 border border-transparent transition-all">
              <span className="text-2xl">{a.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.child} • {a.subject} • Due: {a.due}</div>
              </div>
              {statusBadge(a.status)}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ParentHomework() {
  return <ParentPageShell><HomeworkPage /></ParentPageShell>;
}
