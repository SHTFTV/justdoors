import React, { useState, useMemo } from 'react';
import { 
  MunicipalityData, 
  MUNICIPALITIES_LIST 
} from '../data/municipalitiesData';
import { 
  Building2, 
  MapPin, 
  Search, 
  Flame, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Calculator,
  Layers,
  Grid
} from 'lucide-react';

interface MunicipalDirectorySectionProps {
  onSelectMunicipality: (muni: MunicipalityData) => void;
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
}

export const MunicipalDirectorySection: React.FC<MunicipalDirectorySectionProps> = ({
  onSelectMunicipality,
  onOpenQuoteModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filtered list
  const filteredMunicipalities = useMemo(() => {
    return MUNICIPALITIES_LIST.filter(m => {
      const matchesSearch = 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.officialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.neighborhoods.some(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'mvrd') return m.regionalDistrict.includes('Metro Vancouver');
      if (selectedFilter === 'fvrd') return m.regionalDistrict.includes('Fraser Valley');
      if (selectedFilter === 'urban') return m.subRegion === 'Major Urban Core & Inner Suburbs';
      if (selectedFilter === 'north-shore') return m.subRegion === 'North Shore & Sea-to-Sky';
      if (selectedFilter === 'tri-cities') return m.subRegion === 'Tri-Cities & Ridge Meadows';
      if (selectedFilter === 'south-fraser') return m.subRegion === 'South of Fraser';
      if (selectedFilter === 'fraser-valley') return m.subRegion === 'Fraser Valley Regional District';

      return true;
    });
  }, [searchQuery, selectedFilter]);

  // Alphabetical list for quick reference table
  const alphabeticalList = useMemo(() => {
    return [...MUNICIPALITIES_LIST].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <section id="municipal-directory" className="py-24 bg-neutral-950 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>LOWER MAINLAND MUNICIPAL NETWORK (28 JURISDICTIONS)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Local Building Codes, Fire Separations & Drywall Specs by Municipality
          </h2>

          <p className="text-base text-neutral-300 leading-relaxed">
            The Lower Mainland encompasses two regional districts: <strong className="text-white">Metro Vancouver (MVRD - 21 Municipalities + 1 Treaty First Nation)</strong> and the <strong className="text-white">Fraser Valley Regional District (FVRD - 6 Municipalities)</strong>. Explore hyper-local municipal permit protocols, fire hall life-safety standards, microclimate mud curing parameters, and 2026 trade price matrices for every jurisdiction from West Vancouver to Hope.
          </p>
        </div>

        {/* Global Lead Capture Header Banner (Start a Project with Mason) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                START A PROJECT — LET'S PRICE YOUR SCOPE
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Send drawings, a site address, or just a quick note about what you're building in any of the 28 Lower Mainland municipalities. Mason responds personally within one business day.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
                <a 
                  href="tel:7787732790" 
                  className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Phone: 778-773-2790</span>
                </a>
                <span className="text-neutral-600">•</span>
                <a 
                  href="mailto:rambowallceiling@gmail.com" 
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Email: rambowallceiling@gmail.com</span>
                </a>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400">
                  Service Area: West Vancouver to Abbotsford & Hope
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onOpenQuoteModal('commercial')}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
              >
                <span>Send Scope to Mason</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, neighborhood, or code..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'cards' 
                    ? 'bg-amber-500 text-neutral-950' 
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Cards View ({filteredMunicipalities.length})</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-amber-500 text-neutral-950' 
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Alphabetical Directory (28)</span>
              </button>
            </div>

          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {[
              { id: 'all', label: 'All Jurisdictions (28)' },
              { id: 'mvrd', label: 'Metro Vancouver (22)' },
              { id: 'fvrd', label: 'Fraser Valley (6)' },
              { id: 'urban', label: 'Major Urban Core (4)' },
              { id: 'north-shore', label: 'North Shore & Sea-to-Sky (5)' },
              { id: 'tri-cities', label: 'Tri-Cities & Ridge Meadows (7)' },
              { id: 'south-fraser', label: 'South of Fraser (6)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedFilter === f.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode: Cards Grid */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMunicipalities.map((muni) => (
              <div
                key={muni.id}
                onClick={() => onSelectMunicipality(muni)}
                className="p-6 rounded-3xl bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-5 relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {muni.regionalDistrict.split(' ')[0]}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {muni.classification}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                      <span>{muni.name}</span>
                      <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      {muni.subRegion} • Pop. {muni.population}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 text-xs border-t border-neutral-800">
                    <div className="flex items-start gap-2">
                      <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-neutral-300 truncate">{muni.cityHall.name}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-neutral-300 truncate">{muni.fireDepartment.name}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-neutral-400 text-[11px] truncate">
                        {muni.neighborhoods.map(n => n.name).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">
                    L4 Drywall: <strong className="text-white">{muni.pricingMatrix.drywallHangTapeSqFt}/sqft</strong>
                  </span>
                  <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
                    <span>View City Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode: Alphabetical Quick Reference Table */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto rounded-3xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Municipality</th>
                  <th className="p-4">Regional District</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4">Sub-Region</th>
                  <th className="p-4">City Hall & Permit Desk</th>
                  <th className="p-4">Fire Department</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {alphabeticalList.map((muni) => (
                  <tr 
                    key={muni.id}
                    onClick={() => onSelectMunicipality(muni)}
                    className="hover:bg-neutral-850/60 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 font-bold text-white group-hover:text-amber-300">
                      {muni.name}
                    </td>
                    <td className="p-4 text-amber-400">
                      {muni.regionalDistrict.split(' ')[0]}
                    </td>
                    <td className="p-4 text-neutral-400">
                      {muni.classification}
                    </td>
                    <td className="p-4 text-neutral-300">
                      {muni.subRegion}
                    </td>
                    <td className="p-4 text-neutral-400 max-w-xs truncate">
                      {muni.cityHall.name}
                    </td>
                    <td className="p-4 text-neutral-400 max-w-xs truncate">
                      {muni.fireDepartment.name}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectMunicipality(muni);
                        }}
                        className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-amber-300 border border-neutral-700 font-bold transition-all text-xs"
                      >
                        Open Page
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
