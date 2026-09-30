import React from 'react';
import { 
  DoorOpen, 
  XCircle, 
  CheckCircle2, 
  Flame, 
  VolumeX, 
  Truck, 
  FileSpreadsheet, 
  Layers, 
  ShieldCheck,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';

interface WhyJustDoorsSectionProps {
  onOpenScheduleModal: () => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
}

export const WhyJustDoorsSection: React.FC<WhyJustDoorsSectionProps> = ({
  onOpenScheduleModal,
  onOpenQuoteModal,
}) => {
  return (
    <section 
      id="why-just-doors"
      className="py-24 bg-neutral-950 border-b border-neutral-800 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Manifesto Box */}
        <div className="rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-neutral-800 p-8 sm:p-12 shadow-2xl relative space-y-12">
          
          {/* Top Heading */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <DoorOpen className="w-4 h-4" />
              <span>The Just Doors Principle</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Door Supply & Installation.<br />
              <span className="text-amber-400">Just Doors.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              <strong className="text-white">Just Doors</strong> coordinates door and hardware supply, installation and related opening work. Products are sourced from manufacturers for the project; Just Doors does not operate a door manufacturing facility.
            </p>
          </div>

          {/* Comparison Grid: Generalist Building Supply vs Just Doors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Generalist Window & Door Dealer */}
            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-neutral-500 font-bold">
                  Items to coordinate before ordering
                </span>
                <FileSpreadsheet className="w-5 h-5 text-neutral-400" />
              </div>

              <ul className="space-y-3 text-xs text-neutral-400 font-mono">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Confirm the door and frame dimensions against the actual opening</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Match hardware models and preparations to the selected assembly</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Confirm permitted preparations with the manufacturer before modifications</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Plan delivery, storage and building access with the site contact</span>
                </li>
              </ul>
            </div>

            {/* The Just Doors Advantage */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-amber-500/50 space-y-4 shadow-xl shadow-amber-500/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-amber-400 font-extrabold flex items-center gap-1.5">
                  <DoorOpen className="w-4 h-4 text-amber-400" />
                  <span>The Just Doors Standard (justdoors.co)</span>
                </span>
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
              </div>

              <ul className="space-y-3 text-xs text-neutral-200 font-mono">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Door Project Focus:</strong> Door, frame and hardware requirements reviewed together</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Turnkey Hardware Schedules:</strong> Coordinate locksets, hinges, seals and closers with supplier preparations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Manufacturer Documentation:</strong> Confirm listed ratings and permitted machining with the selected manufacturer</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Project Delivery Planning:</strong> Discuss opening labels, delivery sequence and access requirements</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-neutral-800">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 font-bold font-mono">
                01
              </div>
              <h4 className="text-base font-bold text-white">Project Requirements</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Identify specified fire, acoustic and accessibility requirements for review against product documentation and the project design.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 font-bold font-mono">
                02
              </div>
              <h4 className="text-base font-bold text-white">Supplier Preparations</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Confirm hinge, lock, closer and seal preparations with the supplier before ordering.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 font-bold font-mono">
                03
              </div>
              <h4 className="text-base font-bold text-white">Rapid Takeoffs</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Send drawings and opening schedules for scope review. Pricing and timing depend on the project information and supplier availability.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 font-bold font-mono">
                04
              </div>
              <h4 className="text-base font-bold text-white">Direct Logistics</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Coordinate delivery stages and access arrangements for the agreed project scope.
              </p>
            </div>
          </div>

          {/* Bottom Conversion CTA Strip */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-base font-bold text-white">
                Have an upcoming project requiring door packages?
              </div>
              <div className="text-xs text-neutral-400">
                Residential homes, strata building retrofits, commercial suites, or 500+ unit high-rise towers.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenScheduleModal}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <FileSpreadsheet className="w-4 h-4 text-neutral-950" />
                <span>Send Us Your Door Schedule →</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
