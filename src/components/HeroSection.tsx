import React from 'react';
import { 
  Building2, 
  Home, 
  Briefcase, 
  FileSpreadsheet, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  VolumeX, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';
import { SectorType } from '../types';

interface HeroSectionProps {
  onSelectSector: (sector: SectorType) => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
  onOpenAIAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectSector,
  onOpenQuoteModal,
  onOpenScheduleModal,
  onOpenAIAssistant,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-neutral-950 border-b border-neutral-800"
    >
      {/* Subtle architectural background texture & ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.12),rgba(255,255,255,0))]" />
      
      {/* Architectural grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Top Brand Spec Badge */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-neutral-300">
                Architectural Door Systems & Hardware Specialist
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                No Windows. Just Doors.
              </span>
            </div>

            {/* Main Headline (Exact requested statement) */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
                Residential, multi-family and commercial door solutions.
              </h1>
              
              {/* Secondary Lead Subtitle (Exact requested statement) */}
              <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-3xl">
                From condo entry doors to high-rise developments and commercial office buildings, <span className="text-white font-semibold">Just Doors</span> supplies door systems built for the application.
              </p>
            </div>

            {/* Core Action Buttons: [Residential] [Commercial] [Request a Quote] + [Multi-Family & High-Rise] */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Residential Button */}
              <button
                id="hero-btn-residential"
                onClick={() => {
                  onSelectSector('residential');
                  scrollTo('doors-for-every-project');
                }}
                className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/50 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-sm group"
              >
                <Home className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 transition-colors" />
                <span>Residential</span>
              </button>

              {/* Commercial Button */}
              <button
                id="hero-btn-commercial"
                onClick={() => {
                  onSelectSector('commercial');
                  scrollTo('doors-for-every-project');
                }}
                className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/50 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-sm group"
              >
                <Briefcase className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 transition-colors" />
                <span>Commercial</span>
              </button>

              {/* Multi-Family & High-Rise (Prominent Highlight) */}
              <button
                id="hero-btn-highrise"
                onClick={() => {
                  onSelectSector('high-rise');
                  scrollTo('high-rise-spotlight');
                }}
                className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border-2 border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10 group"
              >
                <Building2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Multi-Family & High-Rise</span>
                <span className="text-[10px] bg-amber-400 text-neutral-950 px-1.5 py-0.5 rounded font-black tracking-tight uppercase">
                  B2B
                </span>
              </button>

              {/* Request a Quote Button */}
              <button
                id="hero-btn-quote"
                onClick={() => onOpenQuoteModal()}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Specs Strip */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">UL 10C Fire Rated</div>
                  <div className="text-[11px] text-neutral-400">20/45/90-Min & 3-Hour</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                  <VolumeX className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">STC 35-45 Acoustic</div>
                  <div className="text-[11px] text-neutral-400">Sound isolating seals</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Door Schedules</div>
                  <div className="text-[11px] text-neutral-400">24-48hr Takeoff turn</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Door Focus</div>
                  <div className="text-[11px] text-neutral-400">No windows, no lag</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Showcase Card / Instant Door Schedule Trigger */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-6 shadow-2xl space-y-5 overflow-hidden">
              
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-2">
                <span className="bg-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                  Developer Portal
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>General Contractors & Developers</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  Have a Door Schedule or RFP?
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Send us your architectural door schedule, blueprint PDFs, or opening counts for rapid bidding & value engineering.
                </p>
              </div>

              {/* Sample schedule preview card */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/90 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between text-neutral-400 pb-1.5 border-b border-neutral-800">
                  <span className="font-semibold text-neutral-300">OPENING SPEC PREVIEW</span>
                  <span className="text-amber-400 text-[10px]">VERIFIED NFPA 80</span>
                </div>
                <div className="space-y-1 text-neutral-300">
                  <div className="flex justify-between">
                    <span>Suite Entry (Typ 480):</span>
                    <span className="text-white font-medium">20-Min Wood Core</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stairwells (Typ 32):</span>
                    <span className="text-white font-medium">90-Min 16ga Steel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Acoustic Spec:</span>
                    <span className="text-amber-400 font-medium">STC 38 Drop Seal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  id="hero-schedule-cta"
                  onClick={onOpenScheduleModal}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <FileSpreadsheet className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Send Us Your Door Schedule →</span>
                </button>

                <button
                  id="hero-ai-spec-cta"
                  onClick={onOpenAIAssistant}
                  className="w-full py-2 px-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 font-medium text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Need help with fire codes or hardware specs?</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 24hr Takeoff Turnaround
                </span>
                <span>Direct: (800) 587-8366</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
