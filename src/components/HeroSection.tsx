import React from 'react';
import { Building2, Home, Briefcase, FileSpreadsheet, ArrowRight, Hammer, Layers, Wrench, CheckCircle2 } from 'lucide-react';
import { SectorType } from '../types';

interface HeroSectionProps {
  onSelectSector: (sector: SectorType) => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
  onOpenAIAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectSector, onOpenQuoteModal, onOpenScheduleModal }) => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero-section" className="relative min-h-[86vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-neutral-950 border-b border-neutral-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.12),rgba(255,255,255,0))]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800">
              <span className="text-xs font-semibold text-neutral-300">Professional Door Supply & Installation</span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">No Windows. Just Doors.</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">Doors supplied. Doors installed. Projects handled professionally.</h1>
              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl">Just Doors supplies and installs door systems for homes, commercial spaces, high-rises, multi-family buildings and new construction across Metro Vancouver and the Fraser Valley. When an opening requires related wall, framing or ceiling work, our construction capability keeps the scope coordinated.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button onClick={() => { onSelectSector('residential'); scrollTo('doors-for-every-project'); }} className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm flex items-center gap-2"><Home className="w-4 h-4" />Residential</button>
              <button onClick={() => { onSelectSector('commercial'); scrollTo('doors-for-every-project'); }} className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm flex items-center gap-2"><Briefcase className="w-4 h-4" />Commercial</button>
              <button onClick={() => { onSelectSector('high-rise'); scrollTo('high-rise-spotlight'); }} className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 text-amber-300 font-bold text-sm flex items-center gap-2"><Building2 className="w-4 h-4" />High-Rise & Multi-Family</button>
              <button onClick={() => onOpenQuoteModal()} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm flex items-center gap-2">Request a Project Quote<ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="pt-6 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                [Hammer, 'Supply + Installation', 'One coordinated door scope'],
                [Building2, 'Serious Project Capability', 'Commercial, high-rise & new build'],
                [Wrench, 'Replacement & Emergency', 'Existing-building door work'],
                [Layers, 'Related Construction', 'Walls, openings & T-bar ceilings'],
              ].map(([Icon, title, text]: any) => <div key={title} className="flex items-start gap-2.5"><div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0"><Icon className="w-4 h-4" /></div><div><div className="text-xs font-bold text-white">{title}</div><div className="text-[11px] text-neutral-400">{text}</div></div></div>)}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-6 shadow-2xl space-y-5">
              <div className="space-y-2"><div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase"><Building2 className="w-4 h-4" />GCs · Developers · Property Managers</div><h2 className="text-xl font-display font-bold text-white">Have drawings, a door schedule or an existing opening?</h2><p className="text-sm text-neutral-300 leading-relaxed">Send the project information you have. We can review door requirements, supply options, installation scope and related opening work.</p></div>
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs text-neutral-300"><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />Door and hardware supply</div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />Professional installation</div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />Commercial and multi-unit scopes</div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />Wall, opening and ceiling coordination where required</div></div>
              <button onClick={onOpenScheduleModal} className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2"><FileSpreadsheet className="w-4 h-4" />Send Your Door Schedule</button>
              <a href="tel:7787732790" className="block text-center text-xs text-neutral-300 hover:text-white">Installation & project contact: Rambo Walls & Ceilings · 778-773-2790</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
