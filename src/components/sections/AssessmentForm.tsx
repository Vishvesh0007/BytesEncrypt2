import React, { useState } from 'react';
import BorderGlow from '../ui/border-glow';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormState {
  fullName: string;
  organization: string;
  workEmail: string;
  phone: string;
  scopeTargets: string[];
  approxSize: string;
  complianceDriver: string;
  targetStartDate: string;
  additionalDetails: string;
  consent: boolean;
  honeypot: string;
}

const SCOPE_OPTIONS = [
  'Web application',
  'API',
  'Mobile application',
  'Network',
  'Cloud',
  'Code review',
  'Red team',
  'Social engineering',
  'Not sure',
];

export default function AssessmentForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    organization: '',
    workEmail: '',
    phone: '',
    scopeTargets: ['Web application'],
    approxSize: '',
    complianceDriver: '',
    targetStartDate: '',
    additionalDetails: '',
    consent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleScopeToggle = (option: string) => {
    setFormData((prev) => {
      const exists = prev.scopeTargets.includes(option);
      const newScope = exists
        ? prev.scopeTargets.filter((item) => item !== option)
        : [...prev.scopeTargets, option];
      return { ...prev, scopeTargets: newScope };
    });
    if (errors.scopeTargets) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.scopeTargets;
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!emailRegex.test(formData.workEmail)) {
      newErrors.workEmail = 'Please provide a valid email address';
    }

    if (formData.scopeTargets.length === 0) {
      newErrors.scopeTargets = 'Please select at least one area to scope';
    }

    if (!formData.consent) {
      newErrors.consent = 'Consent is required to submit your request';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot honeypot check
    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus('loading');

    // Simulate reliable secure submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative scroll-mt-20 border-t border-[rgba(255,255,255,0.06)]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-14 md:mb-16 max-w-2xl text-left">
          <div className="mono-eyebrow mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3781FC] shadow-[0_0_6px_rgba(55,129,252,0.8)]" />
            <span>07 — ASSESSMENT</span>
          </div>

          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-tight text-[#f5f5f3] mb-4"
          >
            Ready for your first checkup?
          </h2>

          <p className="text-base sm:text-lg text-[#a3a3a0] font-light leading-relaxed">
            Tell us what to scope. We'll come back with a plan and timeline, not a sales deck.
          </p>
        </div>

        {/* Assessment Form inside the single Border Glow card */}
        <div className="max-w-3xl mx-auto">
          <BorderGlow borderRadius="24px">
            <div className="p-8 sm:p-12">
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#1951FC]/15 border border-[#3781FC]/30 flex items-center justify-center text-[#3781FC]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-light text-[#f5f5f3]">
                    Request Received
                  </h3>
                  <p className="text-sm text-[#a3a3a0] max-w-md mx-auto leading-relaxed">
                    Thanks. Your request has been received. We'll review the scope and follow up with the next steps.
                  </p>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setFormData({
                          fullName: '',
                          organization: '',
                          workEmail: '',
                          phone: '',
                          scopeTargets: ['Web application'],
                          approxSize: '',
                          complianceDriver: '',
                          targetStartDate: '',
                          additionalDetails: '',
                          consent: false,
                          honeypot: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-mono text-[#3781FC] border border-[rgba(55,129,252,0.3)] hover:bg-[#111110] transition-colors"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Honeypot field (hidden from legitimate users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Primary Grid: Name, Org, Email, Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-mono text-[#a3a3a0] uppercase tracking-wider mb-2">
                        Full Name <span className="text-[#3781FC]">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Sarah Chen"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        className={`w-full px-4 py-3 rounded-xl bg-[#111110] border ${
                          errors.fullName ? 'border-[#ff6b5e]' : 'border-[rgba(255,255,255,0.12)]'
                        } text-[#f5f5f3] placeholder-[#8a8a86]/50 text-sm focus:outline-none focus:border-[#3781FC] transition-colors`}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="mt-1.5 text-xs text-[#ff6b5e] flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Organization */}
                    <div>
                      <label htmlFor="organization" className="block text-xs font-mono text-[#a3a3a0] uppercase tracking-wider mb-2">
                        Organization <span className="text-[#3781FC]">*</span>
                      </label>
                      <input
                        id="organization"
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Health Corp"
                        aria-invalid={Boolean(errors.organization)}
                        aria-describedby={errors.organization ? 'organization-error' : undefined}
                        className={`w-full px-4 py-3 rounded-xl bg-[#111110] border ${
                          errors.organization ? 'border-[#ff6b5e]' : 'border-[rgba(255,255,255,0.12)]'
                        } text-[#f5f5f3] placeholder-[#8a8a86]/50 text-sm focus:outline-none focus:border-[#3781FC] transition-colors`}
                      />
                      {errors.organization && (
                        <p id="organization-error" className="mt-1.5 text-xs text-[#ff6b5e] flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.organization}</span>
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label htmlFor="workEmail" className="block text-xs font-mono text-[#a3a3a0] uppercase tracking-wider mb-2">
                        Work Email <span className="text-[#3781FC]">*</span>
                      </label>
                      <input
                        id="workEmail"
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleInputChange}
                        placeholder="sarah@acmehealth.com"
                        aria-invalid={Boolean(errors.workEmail)}
                        aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
                        className={`w-full px-4 py-3 rounded-xl bg-[#111110] border ${
                          errors.workEmail ? 'border-[#ff6b5e]' : 'border-[rgba(255,255,255,0.12)]'
                        } text-[#f5f5f3] placeholder-[#8a8a86]/50 text-sm focus:outline-none focus:border-[#3781FC] transition-colors`}
                      />
                      {errors.workEmail && (
                        <p id="workEmail-error" className="mt-1.5 text-xs text-[#ff6b5e] flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.workEmail}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono text-[#a3a3a0] uppercase tracking-wider mb-2">
                        Phone <span className="text-[#8a8a86]">(Optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-[#111110] border border-[rgba(255,255,255,0.12)] text-[#f5f5f3] placeholder-[#8a8a86]/50 text-sm focus:outline-none focus:border-[#3781FC] transition-colors"
                      />
                    </div>
                  </div>

                  {/* What should we scope? (Checkboxes) */}
                  <div className="pt-2">
                    <fieldset>
                      <legend className="block text-xs font-mono text-[#a3a3a0] uppercase tracking-wider mb-3">
                        What should we scope? <span className="text-[#3781FC]">*</span>
                      </legend>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {SCOPE_OPTIONS.map((option) => {
                          const isChecked = formData.scopeTargets.includes(option);
                          return (
                            <label
                              key={option}
                              className={`flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-light border cursor-pointer select-none transition-all ${
                                isChecked
                                  ? 'bg-[#1a1a18] border-[#3781FC]/50 text-[#f5f5f3]'
                                  : 'bg-[#111110] border-[rgba(255,255,255,0.08)] text-[#a3a3a0] hover:border-[rgba(255,255,255,0.18)]'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleScopeToggle(option)}
                                className="sr-only"
                              />
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? 'bg-[#3781FC] border-[#3781FC] text-white shadow-[0_0_8px_rgba(55,129,252,0.4)]'
                                    : 'border-[rgba(255,255,255,0.2)] bg-transparent'
                                }`}
                              >
                                {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                              <span>{option}</span>
                            </label>
                          );
                        })}
                      </div>

                      {errors.scopeTargets && (
                        <p className="mt-2 text-xs text-[#ff6b5e] flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.scopeTargets}</span>
                        </p>
                      )}
                    </fieldset>
                  </div>

                  {/* Secondary Details: Size & Compliance Driver */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-2">
                    <div>
                      <label htmlFor="approxSize" className="block text-xs font-mono text-[#a3a3a0] uppercase tracking-wider mb-2">
                        Approximate Scope Size
                      </label>
                      <input
                        id="approxSize"
                        type="text"
                        name="approxSize"
                        value={formData.approxSize}
                        onChange={handleInputChange}
                        placeholder="e.g. 15 endpoints, 2 web apps"
                        className="w-full px-4 py-3 rounded-xl bg-[#111110] border border-[rgba(255,255,255,0.12)] text-[#f5f5f3] placeholder-[#8a8a86]/50 text-sm focus:outline-none focus:border-[#3781FC] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="complianceDriver" className="block text-xs font-mono text-[#a3a3a0] uppercase tracking-wider mb-2">
                        Compliance Driver / Timeline
                      </label>
                      <input
                        id="complianceDriver"
                        type="text"
                        name="complianceDriver"
                        value={formData.complianceDriver}
                        onChange={handleInputChange}
                        placeholder="e.g. SOC 2 Type II audit in Q3"
                        className="w-full px-4 py-3 rounded-xl bg-[#111110] border border-[rgba(255,255,255,0.12)] text-[#f5f5f3] placeholder-[#8a8a86]/50 text-sm focus:outline-none focus:border-[#3781FC] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="pt-2">
                    <label htmlFor="additionalDetails" className="block text-xs font-mono text-[#a3a3a0] uppercase tracking-wider mb-2">
                      Additional Context or Specific Concerns
                    </label>
                    <textarea
                      id="additionalDetails"
                      name="additionalDetails"
                      rows={3}
                      value={formData.additionalDetails}
                      onChange={handleInputChange}
                      placeholder="Special testing windows, staging credentials, third-party constraints..."
                      className="w-full px-4 py-3 rounded-xl bg-[#111110] border border-[rgba(255,255,255,0.12)] text-[#f5f5f3] placeholder-[#8a8a86]/50 text-sm focus:outline-none focus:border-[#3781FC] transition-colors resize-none"
                    />
                  </div>

                  {/* Plain Language Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, consent: e.target.checked }));
                          if (errors.consent) {
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.consent;
                              return next;
                            });
                          }
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center flex-shrink-0 transition-colors ${
                          formData.consent
                            ? 'bg-[#3781FC] border-[#3781FC] text-white shadow-[0_0_8px_rgba(55,129,252,0.4)]'
                            : errors.consent
                            ? 'border-[#ff6b5e] bg-transparent'
                            : 'border-[rgba(255,255,255,0.2)] bg-transparent'
                        }`}
                      >
                        {formData.consent && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs text-[#a3a3a0] font-light leading-relaxed">
                        I agree that BytesEncrypt may use these details to respond to my request.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 text-xs text-[#ff6b5e] flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 rounded-full text-sm font-medium bg-[#3781FC] text-white hover:bg-[#CBE9FD] hover:text-[#03195B] transition-all duration-200 shadow-[0_0_20px_rgba(25,81,252,0.35)] hover:shadow-[0_0_28px_rgba(55,129,252,0.45)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 group"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white group-hover:text-[#03195B]" />
                          <span>Submitting request...</span>
                        </>
                      ) : (
                        <span>Request an assessment</span>
                      )}
                    </button>
                  </div>

                  {/* Security reassurance */}
                  <div className="pt-2 text-center text-xs font-mono text-[#8a8a86]">
                    <span>DATA PROTECTED · NEVER SOLD OR TRANSFERRED</span>
                  </div>
                </form>
              )}
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
