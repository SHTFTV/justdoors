export type SectorType = 'all' | 'residential' | 'commercial' | 'multi-family' | 'high-rise' | 'hardware';

export type ProductCategory = 
  | 'unit-entry'
  | 'hollow-metal'
  | 'architectural-wood'
  | 'commercial-glass'
  | 'interior-doors'
  | 'hardware-access';

export interface DoorProduct {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  sectors: ('residential' | 'high-rise' | 'commercial')[];
  fireRating: string;
  acousticSTC?: string;
  coreType: string;
  standardSizes: string[];
  finishes: string[];
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  description: string;
  applications: string[];
  hardwareCompatibility: string[];
  certifications: string[];
  isFeaturedHighRise?: boolean;
}

export interface HardwareValidationResult {
  isCompatible: boolean;
  status: 'compliant' | 'warning' | 'incompatible';
  summary: string;
  ruleCode: string;
  details: string[];
  recommendations: string[];
  codeReferences: string[];
  testedAssemblies: string;
  mismatchedFields?: ('doorType' | 'fireRating' | 'lockset' | 'hinges' | 'closer' | 'frameType')[];
  suggestedLockset?: string;
  suggestedHinges?: string;
  suggestedDoorType?: string;
  suggestedFireRating?: string;
}

export interface DoorScheduleItem {
  id: string;
  openingNumber: string;
  location: string;
  doorType: string;
  size: string;
  fireRating: string;
  coreMaterial: string;
  frameType: string;
  hardwareSet: string;
  lockset?: string;
  hinges?: string;
  closer?: string;
  compatibilityStatus?: 'compliant' | 'warning' | 'incompatible';
  compatibilityFeedback?: string;
  acousticReq?: string;
  qty: number;
  notes?: string;
}

export interface ProjectMapLocation {
  x: number; // percentage on map (0 - 100)
  y: number; // percentage on map (0 - 100)
  district: string;
  city: string;
  doorTypesSupplied: string[];
  buildingType: string;
  yearCompleted: string;
}

export interface LocationSpecificChallenge {
  climateOrSoilIssue?: string;
  bylawOrPermitHurdle?: string;
  seismicOrStructuralConstraint?: string;
  engineeredSolution: string;
}

export interface ProjectGalleryItem {
  url: string;
  caption: string;
  tag?: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  municipalitySlug?: string;
  municipalityName?: string;
  clientType: 'Developer & GC' | 'Strata & Property Manager' | 'Commercial Enterprise' | 'Custom Homeowner';
  sector: 'high-rise' | 'multi-family' | 'commercial' | 'residential';
  budgetTier?: '<$50k' | '$50k-$250k' | '$250k+';
  budgetEstimate?: string;
  budgetAmount?: number;
  doorCount?: number;
  steelFramingLF?: number;
  drywallSqFt?: number;
  finishLevel?: string;
  fireRatingULC?: string;
  soundRatingSTC?: string;
  summary: string;
  challenge: string;
  locationChallenges?: LocationSpecificChallenge;
  solution: string;
  specsDelivered: string[];
  inspectionsPassed?: string[];
  image: string;
  galleryImages?: string[];
  galleryDetails?: ProjectGalleryItem[];
  mapLocation?: ProjectMapLocation;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface QuoteRequestForm {
  sector: 'high-rise' | 'commercial' | 'residential';
  name: string;
  email: string;
  phone: string;
  company?: string;
  role?: string;
  projectAddress?: string;
  openingCount?: string;
  timeline: string;
  scheduleFileName?: string;
  notes?: string;
  selectedProducts?: string[];
}
