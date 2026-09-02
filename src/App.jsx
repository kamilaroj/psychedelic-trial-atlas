import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import kamilaPhoto from "./kamila-rojek.png";

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
    const handleResize = () =>
      setViewportSize({
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
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      style={{
        width: "100%",
        height: "100%",
        display: "block"
      }}
    >
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer segmented atlas orbit */}
        <path
          d="M32 6
             A26 26 0 0 1 58 32"
          stroke="#4A245F"
          strokeWidth="2.2"
        />
        <path
          d="M58 32
             A26 26 0 0 1 32 58"
          stroke="#7A4A9B"
          strokeWidth="2.2"
        />
        <path
          d="M32 58
             A26 26 0 0 1 6 32"
          stroke="#6D3F8A"
          strokeWidth="2.2"
        />
        <path
          d="M6 32
             A26 26 0 0 1 32 6"
          stroke="#3E204F"
          strokeWidth="2.2"
        />

        {/* Four outer anchor points */}
        <circle cx="32" cy="6" r="3.8" fill="#6F3F8D" stroke="none" />
        <circle cx="58" cy="32" r="3.8" fill="#8F62B3" stroke="none" />
        <circle cx="32" cy="58" r="3.8" fill="#8F62B3" stroke="none" />
        <circle cx="6" cy="32" r="3.8" fill="#3A1E48" stroke="none" />

        {/* Middle dotted orbit */}
        <circle
          cx="32"
          cy="32"
          r="18.5"
          stroke="#70428A"
          strokeWidth="1.5"
          strokeDasharray="0.1 3.6"
        />

        {/* Middle anchor points */}
        <circle cx="32" cy="13.5" r="2.8" fill="#70428A" stroke="none" />
        <circle cx="50.5" cy="32" r="2.8" fill="#9B73BE" stroke="none" />
        <circle cx="32" cy="50.5" r="2.8" fill="#5D2D75" stroke="none" />
        <circle cx="13.5" cy="32" r="2.8" fill="#A27BC4" stroke="none" />

        <circle cx="18.9" cy="18.9" r="2.4" fill="#A27BC4" stroke="none" />
        <circle cx="45.1" cy="18.9" r="2.4" fill="#8D63AF" stroke="none" />
        <circle cx="18.9" cy="45.1" r="2.4" fill="#7B4C99" stroke="none" />
        <circle cx="45.1" cy="45.1" r="2.4" fill="#5A2B72" stroke="none" />

        {/* Inner dotted orbit */}
        <circle
          cx="32"
          cy="32"
          r="11.8"
          stroke="#4E2463"
          strokeWidth="1.3"
          strokeDasharray="0.1 3.4"
        />

        {/* Four analytical star points */}
        <path
          d="M32 16.8
             C32.6 20.4 34.6 22.4 38.2 23
             C34.6 23.6 32.6 25.6 32 29.2
             C31.4 25.6 29.4 23.6 25.8 23
             C29.4 22.4 31.4 20.4 32 16.8Z"
          fill="#3A1E48"
          stroke="none"
        />
        <path
          d="M47.2 32
             C43.6 32.6 41.6 34.6 41 38.2
             C40.4 34.6 38.4 32.6 34.8 32
             C38.4 31.4 40.4 29.4 41 25.8
             C41.6 29.4 43.6 31.4 47.2 32Z"
          fill="#3A1E48"
          stroke="none"
        />
        <path
          d="M32 47.2
             C31.4 43.6 29.4 41.6 25.8 41
             C29.4 40.4 31.4 38.4 32 34.8
             C32.6 38.4 34.6 40.4 38.2 41
             C34.6 41.6 32.6 43.6 32 47.2Z"
          fill="#3A1E48"
          stroke="none"
        />
        <path
          d="M16.8 32
             C20.4 31.4 22.4 29.4 23 25.8
             C23.6 29.4 25.6 31.4 29.2 32
             C25.6 32.6 23.6 34.6 23 38.2
             C22.4 34.6 20.4 32.6 16.8 32Z"
          fill="#3A1E48"
          stroke="none"
        />

        {/* Central data core */}
        <circle
          cx="32"
          cy="32"
          r="6.2"
          fill="#3A1E48"
          stroke="none"
        />
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
    <div
      className={`observable-shell ${className} ${
        loaded ? "observable-loaded" : "observable-loading"
      }`}
    >
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

function RealPreviewCard({
  title,
  description,
  cta,
  onClick,
  src,
  previewClass
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button className="overview-route-card" type="button" onClick={onClick}>
      <div
        className={`real-preview-window ${previewClass || ""} ${
          loaded ? "preview-loaded" : "preview-loading"
        }`}
      >
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

  const listToText = (
    value,
    fallback = "Insufficient data to verify"
  ) => {
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
            compareModeActive
              ? "company-panel-compare-button-active"
              : ""
          }`}
          type="button"
          onClick={onCompare}
        >
          {compareModeActive
            ? "Select another company"
            : "+ Compare company"}
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

            {websites.length > 0 ? (
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
            ) : (
              selectedCompany.noVerifiedWebsite && (
                <p className="company-panel-site-fallback">
                  No official website verified
                </p>
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

            <section>
              <span>Trial IDs</span>

              <div
                className={`company-panel-trials ${
                  trials.length >= 12
                    ? "company-panel-trials-many"
                    : ""
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
    <section className="content-page">
      <div className="content-page-heading">
        <p className="page-eyebrow">Method / data basis</p>

        <h1>How the Atlas is built</h1>

        <p>
          The Atlas separates registered clinical-trial activity from
          selected pipeline context so different forms of public visibility
          are not treated as the same type of evidence.
        </p>
      </div>

      <div className="methodology-grid">
        <article className="content-card">
          <p className="page-eyebrow">Registered trials</p>
          <h2>Evidence units</h2>
          <p>
            Public registry records are treated as registered
            evidence-generation activity.
          </p>
        </article>

        <article className="content-card">
          <p className="page-eyebrow">Pipeline context</p>
          <h2>Context units</h2>
          <p>
            Company-reported or secondary-source pipeline programs without
            a public trial ID are treated as context, not clinical-trial
            evidence.
          </p>
        </article>

        <article className="content-card">
          <p className="page-eyebrow">Different views</p>
          <h2>Different analytical questions</h2>
          <p>
            Company, compound, indication and phase views use different
            units of analysis. Their circle counts are therefore not directly
            comparable.
          </p>
        </article>

        <article className="content-card">
          <p className="page-eyebrow">Limitations</p>
          <h2>Public data can change</h2>
          <p>
            Trial records may be incomplete, delayed, duplicated or
            inconsistently structured. Recruitment status should be checked
            at the original source.
          </p>
        </article>
      </div>
    </section>
  );
}

function AboutView() {
  const featureCards = [
    {
      eyebrow: "Transparency",
      title: "Public development intelligence",
      text:
        "Making visible clinical-trial and pipeline activity easier to understand."
    },
    {
      eyebrow: "Access",
      title: "Finding relevant studies",
      text:
        "Helping patients, families, researchers and clinicians discover registered studies."
    },
    {
      eyebrow: "Context",
      title: "Evidence in context",
      text:
        "Showing pipeline context without overstating what is publicly proven."
    },
    {
      eyebrow: "Independent",
      title: "Open information",
      text:
        "An independent, non-commercial project focused on public information."
    }
  ];

  return (
    <section
      className="content-page"
      style={{
        width: "min(1180px, 100%)",
        paddingTop: "42px",
        paddingBottom: "46px"
      }}
    >
      <div
        className="content-page-heading"
        style={{
          maxWidth: "820px",
          marginBottom: "24px"
        }}
      >
        <p className="page-eyebrow">About the project</p>

        <h1
          style={{
            marginBottom: "12px"
          }}
        >
          Psychedelic Trial Atlas
        </h1>

        <p
          style={{
            maxWidth: "790px",
            fontSize: "14px",
            lineHeight: 1.55
          }}
        >
          A public clinical-development intelligence project mapping what is
          visible in psychedelic drug development by company, compound,
          indication, phase, recruitment status and source visibility.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, .72fr)",
          gap: "28px",
          alignItems: "start"
        }}
      >
        <article
          style={{
            minHeight: "340px",
            padding: "28px 30px",
            border: "1px solid rgba(56,36,61,.09)",
            borderRadius: "20px",
            background: "rgba(255,255,255,.48)",
            boxShadow:
              "0 14px 34px rgba(58,42,84,.045), inset 0 1px 0 rgba(255,255,255,.72)"
          }}
        >
          <p
            className="page-eyebrow"
            style={{
              marginBottom: "22px",
              color: "#5c2c67"
            }}
          >
            Why I built this
          </p>

          <div
            style={{
              display: "grid",
              gap: "22px"
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr)",
                gap: "18px",
                alignItems: "start"
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(88,36,106,.10)",
                  background: "rgba(125,92,150,.06)",
                  color: "#6a3a72",
                  fontSize: "21px",
                  lineHeight: 1
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "block"
                  }}
                >
                  <path
                    d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <p
                style={{
                  margin: 0,
                  color: "#373039",
                  fontSize: "13.5px",
                  lineHeight: 1.6
                }}
              >
                Psychedelic Trial Atlas started as a passion project combining
                my interest in <strong>data, clinical research</strong> and the
                rapidly evolving field of <strong>psychedelic medicine</strong>.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr)",
                gap: "18px",
                alignItems: "start"
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(88,36,106,.10)",
                  background: "rgba(125,92,150,.06)",
                  color: "#6a3a72",
                  fontSize: "19px",
                  lineHeight: 1
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "block"
                  }}
                >
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M14.7 14.7 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <p
                style={{
                  margin: 0,
                  color: "#373039",
                  fontSize: "13.5px",
                  lineHeight: 1.6
                }}
              >
                I wanted to create a clear public view of the development landscape and
                make it easier to discover{" "}
                <strong>registered studies</strong>, including trials that may
                currently be <strong>recruiting</strong>.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr)",
                gap: "18px",
                alignItems: "start"
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(88,36,106,.10)",
                  background: "rgba(125,92,150,.06)",
                  color: "#6a3a72",
                  fontSize: "18px",
                  lineHeight: 1
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "block"
                  }}
                >
                  <path
                    d="M12 3.5c.9 4.3 3.2 6.6 7.5 7.5-4.3.9-6.6 3.2-7.5 7.5-.9-4.3-3.2-6.6-7.5-7.5 4.3-.9 6.6-3.2 7.5-7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>

              <p
                style={{
                  margin: 0,
                  color: "#373039",
                  fontSize: "13.5px",
                  lineHeight: 1.6
                }}
              >
                The project brings together my background in{" "}
                <strong>research, analytics and visual storytelling</strong>{" "}
                with a personal curiosity about how emerging therapies move
                from early development into real clinical evidence.
              </p>
            </div>
          </div>
        </article>

        <aside
          style={{
            textAlign: "center",
            padding: "8px 4px 0"
          }}
        >
          <img
            src={kamilaPhoto}
            alt="Kamila Rojek"
            style={{
              display: "block",
              width: "168px",
              height: "168px",
              margin: "0 auto 16px",
              objectFit: "cover",
              objectPosition: "50% 34%",
              borderRadius: "18px",
              border: "1px solid rgba(56,36,61,.08)",
              boxShadow: "0 14px 32px rgba(58,42,84,.08)"
            }}
          />

          <h2
            style={{
              margin: "0 0 6px",
              color: "#2d1837",
              fontFamily: '"Inter Tight", "Inter", sans-serif',
              fontSize: "23px",
              lineHeight: 1,
              letterSpacing: "-0.045em"
            }}
          >
            Kamila Rojek
          </h2>

          <p
            style={{
              margin: "0 0 18px",
              color: "#65336f",
              fontSize: "10.5px",
              fontWeight: 650,
              lineHeight: 1.35
            }}
          >
            Data · Research · Human Behavior
          </p>

          <a
            href={LINKEDIN_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#552365",
              fontSize: "10.5px",
              fontWeight: 780,
              textDecoration: "underline",
              textUnderlineOffset: "3px"
            }}
          >
            LinkedIn profile
            <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "14px",
          marginTop: "24px"
        }}
      >
        {featureCards.map((card) => (
          <article
            key={card.eyebrow}
            style={{
              minHeight: "150px",
              padding: "20px 20px 18px",
              border: "1px solid rgba(56,36,61,.08)",
              borderRadius: "18px",
              background: "rgba(255,255,255,.42)",
              boxShadow:
                "0 12px 28px rgba(58,42,84,.035), inset 0 1px 0 rgba(255,255,255,.62)"
            }}
          >
            <p
              className="page-eyebrow"
              style={{
                marginBottom: "10px",
                color: "#65336f"
              }}
            >
              {card.eyebrow}
            </p>

            <h2
              style={{
                margin: "0 0 8px",
                color: "#38243d",
                fontFamily: '"Inter Tight", "Inter", sans-serif',
                fontSize: "19px",
                lineHeight: 1.05,
                letterSpacing: "-0.04em"
              }}
            >
              {card.title}
            </h2>

            <p
              style={{
                margin: 0,
                color: "#68717a",
                fontSize: "11px",
                lineHeight: 1.5
              }}
            >
              {card.text}
            </p>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "13px 16px",
          borderRadius: "12px",
          background: "rgba(101,51,111,.045)",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "20px",
            height: "20px",
            flex: "0 0 20px",
            borderRadius: "999px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#5c2c67",
            color: "#fff",
            fontFamily: "Georgia, serif",
            fontSize: "12px"
          }}
        >
          i
        </span>

        <p
          className="about-disclaimer"
          style={{
            margin: 0
          }}
        >
          This project maps visible clinical-trial and pipeline activity. It
          does not assess efficacy, safety, approval status, treatment
          suitability or investment value.
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const {
    width: viewportWidth,
    height: viewportHeight
  } = useViewportSize();

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

  const mainApiKey =
    "515f6c33729f1bf487d1dbfd16abac4e81acfbd2";

  const mainNotebook =
    "e3028f2577c04f9a@1443";

  const githubLogoBase =
    "https://psychedelic-trial-atlas.vercel.app/logos/";

  const logoTuningVersion =
    "visual1b-logo-tuning-2026-06-24-full-logo-list";

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
    `&logoTuningVersion=${encodeURIComponent(
      logoTuningVersion
    )}` +
    `&logoVisualScale=${encodeJsonForUrl(
      logoVisualScale
    )}` +
    `&logoHoverScale=${encodeJsonForUrl(
      logoHoverScale
    )}`;

  const observableSrc = useMemo(
    () => ({
      heroSection1:
        `https://observablehq.com/embed/${mainNotebook}` +
        `?cells=heroSection1` +
        `&api_key=${mainApiKey}` +
        `${heroResponsiveParams}`,

      visual1Overview:
        `https://observablehq.com/embed/e3028f2577c04f9a@1487` +
        `?cells=visual1EcosystemOverviev` +
        `&api_key=ecf9f0bfb7b84e805b81fe519905418231789a18`,

      visual1Company:
        `https://observablehq.com/embed/e3028f2577c04f9a@1487` +
        `?cells=visual1CompanyLandscapePremium1` +
        `&api_key=ecf9f0bfb7b84e805b81fe519905418231789a18` +
        `${visual1CompanyLandscapeParams}`,

      visual2:
        `https://observablehq.com/embed/e3028f2577c04f9a@1487` +
        `?cells=visual2ChartUnitColumns1` +
        `&api_key=2488895c619fa293677a0791309b410e6db31cb6`,

      visual3:
        `https://observablehq.com/embed/e3028f2577c04f9a@1485` +
        `?cells=visual3Chart` +
        `&api_key=715f3cbfdfce0e9356d08d20a074b04d91101685`,

      visual4:
        `https://observablehq.com/embed/e3028f2577c04f9a@1485` +
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
    document.querySelector(
      'iframe[title="Company Landscape Premium"]'
    );

  const postToCompanyIframe = (message) => {
    const iframe = getCompanyIframe();

    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(message, "*");
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
    if (!NAV_ITEMS.some((item) => item.id === viewId)) {
      return;
    }

    if (
      activeView === "companies" &&
      viewId !== "companies"
    ) {
      clearObservableCompanyState();
      setSelectedCompany(null);
      setCompareCompany(null);
      setCompareModeStable(false);
    }

    setActiveView(viewId);

    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        `#${viewId}`
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash =
        window.location.hash.replace("#", "");

      if (
        NAV_ITEMS.some((item) => item.id === hash)
      ) {
        setActiveView(hash);

        window.scrollTo({
          top: 0,
          behavior: "auto"
        });
      }
    };

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () =>
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
  }, []);

  useEffect(() => {
    const handleCompanyMessage = (event) => {
      const message = event.data;

      if (!message || typeof message !== "object") {
        return;
      }

      if (
        message.type !== "UNICORN_COMPANY_SELECTED" &&
        message.type !==
          "UNICORN_COMPANY_COMPARE_SELECTED" &&
        message.type !==
          "UNICORN_COMPARE_SELECTION_MODE_ACK"
      ) {
        return;
      }

      if (
        message.type ===
        "UNICORN_COMPARE_SELECTION_MODE_ACK"
      ) {
        return;
      }

      if (
        message.type ===
        "UNICORN_COMPANY_COMPARE_SELECTED"
      ) {
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
      setCompareModeStable(false);
      postCompareModeToObservable(false);
    };

    window.addEventListener(
      "message",
      handleCompanyMessage
    );

    return () =>
      window.removeEventListener(
        "message",
        handleCompanyMessage
      );
  }, []);

  return (
    <main className="site">
      <header className="atlas-topbar">
        <div className="atlas-topbar-inner">
          <button
            className="atlas-brand"
            type="button"
            onClick={() => activateView("overview")}
            style={{
              appearance: "none",
              border: 0,
              background: "transparent",
              padding: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              color: "#38243d",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            <span
              className="atlas-brand-mark"
              style={{
                width: "60px",
                height: "60px",
                flex: "0 0 60px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <AtlasMark />
            </span>

            <span
              className="atlas-brand-copy"
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <strong
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: '"Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif',
                  fontSize: "31px",
                  lineHeight: 0.94,
                  fontWeight: 900,
                  letterSpacing: "-0.06em",
                  color: "#2d1837",
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ display: "block" }}>Psychedelic</span>
                <span style={{ display: "block", marginTop: "4px" }}>
                  Trial Atlas
                </span>
              </strong>
            </span>
          </button>

          <nav
            className="atlas-tabs"
            aria-label="Atlas views"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`atlas-tab ${
                  activeView === item.id
                    ? "atlas-tab-active"
                    : ""
                }`}
                onClick={() =>
                  activateView(item.id)
                }
                aria-current={
                  activeView === item.id
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="atlas-updated">
            Updated: {ATLAS_VERSION}
          </div>
        </div>
      </header>

      <div
        className={`atlas-stage atlas-stage-${activeView}`}
      >
        {activeView === "overview" && (
          <section className="overview-page">
            <div className="overview-hero">
              <div className="overview-hero-copy">
                <p className="hero-eyebrow">
                  THE GLOBAL LANDSCAPE OF
                </p>

                <h1>
                  Psychedelic
                  <br />
                  Clinical Development
                </h1>

                <p className="hero-description">
                  An interactive view of companies,
                  compounds, indications and registered
                  clinical-trial activity, together with
                  the pipeline context shaping the visible
                  development landscape.
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
                  <span>
                    COMPANY LANDSCAPE
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      activateView("companies")
                    }
                  >
                    View full landscape →
                  </button>
                </div>

                <div
                  className="overview-company-hook-window overview-company-hook-clickable"
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    pointerEvents: "auto"
                  }}
                  onClick={() => activateView("companies")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      activateView("companies");
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Open Company Landscape"
                >
                  <iframe
                    title="Company Landscape overview preview"
                    src={observableSrc.visual1Company}
                    width="100%"
                    height="1000"
                    frameBorder="0"
                    scrolling="no"
                    tabIndex="-1"
                    aria-hidden="true"
                    style={{
                      pointerEvents: "none"
                    }}
                  />

                  <button
                    type="button"
                    aria-label="Open Company Landscape"
                    onClick={() => activateView("companies")}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 20,
                      width: "100%",
                      height: "100%",
                      padding: 0,
                      margin: 0,
                      border: 0,
                      background: "transparent",
                      cursor: "pointer",
                      pointerEvents: "auto"
                    }}
                  />
                </div>
              </div>

              <aside className="overview-reading-card">
                <p className="page-eyebrow">
                  How to read the Atlas
                </p>

                <h2>
                  One market. Four analytical views.
                </h2>

                <div className="reading-row">
                  <strong>Companies</strong>
                  <span>
                    Who is building the visible
                    ecosystem.
                  </span>
                </div>

                <div className="reading-row">
                  <strong>Compounds</strong>
                  <span>
                    Which compound families show
                    visible activity.
                  </span>
                </div>

                <div className="reading-row">
                  <strong>Indications</strong>
                  <span>
                    Where registered
                    patient-indication activity
                    appears.
                  </span>
                </div>

                <div className="reading-row">
                  <strong>Phases</strong>
                  <span>
                    Where registered activity sits
                    in development.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    activateView("methodology")
                  }
                  className="reading-method-link"
                >
                  Read methodology →
                </button>
              </aside>
            </div>

            <div className="inside-section">
              <p className="inside-kicker">
                WHAT’S INSIDE THE ATLAS
              </p>

              <div className="overview-route-grid">
                <RealPreviewCard
                  title="Companies"
                  description="Explore who is building the visible psychedelic development landscape."
                  cta="Explore companies"
                  onClick={() =>
                    activateView("companies")
                  }
                  src={observableSrc.visual1Company}
                  previewClass="preview-companies"
                />

                <RealPreviewCard
                  title="Compounds"
                  description="See registered clinical activity and selected pipeline context by compound."
                  cta="Explore compounds"
                  onClick={() =>
                    activateView("compounds")
                  }
                  src={observableSrc.visual2}
                  previewClass="preview-compounds"
                />

                <RealPreviewCard
                  title="Indications"
                  description="See included registered patient-indication trials by therapeutic area."
                  cta="Explore indications"
                  onClick={() =>
                    activateView("indications")
                  }
                  src={observableSrc.visual3}
                  previewClass="preview-indications"
                />

                <RealPreviewCard
                  title="Phases"
                  description="Review where visible registered activity appears across development phases."
                  cta="Explore phases"
                  onClick={() =>
                    activateView("phases")
                  }
                  src={observableSrc.visual4}
                  previewClass="preview-phases"
                />
              </div>
            </div>

            <div className="bottom-insight-bar">
              <div className="insight-primary">
                <span className="insight-info">
                  i
                </span>

                <div>
                  <strong>
                    Different views. Different units.
                  </strong>

                  <span>
                    Circle counts are not directly
                    comparable across views.
                  </span>
                </div>
              </div>

              <div className="insight-divider" />

              <div className="insight-item">
                <span className="insight-dot insight-dot-solid" />

                <div>
                  <strong>
                    Registered trial activity
                  </strong>

                  <span>
                    Public registry records with a
                    trial ID.
                  </span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-dot insight-dot-dashed" />

                <div>
                  <strong>
                    Pipeline context
                  </strong>

                  <span>
                    Selected visible programs without
                    a public trial ID.
                  </span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-symbol">
                  ◎
                </span>

                <div>
                  <strong>
                    Public-source visibility
                  </strong>

                  <span>
                    Registry and selected company /
                    secondary-source context.
                  </span>
                </div>
              </div>

              <div className="insight-item">
                <span className="insight-symbol">
                  ≠
                </span>

                <div>
                  <strong>
                    Visibility is not efficacy
                  </strong>

                  <span>
                    Activity does not imply safety,
                    approval or success.
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === "companies" && (
          <section className="visual-page company-page">
            <div
              className={`company-visual-shell ${
                selectedCompany
                  ? "company-panel-open"
                  : ""
              } ${
                compareCompany
                  ? "company-compare-open"
                  : ""
              }`}
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
                showCompareButton={
                  !!selectedCompany &&
                  !compareCompany
                }
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
              height={875}
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

        {activeView === "methodology" && (
          <MethodologyView />
        )}

        {activeView === "about" && (
          <AboutView />
        )}
      </div>
    </main>
  );
}
