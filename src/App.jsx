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

function AboutProjectIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.15 2.35h3.7l-.68 7.08 5.78-4.2 1.86 3.2-6.48 2.92 6.48 2.92-1.86 3.2-5.78-4.2.68 7.08h-3.7l.68-7.08-5.78 4.2-1.86-3.2 6.48-2.92-6.48-2.92 1.86-3.2 5.78 4.2-.68-7.08z" />
    </svg>
  );
}

function KeyFactsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.5" y="4.5" width="11" height="15" rx="1.8" />
      <path d="M9.5 8.2h5" />
      <path d="M9.5 11.6h5" />
      <path d="M9.5 15h3.6" />
    </svg>
  );
}

function MethodologyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.5 3.8h5" />
      <path d="M10.7 3.8v5.1l-4.2 8.2c-.8 1.6.3 3.4 2.1 3.4h6.8c1.8 0 2.9-1.8 2.1-3.4l-4.2-8.2V3.8" />
      <path d="M8.4 16h7.2" />
    </svg>
  );
}

function LimitationsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.2l8.2 15.1H3.8L12 4.2z" />
      <path d="M12 9.2v4.7" />
      <path d="M12 17.2h.01" />
    </svg>
  );
}

function CreatorIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8.2" r="3" />
      <path d="M5.8 19.5c1.1-3.2 3.3-4.8 6.2-4.8s5.1 1.6 6.2 4.8" />
    </svg>
  );
}

function InlineIcon({ children }) {
  return <span className="about-inline-icon">{children}</span>;
}

