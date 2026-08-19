import React from 'react';
import { X, Search, ArrowRight } from 'lucide-react';

interface EyeSpyRInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Update this once the live EyeSpyR verification URL is confirmed.
const EYESPYR_VERIFY_URL = 'https://eyespyr.com';

export const EyeSpyRInfoModal: React.FC<EyeSpyRInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-emerald-500/50 shadow-[0_0_40px_-10px_rgba(16,185,129,0.45)] p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-xl border border-amber-500/60 bg-neutral-900 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="flex items-center gap-2.5 pr-10">
          <span className="w-9 h-9 rounded-full border-2 border-emerald-400/70 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4 text-emerald-400" />
          </span>
          <span className="font-display font-black text-2xl tracking-tight leading-none">
            <span className="text-emerald-400">EyeSpy</span>
            <span className="text-emerald-300">R</span>
          </span>
        </div>
        <div className="mt-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-500/80">
          The Trust Layer
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-2xl sm:text-3xl font-display font-black text-white leading-tight">
          A trust layer that goes beyond our ecosystem
        </h2>

        {/* Intro */}
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-300 font-serif">
          EyeSpyR is verification that a local business is real — reviews aggregated across many
          sources, plus real KYC: business registration, trade license, insurance, identity, and
          location-aware jobsite media. Clear it and you earn a{' '}
          <span className="text-emerald-400 font-semibold">Live Trusted</span> standing, up to the
          Emerald Shield.
        </p>

        {/* Points */}
        <div className="mt-6 space-y-4">
          {[
            {
              lead: 'Reviews + verification = trust.',
              body: 'Not a star rating anyone can fake — a verified, evidence-backed profile.',
            },
            {
              lead: 'Freshness keeps it honest.',
              body: 'Go quiet and the badge decays — only active, provable businesses stay visible. The exact window is tuned per category, not a blunt one-size rule.',
            },
            {
              lead: 'The badge travels.',
              body: "It works inside our directories and on a contractor's own site, quotes, and trucks.",
            },
          ].map((pt, i) => (
            <div key={i} className={i > 0 ? 'pt-4 border-t border-neutral-800' : ''}>
              <div className="flex gap-3">
                <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-[15px] leading-relaxed text-neutral-300 font-serif">
                  <span className="font-bold text-white">{pt.lead}</span> {pt.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Beyond-ecosystem callout */}
        <div className="mt-6 p-4 rounded-2xl bg-neutral-900/70 border-l-4 border-amber-500">
          <p className="text-[15px] leading-relaxed text-neutral-300 font-serif">
            <span className="text-amber-400 font-semibold">Beyond our ecosystem:</span> because the
            badge means something wherever it appears, EyeSpyR isn't just how our directories filter
            listings — it can become the trust check independent contractors and service providers
            across the trades use on their own. That's the layer we own.
          </p>
        </div>

        {/* CTA */}
        <a
          href={EYESPYR_VERIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm transition-colors active:scale-95 shadow-lg shadow-amber-500/25"
        >
          <span>Get verified · $10</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
