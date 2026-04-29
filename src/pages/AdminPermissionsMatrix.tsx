import { Fragment, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Search,
  Shield,
  AlertTriangle,
  Download,
  FileText,
  FileSpreadsheet,
  Ban,
  CheckCircle2,
  XCircle,
  Wand2,
  Copy,
  CheckCheck,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AdminPageShell } from "@/components/AdminPageShell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ALL_ROLES,
  ROLE_LABEL,
  ROLE_EMOJI,
  ROUTE_ACCESS,
  SKIPPED_ROUTES,
  type AppRole,
  type RouteAccessDef,
} from "@/lib/rbac";
import {
  diffRoutes,
  parseProtectedRoutes,
  parseRouteComponents,
  renderRouteAccessPatch,
} from "@/lib/rbacReconcile";
// Vite ?raw — load App.tsx source at build time for live reconciliation.
import APP_SRC from "@/App.tsx?raw";
import { ExternalLink, AlertCircle } from "lucide-react";

export default function AdminPermissionsMatrix() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<AppRole | "all">("all");

  // ---- Matrix tab data ----
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

  // ---- Drilldown tab state ----
  const [drillRole, setDrillRole] = useState<AppRole>("student");
  const [drillQuery, setDrillQuery] = useState("");
  const [drillView, setDrillView] = useState<"all" | "allowed" | "denied">(
    "all",
  );

  // Parsed App.tsx data (source of truth for "what the runtime actually does").
  const parsedRoutes = useMemo(() => parseProtectedRoutes(APP_SRC), []);
  const parsedByPath = useMemo(() => {
    const map = new Map<string, AppRole[]>();
    for (const r of parsedRoutes) map.set(r.path, r.allowedRoles);
    return map;
  }, [parsedRoutes]);
  const componentByPath = useMemo(() => parseRouteComponents(APP_SRC), []);

  const drilldown = useMemo(() => {
    const q = drillQuery.trim().toLowerCase();
    const mapPaths = new Set(ROUTE_ACCESS.map((r) => r.path));
    type DrillRow = {
      path: string;
      label: string;
      section: string;
      allowedRoles: AppRole[];
      allowed: boolean;
      inParser: boolean;
      drift: { kind: string; reason: string } | null;
      component?: string;
    };
    // UI-side rows (from ROUTE_ACCESS).
    const uiRows: DrillRow[] = ROUTE_ACCESS.map((r) => {
      const parserRoles = parsedByPath.get(r.path);
      const uiAllowed = r.allowedRoles.includes(drillRole);
      const parserAllowed = parserRoles?.includes(drillRole) ?? false;
      const inParser = parserRoles !== undefined;
      let drift: { kind: string; reason: string } | null = null;
      if (!inParser) {
        drift = {
          kind: "stale-in-map",
          reason: "Listed in ROUTE_ACCESS but not found as a protected route in App.tsx.",
        };
      } else if (uiAllowed !== parserAllowed) {
        drift = {
          kind: "role-mismatch",
          reason: `Matrix says ${uiAllowed ? "Allow" : "Deny"} for ${ROLE_LABEL[drillRole]}, but App.tsx says ${parserAllowed ? "Allow" : "Deny"}.`,
        };
      }
      return {
        path: r.path,
        label: r.label,
        section: r.section,
        allowedRoles: r.allowedRoles,
        allowed: uiAllowed,
        inParser,
        drift,
        component: componentByPath[r.path],
      };
    });
    // Parser-only rows (in App.tsx but missing from ROUTE_ACCESS).
    const parserOnly: DrillRow[] = parsedRoutes
      .filter((p) => !mapPaths.has(p.path))
      .map((p) => ({
        path: p.path,
        label: p.path,
        section: "—",
        allowedRoles: p.allowedRoles,
        allowed: p.allowedRoles.includes(drillRole),
        inParser: true,
        drift: {
          kind: "missing-from-map",
          reason:
            "Found in App.tsx as a protected route but missing from ROUTE_ACCESS — UI matrix is incomplete.",
        },
        component: componentByPath[p.path],
      }));

    return [...uiRows, ...parserOnly].filter((r) => {
      if (drillView === "allowed" && !r.allowed) return false;
      if (drillView === "denied" && r.allowed) return false;
      if (!q) return true;
      return (
        r.path.toLowerCase().includes(q) ||
        r.label.toLowerCase().includes(q) ||
        r.section.toLowerCase().includes(q)
      );
    });
  }, [drillRole, drillQuery, drillView, parsedRoutes, parsedByPath, componentByPath]);

  const drillCounts = useMemo(() => {
    const allowed = ROUTE_ACCESS.filter((r) =>
      r.allowedRoles.includes(drillRole),
    ).length;
    const denied = ROUTE_ACCESS.length - allowed;
    const drift = drilldown.filter((r) => r.drift).length;
    return { allowed, denied, drift };
  }, [drillRole, drilldown]);

  // ---- Reconcile (App.tsx ↔ ROUTE_ACCESS) ----
  const reconcile = useMemo(() => diffRoutes(APP_SRC), []);
  const reconcilePatch = useMemo(
    () => renderRouteAccessPatch(reconcile.missingFromMap),
    [reconcile.missingFromMap],
  );
  const reconcileCount =
    reconcile.missingFromMap.length +
    reconcile.staleInMap.length +
    reconcile.roleMismatch.length;
  const [copied, setCopied] = useState(false);

  const copyPatch = async () => {
    await navigator.clipboard.writeText(reconcilePatch);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadPatch = () => {
    const blob = new Blob([reconcilePatch], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rbac-route-access.patch.ts";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---- Exports ----
  const exportCsv = () => {
    const header = [
      "Section",
      "Path",
      "Label",
      ...ALL_ROLES.map((r) => ROLE_LABEL[r]),
    ];
    const rows = ROUTE_ACCESS.map((r) => [
      r.section,
      r.path,
      r.label,
      ...ALL_ROLES.map((role) =>
        r.allowedRoles.includes(role) ? "ALLOW" : "DENY",
      ),
    ]);
    const skipHeader = ["Skipped Path", "Reason"];
    const skipRows = SKIPPED_ROUTES.map((s) => [s.path, s.reason]);
    const csv = [
      ["RBAC Permissions Matrix"],
      header,
      ...rows,
      [],
      ["Skipped Routes (not protected by RBAC)"],
      skipHeader,
      ...skipRows,
    ]
      .map((row) =>
        row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    triggerDownload(csv, "rbac-coverage-report.csv", "text/csv");
  };

  const exportPdf = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt" });
    const generated = new Date().toLocaleString();

    doc.setFontSize(16);
    doc.text("RBAC Coverage Report", 40, 40);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Generated: ${generated}`, 40, 56);
    doc.setTextColor(0);

    // Summary
    doc.setFontSize(11);
    doc.text("Summary", 40, 80);
    autoTable(doc, {
      startY: 88,
      theme: "grid",
      styles: { fontSize: 9 },
      head: [["Metric", "Value"]],
      body: [
        ["Total protected routes", String(stats.total)],
        ["Skipped routes (intentional)", String(SKIPPED_ROUTES.length)],
        ["Orphaned routes (no role)", String(stats.orphaned.length)],
        ["Shared routes (>1 role)", String(stats.shared.length)],
        ...ALL_ROLES.map((r) => [
          `${ROLE_LABEL[r]} accessible`,
          `${stats.perRole[r]} (${((stats.perRole[r] / stats.total) * 100).toFixed(1)}%)`,
        ]),
      ],
    });

    // Matrix
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 20,
      theme: "striped",
      styles: { fontSize: 8, cellPadding: 4 },
      headStyles: { fillColor: [30, 30, 60] },
      head: [
        [
          "Section",
          "Page",
          "Path",
          ...ALL_ROLES.map((r) => ROLE_LABEL[r]),
        ],
      ],
      body: ROUTE_ACCESS.map((r) => [
        r.section,
        r.label,
        r.path,
        ...ALL_ROLES.map((role) =>
          r.allowedRoles.includes(role) ? "ALLOW" : "—",
        ),
      ]),
      didDrawPage: () => {
        const pageCount = (doc as any).internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(120);
        doc.text(
          `RBAC Coverage Report · page ${(doc as any).internal.getCurrentPageInfo().pageNumber} / ${pageCount}`,
          40,
          doc.internal.pageSize.getHeight() - 20,
        );
      },
    });

    // Skipped routes
    doc.addPage();
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.text("Skipped Routes (not parsed by RBAC matrix)", 40, 40);
    autoTable(doc, {
      startY: 56,
      theme: "grid",
      styles: { fontSize: 9 },
      head: [["Path", "Reason"]],
      body: SKIPPED_ROUTES.map((s) => [s.path, s.reason]),
    });

    doc.save("rbac-coverage-report.pdf");
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
          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition"
            >
              <FileSpreadsheet className="w-4 h-4" /> CSV
            </button>
            <button
              onClick={exportPdf}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
            >
              <FileText className="w-4 h-4" /> PDF
            </button>
          </div>
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

        <Tabs defaultValue="matrix" className="w-full">
          <TabsList>
            <TabsTrigger value="matrix">Full Matrix</TabsTrigger>
            <TabsTrigger value="drilldown">Per-Role Drill-down</TabsTrigger>
            <TabsTrigger value="skipped">
              Skipped Routes
              <Badge variant="secondary" className="ml-2">
                {SKIPPED_ROUTES.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="reconcile">
              Auto-Reconcile
              {reconcileCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {reconcileCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ---------- MATRIX ---------- */}
          <TabsContent value="matrix" className="space-y-4 mt-4">
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
          </TabsContent>

          {/* ---------- DRILL-DOWN ---------- */}
          <TabsContent value="drilldown" className="space-y-4 mt-4">
            <div className="flex items-center gap-1 flex-wrap">
              {ALL_ROLES.map((r) => (
                <FilterChip
                  key={r}
                  active={drillRole === r}
                  onClick={() => setDrillRole(r)}
                  label={`${ROLE_EMOJI[r]} ${ROLE_LABEL[r]}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard
                label="Total"
                value={ROUTE_ACCESS.length}
              />
              <StatCard
                label="✓ Allowed"
                value={drillCounts.allowed}
              />
              <StatCard
                label="✕ Denied"
                value={drillCounts.denied}
              />
              <StatCard
                label="⚠ Drift"
                value={drillCounts.drift}
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={drillQuery}
                  onChange={(e) => setDrillQuery(e.target.value)}
                  placeholder={`Search ${ROLE_LABEL[drillRole]} routes...`}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-1">
                <FilterChip
                  active={drillView === "all"}
                  onClick={() => setDrillView("all")}
                  label="All"
                />
                <FilterChip
                  active={drillView === "allowed"}
                  onClick={() => setDrillView("allowed")}
                  label="Allowed"
                />
                <FilterChip
                  active={drillView === "denied"}
                  onClick={() => setDrillView("denied")}
                  label="Denied"
                />
              </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium w-20">Status</th>
                    <th className="text-left p-3 font-medium">Page</th>
                    <th className="text-left p-3 font-medium">Path</th>
                    <th className="text-left p-3 font-medium">Section</th>
                    <th className="text-left p-3 font-medium">Other roles</th>
                    <th className="text-left p-3 font-medium w-32">View route</th>
                  </tr>
                </thead>
                <tbody>
                  {drilldown.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-muted-foreground"
                      >
                        No routes match.
                      </td>
                    </tr>
                  )}
                  {drilldown.map((r) => {
                    const breadcrumb = [
                      r.section !== "—" ? r.section : null,
                      r.label !== r.path ? r.label : null,
                    ]
                      .filter(Boolean)
                      .join(" › ") || r.path;
                    const componentFile = r.component
                      ? `src/pages/${r.component}.tsx`
                      : null;
                    const driftClass = r.drift
                      ? "bg-destructive/10 hover:bg-destructive/15 border-l-2 border-l-destructive"
                      : "hover:bg-muted/30";
                    return (
                      <>
                        <tr
                          key={r.path}
                          className={`border-t border-border transition ${driftClass}`}
                        >
                          <td className="p-3">
                            {r.allowed ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                                <CheckCircle2 className="w-4 h-4" /> Allow
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                <XCircle className="w-4 h-4" /> Deny
                              </span>
                            )}
                          </td>
                          <td className="p-3 font-medium">
                            <div className="flex items-center gap-2">
                              <span>{r.label}</span>
                              {r.drift && (
                                <Badge
                                  variant="destructive"
                                  className="text-[10px] px-1.5 py-0"
                                  title={r.drift.reason}
                                >
                                  {r.drift.kind === "missing-from-map"
                                    ? "Parser only"
                                    : r.drift.kind === "stale-in-map"
                                    ? "UI only"
                                    : "Role mismatch"}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <code className="text-xs text-muted-foreground">
                              {r.path}
                            </code>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {r.section}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 flex-wrap">
                              {r.allowedRoles
                                .filter((x) => x !== drillRole)
                                .map((x) => (
                                  <Badge key={x} variant="secondary">
                                    {ROLE_EMOJI[x]} {ROLE_LABEL[x]}
                                  </Badge>
                                ))}
                              {r.allowedRoles.filter((x) => x !== drillRole)
                                .length === 0 && (
                                <span className="text-xs text-muted-foreground">
                                  —
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <a
                              href={r.path}
                              target="_blank"
                              rel="noreferrer"
                              title={
                                componentFile
                                  ? `Open ${r.path} · ${componentFile} · ${breadcrumb}`
                                  : `Open ${r.path} · ${breadcrumb}`
                              }
                              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              {r.component ?? "Open"}
                            </a>
                            <div className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-[180px]">
                              {breadcrumb}
                            </div>
                          </td>
                        </tr>
                        {r.drift && (
                          <tr
                            key={`${r.path}-drift`}
                            className="bg-destructive/5 border-l-2 border-l-destructive"
                          >
                            <td colSpan={6} className="px-3 pb-3 pt-0">
                              <div className="flex items-start gap-2 text-xs text-destructive">
                                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                <span>
                                  <strong className="font-semibold">
                                    Discrepancy:
                                  </strong>{" "}
                                  {r.drift.reason}
                                </span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground">
              {ROLE_LABEL[drillRole]} can access {drillCounts.allowed} of{" "}
              {ROUTE_ACCESS.length} protected routes (
              {((drillCounts.allowed / ROUTE_ACCESS.length) * 100).toFixed(1)}%).
              {drillCounts.drift > 0 && (
                <>
                  {" "}
                  <span className="text-destructive font-medium">
                    {drillCounts.drift} drift row(s) need attention.
                  </span>
                </>
              )}
            </p>
          </TabsContent>

          {/* ---------- SKIPPED ROUTES ---------- */}
          <TabsContent value="skipped" className="space-y-4 mt-4">
            <div className="flex items-start gap-2 p-3 rounded-lg border border-border bg-muted/30 text-sm">
              <Ban className="w-4 h-4 text-muted-foreground mt-0.5" />
              <p className="text-muted-foreground">
                The RBAC matrix parser only matches routes wrapped in{" "}
                <code className="text-xs">
                  &lt;ProtectedRoute allowedRoles=&#123;[…]&#125;&gt;
                </code>
                . Routes below are declared in{" "}
                <code className="text-xs">src/App.tsx</code> but{" "}
                <strong>intentionally skipped</strong> — verify each is meant to
                be public or unguarded.
              </p>
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium w-1/3">Path</th>
                    <th className="text-left p-3 font-medium">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {SKIPPED_ROUTES.map((s) => (
                    <tr
                      key={s.path}
                      className="border-t border-border hover:bg-muted/30 transition"
                    >
                      <td className="p-3">
                        <code className="text-xs">{s.path}</code>
                      </td>
                      <td className="p-3 text-muted-foreground">{s.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ---------- AUTO-RECONCILE ---------- */}
          <TabsContent value="reconcile" className="space-y-4 mt-4">
            <div className="flex items-start gap-2 p-3 rounded-lg border border-border bg-muted/30 text-sm">
              <Wand2 className="w-4 h-4 text-muted-foreground mt-0.5" />
              <p className="text-muted-foreground">
                Live diff between <code className="text-xs">src/App.tsx</code>{" "}
                and <code className="text-xs">ROUTE_ACCESS</code> in{" "}
                <code className="text-xs">src/lib/rbac.ts</code>. The CI guard{" "}
                <code className="text-xs">rbac-coverage-guard.test.ts</code>{" "}
                fails the build whenever any of these counts is non-zero.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <StatCard
                label="Missing from map"
                value={reconcile.missingFromMap.length}
              />
              <StatCard
                label="Stale in map"
                value={reconcile.staleInMap.length}
              />
              <StatCard
                label="Role mismatch"
                value={reconcile.roleMismatch.length}
              />
            </div>

            {reconcileCount === 0 && (
              <div className="flex items-center gap-2 p-4 rounded-lg border border-primary/30 bg-primary/10 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>
                  ROUTE_ACCESS is fully in sync with App.tsx. Nothing to
                  reconcile.
                </span>
              </div>
            )}

            {reconcile.missingFromMap.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Missing from ROUTE_ACCESS ({reconcile.missingFromMap.length})
                </h3>
                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Path</th>
                        <th className="text-left p-3 font-medium">
                          Allowed roles (from App.tsx)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reconcile.missingFromMap.map((r) => (
                        <tr
                          key={r.path}
                          className="border-t border-border hover:bg-muted/30"
                        >
                          <td className="p-3">
                            <code className="text-xs">{r.path}</code>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1 flex-wrap">
                              {r.allowedRoles.map((x) => (
                                <Badge key={x} variant="secondary">
                                  {ROLE_EMOJI[x as AppRole]}{" "}
                                  {ROLE_LABEL[x as AppRole]}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between gap-2 mt-3">
                  <p className="text-xs text-muted-foreground">
                    Suggested patch (paste into{" "}
                    <code>src/lib/rbac.ts</code>):
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyPatch}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:bg-muted transition"
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadPatch}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:bg-muted transition"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
                <pre className="rounded-lg border border-border bg-muted/30 p-3 text-xs overflow-x-auto">
                  <code>{reconcilePatch}</code>
                </pre>
              </section>
            )}

            {reconcile.staleInMap.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Stale entries in ROUTE_ACCESS ({reconcile.staleInMap.length})
                </h3>
                <p className="text-xs text-muted-foreground">
                  These paths exist in <code>ROUTE_ACCESS</code> but no longer
                  appear in <code>App.tsx</code>. Remove them.
                </p>
                <ul className="rounded-lg border border-border bg-card p-3 text-sm space-y-1">
                  {reconcile.staleInMap.map((r) => (
                    <li key={r.path}>
                      <code className="text-xs">{r.path}</code>{" "}
                      <span className="text-muted-foreground">
                        — {r.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {reconcile.roleMismatch.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  allowedRoles mismatches ({reconcile.roleMismatch.length})
                </h3>
                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Path</th>
                        <th className="text-left p-3 font-medium">
                          App.tsx
                        </th>
                        <th className="text-left p-3 font-medium">
                          ROUTE_ACCESS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reconcile.roleMismatch.map((m) => (
                        <tr
                          key={m.path}
                          className="border-t border-border hover:bg-muted/30"
                        >
                          <td className="p-3">
                            <code className="text-xs">{m.path}</code>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            [{m.appRoles.join(", ")}]
                          </td>
                          <td className="p-3 text-muted-foreground">
                            [{m.mapRoles.join(", ")}]
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageShell>
  );
}

function triggerDownload(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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
