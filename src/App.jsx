import { useState } from "react";

function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  const [visual3LegendOpen, setVisual3LegendOpen] = useState(false);

  const pageBackground = "#f4f4f2";
  const ink = "#1d1d1f";
  const muted = "#61656f";

  const observableBase =
    "https://observablehq.com/embed/e3028f2577c04f9a@758";

  const footerCrop = 42;

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  const pageSection = {
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: "0 24px",
    background: pageBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    scrollSnapAlign: "start",
  };

  const cropWrapper = (height) => ({
    width: "100%",
    maxWidth: "1500px",
    height,
    overflow: "hidden",
    margin: "0 auto",
    background: pageBackground,
  });

  const iframeStyle = (height) => ({
    display: "block",
    width: "100%",
    height: `calc(${height} + ${footerCrop}px)`,
    margin: 0,
    padding: 0,
    border: 0,
    background: pageBackground,
  });

  const textCard = {
    position: "absolute",
    left: "clamp(24px, 6vw, 96px)",
    bottom: "clamp(32px, 8vh, 96px)",
    width: "min(430px, 88vw)",
    padding: "28px 30px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 24px 70px rgba(27, 42, 74, 0.12)",
    border: "1px solid rgba(27, 42, 74, 0.08)",
    zIndex: 10,
  };

  const eyebrowStyle = {
    marginBottom: "14px",
    fontSize: "12px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontWeight: 800,
    color: "#8c9098",
  };

  const cardTitleStyle = {
    margin: "0 0 14px",
    fontSize: "34px",
    lineHeight: 1,
    letterSpacing: "-0.05em",
    color: ink,
  };

  const cardTextStyle = {
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.55,
    color: muted,
  };

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        background: pageBackground,
        color: ink,
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        scrollSnapType: "y proximity",
      }}
    >
      {/* HERO */}
      <section style={pageSection}>
        <div style={cropWrapper("836px")}>
          <iframe
            title="Hero Section"
            width="100%"
            height="878"
            frameBorder="0"
            scrolling="no"
            src={embedSrc("heroSection")}
            style={iframeStyle("836px")}
          />
        </div>
      </section>

      {/* VISUAL 2 INTRO */}
      <section style={pageSection}>
        <div style={cropWrapper("809px")}>
          <iframe
            title="Visual 2 Intro"
            width="100%"
            height="851"
            frameBorder="0"
            scrolling="no"
            src={embedSrc("visual2IntroTransition")}
            style={iframeStyle("809px")}
          />
        </div>
      </section>

      {/* VISUAL 2 CHART */}
      <section
        style={{
          ...pageSection,
          position: "relative",
        }}
      >
        <div style={cropWrapper("724px")}>
          <iframe
            title="Visual 2 Chart"
            width="100%"
            height="766"
            frameBorder="0"
            scrolling="no"
            src={embedSrc("visual2Chartminimalistic")}
            style={iframeStyle("724px")}
          />
        </div>

        <article style={textCard}>
          <div style={eyebrowStyle}>Compound view</div>

          <h2 style={cardTitleStyle}>Which compounds are publicly visible?</h2>

          <p style={cardTextStyle}>
            Each cluster represents visible activity around a compound family.
            Solid circles show registered trial records. Dashed or ghost
            circles show selected pipeline context.
          </p>
        </article>
      </section>

      {/* VISUAL 3 INTRO */}
      <section style={pageSection}>
        <div style={cropWrapper("759px")}>
          <iframe
            title="Visual 3 Intro"
            width="100%"
            height="801"
            frameBorder="0"
            scrolling="no"
            src={embedSrc("visual3IntroTransition")}
            style={iframeStyle("759px")}
          />
        </div>
      </section>

      {/* VISUAL 3 CHART */}
      <section
        style={{
          ...pageSection,
          position: "relative",
        }}
      >
        <div style={cropWrapper("1036px")}>
          <iframe
            title="Visual 3 Chart"
            width="100%"
            height="1078"
            frameBorder="0"
            scrolling="no"
            src={embedSrc("visual3Chart")}
            style={iframeStyle("1036px")}
          />
        </div>

        <article style={textCard}>
          <div style={eyebrowStyle}>Indication view</div>

          <h2 style={cardTitleStyle}>Where is trial activity concentrated?</h2>

          <p style={cardTextStyle}>
            One circle represents one registered clinical-trial record. The
            inner dot shows the compound family. A green outline means the trial
            is currently recruiting.
          </p>

          <button
            type="button"
            onClick={() => setVisual3LegendOpen(true)}
            style={{
              marginTop: "22px",
              border: "0",
              borderRadius: "14px",
              background: "#1d1d1f",
              color: "#ffffff",
              padding: "13px 18px",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Legend
          </button>
        </article>
      </section>

      {/* LEGEND MODAL */}
      {visual3LegendOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(27, 42, 74, 0.38)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
          }}
          onClick={() => setVisual3LegendOpen(false)}
        >
          <div
            style={{
              width: "min(780px, 92vw)",
              background: "rgba(255, 255, 255, 0.98)",
              borderRadius: "8px",
              boxShadow: "0 28px 80px rgba(27, 42, 74, 0.24)",
              color: "#202124",
              padding: "32px",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVisual3LegendOpen(false)}
              style={{
                float: "right",
                border: 0,
                background: "transparent",
                fontSize: "36px",
                cursor: "pointer",
                color: "rgba(32, 33, 36, 0.62)",
              }}
            >
              ×
            </button>

            <h2
              style={{
                margin: "0 0 16px",
                fontSize: "28px",
                color: "#1b2a4a",
              }}
            >
              Visual 3 — Indication Landscape
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.55,
                color: "#4f596b",
              }}
            >
              One circle represents one registered clinical-trial record. The
              inner dot shows the compound family. A green outline means the
              trial is currently recruiting.
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.55,
                color: "#4f596b",
              }}
            >
              Visual 3 is the strictest layer. Pipeline-only assets are not
              shown here unless a public trial record exists.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
