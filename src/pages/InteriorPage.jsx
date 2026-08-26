import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Band, SectionHead, Eyebrow, Arrow, Media, PageHero, CTASection, Testimonials } from "../components/ui.jsx";
import { Breadcrumbs } from "../components/layout.jsx";
import { CONTENT } from "../data/content.js";
import { TESTIMONIALS } from "../data/home.js";
import { img, slug } from "../lib/assets.js";
import { ENQUIRY_URL, PHONES } from "../data/site.js";

/* ---- individual block renderers ---- */

const Prose = ({ b }) => (
  <div className="prose">
    {b.heading && <h3>{b.heading}</h3>}
    {b.paras.map((p, i) => <p key={i}>{p}</p>)}
  </div>
);

/* Text-left, image-right split — used where a prose block needs an accompanying photo. */
const ProseMedia = ({ b }) => (
  <>
    <div className="split__copy prose">
      {b.heading && <h3>{b.heading}</h3>}
      {b.paras.map((p, i) => <p key={i}>{p}</p>)}
    </div>
    <Media src={img(b.image)} alt={b.alt || "DWPS photograph"} ratio={b.ratio || "4 / 3"} className="split__media" />
  </>
);

const Cards = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow="Explore" title={b.title} aside={b.aside} />}
    <div className="grid grid--3">
      {b.items.map((c) => {
        const inner = (
          <>
            <Media src={img("explore-" + slug(c.name) + ".jpg")} alt={c.name} ratio="4 / 3" className="card__media" />
            <div className="card__body">
              <span className="card__title card__title--sm">{c.name}</span>
              <p className="card__desc">{c.note}</p>
              {c.to && <span className="card__more">Read more <Arrow /></span>}
            </div>
          </>
        );
        return c.to
          ? <Link key={c.name} to={c.to} className="card">{inner}</Link>
          : <div key={c.name} className="card">{inner}</div>;
      })}
    </div>
  </>
);

const Facilities = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow={b.eyebrow || "Explore"} title={b.title} />}
    <div className="facilities">
      {b.items.map((f) => (
        <Link key={f.n} to={f.to} className="fac">
          <span className="fac__n">{f.n}</span>
          <div className="fac__body">
            {f.cat && <span className="fac__cat">{f.cat}</span>}
            <h3 className="fac__name">{f.name}</h3>
            <p className="fac__note">{f.note}</p>
            {f.bullets && (
              <ul className="fac__bullets">
                {f.bullets.map((bl, i) => <li key={i}>{bl}</li>)}
              </ul>
            )}
            <span className="card__more">Read more <Arrow /></span>
          </div>
          <Media src={img("campus-" + slug(f.name) + ".jpg")} alt={f.name + " — DWPS photograph"} ratio="4 / 3" className="fac__media" />
        </Link>
      ))}
    </div>
  </>
);

const Features = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow="Details" title={b.title} />}
    <div className="featurelist">
      {b.items.map((f) => (
        <div key={f.name} className="feature">
          <span className="feature__ic">{f.icon}</span>
          <div><strong className="feature__name">{f.name}</strong><p className="feature__note">{f.note}</p></div>
        </div>
      ))}
    </div>
  </>
);

const Steps = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow="Process" title={b.title} />}
    <div className="steps">
      {b.items.map((s, i) => (
        <div key={i} className="step">
          <span className="step__n">{s.n}</span>
          <div><strong className="step__name">{s.name}</strong><p className="step__note">{s.note}</p></div>
        </div>
      ))}
    </div>
  </>
);

const Stages = ({ b }) => (
  <div className="grid grid--4">
    {b.items.map((st) => (
      <div key={st.n} className="stage">
        <span className="stage__n">{st.n}</span>
        <Media src={img("academics-" + slug(st.name) + ".jpg")} alt={st.name} ratio="1 / 1" className="stage__media" />
        <h3 className="stage__name">{st.name}</h3>
        <p className="stage__note">{st.note}</p>
      </div>
    ))}
  </div>
);

