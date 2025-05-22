export default async function handler(req, res) {
  // Always set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // or "https://www.2acesdesign.com"
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Only allow POST from here on
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    // Your Google Apps Script URL
    const googleScriptURL =
      "https://script.google.com/macros/s/AKfycbzUpSvmaBbD3drTRVrqwQtOxGOOFZk_YBxLLlbv3rJ3-vW7x4aYazVhrTFxlZii6IN2ZQ/exec";

    // Forward the JSON body to Apps Script
    const response = await fetch(googleScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    return res.status(200).json({ success: true, message: text });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
