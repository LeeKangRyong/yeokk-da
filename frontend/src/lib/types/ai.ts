export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface StartInterviewRequest {
  initialContext?: string;
}

export interface StartInterviewResponse {
  questions: string[];
  initialGreeting: string;
}

export interface ChatRequest {
  conversationHistory: ConversationMessage[];
  userMessage: string;
}

export interface ChatResponse {
  response: string;
  suggestedNextQuestions?: string[];
  shouldContinue: boolean;
}

export interface GenerateStoryRequest {
  conversationHistory: ConversationMessage[];
}

export interface GenerateStoryResponse {
  moodTag: string;
  intensity: number;
  themeTag: string;
  storyLine: string;
  animationTheme: 'happy' | 'nostalgic' | 'exciting' | 'peaceful' | 'melancholy';
}
