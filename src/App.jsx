import { ArrowRight, Database, Network, Search } from "lucide-react";

export default function App() {
  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#17213a]">
      <header className="border-b border-black/10 bg-white/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-black tracking-[0.25em]">UNICORN1</p>
            <p className="text-xs text-slate-500">Psychedelic clinical intelligence</p>
          </div>

          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#visuals">Visuals</a>
            <a href="#methodology">Methodology</a>
            <a href="#limits">Limitations</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-5 inline-block rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Visible clinical development, not hype
          </p>

          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Psychedelic Trial Atlas
          </h1>

          <p className="mt-3 text-xl font-semibold text-slate-600">
            by UNICORN1
          </p>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            Mapping visible clinical and pipeline activity across psychedelic medicine —
            by company, compound, indication, phase, recruitment status, and source visibility.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#visuals"
              className="inline-flex items-center justify-center rounded-full bg-[#17213a] px-6 py-4 font-bold text-white hover:bg-[#263553]"
            >
              Explore the atlas <ArrowRight className="ml-2 h-4 w-4" />
            </a>

            <a
              href="#methodology"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-6 py-4 font-bold text-[#17213a] hover:bg-white"
            >
              Read methodology
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white bg-white/70 p-6 shadow-2xl shadow-black/10">
          <div className="rounded-[1.5rem] bg-[#f1eee8] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Prototype visual system
            </p>

            <div className="mt-8 grid gap-5">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17213a] text-white">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black">Company Pipeline Map</p>
                    <p className="text-sm text-slate-500">Who is building what?</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17213a] text-white">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black">Compound Landscape</p>
                    <p className="text-sm text-slate-500">Which substances dominate visible activity?</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17213a] text-white">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black">Indication Map</p>
                    <p className="text-sm text-slate-500">Which conditions are being studied?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="visuals" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
          Visuals
        </p>
        <h2 className="mt-3 text-4xl font-black">Three ways of seeing the field.</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["01", "Companies", "Company → asset/program → public trial activity."],
            ["02", "Compounds", "Compound family → registered trials + pipeline context."],
            ["03", "Indications", "Mental-health indication → registered trials + recruiting status."],
          ].map(([number, title, text]) => (
            <div key={title} className="rounded-3xl bg-white/70 p-7 shadow-sm">
              <p className="text-sm font-black text-slate-400">{number}</p>
              <h3 className="mt-8 text-2xl font-black">{title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="methodology" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
          Methodology
        </p>
        <h2 className="mt-3 text-4xl font-black">Registered trials are not the same as pipeline claims.</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Solid nodes represent public registered clinical-trial activity. Ghost or dashed nodes
          represent company-reported pipeline context without a public trial ID.
        </p>
      </section>

      <section id="limits" className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] bg-[#17213a] p-8 text-white md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">
            Disclaimer
          </p>
          <h2 className="mt-3 text-3xl font-black">This is a visibility map, not medical or investment advice.</h2>
          <p className="mt-6 max-w-4xl leading-8 text-slate-300">
            The atlas maps publicly visible clinical-trial and pipeline activity. It does not assess
            efficacy, safety, approval status, treatment suitability, or commercial success.
          </p>
        </div>
      </section>
    </main>
  );
}