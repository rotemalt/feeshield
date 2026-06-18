import React, { useEffect, useRef, useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; businessName: string; volumeTier: string }) => void;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [volumeTier, setVolumeTier] = useState('$10,000 - $50,000/mo');

  // Keep dialog element state in sync with isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle dialog events (esc key, close event)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  // Fallback for browsers (like Safari) that do not yet support closedby="any"
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Check if the browser supports closedBy attribute natively
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;

        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );

        if (!isDialogContent) {
          dialog.close();
        }
      };

      dialog.addEventListener('click', handleBackdropClick);
      return () => {
        dialog.removeEventListener('click', handleBackdropClick);
      };
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !volumeTier) return;

    onSubmit({
      name,
      email,
      businessName: businessName || `${name}'s LLC`,
      volumeTier,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      // @ts-ignore - closedby is a modern attribute not fully typed in React types yet
      closedby="any"
      aria-labelledby="intake-title"
    >
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-hover)', marginBottom: '4px' }}>
            <ShieldAlert size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Forensic Audit Intake</span>
          </div>
          <h2 id="intake-title" className="modal-title">Just One Last Step...</h2>
          <p className="modal-subtitle">
            Configure your audit target. We will run Prompt 1: Forensic Statement Auditor against the document immediately.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="intake-name">First & Last Name</label>
            <input
              id="intake-name"
              type="text"
              className="form-input"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="intake-email">Direct Work Email Address</label>
            <input
              id="intake-email"
              type="email"
              className="form-input"
              placeholder="e.g. john@yourllc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="intake-business">Business Name (LLC)</label>
            <input
              id="intake-business"
              type="text"
              className="form-input"
              placeholder="e.g. Acme Services LLC"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="intake-volume">Estimated Monthly Card Sales</label>
            <select
              id="intake-volume"
              className="form-select"
              value={volumeTier}
              onChange={(e) => setVolumeTier(e.target.value)}
              required
            >
              <option value="Less than $10,000/mo">Less than $10,000/mo</option>
              <option value="$10,000 - $50,000/mo">$10,000 - $50,000/mo</option>
              <option value="$50,000 - $200,000/mo">$50,000 - $200,000/mo</option>
              <option value="Over $200,000/mo">Over $200,000/mo</option>
            </select>
          </div>

          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center', marginTop: '-4px' }}>
            <span>🔒 Input details are strictly used to format your local email template. No personal data is saved.</span>
          </div>

          <div className="form-group" style={{ backgroundColor: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.15)', padding: '10px', borderRadius: '6px', gap: '4px', textAlign: 'left' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-danger)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>⚠️ Compliance Warning & Disclaimer:</span>
            <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.3' }}>
              Confirm your business is not bound by specific confidentiality restrictions prohibiting rate comparisons under your processor's Terms & Conditions. Uploading or sharing statement data against your provider agreement is not recommended. FeeShield holds zero responsibility for processor actions, terms, or policy compliance.
            </p>
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '4px' }}>
            🔒 Execute Forensic Statement Audit
          </button>
        </form>
      </div>
    </dialog>
  );
};
