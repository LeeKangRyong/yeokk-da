import { useEffect, useState } from 'react';

/**
 * Configuration for reduced motion fallback
 * Use this when animations should be disabled
 */
export const reducedMotionConfig = {
  initial: false,
  animate: { duration: 0 },
  exit: { duration: 0 },
  transition: { duration: 0 },
};

/**
 * Hook to detect if user prefers reduced motion
 * Respects prefers-reduced-motion media query
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Get 3D effect intensity based on screen size
 * Reduces intensity on smaller screens for better performance
 */
export function get3DIntensity() {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth < 640) return 0.5;  // Mobile: 50% intensity
  if (window.innerWidth < 1024) return 0.75; // Tablet: 75% intensity
  return 1; // Desktop: 100% intensity
}
