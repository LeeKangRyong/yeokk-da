import { Prisma } from '@prisma/client';

export class MemoryImageDto {
  id: string;
  url: string;
  thumbnail: string;
  width: number;
  height: number;
  order: number;
}

export class MemorySourceDto {
  id: string;
  platform: string;
  externalId: string | null;
  rawData: Prisma.JsonValue;
  createdAt: Date;
}

export class MemoryResponseDto {
  id: string;
  userId: string;
  title: string;
  content: string | null;
  memoryDate: Date;
  location: string | null;
  moodTag: string;
  intensity: number;
  themeTag: string;
  storyLine: string;
  animationTheme: string;
  images: MemoryImageDto[];
  sources?: MemorySourceDto[];
  createdAt: Date;
  updatedAt: Date;
}

export class PaginatedMemoriesDto {
  data: MemoryResponseDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
