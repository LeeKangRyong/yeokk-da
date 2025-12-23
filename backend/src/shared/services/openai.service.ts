import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { InternalServerError } from '../exceptions/app.error';

export interface AiAnalysisResult {
  moodTag: string;
  intensity: number;
  themeTag: string;
  storyLine: string;
  animationTheme:
    | 'happy'
    | 'nostalgic'
    | 'exciting'
    | 'peaceful'
    | 'melancholy';
}

export interface AiInterviewStartResult {
  questions: string[];
  initialGreeting: string;
}

export interface AiChatResponse {
  response: string;
  suggestedNextQuestions?: string[];
  shouldContinue: boolean;
}

const ANALYSIS_PROMPT = `당신은 추억을 분석하는 AI입니다. 제공된 텍스트와 이미지를 분석하여 감정과 주제를 파악하세요.

다음 형식의 JSON으로만 응답하세요 (다른 텍스트 없이):

{
  "moodTag": "감정 태그 (행복, 그리움, 설렘, 평온, 슬픔, 감사 중 하나)",
  "intensity": 0-100 사이의 감정 강도,
  "themeTag": "주제 태그 (여행, 성장, 사랑, 우정, 가족, 성취, 일상 중 하나)",
  "storyLine": "3-5문장으로 추억을 감성적으로 요약",
  "animationTheme": "애니메이션 테마 (happy, nostalgic, exciting, peaceful, melancholy 중 하나)"
}

규칙:
- moodTag는 한글로 정확히 작성
- intensity는 감정의 강도 (0=약함, 100=매우 강함)
- storyLine은 감성적이고 서정적으로 작성
- animationTheme는 moodTag에 매칭되는 영어 키워드`;

@Injectable()
export class OpenAiService {
  private readonly logger = new Logger(OpenAiService.name);
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    this.client = new OpenAI({
      apiKey,
    });

