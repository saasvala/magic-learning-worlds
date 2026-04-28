/**
 * Single source of truth for the RBAC route table.
 *
 * Used by:
 *   - src/App.tsx (route definitions can reference these for verification)
 *   - src/pages/AdminPermissionsMatrix.tsx (admin audit UI)
 *   - src/components/__tests__/RBAC.matrix.test.tsx (also parses App.tsx
 *     directly to ensure this constant stays in sync with the runtime).
 */

export type AppRole =
  | "student"
  | "teacher"
  | "school_admin"
  | "super_admin"
  | "parent";

export interface RouteAccessDef {
  path: string;
  /** Display label for humans. */
  label: string;
  /** Top-level grouping in the admin matrix UI. */
  section:
    | "Student"
    | "Teacher"
    | "School Admin"
    | "Super Admin"
    | "Parent";
  allowedRoles: AppRole[];
}

export const ALL_ROLES: AppRole[] = [
  "student",
  "teacher",
  "school_admin",
  "super_admin",
  "parent",
];

export const ROLE_LABEL: Record<AppRole, string> = {
  student: "Student",
  teacher: "Teacher",
  school_admin: "School Admin",
  super_admin: "Super Admin",
  parent: "Parent",
};

export const ROLE_EMOJI: Record<AppRole, string> = {
  student: "🎮",
  teacher: "👩‍🏫",
  school_admin: "🏫",
  super_admin: "👑",
  parent: "👨‍👩‍👧",
};

export const ROLE_HOME: Record<AppRole, string> = {
  student: "/student",
  teacher: "/teacher",
  school_admin: "/admin",
  super_admin: "/super-admin",
  parent: "/parent",
};

/**
 * Mirrors src/App.tsx exactly. Keep in sync when adding new protected routes.
 * The RBAC matrix test re-parses App.tsx and would fail if this drifts.
 */
export const ROUTE_ACCESS: RouteAccessDef[] = [
  // Student
  { path: "/student", label: "Dashboard", section: "Student", allowedRoles: ["student"] },
  { path: "/student/subjects", label: "Subjects", section: "Student", allowedRoles: ["student"] },
  { path: "/student/worlds", label: "Worlds", section: "Student", allowedRoles: ["student"] },
  { path: "/student/assignments", label: "Assignments", section: "Student", allowedRoles: ["student"] },
  { path: "/student/exams", label: "Exams", section: "Student", allowedRoles: ["student"] },
  { path: "/student/ai-tutor", label: "AI Tutor", section: "Student", allowedRoles: ["student"] },
  { path: "/student/portfolio", label: "Portfolio", section: "Student", allowedRoles: ["student"] },
  { path: "/student/rewards", label: "Rewards", section: "Student", allowedRoles: ["student"] },
  { path: "/student/leaderboard", label: "Leaderboard", section: "Student", allowedRoles: ["student"] },
  { path: "/student/progress", label: "Progress", section: "Student", allowedRoles: ["student"] },
  { path: "/student/settings", label: "Settings", section: "Student", allowedRoles: ["student"] },

  // Teacher
  { path: "/teacher", label: "Dashboard", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/classes", label: "Classes", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/lessons", label: "Lessons", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/assignments", label: "Assignments", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/exams", label: "Quiz Builder", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/project-review", label: "Project Review", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/attendance", label: "Attendance", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/analytics", label: "Analytics", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/resources", label: "Resource Center", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/messages", label: "Messages", section: "Teacher", allowedRoles: ["teacher"] },
  { path: "/teacher/settings", label: "Settings", section: "Teacher", allowedRoles: ["teacher"] },

  // School Admin
  { path: "/admin", label: "Dashboard", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/students", label: "Students", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/teachers", label: "Teachers", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/classes", label: "Classes", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/subjects", label: "Subjects", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/curriculum", label: "Curriculum", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/curriculum-editor", label: "Curriculum Editor", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/exams", label: "Exams", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/attendance", label: "Attendance", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/finance", label: "Finance", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/analytics", label: "Analytics", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/reports", label: "Reports", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/settings", label: "Settings", section: "School Admin", allowedRoles: ["school_admin"] },
  { path: "/admin/permissions", label: "Permissions Matrix", section: "School Admin", allowedRoles: ["school_admin"] },

  // Super Admin
  { path: "/super-admin", label: "Dashboard", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/schools", label: "Schools", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/subscriptions", label: "Subscriptions", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/content-library", label: "Content Library", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/media", label: "Media Assets", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/content", label: "Content", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/gamification", label: "Gamification", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/translations", label: "Translations", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/ai", label: "AI", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/revenue", label: "Revenue", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/devices", label: "Devices", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/security", label: "Security", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/health", label: "Health", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/backup", label: "Backup", section: "Super Admin", allowedRoles: ["super_admin"] },
  { path: "/super-admin/settings", label: "Settings", section: "Super Admin", allowedRoles: ["super_admin"] },

  // Parent
  { path: "/parent", label: "Dashboard", section: "Parent", allowedRoles: ["parent"] },
  { path: "/parent/attendance", label: "Attendance", section: "Parent", allowedRoles: ["parent"] },
  { path: "/parent/homework", label: "Homework", section: "Parent", allowedRoles: ["parent"] },
  { path: "/parent/results", label: "Exam Results", section: "Parent", allowedRoles: ["parent"] },
  { path: "/parent/messages", label: "Messages", section: "Parent", allowedRoles: ["parent"] },
  { path: "/parent/fees", label: "Fees", section: "Parent", allowedRoles: ["parent"] },
  { path: "/parent/alerts", label: "Alerts", section: "Parent", allowedRoles: ["parent"] },
];

/**
 * Routes declared in App.tsx but intentionally NOT picked up by the RBAC
 * matrix parser (which only matches `<Route ... element={<ProtectedRoute
 * allowedRoles={[…]}>`). Surfaced in the admin coverage UI so reviewers
 * can confirm each skip is intentional.
 */
export interface SkippedRouteDef {
  path: string;
  reason: string;
}

export const SKIPPED_ROUTES: SkippedRouteDef[] = [
  { path: "/", reason: "Public landing page (no auth required)" },
  { path: "/auth", reason: "Public auth / sign-in page" },
  { path: "*", reason: "Catch-all 404 (NotFound)" },
];
