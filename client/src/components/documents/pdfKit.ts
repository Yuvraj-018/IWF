import type { jsPDF } from "jspdf";
import { LOGO_RATIO } from "./docUtils";

/**
 * Small drawing kit for the A4 receipts (units: mm).
 * Standard PDF fonts cannot render "₹", so amounts are printed as "Rs.".
 */

export type RGB = [number, number, number];

export const C = {
  blue: [31, 78, 121] as RGB,
  gold: [184, 134, 11] as RGB,
  green: [46, 125, 50] as RGB,
  text: [33, 37, 41] as RGB,
  muted: [92, 102, 115] as RGB,
  line: [208, 214, 222] as RGB,
  strip: [238, 243, 248] as RGB,
  grey: [238, 238, 238] as RGB,
  greenFill: [241, 248, 241] as RGB,
  link: [17, 85, 204] as RGB,
};

export const PAGE = { left: 12, right: 198, x0: 16, x1: 194 };
export const CONTENT_W = PAGE.x1 - PAGE.x0;

export function font(
  pdf: jsPDF,
  size: number,
  style: "normal" | "bold" | "italic" = "normal",
  color: RGB = C.text,
) {
  pdf.setFont("helvetica", style);
  pdf.setFontSize(size);
  pdf.setTextColor(...color);
}

/** Line height in mm for a font size in pt. */
export const lh = (size: number) => size * 0.42;

export function addLogo(pdf: jsPDF, logo: string | undefined, x: number, y: number, h: number) {
  if (!logo) return;
  try {
    pdf.addImage(logo, "PNG", x, y, h * LOGO_RATIO, h, "islah-logo", "FAST");
  } catch {
    /* logo is decorative — never block the document */
  }
}

/** Two-column label/value table. Returns the y below the table. */
export function drawTable(
  pdf: jsPDF,
  y: number,
  rows: [string, string][],
  opts: { split?: number; size?: number; minRow?: number; labelColor?: RGB; pad?: number } = {},
): number {
  const size = opts.size ?? 9;
  const split = opts.split ?? PAGE.x0 + CONTENT_W / 2;
  const minRow = opts.minRow ?? 5.6;
  const pad = opts.pad ?? 2;
  const valueW = PAGE.x1 - split - pad * 2;
  const labelW = split - PAGE.x0 - pad * 2;
  pdf.setDrawColor(...C.line);
  pdf.setLineWidth(0.2);

  for (const [label, value] of rows) {
    font(pdf, size, "bold");
    const labelLines = pdf.splitTextToSize(label, labelW) as string[];
    font(pdf, size);
    const valueLines = pdf.splitTextToSize(value || "-", valueW) as string[];
    const lines = Math.max(labelLines.length, valueLines.length);
    const h = Math.max(minRow, lines * lh(size) + 2);

    pdf.rect(PAGE.x0, y, split - PAGE.x0, h);
    pdf.rect(split, y, PAGE.x1 - split, h);
    const ty = y + 1.2 + lh(size) * 0.8;
    font(pdf, size, "bold", opts.labelColor ?? C.blue);
    pdf.text(labelLines, PAGE.x0 + pad, ty);
    font(pdf, size, "normal", C.text);
    pdf.text(valueLines, split + pad, ty);
    y += h;
  }
  return y;
}

/** Shaded strip with two columns of label/value pairs. Returns the y below. */
export function drawInfoStrip(
  pdf: jsPDF,
  y: number,
  left: [string, string][],
  right: [string, string][],
  opts: { fill?: RGB; border?: boolean; labelW?: number; size?: number } = {},
): number {
  const size = opts.size ?? 9;
  const rows = Math.max(left.length, right.length);
  const rowH = 5.2;
  const h = rows * rowH + 3;
  pdf.setFillColor(...(opts.fill ?? C.strip));
  pdf.setDrawColor(...C.line);
  pdf.setLineWidth(0.2);
  pdf.rect(PAGE.x0, y, CONTENT_W, h, opts.border === false ? "F" : "FD");

  const mid = PAGE.x0 + CONTENT_W / 2;
  const labelW = opts.labelW ?? 26;
  const col = (pairs: [string, string][], x: number) =>
    pairs.forEach(([label, value], i) => {
      const ty = y + 2 + rowH * i + lh(size) * 0.9;
      font(pdf, size, "normal", C.muted);
      pdf.text(label, x, ty);
      font(pdf, size, "normal", C.text);
      const maxW = (x < mid ? mid : PAGE.x1) - (x + labelW) - 2;
      pdf.text(pdf.splitTextToSize(value, maxW)[0] as string, x + labelW, ty);
    });
  col(left, PAGE.x0 + 2);
  col(right, mid + 2);
  return y + h;
}

/** Paragraph that starts with a bold lead-in ("IMPORTANT: …"). Returns lines drawn height. */
export function boldLeadParagraph(
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  lead: string,
  body: string,
  size = 9,
): number {
  font(pdf, size, "bold");
  const leadW = pdf.getTextWidth(`${lead} `);
  font(pdf, size);
  // Reserve the lead-in width on the first line by padding with spaces.
  const spaceW = pdf.getTextWidth(" ");
  const padding = " ".repeat(Math.ceil(leadW / spaceW));
  const lines = pdf.splitTextToSize(`${padding}${body}`, width) as string[];
  lines[0] = lines[0].trimStart();
  const step = lh(size) * 1.15;
  font(pdf, size, "bold");
  pdf.text(lead, x, y);
  font(pdf, size);
  pdf.text(lines[0], x + leadW, y);
  lines.slice(1).forEach((l, i) => pdf.text(l, x, y + step * (i + 1)));
  return lines.length * step;
}

export function wrapped(
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  width: number,
  size: number,
  style: "normal" | "bold" | "italic" = "normal",
  color: RGB = C.text,
  align: "left" | "center" | "right" = "left",
): number {
  font(pdf, size, style, color);
  const lines = pdf.splitTextToSize(text, width) as string[];
  const step = lh(size) * 1.15;
  lines.forEach((l, i) => pdf.text(l, x, y + step * i, { align }));
  return lines.length * step;
}

/** Right-aligned "Authorised Signatory / ISLAH Welfare Foundation" block. */
export function drawSignatory(pdf: jsPDF, y: number, size = 9.5): number {
  pdf.setDrawColor(...C.muted);
  pdf.setLineWidth(0.3);
  pdf.line(PAGE.x1 - 52, y, PAGE.x1 - 4, y);
  font(pdf, size, "bold", C.text);
  pdf.text("Authorised Signatory", PAGE.x1 - 4, y + 4.5, { align: "right" });
  pdf.text("ISLAH Welfare Foundation", PAGE.x1 - 4, y + 9, { align: "right" });
  return y + 10;
}
