function App() {
  return (
    <main
      style={{
        background: "#f1f0ec",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
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
          padding: "0 24px",
          boxSizing: "border-box",
          background: "#f1f0ec",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1260px",
            height: "900px",
            overflow: "hidden",
            background: "#f1f0ec",
            transform: "translateY(-35px)",
          }}
        >
          <iframe
            title="Company Landscape"
            width="100%"
            height="980"
            frameBorder="0"
            src="https://observablehq.com/embed/e3028f2577c04f9a@947?cells=visual1CompanyLandscapePremium&api_key=a8002f8c0dbb441abb6abf8c5201b5059cd78991"
            style={{
              display: "block",
              width: "100%",
              height: "980px",
              border: "0",
              background: "#f1f0ec",
              transform: "scale(1.14)",
              transformOrigin: "center top",
            }}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
