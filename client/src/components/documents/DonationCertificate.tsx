import { forwardRef, useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Download, FileText, Share2 } from "lucide-react";
import { ORG } from "./orgDetails";
import {
  LOGO_RATIO,
  canvasToPngBlob,
  downloadBlob,
  safeFileName,
  svgToCanvas,
  useLogoDataUrl,
} from "./docUtils";
import { donorTierFor, type DonorTier } from "./donorTier";

// ============================================================================
// Types & palette
// ============================================================================

export interface DonationCertificateData {
  donorName: string;
  amount: number;
  cause: string;
  /** Display date, e.g. "05 Nov 2026". */
  date: string;
  year: number;
  certificateNo: string;
}

interface TierPalette {
  /** Metallic gradient stops for the frame and seal rim. */
  metal: [string, string, string, string];
  dark: string;
  accent: string;
  sealCenter: string;
  sealText: string;
}

const PALETTE: Record<DonorTier, TierPalette> = {
  Silver: {
    metal: ["#f7f8fa", "#c4c9d0", "#8b929b", "#dde1e6"],
    dark: "#5b626b",
    accent: "#8b929b",
    sealCenter: "#6b737d",
    sealText: "#ffffff",
  },
  Gold: {
    metal: ["#fff3c4", "#e5bd55", "#a97b1d", "#f1d27c"],
    dark: "#8a6216",
    accent: "#b8862b",
    sealCenter: "#9a6d14",
    sealText: "#fff8e6",
  },
  Platinum: {
    metal: ["#f5f8fb", "#cad5e1", "#8a9db2", "#e4ebf2"],
    dark: "#3d5064",
    accent: "#7187a0",
    sealCenter: "#0f2540",
    sealText: "#e8eef5",
  },
};

const W = 1400;
const H = 990;
const SANS = "Arial, Helvetica, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const NAVY = "#071527";
const SLATE = "#475569";
const MUTED = "#64748b";

function nameFontSize(name: string) {
  // Georgia italic averages ~0.5em per character; keep the name within ~980px.
  return Math.max(34, Math.min(64, Math.floor(980 / (Math.max(name.length, 1) * 0.5))));
}

