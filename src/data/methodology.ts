export interface MethodologyStep {
  step: string;
  title: string;
  badge: string;
  summary: string;
  bullets: string[];
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    step: '01',
    title: 'Scope & recon',
    badge: 'Phase 1 · Reconnaissance',
    summary: 'Define clear rules of engagement, identify public and internal boundaries, map digital assets, and establish testing depth.',
    bullets: [
      'Document authorized domains, API endpoints, IP blocks, and cloud accounts',
      'Passive OSINT and active external attack surface enumeration',
      'Map critical business workflows and high-value data repositories',
      'Establish test accounts, role tiers, and communication channels',
    ],
  },
  {
    step: '02',
    title: 'Assess & exploit',
    badge: 'Phase 2 · Active Testing',
    summary: 'Execute manual-first penetration testing backed by surgical scripts to uncover business logic vulnerabilities that scanners cannot see.',
    bullets: [
      'Chain complex logic flaws and privilege boundary breakdowns',
      'Simulate realistic adversary techniques without disrupting operations',
      'Test multi-tenant isolation, authorization boundaries, and API abuse',
      'Document reproducible proof-of-concept evidence in real-time',
    ],
  },
  {
    step: '03',
    title: 'Report findings',
    badge: 'Phase 3 · Analysis & Reporting',
    summary: 'Deliver clear, actionable reports written in plain language for engineers, complete with CVSS scoring and reproduction steps.',
    bullets: [
      'Every issue includes severity, exact affected asset, and real business impact',
      'Step-by-step reproduction walkthroughs with redacted HTTP traces / screenshots',
      'Specific, framework-appropriate code and configuration fix recommendations',
      'Executive summary highlighting risk posture for leadership and compliance teams',
    ],
  },
  {
    step: '04',
    title: 'Retest & verify',
    badge: 'Phase 4 · Remediation Retest',
    summary: 'Retest every reported finding once your engineering team applies the patch. We close items only when verified in production or staging.',
    bullets: [
      'Free retest included with every full security assessment',
      'Direct tester-to-engineer verification of code patches or configuration changes',
      'Updated final report with timestamped verified status markers',
      'Formal Letter of Attestation and completion certificate for auditors and clients',
    ],
  },
];
