import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";

const transactions = [
  { id: 1, desc: "Tuition Payment - Maria Santos", amount: 15000, type: "income", date: "Mar 1", method: "GCash" },
  { id: 2, desc: "Lab Equipment Purchase", amount: -8500, type: "expense", date: "Feb 28", method: "Bank Transfer" },
  { id: 3, desc: "Tuition Payment - Juan Dela Cruz", amount: 15000, type: "income", date: "Feb 27", method: "Bank Transfer" },
  { id: 4, desc: "Teacher Salary - February", amount: -450000, type: "expense", date: "Feb 25", method: "Payroll" },
  { id: 5, desc: "Facility Maintenance", amount: -12000, type: "expense", date: "Feb 24", method: "Cash" },
  { id: 6, desc: "Tuition Payment - Bea Reyes", amount: 12000, type: "income", date: "Feb 23", method: "Maya" },
];

function AdminFinancePage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><DollarSign className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold">Finance</h1>
            <p className="text-muted-foreground text-sm">Track fees, payments, and expenses</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Revenue", value: "₱2.4M", change: "+12%", icon: TrendingUp, color: "text-xp-green" },
            { label: "Collected Fees", value: "₱1.8M", change: "75%", icon: CreditCard, color: "text-primary" },
            { label: "Pending Fees", value: "₱600K", change: "25%", icon: Receipt, color: "text-streak-orange" },
            { label: "Expenses", value: "₱1.1M", change: "+5%", icon: ArrowDownRight, color: "text-destructive" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass rounded-xl p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className={`text-[10px] ${s.color} mt-1`}>{s.change}</div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {transactions.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === "income" ? "bg-xp-green/20" : "bg-destructive/20"}`}>
                  {t.type === "income" ? <ArrowUpRight className="w-4 h-4 text-xp-green" /> : <ArrowDownRight className="w-4 h-4 text-destructive" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{t.desc}</div>
                  <div className="text-xs text-muted-foreground">{t.date} • {t.method}</div>
                </div>
                <span className={`text-sm font-bold ${t.type === "income" ? "text-xp-green" : "text-destructive"}`}>
                  {t.type === "income" ? "+" : ""}₱{Math.abs(t.amount).toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminFinance() {
  return (<AdminPageShell><AdminFinancePage /></AdminPageShell>);
}
