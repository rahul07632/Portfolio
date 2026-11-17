export default function Footer() {
  return (
    <>
<footer className="border-t hairline py-8">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs opacity-75">
      <div>© 2026 RAHUL VISHWAKARMA — FULL STACK DEVELOPER</div>
      <div className="flex items-center gap-5">
        <a href="https://github.com/rahul07632" target="_blank" rel="noopener noreferrer" className="hover:accent-text">GitHub</a>
        <a href="https://www.linkedin.com/in/rahulvishwakarma78/" target="_blank" rel="noopener noreferrer" className="hover:accent-text">LinkedIn</a>
        <a href="#hero" className="hover:accent-text">Back to Top ↑</a>
      </div>
    </div>
  </footer>
    </>
  );
}
