import { useEffect, useRef, useState } from "react";

const OBSERVABLE_API_KEY = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
const NOTEBOOK = "e3028f2577c04f9a@1010";

const OBSERVABLE_FOOTER_CROP = 42;

const frames = {
  visual1a: {
    title: "Psychedelic Trial Atlas — Ecosystem Overview",
    cell: "visual1EcosystemOverview",
    iframeHeight: 872,
  },
  visual1b: {
    title: "Psychedelic Trial Atlas — Company Landscape",
    cell: "visual1EcosystemToCompanyTransition",
    iframeHeight: 910,
  },
  visual2intro: {
    title: "Psychedelic Trial Atlas — Visual 2 Intro",
    cell: "visual2IntroTransition",
    iframeHeight: 1030,
  },
};

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function easeOutCubic(value) {
  const t = clamp(value);
  return 1 - Math.pow(1 - t, 3);
}

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

      const progress = scrollable > 0 ? clamp(scrollTop / scrollable) : 0;

      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${progress})`;
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

function HeroAmbient() {
  const circles = [
    { x: "12%", y: "18%", s: 112, d: "0s" },
    { x: "22%", y: "65%", s: 68, d: "1.2s" },
    { x: "73%", y: "21%", s: 88, d: "0.6s" },
    { x: "84%", y: "58%", s: 126, d: "1.8s" },
    { x: "47%", y: "79%", s: 58, d: "0.3s" },
    { x: "63%", y: "72%", s: 46, d: "1.5s" },
  ];

  return (
    <div className="hero-ambient" aria-hidden="true">
      {circles.map((circle, index) => (
        <span
          key={index}
          className="hero-ambient-circle"
          style={{
            left: circle.x,
            top: circle.y,
            width: circle.s,
            height: circle.s,
            animationDelay: circle.d,
          }}
        />
      ))}
    </div>
  );
}

function NativeHero() {
  return (
    <div className="native-hero">
      <div className="native-hero-kicker">UNICORN1</div>

      <h1>Psychedelic Trial Atlas</h1>

      <p>
        A data-driven map of visible clinical-trial and pipeline activity across
        psychedelic and psychedelic-adjacent medicine.
      </p>

      <div className="native-hero-note">
        Public trial records and selected pipeline context — separated, not
        collapsed.
      </div>

      <div className="native-hero-cue">
        <span />
        Scroll to enter the atlas
      </div>
    </div>
  );
}

function ObservableEmbed({ frame, className = "", handoff = false }) {
  const [ready, setReady] = useState(false);

  const visibleHeight = frame.iframeHeight - OBSERVABLE_FOOTER_CROP;

  function handleLoad() {
    window.setTimeout(() => {
      setReady(true);
    }, 180);
  }

  return (
    <div
      className={`atlas-frame-outer ${className}`}
      style={{ height: visibleHeight }}
    >
      <div className="atlas-frame-crop" style={{ height: visibleHeight }}>
        <div
          className={`atlas-frame-mask ${handoff ? "handoff-mask" : ""} ${
            ready ? "is-hidden" : ""
          }`}
        />

        <iframe
          className={`atlas-frame ${ready ? "is-ready" : ""}`}
          title={frame.title}
          width="100%"
          height={frame.iframeHeight}
          frameBorder="0"
          scrolling="no"
          loading={handoff ? "eager" : "lazy"}
          src={observableSrc(frame.cell)}
          onLoad={handleLoad}
          style={{
            height: `${frame.iframeHeight}px`,
          }}
        />
      </div>
    </div>
  );
}

function HeroToEcosystemHandoff() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const ambientRef = useRef(null);

  useEffect(() => {
    let raf = null;

    function update() {
      if (!sectionRef.current || !heroRef.current || !visualRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight;
      const progress =
        scrollDistance > 0 ? clamp(-rect.top / scrollDistance) : 0;

      /*
        Cinematic handoff:
        0.00–0.15: hero stays centered
        0.15–0.65: hero lifts clearly upward
        0.20–0.78: Visual 1A glides from below into center
        0.72–1.00: hero fades away, Visual 1A owns the screen
      */

      const heroLift = easeOutCubic(clamp((progress - 0.08) / 0.58));
      const heroFade = clamp((progress - 0.72) / 0.22);

      const visualEnter = easeOutCubic(clamp((progress - 0.16) / 0.58));
      const visualFade = clamp((progress - 0.12) / 0.24);

      const heroY = -heroLift * 430;
      const heroScale = 1 - heroLift * 0.035;
      const heroOpacity = 1 - heroFade * 0.96;

      const visualY = (1 - visualEnter) * 265;
      const visualScale = 0.945 + visualEnter * 0.055;
      const visualOpacity = visualFade;

      heroRef.current.style.transform = `translate3d(0, ${heroY}px, 0) scale(${heroScale})`;
      heroRef.current.style.opacity = heroOpacity;

      visualRef.current.style.transform = `translate3d(0, ${visualY}px, 0) scale(${visualScale})`;
      visualRef.current.style.opacity = visualOpacity;

      if (ambientRef.current) {
        ambientRef.current.style.transform = `translate3d(0, ${-heroLift * 42}px, 0)`;
        ambientRef.current.style.opacity = 0.34 - heroLift * 0.15;
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
    <section className="hero-handoff-section" ref={sectionRef}>
      <div className="hero-sticky-scene">
        <div className="hero-ambient-wrap" ref={ambientRef}>
          <HeroAmbient />
        </div>

        <div className="handoff-visual-layer" ref={visualRef}>
          <ObservableEmbed
            frame={frames.visual1a}
            className="handoff-visual-frame"
            handoff
          />
        </div>

        <div className="handoff-hero-layer" ref={heroRef}>
          <NativeHero />
        </div>
      </div>
    </section>
  );
}

function BridgeCard() {
  return (
    <section className="atlas-bridge-section">
      <div className="atlas-bridge-card">
        <div className="atlas-kicker">From scale to actors</div>
        <h2>Who is building the visible landscape?</h2>
        <p>
          The first view summarizes ecosystem scale. The next layer shifts to
          the organizations shaping psychedelic medicine.
        </p>
      </div>
    </section>
  );
}

function NormalObservableSection({ frame }) {
  return (
    <section className="atlas-frame-section">
      <ObservableEmbed frame={frame} />
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
          box-shadow: 0 0 18px rgba(97,101,111,0.14);
        }

        .hero-handoff-section {
          position: relative;
          height: 188vh;
          background: #f1f0ec;
        }

        .hero-sticky-scene {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #f1f0ec;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-ambient-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.34;
          will-change: transform, opacity;
        }

        .hero-ambient {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-ambient-circle {
          position: absolute;
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 35% 28%,
              rgba(255,255,255,0.86),
              rgba(255,255,255,0.34) 38%,
              rgba(255,255,255,0.08) 72%
            );
          border: 1px solid rgba(255,255,255,0.38);
          box-shadow:
            0 22px 70px rgba(29,29,31,0.065),
            inset 0 2px 18px rgba(255,255,255,0.72);
          filter: blur(0.2px);
          transform: translate(-50%, -50%);
          animation: heroAmbientFloat 8s ease-in-out infinite alternate;
        }

        @keyframes heroAmbientFloat {
          0% {
            transform: translate(-50%, -50%) translate3d(-7px, 5px, 0) scale(0.99);
            opacity: 0.18;
          }

          50% {
            transform: translate(-50%, -50%) translate3d(7px, -6px, 0) scale(1.022);
            opacity: 0.3;
          }

          100% {
            transform: translate(-50%, -50%) translate3d(4px, 7px, 0) scale(1);
            opacity: 0.23;
          }
        }

        .handoff-hero-layer {
          position: absolute;
          z-index: 4;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .native-hero {
          width: min(740px, calc(100vw - 44px));
          margin: 0 auto;
          text-align: center;
          color: #1d1d1f;
        }

        .native-hero-kicker {
          font-size: 9.5px;
          font-weight: 820;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #8c9098;
          margin-bottom: 16px;
        }

        .native-hero h1 {
          margin: 0 auto 14px;
          font-size: clamp(42px, 5.2vw, 70px);
          line-height: 0.94;
          letter-spacing: -0.085em;
          font-weight: 900;
          color: #1d1d1f;
          max-width: 680px;
        }

        .native-hero p {
          margin: 0 auto;
          max-width: 520px;
          font-size: 14px;
          line-height: 1.52;
          color: #61656f;
          font-weight: 500;
        }

        .native-hero-note {
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

        .native-hero-cue {
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

        .native-hero-cue span {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #8c9098;
          opacity: 0.55;
          animation: cuePulse 1.4s ease-in-out infinite;
        }

        @keyframes cuePulse {
          0%, 100% {
            transform: scale(0.85);
            opacity: 0.35;
          }

          50% {
            transform: scale(1.2);
            opacity: 0.72;
          }
        }

        .handoff-visual-layer {
          position: absolute;
          z-index: 2;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translate3d(0, 265px, 0) scale(0.945);
          will-change: transform, opacity;
        }

        .handoff-visual-frame {
          max-width: 1180px;
        }

        .handoff-visual-frame iframe {
          pointer-events: none;
        }

        .atlas-frame-section {
          width: 100%;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          position: relative;
          margin: 0;
          padding: 18px 0 24px;
        }

        .atlas-frame-outer {
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          background: #f1f0ec;
          position: relative;
          overflow: hidden;
        }

        .atlas-frame-crop {
          width: 100%;
          background: #f1f0ec;
          position: relative;
          overflow: hidden;
          z-index: 2;
        }

        .atlas-frame {
          width: 100%;
          border: 0;
          display: block;
          background: #f1f0ec;
          opacity: 0;
          transform: translateY(3px);
          transition:
            opacity 380ms ease,
            transform 380ms ease;
        }

        .atlas-frame.is-ready {
          opacity: 1;
          transform: translateY(0);
        }

        .atlas-frame-mask {
          position: absolute;
          inset: 0;
          z-index: 5;
          background: #f1f0ec;
          transition:
            opacity 280ms ease,
            visibility 280ms ease;
        }

        .atlas-frame-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .handoff-mask {
          transition:
            opacity 220ms ease,
            visibility 220ms ease;
        }

        .atlas-bridge-section {
          width: 100%;
          min-height: 154px;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 18px 22px 20px;
          margin: 0;
          position: relative;
          z-index: 8;
        }

        .atlas-bridge-card {
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

        .atlas-kicker {
          font-size: 9px;
          font-weight: 820;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #8c9098;
          margin-bottom: 8px;
        }

        .atlas-bridge-card h2 {
          margin: 0 auto 8px;
          max-width: 440px;
          font-size: 22px;
          line-height: 1.05;
          letter-spacing: -0.058em;
          font-weight: 860;
          color: #1d1d1f;
        }

        .atlas-bridge-card p {
          margin: 0 auto;
          max-width: 440px;
          font-size: 12px;
          line-height: 1.46;
          color: #61656f;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .hero-handoff-section {
            height: 180vh;
          }

          .native-hero {
            width: min(680px, calc(100vw - 38px));
          }

          .native-hero h1 {
            font-size: clamp(38px, 11vw, 56px);
          }

          .native-hero p {
            font-size: 13px;
          }

          .native-hero-note {
            font-size: 10.2px;
          }

          .handoff-visual-frame {
            max-width: 100%;
          }

          .atlas-frame-outer {
            max-width: 100%;
          }

          .atlas-frame-section {
            padding: 14px 0 20px;
          }

          .atlas-bridge-section {
            min-height: 148px;
            padding: 16px 18px 18px;
          }

          .atlas-bridge-card {
            padding: 20px 23px 22px;
            border-radius: 20px;
          }

          .atlas-bridge-card h2 {
            font-size: 20px;
          }

          .atlas-bridge-card p {
            font-size: 11.8px;
          }
        }
      `}</style>

      <main className="atlas-page">
        <ScrollProgressBar />

        <HeroToEcosystemHandoff />

        <BridgeCard />

        <NormalObservableSection frame={frames.visual1b} />

        <NormalObservableSection frame={frames.visual2intro} />
      </main>
    </>
  );
}

export default App;
