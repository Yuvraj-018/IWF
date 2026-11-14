import React, { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

interface CanProps {
  permission?: string;
  anyOf?: string[];
  allOf?: string[];
  fallback?: ReactNode;
  renderDisabled?: boolean;
  disabledReason?: string;
  children: ReactNode;
}

export function Can({
  permission,
  anyOf,
  allOf,
  fallback = null,
  renderDisabled = false,
  disabledReason = "You do not have permission to perform this action.",
  children,
}: CanProps) {
  const { can, hasAny, hasAll } = useAuth();

  let isAllowed = true;

  if (permission) {
    isAllowed = can(permission);
  } else if (anyOf && anyOf.length > 0) {
    isAllowed = hasAny(anyOf);
  } else if (allOf && allOf.length > 0) {
    isAllowed = hasAll(allOf);
  }

  if (isAllowed) {
    return <>{children}</>;
  }

  if (renderDisabled) {
    return (
      <div className="relative group inline-block">
        <div className="opacity-40 pointer-events-none cursor-not-allowed select-none">
          {children}
        </div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 whitespace-nowrap bg-[#0b1f3b] text-slate-200 text-[11px] font-medium py-1 px-2.5 rounded-md shadow-xl border border-[#16365f] pointer-events-none">
          {disabledReason}
        </div>
      </div>
    );
  }

  return <>{fallback}</>;
}

