import React from 'react';
import { BadgeAlert, Scale, X, Check } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Intro Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge-glow" style={{ marginBottom: '12px' }}>🧠 Merchant Services Demystified</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>How Credit Card Processors Overcharge You</h2>
        <p style={{ maxWidth: '650px', margin: '12px auto 0', fontSize: '1.05rem', color: 'var(--color-text-secondary)' }}>
          Merchant accounts are built on opacity. Here is the technical explanation of how processors hide markups, and how our AI exposes them.
        </p>
      </div>

      {/* Grid: Tiered vs Interchange-Plus */}
      <div className="path-split-container" style={{ marginBottom: '64px', gap: '32px' }}>
        {/* Card 1: Tiered pricing (The Trap) */}
        <div className="card" style={{ 
          padding: '36px',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(244, 63, 94, 0.01) 100%)',
          borderColor: 'rgba(244, 63, 94, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'left'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div className="trust-icon-box" style={{ margin: 0, backgroundColor: 'rgba(244, 63, 94, 0.08)', color: 'var(--color-danger)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                <BadgeAlert size={20} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>The Trap: Tiered Rate Pricing</h3>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '24px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
              Processors cluster hundreds of interchange base rates into three arbitrary pricing buckets, keeping the markup spreads for themselves:
            </p>
            
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: 0 }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(244, 63, 94, 0.12)', 
                  color: 'var(--color-danger)', 
                  flexShrink: 0, 
                  marginTop: '2px' 
                }}>
                  <X size={12} strokeWidth={3} />
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
                  <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '2px' }}>Qualified Rate (~1.6%)</strong>
                  Only applied to basic consumer debit cards swiped in-store. Less than 15% of your sales volume will ever clear this bucket.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(244, 63, 94, 0.12)', 
                  color: 'var(--color-danger)', 
                  flexShrink: 0, 
                  marginTop: '2px' 
                }}>
                  <X size={12} strokeWidth={3} />
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
                  <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '2px' }}>Mid-Qualified Surcharges (Adds 0.8% - 1.2%)</strong>
                  Charged on simple key-in invoices, reward cards, and phone transactions, raising costs without explanation.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(244, 63, 94, 0.12)', 
                  color: 'var(--color-danger)', 
                  flexShrink: 0, 
                  marginTop: '2px' 
                }}>
                  <X size={12} strokeWidth={3} />
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
                  <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '2px' }}>Non-Qualified Downgrades (Adds 1.5% - 2.5%)</strong>
                  Applies to rewards, corporate, business, online, and Amex cards. The processor pockets the massive spread above actual base costs.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Interchange-Plus (The Goal) */}
        <div className="card" style={{ 
          padding: '36px',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(16, 185, 129, 0.01) 100%)',
          borderColor: 'rgba(16, 185, 129, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'left'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div className="trust-icon-box" style={{ margin: 0, backgroundColor: 'rgba(16, 185, 129, 0.08)', color: 'var(--color-success)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <Scale size={20} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>The Goal: Interchange-Plus Scheduling</h3>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '24px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
              The transparent industry standard. You pay the exact wholesale costs set by the card networks (Visa, Mastercard), plus a negotiated flat markup:
            </p>
            
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: 0 }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(16, 185, 129, 0.12)', 
                  color: 'var(--color-success)', 
                  flexShrink: 0, 
                  marginTop: '2px' 
                }}>
                  <Check size={12} strokeWidth={3} />
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
                  <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '2px' }}>Interchange Wholesale Cost</strong>
                  Passed through directly at net brand cost (e.g. standard Visa Signature base card is 2.30% + $0.10, debit is 0.05% + $0.22).
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(16, 185, 129, 0.12)', 
                  color: 'var(--color-success)', 
                  flexShrink: 0, 
                  marginTop: '2px' 
                }}>
                  <Check size={12} strokeWidth={3} />
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
                  <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '2px' }}>Plus Markup</strong>
                  A fixed, transparent billing fee negotiated directly (e.g., + 0.20% and $0.10 per transaction). Zero margin inflation.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(16, 185, 129, 0.12)', 
                  color: 'var(--color-success)', 
                  flexShrink: 0, 
                  marginTop: '2px' 
                }}>
                  <Check size={12} strokeWidth={3} />
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
                  <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '2px' }}>Zero Surcharges</strong>
                  Processors are legally bound to wholesale margins and cannot downgrade transactions. Surcharge savings are permanent.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stepper: The Forensic Audit Loop */}
      <div className="card" style={{ padding: '48px 32px', marginBottom: '64px' }}>
        <h3 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '40px' }}>Our 5-Phase AI Forensic Audit Loop</h3>
        
        <div className="stepper-container">
          <div className="step-node">
            <div className="step-circle">1</div>
            <div className="step-info">
              <h4 className="step-title">Local Statement Uploading</h4>
              <p className="step-desc">
                Merchant statements are loaded locally inside your browser's private sandbox memory. The system verifies layout format and validates coordinates before processing.
              </p>
            </div>
          </div>

          <div className="step-node">
            <div className="step-circle">2</div>
            <div className="step-info">
              <h4 className="step-title">Browser Coordinate Mapping</h4>
              <p className="step-desc">
                Our client-side parser reads the binary coordinate tables of the statement to isolate processing volumes, swipes, interchange base rates, and charged line item rows.
              </p>
            </div>
          </div>

          <div className="step-node">
            <div className="step-circle">3</div>
            <div className="step-info">
              <h4 className="step-title">Local PII Redaction & Moderation</h4>
              <p className="step-desc">
                All PII (names, addresses, phone numbers, tax IDs, account numbers) are redacted locally on-device. The text is verified against content safety rules before routing.
              </p>
            </div>
          </div>

          <div className="step-node">
            <div className="step-circle">4</div>
            <div className="step-info">
              <h4 className="step-title">AI Rate Analysis & Cost Evaluation</h4>
              <p className="step-desc">
                The redacted transaction data is audited by the selected AI model to cross-reference card brand rates and isolate inflated markups, holding all results strictly in browser memory.
              </p>
            </div>
          </div>

          <div className="step-node">
            <div className="step-circle">5</div>
            <div className="step-info">
              <h4 className="step-title">Negotiation Kit Generation</h4>
              <p className="step-desc">
                A customized contract negotiation script is prepared for you to email directly to your processor, or you can optionally request Done-For-You proxy support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
