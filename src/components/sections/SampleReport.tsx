import { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';

export default function SampleReport() {
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadInitiated(true);

    // Create a plain text illustrative sample report download
    const reportContent = `BYTESENCRYPT TECHNOLOGIES - SAMPLE VULNERABILITY ASSESSMENT REPORT (ILLUSTRATIVE)
================================================================================
CONFIDENTIALITY NOTICE: This document is an illustrative redacted template.
Standards: OWASP ASVS 4.0 / NIST SP 800-115 / CVSS v3.1

FINDING SUMMARY:
--------------------------------------------------------------------------------
Vulnerability:   Authentication Bypass via Flawed Token State Machine
Severity:        CRITICAL (CVSS: 9.1 - CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N)
Affected Asset:  https://app.example.com/api/account
Endpoint:        POST /api/v2/auth/session/exchange
Status:          VERIFIED - READY FOR RETEST

EXECUTIVE IMPACT:
--------------------------------------------------------------------------------
Unauthenticated remote attackers could forge secondary session exchange tokens
by omitting the nonce parameter during OAuth state rotation, resulting in complete
account takeover of arbitrary administrative accounts.

REPRODUCTION STEPS (POC):
--------------------------------------------------------------------------------
1. Initiate session token handshake via target endpoint.
2. [REDACTED EVIDENCE - PAYLOAD FORGING INCLUDED IN OFFICIAL AUDIT]
3. Intercept return JWT and observe administrative claims reflected without signature validation.

REMEDIATION GUIDANCE:
--------------------------------------------------------------------------------
- Enforce strict server-side state verification across token issuance endpoints.
- Reject session exchange payloads lacking cryptographic nonce matching the origin session.
- Retest required before status closure.

VERIFICATION ATTESTATION:
--------------------------------------------------------------------------------
BytesEncrypt Technologies includes a comprehensive retest with every assessment.
Retest scheduled and verified by offensive assurance team.
`;
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BytesEncrypt-Sample-Security-Report-Redacted.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadInitiated(false), 3000);
  };

  return (
    <section
      id="report"
      className="relative py-24 md:py-32 scroll-mt-10 bg-[#f4f4f2] text-[#111110] z-20"
      aria-labelledby="report-heading"
    >
      {/* Background paper texture/grid */}
      <div className="absolute inset-0 grid-bg-paper pointer-events-none opacity-40" aria-hidden="true" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-14 md:mb-16 max-w-2xl text-left">
          <div className="mono-eyebrow mb-3 flex items-center gap-2 text-[#5c5c58]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111110]" />
            <span className="text-[#111110] font-mono">05 — SAMPLE DELIVERABLE</span>
          </div>

          <h2
            id="report-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-tight text-[#111110] mb-4"
          >
            See what the deliverable looks like.
          </h2>

          <p className="text-base sm:text-lg text-[#5c5c58] font-light leading-relaxed">
            Engineers get reproduction proofs and code-level remediation steps. Leadership gets clear risk profiles and verification status.
          </p>
        </div>

        {/* Redacted Report Card */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-[rgba(17,17,16,0.12)] p-6 sm:p-10 shadow-xl shadow-black/5">
          {/* Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[rgba(17,17,16,0.08)]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#ff6b5e]/15 text-[#b92c1f] border border-[#ff6b5e]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b5e]" />
                CRITICAL · CVSS 9.1
              </span>
              <span className="font-mono text-xs text-[#5c5c58]">
                VULN-ID: #BE-2026-084
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#5c5c58]">
              <span className="w-2 h-2 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.8)]" />
              <span className="text-[#111110] font-medium">Ready for retest</span>
            </div>
          </div>

          {/* Finding Title */}
          <h3 className="text-xl sm:text-2xl font-light text-[#111110] tracking-tight mb-6">
            Authentication bypass via token state flaw (example)
          </h3>

          {/* Key-Value Breakdown with Redactions */}
          <div className="space-y-4 text-xs sm:text-sm font-mono border-t border-[rgba(17,17,16,0.06)] pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 py-1">
              <span className="text-[#5c5c58] uppercase tracking-wider">Affected asset</span>
              <span className="sm:col-span-3 text-[#111110] font-medium">/api/account/session/exchange</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 py-1 items-center">
              <span className="text-[#5c5c58] uppercase tracking-wider">Evidence</span>
              <div className="sm:col-span-3 flex items-center gap-2 text-[#5c5c58] select-none">
                <span className="tracking-widest bg-[#111110]/10 px-2 py-0.5 rounded text-xs">
                  ████████████████████████
                </span>
                <span className="text-[11px] text-[#5c5c58] italic font-sans">[Redacted PoC Payload]</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 py-1">
              <span className="text-[#5c5c58] uppercase tracking-wider">Impact</span>
              <span className="sm:col-span-3 text-[#111110]">
                Unauthorized lateral access to tenant account records without credential knowledge.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 py-1 items-center">
              <span className="text-[#5c5c58] uppercase tracking-wider">Remediation</span>
              <div className="sm:col-span-3 flex items-center gap-2 text-[#5c5c58] select-none">
                <span className="tracking-widest bg-[#111110]/10 px-2 py-0.5 rounded text-xs">
                  ████████████████████████
                </span>
                <span className="text-[11px] text-[#5c5c58] italic font-sans">[Cryptographic validation logic]</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 py-1">
              <span className="text-[#5c5c58] uppercase tracking-wider">Retest status</span>
              <div className="sm:col-span-3 flex items-center gap-2 text-[#03195B]">
                <CheckCircle className="w-4 h-4 text-[#3781FC]" />
                <span className="font-sans font-medium text-xs sm:text-sm text-[#111110]">
                  Patch verified in staging by BytesEncrypt lead tester
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-10 pt-6 border-t border-[rgba(17,17,16,0.1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#111110] text-[#f4f4f2] hover:bg-[#1a1a18] transition-all duration-200 active:scale-98 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#3781FC]" />
              <span>{downloadInitiated ? 'Report downloaded' : 'Download sample report'}</span>
            </button>

            <span className="font-mono text-[11px] text-[#5c5c58]">
              FORMAT: EXECUTIVE_PDF · TECHNICAL_TRACE
            </span>
          </div>
        </div>

        {/* Truthfulness Disclaimer */}
        <p className="mt-6 text-center text-xs font-mono text-[#5c5c58]">
          Illustrative example with redacted details. Not a real client finding.
        </p>
      </div>
    </section>
  );
}
