import nodemailer from "nodemailer";
import { generateReceiptPdfBuffer, ReceiptPdfData } from "./receiptPdfService.js";

export interface EmailAttachment {
  filename: string;
  content?: Buffer | string;
  path?: string;
  contentType?: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

/**
 * Universal email dispatcher:
 * - Uses Gmail / SMTP transport if credentials exist in .env
 * - Falls back to a clean zero-cost developer mock logger when SMTP is unconfigured.
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || "info@iwfindia.org";
  const fromAddress = `"ISLAH Welfare Foundation" <${fromEmail}>`;

  const mailer = getTransporter();

  if (!mailer) {
    // Development / Local Mock Logger (Zero Cost)
    console.log("\n=======================================================");
    console.log("📨 [DEV MOCK EMAIL] SMTP Not Configured — Mock Output:");
    console.log(`To:          ${options.to}`);
    console.log(`Subject:     ${options.subject}`);
    if (options.attachments && options.attachments.length > 0) {
      const attSummary = options.attachments
        .map((a) => `${a.filename} (${Buffer.isBuffer(a.content) ? `${Math.round(a.content.length / 1024)} KB` : "attached"})`)
        .join(", ");
      console.log(`Attachments: 📎 ${attSummary}`);
    }
    console.log("-------------------------------------------------------");
    const previewText = options.text || options.html.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
    console.log(`Content Preview:\n${previewText.slice(0, 320)}...`);
    console.log("=======================================================\n");
    return true;
  }

  try {
    const info = await mailer.sendMail({
      from: fromAddress,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>?/gm, ""),
      attachments: options.attachments,
    });

    console.log(`📧 [EMAIL SENT] MessageId: ${info.messageId} to ${options.to}`);
    return true;
  } catch (error) {
    console.error(`❌ [EMAIL ERROR] Failed sending to ${options.to}:`, error);
    return false;
  }
}

/**
 * Responsive HTML Email Layout Wrapper matching ISLAH Welfare Foundation Branding
 */
export function wrapEmailTemplate(title: string, preheaderText: string, bodyContent: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; }
    img { border: 0; outline: none; text-decoration: none; display: block; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; margin: 0 !important; }
      .p-mobile { padding: 20px 16px !important; }
      .text-sm-mobile { font-size: 13px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9;">
  <!-- Preheader text for inbox preview -->
  <span style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheaderText}
  </span>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" class="email-container" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; margin: 0 auto;">
          
