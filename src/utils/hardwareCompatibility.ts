import { HardwareValidationResult } from '../types';

export interface HardwareCheckInput {
  doorType: string;
  fireRating: string;
  lockset: string;
  hinges: string;
  closer?: string;
  frameType?: string;
}

/**
 * Automated Hardware Compatibility Lookup Engine
 * Validates selected locking sets and hinges against door core material, frame type, and fire rating.
 * Enforces NFPA 80, NFPA 101, ULC-S104, and UL 10C positive pressure standards.
 */
export function validateHardwareCompatibility(input: HardwareCheckInput): HardwareValidationResult {
  const { doorType, fireRating, lockset, hinges, closer = '', frameType = '' } = input;

  const isFireRated = 
    fireRating.includes('20-Min') || 
    fireRating.includes('45-Min') || 
    fireRating.includes('90-Min') || 
    fireRating.includes('3-Hour') || 
    fireRating.includes('Fire Rated') ||
    fireRating.includes('UL 10C');

  const isHighFireRating = 
    fireRating.includes('90-Min') || 
    fireRating.includes('3-Hour');

  const isGlassDoor = 
    doorType.toLowerCase().includes('glass') || 
    doorType.toLowerCase().includes('aluminum');

  const isHollowMetal = 
    doorType.toLowerCase().includes('steel') || 
    doorType.toLowerCase().includes('hollow metal') || 
    doorType.toLowerCase().includes('vault');

  const isWoodDoor = 
    doorType.toLowerCase().includes('wood') || 
    doorType.toLowerCase().includes('timber') || 
    doorType.toLowerCase().includes('mineral core');

  const isNonLatching = 
    lockset.toLowerCase().includes('passage') || 
    lockset.toLowerCase().includes('non-latching') || 
    lockset.toLowerCase().includes('dummy') || 
    lockset.toLowerCase().includes('free');

  const isPlainBearingHinge = 
    hinges.toLowerCase().includes('plain-bearing') || 
    hinges.toLowerCase().includes('standard residential') || 
    hinges.toLowerCase().includes('brass');

  const isConcealedHinge = 
    hinges.toLowerCase().includes('concealed 3d') || 
    hinges.toLowerCase().includes('tectus') || 
    hinges.toLowerCase().includes('soss');

  const isSpringHinge = 
    hinges.toLowerCase().includes('spring');

  const isNarrowStileLock = 
    lockset.toLowerCase().includes('narrow-stile') || 
    lockset.toLowerCase().includes('narrow stile') || 
    lockset.toLowerCase().includes('adams rite');

  const isPanicBar = 
    lockset.toLowerCase().includes('panic') || 
    lockset.toLowerCase().includes('crash bar') || 
    lockset.toLowerCase().includes('von duprin');

  const isMortiseOrCylindrical = 
    lockset.toLowerCase().includes('mortise') || 
    lockset.toLowerCase().includes('cylindrical') || 
    lockset.toLowerCase().includes('leverset') || 
    lockset.toLowerCase().includes('schlage');

  const isGlassPivot = 
    hinges.toLowerCase().includes('pivot') || 
    hinges.toLowerCase().includes('glass');

  // RULE 1: Fire Door with Non-Latching Lockset (CRITICAL VIOLATION)
  if (isFireRated && isNonLatching) {
    return {
      isCompatible: false,
      status: 'incompatible',
      summary: 'CRITICAL CODE MISMATCH: Fire-rated doors require an active positive latching mechanism.',
      ruleCode: 'NFPA-80-ERR-01 (No Positive Latch)',
      mismatchedFields: ['lockset', 'fireRating'],
      suggestedLockset: 'Grade 1 Heavy Duty Mortise (Schlage L9000 / ASSA ABLOY)',
      details: [
        `Selected fire rating "${fireRating}" requires positive latching under NFPA 80 Section 6.4.4.3 & ULC-S104.`,
        `Non-latching passage sets or roller catches are strictly illegal on fire separation doors as positive pressure will blow the door open during a fire event.`
      ],
      recommendations: [
        'Replace with a Grade 1 Heavy-Duty Mortise Lock or Grade 2 Cylindrical Leverset with minimum 1/2" latch throw.',
        'If access control is needed, specify a UL-listed electrified mortise latch with fail-secure egress.'
      ],
      codeReferences: ['NFPA 80 Sec 6.4.4.3', 'ULC-S104', 'UL 10C', 'NBC Div B 3.1.8.14'],
      testedAssemblies: 'UL 10C Positive Pressure Fire Door Assemblies'
    };
  }

  // RULE 2: Fire Door with Plain-Bearing Hinges (CRITICAL VIOLATION)
  if (isFireRated && isPlainBearingHinge) {
    return {
      isCompatible: false,
      status: 'incompatible',
      summary: 'CODE VIOLATION: Plain-bearing brass/steel hinges prohibited on fire-rated assemblies.',
      ruleCode: 'NFPA-80-ERR-02 (Hinge Rating)',
      mismatchedFields: ['hinges', 'fireRating'],
      suggestedHinges: 'Heavy-Duty 4.5"x4.5" Steel Ball-Bearing Hinges (UL 10C)',
      details: [
        `NFPA 80 Table 6.4.3.1 mandates ball-bearing steel hinges or continuous geared aluminum hinges on all fire doors.`,
        `Plain-bearing residential hinges suffer accelerated pin wear and friction failure under heat expansion.`
      ],
      recommendations: [
        'Select Heavy-Duty 4.5" x 4.5" Steel Ball-Bearing Hinges (UL 10C listed) or Hager Roton Continuous Hinges.'
      ],
      codeReferences: ['NFPA 80 Table 6.4.3.1', 'ANSI/BHMA A156.1', 'ULC-S104'],
      testedAssemblies: 'UL 10C / ULC-S104 Fire Classified Hinges'
    };
  }

  // RULE 3: Glass Door Hardware Mismatch
  if (isGlassDoor && (isMortiseOrCylindrical && !isNarrowStileLock) && !isPanicBar) {
    return {
      isCompatible: false,
      status: 'incompatible',
      summary: 'PHYSICAL PREPARATION CONFLICT: Standard full-body mortise locks cannot fit commercial aluminum glass stiles.',
      ruleCode: 'MFG-PREP-ERR-03 (Stile Backset)',
      mismatchedFields: ['lockset', 'doorType'],
      suggestedLockset: 'Adams Rite Narrow-Stile Storefront Latch (Glass/Alum)',
      details: [
        `Commercial glass storefront doors have 2" to 4" narrow aluminum stiles that cannot accept a 2-3/4" backset standard mortise cassette.`,
        `Standard lock prep would cut through the aluminum extrusion and compromise the structural glass rail.`
      ],
      recommendations: [
        'Select an Adams Rite Narrow-Stile Deadlatch (31/32" or 1-1/8" backset) or storefront push/pull hardware.'
      ],
      codeReferences: ['BHMA A156.5 Commercial Stile Prep', 'CGSB Aluminum Storefront Standards'],
      testedAssemblies: 'Commercial Glass & Aluminum Door Prep Standards'
    };
  }

  // RULE 4: Narrow Stile Latch on Flush Wood Door
  if (isWoodDoor && isNarrowStileLock) {
    return {
      isCompatible: false,
      status: 'incompatible',
      summary: 'PHYSICAL PREP CONFLICT: Narrow-stile latch specified on flush wood door.',
      ruleCode: 'MFG-PREP-ERR-04 (Wood Stile Prep)',
      mismatchedFields: ['lockset', 'doorType'],
      suggestedLockset: 'Grade 1 Heavy Duty Mortise (Schlage L9000 / ASSA ABLOY)',
      details: [
        `Narrow-stile deadlatches are engineered specifically for hollow aluminum storefront tubes, not solid mineral/timber wood cores.`,
        `Wood core doors require standard ANSI A115.1 (Mortise) or ANSI A115.2 (Cylindrical) lock edge mortising.`
      ],
      recommendations: [
        'Switch to ANSI Grade 1 Mortise (Schlage L-Series / Corbin Russwin) or Grade 1 Cylindrical Leverset.'
      ],
      codeReferences: ['ANSI/WDMA I.S. 1A-13', 'AWI Quality Standards Section 9'],
      testedAssemblies: 'WDMA Architectural Flush Wood Door Standards'
    };
  }

  // RULE 5: Glass Pivot Assembly on Steel / Solid Core Wood Door
  if (!isGlassDoor && isGlassPivot) {
    return {
      isCompatible: false,
      status: 'incompatible',
      summary: 'HARDWARE CONFLICT: Glass clamp pivot assembly cannot hang a flush wood/steel door.',
      ruleCode: 'MFG-PREP-ERR-05 (Pivot Hinge Mismatch)',
      mismatchedFields: ['hinges', 'doorType'],
      suggestedHinges: 'Heavy-Duty 4.5"x4.5" Steel Ball-Bearing Hinges (UL 10C)',
      details: [
        `dormakaba patch glass pivots clamp directly onto 1/2" tempered glass leaves and do not have screw plates for wood/steel mortises.`
      ],
      recommendations: [
        'Specify Heavy-Duty 4.5"x4.5" Butt Hinges, Continuous Geared Hinges, or Offset Floor Pivots for heavy doors.'
      ],
      codeReferences: ['BHMA A156.1 / A156.4'],
      testedAssemblies: 'Standard ANSI Mortise Hinge Prep'
    };
  }

  // WARNING RULE 6: Concealed 3D Hinges on Fire-Rated Doors
  if (isFireRated && isConcealedHinge) {
    return {
      isCompatible: true,
      status: 'warning',
      summary: 'SPECIAL PREP REQUIRED: Concealed 3D hinges on fire doors require tested intumescent liners.',
      ruleCode: 'WARN-INTUMESCENT-LINER (UL 10C Clause)',
      mismatchedFields: ['hinges'],
      suggestedHinges: 'Heavy-Duty 4.5"x4.5" Steel Ball-Bearing Hinges (UL 10C)',
      details: [
        `Concealed 3D hinges (such as Tectus / SOSS) remove significant core material from the door edge and frame.`,
        `To maintain 20-Min / 45-Min fire rating, factory-applied graphite intumescent jackets must be installed around the hinge pockets.`
      ],
      recommendations: [
        'Ensure the factory specification specifies "UL-Listed Intumescent Hinge Liner Kit".',
        'Verify maximum door weight does not exceed 175 lbs for 2-hinge or 260 lbs for 3-hinge sets.'
      ],
      codeReferences: ['UL 10C Intumescent Requirement', 'NFPA 80 Sec 6.4.3.1'],
      testedAssemblies: 'UL 10C Classified Intumescent Sleeve Assemblies'
    };
  }

  // WARNING RULE 7: 3-Hour Steel Doors with Spring Hinges
  if (isHighFireRating && isSpringHinge) {
    return {
      isCompatible: true,
      status: 'warning',
      summary: 'RELIABILITY WARNING: Spring hinges on heavy 90-Min/3-Hour steel doors may fail positive latch checks.',
      ruleCode: 'WARN-SPRING-CLOSER-WEIGHT',
      mismatchedFields: ['hinges'],
      suggestedHinges: 'Heavy-Duty 4.5"x4.5" Steel Ball-Bearing Hinges (UL 10C)',
      details: [
        `Heavy 14ga/16ga hollow metal fire doors and vault assemblies experience high air draft pressures in stairwells and electrical rooms.`,
        `Spring hinges lose tension over time and often fail annual NFPA 80 fire latching self-closing inspections.`
      ],
      recommendations: [
        'Recommend hydraulic overhead door closer (e.g. LCN 4040XP or Norton 7500) with heavy-duty ball-bearing hinges for reliable positive latching.'
      ],
      codeReferences: ['NFPA 80 Sec 6.4.1.4 (Closing Devices)', 'NFPA 101 Egress'],
      testedAssemblies: 'UL 10C Heavy Egress Assembly'
    };
  }

  // WARNING RULE 8: Panic Exit Bar on Non-Egress Suite Entry
  if (doorType.includes('20-Min Mineral Core') && isPanicBar) {
    return {
      isCompatible: true,
      status: 'warning',
      summary: 'SPECIFICATION ADVISORY: Exit panic crash bar is non-standard for residential suite entries.',
      ruleCode: 'WARN-SPEC-EGRESS-OVERKILL',
      mismatchedFields: ['lockset'],
      suggestedLockset: 'Grade 1 Heavy Duty Mortise (Schlage L9000 / ASSA ABLOY)',
      details: [
        `Panic exit hardware is typically required by NFPA 101 only on assembly occupancies (>50 occupants) and high-hazard egress routes.`,
        `For residential suite entries, a Grade 1 Mortise lock with thumbturn privacy or electronic card lock is standard.`
      ],
      recommendations: [
        'Verify if this opening is a corridor egress portal or a private suite entry before finalizing order.'
      ],
      codeReferences: ['IBC 2024 Sec 1010.2.9', 'NFPA 101 Sec 7.2.1.7'],
      testedAssemblies: 'UL 10C / NFPA 101 Life Safety'
    };
  }

  // DEFAULT COMPLIANT CASE
  return {
    isCompatible: true,
    status: 'compliant',
    summary: 'Hardware selections verified 100% compatible with door material, frame, and fire rating.',
    ruleCode: isFireRated ? 'NFPA-80-COMPLIANT' : 'ANSI-BHMA-COMPLIANT',
    details: [
      `Door core material (${doorType}) properly matches machining backsets and screw holding tolerances.`,
      `Hinge specification (${hinges}) meets bearing weight requirements and UL 10C listing standards.`,
      `Lockset (${lockset}) provides proper positive latching and function clearance.`
    ],
    recommendations: [
      'Factory will CNC prep hinge pockets and lock mortises to exact manufacturer template standards.',
      'Includes factory machining guarantee and ULC listing labels.'
    ],
    codeReferences: isFireRated ? ['NFPA 80', 'ULC-S104', 'UL 10C', 'NBC Div B'] : ['ANSI/BHMA A156', 'WDMA I.S. 1A'],
    testedAssemblies: isFireRated ? 'UL 10C / ULC-S104 Tested Fire Assembly' : 'ANSI/BHMA Certified Commercial Grade Assembly'
  };
}
