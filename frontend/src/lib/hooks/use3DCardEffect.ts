'use client';

import { useRef, useState, useCallback } from 'react';
import { calculateTilt, calculateLightPosition, TiltAngles, LightPosition } from '../utils/pokemonCard';

interface MousePosition {
  x: number;
  y: number;
}

interface Use3DCardEffectReturn {
  cardRef: React.RefObject<HTMLDivElement | null>;
  mousePosition: MousePosition;
  tiltAngles: TiltAngles;
  lightPosition: LightPosition;
  isHovered: boolean;
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

/**
 * Custom hook for 3D card tilt effect
 * Tracks mouse position and calculates tilt angles and light reflection
 *
 * @param maxTilt - Maximum tilt angle in degrees (default: 15)
 * @returns Card ref, mouse position, tilt angles, light position, and event handlers
 */
export function use3DCardEffect(maxTilt: number = 15): Use3DCardEffectReturn {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [tiltAngles, setTiltAngles] = useState<TiltAngles>({ rotateX: 0, rotateY: 0 });
  const [lightPosition, setLightPosition] = useState<LightPosition>({ x: '50%', y: '50%' });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Update mouse position
      setMousePosition({ x: mouseX, y: mouseY });

      // Calculate tilt angles
      const angles = calculateTilt(mouseX, mouseY, rect, maxTilt);
      setTiltAngles(angles);

      // Calculate light position
      const light = calculateLightPosition(mouseX, mouseY, rect);
      setLightPosition(light);
    },
    [maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Reset to center position
    setTiltAngles({ rotateX: 0, rotateY: 0 });
    setLightPosition({ x: '50%', y: '50%' });
  }, []);

  return {
    cardRef,
    mousePosition,
    tiltAngles,
    lightPosition,
    isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
