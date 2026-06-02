function App() {
  return (
    <main
      style={{
        background: "#f4f4f2",
        minHeight: "100vh",
        color: "#1b2a4a",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <header
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "56px 28px 28px",
        }}
      >
        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "44px",
            lineHeight: "1.05",
            letterSpacing: "-0.04em",
          }}
        >
          Psychedelic Trial Atlas
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: 0,
            color: "#5b6475",
            fontSize: "16px",
            lineHeight: 1.5,
          }}
        >
          Prototype preview of the compound and indication landscapes.
        </p>
      </header>

      <section
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "24px 20px 70px",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(180, 185, 200, 0.45)",
            borderRadius: "28px",
            background: "#f4f4f2",
            boxShadow: "0 18px 50px rgba(30, 40, 70, 0.08)",
            overflow: "hidden",
          }}
        >
          {/* Visual 2 — Compound Landscape */}
          <iframe
            title="Psychedelic Trial Atlas Visual 2"
            width="100%"
            height="1180"
            frameBorder="0"
            scrolling="no"
            src="https://observablehq.com/embed/e3028f2577c04f9a@677?cells=visual2Chartminimalistic"
            style={{
              display: "block",
              width: "100%",
              height: "1180px",
              border: 0,
              background: "#f4f4f2",
            }}
          />

          {/* Transition page between Visual 2 and Visual 3 */}
          <iframe
            title="Indication Landscape Intro"
            width="100%"
            height="758"
            frameBorder="0"
            scrolling="no"
            src="https://observablehq.com/embed/e3028f2577c04f9a@677?cells=visual3IntroTransition"
            style={{
              display: "block",
              width: "100%",
              height: "758px",
              border: 0,
              background: "#f4f4f2",
            }}
          />

          {/* Visual 3 — Indication Landscape */}
          <iframe
            title="Psychedelic Trial Atlas Visual 3"
            width="100%"
            height="1017"
            frameBorder="0"
            scrolling="no"
            src="https://observablehq.com/embed/e3028f2577c04f9a@677?cells=visual3Chart"
            style={{
              display: "block",
              width: "100%",
              height: "1017px",
              border: 0,
              background: "#f4f4f2",
            }}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
