# Task: uiforge에 Base UI Drawer 데모 페이지 구현

## Context

shadcn에 `@base-ui/react` 기반 Drawer PR을 올릴 예정.
PR reviewers가 UI를 확인할 수 있도록 uiforge의 `/base-ui/drawer`에 데모 페이지를 만들고 Vercel 배포 후 URL을 PR에 첨부한다.

- `packages/base-ui`, `packages/radix-ui` — 순수 shadcn 컴포넌트 보관, 건드리지 않음
- `apps/web/components/ui/drawer.tsx` — uiforge 데모 전용 로컬 구현 (shadcn PR 제출 코드와 무관)
- DocSection/FileTreeCode/shiki → `packages/ui-shared`에 구현
- Advanced는 `/base-ui/drawer` 페이지 안의 섹션으로만 — 별도 route 절대 없음

참조 프로젝트: `~/Documents/shadcn/shadcn-drawer`

---

## 라우트 구조

```
apps/web/app/
├── page.tsx                              ← 얇은 landing
└── (examples)/                           ← route group (URL에 안 보임, 라우팅 정리용)
    └── base-ui/
        ├── page.tsx                      ← 컴포넌트 허브 skeleton (나중에 확장)
        └── drawer/
            ├── page.tsx                  ← PR 첨부 URL: /base-ui/drawer
            │                               basic + directions + responsive + RTL + advanced
            │                               모두 이 하나의 페이지에 섹션으로 포함
            └── _components/             ← 내부 조립 전용 (이 폴더 외 별도 route 없음)
                ├── basic-drawer.tsx
                ├── drawer-directions.tsx
                ├── drawer-responsive.tsx
                ├── drawer-rtl.tsx
                └── drawer-advanced.tsx  ← SwipeArea 인라인 (iframe/별도 route 없음)
```

**PR에 첨부할 URL:** `https://[vercel].vercel.app/base-ui/drawer`

---

## 작업 목록

### A. `packages/ui-shared` — docs 컴포넌트 구현

- [ ] **A-1** `src/components/docs/doc-section.tsx`
  - 참조: shadcn-drawer `app/_components/docs/doc-section.tsx`
  - Preview/Code 탭 전환 UI
  - Tabs는 shadcn 의존 없이 React state 기반으로 구현 (ui-shared는 primitive-agnostic)

- [ ] **A-2** `src/components/docs/code-block.tsx`
  - 참조: shadcn-drawer `app/_components/docs/code-block.tsx`
  - shiki로 syntax highlighting (server component)
  - github-dark / github-light 테마

- [ ] **A-3** `src/components/docs/file-tree-code.tsx`
  - 참조: shadcn-drawer `app/_components/docs/file-tree-code.tsx`
  - 파일 트리 + 코드 뷰어

- [ ] **A-4** `src/components/docs/copy-button.tsx`
  - 클립보드 복사 버튼 (client component)

- [ ] **A-5** `src/components/docs/tree-node-client.tsx`
  - 재귀적 파일 트리 client 컴포넌트

- [ ] **A-6** `package.json` 의존성 추가: `shiki`

- [ ] **A-7** `package.json` exports 업데이트
  ```json
  "./components/docs/*": "./src/components/docs/*.tsx"
  ```

---

### B. `apps/web` — drawer 컴포넌트 및 데모

- [ ] **B-1** `components/ui/drawer.tsx` — 데모 전용 로컬 구현
  - 참조: shadcn-drawer `components/base-ui-drawer.tsx` 그대로 복사
  - 목적: uiforge 데모 전용. shadcn PR 제출 코드와 완전히 분리됨
  - exports: `Drawer, DrawerTrigger, DrawerPortal, DrawerViewport, DrawerClose, DrawerSwipeArea, DrawerOverlay, DrawerPopup, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription`

- [ ] **B-2** `package.json` 의존성 추가
  - `@base-ui/react`
  - `recharts`

- [ ] **B-3** `app/page.tsx` 수정
  - `/base-ui/drawer`로 연결하는 얇은 landing

- [ ] **B-4** `app/(examples)/base-ui/page.tsx` — skeleton
  - "Base UI Components" 제목 + drawer 카드/링크
  - 나중에 컴포넌트 허브로 확장

- [ ] **B-5** `app/(examples)/base-ui/drawer/page.tsx` — 메인 데모 페이지
  - 참조: shadcn-drawer `app/page.tsx`
  - `loadSectionFiles` 유틸은 apps/web 로컬에 구현 (파일 경로가 앱 종속)
  - DocSection, FileTreeCode → `@workspace/ui-shared/components/docs/*`
  - 섹션: Basic / Directions / Responsive / RTL / Advanced

- [ ] **B-6** `app/(examples)/base-ui/drawer/_components/` — 데모 컴포넌트들
  | 파일 | 참조 | 변경 |
  |------|------|------|
  | `basic-drawer.tsx` | shadcn-drawer 포팅 | import: `@/components/ui/drawer` |
  | `drawer-directions.tsx` | 포팅 | import: `@/components/ui/drawer` |
  | `drawer-responsive.tsx` | 포팅 | `useIsMobile` → `@workspace/ui-shared/hooks/use-mobile` |
  | `drawer-rtl.tsx` | 포팅 | RTL util 포팅 포함 |
  | `drawer-advanced.tsx` | swipe 데모 인라인화 | iframe 없이 SwipeArea 직접 렌더 |

- [ ] **B-7** `app/(examples)/base-ui/drawer/_lib/rtl.ts`
  - shadcn-drawer의 RTL hook/util 포팅

- [ ] **B-8** `app/(examples)/base-ui/drawer/_lib/docs-files.ts`
  - 참조: shadcn-drawer `app/_lib/docs-files.ts`
  - `sectionFiles` 경로를 uiforge 로컬 파일 경로로 재정의

---

## 의존 관계

```
apps/web/..drawer/page.tsx
  ├── @workspace/ui-shared/components/docs/*  (DocSection, FileTreeCode 등)
  ├── @/components/ui/drawer                  (base-ui-drawer 로컬 복사본)
  └── _components/*
        └── @workspace/ui-shared/hooks/use-mobile  (이미 존재)
```

---

## 검증

```bash
pnpm dev
# http://localhost:3000/base-ui/drawer 확인

pnpm build
pnpm typecheck
```

**수동 확인 체크리스트:**
- [ ] Basic drawer + 차트 인터랙션
- [ ] 4방향(up/down/left/right) drawer 동작
- [ ] Responsive: 모바일 → Drawer, 데스크탑 → Dialog
- [ ] RTL: en/ar/he 언어 전환
- [ ] Advanced SwipeArea 인라인 동작
- [ ] Preview/Code 탭 전환 (DocSection)
- [ ] 파일 트리 탐색 (FileTreeCode)
- [ ] 다크모드 토글
