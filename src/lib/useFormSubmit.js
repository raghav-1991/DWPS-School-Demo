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
// non-empty value silently no-ops the send. `attachment` (optional) is
// { filename, contentBase64 } — see fileToAttachment() below for turning a File into this shape.
export function useFormSubmit(formType) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const submit = async ({ name, email, fields, honeypot, attachment }) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, name, email, fields, honeypot, attachment }),
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

// File types accepted for form attachments (resume uploads etc.) — kept in sync with the same list
// enforced server-side in api/send-email.js, which re-checks both since a client-side accept
// attribute is only a UI hint.
export const ATTACHMENT_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx", "ppt", "pptx", "odt", "avi", "ogg", "m4a", "mov", "mp3", "mp4", "mpg", "wav", "wmv", "ai", "eps", "tif"];
export const ATTACHMENT_ACCEPT = ATTACHMENT_EXTENSIONS.map((e) => "." + e).join(",");
export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024; // 4MB — see api/send-email.js for why this is risky near the cap

// Reads a browser File into the {filename, contentBase64} shape useFormSubmit's `attachment`
// expects, after checking its extension and size. Throws a short, user-facing message on failure.
export function fileToAttachment(file) {
  return new Promise((resolve, reject) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !ATTACHMENT_EXTENSIONS.includes(ext)) {
      reject(new Error(`"${ext || file.name}" isn't a supported file type.`));
      return;
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      reject(new Error("File is too large — 4MB max."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read that file — please try again."));
    reader.onload = () => {
      // reader.result is "data:<mime>;base64,<data>" — Resend just wants the base64 part.
      const contentBase64 = String(reader.result).split(",", 2)[1] || "";
      resolve({ filename: file.name, contentBase64 });
    };
    reader.readAsDataURL(file);
  });
}
