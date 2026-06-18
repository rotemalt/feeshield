import React, { useState } from 'react';
import { Lock, CheckCircle2, Mail, Globe } from 'lucide-react';

export const PricingSecurity: React.FC = () => {
  const [mockSavings, setMockSavings] = useState<number>(350);

  // Calculations (35% monthly contingency for 12 months, min $20/mo, capped at $1,000/yr)
  const annualSavings = mockSavings * 12;
  
  let ourSplitMonthly = Math.max(20, mockSavings * 0.35);
  let ourSplitAnnual = ourSplitMonthly * 12;
  if (ourSplitAnnual > 1000) {
    ourSplitAnnual = 1000;
    ourSplitMonthly = 1000 / 12;
  }
  
  const clientNetAnnual = Math.max(0, annualSavings - ourSplitAnnual);
  const clientNetMonthly = clientNetAnnual / 12;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge-glow" style={{ marginBottom: '12px' }}>🔒 Trusted B2B Security Framework</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>100% Free DIY Auditing & Bank-Grade Security</h2>
        <p style={{ maxWidth: '650px', margin: '12px auto 0', fontSize: '1.05rem', color: 'var(--color-text-secondary)' }}>
          Auditing your invoice is your fundamental business right. The FeeShield DIY kit runs fully client-side and is completely free.
        </p>
      </div>

      {/* Grid Layout: Pricing Slider on left, Security on right */}
      <div className="calculator-grid" style={{ marginBottom: '64px' }}>
        {/* Left Side: Pricing Simulator */}
        <div className="card" style={{ padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              <span className="badge-glow" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success-border)', backgroundColor: 'var(--color-success-bg)' }}>
                % Contingency Simulator
              </span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                color: 'var(--color-primary-hover)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                padding: '2px 8px',
                borderRadius: '10px',
                textTransform: 'uppercase'
              }}>
                Optional Partner Program
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              FeeShield's DIY Audit Tool is <strong>100% Free</strong>. The slider below simulates standard pricing for our optional <em>Done-For-You (DFY) Partner Program</em>, where partners handle negotiations on your behalf for a 35% monthly savings split (min $20/mo, capped at $1,000/yr). Currently, all partner fees are fully waived ($0) for our first 1,000 pilot waitlist members.
            </p>

            <div className="calculator-slider-group" style={{ marginBottom: '32px' }}>
              <div className="slider-header">
                <span className="form-label">Simulated Monthly Savings</span>
                <span className="slider-value-bubble">{formatCurrency(mockSavings)}/mo</span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="50"
                className="calculator-range-input"
                value={mockSavings}
                onChange={(e) => setMockSavings(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                <span>$50/mo</span>
                <span>$1,250/mo</span>
                <span>$2,500/mo</span>
              </div>
            </div>

            <div className="calculator-bill-box" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <div className="calc-line">
                <span>Partner Program Share (35% split, capped at $1,000):</span>
                <span style={{ fontWeight: 600, color: 'var(--color-primary-hover)' }}>{formatCurrency(ourSplitMonthly)}/mo</span>
              </div>
              <div className="calc-line">
                <span>Your Retained Cash (you keep the rest):</span>
                <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{formatCurrency(clientNetMonthly)}/mo</span>
              </div>
              <div className="calc-line total" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '10px' }}>
                <span>Your Net Annual Recovery:</span>
                <span className="calc-line savings" style={{ fontSize: '1.4rem' }}>{formatCurrency(clientNetAnnual)}/yr</span>
              </div>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '20px', lineHeight: '1.45', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
              ⚠️ <strong>Liability Disclaimer:</strong> FeeShield is a rate auditing utility. Any contract adjustments, fee amendments, or processor relationship outcomes are the sole responsibility of the customer. FeeShield holds no liability.
            </div>
          </div>
        </div>

        {/* Right Side: Security Specifications */}
        <div className="card" style={{ padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div className="trust-icon-box" style={{ margin: 0, backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-primary-hover)', width: '36px', height: '36px' }}>
                <Lock size={16} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Data & HIPAA Compliance</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Zero-Storage Client-Side Parsing</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    Uploaded invoice files are parsed directly in your browser using local Web Workers. We never save statement files, and all variables exist strictly in temporary memory.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Local PII Masking & Redaction</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    Addresses, contact details, account numbers, tax IDs (EIN/SSN), and cardholder information are redacted locally before any text is sent to your selected AI engine.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>100% HIPAA & PCI-DSS Scoping</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    Medical and B2B invoices are scanned only for processing rates and fee structures. Consumer credit card numbers and sensitive clinical data are never processed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Stepper: Transparent Proxy Loop */}
      <div className="card" style={{ padding: '36px', textAlign: 'left', marginBottom: '64px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
          <div className="trust-icon-box" style={{ margin: 0, backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-primary-hover)' }}>
            <Mail size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem' }}>Done-For-You Partner Program Guardrails (Optional)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Rules our partner underwriting proxies operate under if you opt-in to negotiations.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>1. Transparent Subdomain Forwarder</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
              We instruct business owners to set up a subdomain redirect, such as <code style={{ fontSize: '0.8rem' }}>billing-assistant@company.com</code>. 
              All vendor correspondence goes through this mailbox, preserving a transparent, client-hosted audit trail of all correspondence.
            </p>
          </div>

          <div style={{ paddingLeft: '8px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>2. Human-in-the-Loop Consent & LPOA</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
              Partners use a Limited Power of Attorney (LPOA) solely to request rate summaries. They hold zero authority to sign rate adjustment contracts or make changes independently without your final signature approval.
            </p>
          </div>
        </div>
      </div>

      {/* Global Data Security, Compliance & Privacy Shield */}
      <div className="card" style={{ padding: '36px', textAlign: 'left', marginBottom: '64px', background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(139, 92, 246, 0.02) 100%)', borderColor: 'var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
          <div className="trust-icon-box" style={{ margin: 0, backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-primary-hover)' }}>
            <Globe size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem' }}>Global Security, Privacy & Compliance Shield</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Ensuring complete compliance with international data handling guidelines.</p>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
          Project FeeShield operates under a strict security framework designed to protect B2B financial details and comply with global privacy frameworks (including GDPR, CCPA, HIPAA, and PCI-DSS).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>GDPR & CCPA Compliance</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
              We enforce strict data minimization. We only collect the minimal B2B metadata necessary to parse invoices and calculate rate differences. You hold the absolute right to erasure—statement files are parsed in isolated server memory and purged immediately, and you can delete your audit records from localStorage/database at any time.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>HIPAA Safe Harbor Protection</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
              For medical, veterinary, and dental practices, we strictly limit our scanning to processing fee summaries. Individual patient records, health charts, and treatment codes are never read, stored, or processed, ensuring full HIPAA alignment out-of-the-box.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>PCI-DSS Scope Limitation</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
              FeeShield does not store or process consumer cardholder details. We parse only aggregated statement volumes and fee schedules. Because consumer credit card numbers (PANs) are never processed or held, your primary merchant processing accounts remain 100% secure.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Bank-Grade Encryption Standards</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
              All client data in transit is protected using SSL/TLS 1.3 encryption protocols, preventing intercept risk. In-storage database records and files are locked behind AES-256 standard encryption, with strict row-level security controls in place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
