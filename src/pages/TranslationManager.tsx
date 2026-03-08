import { motion } from "framer-motion";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { Globe, Languages, Sparkles, Download, Eye, CheckCircle2, Clock } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸", progress: 100, strings: 4520 },
  { code: "tl", name: "Tagalog", flag: "🇵🇭", progress: 87, strings: 3932 },
  { code: "ceb", name: "Cebuano", flag: "🇵🇭", progress: 45, strings: 2034 },
  { code: "ilo", name: "Ilocano", flag: "🇵🇭", progress: 22, strings: 994 },
  { code: "hil", name: "Hiligaynon", flag: "🇵🇭", progress: 15, strings: 678 },
];

const recentTranslations = [
  { key: "chapter.algebra.intro", en: "Welcome to Algebra Basics!", tl: "Maligayang pagdating sa Algebra!", status: "approved" },
  { key: "quiz.instructions", en: "Answer all questions within the time limit", tl: "Sagutin lahat ng tanong sa loob ng oras", status: "approved" },
  { key: "badge.math_wizard.desc", en: "Complete all math chapters", tl: "", status: "pending" },
  { key: "lesson.science.matter", en: "Matter is anything that has mass", tl: "Ang bagay ay anumang may masa", status: "ai_suggested" },
  { key: "dashboard.welcome", en: "Welcome back, hero!", tl: "Maligayang pagbabalik, bayani!", status: "approved" },
];

function TranslationPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-magic-blue/20 flex items-center justify-center"><Globe className="w-5 h-5 text-magic-blue" /></div>
            <div><h1 className="text-2xl font-bold">🌐 Translation Nexus</h1><p className="text-sm text-muted-foreground">Multi-language content management</p></div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-magic-purple text-foreground text-sm font-medium"><Sparkles className="w-4 h-4" />AI Translate All</motion.button>
        </div>

        {/* Language Progress */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {languages.map((l, i) => (
            <motion.div key={l.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 text-center">
              <span className="text-2xl">{l.flag}</span>
              <div className="text-sm font-bold mt-1">{l.name}</div>
              <div className="text-[10px] text-muted-foreground">{l.strings.toLocaleString()} strings</div>
              <div className="h-2 rounded-full bg-muted mt-2 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${l.progress}%` }} transition={{ duration: 0.8, delay: 0.3 }} className={`h-full rounded-full ${l.progress === 100 ? "bg-xp-green" : l.progress > 50 ? "bg-primary" : "bg-streak-orange"}`} />
              </div>
              <div className="text-xs font-bold mt-1">{l.progress}%</div>
            </motion.div>
          ))}
        </div>

        {/* Translation Editor */}
        <h2 className="text-lg font-bold mb-3">📝 Translation Editor</h2>
        <div className="space-y-2">
          {recentTranslations.map((t, i) => (
            <motion.div key={t.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.04 }} className="glass rounded-xl p-3">
              <div className="text-[10px] font-mono text-muted-foreground mb-2">{t.key}</div>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="text-xs p-2 rounded-lg bg-muted/50"><span className="text-[9px] text-muted-foreground block mb-0.5">🇺🇸 EN</span>{t.en}</div>
                <div className="text-xs p-2 rounded-lg bg-muted/50"><span className="text-[9px] text-muted-foreground block mb-0.5">🇵🇭 TL</span>{t.tl || <span className="italic text-muted-foreground">Not translated</span>}</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  t.status === "approved" ? "bg-xp-green/20 text-xp-green" : t.status === "ai_suggested" ? "bg-magic-purple/20 text-magic-purple" : "bg-streak-orange/20 text-streak-orange"
                }`}>{t.status === "ai_suggested" ? "🤖 AI Suggested" : t.status === "approved" ? "✅ Approved" : "⏳ Pending"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function TranslationManager() {
  return <SuperAdminPageShell><TranslationPage /></SuperAdminPageShell>;
}
