export interface NavLink {
  label: string;
  href: string;
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  ctaText?: string;
}

export const NAV_LINKS: NavLink[] = [
  {
    label: 'About',
    href: '#about',
    badge: 'Why Us',
    eyebrow: '01 · ABOUT BYTESENCRYPT',
    title: 'Clarity & Engineering Rigor',
    description: 'Manual-first security testing engineered to eliminate scanner noise and uncover deep exploit chains.',
    highlights: ['Manual-first testing', 'Zero false positives', 'Free retest included', 'Clear remediation proof'],
    ctaText: 'About our firm',
  },
  {
    label: 'Attack surface',
    href: '#attack-surface',
    badge: 'Recon',
    eyebrow: '02 · PERIMETER EXPOSURE',
    title: 'External Attack Surface',
    description: 'Continuous reconnaissance tracking subdomains, cloud assets, exposed buckets, and credential leaks.',
    highlights: ['Subdomain discovery', 'Exposed cloud storage', 'Credential leak detection', 'Live telemetry monitoring'],
    ctaText: 'Explore attack surface',
  },
  {
    label: 'Solutions',
    href: '#solutions',
    badge: 'Services',
    eyebrow: '03 · OFFENSIVE ASSESSMENT',
    title: 'Security Solutions',
    description: 'Deep-dive penetration testing across web applications, APIs, cloud environments, and internal networks.',
    highlights: ['Web App & API VAPT', 'Cloud Security (AWS/GCP)', 'Network Penetration', 'Mobile App Security'],
    ctaText: 'Browse solutions',
  },
  {
    label: 'Approach',
    href: '#approach',
    badge: 'Methodology',
    eyebrow: '04 · 4-PHASE FRAMEWORK',
    title: 'Testing Methodology',
    description: 'Structured methodology aligned with OWASP ASVS and PTES to simulate sophisticated adversary behavior.',
    highlights: ['01 Recon & Mapping', '02 Threat Weaponization', '03 Business Logic Abuse', '04 Verified Fix Validation'],
    ctaText: 'Review methodology',
  },
  {
    label: 'Report',
    href: '#report',
    badge: 'Deliverable',
    eyebrow: '05 · ACTIONABLE FINDINGS',
    title: 'Sample Security Report',
    description: 'Transparent, developer-friendly reports with reproducible proof-of-concept exploits and copy-paste remediation.',
    highlights: ['Executive risk scoring', 'Copy-paste code fixes', 'Step-by-step POC reproduction', 'Engineer-to-engineer notes'],
    ctaText: 'Inspect sample report',
  },
  {
    label: 'Academy',
    href: '#academy',
    badge: 'Training',
    eyebrow: '06 · ADVERSARY SIMULATION',
    title: 'BytesEncrypt Academy',
    description: 'Hands-on offensive security labs and adversary simulation workshops built for modern engineering teams.',
    highlights: ['Interactive exploit labs', 'Secure coding workshops', 'DevSecOps integration', 'Real-world CVE analysis'],
    ctaText: 'Explore curriculum',
  },
];

export const PRIMARY_CTA = {
  label: 'Request assessment',
  href: '#contact',
};
