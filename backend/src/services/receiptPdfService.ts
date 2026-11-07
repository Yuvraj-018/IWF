import PDFDocument from "pdfkit";

export interface ReceiptPdfData {
  receiptNo: string;
  donorName: string;
  donorType?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  amount: number;
  financialType: string;
  frequency?: string;
  paymentMode?: string;
  transactionId?: string;
  pan?: string;
  taxExemption?: boolean;
  createdAt?: string | Date;
}

/**
 * Converts a number into Indian Rupees words (e.g. 1500 -> "One Thousand Five Hundred Rupees Only")
 */
function numberToWordsINR(amount: number): string {
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
  ];

  function numToWords(n: number): string {
    if (n === 0) return "";
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + numToWords(n % 100) : "");
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + numToWords(n % 1000) : "");
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + numToWords(n % 100000) : "");
    return numToWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + numToWords(n % 10000000) : "");
  }

  const rounded = Math.floor(amount);
  const words = numToWords(rounded);
  return (words ? words + " Rupees Only" : "Zero Rupees Only").trim();
}

/**
 * Generates an official, A4-sized 80G Tax-Deductible Donation Receipt PDF as a Buffer.
 */
export async function generateReceiptPdfBuffer(data: ReceiptPdfData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
        info: {
          Title: `80G Donation Receipt - ${data.receiptNo}`,
          Author: "ISLAH Welfare Foundation",
          Subject: "Official Donation Receipt under Section 80G Income Tax Act",
          Keywords: "Donation, 80G, Tax Exemption, ISLAH, NGO, Charity",
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err: Error) => reject(err));

      const navy = "#071527";
      const slateDark = "#1e293b";
      const slateLight = "#64748b";
      const orange = "#f97316";
      const emerald = "#059669";
      const lightBg = "#f8fafc";
      const borderColor = "#e2e8f0";

      // ── Outer Border ──
      doc
        .rect(30, 30, 535, 782)
        .lineWidth(1.5)
        .strokeColor(navy)
        .stroke();

      doc
        .rect(34, 34, 527, 774)
        .lineWidth(0.5)
        .strokeColor(orange)
        .stroke();

      // ── Header Banner ──
      doc.rect(35, 35, 525, 85).fill(navy);

      doc
        .fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(20)
        .text("ISLAH WELFARE FOUNDATION", 45, 50, { align: "center" });

      doc
        .font("Helvetica")
        .fontSize(8.5)
        .fillColor("#cbd5e1")
        .text(
          "Registered Section 8 Non-Profit Organization | CIN: U85300DL2021NPL388832 | PAN: AABTI2820H",
          45,
          74,
          { align: "center" }
        );

      doc
        .text(
          "Registered Office: B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025 | Head Office: Darbhanga, Bihar",
          45,
          86,
          { align: "center" }
        );

      doc
        .fillColor("#fed7aa")
        .font("Helvetica-Bold")
        .fontSize(8)
        .text("Email: info@iwfindia.org  •  Website: www.iwfindia.org  •  Helpline: +91 92588 95224", 45, 98, {
          align: "center",
        });

      // ── Receipt Badge & Statutory Notice ──
      doc.rect(35, 120, 525, 32).fill(lightBg);

      doc
        .fillColor(emerald)
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("OFFICIAL DONATION RECEIPT & 80G CERTIFICATE", 45, 130, { align: "center" });

      // ── Receipt Details Grid ──
      const startY = 165;
      const leftColX = 50;
      const rightColX = 330;

      doc.font("Helvetica-Bold").fontSize(9).fillColor(slateDark);
      doc.text("Receipt Number:", leftColX, startY);
      doc.font("Helvetica").text(data.receiptNo, leftColX + 100, startY);

      doc.font("Helvetica-Bold").text("Date of Issue:", rightColX, startY);
      const issueDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : new Date().toLocaleDateString("en-IN");
      doc.font("Helvetica").text(issueDate, rightColX + 90, startY);

      doc.font("Helvetica-Bold").text("Payment Mode:", leftColX, startY + 18);
      doc.font("Helvetica").text(data.paymentMode || "Online Payment", leftColX + 100, startY + 18);

      doc.font("Helvetica-Bold").text("Transaction Ref:", rightColX, startY + 18);
      doc.font("Helvetica").text(data.transactionId || "Direct Gateway Capture", rightColX + 90, startY + 18);

      // Divider
      doc
        .moveTo(45, startY + 36)
        .lineTo(550, startY + 36)
        .lineWidth(0.5)
        .strokeColor(borderColor)
        .stroke();

      // ── Donor Information Box ──
      const donorBoxY = startY + 45;
      doc.rect(45, donorBoxY, 505, 110).fillAndStroke(lightBg, borderColor);

      doc.font("Helvetica-Bold").fontSize(10).fillColor(navy).text("DONOR PARTICULARS", 55, donorBoxY + 10);

      doc.font("Helvetica-Bold").fontSize(8.5).fillColor(slateDark).text("Donor Name:", 55, donorBoxY + 30);
      doc.font("Helvetica").text(data.donorName || "Supporter of ISLAH", 140, donorBoxY + 30);

      doc.font("Helvetica-Bold").text("Email Address:", 55, donorBoxY + 46);
      doc.font("Helvetica").text(data.email, 140, donorBoxY + 46);

      doc.font("Helvetica-Bold").text("Phone Number:", 55, donorBoxY + 62);
      doc.font("Helvetica").text(data.phone || "Not Disclosed", 140, donorBoxY + 62);

      doc.font("Helvetica-Bold").text("Address / State:", 55, donorBoxY + 78);
      const fullAddress = [data.address, data.city, data.state, data.pincode].filter(Boolean).join(", ") || "India";
      doc.font("Helvetica").text(fullAddress, 140, donorBoxY + 78, { width: 390 });

      doc.font("Helvetica-Bold").text("Donor PAN (80G):", 55, donorBoxY + 94);
      doc.font("Helvetica").fillColor(data.pan ? emerald : slateLight).text(data.pan ? data.pan.toUpperCase() : "Not Provided (Eligible as General Contribution)", 140, donorBoxY + 94);

      // ── Contribution Itemization Table ──
      const tableTop = donorBoxY + 125;

      // Table Header
      doc.rect(45, tableTop, 505, 24).fill(navy);
      doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(8.5);
      doc.text("S.NO.", 55, tableTop + 7);
      doc.text("PURPOSE / CONTRIBUTION DESCRIPTION", 100, tableTop + 7);
      doc.text("FREQUENCY", 360, tableTop + 7);
      doc.text("AMOUNT (INR)", 450, tableTop + 7, { align: "right", width: 90 });

      // Table Row
      const rowY = tableTop + 24;
      doc.rect(45, rowY, 505, 45).fillAndStroke("#ffffff", borderColor);
      doc.fillColor(slateDark).font("Helvetica").fontSize(8.5);
      doc.text("01", 55, rowY + 10);

      doc.font("Helvetica-Bold").text(data.financialType || "General Charitable Corpus / Healthcare", 100, rowY + 10);
      doc.font("Helvetica").fontSize(7.5).fillColor(slateLight).text("Direct rural livelihood, healthcare or education intervention in Bihar", 100, rowY + 22);

      doc.fontSize(8.5).fillColor(slateDark).text(data.frequency || "One Time", 360, rowY + 10);
      doc.font("Helvetica-Bold").text(`₹ ${data.amount.toLocaleString("en-IN")}`, 450, rowY + 10, { align: "right", width: 90 });

      // Table Total Row
      const totalRowY = rowY + 45;
      doc.rect(45, totalRowY, 505, 26).fill(lightBg);
      doc.font("Helvetica-Bold").fontSize(9).fillColor(navy).text("TOTAL DONATION RECEIVED:", 100, totalRowY + 8);
      doc.fillColor(emerald).fontSize(11).text(`₹ ${data.amount.toLocaleString("en-IN")}`, 450, totalRowY + 7, { align: "right", width: 90 });

      // Amount in Words
      const wordsY = totalRowY + 34;
      doc.font("Helvetica-Bold").fontSize(8.5).fillColor(slateDark).text("Amount in Words: ", 50, wordsY);
      doc.font("Helvetica-Oblique").fillColor(navy).text(numberToWordsINR(data.amount), 140, wordsY);

      // ── Statutory Tax Exemption Declaration (Section 80G) ──
      const taxBoxY = wordsY + 24;
      doc.rect(45, taxBoxY, 505, 80).fillAndStroke("#eff6ff", "#bfdbfe");

      doc.fillColor("#1e40af").font("Helvetica-Bold").fontSize(8.5).text("STATUTORY TAX EXEMPTION INFORMATION (SECTION 80G & 12A)", 55, taxBoxY + 8);

      doc.font("Helvetica").fontSize(7.5).fillColor("#1e3a8a").text(
        "• All donations made to ISLAH Welfare Foundation are 50% exempt from Income Tax under Section 80G of the Income Tax Act, 1961.\n" +
        "• Unique Registration Number (URN) / 80G Approval Order No: AABTI2820HF2026 issued by the Director of Income Tax (Exemptions).\n" +
        "• Section 12A Registration Order No: AABTI2820HE2026.\n" +
        "• This is an electronically generated and digitally authenticated receipt. No physical signature is required for claiming deduction.\n" +
        "• As per CBDT guidelines, donors who provided a valid PAN will have their contribution filed in Form 10BD for annual tax credit.",
        55,
        taxBoxY + 22,
        { lineGap: 2.5, width: 485 }
      );

      // ── Signatory & Verification Section ──
      const signY = taxBoxY + 92;

      // Left: Verification & QR code text
      doc.font("Helvetica-Bold").fontSize(8).fillColor(navy).text("VERIFICATION & AUDIT COMPLIANCE", 50, signY);
      doc.font("Helvetica").fontSize(7.5).fillColor(slateLight).text(
        `Receipt Hash / Token: ${data.receiptNo}\n` +
        "Online Verification: Visit www.iwfindia.org/verify and enter the receipt number above to independently confirm authentic issuance.",
        50,
        signY + 12,
        { width: 300, lineGap: 2 }
      );

      // Right: Authorized Signatory Stamp Box
      doc.rect(375, signY - 5, 175, 75).strokeColor(borderColor).stroke();
      doc.font("Helvetica-Bold").fontSize(8).fillColor(navy).text("FOR ISLAH WELFARE FOUNDATION", 385, signY + 3);
      doc.font("Helvetica-Oblique").fontSize(8).fillColor(emerald).text("Digitally Signed & Certified", 385, signY + 32);
      doc.font("Helvetica").fontSize(7.5).fillColor(slateLight).text("Authorized Signatory", 385, signY + 48);
      doc.text("Board of Trustees & Accounts Division", 385, signY + 58);

      // ── Footer Note ──
      doc
        .font("Helvetica-Oblique")
        .fontSize(7)
        .fillColor(slateLight)
        .text(
          "Thank you for being the beacon of hope for underprivileged families in rural Bihar. Together, we are transforming lives.",
          45,
          775,
          { align: "center", width: 505 }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

