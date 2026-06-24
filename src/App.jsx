import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

function useViewportSize() {
  const [viewportSize, setViewportSize] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 1440, height: 900 };
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportSize;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

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
        background: "transparent",
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
            left: 18px;
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
        {scrollPercent} %
      </div>
    </>
  );
}

function SectionProgressNav() {
  const sections = useMemo(
    () => [
      {
        id: "start",
        label: "Start",
        selector: ".hero-story"
      },
      {
        id: "ecosystem",
        label: "Ecosystem",
        selector: ".ecosystem-story"
      },
      {
        id: "companies",
        label: "Companies",
        selector: ".company-story"
      },
      {
        id: "compounds",
        label: "Compounds",
        selector: ".compound-story"
      },
      {
        id: "indications",
        label: "Indications",
        selector: ".indication-story"
      },
      {
        id: "phases",
        label: "Phases",
        selector: ".phase-story"
      }
    ],
    []
  );

  const [activeSection, setActiveSection] = useState("start");

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.42;

      let currentSection = sections[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const element = document.querySelector(section.selector);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportAnchor);

        if (rect.top <= viewportAnchor && distance < closestDistance) {
          closestDistance = distance;
          currentSection = section.id;
        }
      });

      const lastSection = sections[sections.length - 1];
      const lastElement = document.querySelector(lastSection.selector);

      if (lastElement) {
        const lastRect = lastElement.getBoundingClientRect();

        if (lastRect.top <= window.innerHeight * 0.68) {
          currentSection = lastSection.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  const handleSectionClick = (selector) => {
    const element = document.querySelector(selector);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <>
      <style>
        {`
          .section-progress-nav {
            position: fixed;
            left: 28px;
            top: 50%;
            z-index: 65;
            transform: translateY(-50%);
            pointer-events: auto;
            font-family: "Inter Tight", "Inter", "Helvetica Neue", Arial, system-ui, sans-serif;
            color: #1d1d1f;
          }

          .section-progress-nav-inner {
            position: relative;
            display: grid;
            gap: 18px;
            padding: 12px 0;
          }

          .section-progress-nav-line {
            position: absolute;
            top: 24px;
            bottom: 24px;
            left: 8px;
            width: 1px;
            background: rgba(29, 29, 31, 0.14);
          }

          .section-progress-nav-item {
            position: relative;
            display: grid;
            grid-template-columns: 18px auto;
            align-items: center;
            gap: 12px;
            min-height: 22px;
            border: 0;
            padding: 0;
            background: transparent;
            color: rgba(29, 29, 31, 0.38);
            cursor: pointer;
            text-align: left;
            transition:
              color 180ms ease,
              transform 180ms ease;
          }

          .section-progress-nav-item:hover {
            color: rgba(29, 29, 31, 0.72);
          }

          .section-progress-nav-dot {
            position: relative;
            z-index: 1;
            width: 8px;
            height: 8px;
            margin-left: 4px;
            border-radius: 999px;
            background: rgba(29, 29, 31, 0.24);
            box-shadow: 0 0 0 6px rgba(241, 240, 236, 0.94);
            transition:
              width 180ms ease,
              height 180ms ease,
              margin-left 180ms ease,
              background 180ms ease,
              box-shadow 180ms ease;
          }

          .section-progress-nav-label {
            position: relative;
            font-size: 13px;
            line-height: 1;
            letter-spacing: -0.02em;
            font-weight: 560;
            white-space: nowrap;
            transition:
              opacity 180ms ease,
              font-weight 180ms ease,
              transform 180ms ease;
          }

          .section-progress-nav-label::before {
            content: "";
            position: absolute;
            left: -48px;
            top: 50%;
            width: 0;
            height: 1px;
            background: rgba(29, 29, 31, 0.82);
            transform: translateY(-50%);
            transition: width 180ms ease;
          }

          .section-progress-nav-item-active {
            color: #1d1d1f;
            transform: translateX(2px);
          }

          .section-progress-nav-item-active .section-progress-nav-dot {
            width: 10px;
            height: 10px;
            margin-left: 3px;
            background: #1d1d1f;
            box-shadow:
              0 0 0 6px rgba(241, 240, 236, 0.96),
              0 6px 18px rgba(29, 29, 31, 0.18);
          }

          .section-progress-nav-item-active .section-progress-nav-label {
            font-size: 14px;
            font-weight: 780;
            letter-spacing: -0.035em;
          }

          .section-progress-nav-item-active .section-progress-nav-label::before {
            width: 28px;
          }

          @media (max-width: 1500px) {
            .section-progress-nav {
              left: 12px;
              transform: translateY(-50%) scale(0.9);
              transform-origin: left center;
            }
          }

          @media (max-width: 1250px) {
            .section-progress-nav {
              left: 10px;
              transform: translateY(-50%) scale(0.84);
              transform-origin: left center;
            }
          }

          @media (max-width: 920px) {
            .section-progress-nav {
              display: none;
            }
          }
        `}
      </style>

      <nav className="section-progress-nav" aria-label="Page sections">
        <div className="section-progress-nav-inner">
          <div className="section-progress-nav-line" aria-hidden="true" />

          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={`section-progress-nav-item ${
                  isActive ? "section-progress-nav-item-active" : ""
                }`}
                onClick={() => handleSectionClick(section.selector)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="section-progress-nav-dot" aria-hidden="true" />
                <span className="section-progress-nav-label">
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function normalizeUrlLabel(url) {
  return String(url || "")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/g, "");
}

function CompanyExternalPanel({ selectedCompany, onClose }) {
  if (!selectedCompany) return null;

  const listToText = (value, fallback = "Insufficient data to verify") => {
    if (!Array.isArray(value) || value.length === 0) return fallback;
    return value.filter(Boolean).join(", ");
  };

  const websites = Array.isArray(selectedCompany.websites)
    ? selectedCompany.websites
    : Array.isArray(selectedCompany.website)
      ? selectedCompany.website
      : [];

  const trials = Array.isArray(selectedCompany.trials)
    ? selectedCompany.trials
    : [];

  const visibleActivity =
    selectedCompany.visibleActivity ??
    selectedCompany.activityUnits ??
    0;

  const registeredTrials = selectedCompany.registeredUnits ?? 0;
  const pipelineContext = selectedCompany.pipelineUnits ?? 0;

  return (
    <>
      <button
        className="company-external-panel-floating-close"
        type="button"
        onClick={onClose}
        aria-label="Close company details"
      >
        ×
      </button>

      <aside
        className="company-external-panel"
        aria-label={`${selectedCompany.company || "Company"} details`}
      >
        <div className="company-external-panel-inner">
          {selectedCompany.logoUrl && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: "8px"
              }}
            >
              <div
                className="company-external-panel-logo"
                style={{
                  width: "48px",
                  height: "48px",
                  margin: 0
                }}
              >
                <img
                  src={selectedCompany.logoUrl}
                  alt={`${selectedCompany.company || "Company"} logo`}
                />
              </div>
            </div>
          )}

          <div className="company-external-panel-header">
            <div>
              <h3 className="company-external-panel-title">
                {selectedCompany.company || "Company"}
              </h3>

              <div className="company-external-panel-subtitle">
                {selectedCompany.hasRegistered
                  ? "Company with public registered trial activity"
                  : "Company visible through pipeline or context sources"}
              </div>

              {websites.length > 0 && (
                <div className="company-external-panel-websites">
                  {websites.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {normalizeUrlLabel(url)}
                    </a>
                  ))}
                </div>
              )}

              {websites.length === 0 && selectedCompany.noVerifiedWebsite && (
                <div className="company-external-panel-subtitle">
                  No official website verified
                </div>
              )}
            </div>
          </div>

          <div className="company-external-panel-metrics company-external-panel-metrics-stacked">
            <div className="company-external-panel-metric company-external-panel-metric-total">
              <div className="company-external-panel-metric-number">
                {visibleActivity}
              </div>
              <div className="company-external-panel-metric-label">
                Visible activity
              </div>
              <div className="company-external-panel-metric-note">
                Registered trials + pipeline context
              </div>
            </div>

            <div className="company-external-panel-metric-row">
              <div className="company-external-panel-metric company-external-panel-metric-half">
                <div className="company-external-panel-metric-number">
                  {registeredTrials}
                </div>
                <div className="company-external-panel-metric-label">
                  Registered trials
                </div>
              </div>

              <div className="company-external-panel-metric company-external-panel-metric-half">
                <div className="company-external-panel-metric-number">
                  {pipelineContext}
                </div>
                <div className="company-external-panel-metric-label">
                  Pipeline context
                </div>
              </div>
            </div>
          </div>

          <div className="company-external-panel-section">
            <div className="company-external-panel-kicker">Assets</div>
            <div className="company-external-panel-value">
              {listToText(selectedCompany.assets)}
            </div>
          </div>

          <div className="company-external-panel-section">
            <div className="company-external-panel-kicker">
              Compound families
            </div>
            <div className="company-external-panel-value">
              {listToText(selectedCompany.families)}
            </div>
          </div>

          <div className="company-external-panel-section">
            <div className="company-external-panel-kicker">
              Therapeutic areas
            </div>
            <div className="company-external-panel-value">
              {listToText(selectedCompany.indications)}
            </div>
          </div>

          {selectedCompany.hasRegistered && (
            <div className="company-external-panel-section">
              <div className="company-external-panel-kicker">Countries</div>
              <div className="company-external-panel-value">
                {listToText(selectedCompany.countries)}
              </div>
            </div>
          )}

          {trials.length > 0 && (
            <div className="company-external-panel-section">
              <div className="company-external-panel-kicker">Trial IDs</div>
              <div className="company-external-panel-value company-external-panel-trials">
                {trials.map((trial) =>
                  trial.url ? (
                    <a
                      key={`${trial.id}-${trial.url}`}
                      href={trial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {trial.id}
                    </a>
                  ) : (
                    <span key={trial.id}>{trial.id}</span>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default function App() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutPulse, setAboutPulse] = useState(false);
  const [pageRainActive, setPageRainActive] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const pageRainStartedRef = useRef(false);
  const aboutPulseTimerRef = useRef(null);

  const frameHeights = useMemo(() => {
    if (viewportWidth <= 900) {
      return {
        heroVisible: 820,
        heroIframe: 930,
        ecosystemVisible: 796.34375,
        ecosystemIframe: 796.34375,
        companyVisible: 776.078125,
        companyIframe: 776.078125,
        compoundVisible: 820,
        compoundIframe: 960,
        indicationVisible: 800,
        indicationIframe: 930,
        phaseVisible: 800,
        phaseIframe: 930
      };
    }

    const heroVisible = clampNumber(viewportHeight * 0.76, 600, 740);
    const ecosystemVisible = 796.34375;
    const companyVisible = 776.078125;
    const compoundVisible = clampNumber(viewportHeight * 0.8, 660, 820);
    const indicationVisible = clampNumber(viewportHeight * 0.8, 660, 800);
    const phaseVisible = clampNumber(viewportHeight * 0.8, 660, 800);

    return {
      heroVisible,
      heroIframe: heroVisible + 105,

      ecosystemVisible,
      ecosystemIframe: 796.34375,

      companyVisible,
      companyIframe: 776.078125,

      compoundVisible,
      compoundIframe: compoundVisible + 120,

      indicationVisible,
      indicationIframe: indicationVisible + 115,

      phaseVisible,
      phaseIframe: phaseVisible + 115
    };
  }, [viewportWidth, viewportHeight]);

  const mainApiKey = "515f6c33729f1bf487d1dbfd16abac4e81acfbd2";
  const mainNotebook = "e3028f2577c04f9a@1210";

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
    const handleCompanyMessage = (event) => {
      const message = event.data;

      if (!message || message.type !== "UNICORN_COMPANY_SELECTED") return;

      setSelectedCompany(message.payload || null);
    };

    window.addEventListener("message", handleCompanyMessage);

    return () => {
      window.removeEventListener("message", handleCompanyMessage);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (aboutPulseTimerRef.current) {
        window.clearTimeout(aboutPulseTimerRef.current);
      }
    };
  }, []);

  const observableSrc = useMemo(
    () => ({
      heroSection1: `https://observablehq.com/embed/${mainNotebook}?cells=heroSection1&api_key=${mainApiKey}`,

      visual1EcosystemOverviev: `https://observablehq.com/embed/e3028f2577c04f9a@1223?cells=visual1EcosystemOverviev&api_key=d7fef968784b35d048ae7ced9ccc3258c6778b29`,

      visual1CompanyLandscapePremium1: `https://observablehq.com/embed/e3028f2577c04f9a@1224?cells=visual1CompanyLandscapePremium1&api_key=d7fef968784b35d048ae7ced9ccc3258c6778b29`,

      visual2Chartminimalistic1a: `https://observablehq.com/embed/e3028f2577c04f9a@1216?cells=visual2Chartminimalistic1&api_key=515f6c33729f1bf487d1dbfd16abac4e81acfbd2`,

      visual3Chart: `https://observablehq.com/embed/e3028f2577c04f9a@1216?cells=visual3Chart&api_key=515f6c33729f1bf487d1dbfd16abac4e81acfbd2`,

      visual4PhaseChart: `https://observablehq.com/embed/e3028f2577c04f9a@1216?cells=visual4PhaseChart&api_key=515f6c33729f1bf487d1dbfd16abac4e81acfbd2`
    }),
    [mainNotebook, mainApiKey]
  );

  return (
    <main className="site">
      <ScrollProgressBar />
      <SectionProgressNav />

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
                  Created by Kamila Rojek · Data analysis · clinical-trial
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
          visibleHeight={frameHeights.heroVisible}
          iframeHeight={frameHeights.heroIframe}
          className="hero-frame"
          src={observableSrc.heroSection1}
        />
      </section>

      <section className="story-section visual-story ecosystem-story">
        <ObservableFrame
          title="The Psychedelic Ecosystem"
          visibleHeight={frameHeights.ecosystemVisible}
          iframeHeight={frameHeights.ecosystemIframe}
          className="ecosystem-frame"
          src={observableSrc.visual1EcosystemOverviev}
        />
      </section>

      <section className="story-section visual-story company-story">
        <div
          className={`company-visual-shell ${
            selectedCompany ? "company-visual-shell-panel-open" : ""
          }`}
        >
          <ObservableFrame
            title="Company Landscape Premium"
            visibleHeight={frameHeights.companyVisible}
            iframeHeight={frameHeights.companyIframe}
            className="company-frame"
            src={observableSrc.visual1CompanyLandscapePremium1}
          />

          <CompanyExternalPanel
            selectedCompany={selectedCompany}
            onClose={() => setSelectedCompany(null)}
          />
        </div>
      </section>

      <section className="story-section visual-story compound-story">
        <ObservableFrame
          title="Compound Activity Landscape"
          visibleHeight={frameHeights.compoundVisible}
          iframeHeight={frameHeights.compoundIframe}
          className="compound-frame landscape-frame"
          src={observableSrc.visual2Chartminimalistic1a}
          lazyLoad={true}
          onEnter={startPageRain}
        />
      </section>

      <section className="story-section visual-story indication-story">
        <ObservableFrame
          title="Indication Landscape"
          visibleHeight={frameHeights.indicationVisible}
          iframeHeight={frameHeights.indicationIframe}
          className="indication-frame landscape-frame"
          src={observableSrc.visual3Chart}
        />
      </section>

      <section className="story-section visual-story phase-story">
        <ObservableFrame
          title="Clinical Phase Landscape"
          visibleHeight={frameHeights.phaseVisible}
          iframeHeight={frameHeights.phaseIframe}
          className="phase-frame landscape-frame"
          src={observableSrc.visual4PhaseChart}
        />
      </section>
    </main>
  );
}
