'use client';

import { motion } from 'framer-motion';
import { useMemoryFilterStore } from '@/lib/stores/useMemoryFilterStore';
import { Button } from '@/components/ui/Button';
import { PaginatedMemories } from '@/lib/types/memory';

interface PaginationProps {
  meta: PaginatedMemories['meta'];
}

export function Pagination({ meta }: PaginationProps) {
  const { setFilter } = useMemoryFilterStore();

  const handlePrevious = () => {
    if (meta.hasPrev) {
      setFilter('page', meta.page - 1);
    }
  };

  const handleNext = () => {
    if (meta.hasNext) {
      setFilter('page', meta.page + 1);
    }
  };

  if (meta.totalPages <= 1) {
    return null;
  }

  return (
    <motion.div
      className="mt-8 flex items-center justify-center gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Previous Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!meta.hasPrev}
          className="flex items-center gap-2 shadow-neo-outset"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          이전
        </Button>
      </motion.div>

      {/* Page Number Display with Flip Animation */}
      <motion.div
        className="rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 px-5 py-2.5 shadow-neo-inset"
        key={meta.page}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <motion.span
          key={`current-${meta.page}`}
          className="text-sm font-semibold text-primary-700"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {meta.page}
        </motion.span>
        <span className="mx-1 text-sm text-gray-500">/</span>
        <span className="text-sm text-gray-700">{meta.totalPages}</span>
      </motion.div>

      {/* Next Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={!meta.hasNext}
          className="flex items-center gap-2 shadow-neo-outset"
        >
          다음
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </motion.div>
    </motion.div>
  );
}
