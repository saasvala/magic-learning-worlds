import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FloatingStars, GlowOrb } from "@/components/animations/MagicEffects";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "student" | "teacher" | "school_admin" | "super_admin" | "parent";

const roleOptions: { value: UserRole; label: string; emoji: string; description: string }[] = [
  { value: "student", label: "Student", emoji: "🎮", description: "Learn, play, conquer worlds" },
  { value: "teacher", label: "Teacher", emoji: "📚", description: "Manage classes & lessons" },
  { value: "parent", label: "Parent", emoji: "👨‍👩‍👧", description: "Monitor your children" },
  { value: "school_admin", label: "School Admin", emoji: "🏫", description: "Run your school" },
  { value: "super_admin", label: "Super Admin", emoji: "👑", description: "Platform control" },
];

const rolePaths: Record<UserRole, string> = {
  student: "/student",
  teacher: "/teacher",
  school_admin: "/admin",
  super_admin: "/super-admin",
  parent: "/parent",
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        const { supabase } = await import("@/integrations/supabase/client");
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
          const userRole = (profile?.role as UserRole) || "student";
          navigate(rolePaths[userRole]);
        }
      }
    } else {
      const { error } = await signUp(email, password, fullName, role);
      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "Please check your email to verify your account." });
        setIsLogin(true);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingStars />
      <GlowOrb color="primary" size={300} className="-top-20 -left-20" />
      <GlowOrb color="purple" size={250} className="bottom-0 right-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs text-primary font-medium">Magic Learning World</span>
          </div>
          <h1 className="text-3xl font-bold">
            {isLogin ? "Welcome Back!" : "Join the Adventure"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLogin ? "Sign in to continue your quest" : "Create your account to begin"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary pr-10"
                placeholder="Min 6 characters"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Role</label>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      role === r.value ? "ring-2 ring-primary bg-primary/10" : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <span className="text-lg">{r.emoji}</span>
                    <div className="text-xs font-medium mt-1">{r.label}</div>
                    <div className="text-[10px] text-muted-foreground">{r.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-gold text-primary-foreground font-semibold shadow-glow-gold hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {submitting ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
