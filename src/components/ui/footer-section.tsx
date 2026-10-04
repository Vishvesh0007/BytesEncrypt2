import { Shield, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const SOCIAL_LINKS = [
  { name: 'X (Twitter)', href: 'https://x.com/bytes_encrypt' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/bytesencrypt' },
  { name: 'Instagram', href: 'https://www.instagram.com/bytesencryptofficial' },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61593238796805' },
];

export default function FooterSection() {
  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#050505] border-t border-[rgba(255,255,255,0.08)] pt-20 pb-14 text-sm font-light text-[#a3a3a0]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#top" onClick={scrollTo('#top')} className="inline-flex items-center gap-2.5 text-[#f5f5f3] focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-[#111110] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#3781FC]">
                <Shield className="w-4 h-4 text-[#3781FC]" />
              </div>
              <span className="font-light tracking-tight text-base text-[#f5f5f3]">
                Bytes<span className="text-[#a3a3a0]">Encrypt</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-[#8a8a86] leading-relaxed max-w-sm">
              Offensive security and assurance partner. We test applications, cloud environments, networks, and people to uncover real exploit paths, with retest included.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono text-[#8a8a86]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#3781FC]" />
                <a href="mailto:contact@bytesencrypt.com" className="hover:text-[#f5f5f3] transition-colors">
                  contact@bytesencrypt.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#3781FC]" />
                <a href="tel:+919113962011" className="hover:text-[#f5f5f3] transition-colors">
                  +91 9113962011
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#3781FC]" />
                <span>Kalyan Nagar, Bangalore, KAR-560043</span>
              </div>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="mono-eyebrow text-xs text-[#f5f5f3] mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#why-bytesencrypt" onClick={scrollTo('#why-bytesencrypt')} className="hover:text-[#f5f5f3] transition-colors">
                  Why BytesEncrypt
                </a>
              </li>
              <li>
                <a href="#approach" onClick={scrollTo('#approach')} className="hover:text-[#f5f5f3] transition-colors">
                  Our Approach
                </a>
              </li>
              <li>
                <a href="#report" onClick={scrollTo('#report')} className="hover:text-[#f5f5f3] transition-colors">
                  Sample Report
                </a>
              </li>
              <li>
                <a href="#contact" onClick={scrollTo('#contact')} className="hover:text-[#f5f5f3] transition-colors">
                  Contact & Assessment
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="mono-eyebrow text-xs text-[#f5f5f3] mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#solutions" onClick={scrollTo('#solutions')} className="hover:text-[#f5f5f3] transition-colors">
                  Application Security
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={scrollTo('#solutions')} className="hover:text-[#f5f5f3] transition-colors">
                  Network Security
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={scrollTo('#solutions')} className="hover:text-[#f5f5f3] transition-colors">
                  Cloud Security
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={scrollTo('#solutions')} className="hover:text-[#f5f5f3] transition-colors">
                  Offensive Red Team
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={scrollTo('#solutions')} className="hover:text-[#f5f5f3] transition-colors">
                  Code & AI Security
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={scrollTo('#solutions')} className="hover:text-[#f5f5f3] transition-colors">
                  Assurance Advisory
                </a>
              </li>
            </ul>
          </div>

          {/* Academy Column */}
          <div>
            <h4 className="mono-eyebrow text-xs text-[#f5f5f3] mb-4">Academy</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#academy" onClick={scrollTo('#academy')} className="hover:text-[#f5f5f3] transition-colors">
                  Hands-on Trainings
                </a>
              </li>
              <li>
                <a href="#academy" onClick={scrollTo('#academy')} className="hover:text-[#f5f5f3] transition-colors">
                  Practical Bootcamps
                </a>
              </li>
              <li>
                <a href="#contact" onClick={scrollTo('#contact')} className="hover:text-[#f5f5f3] transition-colors">
                  Corporate Batches
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Social Column */}
          <div>
            <h4 className="mono-eyebrow text-xs text-[#f5f5f3] mb-4">Connect & Legal</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm mb-6">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#3781FC] transition-colors group"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#8a8a86] group-hover:text-[#3781FC] transition-colors" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-2 text-xs">
              <a href="/.well-known/security.txt" className="block text-[#8a8a86] hover:text-[#f5f5f3] transition-colors">
                Responsible Disclosure
              </a>
              <span className="block text-[11px] text-[#8a8a86]">
                Privacy policy & consent verified
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a8a86]">
          <p>© {new Date().getFullYear()} BytesEncrypt Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>MANUAL_FIRST</span>
            <span>RETEST_INCLUDED</span>
            <span className="text-[#3781FC]">AA_A11Y_COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
