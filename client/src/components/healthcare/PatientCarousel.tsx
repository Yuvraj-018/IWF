import { useEffect, useRef, useState, type ComponentProps } from "react";
import { PatientCard } from "./PatientCard";

type CardPatient = ComponentProps<typeof PatientCard> & { id: string | number };

/**
 * Patient cards: on phones and tablets a single swipeable row that loops
 * automatically every few seconds; on desktop (lg+) a 4-column grid.
 */
export function PatientCarousel({ patients }: { patients: CardPatient[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const desktop = window.matchMedia("(width >= 64rem)");
    const step = () => {
      const card = track.firstElementChild as HTMLElement | null;
      return card ? card.offsetWidth + 12 : 0;
    };
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

  return (
    <div>
      <div
        ref={trackRef}
        onTouchStart={pause}
        onTouchEnd={resume}
        onMouseEnter={pause}
        onMouseLeave={() => (pausedRef.current = false)}
        className="flex lg:grid lg:grid-cols-4 gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pb-1"
      >
        {patients.map((patient) => (
          <div key={patient.id} className="snap-start shrink-0 w-[78%] sm:w-[45%] md:w-[36%] lg:w-auto">
            <PatientCard {...patient} />
          </div>
        ))}
      </div>
      {patients.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3 lg:hidden" aria-hidden="true">
          {patients.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-brand-orange" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
