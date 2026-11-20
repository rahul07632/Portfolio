import React from 'react';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-10 border-t py-7 px-4 sm:px-6 text-xs font-mono"
      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] sm:text-xs">
        <span>© 2026 Rahul Vishwakarma · Katni, MP, India</span>
        <a
          href="#hero"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border hover-lift transition-all group"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--accent)' }}
        >
          <span className="font-semibold">Back to Top</span>
          <span className="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-sm bg-[var(--glow)] transition-transform duration-200 group-hover:-translate-y-1">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
