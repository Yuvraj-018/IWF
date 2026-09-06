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
  HeartPulse,
  Scale,
  MapPin,
  FileText,
  UserCheck,
  Compass,
  Briefcase,
  Target,
  Layers,
  Table as TableIcon,
  LayoutGrid,
  Camera,
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const BOARD_PRINCIPAL_OFFICERS = [
  {
    sno: 1,
    name: "Md. Imteyazullah",
    designation: "Chairman",
    role: "Strategic Direction & Policy Leadership",
    qualification: "Graduate",
    district: "Darbhanga",
    state: "Bihar",
    email: "chairman@iwfindia.org",
    badgeColor: "bg-emerald-600",
    gender: "male",
  },
  {
    sno: 2,
    name: "Md. Azizullah",
    designation: "Treasurer",
    role: "Financial Oversight & Fiduciary Compliance",
    qualification: "Graduate",
    district: "Darbhanga",
    state: "Bihar",
    email: "treasurer@iwfindia.org",
    badgeColor: "bg-blue-600",
    gender: "male",
  },
  {
    sno: 3,
    name: "Md. Jamshed Alam",
    designation: "Secretary",
    role: "Institutional Operations & Governance",
    qualification: "Graduate",
    district: "Darbhanga",
    state: "Bihar",
    email: "secretary@iwfindia.org",
    badgeColor: "bg-amber-600",
    gender: "male",
  },
];

const BOARD_TRUSTEE_MEMBERS = [
  {
    sno: 4,
    name: "Md. Asghar Imam",
    designation: "Trustee Member",
    role: "Community Relations & Institutional Oversight",
    qualification: "Post Graduate",
    district: "Muzaffarpur",
    state: "Bihar",
    email: "info@iwfindia.org",
    badgeColor: "bg-slate-700",
    gender: "male",
  },
  {
    sno: 5,
    name: "Md. Mustafa",
    designation: "Trustee Member",
    role: "Field Program Review & Evaluation",
    qualification: "Graduate",
    district: "Sitamarhi",
    state: "Bihar",
    email: "info@iwfindia.org",
    badgeColor: "bg-slate-700",
    gender: "male",
  },
  {
    sno: 6,
    name: "Mohd. Minhaj",
    designation: "Trustee Member",
    role: "Rural Outreach & Social Welfare",
    qualification: "Graduate",
    district: "Darbhanga",
    state: "Bihar",
    email: "info@iwfindia.org",
    badgeColor: "bg-slate-700",
    gender: "male",
  },
  {
    sno: 7,
    name: "Md. Niyaz Ahmad",
    designation: "Trustee Member",
    role: "Resource Mobilisation & Program Audits",
    qualification: "Graduate",
    district: "Vaishali",
    state: "Bihar",
    email: "info@iwfindia.org",
    badgeColor: "bg-slate-700",
    gender: "male",
  },
];

const ALL_TRUSTEES = [...BOARD_PRINCIPAL_OFFICERS, ...BOARD_TRUSTEE_MEMBERS];

