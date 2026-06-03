import { useState } from "react";

function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  const [visual3LegendOpen, setVisual3LegendOpen] = useState(false);

  const pageBackground = "#f4f4f2";
  const panelBackground = "#f8f8f6";
  const ink = "#1d1d1f";
  const muted = "#61656f";
  const tiny = "#8c9098";

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
        background: panelBackground,
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
            color: tiny,
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

      {/* INDICATION TEXT */}
      <TextSection
        eyebrow="Indication view"
        title="Where is trial activity concentrated?"
      >
        <p>
          This layer groups registered patient-indication trial records by
          indication. One circle represents one registered clinical-trial record.
          The inner dot shows the compound family. A green outline means the
          specific trial record is currently recruiting.
        </p>

        <p>
          Visual 3 is the strictest public layer. Pipeline-only assets are not
          shown here unless a public trial record exists.
        </p>
      </TextSection>

      {/* METHODOLOGY */}
      <section
        style={{
          width: "100%",
          padding: "110px 24px",
          background: "#ffffff",
          borderTop: "1px solid rgba(29, 29, 31, 0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
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
              color: tiny,
            }}
          >
            Methodology
          </div>

          <h2
            style={{
              margin: "0 0 42px",
              fontSize: "clamp(42px, 6vw, 82px)",
              lineHeight: 0.95,
              letterSpacing: "-0.07em",
              color: ink,
            }}
          >
            What this project maps
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "28px",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: "24px",
                  letterSpacing: "-0.04em",
                  color: ink,
                }}
              >
                Registered trials
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: muted,
                }}
              >
                Registered clinical-trial records are treated as evidence units.
                They show public evidence-generation activity, not proof of
                efficacy, safety or approval.
              </p>
            </div>

            <div>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: "24px",
                  letterSpacing: "-0.04em",
                  color: ink,
                }}
              >
                Pipeline context
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: muted,
                }}
              >
                Pipeline-only assets are treated as context units. They are
                separated from registered clinical-trial activity.
              </p>
            </div>

            <div>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: "24px",
                  letterSpacing: "-0.04em",
                  color: ink,
                }}
              >
                Public visibility
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: muted,
                }}
              >
                The atlas maps what is publicly visible. It does not provide
                medical advice, treatment guidance, investment advice or
                regulatory conclusions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CREDITS */}
      <footer
        style={{
          width: "100%",
          padding: "72px 24px",
          background: pageBackground,
          borderTop: "1px solid rgba(29, 29, 31, 0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: "32px",
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "34px",
                letterSpacing: "-0.05em",
                color: ink,
              }}
            >
              UNICORN1
            </h2>

            <p
              style={{
                margin: 0,
                maxWidth: "520px",
                fontSize: "16px",
                lineHeight: 1.6,
                color: muted,
              }}
            >
              Psychedelic Trial Atlas is a visual data project mapping public
              clinical-trial activity and selected pipeline context across
              psychedelic and psychedelic-adjacent medicines.
            </p>
          </div>

          <div>
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: "16px",
                color: ink,
              }}
            >
              Built with
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "15px",
                lineHeight: 1.6,
                color: muted,
              }}
            >
              React
              <br />
              Vercel
              <br />
              Observable
            </p>
          </div>

          <div>
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: "16px",
                color: ink,
              }}
            >
              Status
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: "15px",
                lineHeight: 1.6,
                color: muted,
              }}
            >
              Public prototype
              <br />
              Portfolio project
              <br />
              Data visualization
            </p>
          </div>
        </div>
      </footer>

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

            footer > div {
              grid-template-columns: 1fr !important;
            }

            section div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </main>
  );
}

export default App;
