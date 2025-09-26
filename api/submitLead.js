import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const payload = { ...req.body, token: process.env.GAS_SECURITY_TOKEN };

      const response = await fetch(process.env.GAS_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ result: "error", msg: "Server error" });
    }
  } else {
    res.status(405).json({ result: "error", msg: "Method not allowed" });
  }
}
