import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ROUTE_ACCESS, type RouteAccessDef } from "@/lib/rbac";
import {
  guessLabel,
  guessSection,
  type ParsedProtectedRoute,
} from "@/lib/rbacReconcile";

export interface RbacAuditEntry {
  id: string;
  at: string;
  actor: string;
  added: string[];
  updated: string[];
}

interface RbacOverrideCtx {
  /** Live (file constants merged with session overrides). */
  effective: RouteAccessDef[];
  hasOverride: boolean;
  audit: RbacAuditEntry[];
  /** Merge parsed App.tsx routes into ROUTE_ACCESS for this session only. */
  applyPatch: (
    missing: ParsedProtectedRoute[],
    mismatches: Array<{ path: string; appRoles: RouteAccessDef["allowedRoles"] }>,
    actor: string,
  ) => RbacAuditEntry;
  reset: () => void;
}

const Ctx = createContext<RbacOverrideCtx | null>(null);

export function RbacOverrideProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<RouteAccessDef[]>([]);
  const [audit, setAudit] = useState<RbacAuditEntry[]>([]);

  const effective = useMemo<RouteAccessDef[]>(() => {
    if (overrides.length === 0) return ROUTE_ACCESS;
    const byPath = new Map(ROUTE_ACCESS.map((r) => [r.path, r]));
    for (const o of overrides) byPath.set(o.path, o);
    return Array.from(byPath.values());
  }, [overrides]);

  const applyPatch = useCallback<RbacOverrideCtx["applyPatch"]>(
    (missing, mismatches, actor) => {
      const next = new Map<string, RouteAccessDef>();
      // Carry forward existing overrides.
      for (const o of overrides) next.set(o.path, o);

      const added: string[] = [];
      const updated: string[] = [];

      // Add missing routes from parser.
      for (const m of missing) {
        next.set(m.path, {
          path: m.path,
          label: guessLabel(m.path),
          section: guessSection(m.allowedRoles),
          allowedRoles: m.allowedRoles,
        });
        added.push(m.path);
      }

      // Update role mismatches to match App.tsx.
      for (const mm of mismatches) {
        const base =
          ROUTE_ACCESS.find((r) => r.path === mm.path) ??
          next.get(mm.path);
        if (!base) continue;
        next.set(mm.path, { ...base, allowedRoles: mm.appRoles });
        updated.push(mm.path);
      }

      setOverrides(Array.from(next.values()));
      const entry: RbacAuditEntry = {
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        actor,
        added,
        updated,
      };
      setAudit((a) => [entry, ...a]);
      return entry;
    },
    [overrides],
  );

  const reset = useCallback(() => {
    setOverrides([]);
    setAudit((a) => [
      {
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
        actor: "system",
        added: [],
        updated: ["__reset__"],
      },
      ...a,
    ]);
  }, []);

  const value = useMemo<RbacOverrideCtx>(
    () => ({
      effective,
      hasOverride: overrides.length > 0,
      audit,
      applyPatch,
      reset,
    }),
    [effective, overrides.length, audit, applyPatch, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRbacOverrides(): RbacOverrideCtx {
  const v = useContext(Ctx);
  if (!v)
    throw new Error("useRbacOverrides must be used inside RbacOverrideProvider");
  return v;
}
