import { useState } from "react";
import {
  Building2,
  Handshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Award,
  Users,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function PartnersDonorsPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const PARTNER_TYPES = [
    {
      title: "Corporate CSR Partnerships",
      desc: "Collaborate on high-impact CSR projects in education, healthcare, skill development, women empowerment, and sustainable agriculture.",
      icon: Building2,
    },
    {
      title: "Government Collaborations",
      desc: "Support government welfare schemes and rural development programs through community outreach and grassroots implementation.",
      icon: ShieldCheck,
    },
    {
      title: "Educational Institution Partnerships",
      desc: "Engage schools, colleges, and universities in community service, student internships, research, and volunteer drives.",
      icon: Award,
    },
    {
      title: "NGO & Civil Society Alliances",
      desc: "Work together on joint community projects, awareness drives, local research, and capacity-building workshops.",
      icon: Users,
    },
    {
      title: "Foundation & Grant Partners",
      desc: "Partner to support sustainable development goals through grants, program sponsorships, and technical assistance.",
      icon: Handshake,
    },
    {
      title: "Knowledge & Technical Partners",
      desc: "Share technical expertise, research, technology solutions, and professional guidance to strengthen program quality.",
      icon: Globe,
    },
  ];

  const PARTNER_LOGOS = [
    "TATA TRUSTS",
    "HCL FOUNDATION",
    "RELIANCE FOUNDATION",
    "ADANI FOUNDATION",
    "TECH MAHINDRA FOUNDATION",
    "WIPRO Cares",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white py-16 md:py-20 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-md border border-brand-orange/30">
              <Handshake className="w-4 h-4" />
              <span>Stronger Partnerships • Greater Impact</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              OUR PARTNERS & SUPPORTERS
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              We collaborate with corporate organizations, government agencies, educational institutions, NGOs, foundations, and community leaders to create sustainable social transformation.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => setActiveModal("partner")}
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-md shadow-md transition flex items-center gap-2 uppercase tracking-wider"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Partner Logos Carousel / Grid */}
        <section className="py-12 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Organizations Supporting Our Mission
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-2">
              {PARTNER_LOGOS.map((name, i) => (
                <div key={i} className="px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 font-extrabold text-slate-700 text-sm md:text-base tracking-wider hover:border-brand-green transition">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Categories */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Collaboration Pathways
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                Partnership Opportunities
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PARTNER_TYPES.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <ScrollReveal key={idx}>
                    <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm h-full flex flex-col justify-between hover:shadow-md transition">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1f3b]">{pt.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{pt.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Active Alliance Format</span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5-Step Process */}
        <section className="py-14 px-4 bg-slate-100/70">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Structured Onboarding
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                5-Step Partnership Process
              </h2>
            </div>

            <div className="grid md:grid-cols-5 gap-4 text-center">
              {[
                ["Step 1", "Connect", "Reach out to our partnership team."],
                ["Step 2", "Discuss", "Align on shared goals & impact areas."],
                ["Step 3", "Design", "Develop a customized project plan."],
                ["Step 4", "Implement", "Execute with complete transparency."],
                ["Step 5", "Measure", "Monitor progress & evaluate impact."],
              ].map(([step, title, desc]) => (
                <div key={step} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-extrabold text-brand-orange uppercase">{step}</span>
                  <h4 className="font-bold text-[#0b1f3b] text-base">{title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold">
              Let's Build a Better Tomorrow Together
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Whether you represent a corporate CSR foundation, educational institute, or NGO, we invite you to join our network of development partners.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => setActiveModal("partner")}
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-8 py-3.5 rounded-md shadow-md transition"
              >
                Submit Partnership Form
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
