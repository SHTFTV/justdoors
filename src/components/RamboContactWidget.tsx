import React, { useEffect, useState } from 'react';
import { Phone, MessageSquare, Mail, X, ArrowUpRight } from 'lucide-react';

const PHONE = '778-773-2790';
const PHONE_LINK = '7787732790';
const EMAIL = 'rambowallceiling@gmail.com';

export const RamboContactWidget: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => event.key === 'Escape' && setVisible(false);
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Door installation contact" className="fixed right-2 md:right-3 top-1/2 -translate-y-1/2 z-40 w-[218px] md:w-[230px] max-w-[calc(100vw-16px)] rounded-[20px] bg-neutral-950 border border-neutral-700 shadow-2xl shadow-black/60 p-4 md:p-[18px] no-print">
      <button type="button" onClick={() => setVisible(false)} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white focus-visible:outline-amber-400 flex items-center justify-center" aria-label="Dismiss installation contact"><X className="w-4 h-4" /></button>
      <div className="pr-8 text-[9.5px] font-mono uppercase tracking-[.12em] text-amber-500">Door installation</div>
      <h3 className="pr-6 mt-1 font-display font-black text-lg leading-tight text-white">Rambo Wall &amp; Ceiling</h3>
      <p className="hidden md:block my-2.5 text-[11.5px] leading-relaxed text-neutral-400">Lower Mainland installation and related wall or ceiling work for Just Doors projects.</p>
      <div className="mt-3 space-y-2">
        <a href={`tel:${PHONE_LINK}`} className="flex gap-2.5 items-center rounded-xl bg-amber-500 text-neutral-950 p-2.5"><Phone className="w-4 h-4 shrink-0" /><span><small className="block text-[8px] font-mono uppercase tracking-wider opacity-70">Call now</small><strong className="block text-xs">{PHONE}</strong></span></a>
        <a href={`sms:${PHONE_LINK}`} className="flex gap-2.5 items-center rounded-xl bg-neutral-900 border border-neutral-700 text-white p-2.5"><MessageSquare className="w-4 h-4 shrink-0 text-amber-400" /><span><small className="block text-[8px] font-mono uppercase tracking-wider text-neutral-500">Text</small><strong className="block text-xs">{PHONE}</strong></span></a>
        <a href={`mailto:${EMAIL}`} className="flex gap-2.5 items-center rounded-xl bg-neutral-900 border border-neutral-700 text-white p-2.5"><Mail className="w-4 h-4 shrink-0 text-amber-400" /><span className="min-w-0"><small className="block text-[8px] font-mono uppercase tracking-wider text-neutral-500">Email</small><strong className="block text-[11px] break-all">{EMAIL}</strong></span></a>
      </div>
      <a href="https://rambowalls.com" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-1 text-[10.5px] text-neutral-400 hover:text-amber-400">Visit rambowalls.com <ArrowUpRight className="w-3 h-3" /></a>
    </aside>
  );
};
