import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsISO8601,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMemoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(5000, { message: 'Content must not exceed 5000 characters' })
  content?: string;

  @IsISO8601()
  @IsOptional()
  @Transform(({ value }) => value || new Date().toISOString())
  memoryDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  location?: string;
}
