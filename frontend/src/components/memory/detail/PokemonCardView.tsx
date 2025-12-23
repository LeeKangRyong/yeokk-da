'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { use3DCardEffect } from '@/lib/hooks/use3DCardEffect';
import {
  getCardBorderColor,
  getCardBorderStyle,
  getCardBoxShadow,
  getCardRarity,
} from '@/lib/utils/pokemonCard';
import type { Memory } from '@/lib/types/memory';
import { HolographicOverlay } from './HolographicOverlay';

interface PokemonCardViewProps {
  memory: Memory;
}

/**
 * Pokemon TCG card style memory detail view
 * Features 3D tilt effect, hologram overlay, and dynamic styling based on AI analysis
 */
export function PokemonCardView({ memory }: PokemonCardViewProps) {
  const { cardRef, tiltAngles, lightPosition, isHovered, handlers } =
    use3DCardEffect(15);

  // Style metadata from backend
  const { styleMetadata } = memory;
  if (!styleMetadata) {
    return <div>스타일 메타데이터를 불러올 수 없습니다.</div>;
  }

  const { colors, typography } = styleMetadata;
  const borderColor = getCardBorderColor(memory.moodTag);
  const rarity = getCardRarity(memory.intensity);
  const borderStyle = getCardBorderStyle(memory.intensity, borderColor);
  const boxShadow = getCardBoxShadow(memory.intensity, borderColor);

  // Format date
  const memoryDate = new Date(memory.memoryDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Primary image (first image or placeholder)
  const primaryImage = memory.images[0] || null;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* Pokemon Card Container */}
      <motion.div
        ref={cardRef}
        className="relative"
        style={{
          perspective: '1000px',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        {...handlers}
      >
        {/* 3D Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-white"
          style={{
            transformStyle: 'preserve-3d',
            border: borderStyle,
            boxShadow,
          }}
          animate={{
            rotateX: tiltAngles.rotateX,
            rotateY: tiltAngles.rotateY,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Holographic Overlay */}
          <HolographicOverlay
            intensity={memory.intensity}
            animationTheme={memory.animationTheme}
            colors={colors}
            lightPosition={lightPosition}
            isHovered={isHovered}
          />

          {/* Light Reflection */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{
              background: `radial-gradient(circle at ${lightPosition.x} ${lightPosition.y}, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
          />

          {/* Card Content */}
          <div className="relative z-10">
            {/* Card Header */}
            <div
              className="border-b-2 px-6 py-4"
              style={{
                borderColor: `${borderColor}40`,
                background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1
                    className="font-bold"
                    style={{
                      fontSize:
                        typography.headingSize === 'large'
                          ? '2rem'
                          : typography.headingSize === 'medium'
                            ? '1.5rem'
                            : '1.25rem',
                      fontWeight:
                        typography.fontWeight === 'bold'
                          ? 700
                          : typography.fontWeight === 'normal'
                            ? 500
                            : 400,
                      color: colors.text,
                    }}
                  >
                    {memory.title}
                  </h1>
                  <p className="mt-1 text-sm" style={{ color: colors.text }}>
                    {memoryDate}
                    {memory.location && ` · ${memory.location}`}
                  </p>
                </div>

                {/* Rarity Badge */}
                {/* <div
                  className="ml-4 rounded-full px-3 py-1 text-xs font-bold uppercase"
                  style={{
                    backgroundColor: borderColor,
                    color: 'white',
                  }}
                >
                  {rarity === 'holographic'
                    ? '홀로그램'
                    : rarity === 'rare'
                      ? '레어'
                      : '일반'}
                </div> */}
              </div>

              {/* Mood and Theme Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.text,
                  }}
                >
                  {memory.moodTag}
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${colors.secondary}20`,
                    color: colors.text,
                  }}
                >
                  {memory.themeTag}
                </span>
              </div>
            </div>

            {/* Card Image Area */}
            {primaryImage && (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={primaryImage.url}
                  alt={memory.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
              </div>
            )}

            {/* Card Content Section */}
            <div
              className="border-t-2 px-6 py-6"
              style={{
                borderColor: `${borderColor}40`,
              }}
            >
              {/* Story Line */}
              <div>
                <h2
                  className="mb-2 font-semibold"
                  style={{
                    fontSize:
                      typography.bodySize === 'large'
                        ? '1.25rem'
                        : typography.bodySize === 'medium'
                          ? '1.125rem'
                          : '1rem',
                    color: colors.text,
                  }}
                >
                  이야기
                </h2>
                <p
                  className="whitespace-pre-wrap"
                  style={{
                    fontSize:
                      typography.bodySize === 'large'
                        ? '1.125rem'
                        : typography.bodySize === 'medium'
                          ? '1rem'
                          : '0.875rem',
                    lineHeight:
                      typography.lineHeight === 'relaxed'
                        ? 1.8
                        : typography.lineHeight === 'normal'
                          ? 1.6
                          : 1.4,
                    color: `${colors.text}dd`,
                  }}
                >
                  {memory.storyLine}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div
              className="border-t-2 px-6 py-4"
              style={{
                borderColor: `${borderColor}40`,
                background: `linear-gradient(135deg, ${colors.secondary}10, ${colors.primary}10)`,
              }}
            >
              <div className="flex items-center justify-between text-sm">
                <div style={{ color: `${colors.text}99` }}>
                  감정 강도: {memory.intensity}%
                </div>
                <div style={{ color: `${colors.text}99` }}>
                  {memory.animationTheme}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Additional Images Gallery (outside card) */}
      {memory.images.length > 1 && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3
            className="mb-4 text-lg font-semibold"
            style={{ color: colors.text }}
          >
            더 많은 사진
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {memory.images.slice(1).map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200"
                style={{
                  border: `2px solid ${borderColor}40`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.2 },
                }}
              >
                <Image
                  src={image.url}
                  alt={`${memory.title} - ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
