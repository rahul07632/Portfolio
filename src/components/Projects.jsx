import React, { useState, useRef } from 'react';
import {
  Code2,
  CheckCircle2,
  ExternalLink,
  Eye,
  GitBranch,
  CheckSquare,
  Search,
  Compass,
  Globe,
  X
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

function TiltCard({ children, className = '', glowColor = 'rgba(6, 182, 212, 0.25)' }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, hovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - relY) * 12,
      rotateY: (relX - 0.5) * 12,
      glareX: relX * 100,
      glareY: relY * 100,
      hovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, hovered: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.hovered ? 1.015 : 1
          }, ${tilt.hovered ? 1.015 : 1}, 1)`,
        transition: tilt.hovered
          ? 'transform 0.1s ease-out, box-shadow 0.2s ease'
          : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
        boxShadow: tilt.hovered ? `0 20px 50px -15px ${glowColor}` : undefined
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: tilt.hovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.08), transparent 60%)`
        }}
      />
      {children}
    </div>
  );
}

function ProjectVisualPreview({ type }) {
  if (type === 'todo') {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/70 p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[11px] font-mono text-cyan-300/90">todoo21.ccbp.tech</span>
          </div>
          <CheckSquare className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="my-auto flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/75 border border-cyan-500/25">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-100">
              Interactive Task Manager
            </div>
            <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
              Create, complete, and delete tasks with automatic browser LocalStorage persistence.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>HTML5 • CSS3 • JS • LocalStorage</span>
          <span className="text-cyan-400">todoo21.ccbp.tech →</span>
        </div>
      </div>
    );
  }

  if (type === 'wiki') {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/70 p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[11px] font-mono text-violet-300/90">wikipedia987.ccbp.tech</span>
          </div>
          <Search className="w-4 h-4 text-violet-400" />
        </div>
        <div className="my-auto flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/75 border border-violet-500/25">
          <div className="w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-violet-400" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-100">
              Wikipedia Knowledge Search
            </div>
            <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
              Asynchronous Fetch API query engine delivering instant article summaries and links.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>HTML5 • CSS3 • JS • REST API</span>
          <span className="text-violet-400">wikipedia987.ccbp.tech →</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[11px] font-mono text-emerald-300/90">population212.ccbp.tech</span>
        </div>
        <Compass className="w-4 h-4 text-emerald-400" />
      </div>
      <div className="my-auto flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/75 border border-emerald-500/25">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0">
          <Compass className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-slate-100">
            Countries & Population Explorer
          </div>
          <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
            Real-time search across global country profiles and population data in a responsive grid.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>HTML5 • CSS3 • JS • Bootstrap</span>
        <span className="text-emerald-400">population212.ccbp.tech →</span>
      </div>
    </div>
  );
}

export default function Projects({ isDark }) {
  const [previewProject, setPreviewProject] = useState(null);

  return (
    <section
      id="projects"
      className={`relative z-10 py-20 border-t ${isDark ? 'border-slate-900 bg-slate-950/40' : 'border-slate-200/80 bg-white/60'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <Code2 className="w-4 h-4" />
              <span>03 / Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Live Production Web Applications
            </h2>
          </div>
          <p className={`text-sm max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Every card below links directly to the deployed application hosted on CCBP domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <TiltCard
              key={project.id}
              glowColor={project.glow}
              className={`group rounded-3xl border flex flex-col justify-between ${isDark
                  ? 'bg-slate-900/70 border-slate-800/90 hover:border-cyan-500/40'
                  : 'bg-white border-slate-200 shadow-sm'
                }`}
            >
              <div>
                <ProjectVisualPreview type={project.previewType} />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span>{project.category}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-cyan-400 transition">
                      {project.title}
                    </h3>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {project.subtitle}
                    </p>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.description}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {project.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className={`text-xs flex items-start gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'
                          }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${isDark
                            ? 'bg-slate-950/90 border-slate-800 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r ${project.accent} shadow-md hover:brightness-110 flex items-center justify-center gap-1.5 transition`}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewProject(project)}
                  className={`py-3 px-3.5 rounded-xl font-semibold text-xs border flex items-center justify-center gap-1.5 transition ${isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-400'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview</span>
                </button>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-slate-700 hover:border-cyan-400 transition"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {previewProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className={`w-full max-w-5xl rounded-3xl border overflow-hidden shadow-2xl flex flex-col max-h-[90vh] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
          >
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="truncate">
                  <h4 className="font-bold text-sm sm:text-base truncate">
                    {previewProject.title} — Live Interactive Preview
                  </h4>
                  <p className="text-xs font-mono text-cyan-400 truncate">
                    {previewProject.liveUrl}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5"
                >
                  <span>Open Full Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-950 relative min-h-[460px]">
              <iframe
                src={previewProject.liveUrl}
                title={previewProject.title}
                className="w-full h-[500px] border-0 bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
