import { motion } from "framer-motion";
import { Users, Eye, Search, TrendingUp } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState, EmptyState, ErrorState } from "@/components/states";

function ClassesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    enabled: !!user?.id,
    queryKey: ["teacher-classes", user?.id],
    queryFn: async () => {
      const { data: classes, error: cErr } = await supabase
        .from("classes")
        .select("id, name, section, grade")
        .eq("teacher_id", user!.id);
      if (cErr) throw cErr;
      const classIds = (classes || []).map((c) => c.id);
      if (classIds.length === 0) return { classes: [], counts: {} as Record<string, number>, students: [] };

      const { data: enrollments } = await supabase
        .from("class_enrollments")
        .select("class_id, student_id")
        .in("class_id", classIds);

      const counts: Record<string, number> = {};
      (enrollments || []).forEach((e) => {
        counts[e.class_id] = (counts[e.class_id] || 0) + 1;
      });

      const studentIds = [...new Set((enrollments || []).map((e) => e.student_id))];
      let students: any[] = [];
      if (studentIds.length) {
        const { data: profs } = await supabase
          .from("profiles")
          .select("id, full_name, xp_total, level, daily_streak, grade")
          .in("id", studentIds)
          .order("xp_total", { ascending: false })
          .limit(20);
        students = profs || [];
      }
      return { classes: classes || [], counts, students };
    },
  });

  if (isLoading) return <div className="p-6"><LoadingState message="Loading your classes..." /></div>;
  if (error) return <div className="p-6"><ErrorState onRetry={() => refetch()} /></div>;

  const classes = data?.classes ?? [];
  const counts = data?.counts ?? {};
  const students = (data?.students ?? []).filter((s) =>
    !search || s.full_name?.toLowerCase().includes(search.toLowerCase())
  );
  const totalStudents = Object.values(counts).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-magic flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Classes</h1>
              <p className="text-muted-foreground text-sm">{classes.length} classes • {totalStudents} students</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-1 focus:ring-primary w-48" />
          </div>
        </div>

        {classes.length === 0 ? (
          <EmptyState title="No classes assigned" description="Once an admin assigns you to a class, it will appear here." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {classes.map((c, i) => {
              const count = counts[c.id] || 0;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="glass rounded-xl p-5 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">{c.name}</h3>
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {c.section ? `Section ${c.section} • ` : ""}{count} student{count === 1 ? "" : "s"}
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{c.grade}</div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-streak-orange" /> Top Students</h3>
          {students.length === 0 ? (
            <EmptyState title="No students yet" description="Students enrolled in your classes will appear here." />
          ) : (
            <div className="space-y-2">
              {students.slice(0, 8).map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{s.full_name?.[0] ?? "?"}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{s.full_name || "Unnamed student"}</div>
                    <div className="text-xs text-muted-foreground">{s.grade ?? "—"} • 🔥 {s.daily_streak ?? 0} day streak</div>
                  </div>
                  <span className="text-xs font-bold text-primary">Lv {s.level ?? 1}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{s.xp_total ?? 0} XP</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherClasses() {
  return (
    <TeacherPageShell>
      <ClassesPage />
    </TeacherPageShell>
  );
}
