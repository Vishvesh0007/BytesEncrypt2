import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past the hero (~500px) and hide near bottom
      const scrolled = window.scrollY > 400;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 400;
      setVisible(scrolled && !nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden animate-in slide-in-from-bottom duration-300">
      <a
        href="#contact"
        onClick={handleClick}
        className="w-full py-3.5 px-6 rounded-full text-xs font-mono font-medium tracking-wider bg-[#3781FC] text-white hover:bg-[#CBE9FD] hover:text-[#03195B] shadow-[0_0_20px_rgba(25,81,252,0.35)] flex items-center justify-between border border-[#3781FC]/40 transition-all duration-200 group"
      >
        <span>REQUEST ASSESSMENT</span>
        <ArrowRight className="w-4 h-4 text-white group-hover:text-[#03195B] transition-colors" />
      </a>
    </div>
  );
}