    this.model = 'gpt-4o';
  }

  async analyzeMemory(content: string): Promise<AiAnalysisResult> {
    try {
      this.logger.log('Analyzing memory content');

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: ANALYSIS_PROMPT,
          },
          {
            role: 'user',
            content: `추억 내용:\n${content}`,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const responseText = completion.choices[0]?.message?.content || '';

      const result = this.parseAnalysisResponse(responseText);
      this.logger.log(
        `Analysis completed: ${result.moodTag} (${result.intensity})`,
      );

      return result;
    } catch (error) {
      this.logger.error('Failed to analyze memory with AI', error);
      throw new InternalServerError('AI analysis failed. Please try again.');
    }
  }

  private parseAnalysisResponse(response: string): AiAnalysisResult {
    try {
      const parsed = JSON.parse(response) as {
        moodTag?: string;
        intensity?: number;
        themeTag?: string;
        storyLine?: string;
        animationTheme?: string;
      };

      return {
        moodTag: parsed.moodTag || '평온',
        intensity: Math.min(
          100,
          Math.max(0, parsed.intensity !== undefined ? parsed.intensity : 50),
        ),
        themeTag: parsed.themeTag || '일상',
        storyLine: parsed.storyLine || '소중한 추억입니다.',
        animationTheme: this.validateAnimationTheme(
          parsed.animationTheme || '',
        ),
      };
    } catch (error) {
      this.logger.error('Failed to parse AI response', error);
      return this.getDefaultAnalysis();
    }
  }

  private validateAnimationTheme(
    theme: string,
  ): AiAnalysisResult['animationTheme'] {
    const validThemes: AiAnalysisResult['animationTheme'][] = [
      'happy',
      'nostalgic',
      'exciting',
      'peaceful',
      'melancholy',
    ];
    return validThemes.includes(theme as AiAnalysisResult['animationTheme'])
      ? (theme as AiAnalysisResult['animationTheme'])
      : 'peaceful';
  }

  private getDefaultAnalysis(): AiAnalysisResult {
    return {
      moodTag: '평온',
      intensity: 50,
      themeTag: '일상',
      storyLine: '소중한 추억입니다.',
      animationTheme: 'peaceful',
    };
  }

  async startInterview(
    initialContext?: string,
  ): Promise<AiInterviewStartResult> {
    try {
      this.logger.log('Starting AI interview session');

      const interviewPrompt = `당신은 추억을 복원하도록 돕는 AI 인터뷰어입니다. 사용자가 업로드한 사진들에 대해 이야기를 나누려고 합니다.

${initialContext ? `사용자 초기 입력: ${initialContext}\n\n` : ''}

다음 형식의 JSON으로만 응답하세요:

{
  "questions": ["질문1", "질문2", "질문3", "질문4", "질문5"],
  "initialGreeting": "따뜻하고 친근한 첫 인사말"
}

규칙:
- questions는 5개의 개방형 질문 (예: "이 순간에 어떤 감정을 느꼈나요?", "함께 있던 사람들과는 어떤 관계인가요?")
- initialGreeting은 따뜻하고 공감적인 톤으로 작성
- 질문은 구체적이고 감성적이어야 하며, 사용자가 깊이 생각하도록 유도
- 순차적으로 물어볼 질문들을 생성 (한 번에 모두 물어보지 않음)`;

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: interviewPrompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
      });

      const responseText = completion.choices[0]?.message?.content || '';

      const result = this.parseInterviewStartResponse(responseText);
      this.logger.log(
        `Generated ${result.questions.length} interview questions`,
      );

      return result;
    } catch (error) {
      this.logger.error('Failed to start interview', error);
      throw new InternalServerError(
        'Interview start failed. Please try again.',
      );
    }
  }

  async processChat(
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
    userMessage: string,
  ): Promise<AiChatResponse> {
    try {
      this.logger.log('Processing chat message for interview');

      const systemPrompt = `당신은 사용자의 추억을 복원하도록 돕는 공감적인 AI 인터뷰어입니다.
사용자의 응답을 듣고:
1. 사용자가 말한 내용에 공감하고 요약해주세요
2. 응답에는 질문을 포함하지 마세요 (질문은 별도로 표시됩니다)
3. 따뜻하고 감성적인 톤으로 리액션해주세요
4. 필요하다면 후속 질문을 suggestedNextQuestions에만 제안하세요 (response에는 넣지 마세요)
5. 충분한 정보가 모였다면 shouldContinue를 false로 설정하세요

다음 형식의 JSON으로 응답하세요:

{
  "response": "사용자 답변에 대한 공감과 요약 (질문 없이, 2-3문장)",
  "suggestedNextQuestions": ["후속 질문1", "후속 질문2"],
  "shouldContinue": true 또는 false (충분한 정보가 모였으면 false)
}

주의: response에는 절대로 질문을 포함하지 마세요. 질문은 반드시 suggestedNextQuestions 배열에만 넣으세요.`;

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ];

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: messages,
        response_format: { type: 'json_object' },
        temperature: 0.8,
        max_tokens: 1000,
      });

      const responseText = completion.choices[0]?.message?.content || '';

      if (!responseText) {
        this.logger.warn('OpenAI returned an empty response.');
      }

      return this.parseChatResponse(responseText);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('OpenAI API Error:', errorMessage);
      throw new InternalServerError('Chat processing failed.');
    }
  }

  async generateStory(
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  ): Promise<AiAnalysisResult> {
    try {
      this.logger.log('Generating final story from conversation');

      const storyPrompt = `대화 내용을 바탕으로 사용자의 추억을 분석하고 감성적인 서사를 생성하세요.

다음 형식의 JSON으로 응답하세요:

{
  "moodTag": "감정 태그 (행복, 그리움, 설렘, 평온, 슬픔, 감사 중 하나)",
  "intensity": 0-100 사이의 감정 강도,
  "themeTag": "주제 태그 (여행, 성장, 사랑, 우정, 가족, 성취, 일상 중 하나)",
  "storyLine": "대화 내용을 바탕으로 3-5문장의 감성적인 이야기",
  "animationTheme": "애니메이션 테마 (happy, nostalgic, exciting, peaceful, melancholy 중 하나)"
}`;

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        ...conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user',
          content: storyPrompt,
        },
      ];

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: messages,
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const responseText = completion.choices[0]?.message?.content || '';

      return this.parseAnalysisResponse(responseText);
    } catch (error) {
      this.logger.error('Failed to generate story', error);
      throw new InternalServerError(
        'Story generation failed. Please try again.',
      );
    }
  }

  private parseInterviewStartResponse(
    response: string,
  ): AiInterviewStartResult {
    try {
      const parsed = JSON.parse(response) as {
        questions?: string[];
        initialGreeting?: string;
      };

      return {
        questions: parsed.questions || [
          '이 순간에 어떤 감정을 느꼈나요?',
          '함께 있던 사람들과는 어떤 관계인가요?',
          '이 추억이 특별한 이유는 무엇인가요?',
          '어떤 상황이었나요?',
          '이 기억이 오래 남는 이유는 무엇인가요?',
        ],
        initialGreeting:
          parsed.initialGreeting ||
          '안녕하세요! 업로드하신 사진들에 담긴 이야기를 함께 나눠볼까요?',
      };
    } catch (error) {
      this.logger.error('Failed to parse interview start response', error);
      return {
        questions: [
          '이 순간에 어떤 감정을 느꼈나요?',
          '함께 있던 사람들과는 어떤 관계인가요?',
          '이 추억이 특별한 이유는 무엇인가요?',
          '어떤 상황이었나요?',
          '이 기억이 오래 남는 이유는 무엇인가요?',
        ],
        initialGreeting:
          '안녕하세요! 업로드하신 사진들에 담긴 이야기를 함께 나눠볼까요?',
      };
    }
  }

  private parseChatResponse(response: string): AiChatResponse {
    // 빈 응답 체크
    if (!response || response.trim() === '') {
      this.logger.warn('Received empty response from OpenAI');
      return {
        response:
          '죄송해요, 잠시 대화를 이해하지 못했어요. 다시 말씀해 주시겠어요?',
        suggestedNextQuestions: [],
        shouldContinue: true,
      };
    }

    try {
      const parsed: unknown = JSON.parse(response);

      const isObject = typeof parsed === 'object' && parsed !== null;

      const data = isObject ? (parsed as Record<string, any>) : {};

      return {
        response:
          typeof data.response === 'string'
            ? data.response
            : '더 자세히 말씀해주시겠어요?',
        suggestedNextQuestions: Array.isArray(data.suggestedNextQuestions)
          ? data.suggestedNextQuestions
          : [],
        shouldContinue: data.shouldContinue !== false,
      };
    } catch (error) {
      this.logger.error(
        `JSON Parsing Error. Raw Response: ${response}`,
        error instanceof Error ? error.stack : 'Unknown error',
      );

      return {
        response:
          '이야기를 계속 듣고 싶어요. 조금 더 자세히 설명해 주시겠어요?',
        suggestedNextQuestions: [],
        shouldContinue: true,
      };
    }
  }
}
