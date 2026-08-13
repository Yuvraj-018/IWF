import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Home as HomeIcon, Wrench, Package, Droplets, Sun, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_relief_1.png";

export default function HousingNecessities() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const SUPPORTS = [
    { icon: HomeIcon, tag: "Shelter", title: "Emergency Roof & Wall Repairs", desc: "Reinforcing damaged tin roofs, thatch walls, and structurally compromised mud houses before monsoons." },
    { icon: Droplets, tag: "Clean Water", title: "Handpump Installation & Water Filters", desc: "Installing community deep-bore handpumps and distributing domestic gravity water filters in water-scarce hamlets." },
    { icon: Package, tag: "Essentials", title: "Household Utensil & Bedding Kits", desc: "Providing steel cooking vessels, mattresses, blankets, mosquito nets, and clean clothing to destitute families." },
    { icon: Sun, tag: "Clean Energy", title: "Solar Home Lighting Kits", desc: "Deploying solar lamps and small home solar systems to un-electrified rural huts for evening safety and child study." },
    { icon: Wrench, tag: "Sanitation", title: "Individual Household Latrines (IHHL)", desc: "Constructing twin-pit pour-flush toilets ensuring privacy, hygiene, and safety for rural women and girls." },
    { icon: Heart, tag: "Dignity", title: "Elderly & Disabled Home Adaptations", desc: "Installing safety ramps, handrails, and basic accessibility fixtures for disabled and elderly villagers." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Housing & Necessities" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/relief-and-rehabilitation" className="hover:text-white">Relief & Rehabilitation</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Housing & Necessities</span>
            </nav>
            <Link to="/programs/relief-and-rehabilitation" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Relief Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <HomeIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Basic Needs & WASH</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Housing, Clean Water & Necessities<br />
              <span className="text-brand-orange">A Safe Roof, Clean Water, A Dignified Life</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Assisting impoverished families with shelter repairs, community handpumps, hygienic toilets, solar lighting, and essential household utility kits.
            </p>
          </div>
        </section>

        {/* 6-Card Magazine Grid */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Housing & Living Support</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">6 Key Pillars of Living Dignity</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Providing essential physical infrastructure so families can live safely and with dignity.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUPPORTS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-brand-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                          {s.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{s.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-5 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Direct Ground Execution</span>
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
            <ShieldCheck className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "A safe roof overhead and access to clean drinking water are basic human rights. IWF works tirelessly to ensure no rural family is left without shelter."
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
            <Link to="/programs/relief-and-rehabilitation/food-nutrition" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Food & Nutrition
            </Link>
            <Link to="/programs/relief-and-rehabilitation/widows-orphans" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Widows & Orphans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
