import { useState, useMemo } from "react";
import {
  ShieldCheck,
  Search,
  FileText,
  Scale,
  Lock,
  HeartHandshake,
  Heart,
  Users,
  Building2,
  Award,
  ArrowRight,
  Filter,
  Download,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

interface PolicyItem {
  id: string;
  title: string;
  category: "Legal & General" | "Governance & Ethics" | "Programs & Operations" | "Supporters & Engagement";
  desc: string;
  href: string;
  icon: any;
}

const ALL_POLICIES: PolicyItem[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    category: "Legal & General",
    desc: "Explains how Islah collects, uses, stores, and safeguards visitor and donor personal data.",
    href: "/privacy-policy",
    icon: Lock,
  },
  {
    id: "refund-policy",
    title: "Refund & Cancellation Policy",
    category: "Legal & General",
    desc: "Terms governing voluntary contributions, refund eligibility, and transaction cancellations.",
    href: "/refund-policy",
    icon: Scale,
  },
  {
    id: "terms-and-conditions",
    title: "Terms & Conditions",
    category: "Legal & General",
    desc: "General conditions governing website usage, intellectual property, and organization guidelines.",
    href: "/terms-and-conditions",
    icon: FileText,
  },
  {
    id: "cookie-policy",
    title: "Cookie Policy",
    category: "Legal & General",
    desc: "Details how cookies and tracking technologies are utilized to enhance visitor experience.",
    href: "/cookie-policy",
    icon: FileText,
  },
  {
    id: "disclaimer",
    title: "Disclaimer & Legal Notice",
    category: "Legal & General",
    desc: "General informational disclaimer regarding program timelines, operational scope, and website content.",
    href: "/disclaimer",
    icon: ShieldCheck,
  },
  {
    id: "code-of-conduct",
    title: "Code of Conduct",
    category: "Governance & Ethics",
    desc: "Ethical standards, professional values, and behavioral guidelines for everyone associated with Islah.",
    href: "/code-of-conduct",
    icon: ShieldCheck,
  },
  {
    id: "governance-policy",
    title: "Governance Policy",
    category: "Governance & Ethics",
    desc: "Four-tier organizational framework guiding Trustees, Advisory Board, and Executive leadership.",
    href: "/governance-policy",
    icon: Building2,
  },
  {
    id: "financial-transparency-policy",
    title: "Financial Transparency Policy",
    category: "Governance & Ethics",
    desc: "Principles of responsible stewardship, computerized accounting controls, and statutory audit compliance.",
    href: "/financial-transparency-policy",
    icon: Award,
  },
  {
    id: "anti-fraud-policy",
    title: "Anti-Fraud & Anti-Corruption Policy",
    category: "Governance & Ethics",
    desc: "Zero-tolerance rules against fraud, bribery, embezzlement, or abuse of organizational authority.",
    href: "/anti-fraud-policy",
    icon: ShieldCheck,
  },
  {
    id: "grievance-policy",
    title: "Grievance Redressal Policy",
    category: "Governance & Ethics",
    desc: "Fair, transparent, and confidential procedure for addressing concerns from beneficiaries, donors, and partners.",
    href: "/grievance-policy",
    icon: Scale,
  },
  {
    id: "child-protection-policy",
    title: "Child Protection & Safeguarding Policy",
    category: "Programs & Operations",
    desc: "Zero-tolerance rules against abuse, neglect, exploitation, or harm across all child & youth programs.",
    href: "/child-protection-policy",
    icon: Heart,
  },
  {
    id: "medical-treatment-policy",
    title: "Fundraising for Critical Medical Treatment Policy",
    category: "Programs & Operations",
    desc: "Governing direct hospital disbursements, cost allocations, shortfall management, and surplus transfers.",
    href: "/medical-treatment-policy",
    icon: HeartHandshake,
  },
  {
    id: "employment-policy",
    title: "Employment Policy",
    category: "Programs & Operations",
    desc: "Equal opportunity recruitment standards, workplace safety, performance feedback, and staff conduct.",
    href: "/employment-policy",
    icon: Users,
  },
  {
    id: "donation-policy",
    title: "Donation Policy",
    category: "Supporters & Engagement",
    desc: "Terms governing voluntary donations, Section 80G tax exemptions, and Form 10BE certificate issuance.",
    href: "/donation-policy",
    icon: Heart,
  },
  {
    id: "volunteer-policy",
    title: "Volunteer Policy",
    category: "Supporters & Engagement",
    desc: "Rights, expectations, eligibility, safety procedures, and recognition for Islah volunteers.",
    href: "/volunteer-policy",
    icon: Users,
  },
  {
    id: "partnership-policy",
    title: "Partnership Policy",
    category: "Supporters & Engagement",
    desc: "Guidelines for CSR corporate, government, NGO, institutional, and grant collaborations.",
    href: "/partnership-policy",
    icon: HeartHandshake,
  },
  {
    id: "sponsorship-policy",
    title: "Sponsorship Policy",
    category: "Supporters & Engagement",
    desc: "Rules for program, project, event, and in-kind sponsorships and sponsor recognition.",
    href: "/sponsorship-policy",
    icon: Building2,
  },
  {
    id: "mentorship-policy",
    title: "Mentorship Policy",
    category: "Supporters & Engagement",
    desc: "Framework for connecting rural students, youth, and women with experienced professional mentors.",
    href: "/mentorship-policy",
    icon: Users,
  },
  {
    id: "membership-policy",
    title: "Membership Policy",
    category: "Supporters & Engagement",
    desc: "Principles, rights, categories, responsibilities, fees, duration, and conduct for Islah members.",
    href: "/membership-policy",
    icon: Award,
  },
];

