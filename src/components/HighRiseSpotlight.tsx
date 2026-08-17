import React, { useState } from 'react';
import { 
  Building2, 
  FileSpreadsheet, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Volume2, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Download, 
  UploadCloud,
  FileCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { SAMPLE_DOOR_SCHEDULE } from '../data/products';

interface HighRiseSpotlightProps {
  onOpenScheduleModal: () => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenAIAssistant: () => void;
}

export const HighRiseSpotlight: React.FC<HighRiseSpotlightProps> = ({
  onOpenScheduleModal,
  onOpenQuoteModal,
  onOpenAIAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'specifications' | 'logistics'>('schedule');

  return (
    <section 
      id="high-rise-spotlight"
      className="py-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-b border-neutral-800 relative overflow-hidden"
    >
      {/* Background architectural grid highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(245,158,11,0.08),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Pill & Category Identifier */}
        <div className="flex flex-col items-center text-center space-y-5 max-w-4xl mx-auto mb-16">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider shadow-inner">
            <Building2 className="w-4 h-4" />
            <span>Developer & General Contractor Division</span>
          </div>

          {/* Requested Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
            HIGH-RISE & MULTI-FAMILY DOOR PACKAGES
          </h2>

          {/* Requested Subhead */}
          <p className="text-lg sm:text-2xl text-neutral-300 font-normal max-w-3xl leading-relaxed">
            Door supply for new construction, renovations and building-wide replacements.
          </p>

          {/* Requested Specification Badges / Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            {[
              'Unit Entry',
              'Fire Rated',
              'Hollow Metal',
              'Common Areas',
              'Hardware',
            ].map((tag, idx) => (
              <span 
                key={tag}
                className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Direct CTA (Exact requested format) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              id="highrise-spotlight-cta-schedule"
              onClick={onOpenScheduleModal}
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-base transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3"
            >
              <FileSpreadsheet className="w-5 h-5 text-neutral-950" />
              <span>Send Us Your Door Schedule →</span>
            </button>

            <button
              id="highrise-spotlight-cta-ai"
              onClick={onOpenAIAssistant}
              className="px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/40 text-neutral-200 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Code & Hardware Assistant</span>
            </button>
          </div>
        </div>

        {/* Interactive B2B Feature Matrix & Live Door Schedule Preview */}
        <div className="rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden">
          
          {/* Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 bg-neutral-900/60 px-6 py-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                HIGH-RISE SUPPLY WORKFLOW
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'schedule'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white bg-neutral-900'
                }`}
              >
                Sample Door Schedule (Takeoff)
              </button>

              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'specifications'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white bg-neutral-900'
                }`}
              >
                Fire & Acoustic Standards
              </button>

              <button
                onClick={() => setActiveTab('logistics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'logistics'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white bg-neutral-900'
                }`}
              >
                Floor-by-Floor Site Logistics
              </button>
            </div>
          </div>

          {/* Content Pane 1: Door Schedule Spreadsheet View */}
          {activeTab === 'schedule' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                    <span>Architectural Door Schedule Format</span>
                  </h4>
                  <p className="text-xs text-neutral-400">
                    We accept standard architectural Excel sheets, Revit exports, PDF plans, and spec books.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenScheduleModal}
                    className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-amber-400 text-xs font-bold flex items-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Your Schedule</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-neutral-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900 text-neutral-400 uppercase text-[11px] border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Opening Mark</th>
                      <th className="py-3 px-4">Door Construction</th>
                      <th className="py-3 px-4">Size</th>
                      <th className="py-3 px-4">Fire Rating</th>
                      <th className="py-3 px-4">Frame Type</th>
                      <th className="py-3 px-4">Hardware Package</th>
                      <th className="py-3 px-4 text-right">Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {SAMPLE_DOOR_SCHEDULE.map((row, i) => (
                      <tr key={i} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{row.opening}</td>
                        <td className="py-3 px-4">{row.doorType}</td>
                        <td className="py-3 px-4">{row.size}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.fireRating.includes('90') || row.fireRating.includes('3-Hour')
                              ? 'bg-red-950/80 border border-red-800/80 text-red-300'
                              : row.fireRating.includes('20')
                              ? 'bg-amber-950/80 border border-amber-800/80 text-amber-300'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}>
                            {row.fireRating}
                          </span>
                        </td>
                        <td className="py-3 px-4">{row.frame}</td>
                        <td className="py-3 px-4 text-neutral-300">{row.hardware}</td>
                        <td className="py-3 px-4 text-right font-bold text-amber-400">{row.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 pt-2 gap-3">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>UL 10C Positive Pressure Certified</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Factory Machining Included</span>
                  </span>
                </div>

                <div className="text-neutral-400">
                  Total High-Rise Openings: <span className="font-bold text-white font-mono">63 Openings (Sample)</span>
                </div>
              </div>
            </div>
          )}

          {/* Content Pane 2: Specifications */}
          {activeTab === 'specifications' && (
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="text-base font-display font-bold text-white">UL 10C Positive Pressure</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Full compliance with Category A & B positive pressure testing, intumescent edge seals, and UL labeling for suite entries, stair towers, and mechanical shafts.
                </p>
                <div className="text-[11px] font-mono text-amber-400">
                  NFPA 80 • NFPA 252 • IBC Chapter 7
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Volume2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-display font-bold text-white">Acoustic STC 35-45 Isolation</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Eliminates corridor foot traffic noise and mechanical elevator sound bleed using concealed automatic drop seals and high-density mineral cores.
                </p>
                <div className="text-[11px] font-mono text-amber-400">
                  ASTM E90 • ASTM E413 Tested
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-base font-display font-bold text-white">Turnkey Hardware Schedules</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Grade 1 mortise locksets, smart RFID keycard access, concealed overhead closers, and master keying schedules delivered pre-packed per opening.
                </p>
                <div className="text-[11px] font-mono text-amber-400">
                  ANSI/BHMA A156.13 Grade 1
                </div>
              </div>
            </div>
          )}

          {/* Content Pane 3: Logistics */}
          {activeTab === 'logistics' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="text-amber-400 font-mono font-bold text-xs uppercase">Step 01</div>
                  <h4 className="text-base font-bold text-white">Floor-by-Floor Palletizing</h4>
                  <p className="text-xs text-neutral-300">
                    Doors and frames are sorted, bundled, and wrapped strictly by floor level and unit sequence so your site crane hoists direct to the exact level.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="text-amber-400 font-mono font-bold text-xs uppercase">Step 02</div>
                  <h4 className="text-base font-bold text-white">Precision Factory Machining</h4>
                  <p className="text-xs text-neutral-300">
                    All mortise pockets, hinge preps, peephole bores, and concealed closer pockets are CNC machined at our facility—eliminating noisy site cutting.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="text-amber-400 font-mono font-bold text-xs uppercase">Step 03</div>
                  <h4 className="text-base font-bold text-white">Pre-Approved Fire Submittals</h4>
                  <p className="text-xs text-neutral-300">
                    We furnish complete submittal binders with stamped engineering drawings, UL fire labels, and hardware cut sheets ready for municipal review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Banner */}
          <div className="bg-neutral-900 border-t border-neutral-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">
                Ready for a formal bid on your upcoming high-rise or multi-family project?
              </div>
              <div className="text-xs text-neutral-400">
                Our commercial estimating team returns detailed line-item takeoffs within 24 to 48 hours.
              </div>
            </div>

            <button
              onClick={onOpenScheduleModal}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-lg shadow-amber-500/20"
            >
              <span>Submit Schedule for Pricing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
