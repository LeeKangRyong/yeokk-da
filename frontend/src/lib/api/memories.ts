import { apiClient } from './client';
import type {
  Memory,
  PaginatedMemories,
  MemoryFilters,
  CreateMemoryData,
} from '../types/memory';

export const memoriesApi = {
  // GET /api/memories - List with filters
  getAll: async (filters?: MemoryFilters): Promise<PaginatedMemories> => {
    const { data } = await apiClient.get<PaginatedMemories>('/api/memories', {
      params: filters,
    });
    return data;
  },

  // GET /api/memories/:id - Single memory
  getOne: async (id: string): Promise<Memory> => {
    const { data } = await apiClient.get<{ data: Memory }>(
      `/api/memories/${id}`
    );
    return data.data;
  },

  // POST /api/memories - Create with images
  create: async (data: CreateMemoryData): Promise<Memory> => {
    const formData = new FormData();

    formData.append('title', data.title);
    if (data.content) formData.append('content', data.content);
    if (data.memoryDate) formData.append('memoryDate', data.memoryDate);
    if (data.location) formData.append('location', data.location);

    // Append all image files
    data.images.forEach((file) => {
      formData.append('images', file);
    });

    const { data: response } = await apiClient.post<{ data: Memory }>(
      '/api/memories',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  },
};
