'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Memory } from '@/lib/types/memory';
import { formatDate } from '@/lib/utils/formatDate';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

interface MemoryCardProps {
  memory: Memory;
  variant?: 'grid' | 'timeline';
}

export function MemoryCard({ memory, variant = 'grid' }: MemoryCardProps) {
  const coverImage = memory.images[0];
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'timeline') {
    return (
      <Link href={`/memories/${memory.id}`}>
        <motion.div
          className="flex gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-3d-sm"
          layoutId={`memory-${memory.id}`}
          whileHover={{
            scale: 1.01,
            x: 5,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.12)',
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.99 }}
        >
          {coverImage && (
            <motion.div
              className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg shadow-md"
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={coverImage.thumbnail}
                alt={memory.title}
                fill
                className="object-cover"
              />
              {/* Shine overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 transition-opacity hover:opacity-100" />
            </motion.div>
          )}

          <div className="flex-1">
            <h3 className="mb-1.5 text-lg font-semibold text-gray-900 line-clamp-1 transition-colors hover:text-primary-700">
              {memory.title}
            </h3>
            <p className="mb-2 text-sm text-gray-500">
              {formatDate(memory.memoryDate)}
            </p>
            {memory.content && (
              <p className="mb-3 text-sm text-gray-700 line-clamp-2">
                {memory.content}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">{memory.moodTag}</Badge>
              <Badge>{memory.themeTag}</Badge>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/memories/${memory.id}`}>
      <motion.div
        layoutId={`memory-${memory.id}`}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-3d-md"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          y: -8,
          rotateX: -5,
          rotateY: 5,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.12), 0 32px 64px rgba(0, 0, 0, 0.16)',
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Shine Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Glow Border */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50" />

        {/* Cover Image with Parallax */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <motion.div
            className="h-full w-full"
            animate={isHovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {coverImage ? (
              <Image
                src={coverImage.url}
                alt={memory.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <svg
                  className="h-16 w-16 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </motion.div>

          {/* Gradient Depth Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
        </div>

        {/* Card Content with 3D Depth */}
        <div className="relative p-5 bg-white" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2 transition-colors group-hover:text-primary-700">
            {memory.title}
          </h3>
          <p className="mb-3 text-sm text-gray-600">
            {formatDate(memory.memoryDate)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">{memory.moodTag}</Badge>
            <Badge>{memory.themeTag}</Badge>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
