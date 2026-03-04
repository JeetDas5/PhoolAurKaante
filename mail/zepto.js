"use server";
import { SendMailClient } from "zeptomail";

const url = "https://api.zeptomail.in/v1.1/email";
const token = process.env.ZEPTO_TOKEN;

let client = new SendMailClient({ url, token });

export async function sendOTPEmail(email, otp) {
  let res = await client.sendMail({
    from: {
      address: "transactions@kiitfest.org",
      name: "KIIT Fest 9.0 | Authentication",
    },
    to: [
      {
        email_address: {
          address: email,
        },
      },
    ],
    subject: `Your OTP for Registration is ${otp}`,
    htmlbody: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>KIIT Fest 9.0 OTP</title>
</head>
<body style="margin:0;padding:0;font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="padding:40px 30px;">
                    <tr>
                        <td align="center">
                            <!-- Logo Centered -->
                            <img src="https://res.cloudinary.com/vanxodus305/image/upload/v1771585611/kiitfest-main-logo_optimized_10000_w7f94m.png" width="170" alt="KIIT Fest Logo"
                              style="display:block;margin:0 auto 30px auto;">
                            <!-- Content -->
                            <p style="font-size:15px;line-height:1.6;margin:0 0 15px 0;">
                                Dear Participant,
                            </p>
                            <p style="font-size:15px;line-height:1.6;margin:0 0 20px 0;">
                                Thank you for registering for KIIT Fest 9.0!
                                Your One-Time Password (OTP) for completing the process is:
                            </p>
                            <!-- OTP Box -->
                            <div style="
                              display:inline-block;
                              padding:16px 36px;
                              margin:25px 0;
                              font-size:28px;
                              letter-spacing:8px;
                              border:2px solid #FF3300;
                              font-weight:bold;
                              text-align:center;">
                                ${otp}
                            </div>
                            <p style="font-size:14px;line-height:1.6;margin:20px 0;">
                                Please use this OTP to complete your registration.
                                If you did not request this OTP, please ignore this email.
                            </p>
                            <p style="font-size:14px;margin-top:25px;">
                                Best regards
                            </p>
                            <p style="font-size:14px;margin-top:5px;">
                                KIIT Fest Team
                            </p>
                            <br />
                            <p style="font-size:12px;margin:0;">
                                Sent with ❤️ 4C4F5645
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
  });

  if (res.message == "OK") {
    return { success: true, message: "OTP sent successfully" };
  } else {
    return { success: false, message: "Failed to send OTP" };
  }
}

