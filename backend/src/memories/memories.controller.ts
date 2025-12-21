import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  UploadedFiles,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MemoriesService } from './memories.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { GetMemoriesQueryDto } from './dto/get-memories-query.dto';
import { ValidationError } from '../shared/exceptions/app.error';

// TODO: Add authentication decorator when auth module is implemented
// For now, using hardcoded userId for testing
const TEMP_USER_ID = 'test-user-id';

@Controller('api/memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
          return cb(
            new ValidationError('Only JPEG, PNG, and WebP images are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() createMemoryDto: CreateMemoryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // TODO: Replace with @CurrentUser() decorator when auth is implemented
    const userId = TEMP_USER_ID;

    const memory = await this.memoriesService.create(
      userId,
      createMemoryDto,
      files,
    );
    return { data: memory };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: GetMemoriesQueryDto) {
    // TODO: Replace with @CurrentUser() decorator when auth is implemented
    const userId = TEMP_USER_ID;

    return this.memoriesService.findAll(userId, query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    // TODO: Replace with @CurrentUser() decorator when auth is implemented
    const userId = TEMP_USER_ID;

    const memory = await this.memoriesService.findOne(userId, id);
    return { data: memory };
  }
}
