import { motion } from "framer-motion";
import { FileText, Plus, CheckCircle2, Clock, XCircle, Eye, BarChart3 } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";

const assignments = [
  { id: 1, title: "Math Worksheet: Fractions", class: "Grade 5-A", due: "Mar 5", submitted: 35, total: 42, graded: 28, status: "active" },
  { id: 2, title: "English Essay: My Hero", class: "Grade 5-B", due: "Mar 3", submitted: 38, total: 38, graded: 38, status: "completed" },
  { id: 3, title: "Science Lab Report", class: "Grade 5-A", due: "Mar 8", submitted: 10, total: 42, graded: 0, status: "active" },
  { id: 4, title: "Filipino Talambuhay", class: "Grade 4-A", due: "Mar 10", submitted: 0, total: 40, graded: 0, status: "upcoming" },
  { id: 5, title: "AP Timeline Project", class: "Grade 4-A", due: "Feb 28", submitted: 36, total: 40, graded: 36, status: "completed" },
];

function AssignmentsPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Assignments</h1>
              <p className="text-muted-foreground text-sm">Create, track, and grade student assignments</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-magic text-secondary-foreground text-sm font-medium">
            <Plus className="w-4 h-4" /> New Assignment
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Active", value: assignments.filter(a => a.status === "active").length, color: "text-primary" },
            { label: "Needs Grading", value: assignments.reduce((s, a) => s + (a.submitted - a.graded), 0), color: "text-streak-orange" },
            { label: "Completed", value: assignments.filter(a => a.status === "completed").length, color: "text-xp-green" },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {assignments.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.01 }} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                a.status === "completed" ? "bg-xp-green/20" : a.status === "active" ? "bg-primary/20" : "bg-muted"
              }`}>
                {a.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-xp-green" /> :
                 a.status === "active" ? <Clock className="w-5 h-5 text-primary" /> :
                 <FileText className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.class} • Due: {a.due}</div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <div className="text-sm font-bold">{a.submitted}/{a.total}</div>
                  <div className="text-[10px] text-muted-foreground">Submitted</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${a.submitted - a.graded > 0 ? "text-streak-orange" : "text-xp-green"}`}>{a.graded}</div>
                  <div className="text-[10px] text-muted-foreground">Graded</div>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherAssignments() {
  return (
    <TeacherPageShell>
      <AssignmentsPage />
    </TeacherPageShell>
  );
}
