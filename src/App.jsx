import React from "react";
import "./App.css";

export default function App() {
  const apiKey = "34347d95d4d95a93375c693a2fbb5249853bf500";
  const notebook = "e3028f2577c04f9a@1118";

  return (
    <main className="site">
      {/* HERO */}
      <section className="story-section hero-story">
        <div className="iframe-crop hero-crop">
          <iframe
            title="Psychedelic Trial Atlas Hero"
            width="100%"
            height="900"
            frameBorder="0"
            scrolling="no"
            className="atlas-iframe hero-iframe"
            src={`https://observablehq.com/embed/${notebook}?cells=heroSection1&api_key=${apiKey}`}
          />
        </div>
      </section>

      {/* STORY BRIDGE 1 */}
      <section className="story-bridge bridge-ecosystem">
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
      <section className="story-section ecosystem-story">
        <div className="iframe-crop ecosystem-crop">
          <iframe
            title="The Psychedelic Ecosystem"
            width="100%"
            height="860"
            frameBorder="0"
            scrolling="no"
            className="atlas-iframe ecosystem-iframe"
            src={`https://observablehq.com/embed/${notebook}?cells=visual1EcosystemOverviev&api_key=${apiKey}`}
          />
        </div>
      </section>

      {/* STORY BRIDGE 2 */}
      <section className="story-bridge bridge-company">
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
      <section className="story-section company-story">
        <div className="iframe-crop company-crop">
          <iframe
            title="Company Landscape Premium"
            width="100%"
            height="800"
            frameBorder="0"
            scrolling="no"
            className="atlas-iframe company-iframe"
            src={`https://observablehq.com/embed/${notebook}?cells=visual1CompanyLandscapePremium&api_key=${apiKey}`}
          />
        </div>
      </section>
    </main>
  );
}
