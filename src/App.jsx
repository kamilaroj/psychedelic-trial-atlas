import { useState } from "react";

function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  const [visual3LegendOpen, setVisual3LegendOpen] = useState(false);

  const pageBackground = "#f4f4f2";

  const observableBase =
    "https://observablehq.com/embed/e3028f2577c04f9a@758";

  const footerCrop = 42;

  const sectionStyle = {
    width: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    background: pageBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    scrollSnapAlign: "start",
  };

  const iframeCropWrapper = (height) => ({
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
    margin: "0 auto",
    padding: 0,
    border: 0,
    background: pageBackground,
  });

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  return (
    <main
      style={{
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        background: pageBackground,
        color: "#1b2a4a",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        scrollSnapType: "y proximity",
      }}
    >
      {/* HERO SECTION */}
      <section style={sectionStyle}>
        <div style={iframeCropWrapper("836px")}>
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
      <section style={sectionStyle}>
        <div style={iframeCropWrapper("809px")}>
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
      <section style={sectionStyle}>
        <div style={iframeCropWrapper("724px")}>
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
      </section>

      {/* VISUAL 3 INTRO */}
      <section style={sectionStyle}>
        <div style={iframeCropWrapper("759px")}>
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
          ...sectionStyle,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1500px",
            height: "1036px",
            margin: "0 auto",
            background: pageBackground,
            overflow: "hidden",
          }}
        >
          <iframe
            title="Visual 3 Chart"
            width="100%"
            height="1078"
            frameBorder="0"
            scrolling="no"
            src={embedSrc("visual3Chart")}
            style={iframeStyle("1036px")}
          />

          <button
            type="button"
            onClick={() => setVisual3LegendOpen(true)}
            style={{
              position: "absolute",
              left: "24px",
              bottom: "24px",
              zIndex: 20,
              border: "0",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.94)",
              color: "#202124",
              padding: "16px 22px",
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              boxShadow: "0 12px 34px rgba(27, 42, 74, 0.12)",
              cursor: "pointer",
            }}
          >
            Legend
          </button>

          {visual3LegendOpen && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 40,
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
                  One circle represents one registered clinical-trial record.
                  The inner dot shows the compound family. A green outline means
                  the trial is currently recruiting.
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
        </div>
      </section>
    </main>
  );
}

export default App;
