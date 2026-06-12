function App() {
  return (
    <>
      <style>{`
        html,
        body,
        #root {
          margin: 0;
          width: 100%;
          min-height: 100%;
          background: #f1f0ec;
        }

        * {
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
          background: #f1f0ec;
        }

        iframe {
          display: block;
        }
      `}</style>

      <main
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#f1f0ec",
          color: "#1d1d1f",
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <section
          style={{
            width: "100%",
            background: "#f1f0ec",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1320px",
              background: "#f1f0ec",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <iframe
              title="UNICORN1 Psychedelic Trial Atlas Visual 1"
              width="100%"
              height="2310"
              frameBorder="0"
              scrolling="no"
              src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=heroSection%2Cvisual1EcosystemOverview%2Cvisual1EcosystemToCompanyTransition&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
              style={{
                width: "100%",
                height: "2310px",
                border: "0",
                display: "block",
                background: "#f1f0ec",
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
