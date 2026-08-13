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
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
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
    },
    {
      num: "02",
      title: "Farmer Awareness & Training Initiative",
      desc: "Field training workshops, crop management advice, soil health testing, demonstration plots, and pest management awareness camps.",
      icon: BookOpen,
    },
    {
      num: "03",
      title: "Organic Farming & Natural Agriculture",
      desc: "Training farmers in vermicomposting, organic fertilizer preparation, chemical-free cultivation, and healthy food production.",
      icon: Wheat,
    },
    {
      num: "04",
      title: "Water Conservation & Irrigation Support",
      desc: "Awareness on rainwater harvesting, farm ponds, groundwater recharge, and water-efficient irrigation methods.",
      icon: Droplets,
    },
    {
      num: "05",
      title: "Farmer Livelihood & Income Enhancement",
      desc: "Crop diversification, vegetable cultivation, nutrition farming, mushroom cultivation, and supplementary livestock support.",
      icon: TrendingUp,
    },
    {
      num: "06",
      title: "Agri-Entrepreneurship & Business Support",
      desc: "Assisting rural youth and marginal farmers in value-added processing, local marketing, and agri-business enterprises.",
      icon: Sun,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Slideshow */}
        <section className="relative min-h-[430px] flex items-center overflow-hidden">
          {slides.map((slide, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${slideIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
              <img src={slide.image} alt={slide.caption} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/20" />
            </div>
          ))}
          <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
              <Wheat className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">What We Do • Agriculture</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">Agriculture &amp; Rural Livelihood</h1>
            <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">Empowering farmers, strengthening livelihoods, and promoting sustainable agriculture—because prosperous rural communities are the foundation of a stronger nation.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={() => setActiveModal("partner")} className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-5 py-3 rounded-md shadow transition-colors">
                Partner With Farmer Programs <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setActiveModal("sponsor")} className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-md transition-colors">
                Sponsor Farmer Training
              </button>
            </div>
          </div>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center cursor-pointer"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center cursor-pointer"><ChevronRight2 className="w-5 h-5" /></button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
            <p className="text-white/70 text-xs font-medium">{slides[slideIndex]?.caption}</p>
            <div className="flex gap-2">{slides.map((_, idx) => (<button key={idx} onClick={() => goTo(idx)} className={`rounded-full transition-all duration-300 ${slideIndex === idx ? "w-6 h-2 bg-brand-orange" : "w-2 h-2 bg-white/40"}`} />))}</div>
          </div>
        </section>

        {/* Vision & Rationale */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200">
                <div className="max-w-3xl">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                    Vision & Rationale
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b] mb-4">
                    Transforming Rural Agriculture & Livelihoods
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    Agriculture is the backbone of rural India. However, small and marginal farmers continue to face challenges such as low crop productivity, water scarcity, high input costs, climate risks, and lack of market linkages. IWF equips farming communities with practical knowledge, organic methods, and sustainable livelihood support.
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
                    <span className="font-bold text-[#0b1f3b] text-sm block mb-1">Water Security</span>
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
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Program Structure
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                Key Agriculture Support Initiatives
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initiatives.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={idx}>
                    <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 h-full flex flex-col justify-between hover:shadow-md transition-all">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-extrabold text-slate-400">{item.num}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1f3b]">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Active Field Initiative</span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <section className="py-14 px-4 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold">
              Supporting Farmers for a Self-Reliant Future
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Your support enables us to expand farmer workshops, organic farming kits, and irrigation guidance to more rural villages.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveModal("partner")}
                className="bg-brand-green hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-md shadow transition"
              >
                Partner With Us
              </button>
              <a
                href="/donate"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-md shadow transition"
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
