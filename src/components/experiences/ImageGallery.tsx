"use client";

/**
 * ImageGallery
 * Carousel/gallery component for project detail images
 * - Desktop: carousel with lightbox on click
 * - Mobile: vertical stack of images
 */

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  projectName: string;
  gradient?: string;
  emoji?: string;
  /** Force stacked layout (for iPhone mode) */
  forceStackLayout?: boolean;
  /** Custom height class for the container */
  heightClass?: string;
}

export const ImageGallery = ({
  images,
  projectName,
  gradient,
  emoji,
  forceStackLayout = false,
  heightClass = "h-48"
}: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Handle keyboard navigation in lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;

    if (e.key === 'Escape') {
      setLightboxOpen(false);
    } else if (e.key === 'ArrowLeft') {
      setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  }, [lightboxOpen, images.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  if (!images || images.length === 0) {
    // Fallback to gradient with emoji
    return (
      <div className={`h-56 relative overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl">{emoji}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const lightboxPrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Stacked layout for mobile or when forced (iPhone mode)
  const showStackedLayout = forceStackLayout;

  return (
    <>
      {/* Stacked layout: Vertical stack of images (mobile or iPhone mode) */}
      {showStackedLayout ? (
        <div className="space-y-2">
          {images.map((src, index) => (
            <div
              key={index}
              className={`relative ${heightClass} overflow-hidden cursor-pointer rounded-2xl`}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={src}
                alt={`${projectName} - Image ${index + 1}`}
                fill
                className="object-cover object-top"
                sizes="100vw"
                priority={index === 0}
              />
              {/* Zoom indicator */}
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white">
                <ZoomIn className="w-4 h-4" />
              </div>
              {/* Image label */}
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/50 text-white text-xs font-medium">
                {index === 0 ? 'Landing' : 'Dashboard'}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Mobile: Vertical stack of images */}
          <div className="md:hidden">
            <div className="space-y-2">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={src}
                    alt={`${projectName} - Image ${index + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                    priority={index === 0}
                  />
                  {/* Zoom indicator */}
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  {/* Gradient overlay on last image only */}
                  {index === images.length - 1 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Carousel with click to open lightbox */}
          <div className="hidden md:block h-56 relative overflow-hidden group">
        {/* Current Image - clickable */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => openLightbox(currentIndex)}
        >
          <Image
            src={images[currentIndex]}
            alt={`${projectName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="576px"
            priority
          />
          {/* Zoom indicator on hover */}
          <div className="absolute top-3 left-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ZoomIn className="w-4 h-4" />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

        {/* Navigation arrows - only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 z-10"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 z-10"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot indicators - only show if multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 text-white text-xs font-medium z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
        </>
      )}

      {/* Lightbox Modal - rendered via portal to escape side panel */}
      {lightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
              {lightboxIndex + 1} / {images.length}
            </div>
          )}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Main image */}
          <div
            className="relative w-[90vw] h-[85vh] max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${projectName} - Image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    index === lightboxIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
};

export default ImageGallery;
