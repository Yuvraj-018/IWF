import { useEffect, useState } from "react";
import logoUrl from "@/assets/new logo.png";

/** Logo aspect ratio (width / height) of `new logo.png` (534 × 634). */
export const LOGO_RATIO = 534 / 634;

// ============================================================================
// Text helpers
// ============================================================================

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function belowHundred(n: number): string {
  if (n < 20) return ONES[n];
  return `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ""}`;
}

function belowThousand(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  return [h ? `${ONES[h]} Hundred` : "", rest ? belowHundred(rest) : ""].filter(Boolean).join(" ");
}

/** Indian numbering system, e.g. 125000 → "Rupees One Lakh Twenty Five Thousand Only". */
export function amountInWords(amount: number): string {
  const n = Math.floor(Math.abs(amount));
  if (n === 0) return "Rupees Zero Only";
  const crore = Math.floor(n / 10_000_000);
  const lakh = Math.floor((n % 10_000_000) / 100_000);
  const thousand = Math.floor((n % 100_000) / 1000);
  const rest = n % 1000;
  const parts = [
    crore ? `${crore >= 100 ? belowThousand(crore) : belowHundred(crore)} Crore` : "",
    lakh ? `${belowHundred(lakh)} Lakh` : "",
    thousand ? `${belowHundred(thousand)} Thousand` : "",
    rest ? belowThousand(rest) : "",
  ].filter(Boolean);
  return `Rupees ${parts.join(" ")} Only`;
}

/** Indian financial year for a date, e.g. 5 Nov 2026 → "2026-27". */
export function financialYear(d: Date): string {
  const start = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  return `${start}-${String((start + 1) % 100).padStart(2, "0")}`;
}

/** "05 Nov 2026" */
export function formatDocDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/** "2,500" — Indian digit grouping without currency symbol. */
export function formatINR(amount: number): string {
  return Math.round(amount).toLocaleString("en-IN");
}

// ============================================================================
// Logo (as a data URL so exported files are self-contained)
// ============================================================================

let logoPromise: Promise<string> | null = null;

export function loadLogoDataUrl(): Promise<string> {
  if (!logoPromise) {
    logoPromise = fetch(logoUrl)
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
      .catch((err) => {
        logoPromise = null;
        throw err;
      });
  }
  return logoPromise;
}

let pdfLogoPromise: Promise<string> | null = null;

/** Logo downscaled to ~260 px wide so PDFs stay small (the source PNG is large). */
export function loadPdfLogo(): Promise<string> {
  if (!pdfLogoPromise) {
    pdfLogoPromise = loadLogoDataUrl()
      .then(async (src) => {
        const img = new Image();
        img.src = src;
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = 260;
        canvas.height = Math.round(260 / LOGO_RATIO);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
      })
      .catch((err) => {
        pdfLogoPromise = null;
        throw err;
      });
  }
  return pdfLogoPromise;
}

export function useLogoDataUrl() {
  const [src, setSrc] = useState<string>(logoUrl);
  useEffect(() => {
    let cancelled = false;
    loadLogoDataUrl()
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

// ============================================================================
// Image export
// ============================================================================

export async function svgToCanvas(
  svg: SVGSVGElement,
  width: number,
  height: number,
  scale = 2,
): Promise<HTMLCanvasElement> {
  const xml = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))),
      "image/png",
    ),
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** File-name-safe version of a receipt / member number. */
export function safeFileName(s: string): string {
  return s.replace(/[^A-Za-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
}
