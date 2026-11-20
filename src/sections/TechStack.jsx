import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';

export default function TechStack() {
  const [filter, setFilter] = useState('All');

  const filteredSkills = filter === 'All' ? SKILLS : SKILLS.filter((s) => s.group === filter);

  return (
    <section id="craft" className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            03 / Technical Craft
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1.5">
            Interactive Skill Constellation.
          </h2>
        </div>

        <div className="inline-flex flex-wrap gap-1.5 p-1 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
          {['All', 'Frontend', 'Backend', 'Database', 'Tools'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`skill-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono ${
                filter === cat ? 'accent-btn font-semibold' : ''
              }`}
              style={{ color: filter === cat ? '' : 'var(--text-muted)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div id="skillGrid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filteredSkills.map((s) => (
          <div key={s.name} className="atelier-card hover-lift rounded-2xl p-4 sm:p-5 cursor-default">
            <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              {s.group}
            </span>
            <div className="font-bold text-base sm:text-lg mt-1">{s.name}</div>
            <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {s.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
