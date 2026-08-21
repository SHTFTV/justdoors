import React from 'react';
import { ArrowRight, Camera, Building2 } from 'lucide-react';
import { MunicipalityData } from '../data/municipalitiesData';

interface ProjectsSectionProps {
  onOpenQuoteModal: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onOpenScheduleModal: () => void;
  onSelectMunicipality?: (muni: MunicipalityData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenQuoteModal, onOpenScheduleModal }) => {
  return (
    <section id="projects" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-[0.2em] mb-4">
            <Camera className="w-4 h-4" /> Project Library
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Real project case studies are being added.
          </h2>
          <p className="mt-5 text-neutral-300 text-lg leading-relaxed">
            Just Doors will publish completed-project photos, scopes and technical details only when the project information is documented and approved for publication. Until then, we are not using stock photography, invented budgets, fabricated testimonials or unsupported inspection claims as project proof.
          </p>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Need to price a live project now? Send the drawings, door schedule, opening list or project details. We can review the actual scope instead of forcing it into a made-up case study.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onOpenScheduleModal()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold px-5 py-3 transition-colors"
            >
              <Building2 className="w-4 h-4" /> Send a Door Schedule
            </button>
            <button
              onClick={() => onOpenQuoteModal('commercial')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 hover:border-amber-500/70 bg-neutral-900 text-white font-bold px-5 py-3 transition-colors"
            >
              Request Project Pricing <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
