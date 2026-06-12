import "./App.css";

export default function App() {
  return (
    <main className="site">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Psychedelic Trial Atlas</h1>

          <p className="hero-subtitle">
            A visual data project mapping registered clinical-trial activity and visible pipeline context
            <br />
            across psychedelic and psychedelic-adjacent medicines.
          </p>

          <a className="journey-cue" href="#journey" aria-label="Start your journey">
            <span className="journey-label">Start your journey</span>
            <span className="journey-arrow" />
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
    </main>
  );
}
