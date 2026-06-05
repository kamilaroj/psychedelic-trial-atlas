function App() {
  const pageBackground = "#f1f0ec";
  const ink = "#1d1d1f";

  const observableSrc =
    "https://observablehq.com/embed/e3028f2577c04f9a@831?cells=heroSection%2Cvisual1EcosystemOverview%2Cvisual1CompanyLandscape%2Cvisual2IntroTransition%2Cvisual2Chartminimalistic%2Cvisual3IntroTransition%2Cvisual3Chart&api_key=ebe3768986d966e69077e8893a425ffaa2e55009";

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
          width: "100%",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          background: pageBackground,
          overflow: "hidden",
        }}
      >
        <iframe
          title="Psychedelic Trial Atlas"
          width="100%"
          height="4755"
          frameBorder="0"
          scrolling="no"
          src={observableSrc}
          style={{
            display: "block",
            width: "100%",
            height: "4755px",
            margin: 0,
            padding: 0,
            border: 0,
            background: pageBackground,
          }}
        />
      </section>

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
        `}
      </style>
    </main>
  );
}

export default App;
