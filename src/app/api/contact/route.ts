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
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; margin: 0; padding: 0; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); line-height: 1.6; }
      .email-wrapper { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 40px 20px; min-height: 100vh; }
      .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid #e1e5e9; }
      .header { background: linear-gradient(135deg, #7D4B3C 0%, #8B5A3C 25%, #61714D 75%, #4A5D3A 100%); color: white; padding: 40px 30px; text-align: center; position: relative; }
      .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="coffee" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23coffee)"/></svg>') repeat; }
      .logo { width: 90px; height: 90px; margin: 0 auto 20px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.15); position: relative; z-index: 1; }
      .brand { font-size: 28px; font-weight: 700; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); position: relative; z-index: 1; }
      .tagline { font-size: 16px; opacity: 0.95; font-weight: 300; position: relative; z-index: 1; }
      .content { padding: 40px 30px; background: #ffffff; }
      .greeting { font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 25px; text-align: center; }
      .section { margin-bottom: 30px; background: #f8fafc; border-radius: 12px; padding: 25px; border-left: 4px solid #7D4B3C; }
      .section-title { font-size: 18px; font-weight: 700; color: #7D4B3C; margin-bottom: 20px; display: flex; align-items: center; }
      .section-title::before { content: '📋'; margin-right: 10px; font-size: 20px; }
      .row { margin-bottom: 15px; display: flex; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
      .row:last-child { border-bottom: none; }
      .label { color: #64748b; font-size: 14px; font-weight: 600; min-width: 140px; text-transform: uppercase; letter-spacing: 0.5px; }
      .value { font-size: 16px; color: #1e293b; flex: 1; font-weight: 500; }
      .product-enquiry { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 15px; padding: 25px; margin: 25px 0; position: relative; }
      .product-enquiry::before { content: '☕'; position: absolute; top: -10px; left: 20px; background: #f59e0b; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }
      .product-title { color: #92400e; font-weight: 700; font-size: 18px; margin-bottom: 15px; margin-left: 30px; }
      .footer { background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); color: #64748b; font-size: 14px; text-align: center; padding: 30px; border-top: 1px solid #e2e8f0; }
      .footer-brand { font-weight: 700; color: #7D4B3C; font-size: 16px; margin-bottom: 10px; }
      .footer-contact { margin-top: 15px; }
      .footer-contact a { color: #7D4B3C; text-decoration: none; font-weight: 600; }
      .divider { height: 2px; background: linear-gradient(90deg, #7D4B3C 0%, #61714D 100%); margin: 25px 0; border-radius: 1px; }
      .highlight { background: linear-gradient(135deg, #7D4B3C 0%, #61714D 100%); color: white; padding: 3px 8px; border-radius: 6px; font-weight: 600; }
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

  const plainText = `New contact form submission\n\nName: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}${data.country ? `\nCountry: ${data.country}` : ''}${data.postalCode ? `\nPostal Code: ${data.postalCode}` : ''}${data.linkedin ? `\nLinkedIn: ${data.linkedin}` : ''}\nSubject: ${data.subject}\nMessage: ${data.message}${data.product ? `\n\nProduct Enquiry:\nProduct: ${data.product}` : ''}${data.grade ? `\nGrade: ${data.grade}` : ''}${data.quantity ? `\nQuantity: ${data.quantity} MT` : ''}\nConsent: ${data.consent ? "Yes" : "No"}`;

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
             ${data.postalCode ? `<div class="row"><div class="label">Postal Code:</div><div class="value">${data.postalCode}</div></div>` : ''}
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
           <div class="footer-brand">Gajna Overseas</div>
           <p>This email was sent automatically from your website</p>
           <div class="footer-contact">
             <p>📧 <a href="mailto:info@gajnaoverseas.com">info@gajnaoverseas.com</a> | 📞 <a href="tel:+919811789665">+91 9811789665</a></p>
             <p style="margin-top: 10px; font-size: 12px; opacity: 0.8;">Coffee Export Excellence Since Inception</p>
           </div>
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
           <div class="footer-brand">Gajna Overseas</div>
           <p><span class="highlight">Your Trusted Coffee Export Partner</span></p>
           <div class="footer-contact">
             <p>📧 <a href="mailto:info@gajnaoverseas.com">info@gajnaoverseas.com</a> | 📞 <a href="tel:+919811789665">+91 9811789665</a></p>
             <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">Premium Indian Coffee Beans • Direct from Source • Global Export Excellence</p>
             <p style="margin-top: 10px; font-size: 11px; opacity: 0.6;">If you didn't send this enquiry, please ignore this email.</p>
           </div>
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