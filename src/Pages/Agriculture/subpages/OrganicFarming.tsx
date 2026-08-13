import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, ShieldCheck, Sprout, Award, CheckCircle2, TrendingUp, Sparkles, Heart } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-agriculture.jpg";

export default function OrganicFarming() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const PILLARS = [
    {
      icon: ShieldCheck,
      badge: "PGS-India",
      title: "Participatory Guarantee Scheme (PGS) Certification",
      desc: "Organizing smallholder farmers into local peer-review groups for affordable, peer-verified organic certification without expensive private agency fees.",
    },
    {
      icon: Sprout,
      badge: "Zero Chemical",
      title: "Bio-Inputs & Natural Formulation Units",
      desc: "Establishing community bio-input centers where farmers collectively prepare and access Panchagavya, Beejamrut, and Agniastra formulations.",
    },
    {
      icon: TrendingUp,
      badge: "Premium Price",
      title: "Organic Mandi & Direct Urban Buyer Linkage",
      desc: "Connecting PGS-certified organic grower groups directly to premium urban organic stores, apartment associations, and online organic aggregators.",
    },
  ];

  const BENEFITS = [
    "Eliminate 100% of toxic chemical fertilizers and hazardous synthetic pesticides from food crops",
    "Dramatically lower cultivation input costs by utilizing indigenous on-farm organic resources",
    "Obtain 20%–35% premium market prices through verified organic certification labels",
    "Restore natural soil microbial diversity, earthworm populations, and organic carbon levels",
    "Produce pure, chemical-free, nutrient-rich food that protects public health and consumer wellness",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Organic Farming" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/agriculture" className="hover:text-white">Agriculture</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Organic Farming</span>
            </nav>
            <Link to="/programs/agriculture" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Agriculture Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Certified Organic</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Organic Farming & Certification<br />
              <span className="text-brand-orange">Chemical-Free Harvests, Certified Value</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Assisting farmers with low-cost PGS-India organic certification, community bio-input preparation units, and direct linkages to premium urban organic markets.
            </p>
          </div>
        </section>

        {/* 3-Column Magazine Cards Section */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Certification & Markets</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">3 Pillars of Organic Transformation</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Enabling marginal farmers to capture premium value from pesticide-free agricultural produce.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {PILLARS.map((col, idx) => {
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
                      <span>Certified Traceable Supply</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5-Point Benefits Checklist */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Key Advantages</p>
              <h3 className="text-2xl font-extrabold text-brand-green-dark">5 Proven Benefits of Going Organic</h3>
            </div>
            <div className="space-y-3">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed pt-1">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navy High-Contrast Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <ShieldCheck className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "Organic farming is not a trend — it is our ancestral heritage revived with modern quality standards to protect human health and mother earth."
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
            <Link to="/programs/agriculture/farmer-training" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Farmer Training
            </Link>
            <Link to="/programs/agriculture/water-conservation" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Water Conservation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
