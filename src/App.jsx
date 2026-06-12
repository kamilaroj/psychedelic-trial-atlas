import { useRef, useEffect, useState } from "react";

const OBSERVABLE_API_KEY = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
const NOTEBOOK = "e3028f2577c04f9a@1010";

const frames = [
  { key: "hero", title: "Hero", cell: "heroSection", iframeHeight: 836, visibleHeight: 720 },
  { key: "visual1a", title: "Ecosystem Overview", cell: "visual1EcosystemOverview", iframeHeight: 796, visibleHeight: 732 },
  { key: "visual1b", title: "Company Landscape", cell: "visual1EcosystemToCompanyTransition", iframeHeight: 796, visibleHeight: 732 },
  { key: "visual2intro", title: "Visual 2 Intro", cell: "visual2IntroTransition", iframeHeight: 747, visibleHeight: 683 },
];

function src(cell) {
  return `https://observablehq.com/embed/${NOTEBOOK}?cells=${cell}&api_key=${OBSERVABLE_API_KEY}`;
}

function ProgressBar() {
  const ref = useRef(null);

  useEffect(() => {
    let raf = null;

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? scrollTop / scrollable : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        update();
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="progress-track">
      <div ref={ref} className="progress-line" />
    </div>
  );
}

function ObservableFrame({ frame, targetRef, isHero = false }) {
  const [ready, setReady] = useState(false);

  return (
    <section className={isHero ? "hero-shell" : "frame-section"} ref={targetRef}>
      <div
        className={isHero ? "hero-crop" : "frame-crop"}
        style={{ height: frame.visibleHeight }}
      >
        <div className={`frame-mask ${ready ? "is-hidden" : ""}`} />

        <iframe
          title={frame.title}
          src={src(frame.cell)}
          width="100%"
          height={frame.iframeHeight}
          frameBorder="0"
          scrolling="no"
          className={`observable-frame ${ready ? "is-ready" : ""}`}
          onLoad={() => setTimeout(() => setReady(true), 160)}
          style={{ height: `${frame.iframeHeight}px` }}
        />
      </div>

      {isHero && (
        <button
          type="button"
          className="journey-arrow-button"
          onClick={() =>
            document.querySelector("#visual1a")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        >
          <span className="journey-arrow-label">START YOUR JOURNEY</span>
          <span className="journey-arrow">
            <span className="journey-arrow-stem" />
            <span className="journey-arrow-head" />
          </span>
        </button>
      )}
    </section>
  );
}

function App() {
  const visual1Ref = useRef(null);

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0;
          width: 100%;
          min-height: 100%;
          background: #f1f0ec;
          scroll-behavior: smooth;
        }

        * { box-sizing: border-box; }

        body {
          overflow-x: hidden;
          background: #f1f0ec;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          background: #f1f0ec;
          color: #1d1d1f;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        .progress-track {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 9999;
          background: rgba(29,29,31,0.04);
          pointer-events: none;
        }

        .progress-line {
          width: 100%;
          height: 100%;
          transform: scaleX(0);
          transform-origin: left center;
          background: rgba(97,101,111,0.72);
        }

        .hero-shell {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 760px;
          background: #f1f0ec;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-crop,
        .frame-crop {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          overflow: hidden;
          background: #f1f0ec;
          position: relative;
        }

        .frame-section {
          width: 100%;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          padding: 0;
          margin: 0;
        }

        .observable-frame {
          display: block;
          width: 100%;
          border: 0;
          background: #f1f0ec;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 320ms ease, transform 320ms ease;
        }

        .observable-frame.is-ready {
          opacity: 1;
          transform: translateY(0);
        }

        .frame-mask {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: #f1f0ec;
          transition: opacity 240ms ease, visibility 240ms ease;
        }

        .frame-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .journey-arrow-button {
          position: absolute;
          left: 50%;
          bottom: 72px;
          transform: translateX(-50%);
          z-index: 8;
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .journey-arrow-label {
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.25em;
          font-weight: 760;
          color: rgba(29,29,31,0.48);
        }

        .journey-arrow {
          position: relative;
          width: 26px;
          height: 48px;
          display: block;
          animation: arrowFloat 1.75s ease-in-out infinite;
        }

        .journey-arrow-stem {
          position: absolute;
          left: 50%;
          top: 0;
          width: 1.5px;
          height: 34px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: rgba(29,29,31,0.42);
          animation: arrowStem 1.75s ease-in-out infinite;
        }

        .journey-arrow-head {
          position: absolute;
          left: 50%;
          bottom: 5px;
          width: 13px;
          height: 13px;
          border-right: 1.5px solid rgba(29,29,31,0.42);
          border-bottom: 1.5px solid rgba(29,29,31,0.42);
          transform: translateX(-50%) rotate(45deg);
          animation: arrowHead 1.75s ease-in-out infinite;
        }

        @keyframes arrowFloat {
          0% { transform: translateY(0); opacity: 0.62; }
          42% { transform: translateY(12px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.62; }
        }

        @keyframes arrowStem {
          0% { height: 18px; opacity: 0.2; }
          42% { height: 34px; opacity: 0.68; }
          100% { height: 18px; opacity: 0.2; }
        }

        @keyframes arrowHead {
          0% { bottom: 18px; opacity: 0.14; }
          42% { bottom: 5px; opacity: 0.72; }
          100% { bottom: 18px; opacity: 0.14; }
        }
      `}</style>

      <main className="page">
        <ProgressBar />

        <ObservableFrame frame={frames[0]} isHero />

        <div id="visual1a" ref={visual1Ref}>
          <ObservableFrame frame={frames[1]} />
        </div>

        <ObservableFrame frame={frames[2]} />

        <ObservableFrame frame={frames[3]} />
      </main>
    </>
  );
}

export default App;
