import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowUpRight, Download, GitBranch, BriefcaseBusiness } from 'lucide-react';
import { PERSONAL_INFO, downloadResumeFile } from '../data/portfolioData';
import MagneticButton from './MagneticButton';

function InteractiveHeroAvatar({ isDark }) {
  const containerRef = useRef(null);

  const [look, setLook] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (clientX - centerX) / (window.innerWidth / 2);
      const dy = (clientY - centerY) / (window.innerHeight / 2);
      setLook({
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy))
      });
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const pupilOffsetX = look.x * 6.5;
  const pupilOffsetY = look.y * 4.5;
  const headRotateY = look.x * 14;
  const headRotateX = -look.y * 10;

  return (
    <div className="relative flex flex-col items-center">
      <div
        ref={containerRef}
        style={{
          transform: `perspective(1100px) rotateX(${headRotateX}deg) rotateY(${headRotateY}deg)`,
          transition: 'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
        className={`hero-avatar-stage relative w-full max-w-[440px] aspect-square rounded-3xl border p-6 flex flex-col items-center justify-center overflow-hidden select-none ${isDark
            ? 'bg-slate-900/70 border-slate-800/90 shadow-[0_0_70px_-15px_rgba(6,182,212,0.3)]'
            : 'bg-white/80 border-slate-200 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)]'
          } backdrop-blur-xl`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
        <div
          className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full bg-cyan-500/20 blur-3xl"
          style={{ transform: `translate3d(${look.x * 20}px, ${look.y * 20}px, 0)` }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-violet-500/20 blur-3xl"
          style={{ transform: `translate3d(${-look.x * 20}px, ${-look.y * 20}px, 0)` }}
        />

        <div
          className={`z-20 mb-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border ${isDark
              ? 'bg-slate-950/80 border-slate-800 text-cyan-300'
              : 'bg-slate-100/90 border-slate-200 text-slate-700'
            }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive 3D Rig • Eye Tracking Active</span>
        </div>

        <div className="relative z-10 w-full h-72 flex items-center justify-center">
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full max-w-[300px] max-h-[300px] drop-shadow-[0_20px_30px_rgba(6,182,212,0.22)]"
          >
            <defs>
              <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="50%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f3c6a5" />
                <stop offset="100%" stopColor="#dfa67e" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="visorGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            <ellipse
              cx="160"
              cy="155"
              rx="115"
              ry="115"
              fill="none"
              stroke="url(#hoodieGrad)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              opacity="0.45"
            />

            <g style={{ transform: `translate(${look.x * 4}px, ${look.y * 3}px)` }}>
              <path
                d="M70 285 C72 220, 110 200, 160 200 C210 200, 248 220, 250 285 Z"
                fill="url(#hoodieGrad)"
              />
              <path
                d="M125 202 Q160 232 195 202"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
              <line x1="142" y1="215" x2="142" y2="250" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="178" y1="215" x2="178" y2="250" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="143" y="172" width="34" height="36" rx="12" fill="url(#skinGrad)" />
            </g>

            <g style={{ transform: `translate(${look.x * 9}px, ${look.y * 7}px)` }}>
              <path
                d="M92 135 C92 72, 228 72, 228 135"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <rect x="80" y="118" width="18" height="42" rx="9" fill="#0f172a" stroke="#22d3ee" strokeWidth="2.5" />
              <rect x="222" y="118" width="18" height="42" rx="9" fill="#0f172a" stroke="#22d3ee" strokeWidth="2.5" />
              <circle cx="98" cy="140" r="12" fill="url(#skinGrad)" />
              <circle cx="222" cy="140" r="12" fill="url(#skinGrad)" />
              <rect x="102" y="74" width="116" height="118" rx="52" fill="url(#skinGrad)" />
              <path
                d="M98 118 C95 68, 132 52, 165 54 C202 52, 226 74, 222 118 C212 96, 194 84, 160 86 C128 84, 110 98, 98 118 Z"
                fill="url(#hairGrad)"
              />
              <path
                d="M115 76 Q142 58 175 68 Q195 60 210 82"
                fill="none"
                stroke="#334155"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g style={{ transform: `translateY(${look.y * -2.5}px)` }}>
                <path d="M120 112 Q135 106 148 111" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                <path d="M172 111 Q185 106 200 112" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              </g>

              <g transform="translate(135, 128)">
                <ellipse cx="0" cy="0" rx="15" ry={isBlinking ? 1.2 : 11} fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />
                {!isBlinking && (
                  <g transform={`translate(${pupilOffsetX}, ${pupilOffsetY})`}>
                    <circle cx="0" cy="0" r="6.8" fill="#0284c7" />
                    <circle cx="0" cy="0" r="3.8" fill="#0f172a" />
                    <circle cx="2.2" cy="-2.2" r="1.8" fill="#ffffff" />
                    <circle cx="-2" cy="2" r="0.9" fill="#bae6fd" />
                  </g>
                )}
              </g>

              <g transform="translate(185, 128)">
                <ellipse cx="0" cy="0" rx="15" ry={isBlinking ? 1.2 : 11} fill="#ffffff" stroke="#0f172a" strokeWidth="2.2" />
                {!isBlinking && (
                  <g transform={`translate(${pupilOffsetX}, ${pupilOffsetY})`}>
                    <circle cx="0" cy="0" r="6.8" fill="#0284c7" />
                    <circle cx="0" cy="0" r="3.8" fill="#0f172a" />
                    <circle cx="2.2" cy="-2.2" r="1.8" fill="#ffffff" />
                    <circle cx="-2" cy="2" r="0.9" fill="#bae6fd" />
                  </g>
                )}
              </g>

              <g opacity="0.92">
                <rect x="114" y="113" width="42" height="30" rx="8" fill="url(#visorGlow)" stroke="#22d3ee" strokeWidth="2.2" />
                <rect x="164" y="113" width="42" height="30" rx="8" fill="url(#visorGlow)" stroke="#22d3ee" strokeWidth="2.2" />
                <line x1="156" y1="126" x2="164" y2="126" stroke="#22d3ee" strokeWidth="2.5" />
              </g>

              <path d="M160 132 L156 150 L163 152" fill="none" stroke="#b47b56" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M144 164 Q160 175 176 164" fill="none" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
            </g>

            <g style={{ transform: `translate(${look.x * -5}px, ${look.y * -4}px)` }}>
              <rect x="95" y="242" width="130" height="65" rx="10" fill="url(#laptopGrad)" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="160" cy="274" r="11" fill="#0284c7" opacity="0.25" />
              <path d="M153 270 L158 274 L153 278 M161 278 L168 278" fill="none" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>

          <div
            style={{ transform: `translate3d(${look.x * -14}px, ${look.y * -12}px, 0)` }}
            className="absolute top-4 left-3 px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[11px] font-mono backdrop-blur-md"
          >
            &lt;React.js /&gt;
          </div>
          <div
            style={{ transform: `translate3d(${look.x * 16}px, ${look.y * -10}px, 0)` }}
            className="absolute top-10 right-2 px-2.5 py-1 rounded-lg bg-violet-500/15 border border-violet-400/30 text-violet-300 text-[11px] font-mono backdrop-blur-md"
          >
            Node + Express
          </div>
          <div
            style={{ transform: `translate3d(${look.x * -12}px, ${look.y * 14}px, 0)` }}
            className="absolute bottom-6 left-4 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono backdrop-blur-md"
          >
            MongoDB • SQL
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ isDark, scrollToSection }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = PERSONAL_INFO.roles[roleIndex];
    const speed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting && displayRole === currentFullRole) {
        setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && displayRole === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
      } else {
        setDisplayRole(
          currentFullRole.substring(0, displayRole.length + (isDeleting ? -1 : 1))
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayRole, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative z-10 pt-10 pb-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for Full-Time Software & Full Stack Roles • Fresher (2025)</span>
          </div>

          <div className="space-y-3">
            <p className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Hello, I&apos;m
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            <div className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl lg:text-3xl font-bold">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>I am a&nbsp;</span>
              <span className="text-cyan-400 font-mono">{displayRole}</span>
              <span className="w-0.5 h-7 bg-cyan-400 ml-1 animate-pulse" />
            </div>
          </div>

          <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            A passionate <strong>Full Stack Developer</strong> and{' '}
            <strong>B.Tech in Computer Science and Engineering (2025)</strong> graduate from{' '}
            <em>{PERSONAL_INFO.college}</em>, trained at{' '}
            <strong>{PERSONAL_INFO.training}</strong>. I build fast, responsive, and interactive
            web applications with clean architecture across modern frontend and backend stacks.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 hover:brightness-110 gap-2"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              onClick={downloadResumeFile}
              className={`px-6 py-3.5 rounded-2xl font-semibold text-sm border gap-2 transition ${isDark
                  ? 'bg-slate-900/90 border-slate-700 text-slate-100 hover:border-cyan-400/60'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-cyan-600'
                }`}
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </MagneticButton>

            <div className="flex items-center gap-2.5">
              <MagneticButton
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                className={`p-3.5 rounded-2xl border transition ${isDark
                    ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-cyan-600'
                  }`}
              >
                <GitBranch className="w-5 h-5" />
              </MagneticButton>

              <MagneticButton
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className={`p-3.5 rounded-2xl border transition ${isDark
                    ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-cyan-600'
                  }`}
              >
                <BriefcaseBusiness className="w-5 h-5" />
              </MagneticButton>
            </div>
          </div>

          <div className={`grid grid-cols-3 gap-3 pt-4 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
            <div>
              <div className="text-xs font-mono text-cyan-400">DEGREE</div>
              <div className="font-bold text-sm sm:text-base">B.Tech CSE &apos;25</div>
            </div>
            <div>
              <div className="text-xs font-mono text-violet-400">TRAINING</div>
              <div className="font-bold text-sm sm:text-base">NxtWave CCBP 4.0</div>
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400">EXPERIENCE</div>
              <div className="font-bold text-sm sm:text-base">Fresher • Ready</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <InteractiveHeroAvatar isDark={isDark} />
        </div>
      </div>
    </section>
  );
}
