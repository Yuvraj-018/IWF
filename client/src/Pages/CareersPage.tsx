import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Clock,
  Facebook,
  FileText,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartPulse,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  RotateCcw,
  Search,
  Sprout,
  TrendingUp,
  UserCheck,
  Users,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { pastel } from "@/components/getInvolved/PageSections";
import {
  GENERAL_APPLICATION,
  activeOpenings,
  formatLastDate,
  type CareerOpening,
  type OpeningIcon,
} from "@/content/careerOpenings";
import { CONTACT_DETAILS } from "@/content/siteContent";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const OPENING_ICONS: Record<OpeningIcon, LucideIcon> = {
  programme: Users,
  field: Sprout,
  data: BarChart3,
  health: HeartPulse,
  communication: Megaphone,
  intern: GraduationCap,
};

const SOCIALS = [
  {
    label: "Facebook",
    Icon: Facebook,
    href: "https://www.facebook.com/islahindia/",
    className: "bg-[#1877f2]",
  },
  {
    label: "LinkedIn",
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/islahindia/",
    className: "bg-[#0077b5]",
  },
  {
    label: "Instagram",
    Icon: Instagram,
    href: "https://www.instagram.com/islahindia/",
    className: "bg-gradient-to-tr from-[#f9cb2f] via-[#e5195f] to-[#8134af]",
  },
  {
    label: "YouTube",
    Icon: Youtube,
    href: "https://www.youtube.com/channel/UC5sty9L25QQwC89JwGmEIVw/",
    className: "bg-[#ff0000]",
  },
];

const ALL = "All";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el)
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
}

