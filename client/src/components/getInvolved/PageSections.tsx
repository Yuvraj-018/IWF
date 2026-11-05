import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, FileText, type LucideIcon } from "lucide-react";

/**
 * Shared building blocks for the Get Involved pages (Volunteer, Mentor, Partner,
 * Sponsor, Careers). Light pastel surfaces, #071527 for emphasis, compact spacing.
 */

const PASTELS = [
  { bg: "bg-blue-50", icon: "text-blue-600", hover: "hover:bg-blue-50/50" },
  { bg: "bg-amber-50", icon: "text-amber-600", hover: "hover:bg-amber-50/50" },
  { bg: "bg-emerald-50", icon: "text-emerald-600", hover: "hover:bg-emerald-50/50" },
  { bg: "bg-rose-50", icon: "text-rose-600", hover: "hover:bg-rose-50/50" },
  { bg: "bg-violet-50", icon: "text-violet-600", hover: "hover:bg-violet-50/50" },
  { bg: "bg-teal-50", icon: "text-teal-600", hover: "hover:bg-teal-50/50" },
  { bg: "bg-orange-50", icon: "text-orange-600", hover: "hover:bg-orange-50/50" },
  { bg: "bg-sky-50", icon: "text-sky-600", hover: "hover:bg-sky-50/50" },
];
export const pastel = (i: number) => PASTELS[i % PASTELS.length];

export function Section({
  id,
  tone = "white",
  children,
  className = "",
}: {
  id?: string;
  tone?: "white" | "muted";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-12 sm:py-14 border-b border-slate-100 scroll-mt-20 ${
        tone === "muted" ? "bg-slate-50/70" : "bg-white"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
  center,
  action,
}: {
  eyebrow?: string;
  title: string;
  desc?: React.ReactNode;
  center?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={`mb-7 ${center ? "text-center max-w-2xl mx-auto" : "flex flex-col sm:flex-row sm:items-end justify-between gap-3"}`}
    >
      <div className={center ? "" : "max-w-3xl"}>
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-1">{title}</h2>
        {desc && <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">{desc}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export interface CardItem {
  icon?: LucideIcon;
  title: string;
  desc?: string;
  tag?: string;
}

/** Grid of soft cards with a pastel icon tile. */
export function IconCards({ items, columns = 3 }: { items: CardItem[]; columns?: 2 | 3 | 4 }) {
  const grid =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-4 ${grid}`}>
      {items.map((it, i) => {
        const p = pastel(i);
        const Icon = it.icon;
        return (
          <div
            key={it.title}
            className={`rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 ${p.hover}`}
          >
            <div className="flex items-start gap-3.5">
              {Icon ? (
                <span
                  className={`w-10 h-10 rounded-lg ${p.bg} ${p.icon} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </span>
              ) : it.tag ? (
                <span
                  className={`w-10 h-10 rounded-lg ${p.bg} ${p.icon} flex items-center justify-center shrink-0 text-xs font-bold`}
                >
                  {it.tag}
                </span>
              ) : null}
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-[#071527] leading-snug">
                  {it.title}
                </h3>
                {it.desc && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {it.desc}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Numbered horizontal journey (wraps on small screens). */
export function JourneySteps({ steps }: { steps: { title: string; desc: string }[] }) {
  const cols =
    steps.length >= 7
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : steps.length === 6
        ? "sm:grid-cols-3 lg:grid-cols-6"
        : steps.length === 5
          ? "sm:grid-cols-3 lg:grid-cols-5"
          : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <ol className={`grid gap-3 ${cols}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-xl border border-slate-200 bg-white p-4">
          <span className="w-7 h-7 rounded-full bg-[#071527] text-white text-xs font-semibold flex items-center justify-center">
            {i + 1}
          </span>
          <p className="text-sm font-semibold text-[#071527] mt-2.5">{s.title}</p>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/** Wrapping list of check pills. */
export function CheckPills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs sm:text-[13px]"
        >
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          {t}
        </span>
      ))}
    </div>
  );
}

/** Policy & safeguarding links row. */
export function PolicyLinks({ links }: { links: { label: string; to: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-orange-50/60 hover:border-orange-200 text-xs sm:text-sm text-slate-700 transition"
        >
          <FileText className="w-4 h-4 text-brand-orange" />
          {l.label}
        </Link>
      ))}
    </div>
  );
}

/** Closing call-to-action band. */
export function FinalCta({
  title,
  desc,
  primary,
  secondary,
}: {
  title: string;
  desc?: string;
  primary: { label: string; onClick?: () => void; to?: string };
  secondary?: { label: string; to: string };
}) {
  const primaryClass =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold transition";
  return (
    <section className="py-12 sm:py-14 bg-slate-50 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527]">{title}</h2>
        {desc && <p className="text-sm sm:text-base text-slate-600 mt-2">{desc}</p>}
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          {primary.to ? (
            <Link to={primary.to} className={primaryClass}>
              {primary.label} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button type="button" onClick={primary.onClick} className={primaryClass}>
              {primary.label} <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {secondary && (
            <Link
              to={secondary.to}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-sm font-semibold transition"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** Hero action buttons used inside SubpageHeroCarousel. */
export function HeroActions({
  primary,
  secondary,
  community,
}: {
  primary: { label: string; target: string };
  secondary: { label: string; target: string };
  community?: { label: string; to: string; search?: Record<string, string> };
}) {
  const scroll = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
  };
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <button
        type="button"
        onClick={() => scroll(primary.target)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-semibold text-sm transition-all active:scale-95"
      >
        {primary.label} <ArrowRight className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => scroll(secondary.target)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all active:scale-95"
      >
        {secondary.label}
      </button>
      {community && (
        <Link
          to={community.to}
          search={community.search as never}
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white underline underline-offset-4 ml-1 transition-colors"
        >
          {community.label}
        </Link>
      )}
    </div>
  );
}

/** Standard wrapper for the application form section. */
export function FormSection({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="py-12 sm:py-14 bg-slate-50/70 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#071527] mt-0.5">{title}</h2>
          <p className="text-sm text-slate-600 mt-1.5 max-w-3xl">{desc}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
