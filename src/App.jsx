import "./App.css";

export default function App() {
  return (
    <main className="site">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-kicker">UNICORN1</p>

          <h1>Psychedelic Trial Atlas</h1>

          <p className="hero-subtitle">
            A visual intelligence project mapping visible clinical-trial and
            pipeline activity across psychedelic medicine.
          </p>

          <a className="hero-arrow" href="#journey" aria-label="Scroll to journey">
            ↓
          </a>
        </div>
      </section>

      <section id="journey" className="visual-section">
        <iframe
          title="Psychedelic Ecosystem"
          width="100%"
          height="796"
          frameBorder="0"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=visual1EcosystemOverview&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
        />
      </section>

      <section className="visual-section">
        <iframe
          title="Journey Transition"
          width="100%"
          height="796"
          frameBorder="0"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=visual1EcosystemToCompanyTransition&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
        />
      </section>
    </main>
  );
}
