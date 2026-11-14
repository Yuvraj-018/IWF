import { EyeOff, Shield } from "lucide-react";

interface PiiFieldProps {
  value?: string | number | null;
  isMasked?: boolean;
  type?: "phone" | "email" | "pan" | "bank" | "aadhaar" | "generic";
  className?: string;
}

export function PiiField({ value, isMasked, type = "generic", className = "" }: PiiFieldProps) {
  const str = value !== undefined && value !== null ? String(value) : "—";
  const appearsMasked = isMasked !== undefined ? isMasked : str.includes("*") || str.includes("••••");

  if (!appearsMasked) {
    return <span className={className}>{str}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 group relative font-mono ${className}`}>
      <span className="text-slate-400">{str}</span>
      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-slate-800 text-slate-400 group-hover:text-orange-400 group-hover:bg-orange-950/40 border border-slate-700/50 group-hover:border-orange-800/50 transition cursor-help">
        <EyeOff className="w-2.5 h-2.5" />
      </span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex items-center gap-1.5 z-50 whitespace-nowrap bg-[#0b1f3b] text-slate-200 text-[11px] font-sans font-medium py-1 px-2.5 rounded-md shadow-xl border border-[#16365f] pointer-events-none">
        <Shield className="w-3 h-3 text-orange-400 shrink-0" />
        <span>You do not have permission to view full {type.toUpperCase()} details</span>
      </div>
    </span>
  );
}

