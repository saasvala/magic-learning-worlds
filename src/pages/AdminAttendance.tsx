import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCardsSkeleton, TableSkeleton } from "@/components/states";

function AdminAttendancePage() {
  const today = new Date().toISOString().slice(0, 10);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-attendance-today", today],
    queryFn: async () => {
      const [attendanceRes, classesRes, studentsRes] = await Promise.all([
        supabase.from("attendance").select("status, class_id, student_id").eq("date", today),
        supabase.from("classes").select("id, name, grade"),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "student"),
      ]);
      if (attendanceRes.error) throw attendanceRes.error;
      if (classesRes.error) throw classesRes.error;

      const classMap = new Map(classesRes.data!.map(c => [c.id, c]));
      const byGrade = new Map<string, { present: number; total: number }>();
      for (const r of attendanceRes.data!) {
        const cls = classMap.get(r.class_id);
        const grade = cls?.grade ?? "Unknown";
        const cur = byGrade.get(grade) ?? { present: 0, total: 0 };
        cur.total += 1;
        if (r.status === "present") cur.present += 1;
        byGrade.set(grade, cur);
      }
      const grades = Array.from(byGrade.entries())
        .map(([grade, v]) => ({ grade, ...v, rate: v.total ? Math.round((v.present / v.total) * 100) : 0 }))
        .sort((a, b) => a.grade.localeCompare(b.grade));

      const totalPresent = grades.reduce((s, g) => s + g.present, 0);
      const totalMarked = grades.reduce((s, g) => s + g.total, 0);

      return { grades, totalPresent, totalMarked, totalStudents: studentsRes.count ?? 0 };
    },
  });

  const grades = data?.grades ?? [];
  const totalPresent = data?.totalPresent ?? 0;
  const totalMarked = data?.totalMarked ?? 0;
  const totalStudents = data?.totalStudents ?? 0;
  const overallRate = totalMarked ? Math.round((totalPresent / totalMarked) * 100) : 0;

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><CalendarCheck className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold">Attendance Overview</h1>
            <p className="text-muted-foreground text-sm">{new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
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
              <div className="glass rounded-xl p-5 text-center"><div className="text-2xl font-bold text-xp-green">{overallRate}%</div><div className="text-xs text-muted-foreground">Overall Rate</div></div>
              <div className="glass rounded-xl p-5 text-center"><div className="text-2xl font-bold">{totalPresent}</div><div className="text-xs text-muted-foreground">Present Today</div></div>
              <div className="glass rounded-xl p-5 text-center"><div className="text-2xl font-bold text-destructive">{Math.max(totalMarked - totalPresent, 0)}</div><div className="text-xs text-muted-foreground">Absent (marked)</div></div>
            </div>

            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold mb-4">Attendance by Grade</h3>
              {grades.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-6">
                  No attendance has been marked today{totalStudents ? ` for ${totalStudents} students.` : "."}
                </div>
              ) : (
                <div className="space-y-3">
                  {grades.map((g, i) => (
                    <motion.div key={g.grade} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{g.grade}</span>
                        <span className="text-xs text-muted-foreground">{g.present}/{g.total}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${g.rate}%` }} transition={{ duration: 0.6, delay: i * 0.08 }} className={`h-full rounded-full ${g.rate >= 93 ? "bg-xp-green" : g.rate >= 90 ? "bg-primary" : "bg-streak-orange"}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function AdminAttendance() {
  return (<AdminPageShell><AdminAttendancePage /></AdminPageShell>);
}
