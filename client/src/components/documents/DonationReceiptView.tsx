import logoUrl from "@/assets/new logo.png";
import { ORG } from "./orgDetails";
import { buildDonationReceiptModel, type DonationReceiptInfo } from "./donationReceipt";

/** On-screen version of the donation receipt; content mirrors the PDF exactly. */
export function DonationReceiptView({ info }: { info: DonationReceiptInfo }) {
  const m = buildDonationReceiptModel(info);

  return (
    <article className="bg-white border-2 border-[#1f4e79] rounded-md px-4 sm:px-6 py-5 text-left text-slate-800 text-xs sm:text-[13px] leading-relaxed">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b-2 border-[#b8860b]">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="" className="h-14 w-auto shrink-0" />
          <div>
            <p className="text-sm sm:text-base font-bold text-[#1f4e79] leading-tight">
              {ORG.nameUpper}
            </p>
            <p className="text-slate-500">{ORG.tagline}</p>
          </div>
        </div>
        <div className="sm:text-right leading-snug">
          <p className="font-bold text-[#1f4e79] text-sm">DONATION RECEIPT</p>
          <p className="font-bold text-[#2e7d32]">{m.subtitle}</p>
          <p className="font-bold text-[#b8860b]">{m.requestLine}</p>
        </div>
      </header>

      {/* Info strip */}
      <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-0.5 bg-[#eef3f8] border border-slate-200 px-3 py-2">
        {m.stripLeft
          .flatMap((l, i) => [l, m.stripRight[i]])
          .filter(Boolean)
          .map(([k, v]) => (
            <div key={k} className="flex gap-2 min-w-0">
              <dt className="text-slate-500 w-32 shrink-0">{k}</dt>
              <dd className="font-medium break-all">{v}</dd>
            </div>
          ))}
      </dl>

      {/* Sections */}
      {m.sections.map((s) => (
        <section key={s.title} className="mt-4">
          <h4 className="text-[#b8860b] font-bold mb-1">{s.title}</h4>
          <dl className="border-t border-l border-slate-200">
            {s.rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[40%_60%] sm:grid-cols-2">
                <dt className="font-bold text-[#1f4e79] px-2 py-1 border-r border-b border-slate-200">
                  {k}
                </dt>
                <dd className="px-2 py-1 border-r border-b border-slate-200 break-words">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      {/* Notice */}
      <div className="mt-4 border border-[#2e7d32] bg-[#f1f8f1] px-3 py-2">
        <p className="text-center font-bold text-[#2e7d32]">{m.notice.title}</p>
        {m.notice.subtitle && (
          <p className="text-center font-bold text-[#1f4e79]">{m.notice.subtitle}</p>
        )}
        <p className="mt-1">{m.notice.body}</p>
      </div>

      <p className="mt-3 text-center font-bold text-[#b8860b]">OUR COMMITMENT</p>
      <p>
        {m.commitment.body}{" "}
        {m.commitment.emphasis && (
          <strong className="text-[#1f4e79]">{m.commitment.emphasis}</strong>
        )}
      </p>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-bold text-[#1f4e79]">
            Thank you for turning resources into possibilities.
          </p>
          <p>Your support strengthens ISLAH&apos;s community initiatives.</p>
        </div>
        <div className="sm:text-right pt-6 sm:border-t-0">
          <div className="hidden sm:block w-44 ml-auto border-t border-slate-400 mb-1" />
          <p className="font-bold">Authorised Signatory</p>
          <p className="font-bold">{ORG.name}</p>
        </div>
      </div>

      <p className="mt-3 bg-slate-100 border border-slate-200 px-3 py-2">
        <strong>IMPORTANT:</strong> {m.important}
      </p>

      <p className="mt-3 text-center font-semibold text-slate-700">
        {ORG.registeredOffice} • {ORG.phone} • {ORG.email} • {ORG.website}
      </p>
    </article>
  );
}
