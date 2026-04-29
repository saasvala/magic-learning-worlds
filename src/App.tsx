import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RbacOverrideProvider } from "@/contexts/RbacOverrideContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSubjects from "./pages/StudentSubjects";
import StudentAITutor from "./pages/StudentAITutor";
import StudentAssignments from "./pages/StudentAssignments";
import StudentExams from "./pages/StudentExams";
import StudentRewards from "./pages/StudentRewards";
import StudentLeaderboard from "./pages/StudentLeaderboard";
import StudentProgress from "./pages/StudentProgress";
import StudentSettings from "./pages/StudentSettings";
import StudentPortfolio from "./pages/StudentPortfolio";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherQuizBuilder from "./pages/TeacherQuizBuilder";
import TeacherClasses from "./pages/TeacherClasses";
import TeacherLessons from "./pages/TeacherLessons";
import TeacherAssignments from "./pages/TeacherAssignments";
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherAnalytics from "./pages/TeacherAnalytics";
import TeacherMessages from "./pages/TeacherMessages";
import TeacherSettings from "./pages/TeacherSettings";
import TeacherProjectReview from "./pages/TeacherProjectReview";
import TeacherResourceCenter from "./pages/TeacherResourceCenter";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCurriculum from "./pages/AdminCurriculum";
import AdminStudents from "./pages/AdminStudents";
import AdminTeachers from "./pages/AdminTeachers";
import AdminClasses from "./pages/AdminClasses";
import AdminExams from "./pages/AdminExams";
import AdminAttendance from "./pages/AdminAttendance";
import AdminFinance from "./pages/AdminFinance";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import AdminPermissionsMatrix from "./pages/AdminPermissionsMatrix";
import CurriculumEditor from "./pages/CurriculumEditor";
import LearningAnalytics from "./pages/LearningAnalytics";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminContent from "./pages/SuperAdminContent";
import SuperAdminSchools from "./pages/SuperAdminSchools";
import SuperAdminSubscriptions from "./pages/SuperAdminSubscriptions";
import SuperAdminAI from "./pages/SuperAdminAI";
import SuperAdminRevenue from "./pages/SuperAdminRevenue";
import SuperAdminSecurity from "./pages/SuperAdminSecurity";
import SuperAdminHealth from "./pages/SuperAdminHealth";
import SuperAdminBackup from "./pages/SuperAdminBackup";
import SuperAdminSettings from "./pages/SuperAdminSettings";
import ContentLibrary from "./pages/ContentLibrary";
import MediaAssets from "./pages/MediaAssets";
import GamificationControl from "./pages/GamificationControl";
import TranslationManager from "./pages/TranslationManager";
import DeviceSessionManager from "./pages/DeviceSessionManager";
import ParentDashboard from "./pages/ParentDashboard";
import ParentAttendance from "./pages/ParentAttendance";
import ParentHomework from "./pages/ParentHomework";
import ParentExamResults from "./pages/ParentExamResults";
import ParentMessages from "./pages/ParentMessages";
import ParentFees from "./pages/ParentFees";
import ParentAlerts from "./pages/ParentAlerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <RbacOverrideProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/subjects" element={<ProtectedRoute allowedRoles={["student"]}><StudentSubjects /></ProtectedRoute>} />
            <Route path="/student/worlds" element={<ProtectedRoute allowedRoles={["student"]}><StudentSubjects /></ProtectedRoute>} />
            <Route path="/student/assignments" element={<ProtectedRoute allowedRoles={["student"]}><StudentAssignments /></ProtectedRoute>} />
            <Route path="/student/exams" element={<ProtectedRoute allowedRoles={["student"]}><StudentExams /></ProtectedRoute>} />
            <Route path="/student/ai-tutor" element={<ProtectedRoute allowedRoles={["student"]}><StudentAITutor /></ProtectedRoute>} />
            <Route path="/student/portfolio" element={<ProtectedRoute allowedRoles={["student"]}><StudentPortfolio /></ProtectedRoute>} />
            <Route path="/student/rewards" element={<ProtectedRoute allowedRoles={["student"]}><StudentRewards /></ProtectedRoute>} />
            <Route path="/student/leaderboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentLeaderboard /></ProtectedRoute>} />
            <Route path="/student/progress" element={<ProtectedRoute allowedRoles={["student"]}><StudentProgress /></ProtectedRoute>} />
            <Route path="/student/settings" element={<ProtectedRoute allowedRoles={["student"]}><StudentSettings /></ProtectedRoute>} />

            {/* Teacher Routes */}
            <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/teacher/classes" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherClasses /></ProtectedRoute>} />
            <Route path="/teacher/lessons" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherLessons /></ProtectedRoute>} />
            <Route path="/teacher/assignments" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAssignments /></ProtectedRoute>} />
            <Route path="/teacher/exams" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherQuizBuilder /></ProtectedRoute>} />
            <Route path="/teacher/project-review" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherProjectReview /></ProtectedRoute>} />
            <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAttendance /></ProtectedRoute>} />
            <Route path="/teacher/analytics" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAnalytics /></ProtectedRoute>} />
            <Route path="/teacher/resources" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherResourceCenter /></ProtectedRoute>} />
            <Route path="/teacher/messages" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherMessages /></ProtectedRoute>} />
            <Route path="/teacher/settings" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherSettings /></ProtectedRoute>} />

            {/* School Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminStudents /></ProtectedRoute>} />
            <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminTeachers /></ProtectedRoute>} />
            <Route path="/admin/classes" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminClasses /></ProtectedRoute>} />
            <Route path="/admin/subjects" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminCurriculum /></ProtectedRoute>} />
            <Route path="/admin/curriculum" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminCurriculum /></ProtectedRoute>} />
            <Route path="/admin/curriculum-editor" element={<ProtectedRoute allowedRoles={["school_admin"]}><CurriculumEditor /></ProtectedRoute>} />
            <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminExams /></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminAttendance /></ProtectedRoute>} />
            <Route path="/admin/finance" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminFinance /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={["school_admin"]}><LearningAnalytics /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminSettings /></ProtectedRoute>} />
            <Route path="/admin/permissions" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPermissionsMatrix /></ProtectedRoute>} />

            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminDashboard /></ProtectedRoute>} />
            <Route path="/super-admin/schools" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminSchools /></ProtectedRoute>} />
            <Route path="/super-admin/subscriptions" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminSubscriptions /></ProtectedRoute>} />
            <Route path="/super-admin/content-library" element={<ProtectedRoute allowedRoles={["super_admin"]}><ContentLibrary /></ProtectedRoute>} />
            <Route path="/super-admin/media" element={<ProtectedRoute allowedRoles={["super_admin"]}><MediaAssets /></ProtectedRoute>} />
            <Route path="/super-admin/content" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminContent /></ProtectedRoute>} />
            <Route path="/super-admin/gamification" element={<ProtectedRoute allowedRoles={["super_admin"]}><GamificationControl /></ProtectedRoute>} />
            <Route path="/super-admin/translations" element={<ProtectedRoute allowedRoles={["super_admin"]}><TranslationManager /></ProtectedRoute>} />
            <Route path="/super-admin/ai" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminAI /></ProtectedRoute>} />
            <Route path="/super-admin/revenue" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminRevenue /></ProtectedRoute>} />
            <Route path="/super-admin/devices" element={<ProtectedRoute allowedRoles={["super_admin"]}><DeviceSessionManager /></ProtectedRoute>} />
            <Route path="/super-admin/security" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminSecurity /></ProtectedRoute>} />
            <Route path="/super-admin/health" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminHealth /></ProtectedRoute>} />
            <Route path="/super-admin/backup" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminBackup /></ProtectedRoute>} />
            <Route path="/super-admin/settings" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminSettings /></ProtectedRoute>} />

            {/* Parent Routes */}
            <Route path="/parent" element={<ProtectedRoute allowedRoles={["parent"]}><ParentDashboard /></ProtectedRoute>} />
            <Route path="/parent/attendance" element={<ProtectedRoute allowedRoles={["parent"]}><ParentAttendance /></ProtectedRoute>} />
            <Route path="/parent/homework" element={<ProtectedRoute allowedRoles={["parent"]}><ParentHomework /></ProtectedRoute>} />
            <Route path="/parent/results" element={<ProtectedRoute allowedRoles={["parent"]}><ParentExamResults /></ProtectedRoute>} />
            <Route path="/parent/messages" element={<ProtectedRoute allowedRoles={["parent"]}><ParentMessages /></ProtectedRoute>} />
            <Route path="/parent/fees" element={<ProtectedRoute allowedRoles={["parent"]}><ParentFees /></ProtectedRoute>} />
            <Route path="/parent/alerts" element={<ProtectedRoute allowedRoles={["parent"]}><ParentAlerts /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </RbacOverrideProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
