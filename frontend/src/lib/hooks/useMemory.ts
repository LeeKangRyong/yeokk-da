import { useQuery } from '@tanstack/react-query';
import { memoriesApi } from '../api/memories';

export function useMemory(id: string) {
  return useQuery({
    queryKey: ['memory', id],
    queryFn: () => memoriesApi.getOne(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!id, // Only fetch if id is provided
  });
}
