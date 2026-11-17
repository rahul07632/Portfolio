import React from 'react';

export default function ResumeModal() {
  const handlePrint = () => {
    const iframe = document.getElementById('resumeViewer');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.focus();
        setTimeout(() => {
          iframe.contentWindow.print();
        }, 200);
      } catch (err) {
        const printWindow = window.open('/resume.html', '_blank');
        if (printWindow) {
          printWindow.addEventListener('load', () => {
            printWindow.focus();
            printWindow.print();
          }, { once: true });
        }
      }
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = '/resume.html';
    a.download = 'Rahul_Vishwakarma_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div id="resumeModal" className="fixed inset-0 z-[85] hidden items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl surface-box overflow-hidden my-8 shadow-2xl bg-white text-slate-900">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
          <span className="font-display font-bold text-sm sm:text-base text-slate-800">
            Rahul Vishwakarma — Resume
          </span>
          <div className="flex items-center gap-2">
            <button
              id="downloadResumeBtn"
              onClick={handleDownload}
              type="button"
              className="px-3.5 py-1.5 rounded-full bg-orange-600 text-white font-mono text-xs font-semibold hover:bg-orange-700 transition cursor-pointer"
            >
              Download HTML
            </button>
            <button
              id="printResumeBtn"
              onClick={handlePrint}
              type="button"
              className="px-3.5 py-1.5 rounded-full border border-slate-300 font-mono text-xs hover:bg-slate-100 transition text-slate-700 cursor-pointer"
            >
              Print / PDF
            </button>
            <button
              id="closeResumeBtn"
              onClick={() => {
                const modal = document.getElementById('resumeModal');
                if (modal) {
                  modal.classList.add('hidden');
                  modal.classList.remove('flex');
                }
              }}
              type="button"
              className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body / Iframe Viewer */}
        <div id="resumeSheet" className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto bg-slate-100">
          <iframe
            id="resumeViewer"
            title="Rahul Vishwakarma Resume"
            src="/resume.html"
            className="w-full min-h-[70vh] rounded-2xl border border-slate-300 bg-white shadow-inner"
          />
        </div>

      </div>
    </div>
  );
}