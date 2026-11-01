import { useState } from "react";
import {
  Heart,
  Users,
  Building2,
  Target,
  GraduationCap,
  UserCheck,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Shield,
  Sparkles,
  MapPin,
  TrendingUp,
  Check,
  IndianRupee,
  HandHeart,
  Globe2,
  Quote,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import { StandardPageHero } from "@/components/layout/StandardPageHero";

export default function GetInvolvedPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const scrollToWays = () => {
    document.getElementById("ways-to-get-involved")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Standardized Hero Section */}
        <StandardPageHero
          badge="GET INVOLVED"
          title="Get Involved"
          description="At ISLAH, we believe that meaningful social transformation is possible when individuals, organisations, and communities come together with a shared purpose. Whether you choose to volunteer, donate, partner with us, mentor aspiring youth, or become a member, your involvement makes a lasting difference."
          breadcrumb={[{ label: "Get Involved" }]}
        >
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={scrollToWays}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              Choose How to Join <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/volunteer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition text-xs sm:text-sm uppercase tracking-wider"
            >
              Volunteer Page
            </a>
          </div>
        </StandardPageHero>

        {/* ─── Main Two-Column Layout (Why Get Involved vs Ways to Get Involved) ── */}
        <section id="ways-to-get-involved" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-start">

              {/* ── Left Column: Why Get Involved? ── */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                      Purpose & Vision
                    </span>
                    <h2 className="text-2xl font-extrabold text-brand-green-dark mt-1">
                      Why Get Involved?
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      By joining ISLAH, you become part of a growing movement dedicated to:
                    </p>
                  </div>

                  <ul className="space-y-2.5">
                    {[
                      "Improving access to quality education",
                      "Strengthening rural healthcare",
                      "Empowering women and girls",
                      "Promoting sustainable livelihoods",
                      "Supporting farmers and rural development",
                      "Protecting the environment",
                      "Providing humanitarian relief and rehabilitation",
                      "Building self-reliant and model villages",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-3">
                    <Heart className="w-4 h-4 text-brand-green shrink-0 mt-0.5 fill-brand-green/20" />
                    <p className="text-xs text-brand-green-dark font-medium leading-relaxed italic">
                      "Every action, no matter how small, contributes to building stronger and more resilient communities."
                    </p>
                  </div>
                </div>

                {/* 4 Process Flow Badges */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Involvement Flow
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { num: "01", text: "Choose Your Way to Get Involved" },
                      { num: "02", text: "Make an Impact in Communities" },
                      { num: "03", text: "Create a Better and Brighter Future" },
                      { num: "04", text: "Transform Lives Together" },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="w-7 h-7 rounded-lg bg-brand-green text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                          {step.num}
                        </span>
                        <span className="text-xs font-bold text-slate-800">{step.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right Column: Ways to Get Involved (6 Cards Grid) ── */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                    Action Pathways
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-green-dark mt-1">
                    Ways to Get Involved
                  </h2>
                  <p className="text-sm text-black leading-relaxed font-normal mt-1">
                    Explore different ways to connect your time, expertise, or resources with our grassroots mission.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* 1. Volunteer with Us */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-green hover:shadow-md transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-brand-green flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors">
                        Volunteer with Us
                      </h3>
                      <p className="text-sm text-black leading-relaxed font-normal mt-2">
                        Share your time, skills, and passion by participating in community programs, awareness campaigns, educational initiatives, healthcare camps, environmental activities, and rural development projects.
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-2 mt-4 text-xs font-bold">
                      <a href="/volunteer" className="text-slate-700 hover:text-brand-green flex items-center gap-1 transition">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setActiveModal("volunteer")}
                        className="bg-brand-green hover:bg-brand-green-dark text-white px-3 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                      >
                        Online Form &rarr;
                      </button>
                    </div>
                  </div>

                  {/* 2. Partner with Us */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-orange hover:shadow-md transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                        Partner with Us
                      </h3>
                      <p className="text-sm text-black leading-relaxed font-normal mt-2">
                        Collaborate with ISLAH as a corporate, NGO, educational institution, government agency, or community organisation to implement impactful and sustainable development initiatives.
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-2 mt-4 text-xs font-bold">
                      <a href="/partner" className="text-slate-700 hover:text-brand-orange flex items-center gap-1 transition">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setActiveModal("partner")}
                        className="bg-brand-orange hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                      >
                        Online Form &rarr;
                      </button>
                    </div>
                  </div>

                  {/* 3. Sponsor a Programme */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-purple-600 hover:shadow-md transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                        <Target className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                        Sponsor a Programme
                      </h3>
                      <p className="text-sm text-black leading-relaxed font-normal mt-2">
                        Sponsor a specific program or project that aligns with your personal, corporate, or CSR objectives and create measurable social impact.
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-2 mt-4 text-xs font-bold">
                      <a href="/sponsor" className="text-slate-700 hover:text-purple-600 flex items-center gap-1 transition">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setActiveModal("sponsor")}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                      >
                        Online Form &rarr;
                      </button>
                    </div>
                  </div>

                  {/* 4. Become a Mentor */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-sky-600 hover:shadow-md transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        Become a Mentor
                      </h3>
                      <p className="text-sm text-black leading-relaxed font-normal mt-2">
                        Guide and inspire students, youth, women entrepreneurs, and community members by sharing your knowledge, professional experience, and leadership skills.
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-2 mt-4 text-xs font-bold">
                      <a href="/mentor" className="text-slate-700 hover:text-sky-600 flex items-center gap-1 transition">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setActiveModal("mentor")}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                      >
                        Online Form &rarr;
                      </button>
                    </div>
                  </div>

                  {/* 5. Become a Member */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-600 hover:shadow-md transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Become a Member
                      </h3>
                      <p className="text-sm text-black leading-relaxed font-normal mt-2">
                        Join our network of members committed to supporting inclusive and sustainable rural development through active participation and advocacy.
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-2 mt-4 text-xs font-bold">
                      <a href="/membership" className="text-slate-700 hover:text-emerald-700 flex items-center gap-1 transition">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="/membership#apply"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg shadow-2xs transition"
                      >
                        Join Now &rarr;
                      </a>
                    </div>
                  </div>

                  {/* 6. Donate Us */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-rose-600 hover:shadow-md transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        Donate Us
                      </h3>
                      <p className="text-sm text-black leading-relaxed font-normal mt-2">
                        Support our mission through one-time or recurring donations. Your contribution helps fund education, healthcare, women empowerment, livelihood, environmental, and humanitarian programs.
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-2 mt-4 text-xs font-bold">
                      <a href="/donate" className="text-slate-700 hover:text-rose-600 flex items-center gap-1 transition">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="/donate"
                        className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg shadow-2xs transition"
                      >
                        Online Form &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Commitment & Join Our Mission Section (Page 1 Bottom) ───────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Card: Our Commitment */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                    Our Values
                  </span>
                  <h3 className="text-2xl font-extrabold text-brand-green-dark mt-1 mb-2">
                    Our Commitment
                  </h3>
                  <p className="text-xs text-slate-500 mb-5">
                    At ISLAH, we are committed to:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Transparency and accountability",
                      "Ethical and responsible governance",
                      "Community participation",
                      "Sustainable development",
                      "Equal opportunities and inclusion",
                      "Measurable social impact",
                    ].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-6 pt-5 border-t border-slate-200 leading-relaxed">
                  Every contribution is valued and utilised responsibly to maximise positive outcomes for the communities we serve.
                </p>
              </div>

              {/* Right Card: Join Our Mission + Employee Subcard */}
              <div className="bg-gradient-to-br from-[#071527] to-[#0c2340] text-white rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-lg">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                    Join Our Mission
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-2">
                    Catalyst for Positive Change
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    Real change begins when compassionate people come together with a common purpose. Your involvement can help transform lives, strengthen communities, and create a brighter future for generations to come.
                  </p>

                  {/* Be an Employee Subcard */}
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Be an Employee</h4>
                        <p className="text-[11px] text-slate-300">
                          Build a purpose-driven career with communities.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href="/careers"
                        className="text-xs font-bold text-white/90 hover:text-white underline underline-offset-2 transition"
                      >
                        Learn More
                      </a>
                      <button
                        onClick={() => setActiveModal("employee")}
                        className="bg-brand-orange hover:bg-orange-600 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer shrink-0"
                      >
                        Online Form &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4 Mini Counters */}
                <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-base sm:text-lg font-black text-brand-orange">25,000+</div>
                    <div className="text-[9px] text-white/75 font-semibold uppercase">Lives</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-brand-orange">120+</div>
                    <div className="text-[9px] text-white/75 font-semibold uppercase">Villages</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-brand-orange">18,500+</div>
                    <div className="text-[9px] text-white/75 font-semibold uppercase">Students</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-brand-orange">5,800+</div>
                    <div className="text-[9px] text-white/75 font-semibold uppercase">Volunteers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Quote Banner (Page 1 Bottom) ──────────────────────────────── */}
        <section className="bg-slate-50 border-t border-slate-200 text-slate-800 py-12">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
            <Quote className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed text-slate-800 font-light text-balance">
              “Together, we can empower people, strengthen communities, and build a better tomorrow.”
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToWays}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                Get Involved Today <ArrowRight className="w-4 h-4" />
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
