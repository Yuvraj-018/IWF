import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  X,
  Send,
  Loader2,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";
import PageTransition, { ScrollProgressBar } from "@/components/PageTransition";
import { FloatingTranslateButton } from "@/components/TranslateButton";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Islah Welfare Foundation — Empowering Lives Through Education, Healthcare & Livelihood" },
      { name: "description", content: "Islah Welfare Foundation works in rural India through education, healthcare, women empowerment and rural development." },
      { name: "author", content: "Islah Welfare Foundation" },
      { property: "og:title", content: "Islah Welfare Foundation" },
      { property: "og:description", content: "Empowering Lives Through Education, Healthcare & Livelihood" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [msgOpen, setMsgOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleMsgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    // Simulate API submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgressBar />
      <PageTransition>
        <Outlet />
      </PageTransition>

      {/* Sticky Social Links Sidebar on Right Edge */}
      <div className="fixed right-0 top-[75%] -translate-y-1/2 z-50 flex flex-col shadow-2xl rounded-l-xl overflow-hidden select-none">
        {[
          { Icon: Facebook, color: "bg-[#1877f2] hover:bg-[#166fe5]", href: "https://facebook.com", name: "Facebook" },
          { Icon: Twitter, color: "bg-[#1da1f2] hover:bg-[#0d95e8]", href: "https://twitter.com", name: "Twitter" },
          { Icon: Instagram, color: "bg-gradient-to-tr from-[#f9cb2f] via-[#e5195f] to-[#8134af]", href: "https://instagram.com", name: "Instagram" },
          { Icon: Linkedin, color: "bg-[#0077b5] hover:bg-[#00669c]", href: "https://linkedin.com", name: "LinkedIn" },
          { Icon: Youtube, color: "bg-[#ff0000] hover:bg-[#e60000]", href: "https://youtube.com", name: "YouTube" }
        ].map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.color} w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white transition-all duration-300 hover:w-11 group`}
            title={social.name}
          >
            <social.Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          </a>
        ))}
      </div>

      {/* Sticky Message Box Floating Button & Panel on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
        {/* Floating Message Card */}
        {msgOpen && (
          <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in">
            {/* Header */}
            <div className="bg-[#0b1f3b] text-white p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">Quick Message</h4>
                <p className="text-[10px] text-white/70">Let us know how we can help you</p>
              </div>
              <button 
                onClick={() => { setMsgOpen(false); setFormStatus("idle"); }}
                className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close message form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 bg-white text-slate-800">
              {/* Direct Contact Details */}
              <div className="mb-4 pb-3 border-b border-gray-100 flex flex-col gap-1.5 text-xs text-slate-600">
                <a href="tel:+919811861633" className="flex items-center gap-2 hover:text-brand-orange transition-colors font-medium">
                  <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>+91-9811861633</span>
                </a>
                <a href="mailto:info@iwfindia.org" className="flex items-center gap-2 hover:text-brand-orange transition-colors font-medium">
                  <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>info@iwfindia.org</span>
                </a>
              </div>

              {formStatus === "success" ? (
                <div className="py-6 flex flex-col items-center text-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-[#22c55e] animate-bounce" />
                  <div>
                    <h5 className="font-bold text-sm text-[#0b1f3b]">Thank you!</h5>
                    <p className="text-xs text-gray-600 mt-1">Your message has been sent successfully. We will get back to you shortly.</p>
                  </div>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-2 text-xs font-semibold text-brand-orange hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : formStatus === "loading" ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
                  <span className="text-xs text-gray-500 font-medium">Sending your message...</span>
                </div>
              ) : (
                <form onSubmit={handleMsgSubmit} className="flex flex-col gap-3">
                  <div>
                    <label htmlFor="msg-name" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Your Name</label>
                    <input
                      id="msg-name"
                      type="text"
                      required
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/30 text-slate-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="msg-email" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Your Email</label>
                    <input
                      id="msg-email"
                      type="email"
                      required
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/30 text-slate-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="msg-text" className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Message</label>
                    <textarea
                      id="msg-text"
                      required
                      rows={3}
                      placeholder="How can we assist you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/30 text-slate-800 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send className="w-3 h-3" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Float Toggle Button */}
        <button
          onClick={() => setMsgOpen(!msgOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
            msgOpen ? "bg-[#0b1f3b] hover:bg-[#071629] rotate-90" : "bg-brand-orange hover:bg-brand-orange-dark hover:shadow-brand-orange/30"
          }`}
          aria-label="Toggle contact message popup"
          title="Send a message"
        >
          {msgOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5 fill-white text-brand-orange" />}
        </button>
      </div>
      <FloatingTranslateButton />
    </QueryClientProvider>
  );
}
