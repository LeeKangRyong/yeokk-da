import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsISO8601,
  IsInt,
  Min,
  Max,
  IsIn,
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
  @Transform(
    ({ value }: { value?: string }) => value || new Date().toISOString(),
  )
  memoryDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  location?: string;

  // Optional AI analysis fields (from interview)
  @IsString()
  @IsOptional()
  moodTag?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  intensity?: number;

  @IsString()
  @IsOptional()
  themeTag?: string;

  @IsString()
  @IsOptional()
  @MaxLength(5000)
  storyLine?: string;

  @IsIn(['happy', 'nostalgic', 'exciting', 'peaceful', 'melancholy'])
  @IsOptional()
  animationTheme?: string;
}
