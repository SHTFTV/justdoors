import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  Users, 
  Sliders, 
  Quote, 
  Flame, 
  Award, 
  DoorClosed, 
  Calendar, 
  Truck, 
  TrendingUp, 
  Sparkles,
  Clock,
  FileSpreadsheet,
  Cpu,
  Boxes,
  Wrench,
  CheckCheck,
  Timer,
  ChevronRight,
  ChevronDown,
  Info,
  Hammer,
  Search,
  Grid,
  Volume2,
  AlertTriangle,
  FileText,
  Compass,
  ArrowUpDown,
  Home,
  Briefcase,
  DollarSign,
  PackageCheck,
  HardHat,
  Calculator,
  Zap,
  HelpCircle,
  Download,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CASE_STUDIES } from '../data/projects';
import { ProjectCaseStudy, SectorType } from '../types';
import { ProjectMapComponent } from './ProjectMapComponent';
import { FeaturedContractorVancouver } from './FeaturedContractorVancouver';
import { ProjectTimelineVisualization } from './ProjectTimelineVisualization';
import { MUNICIPALITIES_LIST, MunicipalityData } from '../data/municipalitiesData';
import { generateProjectCaseStudyPDF } from '../utils/pdfExport';
import { useToast } from '../context/ToastContext';

interface ProjectsSectionProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
  onSelectMunicipality?: (muni: MunicipalityData) => void;
}

type ProjectCategoryTab = 'all' | 'residential' | 'commercial' | 'multi-family';

interface CategoryTabConfig {
  id: ProjectCategoryTab;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  description: string;
}

// Budget Range Filter Tiers for the Interactive Slider
export type BudgetSliderTier = 0 | 1 | 2 | 3; // 0 = All, 1 = <$50k, 2 = $50k-$250k, 3 = $250k+

export interface BudgetTierConfig {
  step: BudgetSliderTier;
  id: 'all' | '<$50k' | '$50k-$250k' | '$250k+';
  label: string;
  badge: string;
  description: string;
  typicalScope: string;
}

export interface ProjectScaleTierBreakdown {
  scaleTier: string;
  scaleName: string;
  scopeRange: string;
  supplyOnlyRange: string;
  supplyOnlyDetails: string;
  supplyInstallRange: string;
  supplyInstallDetails: string;
  fullHardwareRange: string;
  fullHardwareDetails: string;
  targetClient: string;
  turnaroundEstimate: string;
}

export const PROJECT_SCALE_BREAKDOWNS: ProjectScaleTierBreakdown[] = [
  {
    scaleTier: 'Tier 1: Boutique / Fast-Track',
    scaleName: 'Tenant Improvement & Infill Spec',
    scopeRange: 'Up to 5,000 LF Framing | Up to 20,000 sq ft Drywall',
    supplyOnlyRange: '$8,500 – $22,000 CAD',
    supplyOnlyDetails: 'Engineered 20/25ga steel studs, tracks, 5/8" Type X drywall bundles, Fry Reglet trims & fastener packages',
    supplyInstallRange: '$28,000 – $49,000 CAD',
    supplyInstallDetails: 'Full layout, precision steel framing, insulation, board hanging, Level 4/5 tape & pre-cover inspection prep',
    fullHardwareRange: '$38,000 – $65,000 CAD',
    fullHardwareDetails: 'Turnkey: Structural steel, ULC fire assemblies, QuietRock acoustic dampeners, seismic splay wire & commercial doors',
    targetClient: 'Retail TIs, Craft Breweries, Boutique Infill Duplexes',
    turnaroundEstimate: '1 to 3 Weeks',
  },
  {
    scaleTier: 'Tier 2: Mid-Scale Architectural',
    scaleName: 'Commercial HQ & Custom Residential',
    scopeRange: '5,000 – 20,000 LF Framing | 20k – 60k sq ft Drywall',
    supplyOnlyRange: '$24,000 – $75,000 CAD',
    supplyOnlyDetails: 'Heavy 18/20ga structural steel, custom radius tracks, Resilmount clips, sound batt insulation & Level 5 skim compounds',
    supplyInstallRange: '$65,000 – $195,000 CAD',
    supplyInstallDetails: 'Complete multi-level structural framing, acoustic dropped bulkheads, Fry Reglet reveals & museum-grade Level 5',
    fullHardwareRange: '$95,000 – $260,000 CAD',
    fullHardwareDetails: 'Complete engineered trade package: Deflection tracks, STC 60 party walls, 2-hr fire corridors, seismic sign-off & door sets',
    targetClient: 'Luxury Custom Homebuilders, Tech Office Fit-Outs, Waterfront HQs',
    turnaroundEstimate: '3 to 6 Weeks',
  },
  {
    scaleTier: 'Tier 3: High-Scale Infrastructure',
    scaleName: 'Multi-Family Towers & Retail Plazas',
    scopeRange: '20,000+ LF Framing | 60,000+ sq ft Drywall',
    supplyOnlyRange: '$85,000 – $280,000+ CAD',
    supplyOnlyDetails: 'Bulk mill-direct deliveries of 16/18ga structural framing, high-bay metal stud, moisture/mold-resistant DensArmor & T-Bar grid',
    supplyInstallRange: '$280,000 – $750,000+ CAD',
    supplyInstallDetails: 'Dedicated multi-crew production framing, laser rapid boarding, automatic mechanical taping, high-rise shaftliner & full sign-offs',
    fullHardwareRange: '$390,000 – $1,100,000+ CAD',
    fullHardwareDetails: 'Comprehensive master trade package: Engineered seismic schedules, ULC firestops, acoustic baffles, architectural trim & full warranty',
    targetClient: 'High-Rise Tower Developers, General Contractors, Strata Developments',
    turnaroundEstimate: '6 to 16 Weeks (Phased Turnover)',
  },
];

