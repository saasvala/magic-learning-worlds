/**
 * Pure helpers for reconciling the parsed App.tsx route table against the
 * static ROUTE_ACCESS map in src/lib/rbac.ts. Used by:
 *   - src/pages/AdminPermissionsMatrix.tsx (live UI)
 *   - src/test/rbac-coverage-guard.test.ts (CI guard)
 */
import {
  ALL_ROLES,
  ROUTE_ACCESS,
  type AppRole,
  type RouteAccessDef,
} from "@/lib/rbac";

export interface ParsedProtectedRoute {
  path: string;
  allowedRoles: AppRole[];
}

const PROTECTED_RE =
  /<Route\s+path="([^"]+)"\s+element=\{<ProtectedRoute\s+allowedRoles=\{(\[[^\]]+\])\}>/g;

const ANY_ROUTE_RE = /<Route\s+path="([^"]+)"/g;

/** Extract the wrapped component name for each protected route in App.tsx. */
const PROTECTED_WITH_COMPONENT_RE =
  /<Route\s+path="([^"]+)"\s+element=\{<ProtectedRoute\s+allowedRoles=\{\[[^\]]+\]\}>\s*<([A-Za-z0-9_]+)\s*\/?>/g;

export function parseRouteComponents(src: string): Record<string, string> {
  const out: Record<string, string> = {};
  let m: RegExpExecArray | null;
  PROTECTED_WITH_COMPONENT_RE.lastIndex = 0;
  while ((m = PROTECTED_WITH_COMPONENT_RE.exec(src)) !== null) {
    out[m[1]] = m[2];
  }
  return out;
}

export function parseProtectedRoutes(src: string): ParsedProtectedRoute[] {
  const out: ParsedProtectedRoute[] = [];
  let m: RegExpExecArray | null;
  PROTECTED_RE.lastIndex = 0;
  while ((m = PROTECTED_RE.exec(src)) !== null) {
    const roles = m[2]
      .replace(/[\[\]"\s]/g, "")
      .split(",")
      .filter(Boolean) as AppRole[];
    out.push({ path: m[1], allowedRoles: roles });
  }
  return out;
}

export function parseAllRoutePaths(src: string): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  ANY_ROUTE_RE.lastIndex = 0;
  while ((m = ANY_ROUTE_RE.exec(src)) !== null) out.push(m[1]);
  return Array.from(new Set(out));
}

export interface RouteDiff {
  /** Protected routes in App.tsx but missing from ROUTE_ACCESS. */
  missingFromMap: ParsedProtectedRoute[];
  /** Entries in ROUTE_ACCESS that no longer exist in App.tsx. */
  staleInMap: RouteAccessDef[];
  /** Same path in both, but `allowedRoles` differs. */
  roleMismatch: Array<{
    path: string;
    appRoles: AppRole[];
    mapRoles: AppRole[];
  }>;
  /** Declared routes that are NOT protected (intentional public/skip). */
  skippedDeclaredRoutes: string[];
}

export function diffRoutes(
  src: string,
  map: RouteAccessDef[] = ROUTE_ACCESS,
): RouteDiff {
  const protectedRoutes = parseProtectedRoutes(src);
  const allDeclared = parseAllRoutePaths(src);
  const protectedPathSet = new Set(protectedRoutes.map((r) => r.path));
  const mapByPath = new Map(map.map((r) => [r.path, r]));

  const missingFromMap: ParsedProtectedRoute[] = [];
  const roleMismatch: RouteDiff["roleMismatch"] = [];

  for (const r of protectedRoutes) {
    const inMap = mapByPath.get(r.path);
    if (!inMap) {
      missingFromMap.push(r);
      continue;
    }
    const a = [...r.allowedRoles].sort().join(",");
    const b = [...inMap.allowedRoles].sort().join(",");
    if (a !== b) {
      roleMismatch.push({
        path: r.path,
        appRoles: r.allowedRoles,
        mapRoles: inMap.allowedRoles,
      });
    }
  }

  const staleInMap = map.filter((r) => !protectedPathSet.has(r.path));
  const skippedDeclaredRoutes = allDeclared.filter(
    (p) => !protectedPathSet.has(p),
  );

  return { missingFromMap, staleInMap, roleMismatch, skippedDeclaredRoutes };
}

/** Best-effort label guess from the path — humans should still review. */
export function guessLabel(path: string): string {
  const tail = path.split("/").filter(Boolean).pop() ?? path;
  return tail
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

/** Best-effort section guess based on the role(s) the route is granted to. */
export function guessSection(
  roles: AppRole[],
): RouteAccessDef["section"] {
  if (roles.includes("super_admin")) return "Super Admin";
  if (roles.includes("school_admin")) return "School Admin";
  if (roles.includes("teacher")) return "Teacher";
  if (roles.includes("parent")) return "Parent";
  return "Student";
}

/** Render a TypeScript snippet the user can paste into ROUTE_ACCESS. */
export function renderRouteAccessPatch(missing: ParsedProtectedRoute[]): string {
  if (missing.length === 0) return "// ROUTE_ACCESS is up to date — no patch needed.\n";
  const lines = [
    "// Append the following entries to ROUTE_ACCESS in src/lib/rbac.ts:",
  ];
  for (const r of missing) {
    const section = guessSection(r.allowedRoles);
    const label = guessLabel(r.path);
    const roles = r.allowedRoles.map((x) => `"${x}"`).join(", ");
    lines.push(
      `{ path: "${r.path}", label: "${label}", section: "${section}", allowedRoles: [${roles}] },`,
    );
  }
  return lines.join("\n") + "\n";
}

export interface CoverageStats {
  total: number;
  perRole: Record<AppRole, number>;
}

export function coverageFromParsed(
  routes: ParsedProtectedRoute[],
): CoverageStats {
  const perRole: Record<AppRole, number> = {
    student: 0,
    teacher: 0,
    school_admin: 0,
    super_admin: 0,
    parent: 0,
  };
  for (const r of routes)
    for (const role of r.allowedRoles) if (role in perRole) perRole[role]++;
  return { total: routes.length, perRole };
}

export const RBAC_ROLE_BASELINE: Record<AppRole, number> = {
  student: ROUTE_ACCESS.filter((r) => r.allowedRoles.includes("student")).length,
  teacher: ROUTE_ACCESS.filter((r) => r.allowedRoles.includes("teacher")).length,
  school_admin: ROUTE_ACCESS.filter((r) => r.allowedRoles.includes("school_admin"))
    .length,
  super_admin: ROUTE_ACCESS.filter((r) => r.allowedRoles.includes("super_admin"))
    .length,
  parent: ROUTE_ACCESS.filter((r) => r.allowedRoles.includes("parent")).length,
};

export const RBAC_TOTAL_BASELINE = ROUTE_ACCESS.length;

export { ALL_ROLES };
