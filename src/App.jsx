import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const OBSERVABLE_ORIGIN = "https://observablehq.com";
const ATLAS_VERSION = "August 2026";
const CONTACT_EMAIL = "kamila.rojek@gmail.com";
const LINKEDIN_PROFILE = "https://www.linkedin.com/in/kamilarojek/";

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

function AtlasSectionIntro({ id, title, children }) {
  return (
    <div className="atlas-section-intro" id={id}>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function ObservableFrame({
  title,
  visibleHeight,
  iframeHeight,
  className,
  src
}) {
  return (
    <div
      className={`iframe-crop ${className || ""}`}
      style={{
        height: `${visibleHeight}px`,
        background: "transparent",
        overflow: "hidden"
      }}
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
      { id: "start", label: "Start", selector: ".hero-story" },
      { id: "ecosystem", label: "Ecosystem & Companies", selector: ".ecosystem-story" },
      { id: "compounds", label: "Compounds", selector: ".compound-story" },
      { id: "indications", label: "Indications", selector: ".indication-story" },
      { id: "phases", label: "Phases", selector: ".phase-story" }
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

function encodeJsonForUrl(value) {
  return encodeURIComponent(JSON.stringify(value));
}

function CompanyExternalPanel({
  selectedCompany,
  onClose,
  onCompare,
  showCompareButton = false,
  compareModeActive = false,
  isComparePanel = false,
  isComparisonActive = false
}) {
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

  const panelClassName = [
    "company-external-panel",
    isComparePanel ? "company-external-panel-compare" : "",
    isComparisonActive ? "company-external-panel-comparison-active" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const trialListClassName = [
    "company-external-panel-value",
    "company-external-panel-trials",
    "company-external-panel-trials-scroll",
    trials.length >= 12 ? "company-external-panel-trials-many" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        className={`company-external-panel-floating-close ${
          isComparePanel ? "company-external-panel-floating-close-compare" : ""
        }`}
        type="button"
        onClick={onClose}
        aria-label={
          isComparePanel
            ? "Close compared company details"
            : "Close company details"
        }
      >
        ×
      </button>

      {showCompareButton && !isComparePanel && (
        <button
          className={`company-external-panel-compare-button ${
            compareModeActive
              ? "company-external-panel-compare-button-active"
              : ""
          }`}
          type="button"
          onClick={onCompare}
        >
          {compareModeActive ? "Select another company" : "+ Compare company"}
        </button>
      )}

      <aside
        className={panelClassName}
        aria-label={`${selectedCompany.company || "Company"} details`}
        data-comparison-active={isComparisonActive ? "true" : "false"}
      >
        <div className="company-external-panel-inner">
          <div className="company-external-panel-top-lock">
            <div className="company-external-panel-logo-row">
              <div
                className={`company-external-panel-logo-slot ${
                  selectedCompany.logoUrl
                    ? "company-external-panel-logo-slot-filled"
                    : "company-external-panel-logo-slot-empty"
                }`}
              >
                {selectedCompany.logoUrl && (
                  <div className="company-external-panel-logo">
                    <img
                      src={selectedCompany.logoUrl}
                      alt={`${selectedCompany.company || "Company"} logo`}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="company-external-panel-header">
              <div>
                <h3
                  className="company-external-panel-title"
                  title={selectedCompany.company || "Company"}
                >
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
                        title={normalizeUrlLabel(url)}
                      >
                        {normalizeUrlLabel(url)}
                      </a>
                    ))}
                  </div>
                )}

                {websites.length === 0 && selectedCompany.noVerifiedWebsite && (
                  <div className="company-external-panel-subtitle company-external-panel-website-fallback">
                    No official website verified
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="company-external-panel-content-grid">
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

            <div
              className="company-external-panel-section company-external-panel-section-assets"
              data-panel-section="assets"
            >
              <div className="company-external-panel-kicker">Assets</div>
              <div className="company-external-panel-value">
                {listToText(selectedCompany.assets)}
              </div>
            </div>

            <div
              className="company-external-panel-section company-external-panel-section-families"
              data-panel-section="families"
            >
              <div className="company-external-panel-kicker">
                Compound families
              </div>
              <div className="company-external-panel-value">
                {listToText(selectedCompany.families)}
              </div>
            </div>

            <div
              className="company-external-panel-section company-external-panel-section-areas"
              data-panel-section="areas"
            >
              <div className="company-external-panel-kicker">
                Therapeutic areas
              </div>
              <div className="company-external-panel-value">
                {listToText(selectedCompany.indications)}
              </div>
            </div>

            <div
              className="company-external-panel-section company-external-panel-section-countries"
              data-panel-section="countries"
            >
              <div className="company-external-panel-kicker">Countries</div>
              <div className="company-external-panel-value">
                {selectedCompany.hasRegistered
                  ? listToText(selectedCompany.countries)
                  : "No registered trial countries"}
              </div>
            </div>

            <div
              className="company-external-panel-section company-external-panel-section-trials"
              data-panel-section="trials"
              data-trial-count={trials.length}
            >
              <div className="company-external-panel-kicker">Trial IDs</div>
              <div className={trialListClassName}>
                {trials.length > 0 ? (
                  trials.map((trial) =>
                    trial.url ? (
                      <a
                        key={`${trial.id}-${trial.url}`}
                        href={trial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={trial.id}
                      >
                        {trial.id}
                      </a>
                    ) : (
                      <span key={trial.id} title={trial.id}>
                        {trial.id}
                      </span>
                    )
                  )
                ) : (
                  <span className="company-external-panel-empty-value">
                    No public registered trial IDs
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function App() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutPulse, setAboutPulse] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [compareCompany, setCompareCompany] = useState(null);
  const [compareMode, setCompareMode] = useState(false);

  const aboutPulseTimerRef = useRef(null);
  const compareModeRef = useRef(false);
  const aboutButtonRef = useRef(null);
  const aboutDialogRef = useRef(null);

  const frameHeights = useMemo(() => {
    if (viewportWidth <= 900) {
      return {
        heroVisible: 820,
        heroIframe: 930,
        ecosystemCompanyVisible: 860,
        ecosystemCompanyIframe: 860,
        compoundIntroVisible: 820,
        compoundIntroIframe: 820,
        compoundVisible: 598,
        compoundIframe: 598,
        indicationIntroVisible: 945,
        indicationIntroIframe: 945,
        indicationVisible: 880,
        indicationIframe: 1033,
        phaseIntroVisible: 1006.15625,
        phaseIntroIframe: 1006.15625,
        phaseVisible: 741,
        phaseIframe: 980
      };
    }

    const heroVisible = clampNumber(viewportHeight * 0.76, 600, 740);
    const ecosystemCompanyVisible = 860;
    const compoundIntroVisible = 820;
    const compoundVisible = 880;
    const indicationIntroVisible = 945;
    const indicationVisible = 880;
    const phaseIntroVisible = 1006.15625;
    const phaseVisible = 741;

    return {
      heroVisible,
      heroIframe: heroVisible + 105,

      ecosystemCompanyVisible,
      ecosystemCompanyIframe: 860,

      compoundIntroVisible,
      compoundIntroIframe: 820,

      compoundVisible,
      compoundIframe: 1514,

      indicationIntroVisible,
      indicationIntroIframe: 945,

      indicationVisible,
      indicationIframe: 1033,

      phaseIntroVisible,
      phaseIntroIframe: 1006.15625,

      phaseVisible,
      phaseIframe: 980
    };
  }, [viewportWidth, viewportHeight]);

  const mainApiKey = "515f6c33729f1bf487d1dbfd16abac4e81acfbd2";
  const mainNotebook = "e3028f2577c04f9a@1251";

  const githubLogoBase = "https://psychedelic-trial-atlas.vercel.app/logos/";
  const logoTuningVersion = "visual1b-logo-tuning-2026-06-24-full-logo-list";

  const logoVisualScale = {
    "2A_biosciences.png": 2,
    "algernon.png": 2,
    "amandala_neuro.png": 2,
    "apex_labs.png": 2.5,
    "arcadia_medicine.png": 1.7,
    "arcadiamedicine.png": 1.7,
    "asri.png": 2,
    "ataibeckley.png": 1.95,
    "beond.png": 1.4,
    "betterlife_pharma.png": 1.5,
    "biocase_brasil.png": 2,
    "biomia.png": 1.6,
    "biomind_labs.png": 1.6,
    "bright_minds.png": 2.15,
    "celon_pharma.png": 2,
    "ceruvia_lifesciences.png": 1,
    "chiral_biotech_pharma.png": 1.6,
    "clearmind_medicine.png": 1.8,
    "clexio_biosciences.png": 2.1,
    "collaborations_pharmaceuticals.png": 1.55,
    "compass_pathways.png": 1.6,
    "definium.png": 2.2,
    "delix_therapeutics.png": 2,
    "demerx.png": 2.15,
    "diamond_therapeutics.png": 1.5,
    "eleusis_therapeutics.png": 1.7,
    "elkedonia.png": 1.6,
    "empower_research.png": 1.7,
    "entheon_biomedical.png": 1,
    "entheon_biomedical.svg": 1,
    "entropy_neurodynamics.png": 1.55,
    "enveric_biosciences.png": 1,
    "equulus_therapeutics.png": 1.55,
    "filament_health.png": 1.8,
    "freedom_biosciences.png": 1.65,
    "gh_research.png": 1.3,
    "gilgamesh_pharma.png": 2,
    "goodmind_therapeutics.png": 1.55,
    "halucenex_life_sciences.png": 1.5,
    "helus.png": 1.3,
    "helus_pharma.png": 1.3,
    "igc_pharma.png": 1.55,
    "incannex.png": 2.2,
    "janssen_logo.png": 1.6,
    "johnson_johnson_innovative_medicine.png": 1.5,
    "ketabon.png": 1.6,
    "kuleon.svg": 1.55,
    "lophora.png": 1.8,
    "marvel_biosciences.png": 1.45,
    "mindstate_design_labs.png": 1.55,
    "negev_labs.png": 1.55,
    "neurala_biosciences.png": 1.55,
    "neurala_biosciences.svg": 1.55,
    "neurocentrx.png": 1.55,
    "nrx_pharmaceuticals.png": 1.2,
    "ocellaris.png": 1.55,
    "otsuka_mindset_pharma.png": 2,
    "perception_neuroscience.png": 1.55,
    "pharmadrug.png": 1,
    "pharmala_biotech.png": 2.5,
    "psilera.png": 1.5,
    "psy_therapeutics.png": 1.55,
    "psyence_biomed_psyence_australia.png": 1.45,
    "reconnect.png": 1.55,
    "remedi_therapeutics.png": 1.55,
    "reset_mind_science.png": 1.55,
    "resilient_pharmaceuticals.png": 2,
    "reunion_neuroscience.png": 2,
    "seaport_therapeutics.png": 1.5,
    "solvonis_therapeutics.png": 2,
    "soneira.png": 1.55,
    "tactogen.png": 2,
    "tasman_therapeutics.png": 1.45,
    "terran_biosciences.png": 2,
    "transcend_therapeutics_otsuka.png": 2.15,
    "transneural_therapeutics.png": 1.55,
    "tryp_therapeutics_tryptamine_therapeutics.png": 1.45,
    "universal_ibogaine.png": 2,
    "usona_institute.png": 1.55,
    "va_office_of_research_and_development.png": 1.35,
    "veracruz_brasil_instituto_veracruz.png": 1.35,
    "xylo.png": 1.85
  };

  const logoHoverScale = {
    "2A_biosciences.png": 1,
    "algernon.png": 1,
    "amandala_neuro.png": 1,
    "apex_labs.png": 1,
    "arcadia_medicine.png": 1,
    "arcadiamedicine.png": 1,
    "asri.png": 3,
    "ataibeckley.png": 1,
    "beond.png": 1,
    "betterlife_pharma.png": 1,
    "biocase_brasil.png": 1,
    "biomia.png": 1,
    "biomind_labs.png": 0.7,
    "bright_minds.png": 1,
    "celon_pharma.png": 1,
    "ceruvia_lifesciences.png": 1,
    "chiral_biotech_pharma.png": 1,
    "clearmind_medicine.png": 1,
    "clexio_biosciences.png": 1,
    "collaborations_pharmaceuticals.png": 1,
    "compass_pathways.png": 1,
    "definium.png": 1,
    "delix_therapeutics.png": 1,
    "demerx.png": 1,
    "diamond_therapeutics.png": 1,
    "eleusis_therapeutics.png": 1,
    "elkedonia.png": 1,
    "empower_research.png": 1,
    "entheon_biomedical.svg": 1,
    "entropy_neurodynamics.png": 1,
    "enveric_biosciences.png": 1,
    "equulus_therapeutics.png": 1,
    "filament_health.png": 1,
    "freedom_biosciences.png": 1,
    "gh_research.png": 0.288,
    "gilgamesh_pharma.png": 1.4,
    "goodmind_therapeutics.png": 1,
    "halucenex_life_sciences.png": 1,
    "helus.png": 1,
    "igc_pharma.png": 1,
    "incannex.png": 1,
    "janssen_logo.png": 0.8,
    "johnson_johnson_innovative_medicine.png": 1,
    "ketabon.png": 1,
    "kuleon.png": 1,
    "lophora.png": 1,
    "marvel_biosciences.png": 1,
    "mindstate_design_labs.png": 1,
    "negev_labs.png": 1,
    "neurala_biosciences.png": 1,
    "neurala_biosciences.svg": 1,
    "neurocentrx.png": 1,
    "nrx_pharmaceuticals.png": 1,
    "ocellaris.png": 1,
    "otsuka_mindset_pharma.png": 1,
    "perception_neuroscience.png": 1,
    "pharmadrug.png": 1,
    "pharmala_biotech.png": 1,
    "psilera.png": 1,
    "psy_therapeutics.png": 1,
    "psyence_biomed_psyence_australia.png": 1,
    "reconnect.png": 1,
    "remedi_therapeutics.png": 1,
    "reset_mind_science.png": 1,
    "resilient_pharmaceuticals.png": 1,
    "reunion_neuroscience.png": 1,
    "seaport_therapeutics.png": 1,
    "solvonis_therapeutics.png": 1,
    "soneira.png": 1,
    "tactogen.png": 1,
    "tasman_therapeutics.png": 1,
    "terran_biosciences.png": 1,
    "transcend_therapeutics_otsuka.png": 1,
    "transneural_therapeutics.png": 1,
    "tryp_therapeutics_tryptamine_therapeutics.png": 1,
    "universal_ibogaine.png": 1,
    "usona_institute.png": 1,
    "va_office_of_research_and_development.png": 1,
    "veracruz_brasil_instituto_veracruz.png": 1,
    "xylo.png": 1
  };

  const heroResponsiveMode =
    viewportWidth <= 767
      ? "mobile"
      : viewportWidth <= 1024
        ? "tablet"
        : viewportWidth <= 1400 || viewportHeight <= 820
          ? "laptop"
          : "desktop";

  const heroResponsiveParams = `&heroMode=${encodeURIComponent(
    heroResponsiveMode
  )}&hostWidth=${viewportWidth}&hostHeight=${viewportHeight}`;

  const visual1CompanyLandscapeParams = `&logoBase=${encodeURIComponent(
    githubLogoBase
  )}&logoTuningVersion=${encodeURIComponent(
    logoTuningVersion
  )}&logoVisualScale=${encodeJsonForUrl(
    logoVisualScale
  )}&logoHoverScale=${encodeJsonForUrl(logoHoverScale)}`;

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

  const setCompareModeStable = (active) => {
    compareModeRef.current = !!active;
    setCompareMode(!!active);
  };

  const getCompanyIframe = () => {
    return document.querySelector(
      'iframe[title="Company Landscape Premium"]'
    );
  };

  const postToCompanyIframe = (message) => {
    const iframe = getCompanyIframe();

    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(message, "*");
  };

  const postCompareModeToObservable = (active) => {
    postToCompanyIframe({
      type: "UNICORN_COMPARE_SELECTION_MODE",
      active: !!active
    });
  };

  const clearObservableCompanyState = () => {
    postToCompanyIframe({
      type: "UNICORN_COMPANY_CLEAR"
    });
  };

  const clearObservableCompareState = () => {
    postToCompanyIframe({
      type: "UNICORN_COMPARE_CLEAR"
    });
  };

  const handleCompareStart = () => {
    if (!selectedCompany) return;
    if (compareCompany) return;

    const nextMode = !compareModeRef.current;

    setCompareModeStable(nextMode);
    postCompareModeToObservable(nextMode);
  };

  const handlePrimaryClose = () => {
    setSelectedCompany(null);
    setCompareCompany(null);
    setCompareModeStable(false);
    clearObservableCompanyState();
  };

  const handleCompareClose = () => {
    setCompareCompany(null);
    setCompareModeStable(false);
    clearObservableCompareState();
  };

  useEffect(() => {
    const handleCompanyMessage = (event) => {
      const message = event.data;

      if (!message || typeof message !== "object") return;

      if (
        message.type !== "UNICORN_COMPANY_SELECTED" &&
        message.type !== "UNICORN_COMPANY_COMPARE_SELECTED" &&
        message.type !== "UNICORN_COMPARE_SELECTION_MODE_ACK"
      ) {
        return;
      }

      if (message.type === "UNICORN_COMPARE_SELECTION_MODE_ACK") {
        return;
      }

      if (message.type === "UNICORN_COMPANY_COMPARE_SELECTED") {
        const payload = message.payload || null;

        if (!payload) {
          setCompareCompany(null);
          setCompareModeStable(false);
          return;
        }

        setCompareCompany(payload);
        setCompareModeStable(false);
        postCompareModeToObservable(false);
        return;
      }

      const payload = message.payload || null;

      if (!payload) {
        setSelectedCompany(null);
        setCompareCompany(null);
        setCompareModeStable(false);
        return;
      }

      if (
        payload.compareSlot === "compare" ||
        compareModeRef.current
      ) {
        setCompareCompany(payload);
        setCompareModeStable(false);
        postCompareModeToObservable(false);
        return;
      }

      setSelectedCompany(payload);

      if (!compareCompany) {
        setCompareCompany(null);
      }

      setCompareModeStable(false);
      postCompareModeToObservable(false);
    };

    window.addEventListener("message", handleCompanyMessage);

    return () => {
      window.removeEventListener("message", handleCompanyMessage);
    };
  }, [compareCompany]);

  useEffect(() => {
    return () => {
      if (aboutPulseTimerRef.current) {
        window.clearTimeout(aboutPulseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!aboutOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setAboutOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    window.setTimeout(() => aboutDialogRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      aboutButtonRef.current?.focus();
    };
  }, [aboutOpen]);

  const observableSrc = useMemo(
    () => ({
      heroSection1: `https://observablehq.com/embed/${mainNotebook}?cells=heroSection1&api_key=${mainApiKey}${heroResponsiveParams}`,

      visual1EcosystemAndCompanyLandscape: `https://observablehq.com/embed/e3028f2577c04f9a@1322?cells=visual1EcosystemAndCompanyLandscape&api_key=c2ed9200f4ef0822a182827583e1886ad995b7b5${visual1CompanyLandscapeParams}`,

      visual2IntroTransition: `https://observablehq.com/embed/e3028f2577c04f9a@1307?cells=visual2IntroTransition&api_key=2488895c619fa293677a0791309b410e6db31cb6`,
      
      visual2ChartUnitColumns1: `https://observablehq.com/embed/e3028f2577c04f9a@1307?cells=visual2ChartUnitColumns1&api_key=2488895c619fa293677a0791309b410e6db31cb6`,

      visual3IntroTransition: `https://observablehq.com/embed/e3028f2577c04f9a@1307?cells=visual3IntroTransition&api_key=2488895c619fa293677a0791309b410e6db31cb6`,

      visual3Chart: `https://observablehq.com/embed/e3028f2577c04f9a@1307?cells=visual3Chart&api_key=715f3cbfdfce0e9356d08d20a074b04d91101685`,

      visual4IntroTransition: `https://observablehq.com/embed/e3028f2577c04f9a@1307?cells=visual4IntroTransition&api_key=2488895c619fa293677a0791309b410e6db31cb6`,

      visual4PhaseChart: `https://observablehq.com/embed/e3028f2577c04f9a@1307?cells=visual4PhaseChart&api_key=85cae8d02263045c184f5e4a5369f63938945a3e`
    }),
    [mainNotebook, mainApiKey, visual1CompanyLandscapeParams, heroResponsiveParams]
  );

  const hasComparePanels = !!selectedCompany && !!compareCompany;

  return (
    <main className="site">
      <ScrollProgressBar />
      <SectionProgressNav />

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
            tabIndex="-1"
            ref={aboutDialogRef}
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
                Psychedelic Trial Atlas is an interactive view of publicly
                visible psychedelic drug-development activity across companies,
                compounds, indications and clinical phases.
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
                  Created by{" "}
                  <a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer">
                    Kamila Rojek
                  </a>{" "}
                  · Data analysis · clinical-trial
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
            ref={aboutButtonRef}
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
        <div
          className={`company-visual-shell ${
            selectedCompany ? "company-visual-shell-panel-open" : ""
          } ${compareCompany ? "company-visual-shell-compare-open" : ""}`}
        >
          <ObservableFrame
            title="Company Landscape Premium"
            visibleHeight={frameHeights.ecosystemCompanyVisible}
            iframeHeight={frameHeights.ecosystemCompanyIframe}
            className="ecosystem-company-frame"
            src={observableSrc.visual1EcosystemAndCompanyLandscape}
          />

          <CompanyExternalPanel
            selectedCompany={selectedCompany}
            onClose={handlePrimaryClose}
            onCompare={handleCompareStart}
            showCompareButton={!!selectedCompany && !compareCompany}
            compareModeActive={compareMode}
            isComparisonActive={hasComparePanels}
          />

          <CompanyExternalPanel
            selectedCompany={compareCompany}
            onClose={handleCompareClose}
            isComparePanel={true}
            isComparisonActive={hasComparePanels}
          />
        </div>
      </section>

      <section className="story-section visual-story compound-intro-story">
        <ObservableFrame
          title="Compound Activity Landscape Introduction"
          visibleHeight={frameHeights.compoundIntroVisible}
          iframeHeight={frameHeights.compoundIntroIframe}
          className="compound-intro-frame"
          src={observableSrc.visual2IntroTransition}
        />
      </section>

      <section className="story-section visual-story compound-story">
        <AtlasSectionIntro id="compounds-overview" title="Compound Activity Landscape">
          Compare included activity across compound families. Filled and hollow
          circles distinguish registered trials from contextual pipeline activity.
        </AtlasSectionIntro>

        <ObservableFrame
          title="Compound Activity Landscape"
          visibleHeight={frameHeights.compoundVisible}
          iframeHeight={frameHeights.compoundIframe}
          className="compound-frame landscape-frame"
          src={observableSrc.visual2ChartUnitColumns1}
        />
      </section>

      <section className="story-section visual-story indication-intro-story">
        <ObservableFrame
          title="Indication Landscape Introduction"
          visibleHeight={frameHeights.indicationIntroVisible}
          iframeHeight={frameHeights.indicationIntroIframe}
          className="indication-intro-frame"
          src={observableSrc.visual3IntroTransition}
        />
      </section>

      <section className="story-section visual-story indication-story">
        <AtlasSectionIntro id="indications-overview" title="Indication Landscape">
          See how included trials are distributed across therapeutic indications
          and compound families.
        </AtlasSectionIntro>

        <ObservableFrame
          title="Indication Landscape"
          visibleHeight={frameHeights.indicationVisible}
          iframeHeight={frameHeights.indicationIframe}
          className="indication-frame landscape-frame"
          src={observableSrc.visual3Chart}
        />
      </section>

      <section className="story-section visual-story phase-intro-story">
        <ObservableFrame
          title="Clinical Phase Landscape Introduction"
          visibleHeight={frameHeights.phaseIntroVisible}
          iframeHeight={frameHeights.phaseIntroIframe}
          className="phase-intro-frame"
          src={observableSrc.visual4IntroTransition}
        />
      </section>

      <section className="story-section visual-story phase-story">
        <AtlasSectionIntro id="phases-overview" title="Clinical Phase Landscape">
          Review where visible registered trial activity appears across the
          clinical development pathway.
        </AtlasSectionIntro>

        <ObservableFrame
          title="Clinical Phase Landscape"
          visibleHeight={frameHeights.phaseVisible}
          iframeHeight={frameHeights.phaseIframe}
          className="phase-frame landscape-frame"
          src={observableSrc.visual4PhaseChart}
        />
      </section>

      <section className="atlas-information-section atlas-information-compact" id="methodology" aria-labelledby="methodology-title">
        <p className="atlas-eyebrow">Methodology</p>
        <h2 id="methodology-title">How the Atlas is built</h2>
        <p>
          The Atlas structures public registered clinical-trial records and
          selected company pipeline context. Trial records show what is
          publicly registered. Pipeline context provides visibility context and
          is not clinical evidence.
        </p>
        <p>
          Public data can be incomplete, delayed, duplicated or structured
          inconsistently. Recruitment status and trial details may change and
          should be checked against the original record.
        </p>
      </section>

      <section className="atlas-information-section atlas-information-compact" id="cite" aria-labelledby="cite-title">
        <p className="atlas-eyebrow">Citation</p>
        <h2 id="cite-title">Cite this project</h2>
        <p className="atlas-citation">
          Rojek, Kamila. <em>Psychedelic Trial Atlas</em>. Interactive
          public-source data analysis. Site version {ATLAS_VERSION}.
        </p>
        <p>
          When referring to a specific view, include its URL and the date you
          accessed it.
        </p>
      </section>

      <section className="atlas-information-section atlas-information-compact" id="about" aria-labelledby="about-title">
        <p className="atlas-eyebrow">About</p>
        <h2 id="about-title">Data analysis for complex public-source healthcare data</h2>
        <p>
          The project combines data cleaning, data modelling, methodology
          design, data quality review, clinical-trial data analysis and
          interactive visualization.
        </p>
        <p className="atlas-skills">
          Observable · React · SQL · Python · Power BI
        </p>
      </section>

      <section className="atlas-information-section atlas-information-compact atlas-contact-section" id="contact" aria-labelledby="contact-title">
        <p className="atlas-eyebrow">Contact</p>
        <h2 id="contact-title">Work with me</h2>
        <p>
          Available for data analytics, research intelligence and visualization
          opportunities.
        </p>
        <a className="atlas-contact-link" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </section>
    </main>
  );
}
