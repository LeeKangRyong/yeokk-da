# 엮다 (Yeokk-da)

> 파편화된 사진과 음악을 AI와의 대화를 통해 한 편의 영화 같은 서사로 엮어내는 인터랙티브 추억 복원 플랫폼

## 요약

사용자가 던진 추억의 조각(이미지/텍스트)을 AI가 게임처럼 인터뷰하여:
- **게임화된 인터뷰**: 추억을 복원하는 듯한 다이얼로그 기반 입력
- **음악 주파수 맞추기**: 감성 분석 기반 Spotify BGM 큐레이션 및 라디오 다이얼식 탐색
- **시네마틱 스토리텔링**: 스크롤에 반응하는 한 편의 영화 같은 연출
- **멀티 채널 공유**: 인스타그램 스토리, 카카오톡 등 SNS 최적화 공유 기능

## 🎯 개발 목적
본 프로젝트는 AI Agent 기반의 차세대 개발 워크플로우를 탐색하고 실현하기 위해 개발하였습니다.

- AI-Native Development: **Claude Code 및 JIRA/Confluence MCP를 활용**하여 기획부터 구현까지 AI와 협업하는 프로세스 구축

- Systematic Agent Interaction: `.ai` 컨텍스트 파일 구조를 통한 에이전트 가이드라인 최적화 및 태스크 자동화 실험

- Modern Web Stack Mastery: `Next.js 15`와 `Nest.js`를 활용한 고성능 풀스택 애플리케이션 구현

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
**AI**: Claude 3.5 Sonnet (Anthropic)
**External APIs**: Spotify Web API
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
