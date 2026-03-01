import { motion } from "framer-motion";
import { BookOpen, Play, FileText, Upload, Clock, Eye, Plus, Video, File } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useState } from "react";

const lessons = [
  { id: 1, title: "Introduction to Fractions", subject: "Math", chapter: "Ch. 4: Fractions", type: "video", duration: 12, views: 38, status: "published" },
  { id: 2, title: "Parts of Speech Overview", subject: "English", chapter: "Ch. 2: Grammar", type: "video", duration: 15, views: 42, status: "published" },
  { id: 3, title: "Photosynthesis Process", subject: "Science", chapter: "Ch. 6: Plants", type: "interactive", duration: 20, views: 35, status: "published" },
  { id: 4, title: "Comparing Fractions", subject: "Math", chapter: "Ch. 4: Fractions", type: "pdf", duration: 8, views: 0, status: "draft" },
  { id: 5, title: "Verb Tenses Practice", subject: "English", chapter: "Ch. 2: Grammar", type: "interactive", duration: 10, views: 0, status: "draft" },
  { id: 6, title: "Ecosystems & Habitats", subject: "Science", chapter: "Ch. 7: Ecology", type: "video", duration: 18, views: 0, status: "draft" },
];

const typeIcons: Record<string, typeof Video> = { video: Video, pdf: File, interactive: Play };

function LessonsPage() {
  const [tab, setTab] = useState<"published" | "draft">("published");
  const filtered = lessons.filter(l => l.status === tab);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Lesson Manager</h1>
              <p className="text-muted-foreground text-sm">{lessons.length} lessons across all subjects</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-magic text-secondary-foreground text-sm font-medium shadow-glow-purple">
            <Plus className="w-4 h-4" /> New Lesson
          </motion.button>
        </div>

        <div className="flex gap-2 mb-6">
          {(["published", "draft"] as const).map(t => (
            <motion.button key={t} whileTap={{ scale: 0.95 }} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-xs font-medium capitalize ${tab === t ? "bg-gradient-gold text-primary-foreground" : "glass"}`}>
              {t} ({lessons.filter(l => l.status === t).length})
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((l, i) => {
            const TypeIcon = typeIcons[l.type] || FileText;
            return (
              <motion.div key={l.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.01 }} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  l.type === "video" ? "bg-magic-blue/20" : l.type === "interactive" ? "bg-magic-purple/20" : "bg-muted"
                }`}>
                  <TypeIcon className={`w-5 h-5 ${l.type === "video" ? "text-magic-blue" : l.type === "interactive" ? "text-magic-purple" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{l.title}</div>
                  <div className="text-xs text-muted-foreground">{l.subject} • {l.chapter}</div>
                </div>
                <div className="flex items-center gap-4 shrink-0 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{l.duration}m</span>
                  {l.status === "published" && <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{l.views}</span>}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    l.status === "published" ? "bg-xp-green/20 text-xp-green" : "bg-muted text-muted-foreground"
                  }`}>{l.status}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherLessons() {
  return (
    <TeacherPageShell>
      <LessonsPage />
    </TeacherPageShell>
  );
}
