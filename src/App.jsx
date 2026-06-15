import React from "react";
import "./App.css";

export default function App() {
  return (
    <main className="site">
      <section className="observable-section hero-observable">
        <iframe
          title="UNICORN1 Hero"
          width="100%"
          height="836"
          frameBorder="0"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1118?cells=heroSection1&api_key=34347d95d4d95a93375c693a2fbb5249853bf500"
        />
      </section>

      <section className="observable-section visual-section visual-1a">
        <iframe
          title="Visual 1A Ecosystem Overview"
          width="100%"
          height="796"
          frameBorder="0"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1118?cells=visual1EcosystemOverviev&api_key=34347d95d4d95a93375c693a2fbb5249853bf500"
        />
      </section>

      <section className="observable-section visual-section visual-1b">
        <iframe
          title="Visual 1B Company Landscape Premium"
          width="100%"
          height="736"
          frameBorder="0"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1118?cells=visual1CompanyLandscapePremium&api_key=34347d95d4d95a93375c693a2fbb5249853bf500"
        />
      </section>
    </main>
  );
}
