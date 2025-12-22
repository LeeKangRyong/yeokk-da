// Memory type definitions mirroring backend DTOs

export interface MemoryImage {
  id: string;
  url: string;
  thumbnail: string;
  width: number;
  height: number;
  order: number;
}

export interface MemorySource {
  id: string;
  platform: string;
  externalId: string | null;
  rawData: Record<string, unknown> | null;
}

export interface Memory {
  id: string;
  userId: string;
  title: string;
  content: string | null;
  memoryDate: string; // ISO date string
  location: string | null;
  moodTag: string;
  intensity: number;
  themeTag: string;
  storyLine: string;
  animationTheme: string;
  images: MemoryImage[];
  sources?: MemorySource[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemoryData {
  title: string;
  content?: string;
  memoryDate?: string;
  location?: string;
  images: File[];
}

export interface MemoryFilters {
  page?: number;
  limit?: number;
  moodTag?: string;
  themeTag?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: 'memoryDate' | 'createdAt' | 'intensity';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedMemories {
  data: Memory[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
