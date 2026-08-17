import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  Flame,
  ShieldCheck,
  Wrench,
  Layers,
  FileSpreadsheet,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Cpu,
  Clock,
  ExternalLink
} from 'lucide-react';
import { FAQ_DATA, FAQItem } from '../data/faqData';

interface FAQSectionProps {
  onOpenScheduleModal: () => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenAIAssistant?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenScheduleModal,
  onOpenQuoteModal,
  onOpenAIAssistant,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItemIds, setOpenItemIds] = useState<string[]>(['faq-fire-ratings-levels']);

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length },
    { id: 'fire-ratings', label: 'Fire Ratings & Codes', count: FAQ_DATA.filter((i) => i.category === 'fire-ratings').length },
    { id: 'specifications', label: 'Door Specifications', count: FAQ_DATA.filter((i) => i.category === 'specifications').length },
    { id: 'hardware', label: 'Hardware & Access Control', count: FAQ_DATA.filter((i) => i.category === 'hardware').length },
    { id: 'logistics', label: 'Lead Times & Submittals', count: FAQ_DATA.filter((i) => i.category === 'logistics').length },
  ];

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.shortAnswer.toLowerCase().includes(q) ||
        item.detailedAnswer.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.codeReferences?.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenItemIds(filteredFAQs.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenItemIds([]);
  };

  return (
    <section id="faq-section" className="py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-800/80 relative overflow-hidden">
      
      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-mono font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TECHNICAL SPECIFICATIONS & CODE AUTHORITY</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Frequently Asked <span className="text-amber-400">Questions</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Direct, code-compliant answers on fire ratings, structural cores, electrified hardware coordination, and commercial project scheduling. No fluff—strictly architectural standards.
          </p>
        </div>

        {/* Search & Quick Filter Controls */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Search Input Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications, e.g., 'UL 10C', 'Temperature Rise', 'Grade 1', 'NFPA 80', 'stairwells'..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm text-neutral-100 placeholder:text-neutral-500 shadow-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`faq-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 font-bold'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      selectedCategory === cat.id
                        ? 'bg-neutral-950/20 text-neutral-950 font-black'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Expand / Collapse Buttons */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <button
                id="faq-expand-all-btn"
                onClick={expandAll}
                className="hover:text-amber-400 transition-colors px-2 py-1"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                id="faq-collapse-all-btn"
                onClick={collapseAll}
                className="hover:text-amber-400 transition-colors px-2 py-1"
              >
                Collapse All
              </button>
            </div>
          </div>

        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-neutral-900/60 border border-neutral-800 text-neutral-400 space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto opacity-70" />
              <div className="font-semibold text-neutral-200">No matching technical questions found</div>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Can't find what you're looking for? Ask our AI Door Specification Assistant or send us your door schedule for direct review.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs text-neutral-200 hover:text-white"
                >
                  Reset Search
                </button>
                {onOpenAIAssistant && (
                  <button
                    onClick={onOpenAIAssistant}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Assistant</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredFAQs.map((item, index) => {
              const isOpen = openItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-neutral-900/90 border-amber-500/40 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/20'
                      : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  {/* Header / Trigger */}
                  <button
                    id={`faq-trigger-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 group"
                  >
                    <div className="space-y-2 flex-1">
                      {/* Badges strip */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-neutral-800 border border-neutral-700/80 text-[11px] font-mono font-medium text-amber-400">
                          {item.categoryLabel}
                        </span>
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-neutral-400 bg-neutral-950/60 px-2 py-0.5 rounded border border-neutral-800">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Question Text */}
                      <h3 className={`font-display font-bold text-base sm:text-lg leading-snug transition-colors ${
                        isOpen ? 'text-amber-400' : 'text-neutral-100 group-hover:text-amber-300'
                      }`}>
                        {item.question}
                      </h3>

                      {!isOpen && (
                        <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                          {item.shortAnswer}
                        </p>
                      )}
                    </div>

                    <div className={`p-2 rounded-xl border shrink-0 transition-all ${
                      isOpen
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-neutral-800/50 border-neutral-700/50 text-neutral-400 group-hover:text-white'
                    }`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Expanded Body Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 space-y-5 border-t border-neutral-800/70 pt-5">
                          
                          {/* Quick Summary Pill */}
                          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-neutral-200 leading-relaxed">
                            <span className="font-bold text-amber-400 font-mono uppercase tracking-wider block mb-1">
                              Key Takeaway:
                            </span>
                            {item.shortAnswer}
                          </div>

                          {/* Technical Breakdown */}
                          <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line font-sans space-y-2">
                            {item.detailedAnswer}
                          </div>

                          {/* Specification Highlights Grid */}
                          {item.specs && item.specs.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                                Technical Parameters & Limits:
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.specs.map((spec, i) => (
                                  <div key={i} className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs flex flex-col justify-between">
                                    <span className="text-[11px] text-neutral-400 font-mono">{spec.label}</span>
                                    <span className="text-xs font-bold text-neutral-100 mt-0.5">{spec.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Code References & Compliance Badges */}
                          {item.codeReferences && (
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/50">
                              <span className="text-[11px] font-mono text-neutral-400">Relevant Building Standards:</span>
                              {item.codeReferences.map((code, i) => (
                                <span key={i} className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-800/80 border border-neutral-700 text-neutral-300">
                                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                                  <span>{code}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Contextual Action Link */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800/50 text-xs">
                            <span className="text-neutral-400 text-[11px]">
                              Need this certified specification included in your proposal?
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onOpenQuoteModal()}
                                className="text-amber-400 hover:text-amber-300 font-semibold font-mono flex items-center gap-1"
                              >
                                <span>Request Quote for this Spec</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Technical Standards Cheat Sheet Grid */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-neutral-900/70 border border-neutral-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                <BookOpen className="w-4 h-4" />
                <span>ARCHITECTURAL REFERENCE CHEAT SHEET</span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                Quick Code Compliance & Rating Matrix
              </h3>
            </div>
            <button
              onClick={onOpenScheduleModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-md"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Send Schedule for Takeoff</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box 1: Fire Assemblies */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                <Flame className="w-4 h-4" />
                <span>FIRE DOOR ASSEMBLIES</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>20-Min:</strong> Suite entries & corridor egress (NFPA 105 smoke seal).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>90-Min:</strong> 2-hour stairwells, shafts, & vertical exit enclosures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>3-Hour:</strong> 4-hour firewall divisions & boiler rooms.</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Hardware Durability */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                <Wrench className="w-4 h-4" />
                <span>ANSI/BHMA HARDWARE TIERS</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Grade 1:</strong> 1,000,000 cycles for heavy traffic & lobbies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Mortise #86:</strong> Maximum security & cycle life (3M+ cycles).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>ADA Max Force:</strong> 5 lbs non-rated, spring latch on fire rated.</span>
                </li>
              </ul>
            </div>

            {/* Box 3: Estimating & Takeoffs */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>SUPPLY & LOGISTICS</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>24–48 Hr:</strong> Schedule review & itemized pricing packages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Floor Packaging:</strong> Doors crated by opening mark number.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>No Windows:</strong> 100% focused on architectural doors.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-display font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Have a Complex Architectural Specification?</span>
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg">
              Our in-house Architectural Hardware Consultants (AHC) review full project schedules, frame throat depths, electrified raceways, and fire certifications at no charge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              id="faq-bottom-schedule-btn"
              onClick={onOpenScheduleModal}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20"
            >
              Upload Door Schedule
            </button>
            <button
              id="faq-bottom-quote-btn"
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs transition-all"
            >
              Request a Bid
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
