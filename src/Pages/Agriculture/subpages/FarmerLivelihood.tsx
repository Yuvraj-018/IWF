import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, TrendingUp, Users, Store, ShieldCheck, DollarSign, Package, CheckCircle2, Sparkles, Tractor } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-agriculture.jpg";

export default function FarmerLivelihood() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const INTERVENTIONS = [
    { icon: Users, title: "Farmer Producer Organisation (FPO) Formation", desc: "Aggregating small and marginal farmers into legally registered producer companies to gain collective bargaining power for buying inputs and selling crops." },
    { icon: DollarSign, title: "Bulk Input Procurement at Wholesale Rates", desc: "Eliminating local retail markups by purchasing certified seeds, bio-fertilizers, and equipment directly from manufacturers in bulk." },
    { icon: Package, title: "Post-Harvest Primary Processing & Storage", desc: "Setting up village-level grain cleaners, graders, moisture meters, and hermetic storage bags to prevent distress selling at harvest time." },
    { icon: Store, title: "Direct Mandi & Institutional Buyer Contracts", desc: "Negotiating fair-price contracts with flour mills, spice exporters, and retail supermarket chains to bypass exploitative intermediaries." },
    { icon: Tractor, title: "Custom Hiring Centres (CHC) for Machinery", desc: "Establishing community toolbanks where small farmers can rent tractors, seed drills, and harvesters at heavily subsidized hourly rates." },
    { icon: TrendingUp, title: "Crop Value Addition (Flour, Oil & Spices)", desc: "Enabling farmer collectives to mill mustard oil, grind stone-milled wheat flour, and package turmeric for higher retail profit margins." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Farmer Livelihood & FPO" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/agriculture" className="hover:text-white">Agriculture</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Farmer Livelihood & FPO</span>
            </nav>
            <Link to="/programs/agriculture" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Agriculture Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Market Linkage</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Farmer Livelihood & FPO Collectives<br />
              <span className="text-brand-orange">Collective Power, Fair Price, Doubled Incomes</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Forming Farmer Producer Organisations (FPOs), setting up custom machinery hiring centres, primary processing units, and direct linkages to institutional buyers.
            </p>
          </div>
        </section>

        {/* 6 Interventions Grid */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">FPO Value Chain</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">6 Pillars of Farm Market Power</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Transforming marginal producers into organized market players with ownership of the entire value chain.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INTERVENTIONS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-5 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Direct Farmer Benefit</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Navy High-Contrast Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <Tractor className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "When farmers unite, they dictate terms, eliminate exploitation, and secure the true value of their sweat and soil."
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
            <Link to="/programs/agriculture/water-conservation" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Water Conservation
            </Link>
            <Link to="/programs" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-green hover:bg-brand-green-dark px-5 py-2.5 rounded-lg transition-all shadow-sm">
              All Programmes Directory →
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
