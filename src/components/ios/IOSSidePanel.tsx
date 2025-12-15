"use client";

/**
 * IOSSidePanel
 * Panneau latéral glissant depuis la droite - style iOS/macOS
 */

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface IOSSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: 'md' | 'lg' | 'xl' | '2xl';
}

const widthClasses = {
  md: 'max-w-md',      // 448px
  lg: 'max-w-lg',      // 512px
  xl: 'max-w-xl',      // 576px
  '2xl': 'max-w-2xl',  // 672px
};

export const IOSSidePanel = ({
  isOpen,
  onClose,
  children,
  width = 'xl'
}: IOSSidePanelProps) => {

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full ${widthClasses[width]} bg-background shadow-2xl z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm
            hover:bg-secondary flex items-center justify-center transition-all
            hover:scale-105 active:scale-95"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Content with scroll */}
        <div className="h-full overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </>
  );
};

export default IOSSidePanel;
