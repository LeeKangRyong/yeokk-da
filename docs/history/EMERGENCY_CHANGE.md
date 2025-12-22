# Emergency Project Alignment Task

## 1. Context & Objective
- `docs/PRD.md`가 최신 기획(게임화된 인터뷰, Spotify 주파수 맞추기 등)으로 업데이트되었습니다.
- 이에 따라 프로젝트의 다른 문서(README, API 명세서 등)와 JIRA 티켓을 동기화해야 합니다.
- 특히 YD-7 티켓과 관련된 코드 변경(인스타그램 연동 제거 및 직접 업로드 로직으로의 전환)이 발생했습니다.

## 2. Tasks for Claude Code

### Task A: Documentation Sync
- `docs/PRD.md` 내용을 읽고, 다음 파일들을 PRD의 바뀐 방향(SNS 연동 최소화, AI 인터뷰 & 시네마틱 앨범 중심)에 맞게 수정하세요.
  - `README.md` (서비스 정의 및 기술 스택 업데이트)
  - `docs/api.md` (진행된 코드에 대해 필요 시 수정)
  - 기타 관련 `.ai.* md` 문서

### Task B: JIRA Ticket Alignment (using MCP)
- 현재 JIRA 티켓 중 '완료(Done)' 상태가 아닌 티켓들을 전수 조사하세요.
- **YD-7 수정**: 기존 'Instagram API 연동' 내용을 'AI 대화형 업로드 UI 및 이미지 처리'로 내용을 변경하고 설명을 업데이트하세요.
- **신규 티켓 생성 및 기존 티켓 수정**: 
  - 'Spotify 주파수 맞추기(추천 및 미리듣기)' 관련 티켓 생성
  - 'Framer Motion 시네마틱 레이아웃 5종 구현' 관련 티켓 상세화
  - Phase 1 & 2 로드맵 날짜와 우선순위를 PRD의 Day 2~4 일정에 맞춰 재배치하세요.

### Task C: Code Review (Optional)
- 변경된 YD-7 관련 코드를 분석하여 PRD의 '직접 업로드' 및 'AI 분석' 흐름과 일치하는지 검토하고, 잠재적인 버그나 미구현 사항이 있다면 보고하세요.

## 3. Constraints
- 모든 변경 사항은 `docs/PRD.md`의 최신 내용을 절대적인 기준으로 삼습니다.
- JIRA 티켓 수정 시 기존의 티켓 번호(ID) 체계를 유지하세요.