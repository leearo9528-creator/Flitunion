@AGENTS.md

---

# ASSAP / 플릿 유니온 (Flit Union) 프로젝트

## 프로젝트 목적

플릿 유니온의 B2B 마케팅 웹사이트. 대학교, 카페, 건물주, 행사 기획자 등을 대상으로 플리마켓·야시장·푸드트럭·행사 장비 임대 서비스를 소개하고 문의를 유도하는 것이 목표.

- **도메인:** https://flitunion.com
- **언어:** 한국어 (ko_KR)
- **스택:** Next.js 16.2.1 · React 19 · TypeScript · Tailwind CSS 4

---

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (메타데이터, 폰트)
│   ├── page.tsx                # 홈페이지 (모든 섹션 조합)
│   ├── robots.ts               # robots.txt 자동 생성
│   ├── sitemap.ts              # sitemap.xml 자동 생성
│   ├── api/contact/route.ts    # 문의 폼 API (Nodemailer)
│   └── services/[slug]/        # 서비스 상세 페이지 (동적 라우팅)
├── components/
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ProblemSolutionSection.tsx
│   ├── ServicesSection.tsx
│   ├── PortfolioSection.tsx
│   ├── FaqSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── GoogleAnalytics.tsx     # GA4 스크립트 (NEXT_PUBLIC_GA_ID)
│   └── JsonLd.tsx              # 구조화 데이터 (SEO)
└── data/
    ├── services.ts             # 서비스 정의 및 상세 내용
    └── portfolio.ts            # 포트폴리오 케이스 스터디
```

---

## 할 일 (TODO)

### 우선순위 높음
- [x] 실제 포트폴리오 이미지 구조 추가 (image 필드 + gradient placeholder, 실사진은 /public/portfolio/[id].jpg 로 교체)
- [x] 문의 폼 백엔드 연동 → `src/app/api/contact/route.ts` Route Handler + Nodemailer(Gmail SMTP), `.env.local.example` 참고
- [x] 모바일 반응형 점검 및 수정 (HeroSection stats flex-wrap, ContactSection gap 조정)

### 우선순위 중간
- [ ] 서비스 상세 페이지 이미지 추가
- [x] Google Analytics 연동 (`GoogleAnalytics.tsx` + `NEXT_PUBLIC_GA_ID` 환경변수)
- [x] 카카오 오픈채팅 상담 링크 추가 (`https://open.kakao.com/o/sZ5YZ4ni`)
- [x] sitemap.xml · robots.txt 자동 생성 (`src/app/robots.ts`, `src/app/sitemap.ts`)

### 우선순위 낮음
- [ ] 다크모드 지원 검토
- [ ] 블로그/사례 게시판 추가 검토
- [ ] 페이지 로딩 성능 최적화 (이미지 lazy loading 등)

---

## 작업 일지

### 2026-03-30
- 전체 UI 토스 스타일 리디자인 및 색상 대비 개선
- 헤더 완전 백색 + 로고 컬러 변경
- 서비스 상세 페이지 4개 추가, 포트폴리오 아코디언 확장
- 히어로 섹션 카피 업데이트
- CLAUDE.md 초기 작성 (프로젝트 현황 정리)
- 포트폴리오 이미지 구조 추가: PortfolioItem에 `image?` + `placeholderGradient` 필드, 카드에 썸네일 영역 추가 (실제 사진은 `/public/portfolio/[id].jpg` 로 교체)
- 문의 폼 백엔드 연동: `src/app/api/contact/route.ts` (Nodemailer + Gmail SMTP), `.env.local.example` 생성, ContactSection fetch 로 교체
- 모바일 반응형 수정: HeroSection stats `flex-wrap` + `gap-8`, ContactSection trust grid `gap-2 sm:gap-4`
- nodemailer 패키지 설치

