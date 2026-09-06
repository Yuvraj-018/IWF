import { useState } from "react";
import {
  Users,
  Shield,
  BookOpen,
  ArrowRight,
  Phone,
  Mail,
  Sparkles,
  Award,
  Building2,
  CheckCircle2,
  GraduationCap,
  Scale,
  MapPin,
  FileText,
  Compass,
  Briefcase,
  Target,
  Layers,
  Table as TableIcon,
  LayoutGrid,
  User,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

// ─── Data from CollegProject/ISLAH.docx ───────────────────────────────────────

// TABLE 2: Board of Trustees (Apex Governing Body - 7 Members)
const BOARD_PRINCIPAL_OFFICERS = [
  {
    sno: 1,
    name: "Er. Nasera Firdausi",
    designation: "Chief Officer",
    portfolio: "Governance Stewardship & Strategic Direction",
    email: "chief.officer@iwfindia.org",
    badgeColor: "bg-emerald-600",
    gender: "female" as const,
  },
  {
    sno: 2,
    name: "Er. Ejazullah",
    designation: "Secretary",
    portfolio: "Statutory Governance & Board Administration",
    email: "secretary@iwfindia.org",
    badgeColor: "bg-blue-600",
    gender: "male" as const,
  },
  {
    sno: 3,
    name: "Md. Sajid",
    designation: "Joint Secretary",
    portfolio: "Operational Alignment & Inter-Body Coordination",
    email: "jointsec@iwfindia.org",
    badgeColor: "bg-indigo-600",
    gender: "male" as const,
  },
  {
    sno: 4,
    name: "Md. Azizullah",
    designation: "Treasurer",
    portfolio: "Financial Oversight & Fiduciary Compliance",
    email: "treasurer@iwfindia.org",
    badgeColor: "bg-amber-600",
    gender: "male" as const,
  },
];

const BOARD_TRUSTEE_MEMBERS = [
  {
    sno: 5,
    name: "CA Sanjeet",
    designation: "Member",
    portfolio: "Financial Audits, Accounts Review & Fiscal Policy",
    email: "trustee@iwfindia.org",
    badgeColor: "bg-slate-700",
    gender: "male" as const,
  },
  {
    sno: 6,
    name: "Md. Atiqure Rahman",
    designation: "Member",
    portfolio: "Community Outreach & Programmatic Review",
    email: "trustee@iwfindia.org",
    badgeColor: "bg-slate-700",
    gender: "male" as const,
  },
  {
    sno: 7,
    name: "Saleh Hedayatullah",
    designation: "Member",
    portfolio: "Institutional Partnerships & Social Initiatives",
    email: "trustee@iwfindia.org",
    badgeColor: "bg-slate-700",
    gender: "male" as const,
  },
];

const ALL_TRUSTEES = [...BOARD_PRINCIPAL_OFFICERS, ...BOARD_TRUSTEE_MEMBERS];

// TABLE 3: Executive Body (Operational Management - 6 Members)
const EXECUTIVE_BODY = [
  {
    sno: 1,
    name: "Er. Nasera Firdausi",
    designation: "Chief Executive Officer",
    portfolio: "Executive Leadership, Strategic Operations & Institutional Management",
    email: "ceo@iwfindia.org",
    icon: Compass,
    gender: "female" as const,
  },
  {
    sno: 2,
    name: "Md. Shahid Raza",
    designation: "Program Manager",
    portfolio: "Project Planning, Field Coordination & Ground Operations",
    email: "programs@iwfindia.org",
    icon: Layers,
    gender: "male" as const,
  },
  {
    sno: 3,
    name: "Ms. Farifa Khatoon",
    designation: "Admin Coordinator",
    portfolio: "Administrative Systems, Personnel Logistics & Facility Oversight",
    email: "admin@iwfindia.org",
    icon: Briefcase,
    gender: "female" as const,
  },
  {
    sno: 4,
    name: "Mr. Arun Kumar Jha",
    designation: "Communications Coordinator",
    portfolio: "Institutional Communications, Media Relations & Public Affairs",
    email: "communications@iwfindia.org",
    icon: Sparkles,
    gender: "male" as const,
  },
  {
    sno: 5,
    name: "Adv. Kanhaiya Mishra",
    designation: "Legal & Compliance Coordinator",
    portfolio: "Statutory Adherence, Legal Documentation & Regulatory Compliance",
    email: "legal@iwfindia.org",
    icon: Scale,
    gender: "male" as const,
  },
  {
    sno: 6,
    name: "Mr. Rakesh Ranjan",
    designation: "Finance Officer",
    portfolio: "Financial Reporting, Budget Administration & Audit Facilitation",
    email: "finance@iwfindia.org",
    icon: BookOpen,
    gender: "male" as const,
  },
];

// TABLE 4: Advisory Body (Strategic Counsel - 6 Members)
const ADVISORY_BODY = [
  {
    sno: 1,
    name: "Prof. (Dr.) Karan Singh",
    expertise: "Academic Advisor",
    focus: "Higher Education, Pedagogical Frameworks & Academic Linkages",
    icon: GraduationCap,
    gender: "male" as const,
  },
  {
    sno: 2,
    name: "Prof. (Dr.) Tayyab Khan",
    expertise: "Technical Advisor",
    focus: "Technical Infrastructure, Digital Systems & Scalable Solutions",
    icon: Compass,
    gender: "male" as const,
  },
  {
    sno: 3,
    name: "Prof. (Dr.) Md. Arquam",
    expertise: "Social Inclusion Advisor",
    focus: "Marginalized Rights, Equitable Access & Community Inclusivity",
    icon: Users,
    gender: "male" as const,
  },
  {
    sno: 4,
    name: "Dr. Intiyaz Ahmad",
    expertise: "Program & Policy Advisor",
    focus: "Policy Research, Evidence-Based Design & Program Governance",
    icon: FileText,
    gender: "male" as const,
  },
  {
    sno: 5,
    name: "CS. Satish Kumar",
    expertise: "Finance Advisor",
    focus: "Corporate Governance, Statutory Compliance & Fiscal Oversight",
    icon: Briefcase,
    gender: "male" as const,
  },
  {
    sno: 6,
    name: "Adv. Pankaj Kumar",
    expertise: "Legal Advisor",
    focus: "Statutory Law, Legal Safeguards & Trust Regulations",
    icon: Scale,
    gender: "male" as const,
  },
];

// TABLE 5: Field Team (Frontline Operations - 6 Members)
const FIELD_TEAM = [
  {
    sno: 1,
    name: "Mr. Mohammad Rashid",
    designation: "Field Coordinator",
    focus: "Community Mobilization & Field Operations",
    gender: "male" as const,
  },
  {
    sno: 2,
    name: "Mr. Rakesh Kumar",
    designation: "Field Coordinator",
    focus: "Programme Delivery & Direct Community Outreach",
    gender: "male" as const,
  },
  {
    sno: 3,
    name: "Ms. Saksi Kumari",
    designation: "Field Coordinator",
    focus: "Women & Child Community Mobilization",
    gender: "female" as const,
  },
  {
    sno: 4,
    name: "Mr. Ravi Paswan",
    designation: "Field Documentation",
    focus: "Field Monitoring, Beneficiary Records & Documentation",
    gender: "male" as const,
  },
  {
    sno: 5,
    name: "Ms. Samia Khatoon",
    designation: "Community Volunteers",
    focus: "Volunteer Coordination & Community Support",
    gender: "female" as const,
  },
  {
    sno: 6,
    name: "Mr. Shahab Alam",
    designation: "Community Mobilizer",
    focus: "Grassroots Awareness & Participatory Engagement",
    gender: "male" as const,
  },
];

// ─── Photo Avatar Component ───────────────────────────────────────────────────

function PhotoAvatar({
  name,
  gender,
  size = "md",
  className = "",
}: {
  name: string;
  gender?: "male" | "female";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const cleanName = name
    .replace(/(Prof\.\s*\(Dr\.\)|Prof\.|Dr\.|Adv\.|Er\.|CA\s+|CS\.\s+|Mr\.|Ms\.|Md\.)/gi, "")
    .trim();
  const words = cleanName.split(/\s+/).filter(Boolean);
  const initials = (
    words.length >= 2
      ? words[0][0] + words[words.length - 1][0]
      : words[0]?.slice(0, 2) || name.slice(0, 2)
  ).toUpperCase();

  const sizeClasses =
    size === "sm"
      ? "w-10 h-10 text-xs"
      : size === "lg"
      ? "w-16 h-16 text-base"
      : "w-12 h-12 text-xs";

  return (
    <div
      className={`relative rounded-2xl flex items-center justify-center font-black overflow-hidden shadow-2xs shrink-0 border-2 border-white/90 ring-1 ring-slate-200/80 ${sizeClasses} ${className} ${
        gender === "female"
          ? "bg-gradient-to-br from-pink-100 via-rose-100 to-amber-100 text-rose-800"
          : "bg-gradient-to-br from-slate-100 via-blue-100 to-emerald-100 text-[#0b1f3b]"
      }`}
      title={`Profile: ${name}`}
    >
      <div className="flex flex-col items-center justify-center">
        <User className={size === "sm" ? "w-3 h-3 opacity-60 mb-0.5" : size === "lg" ? "w-5 h-5 opacity-60 mb-0.5" : "w-3.5 h-3.5 opacity-60 mb-0.5"} />
        <span className="font-mono leading-none tracking-tight">{initials}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
    </div>
  );
}

export default function LeadershipPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-orange/20 selection:text-[#0b1f3b]">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* ─── Hero Section (Navy Split Banner) ───────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#0b1f3b] via-[#0f284e] to-[#0b1f3b] text-white py-10 md:py-14 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Col (Text & CTAs) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#f97316] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
                  GOVERNANCE & STEWARDSHIP
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                  Leadership <span className="text-[#38bdf8]">&</span> Management
                </h1>
                <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-1.5 flex items-center gap-1.5">
                  <span>Guided by Integrity. Driven by Community Impact.</span>
                  <span className="text-sm">🌿</span>
                </p>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                <strong className="text-white font-semibold">ISLAH (Islah Welfare Foundation)</strong> is governed by a dedicated Board of Trustees, managed by experienced executive professionals, guided by eminent domain advisors, and powered by an active frontline field force.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Connect with Leadership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setActiveModal("volunteer")}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer backdrop-blur-xs"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Join Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Col (4 Key Tiers Counter) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm">
                  <div className="text-2xl font-black text-emerald-400 leading-tight">07</div>
                  <h4 className="font-extrabold text-xs text-white">Board of Trustees</h4>
                  <p className="text-[10px] text-slate-300">Fiduciary & Governance</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm">
                  <div className="text-2xl font-black text-[#38bdf8] leading-tight">06</div>
                  <h4 className="font-extrabold text-xs text-white">Executive Body</h4>
                  <p className="text-[10px] text-slate-300">Operations & Programs</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm">
                  <div className="text-2xl font-black text-amber-400 leading-tight">06</div>
                  <h4 className="font-extrabold text-xs text-white">Advisory Panel</h4>
                  <p className="text-[10px] text-slate-300">Domain Specialists</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm">
                  <div className="text-2xl font-black text-[#f97316] leading-tight">06</div>
                  <h4 className="font-extrabold text-xs text-white">Field Operations</h4>
                  <p className="text-[10px] text-slate-300">Community Mobilizers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Global View Mode Bar ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 sm:px-5 sm:py-3 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>Display Layout:</span>
            <strong className="text-[#0b1f3b] capitalize">{viewMode} View</strong>
            <span className="hidden md:inline text-slate-400">• Formatted according to official ISLAH documentation</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("cards")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === "cards"
                  ? "bg-[#0b1f3b] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards View</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === "table"
                  ? "bg-[#0b1f3b] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Official Table View</span>
            </button>
          </div>
        </div>
      </div>

      <main className="space-y-10 py-6 px-4 md:px-8 max-w-7xl mx-auto">
        {/* ─── Tier 1: Board of Trustees ───────────────────────────────────── */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold shrink-0 shadow-2xs">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#15803d]">
                      TIER 1 • APEX GOVERNING BODY
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight leading-tight">
                      Board of Trustees
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start md:self-auto">
                  07 Members Total
                </span>
              </div>

              {/* Exact Governance & Role & Responsibility Box from ISLAH.docx */}
              <div className="bg-emerald-50/80 border-l-4 border-[#15803d] p-4 rounded-r-xl space-y-2">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  The <strong className="text-[#0b1f3b] font-bold">Board of Trustees</strong> provides strategic direction, oversight and responsible governance to Islah Welfare Foundation (ISLAH). It safeguards the organisation’s mission, values and long-term objectives while promoting transparency, accountability and ethical stewardship.
                </p>
                <div className="pt-2 border-t border-emerald-200/70 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-[11px] font-bold text-[#15803d] uppercase tracking-wider shrink-0">
                    Roles & Responsibility:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    The Board supports sound decision-making, ensures responsible utilisation of resources, and provides guidance for sustainable growth and meaningful community impact. Together, the Board provides the foundation for responsible governance and the long-term vision of ISLAH.
                  </p>
                </div>
              </div>

              {viewMode === "cards" ? (
                <div className="space-y-5 pt-1">
                  {/* Row 1: 4 Principal Officers (Chief Officer, Secretary, Joint Secretary, Treasurer) */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#15803d]" />
                        Governing Officers (04)
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Executive Leadership of the Board</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {BOARD_PRINCIPAL_OFFICERS.map((trustee) => (
                        <div
                          key={trustee.sno}
                          className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md hover:bg-white transition-all flex flex-col justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <PhotoAvatar name={trustee.name} gender={trustee.gender} size="md" />
                            <div className="min-w-0 flex-1">
                              <span className="inline-block text-[10px] font-black text-[#15803d] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                                {trustee.designation}
                              </span>
                              <h4 className="font-extrabold text-[#0b1f3b] text-sm mt-0.5 truncate group-hover:text-[#15803d] transition-colors" title={trustee.name}>
                                {trustee.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5" title={trustee.portfolio}>
                                {trustee.portfolio}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 mt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                            <span className="font-mono">#{trustee.sno}</span>
                            <span className="text-slate-500 font-medium">Board of Trustees</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 2: 3 Trustee Members (CA Sanjeet, Md. Atiqure Rahman, Saleh Hedayatullah) */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-600" />
                        Trustee Members (03)
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Strategic Review & Fiduciary Counsel</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {BOARD_TRUSTEE_MEMBERS.map((trustee) => (
                        <div
                          key={trustee.sno}
                          className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md hover:bg-white transition-all flex flex-col justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <PhotoAvatar name={trustee.name} gender={trustee.gender} size="md" />
                            <div className="min-w-0 flex-1">
                              <span className="inline-block text-[10px] font-bold text-slate-700 bg-slate-200/70 border border-slate-300 px-2 py-0.5 rounded uppercase">
                                {trustee.designation}
                              </span>
                              <h4 className="font-extrabold text-[#0b1f3b] text-sm mt-0.5 truncate group-hover:text-[#15803d] transition-colors" title={trustee.name}>
                                {trustee.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5" title={trustee.portfolio}>
                                {trustee.portfolio}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 mt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                            <span className="font-mono">#{trustee.sno}</span>
                            <span className="text-slate-500 font-medium">Board of Trustees</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Table View matching ISLAH.docx Table 2 */
                <div className="rounded-xl border border-slate-200 overflow-hidden pt-1">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 font-black text-slate-700 uppercase tracking-wider text-[10px]">
                          <th className="p-3 w-12">Sl. No</th>
                          <th className="p-3 w-16">Photo</th>
                          <th className="p-3 w-48">Name</th>
                          <th className="p-3 w-36">Designation</th>
                          <th className="p-3">Key Focus & Portfolio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {ALL_TRUSTEES.map((t) => (
                          <tr key={t.sno} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-slate-400">{t.sno}</td>
                            <td className="p-3">
                              <PhotoAvatar name={t.name} gender={t.gender} size="sm" />
                            </td>
                            <td className="p-3 font-bold text-[#0b1f3b]">{t.name}</td>
                            <td className="p-3">
                              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold text-[11px] inline-block">
                                {t.designation}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600 leading-relaxed font-medium">{t.portfolio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* ─── Tier 2: Executive Body ──────────────────────────────────────── */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold shrink-0 shadow-2xs">
                    <Compass className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#f97316]">
                      TIER 2 • OPERATIONAL MANAGEMENT
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight leading-tight">
                      Executive Body
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start md:self-auto">
                  06 Members Total
                </span>
              </div>

              {/* Exact Operations & Role & Responsibility Box from ISLAH.docx */}
              <div className="bg-amber-50/80 border-l-4 border-brand-orange p-4 rounded-r-xl space-y-2">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  The <strong className="text-[#0b1f3b] font-bold">Executive Body</strong> is responsible for translating ISLAH’s vision and strategic priorities into effective programmes and day-to-day organisational action.
                </p>
                <div className="pt-2 border-t border-amber-200/70 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider shrink-0">
                    Roles & Responsibility:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    It oversees implementation, coordination, resource management and operational performance while ensuring alignment with the organisation’s policies, values and objectives.
                  </p>
                </div>
              </div>

              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                  {EXECUTIVE_BODY.map((exec) => {
                    const Icon = exec.icon;
                    return (
                      <div
                        key={exec.sno}
                        className="rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group bg-slate-50/80 hover:bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <PhotoAvatar name={exec.name} gender={exec.gender} size="md" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="inline-block text-[10px] font-black text-[#f97316] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded uppercase">
                                {exec.designation}
                              </span>
                              <div className="w-5 h-5 rounded bg-white border border-slate-200 flex items-center justify-center text-[#0b1f3b]">
                                <Icon className="w-3 h-3 text-brand-orange" />
                              </div>
                            </div>
                            <h4 className="font-extrabold text-[#0b1f3b] text-sm mt-0.5 truncate group-hover:text-brand-orange transition-colors" title={exec.name}>
                              {exec.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5" title={exec.portfolio}>
                              {exec.portfolio}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 mt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-500">
                          <a
                            href={`mailto:${exec.email}`}
                            className="font-mono text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            {exec.email}
                          </a>
                          <span className="font-mono text-slate-400">#{exec.sno}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Table View matching ISLAH.docx Table 3 */
                <div className="rounded-xl border border-slate-200 overflow-hidden pt-1">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 font-black text-slate-700 uppercase tracking-wider text-[10px]">
                          <th className="p-3 w-12">Sl. No</th>
                          <th className="p-3 w-16">Photo</th>
                          <th className="p-3 w-48">Name</th>
                          <th className="p-3 w-48">Designation</th>
                          <th className="p-3">Key Focus & Portfolio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {EXECUTIVE_BODY.map((exec) => (
                          <tr key={exec.sno} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-slate-400">{exec.sno}</td>
                            <td className="p-3">
                              <PhotoAvatar name={exec.name} gender={exec.gender} size="sm" />
                            </td>
                            <td className="p-3 font-bold text-[#0b1f3b]">{exec.name}</td>
                            <td className="p-3">
                              <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold text-[11px] inline-block">
                                {exec.designation}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600 leading-relaxed font-medium">{exec.portfolio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* ─── Tier 3: Advisory Body ───────────────────────────────────────── */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold shrink-0 shadow-2xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#0284c7]">
                      TIER 3 • STRATEGIC COUNSEL
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight leading-tight">
                      Advisory Body
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start md:self-auto">
                  06 Advisors Total
                </span>
              </div>

              {/* Exact Advisory Role & Strategic Guidance from ISLAH.docx */}
              <div className="bg-blue-50/80 border-l-4 border-blue-500 p-4 rounded-r-xl space-y-2">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  The <strong className="text-[#0b1f3b] font-bold">Advisory Body</strong> of ISLAH brings together experienced professionals, subject experts and distinguished individuals who provide strategic guidance and specialised advice across areas relevant to our mission.
                </p>
                <div className="pt-2 border-t border-blue-200/70 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider shrink-0">
                    Roles & Responsibility:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    The Advisory Body supports ISLAH in strengthening its programmes, institutional systems, partnerships and long-term vision by contributing diverse perspectives, professional expertise and evidence-based insights.
                  </p>
                </div>
              </div>

              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                  {ADVISORY_BODY.map((advisor) => {
                    const Icon = advisor.icon;
                    return (
                      <div
                        key={advisor.sno}
                        className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md hover:bg-white transition-all flex flex-col justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <PhotoAvatar name={advisor.name} gender={advisor.gender} size="md" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="inline-block text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase">
                                {advisor.expertise}
                              </span>
                              <div className="w-5 h-5 rounded bg-white border border-slate-200 flex items-center justify-center text-[#0b1f3b]">
                                <Icon className="w-3 h-3 text-blue-600" />
                              </div>
                            </div>
                            <h4 className="font-extrabold text-[#0b1f3b] text-sm mt-0.5 truncate group-hover:text-blue-700 transition-colors" title={advisor.name}>
                              {advisor.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5" title={advisor.focus}>
                              {advisor.focus}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 mt-2.5 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
                          <span className="font-mono">#{advisor.sno}</span>
                          <span className="text-slate-500 font-medium">Strategic Advisory</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Table View matching ISLAH.docx Table 4 */
                <div className="rounded-xl border border-slate-200 overflow-hidden pt-1">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 font-black text-slate-700 uppercase tracking-wider text-[10px]">
                          <th className="p-3 w-12">Sl. No</th>
                          <th className="p-3 w-16">Photo</th>
                          <th className="p-3 w-48">Name</th>
                          <th className="p-3 w-44">Expertise</th>
                          <th className="p-3">Advisory Domain</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {ADVISORY_BODY.map((advisor) => (
                          <tr key={advisor.sno} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-slate-400">{advisor.sno}</td>
                            <td className="p-3">
                              <PhotoAvatar name={advisor.name} gender={advisor.gender} size="sm" />
                            </td>
                            <td className="p-3 font-bold text-[#0b1f3b]">{advisor.name}</td>
                            <td className="p-3">
                              <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-bold text-[11px] inline-block">
                                {advisor.expertise}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600 leading-relaxed font-medium">{advisor.focus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* ─── Tier 4: Field Team & Grassroots Force ───────────────────────── */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#7c3aed]">
                      TIER 4 • GRASSROOTS MOBILIZATION
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight leading-tight">
                      Field Team & Community Mobilizers
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start md:self-auto">
                  06 Members Total
                </span>
              </div>

              {/* Exact Field Team Role & Mission Box from ISLAH.docx */}
              <div className="bg-purple-50/80 border-l-4 border-purple-500 p-4 rounded-r-xl space-y-2">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  The <strong className="text-[#0b1f3b] font-bold">Field Team</strong> is the frontline of ISLAH’s work. It connects the organisation with communities, understands local needs, facilitates programme delivery and ensures that initiatives reach the people they are intended to serve.
                </p>
                <div className="pt-2 border-t border-purple-200/70 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider shrink-0">
                    Roles & Responsibility:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    Working closely with communities, volunteers, local institutions and programme teams, the Field Team helps translate ISLAH’s plans into practical, community-level action.
                  </p>
                </div>
              </div>

              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                  {FIELD_TEAM.map((member) => (
                    <div
                      key={member.sno}
                      className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between hover:bg-white hover:shadow-md transition group"
                    >
                      <div className="flex items-center gap-3">
                        <PhotoAvatar name={member.name} gender={member.gender} size="md" />
                        <div className="min-w-0 flex-1">
                          <span className="inline-block text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded uppercase">
                            {member.designation}
                          </span>
                          <h5 className="font-extrabold text-[#0b1f3b] text-sm mt-0.5 truncate group-hover:text-purple-700 transition-colors" title={member.name}>
                            {member.name}
                          </h5>
                          <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5" title={member.focus}>
                            {member.focus}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 mt-2.5 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
                        <span className="font-mono">#{member.sno}</span>
                        <span className="text-slate-500 font-medium">Frontline Operations</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Table View matching ISLAH.docx Table 5 */
                <div className="rounded-xl border border-slate-200 overflow-hidden pt-1">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 font-black text-slate-700 uppercase tracking-wider text-[10px]">
                          <th className="p-3 w-12">Sl. No</th>
                          <th className="p-3 w-16">Photo</th>
                          <th className="p-3 w-48">Name</th>
                          <th className="p-3 w-44">Designation</th>
                          <th className="p-3">Frontline Responsibility</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {FIELD_TEAM.map((member) => (
                          <tr key={member.sno} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-slate-400">{member.sno}</td>
                            <td className="p-3">
                              <PhotoAvatar name={member.name} gender={member.gender} size="sm" />
                            </td>
                            <td className="p-3 font-bold text-[#0b1f3b]">{member.name}</td>
                            <td className="p-3">
                              <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-bold text-[11px] inline-block">
                                {member.designation}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600 leading-relaxed font-medium">{member.focus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* ─── Section: Governance & Ethical Accountability Norms ──────────── */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-slate-950 via-[#0b1f3b] to-slate-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-white/10 space-y-4">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">
                GOVERNANCE PRINCIPLES
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Accountability & Responsible Stewardship
              </h3>
              <p className="text-xs text-slate-300">
                ISLAH adheres to the highest statutory, ethical and fiduciary standards across all operations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 space-y-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h5 className="font-extrabold text-xs text-white">Trustee Oversight</h5>
                <p className="text-[10px] text-slate-300 leading-snug">
                  Regular board meetings, review of audited accounts, and statutory policy formulation.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 space-y-1.5">
                <FileText className="w-4 h-4 text-[#38bdf8]" />
                <h5 className="font-extrabold text-xs text-white">Financial Transparency</h5>
                <p className="text-[10px] text-slate-300 leading-snug">
                  Annual external audits, quarterly reviews, and public reporting of fund utilisation.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 space-y-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                <h5 className="font-extrabold text-xs text-white">Statutory Compliance</h5>
                <p className="text-[10px] text-slate-300 leading-snug">
                  Full adherence to Trust Deed provisions, 12A/80G norms, and applicable NGO guidelines.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 space-y-1.5">
                <Target className="w-4 h-4 text-rose-400" />
                <h5 className="font-extrabold text-xs text-white">Impact Verification</h5>
                <p className="text-[10px] text-slate-300 leading-snug">
                  Outcome tracking, beneficiary verification, and transparent feedback mechanisms.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Section: Connect with Leadership CTA ────────────────────────── */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="space-y-0.5 max-w-xl">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#15803d]">
                INSTITUTIONAL DIALOGUE
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b] tracking-tight">
                Connect with Our Leadership
              </h3>
              <p className="text-xs text-slate-600">
                For institutional partnerships, governance inquiries, or media queries, please reach out to our team.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </a>
              <a
                href="mailto:info@iwfindia.org"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>info@iwfindia.org</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