/** Compact centred section title with an accent bar (as in the careers layout). */
function CenterTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-lg sm:text-xl font-semibold uppercase tracking-wide text-[#071527]">
        {children}
      </h2>
      <span className="block w-10 h-0.5 bg-brand-orange mx-auto mt-2 rounded-full" />
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  allLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm text-slate-700 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15"
    >
      <option value={ALL}>{allLabel}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export default function CareersPage() {
  useScrollToHash("career-form");
  const openings = useMemo(() => activeOpenings(), []);
  const [location, setLocation] = useState(ALL);
  const [department, setDepartment] = useState(ALL);
  const [experience, setExperience] = useState(ALL);
  const [detailId, setDetailId] = useState<string | null>(openings[0]?.id ?? null);
  const [applyFor, setApplyFor] = useState<string | undefined>();

  const uniq = (list: string[]) => Array.from(new Set(list)).sort();
  const locations = uniq(openings.map((o) => o.location));
  const departments = uniq(openings.map((o) => o.department));
  const experiences = uniq(openings.map((o) => o.experienceBand));

  const filtered = openings.filter(
    (o) =>
      (location === ALL || o.location === location) &&
      (department === ALL || o.department === department) &&
      (experience === ALL || o.experienceBand === experience),
  );
  const filtersActive = location !== ALL || department !== ALL || experience !== ALL;
  const detail: CareerOpening | undefined = openings.find((o) => o.id === detailId);

  const apply = (title: string) => {
    setApplyFor(title);
    scrollToId("career-form");
  };
  const viewDetails = (id: string) => {
    setDetailId(id);
    scrollToId("job-details");
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <SubpageHeroCarousel
          tag="CAREERS AT ISLAH"
          title="Join Our Mission. Build Impactful Careers."
          subtitle="Work with ISLAH to create real change in rural India and empower communities for a better tomorrow."
          breadcrumbs={[{ label: "Careers & Opportunities" }]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => scrollToId("openings")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-semibold text-sm transition-all active:scale-95"
            >
              View Open Positions <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("career-form")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all active:scale-95"
            >
              Apply Now
            </button>
          </div>
        </SubpageHeroCarousel>

        {/* Why work with us */}
        <section className="py-10 sm:py-12 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <CenterTitle>Why Work With Us</CenterTitle>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:divide-x divide-slate-200">
              {[
                {
                  icon: HandHeart,
                  title: "Real Impact",
                  desc: "Work on meaningful projects that create lasting change in communities.",
                },
                {
                  icon: Handshake,
                  title: "Collaborative Team",
                  desc: "Be part of a passionate, supportive team that values inclusion and respect.",
                },
                {
                  icon: TrendingUp,
                  title: "Growth & Learning",
                  desc: "Learn, grow and enhance your skills with continuous exposure and training.",
                },
                {
                  icon: Sprout,
                  title: "Grassroots Exposure",
                  desc: "Get hands-on experience working directly with rural communities.",
                },
              ].map((it, i) => {
                const p = pastel(i);
                return (
                  <div key={it.title} className="text-center px-4">
                    <span
                      className={`w-14 h-14 rounded-full ${p.bg} ${p.icon} flex items-center justify-center mx-auto`}
                    >
                      <it.icon className="w-6 h-6" />
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-[#071527] mt-3">
                      {it.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-[15rem] mx-auto">
                      {it.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Current openings */}
        <section
          id="openings"
          className="py-10 sm:py-12 bg-slate-50/70 border-b border-slate-100 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <CenterTitle>Current Openings</CenterTitle>

            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Filter:</span>
              <FilterSelect
                value={location}
                onChange={setLocation}
                options={locations}
                allLabel="All Locations"
              />
              <FilterSelect
                value={department}
                onChange={setDepartment}
                options={departments}
                allLabel="All Departments"
              />
              <FilterSelect
                value={experience}
                onChange={setExperience}
                options={experiences}
                allLabel="All Experience"
              />
              <span className="text-xs text-slate-500 ml-1">
                {filtered.length} of {openings.length} roles
              </span>
              {filtersActive && (
                <button
                  type="button"
                  onClick={() => {
                    setLocation(ALL);
                    setDepartment(ALL);
                    setExperience(ALL);
                  }}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-orange hover:text-orange-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>

            {filtered.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((o, i) => {
                  const Icon = OPENING_ICONS[o.icon];
                  const p = pastel(i);
                  const selected = o.id === detailId;
                  return (
                    <article
                      key={o.id}
                      className={`rounded-xl border bg-white p-5 flex flex-col transition ${
                        selected
                          ? "border-brand-orange/60 ring-1 ring-brand-orange/20"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-11 h-11 rounded-full ${p.bg} ${p.icon} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-[#071527] leading-snug">
                            {o.title}
                          </h3>
                          <ul className="mt-1.5 space-y-0.5 text-xs text-slate-600">
                            <li className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {o.location}
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" /> {o.type}
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> Last Date:{" "}
                              {formatLastDate(o.lastDate)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed flex-1">
                        {o.summary}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => viewDetails(o.id)}
                          className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => apply(o.title)}
                          className="px-3 py-2 rounded-lg bg-[#071527] hover:bg-slate-800 text-xs font-semibold text-white transition"
                        >
                          Apply Now
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <Search className="w-6 h-6 text-slate-400 mx-auto" />
                <p className="text-sm text-slate-700 mt-2">
                  {openings.length
                    ? "No roles match these filters."
                    : "There are no open positions right now."}
                </p>
                <button
                  type="button"
                  onClick={() => apply(GENERAL_APPLICATION)}
                  className="mt-3 text-sm font-semibold text-brand-orange hover:text-orange-700"
                >
                  Submit your CV for future openings →
                </button>
              </div>
            )}

            {/* Job details */}
            {detail && (
              <div
                id="job-details"
                className="mt-6 scroll-mt-24 rounded-xl border border-slate-200 bg-white grid lg:grid-cols-[1fr_17rem]"
              >
                <div className="p-5 sm:p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    Job Details
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#071527] mt-1">
                    {detail.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs sm:text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" /> {detail.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" /> {detail.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-slate-400" /> Experience:{" "}
                      {detail.experience}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5 mt-4">
                    {[
                      ["Responsibilities", detail.responsibilities],
                      ["Eligibility", detail.eligibility],
                    ].map(([heading, items]) => (
                      <div key={heading as string}>
                        <h4 className="text-sm font-semibold text-[#071527]">
                          {heading as string}
                        </h4>
                        <ul className="mt-1.5 space-y-1">
                          {(items as string[]).map((it) => (
                            <li
                              key={it}
                              className="flex gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed"
                            >
                              <ChevronRight className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <aside className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/70 p-5 sm:p-6 rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl">
                  <button
                    type="button"
                    onClick={() => apply(detail.title)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold transition"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <dl className="mt-4 space-y-2.5 text-xs sm:text-sm">
                    {[
                      ["Department", detail.department],
                      ["Reports To", detail.reportsTo],
                      ["Location", detail.location],
                      ["Experience", detail.experience],
                      ["Employment Type", detail.type],
                      ["Last Date to Apply", formatLastDate(detail.lastDate)],
                    ].map(([k, val]) => (
                      <div key={k}>
                        <dt className="text-slate-500">{k}</dt>
                        <dd className="font-medium text-[#071527]">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </div>
            )}
          </div>
        </section>

        {/* Application form */}
        <section
          id="career-form"
          className="py-10 sm:py-12 bg-white border-b border-slate-100 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <CenterTitle>Application Form</CenterTitle>
            <CareerApplicationForm
              positions={openings.map((o) => o.title)}
              selectedPosition={applyFor}
            />
          </div>
        </section>

        {/* Recruitment process */}
        <section className="py-10 sm:py-12 bg-slate-50/70 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <CenterTitle>Our Recruitment Process</CenterTitle>
            <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  icon: FileText,
                  title: "Apply Online",
                  desc: "Submit your application with updated details.",
                },
                {
                  icon: Search,
                  title: "Screening",
                  desc: "Applications are reviewed by our team.",
                },
                {
                  icon: Users,
                  title: "Interview",
                  desc: "Shortlisted candidates are invited to interview.",
                },
                {
                  icon: UserCheck,
                  title: "Selection",
                  desc: "Final selection based on suitability for the role.",
                },
                {
                  icon: Handshake,
                  title: "Join Us",
                  desc: "Welcome aboard — let's create impact together.",
                },
              ].map((s, i, arr) => (
                <li key={s.title} className="relative text-center">
                  <span className="relative inline-flex">
                    <span className="w-14 h-14 rounded-full bg-white border border-slate-200 text-[#071527] flex items-center justify-center">
                      <s.icon className="w-6 h-6" />
                    </span>
                    <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </span>
                  {i < arr.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-5 -right-3 w-5 h-5 text-slate-300" />
                  )}
                  <p className="text-sm font-semibold text-[#071527] mt-2">{s.title}</p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-[12rem] mx-auto">
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Don't see a role + contacts */}
        <section className="py-10 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-orange-50/40 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-white border border-orange-200 text-brand-orange flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" />
              </span>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-[#071527]">
                  Don't see a suitable role?
                </h3>
                <p className="text-sm text-slate-600 mt-0.5">
                  Submit your CV and we'll reach out when a relevant opportunity becomes available.
                </p>
              </div>
              <button
                type="button"
                onClick={() => apply(GENERAL_APPLICATION)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#071527] hover:bg-slate-800 text-white text-sm font-semibold transition shrink-0"
              >
                Submit Your CV
              </button>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 sm:p-6 grid sm:grid-cols-2 gap-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  For Careers Queries
                </h4>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2.5 text-sm">
                  <a
                    href={`mailto:${CONTACT_DETAILS.email}`}
                    className="inline-flex items-center gap-2 text-[#071527] hover:text-brand-orange"
                  >
                    <Mail className="w-4 h-4 text-brand-orange" /> {CONTACT_DETAILS.email}
                  </a>
                  <a
                    href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-[#071527] hover:text-brand-orange"
                  >
                    <Phone className="w-4 h-4 text-brand-orange" /> {CONTACT_DETAILS.phone}
                  </a>
                </div>
              </div>
              <div className="sm:text-right">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Follow Us
                </h4>
                <div className="flex sm:justify-end gap-2 mt-2.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`w-8 h-8 rounded-full ${s.className} text-white flex items-center justify-center hover:opacity-90 transition`}
                    >
                      <s.Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
