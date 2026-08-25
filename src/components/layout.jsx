import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { NAV, FOOTER_COLS, ENQUIRY_URL, SOCIAL } from "../data/site.js";
import { useReveal } from "./ui.jsx";
import { cx } from "../lib/assets.js";

// Official brand glyphs in their real brand colors.
const SOCIAL_PATHS = {
  Facebook: <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.676V1.325C24 .6 23.4 0 22.675 0z" fill="#1877F2"/>,
  YouTube: <path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.37.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.37-.56a3.02 3.02 0 0 0 2.13-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6z" fill="#FF0000"/>,
  Instagram: <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.72-2.13 1.38-.66.67-1.08 1.34-1.38 2.13-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.08-2.13-1.38-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" fill="url(#dwps-ig-grad)"/>,
};

const SocialIcon = ({ name }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    {name === "Instagram" && (
      <defs>
        <linearGradient id="dwps-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="35%" stopColor="#D62976" />
          <stop offset="65%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
    )}
    {SOCIAL_PATHS[name]}
  </svg>
);

const Logo = ({ compact }) => (
  <Link to="/" className={cx("logo", compact && "logo--compact")} aria-label="Delhi World Public School — home">
    <img className="logo__full" src="/dwps-logo.png"
      alt="Delhi World Public School — under the aegis of Delhi World Foundation, CBSE affiliation no. 831712" />
    <img className="logo__crest" src="/dwps-crest.png" alt="Delhi World Public School crest" />
  </Link>
);

function AnnouncementBar() {
  const text = "ADMISSIONS OPEN 2027–28  ·  Admissions are now open for the Academic Year 2027–28. Submit the enquiry form or contact our Admissions Office: 9611360631 | 9611457761  ·  ";
  return (
    <div className="ann">
      <span className="ann__badge">Admissions 2027–28</span>
      <div className="ann__viewport"><div className="ann__track">{[0, 1].map((i) => <span key={i} className="ann__item">{text}</span>)}</div></div>
    </div>
  );
}

function EnquiryModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Enquire Now" onClick={onClose}>
      <div className="modal__panel formcard" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close iconbtn" aria-label="Close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
        </button>
        <h3 className="modal__title">Start your enquiry</h3>
        <p className="modal__sub">Fill in a few details and our Admissions Office will get back to you.</p>
        <div className="fld"><label>Student's name</label><input placeholder="Full name" /></div>
        <div className="fld"><label>Grade applying for</label><input placeholder="e.g. Grade I" /></div>
        <div className="fld"><label>Parent's phone</label><input placeholder="Mobile number" /></div>
        <div className="fld"><label>Message</label><textarea placeholder="Anything you'd like us to know" /></div>
        <a href={ENQUIRY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--green btn--lg" style={{ width: "100%" }}>Submit Enquiry →</a>
        <p className="band__note band__note--dark" style={{ marginTop: ".7rem" }}>This form links to our official enquiry portal.</p>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setMobile(false); setOpen(null); }, [loc.pathname]);

  return (
    <header className={cx("hdr", scrolled && "hdr--compact")}>
      <div className="hdr__inner">
        <Logo compact={scrolled} />
        <nav className="hdr__nav" onMouseLeave={() => setOpen(null)}>
          {NAV.map((n) => (
            <div key={n.label} className="navitem" onMouseEnter={() => setOpen(n.menu ? n.label : null)}>
              <NavLink to={n.to} className={({ isActive }) => cx("navlink", isActive && "is-active")}>
                {n.label}{n.menu && <i className="navlink__caret" />}
              </NavLink>
              {n.menu && open === n.label && (
                <div className="mega">
                  {n.menu.map((col, ci) => (
                    <div key={col.h || ci} className="mega__col">
                      {col.h && <p className="mega__h">{col.h}</p>}
                      {col.items.map(([label, to]) => <Link key={label + to} to={to} className="mega__link">{label}</Link>)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hdr__actions">
          <div className="hdr__social">
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="iconbtn" aria-label={s.name}>
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
          <button className="btn btn--green hdr__enq" onClick={() => setEnquireOpen(true)}>Enquire Now</button>
          <button className="iconbtn hamb" aria-label="Menu" onClick={() => setMobile(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      <EnquiryModal open={enquireOpen} onClose={() => setEnquireOpen(false)} />

      {mobile && (
        <div className="msheet" role="dialog" aria-modal="true">
          <div className="msheet__top">
            <Logo />
            <button className="iconbtn" aria-label="Close" onClick={() => setMobile(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
            </button>
          </div>
          <nav className="msheet__nav">
            {NAV.map((n) => <Link key={n.label} to={n.to} className="msheet__link">{n.label}</Link>)}
          </nav>
          <div className="msheet__cta">
            <Link to="/admissions" className="btn btn--green">Admissions 2027–28</Link>
            <a href={ENQUIRY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--outline-green">Enquire Now</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="ft">
      <div className="ft__top">
        <div className="ft__brand">
          <div className="ftlogo">
            <img className="ftlogo__crest" src="/dwps-crest.png" alt="Delhi World Public School crest" />
            <div className="ftlogo__text"><strong>Delhi World Public School</strong><span>Under the aegis of Delhi World Foundation · CBSE 831712</span></div>
          </div>
          <p className="ft__tag">A future-ready school where education, character, technology, creativity and excellence come together.</p>
          <a href={ENQUIRY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--gold">Admissions 2027–28</a>
          <div className="ft__social">{SOCIAL.map((s) => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="ft__soc">{s.name}</a>)}</div>
        </div>
        {FOOTER_COLS.map((c) => (
          <div key={c.h} className="ft__col">
            <p className="ft__h">{c.h}</p>
            {c.items.map(([label, to]) => <Link key={label + to} to={to} className="ft__link">{label}</Link>)}
          </div>
        ))}
        <div className="ft__col">
          <p className="ft__h">Contact</p>
          <p className="ft__addr">Delhi World Public School, Tippenahalli, Bengaluru, Karnataka 560073</p>
          <a href="tel:9611360631" className="ft__link">9611360631</a>
          <a href="tel:9611457761" className="ft__link">9611457761</a>
          <p className="ft__addr">Office hours: Mon–Sat, 8:00–16:00</p>
        </div>
      </div>
      <div className="ft__bottom">
        <span>© {new Date().getFullYear()} Delhi World Public School</span>
        <div className="ft__legal"><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a><Link to="/mandatory-disclosure">Mandatory Disclosure</Link></div>
      </div>
    </footer>
  );
}

export function Breadcrumbs({ trail }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {trail.map((t, i) => (
        <React.Fragment key={i}>
          <span>/</span>
          {t.to ? <Link to={t.to}>{t.label}</Link> : <b>{t.label}</b>}
        </React.Fragment>
      ))}
    </nav>
  );
}

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=919611360631&text="
  + encodeURIComponent("Hi, I'd like to know more about admissions at DWPS.");

function WhatsAppFloat() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Chat with us on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.02 2.02C6.5 2.02 2.02 6.5 2.02 12.02c0 1.88.52 3.64 1.42 5.15L2 22l4.98-1.4a9.94 9.94 0 0 0 5.04 1.36c5.52 0 10-4.48 10-10s-4.48-9.94-10-9.94zm0 18.2c-1.61 0-3.11-.44-4.4-1.2l-.32-.19-3.02.85.84-2.93-.2-.32a8.18 8.18 0 0 1-1.28-4.4c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.18 3.66 8.18 8.18 0 4.52-3.66 8.21-8.2 8.21z" fill="#fff"/>
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.94-.26-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.51.07-.78.36-.26.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.02c.15.19 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.26-.19-.55-.34z" fill="#fff"/>
      </svg>
    </a>
  );
}

function MobileStickyCTA() {
  return (
    <div className="msticky">
      <Link to="/admissions" className="btn btn--green">Admissions 2027–28</Link>
      <a href={ENQUIRY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--outline-green">Enquire</a>
    </div>
  );
}

export default function Layout() {
  const loc = useLocation();
  useReveal(loc.pathname);
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  return (
    <div className="dwps">
      <Header />
      <AnnouncementBar />
      <main><Outlet /></main>
      <Footer />
      <MobileStickyCTA />
      <WhatsAppFloat />
    </div>
  );
}
