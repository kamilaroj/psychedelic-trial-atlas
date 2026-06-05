function App() {
  const pageBackground = "#f1f0ec";
  const ink = "#1d1d1f";

  const observableApiKey = "ebe3768986d966e69077e8893a425ffaa2e55009";

  const observableBase =
    "https://observablehq.com/embed/e3028f2577c04f9a@831";

  const embedSrc = (cell) =>
    `${observableBase}?cells=${cell}&api_key=${observableApiKey}`;

  const ObservableFrame = ({
    title,
    cell,
    height,
    maxWidth = "1500px",
  }) => (
    <div
      style={{
        width: "100%",
        maxWidth,
        margin: "0 auto",
        background: pageBackground,
      }}
    >
      <iframe
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        src={embedSrc(cell)}
        style={{
          display: "block",
          width: "100%",
          height,
          margin: 0,
          padding: 0,
          border: 0,
          background: pageBackground,
          overflow: "hidden",
        }}
      />
    </div>
  );

  const Section = ({ children, padding = "0 24px" }) => (
    <section
      style={{
        width: "100%",
        padding,
        margin: 0,
        background: pageBackground,
        overflow: "visible",
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
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Hero Section"
          cell="heroSection"
          height="836px"
        />
      </Section>

      {/* VISUAL 1 — ECOSYSTEM OVERVIEW */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Psychedelic Ecosystem Overview"
          cell="visual1EcosystemOverview"
          height="594px"
        />
      </Section>

      {/* VISUAL 1 — COMPANY LANDSCAPE */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Company Landscape"
          cell="visual1CompanyLandscape"
          height="666px"
        />
      </Section>

      {/* COMPOUND INTRO */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Compound Activity Landscape Intro"
          cell="visual2IntroTransition"
          height="808px"
        />
      </Section>

      {/* VISUAL 2 — COMPOUND ACTIVITY LANDSCAPE */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Compound Activity Landscape"
          cell="visual2Chartminimalistic"
          height="724px"
        />
      </Section>

      {/* INDICATION INTRO */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Indication Landscape Intro"
          cell="visual3IntroTransition"
          height="757px"
        />
      </Section>

      {/* VISUAL 3 — INDICATION LANDSCAPE */}
      <Section padding="0 24px 40px">
        <ObservableFrame
          title="Indication Landscape"
          cell="visual3Chart"
          height="724px"
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
            overflow: hidden;
          }

          @media (max-width: 900px) {
            section {
              padding-left: 12px !important;
              padding-right: 12px !important;
            }
          }
        `}
      </style>
    </main>
  );
}

export default App;
