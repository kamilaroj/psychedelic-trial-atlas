import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);

  const mainApiKey = "34347d95d4d95a93375c693a2fbb5249853bf500";
  const mainNotebook = "e3028f2577c04f9a@1118";

  const companyApiKey = "a72bff43ffc59328945853c2111ccac244ce6882";
  const companyNotebook = "e3028f2577c04f9a@1121";

  const compoundApiKey = "3e7b500eda572738a86923ecb43b20b902fed572";
  const compoundNotebook = "e3028f2577c04f9a@1158";

  const landscapeApiKey = "3e7b500eda572738a86923ecb43b20b902fed572";
  const landscapeNotebook = "e3028f2577c04f9a@1157";

  const observableSrc = (cell) =>
    `https://observablehq.com/embed/${mainNotebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${mainApiKey}`;

  const companyObservableSrc = (cell) =>
    `https://observablehq.com/embed/${companyNotebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${companyApiKey}`;

  const compoundObservableSrc = (cell) =>
    `https://observablehq.com/embed/${compoundNotebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${compoundApiKey}`;

  const landscapeObservableSrc = (cell) =>
    `https://observablehq.com/embed/${landscapeNotebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${landscapeApiKey}`;

  const ObservableFrame = ({
    title,
    cell,
    visibleHeight,
    iframeHeight,
    iframeOffsetY = 0,
    className,
    srcType = "main"
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const src =
      srcType === "company"
        ? companyObservableSrc(cell)
        : srcType === "compound"
          ? compoundObservableSrc(cell)
          : srcType === "landscape"
            ? landscapeObservableSrc(cell)
            : observableSrc(cell);

    const handleLoad = () => {
      window.setTimeout(() => {
        setIsLoaded(true);
      }, 180);
    };

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
          className={`atlas-iframe ${
            isLoaded ? "iframe-loaded" : "iframe-loading"
          }`}
          src={src}
          onLoad={handleLoad}
          style={{
            transform: `translateY(${iframeOffsetY}px)`
          }}
        />
      </div>
    );
  };

  return (
    <main className="site">
      {aboutOpen && (
        <div
          className="about-modal-overlay"
          role="presentation"
          onClick={() => setAboutOpen(false)}
        >
          <section
            className="about-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-project-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="about-modal-header">
              <h2 id="about-project-title">✦ About project</h2>

              <button
                className="about-modal-close"
                type="button"
                onClick={() => setAboutOpen(false)}
                aria-label="Close About project"
              >
                ×
              </button>
            </div>

            <div className="about-modal-body">
              <p>
                <strong>Psychedelic Trial Atlas</strong> is a visual intelligence
                project focused on biotech and drug-development activity in
                psychedelic and psychedelic-adjacent medicine.
              </p>

              <p>
                The atlas maps what is publicly visible across registered
                clinical-trial records and selected company pipeline context. It
                looks at companies, development actors, compounds, assets,
                therapeutic areas, recruitment status and public source
                visibility.
              </p>

              <p>
                The focus is not wellness, retreats, underground use, personal
                experience or treatment advice. The focus is the emerging biotech
                landscape: who is developing assets, which compounds are visible,
                which indications appear in public trial data, and where activity
                is concentrated.
              </p>

              <p>
                The project separates registered clinical-trial activity from
                pipeline context. A registered trial record means there is a
                public trial source. Pipeline context means a company-reported or
                tracker-visible program that may not yet have a public trial ID.
              </p>

              <p>
                Visible activity does not mean that a drug is effective, safe,
                approved or commercially successful. It only means that the
                activity is publicly visible through trial registries, company
                materials or selected pipeline sources.
              </p>

              <p>
                This project is designed as a market-intelligence and
                data-visualization portfolio piece. It combines clinical-trial
                data cleaning, biotech landscape mapping and visual storytelling.
              </p>
            </div>
          </section>
        </div>
      )}

      <section className="story-section hero-story">
        <div className="top-project-menu">
          <button
            className="about-project-button"
            type="button"
            onClick={() => setAboutOpen(true)}
            aria-label="Open About project"
          >
            ✦ About project ▾
          </button>
        </div>

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

      <section className="story-section visual-story compound-story">
        <ObservableFrame
          title="Compound Activity Landscape"
          cell="visual2Chartminimalistic1"
          visibleHeight={646}
          iframeHeight={760}
          iframeOffsetY={-8}
          className="compound-frame landscape-frame observable-footer-crop"
          srcType="compound"
        />
      </section>

      <section className="story-section visual-story indication-story">
        <ObservableFrame
          title="Indication Landscape"
          cell="visual3Chart"
          visibleHeight={740}
          iframeHeight={870}
          iframeOffsetY={-10}
          className="indication-frame landscape-frame observable-footer-crop"
          srcType="landscape"
        />
      </section>

      <section className="story-section visual-story phase-story">
        <ObservableFrame
          title="Clinical Phase Landscape"
          cell="visual4PhaseChart"
          visibleHeight={710}
          iframeHeight={840}
          iframeOffsetY={-10}
          className="phase-frame landscape-frame observable-footer-crop"
          srcType="landscape"
        />
      </section>
    </main>
  );
}
