export default function Preloader() {
  return (
    <>
<div id="curtainLoader" className="fixed inset-0 z-[100] bg-ink text-paper flex flex-col justify-between p-6 sm:p-10 transition-transform duration-[450ms] ease-out">
    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-400">
      <span>RAHUL VISHWAKARMA // FOLIO 2026</span>
      <button id="skipLoaderBtn" type="button" className="text-volt hover:underline">ENTER SITE ↵</button>
    </div>
    <div className="space-y-2">
      <div className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight">FULL STACK<br/><span className="font-serif italic font-normal text-volt">Engineering</span></div>
      <div className="w-full max-w-sm h-[2px] bg-zinc-800 overflow-hidden">
        <div id="loaderProgressBar" className="h-full bg-volt transition-all duration-300" style={{ width: "100%" }}></div>
      </div>
    </div>
    <div className="font-mono text-xs text-zinc-500">KATNI, INDIA — B.TECH CSE '25</div>
  </div>
    </>
  );
}
