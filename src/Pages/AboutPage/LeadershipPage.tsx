import { useState } from "react";
import { Users, Shield, BookOpen, ArrowRight, Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";
import {
  Footer, Header, NotificationTicker, RoleFormModal, UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BOARD_OF_TRUSTEES = [
  { sno: 1, name: "Md. Imteyazullah", designation: "Chairman", qualification: "Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "chairman@iwfindia.org" },
  { sno: 2, name: "Md. Azizullah", designation: "Treasurer", qualification: "Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "treasurer@iwfindia.org" },
  { sno: 3, name: "Md. Jamshed Alam", designation: "Secretary", qualification: "Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "secretary@iwfindia.org" },
  { sno: 4, name: "Md. Asghar Imam", designation: "Member", qualification: "Post Graduate", district: "Muzaffarpur", state: "Bihar", mobile: "9811861633", email: "info@iwfindia.org" },
  { sno: 5, name: "Md. Mustafa", designation: "Member", qualification: "Graduate", district: "Sitamarhi", state: "Bihar", mobile: "9811861633", email: "info@iwfindia.org" },
  { sno: 6, name: "Mohd. Minhaj", designation: "Member", qualification: "Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "info@iwfindia.org" },
  { sno: 7, name: "Md. Niyaz Ahmad", designation: "Member", qualification: "Graduate", district: "Vaishali", state: "Bihar", mobile: "9811861633", email: "info@iwfindia.org" },
];

const EXECUTIVE_BODY = [
  { sno: 1, name: "Dr. Nasera Firdausi", designation: "Chief Executive Officer (CEO)", qualification: "PhD", district: "Patna", state: "Bihar", mobile: "9811861633", email: "ceo@iwfindia.org" },
  { sno: 2, name: "Md. Shahid Raza", designation: "Chief Program Officer (CPO)", qualification: "Post Graduate", district: "Darbhanga", state: "Bihar", mobile: "9811861633", email: "programs@iwfindia.org" },
  { sno: 3, name: "Ms. Farida Khatoon", designation: "Program Manager — Healthcare", qualification: "MBBS", district: "Muzaffarpur", state: "Bihar", mobile: "9811861633", email: "health@iwfindia.org" },
  { sno: 4, name: "Mr. Rajeev Tiwari", designation: "Program Manager — Education", qualification: "M.Ed", district: "Patna", state: "Bihar", mobile: "9811861633", email: "education@iwfindia.org" },
  { sno: 5, name: "Ms. Anita Kumari", designation: "Program Manager — Women Empowerment", qualification: "MSW", district: "Gaya", state: "Bihar", mobile: "9811861633", email: "women@iwfindia.org" },
  { sno: 6, name: "Mr. Suresh Paswan", designation: "Finance & Accounts Officer", qualification: "CA", district: "Patna", state: "Bihar", mobile: "9811861633", email: "finance@iwfindia.org" },
];

const ADVISORY_BODY = [
  { sno: 1, name: "Dr. Arjun Singh", designation: "Technical Advisor — Healthcare", expertise: "Public Health, AIIMS Delhi Alumni", state: "Delhi" },
  { sno: 2, name: "Prof. Meena Verma", designation: "Academic Advisor — Education", expertise: "Primary Education, BHU Faculty", state: "Uttar Pradesh" },
  { sno: 3, name: "Mr. Vikram Joshi", designation: "Legal Advisor", expertise: "NGO Law, Patna High Court", state: "Bihar" },
  { sno: 4, name: "Ms. Shabnam Ansari", designation: "Gender & Social Inclusion Advisor", expertise: "Women Rights, UN Consultant", state: "Delhi" },
];

const FIELD_TEAM = [
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

function MemberTable({
  title, description, headers, rows, badge, badgeColor = "#15803d",
}: {
  title: string; description?: string;
  headers: string[]; rows: (string | number)[][];
  badge: string; badgeColor?: string;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: badgeColor }}>
            {badge}
          </span>
          <div className="text-left">
            <h3 className="font-extrabold text-brand-green-dark text-base">{title}</h3>
            {description && <p className="text-xs text-slate-500">{description}</p>}
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {expanded && (
        <div className="overflow-x-auto border-t border-slate-100">
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
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LeadershipPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

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

        {/* Tables */}
        <section className="py-14 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">

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
              rows={BOARD_OF_TRUSTEES.map((m) => [m.sno, m.name, m.designation, m.qualification, m.district, m.state])}
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
              rows={EXECUTIVE_BODY.map((m) => [m.sno, m.name, m.designation, m.qualification, m.district, m.state])}
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
              rows={ADVISORY_BODY.map((m) => [m.sno, m.name, m.designation, m.expertise, m.state])}
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
              rows={FIELD_TEAM.map((m) => [m.sno, m.name, m.designation, m.district, m.state])}
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
