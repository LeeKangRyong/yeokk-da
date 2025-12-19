# PRD: 엮다 (Yeokk-da)

## 서비스 정의

**엮다**는 흩어진 디지털 발자취를 하나의 이야기로 엮어내는 AI 추억 플랫폼입니다.

사용자의 SNS, 음악 스트리밍, 개인 콘텐츠를 AI가 분석하여:
- 스크롤 기반 인터랙티브 스토리텔링 (Scroll-driven Storytelling)
- AI 테마별 동적 배경 애니메이션
- 추억 카드의 마법 같은 전환 효과 (Shared Layout Animations)
- 자동 정리 & 분류
- 간편한 공유

**URL**: https://yeokk-da.netlify.app

---

## 핵심 가치

- **통합**: 모든 플랫폼의 데이터를 한 곳에
- **재해석**: AI가 맥락을 이해하고 감성적으로 재구성
- **경험**: 정적인 기록을 역동적인 경험으로 전환
- **공유**: 개인의 추억을 스토리텔링으로 공유

---

## 사용자 플로우

### 추억 생성
```
입력 → AI 분석 → 인터랙티브 페이지 생성 → 저장 완료
```

1. **다양한 입력**
   - 직접 입력: 텍스트 + 이미지
   - SNS 연동: Instagram
   - 음악: Spotify

2. **AI 통합 분석**
   - Claude API가 모든 데이터 분석
   - 감정 키워드 추출 (moodTag: "행복", "그리움")
   - 주제 분류 (themeTag: "여행", "성장")
   - 스토리라인 생성

3. **인터랙티브 페이지**
   - Framer Motion 고급 애니메이션
   - 5가지 레이아웃: Timeline, Gallery, Magazine, Collage, Music Story
   - 스크롤 기반 패럴랙스 & 시네마틱 효과
   - AI 테마 기반 동적 배경 (파티클, 그라데이션)
   - Shared Element Transition (추억 카드 전환)

4. **자동 저장**
   - AI 기반 태그 자동 생성
   - 시간순/감정별/주제별 분류

### 추억 탐색
```
홈 → 필터 → 상세 보기 → 인터랙티브 경험 → 공유
```

- 타임라인 뷰
- 감정/주제별 필터
- AI 추천
- 검색

### 공유
```
공유 버튼 → 링크 생성 → 설정 → 공유
```

- 고유 URL (https://yeokk-da.netlify.app/s/abc123)
- 공개/비공개 설정
- 비밀번호 보호 (선택)
- SNS 직접 공유 (카카오톡, Instagram)

---

## 핵심 기능

### 1. 데이터 소스

#### 직접 입력
- 텍스트 (최대 500자)
- 이미지 (최대 10장)
- 날짜 지정

#### SNS 연동
- **Instagram**: 게시물, 스토리, 위치, 해시태그

#### 음악
- **Spotify**: 최근 재생, Top Tracks, Audio Features

#### 노션
- 페이지 전체 임포트
- 블록 단위 파싱 (텍스트, 이미지)

### 2. AI 분석

- 감정 분석: moodTag + intensity (0-100)
- 주제 분류: themeTag
- 키워드 추출
- 인물/장소 추출
- 스토리라인 생성 (3-5문장)
- 음악-감정 매칭

### 3. 추억 페이지

#### 레이아웃
1. **Timeline**: 시간 흐름 중심, 세로 스크롤
2. **Gallery**: 이미지 중심, 마소너리
3. **Magazine**: 잡지 스타일, 큰 이미지
4. **Collage**: 자유로운 배치
5. **Music Story**: 음악 중심, 앨범 커버

#### 애니메이션 (Framer Motion)
- **스크롤 기반 인터랙션**
  - Scroll-triggered reveals (요소별 등장)
  - Parallax scrolling (다층 깊이감)
  - Scroll velocity effects (스크롤 속도 반응)
  
- **Shared Layout Animations**
  - 추억 카드 클릭 시 부드러운 확장
  - 리스트 ↔ 상세 뷰 자연스러운 전환
  - layoutId 기반 요소 추적
  
- **AI 테마별 동적 배경**
  - 행복: 밝은 파티클 + 그라데이션
  - 그리움: 부드러운 안개 효과
  - 설렘: 반짝이는 라이트
  - 여행: 지도 기반 애니메이션
  
- **마이크로 인터랙션**
  - 호버 시 3D 틸트
  - 클릭 피드백 애니메이션
  - 로딩 스켈레톤 (suspense)

### 4. 공유

- 고유 URL (https://yeokk-da.netlify.app/s/:token)
- 비밀번호 보호
- 만료 기간 설정 (7일/30일/영구)
- 조회수 추적
- SNS 메타 태그 (OG, Twitter Card)

---

## 개발 로드맵

### Phase 1: MVP (2일)
- Day 1: 환경 세팅, JIRA 티켓 작성, 기초 웹 설정
- Day 2: 기반 구축, 직접 입력 기능, Instagram 연동

### Phase 2: 음악 & 애니메이션 고도화 (2일)
- Day 3: Spotify 연동, 기초 애니메이션 구현
- Day 4: 고급 애니메이션 구현
  - Scroll-driven animations
  - Shared layout transitions
  - AI 테마별 배경

### Phase 3: 공유 & 최적화 (1일)
- Day 5: 공유 기능, 성능 최적화 & 애니메이션 최적화

### Phase 4: 론칭 (1일)
- 베타 테스트
- 모니터링 설정
- 공식 론칭
---

## 기술
- API 응답 시간: p95 < 200ms
- 페이지 로딩 시간: < 2초
- 애니메이션 FPS: > 60fps
- 시스템 가용성: > 99.5%

---

## 차별화 포인트

1. **진정한 통합**: 단순 백업이 아닌 AI 재해석
2. **몰입형 경험**: 스크롤 기반 시네마틱 스토리텔링
3. **마법 같은 전환**: Shared Layout Animations으로 부드러운 흐름
4. **AI 반응형 비주얼**: 감정에 따라 변하는 동적 배경
