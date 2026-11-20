import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast?.visible) return null;

  return (
    <div
      id="toast"
      className="fixed bottom-6 right-6 z-[95] flex items-center gap-2.5 px-5 py-3 rounded-2xl border shadow-2xl text-xs font-mono font-semibold transition-all duration-200"
      style={{
        background: 'var(--bg-elevated)',
        borderColor: 'var(--accent)',
        color: 'var(--text)'
      }}
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      <span>{toast.message}</span>
    </div>
  );
}
