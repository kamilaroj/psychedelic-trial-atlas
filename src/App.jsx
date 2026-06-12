import { useState } from "react";

const OBSERVABLE_API_KEY = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
const NOTEBOOK = "e3028f2577c04f9a@1010";

const frames = [
  {
    id: "hero",
    title: "Psychedelic Trial Atlas — Hero",
    cell: "heroSection",
    height: 836,
  },
  {
    id: "visual1a",
    title: "Psychedelic Trial Atlas — Ecosystem Overview",
    cell: "visual1EcosystemOverview",
    height: 796,
  },
  {
    id: "visual1b",
    title: "Psychedelic Trial Atlas — Company Landscape",
    cell: "visual1EcosystemToCompanyTransition",
    height: 796,
  },
  {
    id: "visual2intro",
    title: "Psychedelic Trial Atlas — Visual 2 Intro",
    cell: "visual2IntroTransition",
    height: 808,
  },
];

function ObservableFrame({ title, cell, height }) {
  const [ready, setReady] = useState(false);

  const src = `https://observablehq.com/embed/${NOTEBOOK}?cells=${cell}&api_key=${OBSERVABLE_API_KEY}`;

  function handleLoad() {
    window.setTimeout(() => {
      setReady(true);
    }, 650);
  }

  return (
    <section className="atlas-frame-section">
      <div className="atlas-frame-wrap" style={{ height }}>
        <div className={`atlas-frame-mask ${ready ? "is-hidden" : ""}`}>
          <div className="atlas-loading-orb" />
        </div>

        <iframe
          className={`atlas-frame ${ready ? "is-ready" : ""}`}
          title={title}
          width="100%"
          height={height}
          frameBorder="0"
          scrolling="no"
          src={src}
          onLoad={handleLoad}
        />
      </div>
    </section>
  );
}

function BridgeCard() {
  return (
    <section className="atlas-bridge-section">
      <div className="atlas-bridge-card">
        <div className="atlas-kicker">From scale to actors</div>
        <h2>The next layer asks who is building the visible landscape.</h2>
        <p>
          The first view summarizes the ecosystem. The company landscape shifts
          from high-level signals to the organizations and development actors
          shaping psychedelic medicine.
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

        .atlas-frame-wrap {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          background: #f1f0ec;
          position: relative;
          overflow: hidden;
        }

        .atlas-frame {
          width: 100%;
          border: 0;
          display: block;
          background: #f1f0ec;
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 850ms ease,
            transform 850ms ease;
        }

        .atlas-frame.is-ready {
          opacity: 1;
          transform: translateY(0);
        }

        .atlas-frame-mask {
          position: absolute;
          inset: 0;
          z-index: 4;
          background: #f1f0ec;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            opacity 650ms ease,
            visibility 650ms ease;
        }

        .atlas-frame-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .atlas-loading-orb {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 34% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 34%, rgba(255,255,255,0.12) 70%),
            #ffffff;
          border: 1px solid rgba(29,29,31,0.08);
          box-shadow:
            0 18px 45px rgba(29,29,31,0.10),
            inset 0 1px 10px rgba(255,255,255,0.9);
          animation: atlasOrbPulse 1.45s ease-in-out infinite;
        }

        @keyframes atlasOrbPulse {
          0% {
            transform: scale(0.96);
            opacity: 0.42;
          }

          50% {
            transform: scale(1.06);
            opacity: 0.82;
          }

          100% {
            transform: scale(0.96);
            opacity: 0.42;
          }
        }

        .atlas-bridge-section {
          width: 100%;
          min-height: 260px;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 22px 54px;
        }

        .atlas-bridge-card {
          width: min(620px, 100%);
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(29,29,31,0.08);
          border-radius: 28px;
          box-shadow: 0 24px 70px rgba(29,29,31,0.08);
          padding: 34px 40px 36px;
          text-align: center;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .atlas-kicker {
          font-size: 10px;
          font-weight: 820;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #8c9098;
          margin-bottom: 13px;
        }

        .atlas-bridge-card h2 {
          margin: 0 auto 13px;
          max-width: 500px;
          font-size: 30px;
          line-height: 1.04;
          letter-spacing: -0.065em;
          font-weight: 880;
          color: #1d1d1f;
        }

        .atlas-bridge-card p {
          margin: 0 auto;
          max-width: 500px;
          font-size: 13px;
          line-height: 1.55;
          color: #61656f;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .atlas-frame-wrap {
            max-width: 100%;
          }

          .atlas-bridge-section {
            min-height: 240px;
            padding: 34px 18px 46px;
          }

          .atlas-bridge-card {
            padding: 28px 26px 30px;
            border-radius: 24px;
          }

          .atlas-bridge-card h2 {
            font-size: 24px;
          }

          .atlas-bridge-card p {
            font-size: 12.5px;
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
