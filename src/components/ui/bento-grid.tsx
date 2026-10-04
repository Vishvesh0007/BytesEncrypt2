import GlowingEffect from './glowing-effect';

interface AttackTile {
  title: string;
  scopeCaption: string;
  scopeList: string;
  description: string;
  metric: string;
  tag: string;
  diagram: React.ReactNode;
}

const TILES: AttackTile[] = [
  {
    title: 'Application',
    scopeCaption: 'Application → Web · API · Mobile',
    scopeList: 'Web · API · Mobile',
    metric: '99.8% COVERAGE',
    tag: '▲ APP_SEC',
    description: 'Deep manual assessment of web portals, microservices, REST/GraphQL endpoints, iOS/Android apps, and multi-step business logic.',
    diagram: (
      <svg className="w-full h-24 stroke-[rgba(255,255,255,0.25)] fill-none" viewBox="0 0 240 80" aria-hidden="true">
        <circle cx="30" cy="40" r="14" stroke="#3781FC" strokeWidth="1.5" className="fill-[#081330]" />
        <circle cx="30" cy="40" r="4" fill="#3781FC" className="drop-shadow-[0_0_6px_#3781FC]" />
        <line x1="44" y1="40" x2="90" y2="24" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="44" y1="40" x2="90" y2="56" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="104" cy="24" r="10" strokeWidth="1.2" className="fill-[#060e24]" />
        <circle cx="104" cy="56" r="10" strokeWidth="1.2" className="fill-[#060e24]" />
        <line x1="114" y1="24" x2="160" y2="40" strokeWidth="1" />
        <line x1="114" y1="56" x2="160" y2="40" strokeWidth="1" />
        <circle cx="174" cy="40" r="12" stroke="#3781FC" strokeWidth="1.5" className="fill-[#081330]" />
        <circle cx="174" cy="40" r="3.5" fill="#CBE9FD" className="drop-shadow-[0_0_8px_#CBE9FD]" />
        <line x1="186" y1="40" x2="220" y2="40" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="226" cy="40" r="5" strokeWidth="1" className="fill-[#060e24]" />
      </svg>
    ),
  },
  {
    title: 'Network',
    scopeCaption: 'Network → Infra · Wi-Fi · Edge',
    scopeList: 'Infra · Wi-Fi · Edge',
    metric: 'L2–L7 AUDITED',
    tag: '▲ INFRA_EDGE',
    description: 'Internal and external perimeter validation, firewall policy reviews, segmented Wi-Fi defenses, and switch/router privilege isolation.',
    diagram: (
      <svg className="w-full h-24 stroke-[rgba(255,255,255,0.25)] fill-none" viewBox="0 0 240 80" aria-hidden="true">
        <rect x="20" y="24" width="40" height="32" rx="6" strokeWidth="1.2" className="fill-[#060e24]" />
        <line x1="60" y1="40" x2="100" y2="40" strokeWidth="1.2" />
        <circle cx="114" cy="40" r="14" stroke="#3781FC" strokeWidth="1.5" className="fill-[#081330]" />
        <circle cx="114" cy="40" r="4" fill="#3781FC" className="drop-shadow-[0_0_6px_#3781FC]" />
        <line x1="128" y1="40" x2="168" y2="24" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="128" y1="40" x2="168" y2="56" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="180" cy="24" r="8" strokeWidth="1" className="fill-[#060e24]" />
        <circle cx="180" cy="56" r="8" strokeWidth="1" className="fill-[#060e24]" />
        <circle cx="218" cy="40" r="6" stroke="#3781FC" strokeWidth="1.2" className="fill-[#081330]" />
      </svg>
    ),
  },
  {
    title: 'Cloud',
    scopeCaption: 'Cloud → AWS · Azure · GCP',
    scopeList: 'AWS · Azure · GCP',
    metric: 'IAM_ESCALATION',
    tag: '▼ TENANT_ISO',
    description: 'Multi-cloud tenant auditing, IAM privilege escalation chains, storage bucket exposure, and Kubernetes cluster isolation boundaries.',
    diagram: (
      <svg className="w-full h-24 stroke-[rgba(255,255,255,0.25)] fill-none" viewBox="0 0 240 80" aria-hidden="true">
        <ellipse cx="60" cy="40" rx="34" ry="20" strokeWidth="1.2" className="fill-[#060e24]" />
        <circle cx="50" cy="38" r="4" fill="#CBE9FD" className="drop-shadow-[0_0_8px_#CBE9FD]" />
        <line x1="94" y1="40" x2="140" y2="40" strokeWidth="1" strokeDasharray="2 3" />
        <rect x="140" y="26" width="30" height="28" rx="4" stroke="#3781FC" strokeWidth="1.2" className="fill-[#081330]" />
        <line x1="170" y1="40" x2="204" y2="40" strokeWidth="1" />
        <circle cx="216" cy="40" r="10" strokeWidth="1.2" className="fill-[#060e24]" />
        <circle cx="216" cy="40" r="3.5" fill="#1951FC" className="drop-shadow-[0_0_6px_#1951FC]" />
      </svg>
    ),
  },
  {
    title: 'People',
    scopeCaption: 'People → Phishing · Social engineering',
    scopeList: 'Phishing · Social engineering',
    metric: 'HUMAN_VECTOR',
    tag: '▲ PRETEXT_OPS',
    description: 'Targeted spear-phishing campaigns, credential harvesting pretexts, and technical social engineering testing human defense vectors.',
    diagram: (
      <svg className="w-full h-24 stroke-[rgba(255,255,255,0.25)] fill-none" viewBox="0 0 240 80" aria-hidden="true">
        <circle cx="40" cy="32" r="10" strokeWidth="1.2" className="fill-[#060e24]" />
        <path d="M26 56c0-7 6-12 14-12s14 5 14 12" strokeWidth="1.2" />
        <line x1="68" y1="40" x2="110" y2="40" stroke="#3781FC" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="124" cy="40" r="12" stroke="#3781FC" strokeWidth="1.5" className="fill-[#081330]" />
        <path d="M118 40l4 4 8-8" stroke="#CBE9FD" strokeWidth="1.5" strokeLinecap="round" className="drop-shadow-[0_0_6px_#CBE9FD]" />
        <line x1="136" y1="40" x2="184" y2="40" strokeWidth="1" />
        <circle cx="198" cy="32" r="8" strokeWidth="1" className="fill-[#060e24]" />
        <path d="M186 54c0-5 5-9 12-9s12 4 12 9" strokeWidth="1" />
      </svg>
    ),
  },
];

