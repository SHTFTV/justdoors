import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Hammer, 
  Layers, 
  Volume2, 
  Grid, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  ExternalLink,
  Compass,
  FileSpreadsheet,
  Clock,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { MUNICIPALITIES_LIST, MunicipalityData } from '../data/municipalitiesData';

interface FeaturedContractorVancouverProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
  onSelectMunicipality?: (muni: MunicipalityData) => void;
}

export const FeaturedContractorVancouver: React.FC<FeaturedContractorVancouverProps> = ({
  onOpenQuoteModal,
  onOpenScheduleModal,
  onSelectMunicipality,
}) => {
  const { success } = useToast();
  const [selectedHub, setSelectedHub] = useState<string>('vancouver');
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadScope, setLeadScope] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const hubs = [
    {
      id: 'vancouver',
      name: 'City of Vancouver & Downtown',
      coordinates: '49.2827,-123.1207',
      focus: 'High-Rise Commercial TIs, Level 5 Skim, Deflection Tracks',
      cities: ['Vancouver', 'West Vancouver', 'North Vancouver City', 'North Vancouver District'],
      zoom: 12
    },
    {
      id: 'burnaby-richmond',
      name: 'Burnaby, New West & Richmond',
      coordinates: '49.2488,-122.9805',
      focus: 'Mixed-Use Podium Framing, Multi-Family Strata & Tech Offices',
      cities: ['Burnaby', 'New Westminster', 'Richmond', 'Delta'],
      zoom: 12
    },
    {
      id: 'surrey-langley',
      name: 'Surrey, Delta & Langley',
      coordinates: '49.1913,-122.8490',
      focus: 'Commercial Tilt-Up TIs, 2-Hour Demising Walls, Retail Plazas',
      cities: ['Surrey', 'City of Langley', 'Township of Langley', 'White Rock', 'Tsawwassen First Nation'],
      zoom: 11
    },
    {
      id: 'tri-cities',
      name: 'Tri-Cities & Ridge Meadows',
      coordinates: '49.2838,-122.7932',
      focus: 'Civic Buildings, Medical Suites, Suspended T-Bar Grids',
      cities: ['Coquitlam', 'Port Coquitlam', 'Port Moody', 'Maple Ridge', 'Pitt Meadows', 'Anmore', 'Belcarra'],
      zoom: 12
    },
    {
      id: 'fraser-valley',
      name: 'Fraser Valley (Abbotsford to Hope)',
      coordinates: '49.0504,-122.3045',
      focus: 'Industrial Facilities, Agricultural Commercial, Fire Separations',
      cities: ['Abbotsford', 'Chilliwack', 'Mission', 'Hope', 'Kent', 'Harrison Hot Springs'],
      zoom: 10
    }
  ];

  const currentHub = hubs.find(h => h.id === selectedHub) || hubs[0];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadContact) return;

    setLeadSubmitted(true);
    success(
      'Scope Received — Mason Notified',
      `Thank you ${leadName}. Mason has received your project details and will respond personally within 1 business day.`
    );
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border-2 border-amber-500/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-neutral-100">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Header Strip: Sole Contractor Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>FEATURED CONTRACTOR — VANCOUVER & THE LOWER MAINLAND</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex flex-wrap items-center gap-3">
              <span>Rambo Wall & Ceilings</span>
              <a
                href="https://rambowalls.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono font-normal px-2.5 py-1 rounded-lg bg-neutral-800 text-amber-300 border border-neutral-700 hover:border-amber-500/50 hover:text-amber-200 inline-flex items-center gap-1 transition-colors"
              >
                <span>rambowalls.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </h3>

            <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Serving as the premier trade contractor for <strong className="text-white">Steel Stud Framing</strong>, <strong className="text-white">T-Bar & Suspended Ceilings</strong>, <strong className="text-white">Drywall Boarding</strong>, and <strong className="text-white">Level 1–5 Finishing</strong> across Metro Vancouver and the Fraser Valley (West Van to Abbotsford).
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <a 
              href="tel:7787732790"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call Mason: 778-773-2790</span>
            </a>

            <a 
              href="mailto:rambowallceiling@gmail.com"
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white border border-neutral-700 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Email Scope</span>
            </a>
          </div>
        </div>

        {/* Interactive Map & Regional Corridor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Google Map View of Lower Mainland Service Corridor */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white uppercase">Regional Service Radius: West Van to Abbotsford</span>
              </div>
              <span className="text-[11px] font-mono text-amber-400/90">
                Metro Vancouver & FVRD
              </span>
            </div>

            {/* Hub Selector Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {hubs.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedHub === hub.id
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                  }`}
                >
                  {hub.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Embedded Interactive Google Map */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-inner h-[360px] sm:h-[400px]">
              <iframe
                title="Rambo Wall & Ceilings Lower Mainland Service Area Map"
                src={`https://maps.google.com/maps?q=${currentHub.coordinates}&z=${currentHub.zoom}&output=embed&hl=en`}
                width="100%"
                height="100%"
                className="border-0 filter grayscale-[20%] contrast-[110%] opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Map Floating Overlay Card */}
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md p-3.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800 shadow-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-amber-400">{currentHub.name}</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Service Zone
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-snug">
                  {currentHub.focus}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {currentHub.cities.map((city, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct "START A PROJECT" Intake Form */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                <Clock className="w-4 h-4" />
                <span>1-Business-Day Response</span>
              </div>
              <h4 className="text-xl font-bold text-white">
                Start a Project — Let's Price Your Scope
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Send drawings, a site address, or just a quick note about what you're building. Mason responds personally with itemized takeoff numbers.
              </p>
            </div>

            {!leadSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-mono text-neutral-400 mb-1">
                    Your Name or GC / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Liam Scott / Pacific Build Corp"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-neutral-400 mb-1">
                    Phone Number or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadContact}
                    onChange={(e) => setLeadContact(e.target.value)}
                    placeholder="e.g. 778-555-0182 or liam@pacificbuild.ca"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-neutral-400 mb-1">
                    Project Scope & Lower Mainland Location
                  </label>
                  <textarea
                    rows={3}
                    value={leadScope}
                    onChange={(e) => setLeadScope(e.target.value)}
                    placeholder="e.g. 4,200 sq ft office TI in Vancouver, 3-5/8 steel framing, 1-hr fire demising wall, T-Bar acoustic ceilings, Level 5 finish."
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
                >
                  <span>Send to Mason</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto" />
                <h5 className="text-sm font-bold text-white">Scope Received</h5>
                <p className="text-xs text-neutral-300">
                  Mason has received your project details and will review drawings or reach out within 1 business day.
                </p>
                <button
                  onClick={() => setLeadSubmitted(false)}
                  className="text-[11px] font-mono text-amber-400 underline hover:text-amber-300 pt-1"
                >
                  Submit another scope
                </button>
              </div>
            )}

            {/* Direct Contact Footer */}
            <div className="pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1 text-white">
                <Phone className="w-3 h-3 text-amber-400" />
                778-773-2790
              </span>
              <span>rambowallceiling@gmail.com</span>
            </div>
          </div>

        </div>

        {/* 4 Core Trade Capabilities Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
              <Hammer className="w-4 h-4" />
              <span>Steel Stud Framing</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              25ga to 12ga heavy structural studs, deep-leg slotted deflection tracks, and engineered header backing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
              <Layers className="w-4 h-4" />
              <span>Drywall & Level 1–5</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Continuous 100% polymer Level 5 skim coats, butt-boards, and machine-sanded raking-light finishes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
              <Grid className="w-4 h-4" />
              <span>Suspended T-Bar</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              15/16" & 9/16" acoustic ceilings, ASTM E580 seismic splay wire bracing, and high-NRC mineral tiles.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
              <Volume2 className="w-4 h-4" />
              <span>Fire & Soundproofing</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              1-hr & 2-hr ULC fire separations, RC-1 resilient channels, Roxul AFB, and STC 50–65+ acoustic wall assemblies.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
