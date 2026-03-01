import { motion } from "framer-motion";
import { BarChart3, Download, FileText, TrendingUp, Users, GraduationCap } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";

const reportTypes = [
  { title: "Student Performance Report", desc: "Mastery levels, grades, and progress across all subjects", icon: TrendingUp, color: "text-xp-green", ready: true },
  { title: "Attendance Summary", desc: "Daily, weekly, and monthly attendance statistics", icon: Users, color: "text-magic-blue", ready: true },
  { title: "Teacher Evaluation Report", desc: "Class performance metrics and teaching effectiveness", icon: GraduationCap, color: "text-magic-purple", ready: true },
  { title: "Financial Summary", desc: "Fee collection, expenses, and financial health", icon: FileText, color: "text-primary", ready: false },
  { title: "Enrollment Report", desc: "Student enrollment trends and demographic data", icon: Users, color: "text-streak-orange", ready: false },
];

function AdminReportsPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground text-sm">Generate and download school reports</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.02, y: -3 }} className="glass rounded-xl p-5 flex flex-col">
              <r.icon className={`w-6 h-6 ${r.color} mb-3`} />
              <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground flex-1 mb-4">{r.desc}</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium ${
                r.ready ? "bg-gradient-gold text-primary-foreground" : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}>
                <Download className="w-3 h-3" /> {r.ready ? "Generate Report" : "Coming Soon"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminReports() {
  return (<AdminPageShell><AdminReportsPage /></AdminPageShell>);
}
