import type { jsPDF } from "jspdf";
import { ORG } from "@/components/documents/orgDetails";
import { loadPdfLogo } from "@/components/documents/docUtils";
import { DONOR_TIERS, tierRangeText } from "@/components/documents/donorTier";
import {
  C,
  CONTENT_W,
  PAGE,
  addLogo,
  drawTable,
  font,
  lh,
  wrapped,
  type RGB,
} from "@/components/documents/pdfKit";
import {
  GENERAL_SUPPORT,
  OFFLINE_BANK_DETAILS,
  SUPPORT_AREA_INFO,
} from "@/content/donationContent";

/**
 * "Support Our Work Options" brochure, generated in the browser from the same
 * content as the Donate & Support page so the two never drift apart.
 * Standard PDF fonts cannot render "₹", so amounts are printed as "Rs.".
 */

const NAVY: RGB = [7, 21, 39];
const ORANGE: RGB = [249, 115, 22];
const BOTTOM = 280;

const rs = (s: string) => s.replace(/₹/g, "Rs. ");

const WAYS_TO_GIVE: [string, string][] = [
  [
    "General Donation",
    "Let ISLAH allocate your contribution according to current organisational priorities.",
  ],
  [
    "Programme-Specific Donation",
    "Support a defined programme within one of our eight areas of work.",
  ],
  [
    "Community Initiative Donation",
    "Support an initiative for a specific community, village or campaign.",
  ],
  [
    "Emergency / Humanitarian Support",
    "Help ISLAH respond with relief and rehabilitation when needs arise.",
  ],
  ["Recurring Support", "Give every month or every year to help sustain ongoing programmes."],
];

const MORE_WAYS: [string, string][] = [
  ["Volunteer with ISLAH", "Give your time and skills — /volunteer"],
  ["Partner with ISLAH", "Build a structured institutional collaboration — /partner"],
  ["Become a Mentor", "Share knowledge and experience — /mentor"],
  ["Sponsor a Programme", "Support a defined programme or initiative — /sponsor"],
  ["Become a Member", "Join the ISLAH community — /membership"],
];

