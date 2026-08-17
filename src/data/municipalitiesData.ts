export interface MunicipalityData {
  id: string;
  slug: string;
  name: string;
  officialName: string;
  regionalDistrict: 'Metro Vancouver (MVRD)' | 'Fraser Valley (FVRD)';
  classification: 'City' | 'District Municipality' | 'Village' | 'Island Municipality' | 'Township / District' | 'Treaty First Nation';
  subRegion: 'Major Urban Core & Inner Suburbs' | 'North Shore & Sea-to-Sky' | 'Tri-Cities & Ridge Meadows' | 'South of Fraser' | 'Fraser Valley Regional District';
  population: string;
  governingCode: string;
  cityHall: {
    name: string;
    department: string;
    address: string;
    phone: string;
    inspectionProtocol: string;
  };
  fireDepartment: {
    name: string;
    headquarters: string;
    phone: string;
    fireRatingSpecs: string;
    corridorSeparation: string;
  };
  neighborhoods: Array<{
    name: string;
    focusType: string;
    tradeSpecs: string;
    logistics: string;
  }>;
  microclimateAndSoil: {
    soilAndSeismic: string;
    climateCuring: string;
    insulationReq: string;
  };
  pricingMatrix: {
    steelFramingLinearFt: string;
    drywallHangTapeSqFt: string;
    level5SkimSqFt: string;
    fireRated1HrSqFt: string;
    fireRated2HrSqFt: string;
    acousticIsolationSqFt: string;
    tBarCeilingsSqFt: string;
  };
  neighboringCities: string[];
  localFaqs: Array<{
    q: string;
    a: string;
  }>;
}

