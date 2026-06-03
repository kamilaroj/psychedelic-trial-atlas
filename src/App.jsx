import { useState } from "react";

function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  const [visual3LegendOpen, setVisual3LegendOpen] = useState(false);

  const pageBackground = "#f4f4f2";
  const ink = "#1d1d1f";
  const muted = "#61656f";

  const observableBase =
    "https://observablehq.com/embed/e3028f2577c04f9a@758";

  const footerCrop = 44;

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  const ObservableFrame = ({ title, cell, height }) => {
    const numericHeight = Number(String(height).replace("px", ""));
    const iframeHeight = numericHeight + footerCrop;

    return (
      <div
        style={{
          width: "100%",
          maxWidth: "1500px",
          height,
          overflow: "hidden",
          margin: "0 auto",
          background: pageBackground,
        }}
      >
        <iframe
          title={title}
          width="100%"
          height={iframeHeight}
          frameBorder="0"
          scrolling="no"
          src={embedSrc(cell)}
          style={{
            display: "block",
            width: "100%",
            height: `${iframeHeight}px`,
            margin: 0,
            padding: 0,
            border: 0,
            background: pageBackground,
          }}
        />
      </div>
    );
  };

  const FullSection = ({ children, minHeight = "100svh" }) => (
    <section
      style={{
        width: "100%",
        minHeight,
        padding: "40px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: pageBackground,
        overflow: "hidden",
      }}
    >
      {children}
    </section>
  );

  const VisualSection = ({ children }) => (
    <section
      style={{
        width: "100%",
        padding: "72px 24px",
        background: pageBackground,
        overflow: "hidden",
      }}
    >
      {children}
    </section>
  );

  const TextSection = ({ eyebrow, title, children }) => (
    <section
      style={{
        width: "100%",
        padding: "96px 24px",
        background: pageBackground,
      }}
    >
      <div
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "18px",
            fontSize: "12px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 800,
            color: "#8c9098",
          }}
        >
          {eyebrow}
        </div>

        <h2
          style={{
            margin: "0 0 28px",
            maxWidth: "820px",
            fontSize: "clamp(40px, 6vw, 76px)",
            lineHeight: 0.95,
            letterSpacing: "-0.07em",
            color: ink,
          }}
        >
          {title}
        </h2>

        <div
          style={{
            maxWidth: "820px",
            fontSize: "18px",
            lineHeight: 1.65,
            color: muted,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );

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
      }}
    >
      {/* HERO */}
      <FullSection>
        <ObservableFrame
          title="Hero Section"
          cell="heroSection"
          height="836px"
        />
      </FullSection>

      {/* COMPOUND INTRO */}
      <FullSection>
        <ObservableFrame
          title="Compound Activity Landscape Intro"
          cell="visual2IntroTransition"
          height="809px"
        />
      </FullSection>

      {/* COMPOUND VISUAL */}
      <VisualSection>
        <ObservableFrame
          title="Compound Activity Landscape"
          cell="visual2Chartminimalistic"
          height="724px"
        />
      </VisualSection>

      {/* COMPOUND TEXT */}
      <TextSection
        eyebrow="Compound view"
        title="Which compounds are publicly visible?"
      >
        <p>
          This layer groups visible activity by compound family. Solid circles
          represent registered clinical-trial activity. Dashed circles represent
          selected pipeline context that is not counted as the main registered
          trial layer.
        </p>

        <p>
          This is a compound-family view. It helps the viewer see where public
          activity is concentrated across DMT, 5-MeO-DMT, MDMA, LSD, ketamine,
          psilocybin and ibogaine-related development.
        </p>
      </TextSection>

      {/* INDICATION INTRO */}
      <FullSection>
        <ObservableFrame
          title="Indication Landscape Intro"
          cell="visual3IntroTransition"
          height="759px"
        />
      </FullSection>

      {/* INDICATION VISUAL */}
      <VisualSection>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1500px",
            margin: "0 auto",
            background: pageBackground,
          }}
        >
          <ObservableFrame
            title="Indication Landscape"
            cell="visual3Chart"
            height="1036px"
          />

          <button
            type="button"
            onClick={() => setVisual3LegendOpen(true)}
            style={{
              position: "absolute",
              left: "24px",
              bottom: "24px",
              zIndex: 20,
              border: 0,
              borderRadius: "14px",
              background: "#1d1d1f",
              color: "#ffffff",
              padding: "14px 20px",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 16px 40px rgba(27, 42, 74, 0.18)",
            }}
          >
            Legend
          </button>
        </div>
      </VisualSection>

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

      <style>
        {`
          @media (max-width: 900px) {
            section {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
          }
        `}
      </style>
    </main>
  );
}

export default App;
