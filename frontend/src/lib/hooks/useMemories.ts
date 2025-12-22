import { useQuery } from '@tanstack/react-query';
import { memoriesApi } from '../api/memories';
import type { MemoryFilters } from '../types/memory';

export function useMemories(filters?: MemoryFilters) {
  return useQuery({
    queryKey: ['memories', filters],
    queryFn: () => memoriesApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
