import { create } from 'zustand';

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface StoryAnalysis {
  moodTag: string;
  intensity: number;
  themeTag: string;
  storyLine: string;
  animationTheme: 'happy' | 'nostalgic' | 'exciting' | 'peaceful' | 'melancholy';
}

export interface InterviewProgress {
  questionsAnswered: number;
  totalQuestions: number;
  narrativeDepth: number; // 0-100
}

interface InterviewStore {
  // Multi-step state
  currentStep: 'context' | 'interview' | 'complete';

  // Step 1: Image Context
  images: File[];
  initialContext: string;
  memoryDate: string;
  location: string;
  title: string;

  // Step 2: AI Interview
  conversationHistory: ConversationMessage[];
  questions: string[];
  currentQuestionIndex: number;
  initialGreeting: string;
  isAiTyping: boolean;

  // Step 3: Story Analysis
  storyAnalysis: StoryAnalysis | null;

  // Progress tracking (YD-42)
  progress: InterviewProgress;

  // Deep interview mode (beyond initial questions)
  isDeepInterview: boolean;
  initialQuestionCount: number;

  // Actions
  setStep: (step: InterviewStore['currentStep']) => void;
  setImages: (images: File[]) => void;
  setInitialContext: (context: string) => void;
  setMemoryDate: (date: string) => void;
  setLocation: (location: string) => void;
  setTitle: (title: string) => void;
  addMessage: (message: ConversationMessage) => void;
  setQuestions: (questions: string[], greeting: string) => void;
  nextQuestion: () => void;
  setAiTyping: (isTyping: boolean) => void;
  setStoryAnalysis: (analysis: StoryAnalysis | null) => void;
  updateProgress: (progress: Partial<InterviewProgress>) => void;
  calculateNarrativeDepth: () => number;
  addFollowUpQuestions: (questions: string[]) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 'context' as const,
  images: [],
  initialContext: '',
  memoryDate: new Date().toISOString().split('T')[0],
  location: '',
  title: '',
  conversationHistory: [],
  questions: [],
  currentQuestionIndex: 0,
  initialGreeting: '',
  isAiTyping: false,
  storyAnalysis: null,
  progress: {
    questionsAnswered: 0,
    totalQuestions: 0,
    narrativeDepth: 0,
  },
  isDeepInterview: false,
  initialQuestionCount: 0,
};

// Helper function to calculate narrative depth
const calculateNarrativeDepthHelper = (
  questionsAnswered: number,
  totalQuestions: number,
  conversationHistory: ConversationMessage[],
  initialQuestionCount: number
): number => {
  if (conversationHistory.length === 0) return 0;

  // Cap questionsAnswered at initialQuestionCount for base score calculation
  const effectiveQuestionsAnswered = Math.min(questionsAnswered, initialQuestionCount || totalQuestions);
  const baseQuestionCount = initialQuestionCount || totalQuestions;

  // Base score from question count (50% weight)
  const questionScore = baseQuestionCount > 0
    ? (effectiveQuestionsAnswered / baseQuestionCount) * 50
    : 0;

  // Bonus score for additional questions beyond initial set (max 10 points)
  const bonusQuestions = Math.max(0, questionsAnswered - (initialQuestionCount || totalQuestions));
  const bonusScore = Math.min(bonusQuestions * 5, 10);

  // Response length score (30% weight)
  const userMessages = conversationHistory.filter(m => m.role === 'user');
  if (userMessages.length === 0) return questionScore;

  const avgLength = userMessages.reduce((sum, m) => sum + m.content.length, 0) / userMessages.length;
  const lengthScore = Math.min((avgLength / 200) * 30, 30);

  // Conversation turns (20% weight)
  const turnScore = Math.min((conversationHistory.length / 10) * 20, 20);

  return Math.min(questionScore + lengthScore + turnScore + bonusScore, 100);
};

export const useInterviewStore = create<InterviewStore>()((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  setImages: (images) => set({ images }),

  setInitialContext: (context) => set({ initialContext: context }),

  setMemoryDate: (date) => set({ memoryDate: date }),

  setLocation: (location) => set({ location }),

  setTitle: (title) => set({ title }),

  addMessage: (message) => {
    set((state) => {
      const newHistory = [...state.conversationHistory, message];

      // Auto-update progress after user messages
      if (message.role === 'user') {
        const questionsAnswered = state.progress.questionsAnswered + 1;
        const narrativeDepth = calculateNarrativeDepthHelper(
          questionsAnswered,
          state.progress.totalQuestions,
          newHistory,
          state.initialQuestionCount
        );

        return {
          conversationHistory: newHistory,
          progress: {
            ...state.progress,
            questionsAnswered,
            narrativeDepth,
          },
        };
      }

      return { conversationHistory: newHistory };
    });
  },

  setQuestions: (questions, greeting) => set((state) => ({
    questions,
    initialGreeting: greeting,
    initialQuestionCount: questions.length,
    isDeepInterview: false,
    progress: {
      ...state.progress,
      totalQuestions: questions.length,
    },
  })),

  nextQuestion: () => set((state) => ({
    currentQuestionIndex: Math.min(
      state.currentQuestionIndex + 1,
      state.questions.length - 1
    ),
  })),

  setAiTyping: (isTyping) => set({ isAiTyping: isTyping }),

  setStoryAnalysis: (analysis) => set({ storyAnalysis: analysis }),

  updateProgress: (progress) => set((state) => ({
    progress: { ...state.progress, ...progress },
  })),

  calculateNarrativeDepth: () => {
    const state = get();
    return calculateNarrativeDepthHelper(
      state.progress.questionsAnswered,
      state.progress.totalQuestions,
      state.conversationHistory,
      state.initialQuestionCount
    );
  },

  addFollowUpQuestions: (newQuestions) => set((state) => ({
    questions: [...state.questions, ...newQuestions],
    isDeepInterview: true,
    progress: {
      ...state.progress,
      totalQuestions: state.progress.totalQuestions + newQuestions.length,
    },
  })),

  reset: () => set(initialState),
}));
