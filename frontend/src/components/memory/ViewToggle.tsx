'use client';

import { motion } from 'framer-motion';
import { useMemoryViewStore } from '@/lib/stores/useMemoryViewStore';
import { cn } from '@/lib/utils/cn';

export function ViewToggle() {
  const { view, setView } = useMemoryViewStore();

  return (
    <div className="relative inline-flex rounded-xl bg-white p-1.5 shadow-neo-outset">
      {/* Sliding background indicator */}
      <motion.div
        className="absolute inset-y-1.5 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 shadow-3d-sm"
        animate={{
          left: view === 'grid' ? 6 : '50%',
          width: 'calc(50% - 6px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />

      {/* Grid button */}
      <motion.button
        onClick={() => setView('grid')}
        className={cn(
          'relative z-10 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          view === 'grid' ? 'text-white' : 'text-gray-700'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: view === 'grid' ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </motion.svg>
        그리드
      </motion.button>

      {/* Timeline button */}
      <motion.button
        onClick={() => setView('timeline')}
        className={cn(
          'relative z-10 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          view === 'timeline' ? 'text-white' : 'text-gray-700'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: view === 'timeline' ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </motion.svg>
        타임라인
      </motion.button>
    </div>
  );
}
