import React from 'react';
import { 
  Building2, 
  Home, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Volume2, 
  Layers, 
  Check, 
  Sparkles, 
  FileSpreadsheet,
  Users,
  Compass
} from 'lucide-react';
import { SectorType } from '../types';

interface DoorsForEveryProjectProps {
  activeSector: SectorType;
  onSelectSector: (sector: SectorType) => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
}

export const DoorsForEveryProject: React.FC<DoorsForEveryProjectProps> = ({
  activeSector,
  onSelectSector,
  onOpenQuoteModal,
  onOpenScheduleModal,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="doors-for-every-project"
      className="py-20 bg-neutral-950 border-b border-neutral-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
            <span>Built for the Application</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Doors for Every Project
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            From single custom residential openings to 500+ opening high-rise packages and heavy commercial facilities, Just Doors provides tailored systems and hardware engineered to code.
          </p>
        </div>

        {/* The 3 Core Sector Pillars (with High-Rise prominent!) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Residential Pillar */}
          <div 
            id="sector-card-residential"
            className="group relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 hover:border-neutral-700 p-8 transition-all flex flex-col justify-between hover:shadow-xl space-y-8"
          >
            <div className="space-y-6">
              {/* Header & Icon */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800">
                  Homeowners + Condo Owners
                </span>
              </div>

              {/* Title & Exact Description */}
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                  Residential
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  Interior, exterior and condo entry doors for homes and multi-family buildings.
                </p>
              </div>

              {/* Spec Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Typical Openings & Systems:
                </div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Condo Suite Entry Doors:</strong> 20-min fire-rated, acoustic drop seals & strata compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Custom Architectural Entry:</strong> Oversized pivot doors, solid hardwoods, multi-point locks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Interior Wood Doors:</strong> Solid core flush, pocket doors, barn sliders, hidden frames</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <button
                id="residential-action-quote"
                onClick={() => onOpenQuoteModal('residential')}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all group-hover:border group-hover:border-neutral-600"
              >
                <span>Request Residential Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>


          {/* 2. Multi-Family & High-Rise Pillar (PROMINENT HIGHLIGHT) */}
          <div 
            id="sector-card-highrise"
            className="group relative rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-950 border-2 border-amber-500/60 hover:border-amber-400 p-8 transition-all flex flex-col justify-between shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 space-y-8 lg:-translate-y-2"
          >
            {/* Prominent Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-neutral-950 text-xs font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Highest-Volume Specialty</span>
            </div>

            <div className="space-y-6">
              {/* Header & Icon */}
              <div className="flex items-center justify-between pt-1">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                  Developers + GCs + Strata
                </span>
              </div>

              {/* Title & Exact Description */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  Multi-Family & High-Rise
                </h3>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-medium">
                  Fire-rated unit entry doors, corridor doors, common areas and building projects.
                </p>
              </div>

              {/* Spec Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-neutral-800">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  High-Rise Package Inclusions:
                </div>
                <ul className="space-y-2 text-xs text-neutral-200">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Fire-Rated Unit Entries:</strong> UL 10C 20-min positive pressure wood & mineral core</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Stairwells & Egress:</strong> 90-min to 3-hour 16ga hollow metal doors & fire exit panics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Corridor & Common Areas:</strong> Elevator lobbies, cross-corridor magnetic hold-opens, amenity suites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Floor-by-Floor Logistics:</strong> Labeled by suite number, factory hardware prep, scheduled deliveries</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5 pt-4 border-t border-neutral-800">
              <button
                id="highrise-action-schedule"
                onClick={onOpenScheduleModal}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileSpreadsheet className="w-4 h-4 text-neutral-950" />
                <span>Send Us Your Door Schedule →</span>
              </button>

              <button
                id="highrise-action-learnmore"
                onClick={() => {
                  onSelectSector('high-rise');
                  scrollTo('high-rise-spotlight');
                }}
                className="w-full py-2 px-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Explore High-Rise Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>


          {/* 3. Commercial Pillar */}
          <div 
            id="sector-card-commercial"
            className="group relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 hover:border-neutral-700 p-8 transition-all flex flex-col justify-between hover:shadow-xl space-y-8"
          >
            <div className="space-y-6">
              {/* Header & Icon */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800">
                  Businesses + Contractors
                </span>
              </div>

              {/* Title & Exact Description */}
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                  Commercial
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  Office, retail, industrial and institutional door systems.
                </p>
              </div>

              {/* Spec Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Typical Openings & Systems:
                </div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Architectural Glass Entrances:</strong> Wide-stile thermal storefronts, card reader access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Industrial Hollow Metal:</strong> 14/16ga security doors, panic hardware, heavy cycle hinges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Executive Office Suites:</strong> Acoustic STC 40+ timber doors, frameless sliding glass systems</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <button
                id="commercial-action-quote"
                onClick={() => onOpenQuoteModal('commercial')}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all group-hover:border group-hover:border-neutral-600"
              >
                <span>Request Commercial Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
