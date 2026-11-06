import { useState, useMemo, useEffect } from "react";
import { Play, Eye, Image as ImageIcon, Video, Filter, Layers } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { ImageLightboxModal, VideoModal, AlbumLightboxModal } from "@/components/media/MediaLightboxModals";
import { MediaLayout } from "@/components/media/MediaLayout";
import { GALLERY_DATA } from "@/content/mediaContent";
import type { GalleryItem } from "@/content/mediaContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useMedia, fetchGalleryAlbums, type GalleryAlbum } from "@/services/mediaService";

export function GalleryPage() {
  const { galleryStats } = useSiteSettings();
  const { getMedia, mediaList } = useMedia("gallery");
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All Media");
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<{
    albumTitle: string;
    location?: string;
    date?: string;
    category?: string;
    items: Array<{
      title: string;
      url: string;
      thumbnailUrl?: string;
      caption?: string;
    }>;
  } | null>(null);
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    videoUrl: string;
    desc?: string;
  } | null>(null);

  useEffect(() => {
    fetchGalleryAlbums().then((res) => {
      if (res && res.length > 0) {
        setAlbums(res);
      }
    });
  }, []);

  const dynamicStatsRibbon = [
    { value: galleryStats?.fieldPhotos || "500+", label: "Field Photos", desc: "Verifiable project documentation" },
    { value: galleryStats?.videoStories || "35+", label: "Video Stories", desc: "Grassroots testimonials & documentaries" },
    { value: galleryStats?.districtsCovered || "15+", label: "Districts Covered", desc: "Field programs across Bihar & UP" },
    { value: galleryStats?.realImpact || "100%", label: "Real Impact", desc: "Authentic on-site community moments" },
  ];

  const displayItems = useMemo(() => {
    if (albums.length > 0) {
      return albums.map((alb) => ({
        id: alb.albumId,
        type: (alb.mediaType || "photo") as "photo" | "video",
        title: alb.albumTitle,
        category: alb.items[0]?.tags?.[0] || "Community Development",
        location: alb.location || "Bihar, India",
        date: alb.date || "2024",
        thumbnail: alb.coverUrl,
        image: alb.coverUrl,
        videoUrl: alb.videoUrl || alb.items.find((i) => i.videoUrl)?.videoUrl,
        count: alb.count,
        items: alb.items,
      }));
    }

    const galleryFromMedia = mediaList.filter((m) => m.category === "gallery");
    if (galleryFromMedia.length > 0) {
      return galleryFromMedia.map((m) => ({
        id: m._id || m.key,
        type: (m.mediaType || "photo") as "photo" | "video",
        title: m.title,
        category: m.tags?.[0] || "Community Development",
        location: m.location || "Bihar, India",
        date: m.date || "2024",
        thumbnail: m.thumbnailUrl || m.url,
        image: m.url,
        videoUrl: m.videoUrl,
        count: 1,
        items: [{ title: m.title, url: m.url, thumbnailUrl: m.thumbnailUrl, caption: m.caption }],
      }));
    }

    return GALLERY_DATA.items.map((item) => ({
      ...item,
      count: 1,
      items: [{ title: item.title, url: item.image || item.thumbnail, thumbnailUrl: item.thumbnail }],
    }));
  }, [albums, mediaList]);

  const dynamicCategories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All Media");
    cats.add("Photos");
    cats.add("Videos");
    for (const it of displayItems) {
      if (it.category) cats.add(it.category);
    }
    for (const c of GALLERY_DATA.categories) {
      cats.add(c);
    }
    return Array.from(cats);
  }, [displayItems]);

  const filteredItems = useMemo(() => {
    return displayItems.filter((item) => {
      if (selectedFilter === "All Media") return true;
      if (selectedFilter === "Photos") return item.type === "photo";
      if (selectedFilter === "Videos") return item.type === "video";
      return item.category?.toLowerCase() === selectedFilter.toLowerCase();
    });
  }, [displayItems, selectedFilter]);

  const handleItemClick = (item: any) => {
    if (item.type === "video") {
      setActiveVideo({
        title: item.title,
        videoUrl: item.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
        desc: `${item.title} — Recorded on-site in ${item.location}.`,
      });
    } else if (item.items && item.items.length > 1) {
      setActiveAlbum({
        albumTitle: item.title,
        location: item.location,
        date: item.date,
        category: item.category,
        items: item.items.map((it: any) => ({
          title: it.title || item.title,
          url: it.url || it.image || item.image,
          thumbnailUrl: it.thumbnailUrl || it.thumbnail || item.thumbnail,
          caption: it.caption,
        })),
      });
    } else {
      setActivePhoto({
        id: item.id,
        type: "photo",
        title: item.title,
        category: item.category,
        thumbnail: item.thumbnail,
        image: item.image || item.thumbnail,
        location: item.location,
        date: item.date,
      });
    }
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={GALLERY_DATA.hero.badge}
        title={GALLERY_DATA.hero.title}
        description={GALLERY_DATA.hero.description}
        breadcrumb={[
          { label: "Media & Updates", href: "/media" },
          { label: "Photo & Video Gallery" },
        ]}
        image={getMedia("media-gallery-hero", GALLERY_DATA.hero.image)}
        imageAlt="Islah Visual Archive"
        actions={
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedFilter("Photos")}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm flex items-center gap-1.5 ${
                selectedFilter === "Photos"
                  ? "bg-brand-orange text-white"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setSelectedFilter("Videos")}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm flex items-center gap-1.5 ${
                selectedFilter === "Videos"
                  ? "bg-brand-orange text-white"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setSelectedFilter("All Media")}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm ${
                selectedFilter === "All Media"
                  ? "bg-brand-orange text-white"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              }`}
            >
              All Media
            </button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Four Stats Ribbon */}
        <section aria-label="Visual Archive Metrics">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {dynamicStatsRibbon.map((stat, idx) => (
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

        {/* 3. Filter Bar */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2 shrink-0">
              <Filter className="w-4 h-4" />
              <span className="uppercase tracking-wider">Filter:</span>
            </div>
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedFilter.toLowerCase() === cat.toLowerCase()
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 4. Main Gallery Grid (Dynamic Albums & Media) */}
        <section aria-labelledby="gallery-grid-heading">
          <h2 id="gallery-grid-heading" className="sr-only">Visual Archive Gallery</h2>
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <p className="text-sm font-semibold text-slate-500">
                No items found for "{selectedFilter}".
              </p>
              <button
                onClick={() => setSelectedFilter("All Media")}
                className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Show all media
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition duration-300" />

                    {/* Type Badge & Category */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                        {item.category}
                      </span>
                      {item.items && item.items.length > 1 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-700/90 text-white backdrop-blur-sm flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          <span>{item.items.length} Photos</span>
                        </span>
                      )}
                    </div>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {item.type === "video" ? (
                        <div className="w-12 h-12 rounded-full bg-orange-600/90 text-white flex items-center justify-center group-hover:scale-110 transition shadow-lg backdrop-blur-sm">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      ) : item.items && item.items.length > 1 ? (
                        <div className="w-11 h-11 rounded-full bg-emerald-600/90 text-white flex items-center justify-center group-hover:scale-110 transition shadow-lg backdrop-blur-sm">
                          <Layers className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition shadow-lg backdrop-blur-sm">
                          <Eye className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-xs font-bold leading-snug drop-shadow line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="text-[10px] text-slate-300 mt-1 flex items-center justify-between">
                        <span>{item.location}</span>
                        {item.date && <span>{item.date}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 5. Action Strip */}
        <ActionStrip />
      </div>

      {/* Lightbox Photo Modal */}
      <ImageLightboxModal image={activePhoto} onClose={() => setActivePhoto(null)} />

      {/* Album Multi-Photo Lightbox Modal */}
      <AlbumLightboxModal album={activeAlbum} onClose={() => setActiveAlbum(null)} />

      {/* Video Modal */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
    </MediaLayout>
  );
}

export default GalleryPage;
