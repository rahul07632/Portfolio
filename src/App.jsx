import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      const isClickable =
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a'));
      setCursorHovered(Boolean(isClickable));
    };
    window.addEventListener('mousemove', updateCursor, { passive: true });
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-cyan-500 selection:text-slate-950 ${
        isDark ? 'theme-dark bg-[#050816] text-slate-100' : 'theme-light bg-slate-50 text-slate-900'
      }`}
    >
      {/* Custom Interactive Cursor Follower */}
      <div
        className="custom-cursor-follower pointer-events-none fixed top-0 left-0 z-50 hidden lg:block transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${cursorPos.x - (cursorHovered ? 20 : 12)}px, ${
            cursorPos.y - (cursorHovered ? 20 : 12)
          }px, 0)`
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            cursorHovered
              ? 'w-10 h-10 border-cyan-400 bg-cyan-400/15 scale-110'
              : 'w-6 h-6 border-cyan-400/60 bg-cyan-400/5'
          }`}
        />
      </div>

      {/* Mouse-Responsive Ambient Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{
          background: isDark
            ? `radial-gradient(650px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(6, 182, 212, 0.07), transparent 70%)`
            : `radial-gradient(650px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(2, 132, 199, 0.06), transparent 70%)`
        }}
      />

      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main>
        <Hero isDark={isDark} scrollToSection={scrollToSection} />
        <About isDark={isDark} />
        <Skills isDark={isDark} />
        <Projects isDark={isDark} />
        <Education isDark={isDark} scrollToSection={scrollToSection} />
        <Contact isDark={isDark} />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
