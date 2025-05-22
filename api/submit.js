export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    // Your Google Apps Script URL:
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbzUpSvmaBbD3drTRVrqwQtOxGOOFZk_YBxLLlbv3rJ3-vW7x4aYazVhrTFxlZii6IN2ZQ/exec';

    // Forward the JSON body to your Apps Script
    const response = await fetch(googleScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(200).json({ success: true, message: text });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
