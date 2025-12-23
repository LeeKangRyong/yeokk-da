'use client';

import { motion } from 'framer-motion';
import type { ColorPalette } from '@/lib/types/style';

interface PeacefulAnimationProps {
  colors: ColorPalette;
  intensity: number; // 0-1
}

/**
 * Peaceful animation theme - soft gradient waves, ripple effects, floating light orbs
 */
export function PeacefulAnimation({ colors, intensity }: PeacefulAnimationProps) {
  const orbCount = Math.floor(10 * intensity);
  const rippleCount = 3;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft gradient wave background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}20, ${colors.primary}15)`,
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Flowing wave shapes */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.15" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          fill="url(#waveGradient1)"
          initial={{ d: 'M0,20 Q25,15 50,20 T100,20 L100,0 L0,0 Z' }}
          animate={{
            d: [
              'M0,20 Q25,15 50,20 T100,20 L100,0 L0,0 Z',
              'M0,15 Q25,25 50,15 T100,15 L100,0 L0,0 Z',
              'M0,20 Q25,15 50,20 T100,20 L100,0 L0,0 Z',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          fill="url(#waveGradient2)"
          initial={{ d: 'M0,30 Q25,25 50,30 T100,30 L100,0 L0,0 Z' }}
          animate={{
            d: [
              'M0,30 Q25,25 50,30 T100,30 L100,0 L0,0 Z',
              'M0,25 Q25,35 50,25 T100,25 L100,0 L0,0 Z',
              'M0,30 Q25,25 50,30 T100,30 L100,0 L0,0 Z',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {/* Concentric ripple effects */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="peaceful-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: rippleCount }).map((_, i) => {
          const delay = i * 2;
          const cx = 30 + i * 20;
          const cy = 40 + i * 10;

          return (
            <motion.circle
              key={`ripple-${i}`}
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="3%"
              fill="none"
              stroke={colors.accent}
              strokeWidth="1.5"
              filter="url(#peaceful-glow)"
              initial={{ r: '3%', opacity: 0.6 }}
              animate={{
                r: ['3%', '25%'],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </svg>

      {/* Floating soft light orbs */}
      {Array.from({ length: orbCount }).map((_, i) => {
        const size = Math.random() * 150 + 80;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 6;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[30px]"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? colors.primary
                  : i % 3 === 1
                    ? colors.secondary
                    : colors.accent
              }25, transparent)`,
            }}
            animate={{
              x: [0, Math.random() * 80 - 40, 0],
              y: [0, Math.random() * 60 - 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
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

      {/* Gentle floating particles */}
      <svg className="absolute inset-0 h-full w-full opacity-50">
        {Array.from({ length: Math.floor(15 * intensity) }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = Math.random() * 2.5 + 1;
          const delay = Math.random() * 8;
          const duration = Math.random() * 6 + 6;

          return (
            <motion.circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={size}
              fill={colors.accent}
              filter="url(#peaceful-glow)"
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.8, 0],
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

      {/* Large ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${colors.primary}15, transparent)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
