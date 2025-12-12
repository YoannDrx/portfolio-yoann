'use client';

import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Icône WiFi barré avec gradient */}
        <div className="relative mx-auto mb-8">
          {/* Glow effect */}
          <div className="absolute inset-0 w-28 h-28 mx-auto bg-gradient-to-br from-[#0070F3]/30 to-[#00C4CC]/20 rounded-full blur-xl" />

          {/* Icon container */}
          <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#0070F3] to-[#00C4CC] flex items-center justify-center shadow-lg">
            <WifiOff className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#1D1D1F] mb-3">
          Vous êtes hors ligne
        </h1>

        {/* Description */}
        <p className="text-[#86868B] mb-8 leading-relaxed">
          Impossible de charger cette page.
          <br />
          Vérifiez votre connexion internet.
        </p>

        {/* Retry button */}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0070F3] hover:bg-[#0062D9] text-white rounded-xl font-semibold transition-colors shadow-lg shadow-[#0070F3]/25"
        >
          <RefreshCw className="w-5 h-5" />
          Réessayer
        </button>

        {/* Info */}
        <div className="mt-12 p-4 bg-white/60 rounded-2xl border border-[#E5E5E7]">
          <p className="text-sm text-[#86868B]">
            <span className="font-medium text-[#1D1D1F]">Astuce :</span>
            {' '}Les pages déjà visitées sont disponibles hors ligne.
          </p>
        </div>

        {/* Branding */}
        <p className="mt-8 text-xs text-[#C7C7CC]">
          Yoann Andrieux • Portfolio
        </p>
      </div>
    </div>
  );
}
