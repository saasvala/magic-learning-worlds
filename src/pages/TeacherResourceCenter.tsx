import { motion } from "framer-motion";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { Wrench, FileText, Sparkles, HelpCircle, Brain, BookOpen, Download, Copy } from "lucide-react";

const tools = [
  { title: "Lesson Templates", icon: FileText, count: 45, desc: "Ready-made lesson plans", emoji: "📋", color: "text-primary bg-primary/20" },
  { title: "Activity Generator", icon: Sparkles, count: 120, desc: "AI-powered activity ideas", emoji: "🎲", color: "text-magic-purple bg-magic-purple/20" },
  { title: "Question Bank Builder", icon: HelpCircle, count: 2800, desc: "Create & organize questions", emoji: "❓", color: "text-magic-blue bg-magic-blue/20" },
  { title: "AI Lesson Planner", icon: Brain, count: 0, desc: "Generate full lesson plans with AI", emoji: "🤖", color: "text-xp-green bg-xp-green/20" },
  { title: "Worksheet Generator", icon: BookOpen, count: 350, desc: "Printable & digital worksheets", emoji: "📝", color: "text-streak-orange bg-streak-orange/20" },
];

const templates = [
  { name: "5E Model Lesson Plan", subject: "Science", grade: "G7-G10", downloads: 234, rating: 4.8 },
  { name: "Math Problem-Based Learning", subject: "Math", grade: "G6-G8", downloads: 189, rating: 4.6 },
  { name: "Interactive Reading Lesson", subject: "English", grade: "G5-G7", downloads: 156, rating: 4.7 },
  { name: "History Timeline Activity", subject: "History", grade: "G7-G10", downloads: 98, rating: 4.5 },
  { name: "Filipino Pagsusuri Template", subject: "Filipino", grade: "G7-G10", downloads: 67, rating: 4.4 },
];

const generatedActivities = [
  { activity: "Algebra Treasure Hunt", type: "Game", duration: "30 min", difficulty: "Medium", subject: "Math" },
  { activity: "Ecosystem Web Diagram", type: "Project", duration: "45 min", difficulty: "Easy", subject: "Science" },
  { activity: "Debate: Historical Perspectives", type: "Discussion", duration: "40 min", difficulty: "Hard", subject: "History" },
];

function ResourcePage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><Wrench className="w-5 h-5 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">🛠️ Teacher's Workshop</h1><p className="text-sm text-muted-foreground">Templates, generators, and AI-powered tools</p></div>
        </div>

        {/* Tool Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {tools.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.03, y: -2 }} className="glass rounded-xl p-5 cursor-pointer hover:border-primary/30 border border-transparent transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.color}`}><t.icon className="w-5 h-5" /></div>
                <span className="text-xl">{t.emoji}</span>
              </div>
              <div className="text-sm font-bold">{t.title}</div>
              <div className="text-[10px] text-muted-foreground">{t.desc}</div>
              {t.count > 0 && <div className="text-xs font-bold text-primary mt-2">{t.count.toLocaleString()} available</div>}
              {t.count === 0 && <div className="text-xs font-bold text-magic-purple mt-2 flex items-center gap-1"><Sparkles className="w-3 h-3" />AI Powered</div>}
            </motion.div>
          ))}
        </div>

        {/* Popular Templates */}
        <h2 className="text-lg font-bold mb-3">📋 Popular Templates</h2>
        <div className="space-y-2 mb-6">
          {templates.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.04 }} className="glass rounded-xl p-3 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-[10px] text-muted-foreground">{t.subject} • {t.grade} • ⬇️ {t.downloads} • ⭐ {t.rating}</div>
              </div>
              <button className="p-1.5 rounded-lg bg-muted hover:bg-primary/20 transition-colors"><Copy className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"><Download className="w-3.5 h-3.5" /></button>
            </motion.div>
          ))}
        </div>

        {/* AI Generated Activities */}
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-magic-purple" />AI-Generated Activities</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {generatedActivities.map((a, i) => (
            <motion.div key={a.activity} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="glass rounded-xl p-4">
              <div className="text-sm font-bold">{a.activity}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{a.type}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{a.duration}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${a.difficulty === "Hard" ? "bg-destructive/20 text-destructive" : a.difficulty === "Medium" ? "bg-streak-orange/20 text-streak-orange" : "bg-xp-green/20 text-xp-green"}`}>{a.difficulty}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">{a.subject}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherResourceCenter() {
  return <TeacherPageShell><ResourcePage /></TeacherPageShell>;
}
