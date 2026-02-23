import { motion } from "framer-motion";
import {
  Users, BarChart3, Clock, AlertTriangle,
  Plus, CheckCircle2, XCircle, FileText, TrendingUp, CalendarCheck
} from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useAuth } from "@/contexts/AuthContext";

const classPerformance = [
  { name: "Grade 5 - Section A", students: 42, avgScore: 85, trend: "+3%" },
  { name: "Grade 5 - Section B", students: 38, avgScore: 78, trend: "+1%" },
  { name: "Grade 4 - Section A", students: 40, avgScore: 82, trend: "+5%" },
];

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

const recentSubmissions = [
  { student: "Ana M.", assignment: "Math Worksheet 7", status: "submitted", time: "10m ago" },
  { student: "Carlos R.", assignment: "Science Report", status: "late", time: "2h ago" },
  { student: "Bea L.", assignment: "English Essay", status: "submitted", time: "3h ago" },
  { student: "Diego S.", assignment: "Math Worksheet 7", status: "submitted", time: "5h ago" },
];

function TeacherHome() {
  const { profile } = useAuth();

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Good Morning, <span className="text-gradient-gold">{profile?.full_name || "Teacher"}!</span></h1>
        <p className="text-muted-foreground text-sm mb-6">Here's your overview for today.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Students", value: "120", icon: Users, color: "text-magic-blue" },
            { label: "Pending Tasks", value: "4", icon: Clock, color: "text-streak-orange" },
            { label: "Avg. Performance", value: "82%", icon: TrendingUp, color: "text-xp-green" },
            { label: "Attendance Today", value: "96%", icon: CalendarCheck, color: "text-primary" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> Class Performance</h3>
            <div className="space-y-3">
              {classPerformance.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.students} students</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{c.avgScore}%</div>
                    <div className="text-xs text-xp-green">{c.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-streak-orange" /> Pending Tasks</h3>
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
            <h3 className="font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-streak-orange" /> Weak Topic Alerts</h3>
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
              {recentSubmissions.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{s.student[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{s.student} — {s.assignment}</div>
                    <div className="text-xs text-muted-foreground">{s.time}</div>
                  </div>
                  {s.status === "submitted" ? <CheckCircle2 className="w-4 h-4 text-xp-green shrink-0" /> : <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.button whileHover={{ scale: 1.03 }} className="mt-6 flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-magic text-secondary-foreground font-semibold shadow-glow-purple">
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
