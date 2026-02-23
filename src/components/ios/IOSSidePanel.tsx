"use client";

/**
 * IOSSidePanel
 * Panneau latéral glissant depuis la droite - style iOS/macOS
 */

import { useEffect, useCallback, useRef } from 'react';
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

  const panelRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  const handleFocusTrap = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    if (!panelRef.current) return;

    const focusableElements = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusableArray = Array.from(focusableElements) as HTMLElement[];

    if (focusableArray.length === 0) return;

    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = focusableArray.indexOf(activeElement);

    if (e.shiftKey) {
      if (currentIndex <= 0) {
        e.preventDefault();
        focusableArray[focusableArray.length - 1].focus();
      }
    } else {
      if (currentIndex >= focusableArray.length - 1) {
        e.preventDefault();
        focusableArray[0].focus();
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      const closeButton = panelRef.current?.querySelector('button');
      closeButton?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-panel-title"
        onKeyDown={handleFocusTrap}
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
