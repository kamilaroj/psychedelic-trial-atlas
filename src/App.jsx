function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  const pageBackground = "#f4f4f2";

  const visualSectionStyle = {
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
    padding: 0,
    background: pageBackground,
    overflow: "hidden",
  };

  const iframeStyle = {
    display: "block",
    width: "100vw",
    maxWidth: "100vw",
    border: 0,
    background: pageBackground,
    margin: 0,
    padding: 0,
  };

  return (
    <main
      style={{
        background: pageBackground,
        minHeight: "100vh",
        color: "#1b2a4a",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* HERO / START */}
      <section
        style={{
          minHeight: "72vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "72px 28px 56px",
          boxSizing: "border-box",
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.88) 0%, rgba(244,244,242,1) 62%)",
        }}
      >
        <div
          style={{
            maxWidth: "980px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 800,
              color: "rgba(27, 42, 74, 0.56)",
              marginBottom: "18px",
            }}
          >
            UNICORN1
          </div>

          <h1
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: "0.95",
              letterSpacing: "-0.07em",
              fontWeight: 850,
              color: "#202124",
            }}
          >
            Psychedelic Trial Atlas
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              color: "#5b6475",
              fontSize: "18px",
              lineHeight: 1.55,
            }}
          >
            A visual data project mapping registered clinical-trial activity
            and visible pipeline context across psychedelic and
            psychedelic-adjacent medicines.
          </p>
        </div>
      </section>

      {/* VISUAL 2 — COMPOUND LANDSCAPE */}
      <section style={visualSectionStyle}>
        <iframe
          title="Psychedelic Trial Atlas Visual 2"
          width="100%"
          height="1180"
          frameBorder="0"
          scrolling="no"
          src={`https://observablehq.com/embed/e3028f2577c04f9a@677?cells=visual2Chartminimalistic&api_key=${observableApiKey}`}
          style={{
            ...iframeStyle,
            height: "1180px",
          }}
        />
      </section>

      {/* TRANSITION PAGE BETWEEN VISUAL 2 AND VISUAL 3 */}
      <section
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          minHeight: "78vh",
          padding: 0,
          background: pageBackground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <iframe
          title="Indication Landscape Intro"
          width="100%"
          height="758"
          frameBorder="0"
          scrolling="no"
          src={`https://observablehq.com/embed/e3028f2577c04f9a@677?cells=visual3IntroTransition&api_key=${observableApiKey}`}
          style={{
            ...iframeStyle,
            height: "758px",
          }}
        />
      </section>

      {/* VISUAL 3 — INDICATION LANDSCAPE */}
      <section style={visualSectionStyle}>
        <iframe
          title="Psychedelic Trial Atlas Visual 3"
          width="100%"
          height="1017"
          frameBorder="0"
          scrolling="no"
          src={`https://observablehq.com/embed/e3028f2577c04f9a@687?cells=visual3Chart&api_key=${observableApiKey}`}
          style={{
            ...iframeStyle,
            height: "1017px",
          }}
        />
      </section>
    </main>
  );
}

export default App;
