import React, { useMemo, useState } from "react";
import "./App.css";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "companies", label: "Companies" },
  { id: "compounds", label: "Compounds" },
  { id: "indications", label: "Indications" },
  { id: "phases", label: "Phases" },
  { id: "methodology", label: "Methodology" },
  { id: "about", label: "About" }
];

const KPI = [
  { icon: "♙", value: "187", label: "Companies / Actors" },
  { icon: "⚗", value: "94", label: "Compounds / Assets" },
  { icon: "▣", value: "171", label: "Registered Trials" },
  { icon: "◌", value: "76", label: "Pipeline Context*" },
  { icon: "✥", value: "49", label: "Indications" },
  { icon: "◎", value: "31", label: "Countries" }
];

const COMPANY_BUBBLES = [
  { x: 53, y: 44, s: 128, label: "COMPASSION", sub: "THERAPEUTICS", cls: "dark" },
  { x: 31, y: 63, s: 122, label: "ATAI", sub: "LIFE SCIENCES", cls: "mid" },
  { x: 50, y: 70, s: 82, label: "FIELD", sub: "TRIP", cls: "mid" },
  { x: 75, y: 50, s: 88, label: "MINDMED", sub: "", cls: "mid" }
];

function AtlasMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2v28M2 16h28M6.1 6.1l19.8 19.8M25.9 6.1 6.1 25.9" />
      <circle cx="16" cy="16" r="3.2" />
    </svg>
  );
}

