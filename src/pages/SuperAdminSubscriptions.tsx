import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";

const subscriptions = [
  { school: "Mabini Academy", plan: "Premium", status: "active", amount: "₱25,000/mo", expires: "Dec 2026", students: 2847 },
  { school: "Rizal National HS", plan: "Enterprise", status: "active", amount: "₱50,000/mo", expires: "Jun 2027", students: 4200 },
  { school: "Bonifacio School", plan: "Standard", status: "active", amount: "₱12,000/mo", expires: "Sep 2026", students: 1580 },
  { school: "Luna Academy", plan: "Premium", status: "trial", amount: "₱0 (Trial)", expires: "Mar 15, 2026", students: 980 },
  { school: "Del Pilar Institute", plan: "Standard", status: "active", amount: "₱12,000/mo", expires: "Nov 2026", students: 650 },
  { school: "Old School A", plan: "Standard", status: "expired", amount: "₱12,000/mo", expires: "Jan 2026", students: 0 },
];

function SubscriptionsPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><CreditCard className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold">Subscriptions</h1>
            <p className="text-muted-foreground text-sm">Manage school subscription plans</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">{subscriptions.filter(s => s.status === "active").length}</div><div className="text-xs text-muted-foreground">Active</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-streak-orange">{subscriptions.filter(s => s.status === "trial").length}</div><div className="text-xs text-muted-foreground">Trial</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-destructive">{subscriptions.filter(s => s.status === "expired").length}</div><div className="text-xs text-muted-foreground">Expired</div></div>
        </div>

        <div className="space-y-3">
          {subscriptions.map((s, i) => (
            <motion.div key={s.school} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                s.status === "active" ? "bg-xp-green/20" : s.status === "trial" ? "bg-streak-orange/20" : "bg-destructive/20"
              }`}>
                {s.status === "active" ? <CheckCircle2 className="w-5 h-5 text-xp-green" /> : s.status === "trial" ? <Clock className="w-5 h-5 text-streak-orange" /> : <AlertCircle className="w-5 h-5 text-destructive" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{s.school}</div>
                <div className="text-xs text-muted-foreground">{s.students.toLocaleString()} students • Expires: {s.expires}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                s.plan === "Enterprise" ? "bg-magic-purple/20 text-magic-purple" : s.plan === "Premium" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              }`}>{s.plan}</span>
              <span className="text-sm font-bold">{s.amount}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminSubscriptions() {
  return (<SuperAdminPageShell><SubscriptionsPage /></SuperAdminPageShell>);
}
