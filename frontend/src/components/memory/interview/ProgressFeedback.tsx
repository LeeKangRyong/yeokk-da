'use client';

import { motion } from 'framer-motion';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface ProgressFeedbackProps {
  questionsAnswered: number;
  totalQuestions: number;
  narrativeDepth: number;
}

export function ProgressFeedback({
  questionsAnswered,
  totalQuestions,
  narrativeDepth,
}: ProgressFeedbackProps) {
  // Get feedback message based on narrative depth
  const getFeedbackMessage = () => {
    if (narrativeDepth < 20) return '대화를 시작하고 있어요...';
    if (narrativeDepth < 40) return '점점 깊어지고 있어요...';
    if (narrativeDepth < 60) return '풍부한 디테일이 담겨요!';
    if (narrativeDepth < 80) return '거의 다 왔어요!';
    return '아름다운 이야기가 완성되었어요!';
  };

  // Get emoji based on progress
  const getEmoji = () => {
    if (narrativeDepth < 20) return '🌱';
    if (narrativeDepth < 40) return '🌿';
    if (narrativeDepth < 60) return '🌺';
    if (narrativeDepth < 80) return '✨';
    return '🎉';
  };

  return (
    <motion.div
      className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Bar */}
      <ProgressBar value={narrativeDepth} className="mb-3" />

      {/* Info Row */}
      <div className="flex items-center justify-between">
        {/* Question Counter */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
            {questionsAnswered}
          </div>
          <span className="text-sm text-gray-600">
            / {totalQuestions} 질문 답변
          </span>
        </motion.div>

        {/* Feedback Message */}
        <motion.div
          className="flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2"
          key={getFeedbackMessage()} // Re-animate on message change
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <motion.span
            className="text-lg"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            {getEmoji()}
          </motion.span>
          <span className="text-sm font-medium text-primary-700">
            {getFeedbackMessage()}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
