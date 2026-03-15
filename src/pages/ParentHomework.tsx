import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { BookOpen, CheckCircle2, Clock, AlertTriangle, Loader2 } from "lucide-react";
import { useParentAssignments } from "@/hooks/useParentData";

const statusBadge = (status: string) => {
  const map: Record<string, { icon: any; color: string; label: string }> = {
    submitted: { icon: CheckCircle2, color: "text-xp-green bg-xp-green/20", label: "Submitted" },
    graded: { icon: CheckCircle2, color: "text-primary bg-primary/20", label: "Graded" },
    pending: { icon: Clock, color: "text-streak-orange bg-streak-orange/20", label: "Pending" },
    returned: { icon: AlertTriangle, color: "text-destructive bg-destructive/20", label: "Returned" },
  };
  const m = map[status] || map.pending;
  return <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${m.color}`}><m.icon className="w-3 h-3" />{m.label}</span>;
};

function HomeworkPage() {
  const { assignments, submissions, children, loading } = useParentAssignments();

  if (loading) {
    return <div className="p-6 flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const childMap = Object.fromEntries(children.map(c => [c.id, c.full_name]));
  const subMap = Object.fromEntries(submissions.map(s => [`${s.assignment_id}_${s.student_id}`, s]));

  // Build display list: each assignment × each child
  const items = assignments.flatMap(a =>
    children.map(child => {
      const sub = subMap[`${a.id}_${child.id}`];
      const now = new Date();
      const due = a.due_date ? new Date(a.due_date) : null;
      const isOverdue = due && due < now && (!sub || sub.status === "pending");
      return {
        id: `${a.id}_${child.id}`,
        title: a.title,
        childName: child.full_name,
        due: due ? due.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—",
        status: isOverdue ? "overdue" : (sub?.status || "pending"),
      };
    })
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">📚 Quest Assignments</h1><p className="text-sm text-muted-foreground">Track homework and assignment progress</p></div>
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center text-muted-foreground">No assignments found for your children.</div>
        ) : (
          <div className="space-y-3">
            {items.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 border border-transparent transition-all">
                <span className="text-2xl">📝</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.childName} • Due: {a.due}</div>
                </div>
                {a.status === "overdue" ? (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium text-destructive bg-destructive/20">
                    <AlertTriangle className="w-3 h-3" />Overdue
                  </span>
                ) : statusBadge(a.status)}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function ParentHomework() {
  return <ParentPageShell><HomeworkPage /></ParentPageShell>;
}
