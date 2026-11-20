import React, { useRef, useEffect } from 'react';
import { Download, Printer, X, ExternalLink, FileText } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  const iframeRef = useRef(null);
  const resumeUrl = '/resume.html';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handlePrint = () => {
    try {
      iframeRef.current?.contentWindow?.print();
    } catch {
      window.print();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="resumeModal"
      onClick={(e) => {
        if (e.target.id === 'resumeModal') onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-lg overflow-y-auto"
    >
      <div
        className="rounded-2xl sm:rounded-3xl max-w-5xl w-full h-[92vh] sm:h-[90vh] flex flex-col overflow-hidden border shadow-2xl"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between gap-2 px-2.5 sm:px-6 py-2.5 sm:py-3.5 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl border flex items-center justify-center shrink-0"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: 'var(--accent)' }} />
            </div>
            <div className="truncate">
              <h3 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold truncate" style={{ color: 'var(--accent)' }}>
                Rahul Vishwakarma
              </h3>
              <p className="text-[9.5px] sm:text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                Full-Stack Developer · 2025
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <a
              id="downloadResumeLink"
              href={resumeUrl}
              download="Rahul_Vishwakarma_Resume.html"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono border inline-flex items-center gap-1 hover-lift"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
              title="Download HTML Resume file"
            >
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'var(--accent)' }} />
              <span className="hidden min-[360px]:inline">Download</span>
            </a>

            <button
              id="printResumeBtn"
              type="button"
              onClick={handlePrint}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono accent-btn font-semibold inline-flex items-center gap-1 hover-lift"
              title="Print or Save as PDF"
            >
              <Printer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden min-[360px]:inline">Print</span>
            </button>

            <button
              id="closeResumeModal"
              type="button"
              aria-label="Close Resume"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl border hover:opacity-80 transition-opacity"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rahul's Resume Rendered directly in full-height Iframe */}
        <iframe
          ref={iframeRef}
          id="resumeIframe"
          title="Rahul Vishwakarma - Resume"
          src={resumeUrl}
          className="flex-1 w-full h-full bg-white border-0"
        />
      </div>
    </div>
  );
}
