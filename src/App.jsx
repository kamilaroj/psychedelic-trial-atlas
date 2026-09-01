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
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    const handleResize = () => setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewportSize;
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
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx="24" cy="24" r="15.5" strokeWidth="2.2" opacity="0.28" />
        <path d="M11.7 18.3A13.6 13.6 0 0 1 29.8 11.6" strokeWidth="2.5" />
        <path d="M36.4 20.2A13.6 13.6 0 0 1 31.1 35.6" strokeWidth="2.5" />
        <path d="M26.4 37.3A13.6 13.6 0 0 1 11.2 29.2" strokeWidth="2.5" />
        <circle cx="29.8" cy="11.6" r="2.7" fill="currentColor" stroke="none" />
        <circle cx="31.1" cy="35.6" r="2.7" fill="currentColor" stroke="none" />
        <circle cx="11.2" cy="29.2" r="2.7" fill="currentColor" stroke="none" />
        <circle cx="24" cy="24" r="3.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function ObservableFrame({
  title,
  src,
  className = "",
  iframeClassName = "",
  height = 700,
  ariaHidden = false
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`observable-shell ${className} ${loaded ? "observable-loaded" : "observable-loading"}`}>
      <iframe
        title={title}
        src={src}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        className={`atlas-iframe ${iframeClassName}`}
        loading="eager"
        aria-hidden={ariaHidden ? "true" : undefined}
        tabIndex={ariaHidden ? -1 : undefined}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function RealPreviewCard({ title, description, cta, onClick, src, previewClass }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button className="overview-route-card" type="button" onClick={onClick}>
      <div className={`real-preview-window ${previewClass || ""} ${loaded ? "preview-loaded" : "preview-loading"}`}>
        <iframe
          title={`${title} preview`}
          src={src}
          width="100%"
          height="1600"
          frameBorder="0"
          scrolling="no"
          tabIndex="-1"
          aria-hidden="true"
          className="real-preview-iframe"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <div className="overview-route-copy">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="overview-route-link">
          {cta} <span aria-hidden="true">→</span>
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

  const trials = Array.isArray(selectedCompany.trials) ? selectedCompany.trials : [];
  const visibleActivity = selectedCompany.visibleActivity ?? selectedCompany.activityUnits ?? 0;
  const registeredTrials = selectedCompany.registeredUnits ?? 0;
  const pipelineContext = selectedCompany.pipelineUnits ?? 0;

  return (
    <>
      <button
        className={`company-panel-close ${isComparePanel ? "company-panel-close-compare" : ""}`}
        type="button"
        onClick={onClose}
        aria-label={isComparePanel ? "Close compared company details" : "Close company details"}
      >
        ×
      </button>

      {showCompareButton && !isComparePanel && (
        <button
          className={`company-panel-compare-button ${compareModeActive ? "company-panel-compare-button-active" : ""}`}
          type="button"
          onClick={onCompare}
        >
          {compareModeActive ? "Select another company" : "+ Compare company"}
        </button>
      )}

      <aside
        className={`company-panel ${isComparePanel ? "company-panel-compare" : ""}`}
        aria-label={`${selectedCompany.company || "Company"} details`}
      >
        <div className="company-panel-inner">
          <div className="company-panel-header">
            <div className="company-panel-logo-slot">
              {selectedCompany.logoUrl ? (
                <div className="company-panel-logo">
                  <img src={selectedCompany.logoUrl} alt={`${selectedCompany.company || "Company"} logo`} />
                </div>
              ) : null}
            </div>

            <h3>{selectedCompany.company || "Company"}</h3>

            <p className="company-panel-subtitle">
              {selectedCompany.hasRegistered
                ? "Company with public registered trial activity"
                : "Company visible through pipeline or context sources"}
            </p>

            {websites.length > 0 ? (
              <div className="company-panel-websites">
                {websites.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                    {normalizeUrlLabel(url)}
                  </a>
                ))}
              </div>
            ) : (
              selectedCompany.noVerifiedWebsite && (
                <p className="company-panel-site-fallback">No official website verified</p>
              )
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
            <section><span>Assets</span><p>{listToText(selectedCompany.assets)}</p></section>
            <section><span>Compound families</span><p>{listToText(selectedCompany.families)}</p></section>
            <section><span>Therapeutic areas</span><p>{listToText(selectedCompany.indications)}</p></section>
            <section>
              <span>Countries</span>
              <p>{selectedCompany.hasRegistered ? listToText(selectedCompany.countries) : "No registered trial countries"}</p>
            </section>
            <section>
              <span>Trial IDs</span>
              <div className={`company-panel-trials ${trials.length >= 12 ? "company-panel-trials-many" : ""}`}>
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
    <section className="content-page">
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
        <article className="content-card">
          <p className="page-eyebrow">Registered trials</p>
          <h2>Evidence units</h2>
          <p>Public registry records are treated as registered evidence-generation activity.</p>
        </article>

        <article className="content-card">
          <p className="page-eyebrow">Pipeline context</p>
          <h2>Context units</h2>
          <p>
            Company-reported or secondary-source pipeline programs without a
            public trial ID are treated as context, not clinical-trial evidence.
          </p>
        </article>

        <article className="content-card">
          <p className="page-eyebrow">Different views</p>
          <h2>Different analytical questions</h2>
          <p>
            Company, compound, indication and phase views use different units
            of analysis. Their circle counts are therefore not directly comparable.
          </p>
        </article>

        <article className="content-card">
          <p className="page-eyebrow">Limitations</p>
          <h2>Public data can change</h2>
          <p>
            Trial records may be incomplete, delayed, duplicated or inconsistently
            structured. Recruitment status should be checked at the original source.
          </p>
        </article>
      </div>
    </section>
  );
}

