'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import type { ConversationMessage } from '@/lib/types/ai';

interface ChatMessageProps {
  message: ConversationMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          'flex max-w-[80%] items-start gap-3',
          isUser && 'flex-row-reverse'
        )}
      >
        {/* Avatar */}
        {!isUser && (
          <motion.div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </motion.div>
        )}

        {/* Message Bubble */}
        <motion.div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-sm',
            isUser
              ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white'
              : 'bg-gray-100 text-gray-900'
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
