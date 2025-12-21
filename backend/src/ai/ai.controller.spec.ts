/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

describe('AiController', () => {
  let controller: AiController;
  let service: AiService;

  const mockAiService = {
    startInterview: jest.fn(),
    processChat: jest.fn(),
    generateStory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiController],
      providers: [
        {
          provide: AiService,
          useValue: mockAiService,
        },
      ],
    }).compile();

    controller = module.get<AiController>(AiController);
    service = module.get<AiService>(AiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('startInterview', () => {
    it('should return interview questions wrapped in data object', async () => {
      const mockResult = {
        questions: ['질문1', '질문2'],
        initialGreeting: '안녕하세요!',
      };

      mockAiService.startInterview.mockResolvedValue(mockResult);

      const result = await controller.startInterview({});

      expect(service.startInterview).toHaveBeenCalledWith({});
      expect(result).toEqual({ data: mockResult });
    });
  });

  describe('chat', () => {
    it('should return chat response wrapped in data object', async () => {
      const mockResult = {
        response: 'AI 응답',
        suggestedNextQuestions: ['질문1'],
        shouldContinue: true,
      };

      mockAiService.processChat.mockResolvedValue(mockResult);

      const dto = {
        conversationHistory: [],
        userMessage: '안녕하세요',
      };

      const result = await controller.chat(dto);

      expect(service.processChat).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ data: mockResult });
    });
  });

  describe('generateStory', () => {
    it('should return story analysis wrapped in data object', async () => {
      const mockResult = {
        moodTag: '행복',
        intensity: 80,
        themeTag: '여행',
        storyLine: '즐거운 이야기',
        animationTheme: 'happy' as const,
      };

      mockAiService.generateStory.mockResolvedValue(mockResult);

      const dto = {
        conversationHistory: [],
      };

      const result = await controller.generateStory(dto);

      expect(service.generateStory).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ data: mockResult });
    });
  });
});
