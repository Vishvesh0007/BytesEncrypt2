import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import GlassPillButton from './glass-pill-button';

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
      <GlassPillButton
        as="a"
        href="#contact"
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        size="lg"
        variant="primary"
        className="w-full flex items-center justify-between px-6 py-3.5"
      >
        <span className="font-mono text-xs tracking-wider">REQUEST ASSESSMENT</span>
        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
      </GlassPillButton>
    </div>
  );
}
