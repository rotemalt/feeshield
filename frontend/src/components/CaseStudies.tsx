import React, { useState } from 'react';
import { Dumbbell, Stethoscope, ShoppingBag } from 'lucide-react';

interface CaseStudy {
  id: string;
  name: string;
  industry: string;
  volume: string;
  leakage: string;
  saved: string;
  icon: React.ReactNode;
  summary: string;
  issue: string;
  resolution: string;
}

export const CaseStudies: React.FC = () => {
  const [activeCase, setActiveCase] = useState<string>('gym');

  const cases: CaseStudy[] = [
    {
      id: 'gym',
      name: 'Apex CrossFit Gym',
      industry: 'Fitness & Health Club',
      volume: '$34,600/mo',
      leakage: '$363.30/mo',
      saved: '$4,359.60/yr',
      icon: <Dumbbell size={24} />,
      summary: 'A local gym processing recurring membership subscriptions on a classic tiered merchant contract.',
      issue: 'The processor billed a monthly $49.00 PCI Non-Compliance Penalty (falsely claiming the account was unverified), a $15.00 Online Portal Fee, and downgraded standard Visa/Mastercard reward card transactions into Mid-Qualified surcharges.',
      resolution: 'FeeShield audited the statement, identifying $363.30 in monthly markup waste. The owner copied our DIY script, emailed it to their processor, and within 3 days the processor waived the compliance penalties and adjusted their markup down to Interchange + 0.20%, recovering 100% of the leakage.'
    },
    {
      id: 'dental',
      name: 'Oakwood Family Dentistry',
      industry: 'Healthcare & Medical Clinic',
      volume: '$118,200/mo',
      leakage: '$1,418.40/mo',
      saved: '$17,020.80/yr',
      icon: <Stethoscope size={24} />,
      summary: 'A multi-doctor dental practice receiving insurance copays and key-in credit card transactions.',
      issue: 'Because card numbers were keyed in over the phone for patient insurance payouts, the processor systematically downgraded these to "Non-Qualified" downgrades, billing a high 3.6% flat rate instead of standard card-not-present base rates.',
      resolution: 'The practice activated our Done-For-You (DFY) service. We established a transparent subdomain assistant and negotiated their account structure to an Interchange-Plus schedule with card-not-present key-ins locked at base + 0.15%, saving $1,418.40 monthly on a risk-free split.'
    },
    {
      id: 'retail',
      name: 'Horizon Retail Store',
      industry: 'eCommerce & Boutique Retailer',
      volume: '$485,000/mo',
      leakage: '$6,547.50/mo',
      saved: '$78,570.00/yr',
      icon: <ShoppingBag size={24} />,
      summary: 'A high-volume retail store processing both physical point-of-sale swipes and online cart checkouts.',
      issue: 'The processor marked up transactions by adding batch header surcharges, transaction statement access fees, and siphoning percentages on standard credit rewards cards, pushing their overall effective rate to 3.4%.',
      resolution: 'FeeShield\'s audit highlighted $6,547.50 in monthly rate creep. Our underwriting team took over, negotiated their overall markup down to base + 0.08%, bringing their effective rate down to 2.05% and saving the store $78,570.00 annually.'
    }
  ];

  const currentCase = cases.find((c) => c.id === activeCase) || cases[0];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="badge-glow" style={{ marginBottom: '12px' }}>📊 Verified B2B Outcomes</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>Real Savings from Real Businesses</h2>
        <p style={{ maxWidth: '650px', margin: '12px auto 0', fontSize: '1.05rem', color: 'var(--color-text-secondary)' }}>
          See exactly how small businesses used FeeShield to isolate merchant overcharges and slash their monthly processor bills.
        </p>
      </div>

      {/* Selector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCase(c.id)}
            style={{
              background: activeCase === c.id ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)' : 'var(--bg-surface)',
              border: activeCase === c.id ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: activeCase === c.id ? 'var(--color-primary-glow)' : 'rgba(255, 255, 255, 0.03)',
                color: activeCase === c.id ? 'var(--color-primary-hover)' : 'var(--color-text-secondary)',
                flexShrink: 0
              }}
            >
              {c.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{c.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{c.industry}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Case Layout */}
      <div className="card" style={{ padding: '36px', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '32px', textAlign: 'left', minHeight: '380px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary-hover)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Forensic Case Summary</span>
            <h3 style={{ fontSize: '1.6rem', marginTop: '4px' }}>{currentCase.name}</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>{currentCase.summary}</p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-danger)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              ⚠️ Billing Anomaly Detected
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>{currentCase.issue}</p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-success)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              🛡️ Resolution & Adjustment terms
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>{currentCase.resolution}</p>
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ background: 'rgba(0,0,0,0.15)', borderColor: 'var(--border-color)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="badge-glow" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success-border)', backgroundColor: 'var(--color-success-bg)' }}>
                ⭐ Savings Locked In
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Monthly Sales Volume:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{currentCase.volume}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Wasted Fee Leakage:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>{currentCase.leakage}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Annual Profit Recovery:</span>
                <span style={{ fontWeight: 800, color: 'var(--color-success)', fontSize: '1.2rem' }}>{currentCase.saved}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <div className="badge-glow" style={{ fontSize: '0.75rem', width: '100%', display: 'flex', gap: '6px', justifyContent: 'center' }}>
              🛡️ Audit Verified by FeeShield Underwriting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
