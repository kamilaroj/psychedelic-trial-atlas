function App() {
  const observableApiKey = "bd252c7dc3e9ff082411ba5bc8f2fd2b24c00bfd";

  return (
    <main
      style={{
        background: "#f4f4f2",
        minHeight: "100vh",
        color: "#1b2a4a",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflowX: "hidden",
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

      {/* VISUAL 2 SECTION */}
      <section
        style={{
          minHeight: "100vh",
          padding: "0",
          margin: "0",
          background: "#f4f4f2",
        }}
      >
        <iframe
          title="Psychedelic Trial Atlas Visual 2"
          width="100%"
          height="1180"
          frameBorder="0"
          scrolling="no"
          src={`https://observablehq.com/embed/e3028f2577c04f9a@677?cells=visual2Chartminimalistic&api_key=${observableApiKey}`}
          style={{
            display: "block",
            width: "100%",
            height: "1180px",
            border: 0,
            background: "#f4f4f2",
          }}
        />
      </section>

      {/* TRANSITION SECTION BETWEEN VISUAL 2 AND VISUAL 3 */}
      <section
        style={{
          minHeight: "78vh",
          padding: "0",
          margin: "0",
          background: "#f4f4f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            display: "block",
            width: "100%",
            height: "758px",
            border: 0,
            background: "#f4f4f2",
          }}
        />
      </section>

      {/* VISUAL 3 SECTION */}
      <section
        style={{
          minHeight: "100vh",
          padding: "0",
          margin: "0",
          background: "#f4f4f2",
        }}
      >
        <iframe
          title="Psychedelic Trial Atlas Visual 3"
          width="100%"
          height="1017"
          frameBorder="0"
          scrolling="no"
          src={`https://observablehq.com/embed/e3028f2577c04f9a@687?cells=visual3Chart&api_key=${observableApiKey}`}
          style={{
            display: "block",
            width: "100%",
            height: "1017px",
            border: 0,
            background: "#f4f4f2",
          }}
        />
      </section>

      {/* CLOSING / METHODOLOGY SECTION */}
      <section
        style={{
          padding: "84px 28px 110px",
          background: "#f4f4f2",
        }}
      >
        <div
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 800,
              color: "rgba(27, 42, 74, 0.56)",
              marginBottom: "14px",
            }}
          >
            Project logic
          </div>

          <h2
            style={{
              margin: "0 0 20px",
              fontSize: "clamp(34px, 4vw, 56px)",
              lineHeight: "1.02",
              letterSpacing: "-0.05em",
              fontWeight: 850,
              color: "#202124",
            }}
          >
            What this atlas shows
          </h2>

          <p
            style={{
              margin: "0 0 16px",
              color: "#4f5b6d",
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            The atlas focuses on visible clinical-development activity for
            psychedelic and psychedelic-adjacent medicines. The current public
            indication layer includes 50 registered patient-indication trial
            records that are current, upcoming, active, recruiting, recently
            completed, or strategically relevant.
          </p>

          <p
            style={{
              margin: "0",
              color: "#4f5b6d",
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            Historical completed studies before 2024, stopped or withdrawn
            trials, expanded-access records, approved-market-only assets,
            unclear records, and non-mental-health-adjacent studies are kept in
            the master dataset but excluded from the public Visual 3 layer.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
