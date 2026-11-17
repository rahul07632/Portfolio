export default function ResumeModal() {
  return (
    <>
      <div id="resumeModal" className="fixed inset-0 z-[85] hidden items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div className="w-full max-w-3xl rounded-3xl surface-box overflow-hidden my-8 shadow-2xl">
          <div className="px-6 py-4 border-b hairline flex flex-wrap items-center justify-between gap-3">
            <span className="font-display font-bold text-sm sm:text-base">Rahul Vishwakarma — Resume</span>
            <div className="flex items-center gap-2">
              <button id="downloadResumeBtn" type="button" className="px-3.5 py-1.5 rounded-full accent-bg font-mono text-xs font-semibold">Download HTML</button>
              <button id="printResumeBtn" type="button" className="px-3.5 py-1.5 rounded-full border hairline font-mono text-xs">Print PDF</button>
              <button id="closeResumeBtn" type="button" className="p-1.5 rounded-full border hairline"><i data-lucide="x" className="w-4 h-4"></i></button>
            </div>
          </div>

          <div id="resumeSheet" className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
            <iframe
              id="resumeViewer"
              title="Rahul Vishwakarma Resume"
              src="/resume.html"
              className="w-full min-h-[75vh] rounded-2xl border border-[var(--border)] bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
