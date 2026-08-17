import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DoorScheduleItem, ProjectCaseStudy } from '../types';

export interface PDFExportOptions {
  scheduleItems: DoorScheduleItem[];
  projectName?: string;
  contactName?: string;
  companyName?: string;
  contactEmail?: string;
  referenceId?: string;
}

export const generateDoorSchedulePDF = (options: PDFExportOptions): void => {
  const {
    scheduleItems,
    projectName = 'Architectural Door Schedule',
    contactName = 'Estimating Department',
    companyName = 'General Contractor / Architect',
    contactEmail,
    referenceId = `JD-SCH-${Math.floor(100000 + Math.random() * 900000)}`,
  } = options;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const totalOpenings = scheduleItems.reduce((acc, item) => acc + item.qty, 0);
  const totalTypes = scheduleItems.length;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Color Palette
  const primaryDark = [18, 18, 20]; // #121214
  const accentAmber = [245, 158, 11]; // #f59e0b
  const neutralGray = [100, 100, 110];
  const tableHeaderBg = [24, 24, 27]; // #18181b
  const lightRowBg = [248, 249, 250];

  // 1. Top Header Banner
  doc.setFillColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.rect(0, 0, 297, 24, 'F');

  // Brand Name & Division
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('JUST DOORS', 14, 13);

  // Amber Accent Dot / Badge
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(accentAmber[0], accentAmber[1], accentAmber[2]);
  doc.text('ARCHITECTURAL DOOR & HARDWARE SCHEDULE', 62, 13);

  // Corporate Attribution on Right
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('A division of Builders Haus (buildershaus.com)', 200, 10);
  doc.text('Powered by Industry Army Marketing', 200, 15);
  doc.text('justdoors.co • Commercial, High-Rise & Multi-Family Systems', 200, 20);

  // 2. Project & Document Meta Bar
  doc.setFillColor(242, 243, 245);
  doc.rect(0, 24, 297, 22, 'F');
  doc.setDrawColor(220, 222, 226);
  doc.setLineWidth(0.3);
  doc.line(0, 46, 297, 46);

  // Metadata Columns
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('PROJECT:', 14, 32);
  doc.setFont('helvetica', 'normal');
  doc.text(projectName, 30, 32);

  doc.setFont('helvetica', 'bold');
  doc.text('CLIENT / GC:', 14, 40);
  doc.setFont('helvetica', 'normal');
  doc.text(companyName ? `${companyName} (${contactName})` : contactName, 34, 40);

  doc.setFont('helvetica', 'bold');
  doc.text('DATE:', 115, 32);
  doc.setFont('helvetica', 'normal');
  doc.text(currentDate, 126, 32);

  doc.setFont('helvetica', 'bold');
  doc.text('REF ID:', 115, 40);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(accentAmber[0], accentAmber[1], accentAmber[2]);
  doc.text(referenceId, 127, 40);

  // Summary Metrics Badge
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('TOTAL OPENINGS:', 200, 32);
  doc.setFontSize(10);
  doc.setTextColor(180, 83, 9); // Amber-700
  doc.text(`${totalOpenings} Openings`, 233, 32);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('LINE ITEM TYPES:', 200, 40);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(neutralGray[0], neutralGray[1], neutralGray[2]);
  doc.text(`${totalTypes} Unique Assemblies`, 233, 40);

  // 3. Table of Openings
  const tableData = scheduleItems.map((item, index) => [
    (index + 1).toString(),
    item.openingNumber,
    item.doorType,
    item.size,
    item.fireRating,
    item.frameType,
    item.compatibilityStatus === 'incompatible'
      ? `${item.hardwareSet}\n[CODE VIOLATION]`
      : item.compatibilityStatus === 'warning'
      ? `${item.hardwareSet}\n[ULC LINER REQ]`
      : `${item.hardwareSet}\n[NFPA 80 COMPLIANT]`,
    item.qty.toString(),
  ]);

  autoTable(doc, {
    startY: 50,
    head: [[
      '#',
      'Opening Tag / Mark',
      'Door Construction & Finish',
      'Size (W x H x T)',
      'Fire Rating (UL/NFPA)',
      'Frame Specification',
      'Hardware Set & Function',
      'Qty',
    ]],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.8,
      lineColor: [225, 227, 230],
      lineWidth: 0.2,
      textColor: [30, 30, 35],
      font: 'helvetica',
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [24, 24, 27],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
    },
    alternateRowStyles: {
      fillColor: [250, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 42, fontStyle: 'bold' },
      2: { cellWidth: 50 },
      3: { cellWidth: 26 },
      4: { cellWidth: 32 },
      5: { cellWidth: 42 },
      6: { cellWidth: 58 },
      7: { cellWidth: 12, halign: 'right', fontStyle: 'bold', textColor: [180, 83, 9] },
    },
    didDrawPage: (data) => {
      // Footer on every page
      const pageHeight = doc.internal.pageSize.height || 210;
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(130, 130, 140);

      // Left Footer
      doc.text(
        'NFPA 80 / UL 10C / IBC 2024 Compliant • All Openings Factory Machined & Prepped for Hardware',
        14,
        pageHeight - 8
      );

      // Right Footer: Page Numbers
      const pageNumber = doc.getNumberOfPages();
      doc.text(
        `Page ${data.pageNumber} of ${pageNumber} • Just Doors Engineering Takeoff Engine`,
        240,
        pageHeight - 8
      );
    },
  });

  // Get final Y position after table
  // @ts-expect-error - jspdf-autotable adds lastAutoTable to doc
  const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 150) + 8;

  // If there is enough room on the current page, render the Technical & Sign-off notes; otherwise add a page
  if (finalY < 165) {
    renderTechnicalAndSignoffBlock(doc, finalY, totalOpenings);
  } else {
    doc.addPage();
    renderTechnicalAndSignoffBlock(doc, 20, totalOpenings);
  }

  // Save the PDF
  const sanitizedProject = projectName.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`JustDoors_Schedule_${sanitizedProject}_${referenceId}.pdf`);
};

