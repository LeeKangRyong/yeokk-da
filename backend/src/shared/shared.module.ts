import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AzureStorageService } from './services/azure-storage.service';
import { ImageProcessingService } from './services/image-processing.service';
import { OpenAiService } from './services/openai.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [AzureStorageService, ImageProcessingService, OpenAiService],
  exports: [AzureStorageService, ImageProcessingService, OpenAiService],
})
export class SharedModule {}