function rosettePoints(cx: number, cy: number, outer: number, inner: number, n = 36) {
  return Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / n - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

function starPath(cx: number, cy: number, r: number) {
  return (
    Array.from({ length: 10 }, (_, i) => {
      const rad = i % 2 === 0 ? r : r * 0.45;
      const a = (Math.PI * i) / 5 - Math.PI / 2;
      return `${i === 0 ? "M" : "L"}${(cx + rad * Math.cos(a)).toFixed(1)} ${(cy + rad * Math.sin(a)).toFixed(1)}`;
    }).join(" ") + "Z"
  );
}

// ============================================================================
// Certificate artwork
// ============================================================================

export const DonationCertificateSvg = forwardRef<
  SVGSVGElement,
  { data: DonationCertificateData; logo: string }
>(function DonationCertificateSvg({ data, logo }, ref) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const tier = donorTierFor(data.amount);
  const p = PALETTE[tier.tier];
  const metal = `metal-${uid}`;
  const bg = `bg-${uid}`;
  const sealCx = 700;
  const sealCy = 790;
  const nameSize = nameFontSize(data.donorName);

  const corner = (
    <g stroke={p.accent} strokeWidth="2" fill="none">
      <path d="M72 132 V72 H132" />
      <path d="M82 112 V82 H112" strokeWidth="1" />
      <rect x="66" y="66" width="12" height="12" transform="rotate(45 72 72)" fill={p.accent} />
    </g>
  );

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className="w-full h-auto block"
      role="img"
      aria-label={`${tier.label} certificate of appreciation for ${data.donorName}`}
    >
      <defs>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.metal[0]} />
          <stop offset="0.35" stopColor={p.metal[1]} />
          <stop offset="0.7" stopColor={p.metal[2]} />
          <stop offset="1" stopColor={p.metal[3]} />
        </linearGradient>
        <radialGradient id={bg} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f8f5ee" />
        </radialGradient>
      </defs>

      {/* Background & frame */}
      <rect width={W} height={H} fill={`url(#${bg})`} />
      <rect
        x="22"
        y="22"
        width={W - 44}
        height={H - 44}
        fill="none"
        stroke={`url(#${metal})`}
        strokeWidth="16"
      />
      <rect
        x="44"
        y="44"
        width={W - 88}
        height={H - 88}
        fill="none"
        stroke={p.dark}
        strokeWidth="1.6"
      />
      <rect
        x="52"
        y="52"
        width={W - 104}
        height={H - 104}
        fill="none"
        stroke={p.accent}
        strokeWidth="0.8"
        opacity="0.6"
      />
      {corner}
      <g transform={`translate(${W} 0) scale(-1 1)`}>{corner}</g>
      <g transform={`translate(0 ${H}) scale(1 -1)`}>{corner}</g>
      <g transform={`translate(${W} ${H}) scale(-1 -1)`}>{corner}</g>

      {/* Watermark */}
      <image
        href={logo}
        x={W / 2 - 150}
        y="290"
        width="300"
        height={300 / LOGO_RATIO}
        opacity="0.045"
      />

      {/* Header */}
      <image
        href={logo}
        x={W / 2 - (96 * LOGO_RATIO) / 2}
        y="72"
        width={96 * LOGO_RATIO}
        height="96"
      />
      <text
        x={W / 2}
        y="204"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="22"
        fontWeight="700"
        letterSpacing="5"
        fill={NAVY}
      >
        {ORG.nameUpper}
      </text>
      <text
        x={W / 2}
        y="230"
        textAnchor="middle"
        fontFamily={SERIF}
        fontStyle="italic"
        fontSize="17"
        fill={MUTED}
      >
        {ORG.tagline}
      </text>

      {/* Title */}
      <text
        x={W / 2}
        y="310"
        textAnchor="middle"
        fontFamily={SERIF}
        fontSize="62"
        letterSpacing="12"
        fill={NAVY}
      >
        CERTIFICATE
      </text>
      <g stroke={p.accent} strokeWidth="1.5">
        <line x1="470" y1="343" x2="540" y2="343" />
        <line x1="860" y1="343" x2="930" y2="343" />
      </g>
      <text
        x={W / 2}
        y="350"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="21"
        fontWeight="700"
        letterSpacing="7"
        fill={p.dark}
      >
        OF APPRECIATION
      </text>

      {/* Recipient */}
      <text
        x={W / 2}
        y="412"
        textAnchor="middle"
        fontFamily={SERIF}
        fontStyle="italic"
        fontSize="22"
        fill={SLATE}
      >
        This certificate is proudly presented to
      </text>
      <text
        x={W / 2}
        y="492"
        textAnchor="middle"
        fontFamily={SERIF}
        fontStyle="italic"
        fontWeight="700"
        fontSize={nameSize}
        fill={NAVY}
      >
        {data.donorName}
      </text>
      <line x1="420" y1="518" x2="980" y2="518" stroke={`url(#${metal})`} strokeWidth="3" />

      {/* Citation */}
      <text x={W / 2} y="566" textAnchor="middle" fontFamily={SANS} fontSize="20" fill={SLATE}>
        in grateful recognition of your generous contribution towards
      </text>
      <text
        x={W / 2}
        y="600"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="23"
        fontWeight="700"
        fill={NAVY}
      >
        {data.cause}
      </text>
      <text x={W / 2} y="642" textAnchor="middle" fontFamily={SANS} fontSize="20" fill={SLATE}>
        and is recognised as a{" "}
        <tspan fontWeight="700" fill={p.dark} letterSpacing="1.5">
          {tier.label.toUpperCase()}
        </tspan>{" "}
        of {ORG.name}.
      </text>
      <text
        x={W / 2}
        y="676"
        textAnchor="middle"
        fontFamily={SERIF}
        fontStyle="italic"
        fontSize="18"
        fill={MUTED}
      >
        Your support helps bring care, opportunity and dignity to rural and underserved communities.
      </text>

      {/* Date */}
      <text x="330" y="790" textAnchor="middle" fontFamily={SERIF} fontSize="24" fill={NAVY}>
        {data.date}
      </text>
      <line x1="220" y1="806" x2="440" y2="806" stroke={MUTED} strokeWidth="1" />
      <text
        x="330"
        y="830"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="14"
        letterSpacing="2.5"
        fill={MUTED}
      >
        DATE OF DONATION
      </text>

      {/* Signatory */}
      <line x1="960" y1="806" x2="1180" y2="806" stroke={MUTED} strokeWidth="1" />
      <text
        x="1070"
        y="830"
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="14"
        letterSpacing="2.5"
        fill={MUTED}
      >
        AUTHORISED SIGNATORY
      </text>
      <text x="1070" y="852" textAnchor="middle" fontFamily={SANS} fontSize="14" fill={SLATE}>
        {ORG.name}
      </text>

      {/* Seal with ribbons */}
      <g fill={p.dark}>
        <path
          d={`M${sealCx - 40} ${sealCy + 50} L${sealCx - 66} ${sealCy + 128} L${sealCx - 46} ${sealCy + 116} L${sealCx - 30} ${sealCy + 136} L${sealCx - 6} ${sealCy + 62} Z`}
        />
        <path
          d={`M${sealCx + 40} ${sealCy + 50} L${sealCx + 66} ${sealCy + 128} L${sealCx + 46} ${sealCy + 116} L${sealCx + 30} ${sealCy + 136} L${sealCx + 6} ${sealCy + 62} Z`}
        />
      </g>
      <polygon
        points={rosettePoints(sealCx, sealCy, 90, 82)}
        fill={`url(#${metal})`}
        stroke={p.dark}
        strokeWidth="1"
      />
      <circle
        cx={sealCx}
        cy={sealCy}
        r="70"
        fill={p.sealCenter}
        stroke={p.metal[0]}
        strokeWidth="3"
      />
      <circle
        cx={sealCx}
        cy={sealCy}
        r="61"
        fill="none"
        stroke={p.sealText}
        strokeWidth="1"
        strokeDasharray="2 4"
        opacity="0.6"
      />
      <path d={starPath(sealCx, sealCy - 34, 11)} fill={p.sealText} />
      <text
        x={sealCx}
        y={sealCy + 4}
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="19"
        fontWeight="700"
        letterSpacing="2.5"
        fill={p.sealText}
      >
        {tier.tier.toUpperCase()}
      </text>
      <text
        x={sealCx}
        y={sealCy + 26}
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="13"
        letterSpacing="5"
        fill={p.sealText}
      >
        DONOR
      </text>
      <text
        x={sealCx}
        y={sealCy + 46}
        textAnchor="middle"
        fontFamily={SERIF}
        fontSize="13"
        fill={p.sealText}
        opacity="0.85"
      >
        {data.year}
      </text>

      {/* Footer */}
      <text x="150" y="906" fontFamily={SANS} fontSize="13" fill={MUTED}>
        Certificate No. {data.certificateNo}
      </text>
      <text x={W - 150} y="906" textAnchor="end" fontFamily={SANS} fontSize="13" fill={MUTED}>
        {ORG.website}
      </text>
    </svg>
  );
});

