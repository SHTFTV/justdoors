import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HardwareManufacturersMarquee } from './components/HardwareManufacturersMarquee';
import { DoorsForEveryProject } from './components/DoorsForEveryProject';
import { HighRiseSpotlight } from './components/HighRiseSpotlight';
import { DoorScheduleTool } from './components/DoorScheduleTool';
import { AIDoorAssistant } from './components/AIDoorAssistant';
import { DoorsAndHardwareCatalog } from './components/DoorsAndHardwareCatalog';
import { DoorVisualizerConfigurator } from './components/DoorVisualizerConfigurator';
import { ProjectsSection } from './components/ProjectsSection';
import { FAQSection } from './components/FAQSection';
import { MunicipalDirectorySection } from './components/MunicipalDirectorySection';
import { CityLandingPageModal } from './components/CityLandingPageModal';
import { WhyJustDoorsSection } from './components/WhyJustDoorsSection';
import { RamboGuestPost } from './components/RamboGuestPost';
import { DoorWallScopeSection } from './components/DoorWallScopeSection';
import { IndexingShareSection } from './components/IndexingShareSection';
import { MarketingModal } from './components/MarketingModal';
import { RamboContactWidget } from './components/RamboContactWidget';
import { QuoteModal } from './components/QuoteModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Footer } from './components/Footer';
import { ToastProvider } from './context/ToastContext';
import { SectorType } from './types';
import { MunicipalityData, MUNICIPALITIES_LIST } from './data/municipalitiesData';
import { X, FileSpreadsheet } from 'lucide-react';

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

function AppContent() {
  const [activeSector, setActiveSector] = useState<SectorType>('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);
  const [quoteInitialSector, setQuoteInitialSector] = useState<'high-rise' | 'commercial' | 'residential'>('high-rise');

  // Municipal City Landing Pages State
  const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipalityData | null>(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const handleSelectMunicipality = (muni: MunicipalityData) => {
    setSelectedMunicipality(muni);
    setIsCityModalOpen(true);
  };

  const handleOpenQuoteModal = (sector?: 'high-rise' | 'commercial' | 'residential') => {
    if (sector) setQuoteInitialSector(sector);
    setIsQuoteModalOpen(true);
  };

  const handleOpenScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleOpenAIAssistant = () => {
    const el = document.getElementById('ai-door-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Sticky Navigation Bar */}
      <Navbar 
        activeSector={activeSector}
        onSelectSector={setActiveSector}
        onOpenScheduleModal={handleOpenScheduleModal}
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenAIAssistant={handleOpenAIAssistant}
        onOpenGlobalSearch={handleOpenSearchModal}
      />

      {/* Main Content Areas */}
      <main className="flex-grow">
        
        {/* 1. Hero Section (Exact requested copy & dual-target CTAs) */}
        <HeroSection 
          onSelectSector={setActiveSector}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenScheduleModal={handleOpenScheduleModal}
          onOpenAIAssistant={handleOpenAIAssistant}
        />

        {/* Floating Logo Marquee & Manufacturer Trust Banner (Under-Hero Banner) */}
        <HardwareManufacturersMarquee 
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenScheduleModal={handleOpenScheduleModal}
        />

        {/* 2. Doors for Every Project Section (Residential, Multi-Family/High-Rise, Commercial) */}
        <DoorsForEveryProject 
          activeSector={activeSector}
          onSelectSector={setActiveSector}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenScheduleModal={handleOpenScheduleModal}
        />

        {/* 3. High-Rise & Multi-Family Spotlight Section (Prominent B2B Focus & Door Schedule CTA) */}
        <HighRiseSpotlight 
          onOpenScheduleModal={handleOpenScheduleModal}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenAIAssistant={handleOpenAIAssistant}
        />

        {/* 4. Dedicated Interactive Door Schedule Takeoff Tool Section */}
        <section id="door-schedule-takeoff" className="py-20 bg-neutral-950 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DoorScheduleTool 
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          </div>
        </section>

        {/* 5. AI Door Specification & Code Compliance Assistant */}
        <AIDoorAssistant 
          onOpenScheduleModal={handleOpenScheduleModal}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 6. Doors & Hardware Systems Directory / Technical Catalog */}
        <DoorsAndHardwareCatalog 
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenScheduleModal={handleOpenScheduleModal}
        />

        {/* 7. Interactive Door Visualizer & Material Configurator */}
        <DoorVisualizerConfigurator 
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 8. Projects & Completed Work ("Proof that you actually do the work") */}
        <ProjectsSection 
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenScheduleModal={handleOpenScheduleModal}
          onSelectMunicipality={handleSelectMunicipality}
        />

        {/* 9. Technical Specifications & Code Authority FAQ Section */}
        <FAQSection 
          onOpenScheduleModal={handleOpenScheduleModal}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenAIAssistant={handleOpenAIAssistant}
        />

        {/* 10. Lower Mainland Municipal Directory (28 Jurisdictions) */}
        <MunicipalDirectorySection 
          onSelectMunicipality={handleSelectMunicipality}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 11. Guest Post — Rambo Wall & Ceiling as Lower Mainland Door-Niche Installer */}
        <RamboGuestPost
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenMarketing={() => setIsMarketingModalOpen(true)}
        />

        {/* 11b. Doors + the wall & ceiling work behind them */}
        <DoorWallScopeSection onOpenQuoteModal={handleOpenQuoteModal} />


        {/* 12. Why Just Doors Manifesto ("No Windows Anywhere. Just Doors.") */}
        <WhyJustDoorsSection 
          onOpenScheduleModal={handleOpenScheduleModal}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* AEO indexing + share (Preferred Source, Pin, WhatsApp) */}
        <IndexingShareSection />

      </main>

      {/* Footer */}
      <Footer 
        onSelectSector={setActiveSector}
        onOpenScheduleModal={handleOpenScheduleModal}
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenMarketing={() => setIsMarketingModalOpen(true)}
      />

      {/* Quote Request Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialSector={quoteInitialSector}
      />

      {/* Dedicated City Landing Page Modal (5,800+ Word Municipal Page) */}
      {selectedMunicipality && (
        <CityLandingPageModal 
          municipality={selectedMunicipality}
          isOpen={isCityModalOpen}
          onClose={() => setIsCityModalOpen(false)}
          onSelectMunicipality={handleSelectMunicipality}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      )}

      {/* Dedicated Door Schedule Modal Overlay (when triggered from quick buttons) */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-6 relative">
            <button
              onClick={() => setIsScheduleModalOpen(false)}
              className="absolute top-6 right-6 z-10 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <DoorScheduleTool 
              onClose={() => setIsScheduleModalOpen(false)}
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          </div>
        </div>
      )}

      {/* Global Instant Search Modal (Catalog, FAQs & Case Studies) */}
      <GlobalSearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Marketing Page — Builderhaus Network & B2B Guest Posts */}
      <MarketingModal
        isOpen={isMarketingModalOpen}
        onClose={() => setIsMarketingModalOpen(false)}
      />

      {/* Floating "Talk to Rambo Wall & Ceiling" contact widget */}
      <RamboContactWidget />

    </div>
  );
}