const EXECUTIVE_BODY = [
  {
    sno: 1,
    name: "Dr. Nasera Firdausi",
    designation: "Chief Executive Officer (CEO)",
    qualification: "PhD",
    experience: "15+ Years Social Sector",
    district: "Patna",
    state: "Bihar",
    email: "ceo@iwfindia.org",
    icon: Compass,
    color: "border-emerald-200 bg-white text-emerald-800",
    gender: "female",
  },
  {
    sno: 2,
    name: "Md. Shahid Raza",
    designation: "Chief Program Officer (CPO)",
    qualification: "Post Graduate",
    experience: "12+ Years Program Management",
    district: "Darbhanga",
    state: "Bihar",
    email: "programs@iwfindia.org",
    icon: Layers,
    color: "border-blue-200 bg-white text-blue-800",
    gender: "male",
  },
  {
    sno: 3,
    name: "Ms. Farida Khatoon",
    designation: "Program Manager — Healthcare",
    qualification: "MBBS",
    experience: "Public Health & Medical Aid",
    district: "Muzaffarpur",
    state: "Bihar",
    email: "health@iwfindia.org",
    icon: HeartPulse,
    color: "border-rose-200 bg-white text-rose-800",
    gender: "female",
  },
  {
    sno: 4,
    name: "Mr. Rajeev Tiwari",
    designation: "Program Manager — Education",
    qualification: "M.Ed",
    experience: "Curriculum & Scholarships",
    district: "Patna",
    state: "Bihar",
    email: "education@iwfindia.org",
    icon: GraduationCap,
    color: "border-amber-200 bg-white text-amber-800",
    gender: "male",
  },
  {
    sno: 5,
    name: "Ms. Anita Kumari",
    designation: "Program Manager — Women Empowerment",
    qualification: "MSW",
    experience: "SHGs & Micro-Enterprise",
    district: "Gaya",
    state: "Bihar",
    email: "women@iwfindia.org",
    icon: Users,
    color: "border-pink-200 bg-white text-pink-800",
    gender: "female",
  },
  {
    sno: 6,
    name: "Mr. Suresh Paswan",
    designation: "Finance & Accounts Officer",
    qualification: "CA (Inter)",
    experience: "Non-profit Audits & 80G/12A",
    district: "Patna",
    state: "Bihar",
    email: "finance@iwfindia.org",
    icon: Briefcase,
    color: "border-purple-200 bg-white text-purple-800",
    gender: "male",
  },
];

const ADVISORY_BODY = [
  {
    sno: 1,
    name: "Dr. Arjun Singh",
    designation: "Technical Advisor — Healthcare",
    expertise: "Public Health, Epidemiology, AIIMS Delhi Alumni",
    state: "New Delhi",
    icon: HeartPulse,
    color: "text-rose-600 bg-rose-50 border-rose-200",
    gender: "male",
  },
  {
    sno: 2,
    name: "Prof. Meena Verma",
    designation: "Academic Advisor — Education",
    expertise: "Primary Education & Pedagogy, BHU Faculty",
    state: "Uttar Pradesh",
    icon: BookOpen,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    gender: "female",
  },
  {
    sno: 3,
    name: "Mr. Vikram Joshi",
    designation: "Legal Advisor",
    expertise: "NGO Statutory Law & Fiduciary Ethics, Patna High Court",
    state: "Bihar",
    icon: Scale,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    gender: "male",
  },
  {
    sno: 4,
    name: "Ms. Shabnam Ansari",
    designation: "Gender & Social Inclusion Advisor",
    expertise: "Women Rights, Livelihood Systems, UN Consultant",
    state: "New Delhi",
    icon: Users,
    color: "text-pink-600 bg-pink-50 border-pink-200",
    gender: "female",
  },
];

