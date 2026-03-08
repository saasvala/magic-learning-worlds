import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { CreditCard, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const fees = [
  { description: "Tuition Fee - Q3 2026", amount: "₱15,000", status: "paid", date: "Jan 15, 2026", method: "GCash" },
  { description: "Tuition Fee - Q4 2026", amount: "₱15,000", status: "upcoming", date: "Apr 1, 2026", method: "—" },
  { description: "Lab Fee", amount: "₱2,500", status: "paid", date: "Jan 15, 2026", method: "Bank Transfer" },
  { description: "Activity Fee", amount: "₱1,000", status: "overdue", date: "Feb 28, 2026", method: "—" },
  { description: "Books & Materials", amount: "₱3,500", status: "paid", date: "Dec 10, 2025", method: "Cash" },
];

const statusBadge = (s: string) => {
  const m: Record<string, { icon: any; cls: string; label: string }> = {
    paid: { icon: CheckCircle2, cls: "text-xp-green bg-xp-green/20", label: "Paid" },
    upcoming: { icon: Clock, cls: "text-streak-orange bg-streak-orange/20", label: "Upcoming" },
    overdue: { icon: AlertTriangle, cls: "text-destructive bg-destructive/20", label: "Overdue" },
  };
  const v = m[s];
  return <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${v.cls}`}><v.icon className="w-3 h-3" />{v.label}</span>;
};

function FeesPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><CreditCard className="w-5 h-5 text-primary" /></div>
          <div><h1 className="text-2xl font-bold">💰 Treasury Ledger</h1><p className="text-sm text-muted-foreground">Fee payments and balance tracking</p></div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">₱21,000</div><div className="text-xs text-muted-foreground">Total Paid</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-streak-orange">₱15,000</div><div className="text-xs text-muted-foreground">Upcoming</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-destructive">₱1,000</div><div className="text-xs text-muted-foreground">Overdue</div></div>
        </div>

        <div className="space-y-3">
          {fees.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{f.description}</div>
                <div className="text-xs text-muted-foreground">{f.date} • {f.method}</div>
              </div>
              <span className="text-sm font-bold">{f.amount}</span>
              {statusBadge(f.status)}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ParentFees() {
  return <ParentPageShell><FeesPage /></ParentPageShell>;
}
