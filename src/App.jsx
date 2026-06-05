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
    visibleHeight,
    maxWidth = "1500px",
    cropTop = 34,
    extraHeight = 260,
  }) => {
    const iframeHeight = visibleHeight + cropTop + extraHeight;

    return (
      <div
        style={{
          width: "100%",
          maxWidth,
          height: `${visibleHeight}px`,
          overflow: "hidden",
          margin: "0 auto",
          background: pageBackground,
          position: "relative",
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
            transform: `translateY(-${cropTop}px)`,
          }}
        />
      </div>
    );
  };

  const Section = ({ children, padding = "0 24px" }) => (
    <section
      style={{
        width: "100%",
        padding,
        margin: 0,
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
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Hero Section"
          cell="heroSection"
          visibleHeight={760}
          cropTop={34}
          extraHeight={220}
        />
      </Section>

      {/* VISUAL 1 — ECOSYSTEM OVERVIEW */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Psychedelic Ecosystem Overview"
          cell="visual1EcosystemOverview"
          visibleHeight={620}
          cropTop={34}
          extraHeight={320}
        />
      </Section>

      {/* VISUAL 1 — COMPANY LANDSCAPE */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Company Landscape"
          cell="visual1CompanyLandscape"
          visibleHeight={690}
          cropTop={34}
          extraHeight={340}
        />
      </Section>

      {/* COMPOUND INTRO */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Compound Activity Landscape Intro"
          cell="visual2IntroTransition"
          visibleHeight={760}
          cropTop={34}
          extraHeight={260}
        />
      </Section>

      {/* VISUAL 2 — COMPOUND ACTIVITY LANDSCAPE */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Compound Activity Landscape"
          cell="visual2Chartminimalistic"
          visibleHeight={700}
          cropTop={34}
          extraHeight={320}
        />
      </Section>

      {/* INDICATION INTRO */}
      <Section padding="0 24px 0">
        <ObservableFrame
          title="Indication Landscape Intro"
          cell="visual3IntroTransition"
          visibleHeight={720}
          cropTop={34}
          extraHeight={260}
        />
      </Section>

      {/* VISUAL 3 — INDICATION LANDSCAPE */}
      <Section padding="0 24px 40px">
        <ObservableFrame
          title="Indication Landscape"
          cell="visual3Chart"
          visibleHeight={700}
          cropTop={34}
          extraHeight={320}
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
