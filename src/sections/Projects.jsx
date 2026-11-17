export default function Projects() {
  return (
    <>
      <section id="work" className="py-20 sm:py-28 border-b hairline">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 editorial-reveal">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest accent-text block mb-2">01 // SELECTED CASE STUDIES</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase">
                Deployed <span className="font-serif italic font-normal lowercase">Applications</span>
              </h2>
            </div>
            <p className="text-sm max-w-md opacity-75">
              Select a project from the editorial index to inspect its engineering architecture, verified live URL, and test its interactive sandbox directly.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 editorial-reveal" role="tablist" aria-label="Project Case Studies">
            <button type="button" data-case-id="todo" className="case-tab-btn text-left p-5 rounded-2xl accent-bg transition-all">
              <div className="font-mono text-[11px] opacity-80 mb-1">CASE 01 // CLIENT STATE &amp; CRUD</div>
              <div className="font-display font-bold text-lg">Todo Application</div>
              <div className="font-mono text-[11px] mt-1 opacity-80">todoo21.ccbp.tech ↗</div>
            </button>

            <button type="button" data-case-id="wiki" className="case-tab-btn text-left p-5 rounded-2xl surface-box hover:border-[var(--accent)] transition-all">
              <div className="font-mono text-[11px] opacity-60 mb-1">CASE 02 // ASYNC REST API</div>
              <div className="font-display font-bold text-lg">Wikipedia Search App</div>
              <div className="font-mono text-[11px] mt-1 opacity-60">wikipedia987.ccbp.tech ↗</div>
            </button>

            <button type="button" data-case-id="countries" className="case-tab-btn text-left p-5 rounded-2xl surface-box hover:border-[var(--accent)] transition-all">
              <div className="font-mono text-[11px] opacity-60 mb-1">CASE 03 // REAL-TIME FILTERING</div>
              <div className="font-display font-bold text-lg">Countries Search App</div>
              <div className="font-mono text-[11px] mt-1 opacity-60">population212.ccbp.tech ↗</div>
            </button>
          </div>


          <div id="caseStudyStage" className="surface-box rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start editorial-reveal">

            <div id="caseNarrativeCol" className="lg:col-span-6 space-y-6">

            </div>


            <div className="lg:col-span-6">
              <div className="rounded-2xl case-browser-shell overflow-hidden shadow-2xl">
                <div className="case-browser-header px-4 py-3 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span id="stageBrowserUrl" className="ml-2 truncate max-w-[200px] sm:max-w-xs case-sandbox-muted">https://todoo21.ccbp.tech/</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-volt/15 text-volt text-[10px]">LIVE SANDBOX</span>
                </div>
                <div id="caseSandboxBody" className="p-5 sm:p-6 min-h-[300px]">

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
