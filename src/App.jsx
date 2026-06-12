import { useEffect, useRef, useState } from "react";

const OBSERVABLE_API_KEY = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
const NOTEBOOK = "e3028f2577c04f9a@1010";
const OBSERVABLE_FOOTER_CROP = 42;

const frames = {
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

function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(scrollHeight > 0 ? clamp(scrollTop / scrollHeight) : 0);
    }

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function useElementScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      if (!ref.current) return;

      const section = ref.current;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const current = -rect.top;

      setProgress(total > 0 ? clamp(current / total) : 0);
    }

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}

function ScrollProgressBar({ progress }) {
  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div
        className="scroll-progress-line"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

function HeroAmbient({ progress }) {
  const circles = [
    { x: "13%", y: "18%", s: 108, d: "0s" },
    { x: "22%", y: "64%", s: 66, d: "1.2s" },
    { x: "73%", y: "20%", s: 86, d: "0.6s" },
    { x: "84%", y: "58%", s: 122, d: "1.8s" },
    { x: "47%", y: "78%", s: 58, d: "0.3s" },
    { x: "63%", y: "72%", s: 44, d: "1.5s" },
  ];

  return (
    <div
      className="hero-ambient"
      aria-hidden="true"
      style={{
        opacity: 0.42 - progress * 0.16,
        transform: `translateY(${-progress * 32}px)`,
      }}
    >
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

function ObservableEmbed({
  title,
  cell,
  iframeHeight,
  className = "",
  quiet = true,
}) {
  const [ready, setReady] = useState(false);

  const visibleHeight = iframeHeight - OBSERVABLE_FOOTER_CROP;
  const src = `https://observablehq.com/embed/${NOTEBOOK}?cells=${cell}&api_key=${OBSERVABLE_API_KEY}`;

  function handleLoad() {
    window.setTimeout(() => {
      setReady(true);
    }, quiet ? 260 : 500);
  }

  return (
    <div
      className={`atlas-frame-outer ${className}`}
      style={{ height: visibleHeight }}
    >
      <div className="atlas-frame-crop" style={{ height: visibleHeight }}>
        <div className={`atlas-frame-mask ${ready ? "is-hidden" : ""}`} />

        <iframe
          className={`atlas-frame ${ready ? "is-ready" : ""}`}
          title={title}
          width="100%"
          height={iframeHeight}
          frameBorder="0"
          scrolling="no"
          src={src}
          onLoad={handleLoad}
          style={{
            height: `${iframeHeight}px`,
          }}
        />
      </div>
    </div>
  );
}

function HeroHandoff() {
  const sectionRef = useRef(null);
  const progress = useElementScrollProgress(sectionRef);

  const heroOpacity = clamp(1 - progress * 1.55);
  const heroTranslate = -progress * 135;
  const heroScale = 1 - progress * 0.055;

  const visualProgress = clamp((progress - 0.08) / 0.78);
  const visualOpacity = clamp((progress - 0.06) / 0.36);
  const visualTranslate = (1 - visualProgress) * 58;
  const visualScale = 0.955 + visualProgress * 0.045;

  return (
    <section className="hero-handoff-section" ref={sectionRef}>
      <div className="hero-sticky-scene">
        <HeroAmbient progress={progress} />

        <div
          className="hero-visual-reveal"
          style={{
            opacity: visualOpacity,
            transform: `translate3d(0, ${visualTranslate}vh, 0) scale(${visualScale})`,
          }}
        >
          <ObservableEmbed
            {...frames.visual1a}
            className="atlas-frame-outer-handoff"
            quiet
          />
        </div>

        <div
          className="hero-card-wrap"
          style={{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroTranslate}px, 0) scale(${heroScale})`,
            pointerEvents: heroOpacity < 0.08 ? "none" : "auto",
          }}
        >
          <div className="hero-card">
            <div className="hero-kicker">UNICORN1</div>

            <h1>Psychedelic Trial Atlas</h1>

            <p>
              Mapping visible clinical-trial and pipeline activity across
              psychedelic and psychedelic-adjacent medicine.
            </p>

            <div className="hero-method-note">
              Public trial records and selected pipeline context — separated,
              not collapsed.
            </div>

            <div className="hero-scroll-cue">
              <span />
              Scroll to enter the atlas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NormalObservableSection({ frame }) {
  return (
    <section className="atlas-frame-section">
      <ObservableEmbed {...frame} quiet />
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
  const pageProgress = usePageScrollProgress();

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
          background: rgba(97,101,111,0.74);
          box-shadow: 0 0 18px rgba(97,101,111,0.16);
          transition: transform 80ms linear;
        }

        .hero-handoff-section {
          position: relative;
          height: 178vh;
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

        .hero-ambient {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
          transition:
            opacity 80ms linear,
            transform 80ms linear;
        }

        .hero-ambient-circle {
          position: absolute;
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 35% 28%,
              rgba(255,255,255,0.86),
              rgba(255,255,255,0.36) 38%,
              rgba(255,255,255,0.08) 72%
            );
          border: 1px solid rgba(255,255,255,0.42);
          box-shadow:
            0 22px 70px rgba(29,29,31,0.075),
            inset 0 2px 18px rgba(255,255,255,0.76);
          filter: blur(0.2px);
          transform: translate(-50%, -50%);
          animation: heroAmbientFloat 8s ease-in-out infinite alternate;
        }

        @keyframes heroAmbientFloat {
          0% {
            transform: translate(-50%, -50%) translate3d(-7px, 5px, 0) scale(0.99);
            opacity: 0.22;
          }

          50% {
            transform: translate(-50%, -50%) translate3d(7px, -6px, 0) scale(1.022);
            opacity: 0.38;
          }

          100% {
            transform: translate(-50%, -50%) translate3d(4px, 7px, 0) scale(1);
            opacity: 0.28;
          }
        }

        .hero-card-wrap {
          position: relative;
          z-index: 4;
          width: min(680px, calc(100vw - 42px));
          transition:
            opacity 70ms linear,
            transform 70ms linear;
          will-change: transform, opacity;
        }

        .hero-card {
          width: 100%;
          background: rgba(255,255,255,0.76);
          border: 1px solid rgba(29,29,31,0.075);
          border-radius: 30px;
          box-shadow: 0 28px 90px rgba(29,29,31,0.08);
          padding: 54px 58px 42px;
          text-align: center;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .hero-kicker {
          font-size: 10px;
          font-weight: 840;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #8c9098;
          margin-bottom: 18px;
        }

        .hero-card h1 {
          margin: 0 auto 18px;
          font-size: clamp(42px, 6vw, 74px);
          line-height: 0.93;
          letter-spacing: -0.085em;
          font-weight: 900;
          color: #1d1d1f;
          max-width: 560px;
        }

        .hero-card p {
          margin: 0 auto;
          max-width: 500px;
          font-size: 15px;
          line-height: 1.52;
          color: #61656f;
          font-weight: 500;
        }

        .hero-method-note {
          width: fit-content;
          max-width: 100%;
          margin: 24px auto 0;
          padding: 9px 13px;
          border-radius: 999px;
          background: rgba(241,240,236,0.82);
          border: 1px solid rgba(29,29,31,0.06);
          color: #61656f;
          font-size: 11px;
          line-height: 1.3;
          font-weight: 650;
        }

        .hero-scroll-cue {
          margin-top: 30px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #8c9098;
          font-size: 10px;
          font-weight: 760;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-scroll-cue span {
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

        .hero-visual-reveal {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          will-change: transform, opacity;
          transition:
            transform 70ms linear,
            opacity 70ms linear;
        }

        .atlas-frame-section {
          width: 100%;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          position: relative;
          margin-top: -8px;
        }

        .atlas-frame-outer {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          background: #f1f0ec;
          position: relative;
          overflow: hidden;
        }

        .atlas-frame-outer-handoff {
          max-width: 1320px;
          box-shadow: none;
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
          transform: translateY(4px);
          transition:
            opacity 520ms ease,
            transform 520ms ease;
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
            opacity 420ms ease,
            visibility 420ms ease;
        }

        .atlas-frame-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .atlas-bridge-section {
          width: 100%;
          min-height: 142px;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 22px 10px;
          margin-top: -34px;
          margin-bottom: -38px;
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
            height: 172vh;
          }

          .hero-card {
            padding: 42px 28px 34px;
            border-radius: 26px;
          }

          .hero-card h1 {
            font-size: clamp(38px, 12vw, 54px);
          }

          .hero-card p {
            font-size: 13.5px;
          }

          .hero-method-note {
            font-size: 10.5px;
          }

          .atlas-frame-outer {
            max-width: 100%;
          }

          .atlas-bridge-section {
            min-height: 138px;
            padding: 0 18px 10px;
            margin-top: -24px;
            margin-bottom: -28px;
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
        <ScrollProgressBar progress={pageProgress} />

        <HeroHandoff />

        <BridgeCard />

        <NormalObservableSection frame={frames.visual1b} />

        <NormalObservableSection frame={frames.visual2intro} />
      </main>
    </>
  );
}

export default App;
