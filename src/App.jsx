import { useState } from "react";

function App() {
  const [frameReady, setFrameReady] = useState(false);

  const iframeSrc =
    "https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=heroSection%2Cvisual1EcosystemOverview%2Cvisual1EcosystemToCompanyTransition&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea";

  function handleFrameLoad() {
    // Small delay prevents the user seeing Observable's internal late rendering.
    window.setTimeout(() => {
      setFrameReady(true);
    }, 700);
  }

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

        .atlas-shell {
          width: 100%;
          min-height: 100vh;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
        }

        .atlas-frame-wrap {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          background: #f1f0ec;
          overflow: hidden;
          position: relative;
        }

        .atlas-frame {
          width: 100%;
          height: 2380px;
          border: 0;
          display: block;
          background: #f1f0ec;
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 900ms ease,
            transform 900ms ease;
        }

        .atlas-frame.is-ready {
          opacity: 1;
          transform: translateY(0);
        }

        .atlas-loading-mask {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: #f1f0ec;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            opacity 700ms ease,
            visibility 700ms ease;
        }

        .atlas-loading-mask.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .atlas-loading-card {
          width: min(520px, calc(100vw - 48px));
          padding: 34px 38px;
          border-radius: 24px;
          background: rgba(255,255,255,0.72);
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

        @media (max-width: 900px) {
          .atlas-frame {
            height: 2440px;
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
        <section className="atlas-shell">
          <div className="atlas-frame-wrap">
            <div
              className={`atlas-loading-mask ${
                frameReady ? "is-hidden" : ""
              }`}
            >
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
            </div>

            <iframe
              className={`atlas-frame ${frameReady ? "is-ready" : ""}`}
              title="UNICORN1 Psychedelic Trial Atlas — Visual 1"
              width="100%"
              height="2380"
              frameBorder="0"
              scrolling="no"
              src={iframeSrc}
              onLoad={handleFrameLoad}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
