import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Download, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Layers, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectCaseStudy, ProjectGalleryItem } from '../types';

interface ProjectPhotoGalleryModalProps {
  project: ProjectCaseStudy | null;
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
  onOpenQuoteModal?: (sector?: 'high-rise' | 'commercial' | 'residential') => void;
  onDownloadPDF?: (project: ProjectCaseStudy) => void;
}

export const ProjectPhotoGalleryModal: React.FC<ProjectPhotoGalleryModalProps> = ({
  project,
  isOpen,
  initialIndex = 0,
  onClose,
  onOpenQuoteModal,
  onDownloadPDF,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Compile all images (cover + gallery) with fallback captions
  const allImages: ProjectGalleryItem[] = React.useMemo(() => {
    if (!project) return [];

    if (project.galleryDetails && project.galleryDetails.length > 0) {
      return project.galleryDetails;
    }

    const images: ProjectGalleryItem[] = [];
    
    // Primary cover image
    images.push({
      url: project.image,
      caption: `${project.title} — Completed Architectural Opening & Drywall Installation`,
      tag: 'Completed Installation'
    });

    // Gallery images
    if (project.galleryImages && project.galleryImages.length > 0) {
      project.galleryImages.forEach((imgUrl, idx) => {
        let tag = 'Field Installation';
        let caption = `Technical framing, hardware installation, and inspection detail (${idx + 2} of ${project.galleryImages!.length + 1})`;
        
        if (idx === 0) {
          tag = 'Heavy-Gauge Framing & Subframe';
          caption = `Engineered steel stud deflection tracks, rough openings, and ULC fire-rated door subframe preparation.`;
        } else if (idx === 1) {
          tag = 'Hardware & Acoustic Trim';
          caption = `Grade 1 commercial hardware, perimeter acoustic gaskets, and Level 5 finish under raking inspection light.`;
        } else if (idx === 2) {
          tag = 'Final Handover & Sign-Off';
          caption = `Completed architectural entryway with 100% municipal inspection sign-off and zero defect handover.`;
        }

        images.push({
          url: imgUrl,
          caption,
          tag
        });
      });
    }

    return images;
  }, [project]);

  // Sync index when initialIndex or project changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, project]);

  const handleNext = useCallback(() => {
    if (allImages.length <= 1) return;
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const handlePrev = useCallback(() => {
    if (allImages.length <= 1) return;
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !project || allImages.length === 0) return null;

  const currentPhoto = allImages[currentIndex] || allImages[0];

  return (
    <AnimatePresence>
      <div 
        id="project-photo-gallery-lightbox"
        className="fixed inset-0 z-50 flex flex-col bg-neutral-950/95 backdrop-blur-xl text-white select-none overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={`Photo gallery for ${project.title}`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-neutral-800/80 bg-neutral-950/80 z-20 shrink-0">
          
          {/* Project Details / Metadata */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[280px] sm:max-w-md">
                  {project.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase shrink-0">
                  {project.municipalityName || project.location}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-mono shrink-0">
                  {project.sector.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono truncate hidden sm:block">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Controls: Counter, Zoom, PDF, Close */}
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <div className="text-xs font-mono text-neutral-400 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
              <span className="text-amber-400 font-bold">{currentIndex + 1}</span> / {allImages.length}
            </div>

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              aria-label="Toggle image zoom"
            >
              {isZoomed ? <ZoomOut className="w-4 h-4 text-amber-400" /> : <ZoomIn className="w-4 h-4" />}
            </button>

            {onDownloadPDF && (
              <button
                onClick={() => onDownloadPDF(project)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-amber-300 text-xs font-mono font-semibold transition-colors"
                title="Download Project Case Study Report PDF"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>PDF Spec</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-red-500/20 border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-red-400 transition-colors"
              title="Close Gallery (Esc)"
              aria-label="Close photo gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Main Stage: Photo Viewer + Next/Prev Arrow Controls */}
        <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden min-h-0">
          
          {/* Navigation Previous Button */}
          {allImages.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-2xl bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-white hover:text-amber-400 shadow-2xl transition-all hover:scale-105 active:scale-95 group"
              title="Previous Photo (Left Arrow)"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Active Image Canvas with Smooth Animated Transition */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.35 : 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`relative max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ${
                  isZoomed ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption || project.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[62vh] sm:max-h-[68vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl border border-neutral-800/80"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Next Button */}
          {allImages.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-2xl bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-white hover:text-amber-400 shadow-2xl transition-all hover:scale-105 active:scale-95 group"
              title="Next Photo (Right Arrow)"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

        </div>

        {/* Bottom Technical Caption & Thumbnail Strip Drawer */}
        <div className="z-20 border-t border-neutral-800/80 bg-neutral-950/90 p-3 sm:p-4 shrink-0 space-y-3">
          
          {/* Caption & Technical Trade Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-6xl mx-auto">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-[11px] uppercase tracking-wider">
                  {currentPhoto.tag || 'Architectural Specification'}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {project.steelFramingLF ? `${project.steelFramingLF.toLocaleString()} LF Steel Framing` : ''} {project.drywallSqFt ? `• ${project.drywallSqFt.toLocaleString()} sq ft Drywall` : ''}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">
                {currentPhoto.caption}
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex items-center gap-2 shrink-0">
              {onOpenQuoteModal && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuoteModal(project.sector === 'multi-family' ? 'high-rise' : (project.sector as any));
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-md shadow-amber-500/10 transition-transform active:scale-95"
                >
                  <span>Price This Spec</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-thin">
              {allImages.map((img, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsZoomed(false);
                      setCurrentIndex(idx);
                    }}
                    className={`relative w-14 sm:w-20 h-10 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      isActive
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 opacity-100 shadow-lg'
                        : 'border-neutral-800 opacity-50 hover:opacity-80 hover:border-neutral-700'
                    }`}
                    title={img.caption}
                    aria-label={`Switch to photo ${idx + 1}`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-neutral-950/80 text-[9px] font-mono text-center text-neutral-300 py-0.5">
                      {idx + 1}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </AnimatePresence>
  );
};
