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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg overflow-y-auto"
    >
      <div
        className="rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden border shadow-2xl"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
      >
        {/* Modal Header */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl border flex items-center justify-center"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
            >
              <FileText className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold" style={{ color: 'var(--accent)' }}>
                Rahul Vishwakarma · Resume
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                Full-Stack Web Developer | B.Tech CSE (2025)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-xs font-mono border inline-flex items-center gap-1.5 hover-lift"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
              title="Open full resume in separate browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              <span>New Tab</span>
            </a>

            <a
              id="downloadResumeLink"
              href={resumeUrl}
              download="Rahul_Vishwakarma_Resume.html"
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono border inline-flex items-center gap-1.5 hover-lift"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
              title="Download HTML Resume file"
            >
              <Download className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              <span>Download</span>
            </a>

            <button
              id="printResumeBtn"
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono accent-btn font-semibold inline-flex items-center gap-1.5 hover-lift"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              id="closeResumeModal"
              type="button"
              aria-label="Close Resume"
              onClick={onClose}
              className="p-2 rounded-xl border hover:opacity-80 transition-opacity"
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
