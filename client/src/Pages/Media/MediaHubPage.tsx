import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, ArrowRight } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { VideoModal } from "@/components/media/MediaLightboxModals";
import { MediaLayout } from "@/components/media/MediaLayout";
import { MEDIA_HUB_DATA, SUCCESS_STORIES_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useMedia } from "@/services/mediaService";

export function MediaHubPage() {
  const { mediaHubStats } = useSiteSettings();
  const { getMedia } = useMedia();
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const sectionSlotKeys: Record<string, string> = {
    "Outcomes & Impact": "media-section-outcomes",
    "Success Stories": "media-section-stories",
    "News & Events": "media-section-news",
    "Annual Reports": "media-section-reports",
    "Publications & Research": "media-section-publications",
    "Photo & Video Gallery": "media-section-gallery",
  };

  const statsRibbon = [
    { value: mediaHubStats?.fieldEvents || "120+", label: "Field Events", desc: "Organized across 15+ rural districts" },
    { value: mediaHubStats?.newsBulletins || "250+", label: "News & Bulletins", desc: "Verified dispatches & media coverage" },
    { value: mediaHubStats?.livesReached || "50,000+", label: "Lives Reached", desc: "Direct beneficiary impact to date" },
    { value: mediaHubStats?.publications || "18+", label: "Publications", desc: "Research briefs & whitepapers" },
    { value: mediaHubStats?.visualStories || "500+", label: "Visual Stories", desc: "Archived field documentation" },
  ];

  const handleOpenLatest = (title: string) => {
    const matched = SUCCESS_STORIES_DATA.stories.find((s) =>
      title.toLowerCase().includes(s.category.toLowerCase()) || s.title.toLowerCase().includes(title.toLowerCase())
    );
    if (matched) setActiveStory(matched);
    else setActiveStory(SUCCESS_STORIES_DATA.stories[0]);
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
        {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={MEDIA_HUB_DATA.hero.badge}
        title={MEDIA_HUB_DATA.hero.title}
        description={MEDIA_HUB_DATA.hero.description}
        breadcrumb={[{ label: "Media & Updates" }]}
        image={getMedia("media-hero", MEDIA_HUB_DATA.hero.image)}
        imageAlt="Islah Media Hub"
        actions={
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/media/outcomes"
              className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              Outcomes & Impact
            </Link>
            <Link
              to="/media/news-and-events"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
            >
              News & Events
            </Link>
            <Link
              to="/media/publications"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
            >
              Publications & Research
            </Link>
            <Link
              to="/media/gallery"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
            >
              Photo & Video Gallery
            </Link>
          </div>
        }
        rightOverlay={
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold transition border border-white/20 cursor-pointer shadow-lg w-full"
          >
            <div className="w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-sky-300 uppercase tracking-wider">Watch Video</div>
              <div className="text-[11px] font-semibold line-clamp-1">{MEDIA_HUB_DATA.hero.videoBadge}</div>
            </div>
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Top Stats Ribbon (5 Cards) */}
        <section aria-label="Media Reach Metrics">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {statsRibbon.map((stat, idx) => (
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

        {/* 3. The 6 Pillars of Media Hub (6 Card Grid) */}
        <section aria-labelledby="media-sections-heading">
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-slate-300 flex-1" />
            <h2 id="media-sections-heading" className="text-sm sm:text-base font-black tracking-widest uppercase text-slate-700 text-center">
              Explore Our Media Sections
            </h2>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEDIA_HUB_DATA.sections.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition duration-300 flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={getMedia(sectionSlotKeys[sec.title] || "", sec.image)}
                    alt={sec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-lg font-black text-white drop-shadow">{sec.title}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed">{sec.desc}</p>
                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <Link
                      to={sec.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                    >
                      <span>{sec.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Latest From Our Communities */}
        <section aria-labelledby="latest-communities-heading">
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-slate-300 flex-1" />
            <h2 id="latest-communities-heading" className="text-sm sm:text-base font-black tracking-widest uppercase text-slate-700 text-center">
              Latest From Our Communities
            </h2>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEDIA_HUB_DATA.latestFromCommunities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenLatest(item.title)}
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
        </section>

        {/* 5. Action Strip */}
        <ActionStrip />
      </div>

      {/* Story Modal */}
      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />

      {/* Video Modal */}
      <VideoModal
        video={
          videoOpen
            ? {
                title: "A Decade of Community Transformation — Islah Welfare Foundation",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                desc: "Discover how our grassroots initiatives across Bihar and beyond are empowering lives.",
              }
            : null
        }
        onClose={() => setVideoOpen(false)}
      />
      </div>
    </MediaLayout>
  );
}

export default MediaHubPage;
