import { motion } from "framer-motion";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { Image, Film, Box, Music, FileImage, Globe, Tag, History, Upload } from "lucide-react";

const assetStats = [
  { type: "HD Video", icon: Film, count: 1247, size: "480 GB", color: "text-magic-blue bg-magic-blue/20" },
  { type: "3D Models", icon: Box, count: 215, size: "12.5 GB", color: "text-xp-green bg-xp-green/20" },
  { type: "Audio", icon: Music, count: 532, size: "8.2 GB", color: "text-magic-purple bg-magic-purple/20" },
  { type: "Images", icon: Image, count: 3420, size: "25 GB", color: "text-primary bg-primary/20" },
  { type: "Diagrams", icon: FileImage, count: 890, size: "4.1 GB", color: "text-streak-orange bg-streak-orange/20" },
];

const assets = [
  { name: "solar_system_3d.glb", type: "3D Model", grade: "G7", lang: "EN/TL", versions: 3, cdn: "cached", size: "45 MB" },
  { name: "photosynthesis_explainer.mp4", type: "HD Video", grade: "G6", lang: "EN/TL/CEB", versions: 2, cdn: "cached", size: "280 MB" },
  { name: "algebra_intro_narration.mp3", type: "Audio", grade: "G8", lang: "EN", versions: 1, cdn: "cached", size: "12 MB" },
  { name: "cell_structure_diagram.svg", type: "Diagram", grade: "G9", lang: "EN/TL", versions: 4, cdn: "pending", size: "800 KB" },
  { name: "philippine_map_hd.png", type: "Image", grade: "G5-G10", lang: "Universal", versions: 2, cdn: "cached", size: "5 MB" },
  { name: "water_cycle_anim.mp4", type: "HD Video", grade: "G5", lang: "EN/TL", versions: 1, cdn: "cached", size: "150 MB" },
];

function MediaPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><Image className="w-5 h-5 text-primary" /></div>
            <div><h1 className="text-2xl font-bold">🖼️ Media Vault</h1><p className="text-sm text-muted-foreground">CDN-powered asset management</p></div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"><Upload className="w-4 h-4" />Upload Asset</motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {assetStats.map((s, i) => (
            <motion.div key={s.type} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-3 text-center">
              <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color.split(' ')[0]}`} />
              <div className="text-lg font-bold">{s.count.toLocaleString()}</div>
              <div className="text-[10px] text-muted-foreground">{s.type}</div>
              <div className="text-[9px] text-muted-foreground/70">{s.size}</div>
            </motion.div>
          ))}
        </div>

        {/* Asset List */}
        <div className="space-y-2">
          {assets.map((a, i) => (
            <motion.div key={a.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.04 }} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-primary/20 border border-transparent transition-all">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{a.name}</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1"><Tag className="w-3 h-3" />{a.type}</span>
                  <span className="inline-flex items-center gap-1"><Globe className="w-3 h-3" />{a.lang}</span>
                  <span className="inline-flex items-center gap-1"><History className="w-3 h-3" />v{a.versions}</span>
                  <span>{a.size}</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{a.grade}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.cdn === "cached" ? "bg-xp-green/20 text-xp-green" : "bg-streak-orange/20 text-streak-orange"}`}>{a.cdn}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function MediaAssets() {
  return <SuperAdminPageShell><MediaPage /></SuperAdminPageShell>;
}
