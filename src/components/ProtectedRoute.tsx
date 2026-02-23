import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-gold animate-pulse mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    const rolePaths: Record<string, string> = {
      student: "/student",
      teacher: "/teacher",
      school_admin: "/admin",
      super_admin: "/super-admin",
    };
    return <Navigate to={rolePaths[profile.role] || "/"} replace />;
  }

  return <>{children}</>;
}
