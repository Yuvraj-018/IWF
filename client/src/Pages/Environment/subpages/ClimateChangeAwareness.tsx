import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
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
        <SubpageHeroCarousel
          tag="Initiative • Climate Action"
          title="Climate Change & Ecological Resilience"
          subtitle="Equipping rural villages with climate literacy, water table conservation strategies, renewable energy alternatives, and disaster preparedness frameworks."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Environment", href: "/programs/environment" },
            { label: "Climate Change Awareness" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/environment"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Environment Programmes
            </Link>
          </div>
        </SubpageHeroCarousel>

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
                        <span className="text-2xl font-bold text-brand-green/30 group-hover:text-brand-green transition-colors">{s.step}</span>
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

        {/* Quote Banner */}
        <section className="py-10 bg-slate-50/70 border-y border-slate-200 text-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
            <Globe className="w-8 h-8 text-brand-orange mx-auto" />
            <p className="text-lg md:text-xl font-semibold leading-relaxed italic text-slate-800 text-balance">
              “Climate change is not a distant future threat — it is already impacting our farmers, water supplies, and seasonal harvests. Grassroots climate action is urgent and essential.”
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-slate-300" />
              <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-slate-300" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/environment/sustainable-agriculture" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-800 hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95">
              <ArrowLeft className="w-4 h-4" /> Prev: Sustainable Agriculture
            </Link>
            <Link to="/programs/agriculture" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-brand-green hover:bg-brand-green-dark px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95">
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
