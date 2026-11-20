import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import IntroCurtain from './components/IntroCurtain';
import ThemeWipe from './components/ThemeWipe';
import ThreeCanvas from './components/ThreeCanvas';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import ResumeModal from './components/ResumeModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Identity from './sections/Identity';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import Contact from './sections/Contact';
import { SCENES } from './data/portfolioData';
import {
  toggleAmbientSound,
  setAmbientTheme,
  subscribeSoundState,
  attachAutoplayListener
} from './utils/themeAudio';
import './styles.css';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('rv_atelier_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark';
  });

  const [activeSceneId, setActiveSceneId] = useState('aurora');
  const [shockTrigger, setShockTrigger] = useState(0);
  const [isTouring, setIsTouring] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  // Subscribe to ambient sound engine & attach first-interaction listener
  useEffect(() => {
    const unsubscribe = subscribeSoundState(setIsSoundPlaying);
    attachAutoplayListener(() => theme);
    return () => unsubscribe();
  }, [theme]);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const location = useLocation();
  const wipeRef = useRef(null);
  const toastTimerRef = useRef(null);
  const tourActiveRef = useRef(false);
  const animationFrameRef = useRef(null);
  const pauseTimerRef = useRef(null);

  // Sync theme attribute and browser favicon
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('rv_atelier_theme', theme);
    } catch {}

    // Dynamic favicon switching based on active theme
    const favicon = document.querySelector("link[rel~='icon']");
    if (favicon) {
      favicon.href = theme === 'light' ? '/favicon-light.svg' : '/favicon-dark.svg';
    }

    const scenes = SCENES[theme] || SCENES.dark;
    if (!scenes.some((s) => s.id === activeSceneId)) {
      setActiveSceneId(scenes[0].id);
    }
  }, [theme]);

  // React Router URL-to-section smooth scroll sync (100% open & public)
  useEffect(() => {
    const pathToSection = {
      '/': 'hero',
      '/opening': 'hero',
      '/identity': 'identity',
      '/about': 'identity',
      '/showcase': 'showcase',
      '/work': 'showcase',
      '/projects': 'showcase',
      '/craft': 'craft',
      '/skills': 'craft',
      '/stack': 'craft',
      '/dispatch': 'dispatch',
      '/contact': 'dispatch'
    };

    const targetId = pathToSection[location.pathname.toLowerCase()];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  // Toast helper
  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
  }, []);

  // Theme toggle with circular clip-path wipe animation & theme audio feedback
  const handleToggleTheme = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setAmbientTheme(next);
    const wipe = wipeRef.current;
    if (wipe) {
      const xPct = e?.clientX ? Math.round((e.clientX / window.innerWidth) * 100) : 50;
      const yPct = e?.clientY ? Math.round((e.clientY / window.innerHeight) * 100) : 50;
      wipe.style.background = next === 'light' ? '#f5f2eb' : '#0b0d13';
      gsap.killTweensOf(wipe);
      gsap.set(wipe, { opacity: 0.9, clipPath: `circle(0% at ${xPct}% ${yPct}%)` });
      gsap.to(wipe, {
        clipPath: `circle(150% at ${xPct}% ${yPct}%)`,
        duration: 0.65,
        ease: 'power2.inOut',
        onComplete: () => {
          setTheme(next);
          gsap.to(wipe, { opacity: 0, duration: 0.45, ease: 'power2.out' });
        }
      });
    } else {
      setTheme(next);
    }
  };

  // Card mousemove listener for spotlight radial gradient & GSAP Magnetic Pull on buttons
  useEffect(() => {
    let currentMagneticBtn = null;

    const onMouseMove = (e) => {
      // Spotlight radial glow on cards
      const card = e.target.closest?.('.atelier-card');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      // GSAP Magnetic button pull
      const magBtn = e.target.closest?.('.magnetic-btn');
      if (magBtn) {
        currentMagneticBtn = magBtn;
        const rect = magBtn.getBoundingClientRect();
        const pullX = (e.clientX - rect.left - rect.width / 2) * 0.22;
        const pullY = (e.clientY - rect.top - rect.height / 2) * 0.22;
        gsap.to(magBtn, {
          x: pullX,
          y: pullY,
          duration: 0.25,
          ease: 'power2.out'
        });
      } else if (currentMagneticBtn) {
        gsap.to(currentMagneticBtn, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: 'elastic.out(1, 0.4)'
        });
        currentMagneticBtn = null;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Robust, Smooth Auto-Tour Engine
  const stopAutoTour = useCallback(() => {
    tourActiveRef.current = false;
    setIsTouring(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    document.documentElement.style.scrollBehavior = '';
  }, []);

  const startAutoTour = useCallback(() => {
    stopAutoTour();
    tourActiveRef.current = true;
    setIsTouring(true);

    // Disable CSS smooth scroll during RAF calculation to prevent jitter/scroll conflict
    document.documentElement.style.scrollBehavior = 'auto';

    const docEl = document.documentElement;
    const startY = window.scrollY;
    const maxY = Math.max(0, docEl.scrollHeight - window.innerHeight);

    if (maxY <= 10) {
      stopAutoTour();
      return;
    }

    const distance = Math.abs(maxY - startY);
    // Smooth cinematic pace (~11-14s down)
    const durationDown = Math.min(14000, Math.max(7500, distance * 3.2));
    const startTime = performance.now();

    const stepDown = (now) => {
      if (!tourActiveRef.current) return;
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / durationDown);
      // Smooth cosine ease-in-out
      const ease = 0.5 - Math.cos(Math.PI * p) / 2;
      const nextY = startY + (maxY - startY) * ease;
      window.scrollTo(0, nextY);

      if (p < 1) {
        animationFrameRef.current = requestAnimationFrame(stepDown);
      } else {
        // Pause at bottom for 1.2s before gliding back to top
        pauseTimerRef.current = setTimeout(() => {
          if (!tourActiveRef.current) return;
          const upStartTime = performance.now();
          const durationUp = 4500;
          const bottomY = window.scrollY;

          const stepUp = (upNow) => {
            if (!tourActiveRef.current) return;
            const upElapsed = upNow - upStartTime;
            const upP = Math.min(1, upElapsed / durationUp);
            const upEase = 0.5 - Math.cos(Math.PI * upP) / 2;
            const upY = bottomY * (1 - upEase);
            window.scrollTo(0, upY);

            if (upP < 1) {
              animationFrameRef.current = requestAnimationFrame(stepUp);
            } else {
              stopAutoTour();
            }
          };

          animationFrameRef.current = requestAnimationFrame(stepUp);
        }, 1200);
      }
    };

    animationFrameRef.current = requestAnimationFrame(stepDown);
  }, [stopAutoTour]);

  const toggleAutoTour = useCallback(() => {
    if (tourActiveRef.current) {
      stopAutoTour();
      showToast('Auto tour paused');
    } else {
      startAutoTour();
      showToast('Starting showcase tour');
    }
  }, [startAutoTour, stopAutoTour, showToast]);

  // Cancel Auto-Tour on any genuine user interaction (wheel, touch drag, keypress, click)
  useEffect(() => {
    const handleUserInteraction = (e) => {
      // Don't cancel if user is clicking the Auto Tour toggle button itself
      if (e.target?.closest?.('#autoTourBtn')) return;
      if (tourActiveRef.current) {
        stopAutoTour();
      }
    };

    const handleKeyDown = (e) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Tab'];
      if (scrollKeys.includes(e.key) && tourActiveRef.current) {
        stopAutoTour();
      }
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('mousedown', handleUserInteraction);
    window.addEventListener('keydown', handleKeyDown);

    // Initial idle trigger after 4.5s only if user hasn't scrolled and hasn't interacted
    const idleTimer = setTimeout(() => {
      if (!tourActiveRef.current && window.scrollY < 20) {
        startAutoTour();
      }
    }, 4500);

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(idleTimer);
      stopAutoTour();
    };
  }, [startAutoTour, stopAutoTour]);

  const MainPortfolioSections = (
    <main className="pt-16">
      <Hero
        theme={theme}
        activeSceneId={activeSceneId}
        onSelectScene={(id) => setActiveSceneId(id)}
        onTriggerPulse={() => setShockTrigger((prev) => prev + 1)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <Identity />

      <Projects />

      <TechStack />

      <Contact onShowToast={showToast} />
    </main>
  );

  return (
    <div className="relative min-h-screen text-[var(--text)] transition-colors duration-700">
      {/* Cinematic Entry Curtain */}
      <IntroCurtain />

      {/* Smooth Radial Theme Wipe Overlay */}
      <ThemeWipe wipeRef={wipeRef} />

      {/* Three.js 3D Background */}
      <ThreeCanvas
        theme={theme}
        activeSceneId={activeSceneId}
        shockTrigger={shockTrigger}
      />

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation Dock */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isTouring={isTouring}
        onToggleTour={toggleAutoTour}
        onStopTour={stopAutoTour}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        isSoundPlaying={isSoundPlaying}
        onToggleSound={() => toggleAmbientSound(theme)}
      />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        isTouring={isTouring}
        onToggleTour={toggleAutoTour}
        isSoundPlaying={isSoundPlaying}
        onToggleSound={() => toggleAmbientSound(theme)}
      />

      {/* 100% Public, Non-Protected Routes (Showcase to Recruiters) */}
      <Routes>
        <Route path="/" element={MainPortfolioSections} />
        <Route path="/opening" element={MainPortfolioSections} />
        <Route path="/identity" element={MainPortfolioSections} />
        <Route path="/about" element={MainPortfolioSections} />
        <Route path="/showcase" element={MainPortfolioSections} />
        <Route path="/work" element={MainPortfolioSections} />
        <Route path="/projects" element={MainPortfolioSections} />
        <Route path="/craft" element={MainPortfolioSections} />
        <Route path="/skills" element={MainPortfolioSections} />
        <Route path="/stack" element={MainPortfolioSections} />
        <Route path="/dispatch" element={MainPortfolioSections} />
        <Route path="/contact" element={MainPortfolioSections} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* User-Supplied Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}
