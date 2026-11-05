import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Mail, MessageCircle, Phone, Send, X } from "lucide-react";
import Turnstile from "@/components/common/Turnstile";
import { PhoneCodeSelect } from "@/components/forms/PhoneCodeSelect";
import { isValidPhone, maxDigits, phoneError, phonePlaceholder } from "@/components/forms/phone";
import {
  blockNonDigitsOnKeyDown,
  blockNumbersOnKeyDown,
  isValidEmail,
  sanitizeDigits,
  sanitizeName,
} from "@/utils/formValidation";

type Fields = { name: string; email: string; countryCode: string; mobile: string; message: string };
const EMPTY: Fields = { name: "", email: "", countryCode: "+91", mobile: "", message: "" };

const inputCls = (bad?: boolean) =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
    bad
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-brand-orange focus:ring-brand-orange/15"
  }`;

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="text-xs text-red-600 mt-1">{msg}</p> : null;
}

/**
 * The site's only pop-up form: a quick message to the ISLAH team.
 * Desktop: a card above the button. Phones: a bottom sheet with a backdrop.
 */
export function QuickMessageWidget() {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "form", string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [token, setToken] = useState("");

  const close = () => {
    setOpen(false);
    setErrors({});
    if (status === "success") setStatus("idle");
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    // Lock page scroll only while the phone bottom sheet is showing.
    const phone = window.matchMedia("(width < 40rem)").matches;
    const prev = document.body.style.overflow;
    if (phone) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = <K extends keyof Fields>(k: K, val: Fields[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (v.name.trim().length < 2) next.name = "Enter your name";
    if (!isValidEmail(v.email)) next.email = "Enter a valid email address";
    if (!isValidPhone(v.countryCode, v.mobile))
      next.mobile = phoneError(v.countryCode, v.mobile) ?? "Enter a valid mobile number";
    if (v.message.trim().length < 5)
      next.message = "Please write a few words (at least 5 characters)";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const { submitContact } = await import("@/services/contactService");
      await submitContact({
        name: v.name.trim(),
        email: v.email.trim(),
        phone: v.mobile,
        countryCode: v.countryCode,
        subject: "Quick Float Message",
        message: v.message.trim(),
        source: "Quick Float Modal",
        turnstileToken: token,
      });
      setStatus("success");
      setV(EMPTY);
    } catch (err) {
      setStatus("idle");
      setErrors({
        form: (err as Error).message || "Could not send your message. Please try again.",
      });
    }
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close message form"
          onClick={close}
          className="sm:hidden fixed inset-0 z-[55] bg-slate-900/40"
        />
      )}

      <div className="floating-msg-container fixed z-[56] bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end">
        {open && (
          <div
            role="dialog"
            aria-label="Send us a message"
            className="notranslate form-container fixed inset-x-0 bottom-0 sm:static sm:mb-3 w-full sm:w-[380px] max-h-[88vh] sm:max-h-[78vh] flex flex-col bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            translate="no"
            dir="ltr"
          >
            <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3 border-b border-slate-100">
              <div>
                <p className="text-base font-semibold text-[#071527]">Send us a message</p>
                <p className="text-xs text-slate-500">We usually reply within one working day.</p>
              </div>
              <button
                type="button"
                onClick={close}
                className="p-1.5 -mr-1 rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-4 py-3 overflow-y-auto flex-1">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mb-3">
                <a
                  href="tel:+919811861633"
                  className="inline-flex items-center gap-1.5 hover:text-brand-orange"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" /> +91 9811861633
                </a>
                <a
                  href="mailto:info@iwfindia.org"
                  className="inline-flex items-center gap-1.5 hover:text-brand-orange"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-orange" /> info@iwfindia.org
                </a>
              </div>

              {status === "success" ? (
                <div className="py-8 flex flex-col items-center text-center gap-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  <p className="text-sm font-semibold text-slate-900">Message sent — thank you!</p>
                  <p className="text-xs text-slate-600">Our team will get back to you shortly.</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs font-semibold text-brand-orange hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-3">
                  {errors.form && (
                    <div className="p-2.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
                      {errors.form}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="qm-name"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="qm-name"
                      autoComplete="name"
                      value={v.name}
                      onKeyDown={blockNumbersOnKeyDown}
                      onChange={(e) => set("name", sanitizeName(e.target.value))}
                      placeholder="Your name"
                      className={inputCls(Boolean(errors.name))}
                    />
                    <Err msg={errors.name} />
                  </div>
                  <div>
                    <label
                      htmlFor="qm-email"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="qm-email"
                      type="email"
                      autoComplete="email"
                      value={v.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="name@example.com"
                      className={inputCls(Boolean(errors.email))}
                    />
                    <Err msg={errors.email} />
                  </div>
                  <div>
                    <label
                      htmlFor="qm-mobile"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 items-stretch">
                      <PhoneCodeSelect
                        value={v.countryCode}
                        onChange={(dial) => {
                          set("countryCode", dial);
                          set("mobile", sanitizeDigits(v.mobile, maxDigits(dial)));
                        }}
                      />
                      <input
                        id="qm-mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={v.mobile}
                        onKeyDown={blockNonDigitsOnKeyDown}
                        onChange={(e) =>
                          set("mobile", sanitizeDigits(e.target.value, maxDigits(v.countryCode)))
                        }
                        placeholder={phonePlaceholder(v.countryCode)}
                        className={inputCls(Boolean(errors.mobile))}
                      />
                    </div>
                    <Err msg={errors.mobile} />
                  </div>
                  <div>
                    <label
                      htmlFor="qm-message"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="qm-message"
                      rows={3}
                      value={v.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="How can we help?"
                      className={`${inputCls(Boolean(errors.message))} resize-none`}
                    />
                    <Err msg={errors.message} />
                  </div>
                  <Turnstile
                    size="flexible"
                    theme="light"
                    action="contact"
                    onSuccess={setToken}
                    onExpire={() => setToken("")}
                    onError={() => setToken("")}
                    className="flex justify-center"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-10 rounded-lg bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-label={open ? "Close message form" : "Send us a message"}
          aria-expanded={open}
          className={`${open ? "hidden sm:flex" : "flex"} items-center justify-center gap-2 h-12 w-12 sm:w-auto rounded-full sm:pl-3.5 sm:pr-5 text-white shadow-lg transition hover:shadow-xl ${
            open ? "bg-[#071527] hover:bg-slate-800" : "bg-brand-orange hover:bg-orange-600"
          }`}
        >
          {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          <span className="hidden sm:inline text-sm font-semibold">{open ? "Close" : "Message us"}</span>
        </button>
      </div>
    </>
  );
}
