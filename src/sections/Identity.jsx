import React, { useState } from 'react';
import { IDENTITY_DATA } from '../data/portfolioData';

export default function Identity() {
  const [activeTab, setActiveTab] = useState('story');
  const [hover2025, setHover2025] = useState(false);
  const [hover14, setHover14] = useState(false);

  return (
    <section id="identity" className="relative z-10 py-16 sm:py-24 px-3.5 sm:px-6 max-w-6xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--accent)' }}>
            01 / Identity Dossier
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mt-1.5">
            Background &amp; Approach.
          </h2>
        </div>

        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pt-1">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl border min-w-max shadow-sm" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
            <button
              type="button"
              onClick={() => setActiveTab('story')}
              className={`id-tab-btn px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'story' ? 'accent-btn font-semibold shadow-sm' : 'hover:opacity-80 active:scale-95'
              }`}
              style={{ color: activeTab === 'story' ? '' : 'var(--text-muted)' }}
            >
              Narrative
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`id-tab-btn px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'education' ? 'accent-btn font-semibold shadow-sm' : 'hover:opacity-80 active:scale-95'
              }`}
              style={{ color: activeTab === 'education' ? '' : 'var(--text-muted)' }}
            >
              Education
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('craft')}
              className={`id-tab-btn px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'craft' ? 'accent-btn font-semibold shadow-sm' : 'hover:opacity-80 active:scale-95'
              }`}
              style={{ color: activeTab === 'craft' ? '' : 'var(--text-muted)' }}
            >
              Principles
            </button>
          </div>
        </div>
      </div>

      <div id="identityPanel" className="atelier-card rounded-2xl sm:rounded-3xl p-4 sm:p-8">
        {activeTab === 'story' && (
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div
                className="hover-lift inline-flex items-center gap-2 px-3 py-1 rounded-lg border font-mono text-xs cursor-default"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--accent)' }}
              >
                {IDENTITY_DATA.narrative.badge}
              </div>
              <p className="text-base sm:text-xl leading-relaxed">
                I'm a <strong style={{ color: 'var(--accent)' }}>2025 Computer Science &amp; Engineering Fresher</strong> from Shri Ram Institute of Science and Technology, Jabalpur, trained in Full-Stack Web Development at NxtWave CCBP 4.0 Academy.
              </p>
              <p className="text-xs sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {IDENTITY_DATA.narrative.subText}
              </p>
            </div>

            <div className="md:col-span-5 grid grid-cols-2 gap-2 sm:gap-3">
              <div
                id="stat2025"
                onMouseEnter={() => setHover2025(true)}
                onMouseLeave={() => setHover2025(false)}
                className="atelier-card hover-lift p-2.5 min-[360px]:p-3.5 sm:p-5 rounded-xl sm:rounded-2xl cursor-default transition-all"
              >
                <div className="text-xl min-[360px]:text-2xl sm:text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                  2025
                </div>
                <div id="stat2025Label" className="font-mono text-[10px] min-[360px]:text-xs mt-1 font-semibold leading-tight">
                  {hover2025 ? 'CSE Fresher · Ready!' : 'B.Tech CSE Graduate'}
                </div>
                <p id="stat2025Sub" className="text-[10px] min-[360px]:text-[11px] mt-1 leading-tight" style={{ color: 'var(--text-muted)' }}>
                  {hover2025 ? 'Entry-level SDE' : 'Hover for status'}
                </p>
              </div>

              <div
                id="stat14"
                onMouseEnter={() => setHover14(true)}
                onMouseLeave={() => setHover14(false)}
                className="atelier-card hover-lift p-2.5 min-[360px]:p-3.5 sm:p-5 rounded-xl sm:rounded-2xl cursor-default transition-all"
              >
                <div className="text-xl min-[360px]:text-2xl sm:text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                  14+
                </div>
                <div id="stat14Label" className="font-mono text-[10px] min-[360px]:text-xs mt-1 font-semibold leading-tight">
                  {hover14 ? 'MERN + SQL' : 'Core Technologies'}
                </div>
                <p id="stat14Sub" className="text-[10px] min-[360px]:text-[11px] mt-1 leading-tight" style={{ color: 'var(--text-muted)' }}>
                  {hover14 ? 'CCBP Full-Stack' : 'Hover for stack'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="grid md:grid-cols-2 gap-6">
            {IDENTITY_DATA.education.map((item, idx) => (
              <div key={idx} className="atelier-card hover-lift p-5 rounded-2xl space-y-2">
                <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                  {item.period}
                </span>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  {item.institution}
                </p>
                <p className="text-sm leading-relaxed pt-1" style={{ color: 'var(--text-muted)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'craft' && (
          <div className="grid sm:grid-cols-3 gap-5">
            {IDENTITY_DATA.principles.map((p, idx) => (
              <div key={idx} className="atelier-card hover-lift p-5 rounded-2xl space-y-2">
                <h3 className="font-bold text-base" style={{ color: 'var(--accent)' }}>
                  {p.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
