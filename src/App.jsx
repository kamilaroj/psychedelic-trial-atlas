import React from "react";
import "./App.css";

export default function App() {
  const mainApiKey = "34347d95d4d95a93375c693a2fbb5249853bf500";
  const mainNotebook = "e3028f2577c04f9a@1118";

  const companyApiKey = "a72bff43ffc59328945853c2111ccac244ce6882";
  const companyNotebook = "e3028f2577c04f9a@1121";

  const observableSrc = (cell) =>
    `https://observablehq.com/embed/${mainNotebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${mainApiKey}`;

  const companyObservableSrc = (cell) =>
    `https://observablehq.com/embed/${companyNotebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${companyApiKey}`;

  const ObservableFrame = ({
    title,
    cell,
    visibleHeight,
    iframeHeight,
    className,
    srcType = "main"
  }) => {
    const src =
      srcType === "company"
        ? companyObservableSrc(cell)
        : observableSrc(cell);

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
          src={src}
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
          cell="visual1CompanyLandscapePremium1"
          visibleHeight={690}
          iframeHeight={736}
          className="company-frame"
          srcType="company"
        />
      </section>
    </main>
  );
}
