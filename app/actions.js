"use server";

import { sendCompatibilityEmail } from "@/mail/zepto";

/**
 * Validate a KFID against the KIITFest payment API.
 * Returns { success, name, email } or { success: false, message }
 */
export async function validateKFID(kfid) {
  if (!kfid || kfid.trim() === "") {
    return { success: false, message: "Please enter a valid KFID." };
  }

  try {
    const response = await fetch("https://pvs.kiitfest.org/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kfid: kfid.trim() }),
    });

    const data = await response.json();

    if (data.success && data.data.paid) {
      return {
        success: true,
        name: data.data.name,
        email: data.data.email,
      };
    } else {
      return {
        success: false,
        message:
          data.message || "Payment not verified. Please check your KFID.",
      };
    }
  } catch (err) {
    console.error("KFID validation error:", err);
    return {
      success: false,
      message: "Unable to verify KFID. Please try again.",
    };
  }
}

/**
 * Fetch compatibility data and email the result to the user.
 */
export async function fetchAndEmailCompatibility({ name, email, dob1, dob2 }) {
  // Convert YYYY-MM-DD to DD-MM-YYYY
  const convertToApiFormat = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${(day || "").padStart(2, "0")}-${(month || "").padStart(
      2,
      "0"
    )}-${year}`;
  };

  const apiDob1 = convertToApiFormat(dob1);
  const apiDob2 = convertToApiFormat(dob2);

  const displayDob1 = apiDob1; // DD-MM-YYYY for display
  const displayDob2 = apiDob2;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dob1: apiDob1, dob2: apiDob2 }),
    });

    if (!res.ok) {
      throw new Error("Compatibility API failed.");
    }

    const compatibilityData = await res.json();

    // Send email
    const emailResult = await sendCompatibilityEmail({
      name,
      email,
      dob1: displayDob1,
      dob2: displayDob2,
      compatibilityData,
    });

    return {
      success: true,
      emailSent: emailResult.success,
      message: emailResult.success
        ? "Your compatibility result has been sent to your email! 💌"
        : "Result computed but email delivery failed. Please retry.",
    };
  } catch (err) {
    console.error("Compatibility fetch error:", err);
    return {
      success: false,
      message: "Failed to compute compatibility. Please try again.",
    };
  }
}
