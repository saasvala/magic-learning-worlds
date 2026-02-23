import { motion } from "framer-motion";
import {
  Users, BookOpen, GraduationCap, BarChart3, Calendar,
  Settings, Bell, Search, ChevronDown, TrendingUp, UserCheck,
  FileText, DollarSign, Shield, Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Users, label: "Students" },
  { icon: GraduationCap, label: "Teachers" },
  { icon: BookOpen, label: "Curriculum" },
  { icon: Calendar, label: "Attendance" },
  { icon: FileText, label: "Exams" },
  { icon: BarChart3, label: "Analytics" },
  { icon: DollarSign, label: "Finance" },
  { icon: Shield, label: "Roles & Access" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  { label: "Total Students", value: "2,847", change: "+12%", icon: Users, color: "text-magic-blue" },
  { label: "Active Teachers", value: "156", change: "+3%", icon: GraduationCap, color: "text-xp-green" },
  { label: "Avg. Mastery", value: "78%", change: "+5%", icon: TrendingUp, color: "text-primary" },
  { label: "Attendance Today", value: "94%", change: "+1%", icon: UserCheck, color: "text-magic-purple" },
];

const recentActivity = [
  { text: "Maria Santos completed Grade 5 Math Boss Fight", time: "2m ago", emoji: "⚔️" },
  { text: "New quiz published: Science Ch. 4 by Mr. Cruz", time: "15m ago", emoji: "📝" },
  { text: "Grade 3 English curriculum updated", time: "1h ago", emoji: "📖" },
  { text: "45 students earned 7-day streak badge", time: "2h ago", emoji: "🔥" },
  { text: "Quarterly exam results published for Grade 6", time: "3h ago", emoji: "🏆" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-5 border-b border-border">
          <Link to="/" className="text-lg font-bold text-gradient-gold">✨ Magic Learning</Link>
          <p className="text-xs text-muted-foreground mt-1">School Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border flex items-center px-6 gap-4">
          <div className="flex-1 flex items-center gap-3">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search students, teachers..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-gradient-magic flex items-center justify-center">
              <span className="text-xs font-bold text-secondary-foreground">SA</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-muted-foreground">Mabini Academy</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground text-sm mb-6">Welcome back. Here's what's happening today.</p>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                    <span className="text-xs font-medium text-xp-green">{s.change}</span>
                  </div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="glass rounded-xl p-5">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-lg flex-shrink-0">{a.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground">{a.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grade Performance */}
              <div className="glass rounded-xl p-5">
                <h3 className="font-semibold mb-4">Grade Performance</h3>
                <div className="space-y-3">
                  {[
                    { grade: "Grade 1", mastery: 88 },
                    { grade: "Grade 2", mastery: 82 },
                    { grade: "Grade 3", mastery: 76 },
                    { grade: "Grade 4", mastery: 71 },
                    { grade: "Grade 5", mastery: 68 },
                    { grade: "Grade 6", mastery: 74 },
                  ].map((g) => (
                    <div key={g.grade} className="flex items-center gap-3">
                      <span className="text-sm w-16 text-muted-foreground">{g.grade}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-gold rounded-full"
                          style={{ width: `${g.mastery}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-10 text-right">{g.mastery}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
