import { X, MapPin, Quote, CheckCircle2 } from "lucide-react";
import type { SuccessStoryItem } from "@/content/mediaContent";

interface StoryModalProps {
  story: SuccessStoryItem | null;
  onClose: () => void;
}

export function StoryModal({ story, onClose }: StoryModalProps) {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with close button */}
        <div className="relative h-60 w-full bg-slate-900 shrink-0 flex items-center justify-center overflow-hidden">
          <img
            src={story.image || `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='240' viewBox='0 0 600 240'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23059669'/><stop offset='100%' stop-color='%2310b981'/></linearGradient></defs><rect width='600' height='240' fill='url(%23g)'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='system-ui,sans-serif' font-size='48' font-weight='800' letter-spacing='2'>${encodeURIComponent(story.personName?.slice(0, 2).toUpperCase() || "IWF")}</text></svg>`}
            alt={story.title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='240' viewBox='0 0 600 240'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23059669'/><stop offset='100%' stop-color='%2310b981'/></linearGradient></defs><rect width='600' height='240' fill='url(%23g)'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='system-ui,sans-serif' font-size='48' font-weight='800' letter-spacing='2'>${encodeURIComponent(story.personName?.slice(0, 2).toUpperCase() || "IWF")}</text></svg>`;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-sm inline-block mb-2">
              {story.category}
            </span>
            <h2 className="text-2xl font-black text-white leading-tight">{story.title}</h2>
            <div className="flex items-center gap-2 text-xs text-emerald-300 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{story.personName} • {story.village}, {story.state}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quote */}
          {story.quote && (
            <div className="p-4 rounded-xl bg-emerald-50 border-l-4 border-emerald-600 flex items-start gap-3">
              <Quote className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold italic text-emerald-950">"{story.quote}"</p>
            </div>
          )}

          {/* Full Story Content */}
          <div className="text-sm text-slate-700 leading-relaxed space-y-3">
            <p className="font-medium text-slate-900">{story.excerpt}</p>
            <p>{story.fullStory}</p>
          </div>

          {/* Impact Milestones */}
          {story.impactMetrics && story.impactMetrics.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Key Impact Milestones</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {story.impactMetrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs cursor-pointer transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
