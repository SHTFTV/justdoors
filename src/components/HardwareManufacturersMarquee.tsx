import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Info, 
  X, 
  Building2, 
  Home, 
  Briefcase, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  PackageCheck
} from 'lucide-react';
import { HARDWARE_MANUFACTURERS, HardwareManufacturer } from '../data/manufacturersData';

interface HardwareManufacturersMarqueeProps {
  onOpenQuoteModal?: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal?: () => void;
}

export const HardwareManufacturersMarquee: React.FC<HardwareManufacturersMarqueeProps> = ({
  onOpenQuoteModal,
  onOpenScheduleModal,
}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState<HardwareManufacturer | null>(null);
  const [showSpecsModal, setShowSpecsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'commercial-ulc' | 'residential-designer'>('all');

  const filteredList = HARDWARE_MANUFACTURERS.filter(m => {
    if (activeTab === 'all') return true;
    return m.category === activeTab;
  });

  const marqueeLogos = [
    {
      name: 'ASSA ABLOY',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Assa_Abloy.svg/320px-Assa_Abloy.svg.png',
      alt: 'Assa Abloy Fire Door Hardware',
      id: 'assa-abloy'
    },
    {
      name: 'Schlage',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Schlage-logo-noTag.svg/320px-Schlage-logo-noTag.svg.png',
      alt: 'Schlage Commercial Locks',
      id: 'schlage'
    },
    {
      name: 'dormakaba',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Dormakaba_logo.svg/320px-Dormakaba_logo.svg.png',
      alt: 'dormakaba Access Solutions',
      id: 'dormakaba'
    },
    {
      name: 'Allegion',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Allegion_logo.svg/320px-Allegion_logo.svg.png',
      alt: 'Allegion Door Security',
      id: 'von-duprin'
    },
    {
      name: 'Taymor',
      url: 'https://logo.clearbit.com/taymor.ca',
      alt: 'Taymor Architectural Hardware',
      id: 'taymor'
    },
    {
      name: 'Emtek',
      url: 'https://logo.clearbit.com/emtek.com',
      alt: 'Emtek Door Hardware',
      id: 'emtek'
    },
    {
      name: 'Hager',
      url: 'https://logo.clearbit.com/hagerco.com',
      alt: 'Hager Hinge Hardware',
      id: 'hager'
    },
    {
      name: 'Baldwin',
      url: 'https://logo.clearbit.com/baldwinhardware.com',
      alt: 'Baldwin Hardware',
      id: 'baldwin'
    },
  ];

  const handleLogoClick = (id: string) => {
    const found = HARDWARE_MANUFACTURERS.find(m => m.id === id);
    if (found) {
      setSelectedManufacturer(found);
    }
  };

  return (
    <>
      {/* Floating Logo Marquee Section (Under-Hero Banner) */}
      <section 
        id="hardware-manufacturers-marquee" 
        className="trust-marquee-section"
        aria-label="Door & Architectural Hardware Manufacturers"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
          <div className="marquee-title mb-0">
            <p className="mb-0 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
              COMPLIANT WITH & SPECIFYING ARCHITECTURAL HARDWARE FROM INDUSTRY LEADERS
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => setShowSpecsModal(true)}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300 hover:underline transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>View Hardware Manufacturer Specs</span>
          </button>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Set 1 */}
            {marqueeLogos.map((logo, idx) => (
              <div 
                key={`set1-${logo.name}-${idx}`} 
                className="logo-item cursor-pointer"
                title={`${logo.name} - Click for hardware specifications`}
                onClick={() => handleLogoClick(logo.id)}
              >
                <img 
                  src={logo.url} 
                  alt={logo.alt} 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}

            {/* Set 2 (Duplicate for seamless infinite loop) */}
            {marqueeLogos.map((logo, idx) => (
              <div 
                key={`set2-${logo.name}-${idx}`} 
                className="logo-item cursor-pointer"
                title={`${logo.name} - Click for hardware specifications`}
                onClick={() => handleLogoClick(logo.id)}
              >
                <img 
                  src={logo.url} 
                  alt={logo.alt} 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Manufacturer Specs Directory Modal */}
      {showSpecsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-4xl rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8 text-neutral-100 max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mfg-specs-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowSpecsModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ULC Compliant & Architectural Grade</span>
              </div>
              <h3 id="mfg-specs-title" className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Top Door & Hardware <span className="text-amber-400">Manufacturers Directory</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                In commercial tenant improvements, multi-family construction, and custom residential builds across the Lower Mainland, specifiers and inspectors look for compliant, ULC-rated, and architectural-grade hardware.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === 'all'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                All Manufacturers ({HARDWARE_MANUFACTURERS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('commercial-ulc')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeTab === 'commercial-ulc'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <Flame className="w-3 h-3 text-red-400" />
                <span>1. Commercial & ULC Fire-Rated (7)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('residential-designer')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeTab === 'residential-designer'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>2. Residential & Designer (4)</span>
              </button>
            </div>

            {/* Scrollable Manufacturer Grid */}
            <div className="overflow-y-auto space-y-4 pr-1 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredList.map((mfg) => (
                  <div
                    key={mfg.id}
                    className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                            mfg.category === 'commercial-ulc'
                              ? 'bg-red-950/40 border-red-500/30 text-red-300'
                              : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                          }`}>
                            {mfg.categoryLabel}
                          </span>
                          <h4 className="text-base font-bold text-white font-display mt-1">
                            {mfg.name}
                          </h4>
                        </div>
                        <div className="h-9 w-24 bg-neutral-900 rounded-lg p-1 border border-neutral-800 flex items-center justify-center shrink-0">
                          <img 
                            src={mfg.logoUrl} 
                            alt={mfg.altText} 
                            className="max-h-6 max-w-[80px] object-contain filter brightness-125"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed mb-2">
                        <strong className="text-amber-400">Specialty / Best Known For:</strong> {mfg.specialty}
                      </p>

                      {mfg.ulcRatings && (
                        <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mb-2 bg-emerald-950/20 px-2 py-1 rounded border border-emerald-500/20">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{mfg.ulcRatings}</span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Key Assemblies:</div>
                        <div className="flex flex-wrap gap-1">
                          {mfg.keyProducts.map((p, i) => (
                            <span key={i} className="text-[10px] font-mono bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded border border-neutral-800">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>Suitable for: {mfg.recommendedSectors.join(', ')}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedManufacturer(mfg);
                        }}
                        className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-0.5"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-neutral-400 font-mono text-center sm:text-left">
                Need architectural hardware schedule takeoffs or ULC fire certificates?
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onOpenScheduleModal && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowSpecsModal(false);
                      onOpenScheduleModal();
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs transition-colors"
                  >
                    Submit Hardware Schedule
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowSpecsModal(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Manufacturer Deep Detail Drawer/Modal */}
      {selectedManufacturer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div 
            className="relative w-full max-w-lg rounded-3xl bg-neutral-900 border border-amber-500/30 shadow-2xl p-6 sm:p-7 space-y-5 text-neutral-100"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setSelectedManufacturer(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-12 w-28 bg-neutral-950 rounded-xl p-2 border border-neutral-800 flex items-center justify-center shrink-0">
                <img 
                  src={selectedManufacturer.logoUrl} 
                  alt={selectedManufacturer.altText} 
                  className="max-h-8 max-w-[95px] object-contain filter brightness-125"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  {selectedManufacturer.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">
                  {selectedManufacturer.name}
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-850 space-y-1">
                <div className="font-mono text-[10px] uppercase font-bold text-amber-400">Specialty & Proven Track Record</div>
                <p>{selectedManufacturer.specialty}</p>
              </div>

              {selectedManufacturer.ulcRatings && (
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                  <div className="font-mono text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ULC & Building Code Certification</span>
                  </div>
                  <p className="font-mono text-white text-[11px]">{selectedManufacturer.ulcRatings}</p>
                </div>
              )}

              {selectedManufacturer.b2bSpecNotes && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-850 space-y-1">
                  <div className="font-mono text-[10px] uppercase font-bold text-neutral-400">Metro Vancouver B2B Spec Note</div>
                  <p className="text-neutral-300">{selectedManufacturer.b2bSpecNotes}</p>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="font-mono text-[10px] uppercase font-bold text-neutral-400">Key Product Assemblies:</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {selectedManufacturer.keyProducts.map((prod, i) => (
                    <div key={i} className="p-2 rounded-lg bg-neutral-950 border border-neutral-850 text-[11px] font-mono text-neutral-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{prod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedManufacturer(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
