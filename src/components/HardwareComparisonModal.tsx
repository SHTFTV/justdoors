import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeftRight, 
  Flame, 
  Volume2, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Building2, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet,
  Lock,
  Boxes,
  DoorClosed,
  ChevronDown,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DoorProduct } from '../types';

interface HardwareComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  productAId?: string;
  productBId?: string;
  allProducts: DoorProduct[];
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
  onSelectProductA?: (id: string) => void;
  onSelectProductB?: (id: string) => void;
}

export const HardwareComparisonModal: React.FC<HardwareComparisonModalProps> = ({
  isOpen,
  onClose,
  productAId,
  productBId,
  allProducts,
  onOpenQuoteModal,
  onOpenScheduleModal,
}) => {
  const [selectedAId, setSelectedAId] = useState<string>(
    productAId || allProducts[0]?.id || ''
  );
  const [selectedBId, setSelectedBId] = useState<string>(
    productBId || allProducts[1]?.id || allProducts[0]?.id || ''
  );

  useEffect(() => {
    if (productAId) setSelectedAId(productAId);
    if (productBId) setSelectedBId(productBId);
  }, [productAId, productBId]);

  if (!isOpen) return null;

  const productA = allProducts.find((p) => p.id === selectedAId) || allProducts[0];
  const productB = allProducts.find((p) => p.id === selectedBId) || allProducts[1] || allProducts[0];

  const handleSwapProducts = () => {
    const temp = selectedAId;
    setSelectedAId(selectedBId);
    setSelectedBId(temp);
  };

  // Helper to extract numeric fire rating if applicable
  const getFireRatingBadge = (rating: string) => {
    if (rating.toLowerCase().includes('3-hour') || rating.toLowerCase().includes('90-min')) {
      return { text: rating.split('(')[0], color: 'bg-red-500/20 text-red-400 border-red-500/40' };
    }
    if (rating.toLowerCase().includes('20-min') || rating.toLowerCase().includes('45-min')) {
      return { text: rating.split('(')[0], color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
    }
    return { text: 'Non-Rated Architectural', color: 'bg-neutral-800 text-neutral-300 border-neutral-700' };
  };

  const badgeA = getFireRatingBadge(productA.fireRating);
  const badgeB = getFireRatingBadge(productB.fireRating);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-neutral-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl my-auto text-left"
      >
        {/* Modal Sticky Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Architectural Spec Comparison Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
              Compare <span className="text-amber-400">Doors & Hardware Specs</span> Side-by-Side
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwapProducts}
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Swap Column Positions"
            >
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Swap</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 flex-1">

          {/* Product Selectors & Visual Header Cards (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Column A Card */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                    Product Option A
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {productA.category.toUpperCase()}
                  </span>
                </div>

                {/* Dropdown Selector for Product A */}
                <div className="relative">
                  <select
                    value={selectedAId}
                    onChange={(e) => setSelectedAId(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs font-bold font-mono focus:outline-none focus:border-amber-400 pr-9 cursor-pointer"
                  >
                    {allProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Thumbnail & Title */}
                <div className="flex gap-3 items-center pt-2">
                  <img
                    src={productA.image}
                    alt={productA.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover border border-neutral-800 shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-sm font-bold text-white font-display leading-tight line-clamp-2">
                      {productA.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-2">
                      {productA.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Fire & STC Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-900">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${badgeA.color} flex items-center gap-1`}>
                  <Flame className="w-3 h-3" />
                  <span>{badgeA.text}</span>
                </span>
                {productA.acousticSTC && (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-neutral-400" />
                    <span>{productA.acousticSTC.split('(')[0]}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Column B Card */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30">
                    Product Option B
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {productB.category.toUpperCase()}
                  </span>
                </div>

                {/* Dropdown Selector for Product B */}
                <div className="relative">
                  <select
                    value={selectedBId}
                    onChange={(e) => setSelectedBId(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs font-bold font-mono focus:outline-none focus:border-sky-400 pr-9 cursor-pointer"
                  >
                    {allProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Thumbnail & Title */}
                <div className="flex gap-3 items-center pt-2">
                  <img
                    src={productB.image}
                    alt={productB.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover border border-neutral-800 shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-sm font-bold text-white font-display leading-tight line-clamp-2">
                      {productB.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-2">
                      {productB.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Fire & STC Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-900">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${badgeB.color} flex items-center gap-1`}>
                  <Flame className="w-3 h-3" />
                  <span>{badgeB.text}</span>
                </span>
                {productB.acousticSTC && (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-neutral-400" />
                    <span>{productB.acousticSTC.split('(')[0]}</span>
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* SECTION 1: FIRE RATINGS & LIFE SAFETY CODE COMPLIANCE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-400">
              <Flame className="w-4 h-4" />
              <span>1. Fire Ratings & Life Safety Compliance</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2">
                <div className="text-[10px] font-mono text-neutral-400">Option A Fire Rating:</div>
                <div className="text-xs font-mono font-bold text-amber-300">{productA.fireRating}</div>
                <div className="text-[11px] text-neutral-300 leading-snug">
                  {productA.fireRating.includes('20-Min') 
                    ? 'Mandatory 20-min fire barrier compliance for residential corridor unit entry per BCBC / VBBL.'
                    : productA.fireRating.includes('90-Min') || productA.fireRating.includes('3-Hour')
                    ? 'Heavy-duty 90-min to 3-hour fire partition rating for emergency stairwells, shafts, and elevator lobbies.'
                    : 'Non-fire rated architectural partition assembly with high acoustic damping.'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2">
                <div className="text-[10px] font-mono text-neutral-400">Option B Fire Rating:</div>
                <div className="text-xs font-mono font-bold text-sky-300">{productB.fireRating}</div>
                <div className="text-[11px] text-neutral-300 leading-snug">
                  {productB.fireRating.includes('20-Min') 
                    ? 'Mandatory 20-min fire barrier compliance for residential corridor unit entry per BCBC / VBBL.'
                    : productB.fireRating.includes('90-Min') || productB.fireRating.includes('3-Hour')
                    ? 'Heavy-duty 90-min to 3-hour fire partition rating for emergency stairwells, shafts, and elevator lobbies.'
                    : 'Non-fire rated architectural partition assembly with high acoustic damping.'}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: CORE CONSTRUCTION & MATERIAL PROFILE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-400">
              <Layers className="w-4 h-4" />
              <span>2. Core Materials, Thickness & Available Finishes</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A Core & Specs */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-3">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500">Core Material:</div>
                  <div className="text-xs font-mono font-bold text-white">{productA.coreType}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500">Standard Sizes:</div>
                  <div className="text-xs font-mono text-neutral-200">{productA.standardSizes.join(' • ')}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500">Available Finishes:</div>
                  <div className="flex flex-wrap gap-1">
                    {productA.finishes.map((f, i) => (
                      <span key={i} className="text-[10px] font-mono bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded border border-neutral-800">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Option B Core & Specs */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-3">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500">Core Material:</div>
                  <div className="text-xs font-mono font-bold text-white">{productB.coreType}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500">Standard Sizes:</div>
                  <div className="text-xs font-mono text-neutral-200">{productB.standardSizes.join(' • ')}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500">Available Finishes:</div>
                  <div className="flex flex-wrap gap-1">
                    {productB.finishes.map((f, i) => (
                      <span key={i} className="text-[10px] font-mono bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded border border-neutral-800">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: HARDWARE & LOCKSET COMPATIBILITY MATRIX */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-400">
              <Lock className="w-4 h-4" />
              <span>3. Hardware, Lockset & Closer Compatibility</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hardware List A */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2">
                <div className="text-[10px] font-mono text-neutral-400 font-bold">Compatible Hardware for {productA.name}:</div>
                <div className="space-y-1.5">
                  {productA.hardwareCompatibility.map((hw, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="font-mono text-[11px] leading-tight">{hw}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware List B */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2">
                <div className="text-[10px] font-mono text-neutral-400 font-bold">Compatible Hardware for {productB.name}:</div>
                <div className="space-y-1.5">
                  {productB.hardwareCompatibility.map((hw, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span className="font-mono text-[11px] leading-tight">{hw}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: ARCHITECTURAL APPLICATIONS & BEST FIT */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-400">
              <Building2 className="w-4 h-4" />
              <span>4. Target Applications & Typical Building Openings</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2">
                <div className="text-[10px] font-mono text-neutral-400 font-bold">Recommended Uses for Option A:</div>
                <div className="flex flex-wrap gap-1.5">
                  {productA.applications.map((app, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-200">
                      {app}
                    </span>
                  ))}
                </div>
                <div className="pt-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-400">
                  Certifications: {productA.certifications.join(' • ')}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 space-y-2">
                <div className="text-[10px] font-mono text-neutral-400 font-bold">Recommended Uses for Option B:</div>
                <div className="flex flex-wrap gap-1.5">
                  {productB.applications.map((app, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-200">
                      {app}
                    </span>
                  ))}
                </div>
                <div className="pt-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-400">
                  Certifications: {productB.certifications.join(' • ')}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: DETAILED TECHNICAL SPECIFICATIONS MATRIX */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-400">
              <Boxes className="w-4 h-4" />
              <span>5. Detailed Technical Specifications Matrix</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/90 text-neutral-300 font-mono">
                    <th className="p-3.5 w-[30%] font-bold text-white">Specification Dimension</th>
                    <th className="p-3.5 w-[35%] font-bold text-amber-400">{productA.name}</th>
                    <th className="p-3.5 w-[35%] font-bold text-sky-400">{productB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850 font-mono text-[11px]">
                  <tr>
                    <td className="p-3 text-neutral-400 font-bold">Category</td>
                    <td className="p-3 text-white">{productA.category}</td>
                    <td className="p-3 text-white">{productB.category}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-neutral-400 font-bold">Fire Rating</td>
                    <td className="p-3 text-amber-300 font-bold">{productA.fireRating}</td>
                    <td className="p-3 text-sky-300 font-bold">{productB.fireRating}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-neutral-400 font-bold">Acoustic STC</td>
                    <td className="p-3 text-neutral-200">{productA.acousticSTC || 'Standard'}</td>
                    <td className="p-3 text-neutral-200">{productB.acousticSTC || 'Standard'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-neutral-400 font-bold">High-Rise Standard</td>
                    <td className="p-3 text-neutral-200">
                      {productA.isFeaturedHighRise ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Yes (Spec Standard)
                        </span>
                      ) : 'Optional / Application Specific'}
                    </td>
                    <td className="p-3 text-neutral-200">
                      {productB.isFeaturedHighRise ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Yes (Spec Standard)
                        </span>
                      ) : 'Optional / Application Specific'}
                    </td>
                  </tr>
                  {/* Detailed specs matching */}
                  {productA.specs.slice(0, 4).map((specA, idx) => {
                    const specB = productB.specs[idx];
                    return (
                      <tr key={idx}>
                        <td className="p-3 text-neutral-400 font-bold">{specA.label}</td>
                        <td className="p-3 text-neutral-200">{specA.value}</td>
                        <td className="p-3 text-neutral-200">{specB ? specB.value : 'N/A'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-neutral-800 bg-neutral-950/95 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
          <div className="text-xs font-mono text-neutral-400">
            Comparing <strong className="text-amber-400">{productA.name}</strong> vs <strong className="text-sky-400">{productB.name}</strong>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onOpenScheduleModal();
              }}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 text-xs font-bold font-mono flex items-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Door Schedule Takeoff</span>
            </button>

            <button
              onClick={() => {
                const sector = productA.sectors[0] || 'high-rise';
                onClose();
                onOpenQuoteModal(sector);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>Quote Spec A</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                const sector = productB.sectors[0] || 'high-rise';
                onClose();
                onOpenQuoteModal(sector);
              }}
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>Quote Spec B</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
