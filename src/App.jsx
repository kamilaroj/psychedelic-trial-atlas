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

        .page {
          width: 100%;
          min-height: 100vh;
          background: #f1f0ec;
          overflow-x: hidden;
        }

        .frame-wrap {
          width: 100%;
          max-width: 1320px;
          height: 1595.671875px;
          margin: 0 auto;
          background: #f1f0ec;
          overflow: hidden;
        }

        iframe {
          display: block;
          width: 100%;
          height: 1595.671875px;
          border: 0;
          background: #f1f0ec;
        }
      `}</style>

      <main className="page">
        <div className="frame-wrap">
          <iframe
            title="Psychedelic Trial Atlas — Hero and Ecosystem Overview"
            width="100%"
            height="1595.671875"
            frameBorder="0"
            scrolling="no"
            src="https://observablehq.com/embed/e3028f2577c04f9a@1012?cells=heroAndVisual1A&api_key=c6f0493e09f6866094b2f218c5b7ecb88e223c9c"
          />
        </div>
      </main>
    </>
  );
}

export default App;
