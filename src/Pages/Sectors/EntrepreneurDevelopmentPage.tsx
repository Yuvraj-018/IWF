import { useState } from "react";
import {
  Lightbulb,
  Building2,
  TrendingUp,
  Coins,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import entrepreneurImg from "@/assets/thematic-entrepreneur.jpg";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function EntrepreneurDevelopmentPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const workAreas = [
    {
      title: "1. Rural Entrepreneurship Promotion",
      desc: "Support for small and community-based enterprises including tailoring units, local handicrafts, village retail shops, food processing, and rural service units.",
      icon: Building2,
    },
    {
      title: "2. Youth Entrepreneurship Development",
      desc: "Entrepreneurship awareness, career guidance, digital service enterprise support, motivation for innovation, and sustainable small business planning for unemployed youth.",
      icon: TrendingUp,
    },
    {
      title: "3. Financial Literacy & Business Awareness",
      desc: "Savings habits, household budgeting, basic business planning, digital banking awareness, and responsible financial management workshops.",
      icon: Coins,
    },
  ];

  const highlights = [
    "Interest-free microfinance support under Islah Microfinance at the grassroots level.",
    "Tailored mentoring and technical guidance for women and youth entrepreneurs.",
    "Market linkages and local business setup assistance in rural Darbhanga and nearby districts.",
    "Capacity building workshops on product pricing, packaging, and digital payments.",
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
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-brand-orange/30">
                <Lightbulb className="w-4 h-4" />
                <span>What We Do • Livelihood & Enterprise</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                ENTREPRENEUR DEVELOPMENT
              </h1>
              <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
                Empowering rural communities through small-scale entrepreneurship, microfinance, and sustainable livelihoods—because self-reliance is the foundation of lasting social development.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveModal("partner")}
                  className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-md shadow-md transition-all flex items-center gap-2"
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModal("sponsor")}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-md border border-white/20 transition-all"
                >
                  Sponsor an Enterprise
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <img src={entrepreneurImg} alt="Rural Entrepreneurship" className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3b]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl text-slate-900 border border-slate-100">
                  <div className="flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Islah Microfinance Initiative</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    Interest-free microfinance options for educationally and financially backward sections to achieve social equity.
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
                    Building Economic Resilience in Rural Communities
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    Entrepreneurship plays a vital role in creating sustainable livelihoods, generating employment, reducing poverty, and strengthening rural economies. Many youth and women possess the determination to grow but lack access to financial resources, market guidance, and technical support.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Key Areas of Work Grid */}
        <section className="py-12 px-4 bg-slate-100/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Core Interventions
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                Key Work Areas in Entrepreneurship
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {workAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <ScrollReveal key={idx}>
                    <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1f3b]">{area.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{area.desc}</p>
                      </div>
                      <div className="pt-6 border-t border-slate-100 mt-6">
                        <span className="text-xs font-extrabold text-brand-orange uppercase tracking-wider">Sustainable Impact</span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-14 px-4 bg-[#0b1f3b] text-white">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold">
              Empowering Rural Youth & Women Towards Self-Reliance
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Join hands with Islah Welfare Foundation to mentor, sponsor, or support aspiring local entrepreneurs across Bihar and India.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveModal("mentor")}
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-md shadow transition"
              >
                Become a Mentor
              </button>
              <a
                href="/donate"
                className="bg-brand-green hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-md shadow transition"
              >
                Donate for Microfinance
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
