import React from "react";
import "./App.css";

export default function App() {
  const apiKey = "34347d95d4d95a93375c693a2fbb5249853bf500";
  const notebook = "e3028f2577c04f9a@1118";

  return (
    <main className="site">
      <section className="atlas-section hero-section">
        <iframe
          title="Psychedelic Trial Atlas Hero"
          width="100%"
          height="836"
          frameBorder="0"
          scrolling="no"
          className="atlas-iframe hero-iframe"
          src={`https://observablehq.com/embed/${notebook}?cells=heroSection1&api_key=${apiKey}`}
        />
      </section>

      <section className="atlas-section ecosystem-section">
        <iframe
          title="The Psychedelic Ecosystem"
          width="100%"
          height="796"
          frameBorder="0"
          scrolling="no"
          className="atlas-iframe ecosystem-iframe"
          src={`https://observablehq.com/embed/${notebook}?cells=visual1EcosystemOverviev&api_key=${apiKey}`}
        />
      </section>

      <section className="atlas-section company-section">
        <iframe
          title="Company Landscape Premium"
          width="100%"
          height="736"
          frameBorder="0"
          scrolling="no"
          className="atlas-iframe company-iframe"
          src={`https://observablehq.com/embed/${notebook}?cells=visual1CompanyLandscapePremium&api_key=${apiKey}`}
        />
      </section>
    </main>
  );
}
