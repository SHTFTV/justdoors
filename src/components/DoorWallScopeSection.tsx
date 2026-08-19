import React from 'react';
import {
  Frame,
  Hammer,
  Wrench,
  PanelTop,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface DoorWallScopeSectionProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
}

const SCOPE_ITEMS = [
  {
    icon: Frame,
    title: 'New-construction openings',
    body: 'Rough openings framed to the door schedule — correct width, height, header, and hinge/strike backing, boxed plumb and square before the board goes up.',
  },
  {
    icon: RefreshCw,
    title: 'Door replacements & retrofits',
    body: 'Widen or re-cut existing openings, re-frame headers, add backing, and make good the drywall around the new frame so a swap reads factory-clean.',
  },
  {
    icon: Wrench,
    title: 'Wall repairs to fit doors',
    body: "Adjust openings that don't match the new assembly, patch and refinish the wall, and re-establish the fire separation wherever the opening changes.",
  },
  {
    icon: PanelTop,
    title: 'T-bar & ceiling adjustments',
    body: 'Relocate suspended grid, tiles, and bulkheads when partitions or door heads move — keeping the reflected ceiling clean around every new opening.',
  },
];

const REASONS = [
  'New builds & tenant improvements',
  'Fire-rating upgrades',
  'Damaged or racked frames',
  'Accessibility clearances',
  'Acoustic upgrades',
  'Renovations & repartitioning',
];

export const DoorWallScopeSection: React.FC<DoorWallScopeSectionProps> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section
      id="door-wall-scope"
      className="py-20 sm:py-24 bg-neutral-950 border-b border-neutral-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wide mb-4">
            <Hammer className="w-3.5 h-3.5" />
            <span>Doors + Walls + Ceilings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.05]">
            The wall &amp; ceiling work behind every door
          </h2>
          <p className="mt-4 text-[15px] sm:text-base text-neutral-300 leading-relaxed">
            A door is only as good as the opening it hangs in. New builds and retrofits alike need
            the wall framed, the opening sized, the backing set, and often the ceiling grid adjusted —
            before and after the door goes in. Through our Lower Mainland install partner{' '}
            <a
              href="https://rambowalls.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              Rambo Wall &amp; Ceiling
            </a>
            , Just Doors delivers the door and the opening around it as one coordinated scope.
          </p>
        </div>

        {/* Scope grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {SCOPE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Reasons + CTA */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 to-transparent border border-neutral-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Reasons to install or replace
            </div>
            <div className="flex flex-wrap gap-2">
              {REASONS.map((r) => (
                <span
                  key={r}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {r}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => onOpenQuoteModal('commercial')}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm transition-colors active:scale-95 shadow-lg shadow-amber-500/20"
          >
            <span>Get a door + wall quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-5 text-sm text-neutral-500">
          One partner for the door and the wall around it — supplied and scheduled by Just Doors,
          framed and finished by Rambo Wall &amp; Ceiling.
        </p>
      </div>
    </section>
  );
};
