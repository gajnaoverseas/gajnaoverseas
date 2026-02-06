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

const ADMIN_EMAIL = "PRIYAVIRAT@GMAIL.COM, priyavirat@zohomail.in";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }
  
  // Verify reCAPTCHA (skip on localhost when secret is present but local dev)
  const captchaToken = body.captchaToken;
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const host = req.headers.get('host') || '';
  const isLocalhost = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host);
  const captchaEnabled = Boolean(recaptchaSecret) && !isLocalhost;
  const isQuick = typeof body.subject === 'string' && body.subject.toLowerCase().includes('quick enquiry');
  if (captchaEnabled) {
    if (!captchaToken) {
      return NextResponse.json({ success: false, error: "reCAPTCHA verification failed" }, { status: 400 });
    }
  
  try {
    // Verify the captcha token with Google's reCAPTCHA API
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaToken}`,
      { method: "POST" }
    );
    
    const recaptchaResult = await recaptchaResponse.json();
    
    if (!recaptchaResult.success) {
      log("reCAPTCHA verification failed", recaptchaResult);
      return NextResponse.json(
        { success: false, error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    log("reCAPTCHA verification error", error);
    return NextResponse.json(
      { success: false, error: "reCAPTCHA verification error" },
      { status: 500 }
    );
  }
    log("reCAPTCHA disabled for local testing or missing secret; skipping verification", { host });
  }

  // Validate against schema
  const quickEnquirySchema = z.object({
    captchaToken: z.string().nullish(),
    name: z.string().min(2).max(100).optional(),
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().max(50).optional(),
    email: z.string().email(),
    phone: z.string().min(7).max(20),
    message: z.string().min(10).max(5000),
    subject: z.string().optional(),
    linkedin: z.string().url().optional(),
    consent: z.boolean().optional(),
    product: z.string().optional(),
    grade: z.string().optional(),
    quantity: z.coerce.number().int().positive().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
  });
  const parse = (isQuick ? quickEnquirySchema.safeParse(body) : contactFormSchema.safeParse(body));
  if (!parse.success) {
    console.error("Validation failed:", JSON.stringify(parse.error.flatten(), null, 2));
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
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; margin: 0; padding: 0; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); line-height: 1.6; }
      .email-wrapper { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 40px 20px; min-height: 100vh; }
      .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid #e1e5e9; }
      .header { background: linear-gradient(135deg, #863B0E 0%, #863B0E 25%, #61714D 75%, #4A5D3A 100%); color: white; padding: 40px 30px; text-align: center; position: relative; }
      .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="coffee" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23coffee)"/></svg>') repeat; }
      .logo { width: 90px; height: 90px; margin: 0 auto 20px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.15); position: relative; z-index: 1; }
      .brand { font-size: 28px; font-weight: 700; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative; z-index: 1; }
      .tagline { font-size: 16px; opacity: 0.95; font-weight: 300; position: relative; z-index: 1; }
      .content { padding: 40px 30px; background: #ffffff; }
      .greeting { font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 25px; text-align: center; }
      .section { margin-bottom: 30px; background: #f8fafc; border-radius: 12px; padding: 25px; border-left: 4px solid #863B0E; }
      .section-title { font-size: 18px; font-weight: 700; color: #863B0E; margin-bottom: 20px; display: flex; align-items: center; }
      .section-title::before { content: '📋'; margin-right: 10px; font-size: 20px; }
      .row { margin-bottom: 15px; display: flex; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
      .row:last-child { border-bottom: none; }
      .label { color: #64748b; font-size: 14px; font-weight: 600; min-width: 140px; text-transform: uppercase; letter-spacing: 0.5px; }
      .value { font-size: 16px; color: #1e293b; flex: 1; font-weight: 500; word-wrap: break-word; word-break: break-word; overflow-wrap: break-word; }
      .product-enquiry { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 15px; padding: 25px; margin: 25px 0; position: relative; }
      .product-enquiry::before { content: '☕'; position: absolute; top: -10px; left: 20px; background: #f59e0b; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }
      .product-title { color: #92400e; font-weight: 700; font-size: 18px; margin-bottom: 15px; margin-left: 30px; }
      .footer { background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); color: #64748b; font-size: 14px; text-align: center; padding: 30px; border-top: 1px solid #e2e8f0; }
      .footer-brand { font-weight: 700; color: #863B0E; font-size: 16px; margin-bottom: 10px; }
      .footer-contact { margin-top: 15px; }
      .footer-contact a { color: #863B0E; text-decoration: none; font-weight: 600; }
      .divider { height: 2px; background: linear-gradient(90deg, #863B0E 0%, #61714D 100%); margin: 25px 0; border-radius: 1px; }
      .highlight { background: linear-gradient(135deg, #863B0E 0%, #61714D 100%); color: white; padding: 3px 8px; border-radius: 6px; font-weight: 600; }
      @media (max-width: 600px) { 
        .container { margin: 10px; border-radius: 15px; } 
        .content { padding: 25px 20px; } 
        .section { padding: 20px 15px; } 
        .row { flex-direction: column; padding: 10px 0; } 
        .label { min-width: auto; margin-bottom: 5px; font-size: 13px; } 
        .value { font-size: 15px; } 
        .header { padding: 30px 20px; } 
        .brand { font-size: 24px; } 
        .tagline { font-size: 14px; } 
      }
    </style>
  `;

  // Get full name from either name field or firstName + lastName fields
  const fullName = data.name || (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : '');
  // Phone is already formatted with country code from PhoneInput component
  const formattedPhone = data.phone;
  const subject = data.subject || "General Enquiry";

  const plainText = `New contact form submission\n\nName: ${fullName}\nEmail: ${data.email}\nPhone: ${formattedPhone}\nCountry: ${data.country}\nPostal Code: ${data.postalCode}\nLinkedIn: ${data.linkedin}\nSubject: ${subject}\nMessage: ${data.message}${data.product ? `\n\nProduct Enquiry:\nProduct: ${data.product}` : ''}${data.grade ? `\nGrade: ${data.grade}` : ''}${data.quantity ? `\nQuantity: ${data.quantity} MT` : ''}\nConsent: ${data.consent ? "Yes" : "No"}`;

  const row = (label: string, value?: string) => `
    <div style="margin-bottom:15px; padding:12px 0; border-bottom:1px solid #e2e8f0;">
      <div style="color:#64748b; font-size:13px; font-weight:600; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">${label}:</div>
      <div style="font-size:15px; color:#1e293b; line-height:1.6; word-wrap:break-word; word-break:break-word; overflow-wrap:break-word; max-width:100%;">${value || 'NA'}</div>
    </div>
  `;

  const adminHtml = `
  <div style="background:#f5f7fa; padding:24px;">
    <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e1e5e9;">
      <div style="background:linear-gradient(135deg,#863B0E 0%, #863B0E 25%, #61714D 75%, #4A5D3A 100%); color:#fff; padding:24px; text-align:center;">
        <div style="font-size:22px; font-weight:700; margin-bottom:4px;">New Contact Submission</div>
        <div style="font-size:14px; opacity:.95;">Gajna Overseas - Coffee Export Excellence</div>
      </div>
      <div style="padding:24px;">
        <div style="font-size:18px; font-weight:600; color:#2d3748; margin-bottom:16px; text-align:center;">📧 New Enquiry Received</div>

        <div style="margin-bottom:20px; background:#f8fafc; border-radius:12px; padding:20px; border-left:4px solid #863B0E;">
          <div style="font-size:16px; font-weight:700; color:#863B0E; margin-bottom:12px;">Contact Information</div>
          ${row('Name', fullName)}
          ${row('Email', data.email)}
          ${row('Phone', formattedPhone)}
          ${row('Country', data.country)}
          ${row('Postal Code', data.postalCode)}
          ${row('LinkedIn', data.linkedin)}
        </div>

        <div style="margin-bottom:20px; background:#f8fafc; border-radius:12px; padding:20px; border-left:4px solid #863B0E;">
          <div style="font-size:16px; font-weight:700; color:#863B0E; margin-bottom:12px;">Enquiry Details</div>
          ${row('Subject', subject)}
          ${row('Message', data.message.replace(/\n/g, '<br/>'))}
        </div>

        ${(data.product || data.grade || data.quantity) ? `
        <div style="margin-bottom:20px; background:#fef3c7; border:2px solid #f59e0b; border-radius:15px; padding:20px;">
          <div style="color:#92400e; font-weight:700; font-size:16px; margin-bottom:12px;">☕ Product Enquiry Details</div>
          ${data.product ? row('Product', data.product) : ''}
          ${data.grade ? row('Grade', data.grade) : ''}
          ${data.quantity ? row('Quantity', `${data.quantity} MT`) : ''}
        </div>` : ''}

        <div style="height:2px; background:linear-gradient(90deg,#863B0E 0%, #61714D 100%); margin:20px 0;"></div>
        <p style="text-align:center; color:#64748b;">This email was sent automatically from your website</p>
      </div>
      <div style="background:#f1f5f9; color:#64748b; text-align:center; padding:16px; border-top:1px solid #e2e8f0;">
        <div style="font-weight:700; color:#863B0E; margin-bottom:8px;">Gajna Overseas</div>
        <div><a href="mailto:priyavirat@zohomail.in" style="color:#863B0E; text-decoration:none;">priyavirat@zohomail.in</a> | <a href="tel:+919811789665" style="color:#863B0E; text-decoration:none;">+91 9811789665</a></div>
      </div>
    </div>
  </div>`;

  const userHtml = `
  <div style="background:#f5f7fa; padding:24px;">
    <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e1e5e9;">
      <div style="background:linear-gradient(135deg,#863B0E 0%, #863B0E 25%, #61714D 75%, #4A5D3A 100%); color:#fff; padding:24px; text-align:center;">
        <div style="font-size:22px; font-weight:700; margin-bottom:4px;">Thank You for Your Enquiry!</div>
        <div style="font-size:14px; opacity:.95;">Gajna Overseas - Coffee Export Excellence</div>
      </div>
      <div style="padding:24px;">
        <div style="font-size:16px; color:#1e293b; margin-bottom:12px;">Dear ${data.firstName || fullName || 'Customer'},</div>
        <p style="line-height:1.6; margin-bottom:12px;">Thank you for contacting Gajna Overseas! We've successfully received your enquiry and our team will review it carefully.</p>
        <p style="line-height:1.6; margin-bottom:12px;">We typically respond within 24 hours during business days.</p>
        ${(data.product || data.grade) ? `<p style="line-height:1.6; margin-bottom:12px;">📋 <strong>Your Enquiry:</strong> ${data.product ? data.product : 'Coffee products'}${data.grade ? ` (${data.grade})` : ''}${data.quantity ? ` - Quantity: ${data.quantity} MT` : ''}</p>` : ''}

        <div style="margin-top:16px; background:#f8fafc; border-radius:12px; padding:20px; border-left:4px solid #863B0E;">
          <div style="font-size:16px; font-weight:700; color:#863B0E; margin-bottom:12px;">Your Message Summary</div>
          ${row('Subject', subject)}
          ${row('Message', data.message.replace(/\n/g, '<br/>'))}
        </div>

        <div style="height:2px; background:linear-gradient(90deg,#863B0E 0%, #61714D 100%); margin:20px 0;"></div>
        <div style="background:#f8fafc; border-radius:12px; padding:20px;">
          <p style="line-height:1.6; margin-bottom:12px;">🌟 <strong>Why Choose Gajna Overseas?</strong></p>
          <ul style="margin:0; padding-left:20px; line-height:1.6; color:#374151;">
            <li>Premium quality Indian coffee beans</li>
            <li>Direct sourcing from certified plantations</li>
            <li>Competitive pricing and reliable supply</li>
            <li>Expert guidance on coffee grades and specifications</li>
          </ul>
        </div>
      </div>
      <div style="background:#f1f5f9; color:#64748b; text-align:center; padding:16px; border-top:1px solid #e2e8f0;">
        <div style="font-weight:700; color:#863B0E; margin-bottom:8px;">Gajna Overseas</div>
        <div><a href="mailto:priyavirat@zohomail.in" style="color:#863B0E; text-decoration:none;">priyavirat@zohomail.in</a> | <a href="tel:+919811789665" style="color:#863B0E; text-decoration:none;">+91 9811789665</a></div>
        <p style="margin-top:10px; font-size:11px; opacity:.6;">If you didn't send this enquiry, please ignore this email.</p>
      </div>
    </div>
  </div>`;

  const DRY_RUN = process.env.EMAIL_DRY_RUN === "true" || ((!user || !pass) && process.env.NODE_ENV !== "production");

  if ((!user || !pass) && DRY_RUN) {
    log("EMAIL DRY RUN: Missing SMTP env; emails will be logged instead.");
    console.log("ADMIN EMAIL (DRY RUN)", { to: ADMIN_EMAIL, subject: `[Contact] ${data.subject}`, text: plainText, htmlPreview: adminHtml.slice(0, 180) + "..." });
    console.log("USER EMAIL (DRY RUN)", { to: data.email, subject: "We got your message", text: `Hi ${data.firstName},\n\nThank you for contacting us. We'll be in touch soon.`, htmlPreview: userHtml.slice(0, 180) + "..." });
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
      text: `Hi ${data.firstName},\n\nThank you for contacting us. We'll be in touch soon.\n\n– Gajna Overseas`,
      html: userHtml,
    });

    log("Email sent", { subject: data.subject, email: data.email });

    return NextResponse.json({ success: true });
  } catch (err) {
    log("Email send failed", err);
    return NextResponse.json({ success: false, error: `Failed to send email: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }
}
