import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  stagger?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  stagger = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ── Mobile: use IntersectionObserver — no GSAP ──────────────────────────
    if (window.innerWidth < 768) {
      const isAlreadyVisible = () => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      };

      const show = () => {
        el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
        el.style.opacity = "1";
        el.style.transform = "none";
      };

      const initial =
        direction === "up"
          ? "translateY(40px)"
          : direction === "left"
          ? "translateX(-40px)"
          : "translateX(40px)";

      // If already in viewport on mount (e.g., navigating back), show immediately
      if (isAlreadyVisible()) {
        el.style.opacity = "1";
        el.style.transform = "none";
        return;
      }

      el.style.opacity = "0";
      el.style.transform = initial;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            show();
            observer.unobserve(el);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);

      return () => observer.disconnect();
    }

    // ── Desktop: GSAP + ScrollTrigger ────────────────────────────────────────

    // Kill any leftover ScrollTriggers on this element from previous renders
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === el || (stagger > 0 && Array.from(el.children).includes(t.trigger as Element))) {
        t.kill();
      }
    });

    // Use gsap.context() so .revert() cleans up everything on unmount
    const ctx = gsap.context(() => {
      const fromVars: gsap.TweenVars = {
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        delay,
        // KEY FIX: don't apply the "from" state immediately on mount.
        // Without this, GSAP sets opacity:0 right away and if ScrollTrigger
        // hasn't recalculated yet (e.g. after a route change), elements stay invisible.
        immediateRender: false,
        ...(direction === "up"
          ? { y: 48 }
          : direction === "left"
          ? { x: -48 }
          : { x: 48 }),
      };

      const triggerConfig: ScrollTrigger.Vars = {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
        // once: true prevents re-triggering issues on back navigation
        once: true,
      };

      if (stagger > 0) {
        gsap.from(Array.from(el.children), {
          ...fromVars,
          stagger,
          scrollTrigger: triggerConfig,
        });
      } else {
        gsap.from(el, {
          ...fromVars,
          scrollTrigger: triggerConfig,
        });
      }
    }, el);

    // Refresh ScrollTrigger after a tick so it recalculates scroll positions
    // after the route has fully rendered (fixes blank page on back-navigation)
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 80);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert(); // kills all tweens AND ScrollTriggers created inside ctx
    };
  }, [delay, direction, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
