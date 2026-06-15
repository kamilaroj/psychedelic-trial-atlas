import "./App.css";

export default function App() {
  return (
    <main className="site">
      <iframe
        className="atlas-iframe hero-iframe"
        title="Psychedelic Trial Atlas Hero"
        src="https://observablehq.com/embed/e3028f2577c04f9a@1108?cells=heroSection1&api_key=34942bdcf52201d81a4cfd2390eb9bb6dae0718d"
        frameBorder="0"
        scrolling="no"
      />

      <iframe
        className="atlas-iframe visual1-iframe"
        title="Psychedelic Ecosystem Overview"
        src="https://observablehq.com/embed/e3028f2577c04f9a@1108?cells=visual1EcosystemOverviev&api_key=34942bdcf52201d81a4cfd2390eb9bb6dae0718d"
        frameBorder="0"
        scrolling="no"
      />
    </main>
  );
}
