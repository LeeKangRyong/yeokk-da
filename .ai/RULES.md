# RULES - Development Principles

## 1. Clean Code (핵심 5가지)

### ✅ 의미 있는 이름
```typescript
// ❌ Bad
const d = new Date();
const list = users.filter(u => u.a);

// ✅ Good
const createdAt = new Date();
const activeUsers = users.filter(user => user.isActive);
```

### ✅ 함수는 한 가지만
```typescript
// ❌ Bad - 검증 + 저장 + 이메일
async function handleUser(user: User) {
  if (!user.email) throw new Error();
  await db.user.create({ data: user });
  await emailService.send(user.email);
}

// ✅ Good - 분리
async function validateUser(user: User) { }
async function createUser(user: User) { }
async function sendWelcomeEmail(email: string) { }
```

### ✅ 작은 함수 (20줄 이하)
- 한 화면에 들어오는 크기
- 들여쓰기 2단계 이내

### ✅ 주석보다 코드로
```typescript
// ❌ Bad
if (user.status === 'active' && user.email !== null) // 활성 유저 확인

// ✅ Good
const isActiveUser = user.status === 'active' && user.email !== null;
if (isActiveUser) { }
```

### ✅ DRY (Don't Repeat Yourself)
- 중복 코드는 함수로 추출
- 비슷한 로직은 통합

---

## 2. Git Commit Convention (AngularJS)

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 포맷 (동작 변경 X)
- `refactor`: 리팩토링
- `test`: 테스트
- `chore`: 빌드, 패키지 매니저

### Examples
```bash
feat(memory): add Framer Motion timeline layout
fix(auth): resolve Google OAuth token refresh
refactor(video): extract FFmpeg builder
test(memory): add unit tests for creation
docs(api): update endpoint documentation
```

### Rules
- 명령형 ("add" not "added")
- 첫 글자 소문자
- 50자 이내
- 마침표 없음

---

## 3. TypeScript

### Strict Mode 필수
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

### Any 금지
```typescript
// ❌ Bad
function process(data: any) { }

// ✅ Good
interface Data { value: string; }
function process(data: Data) { }

// ✅ 정말 모를 때
function process(data: unknown) {
  if (typeof data === 'string') { }
}
```

### Type vs Interface
```typescript
// Interface: 객체 형태
interface User {
  id: string;
  email: string;
}

// Type: Union, Primitive
type Status = 'active' | 'inactive';
type Platform = 'instagram' | 'spotify';
```

---

## 4. Error Handling

### 일관된 에러
```typescript
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string
  ) {
    super(message);
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message, 'VALIDATION_ERROR');
  }
}
```

### Try-Catch 사용
```typescript
// Service: 에러 던지기
async function createMemory(data: CreateDto): Promise<Memory> {
  if (!data.title) throw new ValidationError('Title required');
  return prisma.memory.create({ data });
}

// Controller: 에러 처리
async function handler(req, res) {
  try {
    const memory = await createMemory(req.body);
    return res.json({ data: memory });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error });
    }
    return res.status(500).json({ error: 'Internal error' });
  }
}
```

---

## 5. Testing

### AAA 패턴
```typescript
it('should create memory with AI analysis', async () => {
  // Arrange
  const mockData = { title: 'Test', content: 'Test' };
  jest.spyOn(aiService, 'analyze').mockResolvedValue({ moodTag: '행복' });
  
  // Act
  const result = await service.createMemory(mockData);
  
  // Assert
  expect(result.moodTag).toBe('행복');
  expect(aiService.analyze).toHaveBeenCalled();
});
```

### 커버리지 목표
- Unit Tests: 80%
- Integration Tests: 주요 플로우 100%

---

## Quick Checklist

### Before Commit
- [ ] 함수 20줄 이하?
- [ ] 의미 있는 변수명?
- [ ] Any 타입 없음?
- [ ] 커밋 메시지 컨벤션 준수?
- [ ] 테스트 통과?
- [ ] ESLint 경고 없음?

### Before PR
- [ ] 테스트 작성?
- [ ] 문서 업데이트?
- [ ] 불필요한 console.log 제거?
- [ ] Self-review 완료?
