import { motion } from "framer-motion";
import { FileText, Plus, Clock, CheckCircle2, Calendar, BarChart3 } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";

const exams = [
  { id: 1, title: "Q1 Quarterly Exam - English", grades: "G5-G6", type: "quarterly_exam", date: "Mar 25", status: "scheduled", totalStudents: 240 },
  { id: 2, title: "Monthly Test - Mathematics", grades: "G3-G4", type: "monthly_test", date: "Mar 10", status: "scheduled", totalStudents: 180 },
  { id: 3, title: "Diagnostic Test - All Subjects", grades: "G1-G6", type: "diagnostic", date: "Feb 15", status: "completed", totalStudents: 500, avgScore: 76 },
  { id: 4, title: "Annual Exam - Science", grades: "G7-G10", type: "annual_exam", date: "Apr 20", status: "draft", totalStudents: 0 },
];

function AdminExamsPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><FileText className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold">Exam Management</h1>
              <p className="text-muted-foreground text-sm">Schedule and configure school examinations</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-gold text-primary-foreground text-sm font-medium">
            <Plus className="w-4 h-4" /> Schedule Exam
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-primary">2</div><div className="text-xs text-muted-foreground">Scheduled</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">1</div><div className="text-xs text-muted-foreground">Completed</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-muted-foreground">1</div><div className="text-xs text-muted-foreground">Drafts</div></div>
        </div>

        <div className="space-y-3">
          {exams.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.01 }} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                e.status === "completed" ? "bg-xp-green/20" : e.status === "scheduled" ? "bg-primary/20" : "bg-muted"
              }`}>
                {e.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-xp-green" /> :
                 e.status === "scheduled" ? <Calendar className="w-5 h-5 text-primary" /> :
                 <FileText className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{e.title}</div>
                <div className="text-xs text-muted-foreground">{e.grades} • {e.date}</div>
              </div>
              <div className="shrink-0 text-right">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  e.status === "completed" ? "bg-xp-green/20 text-xp-green" :
                  e.status === "scheduled" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>{e.status}</span>
                {e.avgScore && <div className="text-xs mt-1">Avg: <span className="font-bold text-primary">{e.avgScore}%</span></div>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminExams() {
  return (<AdminPageShell><AdminExamsPage /></AdminPageShell>);
}
