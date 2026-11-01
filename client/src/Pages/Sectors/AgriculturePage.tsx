import { useState, useEffect, useCallback } from "react";
import {
  Sprout,
  Droplets,
  Sun,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Wheat,
  Heart,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import agricultureImg from "@/assets/thematic-agriculture.jpg";
import sectorAgriculture1 from "@/assets/sector_agriculture_1.png";
import { ChevronLeft, ChevronRight as ChevronRight2 } from "lucide-react";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function AgriculturePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    { image: sectorAgriculture1, caption: "Farmer training programs" },
    { image: agricultureImg, caption: "Sustainable agriculture" },
  ];
  const goTo = useCallback((i: number) => setSlideIndex((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);
  const prev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);
  useEffect(() => { const t = setInterval(next, 4500); return () => clearInterval(t); }, [next]);

  const initiatives = [
    {
      num: "01",
      title: "Sustainable Agriculture Development",
      desc: "Promoting modern, eco-friendly farming techniques that enhance soil fertility, crop yield, and long-term agricultural sustainability.",
      icon: Sprout,
      href: "/programs/agriculture/sustainable-agriculture",
    },
    {
      num: "02",
      title: "Farmer Awareness & Training Initiative",
      desc: "Field training workshops, crop management advice, soil health testing, demonstration plots, and pest management awareness camps.",
      icon: BookOpen,
      href: "/programs/agriculture/farmer-training",
    },
    {
      num: "03",
      title: "Organic Farming & Natural Agriculture",
      desc: "Training farmers in vermicomposting, organic fertilizer preparation, chemical-free cultivation, and healthy food production.",
      icon: Wheat,
      href: "/programs/agriculture/organic-farming",
    },
    {
      num: "04",
      title: "Water Conservation & Irrigation Support",
      desc: "Awareness on rainwater harvesting, farm ponds, groundwater recharge, and water-efficient irrigation methods.",
      icon: Droplets,
      href: "/programs/agriculture/water-conservation",
    },
    {
      num: "05",
      title: "Farmer Livelihood & Income Enhancement",
      desc: "Crop diversification, vegetable cultivation, nutrition farming, mushroom cultivation, and supplementary livestock support.",
      icon: TrendingUp,
      href: "/programs/agriculture/farmer-livelihood",
    },
    {
      num: "06",
      title: "Agri-Entrepreneurship & Business Support",
      desc: "Assisting rural youth and marginal farmers in value-added processing, local marketing, and agri-business enterprises.",
      icon: Sun,
      href: "/programs/agriculture/farmer-livelihood",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Section with Subpage Carousel with In-Hero Action Buttons */}
        <SubpageHeroCarousel
          tag="WHAT WE DO • AGRICULTURE"
          title="Agriculture & Rural Livelihoods"
          subtitle="Empowering farmers, strengthening livelihoods, and promoting sustainable agriculture—because prosperous rural communities are the foundation of a stronger nation."
          breadcrumbs={[
            { label: "Our Programs", href: "/programs" },
            { label: "Agriculture & Rural Livelihoods" },
          ]}
          images={slides.map((s) => s.image)}
        >
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveModal("partner")}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              <span>Partner With Farmer Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("sponsor")}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer backdrop-blur-xs"
            >
              <Heart className="w-4 h-4 text-brand-orange" />
              <span>Sponsor Farmer Training</span>
            </button>
          </div>
        </SubpageHeroCarousel>

        {/* Vision & Rationale */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200">
                <div className="max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                    Vision & Rationale
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Transforming Rural Agriculture & Livelihoods
                  </h2>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                    Agriculture is the backbone of rural India. However, small and marginal farmers continue to face challenges such as low crop productivity, water scarcity, high input costs, climate risks, and lack of market linkages. Islah equips farming communities with practical knowledge, organic methods, and sustainable livelihood support.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="font-bold text-brand-green text-sm block mb-1">Farmer Empowerment</span>
                    <span className="text-xs text-slate-600">Demonstration training, soil health care, and modern techniques.</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="font-bold text-brand-orange text-sm block mb-1">Organic Agriculture</span>
                    <span className="text-xs text-slate-600">Composting, natural fertilizers, and chemical-free food production.</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="font-bold text-emerald-800 text-sm block mb-1">Water Security</span>
                    <span className="text-xs text-slate-600">Rainwater harvesting, farm ponds, and water-efficient irrigation.</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 6 Key Initiatives Grid */}
        <section className="py-12 px-4 bg-slate-100/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                Program Structure
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Key Agriculture Support Initiatives
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initiatives.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={idx}>
                    <a
                      href={item.href}
                      className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 h-full flex flex-col justify-between hover:shadow-md hover:border-brand-green/40 transition-all group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-400">{item.num}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-green transition-colors">{item.title}</h3>
                        <p className="text-sm text-slate-600 font-normal leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-bold text-brand-green">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Active Field Initiative</span>
                        </div>
                        <div className="flex items-center gap-1 text-brand-orange group-hover:translate-x-1 transition-transform">
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <section className="py-14 px-4 bg-gradient-to-r from-[#071527] to-[#0c2340] text-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold">
              Supporting Farmers for a Self-Reliant Future
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Your support enables us to expand farmer workshops, organic farming kits, and irrigation guidance to more rural villages.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveModal("partner")}
                className="bg-brand-green hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Partner With Us
              </button>
              <a
                href="/donate"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                Donate for Farmer Programs
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
