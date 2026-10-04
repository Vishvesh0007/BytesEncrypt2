import { useEffect, useRef, useState } from 'react';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';
import { NAV_LINKS, PRIMARY_CTA, NavLink } from '../../data/navigation';
import GlassPillButton from './glass-pill-button';

export default function ResizableNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<NavLink | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isClickScrolling = useRef(false);
  const clickScrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Sections in page DOM order for accurate scroll-spy tracking
  const PAGE_SECTION_ORDER = [
    '#attack-surface',
    '#solutions',
    '#about',
    '#approach',
    '#report',
    '#academy',
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (isClickScrolling.current) return;

      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('#academy');
        return;
      }

      let current = '';
      for (const href of PAGE_SECTION_ORDER) {
        const el = document.querySelector(href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom > 140) {
            current = href;
            break;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickScrollTimer.current) clearTimeout(clickScrollTimer.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (link: NavLink) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLink(null);
    }, 160);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setHoveredLink(null);

    if (href === '#top') {
      setActiveSection('');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    setActiveSection(href);
    isClickScrolling.current = true;
    if (clickScrollTimer.current) clearTimeout(clickScrollTimer.current);
    clickScrollTimer.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);

    const element = document.querySelector(href);
    if (element) {
      const topOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-3 md:py-4 pointer-events-none transition-all duration-300">
        {/* Floating Glassmorphic Capsule Dock */}
        <div
          className={`pointer-events-auto w-full max-w-[1060px] flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#060c1d]/85 backdrop-blur-2xl border border-[rgba(203,233,253,0.22)] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.9),0_0_28px_-4px_rgba(25,81,252,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.4)]'
              : 'bg-[#060c1d]/65 backdrop-blur-xl border border-[rgba(255,255,255,0.14)] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7),0_0_20px_-4px_rgba(25,81,252,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.3)]'
          }`}
        >
          {/* Logo with Illuminated 3D Emblem */}
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, '#top')}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0 pl-1"
            aria-label="BytesEncrypt Home"
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-b from-[#3781FC] via-[#1951FC] to-[#0B2CB1] border border-[rgba(203,233,253,0.6)] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_0_14px_rgba(25,81,252,0.6)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(55,129,252,0.8)] transition-all duration-200">
              <Shield className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(3,25,91,0.8)]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-medium tracking-tight text-sm text-white flex items-center gap-0.5">
                Bytes<span className="text-[#3781FC] font-light">Encrypt</span>
              </span>
              <span className="text-[8.5px] font-mono tracking-widest text-[#8a8a86] -mt-0.5 uppercase">
                Assurance
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav
            className="hidden md:flex items-center gap-1 text-xs font-light"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link, index) => {
              const isHovered = hoveredLink?.href === link.href;
              const isActive = activeSection === link.href;
              const isFirst = index === 0;
              const isLast = index === NAV_LINKS.length - 1;

              return (
                <div
                  key={link.href}
                  className="relative py-1"
                  onMouseEnter={() => handleMouseEnter(link)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    onFocus={() => handleMouseEnter(link)}
                    onBlur={handleMouseLeave}
                    aria-expanded={isHovered}
                    aria-current={isActive ? 'true' : undefined}
                    aria-haspopup="true"
                    className={`relative py-1.5 px-3 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 focus:outline-none select-none ${
                      isActive
                        ? 'text-[#CBE9FD] bg-gradient-to-b from-[#1951FC]/35 to-[#0B2CB1]/35 border border-[#3781FC]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_0_14px_rgba(25,81,252,0.4)]'
                        : isHovered
                        ? 'text-white bg-white/[0.08] border border-white/10'
                        : 'text-[#a3a3a0] border border-transparent hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_#3781FC] shrink-0 animate-pulse" />
                    )}
                    <span>{link.label}</span>
                  </a>

                  {/* Holographic Detail Card Popover */}
                  {isHovered && (
                    <div
                      className={`absolute top-full pt-3.5 z-50 pointer-events-auto transition-all duration-200 animate-in fade-in-0 slide-in-from-top-1 ${
                        isFirst
                          ? 'left-0'
                          : isLast
                          ? 'right-0'
                          : 'left-1/2 -translate-x-1/2'
                      }`}
                      onMouseEnter={() => handleMouseEnter(link)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="w-[360px] glow-tile-surface p-5 text-left border border-[rgba(55,129,252,0.45)] shadow-[0_24px_55px_rgba(0,0,0,0.95),0_0_35px_rgba(25,81,252,0.3)]">
                        {/* Caret */}
                        <div
                          className={`absolute -top-1.5 w-3 h-3 rotate-45 bg-[#091536] border-t border-l border-[rgba(55,129,252,0.5)] ${
                            isFirst ? 'left-6' : isLast ? 'right-6' : 'left-1/2 -translate-x-1/2'
                          }`}
                        />

                        {/* Top row */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="mono-eyebrow text-[10px] tracking-wider text-[#3781FC] flex items-center gap-1.5 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.9)] animate-pulse" />
                            <span>{link.eyebrow}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {isActive && (
                              <span className="text-[10px] text-[#CBE9FD] px-2 py-0.5 rounded-full bg-[#1951FC]/40 border border-[#3781FC]/60 font-mono">
                                Active
                              </span>
                            )}
                            <span className="text-[10px] text-[#CBE9FD] px-2 py-0.5 rounded-full bg-[#1951FC]/20 border border-[rgba(55,129,252,0.3)] font-mono">
                              {link.badge}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-sm font-medium text-white tracking-tight mb-1.5">
                          {link.title}
                        </h4>
                        <p className="text-xs text-[#a3a3a0] font-light leading-relaxed mb-3.5">
                          {link.description}
                        </p>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-2 gap-1.5 mb-3.5">
                          {link.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0e1834]/80 border border-[rgba(55,129,252,0.2)] text-[11px] text-[#e0e7ff] font-light"
                            >
                              <div className="w-1 h-1 rounded-full bg-[#3781FC] shrink-0 shadow-[0_0_4px_rgba(55,129,252,0.9)]" />
                              <span className="truncate">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Footer Link */}
                        <div className="pt-2.5 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                          <a
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-xs font-medium text-[#3781FC] hover:text-[#CBE9FD] flex items-center gap-1.5 transition-colors group/cta"
                          >
                            <span>{link.ctaText || 'Jump to section'}</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover/cta:translate-x-1 transition-transform" />
                          </a>
                          <span className="text-[10px] text-[#8a8a86] font-mono tracking-tight">
                            {link.href}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action & Mobile Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:block">
              <GlassPillButton
                as="a"
                href={PRIMARY_CTA.href}
                onClick={(e) => handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, PRIMARY_CTA.href)}
                size="sm"
                variant="primary"
                className="whitespace-nowrap font-medium text-xs px-4 py-2"
              >
                <span>{PRIMARY_CTA.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 transition-transform" />
              </GlassPillButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#f5f5f3] hover:text-[#3781FC] bg-[#0c1630]/90 border border-[rgba(203,233,253,0.25)] hover:border-[#3781FC]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_12px_rgba(25,81,252,0.3)] focus:outline-none transition-all"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#040814]/95 backdrop-blur-2xl md:hidden pt-24 px-5 flex flex-col justify-between pb-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <nav
            className="flex flex-col gap-2.5 text-left overflow-y-auto max-h-[calc(100vh-190px)] pr-1"
            aria-label="Mobile Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <div
                  key={link.href}
                  className={`p-3.5 rounded-2xl transition-all ${
                    isActive
                      ? 'glow-tile-surface border border-[rgba(55,129,252,0.6)] shadow-[0_0_24px_rgba(25,81,252,0.35)]'
                      : 'bg-[#08122c]/60 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(55,129,252,0.35)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-base flex items-center gap-2 transition-colors ${
                        isActive
                          ? 'text-[#CBE9FD] font-medium'
                          : 'text-[#f5f5f3] hover:text-[#3781FC] font-normal'
                      }`}
                    >
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,1)] shrink-0 animate-pulse" />
                      )}
                      <span>{link.label}</span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 ${isActive ? 'text-[#3781FC]' : 'text-[#8a8a86]'}`}
                      />
                    </a>
                    <div className="flex items-center gap-1.5">
                      {isActive && (
                        <span className="text-[10px] text-[#CBE9FD] px-2 py-0.5 rounded-full bg-[#1951FC]/40 border border-[#3781FC]/60 font-mono">
                          Current
                        </span>
                      )}
                      <span className="text-[10px] text-[#3781FC] px-2 py-0.5 rounded-full bg-[#1951FC]/15 border border-[rgba(55,129,252,0.25)] font-mono">
                        {link.badge}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#a3a3a0] font-light leading-relaxed mb-2.5">
                    {link.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {link.highlights.map((h, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          isActive
                            ? 'text-[#CBE9FD] bg-[#14203a] border border-[rgba(55,129,252,0.25)]'
                            : 'text-[#CBE9FD] bg-[#111625] border border-[rgba(55,129,252,0.12)]'
                        }`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
            <GlassPillButton
              as="a"
              href={PRIMARY_CTA.href}
              onClick={(e) => handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, PRIMARY_CTA.href)}
              size="lg"
              variant="primary"
            >
              <span>{PRIMARY_CTA.label}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </GlassPillButton>
          </div>
        </div>
      )}
    </>
  );
}
