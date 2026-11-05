import type { jsPDF } from "jspdf";
import { MEMBERSHIP_TIERS, type TierType } from "./membershipConfig";
import { ORG } from "@/components/documents/orgDetails";
import {
  amountInWords,
  formatINR,
  loadPdfLogo,
  safeFileName,
} from "@/components/documents/docUtils";
import {
  C,
  CONTENT_W,
  PAGE,
  type RGB,
  addLogo,
  boldLeadParagraph,
  drawInfoStrip,
  drawSignatory,
  drawTable,
  font,
  lh,
} from "@/components/documents/pdfKit";

export interface ReceiptData {
  receiptNo: string;
  memberId: string;
  name: string;
  tier: TierType;
  category: string;
  period: number;
  /** Total amount paid for the whole period. */
  amount: number;
  date: string;
  validFrom: string;
  validTill: string;
  type: "New Membership" | "Renewal";
  paymentMode?: string;
  transactionId?: string;
  paymentStatus?: string;
}

const TIER_COLOR: Record<TierType, RGB> = {
  Blue: [0, 112, 192],
  Yellow: [214, 158, 0],
  Green: [46, 139, 62],
  Orange: [232, 115, 12],
};

/** A4 membership fee receipt matching the "ISLAH_Membership Fee Receipt" template. */
export function renderMembershipReceiptPdf(
  JsPDF: typeof jsPDF,
  r: ReceiptData,
  logo?: string,
): jsPDF {
  const pdf = new JsPDF({ unit: "mm", format: "a4" });
  const top = 12;
  const tx = PAGE.x0 + 24;

  // Header
  addLogo(pdf, logo, PAGE.x0 + 1, top + 3, 24);
  font(pdf, 14, "bold", C.text);
  pdf.text(ORG.nameUpper, tx, top + 7);
  const labelled = (label: string, value: string, y: number) => {
    font(pdf, 10, "bold", C.text);
    pdf.text(label, tx, y);
    const w = pdf.getTextWidth(label);
    font(pdf, 10, "normal", C.text);
    pdf.text(value, tx + w + 1, y);
  };
  labelled("Registered office:", ORG.registeredOffice, top + 13);
  labelled("Admin office:", ORG.adminOffice, top + 18);
  font(pdf, 10, "bold", C.text);
  pdf.text("Email:", tx, top + 23);
  font(pdf, 10, "normal", C.link);
  const ex = tx + pdf.getTextWidth("Email: ") + 1;
  pdf.textWithLink(ORG.email, ex, top + 23, { url: `mailto:${ORG.email}` });
  pdf.setDrawColor(...C.link);
  pdf.setLineWidth(0.2);
  pdf.line(ex, top + 23.6, ex + pdf.getTextWidth(ORG.email), top + 23.6);

  // Title
  const cx = PAGE.x0 + CONTENT_W / 2;
  font(pdf, 17, "bold", C.text);
  pdf.text("MEMBERSHIP RECEIPT", cx, top + 39, { align: "center" });
  font(pdf, 11.5, "bold", TIER_COLOR[r.tier]);
  pdf.text(`${MEMBERSHIP_TIERS[r.tier].cardName.toUpperCase()} MEMBER`, cx, top + 45.5, {
    align: "center",
  });

  const paid = Boolean(r.transactionId);
  let y = drawInfoStrip(
    pdf,
    top + 49,
    [
      ["Receipt No.", r.receiptNo],
      ["Date", r.date],
    ],
    [
      ["Payment Status", r.paymentStatus ?? (paid ? "Successful" : "Pending confirmation")],
      ["Membership Year", `${r.validFrom} to ${r.validTill}`],
    ],
    { fill: C.grey, border: false, labelW: 27 },
  );

  // Details table
  const perYear = r.period > 0 ? r.amount / r.period : r.amount;
  const rows: [string, string][] = [
    ["Received From", r.name],
    ["Member ID", r.memberId],
    ["Membership Type", `${r.category} — ${r.type}`],
    ["Annual Contribution", `Rs. ${formatINR(perYear)}/-`],
  ];
  if (r.period > 1) {
    rows.push(["Total Paid", `Rs. ${formatINR(r.amount)}/-  (${r.period} years)`]);
  }
  rows.push(
    ["Amount in Words", amountInWords(r.amount)],
    ["Payment Mode", r.paymentMode ?? "Online"],
    ["Transaction ID", r.transactionId ?? "Awaiting payment confirmation"],
  );
  y = drawTable(pdf, y + 9, rows, {
    split: PAGE.x0 + 46,
    size: 10,
    minRow: 8,
    labelColor: C.text,
  });

  // Thanks + signatory
  font(pdf, 10, "bold", C.text);
  pdf.text("Thank you for supporting the mission of ISLAH Welfare Foundation.", PAGE.x0 + 2, y + 5);
  y = drawSignatory(pdf, y + 30, 10);

  // Important note
  y += 14;
  const note =
    "This is a computer-generated receipt. Membership is non-transferable and non-refundable and is valid for the membership period stated above, subject to applicable terms and conditions.";
  font(pdf, 9.5);
  const step = lh(9.5) * 1.15;
  const lines = (pdf.splitTextToSize(`IMPORTANT NOTE:   ${note}`, CONTENT_W - 6) as string[])
    .length;
  const boxH = (lines + 1) * step + 5;
  pdf.setFillColor(...C.grey);
  pdf.rect(PAGE.x0, y, CONTENT_W, boxH, "F");
  const used = boldLeadParagraph(
    pdf,
    PAGE.x0 + 3,
    y + 5,
    CONTENT_W - 6,
    "IMPORTANT NOTE:",
    note,
    9.5,
  );
  font(pdf, 9.5, "bold", C.text);
  pdf.text("Computer-generated receipt", PAGE.x0 + 3, y + 5 + used);
  y += boxH;

  // Footer tagline
  y += 11;
  font(pdf, 11, "bold", C.blue);
  pdf.text(`${ORG.tagline}  •  Together, Building a Better Tomorrow.`, cx, y, {
    align: "center",
  });

  pdf.setDrawColor(...C.text);
  pdf.setLineWidth(0.4);
  pdf.rect(PAGE.left, top - 4, PAGE.right - PAGE.left, y + 5 - (top - 4));

  pdf.setProperties({ title: `ISLAH Membership Receipt ${r.receiptNo}`, author: ORG.name });
  return pdf;
}

export async function downloadReceiptPdf(r: ReceiptData) {
  const [{ jsPDF }, logo] = await Promise.all([
    import("jspdf"),
    loadPdfLogo().catch(() => undefined),
  ]);
  renderMembershipReceiptPdf(jsPDF, r, logo).save(
    `ISLAH-Membership-Receipt-${safeFileName(r.receiptNo)}.pdf`,
  );
}
