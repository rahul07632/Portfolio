export default function Preloader() {
  return (
    <div id="curtainLoader" className="portfolio-preloader fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-10">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-[var(--muted)]">Rahul Vishwakarma <span className="accent-text">// Portfolio</span></span>
        <button id="skipLoaderBtn" type="button" className="preloader-skip font-mono text-[10px] uppercase tracking-[0.18em]">
          Skip <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="preloader-content mx-auto w-full max-w-2xl">
        <span className="preloader-code-mark" aria-hidden="true">{'</>'}</span>
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Design <span className="accent-text">/</span> Develop <span className="accent-text">/</span> Deploy
        </span>
        <h1 className="preloader-title font-display text-3xl font-extrabold tracking-[-0.06em] sm:text-5xl">
          Full-Stack
          <br />
          <span className="preloader-title-accent font-serif font-normal italic accent-text">Developer.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          Frontend to backend, I build thoughtful web experiences end to end.
        </p>
        <div className="preloader-progress mt-7 h-[2px] w-full overflow-hidden">
          <div className="preloader-progress-fill h-full w-full origin-left"></div>
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
        <span>Katni, India</span>
        <span>Design <span className="accent-text">/</span> Engineer <span className="accent-text">/</span> Ship</span>
      </div>
    </div>
  );
}
