# 엮다 (Yeokk-da) Backend API 명세서

## 개요

엮다 백엔드 API는 AI 인터랙티브 인터뷰를 통한 시네마틱 추억 복원 플랫폼의 서버 사이드 기능을 제공합니다.

핵심 기능:
- **게임화된 AI 인터뷰**: Claude AI와의 대화를 통한 추억 서사 구축
- **음악 주파수 맞추기**: Spotify API 기반 감성 BGM 큐레이션
- **시네마틱 레이아웃**: Framer Motion 기반 5종 애니메이션 테마
- **멀티 채널 공유**: 인스타그램 스토리, 링크 공유 최적화

- **Version:** 0.0.1
- **Base URL (개발):** `http://localhost:3000`
- **Base URL (운영):** `https://yeokk-da-backend.azurewebsites.net`
- **Framework:** Nest.js 10.3
- **Database:** PostgreSQL 15

## 공통 사항

### 응답 형식

모든 API 응답은 JSON 형식입니다.

#### 성공 응답
```json
{
  "data": { ... }
}
```

#### 에러 응답
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

### HTTP 상태 코드

| 코드 | 설명 |
|------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 리소스 없음 |
| 500 | 서버 에러 |
| 503 | 서비스 불가 |

---

## API 엔드포인트

### 1. Root

#### GET /

서비스 기본 응답을 반환합니다.

**요청**
```http
GET / HTTP/1.1
Host: localhost:3000
```

**응답**
```json
"Hello World!"
```

**상태 코드**
- `200 OK`: 성공

---

### 2. Health Check

시스템 헬스 체크를 위한 엔드포인트입니다. Kubernetes readiness/liveness probe 등에 활용됩니다.

#### GET /health

전체 시스템 헬스 체크를 수행합니다. 메모리와 디스크 상태를 확인합니다.

**요청**
```http
GET /health HTTP/1.1
Host: localhost:3000
```

**응답 (정상)**
```json
{
  "status": "ok",
  "info": {
    "memory_heap": {
      "status": "up"
    },
    "memory_rss": {
      "status": "up"
    },
    "storage": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "memory_heap": {
      "status": "up"
    },
    "memory_rss": {
      "status": "up"
    },
    "storage": {
      "status": "up"
    }
  }
}
```

**응답 (비정상)**
```json
{
  "status": "error",
  "info": {
    "memory_heap": {
      "status": "up"
    }
  },
  "error": {
    "storage": {
      "status": "down",
      "message": "Storage usage exceeds threshold"
    }
  },
  "details": {
    "memory_heap": {
      "status": "up"
    },
    "storage": {
      "status": "down",
      "message": "Storage usage exceeds threshold"
    }
  }
}
```

**체크 항목**
- `memory_heap`: 힙 메모리 사용량 (임계값: 150MB)
- `memory_rss`: RSS 메모리 사용량 (임계값: 150MB)
- `storage`: 디스크 사용량 (임계값: 90%)

**상태 코드**
- `200 OK`: 모든 체크 통과
- `503 Service Unavailable`: 하나 이상의 체크 실패

---

#### GET /health/ready

애플리케이션 준비 상태를 확인합니다. Kubernetes readiness probe로 사용됩니다.

**요청**
```http
GET /health/ready HTTP/1.1
Host: localhost:3000
```

**응답**
```json
{
  "status": "ok",
  "info": {
    "memory_heap": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "memory_heap": {
      "status": "up"
    }
  }
}
```

**체크 항목**
- `memory_heap`: 힙 메모리 사용량 (임계값: 150MB)

**상태 코드**
- `200 OK`: 준비 완료
- `503 Service Unavailable`: 준비 안 됨

---

#### GET /health/live

애플리케이션 생존 상태를 확인합니다. Kubernetes liveness probe로 사용됩니다.

**요청**
```http
GET /health/live HTTP/1.1
Host: localhost:3000
```

**응답**
```json
{
  "status": "ok",
  "timestamp": "2025-12-20T02:30:00.000Z"
}
```

**상태 코드**
- `200 OK`: 애플리케이션 실행 중

---

## 에러 코드

| 코드 | 메시지 | 설명 |
|------|--------|------|
| `HEALTH_CHECK_FAILED` | Health check failed | 헬스 체크 실패 |
| `MEMORY_THRESHOLD_EXCEEDED` | Memory usage exceeds threshold | 메모리 사용량 초과 |
| `STORAGE_THRESHOLD_EXCEEDED` | Storage usage exceeds threshold | 디스크 사용량 초과 |

---

## Memories API

Memory API는 추억 생성, 조회, 관리 기능을 제공합니다. AI 분석을 통해 감정, 주제를 자동으로 추출합니다.

### POST /api/memories

새로운 추억을 생성합니다. 텍스트와 이미지를 입력받아 Claude AI가 감정 분석을 수행합니다.

