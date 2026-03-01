import { motion } from "framer-motion";
import { CalendarCheck, Users, BarChart3, TrendingUp } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";

const gradeAttendance = [
  { grade: "Grade 1", present: 95, total: 120, rate: 96 },
  { grade: "Grade 2", present: 88, total: 95, rate: 93 },
  { grade: "Grade 3", present: 102, total: 110, rate: 93 },
  { grade: "Grade 4", present: 95, total: 105, rate: 90 },
  { grade: "Grade 5", present: 112, total: 120, rate: 93 },
  { grade: "Grade 6", present: 85, total: 98, rate: 87 },
  { grade: "Grade 7", present: 130, total: 145, rate: 90 },
  { grade: "Grade 8", present: 118, total: 135, rate: 87 },
];

function AdminAttendancePage() {
  const totalPresent = gradeAttendance.reduce((s, g) => s + g.present, 0);
  const totalStudents = gradeAttendance.reduce((s, g) => s + g.total, 0);

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

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-5 text-center"><div className="text-2xl font-bold text-xp-green">{Math.round((totalPresent / totalStudents) * 100)}%</div><div className="text-xs text-muted-foreground">Overall Rate</div></div>
          <div className="glass rounded-xl p-5 text-center"><div className="text-2xl font-bold">{totalPresent}</div><div className="text-xs text-muted-foreground">Present Today</div></div>
          <div className="glass rounded-xl p-5 text-center"><div className="text-2xl font-bold text-destructive">{totalStudents - totalPresent}</div><div className="text-xs text-muted-foreground">Absent</div></div>
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Attendance by Grade</h3>
          <div className="space-y-3">
            {gradeAttendance.map((g, i) => (
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
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminAttendance() {
  return (<AdminPageShell><AdminAttendancePage /></AdminPageShell>);
}