function AboutView() {
  return (
    <section className="content-page">
      <div className="content-page-heading">
        <p className="page-eyebrow">About the project</p>
        <h1>Psychedelic Trial Atlas</h1>
        <p>
          A visual intelligence project mapping what is publicly visible in
          psychedelic drug development by company, compound, indication, phase,
          recruitment status and source visibility.
        </p>
      </div>

      <div className="methodology-grid">
        <article className="content-card">
          <p className="page-eyebrow">Positioning</p>
          <h2>Public development intelligence</h2>
          <p>
            The Atlas maps visible clinical-development activity and selected
            pipeline context. It does not predict which company or therapy will succeed.
          </p>
        </article>

        <article className="content-card">
          <p className="page-eyebrow">Portfolio</p>
          <h2>Data + research + visualization</h2>
          <p>
            The project combines data cleaning, data analysis, clinical-trial
            intelligence, pharma / biotech market research and interactive visualization.
          </p>
        </article>

        <article className="content-card">
          <p className="page-eyebrow">Citation</p>
          <h2>Cite this project</h2>
          <p>
            Rojek, Kamila. <em>Psychedelic Trial Atlas</em>. Interactive
            public-source data analysis. Site version {ATLAS_VERSION}.
          </p>
        </article>

        <article className="content-card contact-card">
          <p className="page-eyebrow">Contact</p>
          <h2>Work with me</h2>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer">
            LinkedIn profile
          </a>
        </article>
      </div>

      <p className="about-disclaimer">
        This project maps visible clinical-trial and pipeline activity. It does
        not assess efficacy, safety, approval status, treatment suitability or investment value.
      </p>
    </section>
  );
}

