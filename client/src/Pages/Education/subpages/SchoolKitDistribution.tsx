import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Package, BookOpen, Scissors, Sparkles, CheckCircle2, ShieldCheck, Heart, Smile } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/sector_education_2.png";

export default function SchoolKitDistribution() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const KIT_ITEMS = [
    {
      step: "01",
      icon: Package,
      title: "Ergonomic Waterproof Backpack",
      desc: "Heavy-duty, rainproof school bag designed with padded shoulder straps for daily rural commuting.",
    },
    {
      step: "02",
      icon: BookOpen,
      title: "Notebooks & Writing Stationery",
      desc: "Set of 6 high-quality ruled/unruled notebooks, drawing book, geometry box, pens, pencils, erasers, and ruler.",
    },
    {
      step: "03",
      icon: Scissors,
      title: "Stainless Steel Lunchbox & Water Bottle",
      desc: "BPA-free food-grade steel tiffin container and insulated 750ml water bottle promoting hygienic hydration.",
    },
    {
      step: "04",
      icon: Heart,
      title: "School Uniform & Footwear Voucher",
      desc: "Tailored pair of durable school uniforms, socks, and sturdy black school shoes for every enrolled child.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Standardized Hero */}
        <SubpageHeroCarousel
          tag="EDUCATION • SKLS"
          title="School Kit & Stationery Distribution"
          subtitle="Distributing complete annual school kits — backpacks, notebooks, geometry sets, uniforms, and shoes to thousands of underprivileged rural schoolchildren."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Education", href: "/programs/education" },
            { label: "School Kit Distribution" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveModal("sponsor")}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support a Child</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModal("partner")}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl backdrop-blur-xs transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider cursor-pointer"
            >
              <Package className="w-4 h-4 text-brand-orange" />
              <span>Donate for School Kits</span>
            </button>
          </div>
        </SubpageHeroCarousel>

        {/* Stepwise Kit Breakdown */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Inside the Islah School Kit</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">4 Essential Kit Components</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Eliminating the shame of missing school supplies and inspiring children to attend classes with pride.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {KIT_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-brand-green/30 group-hover:text-brand-green transition-colors">{item.step}</span>
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>100% Brand New Supplies</span>
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
            <Smile className="w-8 h-8 text-brand-orange mx-auto" />
            <p className="text-lg md:text-xl font-serif italic leading-relaxed text-slate-800 text-balance">
              "A brand new school bag and a box of fresh pencils can ignite a child's imagination and transform their willingness to learn."
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="h-px w-8 bg-brand-orange/40" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/40" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/education/scholarships" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs">
              <ArrowLeft className="w-4 h-4" /> Prev: Scholarships
            </Link>
            <Link to="/programs/education/rats" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs">
              Next: RATS Talent Search <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
