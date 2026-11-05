import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Users,
  ShieldCheck,
  CalendarDays,
  HandHeart,
  Building2,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Download,
  Share2,
  FileText,
} from "lucide-react";
import logoUrl from "@/assets/new logo.png";
import { FOUNDATION, MEMBERSHIP_TIERS, type TierType } from "./membershipConfig";

// ============================================================================
// Types & palette
// ============================================================================

export interface MemberCardData {
  tier: TierType;
  name: string;
  memberId: string;
  validFrom: string;
  validTill: string;
  /** Data URL of the member's photograph (optional). */
  photoUrl?: string;
  isOrganisation?: boolean;
}

const PALETTE: Record<TierType, { main: string; dark: string; light: string; text: string }> = {
  Blue: { main: "#0b3d91", dark: "#06275f", light: "#3b9cf0", text: "#0b3d91" },
  Yellow: { main: "#d99a0b", dark: "#a86f04", light: "#f6c445", text: "#b07a06" },
  Green: { main: "#146c31", dark: "#0b4a20", light: "#43b36a", text: "#146c31" },
  Orange: { main: "#ea6a12", dark: "#b94e08", light: "#fb9a4b", text: "#d65c0c" },
};

const W = 1000;
const H = 630;
const FONT = "'Open Sans', Arial, Helvetica, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

