import { toast } from "sonner";
import { useState, useMemo } from "react";
import { Download, Search, BookOpen, CheckCircle2, FileText, Mail, ArrowRight } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { NewsletterStrip } from "@/components/media/NewsletterStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { MediaLayout } from "@/components/media/MediaLayout";
import { PUBLICATIONS_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";

export function PublicationsPage() {
  const [selectedType, setSelectedType] = useState<string>("All Publications");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);

  const filteredPubs = useMemo(() => {
    return PUBLICATIONS_DATA.publications.filter((item) => {
      const matchesType =
        selectedType === "All Publications" || item.type === selectedType;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  const handleReadAbstract = (item: (typeof PUBLICATIONS_DATA.publications)[0]) => {
    const isNewsletter = item.type === "Newsletters";
    const story: SuccessStoryItem = {
      id: String(item.id),
      category: item.type,
      title: item.title,
      personName: item.authors,
      village: item.date,
      state: isNewsletter ? "Quarterly Community Digest" : "Open Access Research",
      excerpt: item.summary,
      fullStory: isNewsletter
        ? `NEWSLETTER OVERVIEW:\n\n${item.summary}\n\nKEY DEVELOPMENTS IN THIS ISSUE:\n• Verified multi-cluster progress across education and rural healthcare.\n• Inspiring grassroots narratives told by self-help group women leaders.\n• Transparent financial stewardship and resource allocation updates.\n• Schedules of upcoming health camps, vocational courses, and plantation drives.\n\nDownload the full issue below to explore comprehensive photographs, partner messages, and field data.`
        : `EXECUTIVE ABSTRACT:\n\n${item.summary}\n\nAUTHORS & RESEARCH AFFILIATION:\n${item.authors} — Research & Policy Directorate, Islah Welfare Foundation.\n\nMETHODOLOGY & SCOPE:\nThis publication synthesizes longitudinal field observation, primary household surveys across rural Bihar and UP, and participatory rural appraisal (PRA) tools. By capturing quantitative outcomes alongside qualitative community voices, the study provides scalable blueprints for civil society, district administrations, and grassroots collectives seeking lasting social change.\n\nOPEN ACCESS NOTICE:\nLicensed under Creative Commons CC-BY 4.0. You are free to share and adapt this work with appropriate attribution to Islah Welfare Foundation.`,
      image: item.cover,
      impactMetrics: [
        "Verified Community Impact",
        "Open Access (CC-BY 4.0)",
        "Peer Reviewed / Field Validated",
      ],
    };
    setActiveStory(story);
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
        {/* 1. Hero Section */}
        <MediaSubpageHero
          badge={PUBLICATIONS_DATA.hero.badge}
          title={PUBLICATIONS_DATA.hero.title}
          description={PUBLICATIONS_DATA.hero.description}
          breadcrumb={[
            { label: "Media & Updates", href: "/media" },
            { label: "Publications & Research" },
          ]}
          image={PUBLICATIONS_DATA.hero.image}
          imageAlt="Knowledge for Impact"
          actions={
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setSelectedType("All Publications")}
                className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm ${
                  selectedType === "All Publications"
                    ? "bg-brand-orange text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                }`}
              >
                Browse All
              </button>
              <button
                onClick={() => setSelectedType("Newsletters")}
                className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm ${
                  selectedType === "Newsletters"
                    ? "bg-brand-orange text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                }`}
              >
                Newsletters
              </button>
              <button
                onClick={() => setSelectedType("Research Papers")}
                className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm ${
                  selectedType === "Research Papers"
                    ? "bg-brand-orange text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                }`}
              >
                Research Papers
              </button>
            </div>
          }
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* 2. Four Stats Ribbon */}
          <section aria-label="Research Metrics">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {PUBLICATIONS_DATA.statsRibbon.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition group"
                >
                  <div className="text-3xl font-black text-emerald-800 group-hover:text-emerald-600 transition">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Filter Bar & Search */}
          <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
                {PUBLICATIONS_DATA.types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedType === type
                        ? "bg-emerald-800 text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search publications & newsletters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
            </div>
          </section>

          {/* 4. Publications Grid + Right Sidebar */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Publications (8 cols) */}
            <div className="lg:col-span-8">
              {filteredPubs.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <p className="text-sm font-semibold text-slate-500">
                    No publications or newsletters found matching your selection.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedType("All Publications");
                      setSearchQuery("");
                    }}
                    className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPubs.map((pub) => (
                    <div
                      key={pub.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col group"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <img
                          src={pub.cover}
                          alt={pub.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-white shadow-sm">
                            {pub.type}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-sm">
                            {pub.date}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-2">
                            {pub.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                            {pub.summary}
                          </p>
                          <div className="mt-3 text-[11px] text-slate-500 font-medium">
                            Authors / Editorial:{" "}
                            <span className="text-slate-700 font-semibold">{pub.authors}</span>
                          </div>
                        </div>

                        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                          <a
                            href={pub.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold transition cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF ({pub.fileSize})</span>
                          </a>

                          <button
                            onClick={() => handleReadAbstract(pub)}
                            className="text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1 transition cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{pub.type === "Newsletters" ? "Read Issue" : "Abstract"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Research Themes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Priority Research Themes</span>
                </h3>
                <div className="divide-y divide-slate-100 mt-2">
                  {PUBLICATIONS_DATA.sidebarThemes.map((theme, idx) => (
                    <div key={idx} className="py-3 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{theme.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{theme.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Subscription Card in Sidebar */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Quarterly Newsletters</span>
                </div>
                <h4 className="text-sm font-black text-slate-900">Get Our Quarterly Digest</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Join 50,000+ donors and changemakers who receive our digital quarterly impact roundup.
                </p>
                <div className="mt-4 space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                  />
                  <button
                    onClick={() => toast.success("Thank you for subscribing to our newsletter!")}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition uppercase tracking-wider"
                  >
                    Subscribe Free
                  </button>
                </div>
              </div>

              {/* Open Access Card */}
              <div className="bg-gradient-to-br from-[#063319] to-[#0b4d26] text-white rounded-2xl p-6 shadow-md border border-emerald-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-2">
                  Open Access Mandate
                </div>
                <h4 className="text-sm font-black text-white">Knowledge Belongs to the Community</h4>
                <p className="text-xs text-emerald-100 leading-relaxed mt-2">
                  All Islah Welfare Foundation publications and datasets are open access under Creative Commons (CC-BY 4.0). We actively encourage civil society, scholars, and policymakers to reuse and scale these insights.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Newsletter Strip */}
          <NewsletterStrip
            title="Subscribe to Policy & Research Digests"
            description="Receive notices when new working papers, field evaluations, and policy briefs are released by our research desk."
            buttonText="Subscribe to Research"
          />

          {/* 6. Action Strip */}
          <ActionStrip />
        </div>

        {/* Story Modal */}
        <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
      </div>
    </MediaLayout>
  );
}

export default PublicationsPage;
