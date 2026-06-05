import { useState } from "react";

function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  const [visual3LegendOpen, setVisual3LegendOpen] = useState(false);

  const pageBackground = "#f1f0ec";
  const ink = "#1d1d1f";

  const observableBase =
    "https://observablehq.com/embed/e3028f2577c04f9a@814";

  const footerCrop = 44;

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  const ObservableFrame = ({ title, cell, height, maxWidth = "1500px" }) => {
    const numericHeight = Number(String(height).replace("px", ""));
    const iframeHeight = numericHeight + footerCrop;

    return (
      <div
        style={{
          width: "100%",
          maxWidth,
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

  const VisualSection = ({ children, padding = "40px 24px" }) => (
    <section
      style={{
        width: "100%",
        padding,
        background: pageBackground,
        overflow: "hidden",
      }}
    >
      {children}
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

      {/* VISUAL 1 — ECOSYSTEM OVERVIEW */}
      <VisualSection padding="28px 24px 20px">
        <ObservableFrame
          title="Psychedelic Ecosystem Overview"
          cell="visual1EcosystemOverview"
          height="724px"
        />
      </VisualSection>

      {/* VISUAL 1 — COMPANY LANDSCAPE */}
      <VisualSection padding="20px 24px 40px">
        <ObservableFrame
          title="Company Landscape"
          cell="visual1CompanyLandscape"
          height="1127px"
        />
      </VisualSection>

      {/* COMPOUND INTRO */}
      <FullSection>
        <ObservableFrame
          title="Compound Activity Landscape Intro"
          cell="visual2IntroTransition"
          height="808px"
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

      {/* INDICATION INTRO */}
      <FullSection>
        <ObservableFrame
          title="Indication Landscape Intro"
          cell="visual3IntroTransition"
          height="757px"
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
            height="724px"
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
              boxShadow: "0 16px 40px rgba(29, 29, 31, 0.18)",
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
            background: "rgba(29, 29, 31, 0.38)",
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
              boxShadow: "0 28px 80px rgba(29, 29, 31, 0.24)",
              color: "#1d1d1f",
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
                color: "rgba(29, 29, 31, 0.62)",
              }}
            >
              ×
            </button>

            <h2
              style={{
                margin: "0 0 16px",
                fontSize: "28px",
                color: "#1d1d1f",
              }}
            >
              Visual 3 — Indication Landscape
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.55,
                color: "#61656f",
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
                color: "#61656f",
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
          html,
          body,
          #root {
            margin: 0;
            padding: 0;
            width: 100%;
            min-height: 100%;
            background: ${pageBackground};
          }

          * {
            box-sizing: border-box;
          }

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
