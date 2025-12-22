# TASKS - Current Work

## 🎯 Phase 1: MVP (Days 1-2)

### ✅ Foundation Setup (DONE)
- [x] Project setup (Next.js + Nest.js)
- [x] Google OAuth
- [x] Prisma schema
- [x] Initial documentation

### 📅 Day 1: 환경 세팅 & 기초 웹 설정

#### 환경 세팅
- [x] Azure resources 설정
  - [x] PostgreSQL database
  - [x] Redis cache
  - [x] Blob Storage
  - [x] Key Vault
- [x] CI/CD pipeline 구축
  - [x] GitHub Actions 설정
  - [x] Netlify 연동
  - [x] Azure 배포 설정

#### JIRA 티켓 작성
- [x] Phase 1-4 전체 티켓 구조화
- [x] 세부 작업 티켓 생성
- [x] 우선순위 설정

#### 기초 웹 설정
- [x] Frontend 기본 레이아웃 ✅ (2025-12-20)
  - [x] Header/Navigation (YD-16)
  - [x] Footer (YD-17)
  - [x] 기본 라우팅 구조 (YD-18)
- [x] Backend 기본 구조
  - [x] 헬스 체크 엔드포인트
  - [x] 에러 핸들링 미들웨어
  - [x] 로깅 설정

---

### ✅ Day 2: OpenAI AI 분석 연동, 게임형 인터뷰 UI, Spotify 추천 로직 (COMPLETED)

#### 기반 구축
- [x] Memory CRUD API
  - [x] POST /api/memories (text + images)
  - [x] GET /api/memories (list with filters)
  - [x] GET /api/memories/:id (detail)
- [x] OpenAI AI integration
  - [x] Contextual question generation when text is provided
  - [x] Interactive interview dialog processing
  - [x] Emotion analysis service
  - [x] Theme classification
  - [x] Story generation
  - [x] Animation theme 생성
- [x] Azure Blob Storage
  - [x] Image upload (direct upload)
  - [x] Image optimization (Sharp)

#### 게임화된 AI 인터뷰 UI
- [ ] Frontend: AI Interview chat interface
  - [ ] Chat bubble UI with AI questions
  - [ ] User response input
  - [ ] Real-time narrative building feedback
  - [ ] Progressive disclosure of questions
- [ ] Frontend: Memory upload flow
  - [ ] Image upload (drag & drop)
  - [ ] Image preview with thumbnails
  - [ ] Upload progress indicator
- [ ] Frontend: Memory list page
  - [ ] Timeline view
  - [ ] Filter by mood/theme
  - [ ] Card grid layout
  - [ ] Entry animations (Framer Motion)

#### Spotify 추천 로직 구축
- [ ] Backend: Spotify integration
  - [ ] Spotify OAuth flow
  - [ ] Track recommendation API (mood/theme based)
  - [ ] Search API integration
  - [ ] Preview URL fetching
- [ ] Backend: Music matching service
  - [ ] Mood-to-genre mapping logic
  - [ ] Theme-based track filtering
  - [ ] BGM assignment to Memory

#### Testing
- [ ] Backend unit tests (memories.service, ai.service)
- [ ] Frontend component tests (AIChat, MemoryCard)

---

## 🔜 Phase 2: 시네마틱 엔진 & 공유 (Days 3-4)

### Day 3: Spotify 라디오 다이얼 UI, 시네마틱 레이아웃 뼈대
- [ ] **Spotify 라디오 다이얼 UI**
  - [ ] Radio dial component (SVG/Canvas)
  - [ ] Frequency tuning interaction (drag/swipe)
  - [ ] Track preview playback
  - [ ] Real-time recommendation updates
  - [ ] BGM selection confirmation

- [ ] **시네마틱 레이아웃 5종 구현 (뼈대)**
  - [ ] **Magazine**: 잡지 편집 레이아웃 (그리드 + 타이포그래피)
  - [ ] **Cinema**: 영화 예고편 풀스크린 (16:9 비율, 자막 스타일)
  - [ ] **Parallax**: 다층 깊이 스크롤 효과
  - [ ] **Collage**: 자유로운 배치, 회전, 중첩
  - [ ] **Music Story**: 음악 플레이어 + 가사 스타일

- [ ] **Basic Scroll Animations**
  - [ ] useScroll + useTransform hooks
  - [ ] Scroll-triggered reveals
  - [ ] IntersectionObserver integration
  - [ ] Page transitions

### Day 4: SNS 공유 기능, 테마 배경 완성
- [ ] **SNS 공유 기능**
  - [ ] Share link generation (/s/:token)
  - [ ] Dynamic OG Tag metadata
  - [ ] Instagram Story image/video export
  - [ ] html-to-image or Puppeteer screenshot
  - [ ] Kakao/Twitter share button integration

- [ ] **AI Theme-based Dynamic Backgrounds**
  - [ ] **Happy**: 밝은 파티클, 따뜻한 그라데이션
  - [ ] **Nostalgic**: 부드러운 안개, 차분한 색상
  - [ ] **Exciting**: 반짝이는 빛, 생동감 있는 색상
  - [ ] **Peaceful**: 부드러운 물결, 평온한 그라데이션
  - [ ] **Melancholy**: 빗방울 효과, 쿨톤 색상

- [ ] **Shared Layout Animations**
  - [ ] Card → Detail 부드러운 전환
  - [ ] layoutId 기반 morphing
  - [ ] AnimatePresence 구현

- [ ] **Micro-interactions**
  - [ ] 3D tilt on hover
  - [ ] Click feedback ripple
  - [ ] Loading skeletons

---

## 🔜 Phase 3: 최적화 & 론칭 (Day 5)

### 고유 URL 공유 기능 최종 점검
- [ ] Share token security validation
- [ ] OG tag dynamic rendering test
- [ ] Instagram Story export quality check
- [ ] Multi-device share link compatibility

### 인트로 애니메이션
- [ ] Landing page hero animation
- [ ] Service concept explainer (Lottie or Framer Motion)
- [ ] CTA button micro-interactions

### 성능 최적화
- [ ] 애니메이션 성능 최적화
  - [ ] requestAnimationFrame 최적화
  - [ ] GPU 가속 활용 (transform, opacity)
  - [ ] Reduced motion 지원 (prefers-reduced-motion)
- [ ] 이미지 lazy loading & placeholder
- [ ] Code splitting & dynamic imports
- [ ] Lighthouse audit (LCP < 2.5s, FPS > 60)

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