**인증 필요**: Yes (Bearer Token)

**요청 (multipart/form-data)**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | 추억 제목 (최대 100자) |
| content | string | No | 추억 내용 (최대 5000자) |
| memoryDate | string (ISO 8601) | No | 추억 날짜 (기본값: 현재) |
| images | file[] | No | 이미지 파일 (최대 10개, 각 10MB 이하, jpg/png/webp) |
| location | string | No | 장소 이름 |

**요청 예시**
```bash
curl -X POST http://localhost:3000/api/memories \
  -H "Authorization: Bearer <token>" \
  -F "title=제주도 여행" \
  -F "content=가족과 함께한 여름휴가" \
  -F "memoryDate=2024-07-15T10:00:00Z" \
  -F "images=@photo1.jpg" \
  -F "location=제주도"
```

**응답 (201 Created)**
```json
{
  "data": {
    "id": "clx1234567890",
    "userId": "usr_123",
    "title": "제주도 여행",
    "content": "가족과 함께한 여름휴가",
    "memoryDate": "2024-07-15T10:00:00.000Z",
    "location": "제주도",
    "moodTag": "행복",
    "intensity": 85,
    "themeTag": "여행",
    "storyLine": "따뜻한 햇살과 푸른 바다가 함께한 가족 여행. 모두가 행복한 시간을 보냈습니다.",
    "animationTheme": "happy",
    "images": [
      {
        "id": "img_1",
        "url": "https://yeokkdastorage.blob.core.windows.net/memories/clx1234567890/photo1_optimized.webp",
        "thumbnail": "https://yeokkdastorage.blob.core.windows.net/memories/clx1234567890/photo1_thumb.webp",
        "width": 1920,
        "height": 1080,
        "order": 0
      }
    ],
    "createdAt": "2024-12-21T00:00:00.000Z",
    "updatedAt": "2024-12-21T00:00:00.000Z"
  }
}
```

**에러 응답**
- `400 Bad Request` - 유효하지 않은 입력 (제목 누락, 이미지 개수 초과 등)
- `401 Unauthorized` - 인증 토큰 누락 또는 유효하지 않음
- `413 Payload Too Large` - 파일 크기 초과
- `415 Unsupported Media Type` - 지원하지 않는 파일 형식
- `500 Internal Server Error` - AI 분석 또는 업로드 실패

---

### GET /api/memories

추억 목록을 조회합니다. 필터링 및 페이지네이션을 지원합니다.

**인증 필요**: Yes (Bearer Token)

**쿼리 파라미터**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | 페이지 번호 (1부터 시작) |
| limit | number | No | 20 | 페이지당 항목 수 (최대 100) |
| moodTag | string | No | - | 감정 태그 필터 (예: "행복", "그리움") |
| themeTag | string | No | - | 주제 태그 필터 (예: "여행", "성장") |
| startDate | string (ISO 8601) | No | - | 시작 날짜 |
| endDate | string (ISO 8601) | No | - | 종료 날짜 |
| sortBy | string | No | memoryDate | 정렬 기준: memoryDate, createdAt, intensity |
| sortOrder | string | No | desc | 정렬 순서: asc, desc |
| search | string | No | - | 제목 및 내용 검색 |

**요청 예시**
```bash
curl -X GET "http://localhost:3000/api/memories?page=1&limit=20&moodTag=행복" \
  -H "Authorization: Bearer <token>"
```

**응답 (200 OK)**
```json
{
  "data": [
    {
      "id": "clx1234567890",
      "userId": "usr_123",
      "title": "제주도 여행",
      "content": "가족과 함께한 여름휴가",
      "memoryDate": "2024-07-15T10:00:00.000Z",
      "location": "제주도",
      "moodTag": "행복",
      "intensity": 85,
      "themeTag": "여행",
      "storyLine": "따뜻한 햇살과 푸른 바다가 함께한 가족 여행...",
      "animationTheme": "happy",
      "images": [
        {
          "id": "img_1",
          "url": "https://...",
          "thumbnail": "https://...",
          "width": 1920,
          "height": 1080,
          "order": 0
        }
      ],
      "createdAt": "2024-12-21T00:00:00.000Z",
      "updatedAt": "2024-12-21T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

**에러 응답**
- `400 Bad Request` - 유효하지 않은 쿼리 파라미터
- `401 Unauthorized` - 인증 토큰 누락 또는 유효하지 않음
- `500 Internal Server Error` - 데이터베이스 오류

---

### GET /api/memories/:id

특정 추억의 상세 정보를 조회합니다.

**인증 필요**: Yes (Bearer Token)

**경로 파라미터**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Memory ID |

**요청 예시**
```bash
curl -X GET "http://localhost:3000/api/memories/clx1234567890" \
  -H "Authorization: Bearer <token>"
