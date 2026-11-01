import { useState } from "react";
import {
  Building2,
  Handshake,
  CheckCircle2,
  ArrowRight,
  Shield,
  Target,
  Sparkles,
  Users,
  FileText,
  TrendingUp,
  Globe,
  Award,
  Check,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import { PartnerApplicationForm } from "@/components/forms/PartnerApplicationForm";
import type { RoleType } from "@/components/forms/RoleFormModal";

import { StandardPageHero } from "@/components/layout/StandardPageHero";

export default function PartnerPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const scrollToForm = () => {
    document.getElementById("partner-form")?.scrollIntoView({
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
          badge="PARTNER WITH US"
          title="Partnership with Us"
          description="At ISLAH, we believe that meaningful and sustainable development is achieved through purposeful collaboration. We invite CSR foundations, NGOs, academic institutions, and corporate leaders to co-create sustainable solutions for rural and underserved India."
          breadcrumb={[{ label: "Partner with Us" }]}
        >
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              Apply for Partnership <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/partnership-policy"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition text-xs sm:text-sm uppercase tracking-wider"
            >
              Partnership Policy
            </a>
          </div>
        </StandardPageHero>

        {/* ─── Areas We Work In (Page 16 of PDF) ───────────────────────────────── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Working Domains
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Areas We Work In
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Our partnership programs cover the core pillars of grassroots community transformation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Education & Learning",
                  desc: "Academic support, digital literacy, scholarships, infrastructure upgrades, and career guidance for underserved students.",
                  icon: Target,
                },
                {
                  title: "Healthcare & Well-being",
                  desc: "Preventive health camps, rural clinics, maternal-child health, clean water, and ambulance life-support networks.",
                  icon: Shield,
                },
                {
                  title: "Women & Youth Empowerment",
                  desc: "Self-Help Groups (SHGs), financial literacy, vocational skill training, and leadership development programs.",
                  icon: Users,
                },
                {
                  title: "Sustainable Livelihood & Relief",
                  desc: "Farmer support, climate resilience, emergency humanitarian assistance, and self-reliant model village creation.",
                  icon: TrendingUp,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-green hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#163a69] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <item.icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-brand-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black font-normal leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Collaborative Journey (8-Step Framework from Page 21) ─────────── */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Structured Process
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                The Partnership Journey (8 Steps)
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mt-2">
                How we move from initial conversation to sustainable, measurable field outcomes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { num: "01", title: "Engage", desc: "Initial dialogue and exploration of shared goals." },
                { num: "02", title: "Align", desc: "Identify strategic priorities and community needs." },
                { num: "03", title: "Design", desc: "Co-create actionable, outcome-driven programs." },
                { num: "04", title: "Agree", desc: "Establish clear roles, MoU, and transparency metrics." },
                { num: "05", title: "Implement", desc: "Execute with strong on-ground community leadership." },
                { num: "06", title: "Monitor", desc: "Continuous data collection and impact evaluation." },
                { num: "07", title: "Communicate", desc: "Transparent progress reports and stakeholder updates." },
                { num: "08", title: "Scale", desc: "Replicate and expand successful community models." },
              ].map((step, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 text-left">
                  <span className="text-lg font-black text-brand-orange font-mono block mb-1">
                    {step.num}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Partnership Application Form (Page 14) ─────────────────────────── */}
        <section id="partner-form" className="py-16 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-[#071527] to-[#0c2340] px-6 sm:px-10 py-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold mb-2">
                  <Building2 className="w-3.5 h-3.5" /> Official Application
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Partnership Application Form</h2>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  Tell us about your organization and how we can collaborate to empower underserved communities.
                </p>
              </div>

              <div className="p-6 sm:p-10">
                <PartnerApplicationForm />
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
