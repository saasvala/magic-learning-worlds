import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { TrendingUp, BookOpen, Trophy, CalendarCheck, Star, Flame, Shield, Loader2 } from "lucide-react";
import { useParentChildren, ChildProfile } from "@/hooks/useParentChildren";

const gradeLabel = (g: string | null) => g ? g.toUpperCase().replace("G", "Grade ") : "—";

function DashboardContent() {
  const { children, loading } = useParentChildren();

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-1">👨‍👩‍👧 Family Command Center</h1>
          <p className="text-sm text-muted-foreground mb-6">Track your children's learning adventures</p>
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-lg font-semibold mb-2">No children linked yet</p>
            <p className="text-sm text-muted-foreground">Ask your school admin to link your account to your children's profiles to see their progress here.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">👨‍👩‍👧 Family Command Center</h1>
        <p className="text-sm text-muted-foreground">Track your children's learning adventures</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {children.map((child, i) => (
          <motion.div key={child.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-lg font-bold text-primary-foreground">
                {child.full_name?.[0] || "?"}
              </div>
              <div>
                <div className="font-bold">{child.full_name}</div>
                <div className="text-xs text-muted-foreground">{gradeLabel(child.grade)} • {child.rank_title}</div>
              </div>
              <div className="ml-auto flex items-center gap-1 text-streak-orange">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-bold">{child.daily_streak}d</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "XP", value: child.xp_total.toLocaleString(), icon: Star, color: "text-primary" },
                { label: "Level", value: child.level, icon: Shield, color: "text-secondary" },
                { label: "Streak", value: `${child.daily_streak}d`, icon: Flame, color: "text-streak-orange" },
              ].map(s => (
                <div key={s.label} className="glass rounded-lg p-2 text-center">
                  <s.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${s.color}`} />
                  <div className="text-sm font-bold">{s.value}</div>
                  <div className="text-[10px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>Level {child.level}</span>
                <span>Level {child.level + 1}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(child.xp_total % 500) / 5}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full bg-gradient-to-r from-primary to-streak-orange" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ParentDashboard() {
  return <ParentPageShell><DashboardContent /></ParentPageShell>;
}
