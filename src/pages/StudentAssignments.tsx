import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle2, AlertTriangle, Upload, Eye, Filter } from "lucide-react";
import { StudentPageShell } from "@/components/StudentPageShell";
import { useState } from "react";

const assignments = [
  { id: 1, title: "Essay: Philippine Heroes", subject: "Filipino", due: "Mar 3, 2026", status: "pending", points: 100, emoji: "🇵🇭" },
  { id: 2, title: "Math Worksheet: Fractions", subject: "Mathematics", due: "Mar 5, 2026", status: "pending", points: 50, emoji: "🔢" },
  { id: 3, title: "Science Lab Report: Photosynthesis", subject: "Science", due: "Mar 1, 2026", status: "overdue", points: 75, emoji: "🔬" },
  { id: 4, title: "English Book Report: Noli Me Tangere", subject: "English", due: "Feb 28, 2026", status: "submitted", points: 100, emoji: "📖" },
  { id: 5, title: "Art Portfolio: Watercolor Landscape", subject: "MAPEH", due: "Feb 25, 2026", status: "graded", points: 80, score: 72, emoji: "🎵" },
  { id: 6, title: "History Timeline: EDSA Revolution", subject: "Araling Panlipunan", due: "Feb 20, 2026", status: "graded", points: 60, score: 55, emoji: "🌏" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "⏳ Pending", color: "text-primary", bg: "bg-primary/10" },
  overdue: { label: "🔥 Overdue!", color: "text-destructive", bg: "bg-destructive/10" },
  submitted: { label: "📤 Submitted", color: "text-magic-blue", bg: "bg-magic-blue/10" },
  graded: { label: "✅ Graded", color: "text-xp-green", bg: "bg-xp-green/10" },
};

function AssignmentsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? assignments : assignments.filter(a => a.status === filter);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              Quest Board
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Complete assignments to earn XP and level up!</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{assignments.filter(a => a.status === "pending").length} active quests</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: "all", label: "All Quests" },
            { key: "pending", label: "⏳ Active" },
            { key: "overdue", label: "🔥 Overdue" },
            { key: "submitted", label: "📤 Sent" },
            { key: "graded", label: "✅ Graded" },
          ].map(f => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                filter === f.key ? "bg-gradient-gold text-primary-foreground shadow-glow-gold" : "glass"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((a, i) => {
            const sc = statusConfig[a.status];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className={`glass rounded-xl p-4 flex items-center gap-4 ${
                  a.status === "overdue" ? "ring-1 ring-destructive/50" :
                  a.status === "pending" ? "ring-1 ring-primary/30" : ""
                }`}
              >
                <div className="text-2xl">{a.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.subject} • Due: {a.due}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${sc.bg} ${sc.color}`}>
                    {sc.label}
                  </span>
                  <div className="text-xs font-bold text-primary mt-1">
                    {a.status === "graded" ? `${a.score}/${a.points}` : `+${a.points} XP`}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    a.status === "pending" || a.status === "overdue"
                      ? "bg-gradient-gold text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {a.status === "pending" || a.status === "overdue" ? <Upload className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function StudentAssignments() {
  return (
    <StudentPageShell>
      <AssignmentsPage />
    </StudentPageShell>
  );
}