export default function App() {
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  const initialHash =
    typeof window !== "undefined"
      ? window.location.hash.replace("#", "")
      : "overview";

  const [activeView, setActiveView] = useState(
    NAV_ITEMS.some((item) => item.id === initialHash) ? initialHash : "overview"
  );

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [compareCompany, setCompareCompany] = useState(null);
  const [compareMode, setCompareMode] = useState(false);

  const compareModeRef = useRef(false);

  const mainApiKey = "515f6c33729f1bf487d1dbfd16abac4e81acfbd2";
  const mainNotebook = "e3028f2577c04f9a@1443";
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

  const heroResponsiveParams =
    `&heroMode=${encodeURIComponent(heroResponsiveMode)}` +
    `&hostWidth=${viewportWidth}` +
    `&hostHeight=${viewportHeight}`;

  const visual1CompanyLandscapeParams =
    `&logoBase=${encodeURIComponent(githubLogoBase)}` +
    `&logoTuningVersion=${encodeURIComponent(logoTuningVersion)}` +
    `&logoVisualScale=${encodeJsonForUrl(logoVisualScale)}` +
    `&logoHoverScale=${encodeJsonForUrl(logoHoverScale)}`;

  const observableSrc = useMemo(
    () => ({
      heroSection1:
        `https://observablehq.com/embed/${mainNotebook}` +
        `?cells=heroSection1` +
        `&api_key=${mainApiKey}` +
        `${heroResponsiveParams}`,

      visual1Overview:
        `https://observablehq.com/embed/e3028f2577c04f9a@1483` +
        `?cells=visual1EcosystemOverviev` +
        `&api_key=ecf9f0bfb7b84e805b81fe519905418231789a18`,

      visual1Company:
        `https://observablehq.com/embed/e3028f2577c04f9a@1483` +
        `?cells=visual1CompanyLandscapePremium1` +
        `&api_key=ecf9f0bfb7b84e805b81fe519905418231789a18` +
        `${visual1CompanyLandscapeParams}`,

      visual2:
        `https://observablehq.com/embed/e3028f2577c04f9a@1483` +
        `?cells=visual2ChartUnitColumns1` +
        `&api_key=2488895c619fa293677a0791309b410e6db31cb6`,

      visual3:
        `https://observablehq.com/embed/e3028f2577c04f9a@1482` +
        `?cells=visual3Chart` +
        `&api_key=715f3cbfdfce0e9356d08d20a074b04d91101685`,

      visual4:
        `https://observablehq.com/embed/e3028f2577c04f9a@1482` +
        `?cells=visual4PhaseChart` +
        `&api_key=85cae8d02263045c184f5e4a5369f63938945a3e`
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
    return () => window.removeEventListener("message", handleCompanyMessage);
  }, []);

  return (
    <main className="site">
      <header className="atlas-topbar">
        <div className="atlas-topbar-inner">
          <button
            className="atlas-brand"
            type="button"
            onClick={() => activateView("overview")}
          >
            <span className="atlas-brand-mark">
              <AtlasMark />
            </span>

            <span className="atlas-brand-copy">
              <strong>Psychedelic Trial Atlas</strong>
            </span>
          </button>

          <nav className="atlas-tabs" aria-label="Atlas views">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`atlas-tab ${activeView === item.id ? "atlas-tab-active" : ""}`}
                onClick={() => activateView(item.id)}
                aria-current={activeView === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="atlas-updated">Updated: {ATLAS_VERSION}</div>
        </div>
      </header>

      <div className={`atlas-stage atlas-stage-${activeView}`}>
        {activeView === "overview" && (
          <section className="overview-page">
            <div className="overview-hero">
              <div className="overview-hero-copy">
                <p className="hero-eyebrow">THE GLOBAL LANDSCAPE OF</p>

                <h1>
                  Psychedelic
                  <br />
                  Clinical Development
                </h1>

                <p className="hero-description">
                  An interactive view of companies, compounds, indications and
                  registered clinical-trial activity, together with the pipeline
                  context shaping the visible development landscape.
                </p>

                <div className="overview-real-metrics">
                  <iframe
                    title="Real ecosystem metrics"
                    src={observableSrc.visual1Overview}
                    width="100%"
                    height="1125"
                    frameBorder="0"
                    scrolling="no"
                    tabIndex="-1"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="overview-company-hook">
                <div className="overview-company-hook-label">
                  <span>COMPANY LANDSCAPE</span>
                  <button type="button" onClick={() => activateView("companies")}>
                    View full landscape →
                  </button>
                </div>

                <div className="overview-company-hook-window">
                  <iframe
                    title="Company Landscape overview preview"
                    src={observableSrc.visual1Company}
                    width="100%"
                    height="1000"
                    frameBorder="0"
                    scrolling="no"
                    tabIndex="-1"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <aside className="overview-reading-card">
                <p className="page-eyebrow">How to read the Atlas</p>
                <h2>One market. Four analytical views.</h2>

                <div className="reading-row">
                  <strong>Companies</strong>
                  <span>Who is building the visible ecosystem.</span>
                </div>

                <div className="reading-row">
                  <strong>Compounds</strong>
                  <span>Which compound families show visible activity.</span>
                </div>

                <div className="reading-row">
                  <strong>Indications</strong>
                  <span>Where registered patient-indication activity appears.</span>
                </div>

                <div className="reading-row">
                  <strong>Phases</strong>
                  <span>Where registered activity sits in development.</span>
                </div>

                <button
                  type="button"
                  onClick={() => activateView("methodology")}
                  className="reading-method-link"
                >
                  Read methodology →
                </button>
              </aside>
            </div>

            <div className="inside-section">
              <p className="inside-kicker">WHAT’S INSIDE THE ATLAS</p>

              <div className="overview-route-grid">
                <RealPreviewCard
                  title="Companies"
                  description="Explore who is building the visible psychedelic development landscape."
                  cta="Explore companies"
                  onClick={() => activateView("companies")}
                  src={observableSrc.visual1Company}
                  previewClass="preview-companies"
                />

                <RealPreviewCard
                  title="Compounds"
                  description="See registered clinical activity and selected pipeline context by compound."
                  cta="Explore compounds"
                  onClick={() => activateView("compounds")}
                  src={observableSrc.visual2}
                  previewClass="preview-compounds"
                />

                <RealPreviewCard
                  title="Indications"
                  description="See included registered patient-indication trials by therapeutic area."
                  cta="Explore indications"
                  onClick={() => activateView("indications")}
                  src={observableSrc.visual3}
                  previewClass="preview-indications"
                />

                <RealPreviewCard
                  title="Phases"
                  description="Review where visible registered activity appears across development phases."
                  cta="Explore phases"
                  onClick={() => activateView("phases")}
                  src={observableSrc.visual4}
                  previewClass="preview-phases"
                />
              </div>
            </div>

            <div className="bottom-insight-bar">
              <div className="insight-primary">
                <span className="insight-info">i</span>
                <div>
                  <strong>Different views. Different units.</strong>
                  <span>Circle counts are not directly comparable across views.</span>
                </div>
              </div>

              <div className="insight-divider" />

              <div className="insight-item">
                <span className="insight-dot insight-dot-solid" />
                <div>
                  <strong>Registered trial activity</strong>
                  <span>Public registry records with a trial ID.</span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-dot insight-dot-dashed" />
                <div>
                  <strong>Pipeline context</strong>
                  <span>Selected visible programs without a public trial ID.</span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-symbol">◎</span>
                <div>
                  <strong>Public-source visibility</strong>
                  <span>Registry and selected company / secondary-source context.</span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-symbol">≠</span>
                <div>
                  <strong>Visibility is not efficacy</strong>
                  <span>Activity does not imply safety, approval or success.</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === "companies" && (
          <section className="visual-page company-page">
            <div
              className={`company-visual-shell ${
                selectedCompany ? "company-panel-open" : ""
              } ${compareCompany ? "company-compare-open" : ""}`}
            >
              <ObservableFrame
                title="Company Landscape Premium"
                src={observableSrc.visual1Company}
                className="full-visual full-company-visual company-real-working-frame"
                height={1000}
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
          <section className="visual-page standard-analysis-page compound-page">
            <ObservableFrame
              title="Compound Activity Landscape"
              src={observableSrc.visual2}
              className="full-visual standard-analysis-visual full-compound-visual"
              height={920}
            />
          </section>
        )}

        {activeView === "indications" && (
          <section className="visual-page standard-analysis-page">
            <ObservableFrame
              title="Indication Landscape"
              src={observableSrc.visual3}
              className="full-visual standard-analysis-visual full-indication-visual"
              height={824}
            />
          </section>
        )}

        {activeView === "phases" && (
          <section className="visual-page standard-analysis-page">
            <ObservableFrame
              title="Clinical Phase Landscape"
              src={observableSrc.visual4}
              className="full-visual standard-analysis-visual full-phase-visual"
              height={1180}
            />
          </section>
        )}

        {activeView === "methodology" && <MethodologyView />}
        {activeView === "about" && <AboutView />}
      </div>
    </main>
  );
}
