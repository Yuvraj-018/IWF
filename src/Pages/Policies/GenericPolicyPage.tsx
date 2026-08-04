import { useState } from "react";
import { ShieldCheck, Calendar, Mail, Phone, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import { EXTENDED_POLICY_CONTENT, type ExtendedPolicySlug } from "@/content/policyContent";
import { CONTACT_DETAILS } from "@/content/siteContent";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function GenericPolicyPage({ slug }: { slug: ExtendedPolicySlug }) {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const content = EXTENDED_POLICY_CONTENT[slug];

  if (!content) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white py-16 px-4 border-b border-white/10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Islah Welfare Foundation Policy & Governance</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              {content.title}
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-3xl leading-relaxed">
              {content.subtitle}
            </p>

            {content.effectiveDate && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-md text-white/90 mt-5">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                <span>Effective Date: {content.effectiveDate}</span>
              </div>
            )}
          </div>
        </section>

        {/* Policy Document Body */}
        <section className="py-12 px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8">
            {/* Main Document Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
                {content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <h2 className="text-lg md:text-xl font-bold text-[#0b1f3b] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                      {sec.heading}
                    </h2>
                    {Array.isArray(sec.body) ? (
                      <ul className="space-y-2 pl-2">
                        {sec.body.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                        {sec.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Overview */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
                <h3 className="font-extrabold text-[#0b1f3b] text-base uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText className="w-4 h-4 text-brand-orange" /> Policy Information
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This document forms an integral part of Islah Welfare Foundation's governance standards and administrative policies.
                </p>
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-600">Organization:</span>
                    <span className="font-bold text-[#0b1f3b]">IWF India</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-600">Compliance:</span>
                    <span className="font-bold text-brand-green">Statutory Standard</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0b1f3b] to-[#15803d] text-white rounded-xl p-6 shadow-md space-y-4">
                <h3 className="font-bold text-lg">Have Questions?</h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  For official policy inquiries or legal clarifications, contact our administration team directly.
                </p>
                <div className="space-y-2 text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-orange" />
                    <span>{CONTACT_DETAILS.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-orange" />
                    <span>{CONTACT_DETAILS.phone}</span>
                  </div>
                </div>
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
