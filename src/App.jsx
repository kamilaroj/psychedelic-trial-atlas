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

  const steps = [
    {
      eyebrow: "UNICORN1",
      title: "Psychedelic Trial Atlas",
      text:
        "A visual data project mapping registered clinical-trial activity and visible pipeline context across psychedelic and psychedelic-adjacent medicines.",
      cell: "heroSection",
      height: "836px",
    },
    {
      eyebrow: "Visual 2",
      title: "Compound Activity Landscape",
      text:
        "This section introduces the compound-level view. It separates registered trial records from selected pipeline context.",
      cell: "visual2IntroTransition",
      height: "809px",
    },
    {
      eyebrow: "Visual 2",
      title: "Which compounds are visible?",
      text:
        "Each cluster shows visible activity around a compound family. Solid circles represent registered trial records. Dashed or ghost circles represent selected pipeline-context items.",
      cell: "visual2Chartminimalistic",
      height: "724px",
    },
    {
      eyebrow: "Visual 3",
      title: "Indication Landscape",
      text:
        "This section moves from compounds to indications. It asks where current or recent registered patient-indication trial activity is visible.",
      cell: "visual3IntroTransition",
      height: "759px",
    },
    {
      eyebrow: "Visual 3",
      title: "Where is clinical activity concentrated?",
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
      }
    );

    stepElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  const active = steps[activeStep];

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
    margin: "0 auto",
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
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(320px, 32vw) minmax(0, 1fr)",
          width: "100%",
          minHeight: `${steps.length * 100}vh`,
          background: pageBackground,
        }}
      >
        {/* LEFT SCROLL NARRATIVE */}
        <aside
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 32px 0 48px",
            background:
              "linear-gradient(90deg, rgba(244,244,242,1) 0%, rgba(244,244,242,0.94) 72%, rgba(244,244,242,0) 100%)",
          }}
        >
          {steps.map((step, index) => (
            <section
              key={step.cell}
              data-step-index={index}
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  maxWidth: "420px",
                  opacity: activeStep === index ? 1 : 0.22,
                  transform:
                    activeStep === index
                      ? "translateY(0px)"
                      : "translateY(24px)",
                  transition: "opacity 600ms ease, transform 600ms ease",
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
                  {step.eyebrow}
                </div>

                <h1
                  style={{
                    margin: "0 0 18px",
                    fontSize: index === 0 ? "48px" : "38px",
                    lineHeight: 1,
                    letterSpacing: "-0.06em",
                    color: ink,
                  }}
                >
                  {step.title}
                </h1>

                <p
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    lineHeight: 1.55,
                    color: muted,
                  }}
                >
                  {step.text}
                </p>

                <div
                  style={{
                    marginTop: "28px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {steps.map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      style={{
                        width: dotIndex === activeStep ? "28px" : "8px",
                        height: "8px",
                        borderRadius: "999px",
                        background:
                          dotIndex === activeStep
                            ? "#1d1d1f"
                            : "rgba(29,29,31,0.18)",
                        transition: "all 300ms ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </aside>

        {/* RIGHT STICKY VISUAL */}
        <section
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
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
              padding: "24px 28px",
            }}
          >
            <div
              key={active.cell}
              style={{
                width: "100%",
                maxWidth: "1500px",
                animation: "fadeVisual 700ms ease both",
                position: "relative",
              }}
            >
              <div style={iframeCropWrapper(active.height)}>
                <iframe
                  title={active.title}
                  width="100%"
                  height={`calc(${active.height} + ${footerCrop}px)`}
                  frameBorder="0"
                  scrolling="no"
                  src={embedSrc(active.cell)}
                  style={iframeStyle(active.height)}
                />
              </div>

              {active.hasLegend && (
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
              )}

              {visual3LegendOpen && (
                <div
                  style={{
                    position: "fixed",
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
                      One circle represents one registered clinical-trial
                      record. The inner dot shows the compound family. A green
                      outline means the trial is currently recruiting.
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.55,
                        color: "#4f596b",
                      }}
                    >
                      Visual 3 is the strictest layer. Pipeline-only assets are
                      not shown here unless a public trial record exists.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>

      <style>
        {`
          @keyframes fadeVisual {
            from {
              opacity: 0;
              transform: translateY(18px) scale(0.985);
              filter: blur(2px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @media (max-width: 900px) {
            main section {
              grid-template-columns: 1fr !important;
            }

            aside {
              position: relative !important;
              padding: 0 24px !important;
              background: #f4f4f2 !important;
            }

            aside section {
              min-height: 55vh !important;
            }

            aside + section {
              position: relative !important;
              height: auto !important;
              min-height: 100vh !important;
            }
          }
        `}
      </style>
    </main>
  );
}

export default App;
