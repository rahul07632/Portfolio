import { Link } from "react-router-dom";

const items = [
  ["01", "Case Studies", "/work"],
  ["02", "Tech Stack", "/stack"],
  ["03", "Profile & Approach", "/about"],
  ["04", "Education", "/education"],
  ["05", "Contact", "/contact"],
];

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      id="menuOverlay"
      aria-hidden={!isOpen}
      className={`mobile-menu fixed inset-0 z-[70] bg-[var(--bg)]/95 text-[var(--text)] flex-col justify-between p-5 sm:p-10 backdrop-blur-md ${isOpen ? "is-open" : ""}`}
      data-open={isOpen}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">Index</span>
        <button id="closeMenuOverlayBtn" type="button" onClick={onClose} className="px-3 py-1.5 rounded-full border border-[var(--border)] font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]" aria-label="Close navigation menu">
          Close ✕
        </button>
      </div>

      <nav aria-label="Mobile Navigation" className="mx-auto flex w-full max-w-xl flex-col gap-3 py-7">
        {items.map(([number, label, href]) => (
          <Link
            key={href}
            to={href}
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            className="overlay-link flex items-center gap-3 rounded-2xl border border-transparent px-2 py-3 font-display font-bold text-[1.75rem] leading-none tracking-[-0.05em] transition-all duration-200 hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] opacity-65">{number}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-4 font-mono text-[10px] uppercase tracking-[0.16em]">
        <button id="overlayResumeBtn" type="button" onClick={onClose} className="px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-semibold">Open Resume ↗</button>
        <div className="flex gap-4 opacity-70">
          <a href="https://github.com/rahul07632" target="_blank" rel="noopener noreferrer" onClick={onClose} className="hover:text-[var(--accent)]">GitHub</a>
          <a href="https://www.linkedin.com/in/rahulvishwakarma78/" target="_blank" rel="noopener noreferrer" onClick={onClose} className="hover:text-[var(--accent)]">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
