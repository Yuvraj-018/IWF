import { useState } from "react";
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

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function AgriculturePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

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
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white py-16 md:py-20 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-emerald-500/30">
                <Wheat className="w-4 h-4" />
                <span>What We Do • Agriculture & Farmer Support</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                AGRICULTURE & RURAL LIVELIHOOD
              </h1>
              <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
                Empowering farmers, strengthening livelihoods, and promoting sustainable agriculture—because prosperous rural communities are the foundation of a stronger and healthier nation.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveModal("partner")}
                  className="bg-brand-green hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-md shadow-md transition-all flex items-center gap-2"
                >
                  <span>Partner With Farmer Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModal("sponsor")}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-md border border-white/20 transition-all"
                >
                  Sponsor Farmer Training
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <img src={agricultureImg} alt="Farmer in green field" className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3b]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl text-slate-900 border border-slate-100">
                  <div className="flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sustainable Agriculture Program</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    Over 2,500+ small and marginal farmers trained in organic farming and water-efficient agriculture.
                  </p>
                </div>
              </div>
            </div>
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
