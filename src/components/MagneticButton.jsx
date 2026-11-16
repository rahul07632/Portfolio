import React, { useRef, useState } from 'react';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  title,
  type = 'button',
  disabled = false
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.22, y: y * 0.22 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    transition:
      pos.x === 0 && pos.y === 0
        ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
        : 'transform 0.08s linear'
  };

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        title={title}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}
