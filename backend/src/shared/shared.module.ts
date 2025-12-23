import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AzureStorageService } from './services/azure-storage.service';
import { ImageProcessingService } from './services/image-processing.service';
import { OpenAiService } from './services/openai.service';
import { StyleMapperService } from './services/style-mapper.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    AzureStorageService,
    ImageProcessingService,
    OpenAiService,
    StyleMapperService,
  ],
  exports: [
    AzureStorageService,
    ImageProcessingService,
    OpenAiService,
    StyleMapperService,
  ],
})
export class SharedModule {}
