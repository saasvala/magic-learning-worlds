import { motion } from "framer-motion";
import { Users, BarChart3, Eye, Plus, Search, TrendingUp, BookOpen } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useState } from "react";

const classes = [
  { id: 1, name: "Grade 5 - Section A", grade: "g5", students: 42, avgMastery: 85, subjects: ["English", "Math", "Science"], topStudent: "Maria S.", section: "Sampaguita" },
  { id: 2, name: "Grade 5 - Section B", grade: "g5", students: 38, avgMastery: 78, subjects: ["English", "Math", "Science"], topStudent: "Juan D.", section: "Rosal" },
  { id: 3, name: "Grade 4 - Section A", grade: "g4", students: 40, avgMastery: 82, subjects: ["Filipino", "AP", "MAPEH"], topStudent: "Bea R.", section: "Narra" },
];

const recentStudents = [
  { name: "Maria Santos", grade: "G5-A", mastery: 92, streak: 15, status: "active" },
  { name: "Juan Dela Cruz", grade: "G5-A", mastery: 88, streak: 10, status: "active" },
  { name: "Carlos Garcia", grade: "G5-B", mastery: 65, streak: 3, status: "struggling" },
  { name: "Ana Lopez", grade: "G4-A", mastery: 45, streak: 0, status: "inactive" },
];

function ClassesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-magic flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Classes</h1>
              <p className="text-muted-foreground text-sm">{classes.length} classes • {classes.reduce((s, c) => s + c.students, 0)} students</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-1 focus:ring-primary w-48" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {classes.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="glass rounded-xl p-5 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{c.name}</h3>
                <Eye className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-xs text-muted-foreground mb-3">Section {c.section} • {c.students} students</div>
              <div className="flex flex-wrap gap-1 mb-3">
                {c.subjects.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Avg. Mastery</div>
                  <div className={`text-lg font-bold ${c.avgMastery >= 80 ? "text-xp-green" : "text-streak-orange"}`}>{c.avgMastery}%</div>
                </div>
                <div className="h-1.5 flex-1 mx-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${c.avgMastery}%` }} />
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground mt-2">⭐ Top: {c.topStudent}</div>
            </motion.div>
          ))}
        </div>

        {/* Student Alerts */}
        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-streak-orange" /> Student Alerts</h3>
          <div className="space-y-2">
            {recentStudents.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{s.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.grade} • 🔥 {s.streak} day streak</div>
                </div>
                <span className={`text-xs font-bold ${s.mastery >= 80 ? "text-xp-green" : s.mastery >= 60 ? "text-primary" : "text-destructive"}`}>{s.mastery}%</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  s.status === "active" ? "bg-xp-green/20 text-xp-green" :
                  s.status === "struggling" ? "bg-streak-orange/20 text-streak-orange" : "bg-destructive/20 text-destructive"
                }`}>{s.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherClasses() {
  return (
    <TeacherPageShell>
      <ClassesPage />
    </TeacherPageShell>
  );
}
