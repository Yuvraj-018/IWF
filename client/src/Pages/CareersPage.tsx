import { useState } from "react";
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Compass,
  FileCheck,
  Shield,
  Heart,
  TrendingUp,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";
import type { RoleType } from "@/components/forms/RoleFormModal";

import { StandardPageHero } from "@/components/layout/StandardPageHero";

export default function CareersPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const scrollToForm = () => {
    document.getElementById("career-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Standardized Hero Section */}
        <StandardPageHero
          badge="CAREERS & OPPORTUNITIES"
          title="Work With Us"
          description="At ISLAH, we believe that real social change is built by passionate, dedicated, and purpose-driven individuals. Build a fulfilling career with direct on-ground impact in rural and underserved communities."
          breadcrumb={[{ label: "Careers" }]}
        >
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              Submit Your CV <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/employment-policy"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition text-xs sm:text-sm uppercase tracking-wider"
            >
              Recruitment Policy
            </a>
          </div>
        </StandardPageHero>

        {/* ─── 4-Step Recruitment Process (Page 82 of PDF) ──────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Hiring Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Our Recruitment Process
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mt-2">
                A fair, transparent, and values-aligned selection process.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[
                {
                  num: "01",
                  title: "Review Opportunities",
                  desc: "Explore domains and roles aligning with your career aspirations.",
                },
                {
                  num: "02",
                  title: "Submit CV & Application",
                  desc: "Complete the online application form and upload your updated resume.",
                },
                {
                  num: "03",
                  title: "Assessment & Interview",
                  desc: "Shortlisted candidates undergo competency interviews and discussions.",
                },
                {
                  num: "04",
                  title: "Onboarding & Impact",
                  desc: "Join the ISLAH family with structured field orientation and mentorship.",
                },
              ].map((step, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left">
                  <span className="text-xl font-black text-brand-orange font-mono block mb-1">
                    {step.num}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CV Submission Form (Page 81) ─────────────────────────────────── */}
        <section id="career-form" className="py-16 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-[#071527] to-[#0c2340] px-6 sm:px-10 py-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-bold mb-2">
                  <Briefcase className="w-3.5 h-3.5" /> Official Application
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">CV Submission Form</h2>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  Please fill in your details and upload your CV. Our team will review your profile and contact you for suitable opportunities.
                </p>
              </div>

              <div className="p-6 sm:p-10">
                <CareerApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
