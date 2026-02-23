import { motion } from "framer-motion";
import { FloatingStars, GlowOrb } from "@/components/animations/MagicEffects";
import { Sparkles, BookOpen, Trophy, Gamepad2, GraduationCap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
    <FloatingStars />
    <GlowOrb color="primary" size={400} className="top-20 -left-40" />
    <GlowOrb color="purple" size={350} className="bottom-10 -right-32" />
    <GlowOrb color="blue" size={300} className="top-1/2 left-1/2 -translate-x-1/2" />

    <div className="relative z-10 container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Nursery to Grade 12 • Full Ecosystem</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-gradient-gold">Magic</span>{" "}
          <span className="text-foreground">Learning</span>
          <br />
          <span className="text-gradient-magic">World</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Transform education into an epic adventure. Every grade is a world, every subject a kingdom, 
          every lesson a mission waiting to be conquered.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/student"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gold text-primary-foreground font-semibold shadow-glow-gold hover:scale-105 transition-transform"
          >
            <Gamepad2 className="w-5 h-5" />
            Student
          </Link>
          <Link
            to="/teacher"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-magic text-secondary-foreground font-semibold shadow-glow-purple hover:scale-105 transition-transform"
          >
            <GraduationCap className="w-5 h-5" />
            Teacher
          </Link>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground font-semibold hover:scale-105 transition-transform"
          >
            <BookOpen className="w-5 h-5" />
            School Admin
          </Link>
          <Link
            to="/super-admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground font-semibold hover:scale-105 transition-transform"
          >
            <Shield className="w-5 h-5" />
            Super Admin
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
      >
        {[
          { label: "Grades", value: "LKG–12" },
          { label: "Subjects", value: "15+" },
          { label: "Languages", value: "20" },
          { label: "Quests", value: "∞" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4">
            <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const features = [
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Each chapter is a level, each quiz a battle. Earn XP, unlock badges, and conquer boss fights.",
    gradient: "bg-gradient-gold",
  },
  {
    icon: BookOpen,
    title: "Complete Curriculum",
    description: "Every subject from English to Science, MAPEH to ICT — full K-12 Philippine curriculum covered.",
    gradient: "bg-gradient-magic",
  },
  {
    icon: Sparkles,
    title: "AI Tutor",
    description: "Personal AI assistant that speaks 20 Philippine languages with text-to-speech support.",
    gradient: "bg-gradient-gold",
  },
  {
    icon: Trophy,
    title: "Master & Unlock",
    description: "Score 80%+ to unlock the next level. Track streaks, climb leaderboards, earn rewards.",
    gradient: "bg-gradient-magic",
  },
];

const FeaturesSection = () => (
  <section className="py-24 relative">
    <GlowOrb color="primary" size={300} className="-top-20 right-0" />
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Learning Feels Like <span className="text-gradient-gold">Magic</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          A world-class education platform built for Filipino learners
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-8 hover:scale-[1.02] transition-transform"
          >
            <div className={`w-12 h-12 rounded-xl ${f.gradient} flex items-center justify-center mb-4`}>
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WorldMapPreview = () => {
  const worlds = [
    { name: "LKG", emoji: "🌱", color: "bg-xp-green" },
    { name: "UKG", emoji: "🌿", color: "bg-accent" },
    { name: "Grade 1", emoji: "⭐", color: "bg-primary" },
    { name: "Grade 2", emoji: "🔥", color: "bg-streak-orange" },
    { name: "Grade 3", emoji: "💎", color: "bg-magic-purple" },
    { name: "Grade 4", emoji: "🚀", color: "bg-magic-blue" },
    { name: "Grade 5", emoji: "👑", color: "bg-primary" },
    { name: "Grade 6", emoji: "🏰", color: "bg-secondary" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <GlowOrb color="purple" size={400} className="top-0 left-1/4" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Explore the <span className="text-gradient-magic">Worlds</span>
          </h2>
          <p className="text-muted-foreground text-lg">Each grade is a world waiting to be explored</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {worlds.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="glass rounded-2xl p-6 text-center cursor-pointer min-w-[120px]"
            >
              <div className="text-3xl mb-2">{w.emoji}</div>
              <div className="font-semibold text-sm">{w.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <WorldMapPreview />

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p className="text-sm">© 2026 Magic Learning World • Empowering Filipino Learners</p>
        </div>
      </footer>
    </div>
  );
}
