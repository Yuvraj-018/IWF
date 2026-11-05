import type { jsPDF } from "jspdf";
import { ORG } from "./orgDetails";
import {
  amountInWords,
  financialYear,
  formatDocDate,
  formatINR,
  loadPdfLogo,
  safeFileName,
} from "./docUtils";
import {
  C,
  CONTENT_W,
  PAGE,
  addLogo,
  boldLeadParagraph,
  drawInfoStrip,
  drawSignatory,
  drawTable,
  font,
  lh,
  wrapped,
} from "./pdfKit";

// ============================================================================
// Data & content model (shared by the on-screen view and the PDF)
// ============================================================================

export interface DonationReceiptInfo {
  receiptNo: string;
  paidAt: Date;
  donorName: string;
  donorType?: string;
  pan?: string;
  address: string;
  email: string;
  phone: string;
  /** Donor ticked "I want tax-deduction documentation". */
  taxRequested: boolean;
  amount: number;
  paymentMode?: string;
  paymentStatus?: string;
  transactionId: string;
  frequency: string;
  pledgeMonths?: string;
  purpose: string;
  beneficiary?: string;
  /** Set by the backend once eligibility is verified; otherwise a safe default is shown. */
  deductionClassification?: string;
}

export interface ReceiptModel {
  taxRequested: boolean;
  subtitle: string;
  requestLine: string;
  stripLeft: [string, string][];
  stripRight: [string, string][];
  sections: { title: string; rows: [string, string][] }[];
  notice: { title: string; subtitle?: string; body: string };
  commitment: { body: string; emphasis?: string };
  important: string;
}

export function buildDonationReceiptModel(
  r: DonationReceiptInfo,
  currency: "₹" | "Rs." = "₹",
): ReceiptModel {
  const tax = r.taxRequested;
  const amount = `${currency} ${formatINR(r.amount)}/-`;
  const donationType =
    r.frequency === "One Time"
      ? "One-time donation"
      : `${r.frequency} donation${r.pledgeMonths ? ` (${r.pledgeMonths} pledge)` : ""}`;
  const purpose = r.beneficiary ? `${r.purpose} — Beneficiary: ${r.beneficiary}` : r.purpose;

  return {
    taxRequested: tax,
    subtitle: tax ? "TAX-DEDUCTION DOCUMENTATION" : "GENERAL DONATION RECEIPT",
    requestLine: `Tax-documentation request: ${tax ? "YES" : "NO"}`,
    stripLeft: [
      ["Receipt No.", r.receiptNo],
      ["Donation Date", formatDocDate(r.paidAt)],
      ["Financial Year", financialYear(r.paidAt)],
    ],
    stripRight: [
      ["Payment Status", r.paymentStatus ?? "Successful"],
      ["Donation Record", tax ? "Tax documentation requested" : "General donation"],
      [tax ? "Payment Reference" : "Reference ID", r.transactionId],
    ],
    sections: [
      {
        title: "DONEE / ORGANISATION DETAILS",
        rows: [
          ["Name of Donee", ORG.nameUpper],
          ["PAN of Donee", ORG.pan],
          [
            "Approval / Registration No.",
            `80G: ${ORG.approval80G}  |  12AB: ${ORG.registration12AB}`,
          ],
          ["Registered Address", ORG.registeredAddress],
        ],
      },
      {
        title: "DONOR DETAILS",
        rows: [
          ["Donor Name", r.donorName],
          ["PAN / Donor ID", r.pan ? r.pan.toUpperCase() : "Not provided"],
          ["Address", r.address],
          ["Email / Mobile", `${r.email} / ${r.phone}`],
          [
            "Donor Tax-Documentation Request",
            tax
              ? "YES — donor selected tax-deduction documentation"
              : "NO — donor did not select tax-deduction documentation",
          ],
        ],
      },
      {
        title: "DONATION DETAILS",
        rows: [
          ["Donation Amount", amount],
          ["Amount in Words", amountInWords(r.amount)],
          ["Mode of Payment", r.paymentMode ?? "Online (Razorpay)"],
          ["Transaction / Reference ID", r.transactionId],
          ["Donation Type", donationType],
          ["Donation Purpose", purpose],
          [
            "Eligible Deduction Classification",
            r.deductionClassification ??
              (tax
                ? "Subject to eligibility verification and statutory reporting"
                : "Not applicable — no tax-deduction documentation requested"),
          ],
        ],
      },
    ],
    notice: tax
      ? {
          title: "TAX-DEDUCTION ELIGIBILITY — SUBJECT TO LAW AND STATUTORY REPORTING",
          body: "This receipt records the donation and the donor's request for tax-deduction documentation. The actual tax deduction is available only to the extent permitted by the Income-tax Act, 2025, applicable rules, the Foundation's valid approval/registration, the nature and mode of the donation, statutory reporting, and the donor's own tax position.",
        }
      : {
          title: "GENERAL DONATION ACKNOWLEDGEMENT",
          subtitle: "Donor Tax-Documentation Request: NO",
          body: "This receipt acknowledges the donation received by ISLAH Welfare Foundation. The donor has not requested tax-deduction documentation. Accordingly, this receipt does not certify or represent entitlement to any income-tax deduction.",
        },
    commitment: tax
      ? {
          body: "For Tax Year 2026–27 onward, eligible reporting entities use Form 113 to report qualifying donations and Form 114 is the official donor certificate generated after the filing.",
          emphasis: "This ISLAH receipt is not a substitute for Form 114.",
        }
      : {
          body: "Your contribution is received with gratitude and responsibility. ISLAH Welfare Foundation is committed to appropriate standards of transparency, accountability and responsible stewardship.",
        },
    important: tax
      ? "Do not treat this receipt as a guarantee of tax deduction. The donor should retain the receipt and the official Form 114 where applicable. The deduction must be claimed in accordance with the applicable law and the donor's eligibility."
      : "This is an acknowledgement of donation only. No tax-deduction documentation was requested by the donor. This receipt is not Form 114 and does not certify entitlement to a deduction under the Income-tax Act, 2025 or any other law.",
  };
}

