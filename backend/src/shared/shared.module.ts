import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AzureStorageService } from './services/azure-storage.service';
import { ImageProcessingService } from './services/image-processing.service';
import { AnthropicService } from './services/anthropic.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [AzureStorageService, ImageProcessingService, AnthropicService],
  exports: [AzureStorageService, ImageProcessingService, AnthropicService],
})
export class SharedModule {}
