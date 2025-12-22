'use client';

import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-start gap-3">
        {/* AI Avatar */}
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </div>

        {/* Typing Bubble */}
        <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-5 py-3 shadow-sm">
          <motion.span
            className="h-2 w-2 rounded-full bg-gray-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-gray-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-gray-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
