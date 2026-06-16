import React from "react";
import "./App.css";

export default function App() {
  const apiKey = "34347d95d4d95a93375c693a2fbb5249853bf500";
  const notebook = "e3028f2577c04f9a@1118";

  const observableSrc = (cell) =>
    `https://observablehq.com/embed/${notebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${apiKey}`;

  const ObservableFrame = ({ title, cell, visibleHeight, iframeHeight, className }) => {
    return (
      <div
        className={`iframe-crop ${className || ""}`}
        style={{ height: `${visibleHeight}px` }}
      >
        <iframe
          title={title}
          width="100%"
          height={iframeHeight}
          frameBorder="0"
          scrolling="no"
          className="atlas-iframe"
          src={observableSrc(cell)}
        />
      </div>
    );
  };

  return (
    <main className="site">
      <section className="story-section hero-story">
        <ObservableFrame
          title="Psychedelic Trial Atlas Hero"
          cell="heroSection1"
          visibleHeight={790}
          iframeHeight={836}
          className="hero-frame"
        />
      </section>

      <section className="story-section visual-story ecosystem-story">
        <ObservableFrame
          title="The Psychedelic Ecosystem"
          cell="visual1EcosystemOverviev"
          visibleHeight={750}
          iframeHeight={796}
          className="ecosystem-frame"
        />
      </section>

      <section className="story-section visual-story company-story">
        <ObservableFrame
          title="Company Landscape Premium"
          cell="visual1CompanyLandscapePremium"
          visibleHeight={690}
          iframeHeight={736}
          className="company-frame"
        />
      </section>
    </main>
  );
}
