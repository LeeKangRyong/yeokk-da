# ⚠️ 중복 파일 정리 필요

다음 디렉토리들은 중복이므로 삭제해야 합니다:

```
src/app/
├── page.tsx          ❌ 삭제 (이미 (main)/page.tsx 존재)
├── memories/         ❌ 삭제 (이미 (main)/memories/ 존재)
└── create/           ❌ 삭제 (이미 (main)/create/ 존재)
```

## 삭제 명령어

PowerShell:
```powershell
cd frontend/src/app
Remove-Item -Recurse -Force page.tsx
Remove-Item -Recurse -Force memories
Remove-Item -Recurse -Force create
```

Bash:
```bash
cd frontend/src/app
rm page.tsx
rm -rf memories
rm -rf create
```

## 올바른 구조

```
src/app/
├── layout.tsx              ✅ 루트 레이아웃
├── globals.css             ✅ 전역 스타일
├── (auth)/                 ✅ 인증 그룹
├── (main)/                 ✅ 메인 그룹
│   ├── layout.tsx          ✅ Header + Footer
│   ├── page.tsx            ✅ 홈
│   ├── memories/
│   │   └── page.tsx        ✅ 추억 목록
│   └── create/
│       └── page.tsx        ✅ 추억 만들기
└── s/
    └── [token]/
        └── page.tsx        ✅ 공유 페이지
```
