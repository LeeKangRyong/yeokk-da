'use client';

import { motion } from 'framer-motion';
import type { ColorPalette } from '@/lib/types/style';

interface ExcitingAnimationProps {
  colors: ColorPalette;
  intensity: number; // 0-1
}

/**
 * Exciting animation theme - rotating conic gradient, radiating rays, center pulse
 */
export function ExcitingAnimation({ colors, intensity }: ExcitingAnimationProps) {
  const rayCount = Math.floor(20 * intensity);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Rotating conic gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            ${colors.primary}30,
            ${colors.accent}40,
            ${colors.secondary}30,
            ${colors.primary}30
          )`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Radiating rays from center */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="exciting-glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0" />
            <stop offset="50%" stopColor={colors.accent} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {Array.from({ length: rayCount }).map((_, i) => {
          const angle = (360 / rayCount) * i;
          const length = 50; // percentage
          const delay = (i / rayCount) * 2;

          return (
            <motion.line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${50 + length * Math.cos((angle * Math.PI) / 180)}%`}
              y2={`${50 + length * Math.sin((angle * Math.PI) / 180)}%`}
              stroke="url(#rayGradient)"
              strokeWidth="2"
              filter="url(#exciting-glow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
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

      {/* Center pulse effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${colors.primary}60, transparent)`,
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Explosive particles */}
      <svg className="absolute inset-0 h-full w-full">
        {Array.from({ length: Math.floor(30 * intensity) }).map((_, i) => {
          const angle = Math.random() * 360;
          const distance = Math.random() * 40 + 10;
          const endX = 50 + distance * Math.cos((angle * Math.PI) / 180);
          const endY = 50 + distance * Math.sin((angle * Math.PI) / 180);
          const size = Math.random() * 4 + 2;
          const delay = Math.random() * 2;

          return (
            <motion.circle
              key={i}
              r={size}
              fill={i % 2 === 0 ? colors.accent : colors.primary}
              filter="url(#exciting-glow)"
              initial={{
                cx: '50%',
                cy: '50%',
                opacity: 1,
              }}
              animate={{
                cx: [`50%`, `${endX}%`],
                cy: [`50%`, `${endY}%`],
                opacity: [1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </svg>

      {/* Energy rings */}
      <svg className="absolute inset-0 h-full w-full">
        {[0, 1, 2].map((i) => {
          const delay = i * 0.5;

          return (
            <motion.circle
              key={i}
              cx="50%"
              cy="50%"
              r="5%"
              fill="none"
              stroke={colors.accent}
              strokeWidth="3"
              filter="url(#exciting-glow)"
              initial={{ r: '5%', opacity: 0.8 }}
              animate={{
                r: ['5%', '40%'],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </svg>

      {/* Dynamic gradient orbs */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.secondary}40, transparent)`,
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.primary}50, transparent)`,
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, 90, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
