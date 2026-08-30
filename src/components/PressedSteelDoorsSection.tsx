import React from 'react';
import { ArrowRight, Building2, ShieldCheck, Warehouse } from 'lucide-react';

interface PressedSteelDoorsSectionProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
}

export const PressedSteelDoorsSection: React.FC<PressedSteelDoorsSectionProps> = ({ onOpenQuoteModal, onOpenScheduleModal }) => (
  <section id="pressed-steel-doors" className="py-20 bg-neutral-900 border-y border-neutral-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      <figure className="relative overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-950">
        <img src="/images/pressed-steel-door-example.jpg" alt="Example of a charcoal pressed-steel commercial door and matching steel frame with closer and lever hardware" width="1536" height="1024" loading="eager" className="w-full aspect-[3/2] object-cover" />
        <figcaption className="absolute left-4 bottom-4 rounded-full bg-neutral-950/90 border border-neutral-700 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-300">Representative product example</figcaption>
      </figure>
      <div>
        <div className="text-xs font-mono uppercase tracking-[.18em] text-amber-400">Priority door system</div>
        <h2 className="mt-3 text-4xl sm:text-5xl font-display font-black text-white leading-tight">Pressed-steel doors, frames and hardware packages</h2>
        <p className="mt-5 text-lg text-neutral-300 leading-relaxed">For stairwells, mechanical rooms, parkades, loading areas, warehouses, service corridors and other demanding openings. Just Doors coordinates the leaf, frame, anchors, hardware preparations, finish and any specified listed rating as one project package.</p>
        <div className="mt-7 grid sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-neutral-700 bg-neutral-950 p-4"><Building2 className="w-5 h-5 text-amber-400" /><strong className="block mt-2 text-sm text-white">Multi-family</strong><span className="text-xs text-neutral-400">Stairs, service and common areas</span></div>
          <div className="rounded-2xl border border-neutral-700 bg-neutral-950 p-4"><Warehouse className="w-5 h-5 text-amber-400" /><strong className="block mt-2 text-sm text-white">Commercial</strong><span className="text-xs text-neutral-400">Back-of-house and industrial openings</span></div>
          <div className="rounded-2xl border border-neutral-700 bg-neutral-950 p-4"><ShieldCheck className="w-5 h-5 text-amber-400" /><strong className="block mt-2 text-sm text-white">Specified assemblies</strong><span className="text-xs text-neutral-400">Project documents control ratings</span></div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => onOpenQuoteModal('commercial')} className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold px-5 py-3">Quote pressed-steel doors <ArrowRight className="w-4 h-4" /></button>
          <button onClick={onOpenScheduleModal} className="rounded-xl border border-neutral-700 hover:border-amber-500 text-white font-bold px-5 py-3">Send a door schedule</button>
        </div>
      </div>
    </div>
  </section>
);
