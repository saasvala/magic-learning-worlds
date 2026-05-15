import { motion } from "framer-motion";
import { DemoBadge } from "@/components/states/DemoBadge";
import { Trophy, Star, Gift, Flame, Crown, Sparkles, Lock } from "lucide-react";
import { StudentPageShell } from "@/components/StudentPageShell";
import { FloatingStars, GlowOrb } from "@/components/animations/MagicEffects";
import { useAuth } from "@/contexts/AuthContext";

const badges = [
  { name: "First Steps", emoji: "👣", desc: "Complete your first lesson", earned: true },
  { name: "Speed Reader", emoji: "⚡", desc: "Finish a lesson in under 5 min", earned: true },
  { name: "Math Wizard", emoji: "🧙", desc: "Score 100% on a Math quiz", earned: true },
  { name: "7-Day Streak", emoji: "🔥", desc: "Log in 7 days in a row", earned: true },
  { name: "Perfect Score", emoji: "💯", desc: "Get 100% on any exam", earned: false, progress: 88 },
  { name: "World Explorer", emoji: "🌍", desc: "Complete all Grade subjects", earned: false, progress: 60 },
  { name: "Battle Master", emoji: "⚔️", desc: "Win 20 battles", earned: false, progress: 65 },
  { name: "Boss Slayer", emoji: "🐉", desc: "Defeat a Boss Fight", earned: false, progress: 0 },
  { name: "Knowledge Sage", emoji: "📚", desc: "Read 50 lessons", earned: false, progress: 72 },
  { name: "Streak Legend", emoji: "🏆", desc: "30-day login streak", earned: false, progress: 23 },
  { name: "AI Explorer", emoji: "🤖", desc: "Ask AI Tutor 100 questions", earned: false, progress: 45 },
  { name: "Master Scholar", emoji: "👑", desc: "Reach Level 50", earned: false, progress: 10 },
];

const treasureChests = [
  { name: "Bronze Chest", emoji: "🪙", xpRequired: 500, reward: "Random Badge + 50 XP", unlocked: true },
  { name: "Silver Chest", emoji: "🥈", xpRequired: 1500, reward: "Avatar Frame + 100 XP", unlocked: true },
  { name: "Gold Chest", emoji: "🥇", xpRequired: 3000, reward: "Title + 250 XP", unlocked: false },
  { name: "Diamond Chest", emoji: "💎", xpRequired: 5000, reward: "Legendary Badge + 500 XP", unlocked: false },
];

function RewardsPage() {
  const { profile } = useAuth();
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="p-6 relative">
      <FloatingStars />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow-gold"
          >
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">Treasure Vault</h1>
            <div className="mt-1"><DemoBadge /></div>
            <p className="text-muted-foreground text-sm">{earnedCount}/{badges.length} badges earned • Keep adventuring!</p>
          </div>
        </div>

        {/* Treasure Chests */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Gift className="w-5 h-5 text-primary" /> Treasure Chests</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {treasureChests.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={c.unlocked ? { scale: 1.05, y: -5 } : {}}
                className={`glass rounded-xl p-5 text-center relative overflow-hidden ${
                  c.unlocked ? "ring-1 ring-primary/30 cursor-pointer" : "opacity-50"
                }`}
              >
                {c.unlocked && <GlowOrb color="primary" size={60} className="-top-4 -right-4" />}
                <motion.div
                  animate={c.unlocked ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-2"
                >{c.emoji}</motion.div>
                <div className="text-sm font-bold">{c.name}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{c.reward}</div>
                <div className="text-[10px] text-primary font-medium mt-2">
                  {c.unlocked ? "🎉 Tap to Open!" : `🔒 ${c.xpRequired} XP needed`}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-magic-purple" /> Badge Collection</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {badges.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={b.earned ? { scale: 1.05, rotate: 2 } : {}}
              className={`glass rounded-xl p-4 text-center relative ${
                b.earned ? "shadow-glow-gold" : "opacity-60"
              }`}
            >
              {!b.earned && <Lock className="absolute top-2 right-2 w-3 h-3 text-muted-foreground" />}
              <motion.div
                animate={b.earned ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl mb-2"
              >{b.emoji}</motion.div>
              <div className="text-xs font-bold">{b.name}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{b.desc}</div>
              {!b.earned && b.progress !== undefined && b.progress > 0 && (
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${b.progress}%` }} />
                </div>
              )}
              {b.earned && <div className="text-[10px] text-xp-green font-medium mt-2">✅ Earned</div>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function StudentRewards() {
  return (
    <StudentPageShell>
      <RewardsPage />
    </StudentPageShell>
  );
}
