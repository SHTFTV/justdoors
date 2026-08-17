export interface FAQItem {
  id: string;
  category: 'fire-ratings' | 'specifications' | 'hardware' | 'logistics';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  specs?: { label: string; value: string }[];
  codeReferences?: string[];
  tags: string[];
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-fire-ratings-levels',
    category: 'fire-ratings',
    categoryLabel: 'Fire Ratings & Codes',
    question: 'What are the standard fire ratings for commercial and high-rise doors?',
    shortAnswer: 'Standard commercial fire ratings range from 20-minute corridor suite entries up to 3-hour (180-minute) occupancy separation assemblies tested to UL 10C and NFPA 80.',
    detailedAnswer: 'Commercial and multi-family fire doors must be rated according to the wall assembly they penetrate: \n\n• 20-Minute (1/3 hr): Typically used in 1-hour corridor walls for multi-family unit entries (smoke and draft control, NFPA 105).\n• 45-Minute (3/4 hr): 1-hour fire partitions, room dividers, and exterior walls with moderate exposure.\n• 60-Minute (1 hr): 1-hour occupancy separations and multi-family common exit access corridors.\n• 90-Minute (1.5 hr): 2-hour fire barrier walls, stairwell enclosures, elevator shafts, and critical egress paths.\n• 180-Minute (3 hr): 3-hour and 4-hour firewalls, electrical transformer vaults, and major building subdivision separations.',
    specs: [
      { label: 'Suite Entry Doors', value: '20-Min (Wood or Steel)' },
      { label: 'Stairwell Enclosures', value: '90-Min (Hollow Metal or Mineral Core)' },
      { label: 'Mechanical / Vaults', value: '180-Min (Heavy 16/14 Ga Steel)' },
      { label: 'Positive Pressure Standard', value: 'UL 10C / ASTM E119 / NFPA 252' },
    ],
    codeReferences: ['NFPA 80 (Standard for Fire Doors)', 'NFPA 105 (Smoke Door Assemblies)', 'IBC 2024 Chapter 7'],
    tags: ['UL 10C', '20-Min', '90-Min', '3-Hour', 'Stairwells', 'NFPA 80'],
  },
  {
    id: 'faq-temperature-rise',
    category: 'fire-ratings',
    categoryLabel: 'Fire Ratings & Codes',
    question: 'When is a Temperature Rise door core required instead of standard mineral core?',
    shortAnswer: 'Temperature Rise doors (limiting unexposed face heat to 250°F or 450°F at 30 mins) are mandatory in multi-story stairwell enclosures and vertical shaft openings to protect occupants evacuating tall buildings.',
    detailedAnswer: 'Under IBC Section 716.2.2.3, fire door assemblies in interior exit stairways, ramps, and exit passageways in multi-story buildings must restrict heat transmission to 250°F (or 450°F where fully sprinklered) above ambient temperature for the first 30 minutes of fire exposure. \n\nWithout a temperature-rise core, the non-fire side of a metal door can radiate extreme heat (>1000°F), igniting clothing or causing severe burns to occupants descending stairwells during an evacuation. We manufacture mineral-insulated and specialized composite temperature rise doors specifically labeled for this code mandate.',
    specs: [
      { label: 'Stairwell Evacuation Code', value: 'IBC 716.2.2.3' },
      { label: 'Standard Rating', value: '250°F Rise @ 30 min (Max safety)' },
      { label: 'Sprinklered Option', value: '450°F Rise @ 30 min' },
    ],
    codeReferences: ['IBC 2024 Section 716', 'NFPA 252', 'UL 10C Test Procedures'],
    tags: ['Temperature Rise', '250°F Core', 'High-Rise Stairwells', 'IBC 716'],
  },
  {
    id: 'faq-field-modifications',
    category: 'fire-ratings',
    categoryLabel: 'Fire Ratings & Codes',
    question: 'Can fire-rated doors or frames be trimmed or cut on the jobsite?',
    shortAnswer: 'Strictly limited. NFPA 80 permits maximum 3/4" bottom undercut on non-combustible sills and 1/8" top/side clearance. Field machining holes larger than 1" diameter voids the UL/WHI certification.',
    detailedAnswer: 'Under NFPA 80 (Section 4.1.3), jobsite modifications to listed fire door assemblies are strictly prohibited unless performed under certified field inspection services. Permitted field work is restricted to: \n\n1. Trimming of wood fire doors: Limited strictly to bottom rail only (up to 3/4" max clearance above finished floor or noncombustible threshold). Top and stiles cannot be trimmed if edge bands or intumescents are pierced. \n2. Preparation for listed surface-applied hardware (e.g., surface closers, kick plates up to 16" high). \n3. Field drilling round holes: Maximum 1" diameter for cylinder preps or viewer peepholes. \n\nMortising lock pockets, cutting vision lite glass openings, or modifying hinge preps on site immediately revokes the fire label. Just Doors performs all preparations in our certified factory machining facility with valid Intertek/UL labels.',
    specs: [
      { label: 'Permitted Bottom Undercut', value: '3/4" Max (1/2" with Smoke Seal)' },
      { label: 'Permitted Top/Side Gap', value: '1/8" (±1/16")' },
      { label: 'Field Vision Lite Cuts', value: 'STRICTLY FORBIDDEN by NFPA 80' },
    ],
    codeReferences: ['NFPA 80 Clause 4.1.3 (Modifications)', 'Intertek Warnock Hersey Spec Manual'],
    tags: ['Field Modifications', 'NFPA 80', 'UL Labeling', 'Undercuts'],
  },
  {
    id: 'faq-door-cores',
    category: 'specifications',
    categoryLabel: 'Door Specifications',
    question: 'What are the main architectural door core materials, and where should each be specified?',
    shortAnswer: 'The four dominant cores are Solid Particleboard (cost-effective interior), Solid Mineral Core (fire rating 45-90 min), Structural Composite Lumber/SCL (high impact & screw-holding), and Insulated Polystyrene/Honeycomb (exterior hollow metal).',
    detailedAnswer: 'Specifying the correct core balances fire ratings, acoustic isolation (STC), weight, and cycle durability: \n\n• Particleboard Core (PC): Ideal for standard 20-minute multi-family unit entries and non-rated interior residential doors. Excellent flat surface and sound dampening at economical cost. \n• Structural Composite Lumber (SCL): Superior screw holding strength without internal blocking. Recommended for heavy commercial traffic, school classrooms, and hospitality suites. \n• Mineral Core (MC): Non-combustible mineral composition required for 45-minute, 60-minute, and 90-minute fire ratings. Requires dedicated internal wood/composite lock blocks for screw retention. \n• Hollow Metal Insulated (Polystyrene / Polyurethane): R-value thermal barrier for exterior commercial entry portals. Polyurethane cores provide up to R-11.0 thermal insulation with severe weather resistance. \n• Steel Honeycomb / Ribbed Steel: Maximum deflection resistance and rigidity for high-abuse industrial, institutional, and detention facilities.',
    specs: [
      { label: 'Acoustic Rating (STC)', value: 'Particleboard STC 32-35 | Acoustic Core STC 45-55' },
      { label: 'Thermal Performance', value: 'Polyurethane Core U-value ≤ 0.28' },
      { label: 'Standard Thickness', value: '1-3/4" (Commercial) | 1-3/8" (Res Interior)' },
    ],
    codeReferences: ['WDMA I.S. 1A (Architectural Flush Wood Doors)', 'HMMA 860 / 861 (Hollow Metal Cores)'],
    tags: ['Door Cores', 'Mineral Core', 'Particleboard', 'Polystyrene', 'STC Ratings'],
  },
  {
    id: 'faq-frame-throat-jambs',
    category: 'specifications',
    categoryLabel: 'Door Specifications',
    question: 'How do you determine Hollow Metal frame jamb depth and throat dimension?',
    shortAnswer: 'Jamb depth equals finished wall thickness plus 1/8" to 1/4" allowance. Knock-down dry-wall frames use a specific throat size that slides over gypsum board, whereas welded masonry frames are built to exact wall depth.',
    detailedAnswer: 'Proper frame specification prevents gap issues and alignment errors: \n\n1. Knock-Down Drywall Frames (KD-DW): Sized by "Throat Opening" (distance between returns). For example, a 3-5/8" steel stud with 5/8" drywall on both sides equals 4-7/8" wall thickness; the proper frame throat is 4-7/8" with a 5-7/8" overall jamb depth. \n2. Welded Masonry Frames (Set-Up & Welded): Typically 5-3/4" or 8-1/4" jamb depth with standard 2" faces and wire masonry anchors for concrete block or poured walls. \n3. Adjustable Steel Frames: 2-piece split frames allowing ±1/2" adjustability on irregular finished openings.',
    specs: [
      { label: 'Standard 3-5/8" Stud + (2) 5/8" GWB', value: '4-7/8" Throat / 5-7/8" Jamb' },
      { label: 'Standard 6" Stud + (2) 5/8" GWB', value: '7-1/4" Throat / 8-1/4" Jamb' },
      { label: 'Steel Gauge', value: '16 Gauge (Standard Commercial) | 14 Gauge (Heavy Duty)' },
    ],
    codeReferences: ['SDI-100 (Steel Door Institute)', 'NAAMM / HMMA 810'],
    tags: ['Jamb Depth', 'Throat Dimension', 'Hollow Metal', 'Knock-Down', 'Welded Frames'],
  },
  {
    id: 'faq-hardware-grade-1-vs-2',
    category: 'hardware',
    categoryLabel: 'Hardware & Electrification',
    question: 'What is the difference between ANSI/BHMA Grade 1 and Grade 2 architectural hardware?',
    shortAnswer: 'Grade 1 hardware is heavy-duty commercial grade tested to 1,000,000 cycles for high-traffic corridors and high-rise portals. Grade 2 is standard commercial tested to 400,000 cycles for moderate interior rooms.',
    detailedAnswer: 'ANSI/BHMA standards establish rigorous performance, strength, and durability benchmarks for locks, exit devices, and closers: \n\n• ANSI/BHMA Grade 1: Highest durability tier. Tested to 1,000,000 operational cycles, withstands 1,400 lbs of lateral load on latches, and meets high-impact abuse resistance. Mandatory for main building entries, multi-family common lobbies, high-rise stairwells, school hallways, and hospital corridors. \n• ANSI/BHMA Grade 2: Tested to 400,000 cycles with 800 lbs lateral load resistance. Designed for lighter commercial applications such as interior office doors, residential storage rooms, and moderate-traffic tenant utility rooms. \n• ANSI/BHMA Grade 3: Tested to 200,000 cycles for light-duty single-family interior doors. Never specified in commercial or multi-family common areas.',
    specs: [
      { label: 'Grade 1 Operational Cycles', value: '1,000,000 Cycles (BHMA Certified)' },
      { label: 'Grade 2 Operational Cycles', value: '400,000 Cycles' },
      { label: 'Lock Type Comparison', value: 'Mortise Locks (Exceed 3,000,000 Cycles)' },
    ],
    codeReferences: ['ANSI/BHMA A156.2 (Bored Locks)', 'ANSI/BHMA A156.13 (Mortise Locks)', 'ANSI/BHMA A156.4 (Closers)'],
    tags: ['Grade 1', 'Grade 2', 'ANSI/BHMA', 'Mortise Locks', 'Durability'],
  },
  {
    id: 'faq-access-control-electrified',
    category: 'hardware',
    categoryLabel: 'Hardware & Electrification',
    question: 'How do you coordinate electrified access control with fire rating and life safety egress codes?',
    shortAnswer: 'Life safety always trumps security. Electrified exit devices and locks must ensure single-motion mechanical egress at all times, with fail-safe release on fire alarm activation under NFPA 101 and IBC Section 1010.',
    detailedAnswer: 'Coordinating low-voltage access control requires strict adherence to building and fire codes: \n\n1. Single-Motion Egress (IBC 1010.2.1): Occupants must be able to exit a space with one unlatching motion without keys, specialized knowledge, or physical effort exceeding 5 lbf. \n2. Fail-Safe vs. Fail-Secure: \n   • Fail-Safe (Power Off = Unlocked): Required on stairwell re-entry doors so evacuating occupants can re-enter floors if blocked by smoke, and firefighters can enter. \n   • Fail-Secure (Power Off = Locked from exterior, always free mechanical egress from interior): Used for secure tenant entries and perimeter portals. \n3. Fire Alarm Interlock: Magnetic locks (maglocks) and delayed-egress devices MUST tie into the building Fire Alarm Control Panel (FACP) to drop power automatically during a fire event. \n4. Factory Preps: We drill continuous internal raceways (3/8" or 1/2") through doors for Electrified Power Transfers (EPT) or electric hinges before applying UL fire labels.',
    specs: [
      { label: 'Max Opening Force (ADA)', value: '5 lbf (Interior Non-Rated) | Fire Door Spring Latch' },
      { label: 'Power Transfer Methods', value: 'EPT (Concealed), Electric Hinge, Armored Loop' },
      { label: 'Stairwell Re-Entry Mandate', value: 'IBC 1010.2.7 (Electrified Fail-Safe Release)' },
    ],
    codeReferences: ['IBC 2024 Chapter 10 (Means of Egress)', 'NFPA 101 (Life Safety Code)', 'UL 294 (Access Control Systems)'],
    tags: ['Access Control', 'Life Safety', 'Electric Strikes', 'Stairwell Re-Entry', 'ADA Compliance'],
  },
  {
    id: 'faq-schedule-submittal-timeline',
    category: 'logistics',
    categoryLabel: 'Lead Times & Estimating',
    question: 'How does the door schedule takeoff and submittal approval process work for General Contractors?',
    shortAnswer: 'Submit your architectural door schedule and floor plans. We generate a complete line-by-line hardware submittal and cut-sheet package within 24-48 hours, followed by phased jobsite crate delivery organized by floor and opening mark number.',
    detailedAnswer: 'We streamline the commercial procurement workflow: \n\n1. Takeoff & Estimate (24-48 hrs): Upload PDF/Excel schedules. Our architectural hardware consultants (AHC) review fire codes, frame depths, wall types, and hardware compatibility, providing guaranteed lump-sum pricing. \n2. Submittal & Shop Drawings: We provide comprehensive architectural submittal packages including frame elevations, handing charts, hardware cut sheets, electrical wiring schematics, and finish samples for architect review. \n3. Phased High-Rise Packaging: To prevent jobsite chaos, doors, frames, and hardware sets are labeled with Opening Mark Numbers (e.g., Door #204B) and crated by floor/sequence for just-in-time delivery according to your construction schedule. \n4. Quick-Ship vs Custom: Standard hollow metal frames and prepped 20-min wood doors ship in 3-5 business days; custom architectural veneers and oversized assemblies ship in 3-5 weeks.',
    specs: [
      { label: 'Estimating Turnaround', value: '24 to 48 Hours' },
      { label: 'Submittal Approval Package', value: 'Includes Full Cut Sheets & Wiring Schematics' },
      { label: 'Jobsite Packaging', value: 'Pre-Sorted by Floor & Mark Number' },
    ],
    codeReferences: ['CSI Division 08 11 00 (Metal Doors)', 'CSI Division 08 14 00 (Wood Doors)', 'CSI Division 08 71 00 (Door Hardware)'],
    tags: ['Submittals', 'Door Schedules', 'Lead Times', 'GC Estimating', 'Phased Delivery'],
  },
];
