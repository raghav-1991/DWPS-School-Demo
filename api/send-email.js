// Vercel serverless function — the one place this project talks to Resend.
// RESEND_API_KEY / RESEND_FROM / RESEND_TO are server-side environment variables (see the Vercel
// project's Settings → Environment Variables); they are never bundled into the client JS and the
// browser never sees them. Every form on the site POSTs here instead of calling Resend directly.

// The destination for each form is decided here, server-side, by formType — never by the client —
// so a submission can't be made to redirect the school's mail to an arbitrary address.
const FORM_ROUTES = {
  "header-enquiry": { label: "Header — Enquire Now" },
  "admissions-enquiry": { label: "Admissions — Enquiry Form" },
  "contact": { label: "Contact Us — Send us a message" },
  "career": { label: "Careers — Application Form", toEnv: "RESEND_CAREER_TO" },
};

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const { formType, name, email, fields, honeypot } = body;

  // Spam trap: a field real visitors never see or fill in; bots that blindly fill every input do.
  // Pretend success so scripts don't learn anything from the response.
  if (honeypot) {
    res.status(200).json({ ok: true });
    return;
  }

  const route = FORM_ROUTES[formType];
  if (!route || typeof fields !== "object" || fields === null) {
    res.status(400).json({ ok: false, error: "Invalid submission" });
    return;
  }
  const { label, toEnv } = route;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    res.status(500).json({ ok: false, error: "Email is not configured" });
    return;
  }
  const from = process.env.RESEND_FROM || "DWPS Website <onboarding@resend.dev>";
  const toRaw = (toEnv && process.env[toEnv]) || process.env.RESEND_TO || "info@delhiworldpublicschool.co.in";
  const to = toRaw.split(",").map((s) => s.trim()).filter(Boolean);

  const entries = Object.entries(fields).filter(([, v]) => v != null && String(v).trim() !== "");
  const rowsHtml = entries
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#5A6B60;font-weight:600;white-space:nowrap;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:6px 0;">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#0F221A;max-width:560px;">
    <h2 style="margin:0 0 14px;color:#006335;">${escapeHtml(label)}</h2>
    <table style="border-collapse:collapse;font-size:14px;">${rowsHtml}</table>
    <p style="margin-top:20px;padding-top:12px;border-top:1px solid #eee;color:#5A6B60;font-size:12px;">Submitted from the Delhi World Public School website.</p>
  </div>`;
  const text = `${label}\n\n${entries.map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  const replyTo = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: replyTo,
        subject: `${label} — ${name || "New submission"}`,
        html,
        text,
      }),
    });
    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => "");
      console.error("Resend API error", resendRes.status, errText);
      res.status(502).json({ ok: false, error: "Failed to send email" });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Resend request failed", e);
    res.status(500).json({ ok: false, error: "Failed to send email" });
  }
}