```

**응답 (200 OK)**
```json
{
  "data": {
    "id": "clx1234567890",
    "userId": "usr_123",
    "title": "제주도 여행",
    "content": "가족과 함께한 여름휴가",
    "memoryDate": "2024-07-15T10:00:00.000Z",
    "location": "제주도",
    "moodTag": "행복",
    "intensity": 85,
    "themeTag": "여행",
    "storyLine": "따뜻한 햇살과 푸른 바다가 함께한 가족 여행. 모두가 행복한 시간을 보냈습니다.",
    "animationTheme": "happy",
    "images": [...],
    "sources": [
      {
        "id": "src_1",
        "platform": "manual",
        "externalId": null,
        "rawData": {},
        "createdAt": "2024-12-21T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-12-21T00:00:00.000Z",
    "updatedAt": "2024-12-21T00:00:00.000Z"
  }
}
```

**에러 응답**
- `401 Unauthorized` - 인증 토큰 누락 또는 유효하지 않음
- `403 Forbidden` - 다른 사용자의 추억
- `404 Not Found` - 추억을 찾을 수 없음
- `500 Internal Server Error` - 데이터베이스 오류

---

## AI 분석 응답 형식

Memory 생성 시 Claude AI가 분석하여 반환하는 데이터 구조:

```typescript
interface AiAnalysisResult {
  moodTag: string;        // 예: "행복", "그리움", "설렘", "평온"
  intensity: number;      // 0-100
  themeTag: string;       // 예: "여행", "성장", "사랑", "우정"
  storyLine: string;      // 3-5문장으로 요약된 스토리
  animationTheme: 'happy' | 'nostalgic' | 'exciting' | 'peaceful' | 'melancholy';
}
```

**Mood Tags (감정 태그)**
- 행복 (Happy)
- 그리움 (Nostalgic)
- 설렘 (Exciting)
- 평온 (Peaceful)
- 슬픔 (Sad)
- 감사 (Grateful)

**Theme Tags (주제 태그)**
- 여행 (Travel)
- 성장 (Growth)
- 사랑 (Love)
- 우정 (Friendship)
- 가족 (Family)
- 성취 (Achievement)
- 일상 (Daily Life)

**Animation Themes (애니메이션 테마)**
- `happy`: 밝은 파티클, 따뜻한 그라데이션
- `nostalgic`: 부드러운 안개, 차분한 색상
- `exciting`: 반짝이는 빛, 생동감 있는 색상
- `peaceful`: 부드러운 물결, 평온한 그라데이션
- `melancholy`: 빗방울 효과, 쿨톤 색상

---

## 이미지 업로드 사양

### 지원 형식
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

### 크기 제한
- 파일당 최대 크기: 10 MB
- 추억당 최대 이미지 수: 10개

### 자동 처리
이미지는 자동으로 최적화됩니다:
1. **최적화 버전**: 최대 1920x1080, 품질 85%, WebP 형식
2. **썸네일**: 400x400 (cover), 품질 80%, WebP 형식

### 저장소
- Azure Blob Storage 컨테이너: `memories`
- 경로 구조: `memories/{memoryId}/{imageId}_{type}.webp`
- CDN 활성화로 빠른 전송

---

## 향후 추가 예정 API

### Auth
- `POST /api/auth/google` - Google OAuth 로그인
- `GET /api/auth/me` - 현재 사용자 정보

### Spotify Integration (음악 주파수 맞추기)
- `POST /api/spotify/connect` - Spotify OAuth 연동
- `GET /api/spotify/recommendations` - AI 분석 기반 곡 추천 (무드/테마 매칭)
- `GET /api/spotify/search` - 라디오 다이얼식 곡 탐색
- `GET /api/spotify/track/:id/preview` - 미리듣기 URL 제공
- `POST /api/memories/:id/bgm` - 메모리에 BGM 설정

### AI Interactive Interview
- `POST /api/ai/chat` - 추억 복원을 위한 AI 질의응답
- `POST /api/ai/analyze-image` - 업로드된 이미지 기반 감성 질문 생성
- `POST /api/ai/generate-story` - 대화 내용 기반 최종 서사 생성

### Memories (추가 기능)
- `PATCH /api/memories/:id` - 메모리 수정
- `DELETE /api/memories/:id` - 메모리 삭제

### Share
- `POST /api/memories/:id/share` - 메모리 공유 링크 생성 (인스타그램 스토리, 링크)
- `GET /s/:shareToken` - 공유된 메모리 조회 (비회원 접근 가능)
- `POST /api/memories/:id/export-story` - 인스타그램 스토리용 이미지 생성

---

## 변경 이력

### v0.0.1 (2025-12-20)
- 초기 API 명세서 작성
- Health check 엔드포인트 문서화
- Root 엔드포인트 문서화
