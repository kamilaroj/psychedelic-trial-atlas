import React from "react";
import "./App.css";

export default function App() {
  const apiKey = "34347d95d4d95a93375c693a2fbb5249853bf500";
  const notebook = "e3028f2577c04f9a@1118";

  const observableSrc = (cell) =>
    `https://observablehq.com/embed/${notebook}?cells=${cell}&banner=false&api_key=${apiKey}`;

  return (
    <main className="site">
      {/* HERO */}
      <section className="story-section hero-story">
        <div className="iframe-shell hero-shell">
          <iframe
            title="Psychedelic Trial Atlas Hero"
            width="100%"
            height="836"
            frameBorder="0"
            scrolling="no"
            className="atlas-iframe hero-iframe"
            src={observableSrc("heroSection1")}
          />
        </div>
      </section>

      {/* STORY BRIDGE 1 */}
      <section className="story-bridge">
        <div className="story-copy">
          <p className="story-kicker">01 / Ecosystem scale</p>
          <h2>The visible development footprint</h2>
          <p>
            Before looking at individual companies, the atlas first shows the
            public signal: companies, assets, trial records, countries,
            compound families, pipeline context and therapeutic areas.
          </p>
        </div>
      </section>

      {/* VISUAL 1A */}
      <section className="story-section visual-story ecosystem-story">
        <div className="iframe-shell ecosystem-shell">
          <iframe
            title="The Psychedelic Ecosystem"
            width="100%"
            height="796"
            frameBorder="0"
            scrolling="no"
            className="atlas-iframe ecosystem-iframe"
            src={observableSrc("visual1EcosystemOverviev")}
          />
        </div>
      </section>

      {/* STORY BRIDGE 2 */}
      <section className="story-bridge">
        <div className="story-copy">
          <p className="story-kicker">02 / Company landscape</p>
          <h2>From ecosystem scale to market builders</h2>
          <p>
            The next layer turns the ecosystem into a company map. Each circle
            represents a development actor, sized by its visible public
            footprint across registered activity and selected pipeline context.
          </p>
        </div>
      </section>

      {/* VISUAL 1B */}
      <section className="story-section visual-story company-story">
        <div className="iframe-shell company-shell">
          <iframe
            title="Company Landscape Premium"
            width="100%"
            height="736"
            frameBorder="0"
            scrolling="no"
            className="atlas-iframe company-iframe"
            src={observableSrc("visual1CompanyLandscapePremium")}
          />
        </div>
      </section>
    </main>
  );
}
