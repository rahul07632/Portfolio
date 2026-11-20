import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sun, Moon, FileText, Menu, Volume2, VolumeX } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Logo from './Logo';

export default function Navbar({
  theme,
  onToggleTheme,
  isTouring,
  onToggleTour,
  onStopTour,
  onOpenResume,
  onOpenMobileMenu,
  isSoundPlaying,
  onToggleSound
}) {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const navItems = [
    { path: '/', label: '00 Opening', id: 'hero', aliases: ['/opening'] },
    { path: '/identity', label: '01 Identity', id: 'identity', aliases: ['/about'] },
    { path: '/showcase', label: '02 Showcase', id: 'showcase', aliases: ['/work', '/projects'] },
    { path: '/craft', label: '03 Craft', id: 'craft', aliases: ['/skills', '/stack'] },
    { path: '/dispatch', label: '04 Dispatch', id: 'dispatch', aliases: ['/contact'] }
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-xl transition-colors duration-300"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link
          to="/"
          onClick={onStopTour}
          className="flex items-center gap-2.5 text-left group"
        >
          <Logo />
          <div className="leading-tight">
            <span className="font-bold text-sm sm:text-base block">Rahul Vishwakarma</span>
            <span className="font-mono text-[10px] uppercase tracking-widest block transition-colors" style={{ color: 'var(--accent)' }}>
              Fresher · Full-Stack Dev
            </span>
          </div>
        </Link>

        {/* Interactive React Router Pill Links */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-mono">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || item.aliases.includes(currentPath);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onStopTour}
                className={`nav-pill-btn px-3 py-1.5 rounded-xl transition-all ${
                  isActive ? 'accent-btn font-semibold shadow-sm' : ''
                }`}
                style={isActive ? {} : { color: 'var(--text-muted)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Enhanced Auto Tour Button */}
          <button
            id="autoTourBtn"
            type="button"
            title={isTouring ? "Click to stop tour" : "Start automated showcase tour"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleTour();
            }}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
              isTouring
                ? 'accent-btn font-semibold shadow-lg scale-105'
                : 'hover-lift'
            }`}
            style={
              isTouring
                ? {}
                : {
                    borderColor: 'var(--border)',
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-muted)'
                  }
            }
          >
            <Compass
              className={`w-3.5 h-3.5 ${isTouring ? 'animate-spin' : ''}`}
              style={isTouring ? {} : { color: 'var(--accent)' }}
            />
            <span>{isTouring ? 'Stop Tour' : 'Auto Tour'}</span>
          </button>

          {/* Background Lo-Fi Music Toggle */}
          <button
            id="ambientSoundBtn"
            type="button"
            title={isSoundPlaying ? 'Pause background music' : 'Play theme background music'}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSound();
            }}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
              isSoundPlaying ? 'border-[var(--accent)] font-semibold shadow-sm' : 'hover-lift'
            }`}
            style={{
              borderColor: isSoundPlaying ? 'var(--accent)' : 'var(--border)',
              background: 'var(--bg-elevated)',
              color: isSoundPlaying ? 'var(--accent)' : 'var(--text-muted)'
            }}
          >
            {isSoundPlaying ? (
              <>
                <span className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
                  <span className="w-0.5 h-2 bg-current rounded-full animate-pulse" />
                  <span className="w-0.5 h-3.5 bg-current rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-current rounded-full animate-pulse delay-150" />
                </span>
                <span>Sound</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-70" />
                <span>Muted</span>
              </>
            )}
          </button>

          <button
            id="themeToggleBtn"
            type="button"
            aria-label="Switch Theme"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold border hover-lift"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            ) : (
              <Moon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            )}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <MagneticButton
            onClick={() => {
              onStopTour();
              onOpenResume();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold accent-btn"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </MagneticButton>

          <button
            id="mobileMenuBtn"
            type="button"
            aria-label="Open Menu"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl border active:scale-95 transition-transform"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
