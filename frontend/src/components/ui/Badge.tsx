'use client';

import { HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  children?: React.ReactNode;
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700',
    primary: 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700',
    success: 'bg-gradient-to-br from-green-100 to-green-200 text-green-700',
    warning: 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700',
    danger: 'bg-gradient-to-br from-red-100 to-red-200 text-red-700',
  };

  return (
    <motion.span
      {...props}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm',
        variantStyles[variant],
        className
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: variant === 'primary' ? '0 0 20px rgba(14, 165, 233, 0.4)' : undefined,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
}
