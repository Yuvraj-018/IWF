import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Sprout, Leaf, Droplets, Sun, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";

export default function SustainableAgricultureEnv() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const METHODS = [
    { icon: Sprout, tag: "Soil Health", title: "Composting & Bio-Enzymes", desc: "Training farmers in on-farm composting, Jeevamrut preparation, and bio-fertilizer production to rejuvenate depleted topsoil." },
    { icon: Droplets, tag: "Conservation", title: "Micro-Irrigation & Mulching", desc: "Demonstrating drip irrigation, rainwater farm ponds, and natural biomass mulching to cut water consumption by 50%." },
    { icon: Leaf, tag: "Ecological", title: "Biological Pest Management", desc: "Using neem decoctions, pheromone traps, and companion planting instead of hazardous synthetic pesticides." },
    { icon: Sun, tag: "Seeds", title: "Indigenous Seed Banks", desc: "Preserving climate-resilient native grain and vegetable heirloom seeds adapted to drought and local conditions." },
    { icon: ShieldCheck, tag: "Biodiversity", title: "Agroforestry & Tree Borders", desc: "Planting perennial multi-purpose trees along farm bunds creating natural windbreaks and micro-climate buffers." },
    { icon: Heart, tag: "Health", title: "Zero-Chemical Nutrition Gardens", desc: "Assisting rural households in growing backyard organic kitchen gardens for pesticide-free daily family nutrition." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <SubpageHeroCarousel
          tag="Initiative • Eco-Farming Practices"
          title="Sustainable Agriculture & Eco-Farming"
          subtitle="Promoting eco-friendly farming practices, organic compost, natural bio-pesticides, drip irrigation, and heirloom seed conservation across rural farming communities."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Environment", href: "/programs/environment" },
            { label: "Sustainable Agriculture" },
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

        {/* 6-Card Magazine Grid */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Ecological Farm Practices</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">6 Eco-Farming Interventions</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Harmonizing traditional agricultural wisdom with modern ecological resource management.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {METHODS.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-brand-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                          {m.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{m.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-5 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Field Demonstrated</span>
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
            <Sprout className="w-8 h-8 text-brand-orange mx-auto" />
            <p className="text-lg md:text-xl font-semibold leading-relaxed italic text-slate-800 text-balance">
              “When we heal the soil, the soil heals our crops, our bodies, and our water table. Sustainable agriculture is ecological medicine.”
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
            <Link to="/programs/environment/plastic-free-communities" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-800 hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95">
              <ArrowLeft className="w-4 h-4" /> Prev: Plastic-Free Communities
            </Link>
            <Link to="/programs/environment/climate-change-awareness" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95">
              Next: Climate Change Awareness <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
