import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, AlertCircle, Play } from 'lucide-react';

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  onSelectTemplate: (template: { name: string; email: string; businessName: string; volumeTier: string; fileName: string }) => void;
  disabled?: boolean;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ 
  onFileSelected, 
  onSelectTemplate, 
  disabled = false 
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setErrorMessage(null);
    
    // Validate file type (must be PDF)
    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    if (!isPdf) {
      setErrorMessage('Please upload a valid merchant processing statement in PDF format.');
      return;
    }

    // Validate file size (e.g., max 15MB)
    const maxSize = 15 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('Statement file size exceeds 15MB limit. Please upload a smaller file.');
      return;
    }

    onFileSelected(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const templates = [
    {
      name: 'Sarah Connor',
      email: 'sarah@apexfit.com',
      businessName: 'Apex CrossFit Gym',
      volumeTier: '$10,000 - $50,000/mo',
      fileName: 'APEX_CROSSFIT_STATEMENT_MAY2026.pdf',
      badgeClass: 'warning',
      badgeText: 'PCI Compliance Penalty'
    },
    {
      name: 'Dr. Robert Oakwood',
      email: 'robert@oakwooddental.com',
      businessName: 'Oakwood Family Dentistry',
      volumeTier: '$50,000 - $200,000/mo',
      fileName: 'OAKWOOD_DENTAL_INVOICE_MAY2026.pdf',
      badgeClass: 'danger',
      badgeText: 'Non-Qualified Surcharges'
    },
    {
      name: 'Lisa Horizon',
      email: 'billing@horizonretail.com',
      businessName: 'Horizon Retail Store',
      volumeTier: 'Over $200,000/mo',
      fileName: 'HORIZON_RETAIL_LEDGER_MAY2026.pdf',
      badgeClass: 'success',
      badgeText: 'Tiered Downgrades'
    }
  ];

  return (
    <div className="dropzone-container">
      <div
        className={`dropzone ${isDragActive ? 'drag-active' : ''} ${disabled ? 'disabled' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        role="button"
        tabIndex={0}
        aria-label="Upload merchant processing statement PDF"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="file-input"
          style={{ display: 'none' }}
          accept=".pdf,application/pdf"
          onChange={handleChange}
          disabled={disabled}
        />
        
        <div className="dropzone-icon">
          {isDragActive ? (
            <FileText className="btn-icon" size={36} />
          ) : (
            <UploadCloud className="btn-icon" size={36} />
          )}
        </div>
        
        <div className="dropzone-primary-text">
          {isDragActive ? 'Drop your statement file here' : 'Drag & drop last month\'s statement PDF'}
        </div>
        
        <div className="dropzone-secondary-text">
          or click to browse your local files (Max 15MB)
        </div>

        <div className="badge-glow" style={{ marginTop: '8px' }}>
          🛡️ 100% Private Client-Side Sandbox (No Files Saved)
        </div>
      </div>

      {errorMessage && (
        <div className="toast" style={{ borderColor: 'var(--color-danger)', position: 'relative', marginTop: '16px', bottom: 'auto', right: 'auto', maxWidth: 'none', width: '100%', animation: 'fadeIn 0.2s ease' }}>
          <AlertCircle className="toast-icon" style={{ color: 'var(--color-danger)' }} />
          <div className="toast-text" style={{ color: 'var(--color-text-primary)' }}>{errorMessage}</div>
        </div>
      )}

      {/* Preconfigured templates selection */}
      <div className="templates-panel">
        <div className="templates-title">No statement handy?</div>
        <div className="templates-subtitle">Click one of our pre-configured business statements to run a simulated AI audit instantly:</div>
        
        <div className="templates-grid">
          {templates.map((tpl, idx) => (
            <div 
              key={idx} 
              className="template-card"
              onClick={(e) => {
                e.stopPropagation();
                if (disabled) return;
                onSelectTemplate(tpl);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="template-card-info">
                <div className="template-card-name">{tpl.businessName}</div>
                <div className="template-card-meta">
                  <span>{tpl.volumeTier}</span>
                  <span className={`template-card-badge ${tpl.badgeClass}`}>
                    {tpl.badgeText}
                  </span>
                </div>
              </div>
              <Play size={14} className="template-card-arrow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
