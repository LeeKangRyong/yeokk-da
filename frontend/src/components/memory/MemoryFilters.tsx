'use client';

import { useState, useEffect } from 'react';
import { useMemoryFilterStore } from '@/lib/stores/useMemoryFilterStore';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DatePicker } from '@/components/ui/DatePicker';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOOD_TAGS, THEME_TAGS, SORT_OPTIONS } from '@/lib/constants/tags';
import { cn } from '@/lib/utils/cn';

export function MemoryFilters() {
  const { filters, setFilter, resetFilters } = useMemoryFilterStore();
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filters.search) {
        setFilter('search', searchValue || undefined);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, filters.search, setFilter]);

  const activeFilterCount = [
    filters.moodTag,
    filters.themeTag,
    filters.startDate,
    filters.endDate,
    filters.search,
  ].filter(Boolean).length;

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
      {/* TODO YD-40: Add slide-down animation when filter appears */}
      {/* TODO YD-40: Add badge pulse when filters active */}

      {/* Mobile: Filter Toggle */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          필터
          {activeFilterCount > 0 && (
            <Badge variant="primary">{activeFilterCount}</Badge>
          )}
          <svg
            className={cn(
              'h-4 w-4 transition-transform',
              isExpanded && 'rotate-180'
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            초기화
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div
        className={cn(
          'space-y-4',
          'md:block',
          !isExpanded && 'hidden'
        )}
      >
        {/* Search */}
        <div className="w-full">
          <Input
            placeholder="추억 검색..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Mood Tag */}
          <Select
            label="기분"
            placeholder="기분 선택"
            value={filters.moodTag || ''}
            onChange={(e) =>
              setFilter('moodTag', e.target.value || undefined)
            }
            options={MOOD_TAGS.map((tag) => ({ value: tag, label: tag }))}
          />

          {/* Theme Tag */}
          <Select
            label="테마"
            placeholder="테마 선택"
            value={filters.themeTag || ''}
            onChange={(e) =>
              setFilter('themeTag', e.target.value || undefined)
            }
            options={THEME_TAGS.map((tag) => ({ value: tag, label: tag }))}
          />

          {/* Start Date */}
          <DatePicker
            label="시작 날짜"
            value={filters.startDate || ''}
            onChange={(e) =>
              setFilter('startDate', e.target.value || undefined)
            }
          />

          {/* End Date */}
          <DatePicker
            label="종료 날짜"
            value={filters.endDate || ''}
            onChange={(e) => setFilter('endDate', e.target.value || undefined)}
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          {/* Sort By */}
          <div className="flex-1 min-w-[200px]">
            <Select
              label="정렬"
              value={filters.sortBy || 'memoryDate'}
              onChange={(e) =>
                setFilter(
                  'sortBy',
                  e.target.value as 'memoryDate' | 'createdAt' | 'intensity'
                )
              }
              options={SORT_OPTIONS.map((opt) => opt)}
            />
          </div>

          {/* Sort Order */}
          <Button
            variant="outline"
            onClick={() =>
              setFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')
            }
            className="flex items-center gap-2"
          >
            {filters.sortOrder === 'asc' ? (
              <>
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
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                오름차순
              </>
            ) : (
              <>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                내림차순
              </>
            )}
          </Button>

          {/* Reset Button (Desktop) */}
          <Button
            variant="secondary"
            onClick={resetFilters}
            className="hidden md:inline-flex"
            disabled={activeFilterCount === 0}
          >
            초기화
          </Button>
        </div>
      </div>
      {/* TODO YD-40: Add drawer slide animation on mobile */}
    </div>
  );
}
