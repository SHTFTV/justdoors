import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, X, ArrowUpRight, Hammer } from 'lucide-react';

const RAMBO_PHONE_DISPLAY = '778-773-2790';
const RAMBO_PHONE_TEL = '7787732790';
const RAMBO_TEXT_DISPLAY = '778-773-2790';
const RAMBO_TEXT_SMS = '7787732790';
const RAMBO_EMAIL = 'rambowallceiling@gmail.com';

export const RamboContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 no-print">
      {/* Popup card */}
      {isOpen && (
        <div className="w-[92vw] max-w-sm rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl shadow-black/50 p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="mb-5 pr-8">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
              Talk to Rambo Wall &amp; Ceiling
            </div>
            <h3 className="text-2xl font-display font-black text-white leading-tight">
              Free on-site quotes
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Lower Mainland door install partner for Just Doors.
            </p>
          </div>

          {/* Contact actions */}
          <div className="space-y-2.5">
            {/* Call — primary */}
            <a
              href={`tel:${RAMBO_PHONE_TEL}`}
              className="flex items-center gap-3 w-full p-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors active:scale-[0.99] shadow-lg shadow-amber-500/20"
            >
              <Phone className="w-5 h-5 shrink-0" />
              <div className="text-left leading-tight">
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-70">Call</div>
                <div className="text-lg font-extrabold">{RAMBO_PHONE_DISPLAY}</div>
              </div>
            </a>

            {/* Text */}
            <a
              href={`sms:${RAMBO_TEXT_SMS}`}
              className="flex items-center gap-3 w-full p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white transition-colors"
            >
              <MessageSquare className="w-5 h-5 shrink-0 text-amber-400" />
              <div className="text-left leading-tight">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Text</div>
                <div className="text-lg font-bold">{RAMBO_TEXT_DISPLAY}</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${RAMBO_EMAIL}`}
              className="flex items-center gap-3 w-full p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white transition-colors"
            >
              <Mail className="w-5 h-5 shrink-0 text-amber-400" />
              <div className="text-left leading-tight min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Email</div>
                <div className="text-sm font-bold truncate">{RAMBO_EMAIL}</div>
              </div>
            </a>
          </div>

          {/* Footer link */}
          <a
            href="https://rambowalls.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-500 hover:text-amber-400 transition-colors"
          >
            <span>rambowalls.com</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full font-extrabold text-sm shadow-xl transition-all active:scale-95 ${
          isOpen
            ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
            : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/30'
        }`}
        aria-expanded={isOpen}
        aria-label="Talk to Rambo Wall & Ceiling"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Hammer className="w-5 h-5" />}
        <span>{isOpen ? 'Close' : 'Talk to Rambo'}</span>
      </button>
    </div>
  );
};
