import { useState, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Calendar,
  MapPin,
  ArrowRight,
  Download,
  Mail,
  Phone,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { NewsletterStrip } from "@/components/media/NewsletterStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { MediaLayout } from "@/components/media/MediaLayout";
import { NEWS_EVENTS_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";
import {
  fetchNewsEvents,
  type NewsEventItem,
  FALLBACK_NEWS_EVENTS,
  FALLBACK_UPCOMING_EVENTS,
} from "@/services/newsService";

export function NewsEventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);

  // Database news & events state with bundled fallback defaults
  const [liveItems, setLiveItems] = useState<NewsEventItem[]>(FALLBACK_NEWS_EVENTS);
  const [liveUpcoming, setLiveUpcoming] = useState<any[]>(FALLBACK_UPCOMING_EVENTS);
  const [liveCounts, setLiveCounts] = useState<{ name: string; count: number }[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchNewsEvents()
      .then((res) => {
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setLiveItems(res.data);
          if (res.upcomingEvents && res.upcomingEvents.length > 0) {
            setLiveUpcoming(res.upcomingEvents);
          }
          if (res.categoryCounts && res.categoryCounts.length > 0) {
            setLiveCounts(res.categoryCounts);
          }
        }
      })
      .catch((err) => {
        console.warn("Could not load news from backend DB, using fallback content:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const itemsToDisplay = liveItems || NEWS_EVENTS_DATA.items;
  const upcomingEvents = liveUpcoming || NEWS_EVENTS_DATA.upcomingEvents;
  const categoryCounts = liveCounts || NEWS_EVENTS_DATA.categoryCounts;

  const filteredItems = useMemo(() => {
    return itemsToDisplay.filter((item) => {
      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [itemsToDisplay, selectedCategory, searchQuery]);

  const handleReadMore = (item: any) => {
    const story: SuccessStoryItem = {
      id: String(item.slug || item.id || item._id),
      category: item.category,
      title: item.title,
      personName: item.author || "Media & Communications Desk",
      village: item.date,
      state: item.location || "Field Dispatches & Press",
      excerpt: item.excerpt,
      fullStory: item.fullStory || `${item.excerpt}\n\nISLAH WELFARE FOUNDATION — OFFICIAL DISPATCH\n\nIslah Welfare Foundation (IWF) continues to mobilize localized field leadership, volunteer coordination, and programmatic resources to bring measurable, community-driven change to the grassroots. Through regular monitoring, transparent communication, and dedicated volunteer action, our programs achieve tangible, lasting results for every family and village involved.\n\nFor media queries or on-the-ground interview facilitation, contact the Media Relations Desk at ${NEWS_EVENTS_DATA.sidebarContact.email}.`,
      image: item.image,
      impactMetrics: item.impactMetrics && item.impactMetrics.length > 0
        ? item.impactMetrics
        : [
          "Verified Field Report",
          "Community Participation 100%",
          "Active Programmatic Oversight",
        ],
    };
    setActiveStory(story);
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
        {/* 1. Hero Section */}
        <MediaSubpageHero
          badge={NEWS_EVENTS_DATA.hero.badge}
          title={NEWS_EVENTS_DATA.hero.title}
          description={NEWS_EVENTS_DATA.hero.description}
          breadcrumb={[
            { label: "Media & Updates", href: "/media" },
            { label: "News & Events" },
          ]}
          image={NEWS_EVENTS_DATA.hero.image}
          imageAlt="Islah News & Events"
          actions={
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setSelectedCategory("News & Updates")}
                className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm ${selectedCategory === "News & Updates"
                    ? "bg-brand-orange text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                  }`}
              >
                News & Updates
              </button>
              <button
                onClick={() => setSelectedCategory("Press Releases")}
                className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm ${selectedCategory === "Press Releases"
                    ? "bg-brand-orange text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                  }`}
              >
                Press Releases
              </button>
              <Link
                to="/media/gallery"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
              >
                Photo Gallery
              </Link>
            </div>
          }
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* 2. Filter Bar & Search */}
          <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
                {NEWS_EVENTS_DATA.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${selectedCategory === cat
                        ? "bg-emerald-800 text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search news, events & press..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                />
              </div>
            </div>
          </section>

          {/* 3. Main Content Grid + Right Sidebar */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main News/Events/Press (8 cols) */}
            <div className="lg:col-span-8">
              {loading && !liveItems ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-500">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-700" />
                  <p className="text-xs font-semibold">Loading verified dispatches from ISLAH database...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <p className="text-sm font-semibold text-slate-500">
                    No items found matching your selection.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item: any) => (
                    <div
                      key={item.slug || item.id || item._id}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col group"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-sm shadow-sm">
                            <Calendar className="w-3 h-3 text-emerald-700" />
                            <span>{item.date}</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                            {item.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => handleReadMore(item)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {item.pdfUrl && (
                            <a
                              href={item.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-[11px] font-bold transition"
                            >
                              <Download className="w-3 h-3" />
                              <span>PDF</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Upcoming Events Box */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>Upcoming Events</span>
                </h3>

                <div className="divide-y divide-slate-100 mt-2">
                  {upcomingEvents.map((evt: any, idx: number) => (
                    <div key={idx} className="py-3.5 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 text-center shrink-0 w-14 border border-emerald-100">
                        <div className="text-[10px] font-bold uppercase tracking-wider">
                          {evt.month}
                        </div>
                        <div className="text-lg font-black leading-tight">{evt.day}</div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {evt.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>{evt.location || "Bihar"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 mt-2">
                  <button
                    onClick={() => setSelectedCategory("Events")}
                    className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Events</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Categories Count */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
                  Categories
                </h3>
                <div className="divide-y divide-slate-100 mt-2">
                  {categoryCounts.map((cat: any, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedCategory(cat.name)}
                      className="py-2.5 flex items-center justify-between text-xs cursor-pointer hover:text-emerald-700 transition"
                    >
                      <span className="font-medium text-slate-700">{cat.name}</span>
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Relations & Press Contact Card */}
              <div className="bg-gradient-to-br from-[#063319] to-[#0b4d26] text-white rounded-2xl p-6 shadow-md border border-emerald-800">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Media Relations Desk</span>
                </div>
                <h4 className="text-sm font-black text-white">Press & Media Inquiries</h4>
                <p className="text-xs text-emerald-100 leading-relaxed mt-2">
                  Accredited journalists and editorial collaborators can reach our spokespersons directly for statements, high-resolution photography, or field visits.
                </p>

                <div className="mt-4 space-y-2.5 text-xs text-emerald-100 border-t border-emerald-700/60 pt-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <a
                      href={`mailto:${NEWS_EVENTS_DATA.sidebarContact.email}`}
                      className="hover:text-white transition underline"
                    >
                      {NEWS_EVENTS_DATA.sidebarContact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <a
                      href={`tel:${NEWS_EVENTS_DATA.sidebarContact.phone}`}
                      className="hover:text-white transition"
                    >
                      {NEWS_EVENTS_DATA.sidebarContact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{NEWS_EVENTS_DATA.sidebarContact.locations}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Newsletter Strip */}
          <NewsletterStrip
            title="Never Miss an Update"
            description="Subscribe to receive our latest news, event invitations, and press bulletins directly in your inbox."
            buttonText="Subscribe Now"
          />

          {/* 5. Action Strip */}
          <ActionStrip />
        </div>

        {/* Story Reader Modal */}
        <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
      </div>
    </MediaLayout>
  );
}

export default NewsEventsPage;