          <!-- Brand Header -->
          <tr>
            <td style="background-color: #071527; padding: 28px 32px; text-align: center; border-bottom: 3px solid #f97316;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; text-transform: uppercase;">
                      ISLAH WELFARE FOUNDATION
                    </div>
                    <div style="font-size: 12px; color: #f97316; font-weight: 600; margin-top: 4px; letter-spacing: 0.8px; text-transform: uppercase;">
                      Bridging Hope, Empowering Lives • Darbhanga, Bihar
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td class="p-mobile" style="padding: 32px 36px; background-color: #ffffff;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Statutory Trust Badge -->
          <tr>
            <td style="background-color: #f8fafc; padding: 18px 32px; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 11px; color: #64748b; line-height: 1.5; text-align: center;">
                    <strong style="color: #071527;">ISLAH Welfare Foundation</strong> is a registered Section 8 non-profit organization (CIN: U85300DL2021NPL388832).<br>
                    Exempted under <strong style="color: #059669;">Section 12A &amp; Section 80G</strong> of the Income Tax Act, 1961 (Order No: AABTI2820HF2026).
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #071527; padding: 24px 32px; text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.6;">
              <div style="color: #cbd5e1; font-weight: 600; margin-bottom: 6px;">
                Head Office: Darbhanga, Bihar, India | Registered Office: Okhla, New Delhi-110025
              </div>
              <div>
                Helpline: <a href="tel:+919258895224" style="color: #f97316; text-decoration: none; font-weight: bold;">+91 92588 95224</a> &nbsp;•&nbsp; 
                Email: <a href="mailto:info@iwfindia.org" style="color: #38bdf8; text-decoration: none;">info@iwfindia.org</a> &nbsp;•&nbsp; 
                Web: <a href="https://www.iwfindia.org" style="color: #38bdf8; text-decoration: none;">www.iwfindia.org</a>
              </div>
              <div style="margin-top: 12px; font-size: 10px; color: #64748b;">
                © ${new Date().getFullYear()} ISLAH Welfare Foundation. All rights reserved. This is an official system-generated notification.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUCHPOINT 1: 80G DONATION RECEIPT & ACKNOWLEDGEMENT (WITH PDF ATTACHMENT)
// ─────────────────────────────────────────────────────────────────────────────

export interface DonationReceiptEmailPayload {
  donorName: string;
  donorType?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  receiptNo: string;
  amount: number;
  cause: string;
  paymentMode: string;
  pan?: string;
  taxExemption?: boolean;
  transactionId?: string;
  createdAt?: string | Date;
}

export async function sendReceiptEmail(
  to: string,
  data: DonationReceiptEmailPayload
): Promise<boolean> {
  let pdfBuffer: Buffer | undefined;

  try {
    pdfBuffer = await generateReceiptPdfBuffer({
      receiptNo: data.receiptNo,
      donorName: data.donorName,
      donorType: data.donorType,
      email: data.email || to,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      amount: data.amount,
      financialType: data.cause,
      paymentMode: data.paymentMode,
      pan: data.pan,
      taxExemption: data.taxExemption,
      transactionId: data.transactionId,
      createdAt: data.createdAt,
    });
  } catch (err: any) {
    console.warn("⚠️ [PDF GENERATION WARNING] Could not generate receipt PDF buffer:", err.message);
  }

  const formattedAmount = `₹${Number(data.amount).toLocaleString("en-IN")}`;
  const title = `Official 80G Donation Receipt: ${data.receiptNo} - ISLAH Welfare Foundation`;
  const preheader = `Thank you for your generous contribution of ${formattedAmount} towards ${data.cause}. Your official 80G receipt is attached.`;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; padding: 6px 14px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 9999px; color: #047857; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
        ✓ Contribution Verified &amp; 80G Eligible
      </div>
      <h2 style="font-size: 20px; font-weight: 800; color: #071527; margin: 12px 0 4px;">
        Thank You for Your Generosity!
      </h2>
      <p style="font-size: 13px; color: #64748b; margin: 0;">
        Your compassion directly touches vulnerable lives across rural Bihar.
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Dear <strong>${data.donorName}</strong>,
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      On behalf of everyone at <strong>ISLAH Welfare Foundation</strong> and the families we serve, we extend our heartfelt gratitude for your contribution of <strong style="color: #059669;">${formattedAmount}</strong> towards <strong>${data.cause}</strong>.
    </p>

    <!-- Receipt Details Table -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 20px 0; overflow: hidden;">
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Receipt Number:</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #071527; text-align: right; font-family: monospace;">${data.receiptNo}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Donation Amount:</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 800; color: #059669; text-align: right;">${formattedAmount}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Cause / Purpose:</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #071527; text-align: right;">${data.cause}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Payment Mode:</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #071527; text-align: right;">${data.paymentMode}</td>
      </tr>
      ${
        data.pan
          ? `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Donor PAN (80G Benefit):</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #071527; text-align: right; font-family: monospace;">${data.pan}</td>
      </tr>`
          : ""
      }
      ${
        data.transactionId
          ? `
      <tr>
        <td style="padding: 12px 16px; font-size: 12px; color: #64748b;">Transaction Reference:</td>
        <td style="padding: 12px 16px; font-size: 12px; color: #475569; text-align: right; font-family: monospace;">${data.transactionId}</td>
      </tr>`
          : ""
      }
    </table>

    <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 12px; color: #1e40af; line-height: 1.5;">
      <strong>80G Tax Exemption Note:</strong> Your donation is 50% exempt from income tax under Section 80G of the Income Tax Act. A certified PDF copy of your official 80G receipt is attached with this email for your financial and tax records.
    </div>

    <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
      You can independently verify this receipt anytime on our portal at 
      <a href="https://www.iwfindia.org/verify" style="color: #f97316; font-weight: bold; text-decoration: none;">www.iwfindia.org/verify</a> 
      using receipt number <strong>${data.receiptNo}</strong>.
    </p>

    <div style="margin-top: 24px; text-align: center;">
      <a href="https://www.iwfindia.org/verify" style="display: inline-block; background-color: #071527; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 28px; border-radius: 10px;">
        Verify Receipt Online
      </a>
    </div>
  `;

  const html = wrapEmailTemplate(title, preheader, bodyContent);

  const attachments: EmailAttachment[] = [];
  if (pdfBuffer) {
    attachments.push({
      filename: `80G_Donation_Receipt_${data.receiptNo}.pdf`,
      content: pdfBuffer,
      contentType: "application/pdf",
    });
  }

  return sendEmail({
    to,
    subject: title,
    html,
    attachments: attachments.length > 0 ? attachments : undefined,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUCHPOINT 2: INBOUND APPLICATION ACKNOWLEDGEMENT (VOLUNTEER / CAREER / CSR)
// ─────────────────────────────────────────────────────────────────────────────

export interface ApplicationAcknowledgementPayload {
  applicationId: string;
  type: "volunteer" | "mentor" | "partner" | "sponsor" | "career" | string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  selectedSectors?: string[];
  message?: string;
  resumeFileName?: string;
}

export async function sendInboundApplicationAcknowledgementEmail(
  to: string,
  app: ApplicationAcknowledgementPayload
): Promise<boolean> {
  const typeDisplayMap: Record<string, string> = {
    volunteer: "Community Volunteer Programme",
    mentor: "Youth & Skill Mentorship",
    partner: "CSR & Institutional Partnership",
    sponsor: "Philanthropic Sponsorship",
    career: "Careers & Open Positions",
  };

  const readableType = typeDisplayMap[app.type.toLowerCase()] || `${app.type.toUpperCase()} Application`;
  const title = `Application Received: ${readableType} (${app.applicationId}) - ISLAH`;
  const preheader = `We have received your ${readableType} submission (Ref: ${app.applicationId}). Our committee is reviewing your profile.`;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; padding: 6px 14px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 9999px; color: #1d4ed8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
        Application Registered
      </div>
      <h2 style="font-size: 20px; font-weight: 800; color: #071527; margin: 12px 0 4px;">
        Thank You for Reaching Out to ISLAH!
      </h2>
      <p style="font-size: 13px; color: #64748b; margin: 0;">
        We have safely received your submission for <strong>${readableType}</strong>.
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Dear <strong>${app.fullName}</strong>,
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Thank you for your willingness to join hands with ISLAH Welfare Foundation. Organizations and individuals like you are the true driving force behind our rural development initiatives.
    </p>

    <!-- Application Summary -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 20px 0; overflow: hidden;">
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Application ID:</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 700; color: #071527; text-align: right; font-family: monospace;">${app.applicationId}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Programme / Category:</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #071527; text-align: right;">${readableType}</td>
      </tr>
      ${
        app.organization
          ? `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Organization / Entity:</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #071527; text-align: right;">${app.organization}</td>
      </tr>`
          : ""
      }
      ${
        app.selectedSectors && app.selectedSectors.length > 0
          ? `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">Sectors of Interest:</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #334155; text-align: right;">${app.selectedSectors.join(", ")}</td>
      </tr>`
          : ""
      }
      ${
        app.resumeFileName
          ? `
      <tr>
        <td style="padding: 12px 16px; font-size: 12px; color: #64748b;">Attached Document:</td>
        <td style="padding: 12px 16px; font-size: 12px; color: #047857; font-weight: 600; text-align: right;">📎 ${app.resumeFileName}</td>
      </tr>`
          : ""
      }
    </table>

    <div style="background-color: #fff7ed; border-left: 4px solid #f97316; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 12px; color: #9a3412; line-height: 1.5;">
      <strong>What Happens Next?</strong><br>
      Our project committee reviews inbound profiles weekly. If your skills or institutional proposal align with our active operational requirements, our coordinator will reach out directly to your registered email or phone number within <strong>2 to 4 working days</strong>.
    </div>

    <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
      Should you need to update any information or share additional documentation, please reply directly to this email or write to us quoting your reference <strong>${app.applicationId}</strong>.
    </p>
  `;

  const html = wrapEmailTemplate(title, preheader, bodyContent);

  return sendEmail({
    to,
    subject: title,
    html,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUCHPOINT 3: CONTACT FORM ENQUIRY ACKNOWLEDGEMENT
// ─────────────────────────────────────────────────────────────────────────────

export interface ContactAcknowledgementPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  referenceNumber?: string;
  cityDistrict?: string;
  state?: string;
}

export async function sendContactAcknowledgementEmail(
  to: string,
  contact: ContactAcknowledgementPayload
): Promise<boolean> {
  const ref = contact.referenceNumber || `ISLAH-ENQ-${Date.now().toString().slice(-6)}`;
  const title = `Enquiry Received: ${contact.subject || "General Query"} (Ref: ${ref})`;
  const preheader = `Thank you for contacting ISLAH Welfare Foundation. We have received your query (Ref: ${ref}) and will revert shortly.`;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; padding: 6px 14px; background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 9999px; color: #334155; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
        Enquiry Logged
      </div>
      <h2 style="font-size: 20px; font-weight: 800; color: #071527; margin: 12px 0 4px;">
        We Received Your Message
      </h2>
      <p style="font-size: 13px; color: #64748b; margin: 0;">
        Reference Ticket: <strong style="color: #071527; font-family: monospace;">${ref}</strong>
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Dear <strong>${contact.name}</strong>,
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Thank you for writing to ISLAH Welfare Foundation. This email confirms that your communication has been registered with our community helpdesk.
    </p>

    <!-- Message Recap -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; margin: 20px 0;">
      <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px;">
        Subject: ${contact.subject || "General Inquiry"}
      </div>
      <div style="font-size: 13px; color: #1e293b; font-style: italic; line-height: 1.5;">
        "${contact.message}"
      </div>
    </div>

    <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
      Our coordination team at the Darbhanga or New Delhi secretariat will examine your query and get back to you within <strong>24 to 48 business hours</strong>.
    </p>

    <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
      For emergency medical interventions or immediate ambulance dispatch in our operational villages, please call our 24x7 community hotline directly at <strong style="color: #f97316;">+91 92588 95224</strong>.
    </p>
  `;

  const html = wrapEmailTemplate(title, preheader, bodyContent);

  return sendEmail({
    to,
    subject: title,
    html,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUCHPOINT 4: APPLICATION STATUS UPDATE (TRIGGERED FROM CMS ADMIN)
// ─────────────────────────────────────────────────────────────────────────────

export interface ApplicationStatusUpdatePayload {
  applicationId: string;
  type: string;
  fullName: string;
  newStatus: string;
  reviewNotes?: string;
}

export async function sendApplicationStatusUpdateEmail(
  to: string,
  payload: ApplicationStatusUpdatePayload
): Promise<boolean> {
  const statusColors: Record<string, { bg: string; border: string; text: string; header: string }> = {
    Shortlisted: {
      bg: "#ecfdf5",
      border: "#a7f3d0",
      text: "#047857",
      header: "Congratulations! Your Application is Shortlisted",
    },
    Approved: {
      bg: "#ecfdf5",
      border: "#a7f3d0",
      text: "#047857",
      header: "Welcome! Your Application Has Been Approved",
    },
    "Under Review": {
      bg: "#eff6ff",
      border: "#bfdbfe",
      text: "#1d4ed8",
      header: "Your Profile is Under Panel Review",
    },
    Contacted: {
      bg: "#fff7ed",
      border: "#fed7aa",
      text: "#c2410c",
      header: "Our Team is in Touch With You",
    },
    Rejected: {
      bg: "#f8fafc",
      border: "#e2e8f0",
      text: "#475569",
      header: "Update on Your Application with ISLAH",
    },
  };

  const style = statusColors[payload.newStatus] || {
    bg: "#f8fafc",
    border: "#e2e8f0",
    text: "#071527",
    header: `Application Update: ${payload.newStatus}`,
  };

  const title = `Status Update: ${payload.newStatus} - ${payload.applicationId} (ISLAH)`;
  const preheader = `Your ${payload.type} application with ISLAH Welfare Foundation has been marked as ${payload.newStatus}.`;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; padding: 6px 14px; background-color: ${style.bg}; border: 1px solid ${style.border}; border-radius: 9999px; color: ${style.text}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
        Status: ${payload.newStatus}
      </div>
      <h2 style="font-size: 20px; font-weight: 800; color: #071527; margin: 12px 0 4px;">
        ${style.header}
      </h2>
      <p style="font-size: 13px; color: #64748b; margin: 0;">
        Application Reference: <strong style="color: #071527; font-family: monospace;">${payload.applicationId}</strong>
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Dear <strong>${payload.fullName}</strong>,
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      This is an official update regarding your <strong>${payload.type}</strong> application submitted to ISLAH Welfare Foundation.
    </p>

    ${
      payload.newStatus === "Shortlisted"
        ? `
      <div style="background-color: #ecfdf5; border-left: 4px solid #059669; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 13px; color: #065f46; line-height: 1.6;">
        <strong>Next Steps:</strong> Your profile has met our initial qualification criteria. Our outreach team will reach out to schedule an introductory video call or field briefing session. Please keep an eye on your phone and email.
      </div>`
        : payload.newStatus === "Approved"
        ? `
      <div style="background-color: #ecfdf5; border-left: 4px solid #059669; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 13px; color: #065f46; line-height: 1.6;">
        <strong>Official Approval:</strong> We are pleased to formally welcome you to the ISLAH initiative. You will shortly receive an onboarding kit with your assignment details and point of contact.
      </div>`
        : payload.newStatus === "Rejected"
        ? `
      <div style="background-color: #f8fafc; border-left: 4px solid #94a3b8; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 13px; color: #475569; line-height: 1.6;">
        While we were impressed with your enthusiasm, we are unable to advance your application for this specific cycle due to operational constraints. We will maintain your record in our talent repository for future opportunities.
      </div>`
        : ""
    }

    ${
      payload.reviewNotes
        ? `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 12px; color: #334155;">
        <strong style="color: #071527;">Notes from Review Committee:</strong><br>
        "${payload.reviewNotes}"
      </div>`
        : ""
    }

    <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
      If you have questions regarding this update, please reply to this email or reach us at <a href="mailto:info@iwfindia.org" style="color: #f97316; font-weight: bold; text-decoration: none;">info@iwfindia.org</a>.
    </p>
  `;

  const html = wrapEmailTemplate(title, preheader, bodyContent);

  return sendEmail({
    to,
    subject: title,
    html,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUCHPOINT 5: MEMBERSHIP CARD ACTIVATION EMAIL
// ─────────────────────────────────────────────────────────────────────────────

export async function sendMembershipCardEmail(
  to: string,
  member: {
    name: string;
    memberNo: string;
    category: string;
    validTill: string;
    annualFee: number;
    receiptNo?: string;
  }
): Promise<boolean> {
  const title = `Membership Activated: ${member.memberNo} (${member.category} Card) - ISLAH`;
  const preheader = `Congratulations ${member.name}, your official ISLAH Community Membership (${member.category} Card) is now active!`;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; padding: 6px 14px; background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 9999px; color: #92400e; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
        ★ Official Member Card Issued
      </div>
      <h2 style="font-size: 20px; font-weight: 800; color: #071527; margin: 12px 0 4px;">
        Welcome to the ISLAH Family!
      </h2>
      <p style="font-size: 13px; color: #64748b; margin: 0;">
        Official Non-Executive Community Membership Confirmation
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Dear <strong>${member.name}</strong>,
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Congratulations! Your <strong>${member.category} Card</strong> membership with ISLAH Welfare Foundation has been successfully registered and activated.
    </p>

    <!-- Digital Card Preview -->
    <div style="background: linear-gradient(135deg, #071527 0%, #0f2b48 100%); color: #ffffff; padding: 24px; border-radius: 16px; margin: 24px 0; border: 1px solid #1e3a5f; box-shadow: 0 10px 25px rgba(7, 21, 39, 0.3);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #f97316; text-transform: uppercase;">ISLAH COMMUNITY MEMBER</span>
        <span style="background-color: #ffffff; color: #071527; font-size: 10px; font-weight: 900; padding: 3px 10px; border-radius: 9999px; text-transform: uppercase;">${member.category}</span>
      </div>
      <div style="font-size: 22px; font-weight: 900; font-family: monospace; letter-spacing: 1px; margin-bottom: 12px;">
        ${member.memberNo}
      </div>
      <div style="font-size: 14px; font-weight: 700; margin-bottom: 6px;">
        ${member.name}
      </div>
      <div style="font-size: 11px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; margin-top: 10px;">
        Valid Through: <strong style="color: #ffffff;">${member.validTill}</strong> &nbsp;•&nbsp; Status: <strong style="color: #34d399;">Active</strong>
      </div>
    </div>

    <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
      You can view, verify, and download your high-resolution digital membership card anytime by logging in with your Member ID at 
      <a href="https://www.iwfindia.org/membership" style="color: #f97316; font-weight: bold; text-decoration: none;">www.iwfindia.org/membership</a>.
    </p>
  `;

  const html = wrapEmailTemplate(title, preheader, bodyContent);

  return sendEmail({
    to,
    subject: title,
    html,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUCHPOINT 6: VERIFICATION OTP EMAIL
// ─────────────────────────────────────────────────────────────────────────────

export async function sendOtpEmail(to: string, otp: string): Promise<boolean> {
  const title = `Your Verification Code: ${otp} - ISLAH Member Portal`;
  const preheader = `Your One-Time Password (OTP) for ISLAH Portal verification is ${otp}. Valid for 10 minutes.`;

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 24px;">
      <h2 style="font-size: 20px; font-weight: 800; color: #071527; margin: 0 0 6px;">
        One-Time Security Verification
      </h2>
      <p style="font-size: 13px; color: #64748b; margin: 0;">
        Use the one-time code below to verify your session.
      </p>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <div style="display: inline-block; background-color: #f8fafc; border: 2px dashed #071527; border-radius: 12px; padding: 16px 40px; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #071527; font-family: monospace;">
        ${otp}
      </div>
      <div style="font-size: 11px; color: #94a3b8; margin-top: 10px;">
        This code expires in 10 minutes. Do not disclose this code to anyone.
      </div>
    </div>
  `;

  const html = wrapEmailTemplate(title, preheader, bodyContent);

  return sendEmail({
    to,
    subject: title,
    html,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUCHPOINT 7: FOUNDATION ADMIN INBOUND ALERT
// ─────────────────────────────────────────────────────────────────────────────

export async function sendAdminInboundNotificationEmail(
  subject: string,
  details: {
    category: "Donation" | "Volunteer" | "Career" | "CSR / Partner" | "Contact" | "Tax Claim";
    title: string;
    items: { label: string; value: string }[];
  }
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || process.env.SMTP_USER || "info@iwfindia.org";

  const rows = details.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 600;">${item.label}:</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #071527; font-weight: 700; text-align: right;">${item.value}</td>
      </tr>`
    )
    .join("");

  const bodyContent = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; padding: 5px 12px; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 9999px; color: #b91c1c; font-size: 11px; font-weight: 800; text-transform: uppercase;">
        ⚡ Admin Notification Alert
      </div>
      <h2 style="font-size: 18px; font-weight: 800; color: #071527; margin: 10px 0 4px;">
        ${details.title}
      </h2>
    </div>

    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 16px 0; overflow: hidden;">
      ${rows}
    </table>

    <div style="margin-top: 20px; text-align: center;">
      <a href="https://cms.iwfindia.org" style="display: inline-block; background-color: #071527; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 12px; padding: 10px 24px; border-radius: 8px;">
        Open Staff Admin CMS
      </a>
    </div>
  `;

  const html = wrapEmailTemplate(`[ADMIN ALERT] ${subject}`, `New ${details.category} received on portal.`, bodyContent);

  return sendEmail({
    to: adminEmail,
    subject: `[ADMIN ALERT] ${subject}`,
    html,
  });
}
