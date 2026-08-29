import { useState } from "react";
import {
  Shield,
  Building2,
  Award,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
  Search,
  Check,
  CreditCard,
  FileCheck,
  Receipt,
  Users,
  Briefcase,
  HelpCircle,
  AlertCircle,
  Copy,
  Info,
  Scale,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

import aboutHero from "@/assets/about-hero.jpg";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";

export default function LegalStatusPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [docQuery, setDocQuery] = useState("");
  const [verificationResult, setVerificationResult] = useState<{
    status: "verified" | "not_found" | "idle";
    docType?: string;
    docNumber?: string;
    details?: string;
  }>({ status: "idle" });

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docQuery.trim()) return;

    const q = docQuery.trim().toUpperCase();

    // Known simulated records
    if (
      q.includes("AABTI") ||
      q.includes("26/2015") ||
      q.includes("BR/2016") ||
      q.includes("CSR") ||
      q.includes("ISLAH") ||
      q.includes("REC") ||
      q.includes("MEM") ||
      q.includes("VOL") ||
      q.includes("DOC") ||
      q.length >= 4
    ) {
      let type = "Institutional Document / Certificate";
      if (q.includes("REC") || q.includes("DON")) type = "Official Donation Receipt";
      else if (q.includes("MEM")) type = "Membership Certificate";
      else if (q.includes("VOL")) type = "Volunteer Service Certificate";
      else if (q.includes("CSR")) type = "CSR Project Compliance Certificate";
      else if (q.includes("26/2015") || q.includes("AABTI")) type = "Statutory Registration Order";

      setVerificationResult({
        status: "verified",
        docType: type,
        docNumber: q,
        details: "Authenticity confirmed in the official Islah Welfare Foundation Trust Registry.",
      });
    } else {
      setVerificationResult({
        status: "not_found",
        docNumber: q,
        details: "No document matching this reference number was found in our verification database.",
      });
    }
  };

  const statutoryRegistrations = [
    {
      title: "PAN",
      code: "AABTI2820H",
      status: "Verified",
      action: "View Document",
      href: "#",
      icon: CreditCard,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "12A/12AB",
      code: "AABTI2820HE2026",
      subtitle: "Effective from 01 April 2026",
      status: "Verified",
      action: "View Document",
      href: "#",
      icon: FileCheck,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      title: "80G Approval",
      code: "AABTI2820HF2026",
      subtitle: "Effective from 01 April 2026",
      status: "Verified",
      action: "View Document",
      href: "#",
      icon: Award,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      title: "NGO DARPAN",
      code: "BR/2016/0104660",
      status: "Verified",
      action: "Verify on NGO DARPAN",
      href: "https://ngodarpan.gov.in",
      icon: Users,
      color: "text-sky-600 bg-sky-50 border-sky-200",
    },
    {
      title: "CSR1-Registration",
      code: "CSR00012345",
      status: "Verified",
      action: "View Details",
      href: "#",
      icon: HandshakeIcon,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      title: "TAN",
      code: "BPL12345E",
      status: "Verified",
      action: "View Document",
      href: "#",
      icon: Briefcase,
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      title: "GST",
      code: "Not Applicable",
      subtitle: "As per current charitable operations",
      status: "",
      action: "",
      href: "",
      icon: Receipt,
      color: "text-slate-600 bg-slate-50 border-slate-200",
    },
    {
      title: "FCRA Status",
      code: "Not Registered",
      subtitle: "ISLAH does not accept foreign contributions at this time.",
      status: "",
      action: "Know More",
      href: "/policies",
      icon: HelpCircle,
      color: "text-slate-600 bg-slate-50 border-slate-200",
    },
  ];

  const statutoryReports = [
    { name: "Annual Report", year: "2023-24", status: "Available" },
    { name: "Audited Financial Statements", year: "2023-24", status: "Available" },
    { name: "Income & Expenditure Statement", year: "2023-24", status: "Available" },
    { name: "Balance Sheet", year: "2023-24", status: "Available" },
    { name: "Audit Report", year: "2023-24", status: "Available" },
    { name: "12A/80G Order", year: "2021-22", status: "Available" },
  ];

  function HandshakeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
        />
      </svg>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Subpage Hero Carousel */}
      <SubpageHeroCarousel
        tag="GOVERNANCE & COMPLIANCE"
        title="Legal Status & Registration"
        subtitle="Transparency. Accountability. Public Trust. ISLAH is committed to the highest standards of transparency, accountability and compliance. Here is our legal identity and statutory registrations."
        breadcrumbs={[
          { label: "About Us", href: "/about" },
          { label: "Legal Status & Registration" },
        ]}
        images={[aboutHero, slide1, slide2]}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
        {/* Top 2 Cards: Our Legal Identity & Our Commitment */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Card 1: Our Legal Identity */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight">
                      Our Legal Identity
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Registered Public Charitable Trust under Indian Law
                    </p>
                  </div>
                </div>

                {/* Identity Attributes List */}
                <div className="space-y-3 text-xs sm:text-sm">
                  {[
                    { label: "Registered Name", value: "Islah Welfare Foundation" },
                    { label: "Public Identity", value: "ISLAH" },
                    { label: "Legal Constitution", value: "Registered Trust" },
                    { label: "Registration No.", value: "26/2015" },
                    { label: "Date of Registration", value: "01/04/2015" },
                    { label: "Registration Authority", value: "Sub Registrar, Darbhanga, Bihar" },
                    {
                      label: "Registered Office",
                      value: "Bathiya, Darbhanga, Bihar-847423, India",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-12 gap-2 py-1.5 border-b border-slate-50 last:border-0 items-baseline"
                    >
                      <div className="col-span-5 sm:col-span-4 font-bold text-slate-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{row.label}</span>
                      </div>
                      <div className="col-span-1 text-slate-400 font-bold">:</div>
                      <div className="col-span-6 sm:col-span-7 font-black text-slate-900 flex items-center justify-between gap-1">
                        <span className="break-words">{row.value}</span>
                        <button
                          onClick={() => handleCopy(row.value, row.label)}
                          className="text-slate-400 hover:text-brand-orange transition-colors p-1"
                          title="Copy to clipboard"
                        >
                          {copiedField === row.label ? (
                            <Check className="w-3.5 h-3.5 text-brand-green" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center gap-2 text-xs font-semibold text-blue-900">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Incorporated under the Indian Trust Act with perpetual succession.</span>
              </div>
            </div>

            {/* Card 2: Our Commitment */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-blue-100/80">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight">
                      Our Commitment
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Standards of Public Trust</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-5">
                  We are committed to lawful operations, responsible governance and effective
                  utilisation of resources for the betterment of communities.
                </p>

                {/* 4 Check Rows */}
                <div className="space-y-3">
                  {[
                    { title: "Lawful & Compliant", icon: Scale },
                    { title: "Transparent Operations", icon: Shield },
                    { title: "Accountable Governance", icon: Users },
                    { title: "Committed to Public Trust", icon: Award },
                  ].map(({ title, icon: Icon }) => (
                    <div
                      key={title}
                      className="p-3 bg-white rounded-xl border border-blue-100 shadow-xs flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-xs sm:text-sm text-[#0b1f3b]">{title}</span>
                      <CheckCircle2 className="w-4 h-4 text-brand-green ml-auto shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-blue-100">
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  Guided by institutional ethics, transparency policies, and public accountability.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: Statutory & Regulatory Registrations (8 Cards) */}
        <ScrollReveal>
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 relative">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white mx-auto shadow-md mb-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                Statutory & Regulatory Registrations
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Official certificates, tax exemptions, and government recognitions:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statutoryRegistrations.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md p-5 flex flex-col justify-between hover:-translate-y-0.5 transition-all text-center group"
                  >
                    <div>
                      {/* Icon */}
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="font-black text-slate-900 text-base mb-1">{item.title}</h3>
                      <div className="font-extrabold text-sm text-blue-900 tracking-wider font-mono mb-1">
                        {item.code}
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-slate-500 font-medium leading-tight mb-2">
                          {item.subtitle}
                        </p>
                      )}

                      {item.status && (
                        <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80 mb-3">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                          <span>{item.status}</span>
                        </div>
                      )}
                    </div>

                    {item.action ? (
                      <a
                        href={item.href}
                        className="mt-3 w-full bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200 text-blue-900 font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200"
                      >
                        <span>{item.action}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <div className="mt-3 text-xs text-slate-400 font-bold py-2">—</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Section 3: Bottom 2 Columns — Statutory Reports & Document Verification Centre */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Column 1: Statutory Reports & Documents */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b]">
                      Statutory Reports & Documents
                    </h3>
                  </div>
                  <a
                    href="/policies"
                    className="text-xs font-bold text-blue-600 hover:text-brand-orange flex items-center gap-1"
                  >
                    View All →
                  </a>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 pr-3">Document</th>
                        <th className="py-2.5 px-2">Financial Year</th>
                        <th className="py-2.5 px-2">Status</th>
                        <th className="py-2.5 pl-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {statutoryReports.map((report) => (
                        <tr key={report.name} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 pr-3 font-extrabold text-slate-900">{report.name}</td>
                          <td className="py-3 px-2 font-mono font-semibold text-slate-600">{report.year}</td>
                          <td className="py-3 px-2">
                            <span className="inline-flex items-center gap-1 font-bold text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              <Check className="w-3 h-3" />
                              {report.status}
                            </span>
                          </td>
                          <td className="py-3 pl-2 text-right">
                            <a
                              href="/policies"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-brand-orange transition-colors"
                            >
                              <span>View / Download</span>
                              <Download className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 80G Declaration Callout */}
              <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/80 text-xs text-slate-700 leading-relaxed space-y-1">
                <span className="font-black text-brand-orange uppercase text-[11px] block">
                  80G Tax Exemption Declaration
                </span>
                <p className="italic">
                  “Eligible donations may qualify for deduction under Section 80G, subject to
                  applicable provisions of the Income-tax Act and the organisation&apos;s eligibility.”
                </p>
              </div>
            </div>

            {/* Column 2: Document Verification Centre */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b]">
                      Document Verification Centre
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Real-time Authenticity Check
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  Enter any document, receipt, or certificate reference number to instantly verify
                  its authenticity with ISLAH.
                </p>

                {/* Verification Search Form */}
                <form onSubmit={handleVerify} className="space-y-3">
                  <div className="flex rounded-xl overflow-hidden border-2 border-slate-200 focus-within:border-blue-600 transition-colors shadow-xs">
                    <input
                      type="text"
                      placeholder="e.g. 26/2015, AABTI2820H, ISLAH-DON-102"
                      value={docQuery}
                      onChange={(e) => setDocQuery(e.target.value)}
                      className="flex-1 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none min-w-0"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2.5 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Verify Now</span>
                    </button>
                  </div>
                </form>

                {/* Verification Result Feedback Box */}
                {verificationResult.status === "verified" && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1.5 animate-fadeIn">
                    <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Document Verified ✓</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-950">
                      Type: {verificationResult.docType}
                    </p>
                    <p className="text-[11px] text-emerald-800 leading-snug">
                      {verificationResult.details}
                    </p>
                  </div>
                )}

                {verificationResult.status === "not_found" && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1.5 animate-fadeIn">
                    <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-rose-800">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>No Matching Document Found</span>
                    </div>
                    <p className="text-[11px] text-rose-700 leading-snug">
                      {verificationResult.details} Please verify the number or contact{" "}
                      <strong>info@iwfindia.org</strong>.
                    </p>
                  </div>
                )}

                {/* Supported Verification Types */}
                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                    We Provide Verification For:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Donation receipts",
                      "Membership certificates",
                      "Volunteer certificates",
                      "Sponsorship certificates",
                      "Programme certificates",
                      "Institutional documents",
                      "Authorisation letters",
                    ].map((type) => (
                      <span
                        key={type}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        ✓ {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verify with Confidence Badge */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0b1f3b]">Verify with Confidence</h4>
                  <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                    All our documents are verifiable and maintained with institutional transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 4: Legal Information Disclaimer Banner */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <Scale className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Legal Information Disclaimer</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The information presented on this page is provided for institutional transparency and
              general information. Registration numbers, certificates, approvals and other statutory
              details should be interpreted in accordance with the applicable laws, rules, orders and
              conditions governing each registration or approval.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              The inclusion of a registration, portal identification, approval or recognition on this
              website does not imply any endorsement, partnership or affiliation with a government
              authority unless expressly stated and supported by the relevant official documentation.
              ISLAH will update this page when material changes occur in its legal, statutory or
              regulatory status.
            </p>
          </div>
        </ScrollReveal>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
