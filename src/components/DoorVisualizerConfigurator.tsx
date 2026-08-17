import React, { useState } from 'react';
import { 
  Sliders, 
  Flame, 
  Volume2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Download,
  Layers,
  Wrench
} from 'lucide-react';

interface DoorVisualizerConfiguratorProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
}

export const DoorVisualizerConfigurator: React.FC<DoorVisualizerConfiguratorProps> = ({
  onOpenQuoteModal,
}) => {
  const [doorType, setDoorType] = useState<'suite-fire' | 'grand-pivot' | 'hollow-metal' | 'flush-interior'>('suite-fire');
  const [woodFinish, setWoodFinish] = useState<'walnut' | 'oak' | 'charcoal' | 'steel' | 'sugiban'>('walnut');
  const [hardwareFinish, setHardwareFinish] = useState<'matte-black' | 'satin-brass' | 'brushed-stainless' | 'bronze'>('matte-black');
  const [handleStyle, setHandleStyle] = useState<'smart-mortise' | 'ladder-pull' | 'leverset' | 'panic-bar'>('smart-mortise');
  const [hasAcousticDrop, setHasAcousticDrop] = useState(true);
  const [hasViewer, setHasViewer] = useState(true);

  // Dynamic visual styling helper
  const getDoorBackground = () => {
    switch (woodFinish) {
      case 'walnut':
        return 'bg-gradient-to-b from-[#3d271d] via-[#4a3124] to-[#2e1d15] border-[#5a3e30]';
      case 'oak':
        return 'bg-gradient-to-b from-[#b8976f] via-[#c9a77c] to-[#9e7d56] border-[#d6b488]';
      case 'charcoal':
        return 'bg-gradient-to-b from-[#1f2024] via-[#2a2c30] to-[#141518] border-[#3a3d42]';
      case 'steel':
        return 'bg-gradient-to-b from-[#474d56] via-[#565d66] to-[#383d45] border-[#6b737e]';
      case 'sugiban':
        return 'bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#0a0a0a] border-[#262626]';
      default:
        return 'bg-[#3d271d]';
    }
  };

  const getHardwareColor = () => {
    switch (hardwareFinish) {
      case 'matte-black':
        return 'bg-neutral-950 border-neutral-700 text-neutral-300 shadow-md';
      case 'satin-brass':
        return 'bg-amber-300 border-amber-200 text-amber-950 shadow-md';
      case 'brushed-stainless':
        return 'bg-neutral-300 border-neutral-100 text-neutral-900 shadow-md';
      case 'bronze':
        return 'bg-[#66462c] border-[#805938] text-amber-100 shadow-md';
    }
  };

  return (
    <section 
      id="door-configurator"
      className="py-20 bg-neutral-900/50 border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Door Studio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Configure Your Opening System
          </h2>

          <p className="text-sm sm:text-base text-neutral-300">
            Preview finishes, fire-rated assemblies, acoustic seals, and architectural hardware combinations in real time.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Door Stage (Left 5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-neutral-950 border border-neutral-800 p-8 flex flex-col items-center justify-center relative shadow-2xl min-h-[520px]">
            
            {/* Background Wall Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

            {/* Door Frame Outer Frame */}
            <div className="relative w-56 sm:w-64 h-[440px] bg-neutral-900 rounded-t-xl border-4 border-b-0 border-neutral-700 flex items-center justify-center p-2 shadow-2xl">
              
              {/* Door Slab */}
              <div 
                className={`w-full h-full rounded-t-sm border shadow-2xl relative transition-all duration-500 flex flex-col justify-between p-4 ${getDoorBackground()}`}
              >
                {/* Woodgrain subtle line simulation */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(255,255,255,0.08)_7px)]" />

                {/* UL Fire Rating Certification Label on Top Hinge Edge */}
                <div className="absolute top-6 left-1 transform -rotate-90 origin-top-left">
                  <span className="text-[7px] font-mono px-1 py-0.5 bg-neutral-950/90 border border-amber-500/80 text-amber-300 font-bold uppercase rounded tracking-tighter">
                    {doorType === 'suite-fire' ? 'UL 10C 20-MIN' : doorType === 'hollow-metal' ? 'UL 90-MIN' : 'ARCH-SERIES'}
                  </span>
                </div>

                {/* Optional Peephole Viewer */}
                {hasViewer && (
                  <div className="mx-auto mt-12 w-3.5 h-3.5 rounded-full border-2 border-neutral-800 bg-neutral-950 flex items-center justify-center shadow-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                  </div>
                )}

                {/* Handle / Lockset Representation */}
                <div className="absolute right-4 top-[50%] transform -translate-y-1/2 flex items-center">
                  
                  {handleStyle === 'smart-mortise' && (
                    <div className={`w-8 h-24 rounded-lg p-1.5 flex flex-col items-center justify-between border ${getHardwareColor()}`}>
                      <div className="w-4 h-5 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[6px] font-mono text-amber-400 font-bold">
                        RFID
                      </div>
                      <div className="w-6 h-2 rounded bg-neutral-800" />
                      <div className="w-4 h-1 rounded bg-neutral-700" />
                    </div>
                  )}

                  {handleStyle === 'ladder-pull' && (
                    <div className={`w-3.5 h-44 rounded-full border ${getHardwareColor()}`} />
                  )}

                  {handleStyle === 'leverset' && (
                    <div className="flex items-center">
                      <div className={`w-6 h-12 rounded-md border flex items-center justify-center ${getHardwareColor()}`}>
                        <div className="w-8 h-2 rounded-r-md bg-neutral-800 -mr-6" />
                      </div>
                    </div>
                  )}

                  {handleStyle === 'panic-bar' && (
                    <div className={`w-36 -ml-32 h-6 rounded-md border flex items-center justify-end px-2 ${getHardwareColor()}`}>
                      <div className="w-24 h-2 bg-red-600/80 rounded" />
                    </div>
                  )}

                </div>

                {/* Bottom Acoustic Drop Seal Indicator */}
                {hasAcousticDrop && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-neutral-950 border-t border-amber-500/60 flex items-center justify-center">
                    <span className="text-[6px] font-mono text-amber-400 uppercase tracking-widest font-black">
                      STC 38 ACOUSTIC DROP SEAL
                    </span>
                  </div>
                )}

              </div>
            </div>

            {/* Visual Specs Pill below door */}
            <div className="mt-4 flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1 text-amber-400">
                <Flame className="w-3.5 h-3.5" />
                <span>{doorType === 'suite-fire' ? '20-Min Fire Rated' : doorType === 'hollow-metal' ? '90-Min Fire Rated' : 'Non-Rated Core'}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Volume2 className="w-3.5 h-3.5" />
                <span>{hasAcousticDrop ? 'STC 38 Tested' : 'STC 32 Standard'}</span>
              </span>
            </div>

          </div>

          {/* Configuration Controls (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Control 1: System Type */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <label className="text-xs font-mono uppercase text-neutral-400 font-bold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>1. Select Door Application & Core System</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'suite-fire', name: 'Suite Entry', sub: '20-Min Fire' },
                  { id: 'grand-pivot', name: 'Grand Pivot', sub: 'Architectural' },
                  { id: 'hollow-metal', name: 'Hollow Metal', sub: '90-Min Stair' },
                  { id: 'flush-interior', name: 'Flush Interior', sub: 'Concealed' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDoorType(item.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      doorType === item.id
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold shadow-md'
                        : 'bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border-neutral-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.name}</div>
                    <div className={`text-[10px] ${doorType === item.id ? 'text-neutral-900' : 'text-neutral-500'}`}>
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Slab Finish */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <label className="text-xs font-mono uppercase text-neutral-400 font-bold flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Door Slab Material & Finish</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'walnut', label: 'Black Walnut', color: 'bg-[#4a3124]' },
                  { id: 'oak', label: 'Rift White Oak', color: 'bg-[#c9a77c]' },
                  { id: 'charcoal', label: 'Matte Charcoal', color: 'bg-[#2a2c30]' },
                  { id: 'steel', label: 'Galvannealed Steel', color: 'bg-[#565d66]' },
                  { id: 'sugiban', label: 'Shou Sugi Ban', color: 'bg-[#1a1a1a]' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWoodFinish(item.id as any)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      woodFinish === item.id
                        ? 'bg-neutral-800 border-amber-400 text-amber-300 font-bold'
                        : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border border-neutral-700 ${item.color}`} />
                    <span className="text-[11px] text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Hardware Set & Finishes */}
            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <label className="text-xs font-mono uppercase text-neutral-400 font-bold flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>3. Hardware Package & Trim Finish</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'smart-mortise', label: 'Smart RFID Keycard' },
                  { id: 'ladder-pull', label: 'Architectural Pull' },
                  { id: 'leverset', label: 'Commercial Lever' },
                  { id: 'panic-bar', label: 'UL Panic Exit Bar' },
                ].map((hw) => (
                  <button
                    key={hw.id}
                    onClick={() => setHandleStyle(hw.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      handleStyle === hw.id
                        ? 'bg-neutral-800 border-amber-400 text-amber-300'
                        : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    {hw.label}
                  </button>
                ))}
              </div>

              {/* Hardware Finish Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-500 mr-2">Trim Finish:</span>
                {[
                  { id: 'matte-black', label: 'Matte Black (622)' },
                  { id: 'satin-brass', label: 'Satin Brass (606)' },
                  { id: 'brushed-stainless', label: 'Stainless (630)' },
                  { id: 'bronze', label: 'Dark Bronze (613)' },
                ].map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => setHardwareFinish(fin.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                      hardwareFinish === fin.id
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {fin.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Acoustic & Life Safety Add-ons */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={hasAcousticDrop}
                    onChange={(e) => setHasAcousticDrop(e.target.checked)}
                    className="rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Concealed Acoustic Drop Seal (STC 38)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={hasViewer}
                    onChange={(e) => setHasViewer(e.target.checked)}
                    className="rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-amber-500"
                  />
                  <span>UL Fire-Rated Wide-Angle Viewer</span>
                </label>
              </div>

              <button
                onClick={() => onOpenQuoteModal('high-rise')}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Quote This Exact Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
