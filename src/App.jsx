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
    iframeHeight: 870,
    type: "visual",
  },
  {
    id: "visual2intro",
    title: "Psychedelic Trial Atlas — Visual 2 Intro",
    cell: "visual2IntroTransition",
    iframeHeight: 980,
    type: "visual",
  },
];

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

function ObservableFrame({ title, cell, iframeHeight, type }) {
  const [ready, setReady] = useState(type === "hero");

  const visibleHeight = iframeHeight - OBSERVABLE_FOOTER_CROP;
  const src = `https://observablehq.com/embed/${NOTEBOOK}?cells=${cell}&api_key=${OBSERVABLE_API_KEY}`;

  function handleLoad() {
    if (type === "hero") {
      setReady(true);
      return;
    }

    window.setTimeout(() => {
      setReady(true);
    }, 320);
  }

  return (
    <section className={`atlas-frame-section atlas-frame-section-${type}`}>
      <div
        className={`atlas-frame-outer atlas-frame-outer-${type}`}
        style={{ height: visibleHeight }}
      >
        {type === "hero" && <HeroAmbient />}

        <div className="atlas-frame-crop" style={{ height: visibleHeight }}>
          {type !== "hero" && (
            <div className={`atlas-frame-mask ${ready ? "is-hidden" : ""}`} />
          )}

          <iframe
            className={`atlas-frame atlas-frame-${type} ${
              ready ? "is-ready" : ""
            }`}
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
          min-height: 800px;
        }

        .atlas-frame-section-visual {
          margin-top: -10px;
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
          transform: translateY(4px);
          transition:
            opacity 620ms ease,
            transform 620ms ease;
        }

        .atlas-frame-hero {
          opacity: 1;
          transform: none;
          transition: none;
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
            opacity 520ms ease,
            visibility 520ms ease;
        }

        .atlas-frame-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .hero-ambient {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.42;
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
          .atlas-frame-outer {
            max-width: 100%;
          }

          .atlas-frame-section-hero {
            min-height: 770px;
          }

          .hero-ambient {
            opacity: 0.32;
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
