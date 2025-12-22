'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Memory } from '@/lib/types/memory';
import { formatDate } from '@/lib/utils/formatDate';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

interface MemoryCardProps {
  memory: Memory;
  variant?: 'grid' | 'timeline';
}

export function MemoryCard({ memory, variant = 'grid' }: MemoryCardProps) {
  const coverImage = memory.images[0];

  if (variant === 'timeline') {
    return (
      <Link href={`/memories/${memory.id}`}>
        <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md">
          {/* TODO YD-40: Add whileHover animation */}
          {/* TODO YD-40: Add layoutId for shared element transition */}
          {/* TODO YD-40: Add image parallax on scroll */}

          {coverImage && (
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={coverImage.thumbnail}
                alt={memory.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-gray-900 line-clamp-1">
              {memory.title}
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              {formatDate(memory.memoryDate)}
            </p>
            {memory.content && (
              <p className="mb-2 text-sm text-gray-700 line-clamp-2">
                {memory.content}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">{memory.moodTag}</Badge>
              <Badge>{memory.themeTag}</Badge>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/memories/${memory.id}`}>
      <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-primary-300 hover:shadow-lg">
        {/* TODO YD-40: Add whileHover scale animation */}
        {/* TODO YD-40: Add layoutId for shared element transition */}

        {/* Cover Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={memory.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <svg
                className="h-16 w-16 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
            {memory.title}
          </h3>
          <p className="mb-3 text-sm text-gray-600">
            {formatDate(memory.memoryDate)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">{memory.moodTag}</Badge>
            <Badge>{memory.themeTag}</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
