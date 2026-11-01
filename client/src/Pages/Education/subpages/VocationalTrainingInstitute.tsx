import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Wrench, Briefcase, Award, CheckCircle2, ShieldCheck, Sparkles, Hammer, Cpu } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/sector_education_1.png";

export default function VocationalTrainingInstitute() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const FEATURE_ROWS = [
    {
      icon: Hammer,
      num: "01",
      title: "Construction Trades: Plumbing, Masonry & Tiling",
      desc: "Comprehensive certified training in modern PVC plumbing, pipe-fitting, hydraulic testing, high-precision tile laying, and waterproofing methods.",
      highlights: ["Modern power tools training", "Safety & PPE protocols", "Direct recruitment with construction developers"],
    },
    {
      icon: Wrench,
      num: "02",
      title: "Welding, Fabrication & Sheet Metal Craft",
      desc: "Arc welding, MIG/TIG welding techniques, metal cutting, structural fabrication, and blueprint interpretation for industrial manufacturing.",
      highlights: ["Individual welding simulation booths", "Certified metal joint testing", "Industrial safety certifications"],
    },
    {
      icon: Cpu,
      num: "03",
      title: "Digital Data Entry & Office Automation",
      desc: "Typing speed training in Hindi and English, MS Office suite mastery, invoicing software, basic accounting, and digital communications.",
      highlights: ["Bilingual typing speed tests", "Tally & GST billing basics", "Back-office corporate placement"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Standardized Hero */}
        <SubpageHeroCarousel
          tag="EDUCATION • TRADE SKILLS"
          title="Vocational Training Institute (VTI)"
          subtitle="Fast-track certified technical and industrial trade skills enabling rural youth to secure sustainable, dignified employment."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Education & Learning", href: "/programs/education" },
            { label: "Vocational Training Institute" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/education"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Programmes
            </Link>
            <button
              onClick={() => setActiveModal("partner")}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-md"
            >
              Support This Centre
            </button>
          </div>
        </SubpageHeroCarousel>

        {/* Horizontal Feature Rows */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Vocational Courses</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">Core Vocational Certifications</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Targeted technical trades enabling immediate employment in construction, manufacturing, and services.</p>
            </div>

            <div className="space-y-6">
              {FEATURE_ROWS.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-8 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase">Trade {row.num}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900">{row.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{row.desc}</p>
                      </div>
                      <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Trade Highlights</p>
                        {row.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quote Banner */}
        <section className="py-10 bg-slate-50/70 border-y border-slate-200 text-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
            <Wrench className="w-8 h-8 text-brand-orange mx-auto" />
            <p className="text-lg md:text-xl font-serif italic leading-relaxed text-slate-800 text-balance">
              "A skilled pair of hands will never go hungry. Vocational training bridges the critical divide between unemployment and dignified livelihood."
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="h-px w-8 bg-brand-orange/40" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/40" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/education/technical-institute" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs">
              <ArrowLeft className="w-4 h-4" /> Prev: Technical Institute
            </Link>
            <Link to="/programs/skills-development" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-dark px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs">
              Skills Development Sector →
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
