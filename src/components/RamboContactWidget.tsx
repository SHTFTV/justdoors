import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, X, ArrowUpRight, Hammer } from 'lucide-react';

const RAMBO_PHONE_DISPLAY = '778-773-2790';
const RAMBO_PHONE_TEL = '7787732790';
const RAMBO_EMAIL = 'rambowallceiling@gmail.com';

export const RamboContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 no-print">
      {isOpen && (
        <div className="w-[92vw] max-w-sm rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl shadow-black/50 p-6 relative">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white flex items-center justify-center" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
          <div className="mb-5 pr-8">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">Installation contact</div>
            <h3 className="text-2xl font-display font-black text-white leading-tight">Rambo Wall &amp; Ceiling</h3>
            <p className="text-xs text-neutral-400 mt-1">Current Lower Mainland contractor used for door installation and related wall or ceiling work on Just Doors projects.</p>
          </div>
          <div className="space-y-2.5">
            <a href={`tel:${RAMBO_PHONE_TEL}`} className="flex items-center gap-3 w-full p-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors">
              <Phone className="w-5 h-5" /><div><div className="text-[10px] font-mono uppercase tracking-wider opacity-70">Call</div><div className="text-lg font-extrabold">{RAMBO_PHONE_DISPLAY}</div></div>
            </a>
            <a href={`sms:${RAMBO_PHONE_TEL}`} className="flex items-center gap-3 w-full p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-white">
              <MessageSquare className="w-5 h-5 text-amber-400" /><div><div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Text</div><div className="text-lg font-bold">{RAMBO_PHONE_DISPLAY}</div></div>
            </a>
            <a href={`mailto:${RAMBO_EMAIL}`} className="flex items-center gap-3 w-full p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-white">
              <Mail className="w-5 h-5 text-amber-400" /><div className="min-w-0"><div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Email</div><div className="text-sm font-bold truncate">{RAMBO_EMAIL}</div></div>
            </a>
          </div>
          <p className="mt-4 text-[11px] text-neutral-500 leading-relaxed">Contractor relationship shown for transparency. No star rating, certification or independent endorsement is implied here.</p>
          <a href="https://rambowalls.com" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-500 hover:text-amber-400 transition-colors">
            <span>rambowalls.com</span><ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
      <button onClick={() => setIsOpen(v => !v)} className={`flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full font-extrabold text-sm shadow-xl transition-all ${isOpen ? 'bg-neutral-800 text-neutral-200 border border-neutral-700' : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/30'}`} aria-expanded={isOpen} aria-label="Talk to Rambo Wall & Ceiling">
        {isOpen ? <X className="w-5 h-5" /> : <Hammer className="w-5 h-5" />}<span>{isOpen ? 'Close' : 'Installation Contact'}</span>
      </button>
    </div>
  );
};
