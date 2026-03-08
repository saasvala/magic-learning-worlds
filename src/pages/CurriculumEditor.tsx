import { motion } from "framer-motion";
import { AdminPageShell } from "@/components/AdminPageShell";
import { BookOpen, ChevronRight, GripVertical, Plus, Edit, Film, Gamepad2 } from "lucide-react";

const curriculum = [
  { grade: "Grade 7", subjects: [
    { name: "Mathematics", emoji: "📐", chapters: [
      { title: "Sets & Numbers", lessons: 8, topics: 24, media: 12, status: "complete" },
      { title: "Algebra Basics", lessons: 10, topics: 30, media: 15, status: "complete" },
      { title: "Geometry", lessons: 7, topics: 21, media: 8, status: "in_progress" },
    ]},
    { name: "Science", emoji: "🔬", chapters: [
      { title: "Matter & Energy", lessons: 9, topics: 27, media: 18, status: "complete" },
      { title: "Living Things", lessons: 11, topics: 33, media: 20, status: "complete" },
      { title: "Earth & Space", lessons: 6, topics: 18, media: 5, status: "draft" },
    ]},
  ]},
  { grade: "Grade 8", subjects: [
    { name: "Mathematics", emoji: "📐", chapters: [
      { title: "Linear Equations", lessons: 8, topics: 24, media: 10, status: "complete" },
      { title: "Polynomials", lessons: 7, topics: 21, media: 7, status: "in_progress" },
    ]},
    { name: "Filipino", emoji: "🇵🇭", chapters: [
      { title: "Panitikan", lessons: 10, topics: 30, media: 12, status: "complete" },
      { title: "Gramatika", lessons: 8, topics: 24, media: 6, status: "draft" },
    ]},
  ]},
];

function CurriculumEditorPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center"><BookOpen className="w-5 h-5 text-secondary" /></div>
            <div><h1 className="text-2xl font-bold">📖 Curriculum Forge</h1><p className="text-sm text-muted-foreground">Grade → Subject → Chapter → Topic → Lesson</p></div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"><Plus className="w-4 h-4" />Add Chapter</motion.button>
        </div>

        {curriculum.map((g, gi) => (
          <motion.div key={g.grade} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.1 }} className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{g.grade.split(' ')[1]}</span>
              {g.grade}
            </h2>
            {g.subjects.map((s, si) => (
              <div key={s.name} className="mb-4">
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <span>{s.emoji}</span> {s.name}
                </div>
                <div className="space-y-2 pl-4">
                  {s.chapters.map((ch, ci) => (
                    <motion.div key={ch.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + ci * 0.03 }} className="glass rounded-xl p-3 flex items-center gap-3 hover:border-primary/20 border border-transparent transition-all cursor-pointer group">
                      <GripVertical className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{ch.title}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                          <span>{ch.lessons} lessons</span>•
                          <span>{ch.topics} topics</span>•
                          <span className="inline-flex items-center gap-1"><Film className="w-3 h-3" />{ch.media} media</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        ch.status === "complete" ? "bg-xp-green/20 text-xp-green" : ch.status === "in_progress" ? "bg-streak-orange/20 text-streak-orange" : "bg-muted text-muted-foreground"
                      }`}>{ch.status === "in_progress" ? "In Progress" : ch.status === "complete" ? "Complete" : "Draft"}</span>
                      <Edit className="w-4 h-4 text-muted-foreground/50 hover:text-primary transition-colors" />
                      <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function CurriculumEditor() {
  return <AdminPageShell><CurriculumEditorPage /></AdminPageShell>;
}
