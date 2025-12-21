/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { AnthropicService } from '../shared/services/anthropic.service';

describe('AiService', () => {
  let service: AiService;
  let anthropicService: AnthropicService;

  const mockAnthropicService = {
    startInterview: jest.fn(),
    processChat: jest.fn(),
    generateStory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: AnthropicService,
          useValue: mockAnthropicService,
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    anthropicService = module.get<AnthropicService>(AnthropicService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('startInterview', () => {
    it('should call anthropicService.startInterview and return questions', async () => {
      const mockResult = {
        questions: ['질문1', '질문2', '질문3'],
        initialGreeting: '안녕하세요!',
      };

      mockAnthropicService.startInterview.mockResolvedValue(mockResult);

      const result = await service.startInterview({});

      expect(anthropicService.startInterview).toHaveBeenCalledWith(undefined);
      expect(result).toEqual(mockResult);
    });

    it('should pass initialContext to anthropicService', async () => {
      const mockResult = {
        questions: ['질문1'],
        initialGreeting: '안녕하세요!',
      };

      mockAnthropicService.startInterview.mockResolvedValue(mockResult);

      await service.startInterview({ initialContext: '여행 사진입니다' });

      expect(anthropicService.startInterview).toHaveBeenCalledWith(
        '여행 사진입니다',
      );
    });
  });

  describe('processChat', () => {
    it('should call anthropicService.processChat and return response', async () => {
      const mockResult = {
        response: 'AI 응답입니다',
        suggestedNextQuestions: ['후속 질문1'],
        shouldContinue: true,
      };

      mockAnthropicService.processChat.mockResolvedValue(mockResult);

      const dto = {
        conversationHistory: [
          { role: 'user' as const, content: '이전 메시지' },
        ],
        userMessage: '새 메시지',
      };

      const result = await service.processChat(dto);

      expect(anthropicService.processChat).toHaveBeenCalledWith(
        dto.conversationHistory,
        dto.userMessage,
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('generateStory', () => {
    it('should call anthropicService.generateStory and return analysis', async () => {
      const mockResult = {
        moodTag: '행복',
        intensity: 80,
        themeTag: '여행',
        storyLine: '즐거운 여행 이야기',
        animationTheme: 'happy' as const,
      };

      mockAnthropicService.generateStory.mockResolvedValue(mockResult);

      const dto = {
        conversationHistory: [{ role: 'user' as const, content: '대화 내용' }],
      };

      const result = await service.generateStory(dto);

      expect(anthropicService.generateStory).toHaveBeenCalledWith(
        dto.conversationHistory,
      );
      expect(result).toEqual(mockResult);
    });
  });
});
