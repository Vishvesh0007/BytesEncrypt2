import Terminal from '../ui/terminal';
import GlassPillButton from '../ui/glass-pill-button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const handleScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 md:py-32"
      aria-label="BytesEncrypt Hero Section"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-[-0.03em] leading-[1.08] text-[#f5f5f3]">
              A health check for your{' '}
              <span className="hero-headline-gradient font-light">
                entire attack surface.
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-[#a3a3a0] font-light leading-relaxed max-w-xl">
              BytesEncrypt Technologies is an offensive security and assurance partner. We test applications, networks, cloud environments and people to uncover real security weaknesses, then tell you exactly what to fix.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <GlassPillButton
                as="a"
                href="#contact"
                onClick={handleScroll('#contact')}
                size="md"
                variant="primary"
              >
                <span>Request an assessment</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </GlassPillButton>

              <a
                href="#solutions"
                onClick={handleScroll('#solutions')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-light text-[#f5f5f3] bg-[#111110] border border-[rgba(55,129,252,0.35)] hover:bg-[rgba(25,81,252,0.12)] hover:border-[rgba(55,129,252,0.5)] transition-all duration-200 focus:outline-none"
              >
                View solutions
              </a>
            </div>
          </div>

          {/* Right Column: Terminal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
