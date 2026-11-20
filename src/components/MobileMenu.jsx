import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight, FileText, Compass, Volume2, VolumeX } from 'lucide-react';

export default function MobileMenu({
  isOpen,
  onClose,
  onOpenResume,
  isTouring,
  onToggleTour,
  isSoundPlaying,
  onToggleSound
}) {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { path: '/', label: '00 Opening', id: 'hero' },
    { path: '/identity', label: '01 Identity', id: 'identity' },
    { path: '/showcase', label: '02 Showcase', id: 'showcase' },
    { path: '/craft', label: '03 Craft', id: 'craft' },
    { path: '/dispatch', label: '04 Dispatch', id: 'dispatch' }
  ];

  return (
    <div
      id="mobileMenu"
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 backdrop-blur-2xl"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
          Chapters
        </span>
        <button
          id="closeMobileMenuBtn"
          type="button"
          aria-label="Close Menu"
          onClick={onClose}
          className="p-2.5 rounded-xl border active:scale-95 transition-transform"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`mobile-card-btn flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-bold transition-all ${
                isActive ? 'border-[var(--accent)] shadow-lg' : ''
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSound();
          }}
          className={`w-full py-3.5 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
            isSoundPlaying ? 'border-[var(--accent)] text-[var(--accent)]' : ''
          }`}
          style={isSoundPlaying ? { background: 'var(--bg-elevated)' } : { borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
        >
          {isSoundPlaying ? (
            <>
              <Volume2 className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span>Background Lo-Fi: Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 opacity-70" />
              <span>Background Lo-Fi: Muted</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            onClose();
            onToggleTour();
          }}
          className={`w-full py-3.5 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
            isTouring ? 'accent-btn' : ''
          }`}
          style={isTouring ? {} : { borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
        >
          <Compass className={`w-4 h-4 ${isTouring ? 'animate-spin' : ''}`} style={isTouring ? {} : { color: 'var(--accent)' }} />
          {isTouring ? 'Stop Auto Tour' : 'Start Auto Tour'}
        </button>

        <button
          id="mobileResumeBtn"
          type="button"
          onClick={() => {
            onClose();
            onOpenResume();
          }}
          className="w-full py-3.5 rounded-xl accent-btn font-mono text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <FileText className="w-4 h-4" /> Open Resume Viewer
        </button>
      </div>
    </div>
  );
}
