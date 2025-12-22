import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ViewType = 'grid' | 'timeline';

interface MemoryViewStore {
  view: ViewType;
  setView: (view: ViewType) => void;
}

export const useMemoryViewStore = create<MemoryViewStore>()(
  persist(
    (set) => ({
      view: 'grid',
      setView: (view) => set({ view }),
    }),
    {
      name: 'memory-view-storage', // localStorage key
    }
  )
);
