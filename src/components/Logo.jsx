import React from 'react';

export default function Logo({ size = "default", className = "" }) {
  const isSm = size === "sm";
  const dim = isSm ? "w-8 h-8" : "w-10 h-10";
  const textSize = isSm ? "text-xs" : "text-sm";

  return (
    <div
      className={`relative rounded-xl border flex items-center justify-center font-bold tracking-tight select-none transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_4px_18px_var(--glow)] ${dim} ${textSize} ${className}`}
      style={{
        background: 'var(--bg-elevated)',
        borderColor: 'var(--border)'
      }}
    >
      <span style={{ color: 'var(--text)' }}>R</span>
      <span style={{ color: 'var(--accent)' }}>V</span>
      <span
        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-colors"
        style={{ background: 'var(--accent)' }}
      />
    </div>
  );
}
