import { useEffect, useRef, useState } from 'react';
import { Menu, X, Shield, ArrowRight, ChevronDown } from 'lucide-react';
import { NAV_LINKS, PRIMARY_CTA, NavLink } from '../../data/navigation';

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
      // 1. Scrolled navbar pill background state
      if (window.scrollY > 24) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. If user initiated a smooth scroll via click, wait until scroll completes
      if (isClickScrolling.current) return;

      // 3. Near top of page (Hero section)
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      // 4. Near bottom of page (activate Academy or current visible section)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('#academy');
        return;
      }

      // 5. Detect currently visible section
      let current = '';
      for (const href of PAGE_SECTION_ORDER) {
        const el = document.querySelector(href);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when section top is near the navbar and bottom hasn't scrolled past
          if (rect.top <= 240 && rect.bottom > 140) {
            current = href;
            break;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    // Run once on mount to detect current position
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
    }, 180);
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

    // Set active section immediately on click so user gets instant visual confirmation
    setActiveSection(href);
    isClickScrolling.current = true;
    if (clickScrollTimer.current) clearTimeout(clickScrollTimer.current);
    clickScrollTimer.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);

    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out flex justify-center px-4 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div
          className={`w-full max-w-[1200px] flex items-center justify-between px-5 md:px-6 transition-all duration-300 rounded-full ${
            scrolled
              ? 'bg-[#0b0b0a]/80 backdrop-blur-md border border-[rgba(255,255,255,0.12)] py-2.5 shadow-lg shadow-black/40'
              : 'bg-transparent border border-transparent py-2'
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, '#top')}
            className="flex items-center gap-2.5 text-[#f5f5f3] hover:opacity-90 transition-opacity group focus:outline-none shrink-0"
            aria-label="BytesEncrypt Home"
          >
            <div className="w-8 h-8 rounded-full bg-[#111110] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#3781FC] group-hover:border-[#3781FC]/40 transition-colors">
              <Shield className="w-4 h-4 text-[#3781FC]" />
            </div>
            <span className="font-light tracking-tight text-sm md:text-base text-[#f5f5f3]">
              Bytes<span className="text-[#a3a3a0]">Encrypt</span>
            </span>
          </a>

          {/* Desktop Nav Links with Active State & Rich Hover Details Popover */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-xs lg:text-sm font-light text-[#a3a3a0]" aria-label="Main Navigation">
            {NAV_LINKS.map((link, index) => {
              const isHovered = hoveredLink?.href === link.href;
              const isActive = activeSection === link.href;
              const isFirst = index === 0;
              const isLast = index === NAV_LINKS.length - 1;

              return (
                <div
                  key={link.href}
                  className="relative py-2"
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
                    className={`transition-all duration-200 relative py-1 px-2.5 flex items-center gap-1.5 focus:outline-none rounded-full ${
                      isActive
                        ? 'text-[#CBE9FD] bg-[#1951FC]/20 border border-[rgba(55,129,252,0.45)] shadow-[0_0_14px_rgba(25,81,252,0.35)] font-normal'
                        : isHovered
                        ? 'text-[#3781FC] bg-[#1951FC]/10 border border-[rgba(55,129,252,0.2)] font-normal'
                        : 'text-[#a3a3a0] border border-transparent hover:text-[#f5f5f3] hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Active indicator dot */}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,1)] shrink-0 animate-pulse" />
                    )}
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isHovered
                          ? 'rotate-180 text-[#3781FC]'
                          : isActive
                          ? 'text-[#3781FC]'
                          : 'text-[#6b6b68] opacity-70'
                      }`}
                    />
                  </a>

                  {/* Floating Detail Card on Hover */}
                  {isHovered && (
                    <div
                      className={`absolute top-full pt-3 z-50 pointer-events-auto transition-all duration-200 animate-in fade-in-0 slide-in-from-top-1 ${
                        isFirst
                          ? 'left-0'
                          : isLast
                          ? 'right-0'
                          : 'left-1/2 -translate-x-1/2'
                      }`}
                      onMouseEnter={() => handleMouseEnter(link)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className="w-[360px] rounded-2xl bg-[#090d17]/95 backdrop-blur-2xl border border-[rgba(55,129,252,0.3)] p-5 relative overflow-hidden group/card text-left"
                        style={{
                          boxShadow:
                            '0 24px 50px rgba(0,0,0,0.92), 0 0 35px rgba(25,81,252,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
                        }}
                      >
                        {/* Top subtle electric cobalt line */}
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3781FC] to-transparent opacity-90" />

                        {/* Pointer arrow caret */}
                        <div
                          className={`absolute -top-1.5 w-3 h-3 rotate-45 bg-[#090d17] border-t border-l border-[rgba(55,129,252,0.35)] ${
                            isFirst ? 'left-6' : isLast ? 'right-6' : 'left-1/2 -translate-x-1/2'
                          }`}
                        />

                        {/* Header: Eyebrow + Pill Badge */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="mono-eyebrow text-[10px] tracking-wider text-[#3781FC] flex items-center gap-1.5 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.9)] animate-pulse" />
                            <span>{link.eyebrow}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {isActive && (
                              <span className="text-[10px] text-[#CBE9FD] px-2 py-0.5 rounded-full bg-[#1951FC]/30 border border-[#3781FC]/60 font-mono">
                                Active Section
                              </span>
                            )}
                            <span className="text-[10px] text-[#CBE9FD] px-2 py-0.5 rounded-full bg-[#1951FC]/15 border border-[rgba(55,129,252,0.25)] font-mono">
                              {link.badge}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-sm font-normal text-[#f5f5f3] tracking-tight mb-1.5">
                          {link.title}
                        </h4>
                        <p className="text-xs text-[#a3a3a0] font-light leading-relaxed mb-3.5">
                          {link.description}
                        </p>

                        {/* Key Highlights Grid */}
                        <div className="grid grid-cols-2 gap-1.5 mb-3.5">
                          {link.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0e1424]/90 border border-[rgba(55,129,252,0.14)] text-[11px] text-[#e0e7ff] font-light"
                            >
                              <div className="w-1 h-1 rounded-full bg-[#3781FC] shrink-0 shadow-[0_0_4px_rgba(55,129,252,0.9)]" />
                              <span className="truncate">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Link Footer */}
                        <div className="pt-2.5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                          <a
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-xs font-medium text-[#3781FC] hover:text-[#CBE9FD] flex items-center gap-1.5 transition-colors group/cta"
                          >
                            <span>{link.ctaText || 'Jump to section'}</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover/cta:translate-x-1 transition-transform" />
                          </a>
                          <span className="text-[10px] text-[#8a8a86] font-mono tracking-tight">{link.href}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA & Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PRIMARY_CTA.href}
              onClick={(e) => handleLinkClick(e, PRIMARY_CTA.href)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-[#3781FC] text-white hover:bg-[#CBE9FD] hover:text-[#03195B] transition-all duration-200 shadow-[0_0_16px_rgba(25,81,252,0.35)] hover:shadow-[0_0_20px_rgba(55,129,252,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {PRIMARY_CTA.label}
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#a3a3a0] hover:text-[#3781FC] bg-[#111110] border border-[rgba(255,255,255,0.1)] focus:outline-none transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Section Previews & Active Indicator */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#050505]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col gap-3 text-left overflow-y-auto max-h-[calc(100vh-210px)] pr-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <div
                  key={link.href}
                  className={`p-3.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#10192e] border border-[rgba(55,129,252,0.5)] shadow-[0_0_20px_rgba(25,81,252,0.25)]'
                      : 'bg-[#0b0f1a]/80 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(55,129,252,0.3)]'
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
                      <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#3781FC]' : 'text-[#8a8a86]'}`} />
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

          <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <a
              href={PRIMARY_CTA.href}
              onClick={(e) => handleLinkClick(e, PRIMARY_CTA.href)}
              className="w-full inline-flex items-center justify-center py-3 rounded-full text-sm font-medium bg-[#3781FC] text-white hover:bg-[#CBE9FD] hover:text-[#03195B] transition-all duration-200 shadow-[0_0_20px_rgba(25,81,252,0.35)]"
            >
              {PRIMARY_CTA.label}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
