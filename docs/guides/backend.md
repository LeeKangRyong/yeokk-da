# Backend Development Guide

## Project Structure

```
backend/src/
├── auth/            # Google OAuth, JWT
├── users/           # User management
├── memories/        # Memory CRUD
├── integrations/    # Instagram, Spotify
├── ai/              # Claude API
├── video/           # FFmpeg processing
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

### Add External API

```typescript
@Injectable()
export class InstagramService {
  async connect(code: string) {
    // OAuth flow
    const token = await this.exchangeCode(code);
    return token;
  }

  async importPosts(accessToken: string) {
    // Fetch from API
    const posts = await this.fetchPosts(accessToken);
    
    // Normalize
    return posts.map(this.normalize);
  }

  private normalize(post: any): UnifiedPost {
    return {
      platform: 'instagram',
      content: { text: post.caption },
      // ...
    };
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

### Job Queue

```typescript
// Add job
await this.videoQueue.add('generate', {
  memoryId: '123',
  config: { duration: 60 },
});

// Process job
@Processor('video-generation')
export class VideoProcessor {
  @Process('generate')
  async handle(job: Job) {
    const { memoryId } = job.data;
    await this.generateVideo(memoryId);
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
