import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Architectural guarantees. Fail the build if:
 *   1. Any authenticated role page stops wrapping itself in a PageShell.
 *   2. Any PageShell stops delegating to DashboardLayout.
 *   3. DashboardLayout stops rendering NotificationBell.
 */

const ROOT = resolve(__dirname, "../..");
const PAGES_DIR = join(ROOT, "src/pages");
const COMPONENTS_DIR = join(ROOT, "src/components");

const PUBLIC_PAGES = new Set([
  "LandingPage.tsx",
  "AuthPage.tsx",
  "Index.tsx",
  "NotFound.tsx",
]);

const KNOWN_SHELLS = [
  "StudentPageShell",
  "TeacherPageShell",
  "AdminPageShell",
  "SuperAdminPageShell",
  "ParentPageShell",
];

// SuperAdmin must come before Admin so the prefix match wins.
const ROLE_SHELL_MAP = [
  { prefix: "SuperAdmin", shell: "SuperAdminPageShell" },
  { prefix: "Student", shell: "StudentPageShell" },
  { prefix: "Teacher", shell: "TeacherPageShell" },
  { prefix: "Admin", shell: "AdminPageShell" },
  { prefix: "Parent", shell: "ParentPageShell" },
];

const ANY_SHELL_PAGES = new Set([
  "ContentLibrary.tsx",
  "MediaAssets.tsx",
  "GamificationControl.tsx",
  "TranslationManager.tsx",
  "DeviceSessionManager.tsx",
  "CurriculumEditor.tsx",
  "LearningAnalytics.tsx",
]);

const listPages = () =>
  readdirSync(PAGES_DIR).filter((f) => f.endsWith(".tsx"));

describe("Dashboard architecture guarantees", () => {
  it("DashboardLayout renders <NotificationBell />", () => {
    const file = readFileSync(
      join(COMPONENTS_DIR, "DashboardLayout.tsx"),
      "utf8"
    );
    expect(file).toMatch(/import\s+\{\s*NotificationBell\s*\}\s+from/);
    expect(file).toMatch(/<NotificationBell\s*\/?>/);
  });

  it.each(KNOWN_SHELLS)(
    "%s wraps DashboardLayout (so the bell is inherited)",
    (shellName) => {
      const file = readFileSync(
        join(COMPONENTS_DIR, `${shellName}.tsx`),
        "utf8"
      );
      expect(file).toMatch(/from\s+"@\/components\/DashboardLayout"/);
      expect(file).toMatch(/<DashboardLayout[\s>]/);
    }
  );

  it("every authenticated role page uses a PageShell", () => {
    const offenders: string[] = [];

    for (const file of listPages()) {
      if (PUBLIC_PAGES.has(file)) continue;

      const src = readFileSync(join(PAGES_DIR, file), "utf8");
      const usesAnyShell = KNOWN_SHELLS.some((s) =>
        new RegExp(`<${s}[\\s>]`).test(src)
      );

      if (!usesAnyShell) {
        offenders.push(`${file} (no PageShell)`);
        continue;
      }

      if (!ANY_SHELL_PAGES.has(file)) {
        const match = ROLE_SHELL_MAP.find(({ prefix }) =>
          file.startsWith(prefix)
        );
        if (match && !new RegExp(`<${match.shell}[\\s>]`).test(src)) {
          offenders.push(`${file} (expected ${match.shell})`);
        }
      }
    }

    expect(
      offenders,
      `Pages bypassing the dashboard shell (would lose the NotificationBell):\n  - ${offenders.join(
        "\n  - "
      )}`
    ).toEqual([]);
  });

  it("public pages do NOT render an authenticated dashboard shell", () => {
    const offenders: string[] = [];
    for (const file of PUBLIC_PAGES) {
      const path = join(PAGES_DIR, file);
      let src = "";
      try {
        src = readFileSync(path, "utf8");
      } catch {
        continue;
      }
      if (KNOWN_SHELLS.some((s) => new RegExp(`<${s}[\\s>]`).test(src))) {
        offenders.push(file);
      }
    }
    expect(offenders).toEqual([]);
  });
});
