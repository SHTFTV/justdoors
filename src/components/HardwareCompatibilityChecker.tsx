import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Lock, 
  Sliders, 
  Sparkles, 
  Info, 
  Check, 
  ArrowRight, 
  RefreshCw,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { HardwareValidationResult } from '../types';
import { validateHardwareCompatibility } from '../utils/hardwareCompatibility';

export interface HardwareSpecFormState {
  doorType: string;
  fireRating: string;
  lockset: string;
  hinges: string;
  closer: string;
  frameType: string;
  location: string;
}

interface HardwareCompatibilityCheckerProps {
  onApplySpec?: (spec: HardwareSpecFormState, validation: HardwareValidationResult) => void;
  className?: string;
  compact?: boolean;
}

export const HARDWARE_PRESETS: { name: string; tag: string; spec: HardwareSpecFormState }[] = [
  {
    name: 'High-Rise Suite Entry',
    tag: '20-Min Suite Entry',
    spec: {
      doorType: '20-Min Mineral Core Wood Veneer',
      fireRating: '20-Min UL 10C Positive Pressure',
      lockset: 'Grade 1 Heavy Duty Mortise (Schlage L9000 / ASSA ABLOY)',
      hinges: 'Heavy-Duty 4.5"x4.5" Steel Ball-Bearing Hinges (UL 10C)',
      closer: 'Concealed In-Door Overhead Closer',
      frameType: '16ga Welded Hollow Metal Frame',
      location: 'Suite Entry Doors',
    }
  },
  {
    name: 'Exit Stairwell & Egress Core',
    tag: '90-Min Stairwell',
    spec: {
      doorType: '16ga Galvannealed Steel Flush (Hollow Metal)',
      fireRating: '90-Min UL 10C Fire Classified',
      lockset: 'Von Duprin 98/99 Series Panic Exit Crash Bar',
      hinges: 'Heavy-Duty 4.5"x4.5" Steel Ball-Bearing Hinges (UL 10C)',
      closer: 'LCN 4040XP Heavy Duty Hydraulic Closer',
      frameType: '14ga Welded Hollow Metal Frame',
      location: 'Egress Stairwell Enclosure',
    }
  },
  {
    name: 'Parkade / Electrical Vault',
    tag: '3-Hour Industrial',
    spec: {
      doorType: '3-Hour Heavy Hollow Metal Steel Vault',
      fireRating: '3-Hour Fire Rated UL',
      lockset: 'Grade 1 Heavy Duty Mortise (Schlage L9000 / ASSA ABLOY)',
      hinges: 'Hager Roton Continuous Geared Aluminum Hinges',
      closer: 'LCN 4040XP Heavy Duty Hydraulic Closer',
      frameType: '14ga Welded Hollow Metal Frame',
      location: 'Electrical / Transformer Vault',
    }
  },
  {
    name: 'Commercial Glass Amenity',
    tag: 'Glass Storefront',
    spec: {
      doorType: 'Wide Stile Commercial Glass & Aluminum',
      fireRating: 'Non-Rated Architectural',
      lockset: 'Adams Rite Narrow-Stile Storefront Latch (Glass/Alum)',
      hinges: 'dormakaba Architectural Glass Pivot Assembly',
      closer: 'LCN 4040XP Heavy Duty Hydraulic Closer',
      frameType: 'Anodized Aluminum Storefront Frame',
      location: 'Amenity Lounge / Lobby',
    }
  },
  {
    name: 'Luxury Residential Interior',
    tag: 'Architectural Timber',
    spec: {
      doorType: 'Solid Core Interior Flush Wood (Timber)',
      fireRating: 'Non-Rated Architectural',
      lockset: 'Residential Privacy Bed/Bath Leverset',
      hinges: 'Concealed 3D Architectural Hinges (Tectus / SOSS)',
      closer: 'None / Free-Swinging',
      frameType: '20-Min Kerfed Timber Wood Frame',
      location: 'Master Suite & Interior Bedrooms',
    }
  }
];

