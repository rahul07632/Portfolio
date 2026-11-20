import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState('todo');
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [viewport, setViewport] = useState('desktop');

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];

  return (
    <section id="showcase" className="relative z-10 py-16 sm:py-24 px-3.5 sm:px-6 max-w-6xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--accent)' }}>
            02 / Interactive Project Stage
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mt-1.5">
            Select or hover a build to run live.
          </h2>
        </div>
        <p className="text-xs sm:text-sm max-w-md" style={{ color: 'var(--text-muted)' }}>
          Hover or click any project on the left to immediately inspect and test its live verified deployment.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div id="projectList" className="lg:col-span-5 flex flex-col gap-3">
          {PROJECTS.map((p) => {
            const isActive = p.id === activeProjectId;
            const isHovered = hoveredProjectId === p.id;
            const isLit = isActive || isHovered;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProjectId(p.id)}
                onMouseEnter={() => {
                  setHoveredProjectId(p.id);
                  setActiveProjectId(p.id);
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                className={`group atelier-card rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer ${
                  isLit ? 'translate-x-2 -translate-y-0.5 shadow-xl' : 'hover:translate-x-1'
                }`}
                style={{
                  borderColor: isLit ? p.accent : 'var(--border)',
                  boxShadow: isLit ? `0 14px 34px -10px ${p.accent}55` : undefined,
                  background: isActive ? `${p.accent}14` : undefined
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold" style={{ color: p.accent }}>
                    {p.index} / {p.category}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isLit ? p.accent : 'transparent',
                      color: isLit ? '#ffffff' : 'var(--text-muted)'
                    }}
                  >
                    <Play
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isLit ? 'scale-110 fill-current' : 'group-hover:scale-125'
                      }`}
                    />
                  </div>
                </div>

                <h3
                  className="text-xl font-bold mt-1.5 transition-colors duration-200"
                  style={{ color: isLit ? p.accent : undefined }}
                >
                  {p.title}
                </h3>

                <p className="text-xs leading-relaxed mt-1.5" style={{ color: 'var(--text-muted)' }}>
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md border font-mono text-[10px] transition-colors duration-200"
                      style={{
                        borderColor: isLit ? `${p.accent}66` : 'var(--border)',
                        color: isLit ? p.accent : 'var(--text-muted)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {isActive && (
                  <div
                    className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold"
                    style={{ background: `${p.accent}22`, color: p.accent }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: p.accent }} />
                    <span>ACTIVE IN LIVE STAGE</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7 atelier-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col min-h-[350px] sm:min-h-[460px]">
          <div
            className="px-3.5 sm:px-4 py-2.5 sm:py-3 border-b flex flex-wrap items-center justify-between gap-2"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            <span id="stageTitle" className="font-mono text-xs font-semibold truncate" style={{ color: activeProject.accent }}>
              {activeProject.title} — Live Stage
            </span>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center p-1 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
                <button
                  type="button"
                  onClick={() => setViewport('desktop')}
                  className={`vp-btn px-2 py-1 rounded text-xs font-mono ${viewport === 'desktop' ? 'accent-btn font-semibold' : ''
                    }`}
                  style={{ color: viewport === 'desktop' ? '' : 'var(--text-muted)' }}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('mobile')}
                  className={`vp-btn px-2 py-1 rounded text-xs font-mono ${viewport === 'mobile' ? 'accent-btn font-semibold' : ''
                    }`}
                  style={{ color: viewport === 'mobile' ? '' : 'var(--text-muted)' }}
                >
                  Mobile
                </button>
              </div>

              <a
                id="stageOpenLink"
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-semibold accent-btn shrink-0"
              >
                Open Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex-1 p-2 sm:p-3 flex items-center justify-center bg-black/30">
            <iframe
              id="stageIframe"
              title="Live Project Stage"
              src={activeProject.url}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="h-[300px] sm:h-[420px] w-full rounded-xl bg-white border transition-all duration-300"
              style={{
                maxWidth: viewport === 'mobile' ? '375px' : '100%',
                borderColor: 'var(--border)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
