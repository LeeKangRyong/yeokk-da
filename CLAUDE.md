# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**엮다 (Yeokk-da)** is an AI-powered memory platform that weaves photos and music into cinematic stories through interactive AI conversations. It creates:
- Gamified AI interview for memory reconstruction
- Spotify BGM curation with radio dial exploration
- Scroll-driven cinematic storytelling with Framer Motion
- AI theme-based dynamic background animations
- Multi-channel SNS sharing (Instagram Story, link sharing with OG tags)

**URL:** https://yeokk-da.netlify.app

## Tech Stack

### Frontend
- Next.js 15 (App Router), TypeScript 5.3
- Tailwind CSS 3.4, Framer Motion 11
- State: Zustand + Tanstack Query
- Auth: NextAuth.js 5.0
- Deploy: Netlify

### Backend
- Nest.js 10.3, Prisma 5.8
- PostgreSQL 15, Redis (BullMQ)
- Sharp (images)
- Deploy: Azure App Service

### External APIs
- GPT-4o (OpenAI)
- Spotify Web API

### Infrastructure
- Frontend: Netlify
- Backend: Azure App Service
- Storage: Azure Blob Storage
- Secrets: Azure Key Vault
- CI/CD: GitHub Actions

## Current Project Status

This repository currently contains planning and documentation. The frontend and backend implementations are planned but not yet created.

## Development Commands (Once Implemented)

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run type-check   # Run TypeScript checks
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

### Backend
```bash
cd backend
npm install             # Install dependencies
npm run start:dev       # Start dev server (watch mode)
npm run start:debug     # Start with debugging
npm run build           # Build for production
npm run test            # Run unit tests
npm run test:e2e        # Run E2E tests
npm run test:cov        # Generate test coverage

# Database
npx prisma migrate dev --name <migration_name>  # Create and apply migration
npx prisma generate     # Generate Prisma client
npx prisma migrate deploy  # Apply migrations to production
npx prisma studio       # Open Prisma Studio (database GUI)
```

### Nest.js Generators
```bash
nest g module features/<name>      # Generate module
nest g service features/<name>     # Generate service
nest g controller features/<name>  # Generate controller
```

## Architecture

### System Flow
```
User (Browser)
    ↓
Netlify CDN
    ↓
Next.js Frontend (yeokk-da.netlify.app)
    ↓
Nest.js Backend (yeokk-da-backend.azurewebsites.net)
    ↓
PostgreSQL, Azure Blob Storage, Redis
    ↓
External APIs (OpenAI, Spotify)
```

### Core Flows

**Memory Creation:**
1. User uploads images (up to 10) and initial memory fragments
2. AI conducts interactive interview, asking questions about the photos
3. User responds through chat interface, building up the narrative
4. AI analyzes conversation and returns `{ moodTag, intensity, themeTag, storyLine, animationTheme }`
5. User explores Spotify recommendations with radio dial UI based on mood
6. User selects final BGM and confirms
7. Generate cinematic page with scroll-driven animations and theme background
8. Save to database with selected music and animation settings

### Key Database Models

```prisma
model User {
  id          String    @id @default(cuid())
  email       String    @unique
  googleId    String    @unique
  memories    Memory[]
}

model Memory {
  id              String   @id @default(cuid())
  userId          String
  title           String
  content         String   @db.Text
  moodTag         String      // "행복", "그리움"
  intensity       Int         // 0-100
  themeTag        String      // "여행", "성장"
  storyLine       String   @db.Text
  animationTheme  String      // "happy", "nostalgic", "exciting", "peaceful"
  spotifyTrackId  String?     // Selected BGM from Spotify
  images          String[]    // Array of image URLs
  shareToken      String?  @unique

  @@index([userId, createdAt])
}
```

### API Endpoints (Core)

```
# Auth
POST   /api/auth/google
GET    /api/auth/me

# Memories
GET    /api/memories
POST   /api/memories
GET    /api/memories/:id
POST   /api/memories/upload

# AI Interview
POST   /api/ai/interview/start
POST   /api/ai/interview/message
POST   /api/ai/interview/analyze

# Spotify
GET    /api/spotify/recommendations
GET    /api/spotify/track/:id

# Share
POST   /api/memories/:id/share
GET    /s/:shareToken
```

## Code Style & Standards

### Clean Code Principles
1. **Meaningful names:** Use descriptive variable/function names
2. **Single responsibility:** Each function does one thing
3. **Small functions:** Keep functions under 20 lines, max 2 indentation levels
4. **Code over comments:** Make code self-explanatory
5. **DRY:** Extract duplicated code into functions

