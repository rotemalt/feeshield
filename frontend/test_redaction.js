/**
 * FeeShield: Test Script for Local PII Redaction & Gemini 2.5 Flash Lite Parsing
 * Run: node test_redaction.js
 */

const fs = require('fs');

// 1. Local PII Redaction Utility (mirrored from gemini.ts)
function redactPIILocally(text) {
  let redacted = text;

  // 1. Line-by-line proactive filter for Address, Contact, and Accounts
  const lines = redacted.split('\n');
  const addressIndicator = /\b(?:address|suite|plaza|blvd|street|st|avenue|ave|drive|dr|road|rd|highway|hwy|p\.o\.\s*box)\b/i;
  const contactIndicator = /\b(?:representative|contact|authorized|owner|name|president|secretary|treasurer|doctor|dr)\b/i;
  const accountIndicator = /\b(?:account|acct|saving|savings|checking|routing|rtn|transit|terminal)\b/i;
  
  for (let i = 0; i < lines.length; i++) {
    // If it contains address keywords, redact after colon or redact line
    if (addressIndicator.test(lines[i])) {
      if (lines[i].includes(':')) {
        const parts = lines[i].split(':');
        lines[i] = parts[0] + ': [REDACTED_ADDRESS_DETAIL]';
      } else {
        lines[i] = '[REDACTED_ADDRESS_LINE]';
      }
    }
    // If it contains contact keywords, redact after colon or redact line
    else if (contactIndicator.test(lines[i]) && !lines[i].toLowerCase().includes('interchange')) {
      if (lines[i].includes(':')) {
        const parts = lines[i].split(':');
        lines[i] = parts[0] + ': [REDACTED_CONTACT_DETAIL]';
      } else {
        lines[i] = '[REDACTED_CONTACT_LINE]';
      }
    }
    // If it contains account/routing keywords, redact after colon or redact line
    else if (accountIndicator.test(lines[i]) && !lines[i].toLowerCase().includes('fee') && !lines[i].toLowerCase().includes('rate') && !lines[i].toLowerCase().includes('summary') && !lines[i].toLowerCase().includes('analysis')) {
      if (lines[i].includes(':')) {
        const parts = lines[i].split(':');
        lines[i] = parts[0] + ': [REDACTED_ACCOUNT_DETAIL]';
      } else {
        lines[i] = '[REDACTED_ACCOUNT_LINE]';
      }
    }
  }
  redacted = lines.join('\n');

  // 2. Redact Emails
  redacted = redacted.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');

  // 3. Redact Phone Numbers
  redacted = redacted.replace(/(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}\s?[\s.-]?\d{4}/g, '[REDACTED_PHONE]');

  // 4. Redact Credit Card Numbers
  redacted = redacted.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[REDACTED_CARD_NUMBER]');
  redacted = redacted.replace(/\b\d{4}[\s-]?\d{6}[\s-]?\d{5}\b/g, '[REDACTED_AMEX_NUMBER]');

  // 5. Redact Bank Routing numbers (specifically 9 digits)
  redacted = redacted.replace(/(?:routing|routing\s*number|rtn|transit)[\s\:\#\-]*\b\d{9}\b/gi, (match) => {
    return match.replace(/\d{9}/, '[REDACTED_ROUTING_NUMBER]');
  });
  redacted = redacted.replace(/\b\d{9}\b/g, '[REDACTED_ROUTING_ID]');

  // 6. Redact Bank Account numbers (and masked accounts, e.g. ******4982)
  redacted = redacted.replace(/(?:account|acct|dep|deposit|deposit\s*account|saving|savings|checking)[\s\:\#\-]+[\w\*\#\-]{4,16}/gi, (match) => {
    return match.replace(/[\w\*\#\-]{4,16}$/, '[REDACTED_ACCOUNT_ID]');
  });

  // 7. Redact Merchant ID (MID) and Terminal ID (TID)
  redacted = redacted.replace(/(?:mid|merchant\s*id|acct|account(?:\s*no|\s*#)?|terminal\s*id)[\s\:\#\-]*\b\d{8,16}\b/gi, (match) => {
    return match.replace(/\d{8,16}/, '[REDACTED_ACCOUNT_ID]');
  });
  redacted = redacted.replace(/MID-\d{4}-\d{4}-\d{2}/g, '[REDACTED_MID]');
  redacted = redacted.replace(/\b\d{10,16}\b/g, '[REDACTED_SECURE_ID]');

  // 8. Redact ZIP codes
  redacted = redacted.replace(/\b\d{5}(?:-\d{4})?\b/g, '[REDACTED_ZIP]');

  // 9. Redact Business Names
  redacted = redacted.replace(/\b[A-Za-z0-9\s,&.-]+?\s+(?:LLC|Inc|Corp|Incorporated|LTD|Partners|Co|Company)\b/gi, '[REDACTED_BUSINESS_NAME]');

  return redacted;
}

// 2. Simulate a highly realistic B2B credit card statement containing sensitive PII
const rawStatementTextWithPII = `
================================================================================
FIRST MERCHANT SERVICES
Monthly Billing Invoice & Account Analysis

MID / Merchant Account Number: MID-4982-1105-88
Business Legal Entity: Oakwood Family Dental Practice LLC
Authorized Representative: Dr. Johnathan Doe, DDS
Corporate Address: 1205 Medical Plaza Blvd, Suite 402, Oakwood, CA 90210
Primary Corporate Email: accounts@oakwooddentalpractice.com
Primary Phone: (310) 555-0199
Statement Date: May 31, 2026
--------------------------------------------------------------------------------
ACCOUNT INVOICE SUMMARY
Previous Balance: $0.00
Merchant Deposits/Sales Volume: $74,650.00
Processing Swipe Fees Billed: $2,831.50
Effective Rate for Period: 3.79%
--------------------------------------------------------------------------------
ITEMIZED TRANSACTION CHARGES DETAILS:
Interchange Interchange standard swipes (Visa/MC base): 1.85% + $0.10 per transaction

Mid-Qualified Tier surcharge: $68.50
Non-Qualified Tier surcharge markup: $187.00
PCI DSS Non-Compliance Penalty Charge: $49.00
Monthly Merchant Portal Access & Support Fee: $15.00
Daily Batch Settlement Closer Fee: $25.40
Corporate Card Surcharges (Amex transaction summary): $94.20
Additional Paper Statement Processing Fee: $10.00

Payment Bank Routing Number: 122408892
Deposit Account: ******4982
================================================================================
`;

console.log('--- ORIGINAL STATEMENT TEXT WITH SENSITIVE PII ---');
console.log(rawStatementTextWithPII);

console.log('\n--- SANITIZING DATA LOCALLY IN PROGRESS... ---');
const sanitizedText = redactPIILocally(rawStatementTextWithPII);
console.log(sanitizedText);

console.log('\n--- VERIFYING REDACTION INTEGRITY ---');
const piiKeys = ['Oakwood', 'Johnathan', 'accounts@', '310', '1205', '90210', '4982-1105-88', '122408892', '******4982'];
let failed = false;
piiKeys.forEach(key => {
  if (sanitizedText.includes(key)) {
    console.error(`❌ FAILURE: PII leakage detected for keyword: "${key}"`);
    failed = true;
  } else {
    console.log(`✓ SUCCESS: Key "${key}" successfully redacted.`);
  }
});

if (!failed) {
  console.log('\n🛡️ GLOBAL COMPLIANCE CHECK PASSED: All PII successfully removed. Only metrics and fee types remain.');
}

// 3. Test live Gemini connection if VITE_GEMINI_API_KEY is found in environment
const apiKey = process.env.VITE_GEMINI_API_KEY;
if (apiKey) {
  console.log('\n🔌 Live VITE_GEMINI_API_KEY found. Testing Gemini 2.5 Flash parser...');
  
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const FORENSIC_SYSTEM_PROMPT = `You are an elite B2B forensic accounting agent specializing in merchant processing fee verification.
Task: Extract financial metrics from the provided raw text.
Your response must contain ONLY a valid JSON object matching the exact layout schema below:
{
  "metrics": {
    "sales_volume": 0.00,
    "total_fees": 0.00,
    "current_effective_rate": 0.00,
    "target_effective_rate": 0.00,
    "monthly_overpayment": 0.00,
    "annual_potential_savings": 0.00
  },
  "flags": [
    {"name": "string", "cost": 0.00, "reason": "string"}
  ]
}`;

  async function runTest() {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: FORENSIC_SYSTEM_PROMPT
      });
      
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: sanitizedText }] }],
        generationConfig: { responseMimeType: 'application/json' }
      });
      
      console.log('\n--- GEMINI 2.5 FLASH LITE RESPONSE ---');
      console.log(result.response.text());
    } catch (err) {
      console.error('Gemini execution error:', err);
    }
  }
  
  runTest();
} else {
  console.log('\nℹ️ VITE_GEMINI_API_KEY not found in process.env. Live Gemini API test skipped.');
}
