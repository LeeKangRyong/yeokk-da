# JIRA Ticket Changes Required

## Overview
This document outlines the JIRA ticket changes needed to align with the updated PRD (docs/PRD.md) focusing on:
- Gamified AI Interview
- Spotify Music Frequency Matching
- Cinematic Layouts (5 types)
- SNS Sharing (Instagram Story, Link)

---

## 1. YD-7: Modify Existing Ticket

**Current Title (assumed)**: Instagram API 연동
**New Title**: AI 대화형 업로드 UI 및 이미지 처리

**New Description**:
```
직접 업로드 방식의 추억 생성 기능 구현. AI가 이미지를 분석하여 인터랙티브 인터뷰를 진행하고, 사용자 응답을 기반으로 서사를 구축합니다.

## 구현 범위
- [x] 이미지 직접 업로드 (최대 10장, 각 10MB)
- [x] Azure Blob Storage 연동 및 이미지 최적화
- [x] Claude AI 텍스트 분석 (mood, theme, story)
- [ ] Claude AI 이미지 분석 및 질문 생성
- [ ] 인터랙티브 인터뷰 UI (채팅 인터페이스)
- [ ] 실시간 서사 빌드업 피드백

## 기술 스택
- Backend: Nest.js, Anthropic SDK, Azure Storage, Sharp
- Frontend: Next.js, React, Framer Motion

## 관련 API
- POST /api/memories (이미지 + 텍스트 업로드)
- POST /api/ai/chat (인터뷰 질의응답)
- POST /api/ai/analyze-image (이미지 분석 및 질문 생성)

## 완료 조건
- 사용자가 이미지를 업로드하고 AI와 대화를 통해 추억을 완성할 수 있음
- AI 분석 결과가 정확하게 DB에 저장됨
- 이미지가 최적화되어 Azure Blob에 업로드됨
```

**Status**: In Progress
**Priority**: High
**Phase**: Day 2

---

## 2. New Ticket: Spotify 음악 주파수 맞추기

**Title**: Spotify 음악 주파수 맞추기 구현

**Description**:
```
AI 분석 결과(mood/theme)를 기반으로 Spotify 곡을 추천하고, 라디오 다이얼 방식의 UI로 탐색 및 선택할 수 있는 기능 구현

## 구현 범위
### Backend
- [ ] Spotify OAuth 연동
- [ ] AI 분석 기반 트랙 추천 API
- [ ] 곡 검색 API
- [ ] Preview URL 제공 API
- [ ] Memory에 BGM 설정 API

### Frontend
- [ ] Spotify 연동 버튼
- [ ] 라디오 다이얼 UI (SVG/Canvas)
- [ ] 주파수 튜닝 인터랙션 (드래그/스와이프)
- [ ] 트랙 미리듣기 플레이어
- [ ] BGM 선택 확정 UI

## 기술 스택
- Backend: Nest.js, Spotify Web API
- Frontend: Next.js, React, SVG/Canvas

## 관련 API
- POST /api/spotify/connect
- GET /api/spotify/recommendations
- GET /api/spotify/search
- GET /api/spotify/track/:id/preview
- POST /api/memories/:id/bgm

## 완료 조건
- AI 분석 무드에 맞는 Spotify 곡 추천이 작동함
- 사용자가 라디오 다이얼로 곡을 탐색하고 미리들을 수 있음
- 선택한 BGM이 Memory에 저장됨
```

**Priority**: High
**Phase**: Day 2-3
**Estimate**: 2 days

---

## 3. New Ticket: Framer Motion 시네마틱 레이아웃 5종 구현

**Title**: Framer Motion 시네마틱 레이아웃 5종 구현

**Description**:
```
추억을 한 편의 영화처럼 보여주는 5가지 시네마틱 레이아웃 구현. 스크롤 기반 인터랙션과 애니메이션을 포함합니다.

## 레이아웃 5종
1. **Magazine**: 잡지 편집 레이아웃 (그리드 + 타이포그래피)
2. **Cinema**: 영화 예고편 풀스크린 (16:9 비율, 자막 스타일)
3. **Parallax**: 다층 깊이 스크롤 효과
4. **Collage**: 자유로운 배치, 회전, 중첩
5. **Music Story**: 음악 플레이어 + 가사 스타일

## 구현 범위
- [ ] 5가지 레이아웃 컴포넌트 개발
- [ ] Scroll-driven animations (useScroll + useTransform)
- [ ] IntersectionObserver 기반 reveal 효과
- [ ] Shared Layout Animations (Card ↔ Detail 전환)
- [ ] 레이아웃별 AI 테마 배경 (5가지 감정 테마)

## 기술 스택
- Frontend: Next.js, Framer Motion 11, Tailwind CSS

## 완료 조건
- 5가지 레이아웃이 모두 구현되어 있음
- 스크롤 시 부드러운 애니메이션이 작동함
- 카드에서 상세 페이지로 자연스러운 전환이 이루어짐
- 60fps 이상의 성능 유지
```

**Priority**: High
**Phase**: Day 3
**Estimate**: 2 days

---

## 4. New Ticket: SNS 공유 기능 구현

