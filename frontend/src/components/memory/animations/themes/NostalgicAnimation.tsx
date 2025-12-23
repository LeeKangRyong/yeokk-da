'use client';

import { motion } from 'framer-motion';
import type { ColorPalette } from '@/lib/types/style';

interface NostalgicAnimationProps {
  colors: ColorPalette;
  intensity: number; // 0-1
}

/**
 * Nostalgic animation theme - vignette, slow gradient, film grain, blurred shapes
 */
export function NostalgicAnimation({ colors, intensity }: NostalgicAnimationProps) {
  const shapeCount = Math.floor(8 * intensity);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
        }}
      />

      {/* Slow moving gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${colors.primary}20, ${colors.secondary}30, ${colors.primary}20)`,
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Film grain effect */}
      <svg className="absolute inset-0 h-full w-full opacity-30">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1" />
      </svg>

      {/* Floating blurred shapes */}
      {Array.from({ length: shapeCount }).map((_, i) => {
        const size = Math.random() * 200 + 100;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[40px]"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? colors.primary : colors.secondary
              }20, transparent)`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Slow-moving light orbs */}
      <motion.div
        className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full blur-[60px]"
        style={{
          background: `radial-gradient(circle, ${colors.accent}15, transparent)`,
        }}
        animate={{
          x: [0, 150, 0],
          y: [0, -100, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 h-80 w-80 rounded-full blur-[60px]"
        style={{
          background: `radial-gradient(circle, ${colors.primary}20, transparent)`,
        }}
        animate={{
          x: [0, -120, 0],
          y: [0, 80, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dreamy particles */}
      <svg className="absolute inset-0 h-full w-full opacity-40">
        <defs>
          <filter id="nostalgic-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: Math.floor(15 * intensity) }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = Math.random() * 3 + 1;
          const delay = Math.random() * 8;

          return (
            <motion.circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={size}
              fill={colors.secondary}
              filter="url(#nostalgic-glow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
