# Backend Development Guide

## Project Structure

```
backend/src/
├── auth/            # Google OAuth, JWT
├── users/           # User management
├── memories/        # Memory CRUD
├── ai/              # OpenAI API (AI interview)
├── spotify/         # Spotify API (music recommendations)
├── share/           # Share token and OG tags
└── shared/
    ├── prisma/      # Database
    └── utils/       # Helpers
```

---

## Setup

```bash
# Install
npm install

# Environment
cp .env.example .env

# Database
npx prisma migrate dev
npx prisma generate

# Run
npm run start:dev
```

---

## Common Tasks

### Create New Module

```bash
nest g module features/example
nest g service features/example
nest g controller features/example
```

### Add API Endpoint

```typescript
// 1. Create DTO
export class CreateMemoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;
}

// 2. Service
@Injectable()
export class MemoriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateMemoryDto) {
    return this.prisma.memory.create({
      data: { userId, ...dto },
    });
  }
}

// 3. Controller
@Controller('memories')
export class MemoriesController {
  constructor(private service: MemoriesService) {}

  @Post()
  async create(@CurrentUser() user, @Body() dto: CreateMemoryDto) {
    return this.service.create(user.id, dto);
  }
}
```

### Database Migration

```bash
# Create migration
npx prisma migrate dev --name add_new_field

# Apply to production
npx prisma migrate deploy
```

### AI Analysis Service

```typescript
@Injectable()
export class OpenAiService {
  constructor(
    private readonly client: OpenAI,
  ) {}

  async analyzeMemory(content: string) {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Analyze this memory and provide:
            - moodTag (string): emotion (e.g., "행복", "그리움")
            - intensity (number): 0-100
            - themeTag (string): theme (e.g., "여행", "성장")
            - storyLine (string): 3-5 sentence story
            - animationTheme (string): "happy" | "nostalgic" | "exciting" | "peaceful"`
        },
        {
          role: 'user',
          content: `추억 내용:\n${content}`
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    return JSON.parse(completion.choices[0].message.content);
  }
}
```

---

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

### Example Test

```typescript
describe('MemoriesService', () => {
  let service: MemoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MemoriesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get(MemoriesService);
  });

  it('should create memory', async () => {
    const dto = { title: 'Test', content: 'Test' };
    const result = await service.create('user1', dto);
    
    expect(result.title).toBe('Test');
  });
});
```

---

## Common Patterns

### Error Handling

```typescript
// Custom error
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND');
  }
}

// Usage
async findOne(id: string) {
  const memory = await this.prisma.memory.findUnique({ where: { id } });
  if (!memory) throw new NotFoundError('Memory');
  return memory;
}
```

### Caching

```typescript
async getMemory(id: string) {
  // Check cache
  const cached = await this.cache.get(`memory:${id}`);
  if (cached) return cached;

  // Fetch from DB
  const memory = await this.prisma.memory.findUnique({ where: { id } });
  
  // Store in cache
  await this.cache.set(`memory:${id}`, memory, 3600);
  
  return memory;
}
```

### Job Queue (Async Processing)

```typescript
// Add job for share image generation
await this.shareQueue.add('generate-share-image', {
  memoryId: '123',
  platform: 'instagram-story',
});

// Process job
@Processor('share-generation')
export class ShareProcessor {
  @Process('generate-share-image')
  async handle(job: Job) {
    const { memoryId, platform } = job.data;
    const memory = await this.prisma.memory.findUnique({
      where: { id: memoryId },
      include: { images: true }
    });

    // Generate platform-specific share image (e.g., Instagram Story 1080x1920)
    const shareImage = await this.imageService.generateShareCard(memory, platform);

    await this.storageService.upload(shareImage, `shares/${memoryId}-${platform}.jpg`);
  }
}
```

---

## Debugging

```bash
# Watch mode
npm run start:dev

# Debug mode
npm run start:debug

# Check logs
tail -f logs/app.log
```

---

## Deployment

```bash
# Build
npm run build

# Production
npm run start:prod
```

See [`.github/workflows/deploy-backend.yml`](../../.github/workflows/deploy-backend.yml)
