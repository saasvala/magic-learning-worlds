import { motion } from "framer-motion";
import { FileText, CheckCircle2, Calendar } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCardsSkeleton, TableSkeleton } from "@/components/states";

interface Exam {
  id: string;
  title: string;
  exam_type: string;
  is_published: boolean;
  starts_at: string | null;
  ends_at: string | null;
  total_marks: number;
  duration_minutes: number;
}

function AdminExamsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-exams"],
    queryFn: async () => {
      const { data, error } = await supabase.from("exams").select("id, title, exam_type, is_published, starts_at, ends_at, total_marks, duration_minutes").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Exam[];
    },
  });

  const exams = data ?? [];
  const now = Date.now();
  const counts = {
    scheduled: exams.filter(e => e.is_published && (!e.starts_at || new Date(e.starts_at).getTime() > now)).length,
    completed: exams.filter(e => e.ends_at && new Date(e.ends_at).getTime() < now).length,
    drafts: exams.filter(e => !e.is_published).length,
  };

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><FileText className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold">Exam Management</h1>
            <p className="text-muted-foreground text-sm">View and monitor school examinations</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <StatCardsSkeleton count={3} />
            <TableSkeleton rows={5} />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-primary">{counts.scheduled}</div><div className="text-xs text-muted-foreground">Scheduled</div></div>
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">{counts.completed}</div><div className="text-xs text-muted-foreground">Completed</div></div>
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-muted-foreground">{counts.drafts}</div><div className="text-xs text-muted-foreground">Drafts</div></div>
            </div>

            {exams.length === 0 ? (
              <div className="glass rounded-xl p-10 text-center text-muted-foreground text-sm">No exams created yet. Teachers can create exams from their Quiz Builder.</div>
            ) : (
              <div className="space-y-3">
                {exams.map((e, i) => {
                  const completed = e.ends_at && new Date(e.ends_at).getTime() < now;
                  const scheduled = e.is_published && !completed;
                  const status = completed ? "completed" : scheduled ? "scheduled" : "draft";
                  return (
                    <motion.div key={e.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.01 }} className="glass rounded-xl p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status === "completed" ? "bg-xp-green/20" : status === "scheduled" ? "bg-primary/20" : "bg-muted"}`}>
                        {status === "completed" ? <CheckCircle2 className="w-5 h-5 text-xp-green" /> : status === "scheduled" ? <Calendar className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-muted-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{e.title}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {e.exam_type.replace(/_/g, " ")} • {e.duration_minutes}m • {e.total_marks} marks
                          {e.starts_at && ` • ${new Date(e.starts_at).toLocaleDateString()}`}
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${status === "completed" ? "bg-xp-green/20 text-xp-green" : status === "scheduled" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>{status}</span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function AdminExams() {
  return (<AdminPageShell><AdminExamsPage /></AdminPageShell>);
}
