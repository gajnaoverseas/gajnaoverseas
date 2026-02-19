import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "priyavirat@zohomail.in";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const { email } = body;
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { success: false, error: "Valid email is required" },
      { status: 422 },
    );
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  const adminHtml = `
  <div style="background:#f5f7fa; padding:24px;">
    <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e1e5e9;">
      <div style="background:linear-gradient(135deg,#863B0E 0%, #863B0E 25%, #61714D 75%, #4A5D3A 100%); color:#fff; padding:24px; text-align:center;">
        <div style="font-size:22px; font-weight:700; margin-bottom:4px;">New Newsletter Subscription</div>
        <div style="font-size:14px; opacity:.95;">Gajna Overseas - Coffee Export Excellence</div>
      </div>
      <div style="padding:24px;">
        <div style="font-size:18px; font-weight:600; color:#2d3748; margin-bottom:16px; text-align:center;">📬 New Subscriber!</div>
        <div style="margin-bottom:20px; background:#f8fafc; border-radius:12px; padding:20px; border-left:4px solid #863B0E;">
          <div style="font-size:16px; font-weight:700; color:#863B0E; margin-bottom:12px;">Subscriber Details</div>
          <div style="margin-bottom:15px; padding:12px 0;">
            <div style="color:#64748b; font-size:13px; font-weight:600; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">EMAIL:</div>
            <div style="font-size:15px; color:#1e293b; line-height:1.6; font-weight:500;">${email}</div>
          </div>
          <div style="padding:12px 0;">
            <div style="color:#64748b; font-size:13px; font-weight:600; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">SUBSCRIBED ON:</div>
            <div style="font-size:15px; color:#1e293b; line-height:1.6; font-weight:500;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</div>
          </div>
        </div>
        <div style="height:2px; background:linear-gradient(90deg,#863B0E 0%, #61714D 100%); margin:20px 0;"></div>
        <p style="text-align:center; color:#64748b;">This email was sent automatically from your website newsletter form.</p>
      </div>
      <div style="background:#f1f5f9; color:#64748b; text-align:center; padding:16px; border-top:1px solid #e2e8f0;">
        <div style="font-weight:700; color:#863B0E; margin-bottom:8px;">Gajna Overseas</div>
        <div><a href="mailto:priyavirat@zohomail.in" style="color:#863B0E; text-decoration:none;">priyavirat@zohomail.in</a> | <a href="tel:+919811789665" style="color:#863B0E; text-decoration:none;">+91 9811789665</a></div>
      </div>
    </div>
  </div>`;

  const catalogLink =
    "https://drive.google.com/uc?export=download&id=1CfIFMb4qzqPouss2BORb6K-LkrtAew4Z";

  const subscriberHtml = `
  <div style="background:#f5f7fa; padding:24px;">
    <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e1e5e9;">
      <div style="background:linear-gradient(135deg,#863B0E 0%, #863B0E 25%, #61714D 75%, #4A5D3A 100%); color:#fff; padding:24px; text-align:center;">
        <div style="font-size:22px; font-weight:700; margin-bottom:4px;">Welcome to Our Newsletter!</div>
        <div style="font-size:14px; opacity:.95;">Gajna Overseas - Coffee Export Excellence</div>
      </div>
      <div style="padding:24px;">
        <p style="font-size:16px; color:#1e293b; line-height:1.6; margin-bottom:16px;">Thank you for subscribing to the Gajna Overseas newsletter! ☕</p>
        <p style="font-size:15px; color:#374151; line-height:1.6; margin-bottom:16px;">You'll now receive updates on premium Indian coffee, industry insights, and special trade opportunities.</p>

        <div style="background:#fdf8f4; border:1px solid #e8d5c4; border-radius:12px; padding:24px; margin:24px 0; text-align:center;">
          <div style="font-size:18px; font-weight:700; color:#863B0E; margin-bottom:8px;">🎁 Your Free Catalog</div>
          <p style="font-size:15px; color:#374151; line-height:1.6; margin-bottom:20px;">Click on the link below to download your free catalog PDF</p>
          <a href="${catalogLink}" style="display:inline-block; background:linear-gradient(135deg,#863B0E 0%, #61714D 100%); color:#ffffff; font-size:16px; font-weight:700; text-decoration:none; padding:14px 32px; border-radius:8px;">📥 Download Free Catalog PDF</a>
        </div>

        <div style="height:2px; background:linear-gradient(90deg,#863B0E 0%, #61714D 100%); margin:20px 0;"></div>
        <p style="text-align:center; color:#64748b; font-size:14px;">We respect your inbox and promise to send only valuable content.</p>
      </div>
      <div style="background:#f1f5f9; color:#64748b; text-align:center; padding:16px; border-top:1px solid #e2e8f0;">
        <div style="font-weight:700; color:#863B0E; margin-bottom:8px;">Gajna Overseas</div>
        <div><a href="https://gajnaoverseas.com" style="color:#863B0E; text-decoration:none;">gajnaoverseas.com</a></div>
        <div style="margin-top:6px;"><a href="mailto:priyavirat@zohomail.in" style="color:#863B0E; text-decoration:none;">priyavirat@zohomail.in</a> | <a href="tel:+919811789665" style="color:#863B0E; text-decoration:none;">+91 9811789665</a></div>
      </div>
    </div>
  </div>`;

  const DRY_RUN =
    process.env.EMAIL_DRY_RUN === "true" ||
    ((!user || !pass) && process.env.NODE_ENV !== "production");

  if (DRY_RUN) {
    console.log("[newsletter] DRY RUN:", {
      to: ADMIN_EMAIL,
      subscriberEmail: email,
    });
    return NextResponse.json({ success: true, dryRun: true });
  }

  if (!user || !pass) {
    return NextResponse.json(
      { success: false, error: "Server not configured" },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user, pass },
  });

  try {
    // Notify admin of new subscriber
    await transporter.sendMail({
      from: { name: "Website Newsletter", address: user },
      to: ADMIN_EMAIL,
      subject: `[Newsletter] New Subscriber: ${email}`,
      text: `New newsletter subscriber: ${email}\nSubscribed on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
      html: adminHtml,
    });

    // Send welcome email to subscriber
    await transporter.sendMail({
      from: { name: "Gajna Overseas", address: user },
      to: email,
      subject: "Welcome to Gajna Overseas Newsletter! ☕",
      text: `Thank you for subscribing to the Gajna Overseas newsletter!\n\nYou'll receive updates on premium Indian coffee, industry insights, and special trade opportunities.\n\n🎁 Your Free Catalog\nClick on the link to download your free catalog PDF:\n${catalogLink}\n\n– Gajna Overseas\nhttps://gajnaoverseas.com`,
      html: subscriberHtml,
    });

    console.log("[newsletter] Subscription email sent", { email });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter] Email send failed", err);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to send email: ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 500 },
    );
  }
}
