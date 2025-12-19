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
- **Video**: FFmpeg
- **Images**: Sharp
- **Deploy**: Azure App Service

### External APIs
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Social**: Instagram Graph API, Twitter API v2, Facebook Graph API
- **Music**: Spotify Web API
- **Productivity**: Notion API

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
    └─> External APIs (Claude, Instagram, Spotify, Notion, Twitter)
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

// Integrations
POST   /api/integrations/:platform/connect
POST   /api/integrations/:platform/import

// Memories
GET    /api/memories
POST   /api/memories
GET    /api/memories/:id
POST   /api/memories/upload

// Share
POST   /api/memories/:id/share
GET    /s/:shareToken
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
ANTHROPIC_API_KEY=sk-ant-...
INSTAGRAM_CLIENT_ID=...
SPOTIFY_CLIENT_ID=...
AZURE_STORAGE_CONNECTION_STRING=...
FRONTEND_URL=https://yeokk-da.netlify.app
```

---

## Key Flows

### Memory Creation
```
1. User uploads text + images
2. Backend calls Claude API for analysis
3. AI returns { moodTag, intensity, themeTag, storyLine }
4. Save to DB
5. Queue video generation job (BullMQ)
6. FFmpeg renders video → Azure Blob
7. Update DB with videoUrl
```

### Integration Import
```
1. OAuth flow (Instagram/Spotify/Notion)
2. Fetch user data from external API
3. Normalize to UnifiedPost format
4. Store in MemorySource
5. Trigger AI analysis
6. Create Memory
```

### Video Generation
```
1. BullMQ picks up job
2. Download images from Azure Blob
3. Build FFmpeg command (Ken Burns + transitions)
4. Render video
5. Upload to Azure Blob
6. Update Memory.videoUrl
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
├── ai/              # Claude API
├── video/           # FFmpeg processing
└── shared/          # Prisma, utils
```

---

## Performance Targets

- API response: p95 < 200ms
- Page load: LCP < 2.5s
- Video generation: < 3 minutes
- Uptime: > 99.5%

---

## URLs

- **Frontend**: https://yeokk-da.netlify.app
- **Backend**: https://yeokk-da-backend.azurewebsites.net
- **Share Pages**: https://yeokk-da.netlify.app/s/:token
