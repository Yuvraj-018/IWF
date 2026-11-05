import { useState } from "react";
import { Calendar, ChevronRight, FileText, Mail, Phone } from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import { EXTENDED_POLICY_CONTENT, type ExtendedPolicySlug } from "@/content/policyContent";
import { CONTACT_DETAILS } from "@/content/siteContent";
import MedicalEmergencyWorkflow from "@/components/healthcare/MedicalEmergencyWorkflow";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";

/** Headings in the content often carry their own "3." prefix; we number them ourselves. */
function cleanHeading(h: string) {
  return h.replace(/^\s*\d+[.)]\s*/, "");
}

function anchorId(i: number) {
  return `section-${i + 1}`;
}

/** Renders one body line: "Heading:" lines, "• bullets" and plain paragraphs. */
function BodyLine({ text }: { text: string }) {
  if (text.endsWith(":") && !text.startsWith("•")) {
    return <p className="font-semibold text-[#0b1f3b] text-sm pt-1">{text}</p>;
  }
  if (text.startsWith("• ") || text.startsWith("•")) {
    return (
      <div className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
        <span>{text.replace(/^•\s?/, "")}</span>
      </div>
    );
  }
  return <p className="text-sm text-slate-700 leading-relaxed">{text}</p>;
}

export default function GenericPolicyPage({ slug }: { slug: ExtendedPolicySlug }) {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const content = EXTENDED_POLICY_CONTENT[slug];

  if (!content) {
    return null;
  }

  const showToc = content.sections.length > 2;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        <SubpageHeroCarousel
          tag="POLICY & GOVERNANCE"
          title={content.title}
          subtitle={content.subtitle}
          breadcrumbs={[{ label: "Policies", href: "/policies" }, { label: content.title }]}
        >
          {content.effectiveDate && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-md text-white/90">
              <Calendar className="w-3.5 h-3.5 text-brand-orange" />
              <span>Effective Date: {content.effectiveDate}</span>
            </div>
          )}
        </SubpageHeroCarousel>

        <section className="py-10 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_17rem] gap-8 lg:gap-10 items-start">
            {/* Document */}
            <article className="min-w-0">
              {content.sections.map((sec, idx) => (
                <section
                  key={idx}
                  id={anchorId(idx)}
                  className="scroll-mt-24 py-5 first:pt-0 border-b border-slate-100 last:border-0"
                >
                  <h2 className="text-lg sm:text-xl font-semibold text-[#0b1f3b] flex gap-2.5">
                    {content.sections.length > 1 && (
                      <span className="text-brand-orange tabular-nums shrink-0">{idx + 1}.</span>
                    )}
                    <span>{cleanHeading(sec.heading)}</span>
                  </h2>
                  <div className="mt-2 space-y-1.5">
                    {Array.isArray(sec.body) ? (
                      sec.body.map((line, i) => <BodyLine key={i} text={line} />)
                    ) : (
                      <BodyLine text={sec.body} />
                    )}
                  </div>
                </section>
              ))}
            </article>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-24">
              {showToc && (
                <nav className="hidden lg:block rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    On this page
                  </p>
                  <ol className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
                    {content.sections.map((sec, idx) => (
                      <li key={idx}>
                        <a
                          href={`#${anchorId(idx)}`}
                          className="flex gap-2 text-xs text-slate-600 hover:text-brand-orange leading-snug"
                        >
                          <span className="tabular-nums text-slate-400">{idx + 1}.</span>
                          <span>{cleanHeading(sec.heading)}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#0b1f3b]">
                  <FileText className="w-4 h-4 text-brand-orange" /> Policy details
                </p>
                <dl className="text-xs space-y-1.5">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Category</dt>
                    <dd className="font-medium text-slate-800 text-right">{content.category}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Effective date</dt>
                    <dd className="font-medium text-slate-800">
                      {content.effectiveDate || "01/04/2026"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Issued by</dt>
                    <dd className="font-medium text-slate-800 text-right">
                      Islah Welfare Foundation
                    </dd>
                  </div>
                </dl>
                <a
                  href="/policies"
                  className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs font-semibold text-[#0b1f3b] hover:text-brand-orange"
                >
                  All policies
                  <ChevronRight className="w-3.5 h-3.5 text-brand-orange" />
                </a>
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4 space-y-2">
                <p className="text-sm font-semibold text-[#0b1f3b]">Questions about this policy?</p>
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="flex items-center gap-2 text-xs text-slate-700 hover:text-brand-orange"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  {CONTACT_DETAILS.email}
                </a>
                <a
                  href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-xs text-slate-700 hover:text-brand-orange"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  {CONTACT_DETAILS.phone}
                </a>
              </div>
            </aside>
          </div>
        </section>

        {slug === "medical-treatment-policy" && (
          <div className="pb-12">
            <MedicalEmergencyWorkflow showImageToggle={true} />
          </div>
        )}
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
