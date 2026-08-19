import React, { useState } from 'react';
import { 
  Layers, 
  Flame, 
  Volume2, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Building2, 
  Home, 
  Briefcase, 
  Sliders, 
  X, 
  FileSpreadsheet, 
  Info, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Lock, 
  PackageCheck,
  ArrowLeftRight,
  Scale,
  CheckSquare,
  Square,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DOOR_PRODUCTS } from '../data/products';
import { HARDWARE_MANUFACTURERS } from '../data/manufacturersData';
import { DoorProduct, SectorType, ProductCategory } from '../types';
import { HardwareComparisonModal } from './HardwareComparisonModal';

interface DoorsAndHardwareCatalogProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
}

export const DoorsAndHardwareCatalog: React.FC<DoorsAndHardwareCatalogProps> = ({
  onOpenQuoteModal,
  onOpenScheduleModal,
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProductModal, setActiveProductModal] = useState<DoorProduct | null>(null);

  // Compare Hardware State
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareProductAId, setCompareProductAId] = useState<string>(DOOR_PRODUCTS[0]?.id || '');
  const [compareProductBId, setCompareProductBId] = useState<string>(DOOR_PRODUCTS[1]?.id || '');

  const handleToggleCompare = (productId: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 2) {
        // Fluidly swap second product so user always has 2
        return [prev[1], productId];
      }
      return [...prev, productId];
    });
  };

  const handleOpenCompareModal = (pAId?: string, pBId?: string) => {
    if (pAId && pBId) {
      setCompareProductAId(pAId);
      setCompareProductBId(pBId);
    } else if (selectedForCompare.length === 2) {
      setCompareProductAId(selectedForCompare[0]);
      setCompareProductBId(selectedForCompare[1]);
    } else if (selectedForCompare.length === 1) {
      setCompareProductAId(selectedForCompare[0]);
      const other = DOOR_PRODUCTS.find((p) => p.id !== selectedForCompare[0]);
      if (other) setCompareProductBId(other.id);
    } else {
      setCompareProductAId(DOOR_PRODUCTS[0]?.id || '');
      setCompareProductBId(DOOR_PRODUCTS[1]?.id || '');
    }
    setIsCompareModalOpen(true);
  };

  const filteredProducts = DOOR_PRODUCTS.filter((product) => {
    const matchSector = 
      selectedSector === 'all' || 
      (selectedSector === 'hardware' && product.category === 'hardware-access') ||
      product.sectors.includes(selectedSector as any);

    const matchCategory = 
      selectedCategory === 'all' || 
      product.category === selectedCategory;

    return matchSector && matchCategory;
  });

  return (
    <section 
      id="doors-and-hardware"
      className="py-24 bg-neutral-950 border-b border-neutral-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>Full Systems Directory</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Doors & Hardware
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-300">
              The engineered products and architectural components supporting High-Rise, Commercial, and Residential applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenCompareModal()}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-mono flex items-center gap-2 transition-all ${
                selectedForCompare.length > 0
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-900 hover:bg-neutral-850 border-amber-500/40 text-amber-300 hover:text-amber-200'
              }`}
              title="Compare Technical Specs & Fire Ratings"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Compare Hardware</span>
              {selectedForCompare.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-neutral-950 text-amber-400 text-[10px] font-black flex items-center justify-center">
                  {selectedForCompare.length}
                </span>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-neutral-200 hover:text-white font-bold text-xs flex items-center gap-2 transition-all no-print"
              title="Print Clean Catalog & Product Specs for Submittal Binder"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Catalog Specs</span>
            </button>

            <button
              onClick={onOpenScheduleModal}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-neutral-200 hover:text-white font-bold text-xs flex items-center gap-2 transition-all no-print"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Schedule Takeoff</span>
            </button>
          </div>
        </div>

        {/* Field Contractor Submittal Catalog Header - Visible exclusively when printing */}
        <div className="hidden print:block print-header-banner text-black mb-6 pb-3 border-b-2 border-black">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold uppercase tracking-tight text-black">
                JUST DOORS — ARCHITECTURAL PRODUCT & HARDWARE SPECIFICATIONS
              </h1>
              <p className="text-xs text-neutral-700 font-medium">
                Engineered High-Rise, Commercial, Fire-Rated & Acoustical Assemblies for Metro Vancouver
              </p>
            </div>
            <div className="text-right text-xs font-mono text-neutral-800">
              <div><strong>Print Date:</strong> {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              <div><strong>Compliance:</strong> NBC / BCBC / NFPA 80 / ULC-S104</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-neutral-800/80 mb-10">
          <span className="text-xs font-mono uppercase text-neutral-500 mr-2 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> Filter Sector:
          </span>

          {[
            { id: 'all', label: 'All Products (6)' },
            { id: 'high-rise', label: 'Multi-Family & High-Rise', icon: Building2 },
            { id: 'commercial', label: 'Commercial & Institutional', icon: Briefcase },
            { id: 'residential', label: 'Residential & Condo', icon: Home },
            { id: 'hardware', label: 'Hardware & Access Control', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedSector === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedSector(tab.id as SectorType)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isSelectedForCompare = selectedForCompare.includes(product.id);
            return (
              <div
                key={product.id}
                className={`group rounded-3xl bg-neutral-900 border transition-all hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between ${
                  isSelectedForCompare 
                    ? 'border-amber-500 shadow-lg shadow-amber-500/10' 
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Product Image & Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-neutral-950">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                  {/* Top Left: Fire Rating & STC Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-neutral-950/90 border border-neutral-700 backdrop-blur-md text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1.5 shadow-md">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>{product.fireRating.split('(')[0]}</span>
                    </span>
                    
                    {product.acousticSTC && (
                      <span className="px-3 py-1 rounded-full bg-neutral-950/90 border border-neutral-700 backdrop-blur-md text-[10px] font-mono font-medium text-neutral-300 flex items-center gap-1 shadow-md">
                        <Volume2 className="w-3 h-3 text-neutral-400" />
                        <span>{product.acousticSTC.split('(')[0]}</span>
                      </span>
                    )}
                  </div>

                  {/* Top Right: Compare Checkbox Button & High-Rise Tag */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCompare(product.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg backdrop-blur-md cursor-pointer ${
                        isSelectedForCompare
                          ? 'bg-amber-500 text-neutral-950 border border-amber-400 font-black scale-105'
                          : 'bg-neutral-950/90 hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700'
                      }`}
                      title={isSelectedForCompare ? 'Selected for Comparison' : 'Click to select for Side-by-Side Comparison'}
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>{isSelectedForCompare ? 'In Compare (Selected)' : 'Compare'}</span>
                    </button>

                    {product.isFeaturedHighRise && (
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/90 text-neutral-950 font-black text-[10px] uppercase tracking-tight shadow-md">
                        High-Rise Standard
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      {product.subtitle}
                    </div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Spec Grid */}
                  <div className="pt-3 border-t border-neutral-800 space-y-1.5 font-mono text-[11px] text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Core Material:</span>
                      <span className="text-neutral-200 font-medium truncate max-w-[60%]">{product.coreType.split(' or ')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Standard Sizes:</span>
                      <span className="text-neutral-200 font-medium">{product.standardSizes[0]} + Custom</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-neutral-800 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveProductModal(product)}
                        className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Info className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Specs</span>
                      </button>

                      <button
                        onClick={() => onOpenQuoteModal(product.sectors[0])}
                        className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-md shadow-amber-500/10"
                      >
                        <span>Quote Spec</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleToggleCompare(product.id);
                        if (selectedForCompare.length === 1 && !selectedForCompare.includes(product.id)) {
                          handleOpenCompareModal(selectedForCompare[0], product.id);
                        } else if (selectedForCompare.length === 0) {
                          const other = DOOR_PRODUCTS.find(p => p.id !== product.id);
                          if (other) {
                            handleOpenCompareModal(product.id, other.id);
                          }
                        }
                      }}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isSelectedForCompare
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-neutral-950 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800'
                      }`}
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isSelectedForCompare ? 'Compare with another (Selected)' : 'Compare Hardware Specs'}</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Floating / Docked Compare Action Bar */}
        <AnimatePresence>
          {selectedForCompare.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl bg-neutral-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Hardware Comparison Active</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-mono text-[10px] font-black">
                      {selectedForCompare.length} / 2 Selected
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {selectedForCompare.length === 1 
                      ? 'Pick 1 more product from the catalog to compare side-by-side' 
                      : '2 products ready for complete architectural matrix analysis'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedForCompare([])}
                  className="px-3 py-2 rounded-xl text-neutral-400 hover:text-white text-xs font-mono transition-colors"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenCompareModal()}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
                >
                  <span>Compare Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOP DOOR & HARDWARE MANUFACTURERS SPECIFICATION DIRECTORY */}
        <div id="architectural-hardware-manufacturers" className="mt-20 space-y-12 pt-12 border-t border-neutral-800">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliant & Architectural-Grade Specifiers Guide</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
              Top Door & Hardware <span className="text-amber-400">Manufacturers</span>
            </h3>
            
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              In commercial tenant improvements, multi-family construction, and custom residential builds across the Lower Mainland, specifiers and inspectors look for compliant, ULC-rated, and architectural-grade hardware. We supply, prep, and install verified hardware sets from industry benchmark manufacturers.
            </p>
          </div>

          {/* Group 1: Commercial & ULC Fire-Rated Hardware (Heavy Duty & Panic Hardware) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-display text-white">
                  1. Commercial & ULC Fire-Rated Hardware <span className="text-neutral-400 font-normal text-sm">(Heavy Duty & Panic Hardware)</span>
                </h4>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/90 text-xs font-mono text-neutral-300">
                    <th className="p-4 sm:p-5 w-[28%] font-bold text-white uppercase tracking-wider">
                      Manufacturer
                    </th>
                    <th className="p-4 sm:p-5 w-[52%] font-bold text-white uppercase tracking-wider">
                      Specialty / Best Known For
                    </th>
                    <th className="p-4 sm:p-5 w-[20%] font-bold text-amber-400 uppercase tracking-wider">
                      ULC & Code Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850 text-xs">
                  {HARDWARE_MANUFACTURERS.filter(m => m.category === 'commercial-ulc').map((mfg) => (
                    <tr key={mfg.id} className="hover:bg-neutral-900/80 transition-colors">
                      <td className="p-4 sm:p-5 align-top">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-24 bg-neutral-950 rounded-lg p-1.5 border border-neutral-800 flex items-center justify-center shrink-0">
                            <img 
                              src={mfg.logoUrl} 
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                              alt={mfg.altText} 
                              className="max-h-6 max-w-[80px] object-contain filter brightness-125"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white font-display">{mfg.name}</div>
                            <div className="text-[10px] font-mono text-neutral-400 uppercase">Commercial Grade</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 align-top text-neutral-300 leading-relaxed">
                        <p className="text-xs">{mfg.specialty}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {mfg.keyProducts.map((prod, i) => (
                            <span key={i} className="text-[10px] font-mono bg-neutral-950 text-neutral-400 px-2 py-0.5 rounded border border-neutral-850">
                              {prod}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 align-top">
                        <span className="inline-block font-mono text-[11px] font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-2 py-1 rounded">
                          {mfg.ulcRatings || 'ULC Fire Rated'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Group 2: Residential & Designer Architectural Hardware */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-display text-white">
                  2. Residential & Designer Architectural Hardware <span className="text-neutral-400 font-normal text-sm">(Custom Residential & Multi-Family Suites)</span>
                </h4>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/90 text-xs font-mono text-neutral-300">
                    <th className="p-4 sm:p-5 w-[28%] font-bold text-white uppercase tracking-wider">
                      Manufacturer
                    </th>
                    <th className="p-4 sm:p-5 w-[52%] font-bold text-white uppercase tracking-wider">
                      Specialty / Best Known For
                    </th>
                    <th className="p-4 sm:p-5 w-[20%] font-bold text-amber-400 uppercase tracking-wider">
                      Specification Level
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850 text-xs">
                  {HARDWARE_MANUFACTURERS.filter(m => m.category === 'residential-designer').map((mfg) => (
                    <tr key={mfg.id} className="hover:bg-neutral-900/80 transition-colors">
                      <td className="p-4 sm:p-5 align-top">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-24 bg-neutral-950 rounded-lg p-1.5 border border-neutral-800 flex items-center justify-center shrink-0">
                            <img 
                              src={mfg.logoUrl} 
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                              alt={mfg.altText} 
                              className="max-h-6 max-w-[80px] object-contain filter brightness-125"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white font-display">{mfg.name}</div>
                            <div className="text-[10px] font-mono text-amber-400/90 uppercase">Architectural Grade</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 align-top text-neutral-300 leading-relaxed">
                        <p className="text-xs">{mfg.specialty}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {mfg.keyProducts.map((prod, i) => (
                            <span key={i} className="text-[10px] font-mono bg-neutral-950 text-neutral-400 px-2 py-0.5 rounded border border-neutral-850">
                              {prod}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 align-top">
                        <span className="inline-block font-mono text-[11px] font-bold text-amber-300 bg-amber-950/30 border border-amber-500/30 px-2 py-1 rounded">
                          {mfg.ulcRatings || 'Architectural Grade'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Takeoff & Master Keying CTA */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h4 className="text-base sm:text-lg font-bold font-display text-white flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-amber-400" />
                <span>Single-Source Complete Door + Lockset + Closer Packages</span>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl">
                Avoid coordination headaches between framers, hollow metal suppliers, and hardware vendors. We factory-prep hinges, mortise pockets, and electric strikes for zero site rework.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenScheduleModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs transition-all shadow-lg shadow-amber-500/20"
              >
                Submit Hardware Schedule
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Product Spec Sheet Detail Modal */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative">
            
            <button
              onClick={() => setActiveProductModal(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>{activeProductModal.fireRating}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {activeProductModal.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-mono">
                {activeProductModal.subtitle}
              </p>
            </div>

            <div className="h-64 w-full rounded-2xl overflow-hidden bg-neutral-950 relative">
              <img 
                src={activeProductModal.image} 
                alt={activeProductModal.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-bold">
                Architectural Engineering Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {activeProductModal.specs.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="text-neutral-500 text-[10px] uppercase">{s.label}</div>
                    <div className="text-white font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-bold">
                Hardware & Lockset Compatibility
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProductModal.hardwareCompatibility.map((hw, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>{hw}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                Certifications: {activeProductModal.certifications.join(' • ')}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const sector = activeProductModal.sectors[0];
                    setActiveProductModal(null);
                    onOpenQuoteModal(sector);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <span>Request Takeoff on this Model</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Side-by-Side Hardware & Product Comparison Modal */}
      <HardwareComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        productAId={compareProductAId}
        productBId={compareProductBId}
        allProducts={DOOR_PRODUCTS}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenScheduleModal={onOpenScheduleModal}
      />

    </section>
  );
};
