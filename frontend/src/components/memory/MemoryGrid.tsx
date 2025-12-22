'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Memory, PaginatedMemories } from '@/lib/types/memory';
import { MemoryCard } from './MemoryCard';
import { SkeletonCard } from '@/components/ui/Skeleton';

interface MemoryGridProps {
  memories: Memory[];
}

export function MemoryGrid({ memories }: MemoryGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <AnimatePresence mode="popLayout">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.9 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                },
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.2 },
            }}
            layout
          >
            <MemoryCard memory={memory} variant="grid" />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export function MemoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
}
