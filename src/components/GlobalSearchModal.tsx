import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  DoorClosed, 
  HelpCircle, 
  Building2, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  MapPin,
  Volume2,
  FileSpreadsheet,
  CornerDownLeft,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DOOR_PRODUCTS } from '../data/products';
import { FAQ_DATA, FAQItem } from '../data/faqData';
import { CASE_STUDIES } from '../data/projects';
import { DoorProduct, ProjectCaseStudy } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoorProduct?: (product: DoorProduct) => void;
  onSelectProject?: (project: ProjectCaseStudy) => void;
  onSelectFAQ?: (faq: FAQItem) => void;
}

type SearchFilterCategory = 'all' | 'doors' | 'faqs' | 'projects';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDoorProduct,
  onSelectProject,
  onSelectFAQ,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<SearchFilterCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered Door Catalog
  const matchedDoors = useMemo(() => {
    if (!query.trim()) return DOOR_PRODUCTS.slice(0, 4);
    const q = query.toLowerCase().trim();
    return DOOR_PRODUCTS.filter((d) => 
      d.name.toLowerCase().includes(q) ||
      d.subtitle.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.fireRating.toLowerCase().includes(q) ||
      d.finishes.some(f => f.toLowerCase().includes(q)) ||
      d.applications.some(a => a.toLowerCase().includes(q)) ||
      d.hardwareCompatibility?.some(h => h.toLowerCase().includes(q)) ||
      d.acousticSTC?.toLowerCase().includes(q)
    );
  }, [query]);

  // Filtered FAQs
  const matchedFAQs = useMemo(() => {
    if (!query.trim()) return FAQ_DATA.slice(0, 3);
    const q = query.toLowerCase().trim();
    return FAQ_DATA.filter((f) => 
      f.question.toLowerCase().includes(q) ||
      f.shortAnswer.toLowerCase().includes(q) ||
      f.detailedAnswer.toLowerCase().includes(q) ||
      f.tags.some(t => t.toLowerCase().includes(q)) ||
      f.codeReferences?.some(c => c.toLowerCase().includes(q)) ||
      f.categoryLabel.toLowerCase().includes(q)
    );
  }, [query]);

  // Filtered Projects / Case Studies
  const matchedProjects = useMemo(() => {
    if (!query.trim()) return CASE_STUDIES.slice(0, 3);
    const q = query.toLowerCase().trim();
    return CASE_STUDIES.filter((p) => 
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      (p.municipalityName && p.municipalityName.toLowerCase().includes(q)) ||
      p.summary.toLowerCase().includes(q) ||
      (p.finishLevel && p.finishLevel.toLowerCase().includes(q)) ||
      (p.fireRatingULC && p.fireRatingULC.toLowerCase().includes(q)) ||
      (p.soundRatingSTC && p.soundRatingSTC.toLowerCase().includes(q)) ||
      (p.specsDelivered && p.specsDelivered.some(s => s.toLowerCase().includes(q))) ||
      (p.locationChallenges?.engineeredSolution && p.locationChallenges.engineeredSolution.toLowerCase().includes(q))
    );
  }, [query]);

  const totalResultsCount = 
    (selectedFilter === 'all' || selectedFilter === 'doors' ? matchedDoors.length : 0) +
    (selectedFilter === 'all' || selectedFilter === 'faqs' ? matchedFAQs.length : 0) +
    (selectedFilter === 'all' || selectedFilter === 'projects' ? matchedProjects.length : 0);

  const handleSelectDoor = (product: DoorProduct) => {
    onClose();
    if (onSelectDoorProduct) {
      onSelectDoorProduct(product);
    }
    const el = document.getElementById('doors-and-hardware');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFAQ = (faq: FAQItem) => {
    onClose();
    if (onSelectFAQ) {
      onSelectFAQ(faq);
    }
    const el = document.getElementById('faq-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (project: ProjectCaseStudy) => {
    onClose();
    if (onSelectProject) {
      onSelectProject(project);
    }
    const el = document.getElementById('projects-proof');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      id="global-search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-neutral-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto sm:my-8">
        
        {/* Search Header Input Field */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center gap-3 bg-neutral-950">
          <Search className="w-6 h-6 text-amber-400 shrink-0" />
          
          <input
            ref={inputRef}
            id="global-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search door catalog, fire ratings, acoustic STC, FAQs, or case studies..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base font-sans focus:outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            <span>ESC</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="px-4 sm:px-5 py-2.5 bg-neutral-950/60 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                selectedFilter === 'all'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Results</span>
            </button>

            <button
              onClick={() => setSelectedFilter('doors')}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                selectedFilter === 'doors'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <DoorClosed className="w-3.5 h-3.5" />
              <span>Door Catalog ({matchedDoors.length})</span>
            </button>

            <button
              onClick={() => setSelectedFilter('faqs')}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                selectedFilter === 'faqs'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ Topics ({matchedFAQs.length})</span>
            </button>

            <button
              onClick={() => setSelectedFilter('projects')}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                selectedFilter === 'projects'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Case Studies ({matchedProjects.length})</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-neutral-500">
            {query.trim() ? (
              <span>{totalResultsCount} results for "{query}"</span>
            ) : (
              <span>Quick directory suggestions</span>
            )}
          </div>
        </div>

        {/* Results List Scroll Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {totalResultsCount === 0 && (
            <div className="py-12 text-center space-y-3">
              <Search className="w-10 h-10 text-neutral-600 mx-auto" />
              <div className="text-sm font-semibold text-white">No results found for "{query}"</div>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try searching for terms like <span className="text-amber-400">"20-Min"</span>, <span className="text-amber-400">"Hollow Metal"</span>, <span className="text-amber-400">"STC 56"</span>, <span className="text-amber-400">"Alberni"</span>, or <span className="text-amber-400">"Grade 1"</span>.
              </p>
            </div>
          )}

          {/* 1. DOOR CATALOG SECTION */}
          {(selectedFilter === 'all' || selectedFilter === 'doors') && matchedDoors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase font-bold px-1">
                <span className="flex items-center gap-1.5">
                  <DoorClosed className="w-4 h-4" />
                  <span>Door & Hardware Systems ({matchedDoors.length})</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-normal">CSI Division 08 10 00</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {matchedDoors.map((door) => (
                  <button
                    key={door.id}
                    onClick={() => handleSelectDoor(door)}
                    className="w-full text-left p-3 rounded-2xl bg-neutral-950/80 hover:bg-neutral-800/80 border border-neutral-800 hover:border-amber-500/50 transition-all flex items-start gap-3.5 group"
                  >
                    <img
                      src={door.image}
                      alt={door.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-neutral-800 group-hover:scale-105 transition-transform"
                    />

                    <div className="flex-grow min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {door.name}
                        </h4>
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-900 border border-neutral-800 text-amber-400">
                          {door.category.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-400 line-clamp-1">
                        {door.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[10px] font-mono">
                        <span className="text-amber-400/90 font-medium flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" />
                          {door.fireRating.split('/')[0]}
                        </span>
                        {door.acousticSTC && (
                          <span className="text-neutral-400 flex items-center gap-1">
                            <Volume2 className="w-3 h-3 text-neutral-500" />
                            {door.acousticSTC.split('(')[0]}
                          </span>
                        )}
                        <span className="text-neutral-500">• {door.finishes.length} Finishes</span>
                      </div>
                    </div>

                    <div className="self-center pl-1 text-neutral-500 group-hover:text-amber-400 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. FAQ & TECHNICAL CODES SECTION */}
          {(selectedFilter === 'all' || selectedFilter === 'faqs') && matchedFAQs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase font-bold px-1">
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Technical Code & FAQ Topics ({matchedFAQs.length})</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-normal">NFPA 80 / IBC Standards</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {matchedFAQs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleSelectFAQ(faq)}
                    className="w-full text-left p-3.5 rounded-2xl bg-neutral-950/80 hover:bg-neutral-800/80 border border-neutral-800 hover:border-amber-500/50 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-amber-400 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                      <HelpCircle className="w-4 h-4" />
                    </div>

                    <div className="flex-grow min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                          {faq.question}
                        </h4>
                        <span className="shrink-0 text-[10px] font-mono text-neutral-500">
                          {faq.categoryLabel}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                        {faq.shortAnswer}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {faq.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="self-center pl-1 text-neutral-500 group-hover:text-amber-400 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. CASE STUDIES & COMPLETIONS SECTION */}
          {(selectedFilter === 'all' || selectedFilter === 'projects') && matchedProjects.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase font-bold px-1">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>Case Studies & Projects ({matchedProjects.length})</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-normal">Documented Completions</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {matchedProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleSelectProject(project)}
                    className="w-full text-left p-3 rounded-2xl bg-neutral-950/80 hover:bg-neutral-800/80 border border-neutral-800 hover:border-amber-500/50 transition-all flex items-start gap-3.5 group"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-neutral-800 group-hover:scale-105 transition-transform"
                    />

                    <div className="flex-grow min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {project.title}
                        </h4>
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-900 border border-neutral-800 text-amber-400">
                          {project.municipalityName?.replace('City of ', '').replace('District of ', '') || project.sector}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-400 line-clamp-1">
                        {project.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[10px] font-mono">
                        <span className="text-neutral-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {project.location.split('—')[0]}
                        </span>
                        {project.steelFramingLF && (
                          <span className="text-amber-400 font-bold">
                            {project.steelFramingLF.toLocaleString()} LF Steel
                          </span>
                        )}
                        {project.soundRatingSTC && (
                          <span className="text-emerald-400">
                            {project.soundRatingSTC.split(' ')[0]} {project.soundRatingSTC.split(' ')[1]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="self-center pl-1 text-neutral-500 group-hover:text-amber-400 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Quick Shortcuts */}
        <div className="px-4 sm:px-6 py-3 bg-neutral-950 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white text-[10px]">↵</kbd>
              <span>to jump</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white text-[10px]">ESC</kbd>
              <span>to dismiss</span>
            </span>
          </div>

          <div className="text-neutral-500">
            Just Doors Universal Search Engine
          </div>
        </div>

      </div>
    </div>
  );
};
