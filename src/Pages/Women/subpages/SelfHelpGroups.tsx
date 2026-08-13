import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Users, PiggyBank, BookOpen, ShieldCheck, TrendingUp, HandHeart, CheckCircle2, Award, Heart } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_women_1.png";

export default function SelfHelpGroups() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const SHG_PILLARS = [
    {
      icon: PiggyBank,
      badge: "Savings & Thrift",
      title: "Community Micro-Savings Pools",
      desc: "Facilitating 10–20 women groups to pool monthly voluntary savings, establishing emergency credit cushions and reducing dependency on local money lenders.",
    },
    {
      icon: BookOpen,
      badge: "Financial Governance",
      title: "SHG Bookkeeping & Record Auditing",
      desc: "Training group office bearers in transparent cashbook maintenance, resolution logs, passbook entries, and internal loan reconciliation.",
    },
    {
      icon: TrendingUp,
      badge: "Bank Linkage",
      title: "NRLM & Bank Credit Linkage",
      desc: "Assisting mature SHGs in opening formal savings bank accounts, securing subsidized priority credit, and linking with government livelihood schemes.",
    },
  ];

  const GOALS = [
    "Foster a disciplined habit of regular household thrift and mutual financial assistance",
    "Liberate poor rural women from the trap of informal predatory lending",
    "Build collective decision-making capacity and leadership within rural communities",
    "Enable group-based economic enterprises such as grain processing, handicrafts, and dairy",
    "Create trusted community networks for social solidarity, health awareness, and crisis relief",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Self-Help Groups" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/women-empowerment" className="hover:text-white">Women Empowerment</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Self-Help Groups (SHG)</span>
            </nav>
            <Link to="/programs/women-empowerment" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Women Empowerment
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Users className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Community Collectives</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Self-Help Groups (SHG)<br />
              <span className="text-brand-orange">Collective Strength, Collective Prosperity</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Organizing rural women into self-governed savings and credit collectives — building financial security, dignity, mutual solidarity, and group enterprise.
            </p>
          </div>
        </section>

        {/* 3-Column Magazine Cards Section */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Pillars of Solidarity</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">How SHGs Transform Communities</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Building financial democracy from the ground up through regular weekly savings and internal lending.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {SHG_PILLARS.map((col, idx) => {
                const Icon = col.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-brand-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                          {col.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-green transition-colors">{col.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{col.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-6 flex items-center gap-2 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Regular Audit & Mentoring</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5-Point Objectives Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Empowerment Goals</p>
              <h3 className="text-2xl font-extrabold text-brand-green-dark">5 Strategic Objectives of IWF SHGs</h3>
            </div>
            <div className="space-y-3">
              {GOALS.map((goal, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-brand-green/30 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed pt-1">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navy Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <HandHeart className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "An individual woman can be vulnerable, but twenty women united in an SHG become an invincible force of economic resilience and community leadership."
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/women-empowerment/rural-women-entrepreneurship" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Rural Women Entrepreneurship
            </Link>
            <Link to="/programs/women-empowerment/financial-literacy" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Financial Literacy <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
