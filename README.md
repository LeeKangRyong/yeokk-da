# 엮다 (Yeokk-da)

> 흩어진 디지털 발자취를 하나의 이야기로 엮어내는 AI 추억 플랫폼

## 요약

SNS, 음악 스트리밍, 개인 콘텐츠를 AI가 분석하여:
- **스크롤 기반 인터랙티브 스토리텔링**
- **AI 테마별 동적 배경 애니메이션**
- **추억 카드의 마법 같은 전환 효과** (Shared Layout Animations)
- **자동 정리 & 분류**
- **간편한 공유**

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/LeeKangRyong/yeokk-da.git

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run start:dev
```

## 📚 Documentation

### For AI Agents
- [`.ai/CONTEXT.md`](.ai/CONTEXT.md) - 기술 스택 & 아키텍처
- [`.ai/RULES.md`](.ai/RULES.md) - 개발 규칙
- [`.ai/TASKS.md`](.ai/TASKS.md) - 현재 작업
- [`.ai/PROJECT.md`](.ai/PROJECT.md) - 프로젝트 설정 (repo, 배포)

### For Humans
- [`docs/PRD.md`](docs/PRD.md) - 제품 요구사항
- [`docs/guides/`](docs/guides/) - 개발 가이드

## 🛠 Tech Stack

**Frontend**: Next.js 15, TypeScript, Tailwind, Framer Motion  
**Backend**: Nest.js, Prisma, PostgreSQL, Redis  
**AI**: Claude 3.5 Sonnet  
**Infra**: Netlify (Frontend), Azure (Backend, DB, Storage)  
**CI/CD**: GitHub Actions

## 📝 Development

```bash
# Commit Convention (AngularJS)
feat(scope): add new feature
fix(scope): fix bug
docs: update documentation
test: add tests

# Clean Code Rules
- 함수는 20줄 이하
- 한 함수는 한 가지 일만
- 의미 있는 이름 사용
```

## 🔗 Links

- **Production**: https://yeokk-da.netlify.app
- **Backend API**: https://yeokk-da-backend.azurewebsites.net
- **Repository**: https://github.com/LeeKangRyong/yeokk-da

---

**Status**: 🚧 In Development (Phase 1: MVP)
