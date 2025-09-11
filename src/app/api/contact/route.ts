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
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #111827; }
      .container { max-width: 640px; margin: 0 auto; padding: 24px; }
      .card { border:1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
      .header { background: #61714D; color: white; padding: 20px; }
      .brand { font-size: 20px; font-weight: 700; }
      .content { padding: 20px; }
      .row { margin-bottom: 12px; }
      .label { color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; }
      .value { font-size: 16px; margin-top: 4px; }
      .footer { color: #6b7280; font-size: 12px; text-align: center; padding: 16px; }
      @media (max-width: 600px) { .container { padding: 12px; } .value { font-size: 15px; } }
    </style>
  `;

  const plainText = `New contact form submission\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}\nConsent: ${data.consent ? "Yes" : "No"}`;

  const adminHtml = `
    ${baseStyles}
    <div class="container">
      <div class="card">
        <div class="header"><div class="brand">New Contact Submission</div></div>
        <div class="content">
          <div class="row"><div class="label">Name</div><div class="value">${data.name}</div></div>
          <div class="row"><div class="label">Email</div><div class="value">${data.email}</div></div>
          <div class="row"><div class="label">Subject</div><div class="value">${data.subject}</div></div>
          <div class="row"><div class="label">Message</div><div class="value">${data.message.replace(/\n/g, "<br/>")}</div></div>
        </div>
        <div class="footer">This email was sent automatically from your website.</div>
      </div>
    </div>`;

  const userHtml = `
    ${baseStyles}
    <div class="container">
      <div class="card">
        <div class="header"><div class="brand">Thanks for reaching out</div></div>
        <div class="content">
          <p class="value">Hi ${data.name},</p>
          <p class="value">Thanks for contacting Gajna Overseas. We’ve received your message and will get back to you shortly.</p>
          <div class="row"><div class="label">Your message</div><div class="value">${data.message.replace(/\n/g, "<br/>")}</div></div>
        </div>
        <div class="footer">If this wasn't you, please ignore this email.</div>
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