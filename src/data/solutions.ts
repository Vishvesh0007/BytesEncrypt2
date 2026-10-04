export interface SolutionItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  scope: string[];
  deliverables: string[];
}

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'app-sec',
    number: '01',
    title: 'Application security',
    summary: 'Web application VAPT, REST/GraphQL API testing, mobile apps (iOS & Android), and multi-step business logic flaw discovery.',
    scope: [
      'OWASP Top 10 & API Security Top 10 deep verification',
      'Complex authorization bypasses & IDORs',
      'Session flaws, token abuse & race conditions',
      'Client-side execution & client storage vulnerabilities',
    ],
    deliverables: [
      'Detailed vulnerability report with PoC reproduction steps',
      'Root-cause analysis and prioritized developer fix guides',
      'One included retest with verified remediation certificate',
    ],
  },
  {
    id: 'network-sec',
    number: '02',
    title: 'Network security',
    summary: 'Internal perimeter, external surface VAPT, corporate Wi-Fi architectures, and network device configuration auditing.',
    scope: [
      'External asset discovery & misconfigured exposure points',
      'Internal pivot simulation & lateral movement analysis',
      'Active Directory / LDAP posture & privilege escalation paths',
      'Firewall rule review, VPN, routing and switch hygiene',
    ],
    deliverables: [
      'Network topology vulnerability map',
      'Clear remediation roadmap for infrastructure and sysadmin teams',
      'Validation of patched controls and re-scan certification',
    ],
  },
  {
    id: 'cloud-sec',
    number: '03',
    title: 'Cloud security',
    summary: 'In-depth posture and configuration reviews across AWS, Azure, and GCP environments targeting IAM, storage, and container boundaries.',
    scope: [
      'IAM privilege escalation & over-permissioned service roles',
      'Cloud storage bucket & database exposure verification',
      'Kubernetes cluster security & container breakout scenarios',
      'Serverless function security & secrets leakage analysis',
    ],
    deliverables: [
      'Multi-cloud configuration and architecture gap analysis',
      'Terraform / CloudFormation / console remediation snippets',
      'Post-fix validation testing',
    ],
  },
  {
    id: 'offensive-sec',
    number: '04',
    title: 'Offensive security',
    summary: 'Adversary simulation, scenario-based red teaming, targeted phishing campaigns, and physical / technical social engineering.',
    scope: [
      'Goal-oriented objective attacks against critical business jewels',
      'Spear phishing, credential harvesting & payload delivery testing',
      'Detection and response capability testing against SOC / MDR',
      'Defense evasion, persistence, and exfiltration mechanics',
    ],
    deliverables: [
      'Chronological attacker timeline with blue-team telemetry mapping',
      'Executive risk debrief & technical defensive recommendations',
      'Debrief workshop with internal engineering and security leads',
    ],
  },
  {
    id: 'code-sec',
    number: '05',
    title: 'Code security',
    summary: 'Manual and tool-assisted secure code review across source repositories to catch subtle architectural and logic flaws before release.',
    scope: [
      'High-risk cryptographic and authentication implementations',
      'Complex authorization logic that SAST scanners miss',
      'Data flow tracing from untrusted input to sinks',
      'Third-party dependency chain and pipeline supply chain risks',
    ],
    deliverables: [
      'Line-by-line source-code finding walkthroughs',
      'Defensive coding recommendations and unit test recommendations',
      'Retest of modified pull requests or release branches',
    ],
  },
  {
    id: 'ai-sec',
    number: '06',
    title: 'AI security',
    summary: 'Systematic testing of LLM applications, retrieval-augmented generation (RAG) pipelines, prompt injection vectors, and model guardrails.',
    scope: [
      'Direct and indirect prompt injection attacks',
      'RAG data poisoning and context window leakages',
      'Agentic tool invocation abuse & unauthorized function execution',
      'System prompt extraction and model evasion techniques',
    ],
    deliverables: [
      'LLM threat model & vulnerability reproduction catalogue',
      'Guardrail hardening and input/output sanitization blueprints',
      'Retest evaluation of prompt defense implementations',
    ],
  },
  {
    id: 'assurance-advisory',
    number: '07',
    title: 'Assurance and advisory',
    summary: 'Security architecture review, risk assessments, maturity benchmarking, and compliance readiness gaps.',
    scope: [
      'Attack surface reduction and defensive posture benchmarking',
      'Alignment reviews for ISO 27001, SOC 2, HIPAA, and RBI/CERT-In guidelines',
      'Vendor and third-party cyber risk evaluation',
      'Pragmatic 12-month security remediation roadmaps',
    ],
    deliverables: [
      'Executive board-ready risk posture presentation',
      'Actionable compliance gap matrix with mapped controls',
      'Quarterly advisory checkpoints',
    ],
  },
];
