import { motion } from "framer-motion";
import { 
  Flame, Star, Trophy, Zap, BookOpen, Brain, Music, Globe, 
  Calculator, Palette, Dumbbell, Heart, ChevronRight, User,
  Shield, Swords, Crown, Lock, CheckCircle2
} from "lucide-react";
import { FloatingStars, GlowOrb } from "@/components/animations/MagicEffects";
import { Link } from "react-router-dom";
import { useState } from "react";

const xpData = { current: 2450, max: 3000, level: 12 };
const streakDays = 7;

const kingdoms = [
  { name: "English", emoji: "📖", icon: BookOpen, progress: 85, color: "bg-primary", unlocked: true },
  { name: "Mathematics", emoji: "🔢", icon: Calculator, progress: 72, color: "bg-magic-blue", unlocked: true },
  { name: "Science", emoji: "🔬", icon: Brain, progress: 60, color: "bg-xp-green", unlocked: true },
  { name: "Filipino", emoji: "🇵🇭", icon: Globe, progress: 90, color: "bg-coral", unlocked: true },
  { name: "Araling Panlipunan", emoji: "🌏", icon: Globe, progress: 45, color: "bg-secondary", unlocked: true },
  { name: "MAPEH", emoji: "🎵", icon: Music, progress: 30, color: "bg-magic-purple", unlocked: true },
  { name: "Values Education", emoji: "💖", icon: Heart, progress: 0, color: "bg-streak-orange", unlocked: false },
  { name: "ICT", emoji: "💻", icon: Zap, progress: 0, color: "bg-magic-blue", unlocked: false },
];

const missions = [
  { name: "Parts of Speech", type: "mission", status: "completed", xp: 50 },
  { name: "Nouns & Pronouns", type: "mission", status: "completed", xp: 50 },
  { name: "Verbs & Tenses", type: "mission", status: "active", xp: 75 },
  { name: "Adjectives", type: "mission", status: "locked", xp: 75 },
  { name: "Chapter Quiz", type: "battle", status: "locked", xp: 150 },
  { name: "Quarterly Exam", type: "boss", status: "locked", xp: 500 },
];

const badges = [
  { name: "First Steps", emoji: "👣", earned: true },
  { name: "Speed Reader", emoji: "⚡", earned: true },
  { name: "Math Wizard", emoji: "🧙", earned: true },
  { name: "Perfect Score", emoji: "💯", earned: false },
  { name: "7-Day Streak", emoji: "🔥", earned: true },
  { name: "World Explorer", emoji: "🌍", earned: false },
];

export default function StudentDashboard() {
  const [selectedKingdom, setSelectedKingdom] = useState<string | null>("English");

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingStars />
      
      {/* Top Bar */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-gradient-gold">✨ Magic Learning</Link>
          
          <div className="flex items-center gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted">
              <Flame className="w-4 h-4 text-streak-orange" />
              <span className="text-sm font-bold text-streak-orange">{streakDays}</span>
            </div>
            
            {/* XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">{xpData.current}</span>
            </div>
            
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Welcome + Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Welcome back, <span className="text-gradient-gold">Adventurer!</span>
          </h1>
          <p className="text-muted-foreground">Grade 5 • World of Discovery</p>
          
          {/* XP Bar */}
          <div className="mt-4 max-w-md">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Level {xpData.level}</span>
              <span className="text-primary font-medium">{xpData.current} / {xpData.max} XP</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(xpData.current / xpData.max) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-gold rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Kingdom Map */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              Subject Kingdoms
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {kingdoms.map((k, i) => (
                <motion.button
                  key={k.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={k.unlocked ? { scale: 1.05, y: -3 } : {}}
                  onClick={() => k.unlocked && setSelectedKingdom(k.name)}
                  className={`relative glass rounded-xl p-4 text-center transition-all ${
                    selectedKingdom === k.name ? "ring-2 ring-primary shadow-glow-gold" : ""
                  } ${!k.unlocked ? "opacity-50" : "cursor-pointer"}`}
                >
                  {!k.unlocked && (
                    <Lock className="absolute top-2 right-2 w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  <div className="text-2xl mb-1">{k.emoji}</div>
                  <div className="text-xs font-medium truncate">{k.name}</div>
                  {k.unlocked && (
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${k.color}`}
                        style={{ width: `${k.progress}%` }}
                      />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mission Path */}
            {selectedKingdom && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Swords className="w-4 h-4 text-magic-purple" />
                  {selectedKingdom} — Chapter 3: Grammar
                </h3>
                <div className="space-y-2">
                  {missions.map((m, i) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        m.status === "active"
                          ? "glass ring-1 ring-primary shadow-glow-gold"
                          : m.status === "completed"
                          ? "glass opacity-70"
                          : "bg-muted/30 opacity-40"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        m.status === "completed" ? "bg-xp-green" :
                        m.status === "active" ? "bg-gradient-gold" : "bg-muted"
                      }`}>
                        {m.status === "completed" ? (
                          <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                        ) : m.status === "active" ? (
                          m.type === "battle" ? <Swords className="w-4 h-4 text-primary-foreground" /> :
                          <ChevronRight className="w-4 h-4 text-primary-foreground" />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{m.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {m.type === "boss" ? "⚔️ Boss Fight" : m.type === "battle" ? "⚔️ Battle" : "📜 Mission"}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-primary">+{m.xp} XP</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Challenge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-5 relative overflow-hidden"
            >
              <GlowOrb color="primary" size={100} className="-top-10 -right-10" />
              <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Daily Challenge
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Complete 3 missions today to earn bonus XP!
              </p>
              <div className="flex gap-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      n <= 1 ? "bg-gradient-gold text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {n <= 1 ? "✓" : n}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" /> Badges
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {badges.map((b) => (
                  <div
                    key={b.name}
                    className={`text-center p-2 rounded-xl ${
                      b.earned ? "glass" : "bg-muted/20 opacity-40"
                    }`}
                  >
                    <div className="text-xl">{b.emoji}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 truncate">{b.name}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-magic-purple" /> Leaderboard
              </h3>
              {[
                { name: "Maria S.", xp: 4200, rank: 1 },
                { name: "Juan D.", xp: 3800, rank: 2 },
                { name: "You", xp: 2450, rank: 5 },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`flex items-center gap-3 p-2 rounded-lg mb-1 ${
                    p.name === "You" ? "bg-primary/10" : ""
                  }`}
                >
                  <span className="text-xs font-bold text-muted-foreground w-4">#{p.rank}</span>
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                    {p.name[0]}
                  </div>
                  <span className="text-sm flex-1 font-medium">{p.name}</span>
                  <span className="text-xs text-primary font-bold">{p.xp} XP</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
