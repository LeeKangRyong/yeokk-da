'use client';

import { motion } from 'framer-motion';
import type { ColorPalette } from '@/lib/types/style';

interface HappyAnimationProps {
  colors: ColorPalette;
  intensity: number; // 0-1
}

/**
 * Happy animation theme - bright gradient with floating particles and sparkles
 */
export function HappyAnimation({ colors, intensity }: HappyAnimationProps) {
  const particleCount = Math.floor(30 * intensity);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Bright gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.primary}40, ${colors.secondary}20, transparent)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.accent}30, transparent)`,
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.secondary}40, transparent)`,
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Rising particles */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="happy-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: particleCount }).map((_, i) => {
          const x = Math.random() * 100;
          const startY = 110;
          const endY = -10;
          const size = Math.random() * 4 + 2;
          const delay = Math.random() * 8;
          const duration = Math.random() * 4 + 4;

          return (
            <motion.circle
              key={i}
              cx={`${x}%`}
              r={size}
              fill={i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.accent : colors.secondary}
              filter="url(#happy-glow)"
              initial={{ cy: `${startY}%`, opacity: 0 }}
              animate={{
                cy: [`${startY}%`, `${endY}%`],
                opacity: [0, 1, 1, 0],
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

      {/* Twinkling stars */}
      <svg className="absolute inset-0 h-full w-full">
        {Array.from({ length: Math.floor(20 * intensity) }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 3;

          return (
            <motion.g key={`star-${i}`} opacity={0}>
              {/* Star shape using polygon */}
              <polygon
                points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                fill={colors.accent}
                filter="url(#happy-glow)"
                transform={`translate(${x}%, ${y}%)`}
              />
              <motion.g
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              >
                <polygon
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill={colors.accent}
                  filter="url(#happy-glow)"
                  transform={`translate(${x}%, ${y}%)`}
                />
              </motion.g>
            </motion.g>
          );
        })}
      </svg>

      {/* Pulse effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.primary}20, transparent)`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
