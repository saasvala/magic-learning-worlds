import { motion } from "framer-motion";
import {
  Globe, Building2, DollarSign, Activity,
  Server, AlertCircle, CheckCircle2, ShieldCheck
} from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { DemoBadge } from "@/components/states/DemoBadge";

const securityLogs = [
  { event: "Failed login attempt (3x)", user: "unknown@test.com", time: "5m ago", severity: "high" },
  { event: "Admin role assigned", user: "admin@mabini.edu", time: "1h ago", severity: "medium" },
  { event: "Backup completed", user: "system", time: "2h ago", severity: "low" },
  { event: "API rate limit reached", user: "rizal-api-key", time: "3h ago", severity: "medium" },
];

const systemHealth = [
  { service: "API Server", status: "operational", latency: "45ms" },
  { service: "Database", status: "operational", latency: "12ms" },
  { service: "AI Tutor", status: "operational", latency: "180ms" },
  { service: "CDN / Assets", status: "operational", latency: "22ms" },
  { service: "Backup Service", status: "maintenance", latency: "—" },
];

function useGlobalStats() {
  return useQuery({
    queryKey: ["super-admin-global-stats"],
    queryFn: async () => {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const [schoolsCount, usersCount, schoolsList, paymentsThisMonth] = await Promise.all([
        supabase.from("schools").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase
          .from("schools")
          .select("id, name, city, region, subscription_status")
          .order("created_at", { ascending: false })
          .limit(8),
        supabase
          .from("payments")
          .select("amount, status")
          .gte("created_at", monthStart.toISOString())
          .eq("status", "paid"),
      ]);

      // Count students per school (best-effort, may be limited by RLS but super_admin sees all)
      const schoolIds = (schoolsList.data || []).map((s: any) => s.id);
      let studentCounts: Record<string, number> = {};
      if (schoolIds.length) {
        const { data: studentRows } = await supabase
          .from("profiles")
          .select("school_id")
          .eq("role", "student")
          .in("school_id", schoolIds);
        for (const row of studentRows || []) {
          const sid = (row as any).school_id;
          if (sid) studentCounts[sid] = (studentCounts[sid] || 0) + 1;
        }
      }

      const monthlyRevenue = (paymentsThisMonth.data || []).reduce(
        (sum: number, p: any) => sum + Number(p.amount || 0),
        0
      );

      return {
        totalSchools: schoolsCount.count ?? 0,
        totalUsers: usersCount.count ?? 0,
        monthlyRevenue,
        schools: (schoolsList.data || []).map((s: any) => ({
          ...s,
          students: studentCounts[s.id] || 0,
        })),
      };
    },
  });
}

function StatCard({
  label, value, icon: Icon, color, loading,
}: { label: string; value: string | number; icon: any; color: string; loading?: boolean }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      {loading ? (
        <Skeleton className="h-7 w-20 mb-1" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

const formatPHP = (n: number) =>
  n >= 1_000_000 ? `₱${(n / 1_000_000).toFixed(1)}M` :
  n >= 1_000 ? `₱${(n / 1_000).toFixed(1)}K` :
  `₱${n.toFixed(0)}`;

function SuperAdminHome() {
  const { data, isLoading } = useGlobalStats();

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Global Dashboard</h1>
        <p className="text-muted-foreground text-sm mb-6">Magic Learning World • Platform Overview</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Schools" value={data?.totalSchools ?? 0} icon={Building2} color="text-magic-blue" loading={isLoading} />
          <StatCard label="Total Users" value={(data?.totalUsers ?? 0).toLocaleString()} icon={Globe} color="text-xp-green" loading={isLoading} />
          <StatCard label="Monthly Revenue" value={data ? formatPHP(data.monthlyRevenue) : "—"} icon={DollarSign} color="text-primary" loading={isLoading} />
          <StatCard label="System Uptime" value="99.97%" icon={Activity} color="text-magic-purple" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-magic-blue" /> Schools</h3>
            <div className="space-y-2">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)
              ) : (data?.schools || []).length === 0 ? (
                <p className="text-sm text-muted-foreground p-3">No schools yet.</p>
              ) : (
                data!.schools.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{s.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {[s.city, s.region].filter(Boolean).join(", ") || "—"} • {s.students.toLocaleString()} students
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary/20 text-primary capitalize">
                      {s.subscription_status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Server className="w-4 h-4 text-xp-green" /> System Health</h3>
              <DemoBadge />
            </div>
            <div className="space-y-2">
              {systemHealth.map((s) => (
                <div key={s.service} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                  {s.status === "operational" ? <CheckCircle2 className="w-4 h-4 text-xp-green shrink-0" /> : <AlertCircle className="w-4 h-4 text-streak-orange shrink-0" />}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{s.service}</div>
                    <div className="text-xs text-muted-foreground capitalize">{s.status}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{s.latency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-destructive" /> Security Logs</h3>
            <DemoBadge />
          </div>
          <div className="space-y-2">
            {securityLogs.map((l, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  l.severity === "high" ? "bg-destructive" : l.severity === "medium" ? "bg-streak-orange" : "bg-xp-green"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{l.event}</div>
                  <div className="text-xs text-muted-foreground">{l.user} • {l.time}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-medium ${
                  l.severity === "high" ? "bg-destructive/20 text-destructive" :
                  l.severity === "medium" ? "bg-streak-orange/20 text-streak-orange" : "bg-xp-green/20 text-xp-green"
                }`}>{l.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminDashboard() {
  return (
    <SuperAdminPageShell>
      <SuperAdminHome />
    </SuperAdminPageShell>
  );
}
