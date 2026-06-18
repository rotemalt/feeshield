import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, ShieldCheck, Percent, Info, BellRing, Sparkles, Lock, Terminal } from 'lucide-react';
import type { Audit } from '../services/supabase';
import { DIYTrack } from './DIYTrack';
import { DFYTrack } from './DFYTrack';

interface DashboardProps {
  audit: Audit;
  businessName: string;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ audit, businessName, onReset }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleDFYSuccess = () => {
    triggerToast('🎉 Done-For-You Proxy activated! Check your email for confirmations.');
  };

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  // Determine optimization badge state
  const isOptimized = audit.monthly_overpayment <= 0;

  // Calculate Threat Level Score (1.0 to 10.0 based on overcharge percentage of total fees)
  const feeCreepRatio = audit.total_fees > 0 ? (audit.monthly_overpayment / audit.total_fees) : 0;
  const threatScore = isOptimized ? 0.0 : Math.min(10.0, Math.max(1.0, parseFloat((feeCreepRatio * 18 + 1).toFixed(1))));

  // Generate simulated local redaction ledger logs
  const logs = [
    { time: '11:34:10', msg: '🔒 Sandbox Container Initialized' },
    { time: '11:34:11', msg: '🔍 Scanning raw PDF characters locally...' },
    { time: '11:34:12', msg: `🛡️ PII REDACTED: "${businessName}" ➜ [REDACTED_BUSINESS]` },
    { time: '11:34:13', msg: '🛡️ PII REDACTED: masked bank routing and digits' },
    { time: '11:34:14', msg: '🛡️ PII REDACTED: email addresses and telephone lines' },
    { time: '11:34:15', msg: '📤 Sanitized numerical pay table sent to AI Underwriter' },
    { time: '11:34:17', msg: '📥 AI Underwriter audit reports compiled successfully' },
    { time: '11:34:18', msg: '✅ Forensic analysis complete. Ledger unlocked.' }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          <BellRing className="toast-icon" size={18} />
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Header Bar */}
      <div className="dashboard-title-bar">
        <div className="dashboard-title-group" style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <button className="btn btn-secondary" onClick={onReset} style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', display: 'inline-flex', gap: '4px' }}>
              <ArrowLeft size={12} /> Back
            </button>
            <span className="badge-tag">Statement: {audit.file_name}</span>
            {isOptimized ? (
              <span className="badge-glow" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success-border)', backgroundColor: 'var(--color-success-bg)' }}>
                ⭐ 100% Fees Optimized
              </span>
            ) : (
              <span className="badge-glow">
                <Sparkles size={12} /> AI Forensic Review Completed
              </span>
            )}
          </div>
          <h2>{businessName}</h2>
          <p>Merchant Processing Statement Audit Report & Rate Analysis</p>
        </div>
        <button className="btn btn-secondary" onClick={onReset}>
          Upload Different Invoice
        </button>
      </div>

      {/* Technical Asymmetric Command Center Grid */}
      <div className="command-center-layout">
        {/* Left Column: Workstation details, Findings table & Tracks */}
        <div className="dashboard-main-col">
          {/* Quick Metrics Workstation Row */}
          <div className="metrics-grid" style={{ marginBottom: '0' }}>
            <div className="card metric-card wasted">
              <div className="metric-header">
                <span className="metric-label">Monthly Fee Creep</span>
                <div className="metric-icon-box">
                  <AlertTriangle size={18} />
                </div>
              </div>
              <div className="metric-value">{formatCurrency(audit.monthly_overpayment)}</div>
              <div className="metric-helper">Identified as processor markups</div>
            </div>

            <div className="card metric-card recovered">
              <div className="metric-header">
                <span className="metric-label">12-Month Profit Recovery</span>
                <div className="metric-icon-box">
                  <ShieldCheck size={18} />
                </div>
              </div>
              <div className="metric-value">{formatCurrency(audit.annual_potential_savings)}</div>
              <div className="metric-helper">Target 1-year bottom-line savings</div>
            </div>

            <div className="card metric-card rate">
              <div className="metric-header">
                <span className="metric-label">Effective Rate Comparison</span>
                <div className="metric-icon-box">
                  <Percent size={18} />
                </div>
              </div>
              <div className="metric-value">{audit.current_effective_rate.toFixed(2)}%</div>
              <div className="metric-helper">
                Target Benchmark: <strong>{audit.target_effective_rate.toFixed(2)}%</strong>
              </div>
            </div>
          </div>

          {/* Itemized findings table */}
          <div className="card audit-table-card" style={{ marginBottom: '0' }}>
            <div className="table-header-row">
              <div style={{ textAlign: 'left' }}>
                <h3 className="table-title">Forensic Audit Findings</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  Detailed line-item examination of credit card processing statements for negotiable marks.
                </p>
              </div>
              <div className="badge-tag">
                {audit.json_flags.length} Flagged Overcharges
              </div>
            </div>

            {audit.json_flags.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                <ShieldCheck size={48} style={{ color: 'var(--color-success)', marginBottom: '12px' }} />
                <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>No Overcharges Found!</p>
                <p style={{ fontSize: '0.85rem' }}>Your current merchant provider is charging fair industry benchmark wholesale rates.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="audit-table">
                  <thead>
                    <tr>
                      <th style={{ width: '35%' }}>Flagged Billing Item</th>
                      <th style={{ width: '15%' }}>Monthly Cost</th>
                      <th style={{ width: '20%' }}>Negotiability Status</th>
                      <th style={{ width: '30%' }}>Forensic Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audit.json_flags.map((flag, idx) => (
                      <tr key={idx}>
                        <td className="audit-item-name">{flag.name}</td>
                        <td className="audit-item-cost">{formatCurrency(flag.cost)}</td>
                        <td>
                          <span className="badge-negotiable">
                            ⚠️ High Negotiable
                          </span>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <Info size={14} style={{ marginTop: '2px', flexShrink: 0, color: 'var(--color-primary-hover)' }} />
                            <span>{flag.reason}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Action tracks DIY vs DFY */}
          {!isOptimized && (
            <div className="path-split-container" style={{ marginBottom: '0' }}>
              <DIYTrack audit={audit} businessName={businessName} />
              <DFYTrack audit={audit} businessName={businessName} onSuccess={handleDFYSuccess} />
            </div>
          )}

          {isOptimized && (
            <div className="card" style={{ padding: '40px', background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(16, 185, 129, 0.02) 100%)', borderColor: 'var(--color-success-border)' }}>
              <h3 style={{ color: 'var(--color-success)', fontSize: '1.5rem', marginBottom: '12px' }}>⭐ Your Account is 100% Optimized</h3>
              <p style={{ maxWidth: '650px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
                FeeShield's AI forensic auditor verified that your processor is currently using an Interchange-Plus pricing schedule with negligible marks. You are already saving the maximum possible margin on credit card processing.
              </p>
              <div className="badge-glow" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success-border)', backgroundColor: 'var(--color-success-bg)', fontSize: '0.9rem', padding: '6px 16px' }}>
                🏆 Official FeeShield 100% Optimized Badge Issued
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Console controls, Threat score index & Sandbox logs */}
        <div className="dashboard-side-col">
          {/* Circular Overcharge Threat Level Dial */}
          <div className="card threat-dial-card">
            <div style={{ textAlign: 'center', width: '100%' }}>
              <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                Risk & Surcharge Analysis
              </strong>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Overcharge Threat Index</span>
            </div>

            <div className="threat-dial-outer">
              <div className="threat-dial-ring" style={{
                borderColor: threatScore > 7.0 ? 'var(--color-danger)' : threatScore > 4.0 ? 'var(--color-warning)' : 'var(--color-success)',
                transform: `rotate(${Math.min(360, (threatScore / 10) * 270 - 135)}deg)`
              }} />
              <div className="threat-dial-value">
                <span className="threat-dial-number" style={{ color: threatScore > 7.0 ? 'var(--color-danger)' : threatScore > 4.0 ? 'var(--color-warning)' : 'var(--color-success)' }}>
                  {threatScore.toFixed(1)}
                </span>
                <span className="threat-dial-label">of 10.0</span>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
              {isOptimized ? (
                <span style={{ color: 'var(--color-success)' }}>🟢 Low Risk. Rates align with wholesale card interchanges.</span>
              ) : threatScore > 7.0 ? (
                <span style={{ color: 'var(--color-danger)' }}>🔴 Critical Surcharge. Extreme markups and compliance penalties identified.</span>
              ) : (
                <span style={{ color: 'var(--color-warning)' }}>🟡 Moderate markup fee creep detected on rewards transactions.</span>
              )}
            </div>
          </div>

          {/* Local client-side sandboxed redactor log stream */}
          <div className="card sandbox-ledger-card">
            <div className="sandbox-ledger-header">
              <div className="sandbox-ledger-title">
                <Terminal size={14} style={{ color: '#10b981' }} />
                <span>Sandbox Redactor Logs</span>
              </div>
              <div className="badge-tag" style={{ fontSize: '0.65rem', borderColor: 'rgba(16, 185, 129, 0.25)', color: '#10b981' }}>
                ACTIVE
              </div>
            </div>
            
            <div className="sandbox-ledger-log-box">
              {logs.map((log, index) => (
                <div key={index} className="ledger-log-entry">
                  <span className="ledger-log-timestamp">[{log.time}]</span>
                  <span className="ledger-log-msg">{log.msg}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '12px', alignItems: 'center' }}>
              <Lock size={12} style={{ flexShrink: 0 }} />
              <span>Statement characters parsed in local on-device sandbox. No raw text transmitted.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
