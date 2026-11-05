import { FOUNDATION } from "./membershipConfig";

export interface ReceiptData {
  receiptNo: string;
  memberId: string;
  name: string;
  category: string;
  period: number;
  amount: number;
  date: string;
  validFrom: string;
  validTill: string;
  type: "New Membership" | "Renewal";
}

/** Generates and downloads a simple A5 membership fee receipt. */
export async function downloadReceiptPdf(r: ReceiptData) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a5" });
  const w = pdf.internal.pageSize.getWidth();

  pdf.setFillColor(7, 21, 39);
  pdf.rect(0, 0, w, 26, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text(FOUNDATION.name.toUpperCase(), 10, 12);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text(`${FOUNDATION.address}  |  ${FOUNDATION.phone}  |  ${FOUNDATION.email}`, 10, 19);

  pdf.setTextColor(7, 21, 39);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Membership Fee Receipt", 10, 38);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(90, 100, 115);
  pdf.text(`Receipt No: ${r.receiptNo}`, 10, 45);
  pdf.text(`Date: ${r.date}`, w - 10, 45, { align: "right" });

  const rows: [string, string][] = [
    ["Received from", r.name],
    ["Member ID", r.memberId],
    ["Transaction", r.type],
    ["Membership category", r.category],
    ["Membership period", `${r.period} year${r.period > 1 ? "s" : ""}`],
    ["Valid from", r.validFrom],
    ["Valid till", r.validTill],
    ["Amount", `INR ${r.amount.toLocaleString("en-IN")}.00`],
  ];

  let y = 56;
  pdf.setFontSize(10);
  rows.forEach(([label, value], i) => {
    if (i % 2 === 0) {
      pdf.setFillColor(246, 248, 251);
      pdf.rect(8, y - 5, w - 16, 9, "F");
    }
    pdf.setTextColor(90, 100, 115);
    pdf.setFont("helvetica", "normal");
    pdf.text(label, 12, y + 1);
    pdf.setTextColor(7, 21, 39);
    pdf.setFont("helvetica", i === rows.length - 1 ? "bold" : "normal");
    pdf.text(value, w - 12, y + 1, { align: "right" });
    y += 9;
  });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(110, 120, 135);
  const note = pdf.splitTextToSize(
    "Membership is subject to ISLAH's Membership Policy. Supporting membership is non-executive and does not confer trustee, governance or voting rights. This is a computer-generated receipt.",
    w - 20,
  );
  pdf.text(note, 10, y + 10);

  pdf.save(`ISLAH-Receipt-${r.receiptNo}.pdf`);
}
