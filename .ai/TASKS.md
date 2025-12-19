# TASKS - Current Work

## 🎯 Phase 1: MVP (Days 1-2)

### ✅ Foundation Setup (DONE)
- [x] Project setup (Next.js + Nest.js)
- [x] Google OAuth
- [x] Prisma schema
- [x] Initial documentation

### 📅 Day 1: 환경 세팅 & 기초 웹 설정

#### 환경 세팅
- [ ] Azure resources 설정
  - [ ] PostgreSQL database
  - [ ] Redis cache
  - [ ] Blob Storage
  - [ ] Key Vault
- [ ] CI/CD pipeline 구축
  - [ ] GitHub Actions 설정
  - [ ] Netlify 연동
  - [ ] Azure 배포 설정

#### JIRA 티켓 작성
- [ ] Phase 1-4 전체 티켓 구조화
- [ ] 세부 작업 티켓 생성
- [ ] 우선순위 설정

#### 기초 웹 설정
- [ ] Frontend 기본 레이아웃
  - [ ] Header/Navigation
  - [ ] Footer
  - [ ] 기본 라우팅 구조
- [ ] Backend 기본 구조
  - [ ] 헬스 체크 엔드포인트
  - [ ] 에러 핸들링 미들웨어
  - [ ] 로깅 설정

---

### 🚧 Day 2: 기반 구축, 직접 입력 기능, Instagram 연동 (IN PROGRESS)

#### 기반 구축
- [ ] Memory CRUD API
  - [ ] POST /api/memories (text + images)
  - [ ] GET /api/memories (list with filters)
  - [ ] GET /api/memories/:id (detail)
- [ ] Claude AI integration
  - [ ] Emotion analysis service
  - [ ] Theme classification
  - [ ] Story generation
  - [ ] Animation theme 생성
- [ ] Azure Blob Storage
  - [ ] Image upload
  - [ ] Image optimization (Sharp)

#### 직접 입력 기능
- [ ] Frontend: Memory creation page
  - [ ] Text input form (validation)
  - [ ] Image upload (drag & drop)
  - [ ] Real-time AI feedback UI
  - [ ] 이미지 최적화 처리
- [ ] Frontend: Memory list page
  - [ ] Timeline view
  - [ ] Filter by mood/theme
  - [ ] Card grid layout
  - [ ] Entry animations (Framer Motion)
- [ ] Basic Framer Motion animations
  - [ ] Scroll-triggered reveals
  - [ ] Hover effects
  - [ ] Page transitions

#### Instagram 연동
- [ ] Backend: Instagram integration
  - [ ] Instagram OAuth flow
  - [ ] Import Instagram posts API
  - [ ] Normalize Instagram data
- [ ] Frontend: Integration UI
  - [ ] Integration settings page
  - [ ] Instagram connect button
  - [ ] Import progress UI

#### Testing
- [ ] Backend unit tests (memories.service)
- [ ] Frontend component tests (MemoryCard)

---

## 🔜 Phase 2: 음악 & 애니메이션 고도화 (Days 3-4)

### Day 3: Spotify Integration & Basic Animations
- [ ] Spotify OAuth & data import
- [ ] Music-emotion matching
- [ ] Music Story layout
- [ ] Basic scroll animations
- [ ] Hover effects
- [ ] Page transitions

### Day 4: Advanced Animations
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

## 🔜 Phase 3: 공유 & 최적화 (Day 5)

### 공유 기능
- [ ] 고유 URL 생성
- [ ] 공개/비공개 설정
- [ ] SNS 메타 태그

### 성능 & 애니메이션 최적화
- [ ] 애니메이션 성능 최적화
  - [ ] requestAnimationFrame 최적화
  - [ ] GPU 가속 활용
  - [ ] Reduced motion 지원
- [ ] 이미지 lazy loading
- [ ] Code splitting

---

## 🔜 Phase 4: 론칭 (Day 6)

### 베타 테스트
- [ ] 테스트 시나리오 작성
- [ ] 버그 수정

### 모니터링 설정
- [ ] 에러 트래킹
- [ ] 성능 모니터링

### 공식 론칭
- [ ] 최종 점검
- [ ] 배포

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
