export default function TechStack() {
  return (
    <>
<section id="stack" className="py-20 sm:py-28 border-b hairline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="mb-12 editorial-reveal">
          <span className="font-mono text-xs uppercase tracking-widest accent-text block mb-2">02 // TECHNICAL CAPABILITIES</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase">
            Engineering <span className="font-serif italic font-normal lowercase">Stack Ledger</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start editorial-reveal">
          
          <div className="lg:col-span-5 divide-y hairline border-t border-b hairline">
            <button type="button" data-layer="frontend" className="stack-row-btn w-full text-left py-5 px-4 flex items-center justify-between accent-bg transition-all">
              <div>
                <span className="font-mono text-[11px] opacity-75 block">LAYER 01</span>
                <span className="font-display font-bold text-xl">Frontend Architecture</span>
              </div>
              <i data-lucide="arrow-right" className="w-5 h-5"></i>
            </button>

            <button type="button" data-layer="backend" className="stack-row-btn w-full text-left py-5 px-4 flex items-center justify-between hover:bg-[var(--surface)] transition-all">
              <div>
                <span className="font-mono text-[11px] opacity-60 block">LAYER 02</span>
                <span className="font-display font-bold text-xl">Backend &amp; APIs</span>
              </div>
              <i data-lucide="arrow-right" className="w-5 h-5 opacity-50"></i>
            </button>

            <button type="button" data-layer="database" className="stack-row-btn w-full text-left py-5 px-4 flex items-center justify-between hover:bg-[var(--surface)] transition-all">
              <div>
                <span className="font-mono text-[11px] opacity-60 block">LAYER 03</span>
                <span className="font-display font-bold text-xl">Databases &amp; Storage</span>
              </div>
              <i data-lucide="arrow-right" className="w-5 h-5 opacity-50"></i>
            </button>

            <button type="button" data-layer="tooling" className="stack-row-btn w-full text-left py-5 px-4 flex items-center justify-between hover:bg-[var(--surface)] transition-all">
              <div>
                <span className="font-mono text-[11px] opacity-60 block">LAYER 04</span>
                <span className="font-display font-bold text-xl">Workflow &amp; Deployment</span>
              </div>
              <i data-lucide="arrow-right" className="w-5 h-5 opacity-50"></i>
            </button>
          </div>

          
          <div id="stackInspector" className="lg:col-span-7 surface-box rounded-3xl p-6 sm:p-8 space-y-6">
            
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
