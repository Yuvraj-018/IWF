import { useState, useEffect } from "react";
import { ArrowRight, Search, Calendar, Eye, X, Loader2 } from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import { fetchNewsEvents, type NewsEventItem, FALLBACK_NEWS_EVENTS } from "@/services/newsService";

const CATEGORY_COLORS: Record<string, string> = {
  "News & Updates": "#1D4ED8",
  "Events": "#D97706",
  "Press Releases": "#15803d",
  "Community Activities": "#059669",
  "Programs": "#7C3AED",
  "Campaigns": "#DC2626",
};

function NewsModal({ item, onClose }: { item: NewsEventItem; onClose: () => void }) {
  const catColor = CATEGORY_COLORS[item.category] || "#1D4ED8";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-60 w-full overflow-hidden bg-slate-900">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition cursor-pointer">
            <X className="w-4 h-4 text-slate-800" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: catColor }}>
              {item.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {item.date}
            </span>
            <span className="text-xs text-slate-400">{item.readTime || "3 min"} read</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 mb-4 leading-tight">{item.title}</h2>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {item.fullStory || item.excerpt}
          </p>
          {item.impactMetrics && item.impactMetrics.length > 0 && (
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Key Highlights</p>
              <div className="flex flex-wrap gap-2">
                {item.impactMetrics.map((metric) => (
                  <span key={metric} className="text-xs font-semibold px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-slate-700">
                    ✓ {metric}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Published by {item.author || "Islah Welfare Foundation"}</p>
            <a href="/contact" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
              Contact Islah <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ item, onRead }: { item: NewsEventItem; onRead: (item: NewsEventItem) => void }) {
  const catColor = CATEGORY_COLORS[item.category] || "#1D4ED8";
  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group flex flex-col overflow-hidden cursor-pointer" onClick={() => onRead(item)}>
      <div className="h-40 w-full overflow-hidden bg-slate-100 relative">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white backdrop-blur-sm" style={{ backgroundColor: catColor }}>
          {item.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" /> {item.date}
          </span>
          <span className="text-[10px] text-slate-400">{item.readTime || "3 min"}</span>
        </div>
        <h3 className="font-bold text-sm text-slate-800 leading-snug mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">{item.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-3">{item.excerpt}</p>
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-xs font-bold inline-flex items-center gap-1 text-emerald-700">
            <Eye className="w-3 h-3" /> Read Story
          </span>
        </div>
      </div>
    </article>
  );
}

export default function NewsEventsPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [selectedTag, setSelectedTag] = useState("All");
  const [query, setQuery] = useState("");
  const [readingItem, setReadingItem] = useState<NewsEventItem | null>(null);

  const [newsList, setNewsList] = useState<NewsEventItem[]>(FALLBACK_NEWS_EVENTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchNewsEvents()
      .then((res) => {
        if (isMounted && res.success && res.data) {
          setNewsList(res.data);
        }
      })
      .catch((err) => {
        console.warn("Could not load news from DB, using initial catalog:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const allCategories = ["All", "News & Updates", "Events", "Press Releases", "Community Activities", "Programs", "Campaigns"];

  const filtered = newsList.filter((n) => {
    const matchTag = selectedTag === "All" || n.category === selectedTag;
    const matchQ = query === "" || n.title.toLowerCase().includes(query.toLowerCase()) || n.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQ;
  });

  const featured = filtered.filter((n) => n.featured);
  const rest = filtered.filter((n) => !n.featured);

  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        {/* Standardized Hero Carousel matching About Us */}
        <SubpageHeroCarousel
          tag="MEDIA & UPDATES"
          title="News & Events"
          subtitle="Stay updated with Islah's verified work on the ground — health camps, scholarships, community events, partnerships, and more."
          breadcrumbs={[{ label: "Media & Updates" }]}
          images={[g1, g2, g3, g4, g5, g6]}
        />

        {/* Filters */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm py-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news & events…"
                className="w-full pl-9 pr-3 h-9 rounded-lg border border-slate-200 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition cursor-pointer ${
                    selectedTag === tag
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white text-slate-600 border-slate-200 hover:border-emerald-600 hover:text-emerald-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="py-12 bg-slate-50 min-h-[500px]">
          <div className="max-w-6xl mx-auto px-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
                <p className="text-sm font-semibold">Loading verified updates from ISLAH database...</p>
              </div>
            ) : (
              <>
                {/* Featured */}
                {featured.length > 0 && (
                  <>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">Featured Stories</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                      {featured.map((item) => (
                        <ScrollReveal key={item.slug || item._id}>
                          <article
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden cursor-pointer group flex flex-col"
                            onClick={() => setReadingItem(item)}
                          >
                            <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                              <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white backdrop-blur-sm" style={{ backgroundColor: CATEGORY_COLORS[item.category] || "#1D4ED8" }}>
                                {item.category}
                              </span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {item.date}
                                  </span>
                                  <span className="text-xs text-slate-400">{item.readTime || "3 min"} read</span>
                                </div>
                                <h2 className="font-extrabold text-base text-slate-800 leading-tight mb-2 group-hover:text-emerald-700 transition-colors">{item.title}</h2>
                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{item.excerpt}</p>
                              </div>
                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-bold inline-flex items-center gap-1 text-emerald-700">
                                  <Eye className="w-3.5 h-3.5" /> Read Full Story
                                </span>
                              </div>
                            </div>
                          </article>
                        </ScrollReveal>
                      ))}
                    </div>
                  </>
                )}

                {/* All / Filtered */}
                {rest.length > 0 && (
                  <>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
                      {selectedTag === "All" ? "All Updates" : selectedTag}
                      <span className="ml-2 text-slate-400 normal-case font-normal">({rest.length})</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {rest.map((item) => (
                        <ScrollReveal key={item.slug || item._id}>
                          <NewsCard item={item} onRead={setReadingItem} />
                        </ScrollReveal>
                      ))}
                    </div>
                  </>
                )}

                {filtered.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                    <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-700 mb-1">No updates found</h3>
                    <p className="text-xs text-slate-400">Try adjusting your keyword or category filter.</p>
                    <button onClick={() => { setQuery(""); setSelectedTag("All"); }} className="mt-4 text-xs font-bold text-emerald-700 hover:underline cursor-pointer">
                      Clear filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />

      {readingItem && <NewsModal item={readingItem} onClose={() => setReadingItem(null)} />}
    </div>
  );
}
