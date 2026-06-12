const OBSERVABLE_API_KEY = "b445e0c80939463973325d8fd7fc9ac162f1f7ea";
const NOTEBOOK = "e3028f2577c04f9a@1010";

const frames = [
  {
    title: "Psychedelic Trial Atlas — Hero",
    cell: "heroSection",
    height: 836,
  },
  {
    title: "Psychedelic Trial Atlas — Ecosystem Overview",
    cell: "visual1EcosystemOverview",
    height: 796,
  },
  {
    title: "Psychedelic Trial Atlas — Company Landscape",
    cell: "visual1EcosystemToCompanyTransition",
    height: 796,
  },
  {
    title: "Psychedelic Trial Atlas — Visual 2 Intro",
    cell: "visual2IntroTransition",
    height: 747,
  },
];

function ObservableFrame({ title, cell, height }) {
  const src = `https://observablehq.com/embed/${NOTEBOOK}?cells=${cell}&api_key=${OBSERVABLE_API_KEY}`;

  return (
    <section className="atlas-section">
      <div className="atlas-frame-wrap" style={{ height }}>
        <iframe
          title={title}
          src={src}
          width="100%"
          height={height}
          frameBorder="0"
          scrolling="no"
          className="atlas-frame"
        />
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

        .atlas-section {
          width: 100%;
          background: #f1f0ec;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        .atlas-frame-wrap {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          background: #f1f0ec;
          overflow: hidden;
        }

        .atlas-frame {
          display: block;
          width: 100%;
          border: 0;
          background: #f1f0ec;
        }
      `}</style>

      <main className="atlas-page">
        {frames.map((frame) => (
          <ObservableFrame key={frame.cell} {...frame} />
        ))}
      </main>
    </>
  );
}

export default App;
