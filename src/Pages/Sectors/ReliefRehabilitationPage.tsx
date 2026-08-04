import { useState } from "react";
import {
  Heart,
  Shield,
  Utensils,
  Home,
  Users,
  Flame,
  Snowflake,
  CheckCircle2,
  ArrowRight,
  HandHeart,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function ReliefRehabilitationPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const initiatives = [
    {
      num: "01",
      title: "Emergency Relief & Disaster Response",
      desc: "Distribution of food packets, ration kits, safe drinking water, temporary shelter materials, and emergency healthcare during natural calamities.",
      icon: Shield,
    },
    {
      num: "02",
      title: "Food & Nutrition Support",
      desc: "Community kitchens and dry ration distribution for economically weaker households, nutrition support for children, pregnant women, and elderly persons.",
      icon: Utensils,
    },
    {
      num: "03",
      title: "Rural Housing, Clothing & Necessities",
      desc: "Temporary shelter support, blankets, warm clothing, footwear, and essential household kits for families affected by fires, floods, or extreme weather.",
      icon: Home,
    },
    {
      num: "04",
      title: "Support for Widows, Orphans & Vulnerable Families",
      desc: "Humanitarian care, basic livelihood needs, child welfare support, and assistance for elderly and persons with disabilities in rural areas.",
      icon: Users,
    },
    {
      num: "05",
      title: "Marriage Assistance Support Programme",
      desc: "Dignified assistance with essential household marriage kits for underprivileged families to ease severe financial pressures.",
      icon: Heart,
    },
    {
      num: "06",
      title: "Seasonal Relief Support",
      desc: "Targeted winter blanket distribution drives, flood rescue support, drinking water stalls during heatwaves, and seasonal emergency outreach.",
      icon: Snowflake,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#c2410c] text-white py-16 md:py-20 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-md border border-brand-orange/30">
              <HandHeart className="w-4 h-4" />
              <span>What We Do • Humanitarian Care</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              RELIEF & REHABILITATION
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Extending compassion, relief, and hope to vulnerable communities—because every life deserves dignity, care, and immediate assistance during times of crisis.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveModal("volunteer")}
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-md shadow-md transition-all flex items-center gap-2"
              >
                <span>Volunteer for Relief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/donate"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-md border border-white/20 transition-all"
              >
                Donate for Relief Kits
              </a>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200">
                <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                  Humanitarian Overview
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b] mb-4">
                  Standing With Families in Hardship & Disaster
                </h2>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  Relief and rehabilitation play a vital role in supporting vulnerable individuals affected by floods, harsh winters, fire incidents, poverty, and sudden emergencies. In rural Bihar and across India, economically weaker households often lack reserves to withstand natural or economic shocks.
                </p>
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="font-bold text-brand-green text-sm block mb-1">Rapid Response</span>
                    <span className="text-xs text-slate-600">Immediate deployment of food, water, and first aid supplies.</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="font-bold text-brand-orange text-sm block mb-1">Dignified Relief</span>
                    <span className="text-xs text-slate-600">Respectful distribution of shelter kits, clothes, and essential marriage support.</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="font-bold text-[#0b1f3b] text-sm block mb-1">Long-term Recovery</span>
                    <span className="text-xs text-slate-600">Rehabilitation, child welfare, and community support networks.</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 6 Key Initiatives */}
        <section className="py-12 px-4 bg-slate-100/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Program Components
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                Key Relief & Rehabilitation Initiatives
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
                          <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-extrabold text-slate-400">{item.num}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1f3b]">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Field Implemented</span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom Action */}
        <section className="py-14 px-4 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold">
              Support Emergency Relief Drives Today
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Every blanket, ration kit, and relief package brings hope and dignity to a family facing crisis.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <a
                href="/donate"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-8 py-3.5 rounded-md shadow-md transition"
              >
                Donate for Emergency Relief
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
