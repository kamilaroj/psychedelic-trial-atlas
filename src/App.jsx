import { useState } from "react";
import "./App.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="site">
      {!loaded && <div className="atlas-loader" />}

      <iframe
        className={loaded ? "atlas-frame is-loaded" : "atlas-frame"}
        title="Psychedelic Trial Atlas"
        src="https://observablehq.com/embed/e3028f2577c04f9a?cells=heroAndVisual1%2Cvisual2IntroTransition%2Cvisual2Chartminimalistic%2Cvisual3Chart%2Cvisual4PhaseChart"
        frameBorder="0"
        onLoad={() => setLoaded(true)}
      />
    </main>
  );
}