### TypeScript
- Strict mode enabled (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`)
- **Never use `any`** - use specific types or `unknown`
- Use `interface` for object shapes, `type` for unions/primitives

### Error Handling
- Use custom error classes extending `AppError`
- Services throw errors, controllers catch and handle them
- Always wrap external API calls in try-catch

### Git Commit Convention (AngularJS)
```
<type>(<scope>): <subject>

Examples:
feat(memory): add Framer Motion timeline layout
fix(auth): resolve Google OAuth token refresh
refactor(video): extract FFmpeg builder
test(memory): add unit tests for creation
docs(api): update endpoint documentation
```

**Rules:**
- Use imperative mood ("add" not "added")
- Lowercase first letter
- Max 50 characters
- No period at end

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no behavior change)
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Build/package manager

### Testing
- Use AAA pattern (Arrange, Act, Assert)
- Target: 80% unit test coverage
- Integration tests for all critical flows
- Mock external APIs and services

## File Structure

```
frontend/src/
├── app/              # Next.js pages (App Router)
│   ├── (auth)/
│   ├── (main)/
│   └── s/           # Share pages
├── components/
│   ├── memory/      # Memory-specific components
│   ├── ui/          # Reusable UI components
│   └── shared/      # Shared components
├── lib/
│   ├── api/         # API client functions
│   ├── hooks/       # Custom React hooks
│   ├── stores/      # Zustand stores
│   └── utils/       # Helper functions
└── types/           # TypeScript type definitions

backend/src/
├── auth/            # Authentication (Google OAuth, JWT)
├── users/           # User management
├── memories/        # Memory CRUD operations
├── ai/              # Claude API integration (AI interview)
├── spotify/         # Spotify API integration (music recommendations)
├── share/           # Share token generation and OG tag handling
└── shared/
    ├── prisma/      # Database client and schemas
    └── utils/       # Shared utilities
```

## Common Patterns

### Frontend: API Integration with React Query
```tsx
// lib/api/memories.ts
export const memoriesApi = {
  getAll: (filters?: Filters) => apiClient.get<Memory[]>('/memories', { params: filters }),
  create: (data: CreateMemoryDto) => apiClient.post<Memory>('/memories', data),
};

// lib/hooks/useMemories.ts
export function useMemories(filters?: Filters) {
  return useQuery({
    queryKey: ['memories', filters],
    queryFn: () => memoriesApi.getAll(filters),
  });
}

export function useCreateMemory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: memoriesApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['memories'] }),
  });
}
```

### Frontend: Framer Motion Animations
```tsx
<motion.div
  initial="hidden"
  animate="show"
  variants={{
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } }}
    />
  ))}
</motion.div>
```

### Backend: Creating API Endpoints
```typescript
// 1. Create DTO with validation
export class CreateMemoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;
}

// 2. Service layer
@Injectable()
export class MemoriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateMemoryDto) {
    return this.prisma.memory.create({ data: { userId, ...dto } });
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

### Backend: AI Interview Service Pattern
```typescript
@Injectable()
export class OpenAiService {
  constructor(private readonly client: OpenAI) {}

  async startInterview(initialContext?: string) {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: `Start an interview about these memories...` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });
    return JSON.parse(completion.choices[0].message.content);
  }

  async processChat(conversationHistory, userMessage: string) {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an empathetic interviewer...' },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ],
      response_format: { type: 'json_object' },
    });
    return JSON.parse(completion.choices[0].message.content);
  }

  async generateStory(conversationHistory) {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        ...conversationHistory,
        { role: 'user', content: 'Analyze and create story...' }
      ],
      response_format: { type: 'json_object' },
    });
    return JSON.parse(completion.choices[0].message.content);
  }
}
```

### Backend: Spotify Integration Pattern
```typescript
@Injectable()
export class SpotifyService {
  async getRecommendations(mood: string, intensity: number) {
    const params = this.mapMoodToSpotifyParams(mood, intensity);
    const tracks = await this.spotifyApi.getRecommendations(params);
    return tracks.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      previewUrl: track.preview_url,
    }));
  }

  private mapMoodToSpotifyParams(mood: string, intensity: number) {
    const moodMap = {
      '행복': { valence: 0.8, energy: intensity / 100 },
      '그리움': { valence: 0.3, energy: 0.4 },
      // ...other moods
    };
    return moodMap[mood] || { valence: 0.5, energy: 0.5 };
  }
}
```

## Performance Targets

- API response: p95 < 200ms
- Page load: LCP < 2.5s
- Animation FPS: > 60fps (smooth animations)
- Uptime: > 99.5%

## Environment Variables

### Frontend (Netlify)
```bash
NEXT_PUBLIC_API_URL=https://yeokk-da-backend.azurewebsites.net
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://yeokk-da.netlify.app
```

### Backend (Azure)
```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
ANTHROPIC_API_KEY=sk-ant-...
INSTAGRAM_CLIENT_ID=...
SPOTIFY_CLIENT_ID=...
AZURE_STORAGE_CONNECTION_STRING=...
FRONTEND_URL=https://yeokk-da.netlify.app
```

## Additional Resources

- **For AI Agents:** `.ai/CONTEXT.md`, `.ai/RULES.md`, `.ai/TASKS.md`, `.ai/PROJECT.md`
- **For Developers:** `docs/PRD.md`, `docs/guides/backend.md`, `docs/guides/frontend.md`
- **Production:** https://yeokk-da.netlify.app
- **Backend API:** https://yeokk-da-backend.azurewebsites.net
