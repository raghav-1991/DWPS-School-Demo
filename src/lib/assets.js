// All photography loads from /public/images by filename.
export const IMG = "/images/";
export const img = (name) => IMG + name;
export const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export const cx = (...a) => a.filter(Boolean).join(" ");
