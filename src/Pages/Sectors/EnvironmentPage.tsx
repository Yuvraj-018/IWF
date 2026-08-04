import { useState } from "react";
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

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function EnvironmentPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const initiatives = [
    {
      title: "1. Tree Plantation & Green Village Programme",
      desc: "Community plantation drives across villages, schools, roadsides, and public spaces. Distribution of fruit-bearing, medicinal, and shade trees to expand rural green cover.",
      icon: Trees,
    },
    {
      title: "2. Plastic-Free Rural Communities Campaign",
      desc: "Village campaigns against single-use plastics, distribution of eco-friendly cloth bags, plastic collection drives, and community recycling awareness.",
      icon: Recycle,
    },
    {
      title: "3. Sustainable Agriculture & Organic Farming",
      desc: "Promoting eco-friendly farming practices, soil health improvement through organic composting, reducing chemical pesticides, and water-efficient agriculture.",
      icon: Sprout,
    },
    {
      title: "4. Climate Change & Environmental Awareness",
      desc: "Educational climate awareness in schools, environmental rallies, observances of World Environment Day, and sustainable lifestyle practices.",
      icon: Sun,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white py-16 md:py-20 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-brand-green/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-brand-green/40">
                <Leaf className="w-4 h-4" />
                <span>What We Do • Environment & Sustainability</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                ENVIRONMENT & SUSTAINABILITY
              </h1>
              <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
                Protecting nature, preserving natural resources, and empowering communities—because a greener environment creates a healthier and more sustainable future for all.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveModal("volunteer")}
                  className="bg-brand-green hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-md shadow-md transition-all flex items-center gap-2"
                >
                  <span>Plant a Tree With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModal("partner")}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-md border border-white/20 transition-all"
                >
                  CSR Sustainability Partnerships
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <img src={environmentImg} alt="Tree plantation drive" className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3b]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl text-slate-900 border border-slate-100">
                  <div className="flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-wider mb-1">
                    <Globe2 className="w-4 h-4" />
                    <span>Green Village Initiative</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    Over 15,000+ trees planted and sustainable waste management drives established across rural villages.
                  </p>
                </div>
              </div>
            </div>
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
                    <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 h-full flex flex-col justify-between hover:shadow-md transition-all">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1f3b]">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Active Community Drive</span>
                      </div>
                    </div>
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
