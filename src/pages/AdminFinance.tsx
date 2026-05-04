import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard, Receipt, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string | null;
  description: string | null;
  paid_at: string | null;
  created_at: string;
}

function formatCurrency(n: number, currency = "PHP") {
  try { return new Intl.NumberFormat("en-PH", { style: "currency", currency, maximumFractionDigits: 0 }).format(n); }
  catch { return `₱${Math.round(n).toLocaleString()}`; }
}

function AdminFinancePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-finance"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as Payment[];
    },
  });

  const payments = data ?? [];
  const collected = payments.filter(p => p.status === "completed" || p.status === "paid").reduce((s, p) => s + Number(p.amount), 0);
  const pending = payments.filter(p => p.status === "pending").reduce((s, p) => s + Number(p.amount), 0);
  const total = collected + pending;
  const collectedPct = total ? Math.round((collected / total) * 100) : 0;
  const pendingPct = total ? Math.round((pending / total) * 100) : 0;

  const stats = [
    { label: "Total Revenue", value: formatCurrency(total), change: `${payments.length} txns`, icon: TrendingUp, color: "text-xp-green" },
    { label: "Collected Fees", value: formatCurrency(collected), change: `${collectedPct}%`, icon: CreditCard, color: "text-primary" },
    { label: "Pending Fees", value: formatCurrency(pending), change: `${pendingPct}%`, icon: Receipt, color: "text-streak-orange" },
    { label: "Transactions", value: String(payments.length), change: "last 200", icon: ArrowDownRight, color: "text-magic-blue" },
  ];

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><DollarSign className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold">Finance</h1>
            <p className="text-muted-foreground text-sm">Track fees, payments, and collections</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((s, i) => (
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
              {payments.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-6">No transactions yet.</div>
              ) : (
                <div className="space-y-2">
                  {payments.slice(0, 20).map((t, i) => {
                    const isIncome = t.status === "completed" || t.status === "paid";
                    return (
                      <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isIncome ? "bg-xp-green/20" : "bg-streak-orange/20"}`}>
                          {isIncome ? <ArrowUpRight className="w-4 h-4 text-xp-green" /> : <ArrowDownRight className="w-4 h-4 text-streak-orange" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{t.description ?? "Payment"}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(t.paid_at ?? t.created_at).toLocaleDateString()} • {t.payment_method ?? "—"} • <span className="capitalize">{t.status}</span>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${isIncome ? "text-xp-green" : "text-streak-orange"}`}>
                          {formatCurrency(Number(t.amount), t.currency)}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function AdminFinance() {
  return (<AdminPageShell><AdminFinancePage /></AdminPageShell>);
}
