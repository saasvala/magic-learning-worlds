import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Search, Shield, AlertTriangle, Download } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ALL_ROLES,
  ROLE_LABEL,
  ROLE_EMOJI,
  ROUTE_ACCESS,
  type AppRole,
  type RouteAccessDef,
} from "@/lib/rbac";

export default function AdminPermissionsMatrix() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<AppRole | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROUTE_ACCESS.filter((r) => {
      if (roleFilter !== "all" && !r.allowedRoles.includes(roleFilter))
        return false;
      if (!q) return true;
      return (
        r.path.toLowerCase().includes(q) ||
        r.label.toLowerCase().includes(q) ||
        r.section.toLowerCase().includes(q)
      );
    });
  }, [query, roleFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, RouteAccessDef[]>();
    for (const r of filtered) {
      if (!map.has(r.section)) map.set(r.section, []);
      map.get(r.section)!.push(r);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const stats = useMemo(() => {
    const perRole: Record<AppRole, number> = {
      student: 0,
      teacher: 0,
      school_admin: 0,
      super_admin: 0,
      parent: 0,
    };
    for (const r of ROUTE_ACCESS)
      for (const role of r.allowedRoles) perRole[role]++;
    const orphaned = ROUTE_ACCESS.filter((r) => r.allowedRoles.length === 0);
    const shared = ROUTE_ACCESS.filter((r) => r.allowedRoles.length > 1);
    return { perRole, orphaned, shared, total: ROUTE_ACCESS.length };
  }, []);

  const exportCsv = () => {
    const header = ["Section", "Path", "Label", ...ALL_ROLES.map(ROLE_LABEL.bind(null))];
    const rows = ROUTE_ACCESS.map((r) => [
      r.section,
      r.path,
      r.label,
      ...ALL_ROLES.map((role) =>
        r.allowedRoles.includes(role) ? "ALLOW" : "DENY"
      ),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rbac-permissions-matrix.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminPageShell>
      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4 flex-wrap"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-primary" />
              <h1 className="text-2xl font-bold">Permissions Matrix</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Live audit of every protected route and which roles can access
              it. Source: <code className="text-xs">src/lib/rbac.ts</code>
            </p>
          </div>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <StatCard label="Total Routes" value={stats.total} />
          {ALL_ROLES.map((r) => (
            <StatCard
              key={r}
              label={`${ROLE_EMOJI[r]} ${ROLE_LABEL[r]}`}
              value={stats.perRole[r]}
            />
          ))}
        </div>

        {/* Warnings */}
        {stats.orphaned.length > 0 && (
          <div className="flex items-start gap-2 p-3 rounded-lg border border-destructive/40 bg-destructive/10 text-sm">
            <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
            <div>
              <strong>{stats.orphaned.length} orphaned route(s)</strong> with no
              allowed role:
              <ul className="mt-1 list-disc pl-5">
                {stats.orphaned.map((r) => (
                  <li key={r.path}>
                    <code>{r.path}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search path, label, section..."
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <FilterChip
              active={roleFilter === "all"}
              onClick={() => setRoleFilter("all")}
              label="All roles"
            />
            {ALL_ROLES.map((r) => (
              <FilterChip
                key={r}
                active={roleFilter === r}
                onClick={() => setRoleFilter(r)}
                label={`${ROLE_EMOJI[r]} ${ROLE_LABEL[r]}`}
              />
            ))}
          </div>
        </div>

        {/* Matrix table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="text-left p-3 font-medium">Page</th>
                  <th className="text-left p-3 font-medium">Path</th>
                  {ALL_ROLES.map((r) => (
                    <th
                      key={r}
                      className="text-center p-3 font-medium whitespace-nowrap"
                    >
                      {ROLE_EMOJI[r]} {ROLE_LABEL[r]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grouped.length === 0 && (
                  <tr>
                    <td
                      colSpan={2 + ALL_ROLES.length}
                      className="p-8 text-center text-muted-foreground"
                    >
                      No routes match your filters.
                    </td>
                  </tr>
                )}
                {grouped.map(([section, routes]) => (
                  <>
                    <tr key={`h-${section}`} className="bg-muted/20">
                      <td
                        colSpan={2 + ALL_ROLES.length}
                        className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {section}
                        <Badge variant="secondary" className="ml-2">
                          {routes.length}
                        </Badge>
                      </td>
                    </tr>
                    {routes.map((r) => (
                      <tr
                        key={r.path}
                        className="border-t border-border hover:bg-muted/30 transition"
                      >
                        <td className="p-3 font-medium">{r.label}</td>
                        <td className="p-3">
                          <code className="text-xs text-muted-foreground">
                            {r.path}
                          </code>
                        </td>
                        {ALL_ROLES.map((role) => {
                          const allowed = r.allowedRoles.includes(role);
                          return (
                            <td key={role} className="p-3 text-center">
                              {allowed ? (
                                <span
                                  title={`${ROLE_LABEL[role]} can access`}
                                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 text-primary"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                              ) : (
                                <span
                                  title={`${ROLE_LABEL[role]} blocked`}
                                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground/50"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {ROUTE_ACCESS.length} routes.
        </p>
      </div>
    </AdminPageShell>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground truncate">
        {label}
      </div>
      <div className="text-xl font-bold mt-1">{value}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-muted-foreground border-border hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}
