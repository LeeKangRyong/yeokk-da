'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface InputProps extends Omit<HTMLMotionProps<'input'>, 'children'> {
  label?: string;
  error?: string;
  showCharCount?: boolean;
  currentLength?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      showCharCount = false,
      currentLength = 0,
      maxLength,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-gray-400"
          >
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <motion.input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-all',
              'shadow-neo-inset focus:shadow-3d-sm',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            maxLength={maxLength}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
          {showCharCount && maxLength && (
            <div className="mt-1 text-right text-xs">
              <motion.span
                className={cn(
                  'transition-colors',
                  currentLength > maxLength * 0.9
                    ? 'text-orange-500 font-semibold'
                    : 'text-gray-500'
                )}
                key={currentLength}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {currentLength}
              </motion.span>
              <span className="text-gray-400">/{maxLength}</span>
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