function Faqs({ b }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {b.items.map((f, i) => (
        <div key={i} className={"acc" + (open === i ? " is-open" : "")}>
          <button className="acc__q" onClick={() => setOpen(open === i ? -1 : i)}>{f.q}<span>+</span></button>
          <div className="acc__a"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}

const DownloadsLike = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow="Reference" title={b.title} />}
    <div className="dltable">
      <div className="dlrow dlrow--head">{b.head.map((h) => <span key={h}>{h}</span>)}</div>
      {b.rows.map((r, i) => (
        <div key={i} className="dlrow" style={{ gridTemplateColumns: `repeat(${r.length}, 1fr)` }}>
          {r.map((c, j) => j === 0 ? <b key={j}>{c}</b> : <span key={j}>{c}</span>)}
        </div>
      ))}
    </div>
  </>
);

const PdfIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#E5484D" />
    <path d="M15 2v5h5" fill="#fff" opacity=".35" />
    <rect x="7" y="12" width="10" height="1.6" rx=".8" fill="#fff" />
    <rect x="7" y="15" width="10" height="1.6" rx=".8" fill="#fff" />
    <rect x="7" y="18" width="6" height="1.6" rx=".8" fill="#fff" />
  </svg>
);

const Downloads = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow="Downloads" title={b.title} />}
    <div className="dlgrid">
      {b.items.map((d, i) => {
        const inner = (
          <>
            <span className="dlcard__icon"><PdfIcon /></span>
            <span className="dlcard__title">{d.title}</span>
            {d.cat && <span className="dlcard__cat">{d.cat}</span>}
          </>
        );
        return d.file
          ? <a key={i} className="dlcard" href={d.file} target="_blank" rel="noopener noreferrer">{inner}</a>
          : <span key={i} className="dlcard dlcard--disabled">{inner}</span>;
      })}
    </div>
  </>
);

const News = ({ b }) => (
  <div className="grid grid--3">
    {b.items.map((e, i) => (
      <div key={i} className="ncard">
        <Media src={img("event-" + slug(e.cat) + ".jpg")} alt={e.cat} ratio="4 / 3" className="card__media" />
        <div className="ncard__meta"><span className="ncard__cat">{e.cat}</span><span className="ncard__date">{e.date}</span></div>
        <p className="ncard__title">{e.title}</p>
      </div>
    ))}
  </div>
);

const AchStats = ({ b }) => (
  <div className="achrow">
    {b.items.map((a, i) => (<div key={i} className="achstat"><strong>{a.v}</strong><span>{a.l}</span></div>))}
  </div>
);

const Leaders = ({ b }) => (
  <div className="grid grid--3">
    {b.items.map((l) => (
      <figure key={l.role} className="lcard">
        <Media src={img("leader-" + slug(l.role) + ".jpg")} alt={l.role} ratio="1 / 1" className="lcard__media" />
        <blockquote className="lcard__quote">“{l.quote}”</blockquote>
        <figcaption className="lcard__cap"><strong>{l.name}</strong><span>{l.role}'s Message</span></figcaption>
      </figure>
    ))}
  </div>
);

const Members = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow={b.eyebrow || "Members"} title={b.title} />}
    <div className="mgrid">
      {b.items.map((m, i) => (
        <div key={i} className="mcard">
          <Media src={"/images/Members/" + m.photo} alt={m.name} ratio="1 / 1" className="mcard__media" />
          <strong className="mcard__name">{m.name}</strong>
          <span className="mcard__role">{m.role}</span>
        </div>
      ))}
    </div>
  </>
);

const Jobs = ({ b }) => (
  <div className="jobs">
    {b.items.map((j, i) => (
      <div key={i} className="job">
        <div>
          <div className="job__role">{j.role}</div>
          <div className="job__meta"><span>◦ {j.dept}</span><span>◦ {j.loc}</span><span>◦ {j.type}</span></div>
        </div>
        <a href="#career-form" className="btn btn--outline-green">Apply</a>
      </div>
    ))}
  </div>
);

function CareerForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", experience: "", linkedin: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Job Application — " + (form.position || "General"));
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nPosition: ${form.position}\nExperience: ${form.experience}\nLinkedIn / portfolio: ${form.linkedin}\n\n${form.message}`
    );
    window.location.href = `mailto:career@delhiworldpublicschool.co.in?subject=${subject}&body=${body}`;
  };
  return (
    <form id="career-form" className="formcard" onSubmit={onSubmit}>
      <h3 style={{ marginTop: 0 }}>Career Application Form</h3>
      <div className="grid grid--2" style={{ gap: "1rem" }}>
        <div className="fld"><label>Full name</label><input required value={form.name} onChange={set("name")} placeholder="Your name" /></div>
        <div className="fld"><label>Email address</label><input required type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" /></div>
        <div className="fld"><label>Phone number</label><input required value={form.phone} onChange={set("phone")} placeholder="Mobile number" /></div>
        <div className="fld"><label>Position applying for</label><input required value={form.position} onChange={set("position")} placeholder="e.g. PRT / TGT / PGT" /></div>
        <div className="fld"><label>Years of experience</label><input value={form.experience} onChange={set("experience")} placeholder="e.g. 3 years" /></div>
        <div className="fld"><label>LinkedIn / portfolio link</label><input value={form.linkedin} onChange={set("linkedin")} placeholder="Optional" /></div>
      </div>
      <div className="fld"><label>Cover message</label><textarea value={form.message} onChange={set("message")} placeholder="Tell us why you'd be a good fit" /></div>
      <button type="submit" className="btn btn--green btn--lg" style={{ width: "100%" }}>Submit Application →</button>
      <p className="band__note band__note--dark" style={{ marginTop: ".8rem" }}>Submitting opens your email client with these details pre-filled, addressed to career@delhiworldpublicschool.co.in.</p>
    </form>
  );
}

const Gallery = ({ b }) => (
  <div className="masonry">
    {Array.from({ length: b.count }).map((_, i) => {
      const tall = i % 3 === 1;
      return (
        <div key={i} className="mtile">
          <Media src={img("gallery-" + String((i % 8) + 1).padStart(2, "0") + ".jpg")} alt="DWPS gallery image" ratio={tall ? "3 / 4" : "4 / 3"} className="mtile__media" />
        </div>
      );
    })}
  </div>
);

const Note = ({ b }) => <p className="band__note band__note--dark">{b.text}</p>;

function Enquiry() {
  return (
    <div className="grid grid--2" style={{ alignItems: "center" }}>
      <div className="prose">
        <h3>Start your enquiry</h3>
        <p>Submit the form and our Admissions Office will get in touch. Prefer to talk? Call {PHONES[0]} or {PHONES[1]}.</p>
        <a href={ENQUIRY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--gold btn--lg">Open Enquiry Form</a>
      </div>
      <form className="formcard" onSubmit={(e) => { e.preventDefault(); window.open(ENQUIRY_URL, "_blank", "noopener,noreferrer"); }}>
        <div className="fld"><label>Student's name</label><input required placeholder="Full name" /></div>
        <div className="fld"><label>Grade applying for</label><input required placeholder="e.g. Grade I" /></div>
        <div className="fld"><label>Parent's phone</label><input required placeholder="Mobile number" /></div>
        <div className="fld"><label>Message</label><textarea placeholder="Anything you'd like us to know" /></div>
        <button type="submit" className="btn btn--green btn--lg" style={{ width: "100%" }}>Submit Enquiry →</button>
        <p className="band__note band__note--dark" style={{ marginTop: ".8rem" }}>This form links to the official enquiry portal.</p>
      </form>
    </div>
  );
}

function Contact() {
  return (
    <div className="grid grid--2" style={{ alignItems: "start", gap: "3rem" }}>
      <div>
        <dl className="contact__list">
          <div><dt>Address</dt><dd>Delhi World Public School, Tippenahalli, Bengaluru, Karnataka 560073</dd></div>
          <div><dt>Phone</dt><dd><a href={"tel:" + PHONES[0]}>{PHONES[0]}</a> · <a href={"tel:" + PHONES[1]}>{PHONES[1]}</a></dd></div>
          <div><dt>Email</dt><dd>info@delhiworldpublicschool.co.in <em>(also: dpwstumkurroad@gmail.com)</em></dd></div>
          <div><dt>Office hours</dt><dd>Mon–Sat, 8:00 – 16:00</dd></div>
        </dl>
        <div className="frame" style={{ aspectRatio: "4 / 3" }}>
          <iframe
            title="Delhi World Public School — map location"
            src="https://www.google.com/maps?q=Delhi+World+Public+School,+Tippenahalli,+Bengaluru,+Karnataka+560073&output=embed"
            width="100%" height="100%" style={{ border: 0, display: "block" }}
            loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
      <form className="formcard" onSubmit={(e) => { e.preventDefault(); window.open(ENQUIRY_URL, "_blank", "noopener,noreferrer"); }}>
        <h3 style={{ marginTop: 0 }}>Send us a message</h3>
        <div className="fld"><label>Full name</label><input required placeholder="Your name" /></div>
        <div className="fld"><label>Email address</label><input required type="email" placeholder="you@example.com" /></div>
        <div className="fld"><label>Phone number</label><input required placeholder="Mobile number" /></div>
        <div className="fld"><label>Subject</label><input placeholder="What is this regarding?" /></div>
        <div className="fld"><label>Message</label><textarea placeholder="Tell us how we can help" /></div>
        <button type="submit" className="btn btn--green btn--lg" style={{ width: "100%" }}>Submit Enquiry →</button>
        <p className="band__note band__note--dark" style={{ marginTop: ".8rem" }}>This form links to our official enquiry portal.</p>
      </form>
    </div>
  );
}

/* ---- band tone rotation so long pages don't feel flat ---- */
const TONES = ["paper", "paper2", "cream"];

const TestimonialsBlock = () => <Testimonials items={TESTIMONIALS} />;

function Block({ b, tone }) {
  const map = {
    prose: Prose, prose_media: ProseMedia, cards: Cards, features: Features, facilities: Facilities, steps: Steps, stages: Stages,
    faqs: Faqs, downloads: Downloads, downloads_like: DownloadsLike, news: News,
    achstats: AchStats, leaders: Leaders, jobs: Jobs, gallery: Gallery, note: Note,
    enquiry: Enquiry, contact: Contact, career: CareerForm, members: Members,
    testimonials: TestimonialsBlock,
  };
  if (b.type === "cta") return <CTASection />;
  const Cmp = map[b.type];
  if (!Cmp) return null;
  const dark = b.type === "leaders";
  const cls = b.type === "prose_media" ? "split" : b.type === "testimonials" ? "testi" : undefined;
  const forcedTone = b.type === "testimonials" ? "cream" : tone;
  return <Band tone={dark ? "dark" : forcedTone} className={cls}><Cmp b={b} /></Band>;
}

export default function InteriorPage({ slug: key }) {
  const page = CONTENT[key];
  if (!page) {
    const title = key.split("/").pop().replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
    return (
      <>
        <PageHero eyebrow="DWPS" title={title} sub="This page is part of the DWPS site." />
        <Breadcrumbs trail={[{ label: title }]} />
        <Band tone="paper"><div className="prose"><p>Content for this page has not been added yet.</p></div></Band>
        <CTASection />
      </>
    );
  }
  let toneI = 0;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} sub={page.sub} image={page.image} />
      <Breadcrumbs trail={page.trail} />
      {page.blocks.map((b, i) => {
        const tone = b.type === "cta" || b.type === "leaders" ? null : TONES[toneI++ % TONES.length];
        return <Block key={i} b={b} tone={tone} />;
      })}
    </>
  );
}
