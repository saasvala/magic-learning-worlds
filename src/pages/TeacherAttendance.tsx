import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, XCircle, Clock, Users, Search } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useState } from "react";

const students = [
  { name: "Maria Santos", id: "S001", status: "present" },
  { name: "Juan Dela Cruz", id: "S002", status: "present" },
  { name: "Bea Reyes", id: "S003", status: "present" },
  { name: "Carlos Garcia", id: "S004", status: "late" },
  { name: "Ana Lopez", id: "S005", status: "absent" },
  { name: "Diego Rivera", id: "S006", status: "present" },
  { name: "Luna Cruz", id: "S007", status: "present" },
  { name: "Marco Tan", id: "S008", status: "present" },
  { name: "Sofia Ramos", id: "S009", status: "late" },
  { name: "Paolo Gomez", id: "S010", status: "present" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  present: { icon: CheckCircle2, color: "text-xp-green", bg: "bg-xp-green/20" },
  late: { icon: Clock, color: "text-streak-orange", bg: "bg-streak-orange/20" },
  absent: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
};

function AttendancePage() {
  const [records, setRecords] = useState(students);
  const present = records.filter(s => s.status === "present").length;
  const late = records.filter(s => s.status === "late").length;
  const absent = records.filter(s => s.status === "absent").length;

  const cycleStatus = (id: string) => {
    const order = ["present", "late", "absent"];
    setRecords(prev => prev.map(s => {
      if (s.id === id) {
        const next = order[(order.indexOf(s.status) + 1) % 3];
        return { ...s, status: next };
      }
      return s;
    }));
  };

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Attendance</h1>
              <p className="text-muted-foreground text-sm">Grade 5 - Section A • {new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-xl bg-gradient-gold text-primary-foreground text-sm font-medium shadow-glow-gold">
            Save Attendance
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-xp-green">{present}</div>
            <div className="text-xs text-muted-foreground">Present</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-streak-orange">{late}</div>
            <div className="text-xs text-muted-foreground">Late</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{absent}</div>
            <div className="text-xs text-muted-foreground">Absent</div>
          </div>
        </div>

        <div className="space-y-2">
          {records.map((s, i) => {
            const sc = statusConfig[s.status];
            const Icon = sc.icon;
            return (
              <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="glass rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{s.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.id}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => cycleStatus(s.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium ${sc.bg} ${sc.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="capitalize">{s.status}</span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherAttendance() {
  return (
    <TeacherPageShell>
      <AttendancePage />
    </TeacherPageShell>
  );
}
