import BentoGrid from '../ui/bento-grid';

export default function AttackSurface() {
  return (
    <section
      id="attack-surface"
      className="py-24 md:py-32 relative scroll-mt-20"
      aria-labelledby="attack-surface-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-2xl text-left">
          <div className="mono-eyebrow mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.8)]" />
            <span>01 — ATTACK SURFACE</span>
          </div>

          <h2
            id="attack-surface-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-tight text-[#f5f5f3] mb-4"
          >
            One attack surface. Multiple entry points.
          </h2>

          <p className="text-base sm:text-lg text-[#a3a3a0] font-light leading-relaxed">
            Modern environments expose interconnected attack vectors across code, networks, cloud infrastructure, and people. We evaluate every vector as an adversary would.
          </p>
        </div>

        {/* Bento Grid with 4 tiles */}
        <BentoGrid />
      </div>
    </section>
  );
}
