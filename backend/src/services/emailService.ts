import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
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
 * Universal email dispatcher: Uses Gmail SMTP if configured, otherwise logs mock email in development.
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || "info@iwfindia.org";
  const fromAddress = `"ISLAH Welfare Foundation" <${fromEmail}>`;

  const mailer = getTransporter();

  if (!mailer) {
    // Development / Local Mock Logger (Zero Cost)
    console.log("\n=======================================================");
    console.log("📨 [DEV MOCK EMAIL] SMTP Not Configured — Mock Output:");
    console.log(`To:      ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Content:\n${options.text || options.html.replace(/<[^>]*>?/gm, "").slice(0, 300)}...`);
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
    });

    console.log(`📧 [EMAIL SENT] MessageId: ${info.messageId} to ${options.to}`);
    return true;
  } catch (error) {
    console.error(`❌ [EMAIL ERROR] Failed sending to ${options.to}:`, error);
    return false;
  }
}

/**
 * Send 80G Tax-Deductible Donation Receipt Email
 */
export async function sendReceiptEmail(
  to: string,
  data: {
    donorName: string;
    receiptNo: string;
    amount: number;
    cause: string;
    paymentMode: string;
    pan?: string;
    transactionId?: string;
  }
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0b1f3b; padding: 24px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">ISLAH Welfare Foundation</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #cbd5e1;">Official 80G Donation Receipt</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; color: #1e293b;">
        <p>Dear <strong>${data.donorName}</strong>,</p>
        <p>Thank you for your generous contribution towards <strong>${data.cause}</strong>. Your donation helps us save lives and uplift rural communities.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; color: #64748b;">Receipt Number:</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${data.receiptNo}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; color: #64748b;">Donation Amount:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #15803d; text-align: right;">₹${data.amount.toLocaleString("en-IN")}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; color: #64748b;">Payment Mode:</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${data.paymentMode}</td>
          </tr>
          ${
            data.pan
              ? `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 0; color: #64748b;">Donor PAN (80G Exemption):</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${data.pan}</td>
          </tr>`
              : ""
          }
        </table>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #f97316; padding: 12px; font-size: 12px; color: #475569; margin-top: 16px;">
          Donations to ISLAH Welfare Foundation are eligible for tax exemption under Section 80G of the Income Tax Act. Order No: AABTI2820HF2026.
        </div>
      </div>
      <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        ISLAH Welfare Foundation • B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025 • info@iwfindia.org
      </div>
    </div>
  `;

  return sendEmail({
    to,
    subject: `Official Donation Receipt: ${data.receiptNo} - ISLAH Welfare Foundation`,
    html,
  });
}

/**
 * Send Membership Confirmation & Card Email
 */
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
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0b1f3b; padding: 24px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to ISLAH Community</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #cbd5e1;">Official Membership Confirmation</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; color: #1e293b;">
        <p>Dear <strong>${member.name}</strong>,</p>
        <p>Congratulations! Your <strong>${member.category} Card</strong> membership with ISLAH Welfare Foundation has been successfully activated.</p>
        
        <div style="background: linear-gradient(135deg, #0b1f3b, #1e3a8a); color: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #f97316;">ISLAH MEMBER ID</div>
          <div style="font-size: 20px; font-weight: bold; margin-top: 4px; font-family: monospace;">${member.memberNo}</div>
          <div style="margin-top: 16px; font-size: 13px;">
            <span>Category: <strong>${member.category} Card</strong></span> • 
            <span>Valid Until: <strong>${member.validTill}</strong></span>
          </div>
        </div>
        
        <p style="font-size: 13px; color: #475569;">
          You can verify your membership anytime at <a href="http://localhost:3000/membership" style="color: #2563eb;">iwfindia.org/membership</a> using your Member ID or registered phone number.
        </p>
      </div>
      <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        ISLAH Welfare Foundation • Non-Executive & Non-Voting Membership • info@iwfindia.org
      </div>
    </div>
  `;

  return sendEmail({
    to,
    subject: `Membership Activated: ${member.memberNo} (${member.category} Card) - ISLAH`,
    html,
  });
}

/**
 * Send Security OTP Email (for Verification or Renewal)
 */
export async function sendOtpEmail(to: string, otp: string): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center;">
      <h2 style="color: #0b1f3b; margin-top: 0;">ISLAH Member Portal Verification</h2>
      <p style="color: #64748b; font-size: 14px;">Your One-Time Password (OTP) for membership verification/renewal is:</p>
      <div style="background-color: #f8fafc; border: 2px dashed #0b1f3b; display: inline-block; padding: 12px 32px; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #0b1f3b; border-radius: 8px; margin: 16px 0;">
        ${otp}
      </div>
      <p style="color: #94a3b8; font-size: 12px;">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
    </div>
  `;

  return sendEmail({
    to,
    subject: `Your ISLAH Verification Code: ${otp}`,
    html,
  });
}