/** Load the logo once as a data URL so exported images are self-contained. */
function useLogoDataUrl() {
  const [src, setSrc] = useState<string>(logoUrl);
  useEffect(() => {
    let cancelled = false;
    fetch(logoUrl)
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      )
      .then((data) => !cancelled && setSrc(data))
      .catch(() => {
        /* keep URL fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return src;
}

function nameFontSize(name: string) {
  const len = Math.max(name.length, 1);
  return Math.max(20, Math.min(36, Math.floor(440 / (len * 0.62))));
}

// ============================================================================
// Front side
// ============================================================================

export const MemberCardFront = forwardRef<SVGSVGElement, { data: MemberCardData; logo: string }>(
  function MemberCardFront({ data, logo }, ref) {
    const c = PALETTE[data.tier];
    const tier = MEMBERSHIP_TIERS[data.tier];
    const uid = `f${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    const displayName = data.name.toUpperCase();
    const initials = data.name
      .split(/\s+/)
      .filter((p) => p && !p.endsWith("."))
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("");

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="w-full h-auto block"
        fontFamily={FONT}
        role="img"
        aria-label={`${tier.cardName} for ${data.name}`}
      >
        <defs>
          <clipPath id={`${uid}-clip`}>
            <rect width={W} height={H} rx={34} />
          </clipPath>
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#eef3f9" />
          </linearGradient>
          <linearGradient id={`${uid}-panel`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c.main} />
            <stop offset="1" stopColor={c.dark} />
          </linearGradient>
          <clipPath id={`${uid}-photo`}>
            <circle cx={805} cy={330} r={118} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${uid}-clip)`}>
          <rect width={W} height={H} fill={`url(#${uid}-bg)`} />

          {/* subtle guilloche lines on the white area */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M 220 ${380 + i * 14} C 380 ${300 + i * 12}, 520 ${330 + i * 16}, 650 ${290 + i * 18}`}
              stroke={c.main}
              strokeOpacity={0.06}
              strokeWidth={1.5}
              fill="none"
            />
          ))}

          {/* coloured right panel + bottom band */}
          <path
            d="M 585 0 H 1000 V 630 H 0 V 556 H 560 C 650 556, 682 470, 662 360 C 642 250, 600 120, 585 0 Z"
            fill={`url(#${uid}-panel)`}
          />
          <path
            d="M 640 0 C 660 140, 700 260, 690 380 C 682 470, 650 540, 600 630"
            stroke={c.light}
            strokeOpacity={0.35}
            strokeWidth={3}
            fill="none"
          />
          <path
            d="M 1000 420 C 920 470, 860 560, 840 630"
            stroke={c.light}
            strokeOpacity={0.25}
            strokeWidth={26}
            fill="none"
          />

          {/* Logo + wordmark */}
          <image
            href={logo}
            x={38}
            y={30}
            width={128}
            height={152}
            preserveAspectRatio="xMidYMid meet"
          />
          {/* textLength pins widths so layout holds even when export falls back to another font */}
          <text
            x={182}
            y={120}
            fontFamily={SERIF}
            fontWeight={700}
            fontSize={84}
            fill="#0d2557"
            textLength={290}
            lengthAdjust="spacingAndGlyphs"
          >
            ISLAH
          </text>
          <line x1={180} y1={151} x2={198} y2={151} stroke="#1f7a33" strokeWidth={2} />
          <circle cx={202} cy={151} r={3} fill="#1f7a33" />
          <text
            x={212}
            y={158}
            fontWeight={700}
            fontSize={21}
            fill="#1f7a33"
            textLength={230}
            lengthAdjust="spacingAndGlyphs"
          >
            WELFARE FOUNDATION
          </text>
          <circle cx={452} cy={151} r={3} fill="#1f7a33" />
          <line x1={456} y1={151} x2={474} y2={151} stroke="#1f7a33" strokeWidth={2} />
          <text x={327} y={188} textAnchor="middle" fontSize={18} fill="#1e293b">
            Care. Empower. Uplift.
          </text>
          <text
            x={40}
            y={238}
            fontWeight={700}
            fontSize={14}
            fill={c.text}
            textLength={520}
            lengthAdjust="spacingAndGlyphs"
          >
            EMPOWERING YOUTH | ENRICHING COMMUNITIES | TRANSFORMING LIVES
          </text>

          {/* Name block */}
          <rect x={40} y={282} width={86} height={86} rx={14} fill={c.main} />
          {data.isOrganisation ? (
            <Building2 x={58} y={300} width={50} height={50} color="#ffffff" strokeWidth={1.8} />
          ) : (
            <User x={56} y={298} width={54} height={54} color="#ffffff" strokeWidth={2} />
          )}
          <text
            x={146}
            y={320}
            fontWeight={700}
            fontSize={nameFontSize(displayName)}
            fill="#0f172a"
            {...(displayName.length * nameFontSize(displayName) * 0.68 > 460
              ? { textLength: 460, lengthAdjust: "spacingAndGlyphs" as const }
              : {})}
          >
            {displayName}
          </text>
          <text x={146} y={358} fontSize={19} fill="#334155">
            Member ID : {data.memberId}
          </text>

          {/* Validity */}
          <Calendar x={42} y={410} width={64} height={64} color={c.main} strokeWidth={1.6} />
          <text x={146} y={432} fontSize={17} fill="#475569">
            Valid From
          </text>
          <text x={146} y={466} fontSize={25} fill="#0f172a">
            {data.validFrom}
          </text>
          <line x1={348} y1={414} x2={348} y2={478} stroke={c.main} strokeWidth={2} />
          <text x={378} y={432} fontSize={17} fill="#475569">
            Valid Till
          </text>
          <text x={378} y={466} fontSize={25} fill="#0f172a">
            {data.validTill}
          </text>

          {/* Bottom band label */}
          <text
            x={300}
            y={602}
            textAnchor="middle"
            fontWeight={700}
            fontSize={20}
            fill="#ffffff"
            letterSpacing={1.5}
          >
            {data.isOrganisation ? "ORGANIZATIONAL MEMBER" : "NON-EXECUTIVE & NON-VOTING MEMBER"}
          </text>

          {/* Right panel heading */}
          <text
            x={805}
            y={88}
            textAnchor="middle"
            fontWeight={800}
            fontSize={data.isOrganisation ? 46 : 52}
            fill="#ffffff"
          >
            {tier.cardName.toUpperCase()}
          </text>
          <line
            x1={data.isOrganisation ? 660 : 690}
            y1={122}
            x2={data.isOrganisation ? 680 : 735}
            y2={122}
            stroke="#ffffff"
            strokeOpacity={0.7}
            strokeWidth={2}
          />
          <text
            x={805}
            y={131}
            textAnchor="middle"
            fontWeight={700}
            fontSize={data.isOrganisation ? 19 : 28}
            fill="#ffffff"
            letterSpacing={1}
          >
            {data.isOrganisation ? "ORGANIZATIONAL MEMBER" : "MEMBER"}
          </text>
          <line
            x1={data.isOrganisation ? 930 : 875}
            y1={122}
            x2={data.isOrganisation ? 950 : 920}
            y2={122}
            stroke="#ffffff"
            strokeOpacity={0.7}
            strokeWidth={2}
          />

          {/* Photo */}
          <circle cx={805} cy={330} r={132} fill={c.light} />
          <circle cx={805} cy={330} r={122} fill="#ffffff" />
          {data.photoUrl ? (
            <image
              href={data.photoUrl}
              x={805 - 118}
              y={330 - 118}
              width={236}
              height={236}
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${uid}-photo)`}
            />
          ) : data.isOrganisation ? (
            <Building2 x={735} y={260} width={140} height={140} color={c.main} strokeWidth={1.4} />
          ) : (
            <text x={805} y={362} textAnchor="middle" fontWeight={700} fontSize={92} fill={c.main}>
              {initials || "M"}
            </text>
          )}
        </g>
      </svg>
    );
  },
);

// ============================================================================
// Back side
// ============================================================================

export const MemberCardBack = forwardRef<SVGSVGElement, { data: MemberCardData; logo: string }>(
  function MemberCardBack({ data, logo }, ref) {
    const c = PALETTE[data.tier];
    const tier = MEMBERSHIP_TIERS[data.tier];
    const uid = `b${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

    const statements: { icon: typeof Users; lines: string[] }[] = [
      {
        icon: Users,
        lines: [
          "This card certifies that the holder is a",
          "valued member of ISLAH Welfare Foundation.",
        ],
      },
      {
        icon: ShieldCheck,
        lines: data.isOrganisation
          ? ["This membership does not confer trustee,", "governance or voting rights."]
          : ["This membership is Non-Executive", "& Non-Voting."],
      },
      {
        icon: CalendarDays,
        lines: ["Membership is valid for the period stated", "and renewable thereafter."],
      },
      { icon: HandHeart, lines: ["This card is non-transferable."] },
    ];

    const contacts: { icon: typeof MapPin; text: string }[] = [
      { icon: MapPin, text: FOUNDATION.address },
      { icon: Phone, text: FOUNDATION.phone },
      { icon: Mail, text: FOUNDATION.email },
      { icon: Globe, text: FOUNDATION.website },
    ];

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="w-full h-auto block"
        fontFamily={FONT}
        role="img"
        aria-label={`${tier.cardName} reverse side`}
      >
        <defs>
          <clipPath id={`${uid}-clip`}>
            <rect width={W} height={H} rx={34} />
          </clipPath>
          <path id={`${uid}-seal-top`} d="M 600 400 A 62 62 0 0 1 724 400" />
          <path id={`${uid}-seal-bottom`} d="M 592 400 A 70 70 0 0 0 732 400" />
        </defs>

        <g clipPath={`url(#${uid}-clip)`}>
          <rect width={W} height={H} fill="#ffffff" />

          {/* Header */}
          <rect width={W} height={78} fill={c.main} />
          <text x={470} y={52} textAnchor="middle" fontWeight={800} fontSize={32} fill="#ffffff">
            {tier.cardName.toUpperCase()} MEMBERSHIP
          </text>
          <text x={970} y={50} textAnchor="end" fontSize={15} fill="#ffffff" fillOpacity={0.9}>
            {data.memberId}
          </text>

          {/* Statements */}
          {statements.map((s, i) => {
            const y = 135 + i * 92;
            const Icon = s.icon;
            return (
              <g key={i}>
                <circle cx={78} cy={y} r={31} fill={c.main} />
                <Icon x={60} y={y - 18} width={36} height={36} color="#ffffff" strokeWidth={2} />
                {s.lines.map((line, j) => (
                  <text
                    key={j}
                    x={128}
                    y={y - (s.lines.length - 1) * 11 + j * 24 + 6}
                    fontSize={18}
                    fill="#1e293b"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          <line
            x1={548}
            y1={108}
            x2={548}
            y2={500}
            stroke={c.main}
            strokeOpacity={0.35}
            strokeWidth={2}
          />

          {/* Foundation details */}
          <text x={578} y={130} fontWeight={800} fontSize={21} fill={c.text}>
            ISLAH WELFARE FOUNDATION
          </text>
          {contacts.map((ct, i) => {
            const Icon = ct.icon;
            const y = 166 + i * 32;
            return (
              <g key={i}>
                <Icon x={578} y={y - 15} width={19} height={19} color={c.main} strokeWidth={2.2} />
                <text x={606} y={y} fontSize={i === 0 ? 14 : 15} fill="#1e293b">
                  {ct.text}
                </text>
              </g>
            );
          })}

          {/* Seal */}
          <circle cx={662} cy={400} r={86} fill="none" stroke={c.main} strokeWidth={4} />
          <circle cx={662} cy={400} r={50} fill="none" stroke={c.main} strokeWidth={1.5} />
          <text fontSize={11.5} fontWeight={700} fill={c.main} letterSpacing={0.8}>
            <textPath href={`#${uid}-seal-top`} startOffset="50%" textAnchor="middle">
              ISLAH WELFARE FOUNDATION
            </textPath>
          </text>
          <text fontSize={11} fontWeight={700} fill={c.main} letterSpacing={1}>
            <textPath href={`#${uid}-seal-bottom`} startOffset="50%" textAnchor="middle">
              CARE · EMPOWER · UPLIFT
            </textPath>
          </text>
          <image
            href={logo}
            x={634}
            y={366}
            width={56}
            height={68}
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Signatory */}
          <line x1={790} y1={430} x2={960} y2={430} stroke="#64748b" strokeWidth={1.5} />
          <text x={875} y={454} textAnchor="middle" fontSize={15} fill="#334155">
            Authorised Signatory
          </text>
          <text x={875} y={476} textAnchor="middle" fontSize={15} fill="#334155">
            ISLAH Welfare Foundation
          </text>

          {/* Footer */}
          <rect y={540} width={W} height={90} fill={c.main} />
          <text x={260} y={578} textAnchor="middle" fontSize={16} fill="#ffffff">
            Thank you for supporting the mission of
          </text>
          <text x={260} y={602} textAnchor="middle" fontSize={16} fill="#ffffff">
            ISLAH Welfare Foundation.
          </text>
          <text x={740} y={578} textAnchor="middle" fontSize={16} fill="#ffffff">
            Your contribution helps us build stronger communities
          </text>
          <text x={740} y={602} textAnchor="middle" fontSize={16} fill="#ffffff">
            and create lasting social impact.
          </text>
        </g>
      </svg>
    );
  },
);

// ============================================================================
// Export helpers
// ============================================================================

async function svgToCanvas(svg: SVGSVGElement, scale = 2): Promise<HTMLCanvasElement> {
  const xml = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** Both sides stacked into a single PNG. */
async function renderCardPng(front: SVGSVGElement, back: SVGSVGElement): Promise<Blob> {
  const [f, b] = await Promise.all([svgToCanvas(front), svgToCanvas(back)]);
  const gap = 40;
  const out = document.createElement("canvas");
  out.width = f.width;
  out.height = f.height + b.height + gap;
  const ctx = out.getContext("2d")!;
  ctx.drawImage(f, 0, 0);
  ctx.drawImage(b, 0, f.height + gap);
  return new Promise((resolve, reject) =>
    out.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))),
      "image/png",
    ),
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ============================================================================
// Viewer with Front / Back toggle + Download / Share
// ============================================================================

export function MemberCardViewer({ data }: { data: MemberCardData }) {
  const logo = useLogoDataUrl();
  const frontRef = useRef<SVGSVGElement>(null);
  const backRef = useRef<SVGSVGElement>(null);
  const [side, setSide] = useState<"front" | "back">("front");
  const [busy, setBusy] = useState<null | "png" | "pdf" | "share">(null);

  const fileBase = `ISLAH-Member-Card-${data.memberId}`;

  const handlePng = async () => {
    if (!frontRef.current || !backRef.current) return;
    setBusy("png");
    try {
      downloadBlob(await renderCardPng(frontRef.current, backRef.current), `${fileBase}.png`);
    } catch {
      toast.error("Could not generate the card image. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handlePdf = async () => {
    if (!frontRef.current || !backRef.current) return;
    setBusy("pdf");
    try {
      const { jsPDF } = await import("jspdf");
      // CR80 card size: 85.6 × 54 mm
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [85.6, 54] });
      const front = await svgToCanvas(frontRef.current, 3);
      const back = await svgToCanvas(backRef.current, 3);
      pdf.addImage(front.toDataURL("image/png"), "PNG", 0, 0, 85.6, 54);
      pdf.addPage([85.6, 54], "landscape");
      pdf.addImage(back.toDataURL("image/png"), "PNG", 0, 0, 85.6, 54);
      pdf.save(`${fileBase}.pdf`);
    } catch {
      toast.error("Could not generate the PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleShare = async () => {
    if (!frontRef.current || !backRef.current) return;
    setBusy("share");
    const text = `I'm a ${MEMBERSHIP_TIERS[data.tier].cardName} member of ISLAH Welfare Foundation (Member ID: ${data.memberId}).`;
    try {
      const blob = await renderCardPng(frontRef.current, backRef.current);
      const file = new File([blob], `${fileBase}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "My ISLAH Membership Card", text });
      } else {
        downloadBlob(blob, `${fileBase}.png`);
        try {
          await navigator.clipboard.writeText(text);
          toast.success("Card downloaded and caption copied — share it anywhere.");
        } catch {
          toast.success("Card downloaded — share it anywhere.");
        }
      }
    } catch (err) {
      if ((err as Error)?.name !== "AbortError")
        toast.error("Sharing failed. Please try downloading instead.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-2.5">
        <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold">
          {(["front", "back"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              className={`px-3 py-1 rounded-md capitalize transition ${
                side === s
                  ? "bg-white text-[#071527] shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-slate-500">Digital membership card</span>
      </div>

      <div className="rounded-[18px] shadow-lg shadow-slate-300/50 overflow-hidden">
        <div className={side === "front" ? "block" : "hidden"}>
          <MemberCardFront ref={frontRef} data={data} logo={logo} />
        </div>
        <div className={side === "back" ? "block" : "hidden"}>
          <MemberCardBack ref={backRef} data={data} logo={logo} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <button
          type="button"
          onClick={handleShare}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#071527] hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-semibold transition"
        >
          <Share2 className="w-3.5 h-3.5 text-brand-orange" />
          {busy === "share" ? "Preparing…" : "Share Card"}
        </button>
        <button
          type="button"
          onClick={handlePng}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60 text-slate-700 text-xs font-semibold transition"
        >
          <Download className="w-3.5 h-3.5" />
          {busy === "png" ? "Preparing…" : "Image (PNG)"}
        </button>
        <button
          type="button"
          onClick={handlePdf}
          disabled={busy !== null}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60 text-slate-700 text-xs font-semibold transition"
        >
          <FileText className="w-3.5 h-3.5" />
          {busy === "pdf" ? "Preparing…" : "PDF"}
        </button>
      </div>
    </div>
  );
}
