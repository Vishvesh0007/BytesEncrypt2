import Timeline from '../ui/timeline';

export default function Methodology() {
  return (
    <section
      id="approach"
      className="py-24 md:py-32 relative scroll-mt-20 border-t border-[rgba(255,255,255,0.06)]"
      aria-labelledby="approach-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-2xl text-left">
          <div className="mono-eyebrow mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.8)]" />
            <span>04 — APPROACH</span>
          </div>

          <h2
            id="approach-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-tight text-[#f5f5f3] mb-4"
          >
            From scope to retest. No shortcuts.
          </h2>

          <p className="text-base sm:text-lg text-[#a3a3a0] font-light leading-relaxed">
            A structured offensive security lifecycle designed to minimize operational impact while delivering comprehensive assurance.
          </p>
        </div>

        {/* Scroll-Linked Timeline */}
        <Timeline />
      </div>
    </section>
  );
}