export const BUDGET_TIERS: BudgetTierConfig[] = [
  {
    step: 0,
    id: 'all',
    label: 'All Project Scales',
    badge: 'Any Budget',
    description: 'All completed project scales from boutique commercial fit-outs to 36-storey towers',
    typicalScope: 'All scopes ($30k – $1M+ CAD)',
  },
  {
    step: 1,
    id: '<$50k',
    label: 'Under $50k',
    badge: '<$50k CAD',
    description: 'Boutique retail TIs, duplex sound walls, acoustic drops & quick-turn tenant improvements',
    typicalScope: 'Up to 5,000 LF framing / 20k sq ft drywall',
  },
  {
    step: 2,
    id: '$50k-$250k',
    label: '$50k – $250k',
    badge: '$50k – $250k CAD',
    description: 'Luxury architectural custom estates, creative waterfront headquarters & medium-scale commercial fit-outs',
    typicalScope: '5,000 – 20,000 LF framing / 20k – 60k sq ft drywall',
  },
  {
    step: 3,
    id: '$250k+',
    label: '$250k+ High Scale',
    badge: '$250k+ CAD',
    description: 'Multi-family strata developments, commercial retail hubs, industrial high-bay & high-rise residential towers',
    typicalScope: '20,000+ LF framing / 60,000+ sq ft drywall',
  },
];

const CATEGORY_TABS: CategoryTabConfig[] = [
  {
    id: 'all',
    label: 'All Case Studies',
    shortLabel: 'All',
    icon: <Layers className="w-4 h-4" />,
    description: 'Documented cold-formed steel framing, seismic ceiling grids & Level 5 drywall completions',
  },
  {
    id: 'residential',
    label: 'Residential',
    shortLabel: 'Residential',
    icon: <Home className="w-4 h-4" />,
    description: 'Custom West Coast luxury estates, zero-trim Fry Reglet reveals & museum Level 5 finishes',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    shortLabel: 'Commercial',
    icon: <Briefcase className="w-4 h-4" />,
    description: 'Corporate headquarters, medical clinics, retail plazas & 28ft high-bay industrial distribution',
  },
  {
    id: 'multi-family',
    label: 'Multi-Family',
    shortLabel: 'Multi-Family',
    icon: <Building2 className="w-4 h-4" />,
    description: 'High-rise residential towers, strata podiums, wood-frame infill & soundproof party walls',
  },
];

