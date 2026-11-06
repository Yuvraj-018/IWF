import { useState, useMemo, useEffect } from "react";
import { Search, ArrowRight, Play, Quote, Sparkles, Loader2 } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { VideoModal } from "@/components/media/MediaLightboxModals";
import { MediaLayout } from "@/components/media/MediaLayout";
import { SUCCESS_STORIES_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";
import { fetchSuccessStories } from "@/services/storyService";

export function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Stories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const [stories, setStories] = useState<SuccessStoryItem[]>(SUCCESS_STORIES_DATA.stories);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(SUCCESS_STORIES_DATA.stories.length);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchSuccessStories({
      page,
      limit: 6,
      category: selectedCategory,
      search: searchQuery || undefined,
    }).then((res) => {
      if (!cancelled && res.success && res.data) {
        setStories(res.data);
        setTotalPages(res.pagination?.pages || 1);
        setTotalCount(res.pagination?.total || 0);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [page, selectedCategory, searchQuery]);

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={SUCCESS_STORIES_DATA.hero.badge}
        title={SUCCESS_STORIES_DATA.hero.title}
        description={SUCCESS_STORIES_DATA.hero.description}
        subtext={`🌟 ${SUCCESS_STORIES_DATA.hero.tagline}`}
        breadcrumb={[{ label: "Media & Updates", href: "/media" }, { label: "Success Stories" }]}
        image={SUCCESS_STORIES_DATA.hero.image}
        imageAlt="Islah Success Stories"
        rightOverlay={
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold transition border border-white/20 cursor-pointer shadow-lg"
          >
            <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
            <div className="text-left">
              <div className="text-[11px] text-sky-300 uppercase tracking-wider">Watch Our Story</div>
              <div className="text-xs font-semibold">See how we change lives</div>
            </div>
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Four Stats Ribbon */}
        <section aria-label="Stories Impact Metrics">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SUCCESS_STORIES_DATA.statsRibbon.map((stat, idx) => (
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
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
              {SUCCESS_STORIES_DATA.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>
          </div>
        </section>

        {/* 4. Stories Grid + Right Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Cards (8 cols) */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                <p className="text-xs text-slate-500 font-medium">Loading inspirational journeys...</p>
              </div>
            ) : stories.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">
                  No stories found matching your filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Stories");
                    setSearchQuery("");
                    setPage(1);
                  }}
                  className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stories.map((story) => (
                    <div
                      key={story.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col group"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        {story.image ? (
                          <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                            <Sparkles className="w-10 h-10 text-slate-300" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                            {story.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                            {story.title}
                          </h3>
                          <div className="text-[11px] font-semibold text-emerald-700 mt-1">
                            {story.personName} • {story.village}
                          </div>
                          <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                            {story.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 mt-3 border-t border-slate-100">
                          <button
                            onClick={() => setActiveStory(story)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                    >
                      ← Previous
                    </button>
                    <span className="text-xs font-mono text-slate-500 px-2">
                      Page {page} of {totalPages} ({totalCount} stories)
                    </span>
                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quote Card */}
            <div className="bg-gradient-to-br from-[#063319] to-[#0b4d26] text-white rounded-2xl p-6 shadow-md border border-emerald-800 relative overflow-hidden">
              <Quote className="w-8 h-8 text-emerald-400/30 absolute top-4 right-4" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-3">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>{SUCCESS_STORIES_DATA.sidebarQuote.title}</span>
              </div>
              <p className="text-sm font-semibold italic text-emerald-50 leading-relaxed">
                "{SUCCESS_STORIES_DATA.sidebarQuote.text}"
              </p>
              <p className="text-xs font-bold text-emerald-300 mt-4">
                — {SUCCESS_STORIES_DATA.sidebarQuote.author}
              </p>
            </div>

            {/* Stories by Impact Area */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
                Stories by Impact Area
              </h3>
              <div className="divide-y divide-slate-100 mt-2">
                {SUCCESS_STORIES_DATA.storiesByArea.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategory(item.area)}
                    className="py-3 flex items-center justify-between text-xs cursor-pointer hover:text-emerald-700 transition"
                  >
                    <span className="font-medium text-slate-700">{item.area}</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Action Strip */}
        <ActionStrip />
      </div>

      {/* Story Reader Modal */}
      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />

      {/* Video Modal */}
      <VideoModal
        video={
          videoOpen
            ? {
                title: "Real People. Real Change. — Islah Welfare Foundation",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                desc: "Every story is a proof of hope, determination, and the power of collective support.",
              }
            : null
        }
        onClose={() => setVideoOpen(false)}
      />
      </div>
    </MediaLayout>
  );
}

export default SuccessStoriesPage;
