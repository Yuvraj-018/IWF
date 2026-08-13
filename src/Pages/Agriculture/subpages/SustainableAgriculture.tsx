import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Sprout, Leaf, Droplets, Sun, CheckCircle2, ShieldCheck, Sparkles, Tractor } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-agriculture.jpg";

export default function SustainableAgricultureAgri() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const FOCUS_POINTS = [
    { icon: Sprout, tag: "Soil Care", title: "Soil Health Cards & Micro-Nutrients", desc: "Providing field soil testing kits to analyze nitrogen, phosphorus, potash, and organic carbon levels." },
    { icon: Droplets, tag: "Conservation", title: "Laser Land Levelling & Mulching", desc: "Demonstrating laser land levelers and biomass residue mulching to optimize water spread and retain soil moisture." },
    { icon: Leaf, tag: "Bio-Fertilizer", title: "On-Farm Jeevamrut & Vermicompost", desc: "Setting up low-cost vermicompost beds and bio-fertilizer drums using native cow dung and urine formulations." },
    { icon: Sun, tag: "Crop Rotation", title: "Legume Intercropping & Green Manure", desc: "Promoting pulses, dhaincha (sesbania), and sunn hemp green manuring to naturally replenish soil nitrogen." },
  ];

  const STATS = [
    { value: "3,500+", label: "Farmers Adopted Eco-Practices" },
    { value: "30-40%", label: "Reduction in Chemical Input Costs" },
    { value: "25+", label: "Model Demonstration Plots" },
    { value: "100%", label: "Farmer-Led Field Schools" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Sustainable Agriculture" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/agriculture" className="hover:text-white">Agriculture</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Sustainable Agriculture</span>
            </nav>
            <Link to="/programs/agriculture" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Agriculture Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Tractor className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Soil Health & Crop Diversity</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Sustainable Agriculture & Soil Health<br />
              <span className="text-brand-orange">Reviving Soil Vitality, Maximizing Yields</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Empowering smallholder farmers with scientific soil testing, bio-fertilizers, legume intercropping, and conservation agriculture to dramatically cut input costs and enhance long-term farm productivity.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {STATS.map((s, i) => (
                <div key={i} className="border-r last:border-r-0 border-slate-100 py-2">
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">{s.value}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Sustainable Interventions</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">Core Sustainable Agriculture Practices</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Practical, high-impact soil regeneration and cost-reduction techniques demonstrated on farmer fields.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-[#0b1f3b] text-white p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="inline-block bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Model Demo Plots
                  </span>
                  <h3 className="text-2xl font-extrabold leading-snug">Farmer-Led Field Demonstration Schools</h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Seeing is believing. We establish side-by-side comparative plots comparing conventional chemical agriculture with regenerative sustainable methods, demonstrating higher net profits to participating farmers.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/15 mt-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-orange shrink-0" />
                    <p className="text-xs text-slate-200">Demonstrated 35% reduction in synthetic fertilizer purchases with zero yield penalty.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {FOCUS_POINTS.map((fp, idx) => {
                  const Icon = fp.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold text-brand-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                            {fp.tag}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{fp.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{fp.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Scientifically Verified</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Navy Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <Tractor className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "Healthy soil produces healthy crops, which create healthy communities. Sustainable agriculture is the ultimate foundation of rural prosperity."
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
            <Link to="/programs/agriculture" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Agriculture Overview
            </Link>
            <Link to="/programs/agriculture/farmer-training" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Farmer Training <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
