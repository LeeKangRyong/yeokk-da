import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({
  className,
  size = 'md',
  ...props
}: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div
      className={cn('flex items-center justify-center py-12', className)}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-primary-200 border-t-primary-600',
          sizeStyles[size]
        )}
      />
    </div>
  );
}
