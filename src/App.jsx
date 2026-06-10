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

function StickyCompanyTransition({ ecosystemRef, companyRef }) {
  const [styleState, setStyleState] = useState({
    opacity: 0,
    y: 0,
    scale: 1,
    blur: 0,
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

      const start = viewportH * 0.35;
      const end = -viewportH * 0.28;

      const raw = (ecoRect.bottom - start) / (start - end);
      const p = clamp(1 - raw, 0, 1);

      const isActive =
        ecoRect.bottom < viewportH * 0.95 &&
        companyRect.top > viewportH * 0.05 &&
        p > 0 &&
        p < 1;

      const opacity = isActive
        ? p < 0.18
          ? p / 0.18
          : p > 0.82
            ? (1 - p) / 0.18
            : 1
        : 0;

      const y = -80 + p * 260;
      const scale = 1 - p * 0.28;
      const blur = p > 0.78 ? (p - 0.78) * 10 : 0;

      setStyleState({
        opacity: clamp(opacity, 0, 1),
        y,
        scale,
        blur,
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

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        width: "156px",
        height: "156px",
        borderRadius: "50%",
        transform: `translate(-50%, calc(-50% + ${styleState.y}px)) scale(${styleState.scale})`,
        opacity: styleState.opacity,
        pointerEvents: "none",
        zIndex: 12,
        background:
          "radial-gradient(circle at 36% 28%, rgba(255,255,255,1), rgba(244,242,236,0.98) 48%, rgba(217,214,204,0.92) 100%)",
        border: "1px solid rgba(255,255,255,0.95)",
        boxShadow:
          "0 24px 70px rgba(29,29,31,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
        filter: `blur(${styleState.blur}px)`,
        transition: "opacity 80ms linear",
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

      <StickyCompanyTransition
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
