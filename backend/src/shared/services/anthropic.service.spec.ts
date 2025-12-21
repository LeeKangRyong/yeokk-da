import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AnthropicService } from './anthropic.service';
import Anthropic from '@anthropic-ai/sdk';

jest.mock('@anthropic-ai/sdk');

describe('AnthropicService', () => {
  let service: AnthropicService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'ANTHROPIC_API_KEY') return 'test-api-key';
      if (key === 'ANTHROPIC_API_BASE') return 'https://test-api.com';
      return null;
    }),
  };

  const mockAnthropicClient = {
    messages: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    (Anthropic as jest.MockedClass<typeof Anthropic>).mockImplementation(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      () => mockAnthropicClient as any,
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnthropicService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AnthropicService>(AnthropicService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('analyzeMemory', () => {
    it('should analyze memory content and return parsed result', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              moodTag: '행복',
              intensity: 80,
              themeTag: '여행',
              storyLine: '즐거운 여행 이야기',
              animationTheme: 'happy',
            }),
          },
        ],
      };

      mockAnthropicClient.messages.create.mockResolvedValue(mockResponse);

      const result = await service.analyzeMemory('여행 다녀왔습니다');

      expect(result.moodTag).toBe('행복');
      expect(result.intensity).toBe(80);
      expect(result.themeTag).toBe('여행');
      expect(result.animationTheme).toBe('happy');
    });

    it('should return default analysis on parsing error', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: 'Invalid JSON response',
          },
        ],
      };

      mockAnthropicClient.messages.create.mockResolvedValue(mockResponse);

      const result = await service.analyzeMemory('테스트');

      expect(result.moodTag).toBe('평온');
      expect(result.intensity).toBe(50);
      expect(result.animationTheme).toBe('peaceful');
    });
  });

  describe('startInterview', () => {
    it('should generate interview questions', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              questions: ['질문1', '질문2', '질문3'],
              initialGreeting: '안녕하세요!',
            }),
          },
        ],
      };

      mockAnthropicClient.messages.create.mockResolvedValue(mockResponse);

      const result = await service.startInterview();

      expect(result.questions).toHaveLength(3);
      expect(result.initialGreeting).toBe('안녕하세요!');
    });

    it('should include initialContext in prompt if provided', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              questions: ['질문1'],
              initialGreeting: '여행 사진이네요!',
            }),
          },
        ],
      };

      mockAnthropicClient.messages.create.mockResolvedValue(mockResponse);

      await service.startInterview('여행 사진입니다');

      expect(mockAnthropicClient.messages.create).toHaveBeenCalled();
    });
  });

  describe('processChat', () => {
    it('should process chat and return response', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              response: '그렇군요! 더 자세히 말씀해주세요.',
              suggestedNextQuestions: ['후속 질문1', '후속 질문2'],
              shouldContinue: true,
            }),
          },
        ],
      };

      mockAnthropicClient.messages.create.mockResolvedValue(mockResponse);

      const conversationHistory = [
        { role: 'user' as const, content: '여행 갔었어요' },
      ];

      const result = await service.processChat(
        conversationHistory,
        '제주도였어요',
      );

      expect(result.response).toBe('그렇군요! 더 자세히 말씀해주세요.');
      expect(result.shouldContinue).toBe(true);
      expect(result.suggestedNextQuestions).toHaveLength(2);
    });
  });

  describe('generateStory', () => {
    it('should generate story from conversation history', async () => {
      const mockResponse = {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              moodTag: '행복',
              intensity: 85,
              themeTag: '여행',
              storyLine: '제주도 여행의 추억',
              animationTheme: 'happy',
            }),
          },
        ],
      };

      mockAnthropicClient.messages.create.mockResolvedValue(mockResponse);

      const conversationHistory = [
        { role: 'user' as const, content: '제주도 여행 갔었어요' },
        { role: 'assistant' as const, content: '어떤 점이 좋았나요?' },
        { role: 'user' as const, content: '날씨가 정말 좋았어요' },
      ];

      const result = await service.generateStory(conversationHistory);

      expect(result.moodTag).toBe('행복');
      expect(result.themeTag).toBe('여행');
      expect(result.storyLine).toBe('제주도 여행의 추억');
    });
  });
});
