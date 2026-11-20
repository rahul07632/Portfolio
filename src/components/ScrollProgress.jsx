import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const current = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      setPct(Math.min(100, Math.max(0, current)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none">
      <div
        id="scrollProgress"
        className="h-full accent-btn transition-all duration-75"
        style={{ width: `${pct}%` }}
      ></div>
    </div>
  );
}
