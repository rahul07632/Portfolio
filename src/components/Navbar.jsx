export default function Navbar({ onMenuOpen, isMenuOpen }) {
  return (
    <>
<header className="fixed top-0 left-0 right-0 z-50 border-b hairline backdrop-blur-md bg-[var(--bg)]/85">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
      
      <a href="#hero" className="flex items-center gap-3 group">
        <span className="w-8 h-8 rounded-full accent-bg flex items-center justify-center font-display font-bold text-xs tracking-tighter group-hover:scale-105 transition-transform">RV</span>
        <div className="leading-tight">
          <span className="font-display font-bold text-sm tracking-tight block">RAHUL VISHWAKARMA</span>
          <span className="font-mono text-[10px] opacity-65 block">FULL STACK DEVELOPER</span>
        </div>
      </a>

      
      <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7 font-mono text-xs uppercase tracking-wider">
        <a href="#work" className="hover:accent-text transition-colors"><span className="opacity-45 mr-1">01</span>Case Studies</a>
        <a href="#stack" className="hover:accent-text transition-colors"><span className="opacity-45 mr-1">02</span>Tech Stack</a>
        <a href="#about" className="hover:accent-text transition-colors"><span className="opacity-45 mr-1">03</span>Profile</a>
        <a href="#education" className="hover:accent-text transition-colors"><span className="opacity-45 mr-1">04</span>Education</a>
        <a href="#contact" className="hover:accent-text transition-colors"><span className="opacity-45 mr-1">05</span>Contact</a>
      </nav>

      
      <div className="flex items-center gap-2 sm:gap-3">
        <span id="liveClock" className="hidden sm:inline-block font-mono text-[11px] opacity-65 border-r hairline pr-3">IST --:--</span>

        <button id="themeBtn" type="button" aria-label="Switch Theme" className="px-3 py-1.5 rounded-full border hairline font-mono text-[11px] uppercase tracking-wider hover:border-[var(--accent)] transition-colors">
          <span className="dark:hidden">Obsidian</span>
          <span className="hidden dark:inline">Editorial Light</span>
        </button>

        <button id="openResumeBtn" type="button" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full accent-bg font-mono text-[11px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity">
          <span>Resume</span>
          <i data-lucide="arrow-up-right" className="w-3.5 h-3.5"></i>
        </button>

        <button id="menuOverlayBtn" type="button" aria-label={isMenuOpen ? "Close menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="menuOverlay" onClick={onMenuOpen} className="lg:hidden px-3 py-2 rounded-full border hairline font-mono text-[11px] uppercase">
          {isMenuOpen ? "Close ✕" : "Menu ☰"}
        </button>
      </div>
    </div>
  </header>
    </>
  );
}
