import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Utensils, Apple, Users, Heart, Package, ShoppingBag, CheckCircle2, ShieldCheck, Soup } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_relief_1.png";

export default function FoodNutrition() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const FEATURE_ROWS = [
    {
      icon: Soup,
      num: "01",
      title: "Community Kitchen & Free Daily Meals (Langar)",
      desc: "Operating daily community feeding points serving hot, hygienic, nutritious meals to homeless individuals, destitute laborers, and hospital attendants.",
      highlights: ["Hot cooked wholesome meals daily", "Strict hygiene & quality protocols", "Dignified dining spaces for all"],
    },
    {
      icon: Package,
      num: "02",
      title: "Monthly Dry Ration Kit Distribution",
      desc: "Delivering balanced monthly dry ration kits to verified below-poverty-line (BPL) families, disabled breadwinners, and elderly persons living alone.",
      highlights: ["Includes rice, wheat flour, lentils, oil, spices", "Guaranteed 30-day family sustenance", "Direct door-step delivery for disabled"],
    },
    {
      icon: Apple,
      num: "03",
      title: "Child & Maternal Nutritional Support",
      desc: "Providing high-protein supplements, fortified milk, iron-folic tonics, and fresh fruit hampers to combat acute malnutrition in rural mothers and children under 5.",
      highlights: ["Screening for severe acute malnutrition (SAM)", "Nutrient-dense supplementary feeding", "Maternal breastfeeding counselling"],
    },
  ];

  const STATS = [
    { value: "50,000+", label: "Free Meals Served" },
    { value: "8,750+", label: "Ration Kits Distributed" },
    { value: "100%", label: "Verified Needy Beneficiaries" },
    { value: "0", label: "Hunger Tolerance Policy" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <SubpageHeroCarousel
          tag="Initiative • Food Security"
          title="Food & Nutrition Support"
          subtitle="Operating free community kitchens, monthly ration distribution drives, and specialized maternal-child nutrition support to eradicate food insecurity in vulnerable rural areas."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Relief & Rehabilitation", href: "/programs/relief-and-rehabilitation" },
            { label: "Food & Nutrition" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/relief-and-rehabilitation"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Relief Programmes
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

        {/* Horizontal Feature Rows */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Our Interventions</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">3 Pillars of Nutrition Security</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Targeted food distribution reaching the most destitute with dignity, nutrition, and zero bias.</p>
            </div>

            <div className="space-y-6">
              {FEATURE_ROWS.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-8 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-brand-orange tracking-widest uppercase">Programme {row.num}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">{row.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{row.desc}</p>
                      </div>
                      <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Highlights</p>
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
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center mx-auto border border-orange-200/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-lg md:text-xl font-semibold leading-relaxed italic text-slate-800">
              "No human being should ever go to sleep on an empty stomach. Feeding the hungry with dignity is our highest moral imperative."
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-medium text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/relief-and-rehabilitation/disaster-response" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Disaster Response
            </Link>
            <Link to="/programs/relief-and-rehabilitation/housing-necessities" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Housing & Necessities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
