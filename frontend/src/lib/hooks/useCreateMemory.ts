import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { memoriesApi } from '../api/memories';
import type { CreateMemoryData } from '../types/memory';

export function useCreateMemory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateMemoryData) => memoriesApi.create(data),
    onSuccess: () => {
      // Invalidate memories list cache
      queryClient.invalidateQueries({ queryKey: ['memories'] });

      // Navigate to memories list
      router.push('/memories');
    },
  });
}
