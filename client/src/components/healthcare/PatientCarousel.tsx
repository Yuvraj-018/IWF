import { useEffect, useRef, useState, type ComponentProps } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PatientCard } from "./PatientCard";

type CardPatient = ComponentProps<typeof PatientCard> & { id: string | number };

/**
 * Patient cards: on phones and tablets a single swipeable row that loops
 * automatically every few seconds. On desktop (lg+) four cards per row — a
 * plain grid for up to four patients, a scrollable row with arrows beyond
 * that (so a fifth card never sits alone on a second row).
 */
export function PatientCarousel({ patients }: { patients: CardPatient[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const scrollDesktop = patients.length > 4;

  const step = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 12;
    return card.offsetWidth + gap;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const desktop = window.matchMedia("(width >= 64rem)");
    const onScroll = () => {
      const s = step();
      if (s) setActive(Math.round(track.scrollLeft / s));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const id = window.setInterval(() => {
      if (desktop.matches || pausedRef.current || document.hidden) return;
      const s = step();
      if (!s) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + s, behavior: "smooth" });
    }, 4000);
    return () => {
      window.clearInterval(id);
      track.removeEventListener("scroll", onScroll);
    };
  }, [patients.length]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    window.setTimeout(() => {
      pausedRef.current = false;
    }, 6000);
  };

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    const s = step();
    if (track && s) track.scrollBy({ left: dir * s, behavior: "smooth" });
  };

  // Number of distinct scroll positions on desktop (4 visible at a time).
  const desktopPositions = Math.max(1, patients.length - 3);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onTouchStart={pause}
        onTouchEnd={resume}
        onMouseEnter={pause}
        onMouseLeave={() => (pausedRef.current = false)}
        className={`flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-1 ${
          scrollDesktop ? "" : "lg:grid lg:grid-cols-4 lg:overflow-visible"
        }`}
      >
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`snap-start shrink-0 w-[78%] sm:w-[45%] md:w-[36%] ${
              scrollDesktop ? "lg:w-[calc((100%-3rem)/4)]" : "lg:w-auto"
            }`}
          >
            <PatientCard {...patient} />
          </div>
        ))}
      </div>

      {scrollDesktop && (
        <>
          <button
            type="button"
            aria-label="Previous patients"
            onClick={() => nudge(-1)}
            disabled={active <= 0}
            className="hidden lg:flex absolute -left-4 top-[42%] -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:text-brand-orange disabled:opacity-0 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="More patients"
            onClick={() => nudge(1)}
            disabled={active >= desktopPositions - 1}
            className="hidden lg:flex absolute -right-4 top-[42%] -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:text-brand-orange disabled:opacity-0 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {patients.length > 1 && (
        <div
          className={`flex justify-center gap-1.5 mt-3 ${scrollDesktop ? "" : "lg:hidden"}`}
          aria-hidden="true"
        >
          {patients.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-brand-orange" : "w-1.5 bg-slate-300"
              } ${scrollDesktop && i >= desktopPositions ? "lg:hidden" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
