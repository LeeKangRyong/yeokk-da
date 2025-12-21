import { Injectable, Logger } from '@nestjs/common';
import { AnthropicService } from '../shared/services/anthropic.service';
import {
  StartInterviewDto,
  StartInterviewResponseDto,
} from './dto/start-interview.dto';
import { ChatDto, ChatResponseDto } from './dto/chat.dto';
import {
  GenerateStoryDto,
  GenerateStoryResponseDto,
} from './dto/generate-story.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly anthropicService: AnthropicService) {}

  async startInterview(
    dto: StartInterviewDto,
  ): Promise<StartInterviewResponseDto> {
    this.logger.log('Starting AI interview');

    const result = await this.anthropicService.startInterview(
      dto.initialContext,
    );

    return {
      questions: result.questions,
      initialGreeting: result.initialGreeting,
    };
  }

  async processChat(dto: ChatDto): Promise<ChatResponseDto> {
    this.logger.log('Processing chat message');

    const result = await this.anthropicService.processChat(
      dto.conversationHistory,
      dto.userMessage,
    );

    return {
      response: result.response,
      suggestedNextQuestions: result.suggestedNextQuestions,
      shouldContinue: result.shouldContinue,
    };
  }

  async generateStory(
    dto: GenerateStoryDto,
  ): Promise<GenerateStoryResponseDto> {
    this.logger.log('Generating story from conversation');

    const result = await this.anthropicService.generateStory(
      dto.conversationHistory,
    );

    return {
      moodTag: result.moodTag,
      intensity: result.intensity,
      themeTag: result.themeTag,
      storyLine: result.storyLine,
      animationTheme: result.animationTheme,
    };
  }
}
