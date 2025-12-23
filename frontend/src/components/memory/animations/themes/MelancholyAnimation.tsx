'use client';

import { motion } from 'framer-motion';
import type { ColorPalette } from '@/lib/types/style';

interface MelancholyAnimationProps {
  colors: ColorPalette;
  intensity: number; // 0-1
}

/**
 * Melancholy animation theme - dark vignette, rain drops, slow gradient, falling particles
 */
export function MelancholyAnimation({ colors, intensity }: MelancholyAnimationProps) {
  const rainDropCount = Math.floor(40 * intensity);
  const fallingLeafCount = Math.floor(12 * intensity);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dark vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />

      {/* Slow gradient shift - blue tones */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${colors.primary}25, ${colors.secondary}30, ${colors.primary}20)`,
          backgroundSize: '100% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Rain drops */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="rainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {Array.from({ length: rainDropCount }).map((_, i) => {
          const x = Math.random() * 100;
          const startY = -10;
          const endY = 110;
          const delay = Math.random() * 5;
          const duration = Math.random() * 1.5 + 1.5;

          return (
            <motion.line
              key={`rain-${i}`}
              x1={`${x}%`}
              y1={`${startY}%`}
              x2={`${x}%`}
              y2={`${startY + 8}%`}
              stroke="url(#rainGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{
                y1: startY,
                y2: startY + 8,
              }}
              animate={{
                y1: [startY, endY],
                y2: [startY + 8, endY + 8],
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

      {/* Falling leaf-like particles */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="melancholy-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {Array.from({ length: fallingLeafCount }).map((_, i) => {
          const startX = Math.random() * 100;
          const startY = -10;
          const endY = 110;
          const swing = Math.random() * 30 - 15;
          const delay = Math.random() * 8;
          const duration = Math.random() * 4 + 6;

          return (
            <motion.ellipse
              key={`leaf-${i}`}
              cx={`${startX}%`}
              cy={`${startY}%`}
              rx="2"
              ry="4"
              fill={colors.accent}
              opacity="0.4"
              filter="url(#melancholy-blur)"
              initial={{
                cy: `${startY}%`,
                cx: `${startX}%`,
              }}
              animate={{
                cy: [`${startY}%`, `${endY}%`],
                cx: [`${startX}%`, `${startX + swing}%`, `${startX}%`],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.6, 0],
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
      </svg>

      {/* Heavy fog/mist effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.primary}10, transparent)`,
        }}
        animate={{
          y: ['-10%', '10%', '-10%'],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dark floating shapes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const size = Math.random() * 200 + 120;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 25 + 20;
        const delay = Math.random() * 12;

        return (
          <motion.div
            key={`shape-${i}`}
            className="absolute rounded-full blur-[50px]"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              background: `radial-gradient(circle, ${colors.primary}15, transparent)`,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 80 - 40, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
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

      {/* Cold ambient light */}
      <motion.div
        className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full blur-[70px]"
        style={{
          background: `radial-gradient(circle, ${colors.secondary}12, transparent)`,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Slow drifting particles */}
      <svg className="absolute inset-0 h-full w-full opacity-30">
        <defs>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: Math.floor(10 * intensity) }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = Math.random() * 2.5 + 1;
          const delay = Math.random() * 10;
          const duration = Math.random() * 8 + 8;

          return (
            <motion.circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={size}
              fill={colors.primary}
              filter="url(#soft-glow)"
              initial={{ opacity: 0 }}
              animate={{
                x: [0, Math.random() * 20 - 10],
                y: [0, 30],
                opacity: [0, 0.5, 0],
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
      </svg>
    </div>
  );
}
