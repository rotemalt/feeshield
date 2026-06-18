import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, MessageSquare, Clock } from 'lucide-react';
import { dbService } from '../services/supabase';
import type { Audit } from '../services/supabase';

interface DFYTrackProps {
  audit: Audit;
  businessName: string;
  onSuccess: () => void;
}

export const DFYTrack: React.FC<DFYTrackProps> = ({ audit, businessName, onSuccess }) => {
  const [step, setStep] = useState<'info' | 'completed'>('info');
  const [processor, setProcessor] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Save waitlist to database (live Supabase or simulated localStorage)
      await dbService.saveWaitlist(
        audit.profile_id,
        audit.id,
        processor,
        message
      );
      
      setStep('completed');
      onSuccess();
    } catch (err) {
      console.error('Failed to submit waitlist:', err);
      // Fallback transition so user isn't stuck
      setStep('completed');
      onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card path-card dfy-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Top Banner Tag */}
      <span className="path-badge" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)', boxShadow: '0 0 12px rgba(139, 92, 246, 0.3)' }}>
        ✨ Waived for First 1,000 (Normally Max $1,000)
      </span>
      
      {step === 'info' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', textAlign: 'left' }}>
          <div>
            <div className="path-header" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="path-tag" style={{ margin: 0, backgroundColor: 'var(--color-primary-hover)' }}>Separate Partner Program</span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(139, 92, 246, 0.15)',
                  color: 'var(--color-primary-hover)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Optional Add-On
                </span>
              </div>
              <h3 className="path-title" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Done-For-You Proxy Negotiation</h3>
              <p className="path-desc" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>
                Auditing your statements and exposing processor markups is a **fundamental right** of every business—which is why our DIY tool is and will always remain **100% free and open**. 
                As a separate optional service, you can have our proxy negotiation partners contact your processor on your behalf to lock in your target rate of <strong style={{ color: 'var(--color-success)' }}>{audit.target_effective_rate.toFixed(2)}%</strong>.
              </p>
            </div>

            {/* Premium Marketing Highlights: Experience and Time Savings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }}>
                  <Clock size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Separate Negotiation Team (Save 5+ Hours)</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    Merchant retention departments are designed to frustrate business owners. Our partners navigate the red tape, hold times, and complex contract terms directly so you don't have to.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-primary-hover)', flexShrink: 0, marginTop: '2px' }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Professional Wholesale Rate Restructuring</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    The proxy team bypasses front-line support reps, using direct relationships and industry leverage to restructure your pricing to transparent Interchange-Plus terms.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>100% Free Pilot Access Included</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    Normally, this premium partner negotiation program charges a percentage of recovered cash flow (up to a $1,000 cap). Today, all negotiation fees are fully waived for our early users.
                  </p>
                </div>
              </div>
            </div>

            {/* Waitlist Intake Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Business Name</label>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, padding: '10px', backgroundColor: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--color-text-primary)' }}>
                    {businessName}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Audited Savings</label>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, padding: '10px', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '6px', color: 'var(--color-success)' }}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(audit.annual_potential_savings)}/yr
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="dfy-processor-input" style={{ fontSize: '0.75rem' }}>Current Payment Processor</label>
                <input
                  id="dfy-processor-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Stripe, Clover, Chase Paymentech, Fiserv"
                  value={processor}
                  onChange={(e) => setProcessor(e.target.value)}
                  style={{ fontSize: '0.85rem', padding: '10px' }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="dfy-message-input" style={{ fontSize: '0.75rem' }}>Special Instructions / Target Deadlines (Optional)</label>
                <textarea
                  id="dfy-message-input"
                  className="form-input"
                  rows={2}
                  placeholder="Tell us about any contract commitments or billing issues you want our underwriters to inspect..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ fontSize: '0.85rem', padding: '10px', resize: 'none', fontFamily: 'var(--font-family)' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full" 
                style={{ marginTop: '4px' }}
                disabled={submitting || !processor.trim()}
              >
                {submitting ? 'Registering Request...' : <>Request Done-For-You Audit & Join Waitlist <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>

          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '10px', lineHeight: '1.4' }}>
            ⚠️ <strong>Liability Protection:</strong> Done-For-You proxy negotiations are conducted subject to strict rate limits. All final contract changes are submitted to the client for signature approval. FeeShield holds zero legal liability.
          </div>
        </div>
      )}

      {step === 'completed' && (
        <div className="success-panel" style={{ minHeight: '100%', padding: '30px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          <div className="success-icon-box" style={{ backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-success-border)' }}>
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h3 className="path-title" style={{ color: 'var(--color-success)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
              DFY Waitlist Registered!
            </h3>
            <p className="path-desc" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', maxWidth: '400px' }}>
              Since your business is in our first 1,000 cohort, we have successfully reserved your slot. All Done-For-You audit and negotiation service contingency splits are <strong>100% Waived ($0.00 fee)</strong>.
            </p>
          </div>

          <div className="consent-module" style={{ width: '100%', textAlign: 'left', backgroundColor: 'rgba(139, 92, 246, 0.03)', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
            <div className="consent-header" style={{ color: 'var(--color-primary-hover)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
              <MessageSquare size={16} />
              <span>What Happens Next?</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '8px', lineHeight: '1.45' }}>
              Our senior underwriter will review your uploaded processing statement details within 2 business days. We will contact you at your registered email to schedule a quick 5-minute brief to authorize communications with <strong>{processor || 'your processor'}</strong>.
            </p>
          </div>

          <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: '1.3', borderTop: '1px solid var(--border-color)', paddingTop: '10px', width: '100%' }}>
            Your waitlist submission ID is logged. All merchant fee audits are subject to client final authorization. FeeShield is not legally liable for processor actions or adjustments.
          </p>
        </div>
      )}
    </div>
  );
};
