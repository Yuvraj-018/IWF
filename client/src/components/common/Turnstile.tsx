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
 * Canonical Cloudflare Turnstile Client Widget Component
 * - Dynamically loads the Cloudflare Turnstile API script if not already present.
 * - Renders explicit widget instance with action, sitekey, and lifecycle callbacks.
 * - Cleanly removes widget on unmount to avoid DOM / memory leaks.
 * - Injects a hidden input for standard form submission fallback.
 */
export function Turnstile({
  onSuccess,
  onError,
  onExpire,
  action,
  cdata,
  theme = "light",
  size = "normal",
  className = "",
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState<string>("");

  const siteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;

      // Clean up previous widget instance if re-rendering
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
      } catch (err) {
        console.warn("[Turnstile] Render exception:", err);
      }
    };

    const existingScript = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    );

    if (window.turnstile) {
      renderWidget();
    } else if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderWidget();
      };
      document.head.appendChild(script);
    } else {
      existingScript.addEventListener("load", renderWidget);
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, action, cdata, theme, size]);

  return (
    <div className={`turnstile-wrapper my-2.5 ${className}`}>
      <div ref={containerRef} className="flex justify-center sm:justify-start" />
      {/* Standard hidden input for compatibility with native HTML form POSTs */}
      <input type="hidden" name="cf-turnstile-response" value={token} />
    </div>
  );
}

export default Turnstile;
