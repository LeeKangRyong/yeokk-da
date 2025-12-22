import { Memory, PaginatedMemories } from '@/lib/types/memory';
import { MemoryCard } from './MemoryCard';
import { SkeletonCard } from '@/components/ui/Skeleton';

interface MemoryGridProps {
  memories: Memory[];
}

export function MemoryGrid({ memories }: MemoryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* TODO YD-40: Add staggered fade-in for cards */}
      {/* TODO YD-40: Add AnimatePresence for exit animations */}
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} variant="grid" />
      ))}
    </div>
  );
}

export function MemoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
