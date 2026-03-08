import { motion } from "framer-motion";
import { StudentPageShell } from "@/components/StudentPageShell";
import { FolderOpen, Image, Trophy, FileText, Sparkles, PenTool, Upload, Download, Eye } from "lucide-react";

const sections = [
  { title: "Artwork", icon: Image, count: 12, emoji: "🎨", color: "text-magic-purple bg-magic-purple/20" },
  { title: "Projects", icon: FolderOpen, count: 8, emoji: "🏗️", color: "text-magic-blue bg-magic-blue/20" },
  { title: "Certificates", icon: Trophy, count: 15, emoji: "🏆", color: "text-primary bg-primary/20" },
  { title: "Achievements", icon: Sparkles, count: 23, emoji: "⭐", color: "text-streak-orange bg-streak-orange/20" },
  { title: "Research Papers", icon: FileText, count: 3, emoji: "📄", color: "text-xp-green bg-xp-green/20" },
  { title: "Creative Writing", icon: PenTool, count: 7, emoji: "✍️", color: "text-coral bg-coral/20" },
];

const items = [
  { title: "Water Cycle Diorama", section: "Projects", date: "Mar 6", thumbnail: "🌊", grade: "A" },
  { title: "Algebra Master Certificate", section: "Certificates", date: "Mar 4", thumbnail: "📜", grade: "—" },
  { title: "Sunset Watercolor Painting", section: "Artwork", date: "Feb 28", thumbnail: "🌅", grade: "A+" },
  { title: "Philippine Mythology Research", section: "Research Papers", date: "Feb 20", thumbnail: "📚", grade: "B+" },
  { title: "Poem: Mga Bituin sa Gabi", section: "Creative Writing", date: "Feb 15", thumbnail: "🌟", grade: "A" },
  { title: "15-Day Streak Achievement", section: "Achievements", date: "Mar 7", thumbnail: "🔥", grade: "—" },
];

function PortfolioPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-magic-purple/20 flex items-center justify-center"><FolderOpen className="w-5 h-5 text-magic-purple" /></div>
            <div><h1 className="text-2xl font-bold">🎒 Hero's Portfolio</h1><p className="text-sm text-muted-foreground">Your collection of achievements and works</p></div>
          </div>
          <div className="flex gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-muted text-sm"><Upload className="w-4 h-4" />Upload</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"><Download className="w-4 h-4" />Export PDF</motion.button>
          </div>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} className="glass rounded-xl p-3 text-center cursor-pointer hover:border-primary/30 border border-transparent transition-all">
              <span className="text-2xl">{s.emoji}</span>
              <div className="text-xs font-medium mt-1">{s.title}</div>
              <div className="text-lg font-bold">{s.count}</div>
            </motion.div>
          ))}
        </div>

        {/* Items */}
        <h2 className="text-lg font-bold mb-3">📂 Recent Items</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }} whileHover={{ y: -2 }} className="glass rounded-xl p-4 cursor-pointer hover:border-primary/20 border border-transparent transition-all">
              <div className="text-4xl mb-3 text-center">{item.thumbnail}</div>
              <div className="text-sm font-semibold truncate">{item.title}</div>
              <div className="text-[10px] text-muted-foreground">{item.section} • {item.date}</div>
              {item.grade !== "—" && <span className="text-[10px] px-1.5 py-0.5 rounded bg-xp-green/20 text-xp-green font-medium mt-1 inline-block">{item.grade}</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function StudentPortfolio() {
  return <StudentPageShell><PortfolioPage /></StudentPageShell>;
}
