export default function About() {
  return (
    <>
      <section id="about" className="py-20 sm:py-28 border-b hairline">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 editorial-reveal">
            <span className="font-mono text-xs uppercase tracking-widest accent-text block mb-2">03 // DEVELOPER PROFILE</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight uppercase leading-[1.02]">
              Honest Craft.<br />
              <span className="font-serif italic font-normal lowercase">Continuous</span> Growth.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 editorial-reveal">
            <p className="text-lg sm:text-xl leading-relaxed font-medium">
              I'm Rahul Vishwakarma, a 2025 Computer Science &amp; Engineering graduate from Shri Ram Institute of Science and Technology (SRIST), Jabalpur, and a fresher full-stack developer focused on building clean, responsive, and dependable web applications.
            </p>
            <p className="text-sm sm:text-base leading-relaxed opacity-80">
              I approach software engineering with a strong emphasis on fundamentals: semantic HTML, responsive layouts, predictable JavaScript behavior, REST API integration, and SQL-backed application logic. My training through NxtWave CCBP 4.0 Academy has helped me translate core CS concepts into practical projects and deployment-ready work.
            </p>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="surface-box p-4 rounded-2xl">
                <div className="font-mono text-[11px] opacity-60">DEGREE</div>
                <div className="font-display font-bold text-lg mt-1">B.Tech CSE</div>
                <div className="text-xs opacity-75 mt-0.5">2021 – 2025 • SRIST Jabalpur</div>
              </div>
              <div className="surface-box p-4 rounded-2xl">
                <div className="font-mono text-[11px] opacity-60">TRAINING</div>
                <div className="font-display font-bold text-lg mt-1">NxtWave 4.0</div>
                <div className="text-xs opacity-75 mt-0.5">Full-Stack MERN &amp; Python</div>
              </div>
              <div className="surface-box p-4 rounded-2xl">
                <div className="font-mono text-[11px] opacity-60">CLOUD &amp; AI</div>
                <div className="font-display font-bold text-lg mt-1">AWS &amp; ServiceNow</div>
                <div className="text-xs opacity-75 mt-0.5">GenAI Badge &amp; Cloud Modules</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
