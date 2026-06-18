import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

function PageRainOverlay({ active, onDone }) {
  const particles = useMemo(() => {
    const colors = [
      "#6f4a2f",
      "#b8944e",
      "#d63384",
      "#6f42c1",
      "#f08a24",
      "#0d6efd",
      "#dc3545",
      "#ffc107"
    ];

    function seededRandom(seed) {
      const x = Math.sin(seed * 999.123) * 10000;
      return x - Math.floor(x);
    }

    return Array.from({ length: 72 }, (_, index) => {
      const seed = index + 17;
      const x = 3 + seededRandom(seed) * 94;
      const drift = (seededRandom(seed + 100) - 0.5) * 18;
      const size = 22 + seededRandom(seed + 200) * 16;
      const delay = seededRandom(seed + 300) * 0.55;
      const duration = 2.7 + seededRandom(seed + 400) * 1.15;
      const opacity = 0.78 + seededRandom(seed + 500) * 0.2;
      const color = colors[index % colors.length];

      return {
        id: index,
        x,
        drift,
        size,
        delay,
        duration,
        opacity,
        color
      };
    });
  }, []);

  useEffect(() => {
    if (!active) return;

    const timer = window.setTimeout(() => {
      onDone?.();
    }, 4700);

    return () => window.clearTimeout(timer);
  }, [active, onDone]);

  if (!active) return null;

  return (
    <div className="page-rain-overlay" aria-hidden="true">
      <style>
        {`
          @keyframes pageRainFall {
            0% {
              transform: translate3d(0, -90px, 0) scale(0.92);
              opacity: 0;
            }

            10% {
              opacity: var(--particle-opacity);
            }

            42% {
              transform: translate3d(calc(var(--particle-drift) * 0.35), 34vh, 0) scale(1);
              opacity: var(--particle-opacity);
            }

            72% {
              transform: translate3d(calc(var(--particle-drift) * 0.82), 74vh, 0) scale(0.98);
              opacity: calc(var(--particle-opacity) * 0.9);
            }

            100% {
              transform: translate3d(var(--particle-drift), 108vh, 0) scale(0.92);
              opacity: 0;
            }
          }

          @keyframes pageRainFloat {
            0% {
              transform: translateX(-4px);
            }

            50% {
              transform: translateX(5px);
            }

            100% {
              transform: translateX(-4px);
            }
          }

          .page-rain-overlay {
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            z-index: 60;
            pointer-events: none;
            overflow: hidden;
            background: transparent;
          }

          .page-rain-particle {
            position: absolute;
            top: 0;
            left: var(--particle-left);
            width: var(--particle-size);
            height: var(--particle-size);
            animation:
              pageRainFall var(--particle-duration) cubic-bezier(0.22, 0.74, 0.28, 1) var(--particle-delay) forwards,
              pageRainFloat 1.45s ease-in-out var(--particle-delay) infinite;
            will-change: transform, opacity;
          }

          .page-rain-circle {
            width: 100%;
            height: 100%;
            border-radius: 999px;
            background: rgba(255,255,255,0.96);
            border: 1px solid rgba(217,214,207,0.95);
            box-shadow: 0 8px 18px rgba(29,29,31,0.10);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .page-rain-dot {
            width: 19%;
            height: 19%;
            border-radius: 999px;
            background: var(--particle-color);
          }
        `}
      </style>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="page-rain-particle"
          style={{
            "--particle-left": `${particle.x}vw`,
            "--particle-drift": `${particle.drift}vw`,
            "--particle-size": `${particle.size}px`,
            "--particle-delay": `${particle.delay}s`,
            "--particle-duration": `${particle.duration}s`,
            "--particle-opacity": particle.opacity,
            "--particle-color": particle.color
          }}
        >
          <div className="page-rain-circle">
            <div className="page-rain-dot" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [pageRainActive, setPageRainActive] = useState(false);
  const pageRainStartedRef = useRef(false);

  const mainApiKey = "536c77a48fd52bf6b461dc588ccfed55fdfa58d2";
  const mainNotebook = "e3028f2577c04f9a@1187";

  const companyApiKey = "536c77a48fd52bf6b461dc588ccfed55fdfa58d2";
  const companyNotebook = "e3028f2577c04f9a@1187";

  const visual2ApiKey = "536c77a48fd52bf6b461dc588ccfed55fdfa58d2";
  const visual2Notebook = "e3028f2577c04f9a@1187";

  const landscapeApiKey = "536c77a48fd52bf6b461dc588ccfed55fdfa58d2";
  const landscapeNotebook = "e3028f2577c04f9a@1187";

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

  const startPageRain = () => {
    if (pageRainStartedRef.current) return;

    pageRainStartedRef.current = true;
    setPageRainActive(true);
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
    lazyLoad = false,
    onEnter
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
        onEnter?.();
        setShouldLoad(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (entry && entry.isIntersecting) {
            onEnter?.();

            window.setTimeout(() => {
              setShouldLoad(true);
            }, 700);

            observer.disconnect();
          }
        },
        {
          root: null,
          threshold: 0.04,
          rootMargin: "0px 0px -8% 0px"
        }
      );

      observer.observe(target);

      return () => observer.disconnect();
    }, [lazyLoad, onEnter, shouldLoad]);

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
      <PageRainOverlay
        active={pageRainActive}
        onDone={() => setPageRainActive(false)}
      />

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
          visibleHeight={836}
          iframeHeight={930}
          className="hero-frame"
        />
      </section>

      <section className="story-section visual-story ecosystem-story">
        <ObservableFrame
          title="The Psychedelic Ecosystem"
          cell="visual1EcosystemOverviev"
          visibleHeight={796}
          iframeHeight={900}
          className="ecosystem-frame"
        />
      </section>

      <section className="story-section visual-story company-story">
        <ObservableFrame
          title="Company Landscape Premium"
          cell="visual1CompanyLandscapePremium1"
          visibleHeight={736}
          iframeHeight={850}
          className="company-frame"
          srcType="company"
        />
      </section>

      <section className="story-section visual-story compound-story">
        <ObservableFrame
          title="Compound Activity Landscape"
          cell="visual2Chartminimalistic1a"
          visibleHeight={800}
          iframeHeight={960}
          className="compound-frame landscape-frame observable-hard-crop"
          srcType="visual2"
          lazyLoad={true}
          onEnter={startPageRain}
        />
      </section>

      <section className="story-section visual-story indication-story">
        <ObservableFrame
          title="Indication Landscape"
          cell="visual3Chart"
          visibleHeight={760}
          iframeHeight={940}
          className="indication-frame landscape-frame observable-hard-crop"
          srcType="landscape"
        />
      </section>

      <section className="story-section visual-story phase-story">
        <ObservableFrame
          title="Clinical Phase Landscape"
          cell="visual4PhaseChart"
          visibleHeight={700}
          iframeHeight={880}
          className="phase-frame landscape-frame observable-hard-crop"
          srcType="landscape"
        />
      </section>
    </main>
  );
}
