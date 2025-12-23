'use client';

import { useParams } from 'next/navigation';
import { useMemory } from '@/lib/hooks/useMemory';
import { PokemonCardView } from '@/components/memory/detail/PokemonCardView';
import { ThemeBackground } from '@/components/memory/animations/ThemeBackground';
import { BackButton } from '@/components/ui/BackButton';
import { motion } from 'framer-motion';

/**
 * Memory detail page with Pokemon TCG card style
 * Features dynamic styling based on AI analysis (mood, theme, intensity)
 */
export default function MemoryDetailPage() {
  const params = useParams();
  const memoryId = params.id as string;

  const { data: memory, isLoading, error } = useMemory(memoryId);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">추억을 불러오는 중...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          className="max-w-md rounded-lg bg-red-50 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 text-5xl">😢</div>
          <h2 className="mb-2 text-xl font-bold text-red-800">
            추억을 불러올 수 없습니다
          </h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
          </p>
        </motion.div>
      </div>
    );
  }

  // No data state
  if (!memory) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 text-5xl">🔍</div>
          <p className="text-gray-600">추억을 찾을 수 없습니다.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full">
      {/* Back Button */}
      <BackButton className="absolute left-4 top-4 z-20" />

      {/* Theme Background Animation */}
      {memory.styleMetadata && (
        <ThemeBackground
          animationTheme={memory.animationTheme}
          colors={memory.styleMetadata.colors}
          intensity={memory.styleMetadata.animation.intensity}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10">
        <PokemonCardView memory={memory} />
      </div>
    </div>
  );
}
