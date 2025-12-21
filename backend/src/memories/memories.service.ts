import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { AzureStorageService } from '../shared/services/azure-storage.service';
import { ImageProcessingService } from '../shared/services/image-processing.service';
import { AnthropicService } from '../shared/services/anthropic.service';
import {
  NotFoundError,
  ForbiddenError,
  ValidationError,
} from '../shared/exceptions/app.error';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { GetMemoriesQueryDto } from './dto/get-memories-query.dto';
import {
  MemoryResponseDto,
  PaginatedMemoriesDto,
} from './dto/memory-response.dto';

@Injectable()
export class MemoriesService {
  private readonly logger = new Logger(MemoriesService.name);

  constructor(
    private prisma: PrismaService,
    private azureStorage: AzureStorageService,
    private imageProcessing: ImageProcessingService,
    private anthropic: AnthropicService,
  ) {}

  async create(
    userId: string,
    dto: CreateMemoryDto,
    files: Express.Multer.File[] = [],
  ): Promise<MemoryResponseDto> {
    this.logger.log(`Creating memory for user ${userId}`);

    if (files.length > 10) {
      throw new ValidationError('Maximum 10 images allowed per memory');
    }

    const content = dto.content || dto.title;
    const aiAnalysis = await this.anthropic.analyzeMemory(content);

    const memory = await this.prisma.memory.create({
      data: {
        userId,
        title: dto.title,
        content: dto.content,
        memoryDate: dto.memoryDate ? new Date(dto.memoryDate) : new Date(),
        location: dto.location,
        moodTag: aiAnalysis.moodTag,
        intensity: aiAnalysis.intensity,
        themeTag: aiAnalysis.themeTag,
        storyLine: aiAnalysis.storyLine,
        animationTheme: aiAnalysis.animationTheme,
        sources: {
          create: {
            platform: 'manual',
            rawData: {},
          },
        },
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        sources: true,
      },
    });

    if (files.length > 0) {
      const uploadedImages = await this.uploadImages(memory.id, files);
      await this.prisma.memory.update({
        where: { id: memory.id },
        data: {
          images: {
            createMany: {
              data: uploadedImages,
            },
          },
        },
      });

      memory.images = uploadedImages as any;
    }

    this.logger.log(`Memory created: ${memory.id}`);
    return this.toResponseDto(memory);
  }

  async findAll(
    userId: string,
    query: GetMemoriesQueryDto,
  ): Promise<PaginatedMemoriesDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const sortBy = query.sortBy ?? 'memoryDate';
    const sortOrder = query.sortOrder ?? 'desc';
    const { moodTag, themeTag, startDate, endDate, search } = query;

    const where = this.buildWhereClause(userId, {
      moodTag,
      themeTag,
      startDate,
      endDate,
      search,
    });

    const [memories, total] = await Promise.all([
      this.prisma.memory.findMany({
        where,
        include: {
          images: { orderBy: { order: 'asc' } },
        },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.memory.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: memories.map((m) => this.toResponseDto(m)),
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(userId: string, memoryId: string): Promise<MemoryResponseDto> {
    const memory = await this.prisma.memory.findUnique({
      where: { id: memoryId },
      include: {
        images: { orderBy: { order: 'asc' } },
        sources: true,
      },
    });

    if (!memory) {
      throw new NotFoundError('Memory');
    }

    if (memory.userId !== userId) {
      throw new ForbiddenError('You do not have access to this memory');
    }

    return this.toResponseDto(memory);
  }

  private buildWhereClause(
    userId: string,
    filters: Pick<
      GetMemoriesQueryDto,
      'moodTag' | 'themeTag' | 'startDate' | 'endDate' | 'search'
    >,
  ) {
    const where: any = { userId };

    if (filters.moodTag) {
      where.moodTag = filters.moodTag;
    }

    if (filters.themeTag) {
      where.themeTag = filters.themeTag;
    }

    if (filters.startDate || filters.endDate) {
      where.memoryDate = {};
      if (filters.startDate) {
        where.memoryDate.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.memoryDate.lte = new Date(filters.endDate);
      }
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { content: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  private async uploadImages(memoryId: string, files: Express.Multer.File[]) {
    const uploadPromises = files.map(async (file, index) => {
      const processed = await this.imageProcessing.processImage(file.buffer);

      const optimizedBlobName = `memories/${memoryId}/${index}_optimized.webp`;
      const thumbBlobName = `memories/${memoryId}/${index}_thumb.webp`;

      const [optimizedResult, thumbResult] = await Promise.all([
        this.azureStorage.uploadBuffer(
          processed.optimized,
          optimizedBlobName,
          'image/webp',
        ),
        this.azureStorage.uploadBuffer(
          processed.thumbnail,
          thumbBlobName,
          'image/webp',
        ),
      ]);

      return {
        url: optimizedResult.url,
        thumbnail: thumbResult.url,
        width: processed.metadata.width,
        height: processed.metadata.height,
        order: index,
      };
    });

    return Promise.all(uploadPromises);
  }

  private toResponseDto(memory: any): MemoryResponseDto {
    return {
      id: memory.id,
      userId: memory.userId,
      title: memory.title,
      content: memory.content,
      memoryDate: memory.memoryDate,
      location: memory.location,
      moodTag: memory.moodTag,
      intensity: memory.intensity,
      themeTag: memory.themeTag,
      storyLine: memory.storyLine,
      animationTheme: memory.animationTheme,
      images: memory.images || [],
      sources: memory.sources || undefined,
      createdAt: memory.createdAt,
      updatedAt: memory.updatedAt,
    };
  }
}
