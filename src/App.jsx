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
          background: #a9c6d9;
        }

        * {
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
          background: #a9c6d9;
        }

        iframe {
          display: block;
        }

        .han-blue-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          color: #1d1d1f;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 18% 18%, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.12) 18%, transparent 42%),
            radial-gradient(circle at 78% 28%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 20%, transparent 46%),
            linear-gradient(90deg, rgba(92,125,150,0.30), rgba(194,219,234,0.52), rgba(105,139,164,0.26)),
            linear-gradient(180deg, #b7d1e2 0%, #a8c4d7 42%, #9fbdd3 100%);
        }

        .han-blue-page::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;

          background:
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.045) 0px,
              rgba(255,255,255,0.045) 1px,
              rgba(55,83,106,0.040) 2px,
              rgba(55,83,106,0.040) 3px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.018) 0px,
              rgba(255,255,255,0.018) 1px,
              transparent 1px,
              transparent 7px
            );

          opacity: 0.55;
          mix-blend-mode: soft-light;
        }

        .han-blue-page::after {
          content: "";
          position: fixed;
          inset: -20%;
          z-index: 0;
          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,0.00) 24%,
              rgba(255,255,255,0.30) 42%,
              rgba(255,255,255,0.12) 48%,
              transparent 62%
            ),
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,0.00) 64%,
              rgba(255,255,255,0.16) 78%,
              transparent 88%
            );

          filter: blur(26px);
          opacity: 0.42;
          animation: hanBlueSlowShimmer 22s ease-in-out infinite alternate;
        }

        @keyframes hanBlueSlowShimmer {
          0% {
            transform: translateX(-3%) translateY(0%);
            opacity: 0.32;
          }

          50% {
            transform: translateX(2%) translateY(-1%);
            opacity: 0.46;
          }

          100% {
            transform: translateX(4%) translateY(1%);
            opacity: 0.36;
          }
        }

        .atlas-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          padding: 0;
        }

        .atlas-frame-section {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 0;
          overflow: hidden;
          background: transparent;
        }

        .atlas-frame-wrap {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          background: transparent;
          overflow: hidden;
          border-radius: 0;
        }

        .atlas-frame {
          width: 100%;
          height: 2310px;
          border: 0;
          display: block;
          background: transparent;
        }

        @media (max-width: 900px) {
          .atlas-frame {
            height: 2320px;
          }
        }
      `}</style>

      <main className="han-blue-page">
        <div className="atlas-shell">
          <section className="atlas-frame-section">
            <div className="atlas-frame-wrap">
              <iframe
                className="atlas-frame"
                title="UNICORN1 Psychedelic Trial Atlas Visual 1"
                width="100%"
                height="2310"
                frameBorder="0"
                scrolling="no"
                src="https://observablehq.com/embed/e3028f2577c04f9a@1010?cells=heroSection%2Cvisual1EcosystemOverview%2Cvisual1EcosystemToCompanyTransition&api_key=b445e0c80939463973325d8fd7fc9ac162f1f7ea"
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
