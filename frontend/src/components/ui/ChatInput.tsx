'use client';

import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = '메시지를 입력하세요...',
  maxLength = 1000,
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (Shift+Enter for new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setValue('');

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="flex items-end gap-2">
      {/* Textarea */}
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={1}
          className={cn(
            'w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm transition-colors',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
            'text-gray-900',
            'placeholder:text-gray-400'
          )}
          style={{ maxHeight: '120px' }}
        />

        {/* Character Counter */}
        {value.length > maxLength * 0.8 && (
          <motion.div
            className={cn(
              'absolute bottom-2 right-12 text-xs',
              value.length >= maxLength ? 'text-red-500' : 'text-gray-400'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {value.length}/{maxLength}
          </motion.div>
        )}
      </div>

      {/* Send Button */}
      <motion.button
        type="button"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-lg transition-colors',
          'bg-primary-600 text-white hover:bg-primary-700',
          'disabled:bg-gray-300 disabled:cursor-not-allowed'
        )}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        {/* Paper Plane Icon */}
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </motion.button>
    </div>
  );
}
