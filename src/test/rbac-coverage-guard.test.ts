/**
 * CI guard for RBAC coverage.
 *
 * Fails the build whenever:
 *   - A protected route exists in App.tsx but is missing from
 *     src/lib/rbac.ts (ROUTE_ACCESS) — i.e. uncovered by the matrix.
 *   - The number of routes accessible to ANY role drops below the
 *     committed baseline (= current ROUTE_ACCESS counts). Increases are fine.
 *   - A route's allowedRoles in App.tsx disagrees with ROUTE_ACCESS.
 *
 * To intentionally lower a role's coverage, update ROUTE_ACCESS in the same
 * commit — the baseline is derived from it, so the guard moves with you.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  diffRoutes,
  coverageFromParsed,
  parseProtectedRoutes,
  RBAC_ROLE_BASELINE,
  RBAC_TOTAL_BASELINE,
  ALL_ROLES,
} from "@/lib/rbacReconcile";

const APP_SRC = readFileSync(
  resolve(__dirname, "../App.tsx"),
  "utf8",
);

describe("RBAC coverage guard", () => {
  const parsed = parseProtectedRoutes(APP_SRC);
  const diff = diffRoutes(APP_SRC);
  const coverage = coverageFromParsed(parsed);

  it("every protected route in App.tsx is covered by ROUTE_ACCESS", () => {
    if (diff.missingFromMap.length > 0) {
      const list = diff.missingFromMap
        .map(
          (r) =>
            `  - ${r.path}  (allowedRoles: [${r.allowedRoles.join(", ")}])`,
        )
        .join("\n");
      throw new Error(
        `RBAC drift: ${diff.missingFromMap.length} protected route(s) in ` +
          `src/App.tsx are missing from src/lib/rbac.ts ROUTE_ACCESS.\n` +
          `Open the admin Permissions page → Auto-Reconcile tab to copy a patch, ` +
          `or add manually:\n${list}`,
      );
    }
    expect(diff.missingFromMap).toHaveLength(0);
  });

  it("ROUTE_ACCESS has no stale entries (path removed from App.tsx)", () => {
    if (diff.staleInMap.length > 0) {
      const list = diff.staleInMap.map((r) => `  - ${r.path}`).join("\n");
      throw new Error(
        `RBAC drift: ${diff.staleInMap.length} entries in ROUTE_ACCESS no ` +
          `longer exist in App.tsx — remove them:\n${list}`,
      );
    }
    expect(diff.staleInMap).toHaveLength(0);
  });

  it("allowedRoles in App.tsx match ROUTE_ACCESS for every shared path", () => {
    if (diff.roleMismatch.length > 0) {
      const list = diff.roleMismatch
        .map(
          (m) =>
            `  - ${m.path}\n      App.tsx:      [${m.appRoles.join(", ")}]\n      ROUTE_ACCESS: [${m.mapRoles.join(", ")}]`,
        )
        .join("\n");
      throw new Error(`RBAC drift: allowedRoles mismatch:\n${list}`);
    }
    expect(diff.roleMismatch).toHaveLength(0);
  });

  it(`total protected routes >= baseline (${RBAC_TOTAL_BASELINE})`, () => {
    expect(coverage.total).toBeGreaterThanOrEqual(RBAC_TOTAL_BASELINE);
  });

  for (const role of ALL_ROLES) {
    it(`role coverage for "${role}" >= baseline (${RBAC_ROLE_BASELINE[role]})`, () => {
      const got = coverage.perRole[role];
      const baseline = RBAC_ROLE_BASELINE[role];
      if (got < baseline) {
        throw new Error(
          `RBAC coverage regression: role "${role}" can now access ${got} ` +
            `route(s), down from baseline ${baseline}. If this is intentional, ` +
            `update ROUTE_ACCESS in src/lib/rbac.ts so the baseline moves too.`,
        );
      }
      expect(got).toBeGreaterThanOrEqual(baseline);
    });
  }

  it("every role still has at least one accessible route", () => {
    for (const role of ALL_ROLES) {
      expect(coverage.perRole[role], `role ${role} has zero routes`).toBeGreaterThan(0);
    }
  });
});