export const HardwareCompatibilityChecker: React.FC<HardwareCompatibilityCheckerProps> = ({
  onApplySpec,
  className = '',
  compact = false,
}) => {
  const [form, setForm] = useState<HardwareSpecFormState>({
    doorType: '20-Min Mineral Core Wood Veneer',
    fireRating: '20-Min UL 10C Positive Pressure',
    lockset: 'Grade 1 Heavy Duty Mortise (Schlage L9000 / ASSA ABLOY)',
    hinges: 'Heavy-Duty 4.5"x4.5" Steel Ball-Bearing Hinges (UL 10C)',
    closer: 'Concealed In-Door Overhead Closer',
    frameType: '16ga Welded Hollow Metal Frame',
    location: 'Residential Suite Entry',
  });

  const [validation, setValidation] = useState<HardwareValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>('High-Rise Suite Entry');

  const checkCompatibility = useCallback(async (currentForm: HardwareSpecFormState) => {
    // Instant automated lookup calculation
    const instantResult = validateHardwareCompatibility({
      doorType: currentForm.doorType,
      fireRating: currentForm.fireRating,
      lockset: currentForm.lockset,
      hinges: currentForm.hinges,
      closer: currentForm.closer,
      frameType: currentForm.frameType,
    });
    setValidation(instantResult);

    setIsValidating(true);
    try {
      const response = await fetch('/api/validate-hardware-compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentForm),
      });

      if (response.ok) {
        const data: HardwareValidationResult = await response.json();
        setValidation(data);
      }
    } catch (err) {
      console.debug('Using client lookup engine result:', err);
    } finally {
      setIsValidating(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkCompatibility(form);
    }, 200);
    return () => clearTimeout(timer);
  }, [form, checkCompatibility]);

  const handlePresetSelect = (preset: typeof HARDWARE_PRESETS[0]) => {
    setActivePreset(preset.name);
    setForm(preset.spec);
  };

  const handleFieldChange = (field: keyof HardwareSpecFormState, value: string) => {
    setActivePreset(null);
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl overflow-hidden ${className}`}>
      
      {/* Header */}
      <div className="p-5 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Backend Lookup & Code Rules Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            Hardware <span className="text-amber-400">Compatibility Checker</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Validates locksets, hinges, and closers against door core material, fire ratings, and NFPA 80 / ULC-S104 standards.
          </p>
        </div>

        {/* Live Status Pill */}
        {validation && (
          <div className="shrink-0">
            {validation.status === 'compliant' && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold shadow-lg shadow-emerald-950/40">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Code Compliant</span>
              </div>
            )}
            {validation.status === 'warning' && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold shadow-lg shadow-amber-950/40">
                <AlertTriangle className="w-4 h-4" />
                <span>Requires Fire Liner / Special Prep</span>
              </div>
            )}
            {validation.status === 'incompatible' && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 font-mono text-xs font-bold shadow-lg shadow-red-950/40 animate-pulse">
                <XCircle className="w-4 h-4" />
                <span>Code Violation / Incompatible</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preset Pills */}
      <div className="px-5 sm:px-6 py-3 bg-neutral-900 border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-mono uppercase text-neutral-500 mr-2 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Standard Opening Sets:
        </span>
        {HARDWARE_PRESETS.map((p) => {
          const isSelected = activePreset === p.name;
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => handlePresetSelect(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                isSelected
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Controls Grid */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          {/* 1. Door Material / Construction */}
          <div className="space-y-1.5">
            <label className="font-mono text-neutral-400 uppercase text-[11px] font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Door Construction</span>
            </label>
            <select
              value={form.doorType}
              onChange={(e) => handleFieldChange('doorType', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono focus:outline-none focus:border-amber-500"
            >
              <option value="20-Min Mineral Core Wood Veneer">20-Min Mineral Core Wood Veneer</option>
              <option value="16ga Galvannealed Steel Flush (Hollow Metal)">16ga Galvannealed Steel Flush</option>
              <option value="Solid Core Interior Flush Wood (Timber)">Solid Core Flush Wood</option>
              <option value="Wide Stile Commercial Glass & Aluminum">Wide Stile Glass & Aluminum</option>
              <option value="3-Hour Heavy Hollow Metal Steel Vault">3-Hour Heavy Steel Vault</option>
              <option value="Custom Architectural Stile & Rail Wood">Custom Stile & Rail Wood</option>
            </select>
          </div>

          {/* 2. Fire Rating */}
          <div className="space-y-1.5">
            <label className="font-mono text-neutral-400 uppercase text-[11px] font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Fire Rating</span>
            </label>
            <select
              value={form.fireRating}
              onChange={(e) => handleFieldChange('fireRating', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono focus:outline-none focus:border-amber-500"
            >
              <option value="Non-Rated Architectural">Non-Rated Architectural</option>
              <option value="20-Min UL 10C Positive Pressure">20-Min UL 10C Positive Pressure</option>
              <option value="45-Min Fire Rated">45-Min Fire Rated</option>
              <option value="90-Min UL 10C Fire Classified">90-Min Fire Rated</option>
              <option value="3-Hour Fire Rated UL">3-Hour Fire Rated UL</option>
            </select>
          </div>

          {/* 3. Locking Set / Egress */}
          <div className="space-y-1.5">
            <label className="font-mono text-neutral-400 uppercase text-[11px] font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Lockset / Egress Type</span>
            </label>
            <select
              value={form.lockset}
              onChange={(e) => handleFieldChange('lockset', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono focus:outline-none focus:border-amber-500"
            >
              <option value="Grade 1 Heavy Duty Mortise (Schlage L9000 / ASSA ABLOY)">Grade 1 Mortise (Schlage / ASSA ABLOY)</option>
              <option value="Cylindrical Leverset Grade 1/2 (Schlage ND-Series)">Cylindrical Leverset Grade 1/2</option>
              <option value="Von Duprin 98/99 Series Panic Exit Crash Bar">Von Duprin Panic Crash Bar</option>
              <option value="Commercial Smart RFID / Wi-Fi Access Lockset">Commercial Smart RFID / Access Lock</option>
              <option value="Adams Rite Narrow-Stile Storefront Latch (Glass/Alum)">Adams Rite Narrow Stile Latch</option>
              <option value="Residential Privacy Bed/Bath Leverset">Residential Privacy Leverset</option>
              <option value="Residential Passage / Dummy Pull (Non-Latching)">Residential Passage (Non-Latching) ⚠️</option>
              <option value="Designer Pocket Mortise Lock (Emtek)">Designer Pocket Mortise Lock</option>
            </select>
          </div>

          {/* 4. Hinges Assembly */}
          <div className="space-y-1.5">
            <label className="font-mono text-neutral-400 uppercase text-[11px] font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Hinge Specification</span>
            </label>
            <select
              value={form.hinges}
              onChange={(e) => handleFieldChange('hinges', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono focus:outline-none focus:border-amber-500"
            >
              <option value="Heavy-Duty 4.5&quot;x4.5&quot; Steel Ball-Bearing Hinges (UL 10C)">4.5"x4.5" Steel Ball-Bearing (UL 10C)</option>
              <option value="Hager Roton Continuous Geared Aluminum Hinges">Hager Roton Continuous Geared</option>
              <option value="UL-Listed Spring Loaded Self-Closing Fire Hinges">UL Spring Loaded Self-Closing</option>
              <option value="Concealed 3D Architectural Hinges (Tectus / SOSS)">Concealed 3D Architectural (Tectus)</option>
              <option value="Standard Residential Plain-Bearing Brass/Steel Hinges">Standard Plain-Bearing Residential</option>
              <option value="dormakaba Architectural Glass Pivot Assembly">dormakaba Glass Pivot Assembly</option>
            </select>
          </div>

        </div>

        {/* Secondary Details: Closer & Frame */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs pt-3 border-t border-neutral-800/80">
          <div className="space-y-1.5">
            <label className="font-mono text-neutral-400 uppercase text-[11px]">Door Closer</label>
            <select
              value={form.closer}
              onChange={(e) => handleFieldChange('closer', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono focus:outline-none focus:border-amber-500"
            >
              <option value="LCN 4040XP Heavy Duty Hydraulic Closer">LCN 4040XP Heavy Duty Cast Closer</option>
              <option value="Concealed In-Door Overhead Closer">Concealed In-Door Overhead Closer</option>
              <option value="None / Free-Swinging">None / Free-Swinging (Non-Fire Rated)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-neutral-400 uppercase text-[11px]">Frame Type</label>
            <select
              value={form.frameType}
              onChange={(e) => handleFieldChange('frameType', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono focus:outline-none focus:border-amber-500"
            >
              <option value="16ga Welded Hollow Metal Frame">16ga Welded Hollow Metal Frame</option>
              <option value="14ga Welded Hollow Metal Frame">14ga Welded Hollow Metal Frame</option>
              <option value="20-Min Kerfed Timber Wood Frame">20-Min Kerfed Timber Wood Frame</option>
              <option value="Concealed Zero-Trim Drywall Frame">Concealed Zero-Trim Frame</option>
              <option value="Anodized Aluminum Storefront Frame">Anodized Aluminum Storefront Frame</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-neutral-400 uppercase text-[11px]">Opening Location / Mark</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="e.g. Suite Entries, Stairwell D1"
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono focus:outline-none focus:border-amber-500"
            >
            </input>
          </div>
        </div>

        {/* Validation Result Box */}
        {validation && (
          <div className={`p-5 rounded-2xl border transition-all ${
            validation.status === 'compliant'
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
              : validation.status === 'warning'
              ? 'bg-amber-950/20 border-amber-500/40 text-amber-100'
              : 'bg-red-950/20 border-red-500/40 text-red-100'
          }`}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              
              <div className="space-y-3 flex-grow">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    validation.status === 'compliant'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : validation.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {validation.ruleCode}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Tested: {validation.testedAssemblies}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold font-display text-white">
                  {validation.summary}
                </h4>

                {/* Details List */}
                <div className="space-y-1">
                  {validation.details.map((detail, idx) => (
                    <div key={idx} className="text-xs flex items-start gap-2 text-neutral-300">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                {validation.recommendations.length > 0 && (
                  <div className="pt-2 border-t border-neutral-800/80">
                    <div className="text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                      Engineering Takeoff Recommendations:
                    </div>
                    {validation.recommendations.map((rec, idx) => (
                      <div key={idx} className="text-xs flex items-start gap-2 text-neutral-200">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Code references */}
                {validation.codeReferences.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {validation.codeReferences.map((code, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-neutral-950 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
                        {code}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {onApplySpec && (
                <div className="shrink-0 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => onApplySpec(form, validation)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
                  >
                    <span>Use Spec in Schedule Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-mono text-center text-neutral-400">
                    Transfers validated lock & hinge preps
                  </span>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
