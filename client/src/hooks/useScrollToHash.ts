import { useEffect } from "react";

/**
 * Scrolls to the element with `id` when the URL hash points at it — on first load
 * (including lazily loaded routes, where the browser's own jump happens too early)
 * and when the hash changes later.
 */
export function useScrollToHash(id: string) {
  useEffect(() => {
    const go = () => {
      if (window.location.hash !== `#${id}`) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "auto", block: "start" });
    };
    // Run twice: once after first paint, once after images above have settled.
    const t1 = window.setTimeout(go, 120);
    const t2 = window.setTimeout(go, 700);
    window.addEventListener("hashchange", go);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("hashchange", go);
    };
  }, [id]);
}
