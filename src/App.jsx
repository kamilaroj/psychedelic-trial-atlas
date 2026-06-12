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
        position: "relative",
      }}
    >
      <iframe
        title={title}
        width="100%"
        height={iframeHeight}
        frameBorder="0"
        scrolling="no"
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
  const apiKey = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
  const notebook = "https://observablehq.com/embed/e3028f2577c04f9a@1000";

  const sectionStyle = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    background: "#f1f0ec",
    overflow: "hidden",
    position: "relative",
  };

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
          background: "#f1f0ec",
          minHeight: "100vh",
          width: "100%",
          color: "#1d1d1f",
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* HERO */}
        <section style={sectionStyle}>
          <ObservableFrame
            title="Psychedelic Trial Atlas Hero"
            src={`${notebook}?cells=heroSection&api_key=${apiKey}`}
            iframeHeight="836px"
            wrapperHeight="760px"
            scale={1}
            translateY="-18px"
            maxWidth="1320px"
          />
        </section>

        {/* VISUAL 1A — ECOSYSTEM OVERVIEW */}
        <section style={sectionStyle}>
          <ObservableFrame
            title="The Psychedelic Ecosystem Overview"
            src={`${notebook}?cells=visual1EcosystemOverview&api_key=${apiKey}`}
            iframeHeight="796px"
            wrapperHeight="760px"
            scale={1.02}
            translateY="-18px"
            maxWidth="1280px"
          />
        </section>

        {/* VISUAL 1B — COMPANY LANDSCAPE TRANSITION */}
        <section style={sectionStyle}>
          <ObservableFrame
            title="Psychedelic Ecosystem to Company Landscape"
            src={`${notebook}?cells=visual1EcosystemToCompanyTransition&api_key=${apiKey}`}
            iframeHeight="796px"
            wrapperHeight="760px"
            scale={1.02}
            translateY="-18px"
            maxWidth="1280px"
          />
        </section>
      </main>
    </>
  );
}

export default App;
