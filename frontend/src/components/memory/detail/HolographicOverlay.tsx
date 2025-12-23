'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { getHologramGradient, getHologramPattern } from '@/lib/utils/pokemonCard';
import type { ColorPalette, LightPosition } from '@/lib/types/style';

interface HolographicOverlayProps {
  intensity: number; // 0-100
  animationTheme: string;
  colors: ColorPalette;
  lightPosition: LightPosition;
  isHovered: boolean;
}

/**
 * Holographic overlay component for Pokemon TCG card effect
 * Renders rainbow hologram with intensity-based opacity and mouse-following light
 */
export function HolographicOverlay({
  intensity,
  animationTheme,
  colors,
  lightPosition,
  isHovered,
}: HolographicOverlayProps) {
  // Convert intensity (0-100) to normalized value (0-1)
  const normalizedIntensity = useMemo(() => intensity / 100, [intensity]);

  // Get hologram gradient CSS
  const hologramGradient = useMemo(() => {
    const lightX = parseFloat(lightPosition.x);
    const lightY = parseFloat(lightPosition.y);
    return getHologramGradient(normalizedIntensity, lightX, lightY);
  }, [normalizedIntensity, lightPosition]);

  // Get hologram pattern type based on animation theme
  const patternType = useMemo(
    () => getHologramPattern(animationTheme),
    [animationTheme],
  );

  // Calculate base opacity based on intensity
  const baseOpacity = useMemo(() => {
    if (intensity <= 30) return 0.15; // Common - subtle
    if (intensity <= 60) return 0.4; // Rare - moderate
    return 0.7; // Holographic - intense
  }, [intensity]);

  // Hover opacity multiplier
  const hoverOpacity = isHovered ? 1.2 : 0.8;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {/* Main hologram gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: hologramGradient,
          mixBlendMode: 'color-dodge',
        }}
        animate={{
          opacity: baseOpacity * hoverOpacity,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      />

      {/* Hologram pattern overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: isHovered ? baseOpacity * 0.6 : baseOpacity * 0.3,
        }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
        }}
      >
        <HologramPattern
          type={patternType}
          intensity={normalizedIntensity}
          colors={colors}
        />
      </motion.div>

      {/* Animated rainbow shimmer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            45deg,
            rgba(255, 0, 255, 0) 0%,
            rgba(255, 0, 255, ${normalizedIntensity * 0.3}) 25%,
            rgba(0, 255, 255, ${normalizedIntensity * 0.3}) 50%,
            rgba(255, 255, 0, ${normalizedIntensity * 0.3}) 75%,
            rgba(255, 0, 255, 0) 100%
          )`,
          mixBlendMode: 'overlay',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          },
          opacity: {
            duration: 0.3,
          },
        }}
      />
    </div>
  );
}

/**
 * Hologram pattern component - renders different patterns based on animation theme
 */
function HologramPattern({
  type,
  intensity,
  colors,
}: {
  type: 'star' | 'wave' | 'lightning' | 'circle' | 'raindrop';
  intensity: number;
  colors: ColorPalette;
}) {
  const particleCount = Math.floor(20 * intensity);

  switch (type) {
    case 'star':
      return <StarPattern count={particleCount} colors={colors} />;
    case 'wave':
      return <WavePattern intensity={intensity} colors={colors} />;
    case 'lightning':
      return <LightningPattern count={particleCount} colors={colors} />;
    case 'circle':
      return <CirclePattern count={particleCount} colors={colors} />;
    case 'raindrop':
      return <RaindropPattern count={particleCount} colors={colors} />;
    default:
      return null;
  }
}

/**
 * Star sparkle pattern (Happy theme)
 */
function StarPattern({ count, colors }: { count: number; colors: ColorPalette }) {
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {Array.from({ length: count }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 2;
        return (
          <motion.circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={size}
            fill={colors.accent}
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </svg>
  );
}

/**
 * Wave pattern (Nostalgic theme)
 */
function WavePattern({
  intensity,
  colors,
}: {
  intensity: number;
  colors: ColorPalette;
}) {
  return (
    <svg
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,50 Q25,30 50,50 T100,50"
        fill="none"
        stroke={colors.primary}
        strokeWidth="0.5"
        opacity={intensity * 0.5}
        animate={{
          d: [
            'M0,50 Q25,30 50,50 T100,50',
            'M0,50 Q25,70 50,50 T100,50',
            'M0,50 Q25,30 50,50 T100,50',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.path
        d="M0,60 Q25,40 50,60 T100,60"
        fill="none"
        stroke={colors.secondary}
        strokeWidth="0.5"
        opacity={intensity * 0.3}
        animate={{
          d: [
            'M0,60 Q25,40 50,60 T100,60',
            'M0,60 Q25,80 50,60 T100,60',
            'M0,60 Q25,40 50,60 T100,60',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

/**
 * Lightning pattern (Exciting theme)
 */
function LightningPattern({
  count,
  colors,
}: {
  count: number;
  colors: ColorPalette;
}) {
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: count }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 80;
        const height = Math.random() * 20 + 10;
        const delay = Math.random() * 3;
        return (
          <motion.line
            key={i}
            x1={`${x}%`}
            y1={`${y}%`}
            x2={`${x}%`}
            y2={`${y + height}%`}
            stroke={colors.accent}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </svg>
  );
}

/**
 * Circle ripple pattern (Peaceful theme)
 */
function CirclePattern({
  count,
  colors,
}: {
  count: number;
  colors: ColorPalette;
}) {
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: count }).map((_, i) => {
        const cx = Math.random() * 100;
        const cy = Math.random() * 100;
        const delay = Math.random() * 4;
        return (
          <motion.circle
            key={i}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r="0"
            fill="none"
            stroke={colors.primary}
            strokeWidth="0.5"
            initial={{ r: 0, opacity: 0.8 }}
            animate={{
              r: [0, 15],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </svg>
  );
}

/**
 * Raindrop pattern (Melancholy theme)
 */
function RaindropPattern({
  count,
  colors,
}: {
  count: number;
  colors: ColorPalette;
}) {
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: count }).map((_, i) => {
        const x = Math.random() * 100;
        const startY = -10;
        const endY = 110;
        const delay = Math.random() * 5;
        const duration = Math.random() * 2 + 2;
        return (
          <motion.line
            key={i}
            x1={`${x}%`}
            y1={`${startY}%`}
            x2={`${x}%`}
            y2={`${startY + 5}%`}
            stroke={colors.secondary}
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ y1: startY, y2: startY + 5 }}
            animate={{
              y1: [startY, endY],
              y2: [startY + 5, endY + 5],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
          />
        );
      })}
    </svg>
  );
}
