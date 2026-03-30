@AGENTS.md

---

# ASSAP / 플릿 유니온 (Flit Union) 프로젝트

## 프로젝트 목적

플릿 유니온의 B2B 마케팅 웹사이트. 대학교, 카페, 건물주, 행사 기획자 등을 대상으로 플리마켓·야시장·푸드트럭·행사 장비 임대 서비스를 소개하고 문의를 유도하는 것이 목표.

- **도메인:** https://flitunion.co.kr
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
