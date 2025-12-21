/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { MemoriesController } from './memories.controller';
import { MemoriesService } from './memories.service';

describe('MemoriesController', () => {
  let controller: MemoriesController;
  let service: MemoriesService;

  const mockMemoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoriesController],
      providers: [
        {
          provide: MemoriesService,
          useValue: mockMemoriesService,
        },
      ],
    }).compile();

    controller = module.get<MemoriesController>(MemoriesController);
    service = module.get<MemoriesService>(MemoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a memory and return wrapped response', async () => {
      const dto = {
        title: '테스트 추억',
        content: '테스트 내용',
      };

      const mockMemory = {
        id: 'memory-123',
        title: dto.title,
        content: dto.content,
        moodTag: '행복',
        intensity: 80,
        themeTag: '여행',
        storyLine: '이야기',
        animationTheme: 'happy' as const,
      };

      mockMemoriesService.create.mockResolvedValue(mockMemory);

      const result = await controller.create(dto, []);

      expect(service.create).toHaveBeenCalled();
      expect(result.data).toEqual(mockMemory);
    });
  });

  describe('findAll', () => {
    it('should return paginated memories', async () => {
      const mockResponse = {
        data: [
          {
            id: 'memory-1',
            title: '추억1',
          },
        ],
        meta: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      };

      mockMemoriesService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll({});

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a single memory wrapped in data object', async () => {
      const memoryId = 'memory-123';
      const mockMemory = {
        id: memoryId,
        title: '테스트 추억',
      };

      mockMemoriesService.findOne.mockResolvedValue(mockMemory);

      const result = await controller.findOne(memoryId);

      expect(service.findOne).toHaveBeenCalledWith('test-user-id', memoryId);
      expect(result.data).toEqual(mockMemory);
    });
  });
});