export async function sendCompatibilityEmail({
  name,
  email,
  dob1,
  dob2,
  compatibilityData,
}) {
  const compatType = compatibilityData?.compatibility?.type || "Unknown";
  const compatMessage = compatibilityData?.compatibility?.message || "";
  const profileA = compatibilityData?.profileA;
  const profileB = compatibilityData?.profileB;

  const compatIcon =
    compatType === "Destined"
      ? "🌌"
      : compatType === "Harmony"
      ? "💖"
      : compatType === "Favorable"
      ? "💝"
      : compatType === "Neutral"
      ? "🤝"
      : compatType === "Challenging"
      ? "⚡"
      : "💔";

  const compatColor =
    compatType === "Destined"
      ? "#9b59b6"
      : compatType === "Harmony"
      ? "#db3063"
      : compatType === "Favorable"
      ? "#e74c3c"
      : compatType === "Neutral"
      ? "#95a5a6"
      : compatType === "Challenging"
      ? "#e67e22"
      : "#c0392b";

  // Level styling map
  const levelStyles = {
    Extreme: {
      bg: "#4a0a1e",
      border: "#db3063",
      color: "#fecdd3",
      label: "🔥 Extreme",
    },
    Intense: {
      bg: "#3a0818",
      border: "#a7113c",
      color: "#fda4af",
      label: "⚡ Intense",
    },
    Strong: {
      bg: "#2d0614",
      border: "#7c1a30",
      color: "#f9a8d4",
      label: "💪 Strong",
    },
    Present: {
      bg: "#1a1040",
      border: "#5b33cc",
      color: "#c4b5fd",
      label: "✨ Present",
    },
    Absent: {
      bg: "#1a1a1a",
      border: "#333333",
      color: "#888888",
      label: "🔍 Absent",
    },
  };

  // Render ALL traits for a profile, grouped by level
  const renderFullProfile = (profile, partnerLabel) => {
    if (!profile?.allTraits?.length) return "";

    const levelOrder = ["Extreme", "Intense", "Strong", "Present", "Absent"];

    // Group traits by level
    const grouped = {};
    levelOrder.forEach((l) => {
      grouped[l] = [];
    });
    profile.allTraits.forEach((t) => {
      if (grouped[t.level]) grouped[t.level].push(t);
      else grouped["Absent"] = grouped["Absent"] || [];
    });

    const traitRows = levelOrder
      .map((level) => {
        const traits = grouped[level];
        if (!traits || !traits.length) return "";
        const style = levelStyles[level] || levelStyles.Absent;

        return traits
          .map(
            (t) => `
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid #2a2a2a; vertical-align: top;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
              <tr>
                <td style="vertical-align: middle;">
                  <span style="font-size: 18px; margin-right: 8px;">${
                    t.emoji || ""
                  }</span>
                  <strong style="color: #ffffff; font-size: 14px;">${
                    t.name
                  }</strong>
                </td>
                <td align="right" style="vertical-align: middle; white-space: nowrap;">
                  <span style="background:${style.bg};border:1px solid ${
              style.border
            };color:${
              style.color
            };font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:0.5px;">${
              style.label
            }</span>
                </td>
              </tr>
            </table>
            <p style="font-size: 13px; color: #aaaaaa; line-height: 1.6; margin: 0 0 8px; padding-left: 28px;">
              ${(t.personality || "").replace(/\n/g, "<br>")}
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="padding-left: 28px;">
              ${
                t.shadow
                  ? `<tr><td style="padding:2px 0;"><span style="font-size:11px;color:#e67e22;font-weight:700;">⚠ Shadow: </span><span style="font-size:12px;color:#888;">${t.shadow}</span></td></tr>`
                  : ""
              }
              ${
                t.relationship
                  ? `<tr><td style="padding:2px 0;"><span style="font-size:11px;color:#db3063;font-weight:700;">💑 Relationship: </span><span style="font-size:12px;color:#888;">${(
                      t.relationship || ""
                    ).replace(/\n/g, " ")}</span></td></tr>`
                  : ""
              }
              ${
                t.growth
                  ? `<tr><td style="padding:2px 0;"><span style="font-size:11px;color:#27ae60;font-weight:700;">🌱 Growth: </span><span style="font-size:12px;color:#888;">${t.growth}</span></td></tr>`
                  : ""
              }
            </table>
          </td>
        </tr>
      `
          )
          .join("");
      })
      .join("");

    return `
      <tr>
        <td style="padding: 28px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#161616;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#1e0a12 0%,#2a0f1e 100%);padding:18px 24px;border-bottom:1px solid rgba(219,48,99,0.2);">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p style="font-size:11px;color:#db3063;text-transform:uppercase;letter-spacing:2px;font-weight:700;margin:0 0 4px;">${partnerLabel}</p>
                      <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0;">DOB: ${
                        profile.dob
                      }</p>
                    </td>
                    <td align="right">
                      <span style="background:rgba(219,48,99,0.15);border:1px solid rgba(219,48,99,0.4);color:#fda4af;font-size:12px;font-weight:700;padding:6px 16px;border-radius:4px;text-transform:uppercase;letter-spacing:0.5px;">${
                        profile.archetype || ""
                      }</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 8px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${traitRows}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  };

  const htmlbody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Cosmic Compatibility Result | Phool Aur Kaante</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI', Arial, Helvetica, sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#1a1a2e 100%);border-radius:20px;overflow:hidden;border:1px solid rgba(219,48,99,0.3);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#db3063 0%,#a7113c 100%);padding:36px 40px 28px;text-align:center;">
              <img src="https://res.cloudinary.com/vanxodus305/image/upload/v1771585611/kiitfest-main-logo_optimized_10000_w7f94m.png" width="120" alt="KIIT Fest Logo" style="display:block;margin:0 auto 14px auto;">
              <h1 style="color:#ffffff;font-size:26px;font-weight:900;margin:0 0 6px;letter-spacing:-0.5px;">Phool Aur Kaante 🌹</h1>
              <p style="color:rgba(255,255,255,0.75);font-size:12px;margin:0;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Valentine Compatibility Result</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="color:rgba(255,255,255,0.85);font-size:16px;line-height:1.7;margin:0 0 6px;">
                Hey <strong style="color:#db3063;">${name}</strong>, the cosmos have spoken! ✨
              </p>
              <p style="color:rgba(255,255,255,0.45);font-size:13px;line-height:1.6;margin:0;">
                Here is your complete numerology compatibility report from KIIT Fest 9.0 — Phool Aur Kaante.
              </p>
            </td>
          </tr>

          <!-- Compatibility Badge -->
          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(219,48,99,0.08);border:1px solid rgba(219,48,99,0.25);border-radius:14px;">
                <tr>
                  <td style="padding:26px;text-align:center;">
                    <p style="font-size:11px;color:#db3063;text-transform:uppercase;letter-spacing:3px;font-weight:700;margin:0 0 12px;">Your Compatibility</p>
                    <div style="display:inline-block;background:${compatColor}2a;border:2px solid ${compatColor};border-radius:50px;padding:10px 28px;margin-bottom:16px;">
                      <span style="font-size:20px;font-weight:900;color:${compatColor};letter-spacing:1px;">${compatIcon} ${compatType}</span>
                    </div>
                    <p style="font-size:14px;line-height:1.75;color:rgba(255,255,255,0.65);margin:0 auto;max-width:470px;">${compatMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DOBs -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;text-align:center;">
                    <p style="font-size:11px;color:rgba(219,48,99,0.8);text-transform:uppercase;letter-spacing:2px;font-weight:700;margin:0 0 6px;">🌹 Partner One</p>
                    <p style="font-size:17px;font-weight:700;color:#ffffff;margin:0;">${dob1}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;text-align:center;">
                    <p style="font-size:11px;color:rgba(219,48,99,0.8);text-transform:uppercase;letter-spacing:2px;font-weight:700;margin:0 0 6px;">🌷 Partner Two</p>
                    <p style="font-size:17px;font-weight:700;color:#ffffff;margin:0;">${dob2}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full Profiles heading -->
          <tr>
            <td style="padding:0 40px 12px;text-align:center;">
              <p style="font-size:11px;color:rgba(219,48,99,0.7);text-transform:uppercase;letter-spacing:3px;font-weight:700;margin:0;">— Full Personality Profiles —</p>
            </td>
          </tr>

          <!-- Profile A Traits -->
          ${renderFullProfile(profileA, "👤 Partner One")}

          <!-- Gap -->
          <tr><td style="height:20px;"></td></tr>

          <!-- Profile B Traits -->
          ${renderFullProfile(profileB, "👤 Partner Two")}

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px;text-align:center;border-top:1px solid rgba(219,48,99,0.1);">
              <p style="color:rgba(255,255,255,0.25);font-size:12px;line-height:1.7;margin:0 0 10px;">
                Generated at KIIT Fest 9.0 — Phool Aur Kaante 🌹<br>A Valentine Compatibility experience by Konnexions
              </p>
              <p style="color:rgba(219,48,99,0.5);font-size:11px;margin:0;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Made with 💖 by Konnexions · KIIT Fest 9.0</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  try {
    let res = await client.sendMail({
      from: {
        address: "transactions@kiitfest.org",
        name: "Phool Aur Kaante 🌹 | KIIT Fest 9.0",
      },
      to: [
        {
          email_address: {
            address: email,
            name: name,
          },
        },
      ],
      subject: `${compatIcon} Your Cosmic Compatibility is "${compatType}" | Phool Aur Kaante`,
      htmlbody,
    });

    if (res.message == "OK") {
      return {
        success: true,
        message: "Compatibility result sent to your email!",
      };
    } else {
      return {
        success: false,
        message: "Failed to send email. Please try again.",
      };
    }
  } catch (err) {
    console.error("Zepto mail error:", err);
    return {
      success: false,
      message: "Failed to send email. Please try again.",
    };
  }
}
