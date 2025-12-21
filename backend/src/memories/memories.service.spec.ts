/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { MemoriesService } from './memories.service';
import { PrismaService } from '../shared/prisma/prisma.service';
import { AzureStorageService } from '../shared/services/azure-storage.service';
import { ImageProcessingService } from '../shared/services/image-processing.service';
import { AnthropicService } from '../shared/services/anthropic.service';
import { NotFoundError, ForbiddenError } from '../shared/exceptions/app.error';

describe('MemoriesService', () => {
  let service: MemoriesService;
  let prismaService: PrismaService;
  let anthropicService: AnthropicService;

  const mockPrismaService = {
    memory: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockAzureStorageService = {
    uploadBuffer: jest.fn(),
  };

  const mockImageProcessingService = {
    processImage: jest.fn(),
  };

  const mockAnthropicService = {
    analyzeMemory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemoriesService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: AzureStorageService, useValue: mockAzureStorageService },
        {
          provide: ImageProcessingService,
          useValue: mockImageProcessingService,
        },
        { provide: AnthropicService, useValue: mockAnthropicService },
      ],
    }).compile();

    service = module.get<MemoriesService>(MemoriesService);
    prismaService = module.get<PrismaService>(PrismaService);
    anthropicService = module.get<AnthropicService>(AnthropicService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a memory with AI analysis', async () => {
      const userId = 'user-123';
      const dto = {
        title: '테스트 추억',
        content: '즐거운 여행',
      };

      const mockAiAnalysis = {
        moodTag: '행복',
        intensity: 80,
        themeTag: '여행',
        storyLine: '즐거운 여행 이야기',
        animationTheme: 'happy' as const,
      };

      const mockMemory = {
        id: 'memory-123',
        userId,
        title: dto.title,
        content: dto.content,
        memoryDate: new Date(),
        location: null,
        moodTag: mockAiAnalysis.moodTag,
        intensity: mockAiAnalysis.intensity,
        themeTag: mockAiAnalysis.themeTag,
        storyLine: mockAiAnalysis.storyLine,
        animationTheme: mockAiAnalysis.animationTheme,
        videoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        images: [],
        sources: [{ platform: 'manual', rawData: {} }],
      };

      mockAnthropicService.analyzeMemory.mockResolvedValue(mockAiAnalysis);
      mockPrismaService.memory.create.mockResolvedValue(mockMemory);

      const result = await service.create(userId, dto);

      expect(anthropicService.analyzeMemory).toHaveBeenCalledWith(dto.content);
      expect(prismaService.memory.create).toHaveBeenCalled();
      expect(result.title).toBe(dto.title);
      expect(result.moodTag).toBe(mockAiAnalysis.moodTag);
    });
  });

  describe('findAll', () => {
    it('should return paginated memories', async () => {
      const userId = 'user-123';
      const mockMemories = [
        {
          id: 'memory-1',
          title: '추억1',
          images: [],
        },
      ];

      mockPrismaService.memory.findMany.mockResolvedValue(mockMemories);
      mockPrismaService.memory.count.mockResolvedValue(1);

      const result = await service.findAll(userId, {});

      expect(prismaService.memory.findMany).toHaveBeenCalled();
      expect(prismaService.memory.count).toHaveBeenCalled();
      expect(result.data).toHaveLength(1);
      expect(result.meta.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a memory by id', async () => {
      const userId = 'user-123';
      const memoryId = 'memory-123';
      const mockMemory = {
        id: memoryId,
        userId,
        title: '테스트 추억',
        images: [],
        sources: [],
      };

      mockPrismaService.memory.findUnique.mockResolvedValue(mockMemory);

      const result = await service.findOne(userId, memoryId);

      expect(prismaService.memory.findUnique).toHaveBeenCalledWith({
        where: { id: memoryId },
        include: {
          images: { orderBy: { order: 'asc' } },
          sources: true,
        },
      });
      expect(result.id).toBe(memoryId);
    });

    it('should throw NotFoundError if memory does not exist', async () => {
      const userId = 'user-123';
      const memoryId = 'non-existent';

      mockPrismaService.memory.findUnique.mockResolvedValue(null);

      await expect(service.findOne(userId, memoryId)).rejects.toThrow(
        NotFoundError,
      );
    });

    it('should throw ForbiddenError if user does not own memory', async () => {
      const userId = 'user-123';
      const memoryId = 'memory-123';
      const mockMemory = {
        id: memoryId,
        userId: 'other-user',
        title: '테스트 추억',
      };

      mockPrismaService.memory.findUnique.mockResolvedValue(mockMemory);

      await expect(service.findOne(userId, memoryId)).rejects.toThrow(
        ForbiddenError,
      );
    });
  });
});
