import { useEffect, useRef, useState } from "react";

function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  const [activeSection, setActiveSection] = useState(0);
  const [visual3LegendOpen, setVisual3LegendOpen] = useState(false);

  const sectionRefs = useRef([]);

  const pageBackground = "#f4f4f2";

  const observableBase =
    "https://observablehq.com/embed/e3028f2577c04f9a@758";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);

          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        });
      },
      {
        threshold: 0.55,
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (element, index) => {
    sectionRefs.current[index] = element;
  };

  const pageStyle = {
    width: "100vw",
    maxWidth: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
    scrollSnapType: "y mandatory",
    background: pageBackground,
    color: "#1b2a4a",
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const scrollSection = (index) => ({
    width: "100vw",
    maxWidth: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    background: pageBackground,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    opacity: activeSection === index ? 1 : 0.35,
    transform:
      activeSection === index
        ? "translateY(0px) scale(1)"
        : "translateY(32px) scale(0.985)",
    transition:
      "opacity 700ms ease, transform 700ms ease, filter 700ms ease",
    filter: activeSection === index ? "blur(0px)" : "blur(1px)",
  });

  const iframeStyle = (height) => ({
    display: "block",
    width: "100%",
    maxWidth: "1500px",
    height,
    minWidth: "0",
    margin: "0 auto",
    padding: 0,
    border: 0,
    background: pageBackground,
  });

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  return (
    <main style={pageStyle}>
      {/* HERO SECTION */}
      <section
        ref={(element) => setSectionRef(element, 0)}
        data-index="0"
        style={scrollSection(0)}
      >
        <iframe
          title="Psychedelic Trial Atlas Hero"
          width="100%"
          height="836"
          frameBorder="0"
          scrolling="no"
          src={embedSrc("heroSection")}
          style={iframeStyle("836px")}
        />
      </section>

      {/* VISUAL 2 INTRO */}
      <section
        ref={(element) => setSectionRef(element, 1)}
        data-index="1"
        style={scrollSection(1)}
      >
        <iframe
          title="Compound Activity Landscape Intro"
          width="100%"
          height="809"
          frameBorder="0"
          scrolling="no"
          src={embedSrc("visual2IntroTransition")}
          style={iframeStyle("809px")}
        />
      </section>

      {/* VISUAL 2 CHART */}
      <section
        ref={(element) => setSectionRef(element, 2)}
        data-index="2"
        style={scrollSection(2)}
      >
        <iframe
          title="Compound Activity Landscape"
          width="100%"
          height="724"
          frameBorder="0"
          scrolling="no"
          src={embedSrc("visual2Chartminimalistic")}
          style={iframeStyle("724px")}
        />
      </section>

      {/* VISUAL 3 INTRO */}
      <section
        ref={(element) => setSectionRef(element, 3)}
        data-index="3"
        style={scrollSection(3)}
      >
        <iframe
          title="Indication Landscape Intro"
          width="100%"
          height="759"
          frameBorder="0"
          scrolling="no"
          src={embedSrc("visual3IntroTransition")}
          style={iframeStyle("759px")}
        />
      </section>

      {/* VISUAL 3 CHART */}
      <section
        ref={(element) => setSectionRef(element, 4)}
        data-index="4"
        style={{
          ...scrollSection(4),
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
          }}
        >
          <iframe
            title="Indication Landscape"
            width="100%"
            height="1036"
            frameBorder="0"
            scrolling="no"
            src={embedSrc("visual3Chart")}
            style={{
              display: "block",
              width: "100%",
              height: "1036px",
              margin: "0 auto",
              padding: 0,
              border: 0,
              background: pageBackground,
            }}
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
                boxSizing: "border-box",
              }}
              onClick={() => setVisual3LegendOpen(false)}
            >
              <div
                style={{
                  width: "min(980px, 92vw)",
                  maxHeight: "82vh",
                  overflowY: "auto",
                  background: "rgba(255, 255, 255, 0.98)",
                  borderRadius: "4px",
                  boxShadow: "0 28px 80px rgba(27, 42, 74, 0.24)",
                  color: "#202124",
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  style={{
                    height: "72px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 28px",
                    borderBottom: "1px solid rgba(27, 42, 74, 0.12)",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      fontSize: "26px",
                      fontWeight: 850,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <span style={{ fontSize: "34px", lineHeight: 1 }}>✦</span>
                    Legend
                  </div>

                  <button
                    type="button"
                    onClick={() => setVisual3LegendOpen(false)}
                    style={{
                      border: "0",
                      background: "transparent",
                      color: "rgba(32, 33, 36, 0.62)",
                      fontSize: "42px",
                      lineHeight: 1,
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>

                <div
                  style={{
                    padding: "34px 42px 42px",
                    display: "grid",
                    gap: "32px",
                  }}
                >
                  <section>
                    <h2
                      style={{
                        margin: "0 0 12px",
                        fontSize: "28px",
                        lineHeight: 1.1,
                        letterSpacing: "-0.04em",
                        color: "#1b2a4a",
                      }}
                    >
                      Visual 3 — Indication Landscape
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        maxWidth: "760px",
                        fontSize: "17px",
                        lineHeight: 1.55,
                        color: "#4f596b",
                      }}
                    >
                      This view groups registered clinical-trial records by
                      indication. It shows the final public indication layer of
                      the Psychedelic Trial Atlas.
                    </p>
                  </section>

                  <section
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      gap: "24px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: "58px",
                          height: "58px",
                          borderRadius: "50%",
                          background: "#fff",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          boxShadow: "0 10px 28px rgba(27, 42, 74, 0.08)",
                          marginBottom: "12px",
                        }}
                      />
                      <div
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.4,
                          color: "#202124",
                        }}
                      >
                        <strong>One circle</strong>
                        <br />
                        one registered trial record
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          width: "58px",
                          height: "58px",
                          borderRadius: "50%",
                          background: "#fff",
                          border: "4px solid #198754",
                          boxShadow: "0 10px 28px rgba(27, 42, 74, 0.08)",
                          marginBottom: "12px",
                        }}
                      />
                      <div
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.4,
                          color: "#202124",
                        }}
                      >
                        <strong>Green outline</strong>
                        <br />
                        currently recruiting
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          width: "58px",
                          height: "58px",
                          borderRadius: "50%",
                          background: "#fff",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          boxShadow: "0 10px 28px rgba(27, 42, 74, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            background: "#0d6efd",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.4,
                          color: "#202124",
                        }}
                      >
                        <strong>Inner dot</strong>
                        <br />
                        compound family
                      </div>
                    </div>
                  </section>

                  <section
                    style={{
                      borderTop: "1px solid rgba(27, 42, 74, 0.12)",
                      paddingTop: "28px",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 18px",
                        fontSize: "20px",
                        letterSpacing: "-0.02em",
                        color: "#1b2a4a",
                      }}
                    >
                      Compound family colors
                    </h3>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: "14px 28px",
                      }}
                    >
                      {[
                        ["DMT and related", "#6610f2"],
                        ["5-MeO-DMT and related", "#6f42c1"],
                        ["Ketamine and related", "#0dcaf0"],
                        ["MDMA and related", "#d63384"],
                        ["LSD and related", "#6f42c1"],
                        ["Psilocybin and related", "#0d6efd"],
                        ["Ibogaine and related", "#dc3545"],
                        ["Ibogaine analogs", "#fd7e14"],
                        ["Other psychoplastogens", "#ffc107"],
                        ["Other / unclassified", "#343a40"],
                      ].map(([label, color]) => (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            fontSize: "15px",
                            color: "#202124",
                          }}
                        >
                          <span
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              background: color,
                              display: "inline-block",
                              flex: "0 0 auto",
                            }}
                          />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section
                    style={{
                      borderTop: "1px solid rgba(27, 42, 74, 0.12)",
                      paddingTop: "28px",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 12px",
                        fontSize: "20px",
                        letterSpacing: "-0.02em",
                        color: "#1b2a4a",
                      }}
                    >
                      What this visual shows
                    </h3>

                    <p
                      style={{
                        margin: "0 0 10px",
                        fontSize: "15px",
                        lineHeight: 1.55,
                        color: "#4f596b",
                      }}
                    >
                      This visual shows registered patient-indication trial
                      records that are current, upcoming, active, recruiting,
                      recently completed, or strategically relevant.
                    </p>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        lineHeight: 1.55,
                        color: "#4f596b",
                      }}
                    >
                      Historical completed studies, stopped or withdrawn trials,
                      expanded-access records, approved-market-only assets,
                      unclear records, and non-mental-health-adjacent studies
                      are kept in the master dataset but excluded from this
                      public view.
                    </p>
                  </section>

                  <section
                    style={{
                      background: "rgba(13, 110, 253, 0.05)",
                      border: "1px solid rgba(13, 110, 253, 0.16)",
                      borderRadius: "14px",
                      padding: "18px 20px",
                      color: "#1b2a4a",
                      fontSize: "15px",
                      lineHeight: 1.55,
                    }}
                  >
                    Visual 3 is the strictest layer. One circle means one
                    registered clinical-trial record. Pipeline-only assets are
                    not shown here unless a public trial record exists.
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
