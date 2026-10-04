import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function WhyBytesEncrypt() {
  const pillars = [
    {
      num: '01',
      title: 'Manual-first testing',
      desc: "Automated scanners find the obvious. Our testers chase the exploit paths a scanner can't see.",
    },
    {
      num: '02',
      title: 'Plain-language reports',
      desc: 'Every finding is written for the engineer who has to fix it, not just the auditor who has to file it.',
    },
    {
      num: '03',
      title: 'Retest included',
      desc: "We don't close a finding until we've verified the fix ourselves.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative scroll-mt-20 border-t border-[rgba(255,255,255,0.06)]"
      aria-labelledby="why-heading"
    >
      {/* Anchor for backward compatibility */}
      <span id="why-bytesencrypt" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-2xl text-left">
          <div className="mono-eyebrow mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.8)]" />
            <span>03 — ABOUT BYTESENCRYPT</span>
          </div>

          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-tight text-[#f5f5f3] mb-4"
          >
            Clarity, not just a scan report.
          </h2>

          <p className="text-base sm:text-lg text-[#a3a3a0] font-light leading-relaxed">
            Offensive testing is an engineering discipline. We eliminate noise, confirm exploitability with proof, and verify every fix.
          </p>
        </div>

        {/* 3 Pillars with large light numerals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="card-surface p-7 sm:p-8 flex flex-col justify-between hover:border-[rgba(55,129,252,0.3)] transition-all duration-300"
            >
              <div>
                <span className="font-light text-5xl sm:text-6xl text-[#8a8a86]/50 block mb-6 select-none font-sans">
                  {p.num}
                </span>

                <h3 className="text-xl sm:text-2xl font-light text-[#f5f5f3] tracking-tight mb-3">
                  {p.title}
                </h3>

                <p className="text-[#a3a3a0] text-sm sm:text-[15px] font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-1.5 text-xs font-mono text-[#3781FC]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CORE_METHODOLOGY</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column comparison without slider */}
        <div className="card-surface p-6 sm:p-10 border border-[rgba(255,255,255,0.12)] bg-[#0b0b0a]">
          <h3 className="mono-eyebrow text-xs sm:text-sm text-[#8a8a86] mb-8 text-center uppercase tracking-widest font-mono">
            PROCESS COMPARISON · AUTOMATED TOOLING VS. MANUAL ASSESSMENT
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Automated Scan Box */}
            <div className="p-6 rounded-xl bg-[#111110] border border-[rgba(255,255,255,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base sm:text-lg font-light text-[#a3a3a0]">
                    Automated scan
                  </h4>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#ffa94d] bg-[#ffa94d]/10 border border-[#ffa94d]/20">
                    High False Positives
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#8a8a86] font-light mb-6">
                  Generic rule matching without context of application workflow or authorization logic.
                </p>

                {/* Step Flow */}
                <div className="space-y-3 font-mono text-xs text-[#8a8a86]">
                  {[
                    'Scan targets launched via canned tool signatures',
                    'High volume alerts and duplicate finding floods',
                    'Unverified theoretical flaws and false positives',
                    'Engineers burdened with manual triage and interpretation',
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#ffa94d] flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] text-[11px] font-mono text-[#8a8a86]">
                OUTCOME: No exploit proof · high developer fatigue
              </div>
            </div>

            {/* Manual Assessment Box */}
            <div className="p-6 rounded-xl bg-[#111110] border border-[#3781FC]/35 relative overflow-hidden flex flex-col justify-between shadow-[0_0_24px_rgba(25,81,252,0.12)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1951FC]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base sm:text-lg font-light text-[#f5f5f3]">
                    Manual assessment
                  </h4>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#3781FC] bg-[#1951FC]/15 border border-[#3781FC]/30">
                    BytesEncrypt Standard
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#a3a3a0] font-light mb-6">
                  Human offensive specialists mapping business logic, chaining vulnerabilities, and providing verified proof.
                </p>

                {/* Step Flow */}
                <div className="space-y-3 font-mono text-xs text-[#f5f5f3]">
                  {[
                    'Attack surface recon & custom business logic analysis',
                    'Chained multi-step exploit paths verified with proof',
                    'Actionable code remediation advice for developers',
                    'Retest included to confirm patches hold in production',
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3781FC] flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] text-[11px] font-mono text-[#3781FC]">
                OUTCOME: Zero false positives · verified closure
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
