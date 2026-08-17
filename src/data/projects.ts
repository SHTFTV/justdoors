import { ProjectCaseStudy } from '../types';

export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: 'vancouver-alberni-commercial',
    title: 'Alberni Financial & Tech Commercial TI',
    subtitle: '38,000 sq ft High-Rise Steel Framing, T-Bar & Level 5 Drywall TI',
    location: 'Downtown Vancouver — Alberni & Burrard Corridor',
    municipalitySlug: 'vancouver',
    municipalityName: 'City of Vancouver',
    clientType: 'Developer & GC',
    sector: 'commercial',
    budgetTier: '$250k+',
    budgetEstimate: '$345,000 CAD',
    budgetAmount: 345000,
    steelFramingLF: 24600,
    drywallSqFt: 86400,
    finishLevel: 'Level 5 Full Polymer Skim Coat',
    fireRatingULC: '2-Hour Elevator Core & 1-Hour Corridor Demising (ULC W411)',
    soundRatingSTC: 'STC 56 Acoustic Isolation (Boardrooms & Executive Suites)',
    summary: 'Turnkey steel stud framing, multi-tier suspended drywall ceilings, acoustic T-Bar grids, and raking-light Level 5 drywall finishing for a premier financial technology headquarters in Downtown Vancouver.',
    challenge: 'Accommodating heavy high-rise concrete slab live-load deflection without wall cracking, coupled with floor-to-ceiling glass demising walls requiring 100% flat Level 5 surfaces under extreme floor-to-ceiling south-facing raking daylight.',
    locationChallenges: {
      climateOrSoilIssue: 'Coastal downtown ocean moisture requiring calibrated dehumidification and temporary thermal management during Level 5 mud curing.',
      bylawOrPermitHurdle: 'Strict City of Vancouver Building By-law (VBBL 2024) inspection sign-offs requiring independent deflection track fastener shear verification.',
      seismicOrStructuralConstraint: 'Deep-leg 2.5" slotted deflection tracks with engineered Teflon slide clips to absorb ±1.25" post-tensioned slab deflection without drywall buckling.',
      engineeredSolution: 'Installed 20-gauge heavy-flange steel studs with Bailey slotted deflection tracks, double-layer 5/8" Type X drywall mounted on RC-1 resilient channels with Roxul AFB insulation, followed by a continuous machine-sprayed and hand-wiped vinyl polymer Level 5 skim coat.'
    },
    solution: 'Engineered slotted deflection track assemblies that absorbed structural floor slab movement, while applying full polymer Level 5 skim coats inspected under 500-watt raking halogen lamps for zero joint photographing.',
    specsDelivered: [
      '24,600 LF 3-5/8" & 6" 20ga/18ga Heavy Flange Steel Stud Framing',
      '86,400 sq ft 5/8" CGC Sheetrock Type X & Type C Firecode Drywall',
      '14,200 sq ft Armstrong Silhouette 9/16" Suspended Acoustical T-Bar Grid',
      'Continuous 100% Level 5 Surface Skim Finish (GA-214 Class 5 Specification)',
      'ULC W411 2-Hour Rated Firestop & Intumescent Sealant at Slab Head-of-Wall',
    ],
    inspectionsPassed: [
      'City of Vancouver Steel Stud Framing & Deflection Track Inspection (VBBL #48102)',
      'Acoustic Insulation & Poly Vapour Barrier Pre-Cover Verification',
      'ULC 2-Hour Firestopping Pre-Board Inspection Sign-Off',
      'Final Level 5 Architectural Finish Quality Handover'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Completed Executive Suite with Level 5 skim and acoustic hollow metal subframe openings.',
        tag: 'Architectural Handover'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Heavy 18ga slotted deflection track rough openings and laser-aligned steel studs.',
        tag: 'Deflection Track Framing'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Armstrong 9/16" Silhouette acoustic grid integration and drywall perimeter returns.',
        tag: 'Ceiling Grid & Perimeter'
      },
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: 'ULC W411 2-Hour rated elevator corridor fire separations under 3-coat finish.',
        tag: 'Fire-Rated Corridor'
      }
    ],
    mapLocation: {
      x: 62,
      y: 38,
      district: 'Downtown Financial Center',
      city: 'City of Vancouver',
      doorTypesSupplied: [
        'Level 5 Continuous Skim Finish',
        '20ga Slotted Deflection Track Systems',
        'Armstrong 9/16" T-Bar Acoustic Grid',
        'ULC W411 2-Hour Fire Assemblies',
      ],
      buildingType: '38,000 sq ft Commercial High-Rise TI',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'Rambo Wall & Ceilings delivered the cleanest Level 5 skim we have seen in downtown Vancouver. Under harsh south-facing raking light, not a single drywall tape seam or fastener head is visible.',
      author: 'Marcus Vance',
      role: 'Senior Project Manager',
      company: 'Pinnacle High-Rise Construction Group',
    },
  },
  {
    id: 'burnaby-brentwood-mixed-use',
    title: 'Brentwood Town Centre Podium & Strata',
    subtitle: '6-Storey Commercial Podium & Multi-Family Residential Tower Framing',
    location: 'Brentwood Town Centre — Willingdon & Lougheed',
    municipalitySlug: 'burnaby',
    municipalityName: 'City of Burnaby',
    clientType: 'Developer & GC',
    sector: 'high-rise',
    budgetTier: '$250k+',
    budgetEstimate: '$580,000 CAD',
    budgetAmount: 580000,
    steelFramingLF: 42000,
    drywallSqFt: 145000,
    finishLevel: 'Level 4 Smooth Paint & Level 5 Amenities',
    fireRatingULC: '1-Hour Suite Demising (ULC W407) & 2-Hour Shaftliner (ULC W415)',
    soundRatingSTC: 'STC 58 Strata Demising Party Walls',
    summary: 'Comprehensive light-gauge steel framing, corridor demising partitions, shaftliner elevator shafts, and high-efficiency mechanical taping for a major mixed-use high-rise podium development in Burnaby.',
    challenge: 'Tight crane staging windows on Lougheed Highway and meeting City of Burnaby stringent sound transmission standards (STC 58+) between ground-floor retail amenities and second-floor residential suites.',
    locationChallenges: {
      climateOrSoilIssue: 'Heavy winter rain staging requiring specialized moisture-resistant mold-tough board (ASTM C1396) on all perimeter podium walls before envelope seal.',
      bylawOrPermitHurdle: 'City of Burnaby Building Department requirement for rigorous field acoustic testing (FSTC) prior to drywall pre-cover occupancy sign-off.',
      seismicOrStructuralConstraint: 'Podium transfer slab differential settlement requiring flexible structural tie-backs and slotted slip-track clips along all demising walls.',
      engineeredSolution: 'Constructed staggered-stud 2x4 steel framing on 6" tracks with dual 3-1/2" Roxul AFB acoustic batts and two layers of 5/8" Type X drywall on RC-1 resilient channels with acoustical sealant beads on all four perimeters.'
    },
    solution: 'Utilized automated mechanical taping bazookas and flat boxes to achieve 145,000 sq ft of Level 4 drywall finishing 12 business days ahead of master schedule, achieving verified STC 60 field acoustic performance.',
    specsDelivered: [
      '42,000 LF 25ga & 20ga Interior Partition & Shaftliner Steel Framing',
      '145,000 sq ft 5/8" Type X CGC Sheetrock & Aquaroc Mold-Resistant Board',
      '28,500 LF Resilient Sound Isolation Channels (RC-1) with Acoustic Putty Pads',
      '18,000 sq ft Suspended Dropped Ceiling Bulkheads & Light Coves',
      'Mechanical Drywall Finishing to GA-214 Level 4 & Level 5 Standards',
    ],
    inspectionsPassed: [
      'City of Burnaby Steel Stud Framing Inspection (Permit #BLD24-00892)',
      'Party Wall STC 58 Acoustic & Firestopping Pre-Board Inspection',
      'Elevator Shaftliner 2-Hour Fire Integrity Sign-Off',
      'Burnaby Fire Department Life Safety & Corridor Egress Clearance'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: 'Completed 6-storey podium facade with rated corridor demising separations and acoustic doors.',
        tag: 'Podium Exterior & Handover'
      },
      {
        url: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
        caption: 'Staggered-stud 2x4 steel framing on 6" tracks with dual Roxul AFB acoustic batts.',
        tag: 'Acoustic Party Wall Framing'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Elevator shaftliner 2-hour ULC W415 core installation with vertical slip clips.',
        tag: 'Shaftliner Fire Core'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Completed amenity lounge with Level 5 smooth skim and recessed cove lighting bulkheads.',
        tag: 'Level 5 Amenity Lounge'
      }
    ],
    mapLocation: {
      x: 68,
      y: 42,
      district: 'Brentwood Town Centre',
      city: 'City of Burnaby',
      doorTypesSupplied: [
        'Staggered-Stud Acoustic Framing',
        'Level 4 Mechanical Finish',
        '2-Hour Shaftliner Elevator Core',
        'Seismic Dropped Ceiling Bulkheads',
      ],
      buildingType: '6-Storey Mixed-Use Podium & Tower',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'Mason and his crew ran circles around our original schedule. Their knowledge of Burnaby acoustic bylaws and shaftliner fire details saved us weeks of rework.',
      author: 'Siddharth Mehta',
      role: 'Senior Project Director',
      company: 'Urban Crest Developments',
    },
  },
  {
    id: 'richmond-city-centre-retail',
    title: 'Richmond City Centre Commercial Plaza & Medical Hub',
    subtitle: '52,000 sq ft Commercial Retail & Health Clinic Acoustic Build-Out',
    location: 'Richmond City Centre — No. 3 Road Corridor',
    municipalitySlug: 'richmond',
    municipalityName: 'City of Richmond',
    clientType: 'Commercial Enterprise',
    sector: 'commercial',
    budgetTier: '$250k+',
    budgetEstimate: '$420,000 CAD',
    budgetAmount: 420000,
    steelFramingLF: 31000,
    drywallSqFt: 110000,
    finishLevel: 'Level 4 Healthcare & Level 5 Retail Facades',
    fireRatingULC: '1-Hour & 2-Hour Medical Occupancy Separation',
    soundRatingSTC: 'STC 62 Doctor Consultation Rooms & Audiology Suites',
    summary: 'Full structural steel stud framing, seismic T-Bar ceiling installation, lead-lined X-ray drywall installation, and high-performance sound attenuation for medical clinics and retail units on No. 3 Road.',
    challenge: 'Dealing with Richmond high water table and peat soil seismic design category E requirements, which mandated heavy-duty seismic splay wire grids on all suspended T-Bar ceilings (ASTM E580).',
    locationChallenges: {
      climateOrSoilIssue: 'Richmond coastal river delta humidity creating slower joint compound drying times; solved by deploying commercial desiccant dehumidifiers to prevent joint cracking.',
      bylawOrPermitHurdle: 'City of Richmond seismic inspection requirements requiring stamped P.Eng seismic clip drawings for all wall framing over 10ft high.',
      seismicOrStructuralConstraint: 'Seismic Design Category E requiring heavy 12-gauge 45-degree splay wires, compression rigid struts, and 2-inch perimeter wall channel clearance.',
      engineeredSolution: 'Engineered heavy-gauge 16ga boxed stud framing anchored with Hilti seismic wedge anchors, coupled with Armstrong seismic RX clip ceiling grids with 4-way diagonal splay bracing.'
    },
    solution: 'Executed lead-lined drywall boarding (1/16" and 1/8" Pb sheet) with overlapping lead strips and passed all Richmond health authority radiation shielding tests with zero deficiencies on first inspection.',
    specsDelivered: [
      '31,000 LF 3-5/8" & 6" 18ga/16ga Heavy Gauge Steel Studs with Structural Bridging',
      '110,000 sq ft 5/8" Type X Firecode & Abuse-Resistant High-Density Drywall',
      '3,800 sq ft Lead-Lined Radiation Shielding Drywall for Diagnostic X-Ray Suites',
      '22,000 sq ft Heavy-Duty ASTM E580 Seismic T-Bar Acoustical Grid & Tiles',
      'Zero-VOC Anti-Microbial Level 4 Paint-Ready Wall Finish',
    ],
    inspectionsPassed: [
      'City of Richmond Building & Seismic Framing Inspection (#RIC-2024-519)',
      'Radiation Protection Authority Lead Shielding Barrier Certification',
      'ASTM E580 Suspended T-Bar Ceiling Seismic Splay Wire Inspection',
      'Final Occupancy Level 4/5 Architectural Sign-Off'
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Healthcare clinic reception with anti-microbial Level 4 drywall and lead-shielded door frames.',
        tag: 'Medical Reception Area'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Diagnostic imaging suite with 1/8" lead sheet overlapping barriers and heavy door jamb anchors.',
        tag: 'Radiation Shielding & Jambs'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Seismic Design Category E heavy 12-gauge 45-degree splay wires and Armstrong RX clips.',
        tag: 'Seismic T-Bar Grid'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: 'STC 62 doctor consultation room demising walls with resilient channels and double drywall.',
        tag: 'STC 62 Sound Isolation'
      }
    ],
    mapLocation: {
      x: 55,
      y: 56,
      district: 'Richmond City Centre',
      city: 'City of Richmond',
      doorTypesSupplied: [
        'Lead-Lined Diagnostic Drywall',
        'ASTM E580 Seismic T-Bar Ceilings',
        '16ga Heavy Structural Steel Studs',
        'STC 62 Medical Isolation Assemblies',
      ],
      buildingType: '52,000 sq ft Healthcare & Commercial Centre',
      yearCompleted: '2024',
    },
    testimonial: {
      quote: 'The Richmond seismic grid requirements are notoriously strict. Rambo Wall & Ceilings had the engineered shop drawings ready and passed the seismic wire inspection on the first walkthrough.',
      author: 'Dr. Kimberly Adams',
      role: 'Facilities Director',
      company: 'Richmond Health Sciences Pavilion',
    },
  },
  {
    id: 'surrey-city-centre-highrise',
    title: 'Surrey City Centre Gateway High-Rise',
    subtitle: '36-Storey Residential & Commercial Tower Drywall & Steel Framing Package',
    location: 'Surrey City Centre — King George Blvd & 104 Ave',
    municipalitySlug: 'surrey',
    municipalityName: 'City of Surrey',
    clientType: 'Developer & GC',
    sector: 'high-rise',
    budgetTier: '$250k+',
    budgetEstimate: '$960,000 CAD',
    budgetAmount: 960000,
    steelFramingLF: 68000,
    drywallSqFt: 240000,
    finishLevel: 'Level 4 Rapid-Taped & Level 5 Penthouse Skim',
    fireRatingULC: '1-Hour Suite Corridors & 2-Hour Stairwell Shafts (ULC W411)',
    soundRatingSTC: 'STC 57 Party Walls',
    summary: 'Massive scale steel stud framing, corridor demising walls, multi-level parkade fire separations, and penthouse architectural bulkheads for a high-profile Surrey City Centre skyline tower.',
    challenge: 'Coordinating high-speed production across 36 consecutive floors with scheduled crane hook time, while maintaining strict adherence to City of Surrey screw spacing inspection audits (8" edge / 12" field).',
    locationChallenges: {
      climateOrSoilIssue: 'Rapid weather transitions in Fraser Valley corridor causing fluctuating ambient humidity during winter boarding phases.',
      bylawOrPermitHurdle: 'City of Surrey Fire Department rigorous pre-cover checks on all intumescent firestop collars around mechanical penetrations.',
      seismicOrStructuralConstraint: 'Wind sway loads on top 8 storeys requiring slotted deflection head-of-wall tracks with 1-1/2" vertical travel capacity.',
      engineeredSolution: 'Deployed dedicated framing and boarding strike teams with laser-guided track layouts, automated drywall lifters, and pneumatic auto-feed screw guns calibrated to exact depth.'
    },
    solution: 'Finished all 36 storeys 3 weeks ahead of the GC dryline milestone with an average of 99.4% first-time inspection pass rate across all City of Surrey building inspections.',
    specsDelivered: [
      '68,000 LF 25ga & 20ga Steel Stud Interior Drywall Partition Systems',
      '240,000 sq ft 5/8" Type X Firecode Gypsum Panels',
      '48,000 LF Resilient Channels (RC-1) with Roxul Safe\'n\'Sound Insulation',
      '3,200 LF Custom Curved Architectural Dropped Ceiling Bulkheads',
      'Full Level 5 Skim Finishing on All 4 Penthouse Suites & 2-Storey Lobby',
    ],
    inspectionsPassed: [
      'City of Surrey Steel Stud Framing Inspection (#SRY-BLD-88219)',
      'Screw Spacing Pattern & Pre-Tape Pre-Cover Inspection',
      'Surrey Fire Department 2-Hour Egress Separation Sign-Off',
      'Final Architectural Level 4/5 Handover Inspection'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: '36-storey residential tower exterior skyline — 240,000 sq ft drywall boarding package.',
        tag: 'Skyline High-Rise'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-speed automated mechanical taping and auto-feed screw framing across 36 consecutive storeys.',
        tag: 'Production Framing'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Curved dropped ceiling bulkheads in 2-storey tower lobby with full Level 5 finish.',
        tag: 'Tower Lobby Bulkheads'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: '2-Hour egress stairwell shaft walls and ULC firestop pre-cover verification.',
        tag: '2-Hour Stairwell Core'
      }
    ],
    mapLocation: {
      x: 72,
      y: 65,
      district: 'Surrey City Centre',
      city: 'City of Surrey',
      doorTypesSupplied: [
        '36-Storey Tower Drywall Package',
        '240,000 sq ft Type X Boarding',
        'High-Travel Deflection Tracks',
        'Curved Architectural Bulkheads',
      ],
      buildingType: '36-Storey Residential & Commercial Tower',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'Rambo Wall & Ceilings manned the site with 28 journeymen and kept our tower moving at a blistering pace. Their framing lines were dead plumb and our painters flew right behind them.',
      author: 'Derek Lindstrom',
      role: 'General Superintendent',
      company: 'Fraser Valley High-Rise Constructors',
    },
  },
  {
    id: 'north-van-shipyards-commercial',
    title: 'North Vancouver Shipyards Waterfront Creative TI',
    subtitle: '22,000 sq ft Architectural Heavy Steel Framing, Black T-Bar & Level 5',
    location: 'Lower Lonsdale / Shipyards District — North Vancouver',
    municipalitySlug: 'north-vancouver-city',
    municipalityName: 'City of North Vancouver',
    clientType: 'Commercial Enterprise',
    sector: 'commercial',
    budgetTier: '$50k-$250k',
    budgetEstimate: '$185,000 CAD',
    budgetAmount: 185000,
    steelFramingLF: 16400,
    drywallSqFt: 58000,
    finishLevel: 'Level 5 Ultra-Smooth Charcoal Architectural Paint',
    fireRatingULC: '1-Hour Demising (ULC W407) & Exposed Heritage Firestops',
    soundRatingSTC: 'STC 55 Media Production & Podcast Studios',
    summary: 'Custom heavy-gauge architectural framing, exposed black-grid acoustic ceilings, floating cloud drywall canopies, and Level 5 finishing for a waterfront creative agency in the Shipyards.',
    challenge: 'High 18-foot open-concept ceilings requiring structural 16-gauge steel stud bracing anchored to heritage timber beams, paired with ultra-dark charcoal paint finishes that reveal any minor joint flaw.',
    locationChallenges: {
      climateOrSoilIssue: 'Marine salt air environment in Burrard Inlet requiring galvanized steel components (G60 minimum) and anti-corrosive fasteners.',
      bylawOrPermitHurdle: 'City of North Vancouver heritage conservation bylaws requiring specialized non-destructive seismic anchoring to existing heavy timber.',
      seismicOrStructuralConstraint: '18ft free-standing partition walls requiring engineered cold-rolled channel horizontal stiffeners and diagonal kickers.',
      engineeredSolution: 'Constructed custom boxed 6" 16ga studs with continuous 1-1/2" CRC bridging through stud knockouts, finished with Level 5 full skim and raking-light inspection.'
    },
    solution: 'Designed and hung 14 floating acoustic drywall cloud ceilings with concealed LED perimeter returns and delivered flawless Level 5 surfaces ready for high-gloss dark architectural paint.',
    specsDelivered: [
      '16,400 LF 6" 16ga & 3-5/8" 20ga Heavy Structural Steel Stud Framing',
      '58,000 sq ft 5/8" Type X Firecode Gypsum Panels',
      '14x Custom Floating Gypsum Acoustic Cloud Ceilings with Knife-Edge Trim',
      '8,500 sq ft USG Donn DX Matte Black 15/16" Suspended Acoustical Grid',
      '100% Level 5 Surface Skim Finish Inspected Under Raking Halogen Light',
    ],
    inspectionsPassed: [
      'City of North Vancouver Structural Framing & Timber Tie-In Inspection',
      'Burrard Inlet Marine Corrosion Resistance Fastener Audit',
      'Floating Ceiling Seismic Drop Wire & Safety Chain Certification',
      'Final Level 5 Finish Architectural Sign-Off'
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: '18ft free-standing partition walls with USG Donn DX matte black acoustic ceiling grid.',
        tag: 'Black T-Bar & 18ft Partitions'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Floating acoustic drywall clouds with concealed LED returns and knife-edge trims.',
        tag: 'Floating Acoustic Clouds'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Custom boxed 6" 16ga studs with continuous 1-1/2" cold-rolled channel bridging.',
        tag: 'Heavy Structural Studs'
      },
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: 'Level 5 full skim finish inspected under raking halogen light for dark charcoal paint.',
        tag: 'Level 5 Raking Light Inspection'
      }
    ],
    mapLocation: {
      x: 64,
      y: 28,
      district: 'Shipyards Waterfront District',
      city: 'City of North Vancouver',
      doorTypesSupplied: [
        '18ft High Structural Steel Partitions',
        'Level 5 Ultra-Smooth Finish',
        'Floating Drywall Cloud Canopies',
        'Matte Black Acoustic T-Bar Grid',
      ],
      buildingType: '22,000 sq ft Creative Agency Headquarters',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'Our brand designer specified matte black walls and floating ceilings. Only Rambo Wall & Ceilings had the skill to deliver a Level 5 finish that looks flawless under direct directional lighting.',
      author: 'David Chen',
      role: 'Principal Architect & Founder',
      company: 'Burrard Studio Architecture',
    },
  },
  {
    id: 'west-van-british-properties-luxury',
    title: 'British Properties Contemporary Architectural Estate',
    subtitle: '12,500 sq ft Ultra-Luxury Residence — Zero-Trim & Negative Reveal Detailing',
    location: 'British Properties / Chartwell — West Vancouver',
    municipalitySlug: 'west-vancouver',
    municipalityName: 'District of West Vancouver',
    clientType: 'Custom Homeowner',
    sector: 'residential',
    budgetTier: '$50k-$250k',
    budgetEstimate: '$165,000 CAD',
    budgetAmount: 165000,
    steelFramingLF: 14200,
    drywallSqFt: 38000,
    finishLevel: 'Level 5 Museum Grade Flawless Skim',
    fireRatingULC: '1-Hour Mechanical Room & Attached Garage Fire Separations',
    soundRatingSTC: 'STC 64 Home Theater & Primary Suite Acoustic Enclosure',
    summary: 'Ultra-precision steel stud framing, Fry Reglet architectural negative reveals, zero-casing drywall door returns, and full Level 5 museum-grade finishes for a bespoke luxury estate in West Vancouver.',
    challenge: 'Zero allowable tolerance for shadowlines (1/2" x 1/2" Fry Reglet aluminum reveals around all baseboards, door frames, and ceiling perimeters) on massive sloped bedrock topography.',
    locationChallenges: {
      climateOrSoilIssue: 'West Vancouver mountain slope high precipitation and humidity requiring conditioned space heating and laser moisture testing before mudding.',
      bylawOrPermitHurdle: 'District of West Vancouver strict environmental and noise bylaws restricting site operational hours.',
      seismicOrStructuralConstraint: 'Sloped terrain concrete foundation step-downs requiring custom steel stud length micro-trimming to maintain continuous laser-level ceiling planes.',
      engineeredSolution: 'Used heavy 20ga structural studs with laser-calibrated Fry Reglet Z-reveal beads and installed triple-layer 5/8" drywall on Green Glue sound damping compound for the private cinema.'
    },
    solution: 'Delivered laser-straight negative reveal lines across all 12,500 sq ft and achieved a museum-grade Level 5 continuous smooth finish with zero waviness or butt-joint crowning.',
    specsDelivered: [
      '14,200 LF 20ga Steel Framing & Engineered Header Assemblies',
      '38,000 sq ft 5/8" CGC Type X & QuietRock 530 High-Impact Acoustic Gypsum',
      '4,800 LF Fry Reglet 1/2" Negative Reveal Baseboard & Ceiling Shadowlines',
      'Green Glue Viscoelastic Acoustic Damping on Primary Suite & Cinema Walls',
      'Museum-Grade Level 5 Hand-Polished Skim Finish',
    ],
    inspectionsPassed: [
      'District of West Vancouver Framing & Seismic Tie-Down Inspection',
      'West Van Fire Department Garage Separation Pre-Cover Sign-Off',
      'Acoustic STC 64 Home Cinema Sound Isolation Test Passed',
      'Architectural Zero-Tolerance Shadowline Reveal Final Review'
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        caption: '12,500 sq ft contemporary architectural estate exterior and completed Level 5 drywall.',
        tag: 'Architectural Estate Handover'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        caption: 'Fry Reglet 1/2" aluminum negative reveal baseboard and zero-casing flush door return.',
        tag: 'Negative Reveal Shadowline'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'STC 64 private home cinema with triple-layer 5/8" QuietRock on Green Glue viscoelastic compound.',
        tag: 'STC 64 Cinema Acoustic Enclosure'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Laser-calibrated structural 20ga steel framing headers and micro-trimmed step-down studs.',
        tag: 'Precision Steel Stud Framing'
      }
    ],
    mapLocation: {
      x: 50,
      y: 22,
      district: 'British Properties Highlands',
      city: 'District of West Vancouver',
      doorTypesSupplied: [
        'Fry Reglet Negative Reveal Details',
        'Museum-Grade Level 5 Finish',
        'QuietRock STC 64 Cinema Acoustic Walls',
        'Zero-Casing Flush Door Returns',
      ],
      buildingType: '12,500 sq ft Luxury Architectural Estate',
      yearCompleted: '2024',
    },
    testimonial: {
      quote: 'The drywall craftsmanship in this home is extraordinary. Every shadowline reveal is razor sharp, and the sound isolation in our primary suite is completely silent.',
      author: 'Julian & Claire Sterling',
      role: 'Homeowners',
      company: 'Private Residence, West Vancouver',
    },
  },
  {
    id: 'coquitlam-town-centre-commercial',
    title: 'Coquitlam City Centre Corporate & Medical Pavilion',
    subtitle: '44,000 sq ft 4-Storey Office & Clinic Steel Framing and T-Bar Package',
    location: 'Coquitlam Town Centre — Pinetree Way & High Street',
    municipalitySlug: 'coquitlam',
    municipalityName: 'City of Coquitlam',
    clientType: 'Developer & GC',
    sector: 'commercial',
    budgetTier: '$250k+',
    budgetEstimate: '$375,000 CAD',
    budgetAmount: 375000,
    steelFramingLF: 28500,
    drywallSqFt: 96000,
    finishLevel: 'Level 4 Paint-Ready & Level 5 Executive Boardrooms',
    fireRatingULC: '1-Hour & 2-Hour Floor-to-Floor Separations',
    soundRatingSTC: 'STC 54 Commercial Office Partitions',
    summary: 'Complete multi-floor commercial interior fit-out featuring heavy steel stud wall assemblies, full perimeter deflection tracks, suspended Armstrong acoustic ceilings, and fire-taped shaft walls.',
    challenge: 'Strict City of Coquitlam fire separation inspections at perimeter slab edges and coordinating multiple mechanical duct pass-throughs through rated demising partitions.',
    locationChallenges: {
      climateOrSoilIssue: 'Coquitlam Town Centre elevation weather shifts causing temperature fluctuations on uninsulated upper floors during rough-in.',
      bylawOrPermitHurdle: 'City of Coquitlam Fire Rescue requirement for verified ULC-tested firestop detail tags on every MEP penetration.',
      seismicOrStructuralConstraint: 'Curved concrete curtain wall perimeter requiring custom faceted steel stud framing and curved drywall trims.',
      engineeredSolution: 'Pre-engineered steel stud bulkheads with 3M CP 25WB+ intumescent firestop sealant and installed 9/16" Armstrong Fine Fissured acoustic ceilings with seismic hold-down clips.'
    },
    solution: 'Passed all City of Coquitlam pre-board and firestop inspections on first call, delivering 96,000 sq ft of seamless drywall surfaces ready for prime coat.',
    specsDelivered: [
      '28,500 LF 3-5/8" & 6" 20ga Steel Stud Framing with Lateral Bracing',
      '96,000 sq ft 5/8" Type X Firecode Gypsum Panels',
      '16,000 sq ft Armstrong 9/16" Fine Fissured Acoustic T-Bar Ceilings',
      '2,400 LF Intumescent Firestop Sealant along All Floor Slab Interfaces',
      'Level 4 Mechanical Finish with Level 5 Upgrades on Boardroom Ceilings',
    ],
    inspectionsPassed: [
      'City of Coquitlam Steel Framing & Deflection Inspection (#COQ-2024-812)',
      'MEP Firestop Penetration & Pre-Cover Sign-Off',
      'Seismic T-Bar Ceiling Splay Wire Inspection',
      'Final Occupancy Drywall Sign-Off'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Completed 4-storey commercial office interior with Armstrong 9/16" acoustic grid ceilings.',
        tag: 'Commercial Office Handover'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Heavy 20ga steel stud partition framing with structural bridging and electrical cutouts.',
        tag: 'Steel Partition Framing'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Faceted curved curtain wall bulkhead detailing and perimeter intumescent firestopping.',
        tag: 'Curved Wall Detailing'
      },
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: 'Floor-to-floor 2-hour ULC rated firestop sealant verification and sign-off.',
        tag: '2-Hour ULC Firestop'
      }
    ],
    mapLocation: {
      x: 78,
      y: 38,
      district: 'Coquitlam Town Centre',
      city: 'City of Coquitlam',
      doorTypesSupplied: [
        'Commercial Steel Stud TI',
        'Armstrong Fine Fissured T-Bar',
        'ULC Rated Floor-to-Floor Firestops',
        'Faceted Curved Wall Drywall Detailing',
      ],
      buildingType: '44,000 sq ft 4-Storey Office & Clinic Pavilion',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'Rambo Wall & Ceilings provided proactive solutions for our curved exterior walls. Their framing was millimeter-perfect and passed Coquitlam inspections seamlessly.',
      author: 'Brent Hollingsworth',
      role: 'Project Director',
      company: 'Tri-City Commercial Builders',
    },
  },
  {
    id: 'abbotsford-industrial-commercial',
    title: 'Abbotsford Campbell Heights Industrial Park Distribution Centre',
    subtitle: '78,000 sq ft Industrial Tilt-Up Commercial Office & 2-Hour Demising Wall',
    location: 'Abbotsford / Mt. Lehman Commercial Corridor',
    municipalitySlug: 'abbotsford',
    municipalityName: 'City of Abbotsford',
    clientType: 'Commercial Enterprise',
    sector: 'commercial',
    budgetTier: '$250k+',
    budgetEstimate: '$490,000 CAD',
    budgetAmount: 490000,
    steelFramingLF: 36000,
    drywallSqFt: 128000,
    finishLevel: 'Level 4 Commercial High-Durability & Level 5 Showroom',
    fireRatingULC: '2-Hour High-Bay Warehouse Demising Wall (ULC W411 / 28ft Clear Height)',
    soundRatingSTC: 'STC 58 Warehouse-to-Office Acoustic Barrier',
    summary: 'Massive 28-foot tall steel stud high-bay warehouse demising walls, 2-hour ULC fire separations, mezzanine framing, and commercial office TIs for a logistics distribution centre in Abbotsford.',
    challenge: 'Engineering and framing 28-foot tall continuous steel stud walls without intermediate structural steel columns, while meeting Fraser Valley seismic wind and racking criteria.',
    locationChallenges: {
      climateOrSoilIssue: 'Fraser Valley agricultural soil and wind tunnel conditions creating high wind suction loads on high-bay tilt-up joints.',
      bylawOrPermitHurdle: 'City of Abbotsford Fire Rescue requirement for full 2-hour independent fire separation between hazardous warehouse storage and occupied offices.',
      seismicOrStructuralConstraint: '28-foot clear span requiring engineered 6" 14-gauge structural steel studs with double cold-rolled channel bridging at 4-foot vertical intervals.',
      engineeredSolution: 'Erected 14-gauge heavy structural studs with P.Eng stamped bridging, double-layer 5/8" Type X drywall on both sides, fire-taped with 3-coat compound system from scissor lifts.'
    },
    solution: 'Completed 128,000 sq ft of high-bay fire demising and office drywall in 22 working days with zero safety incidents, passing all City of Abbotsford industrial inspections.',
    specsDelivered: [
      '36,000 LF 6" 14ga & 16ga Heavy High-Bay Structural Steel Studs',
      '128,000 sq ft 5/8" CGC Type X Firecode Gypsum Panels',
      '28ft High 2-Hour ULC W411 Continuous Fire Demising Separation',
      '18,500 sq ft Heavy-Duty Vinyl-Faced Washable Cleanroom T-Bar Grid',
      'High-Impact Abuse-Resistant Drywall on All Forklift Corridor Passes',
    ],
    inspectionsPassed: [
      'City of Abbotsford 28ft High-Bay Structural Framing & Bridging Sign-Off',
      'Abbotsford Fire Rescue 2-Hour Demising Wall Pre-Cover Inspection',
      'Seismic Lateral Bracing & Top Deflection Connection Inspection',
      'Final Industrial Occupancy Handover'
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        caption: '78,000 sq ft logistics distribution centre with 28ft high 2-hour ULC fire demising wall.',
        tag: 'High-Bay Demising Wall'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Heavy 14-gauge 6" structural studs with stamped CRC bridging and scissor-lift installation.',
        tag: '14ga Heavy Framing'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mezzanine office commercial fit-out with washable vinyl-faced cleanroom T-Bar grid.',
        tag: 'Mezzanine Office TI'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-impact abuse-resistant drywall at all forklift passes and industrial traffic zones.',
        tag: 'Abuse-Resistant Boarding'
      }
    ],
    mapLocation: {
      x: 88,
      y: 72,
      district: 'Mt. Lehman Commercial Corridor',
      city: 'City of Abbotsford',
      doorTypesSupplied: [
        '28ft High 2-Hour Fire Demising Wall',
        '14ga Heavy Structural Steel Studs',
        'Abuse-Resistant High-Impact Drywall',
        'Cleanroom Washable T-Bar Grid',
      ],
      buildingType: '78,000 sq ft Industrial Logistics Centre',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'Framing a 28ft high wall requires serious horsepower and engineering know-how. Rambo Wall & Ceilings had the scissor lifts rolling and finished our 2-hour wall well ahead of the tilt-up handover.',
      author: 'Troy MacIntyre',
      role: 'Vice President of Construction',
      company: 'Fraser Pacific Logistics Developments',
    },
  },
  {
    id: 'langley-willoughby-strata-mixed-use',
    title: 'Township of Langley Willoughby Mixed-Use Village',
    subtitle: '5-Storey Residential Wood-Frame with Commercial Steel Framing & Acoustic Drywall',
    location: 'Willoughby Town Centre — 208 St & 80 Ave',
    municipalitySlug: 'township-of-langley',
    municipalityName: 'Township of Langley',
    clientType: 'Developer & GC',
    sector: 'high-rise',
    budgetTier: '$250k+',
    budgetEstimate: '$460,000 CAD',
    budgetAmount: 460000,
    steelFramingLF: 32000,
    drywallSqFt: 118000,
    finishLevel: 'Level 4 Production Drywall & Level 5 Amenity Clubhouse',
    fireRatingULC: '1-Hour Suite Corridors & 2-Hour Parkade Concrete Transitions',
    soundRatingSTC: 'STC 57 Resilient Channel Acoustic System',
    summary: 'Ground-floor commercial steel framing, 5 storeys of multi-family residential drywall boarding, resilient soundproofing channels, and Level 5 finish on a 2-storey community clubhouse in Langley.',
    challenge: 'Managing mass timber shrinkage differential at the ground-floor steel-to-wood structural interface and eliminating footfall and corridor sound transmission.',
    locationChallenges: {
      climateOrSoilIssue: 'Langley clay subsoils and seasonal moisture requiring strict humidity control during drywall drying phases.',
      bylawOrPermitHurdle: 'Township of Langley Building Division strict acoustic framing and fire-stop verification checklists.',
      seismicOrStructuralConstraint: 'Wood-frame structural settling requiring expandable telescoping slip tracks at all corridor header junctions.',
      engineeredSolution: 'Installed telescoping 20ga slip-tracks with 1" vertical play and applied dual-bead acoustical sealant on all perimeter track baseplates.'
    },
    solution: 'Achieved verified STC 57 soundproofing on all suite-to-suite party walls and passed all Township of Langley pre-cover inspections with zero red-tags.',
    specsDelivered: [
      '32,000 LF 25ga/20ga Interior Drywall Framing & Telescoping Slip Tracks',
      '118,000 sq ft 5/8" Type X Firecode Gypsum Panels',
      '24,000 LF Resilient Sound Channels (RC-1) with Acoustic Mineral Wool',
      '6,500 sq ft Dropped Bulkheads & Architectural Lighting Coves',
      'Level 5 Smooth Skim on 2-Storey Amenity Clubhouse & Fitness Centre',
    ],
    inspectionsPassed: [
      'Township of Langley Steel Stud & Slip-Track Inspection (#TOL-2024-991)',
      'Acoustic Insulation & Resilient Channel Pre-Cover Sign-Off',
      'Langley Fire Department 1-Hour Corridor Fire Separation Clearance',
      'Final Architectural Drywall & Taping Quality Handover'
    ],
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Completed 5-storey mixed-use development with commercial steel framing at grade.',
        tag: 'Mixed-Use Community'
      },
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: 'Telescoping 20ga slip tracks with 1" vertical play to absorb wood-frame settlement.',
        tag: 'Telescoping Slip Tracks'
      },
      {
        url: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
        caption: 'Resilient channels (RC-1) and acoustic mineral wool batts for STC 57 suite sound isolation.',
        tag: 'Acoustic Soundproofing'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Level 5 full skim on 2-storey amenity clubhouse and fitness centre ceilings.',
        tag: 'Level 5 Clubhouse Skim'
      }
    ],
    mapLocation: {
      x: 82,
      y: 68,
      district: 'Willoughby Town Centre',
      city: 'Township of Langley',
      doorTypesSupplied: [
        'Telescoping Slip-Track Framing',
        'RC-1 Resilient Acoustic Channels',
        'Level 5 Clubhouse Skim Finish',
        '1-Hour Corridor Fire Separations',
      ],
      buildingType: '5-Storey Mixed-Use & Residential Community',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'Mason and the Rambo team know wood-frame multi-family inside and out. Their telescoping slip-tracks eliminated all our drywall cracking concerns as the building settled.',
      author: 'Jason Vanderhook',
      role: 'Project Director',
      company: 'Valley Crest Developments',
    },
  },
  {
    id: 'delta-tilbury-marine-commercial',
    title: 'Delta Tilbury Industrial & Maritime Marine Logistics TI',
    subtitle: '48,000 sq ft Heavy Steel Stud, Corrosion-Resistant Framing & 2-Hour Fire Walls',
    location: 'Tilbury Industrial Park / River Road — Delta',
    municipalitySlug: 'delta',
    municipalityName: 'City of Delta',
    clientType: 'Commercial Enterprise',
    sector: 'commercial',
    budgetTier: '$50k-$250k',
    budgetEstimate: '$240,000 CAD',
    budgetAmount: 240000,
    steelFramingLF: 26000,
    drywallSqFt: 88000,
    finishLevel: 'Level 4 Industrial Cleanroom & Level 5 Boardrooms',
    fireRatingULC: '2-Hour Hazardous Storage Demising (ULC W411)',
    soundRatingSTC: 'STC 56 Heavy Machinery Acoustic Damping',
    summary: 'Heavy-gauge galvanized steel framing (G90 coating), moisture-resistant drywall boarding, 2-hour ULC fire separations, and washable T-Bar ceiling grids for a riverfront maritime facility in Delta.',
    challenge: 'High Fraser River marine humidity and aggressive salt/chemical moisture requiring heavy G90 zinc-galvanized framing and mold/mildew resistant gypsum boarding.',
    locationChallenges: {
      climateOrSoilIssue: 'Fraser River delta high water table and damp air requiring G90 galvanized steel and fiberglass-mat DensArmor Plus gypsum board.',
      bylawOrPermitHurdle: 'City of Delta Community Planning & Development strict industrial environmental firestop audits.',
      seismicOrStructuralConstraint: 'River silt soil seismic amplification requiring heavy 14ga seismic clips and diagonal bracing on all 20ft tall interior partitions.',
      engineeredSolution: 'Constructed G90 galvanized heavy-gauge 16ga studs with stainless steel fasteners and installed Georgia-Pacific DensArmor Plus moisture-proof board with epoxy-based joint tape.'
    },
    solution: 'Delivered an ultra-durable, moisture-proof, 2-hour fire-rated industrial interior that passed all City of Delta environmental and building inspections.',
    specsDelivered: [
      '26,000 LF G90 Galvanized Heavy-Gauge 16ga/18ga Steel Stud Framing',
      '88,000 sq ft 5/8" DensArmor Plus Fiberglass-Mat Mold-Resistant Board',
      '14,000 sq ft Heavy-Duty Washable Vinyl-Faced T-Bar Grid & Tiles',
      '2-Hour ULC W411 Fire-Rated Demising Wall with Intumescent Firestopping',
      'Level 4 & Level 5 Industrial Commercial Smooth Finishes',
    ],
    inspectionsPassed: [
      'City of Delta Structural Steel & Galvanized Fastener Audit (#DLT-2024-411)',
      'Delta Fire & Emergency Services 2-Hour Separation Pre-Cover Clearance',
      'Seismic Splay Wire & Rigid Strut T-Bar Inspection',
      'Final Industrial Occupancy Handover'
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Riverfront maritime logistics interior with G90 galvanized heavy framing and fire barriers.',
        tag: 'Maritime Facility Handover'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'G90 galvanized 16ga steel studs and stainless fasteners for marine corrosion resistance.',
        tag: 'G90 Galvanized Framing'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'DensArmor Plus mold-resistant fiberglass gypsum panels installed with epoxy joint compound.',
        tag: 'Mold-Proof Drywall'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: '2-Hour ULC W411 hazardous storage separation wall with intumescent perimeter seals.',
        tag: 'Hazardous Storage Fire Wall'
      }
    ],
    mapLocation: {
      x: 58,
      y: 68,
      district: 'Tilbury Industrial Park',
      city: 'City of Delta',
      doorTypesSupplied: [
        'G90 Galvanized Heavy Steel Studs',
        'DensArmor Plus Mold-Resistant Board',
        '2-Hour ULC Fire Separation',
        'Washable Vinyl-Faced T-Bar Ceilings',
      ],
      buildingType: '48,000 sq ft Maritime & Industrial Logistics Facility',
      yearCompleted: '2024',
    },
    testimonial: {
      quote: 'Working along the Fraser River requires special attention to moisture and corrosion. Rambo Wall & Ceilings specified the exact G90 galvanized studs and DensArmor board needed to ensure our building lasts for decades.',
      author: 'Captain Nathan Ross',
      role: 'Director of Marine Operations',
      company: 'Pacific Maritime Logistics Ltd.',
    },
  },
  {
    id: 'anmore-heritage-estate-luxury',
    title: 'Anmore Country Estate Architectural Timber & Steel Framing',
    subtitle: '10,800 sq ft Custom Estate — Curved Drywall Ceilings & Level 5 Skim',
    location: 'Anmore / Heritage Mountain — Village of Anmore',
    municipalitySlug: 'anmore',
    municipalityName: 'Village of Anmore',
    clientType: 'Custom Homeowner',
    sector: 'residential',
    budgetTier: '$50k-$250k',
    budgetEstimate: '$140,000 CAD',
    budgetAmount: 140000,
    steelFramingLF: 11500,
    drywallSqFt: 32000,
    finishLevel: 'Level 5 Ultra-Smooth Museum Finish',
    fireRatingULC: '1-Hour Mechanical & Attached 4-Car Garage Fire Separation',
    soundRatingSTC: 'STC 62 Master Suite & Acoustic Music Room',
    summary: 'Curved barrel-vault drywall ceilings, heavy-gauge steel stud framing tied into mass timber post-and-beam architecture, and Level 5 raking-light finishes for an expansive luxury estate in Anmore.',
    challenge: 'Framing high-radius curved ceilings intersecting heavy timber roof trusses with high seasonal humidity swings in the rainforest microclimate above Buntzen Lake.',
    locationChallenges: {
      climateOrSoilIssue: 'Anmore rainforest microclimate with elevated rainfall requiring commercial heaters and continuous moisture tracking before mudding.',
      bylawOrPermitHurdle: 'Village of Anmore building inspection strict fire-stopping envelope checks between garage and upper living suites.',
      seismicOrStructuralConstraint: 'Mass timber settling requiring flex-track radius framing to prevent drywall seam tension cracks along cathedral ceilings.',
      engineeredSolution: 'Engineered flex-c-trac curving steel tracks with 2 layers of 1/4" CGC Sheetrock Flexible gypsum board, taped with fiberglass mesh and topped with 3 coats of full vinyl Level 5 skim.'
    },
    solution: 'Engineered custom radius drywall barrel vaults and seamless shadowlines that accommodate natural wood movement while delivering a flawless Level 5 paint-ready surface.',
    specsDelivered: [
      '11,500 LF 20ga Structural Steel Framing & Flex-C-Trac Radius Ceilings',
      '32,000 sq ft 5/8" Type X Firecode & 1/4" Flexible Architectural Drywall',
      '3,200 LF Fry Reglet Architectural Shadowline Baseboards',
      'Full Level 5 Hand-Wiped Polymer Surface Skim Finish',
      'STC 62 Resilient Channel Soundproofing with Acoustic Mineral Wool',
    ],
    inspectionsPassed: [
      'Village of Anmore Framing & Seismic Tie-In Inspection (#ANM-2024-118)',
      'Anmore Fire Services 1-Hour Attached Garage Separation Clearance',
      'Architectural Radius Ceiling & Level 5 Handover Sign-Off'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: '10,800 sq ft custom timber estate with curved drywall barrel vault ceilings.',
        tag: 'Architectural Vault Ceiling'
      },
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Level 5 full vinyl hand-wiped skim on 24ft cathedral ceilings under raking chandelier light.',
        tag: 'Cathedral Level 5 Skim'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        caption: 'Flex-C-Trac curving steel tracks with double-layer 1/4" flexible gypsum board.',
        tag: 'Flex-C-Trac Radius Framing'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'STC 62 acoustic soundproofing on primary master suite and private music studio.',
        tag: 'STC 62 Music Studio'
      }
    ],
    mapLocation: {
      x: 74,
      y: 32,
      district: 'Heritage Mountain Highlands',
      city: 'Village of Anmore',
      doorTypesSupplied: [
        'Curved Radius Drywall Ceilings',
        'Level 5 Museum Finish',
        'Fry Reglet Architectural Reveal Beads',
        'STC 62 Music Room Soundproofing',
      ],
      buildingType: '10,800 sq ft Custom Estate',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'The curved barrel-vault ceiling in our great room is a masterpiece. Mason and his team brought engineering precision to our architect’s most complex details.',
      author: 'Evelyn & Robert Zhao',
      role: 'Homeowners',
      company: 'Private Residence, Anmore',
    },
  },
  {
    id: 'new-west-queensborough-strata',
    title: 'New Westminster Queensborough Riverfront Strata',
    subtitle: '4-Storey Multi-Family Wood-Frame & Commercial Steel Framing Package',
    location: 'Queensborough Riverfront — Ewen Ave & Boyd St',
    municipalitySlug: 'new-westminster',
    municipalityName: 'City of New Westminster',
    clientType: 'Developer & GC',
    sector: 'multi-family',
    budgetTier: '$250k+',
    budgetEstimate: '$390,000 CAD',
    budgetAmount: 390000,
    steelFramingLF: 29000,
    drywallSqFt: 105000,
    finishLevel: 'Level 4 Rapid-Taped Multi-Family & Level 5 Penthouse',
    fireRatingULC: '1-Hour Suite Demising (ULC W407) & 2-Hour Parkade Egress (ULC W411)',
    soundRatingSTC: 'STC 58 Strata Party Walls with Resilient Sound Isolators',
    summary: 'High-density multi-family steel stud corridors, party wall acoustic isolation assemblies, mechanical duct fire wraps, and production drywall finishing for 84 riverfront strata homes in New Westminster.',
    challenge: 'High water table alluvial silt soil with high seismic liquefaction amplification and strict City of New Westminster sound transmission testing (STC 58+).',
    locationChallenges: {
      climateOrSoilIssue: 'Lulu Island alluvial silt subsoil requiring flexible head-of-wall seismic slip tracks to isolate partition walls during ground settling.',
      bylawOrPermitHurdle: 'City of New Westminster Building Division mandatory third-party acoustic field testing (ASTC) prior to occupancy.',
      seismicOrStructuralConstraint: 'Seismic Design Category D riverfront ground motion requiring heavy 20ga boxed corridor door headers with diagonal seismic kickers.',
      engineeredSolution: 'Installed 20ga heavy-duty corridor studs on seismic slotted deflection tracks, double 5/8" Type X drywall with offset staggered seams, RC-1 resilient channels, and Roxul Safe\'n\'Sound insulation.'
    },
    solution: 'Passed all City of New Westminster field acoustic and fire inspections on initial review, maintaining zero schedule delay across all 4 storeys and 84 residential units.',
    specsDelivered: [
      '29,000 LF 25ga & 20ga Steel Stud Interior Framing & Telescoping Deflection Tracks',
      '105,000 sq ft 5/8" Type X CGC Firecode & Water-Resistant Gypsum Panels',
      '22,000 LF Resilient Sound Isolation Channels with Acoustic Putty Box Pads',
      'ULC W407 1-Hour Fire-Rated Strata Party Walls & 2-Hour Stairwell Core',
      'GA-214 Level 4 Smooth Paint Finish throughout All 84 Suites',
    ],
    inspectionsPassed: [
      'City of New Westminster Steel Stud & Slip-Track Inspection (#NW-BLD-77341)',
      'Party Wall Field Acoustic ASTC 58 Sound Isolation Testing Passed',
      'New West Fire Department 1-Hour Corridor Separation Clearance',
      'Final Multi-Family Occupancy Sign-Off'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: '84-unit riverfront multi-family strata community with fire-rated corridor partitions.',
        tag: '84-Unit Strata Handover'
      },
      {
        url: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
        caption: 'Party wall acoustic isolation with RC-1 channels, acoustic putty pads, and staggered seams.',
        tag: 'ASTC 58 Field Tested'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Seismic slotted deflection tracks and heavy 20ga boxed door headers with kickers.',
        tag: 'Seismic Door Headers'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Production mechanical taping achieving GA-214 Level 4 finish across all suites.',
        tag: 'Level 4 Production Drywall'
      }
    ],
    mapLocation: {
      x: 66,
      y: 52,
      district: 'Queensborough Riverfront',
      city: 'City of New Westminster',
      doorTypesSupplied: [
        '84-Unit Multi-Family Drywall Package',
        'Telescoping Seismic Slip Tracks',
        'ASTC 58 Field-Tested Soundproofing',
        'ULC W407 1-Hour Strata Party Walls',
      ],
      buildingType: '4-Storey 84-Unit Multi-Family Strata',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'Meeting New West’s acoustic bylaws can be a nightmare if the trade doesn’t understand resilient channel details. Rambo Wall & Ceilings executed with zero flanking paths.',
      author: 'Colin Gallagher',
      role: 'Senior Project Manager',
      company: 'Fraser River Infill Developments',
    },
  },
  {
    id: 'kitsilano-duplex-infill-residential',
    title: 'Kitsilano Point Modern Infill Duplex & Laneway',
    subtitle: '6,400 sq ft Multi-Tier Framing, Zero-Clearance Sound Separation & Level 5',
    location: 'Kitsilano — Point Grey Rd Corridor, Vancouver',
    municipalitySlug: 'vancouver',
    municipalityName: 'City of Vancouver',
    clientType: 'Custom Homeowner',
    sector: 'residential',
    budgetTier: '<$50k',
    budgetEstimate: '$48,000 CAD',
    budgetAmount: 48000,
    steelFramingLF: 4800,
    drywallSqFt: 18500,
    finishLevel: 'Level 5 Ultra-Smooth Architectural Finish',
    fireRatingULC: '1-Hour Party Wall & Attached Garage ULC Separation',
    soundRatingSTC: 'STC 59 Zero-Flanking Party Wall Isolation',
    summary: 'Precision interior steel stud basement framing, resilient channel acoustic ceiling drops, and museum-grade Level 5 drywall for a modern side-by-side duplex in Kitsilano.',
    challenge: 'Ultra-compact urban infill lot with tight sound transmission bylaws (STC 58+) between side-by-side suites while maintaining maximum interior floor area.',
    locationChallenges: {
      climateOrSoilIssue: 'Coastal fog and winter moisture requiring heated air exchange during compound curing to avoid tape blisters.',
      bylawOrPermitHurdle: 'City of Vancouver strict acoustic field testing and mechanical room sound isolation audits.',
      seismicOrStructuralConstraint: 'Seismic tie-ins between existing foundation walls and interior light steel framing.',
      engineeredSolution: 'Constructed staggered 20ga steel stud party wall with QuietRock 510 soundproofing panels on dual resilient channel isolators.'
    },
    solution: 'Exceeded Vancouver sound code with verified STC 59 test results, delivering razor-sharp drywall reveals and smooth paint-ready surfaces in 11 days.',
    specsDelivered: [
      '4,800 LF 20ga Interior Drywall Framing & Architectural Bulkheads',
      '18,500 sq ft 5/8" Type X Firecode & QuietRock Sound Dampening Drywall',
      'Fry Reglet Architectural Shadowline Returns at All Windows & Doors',
      'Continuous 100% Level 5 Surface Skim Finish',
    ],
    inspectionsPassed: [
      'City of Vancouver Framing & Pre-Board Inspection (#VAN-BLD-33104)',
      'Party Wall Field Acoustic STC 59 Sign-Off',
      'Final Architectural Level 5 Inspection'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Completed Kitsilano infill duplex featuring razor-sharp Fry Reglet shadowline details.',
        tag: 'Modern Infill Handover'
      },
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Level 5 full surface skim with zero drywall photographed seams under direct natural light.',
        tag: 'Museum-Grade Finish'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        caption: 'STC 59 party wall with QuietRock 510 soundproofing panels and dual resilient channels.',
        tag: 'STC 59 Party Wall'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: '20ga interior steel stud framing and architectural recessed bulkheads for HVAC drops.',
        tag: 'Interior Steel Framing'
      }
    ],
    mapLocation: {
      x: 60,
      y: 40,
      district: 'Kitsilano Point Infill',
      city: 'City of Vancouver',
      doorTypesSupplied: [
        'Level 5 Architectural Finish',
        'QuietRock Sound Dampening',
        'Fry Reglet Negative Reveals',
      ],
      buildingType: '6,400 sq ft Modern Infill Duplex',
      yearCompleted: '2024',
    },
    testimonial: {
      quote: 'For a boutique infill project, Rambo Wall & Ceilings delivered high-rise quality engineering with residential attention to detail.',
      author: 'Stefan Novak',
      role: 'Owner & General Contractor',
      company: 'Novak Custom Built Homes',
    },
  },
  {
    id: 'surrey-cloverdale-retail-boutique',
    title: 'Cloverdale Heritage Plaza Commercial Retail TI',
    subtitle: '4,200 sq ft Boutique Retail & Showroom Steel Framing & Acoustic Grid',
    location: 'Cloverdale Town Centre — 176 St & 57 Ave, Surrey',
    municipalitySlug: 'surrey',
    municipalityName: 'City of Surrey',
    clientType: 'Commercial Enterprise',
    sector: 'commercial',
    budgetTier: '<$50k',
    budgetEstimate: '$42,500 CAD',
    budgetAmount: 42500,
    steelFramingLF: 3600,
    drywallSqFt: 14200,
    finishLevel: 'Level 4 Paint-Ready & Feature Display Bulkheads',
    fireRatingULC: '1-Hour Tenant Demising Partition (ULC W407)',
    soundRatingSTC: 'STC 52 Tenant-to-Tenant Commercial Separation',
    summary: 'Fast-track steel stud demising walls, recessed perimeter architectural bulkheads, and seismic T-Bar grid for a luxury home decor retail boutique in Cloverdale.',
    challenge: 'Short 14-day turnaround window before store fixture installation and compliance with Surrey seismic grid splay wire criteria.',
    locationChallenges: {
      climateOrSoilIssue: 'Ground-level dampness requiring vapor retarder membrane seals beneath drywall base tracks.',
      bylawOrPermitHurdle: 'City of Surrey quick-turnaround retail permit sign-offs for commercial TI.',
      seismicOrStructuralConstraint: 'Seismic bracing on 14ft tall perimeter store display walls.',
      engineeredSolution: 'Installed 20ga heavy-flange studs with diagonal kickers to open steel joists and pre-hung Armstrong 2x2 fine-textured acoustic ceiling tiles.'
    },
    solution: 'Turned over the entire 4,200 sq ft space in 9 calendar days with a flawless Level 4 paint-ready drywall finish and passed all municipal inspections on first attempt.',
    specsDelivered: [
      '3,600 LF 20ga Steel Stud Interior Partition Framing',
      '14,200 sq ft 5/8" Type X Firecode Gypsum Panels',
      '3,800 sq ft Armstrong 2x2 Fine-Fissured Acoustic T-Bar Ceilings',
      'Recessed Floating Perimeter Light Coves & Display Bulkheads',
    ],
    inspectionsPassed: [
      'City of Surrey Commercial TI Framing Inspection',
      'Surrey Fire Services 1-Hour Demising Sign-Off',
      'Final Occupancy Drywall Handover'
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Boutique retail showroom completed in 9 days with Level 4 paint-ready drywall.',
        tag: 'Retail Showroom TI'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Recessed floating perimeter light coves and product display drywall bulkheads.',
        tag: 'Floating Light Coves'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: '20ga heavy-flange steel studs with diagonal structural kickers tied into open web joists.',
        tag: 'Diagonal Joist Kickers'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Armstrong 2x2 fine-fissured acoustic T-Bar ceiling grid with seismic splay wires.',
        tag: 'Armstrong 2x2 T-Bar'
      }
    ],
    mapLocation: {
      x: 76,
      y: 68,
      district: 'Cloverdale Town Centre',
      city: 'City of Surrey',
      doorTypesSupplied: [
        'Commercial Retail Steel TI',
        'Armstrong T-Bar Acoustic Grid',
        'Display Bulkhead Light Coves',
      ],
      buildingType: '4,200 sq ft Boutique Retail Showroom',
      yearCompleted: '2024',
    },
    testimonial: {
      quote: 'They hit our strict grand opening deadline without sacrificing an ounce of finish quality. The floating bulkheads look incredible.',
      author: 'Leanne Thorne',
      role: 'Managing Partner',
      company: 'Thorne & Co. Home Decor',
    },
  },
  {
    id: 'langley-fort-langley-heritage-home',
    title: 'Fort Langley Custom Riverfront Craftsman Estate',
    subtitle: '7,800 sq ft Custom Residential Drywall & Coffered Ceiling Package',
    location: 'Fort Langley — River Rd & Glover Corridor, Langley',
    municipalitySlug: 'township-of-langley',
    municipalityName: 'Township of Langley',
    clientType: 'Custom Homeowner',
    sector: 'residential',
    budgetTier: '$50k-$250k',
    budgetEstimate: '$92,000 CAD',
    budgetAmount: 92000,
    steelFramingLF: 8200,
    drywallSqFt: 26000,
    finishLevel: 'Level 5 Full Polymer Skim on All Great Rooms',
    fireRatingULC: '1-Hour Mechanical Room Fire Separation',
    soundRatingSTC: 'STC 60 Primary Suite & Theatre Sound Isolation',
    summary: 'Intricate recessed coffered drywall ceilings, curved archways, multi-layer acoustic home theatre soundproofing, and Level 5 museum skim finishes for a custom estate in Fort Langley.',
    challenge: 'High ceiling spans with intricate multi-tier coffer bulkheads requiring laser-perfect square alignment across 24ft great room ceiling.',
    locationChallenges: {
      climateOrSoilIssue: 'Fraser River floodplain seasonal humidity requiring continuous climate-controlled dehumidification during compound drying.',
      bylawOrPermitHurdle: 'Township of Langley residential building inspection code adherence for vaulted ceiling insulation & vapor barrier.',
      seismicOrStructuralConstraint: 'Seismic tie-ins for dropped coffer bulkheads with safety tie-wires.',
      engineeredSolution: 'Framed rigid 20ga steel stud coffers anchored to engineered joist clips, taped with high-strength fibafuse tape and finished with Level 5 full skim.'
    },
    solution: 'Delivered jaw-dropping architectural ceiling craftsmanship with zero drywall seam photographing under dramatic chandelier raking light.',
    specsDelivered: [
      '8,200 LF Steel Stud Bulkhead Framing & Recessed Coffers',
      '26,000 sq ft 5/8" Type X CGC Sheetrock Gypsum Panels',
      'Custom Multi-Tier Great Room Coffered Ceilings with LED Returns',
      'Level 5 Hand-Polished Smooth Finish on All Living Areas',
    ],
    inspectionsPassed: [
      'Township of Langley Framing & Pre-Cover Inspection',
      'Insulation & Vapor Barrier Seal Verification',
      'Architectural Ceiling Review & Final Handover'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryDetails: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: '7,800 sq ft riverfront craftsman estate with multi-tier coffered drywall ceilings.',
        tag: 'Craftsman Estate Handover'
      },
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Recessed great room coffered ceiling bulkheads with knife-edge LED return trims.',
        tag: 'Coffered Drywall Ceiling'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        caption: 'STC 60 sound isolation for primary bedroom suite and dedicated home cinema.',
        tag: 'STC 60 Soundproofing'
      },
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hand-polished Level 5 full polymer skim on all great room and cathedral ceilings.',
        tag: 'Hand-Polished Level 5'
      }
    ],
    mapLocation: {
      x: 84,
      y: 64,
      district: 'Fort Langley Riverfront',
      city: 'Township of Langley',
      doorTypesSupplied: [
        'Multi-Tier Coffered Drywall Ceilings',
        'Level 5 Museum Skim Finish',
        'STC 60 Home Theatre Isolation',
      ],
      buildingType: '7,800 sq ft Custom Craftsman Estate',
      yearCompleted: '2025',
    },
    testimonial: {
      quote: 'The coffered ceilings in our great room are the talk of everyone who visits. Mason’s team took our rough sketches and created pure perfection.',
      author: 'Bradley & Megan Scott',
      role: 'Homeowners',
      company: 'Private Residence, Fort Langley',
    },
  }
];

