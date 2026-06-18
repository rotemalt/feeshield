import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'pricing' | 'security' | 'negotiation' | 'diy-dfy';
}

export const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What is a Limited Power of Attorney (LPOA) and what does it authorize?',
      answer: 'FeeShield is a 100% free DIY utility that parses statements locally and generates scripts for you to negotiate yourself—requiring no LPOA or permission forms. An LPOA is only relevant if you explicitly opt-in to our separate Done-For-You (DFY) partner program, which authorizes our partner underwriting proxies to request rate changes on your behalf. You retain 100% ownership and control of your processing account.',
      category: 'security'
    },
    {
      question: 'Is this really free? How do you make money?',
      answer: 'Yes, FeeShield\'s DIY Audit Utility is 100% free, private, and open-source. There are no credit card checks or monthly software fees required. We believe that checking merchant rate cards is a basic business right. We sustain this free tool by offering an optional Done-For-You (DFY) partner program where partners handle the negotiation for a performance split—which is also currently waived for our first 1,000 pilot cohort waitlist members.',
      category: 'pricing'
    },
    {
      question: 'Do I need to switch credit card processors or install new software?',
      answer: 'No. FeeShield is a stateless browser utility designed to optimize your existing credit card processing accounts. There is zero downtime, no software to install, and no processor to switch. You simply upload your invoice, run the local redaction audit, and use the custom script to request rate adjustments directly from your current provider.',
      category: 'negotiation'
    },
    {
      question: 'Can my customers\' credit card numbers or EIN be leaked?',
      answer: 'No. The FeeShield DIY parser runs 100% client-side inside your browser. All PII, including merchant account numbers, tax IDs (EIN/SSN), emails, phone numbers, and addresses are redacted locally before any data is sent to your chosen AI engine. We never save your statement files, preserving absolute privacy.',
      category: 'security'
    },
    {
      question: 'How long does it take for the rate reduction to take effect?',
      answer: 'For DIY, most processors apply adjustments to your merchant ledger within 3 to 5 business days after you submit the negotiation script. For DFY, our partner underwriting team initiates contact with your provider within 24 hours of onboarding and secures adjustments within 5 to 7 business days.',
      category: 'negotiation'
    },
    {
      question: 'What happens if FeeShield finds $0.00 in monthly savings?',
      answer: 'If our forensic audit confirms your statement is already optimized (e.g. you are on wholesale interchange-plus pricing with no extra markup), we issue a complimentary "100% Optimized Verification Badge" for your records, certifying that your processor is charging fair industry benchmark rates.',
      category: 'diy-dfy'
    },
    {
      question: 'What is the "Transparent Proxy Loop" email subdomain?',
      answer: 'If you opt-in to the Done-For-You separate partner program, partners set up a secure communications channel. For the DIY kit, you do not need this; you simply copy-paste the generated email script directly from your own corporate inbox to your processor.',
      category: 'diy-dfy'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge-glow" style={{ marginBottom: '12px' }}>❓ Frequently Asked Questions</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>Got Questions? We Have Answers</h2>
        <p style={{ maxWidth: '650px', margin: '12px auto 0', fontSize: '1.05rem', color: 'var(--color-text-secondary)' }}>
          Learn how FeeShield helps your business audit merchant statements, strip PII locally, and negotiate lower credit card processing fees.
        </p>
      </div>

      {/* Search Bar */}
      <div className="faq-search-wrapper">
        <Search className="faq-search-icon" size={20} />
        <input
          type="text"
          className="faq-search-input"
          placeholder="Search FAQs by keywords (e.g. LPOA, free, switch, security)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category filter buttons */}
      <div className="faq-filter-row">
        {['all', 'pricing', 'security', 'negotiation', 'diy-dfy'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`faq-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            style={{ textTransform: 'capitalize' }}
          >
            {cat === 'diy-dfy' ? 'DIY vs DFY' : cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="accordion">
        {filteredFaqs.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
            <HelpCircle size={36} style={{ marginBottom: '12px', color: 'var(--color-text-muted)' }} />
            <p>No questions matched your search query. Try other keywords.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <div key={idx} className={`accordion-item ${openIndex === idx ? 'open' : ''}`}>
              <button className="accordion-trigger" onClick={() => handleToggle(idx)}>
                <span>{faq.question}</span>
                <ChevronDown className="accordion-trigger-icon" size={18} />
              </button>
              <div className="accordion-content-box" style={{ maxHeight: openIndex === idx ? '200px' : '0' }}>
                <div className="accordion-content">{faq.answer}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
