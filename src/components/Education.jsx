import React from 'react';
import { GraduationCap, CheckCircle2, Briefcase, Mail, Download } from 'lucide-react';
import { EDUCATION_DATA, downloadResumeFile } from '../data/portfolioData';

export default function Education({ isDark, scrollToSection }) {
  return (
    <>
      <section id="education" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>04 / Education & Academy Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Academic Foundation & Full Stack Specialization
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/90 hover:border-cyan-500/40'
                  : 'bg-white border-slate-200 shadow-sm'
              } transition`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  {edu.badge}
                </span>
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {edu.period}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
              <p className="text-sm font-semibold text-cyan-400 mb-4">{edu.institution}</p>
              <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {edu.description}
              </p>

              <ul className="space-y-2">
                {edu.highlights.map((h, i) => (
                  <li
                    key={i}
                    className={`text-xs flex items-start gap-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        id="experience"
        className={`relative z-10 py-20 border-t ${
          isDark ? 'border-slate-900 bg-slate-950/40' : 'border-slate-200/80 bg-white/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <Briefcase className="w-4 h-4" />
              <span>05 / Experience Status</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Fresher — Ready for Industry Impact
            </h2>
          </div>

          <div
            className={`rounded-3xl border p-6 sm:p-10 ${
              isDark
                ? 'bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Current Status: Fresher (2025 B.Tech CSE Graduate)</span>
                </div>

                <h3 className="text-2xl font-bold">
                  Practical Full Stack Engineering Through Intensive Project Execution
                </h3>

                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  As a <strong>Fresher</strong> graduating in 2025, I have focused my time on
                  building production-grade web applications and mastering the full software
                  development lifecycle through <strong>NxtWave CCBP 4.0 Academy</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-xs font-mono text-cyan-400 mb-1">FRONTEND</div>
                    <div className="text-sm font-semibold">React.js, JS, HTML5, CSS3, Bootstrap</div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-xs font-mono text-violet-400 mb-1">BACKEND & API</div>
                    <div className="text-sm font-semibold">Node.js, Express.js & REST APIs</div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-xs font-mono text-emerald-400 mb-1">DATABASES</div>
                    <div className="text-sm font-semibold">MongoDB & Relational SQL</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-4 px-6 rounded-2xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 flex items-center justify-center gap-2 transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>Hire / Interview Rahul</span>
                </button>
                <button
                  type="button"
                  onClick={downloadResumeFile}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-sm border flex items-center justify-center gap-2 transition ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-400'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
