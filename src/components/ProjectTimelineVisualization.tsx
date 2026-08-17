import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  FileSpreadsheet, 
  HardHat, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  Sliders, 
  Building2, 
  Briefcase, 
  Home, 
  Info,
  Timer,
  CheckCheck,
  Flame,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type TimelineProjectType = 'commercial-ti' | 'multi-family' | 'high-rise' | 'institutional';

export interface TimelinePhase {
  id: string;
  stepNumber: number;
  name: string;
  shortName: string;
  durationWeeks: {
    standard: number;
    fastTrack: number;
  };
  startWeek: {
    standard: number;
    fastTrack: number;
  };
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  gcResponsibility: string;
  proactiveMitigation: string;
  inspectionCheckpoint?: string;
}

export interface ProjectTimelineScenario {
  id: TimelineProjectType;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  standardTotalWeeks: number;
  fastTrackTotalWeeks: number;
  doorCountRange: string;
  description: string;
  typicalApplications: string;
  phases: TimelinePhase[];
}

export const TIMELINE_SCENARIOS: ProjectTimelineScenario[] = [
  {
    id: 'commercial-ti',
    title: 'Commercial Office & Tenant Improvement (TI)',
    subtitle: 'Fast-cycle retail, corporate office interior, and tenant modifications (10–60 openings)',
    icon: Briefcase,
    standardTotalWeeks: 6,
    fastTrackTotalWeeks: 3.5,
    doorCountRange: '10 – 60 Openings',
    description: 'Optimized for rapid turnaround interior renovations. Utilizes standard aluminum/steel knock-down frames with factory-machined wood or hollow metal doors and standard architectural hardware.',
    typicalApplications: 'Retail build-outs, corporate suites, clinical offices, restaurant interior partitions',
    phases: [
      {
        id: 'ti-submittals',
        stepNumber: 1,
        name: 'Shop Drawings, Schedule Takeoff & Submittals',
        shortName: 'Takeoff & Submittals',
        durationWeeks: { standard: 1.5, fastTrack: 1 },
        startWeek: { standard: 0, fastTrack: 0 },
        color: 'from-blue-500/20 to-blue-600/30 border-blue-500/40 text-blue-400',
        icon: FileSpreadsheet,
        deliverables: [
          'Detailed hardware schedule cross-referencing floor plans',
          'Frame throat dimensions & wall thickness verification',
          'Electronic architectural submittal package for consultant approval'
        ],
        gcResponsibility: 'Verify finished wall thickness (drywall + stud gauges) and electrical low-voltage rough-in locations.',
        proactiveMitigation: 'Early hardware lock-in prevents 8-week delays on specialty mortise locksets or access control readers.',
        inspectionCheckpoint: 'Architectural specification sign-off'
      },
      {
        id: 'ti-fab',
        stepNumber: 2,
        name: 'Material Sourcing & Factory Custom Prepping',
        shortName: 'Factory Prepping',
        durationWeeks: { standard: 2.5, fastTrack: 1.5 },
        startWeek: { standard: 1.5, fastTrack: 1 },
        color: 'from-amber-500/20 to-amber-600/30 border-amber-500/40 text-amber-400',
        icon: Layers,
        deliverables: [
          'Hollow metal frame roll-forming and corner miter welding',
          'Precision CNC door mortising for locks, strikes & hinges',
          'ULC fire label stamping & factory primer/stain finish'
        ],
        gcResponsibility: 'Confirm dry framing inspection date to align delivery with drywall completion.',
        proactiveMitigation: 'Stocked core slabs in local warehouse cut standard 6-week factory queues in half.',
        inspectionCheckpoint: 'ULC / Warnock Hersey label verification'
      },
      {
        id: 'ti-delivery',
        stepNumber: 3,
        name: 'Staged Site Delivery & Climate Acclimation',
        shortName: 'Staged Delivery',
        durationWeeks: { standard: 0.5, fastTrack: 0.5 },
        startWeek: { standard: 4, fastTrack: 2.5 },
        color: 'from-purple-500/20 to-purple-600/30 border-purple-500/40 text-purple-400',
        icon: Truck,
        deliverables: [
          'Tailgate jobsite delivery bundled by door schedule tags',
          'Secured indoor hardware storage boxes organized by opening ID',
          'Wood door 48-hour moisture acclimation in conditioned space'
        ],
        gcResponsibility: 'Ensure climate control (HVAC) is operational with relative humidity between 30%–50%.',
        proactiveMitigation: 'Tagging hardware to specific door numbers eliminates misplaced cylinders on busy jobsites.'
      },
      {
        id: 'ti-install',
        stepNumber: 4,
        name: 'Trade Installation, Hardware Hanging & Commissioning',
        shortName: 'Install & Sign-off',
        durationWeeks: { standard: 1.5, fastTrack: 0.5 },
        startWeek: { standard: 4.5, fastTrack: 3 },
        color: 'from-emerald-500/20 to-emerald-600/30 border-emerald-500/40 text-emerald-400',
        icon: HardHat,
        deliverables: [
          'Laser plumb installation of steel frames & solid core slabs',
          'Closer sweep/latch speed regulation & perimeter weatherstrip sealing',
          'Lock cylinder master key pinning & final inspection sign-off'
        ],
        gcResponsibility: 'Coordinate flooring transitions and threshold clearances before final door bottom drop-seals are set.',
        proactiveMitigation: 'Red-Seal carpenters ensure zero binding or latching failures during municipal occupancy inspection.',
        inspectionCheckpoint: 'Municipal Occupancy & Fire Marshal sign-off'
      }
    ]
  },
  {
    id: 'multi-family',
    title: 'Multi-Family Residential & Mixed-Use',
    subtitle: 'Low-rise and mid-rise wood-frame or concrete residential projects (60–300 openings)',
    icon: Home,
    standardTotalWeeks: 10,
    fastTrackTotalWeeks: 6.5,
    doorCountRange: '60 – 300 Openings',
    description: 'Engineered for wood-frame and mass-timber multi-unit residential developments. Balances high-volume 20-min suite entry fire doors, STC acoustic drop-seals, and common area commercial access portals.',
    typicalApplications: 'Apartment complexes, townhouse developments, mixed-use podium buildings, senior living residences',
    phases: [
      {
        id: 'mf-takeoff',
        stepNumber: 1,
        name: 'Takeoff, Hardware Keying Schedules & Submittals',
        shortName: 'Takeoff & Keying',
        durationWeeks: { standard: 2, fastTrack: 1.5 },
        startWeek: { standard: 0, fastTrack: 0 },
        color: 'from-blue-500/20 to-blue-600/30 border-blue-500/40 text-blue-400',
        icon: FileSpreadsheet,
        deliverables: [
          'Complete door & hardware schedule cross-referencing floor plans',
          'Grand master keying bitting schedule for property management',
          'VBBL / BCBC 20-minute suite entry fire rating compliance documentation'
        ],
        gcResponsibility: 'Sign off on master key hierarchy and suite door numbering plan early.',
        proactiveMitigation: 'Locking master key bitting 8 weeks ahead prevents tenant turnover lock re-pinning costs.',
        inspectionCheckpoint: 'Consultant & Property Management keying approval'
      },
      {
        id: 'mf-fab',
        stepNumber: 2,
        name: 'Mass Production, Frame Welding & Acoustic Slabs',
        shortName: 'Mass Fabrication',
        durationWeeks: { standard: 4, fastTrack: 2.5 },
        startWeek: { standard: 2, fastTrack: 1.5 },
        color: 'from-amber-500/20 to-amber-600/30 border-amber-500/40 text-amber-400',
        icon: Layers,
        deliverables: [
          'High-volume hollow metal frame manufacturing with welded drywall anchors',
          'Solid particleboard & stave core wood slab CNC routing',
          'Factory pre-finishing and acoustic perimeter seal fitting'
        ],
        gcResponsibility: 'Verify framing rough opening dimensions and sill level across all floors.',
        proactiveMitigation: 'Staggered manufacturing batches match the GC’s floor-by-floor drywall progression.',
        inspectionCheckpoint: 'ULC-S104 20-min fire label certification'
      },
      {
        id: 'mf-phased-delivery',
        stepNumber: 3,
        name: 'Phased Floor-by-Floor Crane Staging',
        shortName: 'Floor-by-Floor Delivery',
        durationWeeks: { standard: 1.5, fastTrack: 1 },
        startWeek: { standard: 6, fastTrack: 4 },
        color: 'from-purple-500/20 to-purple-600/30 border-purple-500/40 text-purple-400',
        icon: Truck,
        deliverables: [
          'Boom-truck or tower crane floor landing of pre-palletized door packages',
          'Hardware boxes delivered direct into corresponding suite entries',
          'Protected cardboard wrapping retained to prevent painter damage'
        ],
        gcResponsibility: 'Coordinate tower crane hook time and designate clear staging zones on each level.',
        proactiveMitigation: 'Floor-specific packaging eliminates bottleneck elevator transport after exterior hoist is dismantled.'
      },
      {
        id: 'mf-install',
        stepNumber: 4,
        name: 'Turnkey Installation, Closer Tuning & Life Safety Sign-off',
        shortName: 'Installation & Handover',
        durationWeeks: { standard: 2.5, fastTrack: 1.5 },
        startWeek: { standard: 7.5, fastTrack: 5 },
        color: 'from-emerald-500/20 to-emerald-600/30 border-emerald-500/40 text-emerald-400',
        icon: HardHat,
        deliverables: [
          'Full suite entry & common corridor door hanging',
          'Automatic door closer latching calibration (ensuring positive latch against HVAC pressure)',
          'Fire marshal pre-inspection walk-through & warranty package handover'
        ],
        gcResponsibility: 'Ensure corridor hallway pressurization systems are balanced before final closer adjustments.',
        proactiveMitigation: 'Pre-testing corridor positive latching eliminates common VBBL inspection rejection reasons.',
        inspectionCheckpoint: 'Building Inspector & City Fire Dept. Final Sign-off'
      }
    ]
  },
  {
    id: 'high-rise',
    title: 'High-Rise Concrete Residential & Commercial Towers',
    subtitle: 'Major multi-floor developments (300–1,200+ openings across 20–50 storeys)',
    icon: Building2,
    standardTotalWeeks: 16,
    fastTrackTotalWeeks: 11,
    doorCountRange: '300 – 1,200+ Openings',
    description: 'Comprehensive phased scheduling for concrete high-rise towers. Coordinates parkade fire separations, emergency stairwell 90-min pressurized doors, suite entries, and high-security penthouse openings.',
    typicalApplications: 'Residential high-rises, mixed-use office towers, hotel high-rises, institutional campuses',
    phases: [
      {
        id: 'hr-eng',
        stepNumber: 1,
        name: 'Engineering, Seismic Calculations & Specification Approval',
        shortName: 'Engineering & BIM',
        durationWeeks: { standard: 3, fastTrack: 2 },
        startWeek: { standard: 0, fastTrack: 0 },
        color: 'from-blue-500/20 to-blue-600/30 border-blue-500/40 text-blue-400',
        icon: FileSpreadsheet,
        deliverables: [
          'BIM / Revit 3D door opening model integration',
          'Seismic anchorage calculation schedule signed by Professional Engineer (P.Eng)',
          'High-rise stairwell pressurization hardware schedule & electrical coordination'
        ],
        gcResponsibility: 'Confirm electrical riser schedules and access control integrator interface protocols.',
        proactiveMitigation: 'P.Eng signed seismic schedules ready before framing starts avoids structural hold-ups.',
        inspectionCheckpoint: 'Structural P.Eng & Electrical Consultant Schedule S-B'
      },
      {
        id: 'hr-fab',
        stepNumber: 2,
        name: 'Bulk Mill Roll-Forming, Core Bonding & High-Capacity Prepping',
        shortName: 'Mill Fabrication',
        durationWeeks: { standard: 6, fastTrack: 4 },
        startWeek: { standard: 3, fastTrack: 2 },
        color: 'from-amber-500/20 to-amber-600/30 border-amber-500/40 text-amber-400',
        icon: Layers,
        deliverables: [
          'High-gauge 14/16-ga steel frame roll-forming with masonry and stud straps',
          'Solid mineral core 90-minute stairwell fire doors with heavy-duty reinforcements',
          'Architectural rift-cut oak and walnut suite entry slab fabrication'
        ],
        gcResponsibility: 'Ensure concrete wall openings for stairwell doors meet dimensional tolerances (±1/8").',
        proactiveMitigation: 'Early production of lower parkade and podium frames allows early rough-in sign-off.',
        inspectionCheckpoint: 'Factory Quality Assurance & ULC 90-min/3-hr Label Inspection'
      },
      {
        id: 'hr-logistics',
        stepNumber: 3,
        name: 'Phased Tower Crane Loading & Floor Staging (Podium to Tower)',
        shortName: 'Tower Crane Staging',
        durationWeeks: { standard: 3, fastTrack: 2 },
        startWeek: { standard: 9, fastTrack: 6 },
        color: 'from-purple-500/20 to-purple-600/30 border-purple-500/40 text-purple-400',
        icon: Truck,
        deliverables: [
          'Multi-phase deliveries scheduled with GC superintendent crane slots',
          'Floor-by-floor weather-tight shrink-wrapped bundles',
          'Electronic RFID shipment tracking by opening tag'
        ],
        gcResponsibility: 'Provide dedicated loading dock access and crane operator windows on scheduled delivery days.',
        proactiveMitigation: 'Splitting shipments into 5-floor blocks prevents jobsite clutter and reduces risk of material damage.'
      },
      {
        id: 'hr-install',
        stepNumber: 4,
        name: 'Phased Installation, Stairwell Pressurization & Commissioning',
        shortName: 'Installation & Life Safety',
        durationWeeks: { standard: 4, fastTrack: 3 },
        startWeek: { standard: 12, fastTrack: 8 },
        color: 'from-emerald-500/20 to-emerald-600/30 border-emerald-500/40 text-emerald-400',
        icon: HardHat,
        deliverables: [
          'Sequential installation by specialized high-rise union/certified trade crews',
          'Magnetic hold-open fire alarm trip testing in coordination with electrical trades',
          'Full Schedule C-B compliance documentation for Municipal Occupancy Permit'
        ],
        gcResponsibility: 'Complete HVAC air balancing before stairwell door final pull-force testing (max 133 N / 30 lbf).',
        proactiveMitigation: 'Dedicated commissioning technician ensures 100% first-time pass rate on fire marshal test days.',
        inspectionCheckpoint: 'VBBL / BCBC Schedule C-B Letters of Assurance'
      }
    ]
  },
  {
    id: 'institutional',
    title: 'Institutional, Healthcare & Heavy Fire-Rated',
    subtitle: 'Hospitals, schools, municipal facilities, and cleanrooms (50–400 openings)',
    icon: ShieldCheck,
    standardTotalWeeks: 14,
    fastTrackTotalWeeks: 9,
    doorCountRange: '50 – 400 Openings',
    description: 'High-specification hardware and life-safety enclosures. Requires lead-lined X-ray shielding, antimicrobial hardware, fail-safe electrified access control, and 3-hour fire partition certifications.',
    typicalApplications: 'Hospitals & healthcare clinics, secondary schools & universities, municipal civic centres, laboratories',
    phases: [
      {
        id: 'inst-specs',
        stepNumber: 1,
        name: 'ULC & Security Engineering, Keying Matrices & Barrier-Free Review',
        shortName: 'ULC & Security Specs',
        durationWeeks: { standard: 3, fastTrack: 2 },
        startWeek: { standard: 0, fastTrack: 0 },
        color: 'from-blue-500/20 to-blue-600/30 border-blue-500/40 text-blue-400',
        icon: FileSpreadsheet,
        deliverables: [
          'Detailed hardware functions schedule matching security access tiers',
          'Barrier-Free power door operator (BFA) wiring schematics & button layouts',
          'UL 10C positive pressure & NFPA 80 compliance certification review'
        ],
        gcResponsibility: 'Verify electrical conduit stubs at frame door headers for low-voltage power supplies.',
        proactiveMitigation: 'Pre-coordination with security contractor prevents mismatched electrified hinge/strike voltages.',
        inspectionCheckpoint: 'Life Safety Consultant & Security Director approval'
      },
      {
        id: 'inst-fab',
        stepNumber: 2,
        name: 'Specialty Core Fabrication (Lead-Lined, Soundproof & Fire)',
        shortName: 'Specialty Fabrication',
        durationWeeks: { standard: 5, fastTrack: 3.5 },
        startWeek: { standard: 3, fastTrack: 2 },
        color: 'from-amber-500/20 to-amber-600/30 border-amber-500/40 text-amber-400',
        icon: Layers,
        deliverables: [
          'Lead-lined core lamination for radiology suites with continuous lead sheet in frames',
          'High STC (STC 45+) acoustic core assemblies with laboratory test certificates',
          'Grade 1 heavy-duty commercial mortise preps with concealed wiring raceways'
        ],
        gcResponsibility: 'Inspect wall radiation shielding overlaps prior to frame setting.',
        proactiveMitigation: 'Factory pre-wiring through door raceways cuts field electrician labor by 60%.',
        inspectionCheckpoint: 'Radiation Health & Safety / Acoustic Field Test Certificate'
      },
      {
        id: 'inst-delivery',
        stepNumber: 3,
        name: 'Clean-Room Staging & Controlled Logistics',
        shortName: 'Protected Delivery',
        durationWeeks: { standard: 2, fastTrack: 1 },
        startWeek: { standard: 8, fastTrack: 5.5 },
        color: 'from-purple-500/20 to-purple-600/30 border-purple-500/40 text-purple-400',
        icon: Truck,
        deliverables: [
          'Clean-room plastic crated delivery protecting antimicrobial finishes',
          'Segregated secure storage for high-security key cylinders & card readers',
          'Delivery sequencing strictly aligned with zone-by-zone dust containment'
        ],
        gcResponsibility: 'Establish dust barrier partitions and clean zones before material uncrating.',
        proactiveMitigation: 'Barcoded crate tracking allows immediate location of urgent opening materials on sprawling campuses.'
      },
      {
        id: 'inst-install',
        stepNumber: 4,
        name: 'Certified Installation, Low-Voltage Integration & Commissioning',
        shortName: 'Integration & Testing',
        durationWeeks: { standard: 4, fastTrack: 2.5 },
        startWeek: { standard: 10, fastTrack: 6.5 },
        color: 'from-emerald-500/20 to-emerald-600/30 border-emerald-500/40 text-emerald-400',
        icon: HardHat,
        deliverables: [
          'Precision hanging of heavy lead-lined & high-cycle institutional doors',
          'Integration and testing with fire alarm, elevator recall, and card access systems',
          'Barrier-Free power door operator tuning (opening force ≤ 22 N, closing speed ≥ 3 sec)'
        ],
        gcResponsibility: 'Ensure power to access control panels is live 2 weeks before scheduled handover for system testing.',
        proactiveMitigation: 'Full integrated systems testing avoids delayed hospital or school opening dates.',
        inspectionCheckpoint: 'CSA B651 Barrier-Free & Fire Safety Commissioning sign-off'
      }
    ]
  }
];

interface ProjectTimelineVisualizationProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
}

export const ProjectTimelineVisualization: React.FC<ProjectTimelineVisualizationProps> = ({
  onOpenQuoteModal,
  onOpenScheduleModal
}) => {
  const [selectedProjectType, setSelectedProjectType] = useState<TimelineProjectType>('multi-family');
  const [isFastTrack, setIsFastTrack] = useState<boolean>(false);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  // Reverse Lead Time Calculator State
  const [targetCompletionDate, setTargetCompletionDate] = useState<string>(() => {
    // Default to ~3 months from today
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split('T')[0];
  });

  const currentScenario = useMemo(() => {
    return TIMELINE_SCENARIOS.find(s => s.id === selectedProjectType) || TIMELINE_SCENARIOS[1];
  }, [selectedProjectType]);

  const totalWeeks = isFastTrack ? currentScenario.fastTrackTotalWeeks : currentScenario.standardTotalWeeks;

  // Compute Reverse Scheduled Milestone Dates based on target completion date
  const calculatedDates = useMemo(() => {
    const target = new Date(targetCompletionDate);
    if (isNaN(target.getTime())) return null;

    const totalDays = Math.round(totalWeeks * 7);
    
    // Order Cutoff / Project Kickoff
    const kickoffDate = new Date(target);
    kickoffDate.setDate(target.getDate() - totalDays);

    // Submittals Approved
    const submittalDays = Math.round((currentScenario.phases[0].durationWeeks[isFastTrack ? 'fastTrack' : 'standard']) * 7);
    const submittalApprovedDate = new Date(kickoffDate);
    submittalApprovedDate.setDate(kickoffDate.getDate() + submittalDays);

    // Factory Fab Complete / Ready for Delivery
    const fabPhase = currentScenario.phases[1];
    const fabDays = Math.round((fabPhase.startWeek[isFastTrack ? 'fastTrack' : 'standard'] + fabPhase.durationWeeks[isFastTrack ? 'fastTrack' : 'standard']) * 7);
    const deliveryReadyDate = new Date(kickoffDate);
    deliveryReadyDate.setDate(kickoffDate.getDate() + fabDays);

    // Install Start Date
    const installPhase = currentScenario.phases[currentScenario.phases.length - 1];
    const installStartDays = Math.round(installPhase.startWeek[isFastTrack ? 'fastTrack' : 'standard'] * 7);
    const installStartDate = new Date(kickoffDate);
    installStartDate.setDate(kickoffDate.getDate() + installStartDays);

    const formatDate = (d: Date) => d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });

    return {
      kickoff: formatDate(kickoffDate),
      submittals: formatDate(submittalApprovedDate),
      delivery: formatDate(deliveryReadyDate),
      install: formatDate(installStartDate),
      target: formatDate(target)
    };
  }, [targetCompletionDate, totalWeeks, currentScenario, isFastTrack]);

  const activePhase = currentScenario.phases[activePhaseIndex] || currentScenario.phases[0];

  return (
    <div id="project-timeline-lead-times" className="space-y-8 pt-8">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Timer className="w-3.5 h-3.5" />
            <span>B2B Procurement & Installation Master Schedule</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
            Typical Project <span className="text-amber-400">Timeline & Lead Times</span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Plan your framing sign-offs, drywall schedules, and occupancy inspections with confidence. View realistic, phase-by-phase lead times for architectural door procurement, precision mill prep, crane staging, and certified trade installation across Metro Vancouver.
          </p>
        </div>

        {/* Speed / Fast-Track Mode Toggle Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 shrink-0">
          <div className="p-1 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center">
            <button
              type="button"
              onClick={() => setIsFastTrack(false)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                !isFastTrack
                  ? 'bg-neutral-800 text-white shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Standard Mill Cycle</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFastTrack(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                isFastTrack
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-400 hover:text-amber-300'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fast-Track / Local Stock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Sector Filter Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TIMELINE_SCENARIOS.map((scenario) => {
          const Icon = scenario.icon;
          const isSelected = selectedProjectType === scenario.id;
          const weeks = isFastTrack ? scenario.fastTrackTotalWeeks : scenario.standardTotalWeeks;

          return (
            <button
              key={scenario.id}
              onClick={() => {
                setSelectedProjectType(scenario.id);
                setActivePhaseIndex(0);
              }}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'bg-neutral-900 border-amber-500/70 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-neutral-950 hover:bg-neutral-900/60 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-amber-500 text-neutral-950 font-bold' : 'bg-neutral-900 text-neutral-400 group-hover:text-amber-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    isSelected ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-neutral-900 text-neutral-500 border-neutral-800'
                  }`}>
                    {scenario.doorCountRange}
                  </span>
                </div>

                <div>
                  <h4 className={`text-sm font-bold font-display ${isSelected ? 'text-white' : 'text-neutral-200 group-hover:text-white'}`}>
                    {scenario.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                    {scenario.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-neutral-850 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500 text-[10px]">Total Lead Time:</span>
                <span className={`font-bold ${isSelected ? 'text-amber-400' : 'text-neutral-300'}`}>
                  ~{weeks} Weeks
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Gantt Timeline Bar Visualization */}
      <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6 shadow-2xl">
        
        {/* Timeline Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-850">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                {currentScenario.title}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs font-mono text-neutral-400">
                {isFastTrack ? '⚡ Expedited Fast-Track Schedule' : 'Standard Production Schedule'}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white font-display">
              Sequenced Project Critical Path ({totalWeeks} Weeks Total)
            </h4>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-neutral-300">Total Duration:</span>
              <strong className="text-white font-bold text-sm">~{totalWeeks} Weeks</strong>
            </div>
          </div>
        </div>

        {/* Horizontal Visual Gantt Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-mono text-neutral-500 px-1">
            <span>Week 0 (Notice to Proceed)</span>
            <span>Week {Math.round(totalWeeks / 2)} (Midpoint)</span>
            <span>Week {totalWeeks} (Occupancy / Handover)</span>
          </div>

          {/* Segmented Phase Bar */}
          <div className="w-full h-14 bg-neutral-900 rounded-2xl p-1.5 flex gap-1.5 border border-neutral-800 overflow-hidden relative shadow-inner">
            {currentScenario.phases.map((phase, idx) => {
              const duration = phase.durationWeeks[isFastTrack ? 'fastTrack' : 'standard'];
              const widthPct = Math.max(12, (duration / totalWeeks) * 100);
              const isActive = activePhaseIndex === idx;

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  style={{ width: `${widthPct}%` }}
                  className={`h-full rounded-xl transition-all relative flex items-center justify-between px-3 text-left overflow-hidden border group ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-bold'
                      : 'bg-neutral-800/80 hover:bg-neutral-750 border-neutral-700/60 text-neutral-300'
                  }`}
                  title={`Phase ${phase.stepNumber}: ${phase.name} (${duration} wks)`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-neutral-950 text-amber-400' : 'bg-neutral-900 text-neutral-300'
                    }`}>
                      {phase.stepNumber}
                    </span>
                    <span className="text-xs font-mono truncate hidden sm:inline">
                      {phase.shortName}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono shrink-0 pl-1 ${
                    isActive ? 'text-neutral-950 font-black' : 'text-neutral-400'
                  }`}>
                    {duration}w
                  </span>
                </button>
              );
            })}
          </div>

          {/* Click hint */}
          <p className="text-[11px] font-mono text-neutral-400 text-right pr-1">
            * Click any phase block above to inspect contractor responsibilities & inspection milestones.
          </p>
        </div>

        {/* Active Phase Detailed Deep-Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentScenario.id}-${activePhase.id}-${isFastTrack ? 'fast' : 'std'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-6"
          >
            {/* Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  {React.createElement(activePhase.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase font-bold text-amber-400">
                      Phase {activePhase.stepNumber} of {currentScenario.phases.length}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-xs font-mono text-neutral-400">
                      Week {activePhase.startWeek[isFastTrack ? 'fastTrack' : 'standard']} to Week {activePhase.startWeek[isFastTrack ? 'fastTrack' : 'standard'] + activePhase.durationWeeks[isFastTrack ? 'fastTrack' : 'standard']}
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-white font-display">
                    {activePhase.name}
                  </h5>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300">
                  Duration: <strong className="text-amber-400">{activePhase.durationWeeks[isFastTrack ? 'fastTrack' : 'standard']} Weeks</strong>
                </span>
              </div>
            </div>

            {/* 3-Column Phase Intelligence Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Deliverables */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-blue-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Key Phase Deliverables</span>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {activePhase.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* General Contractor / Client Responsibility */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-amber-400">
                  <HardHat className="w-4 h-4" />
                  <span>GC / Site Action Items</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {activePhase.gcResponsibility}
                </p>
                {activePhase.inspectionCheckpoint && (
                  <div className="pt-2 border-t border-neutral-900 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Inspection: {activePhase.inspectionCheckpoint}</span>
                  </div>
                )}
              </div>

              {/* Proactive Risk Mitigation */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Proactive Delay Mitigation</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {activePhase.proactiveMitigation}
                </p>
              </div>

            </div>

            {/* Phase Navigation Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
              <button
                type="button"
                disabled={activePhaseIndex === 0}
                onClick={() => setActivePhaseIndex(prev => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-850 disabled:opacity-30 disabled:cursor-not-allowed border border-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
              >
                &larr; Previous Phase
              </button>

              <div className="flex items-center gap-1.5">
                {currentScenario.phases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhaseIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activePhaseIndex === idx ? 'bg-amber-400 w-6' : 'bg-neutral-700 hover:bg-neutral-500'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={activePhaseIndex === currentScenario.phases.length - 1}
                onClick={() => setActivePhaseIndex(prev => Math.min(currentScenario.phases.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-850 disabled:opacity-30 disabled:cursor-not-allowed border border-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
              >
                Next Phase &rarr;
              </button>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Reverse Lead-Time Planner & Target Occupancy Date Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-amber-500/30 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Reverse Lead-Time Planning Tool</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
              Work Backward from Your <span className="text-amber-400">Target Occupancy Date</span>
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Input your target building occupancy or tenant move-in date below. We automatically calculate the critical path milestone deadlines to ensure zero trade delays or penalty clauses.
            </p>
          </div>

          {/* Date Picker Input */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 shrink-0">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Handover / Occupancy Date:</span>
            </label>
            <input
              type="date"
              value={targetCompletionDate}
              onChange={(e) => setTargetCompletionDate(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono text-xs font-bold focus:outline-none focus:border-amber-400 w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Backward Milestone Dates */}
        {calculatedDates && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
            
            {/* Step 1: Order / Takeoff Cutoff */}
            <div className="p-4 rounded-2xl bg-neutral-950/90 border border-amber-500/40 space-y-1.5">
              <div className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center justify-between">
                <span>1. Order & Takeoff Cutoff</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div className="text-base font-bold font-mono text-white">
                {calculatedDates.kickoff}
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Latest date to issue final hardware schedule to avoid factory mill backlogs.
              </p>
            </div>

            {/* Step 2: Submittals Approved */}
            <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1.5">
              <div className="text-[10px] font-mono uppercase font-bold text-blue-400">
                2. Submittal Sign-off
              </div>
              <div className="text-base font-bold font-mono text-white">
                {calculatedDates.submittals}
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Architectural & consultant approved shop drawings locked for CNC machining.
              </p>
            </div>

            {/* Step 3: Crane / Site Staging */}
            <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1.5">
              <div className="text-[10px] font-mono uppercase font-bold text-purple-400">
                3. Staged Delivery
              </div>
              <div className="text-base font-bold font-mono text-white">
                {calculatedDates.delivery}
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Doors land on site for moisture acclimation as drywall framing wraps up.
              </p>
            </div>

            {/* Step 4: Installation & Sign-Off */}
            <div className="p-4 rounded-2xl bg-neutral-950/90 border border-emerald-500/40 space-y-1.5">
              <div className="text-[10px] font-mono uppercase font-bold text-emerald-400">
                4. Turnkey Installation
              </div>
              <div className="text-base font-bold font-mono text-white">
                {calculatedDates.install}
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Hanging, weatherstripping, closer tuning, and Fire Marshal inspection walk-through.
              </p>
            </div>

          </div>
        )}

        {/* Direct Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800 relative z-10">
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Need an expedited lead time or local stock verification? Speak directly with our estimator team.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onOpenScheduleModal}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-white font-mono font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Door Schedule Takeoff</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const sector = selectedProjectType === 'commercial-ti' 
                  ? 'commercial' 
                  : selectedProjectType === 'high-rise' 
                  ? 'high-rise' 
                  : 'residential';
                onOpenQuoteModal(sector);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>Lock In Schedule & Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
