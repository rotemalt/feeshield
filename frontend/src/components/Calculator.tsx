import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface CalculatorProps {
  onStartAudit: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onStartAudit }) => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(35000);
  const [pricingModel, setPricingModel] = useState<string>('tiered');

  // Logic to calculate estimated rates based on model selection
  const getCurrentRate = (model: string) => {
    switch (model) {
      case 'tiered':
        return 0.034; // 3.4%
      case 'flat':
        return 0.029; // 2.9%
      case 'interchange-plus':
        return 0.024; // 2.4%
      case 'unknown':
      default:
        return 0.0325; // 3.25%
    }
  };

  const currentRate = getCurrentRate(pricingModel);
  const targetRate = 0.0205; // 2.05% wholesale target

  // Calculations
  const currentMonthlyFees = monthlyVolume * currentRate;
  const targetMonthlyFees = monthlyVolume * targetRate;
  const monthlySavings = Math.max(0, currentMonthlyFees - targetMonthlyFees);
  const annualSavings = monthlySavings * 12;

  // Split calculations (35% monthly fee, min $20/mo, capped at $1,000 max/yr)
  let dfyCommissionMonthly = monthlySavings > 0 ? Math.max(20, monthlySavings * 0.35) : 0;
  let dfyCommissionAnnual = dfyCommissionMonthly * 12;
  if (dfyCommissionAnnual > 1000) {
    dfyCommissionAnnual = 1000;
    dfyCommissionMonthly = 1000 / 12;
  }

  // Percentage segments for chart rendering
  const totalFees = currentMonthlyFees;
  const interchangePct = totalFees > 0 ? ((monthlyVolume * 0.0175) / totalFees) * 100 : 50; // Interchange standard ~1.75%
  const markupPct = totalFees > 0 ? ((targetMonthlyFees - (monthlyVolume * 0.0175)) / totalFees) * 100 : 25;
  const wastePct = totalFees > 0 ? (monthlySavings / totalFees) * 100 : 25;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="card" style={{ padding: '36px', marginBottom: '64px' }}>
      <div style={{ textAlign: 'left', marginBottom: '32px' }}>
        <span className="badge-glow" style={{ marginBottom: '8px' }}>💰 Interactive Cost Simulator</span>
        <h2 style={{ fontSize: '1.8rem', margin: '4px 0' }}>Estimate Your Leakage Instantly</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
          Adjust the sliders below based on your last merchant invoice to see what our AI forensic auditor can recover.
        </p>
      </div>

      <div className="calculator-grid">
        {/* Left Side: Controls */}
        <div className="calculator-settings">
          <div className="calculator-slider-group">
            <div className="slider-header">
              <label className="form-label" htmlFor="calc-volume-slider">Monthly Credit Card Sales</label>
              <div className="slider-value-bubble">{formatCurrency(monthlyVolume)}/mo</div>
            </div>
            <input
              id="calc-volume-slider"
              type="range"
              min="5000"
              max="500000"
              step="5000"
              className="calculator-range-input"
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <span>$5,000</span>
              <span>$250,000</span>
              <span>$500,000+</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="calc-pricing-select">Your Current Pricing Model</label>
            <select
              id="calc-pricing-select"
              className="form-select"
              value={pricingModel}
              onChange={(e) => setPricingModel(e.target.value)}
            >
              <option value="tiered">Tiered Surcharges (Mid/Non-Qualified charges list)</option>
              <option value="flat">Flat-Rate Standard (Stripe, Square, PayPal 2.9%+)</option>
              <option value="interchange-plus">Interchange-Plus Schedule (Base rate + markups)</option>
              <option value="unknown">I Don't Know (We will audit this for you)</option>
            </select>
          </div>

          {/* Visual Bar Breakdown */}
          <div className="forensic-chart-visual">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>AI Invoice Fee Split Projection</span>
              <span style={{ color: 'var(--color-danger)' }}>{wastePct.toFixed(0)}% Wasted Markup</span>
            </div>
            <div className="stacked-bar-container">
              <div className="stacked-segment interchange" style={{ width: `${interchangePct}%` }} title="Interchange Standard" />
              <div className="stacked-segment markup" style={{ width: `${markupPct}%` }} title="Acceptable Markup" />
              <div className="stacked-segment waste" style={{ width: `${wastePct}%` }} title="Identified Waste" />
            </div>
            <div className="stacked-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#6366f1' }} />
                <span>Card Brand Interchange (~1.75%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: 'var(--color-warning)' }} />
                <span>Fair Provider Surcharges (0.20%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: 'var(--color-danger)' }} />
                <span>Negotiable Fee Creep (Exposed)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Projections */}
        <div className="card calculator-results" style={{ padding: '24px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Projected LLC Savings</span>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '8px' }}>Estimated Annual Recovery</div>
            <div className="calc-line savings" style={{ margin: '8px 0 16px', display: 'block', textAlign: 'center' }}>
              {formatCurrency(annualSavings)}
            </div>

            <div className="calculator-bill-box">
              <div className="calc-line">
                <span>Current Monthly Costs:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formatCurrency(currentMonthlyFees)}</span>
              </div>
              <div className="calc-line">
                <span>Target Optimized Cost:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{formatCurrency(targetMonthlyFees)}</span>
              </div>
              <div className="calc-line" style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px', marginTop: '4px' }}>
                <span>Estimated Monthly Savings:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>{formatCurrency(monthlySavings)}/mo</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '16px', padding: '10px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.15)', textAlign: 'left', border: '1px solid var(--border-color)', lineHeight: '1.4' }}>
              💡 <strong>Pricing Models:</strong> DIY script kit is standard $99. DFY proxy service is standard 35% of monthly savings for the entire year, with a $20/mo minimum and <strong>capped at a $1,000 maximum</strong>. Both tracks are currently 100% free under our first 1,000 businesses pilot program!
            </div>
            
            <button className="btn btn-primary btn-full" onClick={onStartAudit}>
              Run Statement Audit Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
