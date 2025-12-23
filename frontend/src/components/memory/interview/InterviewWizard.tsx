'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInterviewStore } from '@/lib/stores/useInterviewStore';
import { ImageContextStep } from './ImageContextStep';
import { ChatInterview } from './ChatInterview';
import { InterviewComplete } from './InterviewComplete';

export function InterviewWizard() {
  const currentStep = useInterviewStore((state) => state.currentStep);
  const reset = useInterviewStore((state) => state.reset);

  // Reset state on mount - always start fresh from upload page
  useEffect(() => {
    reset();
  }, [reset]);

  // Add beforeunload warning during interview
  useEffect(() => {
    const conversationHistory = useInterviewStore.getState().conversationHistory;

    if (currentStep === 'interview' && conversationHistory.length > 0) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires returnValue
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [currentStep]);

  return (
    <div className="mx-auto max-w-5xl">
      <AnimatePresence mode="wait">
        {currentStep === 'context' && (
          <motion.div
            key="context"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ImageContextStep />
          </motion.div>
        )}

        {currentStep === 'interview' && (
          <motion.div
            key="interview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatInterview />
          </motion.div>
        )}

        {currentStep === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <InterviewComplete />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
