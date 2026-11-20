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
    <section id="hero" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8 space-y-6">
          <div className="hero-reveal inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full atelier-card text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span style={{ color: 'var(--accent)' }}>
              FRESHER 2025 · FRONTEND &amp; FULL-STACK DEVELOPER
            </span>
            <span className="hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
              · Katni, MP
            </span>
          </div>

          <h1 className="hero-reveal text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.03]">
            Engineering <span className="font-serif italic font-semibold" style={{ color: 'var(--accent)' }}>expressive</span>
            <br />
            web systems.
          </h1>

          <p className="hero-reveal text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            I am <strong style={{ color: 'var(--text)' }}>Rahul Vishwakarma</strong> — a 2025 B.Tech CSE Fresher crafting responsive React interfaces, Node.js &amp; Express APIs, and clean full-stack web applications.
          </p>

          <div className="hero-reveal flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
            <Link
              to="/showcase"
              className="magnetic-btn accent-btn group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm cursor-pointer shadow-md"
            >
              <span>Enter Project Stage</span>
              <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white group-hover:text-[var(--accent)] group-hover:scale-110 group-hover:rotate-45">
                <svg className="w-3.5 h-3.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>

            <button
              id="heroResumeBtn"
              type="button"
              onClick={onOpenResume}
              className="magnetic-btn hero-secondary-btn atelier-card group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" style={{ color: 'var(--accent)' }} />
              <span>Resume Viewer</span>
            </button>

            <div className="flex items-center gap-3 sm:ml-2">
              <a
                href="https://github.com/rahul07632"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub Profile"
                className="magnetic-btn social-icon-btn p-3.5 rounded-xl inline-flex items-center justify-center cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/rahulvishwakarma78/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
                className="magnetic-btn social-icon-btn p-3.5 rounded-xl inline-flex items-center justify-center cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3D Scene Engine Card: 3 Dark Modes + 3 Different Light Modes */}
        <div className="lg:col-span-4 hero-reveal">
          <div className="atelier-card rounded-3xl p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span id="sceneEngineLabel" className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {theme === 'dark' ? '3D Dark Scenes (3)' : 'Light 3D Scenes (3)'}
              </span>
              <button
                id="shockwaveBtn"
                type="button"
                onClick={onTriggerPulse}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono accent-btn font-semibold hover-lift"
              >
                <Zap className="w-3 h-3" /> Pulse
              </button>
            </div>

            <div id="sceneButtonsGrid" className="grid grid-cols-3 gap-2">
              {currentScenes.map((s) => {
                const isActive = s.id === activeSceneId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectScene(s.id)}
                    className={`scene-btn py-2 rounded-xl text-xs font-mono transition-all hover-lift ${
                      isActive ? 'accent-btn font-semibold' : 'border'
                    }`}
                    style={isActive ? {} : { borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] font-mono leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              3 unique 3D scenes per theme. Move cursor to bend or click Pulse!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
