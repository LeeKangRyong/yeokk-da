'use client';

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
    <div className="mt-8 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={!meta.hasPrev}
        className="flex items-center gap-2"
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

      <span className="text-sm text-gray-700">
        {meta.page} / {meta.totalPages}
      </span>

      <Button
        variant="outline"
        onClick={handleNext}
        disabled={!meta.hasNext}
        className="flex items-center gap-2"
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
    </div>
  );
}
