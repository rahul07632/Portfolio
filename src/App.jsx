import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import ToastStack from "./components/ToastStack";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import TechStack from "./sections/TechStack";
import About from "./sections/About";
import Education from "./sections/Education";
import Contact from "./components/Contact";
import Seo from "./components/Seo";
import "./styles.css";

function ScrollForRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionIds = {
      "/": "hero",
      "/work": "work",
      "/stack": "stack",
      "/about": "about",
      "/education": "education",
      "/contact": "contact",
    };
    const section = document.getElementById(sectionIds[pathname] || "hero");

    if (!section) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    window.requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [pathname]);

  return null;
}

function PortfolioPage() {
  return (
    <>
      <Hero />
      <Projects />
      <TechStack />
      <About />
      <Education />
      <Contact />
    </>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/portfolio-interactions.js";
    script.async = false;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.scrollY > 0) return undefined;

    let active = true;
    let startTimer;
    let animationFrame;
    let previousScrollBehavior = null;

    const stopAutoScroll = () => {
      if (!active) return;
      active = false;
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(animationFrame);
      if (previousScrollBehavior !== null) {
        root.style.scrollBehavior = previousScrollBehavior;
      }
      window.removeEventListener("wheel", stopAutoScroll);
      window.removeEventListener("touchstart", stopAutoScroll);
      window.removeEventListener("pointerdown", stopAutoScroll);
      window.removeEventListener("keydown", stopAutoScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };

    const onVisibilityChange = () => {
      if (document.hidden) stopAutoScroll();
    };

    const startAutoScroll = () => {
      if (!active) return;
      const startY = window.scrollY;
      const endY = Math.max(0, root.scrollHeight - window.innerHeight);
      if (endY <= startY) {
        stopAutoScroll();
        return;
      }

      previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      const duration = Math.min(25000, Math.max(15000, (endY - startY) / 0.3));

      const animateScroll = (from, to, onComplete) => {
        const startTime = performance.now();
        const scrollFrame = (now) => {
          if (!active) return;
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 0.5 - Math.cos(Math.PI * progress) / 2;
          window.scrollTo(0, from + (to - from) * easedProgress);

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(scrollFrame);
          } else {
            onComplete();
          }
        };

        animationFrame = window.requestAnimationFrame(scrollFrame);
      };

      animateScroll(startY, endY, () => {
        if (!active) return;
        startTimer = window.setTimeout(() => {
          animateScroll(window.scrollY, 0, stopAutoScroll);
        }, 900);
      });
    };

    window.addEventListener("wheel", stopAutoScroll, { passive: true });
    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    window.addEventListener("pointerdown", stopAutoScroll);
    window.addEventListener("keydown", stopAutoScroll);
    document.addEventListener("visibilitychange", onVisibilityChange);
    startTimer = window.setTimeout(startAutoScroll, 3000);

    return stopAutoScroll;
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <ScrollForRoute />
      <Seo />
      <CustomCursor />
      <Preloader />
      <ToastStack />
      <Navbar isMenuOpen={menuOpen} onMenuOpen={() => setMenuOpen((open) => !open)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/work" element={<PortfolioPage />} />
          <Route path="/stack" element={<PortfolioPage />} />
          <Route path="/about" element={<PortfolioPage />} />
          <Route path="/education" element={<PortfolioPage />} />
          <Route path="/contact" element={<PortfolioPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ResumeModal />
    </>
  );
}
