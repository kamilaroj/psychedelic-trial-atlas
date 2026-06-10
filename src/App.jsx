import { useEffect, useRef, useState } from "react";

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

function ScrollTriggeredObservableFrame({
  title,
  src,
  iframeHeight,
  wrapperHeight,
  scale = 1,
  translateY = "0px",
  maxWidth = "1280px",
}) {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [srcWithRun, setSrcWithRun] = useState("");

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        if (entry.isIntersecting && entry.intersectionRatio >= 0.42) {
          const separator = src.includes("?") ? "&" : "?";
          setSrcWithRun(`${src}${separator}run=${Date.now()}`);
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: [0, 0.25, 0.42, 0.55, 0.75],
        rootMargin: "-18% 0px -18% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      ref={sectionRef}
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
          title={title}
          width="100%"
          height={iframeHeight}
          frameBorder="0"
          scrolling="no"
          src={srcWithRun}
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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const particlePositions = Array.from({ length: 28 }, (_, i) => {
  const angle = i * 2.399963;
  const ring = i < 9 ? 68 : i < 19 ? 118 : 168;

  return {
    x: Math.cos(angle) * ring + Math.sin(i * 1.7) * 12,
    y: Math.sin(angle) * ring * 0.62 + Math.cos(i * 1.3) * 9,
    size: i % 5 === 0 ? 22 : i % 3 === 0 ? 17 : 13,
  };
});

function MorphCompanyTransition({ ecosystemRef, companyRef }) {
  const [state, setState] = useState({
    opacity: 0,
    p: 0,
  });

  useEffect(() => {
    let ticking = false;

    function update() {
      const ecosystem = ecosystemRef.current;
      const company = companyRef.current;

      if (!ecosystem || !company) return;

      const ecoRect = ecosystem.getBoundingClientRect();
      const companyRect = company.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const start = viewportH * 0.3;
      const end = -viewportH * 0.36;

      const raw = (ecoRect.bottom - start) / (start - end);
      const p = clamp(1 - raw, 0, 1);

      const isActive =
        ecoRect.bottom < viewportH * 1.05 &&
        companyRect.top > -viewportH * 0.1 &&
        p > 0 &&
        p < 1;

      const opacity = isActive
        ? p < 0.12
          ? p / 0.12
          : p > 0.9
            ? (1 - p) / 0.1
            : 1
        : 0;

      setState({
        opacity: clamp(opacity, 0, 1),
        p,
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [ecosystemRef, companyRef]);

  const p = state.p;
  const mainOpacity = state.opacity * clamp(1 - p * 1.35, 0, 1);
  const particleOpacity =
    state.opacity * (p < 0.22 ? 0 : p > 0.86 ? (1 - p) / 0.14 : 1);
  const mainScale = 1 + p * 1.15;
  const mainBlur = p * 5;

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        width: "420px",
        height: "300px",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 12,
        opacity: state.opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "156px",
          height: "156px",
          borderRadius: "50%",
          transform: `translate(-50%, -50%) scale(${mainScale})`,
          opacity: mainOpacity,
          background:
            "radial-gradient(circle at 36% 28%, rgba(255,255,255,1), rgba(244,242,236,0.98) 48%, rgba(217,214,204,0.92) 100%)",
          border: "1px solid rgba(255,255,255,0.95)",
          boxShadow:
            "0 24px 70px rgba(29,29,31,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
          filter: `blur(${mainBlur}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "44px",
            lineHeight: 1,
            fontWeight: 850,
            letterSpacing: "-0.06em",
            color: "#1d1d1f",
          }}
        >
          80
        </div>
        <div
          style={{
            marginTop: "10px",
            fontSize: "10px",
            lineHeight: 1.12,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#61656f",
            textAlign: "center",
          }}
        >
          Companies &
          <br />
          Developers
        </div>
      </div>

      {particlePositions.map((dot, i) => {
        const spread = clamp((p - 0.2) / 0.65, 0, 1);
        const ease = spread * spread * (3 - 2 * spread);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              borderRadius: "50%",
              transform: `translate(calc(-50% + ${dot.x * ease}px), calc(-50% + ${dot.y * ease}px)) scale(${0.35 + ease * 0.9})`,
              opacity: particleOpacity * ease,
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(217,215,207,0.75)",
              boxShadow: "0 10px 28px rgba(29,29,31,0.09)",
            }}
          />
        );
      })}
    </div>
  );
}

function App() {
  const ecosystemSectionRef = useRef(null);
  const companySectionRef = useRef(null);

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

      <MorphCompanyTransition
        ecosystemRef={ecosystemSectionRef}
        companyRef={companySectionRef}
      />

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

        <section ref={ecosystemSectionRef} style={sectionStyle}>
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

        <section ref={companySectionRef} style={sectionStyle}>
          <ScrollTriggeredObservableFrame
            title="Company Landscape"
            src={`${notebook}?cells=visual1CompanyLandscapePremium&api_key=${apiKey}`}
            iframeHeight="980px"
            wrapperHeight="820px"
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
