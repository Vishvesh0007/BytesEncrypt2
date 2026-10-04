import { GraduationCap, BookOpen, ArrowRight } from 'lucide-react';

export default function Academy() {
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trainingTopics = [
    'Ethical Hacking & Web Penetration Testing',
    'SOC Operations & Threat Hunting',
    'Digital Forensics & Incident Response (DFIR)',
    'Malware Analysis & Reverse Engineering Fundamentals',
    'Network Defense & Hardening',
    'Red Team & Adversary Emulation',
  ];

  const bootcampHighlights = [
    'Hands-on lab environments with simulated production architectures',
    'Direct mentorship from practicing offensive security professionals',
    'Practical offensive tooling & custom Python/Bash automation workflows',
    'Structured capstone assessments validating practical tradecraft',
  ];

  return (
    <section
      id="academy"
      className="py-24 md:py-32 relative scroll-mt-20 border-t border-[rgba(255,255,255,0.06)]"
      aria-labelledby="academy-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-2xl text-left">
          <div className="mono-eyebrow mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.8)]" />
            <span>06 — ACADEMY</span>
          </div>

          <h2
            id="academy-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-tight text-[#f5f5f3] mb-4"
          >
            BytesEncrypt Academy.
          </h2>

          <p className="text-base sm:text-lg text-[#a3a3a0] font-light leading-relaxed">
            Offensive tradecraft taught by practitioners. Hands-on labs, real adversary techniques, and defensive hardening.
          </p>
        </div>

        {/* Two Large Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Card 1: Trainings */}
          <div className="card-surface p-7 sm:p-9 flex flex-col justify-between hover:border-[rgba(55,129,252,0.3)] transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#111110] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[#3781FC] mb-6">
                <BookOpen className="w-5 h-5" />
              </div>

              <h3 className="text-2xl font-light text-[#f5f5f3] tracking-tight mb-3">
                Trainings
              </h3>

              <p className="text-sm text-[#a3a3a0] font-light leading-relaxed mb-6">
                Targeted, hands-on modules designed for engineers, security analysts, and university students seeking rigorous domain competence.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#8a8a86] font-light">
                {trainingTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] mt-1.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs font-mono text-[#8a8a86]">
              <span>FORMAT: HANDS-ON LABS</span>
              <span className="text-[#3781FC]">PRACTITIONER_LED</span>
            </div>
          </div>

          {/* Card 2: Bootcamps */}
          <div className="card-surface p-7 sm:p-9 flex flex-col justify-between hover:border-[rgba(55,129,252,0.3)] transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#111110] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[#3781FC] mb-6">
                <GraduationCap className="w-5 h-5" />
              </div>

              <h3 className="text-2xl font-light text-[#f5f5f3] tracking-tight mb-3">
                Bootcamps
              </h3>

              <p className="text-sm text-[#a3a3a0] font-light leading-relaxed mb-6">
                Immersive, cohort-based programs combining continuous lab simulations, offensive tool development, and career development tracks.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#8a8a86] font-light">
                {bootcampHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs font-mono text-[#8a8a86]">
              <span>FORMAT: IMMERSIVE COHORT</span>
              <span className="text-[#3781FC]">LAB_ASSISTED</span>
            </div>
          </div>
        </div>

        {/* Mono Strip beneath: LEARN → PRACTICE → BUILD → CERTIFY → LAUNCH */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0b0b0a] border border-[rgba(255,255,255,0.08)] text-center mb-8">
          <div className="font-mono text-xs sm:text-sm text-[#f5f5f3] tracking-[0.2em] flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span>LEARN</span>
            <span className="text-[#8a8a86]">→</span>
            <span>PRACTICE</span>
            <span className="text-[#8a8a86]">→</span>
            <span>BUILD</span>
            <span className="text-[#8a8a86]">→</span>
            <span>CERTIFY</span>
            <span className="text-[#8a8a86]">→</span>
            <span className="text-[#3781FC]">LAUNCH</span>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#3781FC] hover:text-[#CBE9FD] transition-colors underline underline-offset-4 decoration-[#3781FC]/40"
          >
            <span>Ask about upcoming batches and enterprise training</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
