import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { X, Handshake, Heart, GraduationCap, Briefcase, Users, ExternalLink } from "lucide-react";
import { ApplicationWizard, type WizardConfig } from "@/components/forms/wizard/ApplicationWizard";
import { volunteerFormConfig } from "@/components/forms/wizard/configs/volunteerForm";
import { partnerFormConfig } from "@/components/forms/wizard/configs/partnerForm";
import { sponsorFormConfig } from "@/components/forms/wizard/configs/sponsorForm";
import { mentorFormConfig } from "@/components/forms/wizard/configs/mentorForm";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { activeOpenings } from "@/content/careerOpenings";

export type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

interface RoleFormModalProps {
  type: RoleType | null;
  onClose: () => void;
}

/**
 * Quick-apply modal used by buttons across the site. It renders the same forms
 * as the dedicated Get Involved pages (and shares their saved drafts).
 */
const MODAL_CONFIG: Record<
  RoleType,
  {
    title: string;
    subtitle: string;
    icon: typeof Users;
    page: string;
    form?: WizardConfig;
    tint: string;
  }
> = {
  volunteer: {
    title: "Volunteer Application",
    subtitle: "Join our community across education, health and rural development.",
    icon: Users,
    page: "/volunteer",
    form: volunteerFormConfig,
    tint: "bg-emerald-50 text-emerald-600",
  },
  partner: {
    title: "Partnership Application",
    subtitle: "Collaborate with ISLAH for sustainable, measurable community impact.",
    icon: Handshake,
    page: "/partner",
    form: partnerFormConfig,
    tint: "bg-blue-50 text-blue-600",
  },
  sponsor: {
    title: "Sponsorship Application",
    subtitle: "Support a programme or community initiative with measurable impact.",
    icon: Heart,
    page: "/sponsor",
    form: sponsorFormConfig,
    tint: "bg-orange-50 text-orange-600",
  },
  mentor: {
    title: "Mentor Application",
    subtitle: "Share your knowledge and guide the next generation.",
    icon: GraduationCap,
    page: "/mentor",
    form: mentorFormConfig,
    tint: "bg-violet-50 text-violet-600",
  },
  employee: {
    title: "Careers Application",
    subtitle: "Build your career while creating positive social impact with ISLAH.",
    icon: Briefcase,
    page: "/careers",
    tint: "bg-amber-50 text-amber-600",
  },
};

export function RoleFormModal({ type, onClose }: RoleFormModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (type) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;
  if (typeof document === "undefined") return null;

  const cfg = MODAL_CONFIG[type];
  const Icon = cfg.icon;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-3 sm:p-4 backdrop-blur-xs notranslate"
      translate="no"
      dir="ltr"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={cfg.title}
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 bg-white border-b border-slate-200 px-5 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-lg ${cfg.tint} flex items-center justify-center shrink-0`}
            >
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#071527]">{cfg.title}</h3>
              <p className="text-xs text-slate-600">{cfg.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Link
              to={cfg.page}
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100 transition"
            >
              Open full page <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6">
          {cfg.form ? (
            <ApplicationWizard config={cfg.form} />
          ) : (
            <CareerApplicationForm positions={activeOpenings().map((o) => o.title)} />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
