import { apiClient } from './client';
import type {
  StartInterviewRequest,
  StartInterviewResponse,
  ChatRequest,
  ChatResponse,
  GenerateStoryRequest,
  GenerateStoryResponse,
} from '@/lib/types/ai';

export const aiApi = {
  /**
   * Start a new AI interview session
   * @param data - Optional initial context about the images
   * @returns Interview questions and greeting
   */
  startInterview: async (
    data: StartInterviewRequest
  ): Promise<StartInterviewResponse> => {
    const { data: response } = await apiClient.post<{
      data: StartInterviewResponse;
    }>('/api/ai/start-interview', data);
    return response.data;
  },

  /**
   * Send a message in the AI interview chat
   * @param data - Conversation history and user message
   * @returns AI response with continuation flag
   */
  chat: async (data: ChatRequest): Promise<ChatResponse> => {
    const { data: response } = await apiClient.post<{ data: ChatResponse }>(
      '/api/ai/chat',
      data
    );
    return response.data;
  },

  /**
   * Generate final story analysis from conversation
   * @param data - Complete conversation history
   * @returns Story analysis with mood, theme, and storyline
   */
  generateStory: async (
    data: GenerateStoryRequest
  ): Promise<GenerateStoryResponse> => {
    const { data: response } = await apiClient.post<{
      data: GenerateStoryResponse;
    }>('/api/ai/generate-story', data);
    return response.data;
  },
};
