import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { aiApi } from '@/lib/api/ai';
import { memoriesApi } from '@/lib/api/memories';
import { useInterviewStore } from '@/lib/stores/useInterviewStore';

/**
 * Hook to start a new AI interview session
 */
export function useStartInterview() {
  const { setQuestions, addMessage, setStep } = useInterviewStore();

  return useMutation({
    mutationFn: (initialContext?: string) =>
      aiApi.startInterview({ initialContext }),
    onSuccess: (data) => {
      // Store questions and greeting
      setQuestions(data.questions, data.initialGreeting);

      // Add greeting as first AI message
      addMessage({
        role: 'assistant',
        content: data.initialGreeting,
      });

      // Transition to interview step
      setStep('interview');
    },
  });
}

/**
 * Hook to send a message in the AI interview chat
 */
export function useChatInterview() {
  const { conversationHistory, addMessage, setAiTyping, nextQuestion, addFollowUpQuestions } =
    useInterviewStore();

  return useMutation({
    mutationFn: (userMessage: string) => {
      // Add user message to history immediately
      addMessage({
        role: 'user',
        content: userMessage,
      });

      // Call API with updated history
      return aiApi.chat({
        conversationHistory: [
          ...conversationHistory,
          { role: 'user', content: userMessage },
        ],
        userMessage,
      });
    },
    onMutate: () => {
      setAiTyping(true);
    },
    onSuccess: (data) => {
      // Add AI response to conversation
      addMessage({
        role: 'assistant',
        content: data.response,
      });

      setAiTyping(false);

      // Move to next question if conversation should continue
      if (data.shouldContinue) {
        // Add suggested follow-up questions if provided
        if (data.suggestedNextQuestions && data.suggestedNextQuestions.length > 0) {
          addFollowUpQuestions(data.suggestedNextQuestions);
        }
        nextQuestion();
      }

      return data;
    },
    onError: () => {
      setAiTyping(false);
    },
  });
}

/**
 * Hook to generate final story analysis from conversation
 */
export function useGenerateStory() {
  const { conversationHistory, setStoryAnalysis, setStep } =
    useInterviewStore();

  return useMutation({
    mutationFn: () =>
      aiApi.generateStory({
        conversationHistory,
      }),
    onSuccess: (data) => {
      // Store story analysis
      setStoryAnalysis({
        moodTag: data.moodTag,
        intensity: data.intensity,
        themeTag: data.themeTag,
        storyLine: data.storyLine,
        animationTheme: data.animationTheme,
      });

      // Transition to complete step
      setStep('complete');
    },
  });
}

/**
 * Hook to create memory from interview data
 */
export function useCreateMemoryFromInterview() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { images, title, memoryDate, location, storyAnalysis, reset } =
    useInterviewStore();

  return useMutation({
    mutationFn: async () => {
      if (!storyAnalysis) {
        throw new Error('Story analysis not available');
      }

      // Create FormData with images and metadata
      const data = {
        title: title || storyAnalysis.storyLine.slice(0, 50),
        content: storyAnalysis.storyLine,
        memoryDate,
        location: location || undefined,
        images,
        // Include AI analysis to avoid duplicate AI call in backend
        moodTag: storyAnalysis.moodTag,
        intensity: storyAnalysis.intensity,
        themeTag: storyAnalysis.themeTag,
        storyLine: storyAnalysis.storyLine,
        animationTheme: storyAnalysis.animationTheme,
      };

      return memoriesApi.create(data);
    },
    onSuccess: () => {
      // Invalidate memories query to refetch list
      queryClient.invalidateQueries({ queryKey: ['memories'] });

      // Reset interview state
      reset();

      // Redirect to memories list
      router.push('/memories');
    },
  });
}
