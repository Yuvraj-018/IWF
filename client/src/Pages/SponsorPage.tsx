import { useState } from "react";
import {
  Heart,
  CheckCircle2,
  ArrowRight,
  Shield,
  CreditCard,
  Building2,
  Users,
  Award,
  Lock,
  Landmark,
  IndianRupee,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import { SponsorApplicationForm } from "@/components/forms/SponsorApplicationForm";
import type { RoleType } from "@/components/forms/RoleFormModal";

import { StandardPageHero } from "@/components/layout/StandardPageHero";

export default function SponsorPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const scrollToForm = () => {
    document.getElementById("sponsor-form")?.scrollIntoView({
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
          badge="BE A SPONSOR"
          title="Sponsor a Program"
          description="At ISLAH, every program is designed to create sustainable and measurable change in the lives of rural and underserved communities. By sponsoring a program, project, or initiative, you help ensure that education, healthcare, livelihoods, and dignity reach those who need them the most."
          breadcrumb={[{ label: "Sponsor a Program" }]}
        >
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              Apply for Sponsorship <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/sponsorship-policy"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition text-xs sm:text-sm uppercase tracking-wider"
            >
              Sponsorship Policy
            </a>
          </div>
        </StandardPageHero>

        {/* ─── Online & Offline Bank Details (Page 27 of PDF) ───────────────── */}
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* Online Quick Donation */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-black text-brand-green uppercase tracking-wider mb-2">
                    <CreditCard className="w-4 h-4" /> Option 1: Online Donation / Sponsorship
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Instant Online Sponsorship
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    Support a specific initiative online via UPI, Net Banking, or Debit/Credit card. Instant 80G receipt generated upon completion.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Education • Health • SHGs • Relief</span>
                  <a
                    href="/donate"
                    className="inline-flex items-center gap-1.5 bg-brand-orange hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
                  >
                    Donate Online <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Offline Bank Transfer (NEFT/RTGS) */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm">
                <div className="inline-flex items-center gap-2 text-xs font-black text-[#144272] uppercase tracking-wider mb-2">
                  <Landmark className="w-4 h-4" /> Option 2: Direct Bank Transfer (NEFT / RTGS)
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Bank Account Details
                </h3>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-sans font-semibold">Account Name:</span>
                    <span className="font-bold text-slate-800">ISLAH WELFARE FOUNDATION</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-sans font-semibold">Account Type:</span>
                    <span className="font-bold text-slate-800">Savings Account</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-sans font-semibold">Bank Name:</span>
                    <span className="font-bold text-slate-800">Bihar Gramin Bank / PNB</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-sans font-semibold">Account Number:</span>
                    <span className="font-bold text-brand-green tracking-wider">1088459100008926</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500 font-sans font-semibold">IFSC Code:</span>
                    <span className="font-bold text-brand-orange tracking-wider">BRGB0000108</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans font-semibold">Branch:</span>
                    <span className="font-bold text-slate-800">Darbhanga, Bihar</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-3 italic">
                  * Kindly email your transfer reference / UTR number to <strong>info@iwfindia.org</strong> for receipt dispatch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5-Step Sponsorship Journey (Page 30 of PDF) ──────────────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                The Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                The Sponsorship Journey (5 Steps)
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mt-2">
                From initial alignment to celebrating life-changing transformation on the ground.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {[
                { step: "Step 1", title: "Connect", desc: "Share your sponsorship interest or choose a focus program." },
                { step: "Step 2", title: "Choose", desc: "Select the specific village cluster, project, or beneficiary group." },
                { step: "Step 3", title: "Commit", desc: "Finalize agreement, grant timeline, and utilization milestones." },
                { step: "Step 4", title: "Monitor", desc: "Receive periodic photographic updates and verified audit reports." },
                { step: "Step 5", title: "Celebrate", desc: "Witness lasting community impact and empowerment firsthand." },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 text-center">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-orange/15 text-brand-orange font-bold text-xs uppercase mb-2">
                    {item.step}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Sponsorship Application Form (Page 28) ────────────────────────── */}
        <section id="sponsor-form" className="py-16 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-[#071527] to-[#0c2340] px-6 sm:px-10 py-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold mb-2">
                  <Heart className="w-3.5 h-3.5 fill-amber-200" /> Official Application
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Sponsorship Application Form</h2>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  Empower a community by sponsoring a program with measurable social impact.
                </p>
              </div>

              <div className="p-6 sm:p-10">
                <SponsorApplicationForm />
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
