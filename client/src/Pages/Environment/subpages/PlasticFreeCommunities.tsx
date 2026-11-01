import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Trash2, Recycle, ShoppingBag, Users, CheckCircle2, ShieldCheck, Sparkles, Leaf } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/thematic-environment.jpg";

export default function PlasticFreeCommunities() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const FEATURE_ROWS = [
    {
      icon: Trash2,
      num: "01",
      title: "Village Cleanup & Plastic Segregation Drives",
      desc: "Organizing weekly community shramdaan cleanups targeting choked village drains, pond shorelines, and roadside dumping spots, segregating single-use plastics for recycling.",
      highlights: ["Community drain clearing", "Segregated waste collection bins", "Zero open plastic burning pledge"],
    },
    {
      icon: ShoppingBag,
      num: "02",
      title: "Cloth & Jute Bag Distribution in Rural Haats",
      desc: "Replacing non-biodegradable polythene carry bags with durable cloth and jute tote bags stitched by Islah women SHGs, distributing them freely across weekly vegetable markets.",
      highlights: ["SHG-stitched eco cotton bags", "Vendor polythene ban agreements", "Consumer behavioral change campaigns"],
    },
    {
      icon: Recycle,
      num: "03",
      title: "School Waste Audits & Eco-Club Competitions",
      desc: "Establishing eco-clubs in rural schools where students conduct plastic audits, create craft from waste materials, and earn green badges for maintaining zero-plastic campuses.",
      highlights: ["Student green ambassadors", "Upcycling craft competitions", "Single-use plastic free campus rules"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <SubpageHeroCarousel
          tag="Initiative • Clean Earth Campaign"
          title="Plastic-Free Rural Communities"
          subtitle="Eliminating single-use plastics from rural villages through community cleanups, jute bag alternatives, school eco-clubs, and village plastic bans."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Environment", href: "/programs/environment" },
            { label: "Plastic-Free Communities" },
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

        {/* Horizontal Feature Rows */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Cleanliness & Waste Action</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">3 Pillars of Zero Plastic</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Stopping plastic pollution at source before it enters water bodies and agricultural soil.</p>
            </div>

            <div className="space-y-6">
              {FEATURE_ROWS.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-8 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase">Pillar {row.num}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900">{row.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{row.desc}</p>
                      </div>
                      <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Interventions</p>
                        {row.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
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
            <Leaf className="w-8 h-8 text-brand-orange mx-auto" />
            <p className="text-lg md:text-xl font-semibold leading-relaxed italic text-slate-800 text-balance">
              “Plastic remains for centuries, but our decision to stop using it takes only a moment. We are building a plastic-free legacy for our children.”
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
            <Link to="/programs/environment/tree-plantation-green-village" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-800 hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95">
              <ArrowLeft className="w-4 h-4" /> Prev: Tree Plantation
            </Link>
            <Link to="/programs/environment/sustainable-agriculture" className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover px-5 py-2.5 rounded-lg transition-all shadow-xs hover:scale-[1.02] active:scale-95">
              Next: Sustainable Agriculture <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
