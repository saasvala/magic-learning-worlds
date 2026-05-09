import { motion } from "framer-motion";
import { FileText, Upload, Eye } from "lucide-react";
import { StudentPageShell } from "@/components/StudentPageShell";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState, EmptyState, ErrorState } from "@/components/states";

type Status = "pending" | "overdue" | "submitted" | "graded";

const statusConfig: Record<Status, { label: string; color: string; bg: string }> = {
  pending: { label: "⏳ Pending", color: "text-primary", bg: "bg-primary/10" },
  overdue: { label: "🔥 Overdue!", color: "text-destructive", bg: "bg-destructive/10" },
  submitted: { label: "📤 Submitted", color: "text-magic-blue", bg: "bg-magic-blue/10" },
  graded: { label: "✅ Graded", color: "text-xp-green", bg: "bg-xp-green/10" },
};

function AssignmentsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | Status>("all");

  const { data, isLoading, error, refetch } = useQuery({
    enabled: !!user?.id,
    queryKey: ["student-assignments", user?.id],
    queryFn: async () => {
      const { data: enroll } = await supabase
        .from("class_enrollments")
        .select("class_id")
        .eq("student_id", user!.id);
      const classIds = (enroll || []).map((e) => e.class_id);
      if (classIds.length === 0) return { assignments: [], submissions: [] };

      const [{ data: assignments }, { data: subs }] = await Promise.all([
        supabase.from("assignments").select("*").in("class_id", classIds).order("due_date", { ascending: true }),
        supabase.from("assignment_submissions").select("*").eq("student_id", user!.id),
      ]);
      return { assignments: assignments || [], submissions: subs || [] };
    },
  });

  const items = (data?.assignments ?? []).map((a: any) => {
    const sub = (data?.submissions ?? []).find((s: any) => s.assignment_id === a.id);
    let status: Status = "pending";
    if (sub?.status === "graded" || sub?.score != null) status = "graded";
    else if (sub) status = "submitted";
    else if (a.due_date && new Date(a.due_date) < new Date()) status = "overdue";
    return { ...a, status, score: sub?.score };
  });

  const filtered = filter === "all" ? items : items.filter((a) => a.status === filter);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              Quest Board
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Complete assignments to earn XP and level up!</p>
          </div>
          <span className="text-xs text-muted-foreground">{items.filter((a) => a.status === "pending").length} active quests</span>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: "all", label: "All Quests" },
            { key: "pending", label: "⏳ Active" },
            { key: "overdue", label: "🔥 Overdue" },
            { key: "submitted", label: "📤 Sent" },
            { key: "graded", label: "✅ Graded" },
          ].map((f) => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                filter === f.key ? "bg-gradient-gold text-primary-foreground shadow-glow-gold" : "glass"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {isLoading ? (
          <LoadingState variant="skeleton" rows={5} />
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : filtered.length === 0 ? (
          <EmptyState title="No quests here" description="When your teacher posts assignments, they'll appear here." />
        ) : (
          <div className="space-y-3">
            {filtered.map((a, i) => {
              const sc = statusConfig[a.status];
              const due = a.due_date ? new Date(a.due_date).toLocaleDateString() : "No due date";
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className={`glass rounded-xl p-4 flex items-center gap-4 ${
                    a.status === "overdue" ? "ring-1 ring-destructive/50" :
                    a.status === "pending" ? "ring-1 ring-primary/30" : ""
                  }`}
                >
                  <div className="text-2xl">📜</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{a.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Due: {due}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${sc.bg} ${sc.color}`}>{sc.label}</span>
                    <div className="text-xs font-bold text-primary mt-1">
                      {a.status === "graded" && a.score != null ? `${a.score}/${a.total_marks}` : `+${a.total_marks} XP`}
                    </div>
                  </div>
                  <button
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      a.status === "pending" || a.status === "overdue"
                        ? "bg-gradient-gold text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                    aria-label={a.status === "pending" || a.status === "overdue" ? "Submit" : "View"}
                  >
                    {a.status === "pending" || a.status === "overdue" ? <Upload className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function StudentAssignments() {
  return (
    <StudentPageShell>
      <AssignmentsPage />
    </StudentPageShell>
  );
}
