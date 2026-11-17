export default function Contact() {
  return (
    <>
      <section id="contact" className="py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 editorial-reveal">
            <span className="font-mono text-xs uppercase tracking-widest accent-text block">05 // INITIATE CONTACT</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight uppercase leading-[0.96]">
              Let's Build<br />
              <span className="font-serif italic font-normal lowercase">Together</span>
            </h2>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              Open to Full-Stack Developer, Frontend Developer, and Entry-Level Software Engineering opportunities across India or remote.
            </p>

            <div className="space-y-3 pt-2 font-mono text-xs">
              <div className="surface-box p-4 rounded-2xl">
                <span className="opacity-60 block text-[10px]">EMAIL</span>
                <span className="font-semibold block">rahulvishwakarma13211@gmail.com</span>
              </div>

              <div className="surface-box p-4 rounded-2xl">
                <span className="opacity-60 block text-[10px]">PHONE</span>
                <span className="font-semibold block">+91 7879260763</span>
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
              <h3 className="font-display font-bold text-xl sm:text-2xl">Available for opportunities</h3>
              <span className="font-mono text-[11px] opacity-65">Open to work</span>
            </div>

            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              I enjoy building clean, user-focused products and collaborating on thoughtful engineering work across frontend, backend, and product experiences.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="surface-box p-4 rounded-2xl">
                <div className="opacity-60 mb-2">ROLE</div>
                <div className="font-semibold">Frontend Developer</div>
              </div>
              <div className="surface-box p-4 rounded-2xl">
                <div className="opacity-60 mb-2">STACK</div>
                <div className="font-semibold">React · Node</div>
              </div>
              <div className="surface-box p-4 rounded-2xl">
                <div className="opacity-60 mb-2">LOCATION</div>
                <div className="font-semibold">India / Remote</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
