import React from "react";
import "./App.css";

export default function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">UNICORN1</p>

          <h1>Psychedelic Trial Atlas</h1>

          <p className="hero-subtitle">
            A visual intelligence project mapping visible clinical-trial and
            pipeline activity across psychedelic medicine.
          </p>
        </div>

        <a className="hero-scroll-arrow" href="#journey" aria-label="Scroll">
          <span />
        </a>
      </section>

      <section id="journey" className="journey-section">
        <iframe
          title="Psychedelic Ecosystem"
          width="100%"
          height="796"
          frameBorder="0"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=visual1EcosystemOverview&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
        />

        <iframe
          title="Company Transition"
          width="100%"
          height="796"
          frameBorder="0"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=visual1EcosystemToCompanyTransition&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
        />
      </section>
    </main>
  );
}
