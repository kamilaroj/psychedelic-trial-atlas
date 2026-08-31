import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const ATLAS_VERSION = "August 2026";
const CONTACT_EMAIL = "kamila.rojek@gmail.com";
const LINKEDIN_PROFILE = "https://www.linkedin.com/in/kamilarojek/";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "companies", label: "Companies" },
  { id: "compounds", label: "Compounds" },
  { id: "indications", label: "Indications" },
  { id: "phases", label: "Phases" },
  { id: "methodology", label: "Methodology" },
  { id: "about", label: "About" }
];

function useViewportSize() {
  const [viewportSize, setViewportSize] = useState(() => {
    if (typeof window === "undefined") return { width: 1440, height: 900 };

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewportSize;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function encodeJsonForUrl(value) {
  return encodeURIComponent(JSON.stringify(value));
}

function normalizeUrlLabel(url) {
  return String(url || "")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/g, "");
}

function AtlasMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2v28M2 16h28M6.1 6.1l19.8 19.8M25.9 6.1 6.1 25.9" />
      <circle cx="16" cy="16" r="3.1" />
    </svg>
  );
}

function ObservableFrame({
  title,
  visibleHeight,
  iframeHeight,
  className = "",
  src
}) {
  return (
    <div
      className={`atlas-frame ${className}`}
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
}

function OverviewCard({ title, description, onClick, preview }) {
  return (
    <button className="overview-route-card" type="button" onClick={onClick}>
      <div
        className={`overview-route-preview overview-route-preview-${preview}`}
        aria-hidden="true"
      >
        {Array.from({ length: 24 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="overview-route-copy">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <span className="overview-route-link">
          Open view <span aria-hidden="true">→</span>
        </span>
      </div>
    </button>
  );
}

function CompanyExternalPanel({
  selectedCompany,
  onClose,
  onCompare,
  showCompareButton = false,
  compareModeActive = false,
  isComparePanel = false
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

  return (
    <>
      <button
        className={`company-panel-close ${
          isComparePanel ? "company-panel-close-compare" : ""
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
          className={`company-panel-compare-button ${
            compareModeActive ? "company-panel-compare-button-active" : ""
          }`}
          type="button"
          onClick={onCompare}
        >
          {compareModeActive ? "Select another company" : "+ Compare company"}
        </button>
      )}

      <aside
        className={`company-panel ${
          isComparePanel ? "company-panel-compare" : ""
        }`}
        aria-label={`${selectedCompany.company || "Company"} details`}
      >
        <div className="company-panel-inner">
          <div className="company-panel-header">
            <div className="company-panel-logo-slot">
              {selectedCompany.logoUrl ? (
                <div className="company-panel-logo">
                  <img
                    src={selectedCompany.logoUrl}
                    alt={`${selectedCompany.company || "Company"} logo`}
                  />
                </div>
              ) : null}
            </div>

            <h3>{selectedCompany.company || "Company"}</h3>

            <p className="company-panel-subtitle">
              {selectedCompany.hasRegistered
                ? "Company with public registered trial activity"
                : "Company visible through pipeline or context sources"}
            </p>

            {websites.length > 0 && (
              <div className="company-panel-websites">
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
          </div>

          <div className="company-panel-metrics">
            <div className="company-panel-metric company-panel-metric-main">
              <strong>{visibleActivity}</strong>
              <span>Visible activity</span>
              <small>Registered trials + pipeline context</small>
            </div>

            <div className="company-panel-metric">
              <strong>{registeredTrials}</strong>
              <span>Registered trials</span>
            </div>

            <div className="company-panel-metric">
              <strong>{pipelineContext}</strong>
              <span>Pipeline context</span>
            </div>
          </div>

          <div className="company-panel-details">
            <section>
              <span>Assets</span>
              <p>{listToText(selectedCompany.assets)}</p>
            </section>

            <section>
              <span>Compound families</span>
              <p>{listToText(selectedCompany.families)}</p>
            </section>

            <section>
              <span>Therapeutic areas</span>
              <p>{listToText(selectedCompany.indications)}</p>
            </section>

            <section>
              <span>Countries</span>
              <p>
                {selectedCompany.hasRegistered
                  ? listToText(selectedCompany.countries)
                  : "No registered trial countries"}
              </p>
            </section>

            <section className="company-panel-trials-section">
              <span>Trial IDs</span>
              <div
                className={`company-panel-trials ${
                  trials.length >= 12 ? "company-panel-trials-many" : ""
                }`}
              >
                {trials.length > 0 ? (
                  trials.map((trial) =>
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
                  )
                ) : (
                  <p>No public registered trial IDs</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}

function MethodologyView() {
  return (
    <div className="content-page">
      <div className="content-page-heading">
        <p className="page-eyebrow">Method / data basis</p>
        <h1>How the Atlas is built</h1>
        <p>
          The Atlas separates registered clinical-trial activity from selected
          pipeline context so different forms of public visibility are not
          treated as the same type of evidence.
        </p>
      </div>

      <div className="methodology-grid">
        <section className="content-card">
          <p className="page-eyebrow">Core distinction</p>
          <h2>Evidence and context stay separate</h2>
          <p>
            Registered trial records are treated as evidence units. Pipeline-only
            assets are treated as context units. Visible activity does not imply
            efficacy, safety, approval or commercial success.
          </p>
        </section>

        <section className="content-card">
          <p className="page-eyebrow">Public sources</p>
          <h2>What the project uses</h2>
          <p>
            The project structures public trial records together with selected
            company-reported and credible secondary-source pipeline context.
          </p>
        </section>

        <section className="content-card">
          <p className="page-eyebrow">Units of analysis</p>
          <h2>Views answer different questions</h2>
          <ul>
            <li>Companies: one circle represents one company or development actor.</li>
            <li>Compounds: one circle represents one visible activity item.</li>
            <li>Indications: one circle represents one included registered patient-indication trial.</li>
            <li>Phases: registered trial activity is organized by clinical development phase.</li>
          </ul>
        </section>

        <section className="content-card">
          <p className="page-eyebrow">Limitations</p>
          <h2>Public data has constraints</h2>
          <p>
            Public records may be incomplete, delayed, duplicated or structured
            inconsistently. Recruitment status and trial details can change.
          </p>
        </section>
      </div>

      <div className="methodology-principles">
        <span>Registered trial ≠ pipeline claim</span>
        <span>Pipeline-only asset ≠ clinical-trial evidence</span>
        <span>Visible activity ≠ efficacy or safety</span>
        <span>Circle counts are not directly comparable across views</span>
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <div className="content-page about-page">
      <div className="content-page-heading">
        <p className="page-eyebrow">About the project</p>
        <h1>Psychedelic Trial Atlas</h1>
        <p>
          A public-facing data intelligence project mapping visible clinical-trial
          activity and selected pipeline context across psychedelic and
          psychedelic-adjacent medicines.
        </p>
      </div>

      <div className="about-page-grid">
        <section className="content-card about-primary-card">
          <p className="page-eyebrow">Purpose</p>
          <h2>What the Atlas maps</h2>
          <p>
            Companies, compounds, indications, clinical phases, recruitment
            status and source visibility across the public psychedelic
            drug-development landscape.
          </p>
        </section>

        <section className="content-card">
          <p className="page-eyebrow">Portfolio</p>
          <h2>Built as a data-intelligence project</h2>
          <p>
            The work combines data cleaning, data modelling, methodology design,
            data quality review, clinical-trial analysis and interactive
            visualization.
          </p>
          <p className="skills-line">
            Observable <span>•</span> React <span>•</span> SQL <span>•</span>{" "}
            Python <span>•</span> Power BI
          </p>
        </section>

        <section className="content-card">
          <p className="page-eyebrow">Citation</p>
          <h2>Cite this project</h2>
          <p>
            Rojek, Kamila. <em>Psychedelic Trial Atlas</em>. Interactive
            public-source data analysis. Site version {ATLAS_VERSION}.
          </p>
        </section>

        <section className="content-card contact-card">
          <p className="page-eyebrow">Contact</p>
          <h2>Work with me</h2>
          <p>
            Available for data analytics, research intelligence and visualization
            opportunities.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a
            href={LINKEDIN_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn profile
          </a>
        </section>
      </div>

      <p className="about-disclaimer">
        This project maps visible clinical-trial and pipeline activity. It does
        not provide medical advice, treatment recommendations, regulatory
        conclusions or investment advice.
      </p>
    </div>
  );
}

export default function App() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  const initialHash =
    typeof window !== "undefined"
      ? window.location.hash.replace("#", "")
      : "overview";

  const [activeView, setActiveView] = useState(
    NAV_ITEMS.some((item) => item.id === initialHash)
      ? initialHash
      : "overview"
  );

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [compareCompany, setCompareCompany] = useState(null);
  const [compareMode, setCompareMode] = useState(false);

  const compareModeRef = useRef(false);

  const mainApiKey = "515f6c33729f1bf487d1dbfd16abac4e81acfbd2";
  const mainNotebook = "e3028f2577c04f9a@1251";

  const githubLogoBase = "https://psychedelic-trial-atlas.vercel.app/logos/";
  const logoTuningVersion = "visual1b-logo-tuning-2026-06-24-full-logo-list";

  const logoVisualScale = {};
  const logoHoverScale = {};

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

  const frameHeights = useMemo(() => {
    if (viewportWidth <= 900) {
      return {
        overviewVisible: 720,
        overviewIframe: 900,
        companiesVisible: 1040,
        companiesIframe: 1125,
        compoundsVisible: 700,
        compoundsIframe: 1514,
        indicationsVisible: 650,
        indicationsIframe: 824,
        phasesVisible: 720,
        phasesIframe: 980
      };
    }

    const available = viewportHeight - 150;

    return {
      overviewVisible: clampNumber(available, 600, 720),
      overviewIframe: clampNumber(available + 110, 710, 830),
      companiesVisible: clampNumber(available + 180, 760, 1035),
      companiesIframe: 1125,
      compoundsVisible: clampNumber(available, 620, 760),
      compoundsIframe: 1514,
      indicationsVisible: clampNumber(available - 20, 590, 700),
      indicationsIframe: 824,
      phasesVisible: clampNumber(available, 620, 760),
      phasesIframe: 980
    };
  }, [viewportWidth, viewportHeight]);

  const observableSrc = useMemo(
    () => ({
      heroSection1: `https://observablehq.com/embed/${mainNotebook}?cells=heroSection1&api_key=${mainApiKey}${heroResponsiveParams}`,

      /*
        For now this keeps the existing working Observable build.
        Later we can split Ecosystem Overview and Company Landscape
        into two separate Observable cells without changing this React structure.
      */
      visual1EcosystemAndCompanyLandscape: `https://observablehq.com/embed/e3028f2577c04f9a@1420?cells=visual1EcosystemAndCompanyLandscape&api_key=ecf9f0bfb7b84e805b81fe519905418231789a18${visual1CompanyLandscapeParams}`,

      visual2ChartUnitColumns1: `https://observablehq.com/embed/e3028f2577c04f9a@1419?cells=visual2ChartUnitColumns1&api_key=2488895c619fa293677a0791309b410e6db31cb6`,

      visual3Chart: `https://observablehq.com/embed/e3028f2577c04f9a@1419?cells=visual3Chart&api_key=715f3cbfdfce0e9356d08d20a074b04d91101685`,

      visual4PhaseChart: `https://observablehq.com/embed/e3028f2577c04f9a@1419?cells=visual4PhaseChart&api_key=85cae8d02263045c184f5e4a5369f63938945a3e`
    }),
    [
      mainNotebook,
      mainApiKey,
      heroResponsiveParams,
      visual1CompanyLandscapeParams
    ]
  );

  const setCompareModeStable = (active) => {
    compareModeRef.current = !!active;
    setCompareMode(!!active);
  };

  const getCompanyIframe = () =>
    document.querySelector('iframe[title="Company Landscape Premium"]');

  const postToCompanyIframe = (message) => {
    const iframe = getCompanyIframe();
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(message, "*");
  };

  const clearObservableCompanyState = () => {
    postToCompanyIframe({ type: "UNICORN_COMPANY_CLEAR" });
  };

  const clearObservableCompareState = () => {
    postToCompanyIframe({ type: "UNICORN_COMPARE_CLEAR" });
  };

  const postCompareModeToObservable = (active) => {
    postToCompanyIframe({
      type: "UNICORN_COMPARE_SELECTION_MODE",
      active: !!active
    });
  };

  const handleCompareStart = () => {
    if (!selectedCompany || compareCompany) return;

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

  const activateView = (viewId) => {
    if (!NAV_ITEMS.some((item) => item.id === viewId)) return;

    if (activeView === "companies" && viewId !== "companies") {
      clearObservableCompanyState();
      setSelectedCompany(null);
      setCompareCompany(null);
      setCompareModeStable(false);
    }

    setActiveView(viewId);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${viewId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");

      if (NAV_ITEMS.some((item) => item.id === hash)) {
        setActiveView(hash);
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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

      if (message.type === "UNICORN_COMPARE_SELECTION_MODE_ACK") return;

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

      if (payload.compareSlot === "compare" || compareModeRef.current) {
        setCompareCompany(payload);
        setCompareModeStable(false);
        postCompareModeToObservable(false);
        return;
      }

      setSelectedCompany(payload);
      setCompareModeStable(false);
      postCompareModeToObservable(false);
    };

    window.addEventListener("message", handleCompanyMessage);

    return () => {
      window.removeEventListener("message", handleCompanyMessage);
    };
  }, []);

  return (
    <main className="site">
      <header className="atlas-topbar">
        <div className="atlas-topbar-inner">
          <button
            className="atlas-brand"
            type="button"
            onClick={() => activateView("overview")}
            aria-label="Open Atlas overview"
          >
            <span className="atlas-brand-mark">
              <AtlasMark />
            </span>

            <span className="atlas-brand-copy">
              <strong>Psychedelic Trial Atlas</strong>
              <small>UNICORN1</small>
            </span>
          </button>

          <nav className="atlas-tabs" aria-label="Atlas views">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`atlas-tab ${
                  activeView === item.id ? "atlas-tab-active" : ""
                }`}
                onClick={() => activateView(item.id)}
                aria-current={activeView === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className={`atlas-stage atlas-stage-${activeView}`}>
        {activeView === "overview" && (
          <section className="overview-view">
            <ObservableFrame
              title="Psychedelic Trial Atlas Hero"
              visibleHeight={frameHeights.overviewVisible}
              iframeHeight={frameHeights.overviewIframe}
              className="overview-hero-frame"
              src={observableSrc.heroSection1}
            />

            <div className="overview-route-grid">
              <OverviewCard
                title="Companies"
                description="Who is building the visible development landscape."
                preview="companies"
                onClick={() => activateView("companies")}
              />

              <OverviewCard
                title="Compounds"
                description="Registered clinical activity and pipeline context by compound."
                preview="compounds"
                onClick={() => activateView("compounds")}
              />

              <OverviewCard
                title="Indications"
                description="Registered patient-indication trials by therapeutic area."
                preview="indications"
                onClick={() => activateView("indications")}
              />

              <OverviewCard
                title="Phases"
                description="Visible registered activity across clinical development phases."
                preview="phases"
                onClick={() => activateView("phases")}
              />
            </div>
          </section>
        )}

        {activeView === "companies" && (
          <section className="visual-view company-view">
            <div
              className={`company-visual-shell ${
                selectedCompany ? "company-shell-panel-open" : ""
              } ${compareCompany ? "company-shell-compare-open" : ""}`}
            >
              <ObservableFrame
                title="Company Landscape Premium"
                visibleHeight={frameHeights.companiesVisible}
                iframeHeight={frameHeights.companiesIframe}
                className="company-frame"
                src={observableSrc.visual1EcosystemAndCompanyLandscape}
              />

              <CompanyExternalPanel
                selectedCompany={selectedCompany}
                onClose={handlePrimaryClose}
                onCompare={handleCompareStart}
                showCompareButton={!!selectedCompany && !compareCompany}
                compareModeActive={compareMode}
              />

              <CompanyExternalPanel
                selectedCompany={compareCompany}
                onClose={handleCompareClose}
                isComparePanel={true}
              />
            </div>
          </section>
        )}

        {activeView === "compounds" && (
          <section className="visual-view">
            <ObservableFrame
              title="Compound Activity Landscape"
              visibleHeight={frameHeights.compoundsVisible}
              iframeHeight={frameHeights.compoundsIframe}
              className="compound-frame"
              src={observableSrc.visual2ChartUnitColumns1}
            />
          </section>
        )}

        {activeView === "indications" && (
          <section className="visual-view">
            <ObservableFrame
              title="Indication Landscape"
              visibleHeight={frameHeights.indicationsVisible}
              iframeHeight={frameHeights.indicationsIframe}
              className="indication-frame"
              src={observableSrc.visual3Chart}
            />
          </section>
        )}

        {activeView === "phases" && (
          <section className="visual-view">
            <ObservableFrame
              title="Clinical Phase Landscape"
              visibleHeight={frameHeights.phasesVisible}
              iframeHeight={frameHeights.phasesIframe}
              className="phase-frame"
              src={observableSrc.visual4PhaseChart}
            />
          </section>
        )}

        {activeView === "methodology" && <MethodologyView />}
        {activeView === "about" && <AboutView />}
      </div>
    </main>
  );
}
