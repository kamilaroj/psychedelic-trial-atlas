function App() {
  return (
    <main
      style={{
        background: "#f1f0ec",
        minHeight: "100vh",
        color: "#1d1d1f",
        fontFamily:
          '"Inter", "Helvetica Neue", Arial, system-ui, sans-serif',
      }}
    >
      <section
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "56px 24px 32px",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              margin: "0 0 12px",
              fontFamily:
                '"Inter Tight", "Inter", "Helvetica Neue", Arial, system-ui, sans-serif',
              fontSize: "44px",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontWeight: 800,
            }}
          >
            Psychedelic Trial Atlas
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              color: "#61656f",
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            Web preview of the Visual 1 Company Landscape embed.
          </p>
        </header>

        <section
          style={{
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
            background: "#f1f0ec",
            overflow: "visible",
          }}
        >
          <iframe
            title="Visual 1 Company Landscape"
            width="100%"
            height="405"
            frameBorder="0"
            src="https://observablehq.com/embed/e3028f2577c04f9a@870?cells=visual1CompanyLandscape&api_key=56b35abcad40d7e4fbaa74604e78458cb605565c"
            style={{
              display: "block",
              width: "100%",
              border: "0",
              background: "#f1f0ec",
              overflow: "hidden",
            }}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
