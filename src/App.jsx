function App() {
  const pageBackground = "#f1f0ec";
  const ink = "#1d1d1f";

  const observableApiKey = "ebe3768986d966e69077e8893a425ffaa2e55009";

  const observableBase =
    "https://observablehq.com/embed/e3028f2577c04f9a@831";

  // Extra iframe height hidden by the wrapper.
  // This helps hide the Observable footer / attribution area.
  const footerCrop = 64;

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  const ObservableFrame = ({
    title,
    cell,
    height,
    maxWidth = "1500px",
  }) => {
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

  const HeroSection = ({ children }) => (
    <section
      style={{
        width: "100%",
        minHeight: "100svh",
        padding: "0 24px",
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

  const Section = ({ children, padding = "12px 24px" }) => (
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
      <HeroSection>
        <ObservableFrame
          title="Hero Section"
          cell="heroSection"
          height="760px"
        />
      </HeroSection>

      {/* VISUAL 1 — ECOSYSTEM OVERVIEW */}
      <Section padding="8px 24px 4px">
        <ObservableFrame
          title="Psychedelic Ecosystem Overview"
          cell="visual1EcosystemOverview"
          height="630px"
        />
      </Section>

      {/* VISUAL 1 — COMPANY LANDSCAPE */}
      <Section padding="0 24px 20px">
        <ObservableFrame
          title="Company Landscape"
          cell="visual1CompanyLandscape"
          height="700px"
        />
      </Section>

      {/* COMPOUND INTRO */}
      <Section padding="28px 24px 8px">
        <ObservableFrame
          title="Compound Activity Landscape Intro"
          cell="visual2IntroTransition"
          height="700px"
        />
      </Section>

      {/* VISUAL 2 — COMPOUND ACTIVITY LANDSCAPE */}
      <Section padding="0 24px 20px">
        <ObservableFrame
          title="Compound Activity Landscape"
          cell="visual2Chartminimalistic"
          height="700px"
        />
      </Section>

      {/* INDICATION INTRO */}
      <Section padding="28px 24px 8px">
        <ObservableFrame
          title="Indication Landscape Intro"
          cell="visual3IntroTransition"
          height="690px"
        />
      </Section>

      {/* VISUAL 3 — INDICATION LANDSCAPE */}
      <Section padding="0 24px 48px">
        <ObservableFrame
          title="Indication Landscape"
          cell="visual3Chart"
          height="700px"
        />
      </Section>

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

          iframe {
            background: ${pageBackground};
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