function HeroCompanyVisual() {
  const orbitDots = useMemo(() => {
    const dots = [];
    for (let i = 0; i < 88; i += 1) {
      const angle = (i / 88) * Math.PI * 2;
      const ring = 22 + (i % 7) * 5.6;
      const wobble = Math.sin(i * 1.7) * 2.5;
      const x = 50 + Math.cos(angle) * (ring + wobble);
      const y = 51 + Math.sin(angle) * (ring * 0.72 + wobble);
      const size = 4 + (i % 6) * 1.6;
      const colorClass =
        i % 13 === 0 ? "pink" :
        i % 11 === 0 ? "blue" :
        i % 9 === 0 ? "orange" :
        i % 5 === 0 ? "violet2" : "violet";

      dots.push({ x, y, size, colorClass });
    }
    return dots;
  }, []);

  return (
    <div className="hero-visual-wrap" aria-label="Company landscape preview">
      <div className="hero-orbit" />

      {orbitDots.map((dot, i) => (
        <span
          key={i}
          className={`orbit-dot orbit-dot-${dot.colorClass}`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`
          }}
        />
      ))}

      {COMPANY_BUBBLES.map((bubble) => (
        <div
          key={bubble.label}
          className={`company-bubble company-bubble-${bubble.cls}`}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.s,
            height: bubble.s
          }}
        >
          <strong>{bubble.label}</strong>
          {bubble.sub && <span>{bubble.sub}</span>}
        </div>
      ))}
    </div>
  );
}

function MiniCompanies() {
  return (
    <div className="mini-companies">
      {[22, 12, 17, 9, 26, 14, 11, 8, 16, 7, 12, 9].map((s, i) => (
        <span
          key={i}
          style={{
            width: s,
            height: s,
            left: `${8 + (i * 7.2) % 80}%`,
            top: `${10 + ((i * 17) % 62)}%`
          }}
        />
      ))}
    </div>
  );
}

function MiniDots({ indication = false }) {
  return (
    <div className={`mini-dot-grid ${indication ? "mini-dot-grid-indication" : ""}`}>
      {Array.from({ length: 45 }, (_, i) => (
        <span key={i} className={`dot-color-${i % 6}`} />
      ))}
    </div>
  );
}

function MiniPhases() {
  return (
    <div className="mini-phases">
      {["PHASE I", "PHASE II", "PHASE III", "PHASE IV"].map((phase, i) => (
        <div className="phase-mini-group" key={phase}>
          <small>{phase}</small>
          <div>
            {Array.from({ length: [11, 10, 8, 6][i] }, (_, j) => (
              <span key={j} className={`phase-color-${i}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function OverviewCard({ icon, title, text, children, cta, onClick }) {
  return (
    <button className="atlas-overview-card" type="button" onClick={onClick}>
      <div className="overview-card-head">
        <div className="overview-card-icon">{icon}</div>
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>

      <div className="overview-card-viz">{children}</div>

      <div className="overview-card-cta">
        {cta} <span>→</span>
      </div>
    </button>
  );
}

function Overview({ setActiveView }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="hero-eyebrow">THE GLOBAL LANDSCAPE OF</p>

          <h1>
            Psychedelic
            <br />
            Clinical Development
          </h1>

          <p className="hero-description">
            An interactive view of companies, compounds, indications and
            registered clinical-trial activity — and the pipeline context shaping
            what comes next.
          </p>

          <button
            type="button"
            className="hero-cta"
            onClick={() => setActiveView("companies")}
          >
            Explore the Atlas <span>→</span>
          </button>

          <div className="kpi-row">
            {KPI.map((item) => (
              <div className="kpi-item" key={item.label}>
                <div className="kpi-icon">{item.icon}</div>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <p className="pipeline-note">
            * Pipeline context includes programs without public trial IDs.
          </p>
        </div>

        <div className="hero-visual-column">
          <HeroCompanyVisual />
        </div>

        <aside className="hero-company-card">
          <span className="hero-company-kicker">Most active company</span>
          <h2>
            COMPASSION
            <br />
            THERAPEUTICS
          </h2>

          <dl>
            <div><dt>Footprint score</dt><dd>98.4</dd></div>
            <div><dt>Registered units</dt><dd>24</dd></div>
            <div><dt>Pipeline context units</dt><dd>6</dd></div>
            <div><dt>Assets / Programs</dt><dd>8</dd></div>
            <div><dt>Compound families</dt><dd>3</dd></div>
            <div><dt>Therapeutic areas</dt><dd>5</dd></div>
            <div><dt>Countries</dt><dd>7</dd></div>
            <div><dt>Source rows</dt><dd>38</dd></div>
          </dl>

          <button
            type="button"
            className="company-card-link"
            onClick={() => setActiveView("companies")}
          >
            View full company landscape <span>→</span>
          </button>
        </aside>
      </section>

      <section className="inside-section">
        <p className="inside-kicker">WHAT’S INSIDE THE ATLAS</p>

        <div className="overview-card-grid">
          <OverviewCard
            icon="◉"
            title="Companies"
            text="Explore who is building the psychedelic development landscape."
            cta="Explore companies"
            onClick={() => setActiveView("companies")}
          >
            <MiniCompanies />
          </OverviewCard>

          <OverviewCard
            icon="⌘"
            title="Compounds"
            text="See which compounds are in clinical trials and which are in the pipeline."
            cta="Explore compounds"
            onClick={() => setActiveView("compounds")}
          >
            <MiniDots />
          </OverviewCard>

          <OverviewCard
            icon="✥"
            title="Indications"
            text="Understand which therapeutic areas have registered patient-indication trials."
            cta="Explore indications"
            onClick={() => setActiveView("indications")}
          >
            <MiniDots indication />
          </OverviewCard>

          <OverviewCard
            icon="▥"
            title="Phases"
            text="Track clinical development across Phase I to Phase IV."
            cta="Explore phases"
            onClick={() => setActiveView("phases")}
          >
            <MiniPhases />
          </OverviewCard>
        </div>
      </section>

      <section className="bottom-insight-bar">
        <div className="insight-primary">
          <div className="info-circle">i</div>
          <div>
            <strong>Different views. Different units.</strong>
            <span>Circle counts are not directly comparable across views.</span>
          </div>
        </div>

        <div className="insight-divider" />

        <div className="insight-item">
          <span className="legend-dot legend-dot-solid" />
          <div>
            <strong>Registered trial activity</strong>
            <span>Public trial records with trial IDs</span>
          </div>
        </div>

        <div className="insight-item">
          <span className="legend-dot legend-dot-dashed" />
          <div>
            <strong>Pipeline context</strong>
            <span>Programs without public trial IDs</span>
          </div>
        </div>

        <div className="insight-item">
          <span className="legend-symbol">◎</span>
          <div>
            <strong>Global coverage</strong>
            <span>Data from public registries and company sources</span>
          </div>
        </div>

        <div className="insight-item">
          <span className="legend-symbol">▣</span>
          <div>
            <strong>Recruiting now</strong>
            <span>22 registered trials are currently recruiting</span>
          </div>
        </div>
      </section>
    </>
  );
}

function PlaceholderView({ title }) {
  return (
    <section className="placeholder-view">
      <p>UNICORN1</p>
      <h1>{title}</h1>
      <span>This view keeps the new top-navigation architecture.</span>
    </section>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState("overview");

  return (
    <main className="site-shell">
      <header className="topbar">
        <button
          className="brand"
          type="button"
          onClick={() => setActiveView("overview")}
        >
          <span className="brand-mark">
            <AtlasMark />
          </span>
          <span className="brand-copy">
            <strong>UNICORN1</strong>
            <small>Psychedelic Trial Atlas</small>
          </span>
        </button>

        <nav className="main-nav" aria-label="Atlas navigation">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={activeView === item.id ? "nav-active" : ""}
              onClick={() => setActiveView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="updated">Updated: August 2026</div>
      </header>

      <div className="page-canvas">
        {activeView === "overview" ? (
          <Overview setActiveView={setActiveView} />
        ) : (
          <PlaceholderView
            title={NAV_ITEMS.find((item) => item.id === activeView)?.label}
          />
        )}
      </div>
    </main>
  );
}
