import React from "react";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{children}</h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}
