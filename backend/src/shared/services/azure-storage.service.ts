import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { InternalServerError } from '../exceptions/app.error';

export interface UploadResult {
  url: string;
  blobName: string;
}

@Injectable()
export class AzureStorageService {
  private readonly logger = new Logger(AzureStorageService.name);
  private readonly containerClient: ContainerClient;
  private readonly containerName: string;

  constructor(private configService: ConfigService) {
    const connectionString = this.configService.get<string>(
      'AZURE_STORAGE_CONNECTION_STRING',
    );
    this.containerName =
      this.configService.get<string>('AZURE_STORAGE_CONTAINER') || 'memories';

    if (!connectionString) {
      throw new Error('AZURE_STORAGE_CONNECTION_STRING is not configured');
    }

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    this.containerClient = blobServiceClient.getContainerClient(
      this.containerName,
    );
  }

  async uploadBuffer(
    buffer: Buffer,
    blobName: string,
    contentType: string,
  ): Promise<UploadResult> {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(buffer, buffer.length, {
        blobHTTPHeaders: {
          blobContentType: contentType,
          blobCacheControl: 'public, max-age=31536000',
        },
      });

      const url = blockBlobClient.url;
      this.logger.log(`Uploaded blob: ${blobName}`);

      return { url, blobName };
    } catch (error) {
      this.logger.error(`Failed to upload blob: ${blobName}`, error);
      throw new InternalServerError('Failed to upload image to storage');
    }
  }

  async deleteBlob(blobName: string): Promise<void> {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.deleteIfExists();
      this.logger.log(`Deleted blob: ${blobName}`);
    } catch (error) {
      this.logger.error(`Failed to delete blob: ${blobName}`, error);
    }
  }

  async deleteBlobsByPrefix(prefix: string): Promise<void> {
    try {
      const blobs = this.containerClient.listBlobsFlat({ prefix });
      const deletePromises: Promise<void>[] = [];

      for await (const blob of blobs) {
        deletePromises.push(this.deleteBlob(blob.name));
      }

      await Promise.all(deletePromises);
      this.logger.log(`Deleted blobs with prefix: ${prefix}`);
    } catch (error) {
      this.logger.error(`Failed to delete blobs with prefix: ${prefix}`, error);
    }
  }
}