export const MUNICIPALITIES_LIST: MunicipalityData[] = [
  // 1. City of Vancouver
  {
    id: 'vancouver',
    slug: 'vancouver',
    name: 'Vancouver',
    officialName: 'City of Vancouver',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Major Urban Core & Inner Suburbs',
    population: '662,248',
    governingCode: 'Vancouver Building By-law (VBBL 2019/2024)',
    cityHall: {
      name: 'City of Vancouver Services Centre',
      department: 'Development, Buildings & Licensing',
      address: '515 W 10th Ave, Vancouver, BC V5Z 4A8',
      phone: '3-1-1 (Local) / 604-873-7000',
      inspectionProtocol: 'Book pre-boarding framing, insulation/poly vapor barrier, and acoustic/firestop close-in via City of Vancouver Online Permitting portal with 48hr advance notice.',
    },
    fireDepartment: {
      name: 'Vancouver Fire and Rescue Services (VFRS)',
      headquarters: '900 Heatley Ave, Vancouver, BC V6A 3S7',
      phone: '604-873-7000',
      fireRatingSpecs: 'ULC W407 1-hour and ULC W411 2-hour rated partitions; 45-min suite entry doors; 90-min to 2-hour stairwell shaftwalls with certified intumescent head-of-wall spray.',
      corridorSeparation: 'Double 5/8" Type X on resilient channel or staggered steel studs with continuous Roxul AFB mineral wool and smoke gaskets.',
    },
    neighborhoods: [
      {
        name: 'Downtown & Coal Harbour',
        focusType: 'High-Rise Commercial TI & Luxury Condos',
        tradeSpecs: 'Deep-leg slotted deflection tracks (1/2" to 3/4" slab deflection), Level 5 skim coats under floor-to-ceiling glass, 20ga steel stud door boxing.',
        logistics: 'Tight 11\'6" parkade clearances, strict 8:00 AM–4:30 PM strata noise bylaws, mandatory freight hoist bookings and negative-air HEPA scrubbers.',
      },
      {
        name: 'Yaletown & False Creek North',
        focusType: 'Strata Suite Renovations & Acoustic Isolation',
        tradeSpecs: 'RC-1 resilient channels, Green Glue viscoelastic damping, STC 58+ party wall retrofits, drop-bulkhead LED cove framing.',
        logistics: 'Elevator wall padding, floor protection along common corridors, debris disposal via bagged freight shuttles.',
      },
      {
        name: 'Mount Pleasant & Olympic Village',
        focusType: 'Creative Tech Campuses & Industrial Loft Conversions',
        tradeSpecs: 'Exposed black T-Bar acoustic grids (9/16" fine-line), heavy-gauge 18ga structural framing, glass partition pocket frames.',
        logistics: 'Loading bay staging, coordinate with adjacent commercial tenants, laser-leveled ceiling transitions.',
      },
      {
        name: 'Kitsilano & Point Grey',
        focusType: 'Bespoke Custom Residences & Multi-Family Infill',
        tradeSpecs: 'Level 5 full-surface skim coat, Fry Reglet architectural aluminum base reveal trims, high-span cathedral ceiling framing.',
        logistics: 'Curbside container placement permits, site moisture protection, rapid 24-hr mud curing protocol.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Glacial till and shoreline soft soils along False Creek; requires ductile seismic framing clips and deflection tracks meeting VBBL seismic drift parameters.',
      climateCuring: 'Coastal marine humidity (75%–95% winter RH); mandatory commercial dehumidifiers and electric forced-air heaters to sustain 13°C–22°C drying window.',
      insulationReq: 'R-14 to R-22 mineral wool in exterior furrings; Roxul AFB acoustic batts in all interior partition assemblies.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.25 – $6.50',
      drywallHangTapeSqFt: '$1.95 – $2.85',
      level5SkimSqFt: '$0.85 – $1.45',
      fireRated1HrSqFt: '$6.85 – $9.75',
      fireRated2HrSqFt: '$10.25 – $15.50',
      acousticIsolationSqFt: '$0.75 – $1.35',
      tBarCeilingsSqFt: '$4.50 – $7.00',
    },
    neighboringCities: ['Burnaby', 'Richmond', 'North Vancouver (City)', 'West Vancouver'],
    localFaqs: [
      {
        q: 'What is the permit requirement for commercial tenant improvements in Vancouver?',
        a: 'Any commercial alterations affecting interior partitions, door openings, or fire separations require a City of Vancouver Building Permit under the VBBL. Pre-boarding framing inspections must be signed off before insulation or gypsum boards are hung.',
      },
      {
        q: 'When is Level 5 finish strictly required in Vancouver residential towers?',
        a: 'Level 5 full skim coat is required under GA-214 wherever wall or ceiling surfaces receive raking natural daylight from floor-to-ceiling glazing, or where dark/semi-gloss architectural paints are specified.',
      },
      {
        q: 'What door fire ratings are mandatory for Vancouver multi-family corridors?',
        a: 'Suite entry doors must carry a certified 20-minute to 45-minute ULC fire label with self-closing hinges, positive latching, and smoke seals. Stairwells and electrical rooms require 90-minute to 2-hour rated assemblies.',
      },
    ],
  },

  // 2. City of Burnaby
  {
    id: 'burnaby',
    slug: 'burnaby',
    name: 'Burnaby',
    officialName: 'City of Burnaby',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Major Urban Core & Inner Suburbs',
    population: '249,125',
    governingCode: 'BC Building Code (BCBC 2024 Part 3 & Part 9) + Burnaby Building Bylaw',
    cityHall: {
      name: 'Burnaby City Hall',
      department: 'Building Department & Inspections',
      address: '4949 Canada Way, Burnaby, BC V5G 1M2',
      phone: '604-294-7130',
      inspectionProtocol: 'Schedule building framing and insulation inspections online via Burnaby Building Division portal 24–48 hours in advance.',
    },
    fireDepartment: {
      name: 'Burnaby Fire Department',
      headquarters: '4867 Sperling Ave, Burnaby, BC V5E 2S9',
      phone: '604-294-7195',
      fireRatingSpecs: 'ULC 1-hour and 2-hour rated corridor/suite demising walls; 45-min suite entry doors; intumescent firestop sealants on all mechanical and slab penetrations.',
      corridorSeparation: '5/8" Type X drywall staggered over 20ga steel studs with mineral wool acoustic batts.',
    },
    neighborhoods: [
      {
        name: 'Metrotown & Central Park',
        focusType: 'High-Density Residential Towers & Commercial Hubs',
        tradeSpecs: 'Slotted deflection tracks, automated machine taping for high-volume suite packages, 45-min rated doors.',
        logistics: 'Tower crane material loading, coordinated staging with mechanical trades, strata floor protection.',
      },
      {
        name: 'Brentwood & Lougheed',
        focusType: 'Master-Planned Urban Core High-Rises & Retail',
        tradeSpecs: 'Level 5 skim coatings, suspended T-Bar acoustic ceilings, fire-rated elevator shaftliner installations.',
        logistics: 'High-speed hoist booking, strict delivery scheduling, dedicated drywall safety rigging.',
      },
      {
        name: 'Burnaby Heights & Capitol Hill',
        focusType: 'Custom Homes & Commercial Storefront TIs',
        tradeSpecs: 'Wood-to-steel transition framing, sound isolation party walls, architectural soffits and bulkheads.',
        logistics: 'Street loading permits, clean drywall scrap recycling to local depots.',
      },
      {
        name: 'Big Bend & Lake City',
        focusType: 'Light Industrial, Film Studios & Warehouses',
        tradeSpecs: 'High-span 6" 16ga/18ga steel studs up to 22ft heights, 2-hour industrial demising firewalls.',
        logistics: 'Scissor lift and boom access, forklift bundle distribution, heavy-duty deflection tracks.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Bedrock on Burnaby Mountain contrasting with peat and soft silts in Big Bend flats requiring dynamic seismic bracing on suspended ceilings and tall partitions.',
      climateCuring: 'Valley humidity convergence; controlled heating and dehumidification required for continuous taping and Level 5 coats.',
      insulationReq: 'R-14/R-20 mineral wool batts for thermal and STC acoustic performance.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.95 – $5.95',
      drywallHangTapeSqFt: '$1.85 – $2.70',
      level5SkimSqFt: '$0.80 – $1.35',
      fireRated1HrSqFt: '$6.50 – $9.25',
      fireRated2HrSqFt: '$9.95 – $14.75',
      acousticIsolationSqFt: '$0.70 – $1.25',
      tBarCeilingsSqFt: '$4.25 – $6.75',
    },
    neighboringCities: ['Vancouver', 'New Westminster', 'Coquitlam', 'Richmond'],
    localFaqs: [
      {
        q: 'What is Burnaby’s protocol for framing inspections on high-rise towers?',
        a: 'Burnaby inspectors require complete framing sign-offs per floor cluster (typically 3–5 floors at a time), verifying stud gauge, box headers over door openings, and deflection track gaps before any insulation or boarding begins.',
      },
      {
        q: 'How does Rambo Walls handle slab deflection in Burnaby high-rises?',
        a: 'We install 2-1/2" or 3-5/8" deep-leg slotted deflection tracks with engineered screws placed in the vertical slots, allowing concrete slabs to deflect under live load without transferring compression to the drywall studs.',
      },
      {
        q: 'Are T-Bar ceilings in Burnaby commercial spaces required to have seismic wires?',
        a: 'Yes. Per BCBC and ASTM E580, all suspended ceiling systems over 1,000 sq. ft. must have 12ga 4-way diagonal seismic splay wires and rigid compression struts every 12 feet.',
      },
    ],
  },

  // 3. City of Surrey
  {
    id: 'surrey',
    slug: 'surrey',
    name: 'Surrey',
    officialName: 'City of Surrey',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'South of Fraser',
    population: '568,322',
    governingCode: 'BC Building Code (BCBC 2024) + City of Surrey Building Bylaw 14577',
    cityHall: {
      name: 'Surrey City Hall',
      department: 'Planning & Development - Building Division',
      address: '13450 104 Ave, Surrey, BC V3T 1V8',
      phone: '604-591-4340',
      inspectionProtocol: 'Book framing, insulation/air barrier, and drywall close-in inspections via the Surrey Online Building Inspection service 24hr prior.',
    },
    fireDepartment: {
      name: 'Surrey Fire Service',
      headquarters: '8767 132 St, Surrey, BC V3W 4P1',
      phone: '604-543-6700',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite doors; 90-min stairwell/chute doors; firestop sealant inspections on all penetrations.',
      corridorSeparation: 'Double 5/8" Type X on RC channel or staggered 20ga steel studs with dense acoustic mineral wool.',
    },
    neighborhoods: [
      {
        name: 'Surrey City Centre & Whalley',
        focusType: 'High-Rise Residential & Commercial Core',
        tradeSpecs: 'Deflection track assemblies, high-volume automated taping, Level 5 finishes on open-concept towers.',
        logistics: 'Tower crane material hoisting, dedicated floor stocking crews, noise bylaw compliance.',
      },
      {
        name: 'Guildford & Fleetwood',
        focusType: 'Retail Centers, Healthcare TIs & Townhome Multi-Family',
        tradeSpecs: 'STC 55+ party walls, lead-lined X-ray drywall for medical clinics, washdown T-Bar grids.',
        logistics: 'Mall night-shift work, clean dust containment, fast-track retail turnaround.',
      },
      {
        name: 'Newton & Campbell Heights',
        focusType: 'Light Industrial, Logistics Warehouses & Commercial',
        tradeSpecs: 'Heavy-gauge 16ga/18ga structural steel framing for 16ft–24ft demising walls, 2-hr ULC firewalls.',
        logistics: 'Scissor lifts, wide bay access, high-volume material delivery.',
      },
      {
        name: 'South Surrey & Morgan Creek',
        focusType: 'Luxury Custom Homes & Boutique Offices',
        tradeSpecs: 'Level 5 continuous skim, architectural shadow-line reveal trims, soundproof theater rooms.',
        logistics: 'High aesthetic standards, specialized dustless sanders, premium paint-ready prep.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Deep deltaic silts and soft clays in lowland areas; high seismic drift allowances require flexible drywall perimeter expansion joints and seismic framing clips.',
      climateCuring: 'Variable weather with hot summer flash-drying and humid winter fog; specialized joint compound viscosity control and ambient heaters.',
      insulationReq: 'R-14/R-20 friction-fit mineral wool in steel studs; R-22+ in exterior perimeter framing.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.75 – $5.65',
      drywallHangTapeSqFt: '$1.75 – $2.55',
      level5SkimSqFt: '$0.75 – $1.25',
      fireRated1HrSqFt: '$6.25 – $8.95',
      fireRated2HrSqFt: '$9.50 – $14.25',
      acousticIsolationSqFt: '$0.65 – $1.15',
      tBarCeilingsSqFt: '$3.95 – $6.25',
    },
    neighboringCities: ['Langley (City)', 'Langley (Township)', 'Delta', 'White Rock', 'New Westminster'],
    localFaqs: [
      {
        q: 'What is the fire separation standard for commercial unit demising walls in Surrey?',
        a: 'Surrey building officials mandate minimum 1-hour or 2-hour ULC fire-rated partitions (ULC W407 / ULC W411) with Type X gypsum board and certified firestop sealants at the roof deck interface.',
      },
      {
        q: 'How fast can Mason provide an estimate for a Surrey tenant improvement?',
        a: 'Mason provides complete itemized takeoffs within 24 hours of receiving plan drawings or site dimensions. Direct line: 778-773-2790.',
      },
      {
        q: 'What acoustic rating is enforced for multi-family party walls in Surrey?',
        a: 'BCBC requires minimum STC 50, but Rambo Walls routinely delivers STC 55–62+ using resilient channels, Roxul AFB acoustic insulation, and Green Glue damping polymers.',
      },
    ],
  },

  // 4. City of Richmond
  {
    id: 'richmond',
    slug: 'richmond',
    name: 'Richmond',
    officialName: 'City of Richmond',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Major Urban Core & Inner Suburbs',
    population: '209,937',
    governingCode: 'BC Building Code (BCBC 2024) + City of Richmond Building Regulation Bylaw',
    cityHall: {
      name: 'Richmond City Hall',
      department: 'Building Approvals Department',
      address: '6911 No. 3 Rd, Richmond, BC V6Y 2C1',
      phone: '604-276-4111',
      inspectionProtocol: 'Book framing, insulation/vapor barrier, and drywall close-in via Richmond\'s MyPermit portal with 24hr notice.',
    },
    fireDepartment: {
      name: 'Richmond Fire-Rescue',
      headquarters: '6960 No. 4 Rd, Richmond, BC V6Y 2S3',
      phone: '604-278-5131',
      fireRatingSpecs: 'ULC 1-hr/2-hr rated fire partitions; positive pressure smoke control doors; intumescent sealants on all mechanical penetrations.',
      corridorSeparation: '5/8" Type X on 20ga steel studs with mineral wool insulation and perimeter acoustic sealant.',
    },
    neighborhoods: [
      {
        name: 'Richmond City Centre / No. 3 Rd Corridor',
        focusType: 'High-Rise Concrete Residential & Commercial Plaza TIs',
        tradeSpecs: 'Deflection track assemblies, Level 5 skim coat, commercial T-Bar acoustic ceilings, fire-rated door assemblies.',
        logistics: 'Busy transit corridors, underground loading docks, strict strata work hour enforcement.',
      },
      {
        name: 'Steveston Village & Waterfront',
        focusType: 'Heritage Commercial, Boutique Hospitality & Custom Homes',
        tradeSpecs: 'Moisture-resistant drywall, architectural bulkheads, soundproof ceiling systems.',
        logistics: 'Narrow heritage street parking, dustless drywall sanding, fast turnaround.',
      },
      {
        name: 'Airport / Sea Island Logistics District',
        focusType: 'Aviation Offices, Warehouses & Hotel TIs',
        tradeSpecs: 'High STC soundproof wall assemblies (STC 60+ for jet engine noise), heavy-gauge 16ga structural framing.',
        logistics: 'Airport security clearances, night-shift scheduling, strict safety protocols.',
      },
      {
        name: 'East Richmond & Crestwood Industrial Park',
        focusType: 'Light Industrial, Food Processing & High-Bay Warehouses',
        tradeSpecs: 'High-span 6" steel studs, 2-hour ULC industrial fire separations, vinyl-faced washdown ceiling tiles.',
        logistics: 'Forklift material staging, scissor-lift access, durable impact-resistant drywall.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Fraser River delta soft alluvial silt and high water table; significant seismic liquefaction risk requires high-ductility framing anchors and flexible ceiling perimeter connections.',
      climateCuring: 'River-delta high humidity; forced-air electric heaters and industrial dehumidifiers required on all winter projects to prevent joint blister and slow dry times.',
      insulationReq: 'R-14 to R-20 mineral wool acoustic batts; moisture-resistant gypsum boards in perimeter and ground-floor areas.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.95 – $5.95',
      drywallHangTapeSqFt: '$1.85 – $2.65',
      level5SkimSqFt: '$0.80 – $1.35',
      fireRated1HrSqFt: '$6.50 – $9.25',
      fireRated2HrSqFt: '$9.75 – $14.50',
      acousticIsolationSqFt: '$0.70 – $1.25',
      tBarCeilingsSqFt: '$4.25 – $6.50',
    },
    neighboringCities: ['Vancouver', 'Delta', 'Burnaby', 'New Westminster'],
    localFaqs: [
      {
        q: 'How does Richmond’s high water table affect drywall installation?',
        a: 'Due to ground moisture, we install steel furring walls spaced off concrete foundation slabs with continuous moisture barriers and use mold/moisture-resistant gypsum panels.',
      },
      {
        q: 'What soundproofing is recommended near Vancouver International Airport (YVR) in Richmond?',
        a: 'We engineer STC 60+ acoustic assemblies using double 5/8" Type X on resilient channels, Roxul Safe\'n\'Sound mineral wool, and Green Glue damping polymers to eliminate low-frequency jet aircraft noise.',
      },
      {
        q: 'Are seismic clips mandatory for suspended ceilings in Richmond?',
        a: 'Yes. Due to high seismic risk in Fraser delta soils, all commercial T-Bar grids require 2" seismic perimeter ledger clips and 4-way diagonal splay wires per ASTM E580.',
      },
    ],
  },

  // 5. City of New Westminster
  {
    id: 'new-westminster',
    slug: 'new-westminster',
    name: 'New Westminster',
    officialName: 'City of New Westminster',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Major Urban Core & Inner Suburbs',
    population: '78,916',
    governingCode: 'BC Building Code (BCBC 2024) + New Westminster Building Bylaw',
    cityHall: {
      name: 'New Westminster City Hall',
      department: 'Building & Inspections Division',
      address: '511 Royal Ave, New Westminster, BC V3L 1H9',
      phone: '604-527-4580',
      inspectionProtocol: 'Book pre-boarding framing and insulation inspections with New West building inspectors via email or phone 48hr in advance.',
    },
    fireDepartment: {
      name: 'New Westminster Fire and Rescue Services',
      headquarters: '1011 4th Ave, New Westminster, BC V3M 1T3',
      phone: '604-519-1000',
      fireRatingSpecs: '1-hr and 2-hr ULC rated assemblies; 45-min suite entry doors; heritage timber-to-steel firestopping assemblies.',
      corridorSeparation: '5/8" Type X on steel studs with mineral wool insulation and intumescent perimeter seals.',
    },
    neighborhoods: [
      {
        name: 'Downtown & Columbia Street Historic District',
        focusType: 'Heritage Commercial TIs, Loft Conversions & Retail',
        tradeSpecs: 'Wood-to-steel transition framing, Level 5 skim on exposed brick interfaces, fire-rated shaftwalls.',
        logistics: 'Steep hills, heritage building access constraints, dust containment.',
      },
      {
        name: 'Quayside / Boardwalk Waterfront',
        focusType: 'Condo Tower Renovations & Acoustic Retrofits',
        tradeSpecs: 'RC-1 resilient channels, STC 55+ party walls, smooth Level 5 ceiling finishes.',
        logistics: 'Strata elevator booking, noise bylaws, protective carpet floor runners.',
      },
      {
        name: 'Uptown & 6th Street Commercial Corridor',
        focusType: 'Medical Clinics, Financial Offices & Retail TIs',
        tradeSpecs: 'Lead-lined drywall for imaging rooms, 9/16" acoustic T-Bar grids, metal door framing.',
        logistics: 'After-hours work, clean site containment, rapid turnover.',
      },
      {
        name: 'Queensborough Industrial & Multi-Family',
        focusType: 'Townhomes, Warehouses & Commercial Plazas',
        tradeSpecs: 'Heavy-gauge steel studs, 2-hour demising firewalls, high-span drywall partitions.',
        logistics: 'Island logistics, ground-level loading, forklift staging.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Riverbank slopes and soft silt along the Fraser; structural framing requires deep-leg track and secure anchorage to structural substrates.',
      climateCuring: 'River fog and winter moisture; heating and dehumidifier deployment ensures reliable mud cure cycles.',
      insulationReq: 'R-14/R-20 mineral wool acoustic and thermal batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.85 – $5.85',
      drywallHangTapeSqFt: '$1.80 – $2.65',
      level5SkimSqFt: '$0.80 – $1.35',
      fireRated1HrSqFt: '$6.40 – $9.15',
      fireRated2HrSqFt: '$9.75 – $14.50',
      acousticIsolationSqFt: '$0.70 – $1.25',
      tBarCeilingsSqFt: '$4.20 – $6.50',
    },
    neighboringCities: ['Burnaby', 'Surrey', 'Coquitlam', 'Richmond'],
    localFaqs: [
      {
        q: 'How does Rambo Walls handle drywall and framing in historic New Westminster buildings?',
        a: 'We specialize in retrofitting steel stud framing and fire-rated drywall to uneven heritage timber and masonry, ensuring full modern BCBC fire and seismic compliance while preserving architectural character.',
      },
      {
        q: 'Where do you recycle gypsum waste in New Westminster?',
        a: 'All clean drywall off-cuts are transported directly to certified local gypsum recycling facilities in compliance with regional environmental regulations.',
      },
    ],
  },

  // 6. City of North Vancouver
  {
    id: 'north-vancouver-city',
    slug: 'north-vancouver-city',
    name: 'North Vancouver (City)',
    officialName: 'City of North Vancouver',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'North Shore & Sea-to-Sky',
    population: '58,120',
    governingCode: 'BC Building Code (BCBC 2024) + City of North Vancouver Building Bylaw',
    cityHall: {
      name: 'City of North Vancouver City Hall',
      department: 'Community & Building Services',
      address: '141 W 14th St, North Vancouver, BC V7M 1H9',
      phone: '604-985-7761',
      inspectionProtocol: 'Book building, framing, and drywall inspections via CNV CityView online portal 48hr in advance.',
    },
    fireDepartment: {
      name: 'City of North Vancouver Fire Department',
      headquarters: '165 E 13th St, North Vancouver, BC V7L 2L3',
      phone: '604-980-5021',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; intumescent head-of-wall firestopping.',
      corridorSeparation: 'Double 5/8" Type X on resilient channels with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Lower Lonsdale (LoLo) & Shipyards',
        focusType: 'High-Rise Waterfront Condos & Commercial Retail TIs',
        tradeSpecs: 'Level 5 full skim coat, high-NRC acoustic T-Bar ceilings, architectural drop bulkheads.',
        logistics: 'Waterfront density, underground loading, strict strata sound insulation verification.',
      },
      {
        name: 'Central Lonsdale Commercial Corridor',
        focusType: 'Medical Offices, Financial Institutions & Retail',
        tradeSpecs: 'Lead-lined X-ray drywall, steel stud partitions, 45-min fire-rated doors.',
        logistics: 'Busy transit corridor, scheduled night work, zero dust transfer to clinics.',
      },
      {
        name: 'Moodyville & Marine Drive',
        focusType: 'Mass-Timber Multi-Family & Mixed-Use Infill',
        tradeSpecs: 'Mass-timber acoustic isolations, resilient channel assemblies, Level 5 finishing.',
        logistics: 'Coordinated crane lifts, timber moisture monitoring, clean job-site recycling.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Bedrock and gravelly glacial till; solid structural anchoring with specific seismic ceiling restraint requirements.',
      climateCuring: 'High North Shore rainfall and coastal humidity; on-site dehumidifiers and heaters maintain optimal 13°C–22°C drying window.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts; continuous vapor barriers on exterior assemblies.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.15 – $6.25',
      drywallHangTapeSqFt: '$1.90 – $2.80',
      level5SkimSqFt: '$0.85 – $1.40',
      fireRated1HrSqFt: '$6.75 – $9.50',
      fireRated2HrSqFt: '$10.00 – $15.00',
      acousticIsolationSqFt: '$0.75 – $1.30',
      tBarCeilingsSqFt: '$4.40 – $6.85',
    },
    neighboringCities: ['North Vancouver (District)', 'West Vancouver', 'Vancouver'],
    localFaqs: [
      {
        q: 'What acoustic standards are common for Lower Lonsdale strata renovations?',
        a: 'Most North Vancouver stratas mandate STC 55 or higher for party walls and ceiling assemblies. We install RC-1 resilient channels, Roxul AFB insulation, and double 5/8" drywall with Green Glue damping.',
      },
    ],
  },

  // 7. District of North Vancouver
  {
    id: 'north-vancouver-district',
    slug: 'north-vancouver-district',
    name: 'North Vancouver (District)',
    officialName: 'District of North Vancouver',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'District Municipality',
    subRegion: 'North Shore & Sea-to-Sky',
    population: '88,168',
    governingCode: 'BC Building Code (BCBC 2024) + DNV Building Bylaw',
    cityHall: {
      name: 'District of North Vancouver Municipal Hall',
      department: 'Building Department',
      address: '355 W Queens Rd, North Vancouver, BC V7N 4N5',
      phone: '604-990-2480',
      inspectionProtocol: 'Book pre-boarding framing and insulation inspections through the DNV online inspection system.',
    },
    fireDepartment: {
      name: 'District of North Vancouver Fire and Rescue Services',
      headquarters: '1114 Lynn Valley Rd, North Vancouver, BC V7J 1Z9',
      phone: '604-990-3666',
      fireRatingSpecs: '1-hr and 2-hr ULC assemblies; fire-rated door assemblies; wildfire interface structural firestopping.',
      corridorSeparation: '5/8" Type X on heavy steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Lynn Valley & Lynn Creek Town Centre',
        focusType: 'Mid-Rise Multi-Family & Commercial Village TIs',
        tradeSpecs: 'Acoustic resilient channels, Level 5 finishing, fire-rated corridor assemblies.',
        logistics: 'Town center staging, noise bylaws, dedicated material handling.',
      },
      {
        name: 'Deep Cove & Seymour',
        focusType: 'Custom Architectural Homes & Waterfront Properties',
        tradeSpecs: 'Cathedral ceiling framing, Level 5 full skim under raking light, custom architectural reveals.',
        logistics: 'Narrow mountain road access, weather protection, rapid dustless sanding.',
      },
      {
        name: 'Edgemont Village & Capilano',
        focusType: 'Luxury Custom Residences & Boutique Commercial',
        tradeSpecs: 'Fry Reglet shadow reveals, high-end soundproof media rooms, heavy-gauge steel stud bulkheads.',
        logistics: 'High aesthetic standards, immaculate site cleanliness, rapid turnaround.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Mountain rock and glacial till; rigid framing connections and mountain climate temperature control.',
      climateCuring: 'High mountain rainfall (up to 2,000mm/yr); strict humidity management to ensure joint compounds cure without shrinkage or cracking.',
      insulationReq: 'R-20+ mineral wool thermal insulation and dense acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.15 – $6.25',
      drywallHangTapeSqFt: '$1.90 – $2.80',
      level5SkimSqFt: '$0.85 – $1.40',
      fireRated1HrSqFt: '$6.75 – $9.50',
      fireRated2HrSqFt: '$10.00 – $15.00',
      acousticIsolationSqFt: '$0.75 – $1.30',
      tBarCeilingsSqFt: '$4.40 – $6.85',
    },
    neighboringCities: ['North Vancouver (City)', 'West Vancouver', 'Vancouver', 'Burnaby'],
    localFaqs: [
      {
        q: 'How does high rainfall in the District of North Vancouver affect drywall mud drying?',
        a: 'We use industrial dehumidifiers and commercial heaters to maintain an enclosed ambient drying environment between 13°C and 22°C with <50% relative humidity, ensuring clean 24-hour coat cycles.',
      },
    ],
  },

  // 8. District of West Vancouver
  {
    id: 'west-vancouver',
    slug: 'west-vancouver',
    name: 'West Vancouver',
    officialName: 'District of West Vancouver',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'District Municipality',
    subRegion: 'North Shore & Sea-to-Sky',
    population: '44,122',
    governingCode: 'BC Building Code (BCBC 2024) + West Vancouver Building Bylaw',
    cityHall: {
      name: 'West Vancouver Municipal Hall',
      department: 'Planning & Development Services - Building Inspections',
      address: '750 17th St, West Vancouver, BC V7V 3T3',
      phone: '604-925-7040',
      inspectionProtocol: 'Book framing, insulation/vapor barrier, and drywall close-in inspections online 48hr in advance.',
    },
    fireDepartment: {
      name: 'West Vancouver Fire & Rescue',
      headquarters: '760 16th St, West Vancouver, BC V7V 3R9',
      phone: '604-925-7370',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; non-combustible steel framing standards.',
      corridorSeparation: 'Double 5/8" Type X on heavy steel studs with Roxul mineral wool.',
    },
    neighborhoods: [
      {
        name: 'Ambleside & Dundarave',
        focusType: 'Boutique Commercial TIs, Waterfront Condos & Custom Homes',
        tradeSpecs: 'Level 5 full-coverage skim coat, acoustic ceiling drops, custom aluminum reveal trims.',
        logistics: 'Tight village streets, noise bylaw compliance, dustless vacuum sanding.',
      },
      {
        name: 'British Properties & Chartwell',
        focusType: 'Ultra-Luxury Custom Mansions & Architectural Estates',
        tradeSpecs: 'High-span 18ft steel framing, Level 5 continuous skim under architectural slot lighting, acoustic theater pods.',
        logistics: 'Mountain estate access, laser-leveled high ceilings, museum-grade finishing standards.',
      },
      {
        name: 'Caulfeild & Horseshoe Bay',
        focusType: 'Custom Waterfront Homes & Commercial Marine TIs',
        tradeSpecs: 'Moisture-resistant drywall, heavy-gauge steel stud bulkheads, sound isolation assemblies.',
        logistics: 'Steep terrain, weatherproofing protocols, rapid project turnover.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Granite bedrock terrain; rigid mechanical anchoring and high seismic framing standards.',
      climateCuring: 'Coastal marine air; precision climate control on site to ensure perfect Level 5 paint-ready finish.',
      insulationReq: 'R-22+ mineral wool thermal batts and dense Roxul AFB acoustic insulation.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.50 – $6.95',
      drywallHangTapeSqFt: '$2.10 – $3.15',
      level5SkimSqFt: '$0.95 – $1.65',
      fireRated1HrSqFt: '$7.25 – $10.50',
      fireRated2HrSqFt: '$10.75 – $16.50',
      acousticIsolationSqFt: '$0.85 – $1.45',
      tBarCeilingsSqFt: '$4.75 – $7.50',
    },
    neighboringCities: ['North Vancouver (District)', 'North Vancouver (City)', 'Vancouver', 'Lions Bay', 'Bowen Island'],
    localFaqs: [
      {
        q: 'Why is Level 5 finish the standard in West Vancouver luxury residences?',
        a: 'Due to soaring ceilings, wall-wash lighting, and expansive floor-to-ceiling glass, standard Level 4 finishes reveal minor joint shadows. Level 5 provides a uniform 100% polymer skim coat that produces a flawless finish under all lighting.',
      },
    ],
  },

  // 9. City of Coquitlam
  {
    id: 'coquitlam',
    slug: 'coquitlam',
    name: 'Coquitlam',
    officialName: 'City of Coquitlam',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Tri-Cities & Ridge Meadows',
    population: '148,625',
    governingCode: 'BC Building Code (BCBC 2024) + Coquitlam Building Bylaw',
    cityHall: {
      name: 'Coquitlam City Hall',
      department: 'Building Permits & Inspections',
      address: '3000 Guildford Way, Coquitlam, BC V3B 7N2',
      phone: '604-927-3441',
      inspectionProtocol: 'Book framing, insulation/poly, and drywall close-in inspections through Coquitlam online portal with 24hr notice.',
    },
    fireDepartment: {
      name: 'Coquitlam Fire and Rescue',
      headquarters: '1300 Pinetree Way, Coquitlam, BC V3B 7L4',
      phone: '604-927-6400',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; intumescent penetration firestopping.',
      corridorSeparation: '5/8" Type X on 20ga steel studs with mineral wool acoustic insulation.',
    },
    neighborhoods: [
      {
        name: 'Coquitlam Town Centre & Pinetree',
        focusType: 'High-Rise Residential Towers & Commercial Office TIs',
        tradeSpecs: 'Deflection track assemblies, automated machine taping, 15/16" acoustic T-Bar grids.',
        logistics: 'Tower crane material loading, coordinated staging with MEP trades.',
      },
      {
        name: 'Burquitlam & Lougheed Border',
        focusType: 'Transit-Oriented Multi-Family & Retail Plazas',
        tradeSpecs: 'STC 55+ party wall assemblies, Level 5 finishing, fire-rated elevator shaftwalls.',
        logistics: 'High-density construction zones, delivery scheduling, debris recycling.',
      },
      {
        name: 'Austin Heights & Maillardville',
        focusType: 'Commercial Storefront TIs & Residential Infill',
        tradeSpecs: 'Steel stud partitions, soundproofing retrofits, architectural drop bulkheads.',
        logistics: 'Street loading permits, clean containment, fast turnaround.',
      },
      {
        name: 'Burke Mountain & Westwood Plateau',
        focusType: 'Custom Homes & Multi-Family Townhomes',
        tradeSpecs: 'Level 5 skim coats, cathedral ceiling framing, soundproof media rooms.',
        logistics: 'Mountain road access, on-site climate control for mud drying.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Glacial till and mountain slopes; solid anchorage required with seismic drift considerations on high-rise towers.',
      climateCuring: 'Tri-Cities mountain rain convergence; forced-air heaters and dehumidifiers deployed on all jobs.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts; R-22+ on exterior furrings.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.85 – $5.75',
      drywallHangTapeSqFt: '$1.80 – $2.65',
      level5SkimSqFt: '$0.80 – $1.30',
      fireRated1HrSqFt: '$6.35 – $9.10',
      fireRated2HrSqFt: '$9.65 – $14.25',
      acousticIsolationSqFt: '$0.68 – $1.20',
      tBarCeilingsSqFt: '$4.10 – $6.40',
    },
    neighboringCities: ['Port Coquitlam', 'Port Moody', 'Burnaby', 'New Westminster', 'Pitt Meadows'],
    localFaqs: [
      {
        q: 'What is the standard turnaround for a framing estimate in Coquitlam?',
        a: 'Mason provides complete itemized takeoffs within 24 hours of receiving plan drawings. Call 778-773-2790.',
      },
    ],
  },

  // 10. City of Port Coquitlam
  {
    id: 'port-coquitlam',
    slug: 'port-coquitlam',
    name: 'Port Coquitlam',
    officialName: 'City of Port Coquitlam',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Tri-Cities & Ridge Meadows',
    population: '61,495',
    governingCode: 'BC Building Code (BCBC 2024) + PoCo Building Bylaw',
    cityHall: {
      name: 'Port Coquitlam City Hall',
      department: 'Building Division',
      address: '2580 Shaughnessy St, Port Coquitlam, BC V3C 3V6',
      phone: '604-927-5444',
      inspectionProtocol: 'Schedule building framing and drywall close-in inspections via PoCo Building Division.',
    },
    fireDepartment: {
      name: 'Port Coquitlam Fire and Emergency Services',
      headquarters: '1725 Broadway St, Port Coquitlam, BC V3C 2M9',
      phone: '604-927-5466',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite doors; commercial firestopping compliance.',
      corridorSeparation: '5/8" Type X on steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Downtown PoCo & Shaughnessy',
        focusType: 'Commercial Retail TIs & Mixed-Use Multi-Family',
        tradeSpecs: 'Steel stud partitions, Level 4/5 finishes, acoustic ceiling grids.',
        logistics: 'Town center access, business-hours noise control, dust containment.',
      },
      {
        name: 'Dominion Triangle / Fremont',
        focusType: 'Big-Box Commercial, Tech Offices & Light Industrial',
        tradeSpecs: 'Heavy-gauge steel studs, 2-hour demising firewalls, high-span drywall partitions.',
        logistics: 'Wide loading bays, scissor lift access, forklift staging.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'River valley soft soils; standard seismic bracing and moisture protection on slab interfaces.',
      climateCuring: 'Valley humidity; ambient heaters and dehumidification ensure consistent mud cure cycles.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.80 – $5.70',
      drywallHangTapeSqFt: '$1.80 – $2.60',
      level5SkimSqFt: '$0.78 – $1.28',
      fireRated1HrSqFt: '$6.30 – $9.00',
      fireRated2HrSqFt: '$9.50 – $14.00',
      acousticIsolationSqFt: '$0.65 – $1.15',
      tBarCeilingsSqFt: '$4.00 – $6.30',
    },
    neighboringCities: ['Coquitlam', 'Port Moody', 'Pitt Meadows'],
    localFaqs: [
      {
        q: 'Do you provide seismic restraint for T-Bar ceilings in Port Coquitlam?',
        a: 'Yes. All commercial suspended ceilings comply with ASTM E580 and the BC Building Code, complete with 4-way diagonal seismic wires and compression struts.',
      },
    ],
  },

  // 11. City of Port Moody
  {
    id: 'port-moody',
    slug: 'port-moody',
    name: 'Port Moody',
    officialName: 'City of Port Moody',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Tri-Cities & Ridge Meadows',
    population: '33,535',
    governingCode: 'BC Building Code (BCBC 2024) + Port Moody Building Bylaw',
    cityHall: {
      name: 'Port Moody City Hall',
      department: 'Building Division',
      address: '100 Newport Dr, Port Moody, BC V3H 5C3',
      phone: '604-469-4534',
      inspectionProtocol: 'Book pre-boarding framing and insulation inspections with Port Moody building inspectors 24hr in advance.',
    },
    fireDepartment: {
      name: 'Port Moody Fire Rescue',
      headquarters: '2815 Murray St, Port Moody, BC V3H 1X2',
      phone: '604-469-7795',
      fireRatingSpecs: '1-hr/2-hr ULC fire separations; 45-min suite entry doors; brewery/commercial fire separations.',
      corridorSeparation: '5/8" Type X on 20ga steel studs with acoustic mineral wool.',
    },
    neighborhoods: [
      {
        name: 'Newport Village & Suter Brook',
        focusType: 'Mixed-Use High-Rise Towers & Commercial TIs',
        tradeSpecs: 'Deflection tracks, Level 5 finishing, acoustic drop bulkheads.',
        logistics: 'Underground parkade clearances, strata elevator booking.',
      },
      {
        name: 'Moody Centre & Brewers Row (Murray St)',
        focusType: 'Craft Breweries, Creative Commercial & Heritage TIs',
        tradeSpecs: 'Moisture-resistant greenboard/cement board, heavy-gauge steel framing, washdown ceiling tiles.',
        logistics: 'Active production spaces, dust barrier isolation, flexible scheduling.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Inlet marine shoreline and hillside bedrock; seismic drift framing clips and moisture barrier protocols.',
      climateCuring: 'Burrard Inlet marine moisture; on-site dehumidifiers maintain 24-hr mud cure schedules.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.90 – $5.85',
      drywallHangTapeSqFt: '$1.85 – $2.70',
      level5SkimSqFt: '$0.80 – $1.32',
      fireRated1HrSqFt: '$6.40 – $9.20',
      fireRated2HrSqFt: '$9.75 – $14.50',
      acousticIsolationSqFt: '$0.70 – $1.25',
      tBarCeilingsSqFt: '$4.15 – $6.50',
    },
    neighboringCities: ['Coquitlam', 'Burnaby', 'Anmore', 'Belcarra'],
    localFaqs: [
      {
        q: 'What wall finishes are used in commercial food and beverage spaces in Port Moody?',
        a: 'We install moisture/impact-resistant drywall with Level 4 or Level 5 finishes, FRP wall cladding over cement boards in washdown areas, and vinyl-faced acoustic ceiling tiles.',
      },
    ],
  },

  // 12. City of Delta
  {
    id: 'delta',
    slug: 'delta',
    name: 'Delta',
    officialName: 'City of Delta',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'South of Fraser',
    population: '108,455',
    governingCode: 'BC Building Code (BCBC 2024) + Delta Building Bylaw',
    cityHall: {
      name: 'Delta City Hall',
      department: 'Community Planning & Development - Building Inspections',
      address: '4500 Clarence Taylor Cres, Delta, BC V4K 3E2',
      phone: '604-946-3219',
      inspectionProtocol: 'Book framing and drywall close-in inspections via Delta online inspection request system.',
    },
    fireDepartment: {
      name: 'Delta Fire & Emergency Services',
      headquarters: '11375 84 Ave, Delta, BC V4C 2L9',
      phone: '604-946-8541',
      fireRatingSpecs: '1-hr and 2-hr ULC rated assemblies; 45-min suite entry doors; industrial warehouse fire separations.',
      corridorSeparation: '5/8" Type X on heavy steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'North Delta (Scott Road Corridor)',
        focusType: 'Multi-Family Multi-Storey & Commercial Retail TIs',
        tradeSpecs: 'Steel stud partition framing, Level 4/5 drywall, T-Bar acoustic ceilings.',
        logistics: 'High-traffic commercial corridors, night work capabilities.',
      },
      {
        name: 'Ladner Village & Marina',
        focusType: 'Custom Homes, Commercial Storefronts & Waterfront Infill',
        tradeSpecs: 'Moisture-resistant drywall, architectural bulkheads, Level 5 finishing.',
        logistics: 'Quiet residential zoning, dustless sanding, clean site cleanup.',
      },
      {
        name: 'Tsawwassen & Boundary Bay',
        focusType: 'Bespoke Residential, Commercial Malls & Townhomes',
        tradeSpecs: 'Level 5 continuous skim, acoustic resilient channels, soundproof media rooms.',
        logistics: 'Strata rules, premium finish inspections.',
      },
      {
        name: 'Annacis Island & Tilbury Industrial Parks',
        focusType: 'Heavy Industrial, Logistics Warehouses & Cold Storage TIs',
        tradeSpecs: 'High-span 16ga/18ga structural framing, 2-hour and 3-hour ULC firewalls, impact-resistant drywall.',
        logistics: 'Scissor lifts, wide bay access, high-volume material handling.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Fraser River delta alluvial silts and peat soils; high seismic risk requiring ductile seismic connections and deflection tracks.',
      climateCuring: 'Maritime fog and humidity; industrial dehumidifiers and heating ensure flawless taping cycles.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts; continuous vapor barriers.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.80 – $5.75',
      drywallHangTapeSqFt: '$1.80 – $2.60',
      level5SkimSqFt: '$0.78 – $1.28',
      fireRated1HrSqFt: '$6.30 – $9.00',
      fireRated2HrSqFt: '$9.50 – $14.25',
      acousticIsolationSqFt: '$0.68 – $1.20',
      tBarCeilingsSqFt: '$4.00 – $6.30',
    },
    neighboringCities: ['Surrey', 'Richmond', 'New Westminster', 'Tsawwassen First Nation'],
    localFaqs: [
      {
        q: 'How are high-bay warehouse demising walls framed in Tilbury and Annacis Island?',
        a: 'We frame high-span demising walls up to 24 feet using heavy-gauge 6" 16ga or 18ga structural steel studs with horizontal bridging channels and double 5/8" Type X drywall achieving certified 2-hour ULC ratings.',
      },
    ],
  },

  // 13. City of Langley
  {
    id: 'langley-city',
    slug: 'langley-city',
    name: 'Langley (City)',
    officialName: 'City of Langley',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'South of Fraser',
    population: '28,963',
    governingCode: 'BC Building Code (BCBC 2024) + Langley City Building Bylaw',
    cityHall: {
      name: 'Langley City Hall',
      department: 'Development Services & Building Inspections',
      address: '20399 Douglas Cres, Langley, BC V3A 4B3',
      phone: '604-514-2800',
      inspectionProtocol: 'Book framing and drywall close-in inspections via Langley City Building Division.',
    },
    fireDepartment: {
      name: 'City of Langley Fire Rescue Service',
      headquarters: '5785 203 St, Langley, BC V3A 1W3',
      phone: '604-514-2880',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; commercial firestop compliance.',
      corridorSeparation: '5/8" Type X on 20ga steel studs with acoustic mineral wool.',
    },
    neighborhoods: [
      {
        name: 'Downtown Langley (Fraser Hwy One-Way)',
        focusType: 'Commercial Retail TIs & Mixed-Use Low-Rise',
        tradeSpecs: 'Steel stud partitions, Level 4/5 finishes, acoustic T-Bar ceilings.',
        logistics: 'Pedestrian corridor access, clean dust barriers, fast-track retail.',
      },
      {
        name: 'Nicomekl & Douglas',
        focusType: 'Multi-Family Residential Condos & Townhomes',
        tradeSpecs: 'Resilient channel acoustic isolation, fire-rated corridor assemblies.',
        logistics: 'Strata coordination, material delivery scheduling.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Fraser Valley soils; seismic bracing for suspended ceilings and tall partitions.',
      climateCuring: 'Valley humidity and summer heat; precise compound thinning and dehumidification.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.75 – $5.65',
      drywallHangTapeSqFt: '$1.75 – $2.55',
      level5SkimSqFt: '$0.75 – $1.25',
      fireRated1HrSqFt: '$6.25 – $8.95',
      fireRated2HrSqFt: '$9.50 – $14.00',
      acousticIsolationSqFt: '$0.65 – $1.15',
      tBarCeilingsSqFt: '$3.95 – $6.25',
    },
    neighboringCities: ['Langley (Township)', 'Surrey'],
    localFaqs: [
      {
        q: 'How fast can Rambo Walls start a commercial TI in Langley City?',
        a: 'We mobilize crews within 48 to 72 hours of permit issuance and site readiness. Contact Mason at 778-773-2790.',
      },
    ],
  },

  // 14. Township of Langley
  {
    id: 'langley-township',
    slug: 'langley-township',
    name: 'Langley (Township)',
    officialName: 'Township of Langley',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'Township / District',
    subRegion: 'South of Fraser',
    population: '132,603',
    governingCode: 'BC Building Code (BCBC 2024) + Township of Langley Building Bylaw 2008 No. 4647',
    cityHall: {
      name: 'Township of Langley Civic Facility',
      department: 'Community Development - Building Division',
      address: '20338 65 Ave, Langley, BC V2Y 2X3',
      phone: '604-533-6018',
      inspectionProtocol: 'Book pre-boarding framing and insulation inspections online via TOL eInspections portal with 24hr notice.',
    },
    fireDepartment: {
      name: 'Township of Langley Fire Department',
      headquarters: '22170 50 Ave, Langley, BC V2Z 1L5',
      phone: '604-532-7500',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; industrial warehouse fire separations.',
      corridorSeparation: 'Double 5/8" Type X on heavy steel studs with Roxul AFB insulation.',
    },
    neighborhoods: [
      {
        name: 'Willoughby Town Centre & Yorkson',
        focusType: 'Rapid-Growth Multi-Family Condos & Commercial TIs',
        tradeSpecs: 'Deflection track assemblies, high-volume automated taping, Level 4/5 finishes.',
        logistics: 'Active construction zones, coordinated delivery, crane-assisted staging.',
      },
      {
        name: 'Walnut Grove & North Langley',
        focusType: 'Custom Home Renovations, Medical TIs & Corporate Offices',
        tradeSpecs: 'Acoustic soundproofing, 9/16" T-Bar grids, architectural bulkheads.',
        logistics: 'Clean residential and commercial sites, dustless vacuum sanding.',
      },
      {
        name: 'Gloucester Industrial Estates',
        focusType: 'High-Bay Warehouses & Manufacturing Plants',
        tradeSpecs: 'High-span 16ga/18ga structural framing, 2-hour firewalls up to 24ft, impact drywall.',
        logistics: 'Scissor lifts, wide bay staging, bulk material handling.',
      },
      {
        name: 'Fort Langley & Aldergrove',
        focusType: 'Heritage Commercial TIs, Custom Estates & Townhomes',
        tradeSpecs: 'Level 5 full skim coat, custom timber-to-steel transitions, soundproof theaters.',
        logistics: 'Heritage aesthetic guidelines, meticulous craftsmanship.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Fraser Valley clay and loam soils; standard seismic bracing and deep-leg deflection tracks on concrete buildings.',
      climateCuring: 'Fraser Valley seasonal temperature swings; winter heating and summer compound thinning ensure clean, uncracked taping.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts; R-22+ on exterior assemblies.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.75 – $5.65',
      drywallHangTapeSqFt: '$1.75 – $2.55',
      level5SkimSqFt: '$0.75 – $1.25',
      fireRated1HrSqFt: '$6.25 – $8.95',
      fireRated2HrSqFt: '$9.50 – $14.00',
      acousticIsolationSqFt: '$0.65 – $1.15',
      tBarCeilingsSqFt: '$3.95 – $6.25',
    },
    neighboringCities: ['Langley (City)', 'Surrey', 'Abbotsford', 'Maple Ridge'],
    localFaqs: [
      {
        q: 'What is the fire separation standard for multi-family party walls in Willoughby?',
        a: 'We install ULC W411 2-hour fire-rated assemblies with double 5/8" Type X gypsum board on each side of staggered steel studs packed with Roxul AFB mineral wool.',
      },
    ],
  },

  // 15. City of Maple Ridge
  {
    id: 'maple-ridge',
    slug: 'maple-ridge',
    name: 'Maple Ridge',
    officialName: 'City of Maple Ridge',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Tri-Cities & Ridge Meadows',
    population: '90,990',
    governingCode: 'BC Building Code (BCBC 2024) + Maple Ridge Building Bylaw',
    cityHall: {
      name: 'Maple Ridge City Hall',
      department: 'Building Department',
      address: '11995 Haney Pl, Maple Ridge, BC V2X 6A9',
      phone: '604-467-7311',
      inspectionProtocol: 'Book framing and insulation inspections online via Maple Ridge eServices.',
    },
    fireDepartment: {
      name: 'Maple Ridge Fire Department',
      headquarters: '22708 119 Ave, Maple Ridge, BC V2X 2Z6',
      phone: '604-463-5880',
      fireRatingSpecs: '1-hr and 2-hr ULC assemblies; 45-min suite entry doors; firestopping certification.',
      corridorSeparation: '5/8" Type X on steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Haney & Town Centre',
        focusType: 'Commercial Retail TIs & Multi-Family Residential',
        tradeSpecs: 'Steel stud partitions, Level 4/5 drywall, T-Bar acoustic ceilings.',
        logistics: 'Town center access, scheduled deliveries.',
      },
      {
        name: 'Silver Valley & Albion',
        focusType: 'Custom Architectural Homes & Townhomes',
        tradeSpecs: 'Level 5 skim coats, cathedral ceiling framing, soundproof media rooms.',
        logistics: 'Hillside terrain, clean site management.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Mountain bench and alluvial gravel soils; standard seismic bracing.',
      climateCuring: 'Valley rainfall; ambient dehumidification ensures 24-hr mud dry times.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.75 – $5.65',
      drywallHangTapeSqFt: '$1.75 – $2.55',
      level5SkimSqFt: '$0.75 – $1.25',
      fireRated1HrSqFt: '$6.25 – $8.95',
      fireRated2HrSqFt: '$9.50 – $14.00',
      acousticIsolationSqFt: '$0.65 – $1.15',
      tBarCeilingsSqFt: '$3.95 – $6.25',
    },
    neighboringCities: ['Pitt Meadows', 'Mission', 'Langley (Township)'],
    localFaqs: [
      {
        q: 'Do you work on commercial storefront TIs in Maple Ridge?',
        a: 'Yes, Rambo Walls handles complete interior steel framing, T-Bar ceilings, fire separation walls, and Level 5 paint-ready drywall finishing for retail, office, and medical units across Maple Ridge.',
      },
    ],
  },

  // 16. City of Pitt Meadows
  {
    id: 'pitt-meadows',
    slug: 'pitt-meadows',
    name: 'Pitt Meadows',
    officialName: 'City of Pitt Meadows',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'Tri-Cities & Ridge Meadows',
    population: '19,146',
    governingCode: 'BC Building Code (BCBC 2024) + Pitt Meadows Building Bylaw',
    cityHall: {
      name: 'Pitt Meadows City Hall',
      department: 'Building & Planning Department',
      address: '12007 Harris Rd, Pitt Meadows, BC V3Y 2B5',
      phone: '604-465-2428',
      inspectionProtocol: 'Book framing and drywall close-in inspections via Pitt Meadows City Hall.',
    },
    fireDepartment: {
      name: 'Pitt Meadows Fire & Rescue Service',
      headquarters: '19240 122a Ave, Pitt Meadows, BC V3Y 2S8',
      phone: '604-465-2401',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite doors; airport business park fireproofing.',
      corridorSeparation: '5/8" Type X on steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Harris Road Commercial Core',
        focusType: 'Retail Storefront TIs & Multi-Family Infill',
        tradeSpecs: 'Steel stud partitions, Level 4/5 drywall, T-Bar acoustic ceilings.',
        logistics: 'Town core delivery, dust containment.',
      },
      {
        name: 'Golden Ears & Airport Business Park',
        focusType: 'Aviation Offices, Light Industrial & Warehouses',
        tradeSpecs: 'Heavy-gauge steel studs, 2-hour demising firewalls, acoustic soundproofing.',
        logistics: 'Airport park access, wide loading bays.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Fraser riverbed soft soils; standard seismic bracing and moisture protection.',
      climateCuring: 'River fog; on-site dehumidifiers ensure clean mud curing.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.75 – $5.65',
      drywallHangTapeSqFt: '$1.75 – $2.55',
      level5SkimSqFt: '$0.75 – $1.25',
      fireRated1HrSqFt: '$6.25 – $8.95',
      fireRated2HrSqFt: '$9.50 – $14.00',
      acousticIsolationSqFt: '$0.65 – $1.15',
      tBarCeilingsSqFt: '$3.95 – $6.25',
    },
    neighboringCities: ['Maple Ridge', 'Port Coquitlam', 'Coquitlam', 'Langley (Township)'],
    localFaqs: [
      {
        q: 'What soundproofing is used for airport business park offices in Pitt Meadows?',
        a: 'We install double 5/8" Type X drywall on resilient channels with Roxul mineral wool and Green Glue viscoelastic damping to buffer aircraft engine frequencies.',
      },
    ],
  },

  // 17. City of White Rock
  {
    id: 'white-rock',
    slug: 'white-rock',
    name: 'White Rock',
    officialName: 'City of White Rock',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'City',
    subRegion: 'South of Fraser',
    population: '21,939',
    governingCode: 'BC Building Code (BCBC 2024) + White Rock Building Bylaw',
    cityHall: {
      name: 'White Rock City Hall',
      department: 'Planning & Development Services - Building Inspections',
      address: '15322 Buena Vista Ave, White Rock, BC V4B 1Y6',
      phone: '604-541-2139',
      inspectionProtocol: 'Book pre-boarding framing and insulation inspections with White Rock building officials.',
    },
    fireDepartment: {
      name: 'White Rock Fire Rescue',
      headquarters: '15315 Pacific Ave, White Rock, BC V4B 1R1',
      phone: '604-541-2121',
      fireRatingSpecs: '1-hr and 2-hr ULC assemblies; 45-min suite entry doors; coastal condo fire separations.',
      corridorSeparation: '5/8" Type X on steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Marine Drive Waterfront & Promenade',
        focusType: 'Restaurant TIs, Boutique Commercial & Oceanfront Condos',
        tradeSpecs: 'Moisture-resistant drywall, Level 5 finishes under natural ocean daylight, acoustic ceilings.',
        logistics: 'Tight hillside parking, noise bylaw compliance, dustless sanding.',
      },
      {
        name: 'Uptown White Rock (Johnston Rd)',
        focusType: 'High-Rise Residential Towers & Medical/Commercial TIs',
        tradeSpecs: 'Deflection track assemblies, automated taping, 45-min fire-rated doors.',
        logistics: 'Elevator bookings, strata noise protocols, clean site management.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Oceanfront hillside slope soils; seismic tie-ins and moisture barrier protocols.',
      climateCuring: 'Coastal salt air and fog; controlled heating and dehumidification for Level 5 finishes.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.10 – $6.15',
      drywallHangTapeSqFt: '$1.85 – $2.75',
      level5SkimSqFt: '$0.85 – $1.40',
      fireRated1HrSqFt: '$6.60 – $9.40',
      fireRated2HrSqFt: '$9.95 – $14.85',
      acousticIsolationSqFt: '$0.75 – $1.30',
      tBarCeilingsSqFt: '$4.25 – $6.75',
    },
    neighboringCities: ['Surrey'],
    localFaqs: [
      {
        q: 'Why is acoustic insulation critical in White Rock hillside condo renovations?',
        a: 'White Rock stratas have strict sound transmission bylaws. We engineer STC 58+ wall and ceiling assemblies using resilient channels, Roxul Safe\'n\'Sound, and Green Glue damping to isolate structural vibration.',
      },
    ],
  },

  // 18. Village of Anmore
  {
    id: 'anmore',
    slug: 'anmore',
    name: 'Anmore',
    officialName: 'Village of Anmore',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'Village',
    subRegion: 'Tri-Cities & Ridge Meadows',
    population: '2,356',
    governingCode: 'BC Building Code (BCBC 2024)',
    cityHall: {
      name: 'Anmore Village Hall',
      department: 'Building Department',
      address: '2697 Sunnyside Rd, Anmore, BC V3H 5G9',
      phone: '604-469-9877',
      inspectionProtocol: 'Book framing and insulation inspections with Anmore municipal inspectors.',
    },
    fireDepartment: {
      name: 'Anmore Volunteer Fire Department',
      headquarters: '2695 Sunnyside Rd, Anmore, BC V3H 5G9',
      phone: '604-469-9877',
      fireRatingSpecs: '1-hr garage-to-living separations; 20-min rated doors; wildfire interface fireproofing.',
      corridorSeparation: '5/8" Type X with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Countryside Estates & Ravenswood',
        focusType: 'Ultra-Luxury Custom Architectural Acreages',
        tradeSpecs: 'High-span steel framing, Level 5 full skim coat, high-end soundproof theater rooms.',
        logistics: 'Acreage access, high ceilings, museum-grade finishing standards.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Mountain rock and rainforest terrain; on-site climate control for mud drying.',
      climateCuring: 'Forest microclimate with high ambient moisture; industrial dehumidifiers standard.',
      insulationReq: 'R-22+ thermal mineral wool and acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.25 – $6.50',
      drywallHangTapeSqFt: '$1.95 – $2.95',
      level5SkimSqFt: '$0.90 – $1.50',
      fireRated1HrSqFt: '$6.75 – $9.75',
      fireRated2HrSqFt: '$10.25 – $15.50',
      acousticIsolationSqFt: '$0.80 – $1.40',
      tBarCeilingsSqFt: '$4.50 – $7.00',
    },
    neighboringCities: ['Port Moody', 'Belcarra', 'Coquitlam'],
    localFaqs: [
      {
        q: 'Do you frame high cathedral ceilings for custom luxury homes in Anmore?',
        a: 'Yes, Rambo Walls specializes in heavy-gauge steel framing for 18ft to 24ft custom ceiling spans, integrated LED light troughs, and full Level 5 skim coat finishes.',
      },
    ],
  },

  // 19. Village of Belcarra
  {
    id: 'belcarra',
    slug: 'belcarra',
    name: 'Belcarra',
    officialName: 'Village of Belcarra',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'Village',
    subRegion: 'Tri-Cities & Ridge Meadows',
    population: '687',
    governingCode: 'BC Building Code (BCBC 2024)',
    cityHall: {
      name: 'Belcarra Village Hall',
      department: 'Building Inspections',
      address: '4084 Bedwell Bay Rd, Belcarra, BC V3H 4P8',
      phone: '604-937-4100',
      inspectionProtocol: 'Schedule framing and insulation inspections with municipal building officials.',
    },
    fireDepartment: {
      name: 'Belcarra Volunteer Fire Department',
      headquarters: '4084 Bedwell Bay Rd, Belcarra, BC V3H 4P8',
      phone: '604-937-4100',
      fireRatingSpecs: '1-hr garage fire separations; 20-min fire-rated doors; wildfire interface standards.',
      corridorSeparation: '5/8" Type X drywall with dense mineral wool.',
    },
    neighborhoods: [
      {
        name: 'Bedwell Bay & Belcarra Bay Waterfront',
        focusType: 'Custom Waterfront Mansions & Architectural Homes',
        tradeSpecs: 'Moisture-resistant drywall, Level 5 full skim coat, high-end soundproofing.',
        logistics: 'Narrow coastal roads, marine humidity control, dustless finishing.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Coastal granite rock terrain; specialized mechanical anchors.',
      climateCuring: 'Marine fjord humidity; on-site heating and dehumidification required.',
      insulationReq: 'R-22+ mineral wool thermal batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.25 – $6.50',
      drywallHangTapeSqFt: '$1.95 – $2.95',
      level5SkimSqFt: '$0.90 – $1.50',
      fireRated1HrSqFt: '$6.75 – $9.75',
      fireRated2HrSqFt: '$10.25 – $15.50',
      acousticIsolationSqFt: '$0.80 – $1.40',
      tBarCeilingsSqFt: '$4.50 – $7.00',
    },
    neighboringCities: ['Port Moody', 'Anmore', 'North Vancouver (District)'],
    localFaqs: [
      {
        q: 'How do you prevent moisture damage on waterfront Belcarra projects?',
        a: 'We install mold/moisture-resistant gypsum panels with continuous vapor barriers and maintain heated, dehumidified job-site environments throughout taping and painting.',
      },
    ],
  },

  // 20. Bowen Island Municipality
  {
    id: 'bowen-island',
    slug: 'bowen-island',
    name: 'Bowen Island',
    officialName: 'Bowen Island Municipality',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'Island Municipality',
    subRegion: 'North Shore & Sea-to-Sky',
    population: '4,256',
    governingCode: 'BC Building Code (BCBC 2024) + Bowen Island Land Use Bylaw',
    cityHall: {
      name: 'Bowen Island Municipal Hall',
      department: 'Building & Planning',
      address: '981 Artisan Ln, Bowen Island, BC V0N 1G2',
      phone: '604-947-4255',
      inspectionProtocol: 'Book building inspections with Bowen Island Municipal inspectors coordinated with ferry schedules.',
    },
    fireDepartment: {
      name: 'Bowen Island Volunteer Fire Department',
      headquarters: '1421 Adams Rd, Bowen Island, BC V0N 1G2',
      phone: '604-947-9324',
      fireRatingSpecs: '1-hr garage fire separations; 20-min fire-rated doors; wildfire interface standards.',
      corridorSeparation: '5/8" Type X drywall with dense mineral wool.',
    },
    neighborhoods: [
      {
        name: 'Snug Cove & Artisan Square',
        focusType: 'Commercial Retail TIs & Boutique Hospitality',
        tradeSpecs: 'Steel stud partitions, Level 4/5 drywall, T-Bar acoustic ceilings.',
        logistics: 'Ferry logistics, scheduled material freight, island staging.',
      },
      {
        name: 'Cates Hill & Tunstall Bay',
        focusType: 'Custom Architectural Waterfront Estates',
        tradeSpecs: 'Level 5 skim coat, cathedral ceiling framing, soundproof media rooms.',
        logistics: 'Island transport, on-site climate control for mud drying.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Island granite rock and coastal humidity; strict moisture management.',
      climateCuring: 'Coastal marine air; on-site dehumidifiers maintain 24-hr mud cure schedules.',
      insulationReq: 'R-22+ mineral wool thermal batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.50 – $6.95',
      drywallHangTapeSqFt: '$2.10 – $3.15',
      level5SkimSqFt: '$0.95 – $1.65',
      fireRated1HrSqFt: '$7.25 – $10.50',
      fireRated2HrSqFt: '$10.75 – $16.50',
      acousticIsolationSqFt: '$0.85 – $1.45',
      tBarCeilingsSqFt: '$4.75 – $7.50',
    },
    neighboringCities: ['West Vancouver'],
    localFaqs: [
      {
        q: 'How does Rambo Walls handle island logistics for Bowen Island projects?',
        a: 'We coordinate bulk sheetrock and steel stud ferry freight directly to site, staging complete materials in a single mobilization with dedicated crews to ensure fast, on-time delivery.',
      },
    ],
  },

  // 21. Village of Lions Bay
  {
    id: 'lions-bay',
    slug: 'lions-bay',
    name: 'Lions Bay',
    officialName: 'Village of Lions Bay',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'Village',
    subRegion: 'North Shore & Sea-to-Sky',
    population: '1,390',
    governingCode: 'BC Building Code (BCBC 2024)',
    cityHall: {
      name: 'Lions Bay Village Office',
      department: 'Building Department',
      address: '400 Centre Rd, Lions Bay, BC V0N 2E0',
      phone: '604-921-9333',
      inspectionProtocol: 'Book framing and insulation inspections with Lions Bay building officials.',
    },
    fireDepartment: {
      name: 'Lions Bay Fire Rescue',
      headquarters: '400 Centre Rd, Lions Bay, BC V0N 2E0',
      phone: '604-921-9333',
      fireRatingSpecs: '1-hr garage fire separations; 20-min fire-rated doors; Sea-to-Sky wildfire interface specs.',
      corridorSeparation: '5/8" Type X drywall with Roxul mineral wool.',
    },
    neighborhoods: [
      {
        name: 'Kelvin Grove & Brunswick Beach',
        focusType: 'Custom Architectural Oceanview Estates',
        tradeSpecs: 'Level 5 full skim coat, high-span cathedral framing, custom architectural reveals.',
        logistics: 'Steep hillside access along Sea-to-Sky Highway, weather protection.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Howe Sound coastal mountain rock; solid structural anchoring.',
      climateCuring: 'Howe Sound marine fog; commercial dehumidification required for taping.',
      insulationReq: 'R-22+ mineral wool thermal batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$4.40 – $6.75',
      drywallHangTapeSqFt: '$2.05 – $3.05',
      level5SkimSqFt: '$0.90 – $1.55',
      fireRated1HrSqFt: '$7.00 – $10.25',
      fireRated2HrSqFt: '$10.50 – $16.00',
      acousticIsolationSqFt: '$0.80 – $1.40',
      tBarCeilingsSqFt: '$4.60 – $7.25',
    },
    neighboringCities: ['West Vancouver', 'Bowen Island'],
    localFaqs: [
      {
        q: 'Do you work along the Sea-to-Sky corridor up to Lions Bay?',
        a: 'Yes, Rambo Walls regularly completes custom residential and commercial framing and Level 5 drywall projects throughout Lions Bay and the Sea-to-Sky corridor.',
      },
    ],
  },

  // 22. Tsawwassen First Nation
  {
    id: 'tsawwassen-first-nation',
    slug: 'tsawwassen-first-nation',
    name: 'Tsawwassen First Nation',
    officialName: 'Tsawwassen First Nation (TFN Lands)',
    regionalDistrict: 'Metro Vancouver (MVRD)',
    classification: 'Treaty First Nation',
    subRegion: 'South of Fraser',
    population: '2,500+ (Lands Growth)',
    governingCode: 'TFN Land Use Planning & Building Regulation Act + BC Building Code (BCBC 2024)',
    cityHall: {
      name: 'Tsawwassen First Nation Administration Office',
      department: 'Lands & Regulatory Services - Building Inspections',
      address: '1926 Tsawwassen Dr, Tsawwassen, BC V4M 4G2',
      phone: '604-943-2112',
      inspectionProtocol: 'Book framing and close-in inspections through TFN Lands & Regulatory Services.',
    },
    fireDepartment: {
      name: 'Delta Fire & Emergency Services (TFN Service Agreement)',
      headquarters: '11375 84 Ave, Delta, BC V4C 2L9',
      phone: '604-946-8541',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; mega-mall commercial fireproofing.',
      corridorSeparation: '5/8" Type X on heavy steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Tsawwassen Mills & Commercial Hub',
        focusType: 'Major Retail Centers, Big-Box TIs & Entertainment',
        tradeSpecs: 'Heavy-gauge steel studs, 2-hr retail demising firewalls, high-NRC acoustic T-Bar ceilings.',
        logistics: 'Night shifts, clean dust containment, fast-track retail openings.',
      },
      {
        name: 'TFN Master-Planned Residential Lands',
        focusType: 'Multi-Family Condos, Townhomes & Custom Residences',
        tradeSpecs: 'Deflection track assemblies, Level 4/5 finishes, acoustic party wall assemblies.',
        logistics: 'High-volume production, dedicated floor stocking crews.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Coastal delta soils; seismic framing drift connections and moisture barrier protocols.',
      climateCuring: 'Coastal fog and humidity; ambient heaters and dehumidification ensure consistent mud cure.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.80 – $5.75',
      drywallHangTapeSqFt: '$1.80 – $2.60',
      level5SkimSqFt: '$0.78 – $1.28',
      fireRated1HrSqFt: '$6.30 – $9.00',
      fireRated2HrSqFt: '$9.50 – $14.25',
      acousticIsolationSqFt: '$0.68 – $1.20',
      tBarCeilingsSqFt: '$4.00 – $6.30',
    },
    neighboringCities: ['Delta', 'Richmond', 'Surrey'],
    localFaqs: [
      {
        q: 'What building codes govern construction on Tsawwassen First Nation lands?',
        a: 'Construction on TFN lands is governed by the TFN Land Use Planning and Building Regulation Act, which enforces the BC Building Code (BCBC). All inspections are managed through TFN Regulatory Services.',
      },
    ],
  },

  // 23. City of Abbotsford
  {
    id: 'abbotsford',
    slug: 'abbotsford',
    name: 'Abbotsford',
    officialName: 'City of Abbotsford',
    regionalDistrict: 'Fraser Valley (FVRD)',
    classification: 'City',
    subRegion: 'Fraser Valley Regional District',
    population: '153,524',
    governingCode: 'BC Building Code (BCBC 2024) + Abbotsford Building Bylaw No. 2024-2011',
    cityHall: {
      name: 'Abbotsford City Hall',
      department: 'Building & Safety Inspections',
      address: '32315 South Fraser Way, Abbotsford, BC V2T 1W7',
      phone: '604-864-5525',
      inspectionProtocol: 'Schedule building framing, insulation, and close-in inspections online via Abbotsford eServices 24hr prior.',
    },
    fireDepartment: {
      name: 'Abbotsford Fire Rescue Service',
      headquarters: '32270 George Ferguson Way, Abbotsford, BC V2T 2L1',
      phone: '604-853-3566',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; agricultural/industrial firewalls.',
      corridorSeparation: '5/8" Type X on heavy steel studs with Roxul AFB insulation.',
    },
    neighborhoods: [
      {
        name: 'City Centre & South Fraser Way Corridor',
        focusType: 'Commercial Retail TIs, Medical Clinics & Multi-Family Condos',
        tradeSpecs: 'Steel stud partitions, Level 4/5 drywall, T-Bar acoustic ceilings.',
        logistics: 'Commercial core access, clean dust barriers, fast-track retail.',
      },
      {
        name: 'Clearbrook & West Abbotsford',
        focusType: 'Multi-Family Multi-Storey & Light Commercial',
        tradeSpecs: 'Deflection track assemblies, automated taping, fire-rated corridor assemblies.',
        logistics: 'High-volume production, dedicated floor stocking crews.',
      },
      {
        name: 'Abbotsford Airport (YXX) Industrial & Peardonville',
        focusType: 'Aviation Hangars, Logistics Warehouses & Manufacturing TIs',
        tradeSpecs: 'Heavy-gauge 16ga/18ga structural framing, 2-hour and 3-hour firewalls, washdown ceilings.',
        logistics: 'Scissor lifts, wide bay staging, bulk material handling.',
      },
      {
        name: 'Sumas Mountain & Eagle Mountain',
        focusType: 'Ultra-Luxury Custom Mansions & Executive Estates',
        tradeSpecs: 'High-span cathedral ceiling framing, Level 5 full skim coat, soundproof media rooms.',
        logistics: 'Mountain estate access, laser-leveled high ceilings, museum-grade finishing standards.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Sumas prairie alluvial soft silts contrasting with Eagle Mountain rock; seismic drift allowances and moisture barrier protocols.',
      climateCuring: 'Fraser Valley climate with summer heat flash-drying and humid winter fog; specialized compound viscosity control and ambient heaters.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts; R-22+ in exterior assemblies.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.65 – $5.50',
      drywallHangTapeSqFt: '$1.70 – $2.45',
      level5SkimSqFt: '$0.70 – $1.20',
      fireRated1HrSqFt: '$6.10 – $8.75',
      fireRated2HrSqFt: '$9.25 – $13.75',
      acousticIsolationSqFt: '$0.60 – $1.10',
      tBarCeilingsSqFt: '$3.85 – $6.00',
    },
    neighboringCities: ['Mission', 'Langley (Township)', 'Chilliwack'],
    localFaqs: [
      {
        q: 'What is the standard drywall finish for commercial office buildouts in Abbotsford?',
        a: 'We provide ASTM C840 Level 4 finish as the standard for commercial office spaces, with Level 5 full polymer skim coats for boardrooms, reception areas, and surfaces receiving critical raking light.',
      },
      {
        q: 'How do you prevent flash-drying in Fraser Valley summer heat?',
        a: 'During hot summer conditions, we mix joint compound with specialized setting-type retarders, keep windows shielded from direct midday sun, and maintain enclosed airflow to ensure joint tape bonds permanently without edge cracking.',
      },
    ],
  },

  // 24. City of Chilliwack
  {
    id: 'chilliwack',
    slug: 'chilliwack',
    name: 'Chilliwack',
    officialName: 'City of Chilliwack',
    regionalDistrict: 'Fraser Valley (FVRD)',
    classification: 'City',
    subRegion: 'Fraser Valley Regional District',
    population: '93,203',
    governingCode: 'BC Building Code (BCBC 2024) + Chilliwack Building Bylaw',
    cityHall: {
      name: 'Chilliwack City Hall',
      department: 'Building Department',
      address: '8550 Young Rd, Chilliwack, BC V2P 8A4',
      phone: '604-793-2905',
      inspectionProtocol: 'Book framing, insulation, and drywall inspections through the City of Chilliwack online portal.',
    },
    fireDepartment: {
      name: 'Chilliwack Fire Department',
      headquarters: '45950 Cheam Ave, Chilliwack, BC V2P 1N6',
      phone: '604-792-8713',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; industrial agricultural fire separations.',
      corridorSeparation: '5/8" Type X on heavy steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Downtown Chilliwack & District 1881',
        focusType: 'Boutique Commercial TIs, Retail & Mixed-Use',
        tradeSpecs: 'Steel stud partitions, Level 4/5 finishes, acoustic T-Bar ceilings.',
        logistics: 'Town center access, clean dust barriers, fast-track retail.',
      },
      {
        name: 'Sardis & Vedder Crossing',
        focusType: 'Multi-Family Multi-Storey, Townhomes & Commercial Plazas',
        tradeSpecs: 'Deflection track assemblies, automated taping, fire-rated corridor assemblies.',
        logistics: 'High-volume production, dedicated floor stocking crews.',
      },
      {
        name: 'Cultus Lake & Promontory',
        focusType: 'Custom Architectural Residences & Hillside Homes',
        tradeSpecs: 'Cathedral ceiling framing, Level 5 full skim coat, soundproof media rooms.',
        logistics: 'Hillside access, laser-leveled high ceilings, clean site management.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Fraser Valley river gravel and alluvial soils; standard seismic bracing.',
      climateCuring: 'Valley humidity and summer heat; precise compound thinning and on-site temperature control.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.60 – $5.45',
      drywallHangTapeSqFt: '$1.65 – $2.40',
      level5SkimSqFt: '$0.70 – $1.18',
      fireRated1HrSqFt: '$6.00 – $8.65',
      fireRated2HrSqFt: '$9.15 – $13.50',
      acousticIsolationSqFt: '$0.60 – $1.10',
      tBarCeilingsSqFt: '$3.80 – $5.95',
    },
    neighboringCities: ['Abbotsford', 'Mission', 'Kent (Agassiz)', 'Harrison Hot Springs', 'Hope'],
    localFaqs: [
      {
        q: 'Do you provide steel framing and T-Bar ceilings for retail spaces in District 1881?',
        a: 'Yes, Rambo Walls completes custom commercial framing, suspended acoustic ceilings, and Level 5 drywall finishing for restaurants, boutiques, and offices across Chilliwack.',
      },
    ],
  },

  // 25. City of Mission
  {
    id: 'mission',
    slug: 'mission',
    name: 'Mission',
    officialName: 'City of Mission',
    regionalDistrict: 'Fraser Valley (FVRD)',
    classification: 'City',
    subRegion: 'Fraser Valley Regional District',
    population: '41,519',
    governingCode: 'BC Building Code (BCBC 2024) + Mission Building Bylaw',
    cityHall: {
      name: 'Mission City Hall',
      department: 'Building Division',
      address: '8645 Stave Lake St, Mission, BC V2V 4L9',
      phone: '604-820-3726',
      inspectionProtocol: 'Book framing and drywall close-in inspections with Mission building officials.',
    },
    fireDepartment: {
      name: 'Mission Fire Rescue Service',
      headquarters: '33330 7th Ave, Mission, BC V2V 2E3',
      phone: '604-820-3793',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite entry doors; firestopping compliance.',
      corridorSeparation: '5/8" Type X on steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Downtown Mission & 1st Ave Corridor',
        focusType: 'Commercial Retail TIs & Mixed-Use Infill',
        tradeSpecs: 'Steel stud partitions, Level 4/5 drywall, T-Bar acoustic ceilings.',
        logistics: 'Town core delivery, dust containment.',
      },
      {
        name: 'Silverdale & Cedar Valley',
        focusType: 'Master-Planned Multi-Family & Custom Residences',
        tradeSpecs: 'Deflection track assemblies, Level 5 finishes, acoustic party wall assemblies.',
        logistics: 'Rapid-growth development, coordinated material delivery.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'North Fraser hillside terrain; standard seismic framing.',
      climateCuring: 'Valley rainfall; on-site dehumidifiers ensure clean mud curing.',
      insulationReq: 'R-14/R-20 mineral wool acoustic batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.65 – $5.50',
      drywallHangTapeSqFt: '$1.70 – $2.45',
      level5SkimSqFt: '$0.70 – $1.20',
      fireRated1HrSqFt: '$6.10 – $8.75',
      fireRated2HrSqFt: '$9.25 – $13.75',
      acousticIsolationSqFt: '$0.60 – $1.10',
      tBarCeilingsSqFt: '$3.85 – $6.00',
    },
    neighboringCities: ['Abbotsford', 'Maple Ridge', 'Chilliwack'],
    localFaqs: [
      {
        q: 'How fast can Mason quote a multi-family framing and drywall package in Mission?',
        a: 'Mason provides complete takeoffs within 24 hours of receiving plan drawings. Call 778-773-2790.',
      },
    ],
  },

  // 26. District of Hope
  {
    id: 'hope',
    slug: 'hope',
    name: 'Hope',
    officialName: 'District of Hope',
    regionalDistrict: 'Fraser Valley (FVRD)',
    classification: 'District Municipality',
    subRegion: 'Fraser Valley Regional District',
    population: '6,686',
    governingCode: 'BC Building Code (BCBC 2024)',
    cityHall: {
      name: 'District of Hope Municipal Hall',
      department: 'Building Department',
      address: '325 Wallace St, Hope, BC V0X 1L0',
      phone: '604-869-5671',
      inspectionProtocol: 'Book framing and close-in inspections through the District of Hope Building Department.',
    },
    fireDepartment: {
      name: 'Hope Fire Department',
      headquarters: '325 Wallace St, Hope, BC V0X 1L0',
      phone: '604-869-5671',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite doors; highway commercial fireproofing.',
      corridorSeparation: '5/8" Type X on heavy steel studs with mineral wool.',
    },
    neighborhoods: [
      {
        name: 'Downtown Hope & Wallace St Corridor',
        focusType: 'Commercial Hospitality TIs, Retail & Infill Housing',
        tradeSpecs: 'Steel stud partitions, Level 4/5 drywall, T-Bar acoustic ceilings.',
        logistics: 'Town center delivery, scheduled mobilizations.',
      },
      {
        name: 'Silver Creek & Kawkawa Lake',
        focusType: 'Custom Homes & Recreational Waterfront Residences',
        tradeSpecs: 'Cathedral ceiling framing, Level 5 full skim coat, soundproof media rooms.',
        logistics: 'Mountain valley access, on-site climate control for mud drying.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Cascade mountain rock and river gravel; heavy-gauge structural anchoring.',
      climateCuring: 'Mountain pass climate with sub-zero winter spells and hot summers; commercial heaters mandatory in winter.',
      insulationReq: 'R-22+ mineral wool thermal batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.75 – $5.75',
      drywallHangTapeSqFt: '$1.75 – $2.60',
      level5SkimSqFt: '$0.75 – $1.30',
      fireRated1HrSqFt: '$6.25 – $9.00',
      fireRated2HrSqFt: '$9.50 – $14.25',
      acousticIsolationSqFt: '$0.65 – $1.20',
      tBarCeilingsSqFt: '$4.00 – $6.30',
    },
    neighboringCities: ['Chilliwack', 'Kent (Agassiz)'],
    localFaqs: [
      {
        q: 'Do you mobilize crews for commercial and multi-family projects in Hope?',
        a: 'Yes, Rambo Walls provides full turnkey steel stud framing, insulation, drywall, and T-Bar ceiling crews for projects in Hope and the Upper Fraser Valley.',
      },
    ],
  },

  // 27. District of Kent (Agassiz)
  {
    id: 'kent-agassiz',
    slug: 'kent-agassiz',
    name: 'Kent (Agassiz)',
    officialName: 'District of Kent (Agassiz)',
    regionalDistrict: 'Fraser Valley (FVRD)',
    classification: 'District Municipality',
    subRegion: 'Fraser Valley Regional District',
    population: '6,300',
    governingCode: 'BC Building Code (BCBC 2024)',
    cityHall: {
      name: 'District of Kent Municipal Hall',
      department: 'Building Department',
      address: '7170 Cheam Ave, Agassiz, BC V0M 1A0',
      phone: '604-796-2235',
      inspectionProtocol: 'Book framing and insulation inspections with District of Kent building officials.',
    },
    fireDepartment: {
      name: 'Agassiz Fire Department',
      headquarters: '7200 Pioneer Ave, Agassiz, BC V0M 1A0',
      phone: '604-796-2614',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite doors; agricultural commercial fire separations.',
      corridorSeparation: '5/8" Type X on steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Agassiz Town Centre & Pioneer Ave',
        focusType: 'Commercial Retail TIs & Infill Housing',
        tradeSpecs: 'Steel stud partitions, Level 4/5 drywall, T-Bar acoustic ceilings.',
        logistics: 'Town center access, clean dust barriers.',
      },
      {
        name: 'Mount Woodside & Kilby Area',
        focusType: 'Custom Mountain Homes & View Estates',
        tradeSpecs: 'High cathedral ceiling framing, Level 5 full skim coat, soundproofing.',
        logistics: 'Mountain road access, on-site climate control for mud drying.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Fraser Valley alluvial soils and mountain bedrock; standard seismic bracing.',
      climateCuring: 'Valley humidity and summer heat; precise compound viscosity control and ambient heaters.',
      insulationReq: 'R-22+ mineral wool thermal batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.75 – $5.75',
      drywallHangTapeSqFt: '$1.75 – $2.60',
      level5SkimSqFt: '$0.75 – $1.30',
      fireRated1HrSqFt: '$6.25 – $9.00',
      fireRated2HrSqFt: '$9.50 – $14.25',
      acousticIsolationSqFt: '$0.65 – $1.20',
      tBarCeilingsSqFt: '$4.00 – $6.30',
    },
    neighboringCities: ['Chilliwack', 'Harrison Hot Springs', 'Hope'],
    localFaqs: [
      {
        q: 'Do you frame high cathedral ceilings for custom mountain homes in Kent / Agassiz?',
        a: 'Yes, Rambo Walls specializes in heavy-gauge steel framing for custom ceiling spans, integrated LED light troughs, and full Level 5 skim coat finishes.',
      },
    ],
  },

  // 28. Village of Harrison Hot Springs
  {
    id: 'harrison-hot-springs',
    slug: 'harrison-hot-springs',
    name: 'Harrison Hot Springs',
    officialName: 'Village of Harrison Hot Springs',
    regionalDistrict: 'Fraser Valley (FVRD)',
    classification: 'Village',
    subRegion: 'Fraser Valley Regional District',
    population: '1,905',
    governingCode: 'BC Building Code (BCBC 2024)',
    cityHall: {
      name: 'Harrison Hot Springs Village Office',
      department: 'Building Department',
      address: '495 Hot Springs Rd, Harrison Hot Springs, BC V0M 1K0',
      phone: '604-796-2171',
      inspectionProtocol: 'Book framing and drywall close-in inspections with municipal building officials.',
    },
    fireDepartment: {
      name: 'Harrison Hot Springs Volunteer Fire Department',
      headquarters: '495 Hot Springs Rd, Harrison Hot Springs, BC V0M 1K0',
      phone: '604-796-2171',
      fireRatingSpecs: '1-hr and 2-hr ULC fire separations; 45-min suite doors; resort commercial fire separations.',
      corridorSeparation: '5/8" Type X on heavy steel studs with mineral wool insulation.',
    },
    neighborhoods: [
      {
        name: 'Esplanade Waterfront & Resort Village',
        focusType: 'Resort Hospitality TIs, Boutique Hotels & Waterfront Condos',
        tradeSpecs: 'Moisture-resistant drywall, Level 5 finishes under lake daylight, acoustic T-Bar ceilings.',
        logistics: 'Resort core delivery, noise bylaw compliance, dustless sanding.',
      },
    ],
    microclimateAndSoil: {
      soilAndSeismic: 'Lakeside alluvial gravel and thermal valley humidity; strict moisture barrier protocols.',
      climateCuring: 'Lake moisture; on-site dehumidifiers maintain 24-hr mud cure schedules.',
      insulationReq: 'R-22+ mineral wool thermal batts.',
    },
    pricingMatrix: {
      steelFramingLinearFt: '$3.85 – $5.85',
      drywallHangTapeSqFt: '$1.80 – $2.65',
      level5SkimSqFt: '$0.80 – $1.35',
      fireRated1HrSqFt: '$6.40 – $9.15',
      fireRated2HrSqFt: '$9.75 – $14.50',
      acousticIsolationSqFt: '$0.70 – $1.25',
      tBarCeilingsSqFt: '$4.20 – $6.50',
    },
    neighboringCities: ['Kent (Agassiz)', 'Chilliwack'],
    localFaqs: [
      {
        q: 'What wall assemblies are recommended for hospitality and hotel suites in Harrison Hot Springs?',
        a: 'We install high-STC soundproof assemblies (STC 58+) using double 5/8" Type X on resilient channels with Roxul Safe\'n\'Sound and Green Glue damping to guarantee guest privacy.',
      },
    ],
  },
];
