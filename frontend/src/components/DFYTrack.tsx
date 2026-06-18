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
      <span className="path-badge" style={{ background: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)', boxShadow: '0 0 12px rgba(107, 114, 128, 0.3)' }}>
        🚫 Currently Unavailable
      </span>
      
      {step === 'info' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', textAlign: 'left' }}>
          <div>
            <div className="path-header" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="path-tag" style={{ margin: 0, backgroundColor: 'var(--color-text-muted)' }}>Separate Partner Program</span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: 'var(--color-danger)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Inactive / Placeholder
                </span>
              </div>
              <h3 className="path-title" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Done-For-You Proxy Negotiation</h3>
              <p className="path-desc" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>
                Exposing processor markups is a **fundamental right** of every business—which is why our DIY tool is and will always remain **100% free and open**.
              </p>
            </div>

            {/* Warning / Informational Box indicating Personal Project & Unavailable Option B */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', backgroundColor: 'rgba(239, 68, 68, 0.03)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-danger)', margin: 0 }}>
                ⚠️ Personal Project & Liability Notice
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.45' }}>
                This is a <strong>personal, open-source portfolio project</strong>. The Done-For-You negotiation track, commercial pricing splits, percentage metrics simulation, and support waitlists are **not active or available at the moment**.
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.45' }}>
                All auditing and scripts must be run as a self-managed, DIY process. **All responsibility for using these tools, auditing invoices, or communicating with processors falls solely on you, the user.**
              </p>
            </div>

            {/* Locked Info Display */}
            <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Target Rate</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>{audit.target_effective_rate.toFixed(2)}%</strong>
              </div>
              <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Audited Savings</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-success)' }}>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(audit.annual_potential_savings)}/yr
                </strong>
              </div>
            </div>

            <button 
              className="btn btn-full" 
              style={{ backgroundColor: 'var(--border-color)', color: 'var(--color-text-muted)', cursor: 'not-allowed' }}
              disabled
            >
              Done-For-You Negotiation is Unavailable
            </button>
          </div>

          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '10px', lineHeight: '1.4', marginTop: '16px' }}>
            ⚠️ <strong>User Responsibility:</strong> Auditing and copy-pasting negotiation templates are at the user's sole risk. Verify your processor's rules before sharing statements.
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
