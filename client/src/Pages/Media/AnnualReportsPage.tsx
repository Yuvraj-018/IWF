import { Download, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { MediaLayout } from "@/components/media/MediaLayout";
import { ANNUAL_REPORTS_DATA } from "@/content/mediaContent";

export function AnnualReportsPage() {
  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={ANNUAL_REPORTS_DATA.hero.badge}
        title={ANNUAL_REPORTS_DATA.hero.title}
        description={ANNUAL_REPORTS_DATA.hero.description}
        breadcrumb={[{ label: "Media & Updates", href: "/media" }, { label: "Annual Reports" }]}
        image={ANNUAL_REPORTS_DATA.hero.image}
        imageAlt="Islah Annual Reports"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Top Stats Ribbon (5 Cards) */}
        <section aria-label="Governance & Accountability Metrics">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {ANNUAL_REPORTS_DATA.statsRibbon.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-200 hover:shadow-md transition group"
              >
                <div className="text-2xl sm:text-3xl font-black text-emerald-800 group-hover:text-emerald-600 transition">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{stat.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Reports Grid + Right Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main 8 Reports Grid (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>Published Annual Reports</span>
              </h2>
              <span className="text-xs text-slate-500 font-semibold">8 Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {ANNUAL_REPORTS_DATA.reports.map((report, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col group"
                >
                  {/* Report Cover */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                    <img
                      src={report.cover}
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-sm">
                        {report.year}
                      </span>
                    </div>
                  </div>

                  {/* Content & Action */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
                        {report.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                        {report.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-[11px] font-bold transition cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download ({report.fileSize})</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Highlights Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{ANNUAL_REPORTS_DATA.sidebar.highlightsTitle}</span>
              </h3>
              <div className="divide-y divide-slate-100 mt-2">
                {ANNUAL_REPORTS_DATA.sidebar.highlights.map((h, i) => (
                  <div key={i} className="py-3">
                    <div className="text-xs font-bold text-slate-800">{h.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Our Reports */}
            <div className="bg-gradient-to-br from-[#071527] to-[#0c2340] text-white rounded-2xl p-6 shadow-md border border-slate-800">
              <div className="flex items-center gap-2 text-brand-orange mb-2">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  {ANNUAL_REPORTS_DATA.sidebar.aboutTitle}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {ANNUAL_REPORTS_DATA.sidebar.aboutText}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/60 text-[11px] text-slate-400 font-semibold">
                Section 8 Registered Non-Profit • 12A & 80G Certified
              </div>
            </div>
          </div>
        </section>

        {/* 4. Action Strip */}
        <ActionStrip />
      </div>
    </div>
    </MediaLayout>
  );
}

export default AnnualReportsPage;
