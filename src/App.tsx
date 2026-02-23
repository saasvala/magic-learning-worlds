import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSubjects from "./pages/StudentSubjects";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCurriculum from "./pages/AdminCurriculum";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminContent from "./pages/SuperAdminContent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Student */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/subjects" element={<StudentSubjects />} />
          <Route path="/student/worlds" element={<StudentSubjects />} />
          {/* Teacher */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          {/* School Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/curriculum" element={<AdminCurriculum />} />
          <Route path="/admin/subjects" element={<AdminCurriculum />} />
          {/* Super Admin */}
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/content" element={<SuperAdminContent />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
