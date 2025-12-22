'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useInterviewStore } from '@/lib/stores/useInterviewStore';
import { useCreateMemoryFromInterview } from '@/lib/hooks/useAiInterview';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function InterviewComplete() {
  const router = useRouter();
  const { storyAnalysis, setStep } = useInterviewStore();
  const {
    mutate: createMemory,
    isPending,
    error,
    isSuccess,
  } = useCreateMemoryFromInterview();

  const [showSuccess, setShowSuccess] = useState(false);

  // Show success animation when mutation succeeds
  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      // Redirect is handled by the hook
    }
  }, [isSuccess]);

  if (!storyAnalysis) {
    return (
      <div className="text-center text-gray-600">
        스토리 분석이 완료되지 않았습니다.
      </div>
    );
  }

  const handleCreate = () => {
    createMemory();
  };

  const handleGoBack = () => {
    setStep('interview');
  };

  // Get animation theme emoji
  const getThemeEmoji = () => {
    switch (storyAnalysis.animationTheme) {
      case 'happy':
        return '😊';
      case 'nostalgic':
        return '🌅';
      case 'exciting':
        return '⚡';
      case 'peaceful':
        return '🌿';
      case 'melancholy':
        return '🌧️';
      default:
        return '✨';
    }
  };

  return (
    <>
      {/* Success Overlay Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-2xl bg-white p-8 shadow-3d-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="flex flex-col items-center gap-4">
                {/* Animated Checkmark */}
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <motion.svg
                    className="h-12 w-12 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    />
                  </motion.svg>
                </motion.div>

                <motion.p
                  className="text-lg font-semibold text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  추억이 생성되었습니다!
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Preview */}
      <motion.div
        className="mx-auto max-w-3xl space-y-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {/* Header */}
        <motion.div
          className="text-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <motion.div
            className="mb-4 text-6xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
          >
            🎉
          </motion.div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            당신의 추억이 완성되었어요!
          </h1>
          <p className="text-gray-600">
            AI가 생성한 이야기를 확인하고 추억을 저장하세요
          </p>
        </motion.div>

        {/* Story Card */}
        <motion.div
          className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          {/* Story Text */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              이야기
            </h3>
            <p className="text-lg leading-relaxed text-gray-900">
              {storyAnalysis.storyLine}
            </p>
          </div>

          {/* Analysis Tags */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            {/* Mood */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">감정</span>
              <div className="flex items-center gap-2">
                <Badge variant="primary">{storyAnalysis.moodTag}</Badge>
                <span className="text-sm text-gray-500">
                  ({storyAnalysis.intensity}% 강도)
                </span>
              </div>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">주제</span>
              <Badge variant="default">{storyAnalysis.themeTag}</Badge>
            </div>

            {/* Animation Theme */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                애니메이션 테마
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getThemeEmoji()}</span>
                <span className="text-sm text-gray-700">
                  {storyAnalysis.animationTheme}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Error */}
        {error && (
          <motion.div
            className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error.message}
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          className="flex items-center justify-end gap-3 pt-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <Button
            type="button"
            variant="secondary"
            onClick={handleGoBack}
            disabled={isPending}
          >
            ← 다시 대화하기
          </Button>
          <Button onClick={handleCreate} isLoading={isPending}>
            추억 만들기 →
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
}
