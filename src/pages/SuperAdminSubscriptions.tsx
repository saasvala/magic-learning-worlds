import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCardsSkeleton, TableSkeleton } from "@/components/states";

interface School {
  id: string;
  name: string;
  subscription_status: string;
  subscription_expires_at: string | null;
  max_students: number;
}

function SubscriptionsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["super-admin-subscriptions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schools").select("id, name, subscription_status, subscription_expires_at, max_students").order("name");
      if (error) throw error;
      return (data ?? []) as School[];
    },
  });

  const subs = data ?? [];
  const counts = {
    active: subs.filter(s => s.subscription_status === "active").length,
    trial: subs.filter(s => s.subscription_status === "trial").length,
    expired: subs.filter(s => s.subscription_status === "expired").length,
  };

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

        {isLoading ? (
          <div className="space-y-6">
            <StatCardsSkeleton count={3} />
            <TableSkeleton rows={5} />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">{counts.active}</div><div className="text-xs text-muted-foreground">Active</div></div>
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-streak-orange">{counts.trial}</div><div className="text-xs text-muted-foreground">Trial</div></div>
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-destructive">{counts.expired}</div><div className="text-xs text-muted-foreground">Expired</div></div>
            </div>

            {subs.length === 0 ? (
              <div className="glass rounded-xl p-10 text-center text-muted-foreground text-sm">No schools registered yet.</div>
            ) : (
              <div className="space-y-3">
                {subs.map((s, i) => {
                  const status = s.subscription_status;
                  return (
                    <motion.div key={s.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status === "active" ? "bg-xp-green/20" : status === "trial" ? "bg-streak-orange/20" : "bg-destructive/20"}`}>
                        {status === "active" ? <CheckCircle2 className="w-5 h-5 text-xp-green" /> : status === "trial" ? <Clock className="w-5 h-5 text-streak-orange" /> : <AlertCircle className="w-5 h-5 text-destructive" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{s.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Capacity: {s.max_students.toLocaleString()} students
                          {s.subscription_expires_at && ` • Expires: ${new Date(s.subscription_expires_at).toLocaleDateString()}`}
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${status === "active" ? "bg-xp-green/20 text-xp-green" : status === "trial" ? "bg-streak-orange/20 text-streak-orange" : "bg-destructive/20 text-destructive"}`}>{status}</span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function SuperAdminSubscriptions() {
  return (<SuperAdminPageShell><SubscriptionsPage /></SuperAdminPageShell>);
}
