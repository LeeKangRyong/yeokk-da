import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ConversationMessage {
  @IsString()
  @IsNotEmpty()
  role: 'user' | 'assistant';

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class GenerateStoryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessage)
  conversationHistory: ConversationMessage[];
}

export class GenerateStoryResponseDto {
  moodTag: string;
  intensity: number;
  themeTag: string;
  storyLine: string;
  animationTheme:
    | 'happy'
    | 'nostalgic'
    | 'exciting'
    | 'peaceful'
    | 'melancholy';
}
