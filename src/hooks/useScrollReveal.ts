import { useEffect, useRef } from "react";

/**
 * useScrollReveal — attaches IntersectionObserver to a container element.
 * Adds "scroll-fade-up" CSS class to direct children as they enter the viewport.
 * Falls back gracefully if IntersectionObserver is unavailable.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   return <div ref={ref}>...</div>;
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    // Observe all direct children
    Array.from(container.children).forEach((child) => {
      child.classList.add("is-scroll-hidden");
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * useElementScrollReveal — attaches to the element itself (not children).
 */
export function useElementScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    el.classList.add("is-scroll-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-scroll-visible");
          el.classList.remove("is-scroll-hidden");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
