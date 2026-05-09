import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { Bell, Trophy, AlertTriangle, BookOpen, Star, CalendarCheck, Info } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState, EmptyState, ErrorState } from "@/components/states";
import { formatDistanceToNow } from "date-fns";

const iconFor = (type: string) => {
  const m: Record<string, { icon: any; color: string }> = {
    achievement: { icon: Trophy, color: "text-primary bg-primary/20" },
    warning: { icon: AlertTriangle, color: "text-destructive bg-destructive/20" },
    success: { icon: BookOpen, color: "text-xp-green bg-xp-green/20" },
    xp: { icon: Star, color: "text-streak-orange bg-streak-orange/20" },
    attendance: { icon: CalendarCheck, color: "text-streak-orange bg-streak-orange/20" },
    info: { icon: Info, color: "text-magic-blue bg-magic-blue/20" },
  };
  return m[type] || m.info;
};

function AlertsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    enabled: !!user?.id,
    queryKey: ["parent-notifications", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data || [];
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["parent-notifications"] }),
  });

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center"><Bell className="w-5 h-5 text-destructive" /></div>
          <div><h1 className="text-2xl font-bold">🔔 Alert Scroll</h1><p className="text-sm text-muted-foreground">Activity notifications for your children</p></div>
        </div>

        {isLoading ? (
          <LoadingState variant="skeleton" rows={5} />
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !data || data.length === 0 ? (
          <EmptyState title="No alerts yet" description="Notifications will appear here as your children's activity unfolds." />
        ) : (
          <div className="space-y-3">
            {data.map((a: any, i) => {
              const meta = iconFor(a.type);
              const Icon = meta.icon;
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => !a.is_read && markRead.mutate(a.id)}
                  className={`glass rounded-xl p-4 flex items-start gap-4 cursor-pointer ${!a.is_read ? "border border-primary/30" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${meta.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.message}</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(a.created_at), { addSuffix: true })}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function ParentAlerts() {
  return <ParentPageShell><AlertsPage /></ParentPageShell>;
}
