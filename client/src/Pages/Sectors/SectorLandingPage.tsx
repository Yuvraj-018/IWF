import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  Sparkles,
  Users,
  Heart,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import type { SectorContent } from "@/content/siteContent";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
        {eyebrow}
      </p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0b1f3b] tracking-tight">
          {title}
        </h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function SignatureSection({ content }: { content: SectorContent }) {
  if (content.slug === "education") {
    return (
      <section className="py-16 bg-[#f8fbf4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <div className="relative rounded-md overflow-hidden shadow-lg border border-green-100">
                  <img
                    src={content.heroImage}
                    alt="Rural education initiative"
                    className="w-full h-[430px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-2">
                      Flagship Education Initiative
                    </p>
                    <h2 className="text-2xl font-extrabold">Erawin Public School and rural learning support</h2>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6">
              <ScrollReveal>
                <div className="space-y-4">
                  {[
                    ["01", "Foundation", "Strengthen literacy, numeracy and school readiness."],
                    ["02", "Continuity", "Scholarships, school kits and coaching help students continue."],
                    ["03", "Aspiration", "Mentorship and career guidance connect learning to opportunity."],
                  ].map(([num, title, text]) => (
                    <div key={title} className="flex gap-5 bg-white rounded-md border border-green-100 p-5 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold shrink-0">
                        {num}
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-green-dark">{title}</h3>
                        <p className="text-sm text-black leading-relaxed font-normal mt-1">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (content.slug === "skills-development") {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  Skill Development Model
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-green-dark leading-tight mb-5">
                  Practical training for work, enterprise and self-reliance
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The skills page is framed like a livelihood engine: community mobilisation,
                  hands-on workshops, employability support and local income creation.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Digital literacy", "Vocational workshops", "Soft skills", "Entrepreneurship"].map((item) => (
                    <div key={item} className="bg-[#10251b] text-white rounded-md p-4">
                      <Briefcase className="w-5 h-5 text-brand-orange mb-3" />
                      <p className="text-sm font-bold">{item}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal delay={0.1}>
                <div className="relative rounded-md overflow-hidden shadow-lg border border-slate-100">
                  <img
                    src={content.heroImage}
                    alt="Skill development and livelihood training"
                    className="w-full h-[440px] object-cover"
                  />
                  <div className="absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="grid grid-cols-3 gap-3 text-white">
                      {["Train", "Practice", "Earn"].map((label) => (
                        <div key={label} className="bg-white/12 border border-white/15 rounded-md p-3 text-center backdrop-blur-sm">
                          <p className="text-base font-bold">{label}</p>
                          <p className="text-[10px] text-white/65 uppercase tracking-widest mt-1">Pathway</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#fff7f3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute -inset-3 bg-brand-orange/15 rounded-md" />
                <img
                  src={content.heroImage}
                  alt="Women empowerment and livelihood"
                  className="relative w-full h-[430px] object-cover rounded-md shadow-lg border border-orange-100"
                />
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-6">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Empowerment Ecosystem
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-green-dark leading-tight mb-5">
                Skills, income, rights awareness and dignity
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                The women empowerment page is intentionally more human and community-led,
                highlighting self-help, livelihood, financial confidence and leadership.
              </p>
              <div className="space-y-3">
                {["Livelihood training", "Self-help groups", "Financial literacy", "Rights and health awareness"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white rounded-md border border-orange-100 p-4 shadow-sm">
                    <div className="w-9 h-9 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <p className="font-semibold text-sm text-brand-green-dark">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectorIdentity({ content }: { content: SectorContent }) {
  if (content.slug === "education") {
    const ladder = [
      "Foundational learning",
      "Academic guidance",
      "Scholarships and school kits",
      "Model rural institutions",
    ];

    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="h-full bg-[#f7faf4] border border-green-100 rounded-md p-7">
                  <div className="w-12 h-12 rounded-md bg-brand-green text-white flex items-center justify-center mb-6">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                    Education Identity
                  </p>
                  <h2 className="text-3xl font-extrabold text-brand-green-dark leading-tight mb-4">
                    Building a rural learning ladder
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This page now presents education as a progression: basic learning,
                    confidence, academic continuity and long-term institutions.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal stagger={0.08}>
                <div className="grid sm:grid-cols-2 gap-4 h-full">
                  {ladder.map((step, index) => (
                    <div
                      key={step}
                      className="relative bg-white border border-slate-100 rounded-md p-6 shadow-sm overflow-hidden"
                    >
                      <div className="absolute right-4 top-4 text-5xl font-extrabold text-brand-green/10">
                        {index + 1}
                      </div>
                      <BookOpen className="w-6 h-6 text-brand-orange mb-5" />
                      <h3 className="font-bold text-brand-green-dark mb-2">{step}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        A focused layer in Islah's education pathway for rural children and youth.
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (content.slug === "skills-development") {
    const pipeline = [
      "Mobilise learners",
      "Train through workshops",
      "Build employability",
      "Enable local income",
    ];

    return (
      <section className="py-16 bg-[#10251b] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Skills Identity
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                From training rooms to livelihood pathways
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                The skills page uses a workshop-to-income flow, making it feel more practical,
                technical and employment-focused than the education or women empowerment pages.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger={0.08}>
            <div className="grid md:grid-cols-4 gap-4">
              {pipeline.map((step, index) => (
                <div
                  key={step}
                  className="bg-white/8 border border-white/10 rounded-md p-6 hover:bg-white/12 transition-colors"
                >
                  <div className="flex items-center justify-between mb-8">
                    <Briefcase className="w-6 h-6 text-brand-orange" />
                    <span className="text-xs font-bold text-white/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-bold text-white mb-2">{step}</h3>
                  <p className="text-xs text-white/65 leading-relaxed">
                    Practical action that moves participants closer to work, self-employment or enterprise.
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  const empowerment = [
    "Skills and livelihood",
    "Financial independence",
    "Rights and health awareness",
    "Leadership and dignity",
  ];

  return (
    <section className="py-16 bg-[#fff8f5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Women Empowerment Identity
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-green-dark leading-tight mb-4">
                Opportunity, dignity and leadership for women
              </h2>
              <p className="text-slate-600 leading-relaxed">
                This page now has a softer community-centred identity, focused on confidence,
                social participation and income-generation rather than institutional learning or technical training.
              </p>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-6">
            <ScrollReveal stagger={0.08}>
              <div className="grid sm:grid-cols-2 gap-4">
                {empowerment.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl p-6 border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all"
                  >
                    <Users className="w-6 h-6 text-brand-orange mb-5" />
                    <h3 className="font-bold text-brand-green-dark">
                      {item}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      A core pillar of Islah's women empowerment ecosystem.
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SectorLandingPage({ content }: { content: SectorContent }) {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const slides = content.heroSlides ?? [{ image: content.heroImage, caption: content.title }];

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        {/* Hero Section with Subpage Carousel with In-Hero Action Buttons */}
        <SubpageHeroCarousel
          tag={content.eyebrow}
          title={content.title}
          subtitle={content.subtitle}
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: content.title },
          ]}
          images={slides.map((s) => s.image)}
        >
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#initiatives"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              <span>Explore Initiatives</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setActiveModal("partner")}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer backdrop-blur-xs"
            >
              <Heart className="w-4 h-4 text-brand-orange" />
              <span>Partner With Us</span>
            </button>
          </div>
        </SubpageHeroCarousel>

        <SignatureSection content={content} />
        <SectorIdentity content={content} />

        <section className={content.slug === "skills-development" ? "py-16 bg-slate-50" : "py-16 bg-white"}>
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                eyebrow="The Need"
                title={content.challengeTitle}
                subtitle={content.challengeCopy}
              />
            </ScrollReveal>
            <ScrollReveal stagger={0.07}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {content.challenges.map((item, index) => (
                  <div
                    key={item}
                    className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-300 p-5 shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <span className="inline-flex w-8 h-8 rounded-full bg-brand-green/10 text-brand-green items-center justify-center text-xs font-bold mb-4">
                      {index + 1}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                eyebrow="Strategic Focus"
                title={`How Islah Advances ${content.title}`}
              />
            </ScrollReveal>
            <ScrollReveal stagger={0.06}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {content.strategicFocus.map((item, index) => (
                  <div
                    key={item}
                    className="bg-white rounded-md border border-slate-100 p-5 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-300 flex gap-4"
                  >
                    <div className="shrink-0 w-9 h-9 rounded-md bg-brand-green text-white flex items-center justify-center text-xs font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="initiatives" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                eyebrow="Programmes"
                title="Key Initiatives"
                subtitle="A practical portfolio of projects designed for rural and underserved communities."
              />
            </ScrollReveal>
            <ScrollReveal stagger={0.05}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.initiatives.map((item, index) => {
                  const INITIATIVE_HREFS: Record<string, string> = {
                    "Primary School (EPS)": "/programs/education/primary-school",
                    "Primary School — EPS": "/programs/education/primary-school",
                    "Erawin Public School (EPS)": "/programs/education/primary-school",
                    "School Kit & Learning Support (SKLS)": "/programs/education/school-kit-learning-support",
                    "School Kit Distribution": "/programs/education/school-kit-learning-support",
                    "Community Learning Centre (CLC)": "/programs/education/community-learning-centre",
                    "Community & Islamic Learning Centre (CILC)": "/programs/education/community-learning-centre",
                    "Academic Pathways & Talent Development (APTD)": "/programs/education/academic-pathways-talent-development",
                    "Coaching Centre (CBCE)": "/programs/education/academic-pathways-talent-development",
                    "Rural Academic Talent Search (RATS)": "/programs/education/academic-pathways-talent-development",
                    "Scholarships for Higher Education (SHE)": "/programs/education/scholarships",
                    "Scholarships for Higher Education": "/programs/education/scholarships",
                    "Career Guidance & Mentorship (CGM)": "/programs/education/career-guidance",
                    "Career Guidance & Mentorship (CTAG)": "/programs/education/career-guidance",
                    "Technical & Vocational Education and Training (TVET)": "/programs/education/technical-vocational-training",
                    "Technical Institute": "/programs/education/technical-vocational-training",
                    "Vocational Training Institute": "/programs/education/technical-vocational-training",
                    "Knowledge, Research & Publication (KRP)": "/programs/education/knowledge-research-publication",
                    "JISNS Journal": "/programs/education/knowledge-research-publication",
                    "Community Skill Centre (CSC)": "/programs/skills-development/community-skill-centre",
                    "Vocational Training Workshops (VTW)": "/programs/skills-development/vocational-training-workshops",
                    // Skills, Livelihoods & Entrepreneurship
                    "Skills & Employability Programme": "/programs/skills-development/skills-employability",
                    "Skills & Employability Programme (SEP)": "/programs/skills-development/skills-employability",
                    "Skills & Employability": "/programs/skills-development/skills-employability",
                    "Livelihood Development Initiative": "/programs/skills-development/livelihood-development",
                    "Livelihood Development Initiative (LDI)": "/programs/skills-development/livelihood-development",
                    "Livelihood Development": "/programs/skills-development/livelihood-development",
                    "Rural Entrepreneurship Initiative": "/programs/skills-development/rural-entrepreneurship",
                    "Rural Entrepreneurship Initiative (REI)": "/programs/skills-development/rural-entrepreneurship",
                    "Rural Entrepreneurship": "/programs/skills-development/rural-entrepreneurship",
                    "Micro-Enterprise & Self-Employment Support": "/programs/skills-development/micro-enterprise-support",
                    "Micro-Enterprise & Self-Employment Support (MSES)": "/programs/skills-development/micro-enterprise-support",
                    "Micro-Enterprise & Self-Employment": "/programs/skills-development/micro-enterprise-support",
                    // Social Justice & Legal Empowerment
                    "Legal Literacy & Rights Awareness Programme": "/programs/social-justice/legal-literacy-rights-awareness",
                    "Legal Literacy & Rights Awareness Programme (LLRA)": "/programs/social-justice/legal-literacy-rights-awareness",
                    "Legal Literacy & Rights Awareness": "/programs/social-justice/legal-literacy-rights-awareness",
                    "Social Justice Legal Action": "/programs/social-justice/social-justice-legal-action",
                    "Social Justice Legal Action (SJLA)": "/programs/social-justice/social-justice-legal-action",
                    "Public Interest & Strategic Litigation": "/programs/social-justice/public-interest-strategic-litigation",
                    "Public Interest & Strategic Litigation (PISL)": "/programs/social-justice/public-interest-strategic-litigation",
                    "Grievance & Accountability Initiative": "/programs/social-justice/grievance-accountability",
                    "Grievance & Accountability Initiative (GAI)": "/programs/social-justice/grievance-accountability",
                    "Grievance & Accountability": "/programs/social-justice/grievance-accountability",
                    // Women & Youth Empowerment
                    "Women Skill Development & Livelihood Programme": "/programs/women-empowerment/women-skill-livelihood",
                    "Women Skill Development & Livelihood": "/programs/women-empowerment/women-skill-livelihood",
                    "Women Skill & Livelihood": "/programs/women-empowerment/women-skill-livelihood",
                    "Self-Help Group Capacity Building": "/programs/women-empowerment/self-help-groups",
                    "Self-Help Group Capacity Building initiative": "/programs/women-empowerment/self-help-groups",
                    "Self-Help Groups (SHG)": "/programs/women-empowerment/self-help-groups",
                    "Women’s Rights & Gender Equality Awareness": "/programs/women-empowerment/womens-rights",
                    "Women's Rights & Gender Equality Awareness": "/programs/women-empowerment/womens-rights",
                    "Women's Rights & Legal Awareness": "/programs/women-empowerment/womens-rights",
                    "Youth Career & Entrepreneurship Development": "/programs/women-empowerment/youth-career-entrepreneurship",
                    "Youth Career & Entrepreneurship": "/programs/women-empowerment/youth-career-entrepreneurship",
                    "Rural Women Entrepreneurship": "/programs/women-empowerment/rural-women-entrepreneurship",
                    "Financial Literacy": "/programs/women-empowerment/financial-literacy",
                    "Gender Equality & Community Advocacy": "/programs/women-empowerment/gender-equality",
                    "Widows & Vulnerable Women Support": "/programs/women-empowerment/widows-vulnerable-women",
                    // Healthcare & Well-Being
                    "Critical Life & Emergency Support (CLES)": "/programs/healthcare/critical-life-support",
                    "Critical Life & Emergency Support": "/programs/healthcare/critical-life-support",
                    "Rural Ambulance & Emergency Response (RAER)": "/programs/healthcare/rural-ambulance",
                    "Rural Ambulance & Emergency Response": "/programs/healthcare/rural-ambulance",
                    "Rural Ambulance Service": "/programs/healthcare/rural-ambulance",
                    "Medical Assistance for Poor Patients (MAP)": "/programs/healthcare/medical-aid",
                    "Medical Assistance for Poor Patients": "/programs/healthcare/medical-aid",
                    "Medical Aid Programme": "/programs/healthcare/medical-aid",
                    "Community Health Check-up Camps (CHC)": "/programs/healthcare/health-checkup-camps",
                    "Community Health Check-up Camps": "/programs/healthcare/health-checkup-camps",
                    "Health Check-up Camps": "/programs/healthcare/health-checkup-camps",
                    "Diabetes Prevention & Lifestyle Awareness (DPLA)": "/programs/healthcare/diabetes-prevention",
                    "Diabetes Prevention & Lifestyle Awareness": "/programs/healthcare/diabetes-prevention",
                    "Menstrual Health & Hygiene Support (MHHS)": "/programs/healthcare/menstrual-hygiene",
                    "Menstrual Health & Hygiene Support": "/programs/healthcare/menstrual-hygiene",
                    "Menstrual Hygiene Support": "/programs/healthcare/menstrual-hygiene",
                    "Cervical Cancer Prevention & Awareness (CCPA)": "/programs/healthcare/cervical-cancer",
                    "Cervical Cancer Prevention & Awareness": "/programs/healthcare/cervical-cancer",
                    "Rural Healthcare & Wellness Centres (RHWC)": "/programs/healthcare/wellness-centres",
                    "Rural Healthcare & Wellness Centres": "/programs/healthcare/wellness-centres",
                    "Rural Wellness Centres": "/programs/healthcare/wellness-centres",
                  };
                  const href = INITIATIVE_HREFS[item];

                  return (
                    <a
                      key={item}
                      href={href || "#"}
                      className="rounded-2xl bg-white border border-slate-200 hover:border-brand-green/40 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Sparkles className="w-5 h-5 text-brand-orange" />
                          <span className="text-xs font-bold text-slate-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold leading-snug text-slate-900 group-hover:text-brand-green-dark transition-colors">
                          {item}
                        </h3>
                      </div>
                      {href && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-orange group-hover:text-brand-green">
                          <span>View Initiative</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionTitle
                eyebrow="Expected Impact"
                title="Outcomes We Aim For"
              />
            </ScrollReveal>
            <ScrollReveal stagger={0.07}>
              <div className="grid md:grid-cols-5 gap-4">
                {content.impact.map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-md border border-slate-100 p-5 shadow-sm text-center"
                  >
                    <CheckCircle2 className="w-7 h-7 text-brand-green mx-auto mb-3" />
                    <p className="text-xs font-semibold leading-relaxed text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 bg-gradient-to-r from-[#071527] to-[#0c2340] rounded-2xl p-8 md:p-10 text-center text-white shadow-xl">
                <p className="text-slate-300 text-sm leading-relaxed max-w-3xl mx-auto mb-5 font-normal">
                  {content.vision}
                </p>
                <p className="text-white text-lg md:text-2xl font-serif italic max-w-3xl mx-auto leading-relaxed font-normal">
                  "{content.quote}"
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
