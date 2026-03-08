import { motion } from "framer-motion";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { Gamepad2, Star, Trophy, Target, Crown, Swords, Settings, Zap } from "lucide-react";

const xpRules = [
  { source: "Chapter Test Pass", xp: 150, condition: "Score ≥ 80%", active: true },
  { source: "Boss Battle Victory", xp: 300, condition: "Defeat boss", active: true },
  { source: "Daily Login", xp: 25, condition: "First login of day", active: true },
  { source: "Assignment Submit", xp: 50, condition: "On-time submission", active: true },
  { source: "Perfect Attendance Week", xp: 100, condition: "5/5 days present", active: true },
  { source: "Streak Bonus (7d)", xp: 75, condition: "7-day streak", active: false },
];

const badges = [
  { name: "Math Wizard", emoji: "🧙", requirement: "Complete all math chapters", xp: 500, earned: 234 },
  { name: "Science Explorer", emoji: "🔬", requirement: "Finish 10 science lessons", xp: 300, earned: 456 },
  { name: "Bookworm", emoji: "📚", requirement: "Read 20 lessons", xp: 200, earned: 789 },
  { name: "Speed Demon", emoji: "⚡", requirement: "Complete quiz in <5 min", xp: 150, earned: 123 },
  { name: "Perfect Score", emoji: "💯", requirement: "100% on any exam", xp: 400, earned: 67 },
  { name: "Streak Master", emoji: "🔥", requirement: "30-day streak", xp: 600, earned: 12 },
];

const levels = [
  { level: 1, title: "Novice", xpReq: 0, unlocks: "Basic access" },
  { level: 5, title: "Apprentice", xpReq: 500, unlocks: "Custom avatar" },
  { level: 10, title: "Scholar", xpReq: 2000, unlocks: "Title badge" },
  { level: 20, title: "Arcane Knight", xpReq: 8000, unlocks: "Special effects" },
  { level: 50, title: "Grand Master", xpReq: 50000, unlocks: "Legendary frame" },
];

function GamificationPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><Gamepad2 className="w-5 h-5 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">🎮 Gamification Forge</h1><p className="text-sm text-muted-foreground">XP rules, badges, levels, and challenges</p></div>
        </div>

        {/* XP Rules */}
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Zap className="w-5 h-5 text-primary" />XP Rules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {xpRules.map((r, i) => (
            <motion.div key={r.source} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} className={`glass rounded-xl p-3 border ${r.active ? "border-xp-green/20" : "border-destructive/20 opacity-60"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">{r.source}</span>
                <span className="text-xs font-bold text-primary">+{r.xp} XP</span>
              </div>
              <div className="text-[10px] text-muted-foreground">{r.condition}</div>
              <div className={`text-[9px] mt-1 ${r.active ? "text-xp-green" : "text-destructive"}`}>{r.active ? "● Active" : "○ Disabled"}</div>
            </motion.div>
          ))}
        </div>

        {/* Badge Rules */}
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Trophy className="w-5 h-5 text-streak-orange" />Badge Rules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {badges.map((b, i) => (
            <motion.div key={b.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.04 }} whileHover={{ scale: 1.02 }} className="glass rounded-xl p-4 text-center">
              <span className="text-3xl">{b.emoji}</span>
              <div className="text-sm font-bold mt-2">{b.name}</div>
              <div className="text-[10px] text-muted-foreground">{b.requirement}</div>
              <div className="flex justify-between mt-2 text-[10px]">
                <span className="text-primary font-medium">+{b.xp} XP</span>
                <span className="text-muted-foreground">{b.earned} earned</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Level Unlocks */}
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Crown className="w-5 h-5 text-magic-purple" />Level Unlock Settings</h2>
        <div className="space-y-2">
          {levels.map((l, i) => (
            <motion.div key={l.level} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.04 }} className="glass rounded-xl p-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">{l.level}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{l.title}</div>
                <div className="text-[10px] text-muted-foreground">{l.xpReq.toLocaleString()} XP required</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">🔓 {l.unlocks}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function GamificationControl() {
  return <SuperAdminPageShell><GamificationPage /></SuperAdminPageShell>;
}
