function ObservableFrame({
  title,
  src,
  iframeHeight,
  wrapperHeight,
  scale = 1,
  translateY = "0px",
  maxWidth = "1280px",
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth,
        height: wrapperHeight,
        overflow: "hidden",
        background: "#f1f0ec",
        margin: "0 auto",
      }}
    >
      <iframe
        title={title}
        width="100%"
        height={iframeHeight}
        frameBorder="0"
        src={src}
        style={{
          display: "block",
          width: "100%",
          height: iframeHeight,
          border: "0",
          background: "#f1f0ec",
          transform: `translateY(${translateY}) scale(${scale})`,
          transformOrigin: "center top",
        }}
      />
    </div>
  );
}

function App() {
  const apiKey = "a8002f8c0dbb441abb6abf8c5201b5059cd78991";
  const notebook = "https://observablehq.com/embed/e3028f2577c04f9a@947";

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
        }
      `}</style>

      <main
        style={{
          background: "#f1f0ec",
          minHeight: "100vh",
          width: "100%",
          color: "#1d1d1f",
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* HERO */}
        <section
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            background: "#f1f0ec",
            overflow: "hidden",
          }}
        >
          <ObservableFrame
            title="Psychedelic Trial Atlas Hero"
            src={`${notebook}?cells=heroSection&api_key=${apiKey}`}
            iframeHeight="920px"
            wrapperHeight="900px"
            scale={1}
            translateY="-28px"
            maxWidth="1320px"
          />
        </section>

        {/* ECOSYSTEM OVERVIEW */}
        <section
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            background: "#f1f0ec",
            overflow: "hidden",
          }}
        >
          <ObservableFrame
            title="Psychedelic Ecosystem Overview"
            src={`${notebook}?cells=visual1EcosystemOverview&api_key=${apiKey}`}
            iframeHeight="900px"
            wrapperHeight="880px"
            scale={1}
            translateY="-28px"
            maxWidth="1320px"
          />
        </section>

        {/* COMPANY LANDSCAPE */}
        <section
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            background: "#f1f0ec",
            overflow: "hidden",
          }}
        >
          <ObservableFrame
            title="Company Landscape"
            src={`${notebook}?cells=visual1CompanyLandscapePremium&api_key=${apiKey}`}
            iframeHeight="980px"
            wrapperHeight="900px"
            scale={1.14}
            translateY="-35px"
            maxWidth="1260px"
          />
        </section>
      </main>
    </>
  );
}

export default App;
