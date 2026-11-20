import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowDownRight, FileText, Zap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import MagneticButton from '../components/MagneticButton';
import { SCENES } from '../data/portfolioData';

export default function Hero({
  theme,
  activeSceneId,
  onSelectScene,
  onTriggerPulse,
  onOpenResume
}) {
  const currentScenes = SCENES[theme] || SCENES.dark;

  // Cinematic direct entrance reveal animation
  useEffect(() => {
    gsap.fromTo(
      '.hero-reveal',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.15
      }
    );
  }, []);

  return (
    <section id="hero" className="relative z-10 pt-6 pb-12 sm:pt-14 sm:pb-24 px-3 sm:px-6 max-w-6xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 items-end">
        <div className="lg:col-span-8 space-y-3.5 sm:space-y-6">
          <div className="hero-reveal inline-flex items-center gap-2 px-2.5 py-1 rounded-full atelier-card text-[9.5px] sm:text-xs font-mono max-w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="truncate font-semibold" style={{ color: 'var(--accent)' }}>
              FRESHER 2025 · FULL-STACK DEVELOPER
            </span>
            <span className="hidden min-[400px]:inline shrink-0" style={{ color: 'var(--text-muted)' }}>
              · Katni, MP
            </span>
          </div>

          <h1 className="hero-reveal text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Engineering <span className="font-serif italic font-semibold" style={{ color: 'var(--accent)' }}>expressive</span>
            <br />
            web systems.
          </h1>

          <p className="hero-reveal text-xs sm:text-base max-w-xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            I am <strong style={{ color: 'var(--text)' }}>Rahul Vishwakarma</strong> — a 2025 B.Tech CSE Fresher crafting responsive React interfaces, Node.js &amp; Express APIs, and clean full-stack web applications.
          </p>

          <div className="hero-reveal flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
            <Link
              to="/showcase"
              className="magnetic-btn accent-btn group inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm cursor-pointer shadow-md text-center"
            >
              <span>Explore Projects</span>
              <span className="relative flex items-center justify-center w-4 h-4 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white group-hover:text-[var(--accent)] group-hover:scale-110 group-hover:rotate-45">
                <svg className="w-3 h-3 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>

            <button
              id="heroResumeBtn"
              type="button"
              onClick={onOpenResume}
              className="magnetic-btn hero-secondary-btn atelier-card group inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm cursor-pointer text-center"
            >
              <FileText className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" style={{ color: 'var(--accent)' }} />
              <span>Resume</span>
            </button>

            <div className="flex items-center gap-1.5">
              <a
                href="https://github.com/rahul07632"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub Profile"
                className="magnetic-btn social-icon-btn p-2 sm:p-2.5 rounded-lg sm:rounded-xl inline-flex items-center justify-center cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/rahulvishwakarma78/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
                className="magnetic-btn social-icon-btn p-2 sm:p-2.5 rounded-lg sm:rounded-xl inline-flex items-center justify-center cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 3D Scene Engine Card: Compact & sleek on mobile */}
        <div className="lg:col-span-4 hero-reveal">
          <div className="atelier-card rounded-xl sm:rounded-2xl p-2.5 sm:p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span id="sceneEngineLabel" className="font-mono text-[9.5px] sm:text-xs uppercase tracking-wider truncate" style={{ color: 'var(--text-muted)' }}>
                {theme === 'dark' ? '3D Dark Scenes (3)' : 'Light 3D Scenes (3)'}
              </span>
              <button
                id="shockwaveBtn"
                type="button"
                onClick={onTriggerPulse}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9.5px] sm:text-xs font-mono accent-btn font-semibold hover-lift shrink-0"
              >
                <Zap className="w-2.5 h-2.5" /> Pulse
              </button>
            </div>

            <div id="sceneButtonsGrid" className="grid grid-cols-3 gap-1 sm:gap-2">
              {currentScenes.map((s) => {
                const isActive = s.id === activeSceneId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectScene(s.id)}
                    className={`scene-btn py-1.5 sm:py-2 px-0.5 sm:px-1 rounded-lg text-[9.5px] min-[360px]:text-xs font-mono transition-all hover-lift truncate text-center ${
                      isActive ? 'accent-btn font-semibold shadow-sm' : 'border'
                    }`}
                    style={isActive ? {} : { borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title={s.label}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            <p className="text-[9px] sm:text-[11px] font-mono leading-tight" style={{ color: 'var(--text-muted)' }}>
              Interactive 3D scenes. Touch or drag to bend particles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
