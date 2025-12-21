import { IsOptional, IsString } from 'class-validator';

export class StartInterviewDto {
  @IsOptional()
  @IsString()
  initialContext?: string;
}

export class StartInterviewResponseDto {
  questions: string[];
  initialGreeting: string;
}
