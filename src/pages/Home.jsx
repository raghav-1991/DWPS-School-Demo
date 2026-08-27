import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Band, SectionHead, Eyebrow, Arrow, Media, CountUp, CTASection, Testimonials } from "../components/ui.jsx";
import { img, slug } from "../lib/assets.js";
import {
  HERO_SLIDES, STATS, EXPLORE,
  GALLERY, TESTIMONIALS,
} from "../data/home.js";

// Hero background plays only this segment of the source video, then loops back.
const HERO_CLIP_START = 11; // seconds
const HERO_CLIP_END = 28; // seconds

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = HERO_SLIDES[i];
  return (
    <section className="hero" aria-label="Welcome to Delhi World Public School">
      <div className="hero__bg is-active">
        <div className="hero__placeholder" />
        <video
          className="hero__img"
          src="/videos/DWPS-Video.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedMetadata={(e) => { e.currentTarget.currentTime = HERO_CLIP_START; }}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= HERO_CLIP_END) e.currentTarget.currentTime = HERO_CLIP_START;
          }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="hero__grid-overlay" />
      </div>
      <div className="hero__scrim" />
      <div className="hero__inner">
        <p className="hero__kicker">Delhi World Public School</p>
        <h1 className="hero__title">{s.title.split("\n").map((l, k) => <span key={k}>{l}<br/></span>)}</h1>
        <p className="hero__sub">An environment where academic excellence meets creativity, confidence, character and future-ready learning.</p>
        <div className="hero__cta">
          <a href="#explore" className="btn btn--gold btn--lg">Explore DWPS</a>
          <Link to="/admissions" className="btn btn--outline btn--lg">Admissions Open 2027–28</Link>
        </div>
        <div className="hero__dots">
          {HERO_SLIDES.map((sl, idx) => (
            <button key={idx} className={"hero__dot" + (idx === i ? " is-on" : "")} aria-label={"Slide: " + sl.theme} onClick={() => setI(idx)}><span>{sl.theme}</span></button>
          ))}
        </div>
      </div>
      <div className="hero__scroll"><span /> Scroll</div>
    </section>
  );
}

export default function Home() {
  const exploreRail = useRef(null);
  const scrollExplore = (dir) => {
    const el = exploreRail.current;
    if (!el) return;
    const card = el.querySelector(".xcard");
    const step = (card ? card.getBoundingClientRect().width : 240) + 18;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <Hero />

      {/* Welcome */}
      <Band tone="paper" className="welcome">
        <div className="welcome__media">
          <Media src={img("home-welcome.jpg")} alt="Campus / students — DWPS photograph" ratio="5 / 6" />
        </div>
        <div className="welcome__copy">
          <Eyebrow>Welcome</Eyebrow>
          <h2 className="h2">Welcome to Delhi<br/>World Public School</h2>
          <p className="lede">A future-ready school where education, character, technology, creativity and excellence come together — for the students of today and the leaders of tomorrow.</p>
          <p className="body">Across every stage, DWPS pairs a rigorous CBSE foundation with the confidence, curiosity and care that help each child become the fullest version of themselves.</p>
          <Link to="/about-us/our-story" className="link">Discover Our Story <Arrow /></Link>
        </div>
      </Band>

      {/* Why choose */}
      <Band tone="dark" className="why">
        <SectionHead dark eyebrow="Why Choose DWPS" title={<>An education measured<br/>in more than marks.</>} />
        <div className="why__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat__value">{s.value != null ? <CountUp end={s.value} suffix={s.suffix} /> : <>{s.display}<em>{s.suffix}</em></>}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </Band>

      {/* Explore */}
      <Band tone="paper" id="explore">
        <SectionHead eyebrow="Explore DWPS" title="Find your way in."
          aside="Six doors into life at DWPS — for the parent deciding, and the child who can't wait." />
        <div className="explore-wrap">
          <button className="explore-arrow explore-arrow--prev" aria-label="Scroll left" onClick={() => scrollExplore(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="explore-rail" ref={exploreRail}>
            {EXPLORE.map((c, idx) => (
              <Link key={c.cat} to={c.to} className="xcard">
                <Media src={img("explore-" + slug(c.cat) + ".jpg")} alt={c.cat + " — DWPS photograph"} ratio="3 / 4" className="xcard__media" />
                <span className="xcard__n">{String(idx + 1).padStart(2, "0")}</span>
                <div className="xcard__body">
                  <span className="xcard__title">{c.cat}</span>
                  <p className="xcard__desc">{c.desc}</p>
                  <span className="card__more">Read more <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
          <button className="explore-arrow explore-arrow--next" aria-label="Scroll right" onClick={() => scrollExplore(1)}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </Band>

      {/* Gallery */}
      <Band tone="paper" className="gallery-band">
        <SectionHead dark eyebrow="Gallery" title="Experience DWPS through images."
          action={{ to: "/gallery", label: "Open full gallery" }} />
        <div className="masonry">
          {GALLERY.map((g, i) => (
            <Link key={i} to="/gallery" className={"mtile" + (g.tall ? " mtile--tall" : "")}>
              <Media src={img("gallery-" + String(i + 1).padStart(2, "0") + ".jpg")} alt="DWPS gallery image" ratio={g.tall ? "3 / 4" : "4 / 3"} className="mtile__media" />
            </Link>
          ))}
        </div>
      </Band>

      {/* Testimonials */}
      <Band tone="cream" className="testi">
        <Testimonials items={TESTIMONIALS} />
      </Band>

      <CTASection />
    </>
  );
}
