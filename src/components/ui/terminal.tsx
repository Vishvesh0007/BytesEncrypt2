import { useEffect, useState } from 'react';
import { Terminal as TerminalIcon, CheckCircle2 } from 'lucide-react';



const TRACE_STEPS: Array<{ command: string; result: string }> = [
  { command: 'scope & recon', result: 'attack surface mapped' },
  { command: 'assess & exploit', result: 'exploit path identified' },
  { command: 'finding', result: 'broken access control (example)' },
  { command: 'report', result: 'severity · evidence · fix guidance' },
  { command: 'retest', result: 'fix verified' },
];

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setReducedMotion(true);
      setVisibleCount(TRACE_STEPS.length);
      return;
    }

    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < TRACE_STEPS.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 450);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="glow-tile-surface p-5 sm:p-6 w-full max-w-lg font-mono text-xs sm:text-[13px] relative overflow-hidden transition-all duration-300"
      role="region"
      aria-label="Illustrative security trace simulation"
    >
      {/* Top Bar with mono label instead of macOS dots */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-[#3781FC]" />
          <span className="mono-eyebrow text-[10px] sm:text-[11px] text-[#8a8a86] tracking-widest">
            ILLUSTRATIVE SECURITY TRACE
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-[#111110] border border-[rgba(255,255,255,0.08)] text-[#a3a3a0]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1951FC] animate-pulse" />
          ACTIVE_ENGAGEMENT
        </span>
      </div>

      {/* Terminal Content Lines */}
      <div className="space-y-2.5 leading-relaxed">
        {TRACE_STEPS.map((step, idx) => {
          const isVisible = reducedMotion || idx < visibleCount;
          const isCurrent = idx === visibleCount - 1 && visibleCount < TRACE_STEPS.length;
          const isDone = reducedMotion || idx < visibleCount - 1 || visibleCount === TRACE_STEPS.length;

          if (!isVisible) {
            return (
              <div key={step.command} className="opacity-0 select-none py-0.5">
                <span className="text-transparent">&gt; {step.command}</span>
              </div>
            );
          }

          return (
            <div
              key={step.command}
              className={`flex items-start justify-between gap-3 transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#8a8a86] select-none">&gt;</span>
                <span className="text-[#f5f5f3] font-light">{step.command}</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span
                  className={
                    step.command === 'retest'
                      ? 'text-[#3781FC] font-medium'
                      : isDone
                      ? 'text-[#3781FC]'
                      : 'text-[#a3a3a0]'
                  }
                >
                  {step.result}
                </span>
                {isDone && <CheckCircle2 className="w-3 h-3 text-[#3781FC] flex-shrink-0" />}
                {isCurrent && <span className="w-1.5 h-3 bg-[#3781FC] animate-pulse" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Footer */}
      <div className="mt-5 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#8a8a86]">
        <span>STATUS: VERIFIED REMEDIATION</span>
        <span className="text-[#a3a3a0]">ZERO_FALSE_POSITIVES</span>
      </div>
    </div>
  );
}
