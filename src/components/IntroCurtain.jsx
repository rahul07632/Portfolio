import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function IntroCurtain() {
  const curtainRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    const bar = barRef.current;
    if (!curtain || !bar) return;

    const tl = gsap.timeline();
    tl.to(bar, { width: '100%', duration: 0.75, ease: 'power2.inOut' })
      .to(curtain, {
        yPercent: -100,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          curtain.style.display = 'none';
        }
      })
      .from('.hero-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out'
      }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div id="introCurtain" ref={curtainRef}>
      <div className="text-center space-y-3 max-w-xl">
        <div className="font-mono text-xs uppercase tracking-[0.35em] text-[#e85d3f]">
          Portfolio · 2025 Fresher
        </div>
        <div className="text-3xl sm:text-5xl font-bold tracking-tight">
          Rahul Vishwakarma
        </div>
        <div className="font-mono text-sm sm:text-base text-slate-300">
          Frontend &amp; Full-Stack Developer
        </div>
        <div className="w-48 h-[2px] bg-white/10 mx-auto rounded-full overflow-hidden mt-4">
          <div id="introBar" ref={barRef} className="h-full w-0 bg-[#e85d3f]"></div>
        </div>
      </div>
    </div>
  );
}
