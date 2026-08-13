import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Zap, Shield, Package, Users, Heart, MapPin, CheckCircle2, ShieldAlert, Sparkles, LifeBuoy } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_relief_1.png";
import causeMedImg from "@/assets/cause-medical.png";

export default function DisasterResponse() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const CAPABILITIES = [
    { icon: Zap, tag: "24-48 Hrs", title: "Emergency Rapid Deployment", desc: "Pre-positioned disaster units deployed within 24 to 48 hours to flood and fire-affected areas." },
    { icon: Shield, tag: "Shelter", title: "Temporary Shelter & Tarpaulins", desc: "Setting up emergency waterproof tarpaulins, family tents, and community safe refuge centres." },
    { icon: Package, tag: "Essential Kits", title: "Dry Ration & Hygiene Kits", desc: "Emergency packaged foods, clean drinking water pouches, chlorine tablets, and antiseptic hygiene packs." },
    { icon: Heart, tag: "Medical Aid", title: "First Aid & Triage Support", desc: "On-ground medical first responders treating minor injuries, fever, and facilitating emergency hospital transport." },
  ];

  const PHASES = [
    { step: "01", title: "Alert & Rapid Reconnaissance", desc: "Emergency volunteer mobilization and real-time damage and need assessment across isolated villages." },
    { step: "02", title: "Relief Inflow & Distribution", desc: "Direct distribution of survival kits, clean water, and cooked meals to marooned families." },
    { step: "03", title: "Medical Sanitization & WASH", desc: "Water chlorination, bleaching powder spraying, and mobile doctor clinics to prevent epidemic outbreaks." },
    { step: "04", title: "Rehabilitation Handover", desc: "Transitioning from emergency rescue to shelter reconstruction, crop compensation, and livelihood support." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Disaster Response" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/relief-and-rehabilitation" className="hover:text-white">Relief & Rehabilitation</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Disaster Response</span>
            </nav>
            <Link to="/programs/relief-and-rehabilitation" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Relief Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Emergency Response</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Disaster Response & Emergency Relief<br />
              <span className="text-brand-orange">Rapid Action When Disaster Strikes</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Providing rapid life-saving relief — emergency food, water purification, temporary shelter, and field medical assistance to communities struck by floods, fires, and sudden calamities.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Frontline Capabilities</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">Rapid Relief Infrastructure</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Trained volunteer teams and pre-stocked supply warehouses ready for instant disaster deployment.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-[#0b1f3b] text-white p-8 flex flex-col justify-between">
                <img src={causeMedImg} alt="Emergency relief" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                <div className="relative z-10 space-y-4">
                  <span className="inline-block bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Flood & Calamity Shield
                  </span>
                  <h3 className="text-2xl font-extrabold leading-snug">Monsoon Flood Rescue & Inundation Relief</h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    In flood-prone belts across Bihar and Eastern India, IWF deploys inflatable rescue boats, emergency food drops, and drinking water purification units within hours of alerts.
                  </p>
                </div>
                <div className="relative z-10 pt-6 border-t border-white/15 mt-6">
                  <div className="flex items-center gap-3">
                    <LifeBuoy className="w-6 h-6 text-brand-orange shrink-0" />
                    <p className="text-xs text-slate-200">Zero administrative delays: emergency relief teams operate autonomously with local volunteer networks.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {CAPABILITIES.map((cap, idx) => {
                  const Icon = cap.icon;
                  return (
                    <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold text-brand-green bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            {cap.tag}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{cap.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready For Dispatch</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4-Phase Response Protocol */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Standard Operating Procedure</p>
              <h3 className="text-2xl font-extrabold text-brand-green-dark">4-Phase Disaster Protocol</h3>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {PHASES.map((ph, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <span className="text-3xl font-black text-brand-orange/30 mb-2 block">{ph.step}</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{ph.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navy High-Contrast Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <ShieldAlert className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "In the darkest hours of flood, fire, and calamity, IWF stands as an unwavering beacon of immediate humanitarian aid and hope."
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
            <Link to="/programs/relief-and-rehabilitation" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Relief & Rehabilitation Overview
            </Link>
            <Link to="/programs/relief-and-rehabilitation/food-nutrition" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Food & Nutrition <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
