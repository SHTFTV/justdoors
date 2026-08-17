import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  DoorOpen, 
  FileSpreadsheet, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Home, 
  Layers, 
  Sliders, 
  CheckCircle2,
  Wrench,
  HelpCircle,
  Compass,
  Search
} from 'lucide-react';
import { SectorType } from '../types';

interface NavbarProps {
  activeSector: SectorType;
  onSelectSector: (sector: SectorType) => void;
  onOpenScheduleModal: () => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenAIAssistant: () => void;
  onOpenGlobalSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSector,
  onSelectSector,
  onOpenScheduleModal,
  onOpenQuoteModal,
  onOpenAIAssistant,
  onOpenGlobalSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (onOpenGlobalSearch) {
          onOpenGlobalSearch();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenGlobalSearch]);

  const scrollTo = (elementId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 shadow-2xl py-2.5' 
          : 'bg-gradient-to-b from-neutral-950/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Logo & Manifesto Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group"
              id="brand-logo-link"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-neutral-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <DoorOpen className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    JUST DOORS
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                    justdoors.co
                  </span>
                </div>
                <span className="text-[11px] font-medium text-amber-400/90 tracking-wide uppercase">
                  No Windows. Just Doors.
                </span>
              </div>
            </a>
          </div>

          {/* Global Search Bar (Quick Filter Button) */}
          <div className="hidden xl:flex items-center flex-grow max-w-xs mx-2">
            <button
              id="navbar-global-search-btn"
              onClick={onOpenGlobalSearch}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 hover:border-amber-500/60 text-neutral-400 hover:text-white transition-all text-xs group shadow-inner"
              title="Search Door Catalog, FAQs & Case Studies (Ctrl/Cmd + K)"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="truncate">Search catalog, FAQs, projects...</span>
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-neutral-800 border border-neutral-700 rounded text-neutral-400 group-hover:text-amber-300">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/80 border border-neutral-800/80 rounded-full px-2.5 py-1 backdrop-blur-sm shrink-0">
            <button
              id="nav-link-residential"
              onClick={() => { onSelectSector('residential'); scrollTo('sectors-overview'); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSector === 'residential' 
                  ? 'bg-neutral-800 text-amber-400 shadow-inner' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Residential
            </button>

            <button
              id="nav-link-high-rise"
              onClick={() => { onSelectSector('high-rise'); scrollTo('high-rise-spotlight'); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSector === 'high-rise' 
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20' 
                  : 'text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Multi-Family</span>
              <span className="bg-amber-400/30 text-amber-200 text-[9px] px-1 rounded font-mono uppercase">GCs</span>
            </button>

            <button
              id="nav-link-commercial"
              onClick={() => { onSelectSector('commercial'); scrollTo('sectors-overview'); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSector === 'commercial' 
                  ? 'bg-neutral-800 text-amber-400 shadow-inner' 
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Commercial
            </button>

            <button
              id="nav-link-catalog"
              onClick={() => scrollTo('doors-and-hardware')}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-all flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
              <span>Catalog</span>
            </button>

            <button
              id="nav-link-projects"
              onClick={() => scrollTo('projects-proof')}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-all"
            >
              Projects
            </button>

            <button
              id="nav-link-municipalities"
              onClick={() => scrollTo('municipal-directory')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Cities (28)</span>
            </button>

            <button
              id="nav-link-faq"
              onClick={() => scrollTo('faq-section')}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-all flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
              <span>FAQ</span>
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Search Icon button for medium desktop if search input is hidden */}
            <button
              onClick={onOpenGlobalSearch}
              className="xl:hidden p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-amber-400 hover:text-white transition-all"
              title="Search Catalog & FAQs"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="nav-cta-schedule"
              onClick={onOpenScheduleModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 hover:border-amber-500/50 text-neutral-200 hover:text-white text-xs font-semibold transition-all group"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Takeoff</span>
            </button>

            <button
              id="nav-cta-quote"
              onClick={() => onOpenQuoteModal()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle & Search */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-search-btn"
              onClick={onOpenGlobalSearch}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 hover:text-white"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="mobile-menu-quote-btn"
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs"
            >
              Quote
            </button>
            
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-4 pb-6 mt-3 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          
          {/* Mobile Search Trigger */}
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenGlobalSearch?.(); }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-amber-500/50 text-xs font-mono"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search Catalog, FAQs & Projects...</span>
            </span>
            <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">Search</span>
          </button>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Building2 className="w-4 h-4" />
              <span>High-Rise & Multi-Family Doors</span>
            </div>
            <button
              onClick={() => { scrollTo('high-rise-spotlight'); }}
              className="text-[11px] bg-amber-500 text-neutral-950 px-2 py-1 rounded font-bold"
            >
              View Packages
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onSelectSector('residential'); scrollTo('sectors-overview'); }}
              className="p-3 text-left rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>Residential</span>
            </button>
            <button
              onClick={() => { onSelectSector('commercial'); scrollTo('sectors-overview'); }}
              className="p-3 text-left rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Commercial</span>
            </button>
            <button
              onClick={() => scrollTo('doors-and-hardware')}
              className="p-3 text-left rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Doors & Hardware</span>
            </button>
            <button
              onClick={() => scrollTo('projects-proof')}
              className="p-3 text-left rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Projects & Proof</span>
            </button>
            <button
              onClick={() => scrollTo('municipal-directory')}
              className="p-3 text-left rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:border-amber-500/60 text-xs font-semibold flex items-center gap-2 col-span-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Municipal Directory (28 Lower Mainland Cities)</span>
            </button>
            <button
              onClick={() => scrollTo('faq-section')}
              className="p-3 text-left rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-2 col-span-2"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Technical FAQ & Code Specs</span>
            </button>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={onOpenScheduleModal}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-neutral-900 border border-amber-500/40 text-amber-300 font-bold text-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Send Us Your Door Schedule</span>
            </button>
            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-[10px] text-neutral-500 space-y-0.5">
              <div>
                A division of{' '}
                <a 
                  href="https://buildershaus.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-neutral-300 hover:text-amber-400 font-semibold underline"
                >
                  Builders Haus
                </a>
              </div>
              <div>
                Powered By{' '}
                <a 
                  href="https://industryarmymarketing.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-amber-400/90 hover:text-amber-300 font-semibold underline"
                >
                  Industry Army Marketing
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
