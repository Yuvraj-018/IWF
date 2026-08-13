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
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
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
        <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
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
                      <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-extrabold shrink-0">
                        {num}
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-green-dark">{title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mt-1">{text}</p>
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
                          <p className="text-lg font-extrabold">{label}</p>
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
                        A focused layer in IWF's education pathway for rural children and youth.
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
                {empowerment.map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-md p-6 border shadow-sm ${
                      index % 2 === 0
                        ? "bg-white border-orange-100"
                        : "bg-[#0b1f3b] border-[#0b1f3b] text-white"
                    }`}
                  >
                    {index % 2 === 0 ? (
                      <Users className="w-6 h-6 text-brand-orange mb-5" />
                    ) : (
                      <Sparkles className="w-6 h-6 text-brand-orange mb-5" />
                    )}
                    <h3 className={index % 2 === 0 ? "font-bold text-brand-green-dark" : "font-bold text-white"}>
                      {item}
                    </h3>
                    <p className={index % 2 === 0 ? "text-xs text-slate-600 leading-relaxed mt-2" : "text-xs text-white/70 leading-relaxed mt-2"}>
                      A core pillar of IWF's women empowerment ecosystem.
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
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = content.heroSlides ?? [{ image: content.heroImage, caption: content.title }];
  const Icon = content.icon;

  const goTo = useCallback((i: number) => setSlideIndex((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);
  const prev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        {/* Hero Slideshow */}
        <section className="relative min-h-[430px] flex items-center overflow-hidden">
          {/* Slides */}
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                slideIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.caption}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/20" />
            </div>
          ))}

          {/* Content overlay */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/65 mb-6 font-medium flex-wrap">
              <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </a>
              <ChevronRight className="w-3 h-3" />
              <span>What We Do</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/85">{content.title}</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
              <Icon className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                {content.eyebrow}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
              {content.title}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-3xl leading-relaxed">
              {content.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#initiatives"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm px-5 py-3 rounded-md shadow transition-colors"
              >
                Explore Initiatives <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setActiveModal("partner")}
                className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-md transition-colors cursor-pointer"
              >
                Partner With Us
              </button>
            </div>
          </div>

          {/* Prev / Next arrows */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots + caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
            <p className="text-white/70 text-xs font-medium">{slides[slideIndex]?.caption}</p>
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    slideIndex === idx ? "w-6 h-2 bg-brand-orange" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

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
                    className="group rounded-md bg-[#0b1f3b] hover:bg-white border border-brand-green/10 hover:border-brand-green/30 p-5 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <span className="inline-flex w-8 h-8 rounded-full bg-white/15 group-hover:bg-brand-green/10 text-white group-hover:text-brand-green items-center justify-center text-xs font-bold mb-4 transition-colors">
                      {index + 1}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-white/90 group-hover:text-slate-700 transition-colors">
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
                title={`How IWF Advances ${content.title}`}
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
                    "Erawin Public School (EPS)": "/programs/education/erawin-public-school",
                    "JISNS Journal": "/programs/education/jisns-journal",
                    "Community & Islamic Learning Centre (CILC)": "/programs/education/cilc",
                    "Coaching Centre (CBCE)": "/programs/education/coaching-centre",
                    "Scholarships for Higher Education": "/programs/education/scholarships",
                    "School Kit Distribution": "/programs/education/school-kit-distribution",
                    "Rural Academic Talent Search (RATS)": "/programs/education/rats",
                    "Career Guidance & Mentorship (CTAG)": "/programs/education/career-guidance",
                    "Technical Institute": "/programs/education/technical-institute",
                    "Vocational Training Institute": "/programs/education/vocational-training-institute",
                    "Community Skill Centre (CSC)": "/programs/skills-development/community-skill-centre",
                    "Vocational Training Workshops (VTW)": "/programs/skills-development/vocational-training-workshops",
                    "Women Skill & Livelihood": "/programs/women-empowerment/women-skill-livelihood",
                    "Rural Women Entrepreneurship": "/programs/women-empowerment/rural-women-entrepreneurship",
                    "Self-Help Groups (SHG)": "/programs/women-empowerment/self-help-groups",
                    "Financial Literacy": "/programs/women-empowerment/financial-literacy",
                    "Women's Rights & Legal Awareness": "/programs/women-empowerment/womens-rights",
                    "Gender Equality & Community Advocacy": "/programs/women-empowerment/gender-equality",
                    "Widows & Vulnerable Women Support": "/programs/women-empowerment/widows-vulnerable-women",
                  };
                  const href = INITIATIVE_HREFS[item];

                  return (
                    <a
                      key={item}
                      href={href || "#"}
                      className="rounded-md bg-[#0b1f3b] border border-brand-green/10 p-5 shadow-sm hover:bg-white hover:border-brand-green/30 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Icon className="w-5 h-5 text-brand-orange" />
                          <span className="text-xs font-bold text-white/55 group-hover:text-slate-400 transition-colors">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold leading-snug text-white group-hover:text-brand-green-dark transition-colors">
                          {item}
                        </h3>
                      </div>
                      {href && (
                        <div className="mt-4 pt-3 border-t border-white/10 group-hover:border-slate-100 flex items-center justify-between text-xs font-bold text-brand-orange group-hover:text-brand-green">
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
              <div className="mt-12 bg-brand-green-darker rounded-md p-8 md:p-10 text-center">
                <p className="text-white/75 text-sm leading-relaxed max-w-3xl mx-auto mb-5">
                  {content.vision}
                </p>
                <p className="text-white text-lg md:text-2xl font-semibold italic max-w-3xl mx-auto leading-relaxed">
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
