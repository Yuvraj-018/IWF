import { X, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { useState, useEffect } from "react";

interface LightboxModalProps {
  image: { title: string; category: string; image?: string; thumbnail?: string } | null;
  onClose: () => void;
}

export function LightboxModal({ image, onClose }: LightboxModalProps) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition cursor-pointer"
          aria-label="Close photo"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="max-h-[75vh] w-full flex items-center justify-center bg-black/50">
          <img
            src={image.image || image.thumbnail}
            alt={image.title}
            className="max-h-[75vh] w-auto object-contain mx-auto"
          />
        </div>
        <div className="p-4 bg-slate-900 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {image.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">{image.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export const ImageLightboxModal = LightboxModal;

interface VideoModalProps {
  video: { title: string; videoUrl: string; desc?: string } | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition cursor-pointer"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
        <div className="p-4 bg-slate-900 border-t border-white/10">
          <h3 className="text-lg font-bold text-white">{video.title}</h3>
          <p className="text-xs text-slate-300 mt-1">{video.desc}</p>
        </div>
      </div>
    </div>
  );
}

export interface AlbumLightboxProps {
  album: {
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
  } | null;
  onClose: () => void;
}

export function AlbumLightboxModal({ album, onClose }: AlbumLightboxProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [album]);

  useEffect(() => {
    if (!album) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev > 0 ? prev - 1 : album.items.length - 1));
      }
      if (e.key === "ArrowRight") {
        setIndex((prev) => (prev < album.items.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [album, onClose]);

  if (!album || !album.items || album.items.length === 0) return null;

  const currentItem = album.items[index] || album.items[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {album.category || "Gallery Event"}
                </span>
                <span className="text-[11px] text-slate-400">• Photo {index + 1} of {album.items.length}</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">{album.albumTitle}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close Album"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Photo Display with Navigation Arrows */}
        <div className="relative flex-1 min-h-[45vh] max-h-[65vh] w-full flex items-center justify-center bg-black/70 overflow-hidden">
          <img
            src={currentItem.url || currentItem.thumbnailUrl}
            alt={currentItem.title || album.albumTitle}
            className="max-h-[65vh] w-auto max-w-full object-contain mx-auto transition duration-300 select-none"
          />

          {album.items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((prev) => (prev > 0 ? prev - 1 : album.items.length - 1));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((prev) => (prev < album.items.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Details & Thumbnail Reel */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">{currentItem.title || `Moment ${index + 1}`}</p>
              {album.location && (
                <p className="text-[11px] text-slate-400 mt-0.5">{album.location} {album.date ? `• ${album.date}` : ""}</p>
              )}
            </div>
            {currentItem.caption && (
              <p className="text-[11px] text-slate-300 italic max-w-xs text-right line-clamp-1">{currentItem.caption}</p>
            )}
          </div>

          {album.items.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
              {album.items.map((it, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                    index === idx ? "border-emerald-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={it.thumbnailUrl || it.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
