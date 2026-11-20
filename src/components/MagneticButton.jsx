import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick, type = 'button', ...props }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width / 2) * 0.2,
        y: (e.clientY - r.top - r.height / 2) * 0.2,
        duration: 0.25
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      className={`magnetic-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
