import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cx } from "../lib/assets.js";

/* Reveal-on-scroll — re-run per route via key/path in Layout. */
export function useReveal(dep) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll("[data-reveal]:not(.in)");
    if (reduce) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [dep]);
}

export const Band = ({ tone = "paper", children, id, className = "", ...rest }) => (
  <section id={id} className={cx("band", `band--${tone}`, className)} data-reveal {...rest}>
    <div className="band__inner">{children}</div>
  </section>
);

export const Eyebrow = ({ children, light }) => (
  <span className={cx("eyebrow", light && "eyebrow--light")}>{children}</span>
);

export const Arrow = () => (
  <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SectionHead = ({ eyebrow, title, aside, action, dark }) => (
  <div className="sechead">
    <div className="sechead__lead">
      <Eyebrow light={dark}>{eyebrow}</Eyebrow>
      <h2 className={cx("h2", dark && "h2--light")}>{title}</h2>
    </div>
    {aside && <p className={cx("sechead__aside", dark && "sechead__aside--light")}>{aside}</p>}
    {action && <Link to={action.to} className={cx("link", dark && "link--gold")}>{action.label} <Arrow /></Link>}
  </div>
);

/* Photo when it loads; branded frame fallback otherwise. */
export function Media({ src, alt, ratio = "4 / 3", className = "", children }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const show = src && !err;
  return (
    <div className={cx("frame", className)} style={{ aspectRatio: ratio }}>
      <div className="frame__grid" />
      {show && (
        <img src={src} alt={alt} loading="lazy" className="frame__img"
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)} onError={() => setErr(true)} />
      )}
      {!loaded && (children || <span className="frame__label">{alt}</span>)}
    </div>
  );
}

export function CountUp({ end, suffix = "", duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVal(end); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((e) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export const Icon = ({ name }) => {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    stem:   <><path d="M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3" {...p}/><path d="M8 3h8M7 14h10" {...p}/></>,
    robot:  <><rect x="5" y="8" width="14" height="11" rx="2" {...p}/><path d="M12 5V3M8 13h.01M16 13h.01M9 19v2M15 19v2" {...p}/></>,
    art:    <><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1-1.6-.6-1 .1-2.4 1.4-2.4H17a4 4 0 0 0 4-4 8 8 0 0 0-9-8z" {...p}/><circle cx="8" cy="11" r="1" {...p}/><circle cx="12" cy="8" r="1" {...p}/><circle cx="16" cy="11" r="1" {...p}/></>,
    mic:    <><rect x="9" y="3" width="6" height="11" rx="3" {...p}/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" {...p}/></>,
    medal:  <><circle cx="12" cy="15" r="5" {...p}/><path d="M9 3l3 5 3-5M8.5 12.5L12 15l3.5-2.5" {...p}/></>,
    trophy: <><path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v1a4 4 0 0 0 3 3.9M17 6h3v1a4 4 0 0 1-3 3.9M10 15v3H8v2h8v-2h-2v-3" {...p}/></>,
    download: <><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" {...p}/></>,
  };
  return <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">{paths[name] || paths.stem}</svg>;
};

/* Interior page hero. */
export const PageHero = ({ eyebrow, title, sub, image }) => (
  <header className="phero">
    {image && <img className="phero__img" src={image} alt="" />}
    <div className="phero__scrim" /><div className="phero__grid" />
    <div className="phero__inner">
      <Eyebrow light>{eyebrow}</Eyebrow>
      <h1 className="phero__title">{title}</h1>
      {sub && <p className="phero__sub">{sub}</p>}
    </div>
  </header>
);

export const CTASection = ({ title, sub }) => (
  <section className="cta" data-reveal>
    <div className="cta__grid" />
    <div className="cta__inner">
      <Eyebrow light>Admissions Open 2027–28</Eyebrow>
      <h2 className="cta__title">{title || <>Your child's next chapter<br/>starts with one enquiry.</>}</h2>
      <p className="cta__sub">{sub || "Speak with our Admissions Office, plan a campus visit, or begin your enquiry online. We'll take it from there."}</p>
      <div className="cta__actions">
        <a href="https://delhiworldpublicschool.edchemy.com/enquiry.html" target="_blank" rel="noopener noreferrer" className="btn btn--white btn--lg">Submit Enquiry</a>
        <Link to="/contact-us" className="btn btn--outline btn--lg">Plan Your Visit →</Link>
      </div>
      <div className="cta__phones">Admissions Office <a href="tel:9611360631">9611360631</a> <span>·</span> <a href="tel:9611457761">9611457761</a></div>
    </div>
  </section>
);

/* Auto-advancing testimonial card — pauses on hover, respects reduced-motion. */
export function Testimonials({ items }) {
  const [ti, setTi] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = items[ti];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTi((p) => (p + 1) % items.length), 5500);
    return () => clearInterval(id);
  }, [paused, items.length]);

  return (
    <div className="testi__inner">
      <Eyebrow>In Their Words</Eyebrow>
      <div className="testi__card" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <span className="testi__mark" aria-hidden="true">“</span>
        <blockquote className="testi__quote">{t.text}</blockquote>
        <div className="testi__foot">
          <div className="testi__who"><strong>{t.name}</strong><span>{t.rel}</span></div>
          <div className="testi__nav">
            <button className="iconbtn" aria-label="Previous" onClick={() => setTi((ti - 1 + items.length) % items.length)}><svg width="20" height="20" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round"/></svg></button>
            <button className="iconbtn" aria-label="Next" onClick={() => setTi((ti + 1) % items.length)}><svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round"/></svg></button>
          </div>
        </div>
      </div>
      <div className="testi__dots">
        {items.map((_, idx) => (
          <button key={idx} className={"testi__dot" + (idx === ti ? " is-on" : "")} aria-label={"Testimonial " + (idx + 1)} onClick={() => setTi(idx)} />
        ))}
      </div>
      <p className="band__note band__note--dark">Placeholders shown — testimonials are CMS-driven and must be authentic.</p>
    </div>
  );
}
