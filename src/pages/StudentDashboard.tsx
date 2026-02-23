import { motion } from "framer-motion";
import {
  Home, Globe, BookOpen, FileText, GraduationCap, Bot,
  Trophy, BarChart3, Settings, LogOut, Flame, Star,
  ChevronRight, Lock, CheckCircle2, Swords, Crown, Zap,
  User, Shield, AlertTriangle
} from "lucide-react";
import { DashboardLayout, SidebarItem } from "@/components/DashboardLayout";
import { FloatingStars, GlowOrb } from "@/components/animations/MagicEffects";
import { useState } from "react";

const sidebarItems: SidebarItem[] = [
  { title: "Home", url: "/student", icon: Home },
  { title: "My Worlds", url: "/student/worlds", icon: Globe },
  { title: "Subjects", url: "/student/subjects", icon: BookOpen },
  { title: "Assignments", url: "/student/assignments", icon: FileText },
  { title: "Exams", url: "/student/exams", icon: GraduationCap },
  { title: "AI Tutor", url: "/student/ai-tutor", icon: Bot },
  { title: "Rewards", url: "/student/rewards", icon: Trophy },
  { title: "Leaderboard", url: "/student/leaderboard", icon: BarChart3 },
  { title: "Progress Report", url: "/student/progress", icon: BarChart3 },
  { title: "Settings", url: "/student/settings", icon: Settings },
  { title: "Logout", url: "/", icon: LogOut },
];

const xpData = { current: 2450, max: 3000, level: 12 };

const kingdoms = [
  { name: "English", emoji: "📖", progress: 85, unlocked: true },
  { name: "Mathematics", emoji: "🔢", progress: 72, unlocked: true },
  { name: "Science", emoji: "🔬", progress: 60, unlocked: true },
  { name: "Filipino", emoji: "🇵🇭", progress: 90, unlocked: true },
  { name: "Araling Panlipunan", emoji: "🌏", progress: 45, unlocked: true },
  { name: "MAPEH", emoji: "🎵", progress: 30, unlocked: true },
  { name: "Values Education", emoji: "💖", progress: 0, unlocked: false },
  { name: "ICT", emoji: "💻", progress: 0, unlocked: false },
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

function StudentHome() {
  const [selectedKingdom, setSelectedKingdom] = useState<string | null>("English");

  return (
    <div className="p-6 relative">
      <FloatingStars />

      {/* Welcome + Stats Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-glow-gold">
            <User className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold">
              Welcome back, <span className="text-gradient-gold">Adventurer!</span>
            </h1>
            <p className="text-muted-foreground text-sm">Grade 5 • World of Discovery</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted">
              <Flame className="w-4 h-4 text-streak-orange" />
              <span className="text-sm font-bold text-streak-orange">7</span>
              <span className="text-xs text-muted-foreground">Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">{xpData.current}</span>
              <span className="text-xs text-muted-foreground">XP</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted">
              <Crown className="w-4 h-4 text-magic-purple" />
              <span className="text-sm font-bold text-magic-purple">Lvl {xpData.level}</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="max-w-md">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Level {xpData.level}</span>
            <span className="text-primary font-medium">{xpData.current} / {xpData.max} XP</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(xpData.current / xpData.max) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-gold rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-gold text-primary-foreground font-semibold shadow-glow-gold"
        >
          <ChevronRight className="w-4 h-4" /> Continue Learning
        </motion.button>
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl glass text-sm">
          <AlertTriangle className="w-4 h-4 text-streak-orange" />
          <span>Weak Subject: <strong className="text-streak-orange">Araling Panlipunan</strong></span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Kingdom Map */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" /> Subject Kingdoms
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {kingdoms.map((k, i) => (
                <motion.button
                  key={k.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={k.unlocked ? { scale: 1.05, y: -3 } : {}}
                  onClick={() => k.unlocked && setSelectedKingdom(k.name)}
                  className={`relative glass rounded-xl p-4 text-center transition-all ${
                    selectedKingdom === k.name ? "ring-2 ring-primary shadow-glow-gold" : ""
                  } ${!k.unlocked ? "opacity-40" : "cursor-pointer"}`}
                >
                  {!k.unlocked && <Lock className="absolute top-2 right-2 w-3 h-3 text-muted-foreground" />}
                  <div className="text-2xl mb-1">{k.emoji}</div>
                  <div className="text-xs font-medium truncate">{k.name}</div>
                  {k.unlocked && (
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${k.progress}%` }} />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mission Path */}
          {selectedKingdom && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Swords className="w-4 h-4 text-magic-purple" />
                {selectedKingdom} — Chapter 3: Grammar
              </h3>
              <div className="space-y-2">
                {missions.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      m.status === "active" ? "glass ring-1 ring-primary shadow-glow-gold" :
                      m.status === "completed" ? "glass opacity-70" : "bg-muted/30 opacity-40"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      m.status === "completed" ? "bg-xp-green" :
                      m.status === "active" ? "bg-gradient-gold" : "bg-muted"
                    }`}>
                      {m.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-primary-foreground" /> :
                       m.status === "active" ? <ChevronRight className="w-4 h-4 text-primary-foreground" /> :
                       <Lock className="w-4 h-4 text-muted-foreground" />}
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

        {/* Right Sidebar */}
        <div className="space-y-5">
          {/* Daily Challenge */}
          <div className="glass rounded-2xl p-5 relative overflow-hidden">
            <GlowOrb color="primary" size={80} className="-top-8 -right-8" />
            <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Daily Challenge
            </h3>
            <p className="text-sm text-muted-foreground mb-3">Complete 3 missions for bonus XP!</p>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  n <= 1 ? "bg-gradient-gold text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {n <= 1 ? "✓" : n}
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" /> Badges
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((b) => (
                <div key={b.name} className={`text-center p-2 rounded-xl ${b.earned ? "glass" : "bg-muted/20 opacity-40"}`}>
                  <div className="text-xl">{b.emoji}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 truncate">{b.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-magic-purple" /> Leaderboard
            </h3>
            {[
              { name: "Maria S.", xp: 4200, rank: 1 },
              { name: "Juan D.", xp: 3800, rank: 2 },
              { name: "You", xp: 2450, rank: 5 },
            ].map((p) => (
              <div key={p.name} className={`flex items-center gap-3 p-2 rounded-lg mb-1 ${p.name === "You" ? "bg-primary/10" : ""}`}>
                <span className="text-xs font-bold text-muted-foreground w-4">#{p.rank}</span>
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">{p.name[0]}</div>
                <span className="text-sm flex-1 font-medium">{p.name}</span>
                <span className="text-xs text-primary font-bold">{p.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <DashboardLayout
      items={sidebarItems}
      roleLabel="Student"
      roleEmoji="🎮"
      userName="Miguel"
      homeUrl="/student"
    >
      <StudentHome />
    </DashboardLayout>
  );
}
