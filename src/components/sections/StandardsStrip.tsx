export default function StandardsStrip() {
  const standards = ['OWASP', 'NIST', 'PTES', 'CVSS'];

  return (
    <div className="relative py-12 border-y border-[rgba(255,255,255,0.06)] bg-[#050505]/40 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
        {/* Text-only row with hairline separators */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 font-mono text-sm sm:text-base tracking-[0.2em] text-[#f5f5f3]">
          {standards.map((standard, idx) => (
            <div key={standard} className="flex items-center gap-6 sm:gap-10 md:gap-14">
              <span className="hover:text-[#3781FC] hover:drop-shadow-[0_0_8px_rgba(55,129,252,0.4)] transition-colors cursor-default">
                {standard}
              </span>
              {idx < standards.length - 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.18)]" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Truthful explanatory caption */}
        <p className="mt-3.5 text-xs font-mono text-[#8a8a86] tracking-wider uppercase">
          Methodologies we align our testing to.
        </p>
      </div>
    </div>
  );
}
