import React from 'react';
import type { Audit } from '../services/supabase';

interface DFYTrackProps {
  audit: Audit;
  businessName: string;
  onSuccess: () => void;
}

export const DFYTrack: React.FC<DFYTrackProps> = ({ audit, businessName: _businessName, onSuccess: _onSuccess }) => {
  return (
    <div className="card path-card dfy-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Top Banner Tag */}
      <span className="path-badge" style={{ background: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)', boxShadow: '0 0 12px rgba(107, 114, 128, 0.3)' }}>
        🚫 Currently Unavailable
      </span>
      
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
    </div>
  );
};
