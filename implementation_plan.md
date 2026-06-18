# Implementation Plan — FeeShield Expansion & Premium Redesign

This plan covers the expansion of Project FeeShield into a comprehensive, B2B platform with rich interactive educational pages, pre-configured statement templates, dynamic estimators, and a visual redesign that aligns with premium financial security utilities.

## User Review Required

> [!IMPORTANT]
> - We are introducing a **Tab-based Navigation** to split the interface into distinct educational pages: **Home (Audit Utility)**, **How It Works (Forensic Ledger)**, **Case Studies**, **Pricing & Security**, and **Dense FAQs**.
> - We will implement a **Preconfigured Template Selector** in the dropzone. This allows users who don't have a PDF statement on hand to load mock data (e.g., "Gym Statement", "Dental Office Statement", "eCommerce Store") and inspect the forensic audit flow instantly.
> - We will add a **Pre-Upload Savings Calculator** allowing business owners to estimate potential savings using simple sliders before submitting files.

---

## Proposed Changes

### Frontend Component (React + Vite)

#### [MODIFY] [index.css](file:///Users/alt/Downloads/feeshield/frontend/src/index.css)
We will expand the CSS styling system to support new visual elements:
- **Glowing Accordion Component**: For smooth search-filtered FAQ lookups.
- **Interactive Calculator Layout**: Slider track styling, side-by-side flex bars, and glowing estimation tags.
- **Mock Selector Badges**: Grid of templates with hover borders, icons, and status dots.
- **Tab Navigation Bar**: A glassmorphic header bar with sliding selection pills and active states.
- **Forensic Detail Visualization**: Graph-like bars showing Interchange base fees vs Processor markups.

#### [MODIFY] [App.tsx](file:///Users/alt/Downloads/feeshield/frontend/src/App.tsx)
We will upgrade `App.tsx` to orchestrate:
- **Global Tab State**: Managing active page view (`'home' | 'how-it-works' | 'cases' | 'pricing' | 'faq'`).
- **Template Injector**: A set of click-to-load sample statement records that pre-populate the auditing engine.
- **Dynamic Routing & SEO**: Structured semantic elements so each sub-view is self-explanatory.

#### [NEW] [Calculator.tsx](file:///Users/alt/Downloads/feeshield/frontend/src/components/Calculator.tsx)
We will build a pre-upload interactive estimator:
- Sliders for Monthly Transaction Volume ($0 to $500,000+).
- Dropdown selector for Current Pricing Model (Tiered, Flat-rate, Interchange-Plus, Don't Know).
- Interactive calculation projecting annual waste, contingency split, and net LLC recoveries.

#### [MODIFY] [FileDropzone.tsx](file:///Users/alt/Downloads/feeshield/frontend/src/components/FileDropzone.tsx)
We will add a "No Statement Handy? Try a Sample Account" panel directly under the drag-and-drop region. Users can click on pre-made cases (e.g., "Oakwood Dental Practice - Tiered Surcharges" or "Apex CrossFit - Excess Monthly Junk Fees") to bypass files upload.

#### [NEW] [Tabs/HowItWorks.tsx](file:///Users/alt/Downloads/feeshield/frontend/src/components/HowItWorks.tsx)
An educational page explaining credit card processing fee mechanics:
- Visual stepper detailing Visa/Mastercard Interchange base fees vs processor pricing structures (Tiered pricing vs Interchange-Plus).
- Interactive forensic guide showing what "Downgraded Transactions" mean and why mid/non-qualified card brands are marked up.

#### [NEW] [Tabs/CaseStudies.tsx](file:///Users/alt/Downloads/feeshield/frontend/src/components/CaseStudies.tsx)
A page presenting detailed real-world scenarios:
- **Case 1: Apex CrossFit Gym** (Wasted PCI compliance fees + monthly statement access markups).
- **Case 2: Oakwood Family Dentistry** (Tiered pricing with high non-qualified downgrade penalties).
- **Case 3: Horizon Retail Shop** (Hidden batch header and daily settlement markup).

#### [NEW] [Tabs/PricingSecurity.tsx](file:///Users/alt/Downloads/feeshield/frontend/src/components/PricingSecurity.tsx)
A dedicated page that addresses trust and operational overhead:
- **Pricing Simulator Slider**: Interactive representation of the 35% contingency fee structure.
- **Security Standards Panel**: Explaining our AES-256 statement storage policies and why our "Transparent Proxy Loop" operates under client subdomains.

#### [NEW] [Tabs/FAQ.tsx](file:///Users/alt/Downloads/feeshield/frontend/src/components/FAQ.tsx)
An interactive accordion system supporting category filtering and a text search bar. Covers LPOA boundaries, EIN safety, fee retrieval guarantees, and processor switching.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify type safety and component imports compile successfully.

### Manual Verification
- Navigating between tabs and verifying slide transitions.
- Testing the pre-upload calculator sliders and verifying calculations adjust.
- Clicking the mock statement templates and confirming the system transitions to the intake modal and dashboard with relevant customized values.
- Testing the FAQ search bar.
