import React from 'react';
import { 
  DoorOpen, 
  Building2, 
  Home, 
  Briefcase, 
  FileSpreadsheet, 
  Mail, 
  MapPin, 
  Flame, 
  ShieldCheck, 
  ArrowUp,
  Download,
  ExternalLink,
  Megaphone,
  Network,
  PenLine,
  Star
} from 'lucide-react';
import { SectorType } from '../types';

interface FooterProps {
  onSelectSector: (sector: SectorType) => void;
  onOpenScheduleModal: () => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenMarketing?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSector,
  onOpenScheduleModal,
  onOpenQuoteModal,
  onOpenMarketing,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand & Manifesto Column (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-neutral-950 font-bold shadow-md shadow-amber-500/20">
                <DoorOpen className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                JUST DOORS
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                justdoors.co
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
              Residential, multi-family and commercial door solutions. From condo entry doors to high-rise developments and commercial office buildings, Just Doors supplies door systems built for the application.
            </p>

            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono space-y-1">
              <div className="text-amber-400 font-bold uppercase">The Single-Focus Promise:</div>
              <div className="text-neutral-400">No windows anywhere. 100% focused on architectural doors, frames, fire codes, and hardware schedules.</div>
            </div>

            {/* Corporate Division & Marketing Attribution */}
            <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <span className="text-neutral-400">A division of</span>
                <a 
                  href="https://buildershaus.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-amber-400 inline-flex items-center gap-1 transition-colors underline decoration-neutral-700 hover:decoration-amber-400"
                >
                  <span>Builders Haus</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-neutral-300 text-[11px]">
                <span className="text-neutral-400">Powered by</span>
                <a 
                  href="https://industryarmymarketing.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-300 hover:text-amber-200 inline-flex items-center gap-1 transition-colors underline decoration-amber-500/40 hover:decoration-amber-300"
                >
                  <span>Industry Army Marketing</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Sectors Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Market Sectors
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { onSelectSector('high-rise'); scrollTo('high-rise-spotlight'); }}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-neutral-200">Multi-Family & High-Rise</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectSector('commercial'); scrollTo('doors-for-every-project'); }}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Commercial & Institutional</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectSector('residential'); scrollTo('doors-for-every-project'); }}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Residential & Condo Entry</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('municipal-directory')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 font-semibold text-amber-300"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lower Mainland Cities (28 Municipalities)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('projects-proof')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Project Portfolio & Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('interactive-project-map')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 text-neutral-300"
                >
                  <span>Metropolitan Project Map</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('project-timeline-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 text-neutral-300"
                >
                  <span>Lead Times & Phased Timeline</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faq-section')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 font-semibold text-neutral-300"
                >
                  <span>Technical FAQ & Specs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Door Systems & Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Door Systems
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => scrollTo('doors-and-hardware')} className="hover:text-white transition-colors">
                  UL 10C 20-Min Suite Entries
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('doors-and-hardware')} className="hover:text-white transition-colors">
                  90-Min & 3-Hr Hollow Metal
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('doors-and-hardware')} className="hover:text-white transition-colors">
                  Commercial Aluminum Portals
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('doors-and-hardware')} className="hover:text-white transition-colors">
                  Solid Core Flush Interior Doors
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('doors-and-hardware')} className="hover:text-white transition-colors">
                  Grade 1 Hardware & Closers
                </button>
              </li>
            </ul>
          </div>

          {/* Estimating & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Estimating & Takeoffs
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={onOpenScheduleModal}
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Send Door Schedule</span>
              </button>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5 text-[11px] font-mono">
                <a 
                  href="mailto:build@buildershaus.com"
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>build@buildershaus.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* B2B & Marketing Network Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5 text-amber-400" />
              <span>B2B & Marketing</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={onOpenMarketing}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 font-semibold text-amber-300"
                >
                  <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Builderhaus Marketing</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMarketing}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Become a Featured Trade</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('rambo-guest-post')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <PenLine className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Guest Posts & Editorial</span>
                </button>
              </li>
              <li className="pt-1.5 mt-1.5 border-t border-neutral-800/80">
                <span className="text-[10px] font-mono uppercase text-neutral-500 flex items-center gap-1.5">
                  <Network className="w-3 h-3 text-amber-400/70" /> Trade Network
                </span>
              </li>
              <li>
                <a href="https://buildershaus.com/marketing" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>buildershaus.com/marketing</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/70" />
                </a>
              </li>
              <li>
                <a href="https://steelstud.ca" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>steelstud.ca</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/70" />
                </a>
              </li>
              <li>
                <a href="https://framers.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>framers.io</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/70" />
                </a>
              </li>
              <li>
                <a href="https://steelstudcontractors.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>steelstudcontractors.com</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/70" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col lg:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Just Doors Inc. (<span className="text-neutral-300 font-mono">justdoors.co</span>). All rights reserved.</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span>
              A division of{' '}
              <a 
                href="https://buildershaus.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 font-semibold underline decoration-neutral-700 hover:decoration-amber-400 transition-colors"
              >
                Builders Haus
              </a>
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span>
              Powered By{' '}
              <a 
                href="https://industryarmymarketing.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold underline decoration-amber-500/40 hover:decoration-amber-300 transition-colors"
              >
                Industry Army Marketing
              </a>
            </span>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <span className="text-neutral-400 font-mono text-[11px]">NFPA 80 • UL 10C • IBC 2024</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
