import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_CONFIG } from "@/lib/site-config";

export const runtime = "nodejs";

interface NotifyBody {
  partnerName: string;
  choice: "yes" | "no";
  timestamp: string;
}

export async function POST(req: NextRequest) {
  let body: NotifyBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { partnerName, choice, timestamp } = body;
  if (!partnerName || (choice !== "yes" && choice !== "no") || !timestamp) {
    return NextResponse.json({ error: "Missing/invalid fields" }, { status: 400 });
  }

  const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 465;
const SMTP_USER = "teamwork2177@gmail.com";
const SMTP_PASS = "geyrlxouaqeuamgz";
const NOTIFY_EMAIL = "shivamshakya2277@gmail.com,teamwork2177@gmail.com";

  // If SMTP isn't configured yet, don't error the whole request —
  // just report that email is unavailable. The on-page result and
  // local Response Log still work regardless.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) {
    return NextResponse.json(
      { sent: false, reason: "SMTP not configured" },
      { status: 200 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP Connected Successfully");

    const niceTime = new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const isYes = choice === "yes";

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${partnerName}'s Answer</title>
<style>
  @media only screen and (max-width: 480px) {
    .container { width: 100% !important; }
    .card { padding: 28px 20px !important; }
    .heart { font-size: 56px !important; }
    .title { font-size: 20px !important; }
  }
  @keyframes heartbeat {
    0%   { transform: scale(1); }
    14%  { transform: scale(1.25); }
    28%  { transform: scale(1); }
    42%  { transform: scale(1.25); }
    70%  { transform: scale(1); }
  }
  .heart-animate {
    display: inline-block;
    animation: heartbeat 1.4s ease-in-out infinite;
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#fdf1f6; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf1f6; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" class="container" width="480" cellpadding="0" cellspacing="0" style="width:480px; max-width:100%;">
          <tr>
            <td class="card" style="background: linear-gradient(160deg, #ffffff 0%, #fff0f5 100%); border-radius: 20px; padding: 40px 36px; text-align:center; box-shadow: 0 8px 24px rgba(228, 36, 101, 0.12); border: 1px solid #ffd6e6;">

              <div class="heart ${isYes ? "heart-animate" : ""}" style="font-size: 64px; line-height:1; margin-bottom: 8px; ${isYes ? "" : "opacity:0.55;"}">
                ${isYes ? "❤️" : "🤍"}
              </div>

              <h1 class="title" style="margin: 12px 0 4px; font-size: 24px; color: #b3123f;">
                ${partnerName} answered!
              </h1>

              <p style="margin: 0 0 24px; font-size: 15px; color: #a3577a;">
                Someone just responded to your question 💌
              </p>

              <div style="display:inline-block; padding: 14px 32px; border-radius: 999px; background: ${isYes ? "linear-gradient(135deg, #ff4d79, #e4225f)" : "#f0e3ea"}; color: ${isYes ? "#ffffff" : "#8a5570"}; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; box-shadow: ${isYes ? "0 6px 16px rgba(228, 34, 95, 0.35)" : "none"};">
                ${isYes ? "YES 💛" : "No"}
              </div>

              <p style="margin: 28px 0 0; font-size: 13px; color: #c48ca8; border-top: 1px solid #ffe1ec; padding-top: 16px;">
                Answered on ${niceTime}
              </p>

            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 20px;">
              <p style="margin:0; font-size: 12px; color: #d3a6bb;">
                Sent automatically by ${SITE_CONFIG?.authorName ?? "your site"}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    await transporter.sendMail({
      from: `"${partnerName}'s Answer" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject: `${partnerName} said ${isYes ? "YES 💛" : "No"} to the date question!`,
      text: `${partnerName} answered "${isYes ? "Yes" : "No"}" at ${niceTime}.`,
      html: emailHtml,
    });

    return NextResponse.json({ sent: true }, { status: 200 });
  } catch (err) {
    console.error("Nodemailer send failed:", err);
    return NextResponse.json(
      { sent: false, reason: "Send failed" },
      { status: 200 }
    );
  }
}