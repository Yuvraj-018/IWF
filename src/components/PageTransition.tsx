import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * PageTransition — wraps page content with a fade-in/out on route changes.
 * Also renders the global scroll progress bar.
 */
export function ScrollProgressBar() {
  return (
    <div
      className="scroll-progress-bar"
      aria-hidden="true"
    />
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;

    if (prevPathRef.current !== null && prevPathRef.current !== currentPath) {
      // Route changed — quick fade-out then fade-in
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsVisible(true);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 150);
      prevPathRef.current = currentPath;
      return () => clearTimeout(timer);
    }

    // Initial mount
    const timer = setTimeout(() => setIsVisible(true), 10);
    prevPathRef.current = currentPath;
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
