import { useState, useEffect } from "react";
import {
  Users,
  Shield,
  BookOpen,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Table,
  LayoutGrid,
  MapPin,
  GraduationCap,
  Award,
} from "lucide-react";
import {
  Footer, Header, NotificationTicker, RoleFormModal, UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface MemberItem {
  sno: number;
  name: string;
  designation: string;
  qualification?: string;
  expertise?: string;
  district?: string;
  state?: string;
  mobile?: string;
  email?: string;
}

const BOARD_OF_TRUSTEES: MemberItem[] = [
  { sno: 1, name: "Md. Imteyazullah", designation: "Chairman", qualification: "Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "chairman@iwfindia.org" },
  { sno: 2, name: "Md. Azizullah", designation: "Treasurer", qualification: "Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "treasurer@iwfindia.org" },
  { sno: 3, name: "Md. Jamshed Alam", designation: "Secretary", qualification: "Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "secretary@iwfindia.org" },
  { sno: 4, name: "Md. Asghar Imam", designation: "Member", qualification: "Post Graduate", district: "Muzaffarpur", state: "Bihar", mobile: "9811861633", email: "info@iwfindia.org" },
  { sno: 5, name: "Md. Mustafa", designation: "Member", qualification: "Graduate", district: "Sitamarhi", state: "Bihar", mobile: "9811861633", email: "info@iwfindia.org" },
  { sno: 6, name: "Mohd. Minhaj", designation: "Member", qualification: "Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "info@iwfindia.org" },
  { sno: 7, name: "Md. Niyaz Ahmad", designation: "Member", qualification: "Graduate", district: "Vaishali", state: "Bihar", mobile: "9811861633", email: "info@iwfindia.org" },
];

const EXECUTIVE_BODY: MemberItem[] = [
  { sno: 1, name: "Dr. Nasera Firdausi", designation: "Chief Executive Officer (CEO)", qualification: "PhD", district: "Patna", state: "Bihar", mobile: "9811861633", email: "ceo@iwfindia.org" },
  { sno: 2, name: "Md. Shahid Raza", designation: "Chief Program Officer (CPO)", qualification: "Post Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "programs@iwfindia.org" },
  { sno: 3, name: "Ms. Farida Khatoon", designation: "Program Manager — Healthcare", qualification: "MBBS", district: "Muzaffarpur", state: "Bihar", mobile: "9811861633", email: "health@iwfindia.org" },
  { sno: 4, name: "Mr. Rajeev Tiwari", designation: "Program Manager — Education", qualification: "M.Ed", district: "Patna", state: "Bihar", mobile: "9811861633", email: "education@iwfindia.org" },
  { sno: 5, name: "Ms. Anita Kumari", designation: "Program Manager — Women Empowerment", qualification: "MSW", district: "Gaya", state: "Bihar", mobile: "9811861633", email: "women@iwfindia.org" },
  { sno: 6, name: "Mr. Suresh Paswan", designation: "Finance & Accounts Officer", qualification: "CA", district: "Patna", state: "Bihar", mobile: "9811861633", email: "finance@iwfindia.org" },
];

const ADVISORY_BODY: MemberItem[] = [
  { sno: 1, name: "Dr. Arjun Singh", designation: "Technical Advisor — Healthcare", expertise: "Public Health, AIIMS Delhi Alumni", state: "Delhi" },
  { sno: 2, name: "Prof. Meena Verma", designation: "Academic Advisor — Education", expertise: "Primary Education, BHU Faculty", state: "Uttar Pradesh" },
  { sno: 3, name: "Mr. Vikram Joshi", designation: "Legal Advisor", expertise: "NGO Law, Patna High Court", state: "Bihar" },
  { sno: 4, name: "Ms. Shabnam Ansari", designation: "Gender & Social Inclusion Advisor", expertise: "Women Rights, UN Consultant", state: "Delhi" },
];

const FIELD_TEAM: MemberItem[] = [
  { sno: 1, name: "Mohammad Rashid", designation: "Field Coordinator — Darbhanga", district: "Darbhanga", state: "Bihar" },
  { sno: 2, name: "Priya Kumari", designation: "Field Coordinator — Muzaffarpur", district: "Muzaffarpur", state: "Bihar" },
  { sno: 3, name: "Rahul Das", designation: "Field Coordinator — Bhagalpur", district: "Bhagalpur", state: "Bihar" },
  { sno: 4, name: "Saima Khatoon", designation: "Community Mobilizer — Sitamarhi", district: "Sitamarhi", state: "Bihar" },
  { sno: 5, name: "Arun Thakur", designation: "Community Mobilizer — Gaya", district: "Gaya", state: "Bihar" },
];

// ─── Shared Components ────────────────────────────────────────────────────────

function SectionBadge({ label }: { label: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">{label}</p>
  );
}

function MemberCardsGrid({
  items,
  badgeColor,
}: {
  items: MemberItem[];
  badgeColor: string;
}) {
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/50">
      {items.map((m) => {
        const initials =
          m.name
            .split(" ")
            .filter((p) => !["Md.", "Dr.", "Prof.", "Mr.", "Ms.", "Mohd."].includes(p))
            .map((n) => n[0])
            .slice(0, 2)
            .join("") || m.name.slice(0, 2);

        return (
          <div
            key={m.sno + m.name}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start gap-3.5 mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0 shadow-sm"
                  style={{ backgroundColor: badgeColor }}
                >
                  {initials.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug truncate group-hover:text-brand-green-dark transition-colors">
                    {m.name}
                  </h4>
                  <span
                    className="inline-block mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: badgeColor }}
                  >
                    {m.designation}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                {(m.qualification || m.expertise) && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{m.qualification || m.expertise}</span>
                  </div>
                )}
                {(m.district || m.state) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{[m.district, m.state].filter(Boolean).join(", ")}</span>
                  </div>
                )}
              </div>
            </div>

            {(m.mobile || m.email) && (
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                {m.mobile && (
                  <a
                    href={`tel:+91${m.mobile}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 font-semibold transition"
                    title={`Call +91 ${m.mobile}`}
                  >
                    <Phone className="w-3 h-3 text-brand-green" /> Call
                  </a>
                )}
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 font-semibold transition"
                    title={`Email ${m.email}`}
                  >
                    <Mail className="w-3 h-3 text-brand-orange" /> Email
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MemberTable({
  title,
  description,
  headers,
  rows,
  items,
  badge,
  badgeColor = "#15803d",
  viewMode: controlledViewMode,
}: {
  title: string;
  description?: string;
  headers: string[];
  rows: (string | number)[][];
  items: MemberItem[];
  badge: string;
  badgeColor?: string;
  viewMode?: "table" | "grid";
}) {
  const [expanded, setExpanded] = useState(true);
  const [localViewMode, setLocalViewMode] = useState<"table" | "grid">(controlledViewMode || "table");

  useEffect(() => {
    if (controlledViewMode) {
      setLocalViewMode(controlledViewMode);
    }
  }, [controlledViewMode]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
      <div className="w-full flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-100 gap-3">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-3 text-left focus:outline-none flex-1 min-w-[200px]"
        >
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: badgeColor }}>
            {badge}
          </span>
          <div>
            <h3 className="font-extrabold text-brand-green-dark text-base">{title}</h3>
            {description && <p className="text-xs text-slate-500">{description}</p>}
          </div>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setLocalViewMode("table")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition ${
                localViewMode === "table"
                  ? "bg-white text-brand-green-dark shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Table View"
            >
              <Table className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Table</span>
            </button>
            <button
              type="button"
              onClick={() => setLocalViewMode("grid")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition ${
                localViewMode === "grid"
                  ? "bg-white text-brand-green-dark shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Cards</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            aria-label="Toggle section expand"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        localViewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {headers.map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-xs text-slate-700">
                        {j === 1 ? <span className="font-semibold text-slate-800">{cell}</span> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <MemberCardsGrid items={items} badgeColor={badgeColor} />
        )
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LeadershipPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [globalViewMode, setGlobalViewMode] = useState<"table" | "grid">("table");

  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <SubpageHeroCarousel
        tag="ABOUT ISLAH"
        title="Leadership & Management"
        subtitle="IWF is governed by a committed Board of Trustees, managed by a professional Executive Body, and guided by experienced advisors."
        breadcrumbs={[
          { label: "About Us", href: "/about" },
          { label: "Leadership & Management" },
        ]}
      />

      <main>
        {/* Quick Stat Badges */}
        <section className="bg-slate-900 text-white py-4 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {[
              { label: "Board of Trustees", count: BOARD_OF_TRUSTEES.length },
              { label: "Executive Body", count: EXECUTIVE_BODY.length },
              { label: "Domain Advisors", count: ADVISORY_BODY.length },
              { label: "Field Team", count: FIELD_TEAM.length + "+" },
            ].map(({ label, count }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="text-xl font-black text-brand-orange">{count}</span>
                <span className="text-xs text-white/80 font-bold uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Directory & Tables */}
        <section className="py-14 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">

            {/* Master View Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
              <div>
                <SectionBadge label="Leadership Directory" />
                <h2 className="text-2xl sm:text-3xl font-black text-brand-green-dark">People Behind IWF</h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  View our governance board, executive team, specialist advisors, and ground mobilizers.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0 self-start sm:self-auto">
                <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wider">Display:</span>
                <button
                  type="button"
                  onClick={() => setGlobalViewMode("table")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    globalViewMode === "table"
                      ? "bg-brand-green text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Table className="w-3.5 h-3.5" /> Table View
                </button>
                <button
                  type="button"
                  onClick={() => setGlobalViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    globalViewMode === "grid"
                      ? "bg-brand-green text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> Cards View
                </button>
              </div>
            </div>

            <ScrollReveal>
              <div className="mb-8">
                <SectionBadge label="Governance" />
                <h2 className="text-2xl font-extrabold text-brand-green-dark mb-1">Board of Trustees</h2>
                <p className="text-slate-500 text-sm">The governing body responsible for overall strategy, policy, and accountability of IWF.</p>
              </div>
            </ScrollReveal>

            <MemberTable
              title="Board of Trustees"
              badge="BOT"
              badgeColor="#15803d"
              headers={["#", "Name", "Designation", "Qualification", "District", "State"]}
              rows={BOARD_OF_TRUSTEES.map((m) => [m.sno, m.name, m.designation, m.qualification || "-", m.district || "-", m.state || "-"])}
              items={BOARD_OF_TRUSTEES}
              viewMode={globalViewMode}
            />

            <ScrollReveal>
              <div className="mb-8 mt-10">
                <SectionBadge label="Management" />
                <h2 className="text-2xl font-extrabold text-brand-green-dark mb-1">Executive Body</h2>
                <p className="text-slate-500 text-sm">Professional management team responsible for day-to-day operations and program delivery.</p>
              </div>
            </ScrollReveal>

            <MemberTable
              title="Executive Body"
              badge="EB"
              badgeColor="#ea580c"
              headers={["#", "Name", "Designation", "Qualification", "District", "State"]}
              rows={EXECUTIVE_BODY.map((m) => [m.sno, m.name, m.designation, m.qualification || "-", m.district || "-", m.state || "-"])}
              items={EXECUTIVE_BODY}
              viewMode={globalViewMode}
            />

            <ScrollReveal>
              <div className="mb-8 mt-10">
                <SectionBadge label="Advisory" />
                <h2 className="text-2xl font-extrabold text-brand-green-dark mb-1">Advisory Body</h2>
                <p className="text-slate-500 text-sm">Domain experts providing strategic guidance across healthcare, education, legal and social sectors.</p>
              </div>
            </ScrollReveal>

            <MemberTable
              title="Advisory Panel"
              badge="AP"
              badgeColor="#7C3AED"
              headers={["#", "Name", "Role", "Expertise", "State"]}
              rows={ADVISORY_BODY.map((m) => [m.sno, m.name, m.designation, m.expertise || "-", m.state || "-"])}
              items={ADVISORY_BODY}
              viewMode={globalViewMode}
            />

            <ScrollReveal>
              <div className="mb-8 mt-10">
                <SectionBadge label="Field Operations" />
                <h2 className="text-2xl font-extrabold text-brand-green-dark mb-1">Field Team</h2>
                <p className="text-slate-500 text-sm">Our ground-level coordinators and mobilizers who bring IWF's mission to communities directly.</p>
              </div>
            </ScrollReveal>

            <MemberTable
              title="Field Coordinators & Mobilizers"
              badge="FT"
              badgeColor="#D97706"
              headers={["#", "Name", "Role", "District", "State"]}
              rows={FIELD_TEAM.map((m) => [m.sno, m.name, m.designation, m.district || "-", m.state || "-"])}
              items={FIELD_TEAM}
              viewMode={globalViewMode}
            />

          </div>
        </section>

        {/* Leadership Contact CTA */}
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-xl font-extrabold text-brand-green-dark mb-2">Connect with Our Leadership</h2>
            <p className="text-slate-500 text-sm mb-6">For governance, partnership, or media inquiries, reach our leadership team directly.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-green-dark transition shadow-md">
                <Phone className="w-4 h-4" /> Contact Us
              </a>
              <a href="mailto:info@iwfindia.org" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition">
                <Mail className="w-4 h-4" /> info@iwfindia.org
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
