import { useState } from "react";
import { Shield, CheckCircle2, BarChart2, Monitor, Users, FileText, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";

const GOVERNANCE_TIERS = [
  {
    tier: "Tier 1",
    title: "Board of Trustees",
    role: "Policy & Oversight",
    color: "#15803d",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    desc: "The apex governing body of IWF. Responsible for setting strategic direction, approving annual budgets, reviewing audit reports, and ensuring compliance with the Trust Deed and applicable laws.",
    responsibilities: [
      "Annual general body meetings (minimum twice yearly)",
      "Approval of budgets, programs, and policies",
      "Appointment of Chief Executive Officer",
      "Review of audited financial statements",
      "Amendment of Trust Deed (if required)",
    ],
  },
  {
    tier: "Tier 2",
    title: "Executive Committee",
    role: "Program Management",
    color: "#ea580c",
    bg: "#FFF7ED",
    border: "#FED7AA",
    desc: "Chaired by the CEO, the Executive Committee translates board-level decisions into actionable programs. It oversees day-to-day operations, coordinates program teams, and manages partnerships.",
    responsibilities: [
      "Monthly operational review meetings",
      "Program design, implementation, and monitoring",
      "Budget management and fund utilization",
      "Coordination with field teams and partners",
      "Quarterly reporting to the Board",
    ],
  },
  {
    tier: "Tier 3",
    title: "Program Teams",
    role: "Sector Implementation",
    color: "#1D4ED8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    desc: "Specialized teams for each sector (Healthcare, Education, Women Empowerment, Skill Development, etc.) led by Program Managers. Each team maintains sector-specific MIS and reports to the Executive Committee.",
    responsibilities: [
      "Sector-specific program delivery",
      "Beneficiary registration and tracking",
      "Monthly MIS reports to Executive Committee",
      "Community engagement and outreach",
      "Documentation of success stories and outcomes",
    ],
  },
  {
    tier: "Tier 4",
    title: "Field Teams",
    role: "Ground Implementation",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    desc: "Community-level coordinators and mobilizers who directly interact with beneficiaries. They are the frontline workers who ensure last-mile delivery of all IWF programs.",
    responsibilities: [
      "Direct beneficiary identification and registration",
      "Camp and event coordination",
      "Community mobilization and awareness",
      "Weekly field reports to Program Managers",
      "Feedback collection and grievance handling",
    ],
  },
];

const CREDIBILITY_NORMS = [
  "Annual audit by independent Chartered Accountant",
  "Internal audit by Finance & Accounts team quarterly",
  "Annual reports published and made publicly available",
  "FCRA compliance for foreign contributions",
  "80G certification for donor tax exemption",
  "Utilization certificates submitted to all grantors",
  "Board meeting minutes maintained and filed",
  "All trustees, staff declarations of conflict of interest",
];

const MONITORING_SYSTEMS = [
  { title: "MIS — Management Information System", desc: "Centralized digital database tracking all beneficiaries, programs, and outcomes in real time.", icon: Monitor },
  { title: "Field Monitoring Visits", desc: "Regular on-site verification visits by Program Managers to field locations at least monthly.", icon: Users },
  { title: "Third-Party Evaluation", desc: "Annual independent program evaluation by external agencies to assess impact and recommend improvements.", icon: BarChart2 },
  { title: "Community Feedback Mechanism", desc: "Grievance boxes, helpline, and community meetings to collect direct feedback from beneficiaries.", icon: FileText },
];

const AUDIT_SYSTEM = [
  { level: "Internal Audit", frequency: "Quarterly", agency: "Internal Finance Team", scope: "Vouchers, receipts, expenditure verification" },
  { level: "Statutory Audit", frequency: "Annual", agency: "Independent CA Firm", scope: "Full financial statements per Companies Act / Trust Act" },
  { level: "Program Audit", frequency: "Annual", agency: "External Evaluators", scope: "Program outcomes, impact assessment, value for money" },
  { level: "FCRA Audit", frequency: "Annual", agency: "CA with FCRA expertise", scope: "Foreign contribution utilization and compliance" },
];

function CollapsibleCard({ title, children, badge, badgeColor = "#15803d" }: {
  title: string; children: React.ReactNode; badge: string; badgeColor?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-5">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: badgeColor }}>{badge}</span>
          <h3 className="font-extrabold text-brand-green-dark text-base text-left">{title}</h3>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-6 pb-6 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}

export default function GovernancePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <SubpageHeroCarousel
        tag="ABOUT ISLAH"
        title="Governance & Transparency"
        subtitle="Robust Institutional Architecture, Accountability Systems & Operational Credibility."
        breadcrumbs={[
          { label: "About Us", href: "/about" },
          { label: "Governance & Transparency" },
        ]}
      />
      <main>
        <section className="py-14 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">

            {/* 4-tier governance */}
            <ScrollReveal>
              <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Structure</p>
                <h2 className="text-2xl font-extrabold text-brand-green-dark mb-2">4-Tier Decision System</h2>
                <p className="text-slate-500 text-sm max-w-2xl">IWF's governance follows a clear hierarchy ensuring accountability at every level — from strategy to last-mile delivery.</p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5 mb-12">
              {GOVERNANCE_TIERS.map((tier) => (
                <ScrollReveal key={tier.tier}>
                  <div className="rounded-2xl border-2 p-6 h-full" style={{ borderColor: tier.border, backgroundColor: tier.bg }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: tier.color }}>{tier.tier}</span>
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-sm">{tier.title}</h3>
                        <p className="text-xs font-semibold" style={{ color: tier.color }}>{tier.role}</p>
                      </div>
                    </div>
                    <div className="w-full h-0.5 rounded-full mb-3" style={{ backgroundColor: tier.color, opacity: 0.2 }} />
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{tier.desc}</p>
                    <ul className="space-y-1">
                      {tier.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" style={{ color: tier.color }} /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Credibility Norms */}
            <CollapsibleCard title="Credibility Norms & Standards" badge="Compliance" badgeColor="#15803d">
              <div className="grid sm:grid-cols-2 gap-3">
                {CREDIBILITY_NORMS.map((norm) => (
                  <div key={norm} className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <Shield className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-green" />
                    <span className="text-xs text-slate-700">{norm}</span>
                  </div>
                ))}
              </div>
            </CollapsibleCard>

            {/* Monitoring Systems */}
            <CollapsibleCard title="Project Management & Monitoring" badge="M&E" badgeColor="#ea580c">
              <div className="grid sm:grid-cols-2 gap-4">
                {MONITORING_SYSTEMS.map(({ title, desc, icon: Icon }) => (
                  <div key={title} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 mb-1">{title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleCard>

            {/* Audit System */}
            <CollapsibleCard title="4-Tier Audit System" badge="Audit" badgeColor="#1D4ED8">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      {["Level", "Frequency", "Agency", "Scope"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {AUDIT_SYSTEM.map((row, i) => (
                      <tr key={row.level} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                        <td className="px-4 py-3 font-bold text-slate-800">{row.level}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green font-semibold">{row.frequency}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{row.agency}</td>
                        <td className="px-4 py-3 text-slate-600">{row.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CollapsibleCard>

            {/* Technology for Governance */}
            <CollapsibleCard title="Technology for Governance" badge="Tech" badgeColor="#7C3AED">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { emoji: "🖥️", title: "Digital MIS", desc: "Beneficiary database, program tracking, and outcomes management in a centralized digital system." },
                  { emoji: "📊", title: "Financial Dashboard", desc: "Real-time budget tracking, fund utilization, and expenditure reports available to Board members." },
                  { emoji: "📱", title: "Field Data Collection", desc: "Mobile-based data collection by field coordinators for real-time program monitoring." },
                ].map(({ emoji, title, desc }) => (
                  <div key={title} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div className="text-3xl mb-2">{emoji}</div>
                    <p className="text-xs font-bold text-slate-800 mb-1">{title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </CollapsibleCard>

          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-xl font-extrabold text-brand-green-dark mb-2">Annual Reports & Transparency Documents</h2>
            <p className="text-slate-500 text-sm mb-6">All financial reports, audit statements, and annual reports are publicly available.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-green-dark transition shadow-md">
                <FileText className="w-4 h-4" /> Request Documents
              </a>
              <a href="/donate" className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-orange-dark transition shadow-md">
                Donate Now <ArrowRight className="w-4 h-4" />
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
