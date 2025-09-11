import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validation";

// Basic server-side logging utility
function log(message: string, meta?: unknown) {
  console.log(`[contact] ${new Date().toISOString()} - ${message}`,(meta ?? ""));
}

// Read SMTP credentials from environment variables
// IMPORTANT: Create a .env.local with these variables (never commit secrets)
// GMAIL_USER=youraddress@gmail.com
// GMAIL_PASS=app_specific_password

const ADMIN_EMAIL = "PRIYAVIRAT@GMAIL.COM";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Validate against schema
  const parse = contactFormSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { success: false, error: "Validation failed", issues: parse.error.flatten() },
      { status: 422 }
    );
  }

  const data = parse.data;

  // Configure nodemailer transporter for Gmail SMTP
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  const baseStyles = `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #111827; margin: 0; padding: 0; background-color: #f9fafb; }
      .email-wrapper { background-color: #f9fafb; padding: 40px 20px; }
      .container { max-width: 640px; margin: 0 auto; background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
      .header { background: linear-gradient(135deg, #7D4B3C 0%, #61714D 100%); color: white; padding: 30px 20px; text-align: center; }
      .logo { width: 80px; height: 80px; margin: 0 auto 15px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
      .brand { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
      .tagline { font-size: 14px; opacity: 0.9; }
      .content { padding: 30px; }
      .greeting { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 20px; }
      .section { margin-bottom: 25px; }
      .section-title { font-size: 16px; font-weight: 600; color: #7D4B3C; margin-bottom: 15px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px; }
      .row { margin-bottom: 12px; display: flex; }
      .label { color: #6b7280; font-size: 13px; font-weight: 500; min-width: 120px; }
      .value { font-size: 15px; color: #1f2937; flex: 1; }
      .product-enquiry { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0; }
      .product-title { color: #92400e; font-weight: 600; font-size: 16px; margin-bottom: 12px; }
      .footer { background: #f9fafb; color: #6b7280; font-size: 12px; text-align: center; padding: 20px; }
      .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
      @media (max-width: 600px) { .container { margin: 10px; } .content { padding: 20px; } .row { flex-direction: column; } .label { min-width: auto; margin-bottom: 4px; } }
    </style>
  `;

  const plainText = `New contact form submission\n\nName: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}${data.country ? `\nCountry: ${data.country}` : ''}${data.linkedin ? `\nLinkedIn: ${data.linkedin}` : ''}\nSubject: ${data.subject}\nMessage: ${data.message}${data.product ? `\n\nProduct Enquiry:\nProduct: ${data.product}` : ''}${data.grade ? `\nGrade: ${data.grade}` : ''}${data.quantity ? `\nQuantity: ${data.quantity} MT` : ''}\nConsent: ${data.consent ? "Yes" : "No"}`;

  const adminHtml = `
    ${baseStyles}
    <div class="email-wrapper">
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="https://gajna-overseas.vercel.app/logo.webp" alt="Gajna Overseas" style="width: 60px; height: 60px; object-fit: contain;" />
          </div>
          <div class="brand">New Contact Submission</div>
          <div class="tagline">Gajna Overseas - Coffee Export Excellence</div>
        </div>
        <div class="content">
          <div class="greeting">📧 New Enquiry Received</div>
          
          <div class="section">
            <div class="section-title">Contact Information</div>
            <div class="row"><div class="label">Name:</div><div class="value">${data.name}</div></div>
            <div class="row"><div class="label">Email:</div><div class="value">${data.email}</div></div>
            ${data.phone ? `<div class="row"><div class="label">Phone:</div><div class="value">${data.phone}</div></div>` : ''}
            ${data.country ? `<div class="row"><div class="label">Country:</div><div class="value">${data.country}</div></div>` : ''}
            ${data.linkedin ? `<div class="row"><div class="label">LinkedIn:</div><div class="value">${data.linkedin}</div></div>` : ''}
          </div>
          
          <div class="section">
            <div class="section-title">Enquiry Details</div>
            <div class="row"><div class="label">Subject:</div><div class="value">${data.subject}</div></div>
            <div class="row"><div class="label">Message:</div><div class="value">${data.message.replace(/\n/g, "<br/>")}</div></div>
          </div>
          
          ${(data.product || data.grade || data.quantity) ? `
          <div class="product-enquiry">
            <div class="product-title">☕ Product Enquiry Details</div>
            ${data.product ? `<div class="row"><div class="label">Product:</div><div class="value">${data.product}</div></div>` : ''}
            ${data.grade ? `<div class="row"><div class="label">Grade:</div><div class="value">${data.grade}</div></div>` : ''}
            ${data.quantity ? `<div class="row"><div class="label">Quantity:</div><div class="value">${data.quantity} MT</div></div>` : ''}
          </div>` : ''}
        </div>
        <div class="footer">
          <p>This email was sent automatically from your Gajna Overseas website.</p>
          <p>📧 info@gajnaoverseas.com | 📞 +91 9811789665</p>
        </div>
      </div>
    </div>`;

  const userHtml = `
    ${baseStyles}
    <div class="email-wrapper">
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="https://gajna-overseas.vercel.app/logo.webp" alt="Gajna Overseas" style="width: 60px; height: 60px; object-fit: contain;" />
          </div>
          <div class="brand">Thank You for Your Enquiry!</div>
          <div class="tagline">Gajna Overseas - Coffee Export Excellence</div>
        </div>
        <div class="content">
          <div class="greeting">Dear ${data.name},</div>
          
          <div class="section">
            <p class="value" style="line-height: 1.6; margin-bottom: 15px;">Thank you for contacting Gajna Overseas! We've successfully received your enquiry and our team will review it carefully.</p>
            <p class="value" style="line-height: 1.6; margin-bottom: 15px;">We typically respond to all enquiries within 24 hours during business days. Our coffee export specialists will get back to you with detailed information.</p>
            ${(data.product || data.grade) ? `<p class="value" style="line-height: 1.6; margin-bottom: 15px;">📋 <strong>Your Enquiry:</strong> ${data.product ? data.product : 'Coffee products'}${data.grade ? ` (${data.grade})` : ''}${data.quantity ? ` - Quantity: ${data.quantity} MT` : ''}</p>` : ''}
          </div>
          
          <div class="section">
            <div class="section-title">Your Message Summary</div>
            <div class="row"><div class="label">Subject:</div><div class="value">${data.subject}</div></div>
            <div class="row"><div class="label">Message:</div><div class="value">${data.message.replace(/\n/g, "<br/>")}</div></div>
          </div>
          
          <div class="divider"></div>
          
          <div class="section">
            <p class="value" style="line-height: 1.6; margin-bottom: 15px;">🌟 <strong>Why Choose Gajna Overseas?</strong></p>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Premium quality Indian coffee beans</li>
              <li>Direct sourcing from certified plantations</li>
              <li>Competitive pricing and reliable supply</li>
              <li>Expert guidance on coffee grades and specifications</li>
            </ul>
          </div>
        </div>
        <div class="footer">
          <p><strong>Gajna Overseas</strong> - Your Trusted Coffee Export Partner</p>
          <p>📧 info@gajnaoverseas.com | 📞 +91 9811789665</p>
          <p style="margin-top: 10px; font-size: 11px;">If you didn't send this enquiry, please ignore this email.</p>
        </div>
      </div>
    </div>`;

  const DRY_RUN = process.env.EMAIL_DRY_RUN === "true" || ((!user || !pass) && process.env.NODE_ENV !== "production");

  if ((!user || !pass) && DRY_RUN) {
    log("EMAIL DRY RUN: Missing SMTP env; emails will be logged instead.");
    console.log("ADMIN EMAIL (DRY RUN)", { to: ADMIN_EMAIL, subject: `[Contact] ${data.subject}`, text: plainText, htmlPreview: adminHtml.slice(0, 180) + "..." });
    console.log("USER EMAIL (DRY RUN)", { to: data.email, subject: "We got your message", text: `Hi ${data.name},\n\nThank you for contacting us. We’ll be in touch soon.`, htmlPreview: userHtml.slice(0, 180) + "..." });
    return NextResponse.json({ success: true, dryRun: true });
  }

  if (!user || !pass) {
    log("Missing SMTP environment variables");
    return NextResponse.json({ success: false, error: "Server not configured" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user, pass },
  });

  try {
    // Send to admin
    await transporter.sendMail({
      from: { name: "Website Contact", address: user },
      to: ADMIN_EMAIL,
      subject: `[Contact] ${data.subject}`,
      text: plainText,
      html: adminHtml,
    });

    // Acknowledgement to user
    await transporter.sendMail({
      from: { name: "Gajna Overseas", address: user },
      to: data.email,
      subject: "We got your message",
      text: `Hi ${data.name},\n\nThank you for contacting us. We’ll be in touch soon.\n\n– Gajna Overseas`,
      html: userHtml,
    });

    log("Email sent", { subject: data.subject, email: data.email });

    return NextResponse.json({ success: true });
  } catch (err) {
    log("Email send failed", err);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}