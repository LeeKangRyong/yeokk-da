'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInterviewStore } from '@/lib/stores/useInterviewStore';
import { useChatInterview, useGenerateStory } from '@/lib/hooks/useAiInterview';
import { ProgressFeedback } from './ProgressFeedback';
import { ChatMessage } from './ChatMessage';
import { QuestionCard } from './QuestionCard';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from '@/components/ui/ChatInput';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function ChatInterview() {
  const {
    conversationHistory,
    questions,
    currentQuestionIndex,
    isAiTyping,
    progress,
  } = useInterviewStore();

  const {
    mutate: sendMessage,
    isPending: isSending,
    data: lastResponse,
  } = useChatInterview();

  const {
    mutate: generateStory,
    isPending: isGenerating,
  } = useGenerateStory();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory, isAiTyping]);

  // Trigger story generation when interview is complete
  useEffect(() => {
    if (lastResponse && !lastResponse.shouldContinue && !isGenerating) {
      // Small delay for smooth transition
      setTimeout(() => {
        generateStory();
      }, 1000);
    }
  }, [lastResponse, generateStory, isGenerating]);

  const handleSend = (message: string) => {
    sendMessage(message);
  };

  // Current question to display (progressive disclosure)
  const currentQuestion =
    questions[currentQuestionIndex] || null;

  // Show generating story overlay
  if (isGenerating) {
    return (
      <div className="flex min-h-[600px] flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <motion.p
          className="mt-6 text-lg font-medium text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          당신의 이야기를 만들고 있어요...
        </motion.p>
        <motion.p
          className="mt-2 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          잠시만 기다려주세요 ✨
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      {/* Progress Feedback Header */}
      <ProgressFeedback
        questionsAnswered={progress.questionsAnswered}
        totalQuestions={progress.totalQuestions}
        narrativeDepth={progress.narrativeDepth}
      />

      {/* Messages Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 py-6"
      >
        <div className="mx-auto max-w-3xl space-y-4">
          {/* Conversation History */}
          {conversationHistory.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {/* Current Question (Progressive Disclosure) */}
          <AnimatePresence mode="wait">
            {currentQuestion && !isAiTyping && (
              <motion.div
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="py-4"
              >
                <QuestionCard
                  question={currentQuestion}
                  index={currentQuestionIndex}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isAiTyping && <TypingIndicator />}

          {/* Scroll Anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <ChatInput
          onSend={handleSend}
          disabled={isAiTyping || isSending}
          placeholder={
            isAiTyping
              ? 'AI가 응답을 생성하고 있어요...'
              : '메시지를 입력하세요 (Enter로 전송, Shift+Enter로 줄바꿈)'
          }
        />
      </div>
    </div>
  );
}
