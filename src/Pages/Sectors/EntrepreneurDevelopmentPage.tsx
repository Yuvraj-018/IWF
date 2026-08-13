import { useState, useEffect, useCallback } from "react";
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
import sectorEntrepreneur1 from "@/assets/sector_entrepreneur_1.png";
import { ChevronLeft, ChevronRight as ChevronRight2 } from "lucide-react";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function EntrepreneurDevelopmentPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    { image: sectorEntrepreneur1, caption: "Entrepreneurship workshops" },
    { image: entrepreneurImg, caption: "Rural enterprise development" },
  ];
  const goTo = useCallback((i: number) => setSlideIndex((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);
  const prev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);
  useEffect(() => { const t = setInterval(next, 4500); return () => clearInterval(t); }, [next]);

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
              <Lightbulb className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">What We Do • Livelihood &amp; Enterprise</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">Entrepreneur Development</h1>
            <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">Empowering rural communities through small-scale entrepreneurship, microfinance, and sustainable livelihoods—because self-reliance is the foundation of lasting social development.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={() => setActiveModal("partner")} className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-5 py-3 rounded-md shadow transition-colors">
                Partner With Us <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setActiveModal("sponsor")} className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-md transition-colors">
                Sponsor an Enterprise
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
