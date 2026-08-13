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
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

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
    desc: "Explains how IWF collects, uses, stores, and safeguards visitor and donor personal data.",
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
    desc: "Ethical standards, professional values, and behavioral guidelines for everyone associated with IWF.",
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
    desc: "Rights, expectations, eligibility, safety procedures, and recognition for IWF volunteers.",
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
        {/* Hero Header */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white py-16 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-brand-orange/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Transparency & Accountability</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              ORGANIZATIONAL POLICIES & GOVERNANCE
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Explore the complete directory of official policies, operational codes, legal disclaimers, and governance frameworks governing Islah Welfare Foundation.
            </p>
          </div>
        </section>

        {/* Master Policy Catalog */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
            {/* Sidebar Categories */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-extrabold text-[#0b1f3b] text-base uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Filter className="w-4 h-4 text-brand-orange" /> Policy Categories
                </h3>
                <div className="flex flex-col gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left text-xs font-bold px-3.5 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                          isActive
                            ? "bg-brand-green text-white shadow-sm"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Statutory Info Box */}
              <div className="bg-gradient-to-br from-[#0b1f3b] to-[#15803d] text-white rounded-2xl p-6 shadow-md space-y-3">
                <h4 className="font-bold text-sm uppercase tracking-wider">Statutory Compliance</h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  All policies are regularly reviewed to comply with statutory norms under Indian laws including Trust Registration, 12A, 80G, and FCRA 2010.
                </p>
                <a
                  href="/about/legal-status"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline pt-1"
                >
                  <span>View Registration & Certificates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Policy List Grid */}
            <div className="lg:col-span-9 space-y-6">
              {/* Search & Filter Header */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search policy name or topic..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Showing {filteredPolicies.length} Policies
                </div>
              </div>

              {/* Policies Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPolicies.map((pol) => {
                  const Icon = pol.icon;
                  return (
                    <ScrollReveal key={pol.id}>
                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                              {pol.category}
                            </span>
                            <Icon className="w-5 h-5 text-brand-orange" />
                          </div>
                          <h3 className="text-base font-bold text-[#0b1f3b] group-hover:text-brand-green transition-colors">
                            {pol.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {pol.desc}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 mt-5">
                          <a
                            href={pol.href}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:text-brand-green-dark uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                          >
                            <span>Read Full Policy Document</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
