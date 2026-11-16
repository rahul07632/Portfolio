import React from 'react';
import { Terminal, Cpu, GitBranch, BriefcaseBusiness } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function About({ isDark }) {
  return (
    <section
      id="about"
      className={`relative z-10 py-20 border-t ${isDark ? 'border-slate-900 bg-slate-950/40' : 'border-slate-200/80 bg-white/60'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <Terminal className="w-4 h-4" />
            <span>01 / About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Engineering Clean Interfaces & Scalable Web Applications
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div
            className={`lg:col-span-7 rounded-3xl border p-6 sm:p-8 flex flex-col justify-between ${isDark ? 'bg-slate-900/60 border-slate-800/90' : 'bg-white border-slate-200 shadow-sm'
              }`}
          >
            <div className="space-y-4 text-base leading-relaxed">
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                I am <strong>Rahul Vishwakarma</strong>, a Computer Science and Engineering
                graduate (2025) from{' '}
                <strong>Shri Ram Institute of Science and Technology, Jabalpur</strong> and an
                intensive Full Stack Development trainee at{' '}
                <strong>NxtWave CCBP 4.0 Academy</strong>.
              </p>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                My journey in software development is driven by turning complex problems into
                intuitive, responsive, and high-performing web experiences. From crafting
                pixel-accurate interfaces with{' '}
                <strong>React.js, JavaScript, HTML5, CSS3, and Bootstrap</strong> to designing
                structured backend services with{' '}
                <strong>Node.js, Express.js, REST APIs, MongoDB, and SQL</strong>, I focus on
                writing maintainable code that adheres to industry standards.
              </p>
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                As a <strong>Fresher</strong>, I bring strong hands-on project execution,
                disciplined version control with Git and GitHub, and an eagerness to contribute
                immediately to engineering teams.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-wrap gap-3">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Frontend Architecture
              </span>
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-violet-500/10 text-violet-400 border border-violet-500/20">
                RESTful Services
              </span>
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Database Modeling
              </span>
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Responsive UI/UX
              </span>
            </div>
          </div>

          <div
            className={`lg:col-span-5 rounded-3xl border p-6 sm:p-8 flex flex-col justify-between ${isDark
                ? 'bg-gradient-to-b from-slate-900/90 to-slate-950 border-slate-800'
                : 'bg-slate-100/80 border-slate-200'
              }`}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>Developer Profile Overview</span>
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Full Name</span>
                  <span className="font-semibold">{PERSONAL_INFO.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Role</span>
                  <span className="font-semibold text-cyan-400">{PERSONAL_INFO.role}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Experience</span>
                  <span className="font-semibold text-emerald-400">
                    {PERSONAL_INFO.experienceStatus}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Graduation</span>
                  <span className="font-semibold">B.Tech CSE ({PERSONAL_INFO.graduation})</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono text-xs text-cyan-400 hover:underline truncate max-w-[210px]"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div className="flex justify-between py-2">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Phone</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="font-mono text-xs hover:text-cyan-400"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <GitBranch className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <BriefcaseBusiness className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
