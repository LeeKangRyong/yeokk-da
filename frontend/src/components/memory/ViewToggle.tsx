'use client';

import { useMemoryViewStore } from '@/lib/stores/useMemoryViewStore';
import { cn } from '@/lib/utils/cn';

export function ViewToggle() {
  const { view, setView } = useMemoryViewStore();

  return (
    <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
      <button
        onClick={() => setView('grid')}
        className={cn(
          'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
          view === 'grid'
            ? 'bg-primary-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        )}
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
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        그리드
      </button>

      <button
        onClick={() => setView('timeline')}
        className={cn(
          'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
          view === 'timeline'
            ? 'bg-primary-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        )}
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        타임라인
      </button>
    </div>
  );
}
