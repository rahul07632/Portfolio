import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast?.visible) return null;

  return (
    <div
      id="toast"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] inline-flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-xl text-xs font-mono font-medium backdrop-blur-md pointer-events-none whitespace-nowrap"
      style={{
        background: 'var(--bg-elevated)',
        borderColor: 'var(--accent)',
        color: 'var(--text)'
      }}
    >
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      <span>{toast.message}</span>
    </div>
  );
}
