import { motion } from "framer-motion";
import { Crown, Medal, Trophy, Flame, Star, TrendingUp, TrendingDown } from "lucide-react";
import { StudentPageShell } from "@/components/StudentPageShell";
import { FloatingStars } from "@/components/animations/MagicEffects";
import { useAuth } from "@/contexts/AuthContext";

const leaderboard = [
  { rank: 1, name: "Maria Santos", xp: 8420, level: 17, streak: 45, trend: "up", avatar: "M" },
  { rank: 2, name: "Juan Dela Cruz", xp: 7850, level: 16, streak: 32, trend: "up", avatar: "J" },
  { rank: 3, name: "Bea Reyes", xp: 7200, level: 15, streak: 28, trend: "same", avatar: "B" },
  { rank: 4, name: "Carlos Garcia", xp: 6800, level: 14, streak: 21, trend: "up", avatar: "C" },
  { rank: 5, name: "Ana Lopez", xp: 6350, level: 13, streak: 18, trend: "down", avatar: "A" },
  { rank: 6, name: "Diego Rivera", xp: 5900, level: 12, streak: 15, trend: "up", avatar: "D" },
  { rank: 7, name: "Luna Cruz", xp: 5400, level: 11, streak: 12, trend: "same", avatar: "L" },
  { rank: 8, name: "Marco Tan", xp: 4800, level: 10, streak: 9, trend: "down", avatar: "M" },
  { rank: 9, name: "Sofia Ramos", xp: 4200, level: 9, streak: 7, trend: "up", avatar: "S" },
  { rank: 10, name: "Paolo Gomez", xp: 3900, level: 8, streak: 5, trend: "same", avatar: "P" },
];

const rankColors = ["", "bg-gradient-gold text-primary-foreground", "bg-muted text-foreground", "bg-streak-orange/80 text-primary-foreground"];
const rankIcons = [null, Crown, Medal, Trophy];

function LeaderboardPage() {
  const { profile } = useAuth();
  const myRank = 5;

  return (
    <div className="p-6 relative">
      <FloatingStars />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-magic flex items-center justify-center shadow-glow-purple">
            <Trophy className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Hall of Champions</h1>
            <p className="text-muted-foreground text-sm">Your rank: <span className="text-primary font-bold">#{myRank}</span> • Keep climbing!</p>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-10">
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((p, i) => {
            const heights = ["h-28", "h-36", "h-24"];
            const sizes = ["w-14 h-14", "w-18 h-18", "w-12 h-12"];
            const rankNum = [2, 1, 3][i];
            const RankIcon = rankIcons[rankNum] || Crown;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className={`w-14 h-14 rounded-full ${rankColors[rankNum]} flex items-center justify-center text-lg font-bold mb-2 shadow-lg ${
                    rankNum === 1 ? "ring-2 ring-primary shadow-glow-gold w-16 h-16" : ""
                  }`}
                >
                  {p.avatar}
                </motion.div>
                {rankNum === 1 && <Crown className="w-5 h-5 text-primary -mt-1 mb-1" />}
                <div className="text-xs font-bold text-center">{p.name.split(" ")[0]}</div>
                <div className="text-[10px] text-primary font-medium">{p.xp.toLocaleString()} XP</div>
                <div className={`${heights[i]} w-20 rounded-t-xl mt-2 flex items-end justify-center pb-2 ${
                  rankNum === 1 ? "bg-gradient-gold" : rankNum === 2 ? "bg-muted" : "bg-streak-orange/40"
                }`}>
                  <span className="text-lg font-black">#{rankNum}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full List */}
        <div className="space-y-2">
          {leaderboard.map((p, i) => (
            <motion.div
              key={p.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`glass rounded-xl p-3 flex items-center gap-3 ${
                p.rank === myRank ? "ring-1 ring-primary shadow-glow-gold" : ""
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${
                p.rank <= 3 ? rankColors[p.rank] : "bg-muted text-muted-foreground"
              }`}>
                #{p.rank}
              </div>
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{p.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold flex items-center gap-1">
                  {p.name}
                  {p.rank === myRank && <span className="text-[10px] text-primary">(You)</span>}
                </div>
                <div className="text-xs text-muted-foreground">Level {p.level} • <Flame className="w-3 h-3 inline text-streak-orange" /> {p.streak} days</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-primary">{p.xp.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-0.5 justify-end">
                  {p.trend === "up" ? <TrendingUp className="w-3 h-3 text-xp-green" /> : p.trend === "down" ? <TrendingDown className="w-3 h-3 text-destructive" /> : <Star className="w-3 h-3" />}
                  XP
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function StudentLeaderboard() {
  return (
    <StudentPageShell>
      <LeaderboardPage />
    </StudentPageShell>
  );
}
