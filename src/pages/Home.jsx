import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Band, SectionHead, Eyebrow, Arrow, Media, CTASection, Testimonials, Lightbox, useLightbox } from "../components/ui.jsx";
import { img, slug } from "../lib/assets.js";
import {
  WHY_CHOOSE, EXPLORE,
  GALLERY, TESTIMONIALS,
} from "../data/home.js";

// Video-only hero: no title/kicker/CTA text overlay, so there's nothing left to slide between —
// just the looping background clip.
function Hero() {
  return (
    <section className="hero" aria-label="Welcome to Delhi World Public School">
      <div className="hero__bg is-active">
        <div className="hero__placeholder" />
        <video
          className="hero__img"
          src="/videos/DWPS-Video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="hero__grid-overlay" />
      </div>
      <div className="hero__scrim" />
    </section>
  );
}

export default function Home() {
  const exploreRail = useRef(null);
  const gallerySrcs = GALLERY.map((_, i) => img("home-gallery-" + String(i + 1).padStart(2, "0") + ".jpg"));
  const lightbox = useLightbox(gallerySrcs.length);
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
          <Media src={img("home-welcome.jpg")} alt="Campus / students — DWPS photograph" ratio={null} />
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
          {WHY_CHOOSE.map((w) => (
            <div key={w.name} className="whyitem">
              <h3 className="whyitem__name">{w.name}</h3>
              <p className="whyitem__note">{w.note}</p>
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
            <button key={i} type="button" className={"mtile mtile--btn" + (g.tall ? " mtile--tall" : "")} onClick={() => lightbox.open(i)}>
              <Media src={gallerySrcs[i]} alt="DWPS gallery image" ratio={g.tall ? "3 / 4" : "4 / 3"} className="mtile__media" />
            </button>
          ))}
        </div>
      </Band>
      {lightbox.props && <Lightbox srcs={gallerySrcs} {...lightbox.props} />}

      {/* Testimonials */}
      <Band tone="cream" className="testi">
        <Testimonials items={TESTIMONIALS} />
      </Band>

      <CTASection />
    </>
  );
}
