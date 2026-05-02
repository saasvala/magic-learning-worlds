import { motion } from "framer-motion";
import {
  Users, BarChart3, Clock, AlertTriangle,
  Plus, CheckCircle2, XCircle, FileText, TrendingUp, CalendarCheck
} from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { DemoBadge } from "@/components/states/DemoBadge";
import { useNavigate } from "react-router-dom";

const pendingTasks = [
  { title: "Grade assignments for Ch. 4 Quiz", due: "Today", urgent: true },
  { title: "Upload Science lesson video", due: "Tomorrow", urgent: false },
  { title: "Review exam questions for Q2", due: "In 3 days", urgent: false },
  { title: "Submit attendance report", due: "Today", urgent: true },
];

const weakTopics = [
  { topic: "Fractions", subject: "Math", class: "Grade 5-A", score: 62 },
  { topic: "Grammar", subject: "English", class: "Grade 5-B", score: 65 },
  { topic: "Ecosystems", subject: "Science", class: "Grade 4-A", score: 68 },
];

function useTeacherStats(teacherId: string | undefined) {
  return useQuery({
    enabled: !!teacherId,
    queryKey: ["teacher-dashboard-stats", teacherId],
    queryFn: async () => {
      const today = new Date().toISOString().slice(0, 10);

      // Teacher's classes
      const { data: classesData } = await supabase
        .from("classes")
        .select("id, name")
        .eq("teacher_id", teacherId!);

      const classIds = (classesData || []).map((c: any) => c.id);

      // Students enrolled in those classes
      let studentCount = 0;
      if (classIds.length) {
        const { count } = await supabase
          .from("class_enrollments")
          .select("student_id", { count: "exact", head: true })
          .in("class_id", classIds);
        studentCount = count ?? 0;
      }

      // Today's attendance for those classes
      let attendancePct: number | null = null;
      if (classIds.length) {
        const { data: att } = await supabase
          .from("attendance")
          .select("status")
          .eq("date", today)
          .in("class_id", classIds);
        const total = (att || []).length;
        const present = (att || []).filter((r: any) => r.status === "present").length;
        attendancePct = total > 0 ? Math.round((present / total) * 100) : null;
      }

      // Pending submissions
      let pendingCount = 0;
      if (classIds.length) {
        const { data: assignments } = await supabase
          .from("assignments")
          .select("id")
          .in("class_id", classIds);
        const aIds = (assignments || []).map((a: any) => a.id);
        if (aIds.length) {
          const { count } = await supabase
            .from("assignment_submissions")
            .select("id", { count: "exact", head: true })
            .in("assignment_id", aIds)
            .eq("status", "pending");
          pendingCount = count ?? 0;
        }
      }

      // Recent submissions
      let recentSubmissions: Array<{ student: string; assignment: string; status: string; time: string }> = [];
      if (classIds.length) {
        const { data: assignments } = await supabase
          .from("assignments")
          .select("id, title")
          .in("class_id", classIds);
        const aIds = (assignments || []).map((a: any) => a.id);
        const aMap = Object.fromEntries((assignments || []).map((a: any) => [a.id, a.title]));
        if (aIds.length) {
          const { data: subs } = await supabase
            .from("assignment_submissions")
            .select("id, assignment_id, student_id, status, submitted_at")
            .in("assignment_id", aIds)
            .order("submitted_at", { ascending: false })
            .limit(5);
          const sIds = Array.from(new Set((subs || []).map((s: any) => s.student_id)));
          let nameMap: Record<string, string> = {};
          if (sIds.length) {
            const { data: profs } = await supabase
              .from("profiles")
              .select("id, full_name")
              .in("id", sIds);
            nameMap = Object.fromEntries((profs || []).map((p: any) => [p.id, p.full_name]));
          }
          recentSubmissions = (subs || []).map((s: any) => ({
            student: nameMap[s.student_id] || "Student",
            assignment: aMap[s.assignment_id] || "Assignment",
            status: s.status,
            time: s.submitted_at ? new Date(s.submitted_at).toLocaleString() : "",
          }));
        }
      }

      return {
        classCount: classIds.length,
        studentCount,
        attendancePct,
        pendingCount,
        recentSubmissions,
        classes: classesData || [],
      };
    },
  });
}

function StatCard({
  label, value, icon: Icon, color, loading,
}: { label: string; value: string | number; icon: any; color: string; loading?: boolean }) {
  return (
    <div className="glass rounded-xl p-5">
      <Icon className={`w-5 h-5 ${color} mb-2`} />
      {loading ? <Skeleton className="h-7 w-16 mb-1" /> : <div className="text-2xl font-bold">{value}</div>}
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function TeacherHome() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useTeacherStats(profile?.id);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Good Morning, <span className="text-gradient-gold">{profile?.full_name || "Teacher"}!</span></h1>
        <p className="text-muted-foreground text-sm mb-6">Here's your overview for today.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Students" value={data?.studentCount ?? 0} icon={Users} color="text-magic-blue" loading={isLoading} />
          <StatCard label="Pending Tasks" value={data?.pendingCount ?? 0} icon={Clock} color="text-streak-orange" loading={isLoading} />
          <StatCard label="Avg. Performance" value="—" icon={TrendingUp} color="text-xp-green" />
          <StatCard
            label="Attendance Today"
            value={data?.attendancePct != null ? `${data.attendancePct}%` : "—"}
            icon={CalendarCheck}
            color="text-primary"
            loading={isLoading}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> My Classes</h3>
            <div className="space-y-3">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full rounded-lg" />)
              ) : (data?.classes || []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No classes assigned yet.</p>
              ) : (
                data!.classes.map((c: any) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{c.name}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-streak-orange" /> Pending Tasks</h3>
              <DemoBadge />
            </div>
            <div className="space-y-2">
              {pendingTasks.map((t, i) => (
                <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg ${t.urgent ? "bg-destructive/10" : "bg-muted/30"}`}>
                  <div className={`w-2 h-2 rounded-full ${t.urgent ? "bg-destructive" : "bg-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.due}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-streak-orange" /> Weak Topic Alerts</h3>
              <DemoBadge />
            </div>
            <div className="space-y-2">
              {weakTopics.map((t) => (
                <div key={t.topic} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{t.topic}</div>
                    <div className="text-xs text-muted-foreground">{t.subject} • {t.class}</div>
                  </div>
                  <span className="text-sm font-bold text-streak-orange">{t.score}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-magic-blue" /> Recent Submissions</h3>
            <div className="space-y-2">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)
              ) : (data?.recentSubmissions || []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No submissions yet.</p>
              ) : (
                data!.recentSubmissions.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{s.student[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{s.student} — {s.assignment}</div>
                      <div className="text-xs text-muted-foreground">{s.time}</div>
                    </div>
                    {s.status !== "pending" ? <CheckCircle2 className="w-4 h-4 text-xp-green shrink-0" /> : <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={() => navigate("/teacher/quiz-builder")}
          className="mt-6 flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-magic text-secondary-foreground font-semibold shadow-glow-purple"
        >
          <Plus className="w-4 h-4" /> Quick Create Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function TeacherDashboard() {
  return (
    <TeacherPageShell>
      <TeacherHome />
    </TeacherPageShell>
  );
}
