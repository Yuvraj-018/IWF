import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Globe, Sun, CloudRain, Shield, CheckCircle2, ShieldCheck, Sparkles, Wind } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";

export default function ClimateChangeAwareness() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const STAGES = [
    {
      step: "01",
      icon: Sun,
      title: "Understanding Climate Vulnerability",
      desc: "Educating rural communities on erratic rainfall patterns, prolonged summer heatwaves, and seasonal shifting.",
    },
    {
      step: "02",
      icon: CloudRain,
      title: "Community Water & Soil Resilience",
      desc: "Implementing village-level rainwater recharge trenches, desilting traditional ponds, and soil moisture retention.",
    },
    {
      step: "03",
      icon: Wind,
      title: "Clean Energy Adoption",
      desc: "Promoting solar lamps, solar water pumps, and clean energy alternatives to replace diesel and biomass burning.",
    },
    {
      step: "04",
      icon: Globe,
      title: "Village Climate Action Plans (VCAP)",
      desc: "Forming community climate vigilance committees that lead local greening, disaster drills, and waste reduction.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Climate Change Awareness" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/environment" className="hover:text-white">Environment</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Climate Change Awareness</span>
            </nav>
            <Link to="/programs/environment" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Environment Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Climate Action</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Climate Change & Ecological Resilience<br />
              <span className="text-brand-orange">Building Grassroots Climate Guardians</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Equipping rural villages with climate literacy, water table conservation strategies, renewable energy alternatives, and disaster preparedness frameworks.
            </p>
          </div>
        </section>

        {/* Stepwise Progression Pathway */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Climate Resilience Model</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">4-Stage Climate Action Pathway</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Transforming climate vulnerability into community-driven ecological resilience.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STAGES.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-brand-green/30 group-hover:text-brand-green transition-colors">{s.step}</span>
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{s.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Community Action Focus</span>
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
            <Globe className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "Climate change is not a distant future threat — it is already impacting our farmers, water supplies, and seasonal harvests. Grassroots climate action is urgent and essential."
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
            <Link to="/programs/environment/sustainable-agriculture" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Sustainable Agriculture
            </Link>
            <Link to="/programs/agriculture" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-green hover:bg-brand-green-dark px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Agriculture Sector →
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
