import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { TableSkeleton } from "@/components/states";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  present: { icon: CheckCircle2, color: "text-xp-green", bg: "bg-xp-green/20" },
  late: { icon: Clock, color: "text-streak-orange", bg: "bg-streak-orange/20" },
  absent: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
};
const order = ["present", "late", "absent"];

function AttendancePage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const today = new Date().toISOString().slice(0, 10);
  const [classId, setClassId] = useState<string>("");
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const { data: classes } = useQuery({
    queryKey: ["teacher-attendance-classes", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("classes").select("id, name").eq("teacher_id", user!.id);
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => { if (!classId && classes && classes.length) setClassId(classes[0].id); }, [classes, classId]);

  const { data: students, isLoading } = useQuery({
    queryKey: ["class-students", classId],
    enabled: !!classId,
    queryFn: async () => {
      const { data: enrolls, error } = await supabase.from("class_enrollments").select("student_id").eq("class_id", classId);
      if (error) throw error;
      const ids = (enrolls ?? []).map(e => e.student_id);
      if (ids.length === 0) return [] as { id: string; full_name: string }[];
      const { data: profs } = await supabase.from("profiles").select("id, full_name").in("id", ids);
      return (profs ?? []) as { id: string; full_name: string }[];
    },
  });

  const { data: existing } = useQuery({
    queryKey: ["attendance-today", classId, today],
    enabled: !!classId,
    queryFn: async () => {
      const { data, error } = await supabase.from("attendance").select("student_id, status").eq("class_id", classId).eq("date", today);
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    if (!students) return;
    const next: Record<string, string> = {};
    students.forEach(s => { next[s.id] = "present"; });
    (existing ?? []).forEach(r => { next[r.student_id] = r.status; });
    setStatuses(next);
  }, [students, existing]);

  const counts = useMemo(() => {
    const arr = Object.values(statuses);
    return {
      present: arr.filter(s => s === "present").length,
      late: arr.filter(s => s === "late").length,
      absent: arr.filter(s => s === "absent").length,
    };
  }, [statuses]);

  const cycle = (id: string) => {
    setStatuses(prev => ({ ...prev, [id]: order[(order.indexOf(prev[id] ?? "present") + 1) % 3] }));
  };

  const save = useMutation({
    mutationFn: async () => {
      if (!user || !classId) throw new Error("Missing class");
      const rows = Object.entries(statuses).map(([student_id, status]) => ({
        student_id, class_id: classId, date: today, status, marked_by: user.id,
      }));
      // Delete existing for today, then insert (no unique constraint guaranteed)
      await supabase.from("attendance").delete().eq("class_id", classId).eq("date", today);
      const { error } = await supabase.from("attendance").insert(rows);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Attendance saved", description: `${Object.keys(statuses).length} students recorded.` });
      qc.invalidateQueries({ queryKey: ["attendance-today", classId, today] });
    },
    onError: (e: any) => toast({ title: "Failed to save", description: e.message, variant: "destructive" }),
  });

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center"><CalendarCheck className="w-5 h-5 text-primary-foreground" /></div>
            <div>
              <h1 className="text-2xl font-bold">Attendance</h1>
              <p className="text-muted-foreground text-sm">{new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Select class" /></SelectTrigger>
              <SelectContent>
                {(classes ?? []).map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => save.mutate()}
              disabled={!classId || !students?.length || save.isPending}
              className="px-4 py-2 rounded-xl bg-gradient-gold text-primary-foreground text-sm font-medium shadow-glow-gold disabled:opacity-60 flex items-center gap-2"
            >
              {save.isPending && <Loader2 className="w-3 h-3 animate-spin" />}
              Save Attendance
            </motion.button>
          </div>
        </div>

        {!classes?.length ? (
          <div className="glass rounded-xl p-10 text-center text-muted-foreground text-sm">You have no classes assigned yet.</div>
        ) : isLoading ? (
          <TableSkeleton rows={6} />
        ) : !students?.length ? (
          <div className="glass rounded-xl p-10 text-center text-muted-foreground text-sm">No students enrolled in this class.</div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">{counts.present}</div><div className="text-xs text-muted-foreground">Present</div></div>
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-streak-orange">{counts.late}</div><div className="text-xs text-muted-foreground">Late</div></div>
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-destructive">{counts.absent}</div><div className="text-xs text-muted-foreground">Absent</div></div>
            </div>

            <div className="space-y-2">
              {students.map((s, i) => {
                const cur = statuses[s.id] ?? "present";
                const sc = statusConfig[cur];
                const Icon = sc.icon;
                return (
                  <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="glass rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{s.full_name?.[0] ?? "?"}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{s.full_name || "Unnamed"}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => cycle(s.id)}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium ${sc.bg} ${sc.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="capitalize">{cur}</span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function TeacherAttendance() {
  return (<TeacherPageShell><AttendancePage /></TeacherPageShell>);
}