// ============================================================================
// Viewer with Share / PNG / PDF
// ============================================================================

export function DonationCertificateViewer({ data }: { data: DonationCertificateData }) {
  const logo = useLogoDataUrl();
  const svgRef = useRef<SVGSVGElement>(null);
  const [busy, setBusy] = useState<null | "png" | "pdf" | "share">(null);
  const tier = donorTierFor(data.amount);
  const fileBase = `ISLAH-${tier.tier}-Donor-Certificate-${safeFileName(data.certificateNo)}`;

  const renderPng = async () => {
    if (!svgRef.current) throw new Error("Certificate not ready");
    return canvasToPngBlob(await svgToCanvas(svgRef.current, W, H, 2));
  };

  const handlePng = async () => {
    setBusy("png");
    try {
      downloadBlob(await renderPng(), `${fileBase}.png`);
    } catch {
      toast.error("Could not generate the certificate image. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handlePdf = async () => {
    if (!svgRef.current) return;
    setBusy("pdf");
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const canvas = await svgToCanvas(svgRef.current, W, H, 2);
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 297, 210);
      pdf.setProperties({ title: `${tier.label} — Certificate of Appreciation`, author: ORG.name });
      pdf.save(`${fileBase}.pdf`);
    } catch {
      toast.error("Could not generate the PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleShare = async () => {
    setBusy("share");
    const text = `Proud to support ${ORG.name} as a ${tier.label}.`;
    try {
      const blob = await renderPng();
      const file = new File([blob], `${fileBase}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "My ISLAH Donor Certificate", text });
      } else {
        downloadBlob(blob, `${fileBase}.png`);
        try {
          await navigator.clipboard.writeText(text);
          toast.success("Certificate downloaded and caption copied — share it anywhere.");
        } catch {
          toast.success("Certificate downloaded — share it anywhere.");
        }
      }
    } catch (err) {
      if ((err as Error)?.name !== "AbortError")
        toast.error("Sharing failed. Please try downloading instead.");
    } finally {
      setBusy(null);
    }
  };

  const btn =
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition disabled:opacity-60";

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md shadow-slate-200/60 bg-white">
        <DonationCertificateSvg ref={svgRef} data={data} logo={logo} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <button
          type="button"
          onClick={handleShare}
          disabled={busy !== null}
          className={`${btn} bg-[#071527] hover:bg-slate-800 text-white`}
        >
          <Share2 className="w-3.5 h-3.5 text-brand-orange" />
          {busy === "share" ? "Preparing…" : "Share Certificate"}
        </button>
        <button
          type="button"
          onClick={handlePng}
          disabled={busy !== null}
          className={`${btn} border border-slate-300 bg-white hover:bg-slate-50 text-slate-700`}
        >
          <Download className="w-3.5 h-3.5" />
          {busy === "png" ? "Preparing…" : "Image (PNG)"}
        </button>
        <button
          type="button"
          onClick={handlePdf}
          disabled={busy !== null}
          className={`${btn} border border-slate-300 bg-white hover:bg-slate-50 text-slate-700`}
        >
          <FileText className="w-3.5 h-3.5" />
          {busy === "pdf" ? "Preparing…" : "PDF (A4)"}
        </button>
      </div>
    </div>
  );
}
