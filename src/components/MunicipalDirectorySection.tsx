import React from 'react';
import type { MunicipalityData } from '../data/municipalitiesData';
interface Props { onSelectMunicipality: (municipality: MunicipalityData) => void; onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void; }
const cities = [["abbotsford", "Abbotsford"], ["burnaby", "Burnaby"], ["chilliwack", "Chilliwack"], ["coquitlam", "Coquitlam"], ["delta", "Delta"], ["ladner", "Ladner"], ["langley", "Langley"], ["maple-ridge", "Maple Ridge"], ["mission", "Mission"], ["new-westminster", "New Westminster"], ["north-vancouver", "North Vancouver"], ["pitt-meadows", "Pitt Meadows"], ["port-coquitlam", "Port Coquitlam"], ["port-moody", "Port Moody"], ["richmond", "Richmond"], ["surrey", "Surrey"], ["tsawwassen", "Tsawwassen"], ["vancouver", "Vancouver"], ["west-vancouver", "West Vancouver"], ["white-rock", "White Rock"]];
export const MunicipalDirectorySection: React.FC<Props> = ({ onOpenQuoteModal }) => (
  <section id="municipal-directory" className="py-20 bg-neutral-950 border-b border-neutral-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Door supply and installation coordination across the Lower Mainland</h2>
      <p className="text-neutral-300 max-w-3xl mb-8">Find local planning information for your door package, existing opening or commercial project. Send the site address, opening list and drawings so the scope can be reviewed for your property.</p>
      <nav aria-label="Door service areas" className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cities.map(([slug, name]) => <a key={slug} href={'/' + slug} className="p-4 rounded-xl bg-neutral-900 border border-neutral-700 text-amber-400 hover:border-amber-500">{name}</a>)}
      </nav>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <button onClick={() => onOpenQuoteModal('commercial')} className="bg-amber-500 text-neutral-950 font-bold rounded-xl px-6 py-3">Discuss your door project</button>
        <a href="/emergency-door-window-board-up" className="text-amber-400 underline">Emergency door and window board-up</a>
        <a href="tel:7787732790" className="text-amber-400">778-773-2790</a>
      </div>
    </div>
  </section>
);
