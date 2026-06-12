import { useState } from "react";

const OBSERVABLE_API_KEY = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
const NOTEBOOK = "e3028f2577c04f9a@1010";

const OBSERVABLE_FOOTER_CROP = 42;

const frames = [
  {
    id: "hero",
    title: "Psychedelic Trial Atlas — Hero",
    cell: "heroSection",
    iframeHeight: 862,
    type: "hero",
  },
  {
    id: "visual1a",
    title: "Psychedelic Trial Atlas — Ecosystem Overview",
    cell: "visual1EcosystemOverview",
    iframeHeight: 842,
    type: "visual",
  },
  {
    id: "visual1b",
    title: "Psychedelic Trial Atlas — Company Landscape",
    cell: "visual1EcosystemToCompanyTransition",
    iframeHeight: 850,
    type: "visual",
  },
  {
    id: "visual2intro",
    title: "Psychedelic Trial Atlas — Visual 2 Intro",
    cell: "visual2IntroTransition",
    iframeHeight: 940,
    type: "visual",
  },
];

function HeroAmbient() {
  const circles = [
    { x: "12%", y: "18%", s: 120, d: "0s" },
    { x: "23%", y: "64%", s: 72, d: "1.2s" },
    { x: "72%", y: "18%", s: 96, d: "0.6s" },
    { x: "83%", y: "58%", s: 140, d: "1.8s" },
    { x: "47%", y: "78%", s: 62, d: "0.3s" },
    { x: "63%", y: "72%", s: 48, d: "1.5s" },
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

function ObservableFrame({ title, cell, iframeHeight, type }) {
  const [ready, setReady] = useState(false);

  const visibleHeight = iframeHeight - OBSERVABLE_FOOTER_CROP;
  const src = `https://observablehq.com/embed/${NOTEBOOK}?cells=${cell}&api_key=${OBSERVABLE_API_KEY}`;

  function handleLoad() {
    window.setTimeout(() => {
      setReady(true);
    }, type === "hero" ? 650 : 420);
  }

  return (
    <section className={`atlas-frame-section atlas-frame-section-${type}`}>
      <div
        className={`atlas-frame-outer atlas-frame-outer-${type}`}
        style={{ height: visibleHeight }}
      >
        {type === "hero" && <HeroAmbient />}

        <div className="atlas-frame-crop" style={{ height: visibleHeight }}>
          <div
            className={`atlas-frame-mask ${
              ready ? "is-hidden" : ""
            } ${type === "hero" ? "is-hero-mask" : "is-quiet-mask"}`}
          >
            {type === "hero" ? (
              <div className="atlas-loading-card">
                <div className="atlas-loading-title">
                  Psychedelic Trial Atlas
                </div>
                <div className="atlas-loading-subtitle">
                  Preparing the visible clinical-development ecosystem.
                </div>
                <div className="atlas-loading-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : null}
          </div>

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
          the organizations and development actors shaping psychedelic medicine.
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

        .atlas-frame-section {
          width: 100%;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          position: relative;
        }

        .atlas-frame-section-hero {
          min-height: 810px;
        }

        .atlas-frame-section-visual {
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

        .atlas-frame-outer-hero {
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
          transform: translateY(5px);
          transition:
            opacity 720ms ease,
            transform 720ms ease;
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
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            opacity 620ms ease,
            visibility 620ms ease;
        }

        .atlas-frame-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .atlas-frame-mask.is-quiet-mask {
          background: #f1f0ec;
        }

        .atlas-loading-card {
          width: min(520px, calc(100vw - 48px));
          padding: 34px 38px;
          border-radius: 24px;
          background: rgba(255,255,255,0.76);
          border: 1px solid rgba(29,29,31,0.08);
          box-shadow: 0 24px 70px rgba(29,29,31,0.08);
          text-align: center;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .atlas-loading-title {
          font-size: 28px;
          line-height: 1.05;
          font-weight: 850;
          letter-spacing: -0.065em;
          color: #1d1d1f;
          margin-bottom: 12px;
        }

        .atlas-loading-subtitle {
          font-size: 13px;
          line-height: 1.45;
          font-weight: 500;
          color: #61656f;
          max-width: 360px;
          margin: 0 auto;
        }

        .atlas-loading-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 22px;
        }

        .atlas-loading-dots span {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #1d1d1f;
          opacity: 0.22;
          animation: atlasPulse 1.4s ease-in-out infinite;
        }

        .atlas-loading-dots span:nth-child(2) {
          animation-delay: 160ms;
        }

        .atlas-loading-dots span:nth-child(3) {
          animation-delay: 320ms;
        }

        @keyframes atlasPulse {
          0% {
            transform: translateY(0);
            opacity: 0.18;
          }

          50% {
            transform: translateY(-5px);
            opacity: 0.42;
          }

          100% {
            transform: translateY(0);
            opacity: 0.18;
          }
        }

        .hero-ambient {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.55;
          mix-blend-mode: normal;
        }

        .hero-ambient-circle {
          position: absolute;
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 35% 28%,
              rgba(255,255,255,0.88),
              rgba(255,255,255,0.38) 38%,
              rgba(255,255,255,0.09) 72%
            );
          border: 1px solid rgba(255,255,255,0.48);
          box-shadow:
            0 22px 70px rgba(29,29,31,0.08),
            inset 0 2px 18px rgba(255,255,255,0.8);
          filter: blur(0.2px);
          transform: translate(-50%, -50%);
          animation: heroAmbientFloat 7.5s ease-in-out infinite alternate;
        }

        @keyframes heroAmbientFloat {
          0% {
            transform: translate(-50%, -50%) translate3d(-8px, 5px, 0) scale(0.985);
            opacity: 0.26;
          }

          50% {
            transform: translate(-50%, -50%) translate3d(8px, -7px, 0) scale(1.025);
            opacity: 0.44;
          }

          100% {
            transform: translate(-50%, -50%) translate3d(4px, 8px, 0) scale(1);
            opacity: 0.32;
          }
        }

        .atlas-bridge-section {
          width: 100%;
          min-height: 174px;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6px 22px 20px;
          margin-top: -18px;
          margin-bottom: -24px;
          position: relative;
          z-index: 8;
        }

        .atlas-bridge-card {
          width: min(560px, 100%);
          background: rgba(255,255,255,0.62);
          border: 1px solid rgba(29,29,31,0.065);
          border-radius: 24px;
          box-shadow: 0 18px 50px rgba(29,29,31,0.055);
          padding: 25px 34px 27px;
          text-align: center;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .atlas-kicker {
          font-size: 9.5px;
          font-weight: 820;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #8c9098;
          margin-bottom: 10px;
        }

        .atlas-bridge-card h2 {
          margin: 0 auto 10px;
          max-width: 470px;
          font-size: 24px;
          line-height: 1.05;
          letter-spacing: -0.06em;
          font-weight: 860;
          color: #1d1d1f;
        }

        .atlas-bridge-card p {
          margin: 0 auto;
          max-width: 480px;
          font-size: 12.4px;
          line-height: 1.5;
          color: #61656f;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .atlas-frame-outer {
            max-width: 100%;
          }

          .atlas-frame-section-hero {
            min-height: 780px;
          }

          .hero-ambient {
            opacity: 0.38;
          }

          .atlas-bridge-section {
            min-height: 162px;
            padding: 4px 18px 18px;
            margin-top: -14px;
            margin-bottom: -18px;
          }

          .atlas-bridge-card {
            padding: 22px 24px 24px;
            border-radius: 22px;
          }

          .atlas-bridge-card h2 {
            font-size: 21px;
          }

          .atlas-bridge-card p {
            font-size: 12px;
          }

          .atlas-loading-card {
            padding: 28px 26px;
          }

          .atlas-loading-title {
            font-size: 23px;
          }
        }
      `}</style>

      <main className="atlas-page">
        <ObservableFrame {...frames[0]} />
        <ObservableFrame {...frames[1]} />
        <BridgeCard />
        <ObservableFrame {...frames[2]} />
        <ObservableFrame {...frames[3]} />
      </main>
    </>
  );
}

export default App;
