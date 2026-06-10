import { useEffect, useRef, useState } from "react";

function ObservableFrame({
  title,
  src,
  iframeHeight,
  wrapperHeight,
  scale = 1,
  translateY = "0px",
  maxWidth = "1280px",
  lazy = false,
}) {
  const wrapperRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [frameKey, setFrameKey] = useState(0);

  useEffect(() => {
    if (!lazy) return;

    const element = wrapperRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setShouldLoad(true);
          setFrameKey(prev => prev + 1);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.18,
        rootMargin: "160px 0px 160px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [lazy]);

  return (
    <div
      ref={wrapperRef}
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
      {shouldLoad && (
        <iframe
          key={frameKey}
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
      )}
    </div>
  );
}

function App() {
  const apiKey = "a8002f8c0dbb441abb6abf8c5201b5059cd78991";
  const notebook = "https://observablehq.com/embed/e3028f2577c04f9a@947";

  const sectionStyle = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    background: "#f1f0ec",
    overflow: "hidden",
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
            iframeHeight="900px"
            wrapperHeight="760px"
            scale={1}
            translateY="-18px"
            maxWidth="1320px"
          />
        </section>

        {/* ECOSYSTEM OVERVIEW */}
        <section style={sectionStyle}>
          <ObservableFrame
            title="Psychedelic Ecosystem Overview"
            src={`${notebook}?cells=visual1EcosystemOverview&api_key=${apiKey}`}
            iframeHeight="900px"
            wrapperHeight="760px"
            scale={1}
            translateY="-10px"
            maxWidth="1320px"
          />
        </section>

        {/* COMPANY LANDSCAPE */}
        <section style={sectionStyle}>
          <ObservableFrame
            title="Company Landscape"
            src={`${notebook}?cells=visual1CompanyLandscapePremium&api_key=${apiKey}`}
            iframeHeight="980px"
            wrapperHeight="820px"
            scale={1.14}
            translateY="-35px"
            maxWidth="1260px"
            lazy={true}
          />
        </section>
      </main>
    </>
  );
}

export default App;