type SortOption = 'featured' | 'framing-desc' | 'drywall-desc' | 'sound-desc' | 'muni-asc' | 'year-desc';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured Trade Scope' },
  { id: 'framing-desc', label: 'Steel Framing (Highest LF)' },
  { id: 'drywall-desc', label: 'Drywall Boarding (Largest Sq Ft)' },
  { id: 'sound-desc', label: 'Acoustic Sound Rating (Highest STC)' },
  { id: 'muni-asc', label: 'Municipality Name (A–Z)' },
  { id: 'year-desc', label: 'Completion Year (Newest First)' },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenQuoteModal,
  onOpenScheduleModal,
  onSelectMunicipality,
}) => {
  const toast = useToast();
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryTab>('all');
  const [selectedMuniSlug, setSelectedMuniSlug] = useState<string>('all');
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<BudgetSliderTier>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy>(CASE_STUDIES[0]);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [selectedPackageFocus, setSelectedPackageFocus] = useState<'all' | 'supply-only' | 'supply-install' | 'full-hardware'>('all');
  const [downloadingProjectId, setDownloadingProjectId] = useState<string | null>(null);

  const handleDownloadProjectPDF = (project: ProjectCaseStudy) => {
    setDownloadingProjectId(project.id);
    try {
      generateProjectCaseStudyPDF(project);
      toast.success(
        'Project Overview Downloaded',
        `Architectural summary report for "${project.title}" has been downloaded.`,
        { referenceId: `CS-${project.id.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}` }
      );
    } catch (err) {
      console.error('Failed to generate project PDF:', err);
      toast.error('Download Failed', 'Could not generate project overview PDF. Please try again.');
    } finally {
      setTimeout(() => {
        setDownloadingProjectId(null);
      }, 600);
    }
  };

  // Active budget tier configuration
  const currentBudgetConfig = BUDGET_TIERS[selectedBudgetTier];

  // Filtered & Sorted Case Studies
  const filteredAndSortedProjects = useMemo(() => {
    const list = CASE_STUDIES.filter((p) => {
      // Category Match
      let matchesCat = true;
      if (activeCategory === 'residential') {
        matchesCat = p.sector === 'residential';
      } else if (activeCategory === 'commercial') {
        matchesCat = p.sector === 'commercial';
      } else if (activeCategory === 'multi-family') {
        matchesCat = p.sector === 'multi-family' || p.sector === 'high-rise';
      }

      // Municipality Filter
      const matchesMuni = selectedMuniSlug === 'all' || p.municipalitySlug === selectedMuniSlug;

      // Budget Tier Filter
      let matchesBudget = true;
      if (selectedBudgetTier !== 0) {
        const targetTier = currentBudgetConfig.id;
        matchesBudget = p.budgetTier === targetTier;
      }

      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.municipalityName && p.municipalityName.toLowerCase().includes(q)) ||
        (p.finishLevel && p.finishLevel.toLowerCase().includes(q)) ||
        (p.budgetEstimate && p.budgetEstimate.toLowerCase().includes(q)) ||
        (p.budgetTier && p.budgetTier.toLowerCase().includes(q)) ||
        p.summary.toLowerCase().includes(q) ||
        (p.locationChallenges?.engineeredSolution && p.locationChallenges.engineeredSolution.toLowerCase().includes(q)) ||
        (p.locationChallenges?.bylawOrPermitHurdle && p.locationChallenges.bylawOrPermitHurdle.toLowerCase().includes(q)) ||
        (p.locationChallenges?.seismicOrStructuralConstraint && p.locationChallenges.seismicOrStructuralConstraint.toLowerCase().includes(q));

      return matchesCat && matchesMuni && matchesBudget && matchesSearch;
    });

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'framing-desc') {
        return (b.steelFramingLF || 0) - (a.steelFramingLF || 0);
      }
      if (sortBy === 'drywall-desc') {
        return (b.drywallSqFt || 0) - (a.drywallSqFt || 0);
      }
      if (sortBy === 'sound-desc') {
        const getSTC = (stc?: string) => {
          if (!stc) return 0;
          const match = stc.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getSTC(b.soundRatingSTC) - getSTC(a.soundRatingSTC);
      }
      if (sortBy === 'muni-asc') {
        const nameA = a.municipalityName || a.location;
        const nameB = b.municipalityName || b.location;
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'year-desc') {
        const yearA = a.mapLocation?.yearCompleted ? parseInt(a.mapLocation.yearCompleted, 10) : 2024;
        const yearB = b.mapLocation?.yearCompleted ? parseInt(b.mapLocation.yearCompleted, 10) : 2024;
        return yearB - yearA;
      }
      // default 'featured' keeps standard order
      return 0;
    });
  }, [activeCategory, selectedMuniSlug, selectedBudgetTier, currentBudgetConfig.id, searchQuery, sortBy]);


  // Unique municipalities options
  const municipalityOptions = [
    { slug: 'all', name: 'All Municipalities' },
    { slug: 'vancouver', name: 'Vancouver' },
    { slug: 'burnaby', name: 'Burnaby' },
    { slug: 'richmond', name: 'Richmond' },
    { slug: 'surrey', name: 'Surrey' },
    { slug: 'north-vancouver-city', name: 'North Vancouver' },
    { slug: 'west-vancouver', name: 'West Vancouver' },
    { slug: 'coquitlam', name: 'Coquitlam' },
    { slug: 'new-westminster', name: 'New Westminster' },
    { slug: 'township-of-langley', name: 'Langley' },
    { slug: 'abbotsford', name: 'Abbotsford' },
    { slug: 'delta', name: 'Delta' },
    { slug: 'anmore', name: 'Anmore' },
  ];

  const handleSelectCategory = (catId: ProjectCategoryTab) => {
    setActiveCategory(catId);
    // Find first matching project in the new category
    const matching = CASE_STUDIES.filter((p) => {
      if (catId === 'residential') return p.sector === 'residential';
      if (catId === 'commercial') return p.sector === 'commercial';
      if (catId === 'multi-family') return p.sector === 'multi-family' || p.sector === 'high-rise';
      return true;
    });
    if (matching.length > 0 && !matching.some(m => m.id === activeProject.id)) {
      setActiveProject(matching[0]);
    }
  };

  const getCategoryCount = (catId: ProjectCategoryTab) => {
    if (catId === 'all') return CASE_STUDIES.length;
    if (catId === 'residential') return CASE_STUDIES.filter((p) => p.sector === 'residential').length;
    if (catId === 'commercial') return CASE_STUDIES.filter((p) => p.sector === 'commercial').length;
    if (catId === 'multi-family') return CASE_STUDIES.filter((p) => p.sector === 'multi-family' || p.sector === 'high-rise').length;
    return 0;
  };

  const handleOpenMunicipalityPage = (slug?: string) => {
    if (!slug || !onSelectMunicipality) return;
    const found = MUNICIPALITIES_LIST.find(m => m.slug === slug);
    if (found) {
      onSelectMunicipality(found);
    }
  };

  return (
    <section 
      id="projects-proof"
      className="py-24 bg-neutral-950 border-b border-neutral-800 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HYPER-LOCAL CASE STUDIES & MUNICIPAL COMPLETIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Lower Mainland <span className="text-amber-400">Trade Completions</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Explore documented cold-formed steel stud framing, seismic T-Bar ceiling grids, and Level 1–5 drywall completions with hyper-local inspection sign-offs and location-specific engineering breakdowns.
            </p>
          </div>

          {/* DYNAMIC CATEGORY FILTERING TABS (Residential, Commercial, Multi-Family) */}
          <div className="flex flex-wrap items-center gap-2 bg-neutral-900/90 p-1.5 rounded-2xl border border-neutral-800 shadow-xl">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = activeCategory === tab.id;
              const count = getCategoryCount(tab.id);
              return (
                <button
                  key={tab.id}
                  id={`project-category-tab-${tab.id}`}
                  onClick={() => handleSelectCategory(tab.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-md ring-1 ring-amber-400'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <span className={isSelected ? 'text-neutral-950' : 'text-amber-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-black ${
                      isSelected
                        ? 'bg-neutral-950/20 text-neutral-950'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Contractor — Vancouver & Lower Mainland (Rambo Wall & Ceilings) */}
        <FeaturedContractorVancouver 
          onOpenQuoteModal={onOpenQuoteModal}
          onOpenScheduleModal={onOpenScheduleModal}
          onSelectMunicipality={onSelectMunicipality}
        />

        {/* Municipality, Sorting & Search Control Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          
          {/* Top Bar: Label & Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
              <MapPin className="w-4 h-4" />
              <span>Filter by Municipality & Sort Project Scopes:</span>
            </div>
            
            <span className="text-xs font-mono text-neutral-400">
              Showing <strong className="text-amber-400">{filteredAndSortedProjects.length}</strong> of {CASE_STUDIES.length} Verified Case Studies
            </span>
          </div>

          {/* INTERACTIVE BUDGET RANGE SLIDER PANEL */}
          <div id="budget-range-slider-panel" className="p-4 rounded-xl bg-neutral-950/90 border border-amber-500/20 space-y-3 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <DollarSign className="w-3.5 h-3.5" />
                </div>
                <span>Interactive Budget Range Filter:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-bold font-mono text-[11px] shadow-sm">
                  {currentBudgetConfig.badge}
                </span>
              </div>

              {selectedBudgetTier !== 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedBudgetTier(0)}
                  className="text-[11px] font-mono text-amber-400/90 hover:text-amber-300 underline text-left sm:text-right"
                >
                  Reset to All Budget Scales
                </button>
              )}
            </div>

            {/* Range Slider Track */}
            <div className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="range"
                  id="budget-range-slider-input"
                  min={0}
                  max={3}
                  step={1}
                  value={selectedBudgetTier}
                  onChange={(e) => setSelectedBudgetTier(parseInt(e.target.value, 10) as BudgetSliderTier)}
                  aria-label="Filter case studies by budget range"
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Slider Tier Buttons / Quick Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {BUDGET_TIERS.map((tier) => {
                  const isTierActive = selectedBudgetTier === tier.step;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      id={`budget-tier-btn-${tier.id}`}
                      onClick={() => setSelectedBudgetTier(tier.step)}
                      className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isTierActive
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-md ring-1 ring-amber-400/50'
                          : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-xs font-bold font-mono ${isTierActive ? 'text-amber-400' : 'text-neutral-300'}`}>
                          {tier.label}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${isTierActive ? 'bg-amber-400 ring-2 ring-amber-400/40' : 'bg-neutral-700'}`} />
                      </div>
                      <p className="text-[10px] text-neutral-400 line-clamp-1 leading-tight">
                        {tier.typicalScope}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Tier Description Blurb */}
            <div className="text-[11px] font-mono text-neutral-400 bg-neutral-900/80 px-3 py-1.5 rounded-lg border border-neutral-850 flex items-center justify-between gap-2">
              <span className="truncate">
                <strong className="text-amber-400/90">{currentBudgetConfig.label}:</strong> {currentBudgetConfig.description}
              </span>
              <span className="text-neutral-500 shrink-0">
                {selectedBudgetTier === 0 
                  ? `${filteredAndSortedProjects.length} projects`
                  : `${filteredAndSortedProjects.length} matches in tier`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            
            {/* Municipal Dropdown / Pill Selector */}
            <div className="lg:col-span-6 flex flex-wrap gap-1.5">
              {municipalityOptions.map((opt) => {
                const isActive = selectedMuniSlug === opt.slug;
                return (
                  <button
                    key={opt.slug}
                    onClick={() => setSelectedMuniSlug(opt.slug)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                        : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                    }`}
                  >
                    <span>{opt.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort By Dropdown */}
            <div className="lg:col-span-3 relative flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-amber-400 shrink-0" />
              <select
                id="case-study-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort case studies"
                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-neutral-900 text-neutral-200">
                    Sort: {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Real-time Search Input */}
            <div className="lg:col-span-3 relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Level 5, seismic, bylaw, budget..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Active Featured Case Study Hero Showcase */}
        <div id="featured-case-study-hero" className="space-y-8">
          
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-neutral-900 border-2 border-amber-500/40 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Image & Key Metric Badges Col (5 Cols) */}
              <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[460px] bg-neutral-950 flex flex-col justify-between p-6">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t via-neutral-950/60 to-neutral-950/90" />

                {/* Top Badges */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {activeProject.municipalityName && (
                    <button
                      onClick={() => handleOpenMunicipalityPage(activeProject.municipalitySlug)}
                      className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-mono font-black text-[11px] flex items-center gap-1.5 shadow-md hover:bg-amber-400 transition-colors"
                      title="View full municipal spec page"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeProject.municipalityName}</span>
                    </button>
                  )}
                  
                  <span className="px-2.5 py-1 rounded-full bg-neutral-900/90 border border-neutral-700 backdrop-blur-md text-[11px] font-mono font-bold text-amber-300">
                    {activeProject.sector === 'high-rise' ? 'MULTI-FAMILY & HIGH-RISE' : activeProject.sector.toUpperCase()}
                  </span>

                  {activeProject.budgetEstimate && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-[11px] font-mono font-bold text-emerald-300 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <span>{activeProject.budgetEstimate}</span>
                    </span>
                  )}
                </div>

                {/* Floating Metric Overlays */}
                <div className="relative z-10 space-y-2 pt-24">
                  <div className="grid grid-cols-2 gap-2">
                    {activeProject.steelFramingLF && (
                      <div className="p-2.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800">
                        <div className="text-[10px] font-mono text-neutral-400">Steel Framing</div>
                        <div className="text-sm font-mono font-bold text-amber-400">
                          {activeProject.steelFramingLF.toLocaleString()} LF
                        </div>
                      </div>
                    )}

                    {activeProject.drywallSqFt && (
                      <div className="p-2.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800">
                        <div className="text-[10px] font-mono text-neutral-400">Drywall Boarded</div>
                        <div className="text-sm font-mono font-bold text-white">
                          {activeProject.drywallSqFt.toLocaleString()} sq ft
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {activeProject.soundRatingSTC && (
                      <div className="p-2 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 text-xs flex items-center justify-between">
                        <span className="text-neutral-400 font-mono text-[10px]">Acoustic STC:</span>
                        <span className="font-bold text-amber-400 font-mono text-[11px]">{activeProject.soundRatingSTC.split(' ')[0]}</span>
                      </div>
                    )}
                    {activeProject.finishLevel && (
                      <div className="p-2 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 text-xs flex items-center justify-between">
                        <span className="text-neutral-400 font-mono text-[10px]">Finish Spec:</span>
                        <span className="font-bold text-emerald-400 font-mono text-[11px] truncate ml-1">{activeProject.finishLevel.split(' ')[0]} {activeProject.finishLevel.split(' ')[1]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details & Location-Specific Challenges (7 Cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeProject.location}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                    {activeProject.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-amber-400/90 font-medium">
                    {activeProject.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {activeProject.summary}
                  </p>

                  {/* LOCATION-SPECIFIC CHALLENGES BREAKDOWN */}
                  {activeProject.locationChallenges && (
                    <div className="rounded-2xl bg-neutral-950 border border-amber-500/30 p-4 sm:p-5 space-y-3 shadow-inner">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>Location-Specific Challenges & Engineering Solutions</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {activeProject.municipalityName || 'Lower Mainland'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {activeProject.locationChallenges.climateOrSoilIssue && (
                          <div className="space-y-1">
                            <div className="text-neutral-400 font-mono text-[11px] flex items-center gap-1 font-bold">
                              <span>🌧️ Microclimate & Soil Profile:</span>
                            </div>
                            <p className="text-neutral-300 leading-snug">
                              {activeProject.locationChallenges.climateOrSoilIssue}
                            </p>
                          </div>
                        )}

                        {activeProject.locationChallenges.bylawOrPermitHurdle && (
                          <div className="space-y-1">
                            <div className="text-neutral-400 font-mono text-[11px] flex items-center gap-1 font-bold">
                              <span>🏛️ Municipal Bylaw & Permit Hurdle:</span>
                            </div>
                            <p className="text-neutral-300 leading-snug">
                              {activeProject.locationChallenges.bylawOrPermitHurdle}
                            </p>
                          </div>
                        )}

                        {activeProject.locationChallenges.seismicOrStructuralConstraint && (
                          <div className="sm:col-span-2 space-y-1">
                            <div className="text-neutral-400 font-mono text-[11px] flex items-center gap-1 font-bold">
                              <span>📐 Seismic & Structural Movement Constraint:</span>
                            </div>
                            <p className="text-neutral-300 leading-snug">
                              {activeProject.locationChallenges.seismicOrStructuralConstraint}
                            </p>
                          </div>
                        )}

                        <div className="sm:col-span-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                          <div className="text-amber-400 font-mono text-[11px] flex items-center gap-1.5 font-bold">
                            <Hammer className="w-3.5 h-3.5" />
                            <span>Rambo Wall & Ceilings Engineered Trade Solution:</span>
                          </div>
                          <p className="text-neutral-200 leading-relaxed font-sans">
                            {activeProject.locationChallenges.engineeredSolution}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passed Municipal Inspections Strip */}
                  {activeProject.inspectionsPassed && activeProject.inspectionsPassed.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-neutral-800">
                      <div className="text-xs font-mono uppercase text-neutral-400 font-bold flex items-center gap-1.5">
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified Municipal Inspections Passed:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-300">
                        {activeProject.inspectionsPassed.map((insp, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight text-[11px] font-mono">{insp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Delivered Assemblies List */}
                  <div className="space-y-2 pt-2 border-t border-neutral-800">
                    <div className="text-xs font-mono uppercase text-neutral-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Delivered Trade Specifications:</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-200">
                      {activeProject.specsDelivered.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-snug text-xs">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                      {/* Testimonial Quote Blurb Banner */}
                      {activeProject.testimonial && (
                        <div className="p-4 rounded-2xl bg-neutral-900/95 border border-amber-500/40 relative overflow-hidden shadow-xl space-y-3">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                              <Quote className="w-4 h-4 text-amber-400 shrink-0" />
                              <span>Verified Client & GC Endorsement</span>
                            </div>
                            <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              ))}
                              <span className="text-[10px] font-mono font-bold text-neutral-300 ml-1">5.0 / 5.0</span>
                            </div>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-neutral-100 italic leading-relaxed pl-1 font-sans">
                            "{activeProject.testimonial.quote}"
                          </p>
                          
                          <div className="pt-2.5 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-300">
                                {activeProject.testimonial.author.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <strong className="text-white">{activeProject.testimonial.author}</strong>
                                <span className="text-neutral-400 ml-1.5">— {activeProject.testimonial.role}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-amber-400 font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                                {activeProject.testimonial.company}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-neutral-400 flex items-center gap-2">
                    <span>Municipality:</span>
                    <span className="font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                      {activeProject.municipalityName || activeProject.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleDownloadProjectPDF(activeProject)}
                      disabled={downloadingProjectId === activeProject.id}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-md active:scale-95 group"
                      title="Download Architectural Project Overview PDF"
                    >
                      <Download className={`w-3.5 h-3.5 text-amber-400 group-hover:translate-y-0.5 transition-transform ${downloadingProjectId === activeProject.id ? 'animate-bounce' : ''}`} />
                      <span>{downloadingProjectId === activeProject.id ? 'Generating PDF...' : 'Download Project Overview'}</span>
                    </button>

                    {activeProject.municipalitySlug && onSelectMunicipality && (
                      <button
                        onClick={() => handleOpenMunicipalityPage(activeProject.municipalitySlug)}
                        className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white border border-neutral-700 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span>View {activeProject.municipalityName?.replace('City of ', '').replace('District of ', '').replace('Village of ', '')} Spec Page</span>
                      </button>
                    )}

                    <button
                      onClick={onOpenScheduleModal}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-md transition-transform active:scale-95"
                    >
                      <span>Price Your Scope with Mason</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

          {/* Interactive Client Endorsements & Social Proof Quick-Bar */}
          <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                <Quote className="w-4 h-4 text-amber-400" />
                <span>Verified General Contractor & Client Endorsements</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-white font-bold">5.0 Star Average</span>
                <span className="text-neutral-500">•</span>
                <span className="text-emerald-400 font-bold">100% Inspection Pass Rate</span>
              </div>
            </div>

            {/* Testimonials Quick Carousel/Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {CASE_STUDIES.filter(p => p.testimonial).map((p) => {
                const isActive = activeProject.id === p.id;
                const initials = p.testimonial?.author.split(' ').map(n => n[0]).join('') || 'GC';
                return (
                  <button
                    key={`testimonial-pill-${p.id}`}
                    onClick={() => {
                      setActiveProject(p);
                      const el = document.getElementById('featured-case-study-hero');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between group ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-md ring-1 ring-amber-400/50'
                        : 'bg-neutral-950/80 hover:bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className={`font-bold flex items-center gap-1 ${isActive ? 'text-amber-400' : 'text-neutral-300'}`}>
                          <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 text-[9px] flex items-center justify-center font-bold">
                            {initials}
                          </span>
                          <span className="truncate max-w-[100px]">{p.testimonial?.author}</span>
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                          {p.municipalityName?.replace('City of ', '').replace('District of ', '') || p.sector}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-300 italic line-clamp-2 leading-tight group-hover:text-white transition-colors">
                        "{p.testimonial?.quote}"
                      </p>
                    </div>
                    <div className="text-[9px] font-mono text-amber-400/90 pt-1 border-t border-neutral-850 mt-1.5 flex items-center justify-between">
                      <span className="truncate max-w-[130px]">{p.testimonial?.company}</span>
                      <span className="text-neutral-500 group-hover:text-amber-300">View &rarr;</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Thumbnail Selector Cards Grid with In-Card Location Challenge Accordions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-mono text-neutral-400 uppercase font-bold flex items-center gap-2">
                <Grid className="w-4 h-4 text-amber-400" />
                <span>{activeCategory === 'all' ? 'All Case Studies' : `${activeCategory.toUpperCase()} Case Studies`} ({filteredAndSortedProjects.length} Available):</span>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Click a card to feature or expand location challenges below
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedProjects.map((project) => {
                const isSelected = activeProject.id === project.id;
                const isCardExpanded = expandedCardId === project.id;

                return (
                  <div
                    key={project.id}
                    id={`project-card-${project.id}`}
                    className={`rounded-2xl border text-left transition-all flex flex-col justify-between overflow-hidden group ${
                      isSelected
                        ? 'bg-neutral-900 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400'
                        : 'bg-neutral-950/90 hover:bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="p-4 space-y-3">
                      
                      {/* Top Badges */}
                      <div className="flex items-center justify-between text-xs gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-[10px] uppercase font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                            {project.municipalityName?.replace('City of ', '').replace('District of ', '').replace('Village of ', '') || project.sector}
                          </span>
                          {project.budgetEstimate && (
                            <span className="font-mono text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-0.5">
                              <DollarSign className="w-2.5 h-2.5" />
                              <span>{project.budgetEstimate}</span>
                            </span>
                          )}
                        </div>

                        {project.steelFramingLF && (
                          <span className="text-neutral-300 text-[11px] font-mono font-bold flex items-center gap-1">
                            <Hammer className="w-3 h-3 text-amber-400" />
                            {project.steelFramingLF.toLocaleString()} LF
                          </span>
                        )}
                      </div>

                      {/* Card Media & Title */}
                      <button
                        onClick={() => {
                          setActiveProject(project);
                          const el = document.getElementById('featured-case-study-hero');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className="w-full text-left flex gap-3 items-center group/btn"
                      >
                        <img 
                          src={project.image} 
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-800 group-hover/btn:scale-105 transition-transform"
                        />
                        <div className="space-y-1 min-w-0">
                          <div className="text-sm font-bold text-white leading-tight group-hover/btn:text-amber-300 transition-colors line-clamp-2">
                            {project.title}
                          </div>
                          <div className="text-[11px] text-neutral-400 line-clamp-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-neutral-500 shrink-0" />
                            <span>{project.location}</span>
                          </div>
                          {project.finishLevel && (
                            <div className="text-[10px] font-mono text-emerald-400 line-clamp-1">
                              {project.finishLevel}
                            </div>
                          )}
                        </div>
                      </button>

                      {/* Client Testimonial Blurb Strip (Direct Social Proof) */}
                      {project.testimonial && (
                        <div 
                          onClick={() => {
                            setActiveProject(project);
                            const el = document.getElementById('featured-case-study-hero');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className="p-3 rounded-xl bg-neutral-900/95 hover:bg-neutral-900 border border-amber-500/25 hover:border-amber-500/50 space-y-1.5 relative group/quote cursor-pointer transition-all shadow-sm"
                          title="Click to spotlight this project & full review"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                            <span className="flex items-center gap-1 font-bold">
                              <Quote className="w-3 h-3 text-amber-400" />
                              <span>CLIENT VERIFIED REVIEW:</span>
                            </span>
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-[11px] text-neutral-200 italic line-clamp-2 leading-snug group-hover/quote:text-white transition-colors">
                            "{project.testimonial.quote}"
                          </p>
                          <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-between pt-1.5 border-t border-neutral-850">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-bold flex items-center justify-center shrink-0">
                                {project.testimonial.author.split(' ').map(n => n[0]).join('')}
                              </span>
                              <span className="text-white font-medium truncate">{project.testimonial.author}</span>
                            </div>
                            <span className="text-amber-400/90 font-bold truncate max-w-[120px] shrink-0">{project.testimonial.company}</span>
                          </div>
                        </div>
                      )}

                      {/* Location Challenge Teaser & Expand Toggle */}
                      {project.locationChallenges && (
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 leading-snug">
                            <div className="flex items-center justify-between font-mono text-[10px] text-amber-400 font-bold mb-1">
                              <span className="flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                <span>LOCATION CHALLENGE:</span>
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedCardId(isCardExpanded ? null : project.id);
                                }}
                                className="text-amber-400/90 hover:text-amber-300 underline font-normal text-[10px] flex items-center gap-0.5"
                              >
                                <span>{isCardExpanded ? 'Collapse' : 'Expand Details'}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${isCardExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                            <p className="line-clamp-2 text-neutral-300">
                              {project.locationChallenges.bylawOrPermitHurdle || project.locationChallenges.climateOrSoilIssue || project.locationChallenges.seismicOrStructuralConstraint}
                            </p>
                          </div>

                          {/* Accordion Content if expanded */}
                          <AnimatePresence>
                            {isCardExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-3 rounded-xl bg-neutral-950/90 border border-amber-500/30 text-xs space-y-2"
                              >
                                {project.locationChallenges.climateOrSoilIssue && (
                                  <div>
                                    <div className="text-amber-400 font-mono text-[10px] font-bold">Microclimate / Soil:</div>
                                    <p className="text-neutral-300 text-[11px]">{project.locationChallenges.climateOrSoilIssue}</p>
                                  </div>
                                )}
                                {project.locationChallenges.seismicOrStructuralConstraint && (
                                  <div>
                                    <div className="text-amber-400 font-mono text-[10px] font-bold">Seismic / Structural:</div>
                                    <p className="text-neutral-300 text-[11px]">{project.locationChallenges.seismicOrStructuralConstraint}</p>
                                  </div>
                                )}
                                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                                  <div className="text-amber-400 font-mono text-[10px] font-bold">Engineered Solution:</div>
                                  <p className="text-neutral-200 text-[11px]">{project.locationChallenges.engineeredSolution}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* Prominent Download Project Overview PDF Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadProjectPDF(project);
                        }}
                        disabled={downloadingProjectId === project.id}
                        className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 hover:border-amber-400 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all group/pdf active:scale-[0.98] shadow-sm"
                        title={`Download ${project.title} Architectural PDF Overview`}
                      >
                        <Download className={`w-3.5 h-3.5 text-amber-400 group-hover/pdf:translate-y-0.5 transition-transform ${downloadingProjectId === project.id ? 'animate-bounce' : ''}`} />
                        <span>{downloadingProjectId === project.id ? 'Generating PDF...' : 'Download Project Overview'}</span>
                      </button>

                    </div>

                    {/* Card Footer */}
                    <div className="p-3 bg-neutral-950/60 border-t border-neutral-900 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setActiveProject(project);
                          const el = document.getElementById('featured-case-study-hero');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className="text-amber-400 font-mono font-bold text-[11px] flex items-center gap-1 hover:text-amber-300 transition-colors"
                      >
                        <span>{isSelected ? 'Currently Featured' : 'View Full Case Study'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {project.municipalitySlug && onSelectMunicipality && (
                        <button
                          onClick={() => handleOpenMunicipalityPage(project.municipalitySlug)}
                          className="text-neutral-400 hover:text-white font-mono text-[10px] underline"
                          title="Open City Spec Page"
                        >
                          City Specs
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ESTIMATED PROJECT SCALE BREAKDOWN TABLE (B2B CLIENT QUALIFICATION) */}
        <div id="estimated-project-scale-breakdown" className="space-y-6 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>B2B Commercial Procurement & Trade Qualification Guide</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Estimated <span className="text-amber-400">Project Scale & Price Breakdown</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Benchmark contractor pricing and delivery models across Metro Vancouver and the Fraser Valley. Designed to help General Contractors, Commercial Owners, and Developers rapidly qualify project budgets and contract structures.
              </p>
            </div>

            {/* Quick Procurement Mode Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-neutral-950 border border-neutral-800 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedPackageFocus('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedPackageFocus === 'all'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                All Packages
              </button>
              <button
                type="button"
                onClick={() => setSelectedPackageFocus('supply-only')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedPackageFocus === 'supply-only'
                    ? 'bg-blue-500 text-white font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Supply Only
              </button>
              <button
                type="button"
                onClick={() => setSelectedPackageFocus('supply-install')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedPackageFocus === 'supply-install'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Supply & Install
              </button>
              <button
                type="button"
                onClick={() => setSelectedPackageFocus('full-hardware')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedPackageFocus === 'full-hardware'
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Full Hardware
              </button>
            </div>
          </div>

          {/* Structured Responsive Breakdown Table */}
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/90 text-xs font-mono text-neutral-300">
                  <th className="p-4 sm:p-5 w-[24%] font-bold text-white uppercase tracking-wider">
                    Project Scale & Scope
                  </th>
                  <th className={`p-4 sm:p-5 w-[25%] transition-colors ${
                    selectedPackageFocus === 'supply-only' ? 'bg-blue-950/40 text-blue-300 border-x border-blue-500/30' : ''
                  }`}>
                    <div className="flex items-center gap-1.5 text-blue-400 font-bold uppercase">
                      <Truck className="w-4 h-4" />
                      <span>Supply Only</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-normal block mt-0.5">Mill & distributor packaged materials</span>
                  </th>
                  <th className={`p-4 sm:p-5 w-[26%] transition-colors ${
                    selectedPackageFocus === 'supply-install' ? 'bg-amber-950/40 text-amber-300 border-x border-amber-500/30' : ''
                  }`}>
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase">
                      <HardHat className="w-4 h-4" />
                      <span>Supply & Install</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-normal block mt-0.5">Turnkey trade labor + material warranty</span>
                  </th>
                  <th className={`p-4 sm:p-5 w-[25%] transition-colors ${
                    selectedPackageFocus === 'full-hardware' ? 'bg-emerald-950/40 text-emerald-300 border-x border-emerald-500/30' : ''
                  }`}>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase">
                      <PackageCheck className="w-4 h-4" />
                      <span>Full Hardware Package</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-normal block mt-0.5">Architectural doors, seismic & ULC firestops</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850 text-xs">
                {PROJECT_SCALE_BREAKDOWNS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                    
                    {/* Scale Tier & Scope Specs */}
                    <td className="p-4 sm:p-5 align-top bg-neutral-900/30">
                      <div className="space-y-1.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-[10px] uppercase">
                          {row.scaleTier}
                        </span>
                        <h4 className="text-sm font-bold text-white font-display">
                          {row.scaleName}
                        </h4>
                        <div className="text-[11px] font-mono text-neutral-300 bg-neutral-950/80 p-2 rounded-lg border border-neutral-850">
                          <strong className="text-amber-400/90">Scope:</strong> {row.scopeRange}
                        </div>
                        <div className="pt-1 text-[11px] text-neutral-400">
                          <span className="text-neutral-500">Typical Clients:</span> {row.targetClient}
                        </div>
                        <div className="text-[11px] font-mono text-emerald-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Timeline: {row.turnaroundEstimate}</span>
                        </div>
                      </div>
                    </td>

                    {/* Supply Only Column */}
                    <td className={`p-4 sm:p-5 align-top transition-colors ${
                      selectedPackageFocus === 'supply-only' ? 'bg-blue-950/20 border-x border-blue-500/20' : ''
                    }`}>
                      <div className="space-y-2">
                        <div className="text-base font-bold font-mono text-blue-400">
                          {row.supplyOnlyRange}
                        </div>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">
                          {row.supplyOnlyDetails}
                        </p>
                        <ul className="space-y-1 text-[10px] font-mono text-neutral-400 pt-1">
                          <li className="flex items-center gap-1 text-neutral-300">
                            <CheckCheck className="w-3 h-3 text-blue-400" />
                            <span>Job-site crane & tailgate staging</span>
                          </li>
                          <li className="flex items-center gap-1 text-neutral-300">
                            <CheckCheck className="w-3 h-3 text-blue-400" />
                            <span>Precision take-off material BOM</span>
                          </li>
                        </ul>
                      </div>
                    </td>

                    {/* Supply & Install Column */}
                    <td className={`p-4 sm:p-5 align-top transition-colors ${
                      selectedPackageFocus === 'supply-install' ? 'bg-amber-950/20 border-x border-amber-500/20' : ''
                    }`}>
                      <div className="space-y-2">
                        <div className="text-base font-bold font-mono text-amber-400">
                          {row.supplyInstallRange}
                        </div>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">
                          {row.supplyInstallDetails}
                        </p>
                        <ul className="space-y-1 text-[10px] font-mono text-neutral-400 pt-1">
                          <li className="flex items-center gap-1 text-neutral-300">
                            <CheckCheck className="w-3 h-3 text-amber-400" />
                            <span>Red-Seal trade crews & site supervision</span>
                          </li>
                          <li className="flex items-center gap-1 text-neutral-300">
                            <CheckCheck className="w-3 h-3 text-amber-400" />
                            <span>Laser plumb Level 4/5 inspection guarantee</span>
                          </li>
                        </ul>
                      </div>
                    </td>

                    {/* Full Hardware Package Column */}
                    <td className={`p-4 sm:p-5 align-top transition-colors ${
                      selectedPackageFocus === 'full-hardware' ? 'bg-emerald-950/20 border-x border-emerald-500/20' : ''
                    }`}>
                      <div className="space-y-2">
                        <div className="text-base font-bold font-mono text-emerald-400">
                          {row.fullHardwareRange}
                        </div>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">
                          {row.fullHardwareDetails}
                        </p>
                        <ul className="space-y-1 text-[10px] font-mono text-neutral-400 pt-1">
                          <li className="flex items-center gap-1 text-neutral-300">
                            <CheckCheck className="w-3 h-3 text-emerald-400" />
                            <span>Single-point trade accountability</span>
                          </li>
                          <li className="flex items-center gap-1 text-neutral-300">
                            <CheckCheck className="w-3 h-3 text-emerald-400" />
                            <span>Certified engineer seismic schedule sign-off</span>
                          </li>
                        </ul>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Qualification Action Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold shrink-0 shadow-lg">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-mono">
                  Have architectural drawings or tender bid documents ready?
                </h4>
                <p className="text-xs text-neutral-300">
                  Upload CAD/PDF blueprints for an itemized line-item takeoff covering all three procurement options within 24–48 hours.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenQuoteModal('commercial')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Request B2B Trade Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onOpenScheduleModal}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-mono text-xs transition-colors"
              >
                Book Estimator Call
              </button>
            </div>
          </div>
        </div>

        {/* B2B Procurement & Installation Master Timeline Schedule */}
        <ProjectTimelineVisualization
          onOpenQuoteModal={onOpenQuoteModal}
          onOpenScheduleModal={onOpenScheduleModal}
        />

        {/* Interactive GIS & Metropolitan Project Map Component */}
        <ProjectMapComponent
          projects={CASE_STUDIES}
          activeProject={activeProject}
          onSelectProject={(project) => {
            setActiveProject(project);
            const heroElem = document.getElementById('featured-case-study-hero');
            if (heroElem) {
              heroElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          onOpenScheduleModal={onOpenScheduleModal}
        />

      </div>
    </section>
  );
};
