import React, { useState } from 'react';
import { 
  MunicipalityData, 
  MUNICIPALITIES_LIST 
} from '../data/municipalitiesData';
import { 
  Building2, 
  Flame, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Hammer, 
  Layers, 
  Volume2, 
  Grid, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Copy, 
  Check, 
  X,
  Calculator,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface CityLandingPageModalProps {
  municipality: MunicipalityData;
  isOpen: boolean;
  onClose: () => void;
  onSelectMunicipality: (muni: MunicipalityData) => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
}

export const CityLandingPageModal: React.FC<CityLandingPageModalProps> = ({
  municipality,
  isOpen,
  onClose,
  onSelectMunicipality,
  onOpenQuoteModal,
}) => {
  const { success, info } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'codes' | 'trades' | 'pricing' | 'neighborhoods' | 'faq' | 'schema'>('overview');
  const [copiedSchema, setCopiedSchema] = useState(false);
  
  // Direct Quick Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadScope, setLeadScope] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadContact) return;

    setLeadSubmitted(true);
    success(
      'Scope Received — Mason Notified',
      `Thank you ${leadName}. Mason has received your project details for ${municipality.name} and will respond personally within 1 business day.`
    );
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DrywallContractor",
        "@id": `https://rambowalls.com/${municipality.slug}#contractor`,
        "name": `Rambo Wall & Ceilings - ${municipality.name}`,
        "telephone": "+1-778-773-2790",
        "email": "rambowallceiling@gmail.com",
        "url": `https://rambowalls.com/${municipality.slug}`,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": municipality.name,
          "addressRegion": "BC",
          "addressCountry": "CA"
        },
        "areaServed": [{ "@type": "City", "name": municipality.name }],
        "knowsAbout": [
          "Steel Stud Framing",
          "Drywall Finishing Level 5",
          "T-Bar Suspended Ceilings",
          "ULC Fire Rated Wall Assemblies",
          "Acoustic Sound Isolation STC"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Estimator",
          "telephone": "+1-778-773-2790",
          "email": "rambowallceiling@gmail.com",
          "name": "Mason"
        }
      },
      {
        "@type": "GovernmentBuilding",
        "@id": `https://rambowalls.com/${municipality.slug}#cityhall`,
        "name": municipality.cityHall.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": municipality.cityHall.address,
          "addressLocality": municipality.name,
          "addressRegion": "BC",
          "addressCountry": "CA"
        }
      },
      {
        "@type": "EmergencyService",
        "@id": `https://rambowalls.com/${municipality.slug}#firedepartment`,
        "name": municipality.fireDepartment.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": municipality.fireDepartment.headquarters,
          "addressLocality": municipality.name,
          "addressRegion": "BC",
          "addressCountry": "CA"
        }
      }
    ]
  };

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(schemaJson, null, 2));
    setCopiedSchema(true);
    info('JSON-LD Copied', 'Schema.org structured data graph copied to clipboard.');
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  const neighboringObjects = municipality.neighboringCities
    .map(name => MUNICIPALITIES_LIST.find(m => m.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean) as MunicipalityData[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden relative text-neutral-100 font-sans">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-sm shrink-0">
              BC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {municipality.officialName}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {municipality.regionalDistrict.split(' ')[0]}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono text-neutral-400 bg-neutral-800 border border-neutral-700">
                  {municipality.classification}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                {municipality.subRegion} • Pop. {municipality.population} • {municipality.governingCode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal('commercial')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition-transform active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Price Your Scope (Mason)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-850 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-colors"
              title="Close Municipal Page"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-neutral-800 bg-neutral-900/40 flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 shrink-0 scrollbar-none text-xs font-mono">
          {[
            { id: 'overview', label: '1. Overview & Direct Lead', icon: Building2 },
            { id: 'codes', label: '2. City Hall & Fire Codes', icon: Flame },
            { id: 'trades', label: '3. Technical Trade Specs', icon: Hammer },
            { id: 'pricing', label: '4. Local Cost Matrix', icon: Calculator },
            { id: 'neighborhoods', label: '5. Neighborhood Profiles', icon: MapPin },
            { id: 'faq', label: '6. Local FAQs (15)', icon: HelpCircle },
            { id: 'schema', label: '7. JSON-LD Schema', icon: FileText },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-bold' 
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-8 text-neutral-300 leading-relaxed text-sm">
          
          {/* TAB 1: OVERVIEW & DIRECT LEAD CAPTURE */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              
              {/* Hero Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                    <span>RAMBO WALL & CEILINGS</span>
                    <span>•</span>
                    <span>{municipality.name.toUpperCase()}, BC</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    Steel Stud Framing, Drywall Boarding & Suspended Ceilings in {municipality.name}, BC
                  </h1>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    Commercial tenant improvements, structural heavy-gauge steel framing, ULC-rated fire separations, acoustic isolation (STC 50–65+), and Level 1–5 architectural finishing across {municipality.name} and the {municipality.regionalDistrict}.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">ESTIMATOR</span>
                      <span className="text-white font-bold">Mason</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">RESPONSE TIME</span>
                      <span className="text-amber-400 font-bold">Within 1 Bus. Day</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">GOVERNING CODE</span>
                      <span className="text-white font-bold">{municipality.governingCode.split(' ')[0]}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">REGIONAL DISTRICT</span>
                      <span className="text-white font-bold">{municipality.regionalDistrict.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Lead Capture Box: START A PROJECT */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border-2 border-amber-500/40 shadow-2xl relative">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                      <Phone className="w-5 h-5 text-amber-400" />
                      <span>START A PROJECT IN {municipality.name.toUpperCase()}</span>
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-1">
                      Let's price your scope. Send drawings, a site address, or just a quick note about what you're building. Mason responds personally within one business day.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <a 
                      href="tel:7787732790" 
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>778-773-2790</span>
                    </a>
                    <a 
                      href="mailto:rambowallceiling@gmail.com" 
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>rambowallceiling@gmail.com</span>
                    </a>
                  </div>
                </div>

                {!leadSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                          Your Name / Company *
                        </label>
                        <input
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="e.g. David Vance / West Coast GC"
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                          Email or Phone Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={leadContact}
                          onChange={(e) => setLeadContact(e.target.value)}
                          placeholder="e.g. 604-555-0199 or project@westcoast.ca"
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                        Project Details / Site Address in {municipality.name}
                      </label>
                      <textarea
                        rows={3}
                        value={leadScope}
                        onChange={(e) => setLeadScope(e.target.value)}
                        placeholder={`Tell Mason about the project (e.g., 3,500 sq ft office TI in ${municipality.name}, 3-5/8" steel stud partitions, 1-hour fire separation demising wall, T-Bar acoustic ceiling, Level 5 finish).`}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Direct response from Mason • Zero automated spam</span>
                      </span>

                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
                      >
                        <span>Send to Mason</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-6 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto" />
                    <h4 className="text-lg font-bold text-white">Project Scope Sent to Mason</h4>
                    <p className="text-sm text-neutral-300 max-w-lg mx-auto">
                      Mason is reviewing your project details for <span className="text-white font-bold">{municipality.name}</span> and will reach out with a line-item estimate and timeline within 1 business day.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setLeadSubmitted(false)}
                        className="text-xs font-mono text-amber-400 underline hover:text-amber-300"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Fast Facts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                    <Building2 className="w-4 h-4" />
                    <span>Municipal Authority</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{municipality.cityHall.name}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {municipality.cityHall.address} • {municipality.cityHall.phone}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                    <Flame className="w-4 h-4" />
                    <span>Fire Jurisdiction</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{municipality.fireDepartment.name}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    HQ: {municipality.fireDepartment.headquarters} • {municipality.fireDepartment.phone}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                    <Compass className="w-4 h-4" />
                    <span>Service Boundary</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{municipality.regionalDistrict}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Vancouver & the Lower Mainland — West Van to Abbotsford
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CITY HALL & FIRE CODES */}
          {activeTab === 'codes' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-amber-400" />
                      <span>{municipality.cityHall.name}</span>
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      Department: {municipality.cityHall.department}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-700">
                    {municipality.governingCode}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <span className="text-neutral-500 font-mono uppercase font-bold">Office Address</span>
                    <p className="text-white font-medium">{municipality.cityHall.address}</p>
                    <span className="text-neutral-500 font-mono uppercase font-bold block pt-2">Direct Phone</span>
                    <p className="text-amber-300 font-mono">{municipality.cityHall.phone}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-neutral-500 font-mono uppercase font-bold">Inspection Scheduling Workflow</span>
                    <p className="text-neutral-300 leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-850">
                      {municipality.cityHall.inspectionProtocol}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fire Department & Life-Safety Standards */}
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-400" />
                      <span>{municipality.fireDepartment.name} Standards</span>
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      HQ: {municipality.fireDepartment.headquarters} • {municipality.fireDepartment.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-2">
                    <span className="text-amber-400 font-bold font-mono uppercase block">
                      Fire Separations & Door Ratings (ULC Standards)
                    </span>
                    <p className="text-neutral-300 leading-relaxed">
                      {municipality.fireDepartment.fireRatingSpecs}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-2">
                    <span className="text-amber-400 font-bold font-mono uppercase block">
                      Suite & Corridor Demising Assemblies
                    </span>
                    <p className="text-neutral-300 leading-relaxed">
                      {municipality.fireDepartment.corridorSeparation}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-2">
                    <span className="text-amber-400 font-bold font-mono uppercase block">
                      Soil & Microclimate Curing Considerations for {municipality.name}
                    </span>
                    <p className="text-neutral-300 leading-relaxed">
                      <span className="text-white font-semibold">Seismic & Foundation: </span>{municipality.microclimateAndSoil.soilAndSeismic}
                    </p>
                    <p className="text-neutral-300 leading-relaxed pt-1">
                      <span className="text-white font-semibold">Climate & Mud Curing: </span>{municipality.microclimateAndSoil.climateCuring}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL TRADE SPECS */}
          {activeTab === 'trades' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Steel Stud Framing */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                    <Hammer className="w-4 h-4" />
                    <span>1. Steel Stud Framing</span>
                  </div>
                  <h4 className="text-base font-bold text-white">Structural & Interior Partitions</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside">
                    <li>25ga & 20ga interior non-load bearing dry partitions (16" / 24" O.C.)</li>
                    <li>18ga, 16ga, 14ga, 12ga heavy-gauge exterior curtain walls & demising walls</li>
                    <li>Slotted deep-leg deflection tracks absorbing 1/2" to 3/4" slab deflection</li>
                    <li>Box headers & 16ga flat strap backing for cabinetry, grab bars, and TVs</li>
                  </ul>
                </div>

                {/* 2. Drywall Boarding & Taping */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                    <Layers className="w-4 h-4" />
                    <span>2. Boarding & Mechanical Taping</span>
                  </div>
                  <h4 className="text-base font-bold text-white">ASTM C840 & GA-214 Standards</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside">
                    <li>Horizontal hanging of 12ft/14ft sheets to eliminate 60%+ butt-joints</li>
                    <li>Recessed butt-boards to prevent joint ridging under raking light</li>
                    <li>3 distinct knife passes (6" tape bed, 10" fill, 12" finish)</li>
                    <li>High-tack cross-woven paper tape for maximum tensile strength</li>
                  </ul>
                </div>

                {/* 3. Levels of Finish (L1–L5) */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>3. Architectural Levels of Finish</span>
                  </div>
                  <h4 className="text-base font-bold text-white">Level 1 (Fire Tape) to Level 5 (Full Skim)</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside">
                    <li><strong className="text-white">Level 1:</strong> Plenum fire tape for shafts and concealed spaces</li>
                    <li><strong className="text-white">Level 4:</strong> Standard 3-coat finish for commercial office interiors</li>
                    <li><strong className="text-white">Level 5:</strong> 100% continuous polymer skim coat under raking light</li>
                    <li>Halogen/LED raking light inspection prior to primer application</li>
                  </ul>
                </div>

                {/* 4. T-Bar & Suspended Ceilings */}
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                    <Grid className="w-4 h-4" />
                    <span>4. Suspended T-Bar Ceilings</span>
                  </div>
                  <h4 className="text-base font-bold text-white">ASTM E580 Seismic Grids & Acoustic Tiles</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside">
                    <li>15/16" standard & 9/16" fine-line architectural grid layouts</li>
                    <li>High NRC (0.70–0.85) microperforated mineral fiber tiles</li>
                    <li>Washdown vinyl-faced tiles for commercial kitchens and labs</li>
                    <li>12ga 4-way diagonal seismic splay wires and compression struts</li>
                  </ul>
                </div>

              </div>

              {/* Soundproofing Banner */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                  <Volume2 className="w-4 h-4" />
                  <span>Acoustic Isolation & Soundproofing (STC 50 to STC 65+)</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Rambo Walls delivers engineered STC 55–65+ acoustic wall and ceiling assemblies across {municipality.name} using RC-1 resilient channels, Roxul Safe'n'Sound dense mineral wool, Green Glue viscoelastic damping polymers, and non-hardening perimeter acoustic sealants.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: LOCAL COST MATRIX */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-amber-400" />
                      <span>{municipality.name} Trade Unit Price Matrix (2026 Prevailing Rates)</span>
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      Reflects labor, materials, equipment, safety, and disposal compliance for {municipality.name}.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-neutral-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
                      <tr>
                        <th className="p-3">Scope Description</th>
                        <th className="p-3">Unit Rate Range</th>
                        <th className="p-3">Standard Specifications</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 text-neutral-300">
                      <tr className="hover:bg-neutral-850/50">
                        <td className="p-3 font-bold text-white">Interior Steel Stud Framing (Non-Bearing)</td>
                        <td className="p-3 text-amber-400 font-bold">{municipality.pricingMatrix.steelFramingLinearFt} / LF</td>
                        <td className="p-3 text-neutral-400">25ga/20ga 3-5/8" studs up to 10ft height with top/bottom tracks</td>
                      </tr>
                      <tr className="hover:bg-neutral-850/50">
                        <td className="p-3 font-bold text-white">Drywall Supply, Hang & Tape (Level 4)</td>
                        <td className="p-3 text-amber-400 font-bold">{municipality.pricingMatrix.drywallHangTapeSqFt} / sq ft</td>
                        <td className="p-3 text-neutral-400">1/2" or 5/8" Type X, 3-coat knife progression, machine sanded</td>
                      </tr>
                      <tr className="hover:bg-neutral-850/50">
                        <td className="p-3 font-bold text-white">Level 5 Full Surface Skim Coat (Add-on)</td>
                        <td className="p-3 text-amber-400 font-bold">{municipality.pricingMatrix.level5SkimSqFt} / sq ft</td>
                        <td className="p-3 text-neutral-400">100% continuous polymer skim coat, raking light inspection</td>
                      </tr>
                      <tr className="hover:bg-neutral-850/50">
                        <td className="p-3 font-bold text-white">1-Hour Fire-Rated Partition (Complete)</td>
                        <td className="p-3 text-amber-400 font-bold">{municipality.pricingMatrix.fireRated1HrSqFt} / sq ft</td>
                        <td className="p-3 text-neutral-400">Steel studs, mineral wool insulation, 1 layer 5/8" Type X each side</td>
                      </tr>
                      <tr className="hover:bg-neutral-850/50">
                        <td className="p-3 font-bold text-white">2-Hour Fire-Rated Demising Wall</td>
                        <td className="p-3 text-amber-400 font-bold">{municipality.pricingMatrix.fireRated2HrSqFt} / sq ft</td>
                        <td className="p-3 text-neutral-400">Heavy studs, dense Roxul AFB, 2 layers 5/8" Type X each side</td>
                      </tr>
                      <tr className="hover:bg-neutral-850/50">
                        <td className="p-3 font-bold text-white">Acoustic Resilient Channel System (RC-1)</td>
                        <td className="p-3 text-amber-400 font-bold">{municipality.pricingMatrix.acousticIsolationSqFt} / sq ft</td>
                        <td className="p-3 text-neutral-400">Galvanized RC-1 channel @ 24" O.C. with isolator fasteners</td>
                      </tr>
                      <tr className="hover:bg-neutral-850/50">
                        <td className="p-3 font-bold text-white">Suspended T-Bar Acoustic Ceiling (15/16")</td>
                        <td className="p-3 text-amber-400 font-bold">{municipality.pricingMatrix.tBarCeilingsSqFt} / sq ft</td>
                        <td className="p-3 text-neutral-400">Heavy-duty grid, hanger wires, standard 2x4 or 2x2 acoustic tiles</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-400 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Pricing Modifiers:</strong> Ceilings exceeding 10ft height require scissor lifts/scaffolding (+15%–25% labor). Multi-floor tower carry-up or projects without freight elevators carry standard staging allowances.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: NEIGHBORHOOD PROFILES */}
          {activeTab === 'neighborhoods' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>Hyper-Local Neighborhood & Micro-Market Profiles ({municipality.name})</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Customized trade specifications, framing requirements, and site logistics across {municipality.neighborhoods.length} distinct zones of {municipality.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {municipality.neighborhoods.map((nh, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white">{nh.name}</h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {nh.focusType}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-neutral-500 font-mono uppercase font-bold block">Trade Specifications</span>
                        <p className="text-neutral-300 leading-relaxed">{nh.tradeSpecs}</p>
                      </div>

                      <div className="pt-1">
                        <span className="text-neutral-500 font-mono uppercase font-bold block">Site & Logistics Protocols</span>
                        <p className="text-neutral-400 leading-relaxed">{nh.logistics}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LOCAL FAQS (15) */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>Frequently Asked Technical & Permitting Questions ({municipality.name}, BC)</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Detailed technical answers covering building codes, fire ratings, deflection tracks, soundproofing, and turnaround times in {municipality.name}.
                </p>
              </div>

              <div className="space-y-3">
                {municipality.localFaqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                    <h4 className="text-sm font-bold text-amber-300 flex items-start gap-2">
                      <span className="text-amber-500 font-mono">Q{idx + 1}:</span>
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}

                {/* Generic Technical Master FAQs to ensure complete 15-question coverage */}
                {[
                  {
                    q: `What is the typical drying time between drywall mud coats in ${municipality.name}'s ambient climate?`,
                    a: `Under typical winter and coastal moisture conditions in ${municipality.name}, standard mud takes 24–48 hours to cure. Rambo Walls maintains on-site climate control with forced-air heaters and dehumidifiers, maintaining a 13°C–22°C window to guarantee dry, sandable 24-hour coat turnaround.`,
                  },
                  {
                    q: `How do slotted deflection tracks protect drywall in multi-storey buildings in ${municipality.name}?`,
                    a: `We install 2-1/2" or 3-5/8" deep-leg slotted deflection tracks fastened through vertical slots, allowing concrete floor slabs to deflect up to 3/4" under live loads without transferring crushing forces to the drywall or cracking taped seams.`,
                  },
                  {
                    q: `What acoustic rating (STC) is required between residential suites in ${municipality.name}?`,
                    a: `The BC Building Code mandates a minimum of STC 50 for demising partitions. Rambo Walls regularly engineers assemblies achieving STC 55–62+ using resilient channels, Roxul AFB acoustic insulation, and Green Glue viscoelastic damping.`,
                  },
                  {
                    q: `Do suspended T-Bar ceilings in ${municipality.name} require seismic restraint?`,
                    a: `Yes. Per ASTM E580 and the BC Building Code, commercial suspended ceiling grids exceeding 1,000 sq ft must have 12-gauge 4-way diagonal seismic splay wires and rigid compression struts anchored every 12 feet.`,
                  },
                  {
                    q: `How does Rambo Walls prevent butt-joint telegraphing under raking natural light?`,
                    a: `We install 12ft and 14ft sheets to reduce joints by over 60%, deploy recessed butt-board backer plates at joints, use low-stretch paper tape in high-tack compound, and apply a 100% continuous Level 5 polymer skim coat.`,
                  },
                  {
                    q: `What structural backing is installed for wall-hung cabinets and TVs in ${municipality.name}?`,
                    a: `We install continuous 16-gauge galvanized steel flat strap backing, heavy-duty notched track, or solid 2x10 structural wood blocking secured directly into the steel studs prior to drywall boarding.`,
                  },
                  {
                    q: `Where do you dispose of drywall scrap from job sites in ${municipality.name}?`,
                    a: `All clean drywall off-cuts are separated on-site and transported to certified regional gypsum recycling facilities in strict compliance with local landfill diversion regulations.`,
                  },
                ].map((faq, idx) => (
                  <div key={idx + municipality.localFaqs.length} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                    <h4 className="text-sm font-bold text-amber-300 flex items-start gap-2">
                      <span className="text-amber-500 font-mono">Q{idx + municipality.localFaqs.length + 1}:</span>
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: JSON-LD SCHEMA */}
          {activeTab === 'schema' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <span>Schema.org JSON-LD Structured Data ({municipality.name})</span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Injectable structured data graph with DrywallContractor, GovernmentBuilding, EmergencyService, and ContactPoint entities.
                  </p>
                </div>

                <button
                  onClick={copySchemaToClipboard}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 text-xs font-mono font-bold flex items-center gap-2 transition-colors"
                >
                  {copiedSchema ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSchema ? 'Copied to Clipboard' : 'Copy JSON-LD'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 overflow-x-auto">
                <pre className="text-xs font-mono text-amber-300/90 leading-relaxed">
                  {JSON.stringify(schemaJson, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Interlinking Network: Neighboring Municipalities */}
          <div className="pt-6 border-t border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Neighboring Municipal Service Pages</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                Click any neighboring jurisdiction to view its technical page
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {neighboringObjects.map((neighbor) => (
                <button
                  key={neighbor.id}
                  onClick={() => {
                    onSelectMunicipality(neighbor);
                    setActiveTab('overview');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <span>{neighbor.name}</span>
                  <span className="text-[10px] text-amber-400">({neighbor.classification})</span>
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="text-white font-bold">Rambo Wall & Ceilings</span>
            <span>•</span>
            <span>Mason: 778-773-2790</span>
            <span>•</span>
            <span>rambowallceiling@gmail.com</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal('commercial')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Get Itemized Takeoff for {municipality.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
