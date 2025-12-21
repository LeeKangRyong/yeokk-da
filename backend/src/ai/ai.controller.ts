import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AiService } from './ai.service';
import { StartInterviewDto } from './dto/start-interview.dto';
import { ChatDto } from './dto/chat.dto';
import { GenerateStoryDto } from './dto/generate-story.dto';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('start-interview')
  @HttpCode(HttpStatus.OK)
  async startInterview(@Body() dto: StartInterviewDto) {
    const result = await this.aiService.startInterview(dto);
    return { data: result };
  }

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  async chat(@Body() dto: ChatDto) {
    const result = await this.aiService.processChat(dto);
    return { data: result };
  }

  @Post('generate-story')
  @HttpCode(HttpStatus.OK)
  async generateStory(@Body() dto: GenerateStoryDto) {
    const result = await this.aiService.generateStory(dto);
    return { data: result };
  }
}
