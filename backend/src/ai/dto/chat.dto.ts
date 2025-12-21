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

export class ChatDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessage)
  conversationHistory: ConversationMessage[];

  @IsString()
  @IsNotEmpty()
  userMessage: string;
}

export class ChatResponseDto {
  response: string;
  suggestedNextQuestions?: string[];
  shouldContinue: boolean;
}
