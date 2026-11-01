import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Trees, Leaf, Droplets, Sun, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";
import sectorEnvImg from "@/assets/sector_environment_1.png";

export default function TreePlantation() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const VARIETIES = [
    { icon: Trees, tag: "Indigenous", title: "Native Shade & Timber Trees", desc: "Planting Peepal, Banyan, Neem, Shisham, and Jamun adapted to local soil and maximizing carbon sequestration." },
    { icon: Leaf, tag: "Fruit Bearing", title: "Fruit Orchards for Nutrition", desc: "Establishing community mango, guava, amla, and papaya orchards generating local fruit nutrition and income." },
    { icon: Droplets, tag: "Soil Care", title: "Canal & Riverbank Afforestation", desc: "Dense planting along pond bunds, river banks, and canal edges preventing soil erosion and water runoff." },
    { icon: Sun, tag: "Green Schools", title: "School & Institutional Groves", desc: "Creating mini herbal gardens and flowering borders in rural government schools with student tree stewards." },
  ];

  const STATS = [
    { value: "50,000+", label: "Saplings Planted & Geotagged" },
    { value: "85%", label: "3-Year Survival Rate" },
    { value: "30+", label: "Green Villages Adopted" },
    { value: "10,000+", label: "Student Tree Guardians" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <SubpageHeroCarousel
          tag="Initiative • Green Village Campaign"
          title="Tree Plantation & Green Village"
          subtitle="Afforestation drives, rural fruit orchards, school herbal gardens, and geotagged community tree stewardship creating climate-resilient green ecosystems."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Environment", href: "/programs/environment" },
            { label: "Tree Plantation" },
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
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Ecological Interventions</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">Afforestation & Eco-Restoration</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Targeted planting protocols with post-plantation tree guard protection and 3-year survival monitoring.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-50 p-8 flex flex-col justify-between">
                <div className="relative z-10 space-y-4">
                  <span className="inline-block bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs">
                    Geotagged Stewardship
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug">Every Tree Adopted &amp; Nurtured for 3 Years</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Unlike standard plantation drives, Islah assigns each sapling to a local student or village elder equipped with a protective bamboo tree-guard and regular watering schedule.
                  </p>
                </div>
                <div className="relative z-10 pt-6 border-t border-slate-200 mt-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-green shrink-0" />
                    <p className="text-xs text-slate-700 font-medium">Over 85% verified sapling survival rate tracked via digital geo-tagging audits.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {VARIETIES.map((v, idx) => {
                  const Icon = v.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold text-brand-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                            {v.tag}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{v.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Native Ecological Species</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Banner */}
        <section className="py-10 bg-slate-50/70 border-y border-slate-200 text-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
            <Trees className="w-8 h-8 text-brand-orange mx-auto" />
            <p className="text-lg md:text-xl font-semibold leading-relaxed italic text-slate-800 text-balance">
              “The true meaning of life is to plant trees, under whose shade you do not expect to sit. We plant for our children and generations unborn.”
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
            <Link to="/programs/environment" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-800 hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95">
              <ArrowLeft className="w-4 h-4" /> Environment Overview
            </Link>
            <Link to="/programs/environment/plastic-free-communities" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95">
              Next: Plastic-Free Communities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
