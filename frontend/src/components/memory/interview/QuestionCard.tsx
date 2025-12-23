'use client';

import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
  index?: number;
  isDeepInterview?: boolean;
}

export function QuestionCard({ question, index, isDeepInterview }: QuestionCardProps) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 p-6 shadow-md">
        {/* Question Number Badge - shows "심층 질문" in deep interview mode */}
        {index !== undefined && (
          <motion.div
            className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm ${
              isDeepInterview ? 'bg-amber-600' : 'bg-primary-600'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {isDeepInterview ? '심층 질문' : `질문 ${index + 1}`}
          </motion.div>
        )}

        {/* Question Text */}
        <motion.p
          className="text-lg font-medium leading-relaxed text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {question}
        </motion.p>

        {/* Animated Underline */}
        <motion.div
          className="mt-4 h-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-700"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
