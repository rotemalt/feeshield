import { useState } from 'react';
import { ShieldCheck, Lock, FileText, BarChart3, HelpCircle, Key, Activity, Clock, Gift } from 'lucide-react';
import { FileDropzone } from './components/FileDropzone';
import { IntakeModal } from './components/IntakeModal';
import { Dashboard } from './components/Dashboard';
import { Calculator } from './components/Calculator';
import { HowItWorks } from './components/HowItWorks';
import { CaseStudies } from './components/CaseStudies';
import { PricingSecurity } from './components/PricingSecurity';
import { FAQ } from './components/FAQ';
import { dbService } from './services/supabase';
import type { Audit } from './services/supabase';
import { statementParserService } from './services/statementParser';
import type { ApiProvider } from './services/gemini';
import { getActiveProvider, getApiKey } from './services/gemini';

type AppStep = 'landing' | 'processing' | 'dashboard';
type ActiveTab = 'home' | 'how-it-works' | 'cases' | 'pricing' | 'faq';

function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [step, setStep] = useState<AppStep>('landing');
  
  // Auditing & Statement states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('Initializing statement analysis...');
  const [auditResult, setAuditResult] = useState<Audit | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // API Configuration states
  const [activeProvider, setActiveProvider] = useState<ApiProvider>(() => getActiveProvider());
  const [googleKey, setGoogleKey] = useState(() => localStorage.getItem('FEESHIELD_GEMINI_API_KEY') || '');
  const [openaiKey, setOpenaiKey] = useState(() => localStorage.getItem('FEESHIELD_OPENAI_API_KEY') || '');
  const [anthropicKey, setAnthropicKey] = useState(() => localStorage.getItem('FEESHIELD_ANTHROPIC_API_KEY') || '');
  const [groqKey, setGroqKey] = useState(() => localStorage.getItem('FEESHIELD_GROQ_API_KEY') || '');
  const [isApiOpen, setIsApiOpen] = useState(false);

  const handleSaveProvider = (provider: ApiProvider) => {
    setActiveProvider(provider);
    localStorage.setItem('FEESHIELD_ACTIVE_PROVIDER', provider);
  };

  const handleSaveKey = (provider: ApiProvider, key: string) => {
    const trimmed = key.trim();
    if (provider === 'google') {
      setGoogleKey(trimmed);
      if (trimmed) localStorage.setItem('FEESHIELD_GEMINI_API_KEY', trimmed);
      else localStorage.removeItem('FEESHIELD_GEMINI_API_KEY');
    } else if (provider === 'openai') {
      setOpenaiKey(trimmed);
      if (trimmed) localStorage.setItem('FEESHIELD_OPENAI_API_KEY', trimmed);
      else localStorage.removeItem('FEESHIELD_OPENAI_API_KEY');
    } else if (provider === 'anthropic') {
      setAnthropicKey(trimmed);
      if (trimmed) localStorage.setItem('FEESHIELD_ANTHROPIC_API_KEY', trimmed);
      else localStorage.removeItem('FEESHIELD_ANTHROPIC_API_KEY');
    } else if (provider === 'groq') {
      setGroqKey(trimmed);
      if (trimmed) localStorage.setItem('FEESHIELD_GROQ_API_KEY', trimmed);
      else localStorage.removeItem('FEESHIELD_GROQ_API_KEY');
    }
  };

  // File selected from dropzone
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setIsIntakeOpen(true);
  };

  // Close intake modal without submitting
  const handleIntakeClose = () => {
    setIsIntakeOpen(false);
    setSelectedFile(null);
  };

  // Submit intake form and begin processing
  const handleIntakeSubmit = async (data: {
    name: string;
    email: string;
    businessName: string;
    volumeTier: string;
  }) => {
    if (!selectedFile) return;
    setIsIntakeOpen(false);
    setStep('processing');
    setBusinessName(data.businessName);
    setError(null);

    const statuses = [
      '🔒 Initializing local client-side sandbox parser...',
      '🛡️ Running Local PII Redaction: stripping account numbers, bank routing keys, and personal contact info...',
      '📤 Transmitting sanitized, anonymized numerical payload to FeeShield AI Underwriter...',
      'Identifying merchant tiered pricing surcharges (Mid/Non-Qualified downgrades)...',
      'Isolating flat monthly junk fees: PCI Non-Compliance penalties and statement costs...',
      'Benchmarking current effective rate against wholesale card-brand interchange fee schedules...',
      'Writing secure audit ledger records to database...',
    ];

    let statusIndex = 0;
    const interval = setInterval(() => {
      if (statusIndex < statuses.length - 1) {
        statusIndex++;
        setProcessingStatus(statuses[statusIndex]);
      }
    }, 1200);

    try {
      const profile = await dbService.saveProfile(data.email, data.businessName, data.volumeTier);
      const parsedData = await statementParserService.parseStatement(selectedFile, data.volumeTier);
      const savedAudit = await dbService.saveAudit(
        profile.id,
        parsedData.fileName,
        parsedData.metrics,
        parsedData.flags
      );

      clearInterval(interval);
      setAuditResult(savedAudit);
      setStep('dashboard');
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setError(err.message || 'An unexpected error occurred while auditing the statement.');
      setStep('landing');
      setSelectedFile(null);
    }
  };

  // Handle immediate click-to-load template account
  const handleSelectTemplate = async (template: {
    name: string;
    email: string;
    businessName: string;
    volumeTier: string;
    fileName: string;
  }) => {
    setActiveTab('home');
    setStep('processing');
    setBusinessName(template.businessName);
    setError(null);

    const statuses = [
      '🔒 Initializing local client-side sandbox parser...',
      '🛡️ Running Local PII Redaction: stripping account numbers, bank routing keys, and personal contact info...',
      '📤 Transmitting sanitized, anonymized numerical payload to FeeShield AI Underwriter...',
      'Retrieving pre-cached sample statement layout records...',
      'Extracting transaction grids (swipes, fees, downgrade margins)...',
      'Analyzing PCI compliance penalties and statement access junk costs...',
      'Writing mock audit logs to browser localStorage database...',
    ];

    let statusIndex = 0;
    const interval = setInterval(() => {
      if (statusIndex < statuses.length - 1) {
        statusIndex++;
        setProcessingStatus(statuses[statusIndex]);
      }
    }, 1000);

    try {
      const profile = await dbService.saveProfile(template.email, template.businessName, template.volumeTier);
      const mockFile = new File([''], template.fileName, { type: 'application/pdf' });
      const parsedData = await statementParserService.parseStatement(mockFile, template.volumeTier);
      const savedAudit = await dbService.saveAudit(
        profile.id,
        parsedData.fileName,
        parsedData.metrics,
        parsedData.flags
      );

      clearInterval(interval);
      setAuditResult(savedAudit);
      setStep('dashboard');
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setError('Failed to execute template audit.');
      setStep('landing');
    }
  };

  const handleReset = () => {
    setStep('landing');
    setSelectedFile(null);
    setAuditResult(null);
    setBusinessName('');
    setError(null);
  };

  const handleScrollToDropzone = () => {
    setActiveTab('home');
    setStep('landing');
    // Smooth scroll down to the dropzone
    setTimeout(() => {
      const element = document.querySelector('.dropzone');
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* App Header */}
      <header className="header">
        <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
          <div className="logo-container">
            <div className="logo-shield">
              <ShieldCheck size={22} color="white" />
            </div>
            <span className="logo-text">FeeShield</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="badge-glow" style={{ fontSize: '0.75rem' }}>
              🟢 Pilot Cohort Free
            </span>

            {/* API Engine Toggle Panel */}
            <div className="floating-api-console">
              <button 
                className={`api-toggle-btn ${activeProvider !== 'simulation' && getApiKey(activeProvider) ? 'active' : ''}`}
                onClick={() => setIsApiOpen(!isApiOpen)}
              >
                <Key size={12} />
                <span>
                  AI Engine: {activeProvider === 'simulation' ? 'Sandbox Sim' : `Live (${activeProvider === 'google' ? 'Gemini' : activeProvider === 'openai' ? 'GPT-4o' : activeProvider === 'anthropic' ? 'Claude' : 'Llama'})`}
                </span>
              </button>
              
              {isApiOpen && (
                <div className="api-drawer" style={{ width: '320px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.85rem' }}>AI Underwriting Engine</strong>
                    <button 
                      onClick={() => setIsApiOpen(false)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', margin: '0', lineHeight: '1.35' }}>
                    DIY audits are 100% free. Add your preferred provider key to audit live. If left blank or simulated, FeeShield runs in client-side sandbox mode.
                  </p>

                  <div className="form-group" style={{ gap: '4px' }}>
                    <label className="form-label" style={{ fontSize: '0.7rem' }}>API Provider</label>
                    <select
                      className="form-select"
                      value={activeProvider}
                      onChange={(e) => handleSaveProvider(e.target.value as ApiProvider)}
                      style={{ fontSize: '0.75rem', padding: '6px 10px', backgroundColor: 'var(--bg-card)' }}
                    >
                      <option value="simulation">💻 Local Sandbox Simulation (Free)</option>
                      <option value="google">Google Gemini 2.5 Flash Lite</option>
                      <option value="openai">OpenAI GPT-4o-mini</option>
                      <option value="anthropic">Anthropic Claude 3.5 Haiku</option>
                      <option value="groq">Groq Llama 3.3 70B</option>
                    </select>
                  </div>

                  {activeProvider === 'google' && (
                    <div className="form-group" style={{ gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                        <label className="form-label" style={{ fontSize: '0.65rem' }}>Gemini API Key</label>
                        <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-hover)' }}>Get Google Key ↗</a>
                      </div>
                      <input 
                        type="password"
                        placeholder="AIzaSy..."
                        className="form-input"
                        value={googleKey}
                        onChange={(e) => handleSaveKey('google', e.target.value)}
                        style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                      />
                    </div>
                  )}

                  {activeProvider === 'openai' && (
                    <div className="form-group" style={{ gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                        <label className="form-label" style={{ fontSize: '0.65rem' }}>OpenAI API Key</label>
                        <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-hover)' }}>Get OpenAI Key ↗</a>
                      </div>
                      <input 
                        type="password"
                        placeholder="sk-proj-..."
                        className="form-input"
                        value={openaiKey}
                        onChange={(e) => handleSaveKey('openai', e.target.value)}
                        style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                      />
                    </div>
                  )}

                  {activeProvider === 'anthropic' && (
                    <div className="form-group" style={{ gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                        <label className="form-label" style={{ fontSize: '0.65rem' }}>Anthropic/OpenRouter Key</label>
                        <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-hover)' }}>Get OpenRouter Key ↗</a>
                      </div>
                      <input 
                        type="password"
                        placeholder="sk-or-... or sk-ant-..."
                        className="form-input"
                        value={anthropicKey}
                        onChange={(e) => handleSaveKey('anthropic', e.target.value)}
                        style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                      />
                      <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', lineHeight: '1.2' }}>
                        💡 Direct Anthropic keys may trigger browser CORS restrictions. OpenRouter keys (start with `sk-or-`) are recommended.
                      </span>
                    </div>
                  )}

                  {activeProvider === 'groq' && (
                    <div className="form-group" style={{ gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                        <label className="form-label" style={{ fontSize: '0.65rem' }}>Groq API Key</label>
                        <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-hover)' }}>Get Groq Key ↗</a>
                      </div>
                      <input 
                        type="password"
                        placeholder="gsk_..."
                        className="form-input"
                        value={groqKey}
                        onChange={(e) => handleSaveKey('groq', e.target.value)}
                        style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                      />
                    </div>
                  )}

                  {activeProvider !== 'simulation' && (
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>
                        <span>Est. Cost per Audit:</span>
                        <strong style={{ color: 'var(--color-success)' }}>
                          {activeProvider === 'google' && '< $0.0003'}
                          {activeProvider === 'openai' && '~ $0.0006'}
                          {activeProvider === 'anthropic' && '~ $0.0036'}
                          {activeProvider === 'groq' && '< $0.0002'}
                        </strong>
                      </div>
                      <p style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', margin: '0', lineHeight: '1.25' }}>
                        * Approximate. Costs are charged directly by your provider. Pricing changes over time. FeeShield does not guarantee actual final costs.
                      </p>
                    </div>
                  )}

                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '10px', lineHeight: '1.3' }}>
                    🔑 Keys are stored strictly on-device in your browser's local sandbox memory. They are never sent to any server besides the provider's direct endpoint.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav className="tabs-navigation">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`tab-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
        >
          <Activity size={16} /> Home
        </button>
        <button 
          onClick={() => setActiveTab('how-it-works')} 
          className={`tab-nav-btn ${activeTab === 'how-it-works' ? 'active' : ''}`}
        >
          <BarChart3 size={16} /> How It Works
        </button>
        <button 
          onClick={() => setActiveTab('cases')} 
          className={`tab-nav-btn ${activeTab === 'cases' ? 'active' : ''}`}
        >
          <FileText size={16} /> Case Studies
        </button>
        <button 
          onClick={() => setActiveTab('pricing')} 
          className={`tab-nav-btn ${activeTab === 'pricing' ? 'active' : ''}`}
        >
          <Key size={16} /> Pricing & Security
        </button>
        <button 
          onClick={() => setActiveTab('faq')} 
          className={`tab-nav-btn ${activeTab === 'faq' ? 'active' : ''}`}
        >
          <HelpCircle size={16} /> FAQs
        </button>
      </nav>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, paddingBottom: '60px' }} className="container">
        {error && (
          <div className="toast" style={{ borderColor: 'var(--color-danger)', top: '90px', bottom: 'auto', right: '24px', animation: 'slideUp 0.3s ease' }}>
            <span className="toast-text" style={{ color: 'var(--color-danger)' }}>{error}</span>
          </div>
        )}

        {/* Tab 1: Home/Audit Utility */}
        {activeTab === 'home' && (
          <>
            {step === 'landing' && (
              <>
                {/* Asymmetric Split Layout */}
                <div className="split-hero-container">
                  {/* Left Column: Visual copy & Live ticker */}
                  <div className="hero-content-col">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge-glow" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        🛡️ AI Underwriting Agent
                      </span>
                      <span className="badge-tag">B2B rate optimization</span>
                    </div>
                    <h1 className="landing-title" style={{ fontSize: '3rem', textAlign: 'left' }}>
                      Expose Hidden Credit Card Processing Markups
                    </h1>
                    <p className="landing-subtitle" style={{ textAlign: 'left', fontSize: '1.05rem', margin: '0' }}>
                      Upload your latest merchant processing statement. Our local sandbox extracts transaction line items, redacts PII, and generates a custom negotiation kit to reclaim your bottom-line.
                    </p>

                    {/* Launch Promotion Callout Banner */}
                    <div className="card" style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(16, 185, 129, 0.03) 100%)',
                      border: '1px dashed rgba(139, 92, 246, 0.35)',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px',
                      textAlign: 'left',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span className="badge-glow" style={{ color: 'var(--color-primary-hover)', borderColor: 'rgba(139, 92, 246, 0.25)', padding: '2px 8px', fontSize: '0.7rem' }}>
                          <Gift size={10} style={{ marginRight: '4px' }} /> Pilot Program Cohort
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                          <Clock size={10} style={{ color: 'var(--color-warning)' }} />
                          <span>Slots Left:</span>
                          <strong style={{ color: 'var(--color-text-primary)', background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: '6px' }}>
                            319 / 1,000 Free
                          </strong>
                        </div>
                      </div>
                      <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: '#fff', fontWeight: 700 }}>
                        First 1,000 Businesses: Get Your Personalized Kit Free
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>
                        To benchmark our forensic AI parser across dental, healthcare, gyms, retail, and B2B SaaS, we have waived our standard pricing fee. Upload below to instantly inspect your rate cards.
                      </p>
                      {/* Visual Progress Bar */}
                      <div>
                        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: '68.1%', height: '100%', background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-success) 100%)' }} />
                        </div>
                      </div>
                    </div>

                    {/* Live Auditing Ticker Console */}
                    <div className="live-ticker-card">
                      <div className="ticker-header">
                        <span>⚡ LIVE B2B AUDIT STREAM</span>
                        <span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          ● Active
                        </span>
                      </div>
                      <div className="ticker-scroller">
                        <div className="ticker-item">
                          <strong>Apex CrossFit Gym (Gym)</strong> audited $34,600 volume. Exposed <strong>$380/mo</strong> in tiered downgrades. Estimated annual recovery: <strong>$4,560</strong>.
                        </div>
                        <div className="ticker-item">
                          <strong>Oakwood Family Dentistry (Healthcare)</strong> audited $118,200 volume. Exposed <strong>$1,420/mo</strong> in PCI compliance junk marks. Estimated annual recovery: <strong>$17,040</strong>.
                        </div>
                        <div className="ticker-item">
                          <strong>Horizon Retail Store (Retail)</strong> audited $485,000 volume. Exposed <strong>$6,140/mo</strong> in non-qualified markup margins. Estimated annual recovery: <strong>$73,680</strong>.
                        </div>
                        <div className="ticker-item">
                          <strong>Dental Clinic in IL (Healthcare)</strong> audited $42,100 volume. Identified <strong>$380/mo</strong> statement fees. Estimated annual recovery: <strong>$4,560</strong>.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dropzone and Promo */}
                  <div className="hero-widget-col">
                    <div className="card" style={{ padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <FileDropzone 
                        onFileSelected={handleFileSelected} 
                        onSelectTemplate={handleSelectTemplate}
                      />
                    </div>
                  </div>
                </div>

                {/* Interactive pre-upload savings estimator */}
                <Calculator onStartAudit={handleScrollToDropzone} />

                {/* Trust Grid */}
                <div className="trust-grid" style={{ marginTop: '32px' }}>
                  <div className="card trust-card">
                    <div className="trust-icon-box">
                      <FileText size={20} />
                    </div>
                    <h3>1. Forensic Statement Audit</h3>
                    <p>
                      Our AI scans every transaction line item, mapping credit card network interchanges against mid-qualified and non-qualified tiered downgrades.
                    </p>
                  </div>

                  <div className="card trust-card">
                    <div className="trust-icon-box">
                      <BarChart3 size={20} />
                    </div>
                    <h3>2. Expose Hidden Junk Fees</h3>
                    <p>
                      Processors bury PCI non-compliance penalties, portal access, and settlement markups in complex statements. We extract them instantly.
                    </p>
                  </div>

                  <div className="card trust-card">
                    <div className="trust-icon-box">
                      <Lock size={20} />
                    </div>
                    <h3>3. Dual Savings Action</h3>
                    <p>
                      Download a tailored B2B script package to negotiate rates yourself, or delegate to our underwriting proxy on a risk-free savings split.
                    </p>
                  </div>
                </div>

                {/* Intake Modal Dialog */}
                <IntakeModal
                  isOpen={isIntakeOpen}
                  onClose={handleIntakeClose}
                  onSubmit={handleIntakeSubmit}
                />
              </>
            )}

            {step === 'processing' && (
              <div className="parser-loader">
                <div className="spinner-outer">
                  <div className="spinner-ring"></div>
                  <div className="spinner-pulse"></div>
                </div>
                <div>
                  <h3 className="parser-status-title">Performing Forensic Statement Review</h3>
                  <p className="parser-status-desc" style={{ marginTop: '12px' }}>
                    {processingStatus}
                  </p>
                </div>
                <div className="badge-glow" style={{ opacity: 0.8, fontSize: '0.8rem' }}>
                  🔒 Secure SSL Encrypted Sandbox Processing
                </div>
              </div>
            )}

            {step === 'dashboard' && auditResult && (
              <Dashboard
                audit={auditResult}
                businessName={businessName}
                onReset={handleReset}
              />
            )}
          </>
        )}

        {/* Tab 2: How It Works */}
        {activeTab === 'how-it-works' && <HowItWorks />}

        {/* Tab 3: Case Studies */}
        {activeTab === 'cases' && <CaseStudies />}

        {/* Tab 4: Pricing & Security */}
        {activeTab === 'pricing' && <PricingSecurity />}

        {/* Tab 5: FAQs */}
        {activeTab === 'faq' && <FAQ />}
      </main>

      {/* Footer */}
      <footer className="footer container" style={{ flexDirection: 'column', gap: '20px', alignItems: 'stretch' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', lineHeight: '1.5', textAlign: 'left' }}>
          <strong>Legal Disclaimer & Liability Limitation:</strong> FeeShield is a forensic analytical auditing utility. The reports, templates, email scripts, and rate calculations generated by our AI are for educational and negotiation planning purposes only. Any rate changes, account terms, or contract amendments finalized between your business LLC and your credit card processor are solely the responsibility of you, the business customer. We recommend that users check their credit card processor's merchant services agreements to avoid sharing billing rate data if it violates their provider's specific terms and conditions. FeeShield accepts zero responsibility and holds zero liability for processor actions, contract adjustments, service terminations, or policy compliance issues resulting from using these tools.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', width: '100%' }}>
          <div>
            © {new Date().getFullYear()} Project FeeShield LLC. All rights reserved.
          </div>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Security documentation: FeeShield uses 256-bit statement encryption.'); }}>Security Vault</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Pricing terms: DIY track is 100% free; DFY track is standard 35% of monthly savings for 12 months, with a $20/mo minimum and capped at a $1,000 maximum.'); }}>Contingency Terms</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Legal LPOA terms: FeeShield acts as an administrative negotiating proxy without service cancellation privileges.'); }}>LPOA Scope</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
