# TASKS - Current Work

## 🎯 Phase 1: MVP (Weeks 1-6)

### ✅ Week 1-2: Foundation (DONE)
- [x] Project setup (Next.js + Nest.js)
- [x] Google OAuth
- [x] Prisma schema
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
  - [ ] Theme classification
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
  - [ ] Timeline view with scroll animations
  - [ ] Filter by mood/theme
  - [ ] Card grid layout
- [ ] Basic Framer Motion animations
  - [ ] Scroll-triggered reveals
  - [ ] Hover effects
  - [ ] Page transitions

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
- [ ] Card grid with entry animations

---

## 🔜 Next: Phase 2 (Weeks 7-10)

### Week 7-8: Spotify Integration
- [ ] Spotify OAuth & data import
- [ ] Music-emotion matching
- [ ] Music Story layout

### Week 9-10: Advanced Animations
- [ ] **Scroll-driven Storytelling**
  - [ ] Parallax effects (다층 깊이)
  - [ ] Scroll velocity tracking
  - [ ] useScroll + useTransform hooks
  - [ ] IntersectionObserver reveals
  
- [ ] **Shared Layout Animations**
  - [ ] Card → Detail 부드러운 전환
  - [ ] layoutId 기반 morphing
  - [ ] AnimatePresence 구현
  - [ ] List reordering animations
  
- [ ] **AI Theme-based Dynamic Backgrounds**
  - [ ] Particle systems (행복, 설렘)
  - [ ] Dynamic gradients (그리움, 평온)
  - [ ] Canvas animations (여행, 성장)
  - [ ] 테마별 색상 팔레트
  
- [ ] **Micro-interactions**
  - [ ] 3D tilt on hover
  - [ ] Click feedback ripple
  - [ ] Loading skeletons
  - [ ] Gesture controls

---

## 🔜 Phase 3 (Weeks 11-13)

### Week 11-12: 공유 기능
- [ ] 고유 URL 생성
- [ ] 공개/비공개 설정
- [ ] SNS 메타 태그

### Week 13: 최적화
- [ ] 애니메이션 성능 최적화
  - [ ] requestAnimationFrame 최적화
  - [ ] GPU 가속 활용
  - [ ] Reduced motion 지원
- [ ] 이미지 lazy loading
- [ ] Code splitting

---

## 🐛 Known Issues

1. **Memory creation slow** - AI 분석 최적화 필요
2. **Image upload fails for >10MB** - 파일 크기 검증 추가
3. **OAuth redirect broken on staging** - Azure 설정 확인
4. **Animation jank on mobile** - 성능 최적화 & reduced motion

---

## 💡 Ideas / Future

- [ ] Mobile app (React Native)
- [ ] AI voice narration
- [ ] Collaborative memories (친구 초대)
- [ ] Physical print service
- [ ] VR/AR 추억 경험
- [ ] Gesture-based navigation
- [ ] 3D memory spaces
