import { motion } from "framer-motion";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { Film, Box, Gamepad2, FileText, Layers, Upload, Play, Eye } from "lucide-react";

const categories = [
  { title: "Video Library", icon: Film, count: 1247, color: "text-magic-blue bg-magic-blue/20", emoji: "🎬" },
  { title: "Animation Library", icon: Play, count: 438, color: "text-magic-purple bg-magic-purple/20", emoji: "✨" },
  { title: "3D Model Library", icon: Box, count: 215, color: "text-xp-green bg-xp-green/20", emoji: "🧊" },
  { title: "Worksheet Library", icon: FileText, count: 892, color: "text-streak-orange bg-streak-orange/20", emoji: "📝" },
  { title: "Interactive Games", icon: Gamepad2, count: 156, color: "text-primary bg-primary/20", emoji: "🎮" },
  { title: "Lesson Builder", icon: Layers, count: 324, color: "text-coral bg-coral/20", emoji: "🏗️" },
];

const recentUploads = [
  { name: "Photosynthesis_3D.glb", type: "3D Model", subject: "Science G7", size: "24.5 MB", uploader: "Admin", date: "Mar 7", status: "published" },
  { name: "Water_Cycle_Animation.mp4", type: "Animation", subject: "Science G5", size: "85 MB", uploader: "Content Team", date: "Mar 6", status: "review" },
  { name: "Algebra_Practice_Set.pdf", type: "Worksheet", subject: "Math G8", size: "1.2 MB", uploader: "Ms. Reyes", date: "Mar 6", status: "published" },
  { name: "Philippine_History_Quiz.json", type: "Game", subject: "History G7", size: "45 KB", uploader: "Mr. Cruz", date: "Mar 5", status: "draft" },
  { name: "Cell_Division_HD.mp4", type: "Video", subject: "Biology G10", size: "320 MB", uploader: "Content Team", date: "Mar 4", status: "published" },
];

function ContentLibraryPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-magic-purple/20 flex items-center justify-center"><Layers className="w-5 h-5 text-magic-purple" /></div>
            <div><h1 className="text-2xl font-bold">📚 Content Armory</h1><p className="text-sm text-muted-foreground">Manage all learning content assets</p></div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
            <Upload className="w-4 h-4" /> Upload
          </motion.button>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {categories.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.02 }} className="glass rounded-xl p-5 cursor-pointer hover:border-primary/30 border border-transparent transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.color}`}><c.icon className="w-5 h-5" /></div>
                <span className="text-xl">{c.emoji}</span>
              </div>
              <div className="text-sm font-bold">{c.title}</div>
              <div className="text-2xl font-bold mt-1">{c.count.toLocaleString()}</div>
              <div className="text-[10px] text-muted-foreground">assets available</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Uploads */}
        <h2 className="text-lg font-bold mb-3">🆕 Recent Uploads</h2>
        <div className="space-y-2">
          {recentUploads.map((u, i) => (
            <motion.div key={u.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.04 }} className="glass rounded-xl p-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{u.name}</div>
                <div className="text-[10px] text-muted-foreground">{u.type} • {u.subject} • {u.size} • by {u.uploader}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                u.status === "published" ? "bg-xp-green/20 text-xp-green" : u.status === "review" ? "bg-streak-orange/20 text-streak-orange" : "bg-muted text-muted-foreground"
              }`}>{u.status}</span>
              <Eye className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ContentLibrary() {
  return <SuperAdminPageShell><ContentLibraryPage /></SuperAdminPageShell>;
}
