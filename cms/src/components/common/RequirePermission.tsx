import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AccessDeniedPage } from "./AccessDeniedPage";
import { Loader2 } from "lucide-react";

interface RequirePermissionProps {
  permission?: string;
  anyOf?: string[];
  allOf?: string[];
  moduleName?: string;
  children: ReactNode;
}

export function RequirePermission({
  permission,
  anyOf,
  allOf,
  moduleName,
  children,
}: RequirePermissionProps) {
  const { user, isAuthenticated, loading, can, hasAny, hasAll } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071527] flex flex-col items-center justify-center text-slate-400 gap-3 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-xs font-mono text-slate-300">Evaluating access credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Mandatory first-run flows
  if (user?.mustChangePassword && location.pathname !== "/change-password") {
    return <Navigate to="/change-password" replace />;
  }

  if (user?.mustEnroll2FA && location.pathname !== "/2fa-enroll" && location.pathname !== "/change-password") {
    return <Navigate to="/2fa-enroll" replace />;
  }

  // Permission evaluation
  if (permission && !can(permission)) {
    return <AccessDeniedPage requiredPermission={permission} moduleName={moduleName} />;
  }

  if (anyOf && anyOf.length > 0 && !hasAny(anyOf)) {
    return <AccessDeniedPage requiredPermission={anyOf.join(" | ")} moduleName={moduleName} />;
  }

  if (allOf && allOf.length > 0 && !hasAll(allOf)) {
    return <AccessDeniedPage requiredPermission={allOf.join(" & ")} moduleName={moduleName} />;
  }

  return <>{children}</>;
}

