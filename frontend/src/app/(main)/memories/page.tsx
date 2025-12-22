'use client';

import { useMemories } from '@/lib/hooks/useMemories';
import { useMemoryFilterStore } from '@/lib/stores/useMemoryFilterStore';
import { useMemoryViewStore } from '@/lib/stores/useMemoryViewStore';
import { ViewToggle } from '@/components/memory/ViewToggle';
import { MemoryFilters } from '@/components/memory/MemoryFilters';
import { MemoryGrid, MemoryGridSkeleton } from '@/components/memory/MemoryGrid';
import { MemoryTimeline } from '@/components/memory/MemoryTimeline';
import { Pagination } from '@/components/memory/Pagination';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';

export default function MemoriesPage() {
  const { filters } = useMemoryFilterStore();
  const { view } = useMemoryViewStore();
  const { data, isLoading, error } = useMemories(filters);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">나의 추억</h1>
          <p className="text-gray-400">
            {data?.meta.total || 0}개의 추억이 저장되어 있습니다
          </p>
        </div>
        <ViewToggle />
      </div>

      {/* Filters */}
      <MemoryFilters />

      {/* Loading State */}
      {isLoading && (
        <div>
          {view === 'grid' ? (
            <MemoryGridSkeleton count={filters.limit || 20} />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-700">
          <p className="font-medium">오류가 발생했습니다</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {/* Empty State */}
      {data && data.data.length === 0 && (
        <EmptyState
          title="추억이 없습니다"
          description={
            Object.values(filters).some((v) => v !== undefined && v !== 1 && v !== 20 && v !== 'memoryDate' && v !== 'desc')
              ? '필터 조건에 맞는 추억이 없습니다. 다른 조건으로 검색해보세요.'
              : '첫 추억을 만들어보세요!'
          }
          actionLabel="추억 만들기"
          actionHref="/create"
        />
      )}

      {/* Memory List */}
      {data && data.data.length > 0 && (
        <>
          {view === 'grid' ? (
            <MemoryGrid memories={data.data} />
          ) : (
            <MemoryTimeline memories={data.data} />
          )}

          {/* Pagination */}
          <Pagination meta={data.meta} />
        </>
      )}
    </div>
  );
}
