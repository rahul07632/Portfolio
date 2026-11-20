import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Lightbulb, Sparkles, ArrowDown } from 'lucide-react';
import { playSwitchSound, playHoverSound } from '../utils/sfx';

export default function IntroCurtain() {
  const curtainRef = useRef(null);
  const cordRef = useRef(null);
  const handleRef = useRef(null);
  const textRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [hasTriggered, setHasTriggered] = useState(false);

  const dragStartYRef = useRef(0);
  const currentYRef = useRef(0);
  const triggeredRef = useRef(false);

  const INITIAL_CORD_HEIGHT = 80;  // Starts cleanly near ceiling
  const MIN_TRIGGER_DISTANCE = 35;  // Release anytime after a small pull
  const MAX_PULL_DISTANCE = 180;    // Perfectly calibrated so 100% stays clearly visible on screen!

  const triggerSwitch = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setHasTriggered(true);
    setIsDragging(false);

    // Play satisfying mechanical switch "CLACK!"
    playSwitchSound();

    const curtain = curtainRef.current;
    const cord = cordRef.current;
    const handle = handleRef.current;
    const text = textRef.current;
    if (!curtain) return;

    const tl = gsap.timeline();

    // 1. Elastic snap back of cord & handle upwards
    if (cord && handle) {
      tl.to(
        cord,
        {
          scaleY: 0.93,
          duration: 0.35,
          ease: 'elastic.out(1.4, 0.4)'
        }
      ).to(cord, {
        scaleY: 1,
        duration: 0.15,
        ease: 'power1.out'
      });

      tl.to(
        handle,
        {
          y: -18,
          duration: 0.35,
          ease: 'elastic.out(1.4, 0.4)'
        },
        0
      ).to(handle, {
        y: 0,
        duration: 0.15,
        ease: 'power1.out'
      });
    }

    // 2. Fade out text smoothly (No bright orange flash!)
    if (text) {
      tl.to(
        text,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in'
        },
        0.05
      );
    }

    // 3. Luxurious smooth slide-up curtain reveal
    tl.to(
      curtain,
      {
        yPercent: -100,
        duration: 1.05,
        ease: 'power4.inOut',
        onComplete: () => {
          curtain.style.display = 'none';
        }
      },
      0.15
    ).from(
      '.hero-reveal',
      {
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out'
      },
      0.35
    );
  };

  // Mouse / Touch Drag Listeners
  const startDrag = (clientY) => {
    if (triggeredRef.current) return;
    setIsDragging(true);
    dragStartYRef.current = clientY;
    currentYRef.current = 0;
  };

  useEffect(() => {
    const handleMove = (clientY) => {
      if (!isDragging || triggeredRef.current) return;
      // Pull freely all the way down up to MAX_PULL_DISTANCE (260px)
      const delta = Math.max(0, Math.min(MAX_PULL_DISTANCE, clientY - dragStartYRef.current));
      currentYRef.current = delta;

      const progress = Math.min(1, delta / MAX_PULL_DISTANCE);
      setDragProgress(progress);

      // Real-time cord stretching from ceiling
      if (cordRef.current) {
        const scaleFactor = (INITIAL_CORD_HEIGHT + delta) / INITIAL_CORD_HEIGHT;
        gsap.set(cordRef.current, { scaleY: scaleFactor, transformOrigin: 'top center' });
      }

      // Handle moves in sync with cursor/touch
      if (handleRef.current) {
        gsap.set(handleRef.current, { y: delta });
      }
    };

    const handleEnd = () => {
      if (!isDragging || triggeredRef.current) return;
      setIsDragging(false);
      setDragProgress(0);

      const delta = currentYRef.current;

      // User's choice: whether released halfway or all the way down, it switches on!
      if (delta >= MIN_TRIGGER_DISTANCE) {
        triggerSwitch();
      } else {
        // If barely moved (< 40px), spring back to rest
        if (cordRef.current) {
          gsap.to(cordRef.current, {
            scaleY: 1,
            duration: 0.5,
            ease: 'elastic.out(1.2, 0.45)'
          });
        }
        if (handleRef.current) {
          gsap.to(handleRef.current, {
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1.2, 0.45)'
          });
        }
      }
    };

    const onMouseMove = (e) => handleMove(e.clientY);
    const onTouchMove = (e) => {
      if (e.touches?.[0]) handleMove(e.touches[0].clientY);
    };
    const onMouseUp = () => handleEnd();
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      id="introCurtain"
      ref={curtainRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 select-none overflow-hidden ${
        isDragging ? 'cursor-grabbing' : 'cursor-default'
      }`}
      style={{
        backgroundColor: '#06080d', // 100% Solid Pitch Black
        opacity: 1
      }}
    >
      {/* Top Header Tag */}
      <div className="w-full flex items-center justify-between text-xs font-mono pt-4 sm:pt-6 max-w-4xl">
        <div className="flex items-center gap-2 text-[#ff5733]">
          <Sparkles className="w-4 h-4" />
          <span className="uppercase tracking-widest font-semibold">Rahul Vishwakarma // Atelier 2025</span>
        </div>
        <div className="text-slate-500 uppercase tracking-widest hidden sm:block">
          Physical Pull Switch
        </div>
      </div>

      {/* ========================================================
          THE PHYSICAL PULL-CORD (PULL AS MUCH AS YOU WANT & RELEASE)
          ======================================================== */}
      <div className="relative flex-1 flex flex-col items-center justify-start pt-4 sm:pt-8 w-full">
        {/* Ceiling Mount */}
        <div className="w-14 h-3.5 rounded-full bg-white/20 border border-white/10 shadow-[0_0_12px_rgba(255,255,255,0.15)]" />

        {/* The Hanging Cord (Stretches smoothly with your hand) */}
        <div
          ref={cordRef}
          style={{ height: `${INITIAL_CORD_HEIGHT}px`, transformOrigin: 'top center' }}
          className="w-[3px] bg-gradient-to-b from-white/50 via-[#ff5733] to-[#ff5733] shadow-[0_0_12px_rgba(255,87,51,0.5)]"
        />

        {/* The Pull Handle Bulb (Hold, Drag & Release) */}
        <div
          ref={handleRef}
          onMouseDown={(e) => {
            e.preventDefault();
            playHoverSound();
            startDrag(e.clientY);
          }}
          onTouchStart={(e) => {
            if (e.touches?.[0]) {
              playHoverSound();
              startDrag(e.touches[0].clientY);
            }
          }}
          className={`group relative -mt-1 flex flex-col items-center gap-3 select-none ${
            isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105'
          } transition-transform duration-150`}
          title="Click, pull down as much as you like, and release to switch!"
        >
          {/* Bulb Handle Orb */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#ff5733] via-[#ff6b47] to-[#ffa387] text-white shadow-[0_0_35px_rgba(255,87,51,0.6)]"
            style={{
              filter: `brightness(${1 + dragProgress * 0.35})`
            }}
          >
            <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 fill-white transition-transform" />

            {/* Subtle Pulsing Ripple when idle */}
            {!isDragging && !hasTriggered && (
              <span
                className="absolute -inset-3 rounded-full border-2 border-[#ff5733] animate-ping opacity-30 pointer-events-none"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Interactive Status Pill with Live Pull Percentage */}
          <div
            className="px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#141928] border border-[#ff5733]/60 text-[#ff5733] flex items-center gap-2 shadow-xl"
            style={{
              borderColor: isDragging ? '#ff5733' : 'rgba(255,87,51,0.4)',
              transform: `scale(${1 + dragProgress * 0.05})`
            }}
          >
            <ArrowDown className={`w-3.5 h-3.5 ${isDragging ? 'translate-y-1' : 'animate-bounce'}`} />
            <span>
              {isDragging
                ? `PULLED: ${Math.round(dragProgress * 100)}%`
                : 'PULL & RELEASE'}
            </span>
          </div>

          {/* Sleek Live Tension Bar */}
          {isDragging && (
            <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10 -mt-1 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#ff5733] transition-all duration-75"
                style={{ width: `${Math.round(dragProgress * 100)}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Identity & Prompt */}
      <div ref={textRef} className="text-center space-y-2 pb-6 max-w-md">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
          Rahul Vishwakarma
        </h1>
        <p className="font-mono text-xs text-slate-400 tracking-wider">
          Pull the switch cord and <strong>release anytime</strong> to switch on.
        </p>
      </div>
    </div>
  );
}