### 2026-03-31
- Google Analytics 컴포넌트 추가 + layout.tsx 연동 (환경변수 `NEXT_PUBLIC_GA_ID`)
- sitemap.xml 자동 생성 (`src/app/sitemap.ts`) — 홈 + 서비스 4개 페이지
- robots.txt 자동 생성 (`src/app/robots.ts`) — /api/ 차단
- 카카오 오픈채팅 상담 링크 연결 (`https://open.kakao.com/o/sZ5YZ4ni`)
- 로고 SVG 파일 추가 (`public/logo.svg`, `public/logo-white.svg`)
- 프로젝트 구조 및 TODO 현행화
- 전체 UI 점검 및 개선:
  - `FadeInSection` 컴포넌트 추가 — 모든 섹션에 스크롤 진입 시 페이드인 애니메이션 적용
  - 헤더: 스크롤 시 그림자 전환 효과, 모바일 메뉴 슬라이드 애니메이션
  - 포트폴리오/FAQ 아코디언: CSS grid 기반 부드러운 전환 (max-h → grid-template-rows)
  - ProblemSolution: 중복 스텝 번호 제거 (숫자 배지만 유지)
  - 인라인 onMouseEnter/onMouseLeave → CSS `.btn-primary` 클래스로 통합
  - HeroSection: 텍스트 크기 불일치 수정, 반응형 줄바꿈 개선
  - ServiceDetail: 모바일 stats flex-wrap, 헤더 로고 크기 통일
  - ContactSection: input focus ring 추가, 카카오 링크 target="_blank"
- 포트폴리오 업데이트 가이드 작성 (`public/portfolio/GUIDE.md`)
- 문의 메일 수신 주소 `assap.ceo@gmail.com` 으로 설정
- 포트폴리오 실제 운영 사례 8건으로 교체 (기존 샘플 데이터 삭제)
  - 원주 대학교 야시장, 대구 대학교 플리마켓, 서울 대형 축제 부스, 서울 아파트 야시장, 하남 아파트 야시장, 서울 대학교 플리마켓, 충청 대형 축제 부스, 서울 민속 축제 부스
  - 이미지는 `public/portfolio/[id].jpg` 로 추후 추가 예정

### 2026-04-09
- 전체 사이트 점검 및 오류 수정
  - ESLint 오류 5건 수정: `Header.tsx`, `ServiceDetailClient.tsx` 의 내부 라우트(`/`, `/#contact`, `/#services`) `<a>` → `next/link` `<Link>` 로 교체
  - SEO 수정: `JsonLd.tsx` Organization 스키마의 `logo` URL 이 존재하지 않는 `/logo.png` → `/logo.svg` 로 교정
- 도메인 일괄 변경: `flitunion.co.kr` → `flitunion.com`
  - `layout.tsx`(openGraph url, canonical), `sitemap.ts`(BASE_URL), `robots.ts`(sitemap URL), `services/[slug]/page.tsx`(canonical), `JsonLd.tsx`(Organization url/logo), `Footer.tsx`/`ContactSection.tsx`(노출 이메일 `hello@flitunion.com`)
- 문의 폼 알림 채널 변경: 이메일(Nodemailer/Gmail SMTP) → **Discord Webhook**
  - `src/app/api/contact/route.ts` 를 Discord Embed 페이로드 발송 로직으로 재작성 (필드: 이름·연락처·행사유형·공간 위치·예정일·추가 문의, color `#3182f6`, 1000자 truncate)
  - 환경변수: `EMAIL_*` 5종 제거 → `DISCORD_WEBHOOK_URL` 1종으로 단순화
  - `nodemailer`, `@types/nodemailer` 패키지 제거
  - `.env.local.example` 갱신 (Discord 웹후크 발급 가이드 포함)
- TypeScript / ESLint / `next build` 모두 통과 확인
- 플랫폼 서비스(`flit-black`) 도메인 전략 결정: `flitunion.com` (B2B 마케팅) 유지 + `app.flitunion.com` 서브도메인에 플랫폼 배포
  - SEO 자산 보존, SaaS 표준(apex=마케팅, app.=서비스)에 부합
- 셀러 모집 깔때기 추가 — 플랫폼(`https://app.flitunion.com`)으로 유도하는 CTA 3곳 배치
  - `Footer.tsx`: 기존 "플릿 플랫폼 바로가기" 링크 URL 을 `flit-black.vercel.app` → `app.flitunion.com` 으로 교체
  - `Header.tsx`: 데스크탑 메인 CTA 옆 + 모바일 메뉴 하단에 "셀러 지원 →" 텍스트 링크 추가 (회색 톤, 메인 B2B CTA 와 시각적 구분)
  - `SellerCtaSection.tsx` **신규**: Portfolio ↔ FAQ 사이 thin promo strip. 파란 그라데이션 배경 + F 배지 + "플릿에서 참여하기" 버튼. `page.tsx` 에 삽입
  - ContactSection 폼은 B2B 전용으로 보호 (셀러 깔때기와 분리)
- 사전 작업 중 발견한 `src/app/api/contact/route.ts` 의 잘못된 닫는 중괄호 1줄 제거 (빌드 차단 오류)