/**
 * Generates a clean, branded PDF summary of a Project Case Study
 * containing full project scope, location engineering hurdles, delivered trade specs,
 * inspections passed, and client testimonials.
 */
export const generateProjectCaseStudyPDF = (project: ProjectCaseStudy): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const refId = `CS-${project.id.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-${new Date().getFullYear()}`;

  // Colors
  const primaryDark = [18, 18, 20]; // #121214
  const accentAmber = [245, 158, 11]; // #f59e0b
  const lightBg = [245, 246, 248];
  const borderGray = [220, 222, 226];
  const textDark = [24, 24, 27];
  const textMuted = [100, 100, 110];

  // ================= PAGE 1 =================
  // 1. Header Banner
  doc.setFillColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('JUST DOORS & RAMBO WALLS', margin, 12);

  doc.setFontSize(8);
  doc.setTextColor(accentAmber[0], accentAmber[1], accentAmber[2]);
  doc.text('ARCHITECTURAL PROJECT CASE STUDY & SPECIFICATION REPORT', margin, 18);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 205);
  doc.text('A division of Builders Haus (buildershaus.com)', pageWidth - margin, 10, { align: 'right' });
  doc.text('Metro Vancouver & Fraser Valley Commercial Trade Package', pageWidth - margin, 15, { align: 'right' });
  doc.text('justdoors.co • Commercial, High-Rise & Multi-Family Systems', pageWidth - margin, 20, { align: 'right' });

  // 2. Project Metadata Sub-header Strip
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(0, 28, pageWidth, 18, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.line(0, 46, pageWidth, 46);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('SECTOR:', margin, 35);
  doc.setFont('helvetica', 'normal');
  doc.text(project.sector.toUpperCase(), margin + 14, 35);

  doc.setFont('helvetica', 'bold');
  doc.text('CLIENT TYPE:', margin, 41);
  doc.setFont('helvetica', 'normal');
  doc.text(project.clientType, margin + 20, 41);

  doc.setFont('helvetica', 'bold');
  doc.text('MUNICIPALITY:', 75, 35);
  doc.setFont('helvetica', 'normal');
  doc.text(project.municipalityName || project.location, 97, 35);

  doc.setFont('helvetica', 'bold');
  doc.text('BUDGET TIER:', 75, 41);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 83, 9);
  doc.text(project.budgetEstimate || project.budgetTier || 'Architectural Specification', 97, 41);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('DATE:', 145, 35);
  doc.setFont('helvetica', 'normal');
  doc.text(currentDate, 156, 35);

  doc.setFont('helvetica', 'bold');
  doc.text('REF ID:', 145, 41);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(accentAmber[0], accentAmber[1], accentAmber[2]);
  doc.text(refId, 158, 41);

  // 3. Project Title & Location Block
  let currentY = 53;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(project.title, margin, currentY);

  currentY += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(accentAmber[0], accentAmber[1], accentAmber[2]);
  doc.text(project.subtitle, margin, currentY);

  currentY += 4.5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Location: ${project.location}`, margin, currentY);

  // 4. Key Metrics Grid (4 Boxes)
  currentY += 6;
  const boxWidth = (contentWidth - 9) / 4;
  const boxHeight = 16;
  const metrics = [
    {
      label: 'STEEL FRAMING',
      value: project.steelFramingLF ? `${project.steelFramingLF.toLocaleString()} LF` : 'Custom Prep',
      color: [180, 83, 9],
    },
    {
      label: 'DRYWALL BOARDED',
      value: project.drywallSqFt ? `${project.drywallSqFt.toLocaleString()} sq ft` : 'Custom Trade Scope',
      color: [24, 24, 27],
    },
    {
      label: 'ACOUSTIC RATING',
      value: project.soundRatingSTC ? project.soundRatingSTC.split(' ')[0] + ' ' + (project.soundRatingSTC.split(' ')[1] || '') : 'STC Standard',
      color: [180, 83, 9],
    },
    {
      label: 'FINISH LEVEL',
      value: project.finishLevel ? project.finishLevel.split(' ').slice(0, 2).join(' ') : 'Level 4/5 Finish',
      color: [16, 185, 129],
    },
  ];

  metrics.forEach((m, idx) => {
    const x = margin + idx * (boxWidth + 3);
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.roundedRect(x, currentY, boxWidth, boxHeight, 1.5, 1.5, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.setLineWidth(0.2);
    doc.roundedRect(x, currentY, boxWidth, boxHeight, 1.5, 1.5, 'D');

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(m.label, x + 3, currentY + 5);

    doc.setFontSize(8.5);
    doc.setTextColor(m.color[0], m.color[1], m.color[2]);
    doc.text(m.value, x + 3, currentY + 11.5);
  });

  currentY += boxHeight + 6;

  // 5. Executive Summary & Project Challenge
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.2);

  // Executive Summary Box
  doc.roundedRect(margin, currentY, contentWidth, 22, 1.5, 1.5, 'D');
  doc.setFillColor(24, 24, 27);
  doc.roundedRect(margin, currentY, contentWidth, 6, 1.5, 1.5, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('EXECUTIVE PROJECT SUMMARY', margin + 4, currentY + 4.2);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const splitSummary = doc.splitTextToSize(project.summary, contentWidth - 8);
  doc.text(splitSummary, margin + 4, currentY + 10);

  currentY += 26;

  // Engineering Challenge Box
  doc.roundedRect(margin, currentY, contentWidth, 20, 1.5, 1.5, 'D');
  doc.setFillColor(245, 158, 11);
  doc.roundedRect(margin, currentY, contentWidth, 6, 1.5, 1.5, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(24, 24, 27);
  doc.text('ENGINEERING & ARCHITECTURAL CHALLENGE', margin + 4, currentY + 4.2);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const splitChallenge = doc.splitTextToSize(project.challenge, contentWidth - 8);
  doc.text(splitChallenge, margin + 4, currentY + 10);

  currentY += 24;

  // 6. Location-Specific Challenges & Engineered Trade Solution
  if (project.locationChallenges) {
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.roundedRect(margin, currentY, contentWidth, 42, 1.5, 1.5, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.roundedRect(margin, currentY, contentWidth, 42, 1.5, 1.5, 'D');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text('LOCATION-SPECIFIC CHALLENGES & ENGINEERED SOLUTIONS', margin + 4, currentY + 5.5);

    let locY = currentY + 11;
    if (project.locationChallenges.climateOrSoilIssue) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text('Microclimate & Moisture Profile:', margin + 4, locY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      const text = doc.splitTextToSize(project.locationChallenges.climateOrSoilIssue, contentWidth - 55);
      doc.text(text, margin + 48, locY);
      locY += (text.length * 3.5) + 1.5;
    }

    if (project.locationChallenges.bylawOrPermitHurdle) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      doc.text('Municipal Bylaw / Permit Hurdle:', margin + 4, locY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      const text = doc.splitTextToSize(project.locationChallenges.bylawOrPermitHurdle, contentWidth - 55);
      doc.text(text, margin + 48, locY);
      locY += (text.length * 3.5) + 1.5;
    }

    if (project.locationChallenges.engineeredSolution) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 83, 9);
      doc.text('Engineered Trade Solution:', margin + 4, locY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
      const text = doc.splitTextToSize(project.locationChallenges.engineeredSolution, contentWidth - 55);
      doc.text(text, margin + 48, locY);
    }

    currentY += 46;
  }

  // 7. Delivered Trade Specifications Table
  const specsTableData = project.specsDelivered.map((spec, i) => [
    `SPEC-${(i + 1).toString().padStart(2, '0')}`,
    spec,
    i === 0 ? (project.fireRatingULC || 'NFPA 80 / ULC W411') : i === 1 ? (project.soundRatingSTC || 'Verified STC') : (project.finishLevel || 'GA-214 Spec'),
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [[
      'Code',
      'Delivered Scope & Assembly Specification',
      'Code & Performance Standard',
    ]],
    body: specsTableData,
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      cellPadding: 2.2,
      lineColor: [225, 227, 230],
      lineWidth: 0.2,
      textColor: [30, 30, 35],
      font: 'helvetica',
    },
    headStyles: {
      fillColor: [24, 24, 27],
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [250, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 18, fontStyle: 'bold', halign: 'center', textColor: [180, 83, 9] },
      1: { cellWidth: 108 },
      2: { cellWidth: 56, fontStyle: 'bold' },
    },
    margin: { left: margin, right: margin },
  });

  // @ts-expect-error - jspdf-autotable adds lastAutoTable to doc
  let afterTableY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : currentY + 30) + 5;

  // Check if we have enough room for Inspections, Testimonial and Sign-Off block on Page 1, else new page
  if (afterTableY > pageHeight - 65) {
    doc.addPage();
    afterTableY = 20;
  }

  // 8. Passed Municipal Inspections
  if (project.inspectionsPassed && project.inspectionsPassed.length > 0) {
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.roundedRect(margin, afterTableY, contentWidth, 18, 1.5, 1.5, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.roundedRect(margin, afterTableY, contentWidth, 18, 1.5, 1.5, 'D');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text('VERIFIED MUNICIPAL INSPECTIONS PASSED & CODE SIGN-OFFS:', margin + 4, afterTableY + 4.5);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    
    project.inspectionsPassed.slice(0, 4).forEach((insp, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = margin + 4 + col * (contentWidth / 2);
      const y = afterTableY + 9 + row * 4.5;
      doc.text(`• ${insp}`, x, y);
    });

    afterTableY += 22;
  }

  // 9. Client Testimonial (if available)
  if (project.testimonial) {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, afterTableY, contentWidth, 18, 1.5, 1.5, 'D');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text('CLIENT VERIFIED TESTIMONIAL & SOCIAL PROOF:', margin + 4, afterTableY + 4.5);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const quoteText = doc.splitTextToSize(`"${project.testimonial.quote}"`, contentWidth - 8);
    doc.text(quoteText, margin + 4, afterTableY + 9);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`— ${project.testimonial.author}, ${project.testimonial.role} (${project.testimonial.company})`, margin + 4, afterTableY + 15.5);

    afterTableY += 22;
  }

  // 10. Engineering Quality & Submittal Sign-Off Block
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(margin, afterTableY, contentWidth, 18, 1.5, 1.5, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, afterTableY, contentWidth, 18, 1.5, 1.5, 'D');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('ENGINEERING STANDARDS & LIFE-SAFETY CODE COMPLIANCE:', margin + 4, afterTableY + 4.5);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('All assemblies built in strict compliance with BC Building Code 2024, VBBL 2024, NFPA 80, ULC W411, and GA-214 Level 5.', margin + 4, afterTableY + 9);
  doc.text('For tender specifications, bid submittals, or architectural takeoffs, contact: estimating@justdoors.co • buildershaus.com', margin + 4, afterTableY + 13.5);

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(140, 140, 150);

    doc.text(
      'Just Doors & Rambo Wall & Ceilings • Architectural Case Study Overview • Confidential & Proprietary',
      margin,
      pageHeight - 6
    );

    doc.text(
      `Page ${i} of ${totalPages} • Ref: ${refId}`,
      pageWidth - margin,
      pageHeight - 6,
      { align: 'right' }
    );
  }

  // Save the PDF
  const sanitizedTitle = project.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`Project_Overview_${sanitizedTitle}_${refId}.pdf`);
};

function renderTechnicalAndSignoffBlock(doc: jsPDF, startY: number, totalOpenings: number) {
  // Technical Specifications & Code Notes
  doc.setFillColor(245, 246, 248);
  doc.roundedRect(14, startY, 175, 30, 2, 2, 'F');
  doc.setDrawColor(220, 222, 226);
  doc.setLineWidth(0.2);
  doc.roundedRect(14, startY, 175, 30, 2, 2, 'D');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(24, 24, 27);
  doc.text('ENGINEERING & LIFE-SAFETY CODE COMPLIANCE NOTES:', 18, startY + 5);

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 90);
  doc.text('1. Fire-Rated Openings: All 20, 45, 90-min, and 3-hour doors comply with UL 10C / NFPA 80 positive pressure fire test standards.', 18, startY + 11);
  doc.text('2. Factory Pre-Machining: Complete CNC hinge mortising, wire raceway preps, and closer reinforcement plates pre-installed.', 18, startY + 16);
  doc.text('3. Packaging & Logistics: Crated and barcoded floor-by-floor with labeled hardware groupings for direct hoist delivery.', 18, startY + 21);
  doc.text('4. Field Verification: Contractor to verify rough opening framing dimensions and finished floor clearances prior to production.', 18, startY + 26);

  // Submittal Approval Block
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(196, startY, 87, 30, 2, 2, 'F');
  doc.roundedRect(196, startY, 87, 30, 2, 2, 'D');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(24, 24, 27);
  doc.text('SUBMITTAL & TAKEOFF APPROVAL:', 200, startY + 5);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 110);
  doc.text('Approved as Submitted [   ]   Approved with Corrections [   ]', 200, startY + 11);
  doc.text('Sign-Off:', 200, startY + 19);
  doc.line(214, startY + 19, 276, startY + 19);

  doc.text('Date:', 200, startY + 26);
  doc.line(210, startY + 26, 240, startY + 26);
  doc.text(`Total Units: ${totalOpenings}`, 246, startY + 26);
}