export default function BentoGrid() {
  return (
    <div className="relative">
      {/* 
        Central Crossroads Light Flare
        Matches the glowing + intersection between the 4 tiles from the reference image 
      */}
      <div
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Soft diffused neon cobalt bloom */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(55,129,252,0.5)_0%,rgba(25,81,252,0.2)_40%,transparent_70%)] blur-2xl" />
        {/* Center glowing flare core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#CBE9FD] opacity-60 blur-xl" />
        {/* Horizontal light beam along the gutter */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[2px] bg-gradient-to-r from-transparent via-[#CBE9FD]/70 to-transparent blur-[1px]" />
        {/* Vertical light beam along the gutter */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[2px] bg-gradient-to-b from-transparent via-[#CBE9FD]/70 to-transparent blur-[1px]" />
      </div>

      {/* 2x2 Grid of Luminous Glowing Squircles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
        {TILES.map((tile) => (
          <div
            key={tile.title}
            className="glow-tile-surface p-7 sm:p-9 group flex flex-col justify-between"
          >
            <GlowingEffect glowColor="rgba(55, 129, 252, 0.28)" spread={280} />

            {/* Micro-typography Top Metadata Bar (derived from the financial/terminal badges in the reference image) */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-[#8a8a86] mb-5">
              <span className="text-[#CBE9FD]/80 bg-[#1951FC]/15 px-2 py-0.5 rounded border border-[#3781FC]/30">
                {tile.metric}
              </span>
              <span className="text-[#3781FC] font-medium flex items-center gap-1">
                {tile.tag}
              </span>
            </div>

            {/* Top Diagram & Title */}
            <div>
              <div className="mb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                {tile.diagram}
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-xl sm:text-2xl font-light text-[#f5f5f3] tracking-tight group-hover:text-white transition-colors">
                  {tile.title}
                </h3>
              </div>

              {/* Caption with arrow */}
              <a
                href="#solutions"
                className="inline-flex items-center gap-1.5 mono-caption text-[11px] sm:text-xs text-[#a3a3a0] hover:text-[#3781FC] group/caption mb-4 transition-colors"
              >
                <span className="underline decoration-[rgba(55,129,252,0.3)] group-hover/caption:decoration-[#3781FC] underline-offset-4">
                  {tile.scopeCaption}
                </span>
              </a>

              <p className="text-[#a3a3a0] text-sm sm:text-[15px] font-light leading-relaxed group-hover:text-[#c4c4c0] transition-colors">
                {tile.description}
              </p>
            </div>

            {/* Bottom divider and verified badge */}
            <div className="mt-8 pt-4 border-t border-[rgba(55,129,252,0.15)] flex items-center justify-between text-[11px] font-mono text-[#8a8a86]">
              <span>MANUAL_FIRST_ENGAGEMENT</span>
              <span className="text-[#3781FC] flex items-center gap-1.5 font-mono drop-shadow-[0_0_8px_rgba(55,129,252,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,1)] animate-pulse" />
                VERIFIED
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
