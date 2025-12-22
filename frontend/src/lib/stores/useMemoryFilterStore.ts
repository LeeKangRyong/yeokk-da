import { create } from 'zustand';
import type { MemoryFilters } from '../types/memory';

interface MemoryFilterStore {
  filters: MemoryFilters;
  setFilter: <K extends keyof MemoryFilters>(
    key: K,
    value: MemoryFilters[K]
  ) => void;
  resetFilters: () => void;
}

const defaultFilters: MemoryFilters = {
  page: 1,
  limit: 20,
  sortBy: 'memoryDate',
  sortOrder: 'desc',
};

export const useMemoryFilterStore = create<MemoryFilterStore>((set) => ({
  filters: defaultFilters,

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        // Reset to page 1 when changing filters (except when changing page itself)
        ...(key !== 'page' && { page: 1 }),
      },
    }));
  },

  resetFilters: () => set({ filters: defaultFilters }),
}));