function ObservableFrame({
  title,
  visibleHeight,
  iframeHeight,
  className,
  src,
  lazyLoad = false,
  onEnter
}) {
  const wrapperRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad);

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
}

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollPercent = Math.round(scrollProgress * 100);

  useEffect(() => {
    const updateScrollProgress = () => {
      const documentElement = document.documentElement;
      const scrollTop = window.scrollY || documentElement.scrollTop || 0;
      const scrollableHeight =
        documentElement.scrollHeight - window.innerHeight;

      const progress =
        scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;

      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <>
      <style>
        {`
          .page-scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            z-index: 70;
            pointer-events: none;
            background: rgba(29, 29, 31, 0.10);
          }

          .page-scroll-progress-bar {
            width: 100%;
            height: 100%;
            transform-origin: left center;
            transform: scaleX(var(--scroll-progress));
            background: rgba(29, 29, 31, 0.58);
            transition: transform 90ms linear;
          }

          .page-scroll-progress-percent {
            position: fixed;
            top: 9px;
            right: 18px;
            z-index: 70;
            pointer-events: none;
            font-family: "Inter Tight", "Inter", "Helvetica Neue", Arial, system-ui, sans-serif;
            font-size: 15px;
            line-height: 1;
            letter-spacing: -0.035em;
            font-weight: 780;
            color: #1d1d1f;
          }
        `}
      </style>

      <div className="page-scroll-progress" aria-hidden="true">
        <div
          className="page-scroll-progress-bar"
          style={{
            "--scroll-progress": scrollProgress
          }}
        />
      </div>

      <div className="page-scroll-progress-percent" aria-hidden="true">
        {scrollPercent}%
      </div>
    </>
  );
}

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutPulse, setAboutPulse] = useState(false);
  const [pageRainActive, setPageRainActive] = useState(false);
  const pageRainStartedRef = useRef(false);
  const aboutPulseTimerRef = useRef(null);

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

  const logoTuningVersion = "visual1b-logo-tuning-2026-06-19-added-logos";

  const visual1BLogoVisualScale = useMemo(
    () => ({
      "2A_biosciences.png": 2,
      "algernon.png": 2,
      "amandala_neuro.png": 2,
      "asri.png": 2,
      "ataibeckley.png": 2.05,
      "beond.png": 2,
      "betterlife_pharma.png": 2,
      "biocase_brasil.png": 2,
      "biomind_labs.png": 1.3,
      "bright_minds.png": 2.15,
      "celon_pharma.png": 2,
      "compass_pathways.png": 2,
      "definium.png": 2,
      "delix_therapeutics.png": 2,
      "demerx.png": 2.15,
      "gh_research.png": 1,
      "gilgamesh_pharma.png": 2,
      "helus.png": 2,
      "janssen_logo.png": 1.6,
      "otsuka_mindset_pharma.png": 1.85,
      "resilient_pharmaceuticals.png": 2,
      "reunion_neuroscience.png": 1.35,
      "solvonis_therapeutics.png": 2,
      "tactogen.png": 2,
      "transcend_therapeutics_otsuka.png": 2.15,
      "xylo.png": 1.85
    }),
    []
  );

  const visual1BLogoHoverScale = useMemo(
    () => ({
      "2A_biosciences.png": 1,
      "algernon.png": 1,
      "amandala_neuro.png": 1,
      "asri.png": 1,
      "ataibeckley.png": 1,
      "beond.png": 1,
      "betterlife_pharma.png": 1,
      "biocase_brasil.png": 1,
      "biomind_labs.png": 0.7,
      "bright_minds.png": 1,
      "celon_pharma.png": 1,
      "compass_pathways.png": 1,
      "definium.png": 1,
      "delix_therapeutics.png": 1,
      "demerx.png": 1,
      "gh_research.png": 0.288,
      "gilgamesh_pharma.png": 1.4,
      "helus.png": 1,
      "janssen_logo.png": 0.8,
      "otsuka_mindset_pharma.png": 1,
      "resilient_pharmaceuticals.png": 1,
      "reunion_neuroscience.png": 1,
      "solvonis_therapeutics.png": 1,
      "tactogen.png": 1,
      "transcend_therapeutics_otsuka.png": 1,
      "xylo.png": 1
    }),
    []
  );

  const startPageRain = () => {
    if (pageRainStartedRef.current) return;

    pageRainStartedRef.current = true;
    setPageRainActive(true);
  };

  const triggerAboutPulse = () => {
    if (aboutPulseTimerRef.current) {
      window.clearTimeout(aboutPulseTimerRef.current);
    }

    setAboutPulse(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setAboutPulse(true);

        aboutPulseTimerRef.current = window.setTimeout(() => {
          setAboutPulse(false);
        }, 360);
      });
    });
  };

  useEffect(() => {
    return () => {
      if (aboutPulseTimerRef.current) {
        window.clearTimeout(aboutPulseTimerRef.current);
      }
    };
  }, []);

  const observableSrc = useMemo(
    () => ({
      heroSection1: `https://observablehq.com/embed/${mainNotebook}?cells=heroSection1&banner=false&hideFooter=true&api_key=${mainApiKey}`,
      visual1EcosystemOverviev: `https://observablehq.com/embed/e3028f2577c04f9a@1199?cells=visual1EcosystemOverviev&banner=false&hideFooter=true&api_key=c76bbf6056ba531c2ed8bc19951e858dc356a8fd`,
      visual2Chartminimalistic1a: `https://observablehq.com/embed/${visual2Notebook}?cells=visual2Chartminimalistic1a&banner=false&hideFooter=true&api_key=${visual2ApiKey}`,
      visualLandscapeLayout: `https://observablehq.com/embed/${landscapeNotebook}?cells=visualLandscapeLayout&banner=false&hideFooter=true&api_key=${landscapeApiKey}`,
      visual3Chart: `https://observablehq.com/embed/${landscapeNotebook}?cells=visual3Chart&banner=false&hideFooter=true&api_key=${landscapeApiKey}`,
      visual4PhaseChart: `https://observablehq.com/embed/${landscapeNotebook}?cells=visual4PhaseChart&banner=false&hideFooter=true&api_key=${landscapeApiKey}`,
      visual1CompanyLandscapePremium1: `https://observablehq.com/embed/${companyNotebook}?cells=visual1CompanyLandscapePremium1&banner=false&hideFooter=true&logoBase=${encodeURIComponent(
        githubLogoBase
      )}&logoVisualScale=${encodeURIComponent(
        JSON.stringify(visual1BLogoVisualScale)
      )}&logoHoverScale=${encodeURIComponent(
        JSON.stringify(visual1BLogoHoverScale)
      )}&logoTuningVersion=${encodeURIComponent(
        logoTuningVersion
      )}&api_key=${companyApiKey}`
    }),
    [
      mainNotebook,
      mainApiKey,
      visual2Notebook,
      visual2ApiKey,
      landscapeNotebook,
      landscapeApiKey,
      companyNotebook,
      companyApiKey,
      githubLogoBase,
      logoTuningVersion,
      visual1BLogoVisualScale,
      visual1BLogoHoverScale
    ]
  );

  return (
    <main className="site">
      <ScrollProgressBar />

      <style>
        {`
          @keyframes aboutModalAttentionPulse {
            0% {
              transform: scale(1);
            }

            38% {
              transform: scale(1.028);
            }

            68% {
              transform: scale(0.994);
            }

            100% {
              transform: scale(1);
            }
          }

          .about-project-button {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 7px !important;
            height: 30px !important;
            min-height: 30px !important;
            padding: 4px 12px 5px !important;
            line-height: 1 !important;
          }

          .about-project-button-icon {
            width: 20px !important;
            height: 20px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex: 0 0 20px !important;
          }

          .about-project-button-icon svg {
            width: 20px !important;
            height: 20px !important;
            display: block !important;
            fill: #111111 !important;
            stroke: none !important;
          }

          .about-modal-overlay {
            position: fixed !important;
            inset: 0 !important;
            z-index: 80 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 24px !important;
            background: rgba(0, 0, 0, 0.34) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          .about-modal-overlay::before,
          .about-modal-overlay::after {
            content: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            filter: none !important;
          }

          .about-modal {
            width: min(92vw, 550px) !important;
            max-width: 550px !important;
            max-height: 82vh !important;
            overflow: hidden !important;
            background: #ffffff !important;
            color: #111111 !important;
            border: 1px solid rgba(0, 0, 0, 0.12) !important;
            border-radius: 18px !important;
            box-shadow:
              0 24px 70px rgba(0, 0, 0, 0.18),
              0 8px 22px rgba(0, 0, 0, 0.10) !important;
            font-family: "Inter", "Helvetica Neue", Arial, system-ui, sans-serif !important;
            transform-origin: center center !important;
            will-change: transform !important;
          }

          .about-modal-attention {
            animation: aboutModalAttentionPulse 360ms cubic-bezier(0.22, 0.78, 0.22, 1) both !important;
          }

          .about-modal-header {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 13px !important;
            padding: 16px 22px 12px !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.09) !important;
          }

          .about-modal-title-row {
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
            min-width: 0 !important;
          }

          .about-modal-header h2 {
            margin: 0 !important;
            font-family: "Inter Tight", "Inter", "Helvetica Neue", Arial, system-ui, sans-serif !important;
            font-size: 22px !important;
            line-height: 1.02 !important;
            letter-spacing: -0.045em !important;
            font-weight: 780 !important;
            color: #111111 !important;
          }

          .about-modal-close {
            width: 26px !important;
            height: 26px !important;
            border: 0 !important;
            border-radius: 999px !important;
            background: transparent !important;
            color: #111111 !important;
            font-size: 22px !important;
            line-height: 1 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition:
              background 160ms ease,
              transform 160ms ease !important;
          }

          .about-modal-close:hover {
            background: rgba(0, 0, 0, 0.06) !important;
            transform: scale(1.04) !important;
          }

          .about-modal-body {
            padding: 13px 22px 15px !important;
          }

          .about-modal-lead {
            margin: 0 0 11px !important;
            max-width: none !important;
            color: #222222 !important;
            font-size: 12.2px !important;
            line-height: 1.38 !important;
            letter-spacing: -0.01em !important;
            text-align: left !important;
          }

          .about-modal-section {
            padding: 11px 0 !important;
            border-top: 1px solid rgba(0, 0, 0, 0.09) !important;
          }

          .about-modal-section:first-of-type {
            padding-top: 11px !important;
          }

          .about-section-title {
            display: flex !important;
            align-items: center !important;
            gap: 7px !important;
            margin: 0 0 7px !important;
          }

          .about-section-title h3 {
            margin: 0 !important;
            font-family: "Inter Tight", "Inter", "Helvetica Neue", Arial, system-ui, sans-serif !important;
            font-size: 16.5px !important;
            line-height: 1.05 !important;
            letter-spacing: -0.035em !important;
            font-weight: 780 !important;
            color: #111111 !important;
          }

          .about-inline-icon {
            width: 16px !important;
            height: 16px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex: 0 0 16px !important;
          }

          .about-inline-icon svg {
            width: 16px !important;
            height: 16px !important;
            fill: none !important;
            stroke: #111111 !important;
            stroke-width: 1.65 !important;
            stroke-linecap: round !important;
            stroke-linejoin: round !important;
          }

          .about-modal-title-row .about-inline-icon {
            width: 27px !important;
            height: 27px !important;
            flex-basis: 27px !important;
          }

          .about-modal-title-row .about-inline-icon svg {
            width: 27px !important;
            height: 27px !important;
            fill: #111111 !important;
            stroke: none !important;
          }

          .about-modal-section p {
            margin: 0 0 6px !important;
            font-size: 11.65px !important;
            line-height: 1.34 !important;
            color: #1f1f1f !important;
            text-align: justify !important;
            text-justify: inter-word !important;
            hyphens: auto !important;
          }

          .about-modal-section p:last-child {
            margin-bottom: 0 !important;
          }

          .about-modal-section strong {
            font-weight: 790 !important;
            color: #000000 !important;
          }

          .about-keyfacts {
            display: grid !important;
            gap: 0 !important;
            border-top: 1px solid rgba(0, 0, 0, 0.075) !important;
          }

          .about-keyfact-row {
            display: grid !important;
            grid-template-columns: 82px 1fr !important;
            gap: 12px !important;
            padding: 5.5px 0 !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.075) !important;
          }

          .about-keyfact-label {
            font-size: 10.65px !important;
            line-height: 1.25 !important;
            color: #111111 !important;
            font-weight: 790 !important;
          }

          .about-keyfact-value {
            font-size: 10.65px !important;
            line-height: 1.25 !important;
            color: #222222 !important;
          }

          .about-modal-footer {
            display: flex !important;
            align-items: center !important;
            gap: 7px !important;
            padding-top: 11px !important;
            border-top: 1px solid rgba(0, 0, 0, 0.09) !important;
            color: #3a3a3a !important;
            font-size: 10.65px !important;
            line-height: 1.28 !important;
          }

          .about-modal-footer .about-inline-icon {
            width: 14px !important;
            height: 14px !important;
            flex-basis: 14px !important;
          }

          .about-modal-footer .about-inline-icon svg {
            width: 14px !important;
            height: 14px !important;
          }

          @media (max-width: 620px) {
            .about-modal-overlay {
              padding: 16px !important;
            }

            .about-modal {
              width: min(94vw, 530px) !important;
              max-width: 530px !important;
              max-height: 86vh !important;
            }

            .about-modal-header {
              padding: 15px 19px 11px !important;
            }

            .about-modal-body {
              padding: 13px 19px 15px !important;
            }

            .about-keyfact-row {
              grid-template-columns: 76px 1fr !important;
              gap: 10px !important;
            }
          }
        `}
      </style>

      <PageRainOverlay
        active={pageRainActive}
        onDone={() => setPageRainActive(false)}
      />

      {aboutOpen && (
        <div
          className="about-modal-overlay"
          role="presentation"
          onClick={triggerAboutPulse}
        >
          <section
            className={`about-modal ${
              aboutPulse ? "about-modal-attention" : ""
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-project-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="about-modal-header">
              <div className="about-modal-title-row">
                <InlineIcon>
                  <AboutProjectIcon />
                </InlineIcon>

                <h2 id="about-project-title">About project</h2>
              </div>

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
              <p className="about-modal-lead">
                A visual intelligence project mapping publicly visible
                psychedelic drug-development activity.
              </p>

              <section className="about-modal-section">
                <div className="about-section-title">
                  <InlineIcon>
                    <KeyFactsIcon />
                  </InlineIcon>
                  <h3>Key facts</h3>
                </div>

                <div className="about-keyfacts">
                  <div className="about-keyfact-row">
                    <div className="about-keyfact-label">Focus</div>
                    <div className="about-keyfact-value">
                      Biotech and drug-development actors
                    </div>
                  </div>

                  <div className="about-keyfact-row">
                    <div className="about-keyfact-label">Data layer</div>
                    <div className="about-keyfact-value">
                      Registered clinical-trial records + selected company
                      pipeline context
                    </div>
                  </div>

                  <div className="about-keyfact-row">
                    <div className="about-keyfact-label">Scope</div>
                    <div className="about-keyfact-value">
                      Companies, compounds, indications, phases, recruitment
                      status, source visibility
                    </div>
                  </div>

                  <div className="about-keyfact-row">
                    <div className="about-keyfact-label">Not included</div>
                    <div className="about-keyfact-value">
                      Medical advice, treatment recommendations, efficacy
                      claims, investment advice
                    </div>
                  </div>
                </div>
              </section>

              <section className="about-modal-section">
                <div className="about-section-title">
                  <InlineIcon>
                    <MethodologyIcon />
                  </InlineIcon>
                  <h3>Methodology</h3>
                </div>

                <p>
                  The atlas structures information from{" "}
                  <strong>registered clinical-trial activity</strong> and
                  selected <strong>pipeline context</strong> from company
                  materials and credible secondary sources.
                </p>

                <p>
                  Trial data is sourced from <strong>public trial records</strong>{" "}
                  and reflects what is publicly visible at the time of data
                  collection. Pipeline context is treated as visibility context,
                  not as clinical evidence.
                </p>

                <p>
                  The visuals use <strong>different units of analysis</strong>.
                  This keeps registered trials separate from company-reported
                  pipeline claims.
                </p>
              </section>

              <section className="about-modal-section">
                <div className="about-section-title">
                  <InlineIcon>
                    <LimitationsIcon />
                  </InlineIcon>
                  <h3>Limitations</h3>
                </div>

                <p>
                  This atlas is based on <strong>public data</strong> and
                  secondary sources that may be <strong>incomplete</strong>,{" "}
                  <strong>delayed</strong>, duplicated or inconsistently
                  structured.
                </p>

                <p>
                  <strong>Recruitment status</strong> and other trial details can
                  change and should be checked at the original source. Visible
                  activity does not imply efficacy, approval, safety or
                  commercial success.
                </p>
              </section>

              <div className="about-modal-footer">
                <InlineIcon>
                  <CreatorIcon />
                </InlineIcon>

                <div>
                  Created by Kamila Rojek — Data analysis · clinical-trial
                  intelligence · visual storytelling
                </div>
              </div>
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
            <span className="about-project-button-icon">
              <AboutProjectIcon />
            </span>
            <span>About project ▾</span>
          </button>
        </div>

        <ObservableFrame
          title="Psychedelic Trial Atlas Hero"
          visibleHeight={836}
          iframeHeight={930}
          className="hero-frame"
          src={observableSrc.heroSection1}
        />
      </section>

      <section className="story-section visual-story ecosystem-story">
        <ObservableFrame
          title="The Psychedelic Ecosystem"
          visibleHeight={796}
          iframeHeight={900}
          className="ecosystem-frame"
          src={observableSrc.visual1EcosystemOverviev}
        />
      </section>

      <section className="story-section visual-story company-story">
        <ObservableFrame
          title="Company Landscape Premium"
          visibleHeight={736}
          iframeHeight={850}
          className="company-frame"
          src={observableSrc.visual1CompanyLandscapePremium1}
        />
      </section>

      <section className="layout-preload-section" aria-hidden="true">
        <ObservableFrame
          title="Visual Landscape Layout"
          visibleHeight={0}
          iframeHeight={105}
          className="layout-preload-frame"
          src={observableSrc.visualLandscapeLayout}
        />
      </section>

      <section className="story-section visual-story compound-story">
        <ObservableFrame
          title="Compound Activity Landscape"
          visibleHeight={830}
          iframeHeight={990}
          className="compound-frame landscape-frame observable-hard-crop"
          src={observableSrc.visual2Chartminimalistic1a}
          lazyLoad={true}
          onEnter={startPageRain}
        />
      </section>

      <section className="story-section visual-story indication-story">
        <ObservableFrame
          title="Indication Landscape"
          visibleHeight={760}
          iframeHeight={940}
          className="indication-frame landscape-frame observable-hard-crop"
          src={observableSrc.visual3Chart}
        />
      </section>

      <section className="story-section visual-story phase-story">
        <ObservableFrame
          title="Clinical Phase Landscape"
          visibleHeight={700}
          iframeHeight={880}
          className="phase-frame landscape-frame observable-hard-crop"
          src={observableSrc.visual4PhaseChart}
        />
      </section>
    </main>
  );
}
