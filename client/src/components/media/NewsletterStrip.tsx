import { toast } from "@/utils/toast";
import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

interface NewsletterStripProps {
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: "dark" | "green";
}

export function NewsletterStrip({
  title = "Stay Updated with Our Journey",
  description = "Subscribe to our newsletter and never miss an update on our programs, success stories and impact.",
  buttonText = "Subscribe Now",
  variant = "green",
}: NewsletterStripProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      toast.success("Thank you for subscribing to our newsletter!");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const bgClasses =
    variant === "green"
      ? "bg-gradient-to-r from-[#063319] via-[#0b4d26] to-[#063319] text-white border-emerald-800"
      : "bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white border-slate-800";

  return (
    <div className={`rounded-2xl p-6 sm:p-8 my-10 shadow-xl border ${bgClasses} relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-xl text-emerald-300 shrink-0 border border-white/10">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h3>
            <p className="text-sm text-slate-200 mt-1 max-w-xl">{description}</p>
          </div>
        </div>

        <div className="lg:col-span-5">
          {submitted ? (
            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-200 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Thank you! You have been successfully subscribed to our newsletter.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/95 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-sm shadow-md transition shrink-0 cursor-pointer"
              >
                {buttonText}
              </button>
            </form>
          )}
          <p className="text-[11px] text-slate-300 mt-2">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
