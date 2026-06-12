import "./App.css";

export default function App() {
  return (
    <main className="site">
      <iframe
        className="observable-frame hero-frame"
        title="Hero Section"
        src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=heroSection&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
      />

      <section id="journey">
        <iframe
          className="observable-frame"
          title="Psychedelic Ecosystem"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=visual1EcosystemOverview&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
        />

        <iframe
          className="observable-frame"
          title="Company Transition"
          src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=visual1EcosystemToCompanyTransition&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
        />
      </section>
    </main>
  );
}
