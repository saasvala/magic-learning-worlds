import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { CalendarCheck, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { useParentAttendance } from "@/hooks/useParentData";

const statusIcon = (s: string) =>
  s === "present" ? <CheckCircle2 className="w-4 h-4 text-xp-green" /> :
  s === "absent" ? <XCircle className="w-4 h-4 text-destructive" /> :
  <Clock className="w-4 h-4 text-streak-orange" />;

function AttendancePage() {
  const { attendance, children, loading } = useParentAttendance();

  if (loading) {
    return <div className="p-6 flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const childMap = Object.fromEntries(children.map(c => [c.id, c.full_name]));

  // Compute stats per child
  const stats = children.map(child => {
    const records = attendance.filter(a => a.student_id === child.id);
    const present = records.filter(r => r.status === "present").length;
    const absent = records.filter(r => r.status === "absent").length;
    const late = records.filter(r => r.status === "late").length;
    const total = records.length || 1;
    return { name: child.full_name, rate: `${Math.round((present / total) * 100)}%`, present, absent, late };
  });

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-xp-green/20 flex items-center justify-center"><CalendarCheck className="w-5 h-5 text-xp-green" /></div>
          <div><h1 className="text-2xl font-bold">📋 Attendance Monitor</h1><p className="text-sm text-muted-foreground">Daily presence tracking for your children</p></div>
        </div>

        {children.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center text-muted-foreground">No children linked yet.</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {stats.map((c, i) => (
                <motion.div key={c.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-4">
                  <div className="font-bold mb-2">{c.name}</div>
                  <div className="text-3xl font-bold text-xp-green mb-2">{c.rate}</div>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span className="text-xp-green">✓ {c.present}</span>
                    <span className="text-destructive">✗ {c.absent}</span>
                    <span className="text-streak-orange">⏱ {c.late}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 gap-0 text-xs font-medium text-muted-foreground p-3 border-b border-border/50">
                <span>Date</span><span>Child</span><span className="text-center">Status</span>
              </div>
              {attendance.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No attendance records found.</div>
              ) : (
                attendance.map((d, i) => (
                  <motion.div key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="grid grid-cols-3 gap-0 p-3 border-b border-border/30 last:border-0">
                    <span className="text-sm">{new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span className="text-sm">{childMap[d.student_id] || "—"}</span>
                    <span className="flex justify-center">{statusIcon(d.status)}</span>
                  </motion.div>
                ))
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function ParentAttendance() {
  return <ParentPageShell><AttendancePage /></ParentPageShell>;
}
