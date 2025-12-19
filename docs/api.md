# 엮다 (Yeokk-da) Backend API 명세서

## 개요

엮다 백엔드 API는 AI 기반 메모리 플랫폼의 서버 사이드 기능을 제공합니다.

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

## 향후 추가 예정 API

### Auth
- `POST /api/auth/google` - Google OAuth 로그인
- `GET /api/auth/me` - 현재 사용자 정보

### Integrations
- `POST /api/integrations/:platform/connect` - 외부 서비스 연동
- `POST /api/integrations/:platform/import` - 데이터 가져오기

### Memories
- `GET /api/memories` - 메모리 목록 조회
- `POST /api/memories` - 메모리 생성
- `GET /api/memories/:id` - 메모리 상세 조회
- `POST /api/memories/upload` - 이미지/파일 업로드

### Share
- `POST /api/memories/:id/share` - 메모리 공유 링크 생성
- `GET /s/:shareToken` - 공유된 메모리 조회

---

## 변경 이력

### v0.0.1 (2025-12-20)
- 초기 API 명세서 작성
- Health check 엔드포인트 문서화
- Root 엔드포인트 문서화
