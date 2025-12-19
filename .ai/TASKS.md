# TASKS - Current Work

## 🎯 Phase 1: MVP (Weeks 1-6)

### ✅ Week 1-2: Foundation (DONE)
- [ ] Project setup (Next.js + Nest.js)
- [ ] Google OAuth
- [ ] Prisma schema
- [ ] Azure resources
- [ ] CI/CD pipeline

### 🚧 Week 3-4: Core Features (IN PROGRESS)

#### Backend
- [ ] Memory CRUD API
  - [ ] POST /api/memories (text + images)
  - [ ] GET /api/memories (list with filters)
  - [ ] GET /api/memories/:id (detail)
- [ ] Claude AI integration
  - [ ] Emotion analysis service
  - [ ] Story generation
- [ ] Azure Blob Storage
  - [ ] Image upload
  - [ ] Image optimization (Sharp)

#### Frontend
- [ ] Memory creation page
  - [ ] Text input form
  - [ ] Image upload (drag & drop)
  - [ ] Real-time AI feedback
- [ ] Memory list page
  - [ ] Timeline view
  - [ ] Filter by mood/theme
- [ ] Basic Framer Motion animations

#### Testing
- [ ] Backend unit tests (memories.service)
- [ ] Frontend component tests (MemoryCard)

---

### 📅 Week 5-6: Instagram Integration

#### Backend
- [ ] Instagram OAuth flow
- [ ] Import Instagram posts
- [ ] Normalize Instagram data

#### Frontend
- [ ] Integration settings page
- [ ] Instagram connect button
- [ ] Import progress UI

---

## 🔜 Next: Phase 2 (Weeks 7-10)

- Spotify integration
- Notion integration
- Video generation (FFmpeg)
- Enhanced animations

---

## 🐛 Known Issues

1. **Memory creation slow** - Need to optimize AI analysis
2. **Image upload fails for >10MB** - Add file size validation
3. **OAuth redirect broken on staging** - Check Azure App Service config

---

## 💡 Ideas / Future

- [ ] Mobile app (React Native)
- [ ] AI voice narration
- [ ] Collaborative memories (friends)
- [ ] Physical print service