export async function downloadSupportOptionsBrochure() {
  const [{ jsPDF }, logo] = await Promise.all([
    import("jspdf"),
    loadPdfLogo().catch(() => undefined),
  ]);
  const pdf: jsPDF = new jsPDF({ unit: "mm", format: "a4" });
  pdf.setProperties({ title: "ISLAH — Support Our Work Options", author: ORG.name });

  let y = 0;
  const ensure = (needed: number) => {
    if (y + needed <= BOTTOM) return;
    pdf.addPage();
    y = 18;
  };
  const heading = (eyebrow: string, title: string) => {
    ensure(18);
    font(pdf, 8, "bold", ORANGE);
    pdf.text(eyebrow.toUpperCase(), PAGE.x0, y);
    y += 5;
    font(pdf, 13, "bold", NAVY);
    pdf.text(title, PAGE.x0, y);
    y += 3;
    pdf.setDrawColor(...C.line);
    pdf.setLineWidth(0.3);
    pdf.line(PAGE.x0, y, PAGE.x1, y);
    y += 5;
  };
  const item = (title: string, desc: string, indent = 0) => {
    font(pdf, 9, "bold", NAVY);
    const descLines = pdf.splitTextToSize(rs(desc), CONTENT_W - indent) as string[];
    ensure(lh(9) * 1.15 * (descLines.length + 1) + 2);
    pdf.text(rs(title), PAGE.x0 + indent, y);
    y += lh(9) * 1.2;
    y += wrapped(pdf, rs(desc), PAGE.x0 + indent, y, CONTENT_W - indent, 9, "normal", C.muted);
    y += 2;
  };

  // Header band
  pdf.setFillColor(...NAVY);
  pdf.rect(0, 0, 210, 42, "F");
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(PAGE.x0, 9, 22, 24, 2, 2, "F");
  addLogo(pdf, logo, PAGE.x0 + 2.5, 10.5, 21);
  font(pdf, 8, "bold", ORANGE);
  pdf.text("DONATION & SUPPORT", PAGE.x0 + 28, 15);
  font(pdf, 17, "bold", [255, 255, 255]);
  pdf.text("Support Our Work — Options", PAGE.x0 + 28, 23);
  font(pdf, 9, "normal", [203, 213, 225]);
  pdf.text("Give With Purpose. Support Meaningful Change.", PAGE.x0 + 28, 29.5);
  pdf.text(`${ORG.name} · ${ORG.website}`, PAGE.x0 + 28, 34.5);
  y = 52;

  y += wrapped(
    pdf,
    "Every meaningful community initiative requires people who are willing to support it. Your contribution can help ISLAH strengthen opportunities for people and communities across rural and underserved areas through education, healthcare, livelihoods, empowerment, knowledge, environmental action, social development and humanitarian support.",
    PAGE.x0,
    y,
    CONTENT_W,
    9.5,
  );
  y += 6;

  heading("01 · Ways to Give", "Choose How You Would Like to Support");
  WAYS_TO_GIVE.forEach(([t, d]) => item(t, d));

  heading("02 · Where Your Support Goes", "Eight Interconnected Areas. One Shared Purpose.");
  SUPPORT_AREA_INFO.forEach((a, i) =>
    item(`${String(i + 1).padStart(2, "0")} — ${a.name}`, a.desc),
  );
  item(
    `09 — ${GENERAL_SUPPORT}`,
    "For supporters who want ISLAH to allocate their contribution according to current organisational priorities and programme needs.",
  );

  heading("03 · Recognition", "ISLAH Donor Recognition Levels");
  ensure(6 * DONOR_TIERS.length + 8);
  y = drawTable(
    pdf,
    y,
    [...DONOR_TIERS].reverse().map((t) => [t.label, rs(tierRangeText(t))] as [string, string]),
    { labelColor: NAVY },
  );
  y += 7;

  heading("04 · How to Give", "Online, Bank Transfer or Cheque");
  item(
    "Online",
    `Donate securely at ${ORG.website}/donate — receipts are issued and emailed automatically.`,
  );
  ensure(50);
  y = drawTable(
    pdf,
    y,
    [
      ["Account Name", OFFLINE_BANK_DETAILS.accountName],
      ["Account Number", OFFLINE_BANK_DETAILS.accountNo],
      ["Account Type", OFFLINE_BANK_DETAILS.accountType],
      ["IFS Code", OFFLINE_BANK_DETAILS.ifsc],
      ["MICR Code", OFFLINE_BANK_DETAILS.micr],
      ["Bank & Branch", `${OFFLINE_BANK_DETAILS.bankName}, ${OFFLINE_BANK_DETAILS.branch}`],
      [
        "Cheque / Draft",
        `Payable to "${OFFLINE_BANK_DETAILS.chequePayableTo}", sent to ${OFFLINE_BANK_DETAILS.chequeAddress}`,
      ],
    ],
    { labelColor: NAVY, split: PAGE.x0 + 42 },
  );
  y += 3;
  y += wrapped(
    pdf,
    `After a bank transfer or cheque, please email the transfer details and your postal address to ${ORG.email} so we can issue your receipt. ISLAH can currently accept contributions only from Indian citizens.`,
    PAGE.x0,
    y,
    CONTENT_W,
    8.5,
    "normal",
    C.muted,
  );
  y += 6;

  heading("05 · More Than Donation", "There Are Many Ways to Stand with ISLAH");
  MORE_WAYS.forEach(([t, d]) => item(t, `${d.replace(/ — \//, ` — ${ORG.website}/`)}`));

  ensure(22);
  y += 2;
  y += wrapped(
    pdf,
    "Tax-related documentation is subject to ISLAH's eligibility, applicable registration or approval status, the nature of the contribution and the legal requirements in force. A donation does not automatically qualify for a tax deduction.",
    PAGE.x0,
    y,
    CONTENT_W,
    8,
    "italic",
    C.muted,
  );
  y += 4;
  font(pdf, 9, "bold", NAVY);
  pdf.text(`Questions? ${ORG.phone} · ${ORG.email}`, PAGE.x0, y);

  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    font(pdf, 7.5, "normal", C.muted);
    pdf.text(`${ORG.name} · Support Our Work Options`, PAGE.x0, 290);
    pdf.text(`${i} / ${pages}`, PAGE.x1, 290, { align: "right" });
  }

  pdf.save("ISLAH-Support-Our-Work-Options.pdf");
}
