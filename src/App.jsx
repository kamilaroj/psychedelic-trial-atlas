import { useEffect, useState } from "react";

function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  const [activeStep, setActiveStep] = useState(0);
  const [visual3LegendOpen, setVisual3LegendOpen] = useState(false);

  const pageBackground = "#f4f4f2";
  const ink = "#1d1d1f";
  const muted = "#61656f";

  const observableBase =
    "https://observablehq.com/embed/e3028f2577c04f9a@758";

  const footerCrop = 42;

  const scrollySteps = [
    {
      eyebrow: "Visual 2",
      title: "Compound Activity Landscape",
      text:
        "This view groups visible activity by compound family. It separates registered trial records from selected pipeline-context items.",
      cell: "visual2IntroTransition",
      height: "809px",
    },
    {
      eyebrow: "Compound view",
      title: "Which compounds are publicly visible?",
      text:
        "Each cluster represents visible activity around a compound family. Solid circles show registered trial records. Dashed or ghost circles show selected pipeline context.",
      cell: "visual2Chartminimalistic",
      height: "724px",
    },
    {
      eyebrow: "Visual 3",
      title: "Indication Landscape",
      text:
        "This view moves from compounds to indications. It asks where current or recent registered patient-indication activity is visible.",
      cell: "visual3IntroTransition",
      height: "759px",
    },
    {
      eyebrow: "Indication view",
      title: "Where is trial activity concentrated?",
      text:
        "One circle represents one registered clinical-trial record. The inner dot shows the compound family. A green outline means the trial is currently recruiting.",
      cell: "visual3Chart",
      height: "1036px",
      hasLegend: true,
    },
  ];

  useEffect(() => {
    const stepElements = document.querySelectorAll("[data-step-index]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-step-index"));

          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        });
      },
      {
        threshold: 0.55,
        rootMargin: "-10% 0px -20% 0px",
      }
    );

    stepElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  const iframeCropWrapper = (height) => ({
    width: "100%",
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
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: pageBackground,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1500px",
            height: "836px",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
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

      {/* SCROLLYTELLING AREA */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: `${scrollySteps.length * 120}vh`,
          background: pageBackground,
        }}
      >
        {/* STICKY VISUAL LAYER */}
        <div
          style={{
            position: "sticky",
            top: 0,
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: pageBackground,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1500px",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 32px",
            }}
          >
            {scrollySteps.map((step, index) => (
              <div
                key={step.cell}
                style={{
                  position: "absolute",
                  width: "100%",
                  maxWidth: "1500px",
                  opacity: activeStep === index ? 1 : 0,
                  transform:
                    activeStep === index
                      ? "translateY(0px) scale(1)"
                      : "translateY(20px) scale(0.985)",
                  transition:
                    "opacity 700ms ease, transform 700ms ease, filter 700ms ease",
                  filter: activeStep === index ? "blur(0px)" : "blur(2px)",
                  pointerEvents: activeStep === index ? "auto" : "none",
                }}
              >
                <div style={iframeCropWrapper(step.height)}>
                  <iframe
                    title={step.title}
                    width="100%"
                    height={`calc(${step.height} + ${footerCrop}px)`}
                    frameBorder="0"
                    scrolling="no"
                    src={embedSrc(step.cell)}
                    style={iframeStyle(step.height)}
                  />
                </div>

                {step.hasLegend && activeStep === index && (
                  <button
                    type="button"
                    onClick={() => setVisual3LegendOpen(true)}
                    style={{
                      position: "absolute",
                      left: "48px",
                      bottom: "32px",
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
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SCROLL TEXT CARDS */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            width: "100%",
            pointerEvents: "none",
          }}
        >
          {scrollySteps.map((step, index) => (
            <section
              key={step.cell}
              data-step-index={index}
              style={{
                minHeight: "120vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingLeft: "clamp(24px, 6vw, 96px)",
                paddingRight: "24px",
              }}
            >
              <article
                style={{
                  width: "min(420px, 88vw)",
                  padding: "28px 30px",
                  borderRadius: "18px",
                  background: "rgba(255, 255, 255, 0.88)",
                  boxShadow: "0 24px 70px rgba(27, 42, 74, 0.12)",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                  opacity: activeStep === index ? 1 : 0.28,
                  transform:
                    activeStep === index
                      ? "translateY(0px)"
                      : "translateY(24px)",
                  transition: "opacity 600ms ease, transform 600ms ease",
                }}
              >
                <div
                  style={{
                    marginBottom: "14px",
                    fontSize: "12px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 800,
                    color: "#8c9098",
                  }}
                >
                  {step.eyebrow}
                </div>

                <h2
                  style={{
                    margin: "0 0 14px",
                    fontSize: "34px",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    color: ink,
                  }}
                >
                  {step.title}
                </h2>

                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    lineHeight: 1.55,
                    color: muted,
                  }}
                >
                  {step.text}
                </p>
              </article>
            </section>
          ))}
        </div>
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
