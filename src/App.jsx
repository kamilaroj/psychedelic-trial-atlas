import { useEffect, useRef, useState } from "react";

const OBSERVABLE_API_KEY = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
const NOTEBOOK = "e3028f2577c04f9a@1010";

const OBSERVABLE_FOOTER_CROP = 42;

const frames = {
  hero: {
    title: "Psychedelic Trial Atlas — Hero",
    cell: "heroSection",
    iframeHeight: 862,
  },
  visual1a: {
    title: "Psychedelic Trial Atlas — Ecosystem Overview",
    cell: "visual1EcosystemOverview",
    iframeHeight: 842,
  },
  visual1b: {
    title: "Psychedelic Trial Atlas — Company Landscape",
    cell: "visual1EcosystemToCompanyTransition",
    iframeHeight: 870,
  },
  visual2intro: {
    title: "Psychedelic Trial Atlas — Visual 2 Intro",
    cell: "visual2IntroTransition",
    iframeHeight: 980,
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
    { x: "13%", y: "18%", s: 108, d: "0s" },
    { x: "22%", y: "64%", s: 66, d: "1.2s" },
    { x: "73%", y: "20%", s: 86, d: "0.6s" },
    { x: "84%", y: "58%", s: 122, d: "1.8s" },
    { x: "47%", y: "78%", s: 58, d: "0.3s" },
    { x: "63%", y: "72%", s: 44, d: "1.5s" },
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

function HeroIframeWindow() {
  return (
    <div className="hero-iframe-window">
      <iframe
        className="hero-iframe"
        title={frames.hero.title}
        width="100%"
        height={frames.hero.iframeHeight}
        frameBorder="0"
        scrolling="no"
        src={observableSrc(frames.hero.cell)}
      />
    </div>
  );
}

function ObservableEmbed({ frame, className = "", handoff = false }) {
  const [ready, setReady] = useState(false);

  const visibleHeight = frame.iframeHeight - OBSERVABLE_FOOTER_CROP;

  function handleLoad() {
    window.setTimeout(() => {
      setReady(true);
    }, 220);
  }

  return (
    <div
      className={`atlas-frame-outer ${className}`}
      style={{ height: visibleHeight }}
    >
      <div className="atlas-frame-crop" style={{ height: visibleHeight }}>
        {!handoff && (
          <div className={`atlas-frame-mask ${ready ? "is-hidden" : ""}`} />
        )}

        {handoff && (
          <div
            className={`atlas-frame-mask atlas-frame-mask-handoff ${
              ready ? "is-hidden" : ""
            }`}
          />
        )}

        <iframe
          className={`atlas-frame ${ready ? "is-ready" : ""}`}
          title={frame.title}
          width="100%"
          height={frame.iframeHeight}
          frameBorder="0"
          scrolling="no"
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

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;
      const progress =
        scrollDistance > 0 ? clamp(-rect.top / scrollDistance) : 0;

      /*
        Key idea:
        - hero starts exactly centered
        - hero moves up over a longer scroll range
        - visual enters from below in pixels, not huge vh jumps
        - visual ends centered, not top-aligned
      */

      const heroMove = easeOutCubic(clamp((progress - 0.04) / 0.58));
      const heroFade = clamp((progress - 0.68) / 0.22);

      const visualMove = easeOutCubic(clamp((progress - 0.12) / 0.56));
      const visualFade = clamp((progress - 0.10) / 0.26);

      const heroY = -heroMove * 360;
      const heroScale = 1 - heroMove * 0.025;
      const heroOpacity = 1 - heroFade * 0.95;

      const visualY = (1 - visualMove) * 185;
      const visualScale = 0.965 + visualMove * 0.035;
      const visualOpacity = visualFade;

      heroRef.current.style.transform = `translate3d(0, ${heroY}px, 0) scale(${heroScale})`;
      heroRef.current.style.opacity = heroOpacity;

      visualRef.current.style.transform = `translate3d(0, ${visualY}px, 0) scale(${visualScale})`;
      visualRef.current.style.opacity = visualOpacity;

      if (ambientRef.current) {
        ambientRef.current.style.transform = `translate3d(0, ${-heroMove * 34}px, 0)`;
        ambientRef.current.style.opacity = 0.34 - heroMove * 0.16;
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
        <div ref={ambientRef} className="hero-ambient-wrap">
          <HeroAmbient />
        </div>

        <div ref={visualRef} className="handoff-visual-layer">
          <ObservableEmbed
            frame={frames.visual1a}
            className="handoff-visual-frame"
            handoff
          />
        </div>

        <div ref={heroRef} className="handoff-hero-layer">
          <HeroIframeWindow />
        </div>
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

        /*
          HERO HANDOFF
          Long enough to make the movement visible.
          Not too long to feel stuck.
        */

        .hero-handoff-section {
          position: relative;
          height: 230vh;
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
          pointer-events: none;
          overflow: hidden;
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
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
          pointer-events: none;
        }

        .hero-iframe-window {
          width: 100%;
          max-width: 1320px;
          height: 560px;
          overflow: hidden;
          background: transparent;
          position: relative;
        }

        .hero-iframe {
          width: 100%;
          height: 862px;
          border: 0;
          display: block;
          background: #f1f0ec;
          transform: translateY(-148px);
          pointer-events: none;
        }

        .handoff-visual-layer {
          position: absolute;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translate3d(0, 185px, 0) scale(0.965);
          will-change: transform, opacity;
        }

        .handoff-visual-frame {
          max-width: 1320px;
        }

        .handoff-visual-frame iframe {
          pointer-events: none;
        }

        /*
          NORMAL OBSERVABLE SECTIONS
        */

        .atlas-frame-section {
          width: 100%;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          position: relative;
          margin: 0;
          padding: 0;
        }

        .atlas-frame-outer {
          width: 100%;
          max-width: 1320px;
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
            opacity 420ms ease,
            transform 420ms ease;
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
            opacity 320ms ease,
            visibility 320ms ease;
        }

        .atlas-frame-mask-handoff {
          z-index: 6;
        }

        .atlas-frame-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /*
          BRIDGE CARD
        */

        .atlas-bridge-section {
          width: 100%;
          min-height: 160px;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 22px 22px 28px;
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
            height: 220vh;
          }

          .hero-iframe-window {
            height: 500px;
          }

          .hero-iframe {
            transform: translateY(-170px);
          }

          .atlas-frame-outer {
            max-width: 100%;
          }

          .atlas-bridge-section {
            min-height: 150px;
            padding: 18px 18px 24px;
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
