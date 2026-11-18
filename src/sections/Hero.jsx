import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between border-b hairline overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center flex-1">


          <div className="lg:col-span-7 space-y-7 z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border hairline font-mono text-[11px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available for Software &amp; Full-Stack Roles • Fresher CSE Graduate</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl xl:text-[84px] leading-[0.94] tracking-tight uppercase">
                Rahul<br />
                <span className="font-serif italic font-normal lowercase tracking-normal accent-text">Vishwakarma</span>
              </h1>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] pt-3 opacity-75">
                Full Stack Developer — Katni, Madhya Pradesh, India
              </p>
            </div>

            <p className="text-base sm:text-lg max-w-xl leading-relaxed opacity-85">
              I build responsive web interfaces, asynchronous REST API integrations, and full-stack projects grounded in strong fundamentals. As a <strong className="font-semibold">2025 Computer Science graduate</strong>, I combine my B.Tech foundation with intensive training from <strong className="font-semibold">NxtWave CCBP 4.0 Academy</strong> to create practical, production-minded applications.
            </p>


            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link to="/work" className="magnetic-el inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full accent-bg font-display font-bold text-xs sm:text-sm uppercase tracking-wider hover:opacity-90 transition-all">
                <span>Explore Case Studies</span>
                <i data-lucide="arrow-down-right" className="w-4 h-4"></i>
              </Link>

              <button id="heroResumeBtn" type="button" className="magnetic-el inline-flex items-center gap-2 px-5 py-3.5 rounded-full border hairline font-mono text-xs uppercase tracking-wider hover:border-[var(--accent)] transition-all">
                <i data-lucide="file-text" className="w-4 h-4 accent-text"></i>
                <span>View &amp; Download Resume</span>
              </button>

              <Link to="/contact" className="magnetic-el inline-flex items-center gap-2 px-5 py-3.5 rounded-full border hairline font-mono text-xs uppercase tracking-wider hover:border-[var(--accent)] transition-all">
                <span>Contact</span>
              </Link>
            </div>


            <div className="pt-4 flex flex-wrap items-center gap-5 font-mono text-xs">
              <a href="https://github.com/rahul07632" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 hover:accent-text transition-colors">
                <i data-lucide="github" className="w-4 h-4"></i>
                <span>github.com/rahul07632</span>
                <i data-lucide="arrow-up-right" className="w-3 h-3"></i>
              </a>
              <a href="https://www.linkedin.com/in/rahulvishwakarma78/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 hover:accent-text transition-colors">
                <i data-lucide="linkedin" className="w-4 h-4"></i>
                <span>linkedin.com/in/rahulvishwakarma78</span>
                <i data-lucide="arrow-up-right" className="w-3 h-3"></i>
              </a>
            </div>
          </div>


          <div className="lg:col-span-5">
            <div className="surface-box rounded-3xl overflow-hidden relative">

              <div className="px-5 py-3.5 border-b hairline flex items-center justify-between font-mono text-[11px]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                  <span>WEBGL // KINETIC CORE</span>
                </span>
                <span id="webglCoords" className="opacity-60">X:0.00 Y:0.00</span>
              </div>


              <div id="threeContainer" className="w-full h-[300px] sm:h-[360px] cursor-grab active:cursor-grabbing relative">
                <div className="absolute bottom-3 left-4 font-mono text-[10px] opacity-60 pointer-events-none">
                  Move cursor or drag to rotate 3D mesh
                </div>
              </div>


              <div className="px-5 py-3 border-t hairline flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                <span className="opacity-65">3D Mode:</span>
                <div className="flex items-center gap-1.5">
                  <button type="button" data-mesh-mode="wireframe" className="mesh-mode-btn px-2.5 py-1 rounded-full accent-bg font-semibold">Wireframe</button>
                  <button type="button" data-mesh-mode="faceted" className="mesh-mode-btn px-2.5 py-1 rounded-full border hairline hover:border-[var(--accent)]">Faceted</button>
                  <button type="button" data-mesh-mode="particles" className="mesh-mode-btn px-2.5 py-1 rounded-full border hairline hover:border-[var(--accent)]">Particles</button>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="border-t hairline py-3.5 overflow-hidden bg-[var(--surface)]">
          <div className="marquee-track font-mono text-xs uppercase tracking-[0.2em] flex items-center gap-8">
            <span>REACT.JS</span><span className="accent-text">✦</span>
            <span>JAVASCRIPT (ES6+)</span><span className="accent-text">✦</span>
            <span>NODE.JS &amp; EXPRESS</span><span className="accent-text">✦</span>
            <span>PYTHON</span><span className="accent-text">✦</span>
            <span>SQL &amp; SQLITE</span><span className="accent-text">✦</span>
            <span>HTML5 &amp; CSS3</span><span className="accent-text">✦</span>
            <span>REST APIS</span><span className="accent-text">✦</span>
            <span>B.TECH CSE 2025</span><span className="accent-text">✦</span>
            <span>NXTWAVE CCBP 4.0</span><span className="accent-text">✦</span>

            <span>REACT.JS</span><span className="accent-text">✦</span>
            <span>JAVASCRIPT (ES6+)</span><span className="accent-text">✦</span>
            <span>NODE.JS &amp; EXPRESS</span><span className="accent-text">✦</span>
            <span>PYTHON</span><span className="accent-text">✦</span>
            <span>SQL &amp; SQLITE</span><span className="accent-text">✦</span>
            <span>HTML5 &amp; CSS3</span><span className="accent-text">✦</span>
            <span>REST APIS</span><span className="accent-text">✦</span>
            <span>B.TECH CSE 2025</span><span className="accent-text">✦</span>
            <span>NXTWAVE CCBP 4.0</span><span className="accent-text">✦</span>
          </div>
        </div>
      </section>
    </>
  );
}
