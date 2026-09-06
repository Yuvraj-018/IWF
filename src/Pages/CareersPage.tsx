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
        {/* ─── Hero Section (Pages 80 & 82 of PDF) ───────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#07162c] via-[#0b1f3b] to-[#0d3b66] text-white py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-black uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" /> CAREERS & OPPORTUNITIES
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Work With Us <br />
                  <span className="text-brand-orange text-2xl sm:text-4xl font-extrabold font-serif italic">
                    Turn Passion into Purpose
                  </span>
                </h1>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
                  At <strong>ISLAH</strong>, we believe that real social change is built by passionate, dedicated, and purpose-driven individuals. We are looking for talented professionals who want to apply their skills, creativity, and energy toward solving meaningful challenges in rural and underserved communities.
                </p>

                <p className="text-sky-200/90 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Build a fulfilling career with direct on-ground impact. Whether in program operations, education, healthcare, finance, or digital communications, your contribution matters.
                </p>

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
              </div>

              {/* Right Poster Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/15 bg-gradient-to-tr from-[#0b1f3b] via-[#144272] to-[#205295] p-8 text-center flex flex-col justify-between min-h-[340px]">
                  <div className="inline-block self-center px-4 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold tracking-wider uppercase mb-3">
                    Talent for Transformation
                  </div>

                  <div className="my-auto space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      BUILD A CAREER. <br />
                      <span className="text-brand-orange">CREATE REAL IMPACT.</span>
                    </h3>
                    <p className="text-sky-100 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                      Competitive compensation, inclusive culture, professional growth, and meaningful grassroots development.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/20 grid grid-cols-2 gap-3 text-white">
                    <div className="bg-white/10 rounded-xl p-2.5">
                      <div className="text-lg font-black text-brand-orange">Full-time</div>
                      <div className="text-[10px] text-white/80 font-bold uppercase">& Project Roles</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-2.5">
                      <div className="text-lg font-black text-brand-orange">Inclusive</div>
                      <div className="text-[10px] text-white/80 font-bold uppercase">Equal Opportunity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4-Step Recruitment Process (Page 82 of PDF) ──────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Hiring Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1f3b] mt-1">
                Our Recruitment Process
              </h2>
              <p className="text-slate-600 text-sm mt-2">
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
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
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
              <div className="bg-gradient-to-r from-[#0b1f3b] via-[#144272] to-brand-green px-6 sm:px-10 py-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-bold mb-2">
                  <Briefcase className="w-3.5 h-3.5" /> Official Application
                </div>
                <h2 className="text-2xl sm:text-3xl font-black">CV Submission Form</h2>
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
