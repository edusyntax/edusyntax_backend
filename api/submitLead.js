// api/submitLead.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, course, modeSelected, leadType } = req.body;

    // Forward request to Google Apps Script
    const response = await fetch(process.env.GAS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        course,
        modeSelected,
        leadType,
        token: process.env.GAS_SECURITY_TOKEN
      })
    });

    const result = await response.json();
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
