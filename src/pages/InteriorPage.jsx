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

/* One relevant icon per Explore topic. */
const xIconProps = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const StoryIcon = () => (<svg {...xIconProps}><path d="M12 6.5c-1.8-1.3-4-2-7-2v13c3 0 5.2.7 7 2 1.8-1.3 4-2 7-2V4.5c-3 0-5.2.7-7 2Z" /><path d="M12 6.5v13" /></svg>);
const VisionIcon = () => (<svg {...xIconProps}><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>);
const MissionIcon = () => (<svg {...xIconProps}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".6" fill="currentColor" stroke="none" /></svg>);
const ValuesIcon = () => (<svg {...xIconProps}><path d="M20.8 6.6a5.5 5.5 0 0 0-7.8 0L12 7.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 23l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z" /></svg>);
const PhilosophyIcon = () => (<svg {...xIconProps}><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 .9 1.1 1.6l.1.5h4.6l.1-.5c.1-.7.5-1.2 1.1-1.6A6 6 0 0 0 12 3Z" /><path d="M9.8 18.5h4.4M10.6 21h2.8" /></svg>);
const XBOX_ICONS = { "Our Story": StoryIcon, "Vision": VisionIcon, "Mission": MissionIcon, "Core Values": ValuesIcon, "School Philosophy": PhilosophyIcon };

/* 5 white, shadowed cards on a grey band — used for the About Us "Explore" section (no inner links). */
const ExploreSplit = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow="Explore" title={b.title} aside={b.aside} />}
    <div className="xboxes">
      {b.items.map((c) => {
        const Icon = XBOX_ICONS[c.name] || StoryIcon;
        return (
          <div key={c.name} className="xbox">
            <span className="xbox__icon"><Icon /></span>
            <h3 className="xbox__name">{c.name}</h3>
            <p className="xbox__note">{c.note}</p>
          </div>
        );
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
          <div className="fac__inner">
            <div className="fac__mediawrap">
              <Media src={img("campus-" + slug(f.name) + ".jpg")} alt={f.name + " — DWPS photograph"} ratio="4 / 3" className="card__media" />
              <span className="fac__badge">{f.n}{f.cat && <em> · {f.cat}</em>}</span>
            </div>
            <div className="fac__body">
              <h3 className="fac__name">{f.name}</h3>
              <p className="fac__note">{f.note}</p>
              {f.bullets && (
                <ul className="fac__bullets">
                  {f.bullets.map((bl, i) => <li key={i}>{bl}</li>)}
                </ul>
              )}
              <span className="card__more">Read more <Arrow /></span>
            </div>
          </div>
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

/* Category icons — a relevant glyph per document type, instead of one generic PDF icon. */
const iconProps = { width: 21, height: 21, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const CertificateIcon = () => (<svg {...iconProps}><circle cx="12" cy="8" r="5" /><path d="M9 12.5 7 21l5-2.5L17 21l-2-8.5" /></svg>);
const ScaleIcon = () => (<svg {...iconProps}><path d="M12 3v17M5 20h14M12 6 4 8m8-2 8 2" /><path d="M4 8l-2.5 5a3 3 0 0 0 5 0L4 8Z" /><path d="M20 8l-2.5 5a3 3 0 0 0 5 0L20 8Z" /></svg>);
const UsersIcon = () => (<svg {...iconProps}><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17.5" cy="7" r="2.4" /><path d="M15.7 13.3c2.6.4 4.5 2.6 4.5 5.7" /></svg>);
const IdCardIcon = () => (<svg {...iconProps}><rect x="2.5" y="5" width="19" height="14" rx="2" /><circle cx="8.5" cy="11" r="2" /><path d="M5.5 16c0-1.8 1.3-3 3-3s3 1.2 3 3" /><path d="M14.5 9.5h5M14.5 13h5M14.5 16h3" /></svg>);
const RupeeIcon = () => (<svg {...iconProps}><path d="M7 4h10M7 8h10M7 4c4 0 6 1.4 6 4s-2 4-6 4h7M7 12l7 8" /></svg>);
const BookIcon = () => (<svg {...iconProps}><path d="M12 6.5c-1.8-1.3-4-2-7-2v13c3 0 5.2.7 7 2 1.8-1.3 4-2 7-2V4.5c-3 0-5.2.7-7 2Z" /><path d="M12 6.5v13" /></svg>);
const ChartIcon = () => (<svg {...iconProps}><path d="M4 20V11M10 20V4M16 20v-6" /><path d="M2 20h20" /></svg>);
const DocIcon = () => (<svg {...iconProps}><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="M15 2v5h5" /><path d="M8 13h8M8 16.5h8M8 9.5h3" /></svg>);
const DownloadIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4" /><path d="M4 19h16" /></svg>);

const CAT_ICONS = {
  Affiliation: CertificateIcon, Legal: ScaleIcon, Governance: UsersIcon,
  Staff: IdCardIcon, Fees: RupeeIcon, Academics: BookIcon, Reports: ChartIcon,
};

const Downloads = ({ b }) => (
  <>
    {b.title && <SectionHead eyebrow="Downloads" title={b.title} />}
    <div className="dlgrid">
      {b.items.map((d, i) => {
        const CatIcon = CAT_ICONS[d.cat] || DocIcon;
        return (
          <article key={i} className={"dlcard" + (d.file ? "" : " dlcard--disabled")}>
            <div className="dlcard__head">
              <span className="dlcard__icon"><CatIcon /></span>
              <span className="dlcard__title">{d.title}</span>
            </div>
            {d.cat && <span className="dlcard__cat">{d.cat}</span>}
            {d.file
              ? <a className="dlcard__btn" href={d.file} download>Download <DownloadIcon /></a>
              : <span className="dlcard__btn">Coming soon</span>}
          </article>
        );
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
          <Media src={img("gallery-" + String((i % 43) + 1).padStart(2, "0") + ".jpg")} alt="DWPS gallery image" ratio={tall ? "3 / 4" : "4 / 3"} className="mtile__media" />
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
    prose: Prose, prose_media: ProseMedia, cards: Cards, explore_split: ExploreSplit, features: Features, facilities: Facilities, steps: Steps, stages: Stages,
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
