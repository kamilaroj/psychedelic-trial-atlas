export default function App() {
  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#17213a]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-[#f7f5f1]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-black tracking-[0.28em]">UNICORN1</p>
            <p className="text-xs text-slate-500">Psychedelic Trial Atlas</p>
          </div>

          <div className="text-sm font-semibold text-slate-600">
            Visual 1 · Company Pipeline Map
          </div>
        </div>
      </header>

      <section className="pt-[72px]">
        <iframe
          title="Psychedelic Trial Atlas — Company Pipeline Map"
          width="100%"
          height="882"
          frameBorder="0"
          src="https://observablehq.com/embed/e3028f2577c04f9a@277?cells=chart&api_key=62083c8dd86943f9bd527c1129e92d8cd843a96f"
          className="block w-full"
        />
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
          Methodological note
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight">
          Registered clinical activity is separated from pipeline context.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Solid asset circles represent public registered clinical activity with a trial ID.
          Dashed ghost circles represent company-reported, preclinical, or pipeline-only
          programs without a public trial ID. This atlas maps visible development activity,
          not efficacy, approval, safety, or commercial success.
        </p>
      </section>
    </main>
  );
}
