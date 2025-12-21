# CONTEXT - Technical Reference

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Animation**: Framer Motion 11
- **State**: Zustand + Tanstack Query
- **Auth**: NextAuth.js 5.0
- **Deploy**: Netlify

### Backend
- **Framework**: Nest.js 10.3
- **ORM**: Prisma 5.8
- **Database**: PostgreSQL 15
- **Cache**: Redis (BullMQ)
- **Images**: Sharp
- **Deploy**: Azure App Service

### External APIs
- **AI**: GPT-4o (OpenAI)
- **Music**: Spotify Web API

### Infrastructure
- **Frontend**: Netlify
- **Backend**: Azure App Service
- **Storage**: Azure Blob Storage
- **Secrets**: Azure Key Vault
- **CI/CD**: GitHub Actions

---

## System Architecture

```
User (Browser)
    ↓
Netlify CDN
    ↓
Next.js Frontend (yeokk-da.netlify.app)
    ↓
Nest.js Backend (yeokk-da-backend.azurewebsites.net)
    ↓
┌──────────────────┼──────────────────┐
↓                  ↓                  ↓
PostgreSQL    Azure Blob         Redis
(Prisma)      Storage            (BullMQ)
    │
    └─> External APIs (OpenAI, Spotify)
```

---

## Database Schema (핵심만)

```prisma
model User {
  id          String    @id @default(cuid())
  email       String    @unique
  googleId    String    @unique
  memories    Memory[]
  integrations Integration[]
}

model Memory {
  id          String   @id @default(cuid())
  userId      String
  title       String
  videoUrl    String?
  moodTag     String      // "행복", "그리움"
  intensity   Int         // 0-100
  themeTag    String      // "여행", "성장"
  sources     MemorySource[]
  
  @@index([userId, memoryDate])
}

model Integration {
  id          String   @id @default(cuid())
  userId      String
  platform    String   // 'instagram', 'spotify', 'notion'
  accessToken String   @db.Text
  
  @@unique([userId, platform])
}
```

---

## API Endpoints (핵심만)

```typescript
// Auth
POST   /api/auth/google
GET    /api/auth/me

// Memories
GET    /api/memories
POST   /api/memories
GET    /api/memories/:id
POST   /api/memories/upload

// AI Interactive Interview
POST   /api/ai/start-interview
POST   /api/ai/chat
POST   /api/ai/generate-story

// Spotify (Music Frequency Matching)
POST   /api/spotify/connect
GET    /api/spotify/recommendations
GET    /api/spotify/search
POST   /api/memories/:id/bgm

// Share
POST   /api/memories/:id/share
GET    /s/:shareToken
POST   /api/memories/:id/export-story
```

---

## Environment Variables

### Frontend (Netlify)
```bash
NEXT_PUBLIC_API_URL=https://yeokk-da-backend.azurewebsites.net
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[YOUR_ID]
NEXTAUTH_SECRET=[SECRET]
NEXTAUTH_URL=https://yeokk-da.netlify.app
```

### Backend (Azure)
```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
AZURE_STORAGE_CONNECTION_STRING=...
FRONTEND_URL=https://yeokk-da.netlify.app
```

---

## Key Flows

### Memory Creation (Gamified Interview)
```
1. User uploads images (direct upload)
2. OpenAI GPT-4o analyzes text and conducts interactive interview
3. User engages in dialog-based interview to build narrative
4. AI extracts { moodTag, intensity, themeTag, storyLine, animationTheme }
5. Spotify API recommends BGM based on mood/theme
6. User explores and selects BGM via radio dial UI
7. Save to DB with cinematic layout config
8. Generate scroll-driven interactive page
```

### Music Frequency Matching (Spotify)
```
1. AI analysis provides mood/theme metadata
2. Backend calls Spotify API for track recommendations
3. Frontend renders radio dial UI with preview support
4. User fine-tunes selection through dial interaction
5. Final BGM is synced with animation timeline
6. Track metadata saved to Memory record
```

### Cinematic Page & Share
```
1. Memory rendered with 5 layout types: Magazine, Cinema, Parallax, Collage, Music Story
2. Scroll-driven Framer Motion animations applied
3. User generates share link with OG tags
4. Instagram Story export creates optimized image/video card
5. Non-authenticated users can view via /s/:token
```

---

## File Structure

```
frontend/src/
├── app/              # Next.js pages
├── components/       # UI components
├── lib/
│   ├── api/         # API clients
│   ├── hooks/       # Custom hooks
│   └── stores/      # Zustand stores

backend/src/
├── auth/            # Authentication
├── memories/        # Memory CRUD
├── integrations/    # External APIs
├── ai/              # OpenAI API
├── video/           # FFmpeg processing
└── shared/          # Prisma, utils
```

---

## Performance Targets

- API response: p95 < 200ms
- Page load: LCP < 2.5s
- Animation FPS: > 60fps
- Uptime: > 99.5%

---

## URLs

- **Frontend**: https://yeokk-da.netlify.app
- **Backend**: https://yeokk-da-backend.azurewebsites.net
- **Share Pages**: https://yeokk-da.netlify.app/s/:token

---