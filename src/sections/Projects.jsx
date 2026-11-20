import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState('todo');
  const [viewport, setViewport] = useState('desktop');

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];

  return (
    <section id="showcase" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            02 / Interactive Project Stage
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1.5">
            Select a build to run live.
          </h2>
        </div>
        <p className="text-sm max-w-md" style={{ color: 'var(--text-muted)' }}>
          Switch between my 3 deployed applications on the left to test them live on the right.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        <div id="projectList" className="lg:col-span-5 flex flex-col gap-3">
          {PROJECTS.map((p) => {
            const isActive = p.id === activeProjectId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProjectId(p.id)}
                className="atelier-card rounded-2xl p-5 text-left transition-all"
                style={
                  isActive
                    ? {
                        borderColor: p.accent,
                        boxShadow: `0 12px 30px -12px ${p.accent}44`
                      }
                    : {}
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold" style={{ color: p.accent }}>
                    {p.index} / {p.category}
                  </span>
                  <Play
                    className="w-3.5 h-3.5"
                    style={{ color: isActive ? p.accent : 'var(--text-muted)' }}
                  />
                </div>
                <h3 className="text-xl font-bold mt-1.5">{p.title}</h3>
                <p className="text-xs leading-relaxed mt-1.5" style={{ color: 'var(--text-muted)' }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md border font-mono text-[10px]"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7 atelier-card rounded-3xl overflow-hidden flex flex-col min-h-[460px]">
          <div
            className="px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            <span id="stageTitle" className="font-mono text-xs font-semibold" style={{ color: activeProject.accent }}>
              {activeProject.title} — Live Stage
            </span>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center p-1 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
                <button
                  type="button"
                  onClick={() => setViewport('desktop')}
                  className={`vp-btn px-2 py-1 rounded text-xs font-mono ${
                    viewport === 'desktop' ? 'accent-btn font-semibold' : ''
                  }`}
                  style={{ color: viewport === 'desktop' ? '' : 'var(--text-muted)' }}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('mobile')}
                  className={`vp-btn px-2 py-1 rounded text-xs font-mono ${
                    viewport === 'mobile' ? 'accent-btn font-semibold' : ''
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
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold accent-btn"
              >
                Open Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex-1 p-3 flex items-center justify-center bg-black/30">
            <iframe
              id="stageIframe"
              title="Live Project Stage"
              src={activeProject.url}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="h-[420px] rounded-xl bg-white border transition-all duration-300"
              style={{
                width: viewport === 'mobile' ? '375px' : '100%',
                borderColor: 'var(--border)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
