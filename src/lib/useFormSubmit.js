import { useState } from "react";

// Shared submit logic for every form on the site. Posts to the /api/send-email serverless
// function, which relays the message to the school's inbox via Resend — the Resend API key lives
// only as a server-side environment variable, so the browser never talks to Resend directly and
// never sees the key.
//
//   const { status, submit } = useFormSubmit("contact");
//   submit({ name: form.name, email: form.email, fields: { "Full name": form.name, ... } });
//
// `fields` is printed into the email body as-is (label: value), in the order given — pass an
// object literal so key order is preserved. `honeypot` (optional) is a spam-trap field value: any
// non-empty value silently no-ops the send.
export function useFormSubmit(formType) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const submit = async ({ name, email, fields, honeypot }) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, name, email, fields, honeypot }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Request failed");
      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  };

  return { status, submit, reset: () => setStatus("idle") };
}
