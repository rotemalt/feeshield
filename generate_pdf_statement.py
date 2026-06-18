import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf():
    pdf_path = "/Users/alt/Downloads/feeshield/sample_merchant_statement.pdf"
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    story = []
    styles = getSampleStyleSheet()

    # Create custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#1e3a8a')
    )
    
    section_title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=12,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#334155')
    )

    # Document Header
    story.append(Paragraph("FIRST MERCHANT SERVICES", title_style))
    story.append(Paragraph("Monthly Merchant Billing Statement & Account Performance", body_style))
    story.append(Spacer(1, 15))

    # Account Info Metadata Table (PII details)
    info_data = [
        [Paragraph("<b>Merchant ID:</b> MID-4982-1105-88", body_style), Paragraph("<b>Statement Date:</b> May 31, 2026", body_style)],
        [Paragraph("<b>Legal Entity Name:</b> Oakwood Family Dental Practice LLC", body_style), Paragraph("<b>Account Representative:</b> Dr. Johnathan Doe, DDS", body_style)],
        [Paragraph("<b>Business Address:</b> 1205 Medical Plaza Blvd, Suite 402, Oakwood, CA 90210", body_style), Paragraph("<b>Corporate Email:</b> accounts@oakwooddentalpractice.com", body_style)],
        [Paragraph("<b>Primary Phone:</b> (310) 555-0199", body_style), Paragraph("<b>Deposit Account:</b> Checking *******4982", body_style)]
    ]
    t_info = Table(info_data, colWidths=[260, 260])
    t_info.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LINEBELOW', (0,-1), (-1,-1), 1, colors.HexColor('#cbd5e1')),
    ]))
    story.append(t_info)
    story.append(Spacer(1, 15))

    # Financial Summary
    story.append(Paragraph("ACCOUNT PROCESSING PERFORMANCE SUMMARY", section_title_style))
    summary_data = [
        ["Total Processing Sales Volume", "$74,650.00", "Effective Processing Rate", "3.79%"],
        ["Total Processing Swipe Fees Charged", "$2,831.50", "Settlement Routing Transit ID", "122408892"]
    ]
    t_summary = Table(summary_data, colWidths=[200, 80, 160, 80])
    t_summary.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('ALIGN', (1,0), (1,-1), 'RIGHT'),
        ('ALIGN', (3,0), (3,-1), 'RIGHT'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
    ]))
    story.append(t_summary)
    story.append(Spacer(1, 15))

    # Itemized Processing Charges
    story.append(Paragraph("ITEMIZED FEES & CHARGES BREAKDOWN", section_title_style))
    fees_data = [
        ["Fee Item Description", "Basis", "Rate / Surcharge", "Total Cost"],
        ["Interchange Standard Swipe Base (Visa/MC standard)", "$74,650.00", "1.85% + $0.10", "$1,418.40"],
        ["Mid-Qualified Surcharge markup fee", "$18,500.00", "0.37%", "$68.50"],
        ["Non-Qualified Surcharge downgrade penalty", "$14,960.00", "1.25%", "$187.00"],
        ["PCI DSS Compliance Non-Compliance Fine Surcharge", "Flat", "Monthly Penalty", "$49.00"],
        ["Daily Batch Settlement Closer Processing Fee", "31 days", "$0.82 / day", "$25.40"],
        ["Monthly Business Statement & Account Access Fee", "Flat", "Monthly Retainer", "$15.00"],
        ["Corporate/Amex Surcharge Settle Fee", "$7,850.00", "1.20%", "$94.20"],
        ["Paper Statement Archiving Fee", "Flat", "Admin Cost", "$10.00"]
    ]
    t_fees = Table(fees_data, colWidths=[240, 90, 110, 80])
    t_fees.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('ALIGN', (3,0), (3,-1), 'RIGHT'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
    ]))
    story.append(t_fees)
    story.append(Spacer(1, 20))

    # Security Footnotes
    story.append(Paragraph("<b>Merchant Advisory:</b> Card-brand interchange base rates are standard swipe costs. Surcharges (Mid/Non-qualified tiers) are processor markup margins. You can consult your rate audit reports to negotiate better pricing.", body_style))

    # Build the document
    doc.build(story)
    print(f"Successfully generated sample merchant statement PDF at: {pdf_path}")

if __name__ == "__main__":
    generate_pdf()
