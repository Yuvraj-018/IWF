import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Handshake, Heart, GraduationCap, Briefcase, Users } from "lucide-react";
import { VolunteerApplicationForm } from "@/components/forms/VolunteerApplicationForm";
import { PartnerApplicationForm } from "@/components/forms/PartnerApplicationForm";
import { SponsorApplicationForm } from "@/components/forms/SponsorApplicationForm";
import { MentorApplicationForm } from "@/components/forms/MentorApplicationForm";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";

export type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

interface RoleFormModalProps {
  type: RoleType | null;
  onClose: () => void;
}

const MODAL_CONFIG: Record<
  RoleType,
  {
    title: string;
    subtitle: string;
    icon: any;
    bgGradient: string;
  }
> = {
  volunteer: {
    title: "Volunteer Application",
    subtitle: "Join our grassroots community network across education, health, and rural development.",
    icon: Users,
    bgGradient: "from-brand-green to-[#0b1f3b]",
  },
  partner: {
    title: "Partnership Application Form",
    subtitle: "Collaborate with ISLAH to create sustainable, high-impact rural transformation.",
    icon: Handshake,
    bgGradient: "from-[#0b1f3b] via-[#163a69] to-brand-green",
  },
  sponsor: {
    title: "Sponsorship Application Form",
    subtitle: "Empower a community, sponsor a program or cause with measurable impact.",
    icon: Heart,
    bgGradient: "from-[#0b1f3b] via-[#853012] to-brand-orange",
  },
  mentor: {
    title: "Mentor Application Form",
    subtitle: "Share your knowledge, inspire rural youth, and guide the next generation.",
    icon: GraduationCap,
    bgGradient: "from-[#072417] via-[#0d3f27] to-[#0b1f3b]",
  },
  employee: {
    title: "CV Submission Form (Careers)",
    subtitle: "Build your career while creating positive social impact with ISLAH.",
    icon: Briefcase,
    bgGradient: "from-[#0b1f3b] via-[#1a447a] to-emerald-800",
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
        {/* Modal Header */}
        <div className={`sticky top-0 z-10 flex items-start justify-between gap-4 bg-gradient-to-r ${cfg.bgGradient} px-6 py-5 text-white shadow-md`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-white">
                {cfg.title}
              </h3>
              <p className="mt-0.5 text-xs text-white/80 leading-relaxed max-w-xl">
                {cfg.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Render authentic form matching PDF */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {type === "volunteer" && <VolunteerApplicationForm isModal />}
          {type === "partner" && <PartnerApplicationForm isModal />}
          {type === "sponsor" && <SponsorApplicationForm isModal />}
          {type === "mentor" && <MentorApplicationForm isModal />}
          {type === "employee" && <CareerApplicationForm isModal />}
        </div>
      </div>
    </div>,
    document.body
  );
}
