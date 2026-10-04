import { useEffect, useRef, useState } from 'react';
import { METHODOLOGY_STEPS } from '../../data/methodology';
import { Check } from 'lucide-react';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress between entering viewport middle and leaving
      const start = rect.top - windowHeight * 0.7;
      const total = rect.height;
      const current = -start;
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-4">
      {/* Central Progress Line */}
      <div
        className="absolute left-4 sm:left-8 md:left-1/2 top-4 bottom-4 w-[1px] bg-[rgba(255,255,255,0.08)] -translate-x-1/2"
        aria-hidden="true"
      >
        <div
          className="w-full bg-gradient-to-b from-[#CBE9FD] via-[#3781FC] to-[#0B2CB1] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(55,129,252,0.5)]"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 4 Steps */}
      <div className="space-y-12 sm:space-y-16">
        {METHODOLOGY_STEPS.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={step.step}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? 'md:flex-row-reverse' : ''
              } gap-6 md:gap-12`}
            >
              {/* Center Dot Indicator */}
              <div
                className="absolute left-4 sm:left-8 md:left-1/2 -translate-x-1/2 mt-1.5 z-20 flex items-center justify-center w-7 h-7 rounded-full bg-[#111110] border border-[rgba(255,255,255,0.2)] shadow-lg shadow-black"
                aria-hidden="true"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    scrollProgress > idx * 0.25
                      ? 'bg-[#3781FC] shadow-[0_0_8px_rgba(55,129,252,0.8)]'
                      : 'bg-[#8a8a86]'
                  }`}
                />
              </div>

              {/* Content Card */}
              <div
                className={`ml-12 sm:ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isEven ? 'md:text-left' : 'md:text-left'
                }`}
              >
                <div className="card-surface p-6 sm:p-8 hover:border-[rgba(55,129,252,0.3)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="mono-eyebrow text-[11px] text-[#3781FC] font-mono">
                      {step.badge}
                    </span>
                    <span className="font-mono text-xs text-[#8a8a86]">
                      PHASE_{step.step}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-light text-[#f5f5f3] tracking-tight mb-3">
                    {step.title}
                  </h3>

                  <p className="text-[#a3a3a0] text-sm sm:text-[15px] font-light leading-relaxed mb-5">
                    {step.summary}
                  </p>

                  <ul className="space-y-2 text-xs sm:text-[13px] text-[#8a8a86] font-light">
                    {step.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#3781FC] flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer on desktop for alternate side */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
