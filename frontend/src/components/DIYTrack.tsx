import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, AlertTriangle, FileText } from 'lucide-react';
import { geminiService } from '../services/gemini';
import type { Audit } from '../services/supabase';

interface DIYTrackProps {
  audit: Audit;
  businessName: string;
}

export const DIYTrack: React.FC<DIYTrackProps> = ({ audit, businessName }) => {
  const [script, setScript] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    const loadScript = async () => {
      try {
        setLoading(true);
        const generated = await geminiService.generateNegotiationScript(
          {
            sales_volume: audit.sales_volume,
            total_fees: audit.total_fees,
            current_effective_rate: audit.current_effective_rate,
            target_effective_rate: audit.target_effective_rate,
            monthly_overpayment: audit.monthly_overpayment,
            annual_potential_savings: audit.annual_potential_savings,
          },
          audit.json_flags,
          businessName,
          'MID-7734-9981-01' // Simulating merchant account number
        );
        if (active) {
          setScript(generated);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to generate script:', err);
        if (active) {
          setLoading(false);
        }
      }
    };

    loadScript();
    return () => {
      active = false;
    };
  }, [audit, businessName]);

  const handleCopy = async () => {
    if (!script) return;
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownload = () => {
    if (!script) return;
    const element = document.createElement('a');
    const file = new Blob([script], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${businessName.replace(/\s+/g, '_')}_Merchant_Fee_Negotiation_Script.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="card path-card">
      <span className="path-badge" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-secondary)', border: '1px solid var(--border-color)' }}>
        Standard Price: $99 (Pilot Free)
      </span>
      <div className="path-header">
        <span className="path-tag">Option A</span>
        <h3 className="path-title">DIY Negotiation Kit</h3>
        <p className="path-desc">
          Generate a personalized, multi-step negotiation kit. Our system automatically structures this package based on your specific statement findings (volume, flagged markups, comparison rates, and target interchange caps). Free for the first 1,000 pilot cohort businesses (normally $99).
        </p>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="path-features">
          <div className="path-feature-item">
            <FileText className="path-feature-icon" size={18} />
            <span>AI-injected rate comparisons and fee calculations citing specific billing overcharges.</span>
          </div>
          <div className="path-feature-item">
            <AlertTriangle className="path-feature-icon" size={18} />
            <span>Multi-step guide containing specific counter-arguments for processor retention tactics.</span>
          </div>
        </div>

        {loading ? (
          <div className="script-box-container" style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div className="spinner-ring" style={{ width: '32px', height: '32px', borderWidth: '3px', position: 'relative' }}></div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Tailoring negotiation script...</span>
            </div>
          </div>
        ) : (
          <div className="script-box-container">
            <div className="script-box-header">
              <span>Tailored E-mail Script</span>
              <button
                onClick={handleCopy}
                style={{ background: 'transparent', border: 'none', color: copied ? 'var(--color-success)' : 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Script'}
              </button>
            </div>
            <div className="script-content">{script}</div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleDownload} disabled={loading}>
          <Download className="btn-icon" size={16} /> Download .TXT
        </button>
        <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleCopy} disabled={loading}>
          {copied ? <Check className="btn-icon" size={16} /> : <Copy className="btn-icon" size={16} />}
          {copied ? 'Copied to Clipboard' : 'Copy Script Template'}
        </button>
      </div>

      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '16px', lineHeight: '1.45', textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
        ⚠️ <strong>Liability Disclaimer:</strong> Using this script and executing negotiations is at your sole discretion. Any results, rate changes, or contract adjustments are the sole responsibility of the business. FeeShield holds zero liability for processor decisions, account changes, or service terminations.
      </div>
    </div>
  );
};
