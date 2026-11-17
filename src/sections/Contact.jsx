export default function Contact() {
  return (
    <>
<section id="contact" className="py-20 sm:py-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-5 space-y-6 editorial-reveal">
          <span className="font-mono text-xs uppercase tracking-widest accent-text block">05 // INITIATE CONTACT</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight uppercase leading-[0.96]">
            Let's Build<br/>
            <span className="font-serif italic font-normal lowercase">Together</span>
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
            Open to Full-Stack Developer, Frontend Developer, and Entry-Level Software Engineering opportunities across India or remote.
          </p>

          <div className="space-y-3 pt-2 font-mono text-xs">
            <div className="surface-box p-4 rounded-2xl flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="opacity-60 block text-[10px]">EMAIL</span>
                <a href="mailto:rahulvishwakarma13211@gmail.com" className="font-semibold hover:accent-text truncate block">rahulvishwakarma13211@gmail.com</a>
              </div>
              <button id="copyEmailBtn" type="button" className="px-3 py-1.5 rounded-full border hairline hover:border-[var(--accent)] shrink-0">Copy</button>
            </div>

            <div className="surface-box p-4 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <span className="opacity-60 block text-[10px]">PHONE</span>
                <a href="tel:+917879260763" className="font-semibold hover:accent-text">+91 7879260763</a>
              </div>
              <button id="copyPhoneBtn" type="button" className="px-3 py-1.5 rounded-full border hairline hover:border-[var(--accent)] shrink-0">Copy</button>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://github.com/rahul07632" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-full border hairline hover:border-[var(--accent)] inline-flex items-center gap-2">
                <i data-lucide="github" className="w-4 h-4"></i> GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/rahulvishwakarma78/" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-full border hairline hover:border-[var(--accent)] inline-flex items-center gap-2">
                <i data-lucide="linkedin" className="w-4 h-4"></i> LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-7 surface-box rounded-3xl p-6 sm:p-10 editorial-reveal">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-xl sm:text-2xl">Direct Message</h3>
            <span className="font-mono text-[11px] opacity-65">Validated &amp; Ready</span>
          </div>

          <form id="contactForm" className="space-y-4" novalidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cName" className="block font-mono text-[11px] uppercase opacity-75 mb-1.5">Your Name *</label>
                <input id="cName" type="text" required placeholder="Recruiter / Hiring Manager" className="w-full px-4 py-3 rounded-xl bg-transparent border hairline focus:outline-none focus:border-[var(--accent)] text-sm" />
                <p id="cErrName" className="hidden text-xs text-rose-500 font-mono mt-1">Please enter your name.</p>
              </div>
              <div>
                <label htmlFor="cEmail" className="block font-mono text-[11px] uppercase opacity-75 mb-1.5">Email Address *</label>
                <input id="cEmail" type="email" required placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl bg-transparent border hairline focus:outline-none focus:border-[var(--accent)] text-sm" />
                <p id="cErrEmail" className="hidden text-xs text-rose-500 font-mono mt-1">Enter a valid email address.</p>
              </div>
            </div>

            <div>
              <label htmlFor="cSubject" className="block font-mono text-[11px] uppercase opacity-75 mb-1.5">Subject *</label>
              <input id="cSubject" type="text" required placeholder="Full Stack Developer Opportunity" className="w-full px-4 py-3 rounded-xl bg-transparent border hairline focus:outline-none focus:border-[var(--accent)] text-sm" />
              <p id="cErrSubject" className="hidden text-xs text-rose-500 font-mono mt-1">Please enter a subject.</p>
            </div>

            <div>
              <label htmlFor="cMessage" className="block font-mono text-[11px] uppercase opacity-75 mb-1.5">Message *</label>
              <textarea id="cMessage" rows="4" required placeholder="Share role details or project inquiry..." className="w-full px-4 py-3 rounded-xl bg-transparent border hairline focus:outline-none focus:border-[var(--accent)] text-sm resize-y"></textarea>
              <p id="cErrMessage" className="hidden text-xs text-rose-500 font-mono mt-1">Message must be at least 10 characters.</p>
            </div>

            <div id="contactFeedback" className="hidden p-4 rounded-2xl border hairline font-mono text-xs space-y-2"></div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button type="submit" className="magnetic-el px-6 py-3.5 rounded-full accent-bg font-display font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                <span>Prepare &amp; Send Email</span>
                <i data-lucide="send" className="w-4 h-4"></i>
              </button>
              <button id="copyDraftBtn" type="button" className="px-4 py-3 rounded-full border hairline font-mono text-xs hover:border-[var(--accent)]">
                Copy Message Text
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  );
}
