import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ArrowUpRight, BarChart3, CreditCard } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";

const monthlyRevenue = [
  { month: "Sep", amount: 850000 },
  { month: "Oct", amount: 920000 },
  { month: "Nov", amount: 980000 },
  { month: "Dec", amount: 1050000 },
  { month: "Jan", amount: 1100000 },
  { month: "Feb", amount: 1200000 },
];

function RevenuePage() {
  const maxAmount = Math.max(...monthlyRevenue.map(m => m.amount));

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><DollarSign className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold">Revenue</h1>
            <p className="text-muted-foreground text-sm">Platform financial analytics</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Monthly Revenue", value: "₱1.2M", change: "+18%", icon: TrendingUp, color: "text-xp-green" },
            { label: "Annual Revenue", value: "₱12.4M", change: "+42%", icon: BarChart3, color: "text-primary" },
            { label: "MRR Growth", value: "+₱150K", change: "This month", icon: ArrowUpRight, color: "text-magic-purple" },
            { label: "Active Subscriptions", value: "48", change: "+6 this quarter", icon: CreditCard, color: "text-magic-blue" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass rounded-xl p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-[10px] text-xp-green mt-1">{s.change}</div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Monthly Revenue Trend</h3>
          <div className="flex items-end gap-3 h-48">
            {monthlyRevenue.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-primary font-medium">₱{(m.amount / 1000).toFixed(0)}K</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.amount / maxAmount) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="w-full rounded-t-lg bg-gradient-gold min-h-[4px]"
                />
                <span className="text-[10px] text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminRevenue() {
  return (<SuperAdminPageShell><RevenuePage /></SuperAdminPageShell>);
}
