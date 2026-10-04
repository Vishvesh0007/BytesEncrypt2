import { useState } from 'react';
import { SOLUTIONS } from '../../data/solutions';
import { ChevronDown, ArrowRight, Check, ShieldCheck } from 'lucide-react';

export default function Solutions() {
  const [openId, setOpenId] = useState<string>('app-sec'); // First row open by default

  const toggleRow = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const handleAssessmentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="solutions"
      className="py-24 md:py-32 relative scroll-mt-20 border-t border-[rgba(255,255,255,0.06)]"
      aria-labelledby="solutions-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-2xl text-left">
          <div className="mono-eyebrow mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.8)]" />
            <span>02 — SOLUTIONS</span>
          </div>

          <h2
            id="solutions-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-tight text-[#f5f5f3] mb-4"
          >
            Security testing built around real attack paths.
          </h2>

          <p className="text-base sm:text-lg text-[#a3a3a0] font-light leading-relaxed">
            Manual-first assessment programs engineered for production systems. Every finding comes with reproduction proof, technical fix guidance, and a retest.
          </p>
        </div>

        {/* Grouped Accordion List */}
        <div className="border-t border-[rgba(255,255,255,0.1)] divide-y divide-[rgba(255,255,255,0.08)]">
          {SOLUTIONS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="transition-colors duration-200">
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => toggleRow(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`solution-content-${item.id}`}
                  className="w-full py-6 sm:py-7 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-6 pr-4">
                    <span className="font-mono text-xs sm:text-sm text-[#8a8a86] group-hover:text-[#3781FC] transition-colors">
                      {item.number}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-light text-[#f5f5f3] tracking-tight group-hover:text-[#3781FC] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block font-mono text-[11px] text-[#8a8a86] uppercase tracking-wider">
                      {isOpen ? 'COLLAPSE' : 'EXPAND'}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-[#111110] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#a3a3a0] group-hover:border-[#3781FC]/40 group-hover:text-[#f5f5f3] transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-[#1a1a18] text-[#3781FC]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div
                    id={`solution-content-${item.id}`}
                    className="pb-8 pt-2 sm:pl-12 text-[#a3a3a0] animate-in fade-in duration-200"
                  >
                    <p className="text-sm sm:text-base font-light text-[#f5f5f3] max-w-3xl mb-6 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 mb-8">
                      {/* Scope Column */}
                      <div className="card-surface p-5 sm:p-6 bg-[#0b0b0a]">
                        <h4 className="mono-eyebrow text-xs text-[#3781FC] mb-3 uppercase tracking-wider font-mono">
                          Scope & Testing Depth
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm font-light text-[#a3a3a0]">
                          {item.scope.map((s, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#3781FC] flex-shrink-0 mt-0.5" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables Column */}
                      <div className="card-surface p-5 sm:p-6 bg-[#0b0b0a]">
                        <h4 className="mono-eyebrow text-xs text-[#3781FC] mb-3 uppercase tracking-wider font-mono">
                          Deliverables & Assurance
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm font-light text-[#a3a3a0]">
                          {item.deliverables.map((d, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#3781FC] flex-shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Request Assessment link for this solution */}
                    <div className="pt-2">
                      <a
                        href="#contact"
                        onClick={handleAssessmentClick}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-normal text-[#3781FC] hover:text-[#CBE9FD] transition-colors group/link"
                      >
                        <span className="underline underline-offset-4 decoration-[#3781FC]/40 group-hover/link:decoration-[#CBE9FD]">
                          Request assessment for {item.title.toLowerCase()}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
