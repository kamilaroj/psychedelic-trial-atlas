import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);

  const mainApiKey = "9adbc24a6ca900c2049e85d3efdc9583144e01ee";
  const mainNotebook = "e3028f2577c04f9a@1174";

  const companyApiKey = "9adbc24a6ca900c2049e85d3efdc9583144e01ee";
  const companyNotebook = "e3028f2577c04f9a@1174";

  const visual2ApiKey = "9adbc24a6ca900c2049e85d3efdc9583144e01ee";
  const visual2Notebook = "e3028f2577c04f9a@1176";

  const landscapeApiKey = "9adbc24a6ca900c2049e85d3efdc9583144e01ee";
  const landscapeNotebook = "e3028f2577c04f9a@1174";

  const githubLogoBase =
    "https://psychedelic-trial-atlas.vercel.app/logos/";

  const logoTuningVersion = "visual1b-logo-tuning-2026-06-17-2025";

  const visual1BLogoVisualScale = {
    "biomind_labs.png": 1.3,

    "janssen_logo.png": 1.6,
    "gh_research.png": 1,

    "solvonis_therapeutics.png": 2,
    "gilgamesh_pharma.png": 2,
    "bright_minds.png": 2.15,
    "definium.png": 2,
    "otsuka_mindset_pharma.png": 1.85,
    "ataibeckley.png": 2.05,
    "delix_therapeutics.png": 2,
    "xylo.png": 1.85,
    "tactogen.png": 2,

    "transcend_therapeutics_otsuka.png": 2.15,
    "reunion_neuroscience.png": 1.35,
    "celon_pharma.png": 2,
    "demerx.png": 2.15
  };

  const visual1BLogoHoverScale = {
    "biomind_labs.png": 0.7,
    "gh_research.png": 0.288,

    "janssen_logo.png": 0.8,
    "solvonis_therapeutics.png": 1.0,
    "gilgamesh_pharma.png": 1.4,
    "bright_minds.png": 1.0,
    "definium.png": 1.0,
    "otsuka_mindset_pharma.png": 1.0,
    "ataibeckley.png": 1.0,
    "delix_therapeutics.png": 1.0,
    "xylo.png": 1.0,
    "tactogen.png": 1.0,
    "transcend_therapeutics_otsuka.png": 1.0,
    "reunion_neuroscience.png": 1.0,
    "celon_pharma.png": 1.0,
    "demerx.png": 1.0
  };

  const observableSrc = (cell) =>
    `https://observablehq.com/embed/${mainNotebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${mainApiKey}`;

  const companyObservableSrc = (cell) =>
    `https://observablehq.com/embed/${companyNotebook}?cells=${cell}&banner=false&hideFooter=true&logoBase=${encodeURIComponent(
      githubLogoBase
    )}&logoVisualScale=${encodeURIComponent(
      JSON.stringify(visual1BLogoVisualScale)
    )}&logoHoverScale=${encodeURIComponent(
      JSON.stringify(visual1BLogoHoverScale)
    )}&logoTuningVersion=${encodeURIComponent(
      logoTuningVersion
    )}&api_key=${companyApiKey}`;

  const visual2ObservableSrc = (cell) =>
    `https://observablehq.com/embed/${visual2Notebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${visual2ApiKey}`;

  const landscapeObservableSrc = (cell) =>
    `https://observablehq.com/embed/${landscapeNotebook}?cells=${cell}&banner=false&hideFooter=true&api_key=${landscapeApiKey}`;

  const ObservableFrame = ({
    title,
    cell,
    visibleHeight,
    iframeHeight,
    className,
    srcType = "main",
    lazyLoad = false
  }) => {
    const wrapperRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(!lazyLoad);

    const src =
      srcType === "company"
        ? companyObservableSrc(cell)
        : srcType === "visual2"
          ? visual2ObservableSrc(cell)
          : srcType === "landscape"
            ? landscapeObservableSrc(cell)
            : observableSrc(cell);

    useEffect(() => {
      if (!lazyLoad) return;
      if (shouldLoad) return;

      const target = wrapperRef.current;
      if (!target) return;

      if (!("IntersectionObserver" in window)) {
        setShouldLoad(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (entry && entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          root: null,
          threshold: 0.08,
          rootMargin: "0px 0px -18% 0px"
        }
      );

      observer.observe(target);

      return () => observer.disconnect();
    }, [lazyLoad, shouldLoad]);

    const handleLoad = () => {
      window.setTimeout(() => {
        setIsLoaded(true);
      }, 180);
    };

    return (
      <div
        ref={wrapperRef}
        className={`iframe-crop ${className || ""}`}
        style={{
          height: `${visibleHeight}px`,
          background: "#f1f0ec",
          overflow: "hidden"
        }}
      >
        {shouldLoad && (
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
          />
        )}
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
          iframeHeight={860}
          className="hero-frame"
        />
      </section>

      <section className="story-section visual-story ecosystem-story">
        <ObservableFrame
          title="The Psychedelic Ecosystem"
          cell="visual1EcosystemOverviev"
          visibleHeight={750}
          iframeHeight={820}
          className="ecosystem-frame"
        />
      </section>

      <section className="story-section visual-story company-story">
        <ObservableFrame
          title="Company Landscape Premium"
          cell="visual1CompanyLandscapePremium1"
          visibleHeight={690}
          iframeHeight={780}
          className="company-frame"
          srcType="company"
        />
      </section>

      <section className="story-section visual-story compound-story">
        <ObservableFrame
          title="Compound Activity Landscape"
          cell="visual2Chartminimalistic1a"
          visibleHeight={515}
          iframeHeight={515}
          className="compound-frame landscape-frame observable-hard-crop"
          srcType="visual2"
          lazyLoad={true}
        />
      </section>

      <section className="story-section visual-story indication-story">
        <ObservableFrame
          title="Indication Landscape"
          cell="visual3Chart"
          visibleHeight={790}
          iframeHeight={880}
          className="indication-frame landscape-frame observable-hard-crop"
          srcType="landscape"
        />
      </section>

      <section className="story-section visual-story phase-story">
        <ObservableFrame
          title="Clinical Phase Landscape"
          cell="visual4PhaseChart"
          visibleHeight={760}
          iframeHeight={880}
          className="phase-frame landscape-frame observable-hard-crop"
          srcType="landscape"
        />
      </section>
    </main>
  );
}
