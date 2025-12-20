# CI/CD 배포 가이드

## 배포 구조

### Frontend (Netlify 자동 배포)
- **트리거**: main 브랜치에 push
- **배포 플랫폼**: Netlify
- **동작 방식**: 
  1. GitHub의 main 브랜치에 push하면 Netlify가 자동으로 감지
  2. Netlify가 `netlify.toml` 설정에 따라 자동 빌드 & 배포
  3. GitHub Actions는 빌드 테스트만 수행 (배포 안함)

### Backend (GitHub Actions → Azure)
- **트리거**: main 브랜치에 push
- **배포 플랫폼**: Azure App Service
- **동작 방식**:
  1. GitHub Actions에서 빌드 & 테스트
  2. Azure App Service에 자동 배포
  3. Startup Command: `npm run start:prod`

## 배포 환경변수

### GitHub Secrets (필수)
Repository Settings > Secrets and variables > Actions에서 설정:

**Frontend 관련:**
- `NEXTAUTH_SECRET` - NextAuth 암호화 키
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth 클라이언트 ID

**Backend 관련:**
- `DATABASE_URL` - 데이터베이스 연결 문자열
- `AZURE_WEBAPP_PUBLISH_PROFILE_BACKEND` - Azure 배포 프로필

**Netlify 관련 (현재 미사용):**
- `NETLIFY_AUTH_TOKEN` - Netlify 인증 토큰
- `NETLIFY_SITE_ID` - Netlify 사이트 ID

### Azure App Service 환경변수
Azure Portal > App Services > yeokk-da-backend > Configuration > Application settings:

- `DATABASE_URL` - 데이터베이스 연결 문자열
- `PORT` - `8080`
- `NODE_ENV` - `production`
- `FRONTEND_URL` - `https://yeokk-da.netlify.app`

### Azure Startup Command
Configuration > General settings > Startup Command:
```
npm run start:prod
```

## 배포 프로세스

### 1. 코드 변경 후 배포
```bash
git add .
git commit -m "your commit message"
git push origin main
```

### 2. 자동 실행 순서

**Frontend (Netlify):**
1. Netlify가 GitHub push 감지
2. `frontend/` 디렉토리에서 `npm run build` 실행
3. `.next/` 빌드 결과물을 자동 배포
4. 배포 완료: https://yeokk-da.netlify.app

**Backend (GitHub Actions + Azure):**
1. GitHub Actions workflow 실행
2. Backend 빌드 & 테스트
3. Azure App Service에 배포
4. 배포 완료: https://yeokk-da-backend.azurewebsites.net

**GitHub Actions (테스트):**
1. Frontend 빌드 & 테스트 (배포 안함)
2. Backend 빌드 & 테스트
3. main 브랜치일 경우 Backend만 Azure에 배포

### 3. PR (Pull Request) 시
- Frontend 빌드 & 테스트만 실행
- Backend 빌드 & 테스트만 실행
- **배포는 실행되지 않음**

## Netlify 설정 확인

### netlify.toml 주요 설정
```toml
[build]
  command = "npm run build"
  base = "frontend"
  publish = ".next"

[build.environment]
  NODE_VERSION = "24"
  NEXT_TELEMETRY_DISABLED = "1"
```

### Netlify Dashboard 환경변수
Site settings > Environment variables에서 설정:

- `NEXT_PUBLIC_API_URL` - `https://yeokk-da-backend.azurewebsites.net`
- `NEXTAUTH_URL` - `https://yeokk-da.netlify.app`
- `NEXTAUTH_SECRET` - (동일한 값 사용)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - (동일한 값 사용)

## 문제 해결

### Frontend 배포 실패 시
1. Netlify Dashboard > Deploys 에서 로그 확인
2. 환경변수가 제대로 설정되어 있는지 확인
3. `netlify.toml` 설정 확인

### Backend 배포 실패 시
1. GitHub Actions > 해당 workflow > 로그 확인
2. Azure Portal > Log stream에서 실시간 로그 확인
3. Startup Command가 `npm run start:prod`로 설정되어 있는지 확인
4. 환경변수가 Azure에 제대로 설정되어 있는지 확인

### 503 Service Unavailable 에러
- Azure Portal > App Service > Restart
- Log stream에서 에러 메시지 확인
- DATABASE_URL 등 필수 환경변수 확인

## 수동 배포

### Frontend (Netlify에서 수동)
Netlify Dashboard > Deploys > Trigger deploy > Deploy site

### Backend (Azure Portal에서 수동)
Azure Portal > App Services > yeokk-da-backend > Deployment Center > Redeploy

### GitHub Actions 수동 실행
Repository > Actions > Deploy Backend to Azure > Run workflow > Run workflow

## 배포 모니터링

**Frontend:**
- URL: https://yeokk-da.netlify.app
- Netlify Dashboard: https://app.netlify.com

**Backend:**
- URL: https://yeokk-da-backend.azurewebsites.net
- Azure Portal: https://portal.azure.com

**GitHub Actions:**
- Repository > Actions 탭
