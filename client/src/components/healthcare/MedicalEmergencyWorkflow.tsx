import React from "react";
import {
  FilePlus,
  UserCheck,
  ShieldCheck,
  FileSearch,
  ClipboardCheck,
  Users2,
  HeartHandshake,
  BarChart3,
  Clock,
  CheckCircle,
  Handshake,
  Heart,
  Sprout,
  ArrowRight,
  ArrowDown,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import workflowImg from "@/assets/how_we_work_medical_emergency.png";

export interface MedicalEmergencyWorkflowProps {
  className?: string;
  showImageToggle?: boolean;
}

const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "NEED IDENTIFIED",
    icon: FilePlus,
    description:
      "Patient or family requests urgent support or case is referred through a trusted source or partner.",
    color: "#0b1f3b",
    bg: "bg-sky-50",
    border: "border-sky-100",
    iconColor: "text-sky-700",
  },
  {
    step: 2,
    title: "CASE INTAKE",
    icon: UserCheck,
    description:
      "Collect basic patient, hospital and treatment information.",
    color: "#0b1f3b",
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconColor: "text-blue-700",
  },
  {
    step: 3,
    title: "VERIFICATION",
    icon: ShieldCheck,
    description:
      "Islah field team verifies admission, medical reports, financial vulnerability and supporting documents.",
    color: "#004724",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    step: 4,
    title: "NEED ASSESSMENT",
    icon: FileSearch,
    description:
      "Assess urgency, treatment requirement and eligible support.",
    color: "#004724",
    bg: "bg-teal-50",
    border: "border-teal-100",
    iconColor: "text-teal-700",
  },
  {
    step: 5,
    title: "SUPPORT DECISION",
    icon: ClipboardCheck,
    description:
      "Case reviewed/approved according to Islah programme and available resources.",
    color: "#ea580c",
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconColor: "text-amber-700",
  },
  {
    step: 6,
    title: "DONOR & RESOURCE MOBILISATION",
    icon: Users2,
    description:
      "Individual donors, monthly donors, CSR partners and humanitarian networks are engaged.",
    color: "#ea580c",
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconColor: "text-orange-700",
  },
  {
    step: 7,
    title: "DIRECT SUPPORT",
    icon: HeartHandshake,
    description:
      "Funds/support are routed directly to hospital/pharmacy or appropriate provider wherever feasible, with receipts and documentation.",
    color: "#004724",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    step: 8,
    title: "MONITORING & CLOSURE",
    icon: BarChart3,
    description:
      "Follow case progress, track utilisation, maintain records and report case utilisation after closure.",
    color: "#0b1f3b",
    bg: "bg-slate-50",
    border: "border-slate-100",
    iconColor: "text-slate-800",
  },
];

const OUTCOMES = [
  { icon: Clock, label: "TIMELY CARE" },
  { icon: CheckCircle, label: "TRANSPARENT USE OF FUNDS" },
  { icon: Handshake, label: "ACCOUNTABILITY" },
  { icon: Heart, label: "DIGNITY & HOPE" },
];

export default function MedicalEmergencyWorkflow({
  className = "",
  showImageToggle = true,
}: MedicalEmergencyWorkflowProps) {
  const [viewOriginal, setViewOriginal] = React.useState(false);

  return (
    <section
      className={`py-10 sm:py-12 bg-slate-50 border-y border-slate-200 ${className}`}
      id="how-we-work-medical"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
            Hope • Support • Sustainable Change
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0b1f3b] tracking-tight mb-2">
            How We Work
          </h2>
          <p className="text-sm text-slate-600">
            From Need to Support — A Transparent, Compassionate &amp; Accountable Process
          </p>

          {showImageToggle && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setViewOriginal(!viewOriginal)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1 cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" />
                {viewOriginal ? "Show Interactive Process View" : "View Original Infographic"}
              </button>
            </div>
          )}
        </div>

        {viewOriginal ? (
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200 max-w-5xl mx-auto overflow-hidden">
            <img
              src={workflowImg}
              alt="How We Work - From Need to Support: A Transparent, Compassionate & Accountable Process"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        ) : (
          <>
            {/* 8-Step Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {WORKFLOW_STEPS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className={`relative rounded-xl bg-white p-5 border ${item.border} hover:shadow-md transition flex flex-col group`}
                  >
                    {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#0b1f3b] text-white flex items-center justify-center font-semibold text-sm">
                        {item.step}
                      </div>
                      <div
                        className={`w-11 h-11 rounded-2xl ${item.bg} flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-[#0b1f3b] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    {/* Step connectors for desktop */}
                    {idx < 7 && (
                      <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                        {idx === 3 ? (
                          <div className="hidden" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-xs">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* The Outcome Strip */}
            <div className="mt-6 rounded-xl bg-white border border-emerald-200 px-4 py-3.5 sm:px-5 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shrink-0">
                <Sprout className="w-4 h-4 text-emerald-700" /> The Outcome
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-2 flex-1">
                {OUTCOMES.map((o) => {
                  const Icon = o.icon;
                  return (
                    <span key={o.label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      <Icon className="w-3.5 h-3.5 text-emerald-700" />
                      {o.label}
                    </span>
                  );
                })}
              </div>
              <p className="text-xs text-slate-600 lg:border-l lg:border-emerald-200 lg:pl-5 shrink-0">
                <span className="inline-flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-700" />
                  Every case verified · every rupee tracked ·{" "}
                  <strong className="text-emerald-900">every patient treated with dignity.</strong>
                </span>
              </p>
            </div>

            {/* Policy Reference Note */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                Operating strictly in accordance with the{" "}
                <Link
                  to="/medical-treatment-policy"
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Islah Fundraising for Critical Medical Treatment Policy
                </Link>
                . Direct payments made to hospitals, institutions, and pharmacies.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
