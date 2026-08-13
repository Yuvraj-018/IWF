import { useState, useEffect, useCallback } from "react";
import {
  Trees,
  Recycle,
  Sprout,
  Sun,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Globe2,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import environmentImg from "@/assets/thematic-environment.jpg";
import sectorEnvironment1 from "@/assets/sector_environment_1.png";
import { ChevronLeft, ChevronRight as ChevronRight2 } from "lucide-react";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function EnvironmentPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    { image: sectorEnvironment1, caption: "Tree plantation drives" },
    { image: environmentImg, caption: "Green environment initiative" },
  ];
  const goTo = useCallback((i: number) => setSlideIndex((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);
  const prev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);
  useEffect(() => { const t = setInterval(next, 4500); return () => clearInterval(t); }, [next]);

  const initiatives = [
    {
      title: "1. Tree Plantation & Green Village Programme",
      desc: "Community plantation drives across villages, schools, roadsides, and public spaces. Distribution of fruit-bearing, medicinal, and shade trees to expand rural green cover.",
      icon: Trees,
      href: "/programs/environment/tree-plantation-green-village",
    },
    {
      title: "2. Plastic-Free Rural Communities Campaign",
      desc: "Village campaigns against single-use plastics, distribution of eco-friendly cloth bags, plastic collection drives, and community recycling awareness.",
      icon: Recycle,
      href: "/programs/environment/plastic-free-communities",
    },
    {
      title: "3. Sustainable Agriculture & Organic Farming",
      desc: "Promoting eco-friendly farming practices, soil health improvement through organic composting, reducing chemical pesticides, and water-efficient agriculture.",
      icon: Sprout,
      href: "/programs/environment/sustainable-agriculture",
    },
    {
      title: "4. Climate Change & Environmental Awareness",
      desc: "Educational climate awareness in schools, environmental rallies, observances of World Environment Day, and sustainable lifestyle practices.",
      icon: Sun,
      href: "/programs/environment/climate-change-awareness",
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
              <Leaf className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">What We Do • Environment</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">Environment &amp; Sustainability</h1>
            <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">Protecting nature, preserving natural resources, and empowering communities—because a greener environment creates a healthier and more sustainable future for all.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={() => setActiveModal("volunteer")} className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-5 py-3 rounded-md shadow transition-colors">
                Plant a Tree With Us <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setActiveModal("partner")} className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-md transition-colors">
                CSR Sustainability Partnerships
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

        {/* Overview */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200">
                <div className="max-w-3xl">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                    Vision & Rationale
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b] mb-4">
                    Protecting Rural Natural Ecosystems
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    Rural areas face pressing environmental challenges such as deforestation, water scarcity, plastic pollution, soil degradation, and extreme weather impacts. Economically weaker agricultural families depend heavily on natural resources for survival. IWF promotes community-based environmental protection to build clean, green, climate-resilient villages.
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-center">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-2xl font-extrabold text-brand-green block">15,000+</span>
                    <span className="text-xs text-slate-600 font-semibold">Trees Planted</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-2xl font-extrabold text-brand-orange block">50+</span>
                    <span className="text-xs text-slate-600 font-semibold">Plastic-Free Villages</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-2xl font-extrabold text-[#0b1f3b] block">30+</span>
                    <span className="text-xs text-slate-600 font-semibold">Organic Farming Drives</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-2xl font-extrabold text-emerald-700 block">10,000+</span>
                    <span className="text-xs text-slate-600 font-semibold">Students Reached</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 4 Initiatives */}
        <section className="py-12 px-4 bg-slate-100/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Environmental Action
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                Key Environmental Initiatives
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {initiatives.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={idx}>
                    <a
                      href={item.href}
                      className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 h-full flex flex-col justify-between hover:shadow-md hover:border-brand-green/40 transition-all group"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1f3b] group-hover:text-brand-green transition-colors">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-bold text-brand-green">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Active Community Drive</span>
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

        {/* Action CTA */}
        <section className="py-14 px-4 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold">
              Join Our Mission for a Greener Tomorrow
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Volunteer for tree plantation drives or sponsor eco-friendly village initiatives.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveModal("volunteer")}
                className="bg-brand-green hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-md shadow transition"
              >
                Volunteer With Us
              </button>
              <a
                href="/donate"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-md shadow transition"
              >
                Support Environmental Causes
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
