function App() {
  return (
    <main
      style={{
        background: "#f1f0ec",
        minHeight: "100vh",
        color: "#1d1d1f",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "980px",
            height: "600px",
            overflow: "hidden",
            background: "#f1f0ec",
          }}
        >
          <iframe
            title="Company Landscape"
            width="100%"
            height="636.046875"
            frameBorder="0"
            src="https://observablehq.com/embed/e3028f2577c04f9a@934?cells=visual1CompanyLandscapePremium&api_key=77b6bc98497b8c40292d16061d9f5af1e2afe3f4"
            style={{
              display: "block",
              width: "100%",
              border: "0",
              background: "#f1f0ec",
            }}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
