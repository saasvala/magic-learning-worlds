import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSubjects from "./pages/StudentSubjects";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherQuizBuilder from "./pages/TeacherQuizBuilder";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCurriculum from "./pages/AdminCurriculum";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminContent from "./pages/SuperAdminContent";
import NotFound from "./pages/NotFound";

// Placeholder sub-pages
import { StudentPlaceholderPage } from "@/components/StudentPageShell";
import { TeacherPlaceholderPage } from "@/components/TeacherPageShell";
import { AdminPlaceholderPage } from "@/components/AdminPageShell";
import { SuperAdminPlaceholderPage } from "@/components/SuperAdminPageShell";
import {
  FileText, GraduationCap, Bot, Trophy, BarChart3, Settings,
  Users, BookOpen, CalendarCheck, MessageSquare, Layers, DollarSign,
  Building2, CreditCard, Activity, Database, ShieldCheck
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/subjects" element={<ProtectedRoute allowedRoles={["student"]}><StudentSubjects /></ProtectedRoute>} />
            <Route path="/student/worlds" element={<ProtectedRoute allowedRoles={["student"]}><StudentSubjects /></ProtectedRoute>} />
            <Route path="/student/assignments" element={<ProtectedRoute allowedRoles={["student"]}><StudentPlaceholderPage title="Assignments" icon={FileText} description="View and submit your assignments here." /></ProtectedRoute>} />
            <Route path="/student/exams" element={<ProtectedRoute allowedRoles={["student"]}><StudentPlaceholderPage title="Exams" icon={GraduationCap} description="Take quizzes, chapter tests, and boss battles." /></ProtectedRoute>} />
            <Route path="/student/ai-tutor" element={<ProtectedRoute allowedRoles={["student"]}><StudentPlaceholderPage title="AI Tutor" icon={Bot} description="Your personal AI learning assistant in 20 languages." /></ProtectedRoute>} />
            <Route path="/student/rewards" element={<ProtectedRoute allowedRoles={["student"]}><StudentPlaceholderPage title="Rewards" icon={Trophy} description="Earn badges, treasure chests, and unlock rewards." /></ProtectedRoute>} />
            <Route path="/student/leaderboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentPlaceholderPage title="Leaderboard" icon={BarChart3} description="See how you rank among fellow adventurers." /></ProtectedRoute>} />
            <Route path="/student/progress" element={<ProtectedRoute allowedRoles={["student"]}><StudentPlaceholderPage title="Progress Report" icon={BarChart3} description="Track your learning journey across all subjects." /></ProtectedRoute>} />
            <Route path="/student/settings" element={<ProtectedRoute allowedRoles={["student"]}><StudentPlaceholderPage title="Settings" icon={Settings} description="Customize your profile, language, and preferences." /></ProtectedRoute>} />

            {/* Teacher Routes */}
            <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/teacher/classes" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherPlaceholderPage title="My Classes" icon={Users} description="Manage your classes and view student lists." /></ProtectedRoute>} />
            <Route path="/teacher/lessons" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherPlaceholderPage title="Lessons" icon={BookOpen} description="Upload and manage lesson content (videos, PDFs)." /></ProtectedRoute>} />
            <Route path="/teacher/assignments" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherPlaceholderPage title="Assignments" icon={FileText} description="Create and grade student assignments." /></ProtectedRoute>} />
            <Route path="/teacher/exams" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherQuizBuilder /></ProtectedRoute>} />
            <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherPlaceholderPage title="Attendance" icon={CalendarCheck} description="Mark and review daily attendance." /></ProtectedRoute>} />
            <Route path="/teacher/analytics" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherPlaceholderPage title="Analytics" icon={BarChart3} description="View student performance analytics and trends." /></ProtectedRoute>} />
            <Route path="/teacher/messages" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherPlaceholderPage title="Messages" icon={MessageSquare} description="Communicate with students and parents." /></ProtectedRoute>} />
            <Route path="/teacher/settings" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherPlaceholderPage title="Settings" icon={Settings} description="Update your profile and preferences." /></ProtectedRoute>} />

            {/* School Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPlaceholderPage title="Students" icon={Users} description="Manage all students in your school." /></ProtectedRoute>} />
            <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPlaceholderPage title="Teachers" icon={GraduationCap} description="Manage teacher accounts and assignments." /></ProtectedRoute>} />
            <Route path="/admin/classes" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPlaceholderPage title="Classes" icon={Layers} description="Set up classes, sections, and academic years." /></ProtectedRoute>} />
            <Route path="/admin/subjects" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminCurriculum /></ProtectedRoute>} />
            <Route path="/admin/curriculum" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminCurriculum /></ProtectedRoute>} />
            <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPlaceholderPage title="Exams" icon={FileText} description="Configure exam schedules and weight settings." /></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPlaceholderPage title="Attendance" icon={CalendarCheck} description="View attendance reports across all classes." /></ProtectedRoute>} />
            <Route path="/admin/finance" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPlaceholderPage title="Finance" icon={DollarSign} description="Track payments, fees, and financial reports." /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPlaceholderPage title="Reports" icon={BarChart3} description="Generate comprehensive school reports." /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["school_admin"]}><AdminPlaceholderPage title="Settings" icon={Settings} description="School settings and role permissions." /></ProtectedRoute>} />

            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminDashboard /></ProtectedRoute>} />
            <Route path="/super-admin/schools" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminPlaceholderPage title="Schools" icon={Building2} description="Manage all schools on the platform." /></ProtectedRoute>} />
            <Route path="/super-admin/subscriptions" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminPlaceholderPage title="Subscriptions" icon={CreditCard} description="Manage school subscription plans." /></ProtectedRoute>} />
            <Route path="/super-admin/content" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminContent /></ProtectedRoute>} />
            <Route path="/super-admin/ai" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminPlaceholderPage title="AI Control" icon={Bot} description="Configure AI Tutor settings and models." /></ProtectedRoute>} />
            <Route path="/super-admin/revenue" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminPlaceholderPage title="Revenue" icon={DollarSign} description="Track platform revenue and financial analytics." /></ProtectedRoute>} />
            <Route path="/super-admin/security" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminPlaceholderPage title="Security Logs" icon={ShieldCheck} description="Monitor security events and access logs." /></ProtectedRoute>} />
            <Route path="/super-admin/health" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminPlaceholderPage title="System Health" icon={Activity} description="Monitor system performance and uptime." /></ProtectedRoute>} />
            <Route path="/super-admin/backup" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminPlaceholderPage title="Backup" icon={Database} description="Manage database backups and restoration." /></ProtectedRoute>} />
            <Route path="/super-admin/settings" element={<ProtectedRoute allowedRoles={["super_admin"]}><SuperAdminPlaceholderPage title="Settings" icon={Settings} description="Global platform settings." /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
