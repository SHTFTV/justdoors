import React from 'react';
import {
  X,
  Megaphone,
  ArrowUpRight,
  ArrowRight,
  Network,
  PenLine,
  Star,
  Building2,
  DoorOpen,
} from 'lucide-react';

interface MarketingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MARKETING_URL = 'https://buildershaus.com/marketing';

const NETWORK_SITES = [
  { name: 'Builderhaus', url: 'https://buildershaus.com', tag: 'Parent Brand', desc: 'Interior build-out group & trade marketing.' },
  { name: 'Just Doors', url: 'https://justdoors.co', tag: 'This Site', desc: 'Door systems, fire assemblies & schedules.' },
  { name: 'Steel Stud', url: 'https://steelstud.ca', tag: 'Framing', desc: 'Steel-stud framing systems & specs.' },
  { name: 'Framers.io', url: 'https://framers.io', tag: 'Framing', desc: 'Framing trade platform & lead gen.' },
  { name: 'Steel Stud Contractors', url: 'https://steelstudcontractors.com', tag: 'Contractors', desc: 'Contractor directory & takeoffs.' },
];

const B2B_OFFERS = [
  { icon: PenLine, title: 'Guest Posts & Editorial', body: 'Get featured on a niche trade site — like Rambo Wall & Ceiling on Just Doors — with a byline that links back to you.' },
  { icon: Star, title: 'Become a Featured Trade', body: 'Own a category in your city. We build the page, the schema, and the lead form; you get the calls.' },
  { icon: Network, title: 'Niche Site Network', body: 'One marketing engine across doors, framing, and finishing brands — cross-linked for authority and reach.' },
];

export const MarketingModal: React.FC<MarketingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-9 space-y-8">

          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Builderhaus Marketing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Trade marketing that actually books work.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              Just Doors is a division of <strong className="text-white">Builderhaus</strong> — a network of
              single-focus trade sites built to rank, capture leads, and hand real jobs to the crews behind
              them. If you're a trade contractor who wants your own niche page, guest post, or lead engine,
              this is how it works.
            </p>

            <a
              href={MARKETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
            >
              <span>Visit Builderhaus Marketing</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* B2B offers */}
          <div className="grid sm:grid-cols-3 gap-4">
            {B2B_OFFERS.map((o) => (
              <div key={o.title} className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <o.icon className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-white">{o.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{o.body}</p>
              </div>
            ))}
          </div>

          {/* Network sites */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold">
              <Network className="w-4 h-4 text-amber-400" />
              <span>The Builderhaus Trade Network</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {NETWORK_SITES.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-colors group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      {s.name === 'Just Doors' ? (
                        <DoorOpen className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Building2 className="w-4 h-4 text-neutral-400" />
                      )}
                      <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{s.name}</span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-400">{s.tag}</span>
                    </div>
                    <p className="text-xs text-neutral-400">{s.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">Ready to claim your niche?</div>
              <div className="text-xs text-neutral-400">Get a guest post, a featured page, or a site of your own.</div>
            </div>
            <a
              href={MARKETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-amber-500/40 text-amber-300 hover:text-white hover:border-amber-500 font-bold text-sm transition-colors shrink-0"
            >
              <span>buildershaus.com/marketing</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
