import { useEffect, useState } from "react";
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
import Contact from "./sections/Contact";
import "./styles.css";

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
    const onKeyDown = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <CustomCursor />
      <Preloader />
      <ToastStack />
      <Navbar isMenuOpen={menuOpen} onMenuOpen={() => setMenuOpen((open) => !open)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="pt-16">
        <Hero />
        <Projects />
        <TechStack />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ResumeModal />
    </>
  );
}
