import React, { useState, useRef } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  DoorClosed, 
  MapPin, 
  Navigation, 
  Layers, 
  Eye, 
  CheckCircle2, 
  ArrowUpRight, 
  Maximize2, 
  Compass, 
  Flame, 
  Sparkles,
  Search,
  Filter,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectCaseStudy, SectorType } from '../types';

interface ProjectMapComponentProps {
  projects: ProjectCaseStudy[];
  activeProject: ProjectCaseStudy;
  onSelectProject: (project: ProjectCaseStudy) => void;
  onOpenScheduleModal?: () => void;
}

export const ProjectMapComponent: React.FC<ProjectMapComponentProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onOpenScheduleModal,
}) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [selectedMapSector, setSelectedMapSector] = useState<SectorType>('all');
  const [mapStyle, setMapStyle] = useState<'blueprint' | 'tactical' | 'cad'>('blueprint');
  const [activeDistrictFocus, setActiveDistrictFocus] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((p) => {
    if (selectedMapSector === 'all') return true;
    return p.sector === selectedMapSector;
  });

  const hoveredProject = projects.find((p) => p.id === hoveredProjectId) || null;

  const getSectorColor = (sector: 'high-rise' | 'commercial' | 'residential') => {
    switch (sector) {
      case 'high-rise':
        return {
          bg: 'bg-amber-500',
          text: 'text-amber-400',
          border: 'border-amber-500',
          ring: 'ring-amber-500/40',
          glow: 'shadow-amber-500/30',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
        };
      case 'commercial':
        return {
          bg: 'bg-cyan-500',
          text: 'text-cyan-400',
          border: 'border-cyan-500',
          ring: 'ring-cyan-500/40',
          glow: 'shadow-cyan-500/30',
          badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
        };
      case 'residential':
        return {
          bg: 'bg-emerald-500',
          text: 'text-emerald-400',
          border: 'border-emerald-500',
          ring: 'ring-emerald-500/40',
          glow: 'shadow-emerald-500/30',
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
        };
      default:
        return {
          bg: 'bg-amber-500',
          text: 'text-amber-400',
          border: 'border-amber-500',
          ring: 'ring-amber-500/40',
          glow: 'shadow-amber-500/30',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
        };
    }
  };

  const getSectorIcon = (sector: 'high-rise' | 'commercial' | 'residential') => {
    switch (sector) {
      case 'high-rise':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'commercial':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'residential':
        return <DoorClosed className="w-3.5 h-3.5" />;
    }
  };

  const districts = [
    { name: 'All Districts', id: 'all' },
    { name: 'Downtown Vancouver', id: 'Downtown Financial Center' },
    { name: 'Brentwood Burnaby', id: 'Brentwood Town Centre' },
    { name: 'Richmond City Centre', id: 'Richmond City Centre' },
    { name: 'Surrey City Centre', id: 'Surrey City Centre' },
    { name: 'North Van Shipyards', id: 'Shipyards Waterfront District' },
    { name: 'West Van British Properties', id: 'British Properties Highlands' },
    { name: 'Coquitlam Town Centre', id: 'Coquitlam Town Centre' },
    { name: 'Langley Willoughby', id: 'Willoughby Town Centre' },
    { name: 'Abbotsford Industrial', id: 'Mt. Lehman Commercial Corridor' },
    { name: 'Delta Tilbury', id: 'Tilbury Industrial Park' },
  ];

  return (
    <div 
      id="interactive-project-map"
      className="rounded-3xl bg-neutral-900/95 border border-neutral-800 p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Map Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-800 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>METROPOLITAN PROJECT REGISTRY & GIS MAP</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Key High-Rise, Commercial & Residential Installations
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Explore active and completed door package deployments across metropolitan high-rises, commercial campuses, healthcare pavilions, and bespoke residential estates.
          </p>
        </div>

        {/* Sector Filter Buttons & Map Theme Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Sector Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800">
            {(['all', 'high-rise', 'commercial', 'residential'] as SectorType[]).map((sec) => {
              const isSelected = selectedMapSector === sec;
              const count = sec === 'all' 
                ? projects.length 
                : projects.filter((p) => p.sector === sec).length;

              const label = sec === 'all' 
                ? 'All Projects' 
                : sec === 'high-rise' 
                  ? 'High-Rise' 
                  : sec === 'commercial' 
                    ? 'Commercial' 
                    : 'Residential';

              return (
                <button
                  key={sec}
                  id={`map-filter-${sec}`}
                  onClick={() => setSelectedMapSector(sec)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-neutral-800 text-white shadow-md border border-neutral-700'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  {sec === 'high-rise' && <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />}
                  {sec === 'commercial' && <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />}
                  {sec === 'residential' && <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />}
                  <span>{label}</span>
                  <span className="text-[10px] font-mono opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Map Style Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800 text-xs font-mono">
            <button
              onClick={() => setMapStyle('blueprint')}
              className={`px-2.5 py-1 rounded-xl transition-colors ${
                mapStyle === 'blueprint' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Architectural Blueprint Mode"
            >
              CAD Grid
            </button>
            <button
              onClick={() => setMapStyle('tactical')}
              className={`px-2.5 py-1 rounded-xl transition-colors ${
                mapStyle === 'tactical' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Tactical Satellite Mode"
            >
              Tactical
            </button>
          </div>
        </div>
      </div>

      {/* District Jump Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
        <span className="text-neutral-400 uppercase font-bold shrink-0 flex items-center gap-1">
          <Navigation className="w-3 h-3 text-amber-400" />
          <span>District Focus:</span>
        </span>
        {districts.map((d) => {
          const isCurrent = (d.id === 'all' && !activeDistrictFocus) || activeDistrictFocus === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDistrictFocus(d.id === 'all' ? null : d.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap border transition-all ${
                isCurrent
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Map Container */}
      <div 
        ref={mapContainerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden select-none group shadow-inner"
      >
        {/* SVG Blueprint / Metro Topographical Canvas */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid-cad" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <circle cx="40" cy="40" r="1" fill="rgba(245, 158, 11, 0.2)" />
            </pattern>

            <linearGradient id="water-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="district-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <rect width="1000" height="600" fill="url(#grid-cad)" />

          {/* Stylized Waterfront / Bay Coastline */}
          <path
            d="M 650 600 Q 680 450 780 380 T 1000 320 L 1000 600 Z"
            fill="url(#water-gradient)"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Mountain Topo Curves (North/East) */}
          <path
            d="M 700 0 Q 820 80 920 60 T 1000 120"
            fill="none"
            stroke="rgba(16, 185, 129, 0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M 750 0 Q 860 120 950 100 T 1000 160"
            fill="none"
            stroke="rgba(16, 185, 129, 0.15)"
            strokeWidth="1"
          />

          {/* Major Arterial Transit / Highway Corridors */}
          {/* North-South Spine */}
          <line x1="500" y1="0" x2="550" y2="600" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="2" />
          <line x1="500" y1="0" x2="550" y2="600" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="1" strokeDasharray="8 6" />

          {/* East-West Highway */}
          <line x1="0" y1="280" x2="1000" y2="340" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" />
          <line x1="0" y1="280" x2="1000" y2="340" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" strokeDasharray="12 8" />

          {/* Diagonal Innovation Loop */}
          <path
            d="M 150 480 C 280 420, 360 300, 620 240 S 840 180, 880 100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
          />

          {/* District Boundary Polygons */}
          {/* Downtown Core */}
          <polygon
            points="540,180 720,200 700,340 560,320"
            fill="rgba(245, 158, 11, 0.04)"
            stroke="rgba(245, 158, 11, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <text x="630" y="270" fill="rgba(245, 158, 11, 0.3)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            FINANCIAL CORE
          </text>

          {/* Innovation Corridor */}
          <polygon
            points="260,200 440,220 420,380 240,340"
            fill="rgba(14, 165, 233, 0.04)"
            stroke="rgba(14, 165, 233, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <text x="340" y="300" fill="rgba(14, 165, 233, 0.3)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            TECH & ENTERPRISE
          </text>

          {/* Medical Center */}
          <polygon
            points="420,80 580,90 560,190 400,170"
            fill="rgba(239, 68, 68, 0.03)"
            stroke="rgba(239, 68, 68, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <text x="490" y="140" fill="rgba(239, 68, 68, 0.3)" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            HEALTH SCIENCES
          </text>

          {/* Harbourfront Marina */}
          <text x="820" y="460" fill="rgba(56, 189, 248, 0.35)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            HARBOURFRONT MARINA
          </text>

          {/* Alpine Ridgeline */}
          <text x="860" y="80" fill="rgba(16, 185, 129, 0.35)" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            ALPINE HIGHLANDS
          </text>

          {/* Coastal Ridge */}
          <text x="140" y="520" fill="rgba(16, 185, 129, 0.3)" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            OCEAN BLUFF COAST
          </text>

          {/* Technical Map Crosshairs & Compass */}
          <circle cx="950" cy="50" r="30" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <line x1="950" y1="15" x2="950" y2="85" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          <line x1="915" y1="50" x2="985" y2="50" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          <text x="950" y="12" fill="rgba(245, 158, 11, 0.7)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">N</text>
        </svg>

        {/* Tactical Coordinate Stamps */}
        <div className="absolute top-3 left-4 text-[10px] font-mono text-neutral-400 pointer-events-none flex items-center gap-3">
          <span className="text-amber-400 font-bold">GRID: 49°15'N / 123°07'W</span>
          <span className="hidden sm:inline">• METRO OPENING COVERAGE: 1,648+ DOORS</span>
        </div>

        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-neutral-400 pointer-events-none hidden sm:flex items-center gap-2">
          <span>SCALE: 1:25000</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">100% UL 10C / NFPA 80 COMPLIANT</span>
        </div>

        {/* Project Pins on the Map */}
        {filteredProjects.map((project) => {
          if (!project.mapLocation) return null;

          const isHovered = hoveredProjectId === project.id;
          const isSelected = activeProject.id === project.id;
          const sectorStyles = getSectorColor(project.sector);
          const isDimmed = activeDistrictFocus && activeDistrictFocus !== project.mapLocation.district;

          return (
            <div
              key={project.id}
              style={{
                left: `${project.mapLocation.x}%`,
                top: `${project.mapLocation.y}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 ${
                isDimmed ? 'opacity-30 scale-90' : 'opacity-100'
              }`}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              onClick={() => onSelectProject(project)}
            >
              {/* Radar Pulsing Rings for Active/Hovered Pin */}
              {(isHovered || isSelected) && (
                <>
                  <span className={`absolute -inset-3 rounded-full animate-ping opacity-75 ${sectorStyles.bg}`} />
                  <span className={`absolute -inset-6 rounded-full border border-dashed opacity-40 animate-spin ${sectorStyles.border}`} />
                </>
              )}

              {/* Pin Marker Button */}
              <button
                id={`map-pin-${project.id}`}
                aria-label={`View ${project.title}`}
                className={`relative p-2 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-2xl group ${
                  isSelected
                    ? `${sectorStyles.bg} text-neutral-950 scale-125 border-white ring-4 ${sectorStyles.ring}`
                    : isHovered
                      ? `${sectorStyles.bg} text-neutral-950 scale-115 border-white ring-2 ${sectorStyles.ring}`
                      : `bg-neutral-950 ${sectorStyles.text} ${sectorStyles.border} hover:scale-110`
                }`}
              >
                {getSectorIcon(project.sector)}

                {/* Mini Opening Count Badge on Pin */}
                <span className={`absolute -top-2 -right-2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full border shadow-sm ${
                  isSelected || isHovered
                    ? 'bg-white text-neutral-950 border-neutral-900'
                    : 'bg-neutral-900 text-white border-neutral-700'
                }`}>
                  {project.doorCount}
                </span>
              </button>

              {/* Permanent Pin Label (Compact) */}
              <div className={`mt-1.5 px-2 py-0.5 rounded-md bg-neutral-950/90 border text-[10px] font-mono whitespace-nowrap text-center transition-all ${
                isSelected 
                  ? 'border-amber-400 text-amber-300 font-bold shadow-lg' 
                  : 'border-neutral-800 text-neutral-300 hover:text-white'
              }`}>
                {project.title.split(' ')[0]} {project.title.split(' ')[1] || ''}
              </div>

              {/* Interactive Tooltip Card (Shown on Hover) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    transition={{ duration: 0.18 }}
                    className={`absolute z-50 w-72 sm:w-80 p-4 rounded-2xl bg-neutral-950/98 backdrop-blur-xl border border-neutral-700 shadow-2xl space-y-3 pointer-events-auto ${
                      project.mapLocation.x > 50 ? '-translate-x-full -left-4' : 'left-full ml-4'
                    } ${
                      project.mapLocation.y > 60 ? '-translate-y-full -top-4' : '-top-12'
                    }`}
                  >
                    {/* Tooltip Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-2.5">
                      <div className="space-y-0.5">
                        <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${sectorStyles.badge}`}>
                          {project.sector.toUpperCase()} • {project.mapLocation.buildingType}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-snug pt-1">
                          {project.title}
                        </h4>
                        <div className="text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{project.mapLocation.district}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono font-bold text-amber-400">
                          {project.doorCount} Openings
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          Year: {project.mapLocation.yearCompleted}
                        </div>
                      </div>
                    </div>

                    {/* Door Types Supplied (Core Highlight) */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono uppercase font-bold text-neutral-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-amber-400" />
                        <span>Door Systems & Specs Supplied:</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {project.mapLocation.doorTypesSupplied.map((doorType, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-1.5 text-xs text-neutral-200 bg-neutral-900/90 px-2 py-1 rounded-lg border border-neutral-800/80"
                          >
                            <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate">{doorType}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Client Type & Direct View CTA */}
                    <div className="flex items-center justify-between pt-1 border-t border-neutral-800/80 text-xs">
                      <span className="text-[10px] font-mono text-neutral-400">
                        Client: <strong className="text-neutral-200">{project.clientType}</strong>
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold text-[11px] font-mono group-hover:underline"
                      >
                        <span>View Full Specs</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Interactive Project Quick-Selector Carousel / Grid Below Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase font-bold">
          <span>Click Any Project Below to Highlight on Map & Open Specifications:</span>
          <span className="text-amber-400">{filteredProjects.length} Pinned Installations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredProjects.map((proj) => {
            const isSelected = activeProject.id === proj.id;
            const sectorStyles = getSectorColor(proj.sector);

            return (
              <button
                key={proj.id}
                id={`map-card-${proj.id}`}
                onClick={() => onSelectProject(proj)}
                onMouseEnter={() => setHoveredProjectId(proj.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-3 group ${
                  isSelected
                    ? 'bg-neutral-950 border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400'
                    : 'bg-neutral-950/70 hover:bg-neutral-950 border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${sectorStyles.badge}`}>
                    {proj.sector.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    {proj.doorCount} Doors
                  </span>
                </div>

                <div className="space-y-1">
                  <h5 className={`text-xs font-bold leading-snug line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                  }`}>
                    {proj.title}
                  </h5>
                  <p className="text-[11px] text-neutral-400 font-mono truncate">
                    {proj.location}
                  </p>
                </div>

                {proj.mapLocation && (
                  <div className="text-[10px] text-neutral-400 bg-neutral-900 px-2 py-1 rounded-lg border border-neutral-800/80 truncate font-mono">
                    {proj.mapLocation.doorTypesSupplied[0]}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Footer & Door Schedule Call-to-Action */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5 max-w-2xl">
          <div className="p-2.5 rounded-xl bg-amber-500 text-neutral-950 shrink-0 mt-0.5">
            <Compass className="w-4 h-4 font-bold" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Planning a Project in One of These Districts?
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              We offer pre-construction site surveys, laser templating, and localized floor-by-floor logistics across all metropolitan regions.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenScheduleModal}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Submit Your Building's Door Schedule</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
