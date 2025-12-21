import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import { InternalServerError, ValidationError } from '../exceptions/app.error';

export interface ProcessedImage {
  optimized: Buffer;
  thumbnail: Buffer;
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
  };
}

@Injectable()
export class ImageProcessingService {
  private readonly logger = new Logger(ImageProcessingService.name);

  private readonly MAX_WIDTH = 1920;
  private readonly MAX_HEIGHT = 1080;
  private readonly OPTIMIZED_QUALITY = 85;

  private readonly THUMB_SIZE = 400;
  private readonly THUMB_QUALITY = 80;

  async processImage(buffer: Buffer): Promise<ProcessedImage> {
    try {
      const image = sharp(buffer);
      const metadata = await image.metadata();

      this.validateImage(metadata);

      const [optimized, thumbnail] = await Promise.all([
        this.createOptimizedVersion(image, metadata),
        this.createThumbnail(image),
      ]);

      return {
        optimized,
        thumbnail,
        metadata: {
          width: metadata.width || 0,
          height: metadata.height || 0,
          format: metadata.format || 'unknown',
          size: buffer.length,
        },
      };
    } catch (error) {
      this.logger.error('Failed to process image', error);
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new InternalServerError('Failed to process image');
    }
  }

  private validateImage(metadata: sharp.Metadata): void {
    if (!metadata.width || !metadata.height) {
      throw new ValidationError('Invalid image dimensions');
    }

    const validFormats = ['jpeg', 'jpg', 'png', 'webp'];
    if (!metadata.format || !validFormats.includes(metadata.format)) {
      throw new ValidationError(
        'Unsupported image format. Only JPEG, PNG, and WebP are supported',
      );
    }
  }

  private async createOptimizedVersion(
    image: sharp.Sharp,
    metadata: sharp.Metadata,
  ): Promise<Buffer> {
    let pipeline = image.clone();

    if (metadata.width && metadata.height) {
      if (
        metadata.width > this.MAX_WIDTH ||
        metadata.height > this.MAX_HEIGHT
      ) {
        pipeline = pipeline.resize(this.MAX_WIDTH, this.MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }
    }

    return pipeline
      .webp({ quality: this.OPTIMIZED_QUALITY, effort: 6 })
      .toBuffer();
  }

  private async createThumbnail(image: sharp.Sharp): Promise<Buffer> {
    return image
      .clone()
      .resize(this.THUMB_SIZE, this.THUMB_SIZE, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: this.THUMB_QUALITY, effort: 4 })
      .toBuffer();
  }
}
