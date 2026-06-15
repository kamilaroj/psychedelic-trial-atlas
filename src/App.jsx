import React from "react";
import "./App.css";

export default function App() {
  return (
    <main className="site">
      <section className="embed-section hero-section">
        <iframe
          title="Psychedelic Trial Atlas Hero"
          className="observable-frame hero-frame"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1118?cells=heroSection1&api_key=34347d95d4d95a93375c693a2fbb5249853bf500"
        />
      </section>

      <section className="embed-section ecosystem-section">
        <iframe
          title="The Psychedelic Ecosystem"
          className="observable-frame ecosystem-frame"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1118?cells=visual1EcosystemOverviev&api_key=34347d95d4d95a93375c693a2fbb5249853bf500"
        />
      </section>

      <section className="embed-section company-section">
        <iframe
          title="Company Landscape Premium"
          className="observable-frame company-frame"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1118?cells=visual1CompanyLandscapePremium&api_key=34347d95d4d95a93375c693a2fbb5249853bf500"
        />
      </section>
    </main>
  );
}
