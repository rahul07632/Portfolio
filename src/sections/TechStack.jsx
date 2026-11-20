import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';

export default function TechStack() {
  const [filter, setFilter] = useState('All');

  const filteredSkills = filter === 'All' ? SKILLS : SKILLS.filter((s) => s.group === filter);

  return (
    <section id="craft" className="relative z-10 py-12 sm:py-20 px-3.5 sm:px-6 max-w-6xl mx-auto scroll-mt-20 sm:scroll-mt-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--accent)' }}>
            03 / Technical Craft
          </span>
          <h2 className="text-xl sm:text-4xl font-bold tracking-tight mt-1">
            Interactive Skill Constellation.
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            Filter by domain to inspect technical proficiencies.
          </p>
        </div>

        {/* Filter Buttons: Compact, horizontally scrollable on mobile */}
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar pt-1 pb-1 -mx-1 px-1">
          <div
            className="inline-flex items-center gap-1.5 p-1 rounded-xl border min-w-max shadow-sm"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            {['All', 'Frontend', 'Backend', 'Database', 'Tools'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`skill-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  filter === cat
                    ? 'accent-btn font-semibold shadow-sm scale-[1.02]'
                    : 'hover:opacity-80 active:scale-95'
                }`}
                style={{ color: filter === cat ? '' : 'var(--text-muted)' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div id="skillGrid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {filteredSkills.map((s) => (
          <div key={s.name} className="atelier-card hover-lift rounded-xl sm:rounded-2xl p-2.5 sm:p-5 cursor-default transition-all">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--accent)' }}>
              {s.group}
            </span>
            <div className="font-bold text-xs sm:text-lg mt-0.5 sm:mt-1 truncate">{s.name}</div>
            <p className="text-[10px] sm:text-xs mt-1 leading-tight sm:leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {s.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
