import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

/**
 * Détecte si l'utilisateur est sur un vrai appareil mobile
 * Combine la détection tactile (pointer: coarse) et la taille d'écran
 */
export function useIsRealMobile() {
  const [isRealMobile, setIsRealMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkRealMobile = () => {
      // Écran tactile (coarse = doigt, fine = souris)
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      // Petit écran (< 1024px)
      const isSmallScreen = window.innerWidth < TABLET_BREAKPOINT;
      // Combinaison : tactile + petit écran = mobile réel
      setIsRealMobile(isTouchDevice && isSmallScreen);
    };

    checkRealMobile();
    window.addEventListener("resize", checkRealMobile);
    return () => window.removeEventListener("resize", checkRealMobile);
  }, []);

  return isRealMobile;
}