// ============================================================================
// PDF (A4 portrait)
// ============================================================================

export function renderDonationReceiptPdf(
  JsPDF: typeof jsPDF,
  info: DonationReceiptInfo,
  logo?: string,
): jsPDF {
  const m = buildDonationReceiptModel(info, "Rs.");
  const pdf = new JsPDF({ unit: "mm", format: "a4" });
  const top = 12;

  // Header
  addLogo(pdf, logo, PAGE.x0 + 1, top + 4, 22);
  font(pdf, 13, "bold", C.blue);
  pdf.text("ISLAH WELFARE", PAGE.x0 + 24, top + 10);
  pdf.text("FOUNDATION", PAGE.x0 + 24, top + 15.5);
  font(pdf, 10.5, "normal", C.muted);
  pdf.text(ORG.tagline, PAGE.x0 + 24, top + 21.5);

  font(pdf, 12, "bold", C.blue);
  pdf.text("DONATION RECEIPT", PAGE.x1, top + 7, { align: "right" });
  font(pdf, 11, "bold", C.green);
  pdf.text(m.subtitle, PAGE.x1, top + 13, { align: "right" });
  font(pdf, 11, "bold", C.gold);
  pdf.text(m.requestLine, PAGE.x1, top + 19, { align: "right" });

  pdf.setDrawColor(...C.gold);
  pdf.setLineWidth(0.6);
  pdf.line(PAGE.x0, top + 29, PAGE.x1, top + 29);

  let y = drawInfoStrip(pdf, top + 32, m.stripLeft, m.stripRight, { labelW: 31 });

  // Sections
  for (const s of m.sections) {
    y += 6;
    font(pdf, 9.5, "bold", C.gold);
    pdf.text(s.title, PAGE.x0, y);
    y = drawTable(pdf, y + 1.5, s.rows);
  }

  // Notice box
  y += 4;
  font(pdf, 9);
  const noticeLines = pdf.splitTextToSize(m.notice.body, CONTENT_W - 6) as string[];
  const step = lh(9) * 1.15;
  const noticeH = 4 + 5 + (m.notice.subtitle ? 4.5 : 0) + noticeLines.length * step + 1;
  pdf.setFillColor(...C.greenFill);
  pdf.setDrawColor(...C.green);
  pdf.setLineWidth(0.35);
  pdf.rect(PAGE.x0, y, CONTENT_W, noticeH, "FD");
  let ny = y + 5;
  font(pdf, 9, "bold", C.green);
  pdf.text(m.notice.title, PAGE.x0 + CONTENT_W / 2, ny, { align: "center" });
  if (m.notice.subtitle) {
    ny += 4.5;
    font(pdf, 9, "bold", C.blue);
    pdf.text(m.notice.subtitle, PAGE.x0 + CONTENT_W / 2, ny, { align: "center" });
  }
  ny += 5;
  font(pdf, 9, "normal", C.text);
  noticeLines.forEach((l, i) => pdf.text(l, PAGE.x0 + 3, ny + step * i));
  y += noticeH;

  // Commitment
  y += 5;
  font(pdf, 9.5, "bold", C.gold);
  pdf.text("OUR COMMITMENT", PAGE.x0 + CONTENT_W / 2, y, { align: "center" });
  y += 5;
  y += wrapped(pdf, m.commitment.body, PAGE.x0, y, CONTENT_W, 9);
  if (m.commitment.emphasis) {
    y += wrapped(pdf, m.commitment.emphasis, PAGE.x0, y, CONTENT_W, 9, "bold", C.blue);
  }

  // Thanks + signatory
  y += 3;
  font(pdf, 9.5, "bold", C.blue);
  pdf.text("Thank you for turning resources into possibilities.", PAGE.x0 + 2, y + 2);
  font(pdf, 9, "normal", C.text);
  pdf.text("Your support strengthens ISLAH's community initiatives.", PAGE.x0 + 2, y + 6.5);
  y = drawSignatory(pdf, y + 12);

  // Important
  y += 4;
  font(pdf, 9);
  const impLines = pdf.splitTextToSize(`IMPORTANT:   ${m.important}`, CONTENT_W - 6) as string[];
  const impH = impLines.length * step + 4;
  pdf.setFillColor(...C.grey);
  pdf.setDrawColor(...C.line);
  pdf.setLineWidth(0.2);
  pdf.rect(PAGE.x0, y, CONTENT_W, impH, "FD");
  boldLeadParagraph(pdf, PAGE.x0 + 3, y + 4.5, CONTENT_W - 6, "IMPORTANT:", m.important);
  y += impH;

  // Footer
  y += 8;
  font(pdf, 9, "bold", C.text);
  pdf.text(
    `${ORG.registeredOffice}   •   ${ORG.phone}   •   ${ORG.email}   •   ${ORG.website}`,
    PAGE.x0 + CONTENT_W / 2,
    y,
    { align: "center" },
  );

  // Page border
  pdf.setDrawColor(...C.blue);
  pdf.setLineWidth(0.5);
  pdf.rect(PAGE.left, top, PAGE.right - PAGE.left, y + 4 - top);

  pdf.setProperties({
    title: `ISLAH Donation Receipt ${info.receiptNo}`,
    author: ORG.name,
    subject: m.subtitle,
  });
  return pdf;
}

async function makePdf(info: DonationReceiptInfo) {
  const [{ jsPDF }, logo] = await Promise.all([
    import("jspdf"),
    loadPdfLogo().catch(() => undefined),
  ]);
  return renderDonationReceiptPdf(jsPDF, info, logo);
}

export function donationReceiptFileName(info: DonationReceiptInfo) {
  return `ISLAH-Donation-Receipt-${safeFileName(info.receiptNo)}.pdf`;
}

export async function downloadDonationReceiptPdf(info: DonationReceiptInfo) {
  (await makePdf(info)).save(donationReceiptFileName(info));
}

/**
 * Opens the receipt PDF in a new tab with the print dialog. The tab is opened
 * synchronously (inside the click) so pop-up blockers allow it.
 */
export async function printDonationReceipt(info: DonationReceiptInfo) {
  const win = window.open("", "_blank");
  try {
    const pdf = await makePdf(info);
    pdf.autoPrint();
    const url = pdf.output("bloburl") as unknown as string;
    if (win) win.location.href = url;
    else window.open(url, "_blank");
  } catch (err) {
    win?.close();
    throw err;
  }
}
