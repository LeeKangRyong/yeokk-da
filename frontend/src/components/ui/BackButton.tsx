'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

/**
 * Back button with chevron-left icon
 * Default behavior: navigates to previous page
 * Can be customized with onClick handler
 */
export function BackButton({
  onClick,
  className,
  label = '뒤로 가기',
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        'flex items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-md backdrop-blur-sm transition-shadow hover:shadow-lg',
        'w-10 h-10',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-700"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </motion.button>
  );
}
