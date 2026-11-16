import React from 'react';
import { GitBranch, BriefcaseBusiness, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer({ isDark }) {
  return (
    <footer
      className={`relative z-10 border-t py-10 ${isDark ? 'border-slate-900 bg-[#03050e]' : 'border-slate-200 bg-slate-100'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">
            RV
          </div>
          <div className="text-xs">
            <div className="font-semibold">{PERSONAL_INFO.name}</div>
            <div className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Full Stack Developer • B.Tech CSE (2025)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono hover:text-cyan-400 flex items-center gap-1.5"
          >
            <GitBranch className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono hover:text-cyan-400 flex items-center gap-1.5"
          >
            <BriefcaseBusiness className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-xs font-mono hover:text-cyan-400 flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