const CATEGORIES = [
  "All Policies",
  "Legal & General",
  "Governance & Ethics",
  "Programs & Operations",
  "Supporters & Engagement",
];

export default function MasterPoliciesPage() {
  const [activeCategory, setActiveCategory] = useState("All Policies");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const filteredPolicies = useMemo(() => {
    return ALL_POLICIES.filter((p) => {
      const matchCat = activeCategory === "All Policies" || p.category === activeCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Section with Subpage Carousel (Matching About Us Page) */}
        <SubpageHeroCarousel
          tag="TRANSPARENCY & ACCOUNTABILITY"
          title="Organizational Policies & Governance"
          subtitle="Explore the complete directory of official policies, operational codes, legal disclaimers, and governance frameworks governing Islah Welfare Foundation."
          breadcrumbs={[
            { label: "Governance & Transparency", href: "/about/governance" },
            { label: "Official Policies" },
          ]}
        />

        {/* Master Policy Catalog */}
        <section className="py-10 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Official Legal Compendium Download Banner */}
            <div className="rounded-2xl border border-orange-200/90 bg-gradient-to-r from-orange-50 via-white to-amber-50/70 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official Statutory Compendium</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0b1f3b]">
                  Download Complete Statutory Policies Compendium (PDF)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  Official 50-page compendium containing all 18 institutional policies, anti-fraud safeguards, governance bylaws, and compliance disclosures.
                </p>
              </div>
              <a
                href="https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/docs/islah_annual_report_latest.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-orange/20 transition cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF (4.3 MB)</span>
              </a>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition ${
                        isActive
                          ? "bg-orange-50 border-brand-orange text-[#0b1f3b]"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <div className="relative w-full lg:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search policies"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15"
                />
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Showing {filteredPolicies.length} of {ALL_POLICIES.length} policies
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPolicies.map((pol) => {
                const Icon = pol.icon;
                return (
                  <a
                    key={pol.id}
                    href={pol.href}
                    className="group rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-md transition flex flex-col"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-9 h-9 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-[#0b1f3b] leading-snug">
                          {pol.title}
                        </h3>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 mt-0.5">
                          {pol.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3 flex-1">{pol.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange mt-4">
                      Read policy
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </span>
                  </a>
                );
              })}
              {filteredPolicies.length === 0 && (
                <p className="text-sm text-slate-500 sm:col-span-2 lg:col-span-3">
                  No policy matches “{searchQuery}”.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#0b1f3b]">Statutory compliance</p>
                <p className="text-sm text-slate-600">
                  Policies are reviewed regularly to comply with Indian law, including trust registration, 12A, 80G and FCRA 2010.
                </p>
              </div>
              <a
                href="/about/legal-status"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:underline shrink-0"
              >
                Registration &amp; certificates
                <ArrowRight className="w-3.5 h-3.5" />
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
