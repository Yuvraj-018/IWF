import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Store, DollarSign, Users, Award, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_women_1.png";

export default function RuralWomenEntrepreneurship() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const FEATURE_ROWS = [
    {
      icon: Store,
      num: "01",
      title: "Micro-Enterprise Incubation & Business Planning",
      desc: "Comprehensive guidance for rural women to transition from individual artisans into small business owners. We assist with cost-calculation, business plans, inventory management, and raw material sourcing.",
      highlights: ["Business ideation & product selection", "Costing & margin management", "Localized raw material procurement"],
    },
    {
      icon: DollarSign,
      num: "02",
      title: "Interest-Free Seed Capital & Micro-Grants",
      desc: "Providing initial financial support without burdensome high-interest loans. Eligible women entrepreneurs receive seed capital grants to purchase commercial equipment and packaging machinery.",
      highlights: ["Zero-interest revolving seed fund", "Direct bank account disbursement", "Financial discipline mentoring"],
    },
    {
      icon: TrendingUp,
      num: "03",
      title: "Direct Market Links & Exhibition Stalls",
      desc: "Connecting women-led enterprises directly with rural haats, urban organic exhibitions, and retail bulk buyers to ensure reliable, recurring order pipelines.",
      highlights: ["Participation in SARAS & handicraft fairs", "Packaging & branding assistance", "Digital catalogue on social channels"],
    },
  ];

  const PILLARS = [
    { icon: Lightbulb, title: "Self-Reliance", desc: "Building local enterprises owned and managed independently by rural women." },
    { icon: Users, title: "Peer Collaboration", desc: "Forming joint liability producer groups for shared equipment and bulk sales." },
    { icon: Award, title: "Dignity & Leadership", desc: "Elevating women's social status through verifiable household financial contribution." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Rural Women Entrepreneurship" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/women-empowerment" className="hover:text-white">Women Empowerment</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Rural Women Entrepreneurship</span>
            </nav>
            <Link to="/programs/women-empowerment" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Women Empowerment
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Lightbulb className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Enterprise Incubation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Rural Women Entrepreneurship<br />
              <span className="text-brand-orange">Creating Sustainable Micro-Enterprises</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Incubating rural women-led businesses through zero-interest seed capital, packaging support, accounting mentoring, and direct market exhibitions.
            </p>
          </div>
        </section>

        {/* 3 Core Pillars Strip */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0 font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{p.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Horizontal Alternating Feature Rows */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Incubation Support</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">How We Build Women-Led Businesses</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">A structured handholding model ensuring new enterprises survive and thrive beyond initial startup.</p>
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
                          <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase">Pillar {row.num}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900">{row.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{row.desc}</p>
                      </div>
                      <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Interventions</p>
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

        {/* Navy Quote Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <ShieldCheck className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "Rural entrepreneurship turns job-seekers into job-creators. We invest in women who will transform their village economies."
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/women-empowerment/women-skill-livelihood" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Women Skill & Livelihood
            </Link>
            <Link to="/programs/women-empowerment/self-help-groups" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Self-Help Groups (SHG) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
