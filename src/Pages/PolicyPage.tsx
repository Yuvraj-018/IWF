import { useState } from "react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import { CONTACT_DETAILS, POLICY_CONTENT, type PolicySlug } from "@/content/siteContent";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function PolicyPage({ slug }: { slug: PolicySlug }) {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const content = POLICY_CONTENT[slug];

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <section className="bg-[#0b1f3b] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-16">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              Islah Welfare Foundation
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {content.title}
            </h1>
            <p className="text-white/75 max-w-2xl leading-relaxed">{content.subtitle}</p>
          </div>
        </section>
        <section className="py-14 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white border border-slate-100 rounded-md shadow-sm divide-y divide-slate-100">
              {content.sections.map((section) => (
                <section key={section.heading} className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-brand-green-dark mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {section.body}
                  </p>
                </section>
              ))}
              <section className="p-6 md:p-8 bg-brand-green/5">
                <h2 className="text-xl font-bold text-brand-green-dark mb-3">
                  Contact
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  For questions, contact Islah at{" "}
                  <a href={`mailto:${CONTACT_DETAILS.email}`} className="font-semibold text-brand-green">
                    {CONTACT_DETAILS.email}
                  </a>{" "}
                  or {CONTACT_DETAILS.phone}.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
