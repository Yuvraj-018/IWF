import { useState } from "react";
import { Home, ChevronRight } from "lucide-react";
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
        <section className="relative bg-[#07162c] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-10 md:py-14 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2246]/95 to-[#07162c]/80 z-10" />
          <div className="relative z-20 max-w-5xl mx-auto px-4 w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-4 font-medium flex-wrap" aria-label="Breadcrumb">
              <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-brand-orange" /> Home
              </a>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-white/70">Legal &amp; Policies</span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-brand-orange font-bold">{content.title}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              LEGAL &amp; COMPLIANCE
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-3">
              {content.title}
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-2xl leading-relaxed">{content.subtitle}</p>
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
