import { useEffect, useRef, useState } from "react";

const OBSERVABLE_API_KEY = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
const NOTEBOOK = "e3028f2577c04f9a@1010";
const OBSERVABLE_FOOTER_CROP = 42;

const frames = {
  visual1a: {
    title: "Psychedelic Trial Atlas — Ecosystem Overview",
    cell: "visual1EcosystemOverview",
    iframeHeight: 796,
  },
  visual1b: {
    title: "Psychedelic Trial Atlas — Company Landscape",
    cell: "visual1EcosystemToCompanyTransition",
    iframeHeight: 796,
  },
  visual2intro: {
    title: "Psychedelic Trial Atlas — Visual 2 Intro",
    cell: "visual2IntroTransition",
    iframeHeight: 900,
  },
};

function observableSrc(cell) {
  return `https://observablehq.com/embed/${NOTEBOOK}?cells=${cell}&api_key=${OBSERVABLE_API_KEY}`;
}

function ScrollProgressBar() {
  const lineRef = useRef(null);

  useEffect(() => {
    let raf = null;

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? scrollTop / scrollable : 0;

      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
      }
    }

    function requestUpdate() {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        update();
      });
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div ref={lineRef} className="scroll-progress-line" />
    </div>
  );
}

function NativeHero() {
  return (
    <section className="hero-section">
      <div className="hero-card">
        <div className="hero-kicker">UNICORN1</div>
        <h1>Psychedelic Trial Atlas</h1>
        <p>
          A data-driven map of visible clinical-trial and pipeline activity across
          psychedelic and psychedelic-adjacent medicine.
        </p>
        <div className="hero-note">
          Public trial records and selected pipeline context — separated, not collapsed.
        </div>
        <div className="hero-cue">
          <span />
          Scroll to enter the atlas
        </div>
      </div>
    </section>
  );
}

function ObservableFrame({ frame }) {
  const [ready, setReady] = useState(false);
  const visibleHeight = frame.iframeHeight - OBSERVABLE_FOOTER_CROP;

  return (
    <section className="visual-section">
      <div className="frame-wrap" style={{ height: visibleHeight }}>
        <div className={`frame-mask ${ready ? "is-hidden" : ""}`} />

        <iframe
          className={`observable-frame ${ready ? "is-ready" : ""}`}
          title={frame.title}
          width="100%"
          height={frame.iframeHeight}
          frameBorder="0"
          scrolling="no"
          src={observableSrc(frame.cell)}
          onLoad={() => window.setTimeout(() => setReady(true), 160)}
          style={{ height: `${frame.iframeHeight}px` }}
        />
      </div>
    </section>
  );
}

function BridgeCard() {
  return (
    <section className="bridge-section">
      <div className="bridge-card">
        <div className="bridge-kicker">From scale to actors</div>
        <h2>Who is building the visible landscape?</h2>
        <p>
          The first view summarizes ecosystem scale. The next layer shifts to
          the organizations shaping psychedelic medicine.
        </p>
      </div>
    </section>
  );
}

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

        .atlas-page {
          width: 100%;
          min-height: 100vh;
          background: #f1f0ec;
          color: #1d1d1f;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          overflow-x: hidden;
        }

        .scroll-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 9999;
          background: rgba(29,29,31,0.045);
          pointer-events: none;
        }

        .scroll-progress-line {
          width: 100%;
          height: 100%;
          transform-origin: left center;
          transform: scaleX(0);
          background: rgba(97,101,111,0.72);
        }

        .hero-section {
          min-height: 100vh;
          background: #f1f0ec;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          animation: heroLift linear both;
          animation-timeline: scroll();
          animation-range: 0 28vh;
        }

        .hero-card {
          width: min(740px, calc(100vw - 44px));
          text-align: center;
          color: #1d1d1f;
          transform-origin: center;
        }

        .hero-kicker {
          font-size: 9.5px;
          font-weight: 820;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #8c9098;
          margin-bottom: 16px;
        }

        .hero-card h1 {
          margin: 0 auto 14px;
          font-size: clamp(42px, 5.2vw, 70px);
          line-height: 0.94;
          letter-spacing: -0.085em;
          font-weight: 900;
          max-width: 680px;
        }

        .hero-card p {
          margin: 0 auto;
          max-width: 520px;
          font-size: 14px;
          line-height: 1.52;
          color: #61656f;
          font-weight: 500;
        }

        .hero-note {
          width: fit-content;
          max-width: 100%;
          margin: 20px auto 0;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.58);
          border: 1px solid rgba(29,29,31,0.055);
          color: #61656f;
          font-size: 10.8px;
          line-height: 1.32;
          font-weight: 650;
          box-shadow: 0 10px 30px rgba(29,29,31,0.035);
        }

        .hero-cue {
          margin-top: 27px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #8c9098;
          font-size: 9.5px;
          font-weight: 760;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-cue span {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #8c9098;
          opacity: 0.55;
        }

        @keyframes heroLift {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-120px);
            opacity: 0.35;
          }
        }

        .visual-section {
          width: 100%;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 18px 0;
          margin: 0;
          overflow: hidden;
        }

        .frame-wrap {
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          background: #f1f0ec;
          position: relative;
          overflow: hidden;
        }

        .observable-frame {
          width: 100%;
          border: 0;
          display: block;
          background: #f1f0ec;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 360ms ease,
            transform 360ms ease;
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
          transition:
            opacity 260ms ease,
            visibility 260ms ease;
        }

        .frame-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .bridge-section {
          width: 100%;
          min-height: 148px;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 14px 22px 18px;
          margin: 0;
        }

        .bridge-card {
          width: min(520px, 100%);
          background: rgba(255,255,255,0.56);
          border: 1px solid rgba(29,29,31,0.055);
          border-radius: 22px;
          box-shadow: 0 16px 44px rgba(29,29,31,0.045);
          padding: 21px 30px 23px;
          text-align: center;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .bridge-kicker {
          font-size: 9px;
          font-weight: 820;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #8c9098;
          margin-bottom: 8px;
        }

        .bridge-card h2 {
          margin: 0 auto 8px;
          max-width: 440px;
          font-size: 22px;
          line-height: 1.05;
          letter-spacing: -0.058em;
          font-weight: 860;
        }

        .bridge-card p {
          margin: 0 auto;
          max-width: 440px;
          font-size: 12px;
          line-height: 1.46;
          color: #61656f;
          font-weight: 500;
        }

        @supports not (animation-timeline: scroll()) {
          .hero-section {
            animation: none;
          }
        }

        @media (max-width: 900px) {
          .hero-card h1 {
            font-size: clamp(38px, 11vw, 56px);
          }

          .hero-card p {
            font-size: 13px;
          }

          .hero-note {
            font-size: 10.2px;
          }

          .visual-section {
            padding: 12px 0;
          }

          .frame-wrap {
            max-width: 100%;
          }
        }
      `}</style>

      <main className="atlas-page">
        <ScrollProgressBar />
        <NativeHero />
        <ObservableFrame frame={frames.visual1a} />
        <BridgeCard />
        <ObservableFrame frame={frames.visual1b} />
        <ObservableFrame frame={frames.visual2intro} />
      </main>
    </>
  );
}

export default App;
