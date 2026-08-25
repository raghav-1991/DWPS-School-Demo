import React from "react";
import { Link } from "react-router-dom";
import { PageHero, Band, Arrow } from "../components/ui.jsx";

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="Error 404" title="Page not found." sub="The page you're looking for may have moved or no longer exists." />
      <Band tone="paper">
        <div className="prose">
          <p>Let's get you back on track.</p>
          <Link to="/" className="btn btn--green btn--lg">Return home <Arrow /></Link>
        </div>
      </Band>
    </>
  );
}
