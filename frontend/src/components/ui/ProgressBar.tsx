'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Color gradient based on progress
  const getColor = () => {
    if (percentage < 20) return 'bg-gray-400';
    if (percentage < 40) return 'bg-blue-400';
    if (percentage < 60) return 'bg-blue-500';
    if (percentage < 80) return 'bg-purple-500';
    return 'bg-gradient-to-r from-purple-500 to-pink-500';
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* Background */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        {/* Progress Bar */}
        <motion.div
          className={cn('h-full rounded-full', getColor())}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>

      {/* Optional Label */}
      {showLabel && (
        <motion.div
          className="mt-1 text-right text-xs font-medium text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Math.round(percentage)}%
        </motion.div>
      )}
    </div>
  );
}
