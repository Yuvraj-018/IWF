import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          cdata?: string;
          callback?: (token: string) => void;
          "error-callback"?: (error: any) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export interface TurnstileProps {
  onSuccess: (token: string) => void;
  onError?: (err?: any) => void;
  onExpire?: () => void;
  action?: string;
  cdata?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  className?: string;
}

/**
 * Resilient Cloudflare Turnstile Client Widget for CMS Admin Console
 * - Loads official script: https://challenges.cloudflare.com/turnstile/v0/api.js
 * - Handles sitekey from VITE_TURNSTILE_SITE_KEY with Cloudflare official demo fallback
 * - Disposes cleanly on unmount to prevent memory leaks
 */
export function Turnstile({
  onSuccess,
  onError,
  onExpire,
  action = "cms_admin",
  cdata,
  theme = "dark",
  size = "normal",
  className = "",
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [, setToken] = useState<string>("");

  const siteKey =
    (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ||
    "1x00000000000000000000AA";

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;

      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          cdata,
          theme,
          size,
          callback: (receivedToken: string) => {
            if (isMounted) {
              setToken(receivedToken);
              onSuccess(receivedToken);
            }
          },
          "error-callback": (err: any) => {
            if (isMounted) {
              setToken("");
              onError?.(err);
            }
          },
          "expired-callback": () => {
            if (isMounted) {
              setToken("");
              onExpire?.();
            }
          },
        });
      } catch (e) {
        console.warn("[Turnstile] Render error:", e);
      }
    };

    // If turnstile script already loaded
    if (window.turnstile) {
      renderWidget();
      return () => {
        isMounted = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {}
        }
      };
    }

    // Otherwise load script dynamically
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    if (existingScript) {
      const originalCallback = window.onloadTurnstileCallback;
      window.onloadTurnstileCallback = () => {
        originalCallback?.();
        renderWidget();
      };
    } else {
      window.onloadTurnstileCallback = () => {
        renderWidget();
      };
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
    };
  }, [siteKey, action, theme, size]);

  return (
    <div className={`turnstile-widget-container flex justify-center py-2 ${className}`}>
      <div ref={containerRef} className="cf-turnstile min-h-[65px] flex items-center justify-center" />
    </div>
  );
}