**Title**: SNS 공유 기능 (인스타그램 스토리, 링크 공유) 구현

**Description**:
```
시네마틱 추억 페이지를 인스타그램 스토리 및 다양한 SNS로 공유할 수 있는 기능 구현

## 구현 범위
### Share Link Generation
- [ ] 공유 토큰 생성 (/s/:token)
- [ ] 비회원 접근 가능한 공개 페이지
- [ ] Dynamic OG Tag 메타데이터

### Instagram Story Export
- [ ] 시네마틱 페이지를 이미지/영상으로 캡처
- [ ] html-to-image 또는 Puppeteer 활용
- [ ] 스토리 규격 (1080x1920) 최적화

### Multi-channel Share
- [ ] 카카오톡 공유 버튼
- [ ] 트위터 공유 버튼
- [ ] 링크 복사 버튼

## 기술 스택
- Backend: Nest.js, Puppeteer (optional)
- Frontend: Next.js, html-to-image, OG tags

## 관련 API
- POST /api/memories/:id/share
- GET /s/:shareToken
- POST /api/memories/:id/export-story

## 완료 조건
- 공유 링크가 생성되고 비회원이 접근 가능함
- OG 태그가 정확하게 렌더링됨
- 인스타그램 스토리용 이미지가 올바른 규격으로 생성됨
```

**Priority**: High
**Phase**: Day 4
**Estimate**: 1.5 days

---

## 5. Roadmap Realignment

### Phase 1: MVP (Days 1-2)
- **Day 1**: 환경 세팅, Memory CRUD API, Azure Blob 연동 ✅ (Partially Done)
- **Day 2**: Claude AI 분석 연동, 게임형 인터뷰 UI, Spotify 추천 로직 🚧 (In Progress)
  - Ticket: YD-7 (modified)
  - Ticket: Spotify 음악 주파수 맞추기 (new)

### Phase 2: 시네마틱 엔진 & 공유 (Days 3-4)
- **Day 3**: Spotify 라디오 다이얼 UI, 시네마틱 레이아웃 뼈대
  - Ticket: Spotify 음악 주파수 맞추기 (continued)
  - Ticket: Framer Motion 시네마틱 레이아웃 5종
- **Day 4**: SNS 공유 기능, 테마 배경 완성
  - Ticket: SNS 공유 기능
  - Ticket: AI Theme-based Dynamic Backgrounds

### Phase 3: 최적화 & 론칭 (Day 5)
- 고유 URL 공유 기능 최종 점검
- 인트로 애니메이션
- 성능 최적화

---

## Code Review: YD-7 Implementation Status

### ✅ Implemented (Aligned with PRD)
1. **Direct Upload**:
   - Controller: FilesInterceptor with 10 files max, 10MB limit
   - File validation: JPEG, PNG, WebP only
   - Image optimization: Sharp processing
   - Azure Blob Storage: Upload with CDN cache headers

2. **AI Text Analysis**:
   - AnthropicService with Claude 3.5 Sonnet
   - Mood/theme/story extraction
   - Animation theme mapping
   - Proper error handling and fallbacks

3. **Data Flow**:
   - Memory creation saves AI analysis to DB
   - Images linked to Memory via relations
   - Manual source type properly set

### ⚠️ Partially Implemented / Missing
1. **Image Analysis** (anthropic.service.ts:71-73):
   - TODO comment indicates image analysis not yet implemented
   - Current implementation only analyzes text content
   - **PRD Requirement**: AI should analyze images and generate contextual questions

2. **Interactive Interview**:
   - No chat/interview endpoints implemented
   - No dialog-based Q&A functionality
   - **PRD Requirement**: User engages in gamified interview to build narrative

3. **Spotify Integration**:
   - Not implemented
   - **PRD Requirement**: Music frequency matching based on mood/theme

### 🐛 Potential Issues
1. **Image Analysis Gap**:
   - AI cannot see uploaded images before analysis
   - May result in less accurate mood/theme detection
   - Interview questions cannot be image-specific

2. **User Experience**:
   - One-shot creation without iterative dialog
   - User cannot refine AI analysis through conversation

### 📝 Recommendations
1. Implement image analysis in AnthropicService:
   - Convert uploaded images to base64 or use public URLs
   - Include images in Claude API message content

2. Add AI interview endpoints:
   - POST /api/ai/chat for Q&A
   - POST /api/ai/analyze-image for initial questions
   - POST /api/ai/generate-story for final narrative

3. Integrate Spotify API for BGM selection

---

## Summary of Actions Needed

### Immediate (via JIRA MCP)
1. ✏️ Update YD-7 ticket with new title, description, scope
2. ➕ Create "Spotify 음악 주파수 맞추기" ticket
3. ➕ Create "Framer Motion 시네마틱 레이아웃 5종" ticket
4. ➕ Create "SNS 공유 기능" ticket
5. 📅 Adjust roadmap/sprint dates to match Day 2-5 schedule

### Development (Code Changes)
1. Complete image analysis in AnthropicService
2. Implement AI interview/chat endpoints
3. Build Spotify integration
4. Develop 5 cinematic layouts
5. Implement share functionality
