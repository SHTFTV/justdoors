import React from 'react';
import { Phone, Mail, ArrowRight, ArrowUpRight, DoorOpen, Hammer, Layers, Wrench, CheckCircle2 } from 'lucide-react';

interface RamboGuestPostProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenMarketing?: () => void;
}

export const RamboGuestPost: React.FC<RamboGuestPostProps> = ({ onOpenQuoteModal }) => (
  <section id="rambo-installation" className="py-20 sm:py-24 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950 border-b border-neutral-800">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <article className="lg:col-span-7 space-y-6 text-neutral-300 leading-relaxed">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wide"><DoorOpen className="w-4 h-4" />Installation & Related Construction</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.05]">Door work backed by Rambo Walls &amp; Ceilings.</h2>
          <p className="text-lg">Rambo Walls &amp; Ceilings is the contractor currently handling Just Doors installation and related construction work across the Lower Mainland. That gives projects one practical path from door supply through installation and the surrounding work required to make the opening ready.</p>
          <p>That capability matters on commercial, high-rise, multi-family, office and new-construction projects where the door is only one part of the scope. Existing openings may require framing or wall adjustments. Ceiling grids may need repair or modification. New work may require complete T-bar or wall-and-ceiling coordination around the opening.</p>
          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800"><Hammer className="w-5 h-5 text-amber-400 mb-2" /><h3 className="font-bold text-white text-sm">Door Installation</h3><p className="text-xs text-neutral-400 mt-1">Professional installation for supplied, replacement and project door scopes.</p></div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800"><Wrench className="w-5 h-5 text-amber-400 mb-2" /><h3 className="font-bold text-white text-sm">Opening & Wall Work</h3><p className="text-xs text-neutral-400 mt-1">Related framing, wall and opening adjustments where the project requires them.</p></div>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800"><Layers className="w-5 h-5 text-amber-400 mb-2" /><h3 className="font-bold text-white text-sm">T-Bar & Ceilings</h3><p className="text-xs text-neutral-400 mt-1">T-bar repairs, modifications and complete installation as part of related construction scopes.</p></div>
          </div>
          <p className="text-sm text-neutral-400">Just Doors does not manufacture the products it supplies. Door and hardware products are sourced for the project and installed as part of a professionally coordinated scope.</p>
        </article>
        <aside className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-amber-500/40 shadow-2xl space-y-4">
          <div className="text-amber-300 text-xs font-mono font-bold uppercase">Current Lower Mainland Contractor</div>
          <h3 className="text-2xl font-bold text-white">Rambo Walls &amp; Ceilings</h3>
          <p className="text-sm text-neutral-300">For installation, site coordination and related construction work, contact Rambo Walls &amp; Ceilings directly.</p>
          <div className="space-y-2.5">
            <a href="tel:7787732790" className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm flex items-center justify-center gap-2"><Phone className="w-4 h-4" />778-773-2790</a>
            <a href="mailto:rambowallceiling@gmail.com" className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 font-bold text-sm flex items-center justify-center gap-2"><Mail className="w-4 h-4 text-amber-400" />rambowallceiling@gmail.com</a>
            <button onClick={() => onOpenQuoteModal('commercial')} className="w-full py-3 px-4 rounded-xl bg-neutral-950 text-amber-300 border border-amber-500/40 font-bold text-sm flex items-center justify-center gap-2">Request Project Pricing<ArrowRight className="w-4 h-4" /></button>
            <a href="https://rambowalls.com" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-xl border border-neutral-800 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-2">Rambo Walls &amp; Ceilings website<ArrowUpRight className="w-3.5 h-3.5 text-amber-400" /></a>
          </div>
          <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs text-neutral-400"><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />Residential through large commercial project scopes</div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />High-rise, office, multi-family and new construction capability</div><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />Related wall and ceiling work available when required</div></div>
        </aside>
      </div>
    </div>
  </section>
);
