import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { CalendarCheck, CheckCircle2, XCircle, Clock } from "lucide-react";

const attendanceData = [
  { date: "Mar 7", maria: "present", juan: "present" },
  { date: "Mar 6", maria: "present", juan: "present" },
  { date: "Mar 5", maria: "present", juan: "late" },
  { date: "Mar 4", maria: "absent", juan: "present" },
  { date: "Mar 3", maria: "present", juan: "present" },
  { date: "Feb 28", maria: "present", juan: "absent" },
  { date: "Feb 27", maria: "present", juan: "present" },
];

const statusIcon = (s: string) => s === "present" ? <CheckCircle2 className="w-4 h-4 text-xp-green" /> : s === "absent" ? <XCircle className="w-4 h-4 text-destructive" /> : <Clock className="w-4 h-4 text-streak-orange" />;

function AttendancePage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-xp-green/20 flex items-center justify-center"><CalendarCheck className="w-5 h-5 text-xp-green" /></div>
          <div><h1 className="text-2xl font-bold">📋 Attendance Monitor</h1><p className="text-sm text-muted-foreground">Daily presence tracking for your children</p></div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[{ name: "Maria Santos", rate: "96%", present: 48, absent: 2, late: 0 }, { name: "Juan Santos", rate: "94%", present: 47, absent: 1, late: 2 }].map((c, i) => (
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
            <span>Date</span><span className="text-center">Maria</span><span className="text-center">Juan</span>
          </div>
          {attendanceData.map((d, i) => (
            <motion.div key={d.date} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="grid grid-cols-3 gap-0 p-3 border-b border-border/30 last:border-0">
              <span className="text-sm">{d.date}</span>
              <span className="flex justify-center">{statusIcon(d.maria)}</span>
              <span className="flex justify-center">{statusIcon(d.juan)}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ParentAttendance() {
  return <ParentPageShell><AttendancePage /></ParentPageShell>;
}
