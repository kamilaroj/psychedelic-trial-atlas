import "./App.css";

export default function App() {
  return (
    <main className="site">
      <section className="hero-section">
        <div className="hero-inner">
          <h1 className="title">Psychedelic Trial Atlas</h1>

          <p className="subtitle">
            A visual data project mapping registered clinical-trial activity and visible pipeline context
            <br />
            across psychedelic and psychedelic-adjacent medicines.
          </p>
        </div>

        <a href="#journey" className="journey">
          <span>START YOUR JOURNEY</span>
          <div className="arrow" />
        </a>
      </section>

      <section id="journey" className="section">
        <iframe
          src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=visual1EcosystemOverview&ui=minimal"
          title="Ecosystem"
        />
      </section>

      <section className="section">
        <iframe
          src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=visual1EcosystemToCompanyTransition&ui=minimal"
          title="Transition"
        />
      </section>
    </main>
  );
}
