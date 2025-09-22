import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Basic server-side logging utility
function log(message: string, meta?: unknown) {
  console.log(`[trade-enquiry] ${new Date().toISOString()} - ${message}`, (meta ?? ""));
}

const ADMIN_EMAIL = "sri.sudhanshu1@gmail.com";

// Trade Enquiry form validation schema
const tradeEnquirySchema = z.object({
  // Company Details
  companyName: z.string().min(1, "Company name is required"),
  companyAddress: z.string().min(1, "Company address is required"),
  countryName: z.string().min(1, "Country is required"),
  companyPhone: z.string().min(1, "Company phone is required"),
  companyFax: z.string().optional(),
  companyMobile: z.string().optional(),
  companyEmail: z.string().email("Valid company email is required"),
  companyWebsite: z.string().optional(),
  companyLinkedIn: z.string().optional(),
  
  // Contact Person
  contactName: z.string().min(1, "Contact person name is required"),
  contactLinkedIn: z.string().optional(),
  contactMobile: z.string().min(1, "Contact mobile is required"),
  contactEmail: z.string().email("Valid contact email is required"),
  
  // Logistics Details
  coffeeGrade: z.string().min(1, "Coffee grade is required"),
  hsnCode: z.string().min(1, "HSN code is required"),
  estimatedQuantity: z.string().min(1, "Estimated quantity is required"),
  packagingRequirements: z.string().min(1, "Packaging requirements are required"),
  portOfLoading: z.string().min(1, "Port of loading is required"),
  portOfDispatch: z.string().min(1, "Port of dispatch is required"),
  preshipmentAgency: z.string().optional(),
  preshipmentRequirements: z.string().optional(),
  deliveryDuration: z.string().min(1, "Delivery duration is required"),
  
  captchaToken: z.string().min(1, "CAPTCHA verification is required"),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }
  
  // Verify reCAPTCHA
  const captchaToken = body.captchaToken;
  if (!captchaToken) {
    return NextResponse.json({ success: false, error: "reCAPTCHA verification failed" }, { status: 400 });
  }
  
  try {
    // Verify the captcha token with Google's reCAPTCHA API
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
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

  // Validate against schema
  const parse = tradeEnquirySchema.safeParse(body);
  if (!parse.success) {
    console.error('Validation failed:', parse.error.flatten());
    console.error('Received body:', JSON.stringify(body, null, 2));
    console.error('Company email value:', body.companyEmail);
    console.error('Company email type:', typeof body.companyEmail);
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
      .trade-highlight { background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #16a34a; border-radius: 15px; padding: 25px; margin: 25px 0; position: relative; }
      .trade-highlight::before { content: '🚢'; position: absolute; top: -10px; left: 20px; background: #16a34a; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }
      .trade-title { color: #15803d; font-weight: 700; font-size: 18px; margin-bottom: 15px; margin-left: 30px; }
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

  const plainText = `New Trade Enquiry Submission

COMPANY DETAILS:
Company Name: ${data.companyName}
Company Address: ${data.companyAddress}
Country: ${data.countryName}
Company Phone: ${data.companyPhone}
Company Fax: ${data.companyFax || 'Not provided'}
Company Mobile: ${data.companyMobile || 'Not provided'}
Company Email: ${data.companyEmail}
Company Website: ${data.companyWebsite || 'Not provided'}
Company LinkedIn: ${data.companyLinkedIn || 'Not provided'}

CONTACT PERSON:
Name: ${data.contactName}
Mobile: ${data.contactMobile}
Email: ${data.contactEmail}
LinkedIn: ${data.contactLinkedIn || 'Not provided'}

LOGISTICS DETAILS:
Coffee Grade: ${data.coffeeGrade}
HSN Code: ${data.hsnCode}
Estimated Quantity: ${data.estimatedQuantity}
Packaging Requirements: ${data.packagingRequirements}
Port of Loading: ${data.portOfLoading}
Port of Dispatch: ${data.portOfDispatch}
Pre-shipment Agency: ${data.preshipmentAgency || 'Not provided'}
Pre-shipment Requirements: ${data.preshipmentRequirements || 'Not provided'}
Delivery Duration: ${data.deliveryDuration}`;

  const adminHtml = `
    ${baseStyles}
    <div class="email-wrapper">
      <div class="container">
        <div class="header">
          <div class="logo">
            <img src="https://gajna-overseas.vercel.app/logo.webp" alt="Gajna Overseas" style="width: 60px; height: 60px; object-fit: contain;" />
          </div>
          <div class="brand">New Trade Enquiry</div>
          <div class="tagline">Gajna Overseas - Coffee Export Excellence</div>
        </div>
        <div class="content">
          <div class="greeting">🚢 New Trade Enquiry Received</div>
          
          <div class="section">
            <div class="section-title">Company Information</div>
            <div class="row"><div class="label">Company Name:</div><div class="value">${data.companyName}</div></div>
            <div class="row"><div class="label">Address:</div><div class="value">${data.companyAddress}</div></div>
            <div class="row"><div class="label">Country:</div><div class="value">${data.countryName}</div></div>
            <div class="row"><div class="label">Phone:</div><div class="value">${data.companyPhone}</div></div>
            ${data.companyFax ? `<div class="row"><div class="label">Fax:</div><div class="value">${data.companyFax}</div></div>` : ''}
            ${data.companyMobile ? `<div class="row"><div class="label">Mobile:</div><div class="value">${data.companyMobile}</div></div>` : ''}
            <div class="row"><div class="label">Email:</div><div class="value">${data.companyEmail}</div></div>
            ${data.companyWebsite ? `<div class="row"><div class="label">Website:</div><div class="value">${data.companyWebsite}</div></div>` : ''}
            ${data.companyLinkedIn ? `<div class="row"><div class="label">LinkedIn:</div><div class="value">${data.companyLinkedIn}</div></div>` : ''}
          </div>
          
          <div class="section">
            <div class="section-title">Contact Person</div>
            <div class="row"><div class="label">Name:</div><div class="value">${data.contactName}</div></div>
            <div class="row"><div class="label">Mobile:</div><div class="value">${data.contactMobile}</div></div>
            <div class="row"><div class="label">Email:</div><div class="value">${data.contactEmail}</div></div>
            ${data.contactLinkedIn ? `<div class="row"><div class="label">LinkedIn:</div><div class="value">${data.contactLinkedIn}</div></div>` : ''}
          </div>
          
          <div class="trade-highlight">
            <div class="trade-title">Logistics & Trade Details</div>
            <div class="row"><div class="label">Coffee Grade:</div><div class="value">${data.coffeeGrade}</div></div>
            <div class="row"><div class="label">HSN Code:</div><div class="value">${data.hsnCode}</div></div>
            <div class="row"><div class="label">Quantity:</div><div class="value">${data.estimatedQuantity}</div></div>
            <div class="row"><div class="label">Port of Loading:</div><div class="value">${data.portOfLoading}</div></div>
            <div class="row"><div class="label">Port of Dispatch:</div><div class="value">${data.portOfDispatch}</div></div>
            <div class="row"><div class="label">Delivery Duration:</div><div class="value">${data.deliveryDuration}</div></div>
            <div class="row"><div class="label">Packaging:</div><div class="value">${data.packagingRequirements}</div></div>
            ${data.preshipmentAgency ? `<div class="row"><div class="label">Pre-shipment Agency:</div><div class="value">${data.preshipmentAgency}</div></div>` : ''}
            ${data.preshipmentRequirements ? `<div class="row"><div class="label">Pre-shipment Req:</div><div class="value">${data.preshipmentRequirements}</div></div>` : ''}
          </div>
          
          <div class="divider"></div>
          <p style="text-align: center; color: #64748b; font-style: italic;">
            Please respond to this trade enquiry promptly to maintain business relationships.
          </p>
        </div>
        <div class="footer">
          <div class="footer-brand">Gajna Overseas</div>
          <p>Premium Coffee Exporters</p>
          <div class="footer-contact">
            <a href="mailto:info@gajna-overseas.com">info@gajna-overseas.com</a> | 
            <a href="tel:+91XXXXXXXXXX">+91 XXXX XXXXXX</a>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!user || !pass) {
    log("Missing SMTP credentials");
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    // Send email to admin
    await transporter.sendMail({
      from: `"Gajna Overseas Trade Enquiry" <${user}>`,
      to: ADMIN_EMAIL,
      subject: `🚢 New Trade Enquiry from ${data.companyName}`,
      text: plainText,
      html: adminHtml,
    });

    log("Trade enquiry email sent successfully", { company: data.companyName, email: data.companyEmail });
    return NextResponse.json({ success: true, message: "Trade enquiry submitted successfully" });
  } catch (error) {
    log("Failed to send trade enquiry email", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}