const FIELD_TEAM = [
  { sno: 1, name: "Mohammad Rashid", designation: "Field Coordinator", district: "Darbhanga", state: "Bihar", sector: "Healthcare & Education", gender: "male" },
  { sno: 2, name: "Priya Kumari", designation: "Field Coordinator", district: "Muzaffarpur", state: "Bihar", sector: "Women SHGs & Skills", gender: "female" },
  { sno: 3, name: "Rahul Das", designation: "Field Coordinator", district: "Bhagalpur", state: "Bihar", sector: "Relief & Agriculture", gender: "male" },
  { sno: 4, name: "Saima Khatoon", designation: "Community Mobilizer", district: "Sitamarhi", state: "Bihar", sector: "Girl Child Education", gender: "female" },
  { sno: 5, name: "Arun Thakur", designation: "Community Mobilizer", district: "Gaya", state: "Bihar", sector: "Agrarian Livelihoods", gender: "male" },
  { sno: 6, name: "Farheen Bano", designation: "Community Mobilizer", district: "Madhubani", state: "Bihar", sector: "Preventive Healthcare", gender: "female" },
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
  const initials = name
    .replace(/(Dr\.|Mr\.|Ms\.|Prof\.|Md\.)/g, "")
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClasses =
    size === "sm"
      ? "w-9 h-9 text-xs"
      : size === "lg"
      ? "w-20 h-20 text-lg"
      : "w-14 h-14 text-sm";

  return (
    <div
      className={`relative rounded-2xl flex items-center justify-center font-black overflow-hidden shadow-2xs shrink-0 border-2 border-white/80 ring-1 ring-slate-200/80 ${sizeClasses} ${className} ${
        gender === "female"
          ? "bg-gradient-to-br from-pink-100 via-rose-100 to-amber-100 text-rose-800"
          : "bg-gradient-to-br from-slate-100 via-blue-100 to-emerald-100 text-[#0b1f3b]"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <User className={size === "sm" ? "w-3.5 h-3.5 opacity-60 mb-0.5" : size === "lg" ? "w-6 h-6 opacity-60 mb-1" : "w-4 h-4 opacity-60 mb-0.5"} />
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
                  <div className="text-2xl font-black text-amber-400 leading-tight">04</div>
                  <h4 className="font-extrabold text-xs text-white">Advisory Panel</h4>
                  <p className="text-[10px] text-slate-300">Domain Specialists</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 shadow-sm">
                  <div className="text-2xl font-black text-[#f97316] leading-tight">50+</div>
                  <h4 className="font-extrabold text-xs text-white">Field Operations</h4>
                  <p className="text-[10px] text-slate-300">Community Mobilizers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="space-y-10 py-8 px-4 md:px-8 max-w-7xl mx-auto">
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

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      viewMode === "cards"
                        ? "bg-[#0b1f3b] text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      viewMode === "table"
                        ? "bg-[#0b1f3b] text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>
              </div>

              {/* Exact Text from ISLAH.docx */}
              <div className="bg-emerald-50/70 border-l-4 border-[#15803d] p-3.5 rounded-r-xl">
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  The <strong className="text-[#0b1f3b] font-bold">Board of Trustees</strong> provides strategic direction, oversight and responsible governance to Islah Welfare Foundation (ISLAH). It safeguards the organisation’s mission, values and long-term objectives while promoting transparency, accountability and ethical stewardship.
                </p>
              </div>

              {viewMode === "cards" ? (
                <div className="space-y-4 pt-1">
                  {/* Top Row: 3 Principal Officers (Chairman, Treasurer, Secretary) */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                      Principal Officers
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {BOARD_PRINCIPAL_OFFICERS.map((trustee) => (
                        <div
                          key={trustee.sno}
                          className="bg-slate-50/90 rounded-xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:bg-white transition-all flex flex-col justify-between group"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-3">
                              <PhotoAvatar name={trustee.name} gender={trustee.gender as any} size="md" />
                              <div className="min-w-0 flex-1">
                                <span className="inline-block text-[10px] font-black text-[#15803d] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                                  {trustee.designation}
                                </span>
                                <h4 className="font-extrabold text-[#0b1f3b] text-sm mt-0.5 truncate group-hover:text-[#15803d] transition-colors">
                                  {trustee.name}
                                </h4>
                                <p className="text-[10px] text-slate-500 font-medium">
                                  {trustee.district}, {trustee.state}
                                </p>
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-600 font-medium leading-snug pt-1 border-t border-slate-200/60">
                              {trustee.role}
                            </p>
                          </div>

                          <div className="pt-2 mt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                            <span>Edu: <strong className="text-slate-700">{trustee.qualification}</strong></span>
                            <span className="font-mono text-slate-400">#{trustee.sno}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: 4 Trustee Members (4 Columns) */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                      Trustee Members
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {BOARD_TRUSTEE_MEMBERS.map((trustee) => (
                        <div
                          key={trustee.sno}
                          className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md hover:bg-white transition-all flex flex-col justify-between group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2.5">
                              <PhotoAvatar name={trustee.name} gender={trustee.gender as any} size="sm" />
                              <div className="min-w-0 flex-1">
                                <h4 className="font-extrabold text-[#0b1f3b] text-xs truncate group-hover:text-[#15803d] transition-colors">
                                  {trustee.name}
                                </h4>
                                <span className="inline-block text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                                  {trustee.designation}
                                </span>
                              </div>
                            </div>

                            <p className="text-[10px] text-slate-500 font-medium leading-tight">
                              {trustee.role}
                            </p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                            <span>{trustee.district}, {trustee.state}</span>
                            <span className="font-mono text-slate-400">#{trustee.sno}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Table View with Photo Column */
                <div className="rounded-xl border border-slate-200 overflow-hidden pt-1">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 font-black text-slate-700 uppercase tracking-wider text-[10px]">
                          <th className="p-3">#</th>
                          <th className="p-3">Photo</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Designation</th>
                          <th className="p-3">Key Focus / Portfolio</th>
                          <th className="p-3">Qualification</th>
                          <th className="p-3">Location</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {ALL_TRUSTEES.map((t) => (
                          <tr key={t.sno} className="hover:bg-slate-50">
                            <td className="p-3 font-mono font-bold text-slate-400">{t.sno}</td>
                            <td className="p-3">
                              <PhotoAvatar name={t.name} gender={t.gender as any} size="sm" />
                            </td>
                            <td className="p-3 font-bold text-[#0b1f3b]">{t.name}</td>
                            <td className="p-3">
                              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold text-[11px]">
                                {t.designation}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600">{t.role}</td>
                            <td className="p-3">{t.qualification}</td>
                            <td className="p-3 text-slate-500">{t.district}, {t.state}</td>
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
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
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

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                The <strong className="text-[#0b1f3b]">Executive Body</strong> translates board-approved policies into actionable social development initiatives, overseeing day-to-day operations, program execution, budget allocation, field teams, and community partnerships.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                {EXECUTIVE_BODY.map((exec) => {
                  const Icon = exec.icon;
                  return (
                    <div
                      key={exec.sno}
                      className="rounded-xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group bg-slate-50/70"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <PhotoAvatar name={exec.name} gender={exec.gender as any} size="md" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                {exec.qualification}
                              </span>
                              <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[#0b1f3b]">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                            </div>
                            <h4 className="font-extrabold text-[#0b1f3b] text-sm truncate group-hover:text-brand-orange transition-colors">
                              {exec.name}
                            </h4>
                            <span className="block text-[11px] font-bold text-[#f97316] truncate">
                              {exec.designation}
                            </span>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-500 font-medium leading-snug">
                          {exec.experience}
                        </p>
                      </div>

                      <div className="pt-2 mt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-500">
                        <span>{exec.district}, {exec.state}</span>
                        <a
                          href={`mailto:${exec.email}`}
                          className="font-mono text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          {exec.email}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ─── Tier 3: Advisory Body ───────────────────────────────────────── */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
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

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our <strong className="text-[#0b1f3b]">Advisory Panel</strong> comprises distinguished medical, academic, legal, and social sector leaders providing strategic guidance and domain expertise.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
                {ADVISORY_BODY.map((advisor) => {
                  const Icon = advisor.icon;
                  return (
                    <div
                      key={advisor.sno}
                      className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md hover:bg-white transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <PhotoAvatar name={advisor.name} gender={advisor.gender as any} size="sm" />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-extrabold text-[#0b1f3b] text-xs truncate">
                              {advisor.name}
                            </h4>
                            <span className="block text-[10px] font-bold text-slate-700 truncate">
                              {advisor.designation}
                            </span>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-500 font-medium mt-1 leading-snug">
                          {advisor.expertise}
                        </p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-200 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        {advisor.state}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ─── Tier 4: Field Team & Grassroots Force ───────────────────────── */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                {FIELD_TEAM.map((member) => (
                  <div
                    key={member.sno}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 hover:bg-white transition"
                  >
                    <PhotoAvatar name={member.name} gender={member.gender as any} size="sm" />
                    <div className="min-w-0 flex-1">
                      <h5 className="font-bold text-slate-900 text-xs truncate">{member.name}</h5>
                      <p className="text-[10px] text-[#15803d] font-semibold">{member.designation}</p>
                      <p className="text-[9px] text-slate-500 truncate">{member.district}, {member.state} • {member.sector}</p>
                    </div>
                  </div>
                ))}
              </div>
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

