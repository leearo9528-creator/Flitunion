@AGENTS.md

---

# ASSAP / 플릿 유니온 (Flit Union) 프로젝트

## 프로젝트 목적

플릿 유니온의 B2B 마케팅 웹사이트. **행사 대행**을 최상위 포지셔닝으로, 대학교·지자체·기업·아파트 등 행사 주최자를 주 타깃으로 한다. 기획부터 셀러·푸드트럭 섭외, 장비 렌탈, 현장 운영, 정산까지 원스톱 대행을 소개하고 문의를 유도하는 것이 목표. (유휴공간 수익화는 타깃 중 하나로 유지)

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
│   ├── about/page.tsx          # 회사 소개 (회사소개서 17장 구조 반영)
│   ├── portfolio/page.tsx      # 진행 이력 (운영 사례 8건 전문)
│   ├── packages/               # 행사 유형별 패키지 (목록 + 상세 4종)
│   ├── sellers/page.tsx        # 셀러 품목 카탈로그 27종
│   ├── foodtruck/page.tsx      # 푸드트럭 메뉴 카탈로그 24종
│   ├── partners/page.tsx       # 협력사(푸드트럭·셀러) 모집 + 등록 폼
│   ├── api/partners/route.ts   # 협력사 등록 접수 (Discord Webhook)
│   ├── robots.ts               # robots.txt 자동 생성
│   ├── sitemap.ts              # sitemap.xml (services.ts 에서 파생)
│   ├── api/contact/route.ts    # 문의 폼 API (Discord Webhook)
│   └── services/[slug]/        # 서비스 상세 페이지 (동적 라우팅)
├── components/
│   ├── Header.tsx
│   ├── PageHero.tsx            # 서브페이지 공통 헤더 (breadcrumb 포함)
│   ├── CatalogGrid.tsx         # 카탈로그 품목 카드 그리드 (사진 없으면 slug 해시 그라데이션)
│   ├── PackagesSection.tsx     # 홈 — 행사 유형별 패키지 + 카탈로그 진입점
│   ├── PartnerForm.tsx         # 협력사 등록 폼 (⚠️ 항목 늘리지 말 것)
│   ├── HeroSection.tsx
│   ├── ProblemSolutionSection.tsx
│   ├── ServicesSection.tsx
│   ├── PortfolioSection.tsx
│   ├── FaqSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── GoogleAnalytics.tsx     # GA4 스크립트 (NEXT_PUBLIC_GA_ID)
│   └── JsonLd.tsx              # 구조화 데이터 (services.ts + faq.ts 에서 파생)
└── data/
    ├── services.ts             # ⭐ 서비스 정본 (홈 카드 + 상세 + 푸터 + 사이트맵 + JSON-LD)
    ├── company.ts              # ⭐ 회사 정보 정본 (회사소개서와 동기화)
    ├── faq.ts                  # ⭐ FAQ 정본 (FaqSection + JSON-LD FAQPage)
    ├── catalog.ts              # ⭐ 셀러 품목 27종 + 푸드트럭 메뉴 24종 (⚠️ 사진 정책 주석 필독)
    ├── packages.ts             # ⭐ 행사 유형별 패키지 4종 (services·catalog·portfolio 를 slug 로 참조)
    └── portfolio.ts            # 포트폴리오 케이스 스터디
```

### ✍️ 카피 톤 규칙 — 포멀 격식체

`docs/flitunion-company-profile.pptx`(회사소개서)의 톤이 정본이다: **포멀 격식체**.
주 고객이 지자체·대학 행정·기업 총무라 반말투로 읽히면 신뢰가 깎인다.

| 쓸 것 | 쓰지 말 것 |
|---|---|
| ~합니다 / ~입니다 / ~해 드립니다 | ~해요 / ~예요 / ~할게요 / ~하죠 / ~네요 |
| ~하십시오 / ~하시기 바랍니다 / ~하실 수 있습니다 | ~하세요 / ~해보세요 / ~받으세요 |
| ~합니까? / ~입니까? (FAQ 질문 포함) | ~나요? / ~까요? / ~인가요? |
| 제안해 드립니다 | 제안드립니다 |

- **구어·속어 금지**: 통째로 · 끝냅니다 · 짭니다 · 깎입니다 · 뚫다 · 묶여 나옵니다 · 뭐가 · 따져보다
- **감정 이모지 금지**: 😰 같은 표정 이모지는 카드 아이콘으로 쓰지 않는다.
  아이콘이 필요하면 `ServicesSection`·`ProblemSolutionSection` 처럼 **heroicons 라인 SVG**(`iconPath`)를 쓴다
- **느낌표 금지**, 경쟁사 비방("다른 대행사가 갖지 못한") 금지, 검증 불가한 과장 금지
- FAQ **질문**도 격식 의문형으로 통일한다 (고객 목소리라도 소개서 톤을 따른다)

### ⚠️ 정본(single source of truth) 규칙

`src/data/*.ts` 의 배열을 **컴포넌트 안에 다시 정의하지 말 것.** 실제로 두 번 데였다.
- `ServicesSection` 이 서비스 목록을 따로 들고 있어 `services.ts` 와 제목·설명이 어긋나 있었다
- `JsonLd` 가 자체 FAQ 5문항을 들고 있어 **화면에 없는 FAQ** 가 검색엔진에 제출되고 있었다 (FAQPage 스키마는 페이지에 실제로 보이는 내용이어야 한다)

서비스를 추가하면 홈 카드·상세 페이지·푸터·사이트맵·JSON-LD 가 **전부 자동으로** 따라온다.

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

### 2026-09-19
- 🐛 **서비스 상세 페이지 4개 전부 404** 수정 (`src/app/services/[slug]/page.tsx`)
  - 증상: 프로덕션에서 `/services/flea-market`·`night-market`·`food-truck`·`rental` 이 모두 404. 홈 서비스 카드와 `sitemap.xml` 이 가리키는 링크 전부가 죽어 있었다
  - 원인: **Next 16 에서 `params` 는 Promise** 인데 `params.slug` 를 동기 접근하고 있었다 → `slug` 가 `undefined` → `services.find()` 실패 → `notFound()`. 빌드 단계에서 4개 페이지가 `"status": 404` 로 프리렌더됨 (`.next/server/app/services/*.meta` 로 확인)
  - ⚠️ `next build` 와 `tsc --noEmit` 이 **모두 통과**한다 — 타입 에러도 빌드 실패도 없이 조용히 404 를 굽는다. 빌드 성공만으로는 이 부류를 못 잡으니, 동적 라우트는 `.next/server/app/**/*.meta` 의 status 나 `npm run start` 후 실제 응답으로 확인할 것
  - 수정: `generateMetadata`/페이지 컴포넌트를 `async` 로 바꾸고 `params: Promise<{ slug: string }>` 타입 + `const { slug } = await params`
  - 검증: 4개 경로 200 + 제목·canonical 정상, 없는 slug(`/services/nope`)는 404 유지
  - 동일 패턴 전수 점검 완료 — `src/` 내 다른 미대기 async API 없음 (`api/contact/approve/route.ts` 의 `request.nextUrl.searchParams` 는 동기 API 라 정상)

### 2026-09-19 (2) — 🎪 행사 대행으로 전면 재포지셔닝 + 소개/진행 이력 페이지 신설

**배경:** 포지셔닝이 "플리마켓 운영 대행 및 유휴공간 수익화"라 **공간 소유자**(건물주·카페) 중심이었는데,
실제 진행 이력 8건 중 5건이 대학 축제·지자체 축제였다. 실제 하는 일(행사 대행)과 간판이 어긋나 있었다.

- **서비스 구조 재편** (`src/data/services.ts`) — 4종 → **6종**, `tier` 개념 도입
  - 신설 ① `event-agency` **행사 기획·운영 대행** = flagship(홈에서 넓은 단독 카드). 기존 4종을 묶는 종합 대행 상위 서비스
  - 신설 ② `festival-booth` **축제·행사 부스 운영** — 진행 이력 8건 중 3건이 축제 부스인데 **서비스 목록에 아예 없었다**
  - 개칭: 플리마켓 운영 대행 → 플리마켓·캠퍼스 마켓 운영 / 야시장 & 푸드 마켓 → 야시장·야간 행사 운영 / 행사 물품 렌탈 → 행사 장비 렌탈·설치
  - ⚠️ **기존 slug 4개는 그대로 뒀다** — 서비스 내용이 그대로라 이름을 바꿔 얻을 게 없고, 리다이렉트·유입 손실만 생긴다. (게다가 이 페이지들은 그동안 프로덕션에서 404였어서 이관할 SEO 자산 자체가 없었다)
- **정본 통합** — `ServicesSection` 이 들고 있던 서비스 목록 중복 정의 제거, `iconPath`·`tags`·`highlight` 를 `services.ts` 로 흡수. 푸터·사이트맵·JSON-LD 도 전부 `services.ts` 파생으로 전환
- **FAQ 정본 분리** (`src/data/faq.ts`) — `JsonLd` 가 화면에 없는 자체 FAQ 5문항을 구조화 데이터로 내보내고 있던 것 수정. 화면(8문항)과 스키마를 합치고 행사 대행 문항 2개 추가 → **10문항 일치**
- **`/about` 회사 소개 신설** — `docs/flitunion-company-profile.pptx`(17장) 구조를 그대로 웹으로: 회사 개요(기업 정보 10종 + 핵심 수치 4종) · 비전과 미션 · 과제와 해법 · 사업 영역 · 차별점(플릿 플랫폼 + 일반 모집 비교표 5행) · 운영 프로세스 5단계 · 협업 대상 · 계약 안내 6종. sticky 목차 네비 포함
  - 내용 정본은 `src/data/company.ts` — **소개서와 웹사이트가 어긋나면 영업 현장에서 바로 티가 난다.** 둘 중 하나를 고치면 반드시 같이 고칠 것
- **`/portfolio` 진행 이력 신설** — 8건 전부를 아코디언 없이 펼쳐서 표기(기획 배경·운영 방식·셀러 구성·성과 4블록 + stats). 상단 요약 수치는 **데이터에서 파생**(건수·지역 수·유형별 건수를 손으로 적지 않는다)
- **공통 카피·네비 전환** — 루트 메타데이터/키워드(행사 대행·축제 부스 운영 대행·지자체 축제 대행 등 13종), 히어로 H1·본문, 푸터 소개문, JSON-LD Organization/Service(`serviceType: "행사 대행"`)
- **헤더 해시 링크 버그 수정** — `#services` 가 `/about`·`/portfolio` 에서는 그 페이지 안의 앵커를 찾아 **아무 데도 가지 않았다.** 전부 `/#services` 형태로 교정하고 `<a>` → `<Link>` 로 통일
- 신규 공통 컴포넌트 `PageHero.tsx` (서브페이지 헤더 + breadcrumb)
- 검증: `next build` · `tsc --noEmit` · ESLint(src 무결) 통과, 9개 라우트 전부 200 / 없는 slug 404 유지, 실기기 뷰포트(1280·390) 스크린샷 확인, 콘솔 에러 0건
- ⚠️ 남은 것: `public/portfolio/` 에 실사진이 **0장** — 진행 이력·홈 카드가 전부 그라데이션 플레이스홀더다. 사진을 넣으면 자동으로 사진이 우선한다 (`public/portfolio/[id].jpg`, `portfolio.ts` 의 `image` 필드)

### 2026-09-19 (3) — 📚 카탈로그 웹페이지화 + 행사 유형별 패키지 + 카피 각도 전환

**배경:** 경쟁사 잔치꾼(janchiggun.co.kr) 참고 요청. 사이트가 **모든 경로를 403 "접근이 제한되었어요"로 차단**해
직접 열지 못했다 (UA 우회는 하지 않음 — 의도적 차단 + FLIT 쪽 "경쟁사 스크래핑 금지" 방침과 같은 선상).
검색 결과의 URL 패턴(`/202/?idx=1671` 시상대, `/252/?idx=143` VIP의자 …)만으로 구조는 읽혔다:
**품목 하나하나가 페이지**이고 그게 롱테일 검색을 먹는다. 대조해보니 **플릿은 같은 자산을 이미 만들어놓고
PPTX 안에 가둬놨었다** — 셀러 품목 27종, 푸드트럭 메뉴 24종이 웹에 0개.

- **카탈로그 웹페이지화** (`src/data/catalog.ts` ← `docs/catalog-build.js` 의 SL/FT 배열에서 추출)
  - `/sellers` 셀러 품목 27종 (보유 셀러 수 배지 + 현장 운영 특성), `/foodtruck` 푸드트럭 메뉴 24종
  - 상단 수치는 **데이터 파생** — 보유 셀러 합계 176곳도 배열에서 계산한다
- ⚠️ **사진 정책 — 반드시 지킬 것** (`docs/photos` 하위 README 의 제약을 코드 주석으로 옮겨놨다)
  - 셀러 사진 27장: CC0 스톡이라 웹 게시 OK. **단 실제 참여 셀러 상품 사진이 아니므로 고지 필수**
    (`SELLER_PHOTO_NOTICE`). `/sellers` 와 패키지 상세 양쪽에 노출 중 — 지우지 말 것
  - 푸드트럭 사진 14장: **크러쉬 F&P 사업제안서에서 추출한 자료로 "내부 검토용" 제한.**
    웹사이트는 외부 배포이므로 **싣지 않았다.** 각 트럭에서 직접 받은 사진으로 교체한 뒤에만 `photo` 를 채울 것
- **행사 유형별 패키지** (`src/data/packages.ts`) — 잔치꾼의 '제막식 세트·워크숍 세트' 대응
  - `/packages` + `/packages/[slug]` 4종: 대학 축제 / 아파트 야시장 / 지자체 축제 부스 / 기업 행사
  - 각 패키지가 services·catalog·portfolio 를 **slug 로 참조**해 구성·추천 셀러·추천 푸드트럭·관련 사례를 조립
  - "이 유형에서 실제로 문제가 되는 것" 섹션 — 포화 품목 제한, 전기 용량, 반려동물 동반 여부, 주류 허가 등
  - ⚠️ **slug 오타는 조용히 빈 화면이 된다.** 검증 스크립트로 전수 확인했고, 품목·사례를 지울 때는
    `packages.ts` 의 참조도 함께 확인할 것
- **카피 각도 전환** — 잔치꾼의 "**행사 담당자부터** 즐거운 서비스" 각도 차용. 기능 나열("주최 측 인력 투입 최소화")
  에서 **담당자 개인의 부담·불안**으로: 히어로 본문("행사 담당자가 할 일을 대신합니다"), 홈 과제/해법 3종을
  "날짜는 잡혔는데 이걸 저 혼자 다 해야 하나요 / 당일에 셀러가 안 나타나면 / 끝나고 보고서는 또 어떻게" 로 교체
- 홈에 `PackagesSection` 신설 (서비스 섹션 다음) — 패키지 4종 카드 + 카탈로그 2개 진입점.
  네비·푸터에도 연결해 고아 페이지가 되지 않게 함
- 헤더 네비 5개로 재편: 서비스 / 행사 유형별 / 셀러 품목 / 진행 이력 / 회사 소개
- 검증: `next build`·`tsc`·ESLint(src 무결) 통과, 12개 라우트 200 / 없는 slug 404, 사이트맵 16 URL,
  셀러 27카드+사진 27장 / 푸드트럭 24카드+**사진 0장**(정책대로) 확인, 콘솔 에러 0건

### 2026-09-21 — 🤝 협력사(푸드트럭·셀러) 모집 창구 신설

**배경:** 카탈로그를 웹에 올리고 보니 병목이 사진이었다. 푸드트럭 사진은 라이선스 제약으로 못 쓰고,
셀러 사진은 CC0 예시라 "실제 셀러 사진이 아님" 고지를 달고 나간다. 사진을 한 장씩 받으러 다니는 대신
**프로필을 올릴 업체를 모으는 창구**를 만들기로 했다. 사진 확보 + 섭외 풀 확대가 동시에 된다.

- **`/partners` 신설** — 푸드트럭·셀러 협력사 모집 랜딩 + 등록 폼
  - 구성: 히어로(핵심 수치 4종 + "등록 무료·참가 의무 없음·사업자등록 없어도 가능") → 등록 혜택 4종
    → 등록~섭외 4단계 → 폼 → 현재 카탈로그 안내 → 플릿 플랫폼 구분 안내
- **`/api/partners` 신설** — `/api/contact` 와 같은 Discord Webhook 패턴. **의도적으로 분리**했다(받는 사람도
  처리 방식도 다르다). `DISCORD_PARTNER_WEBHOOK_URL` 전용 채널 우선, 미설정 시 기존 `DISCORD_WEBHOOK_URL` 로 폴백
- ⚠️ **폼 항목을 늘리지 말 것** (`PartnerForm.tsx` 주석에도 적어놨다) — 입력 항목 수가 곧 이탈률이다.
  받는 건 5개(구분·업체명·연락처·품목·지역) + 선택 2개(사진/SNS 링크·하고 싶은 말)뿐.
  **사업자등록·영업신고·위생교육·필요 전력·차량 대수는 섭외 확정 단계에서 확인**한다
- **깔때기 3개 구분을 명확히 함** — 헷갈리면 셋 다 망가진다
  | 창구 | 대상 | 목적지 |
  |---|---|---|
  | B2B 상담 (`ContactSection`) | 행사 주최자 | `/api/contact` |
  | **협력사 등록 (`/partners`)** | 푸드트럭·셀러 업체 | `/api/partners` → 섭외 풀 + 카탈로그 프로필 |
  | 플릿 플랫폼 (`app.flitunion.com`) | 스스로 행사를 찾는 셀러 | 외부 플랫폼 |
  - `SellerCtaSection` 목적지를 플랫폼 → `/partners` 로 변경, 헤더 부가 링크도 "셀러 지원" → "협력사 등록"
  - `/partners` 안에 플랫폼 안내 블록을 따로 둬서 "둘 다 이용해도 된다"를 명시 (플랫폼 유입을 끊지 않는다)
  - `/sellers`·`/foodtruck` 카탈로그 하단에서도 "여기 실리고 싶으면 등록하세요" 로 연결
- 검증: `next build`·`tsc`·ESLint(src 무결) 통과. **API 검증 4케이스**(필수 누락/잘못된 구분/깨진 JSON/정상)
  응답 확인, 로컬 웹훅 수신기 띄워 **브라우저로 폼 제출 end-to-end** 확인(구분 미선택 시 제출 비활성,
  푸드트럭 선택 시 라벨이 '대표 메뉴'로 전환, 접수 완료 화면, 웹훅 페이로드 7필드 정상), 사이트맵 17 URL, 콘솔 에러 0건

### 2026-09-21 (2) — ✍️ 전체 카피 톤 점검 — 포멀 격식체로 통일

**배경:** 사이트 카피가 회사소개서의 포멀 톤에서 벗어나 구어체로 흘러 있었다. 주 고객이 지자체·대학 행정·기업
총무라 반말투로 읽히면 신뢰가 깎인다. 위의 **카피 톤 규칙** 섹션을 신설하고 전수 교정했다.

- **FAQ 질문 종결 27건** 하십시오체로 (`~나요?/~까요?` → `~합니까?/~입니까?`) — `faq.ts` 10문항 + `services.ts` 18문항
- **본문·헤드라인 87건 교정** — 해요체/게요체("연락드릴게요", "여쭤볼게요"), `~하세요` 명령형,
  구어 어휘(통째로·끝냅니다·짭니다·깎입니다·뚫다·묶여 나옵니다·뭐가·따져보다), 느낌표
- **`제안드립니다` → `제안해 드립니다`** 어법 통일 (9개 파일)
- **감정 이모지 제거** — `ProblemSolutionSection` 의 🗓️😰🧾 를 heroicons 라인 SVG 로 교체해
  `ServicesSection` 과 시각 언어를 맞췄다. 표정 이모지(😰)가 포멀 톤을 가장 크게 해치고 있었다
- **곁다리로 잡은 옛 포지셔닝 잔재 3건** — 행사 대행 전환 때 놓친 것들
  - `ProblemSolutionSection` 제목 "**공간**의 문제, 플릿 유니온이 해결합니다" → "**행사 준비**의 문제…"
  - 같은 섹션 배너 "셀러 리뷰 점수가 검증한 **마켓 운영사**" → "…운영 품질을 관리하는 **행사 대행사**"
  - `ContactSection` "**플리마켓·야시장 운영**, 지금 바로 무료 상담받으세요" → "**행사 운영 대행**, 무료 상담을 신청하시기 바랍니다"
- **경쟁사 비방 문구 제거** — "다른 대행사가 갖지 못한 데이터 기반 운영 역량입니다" → 자사 사실 서술로 교체
- 검증: `next build`·`tsc`·ESLint(src 무결) 통과, 8개 주요 라우트 200, 구어체 재검사 0건, 콘솔 에러 0건
- ⚠️ **남은 이모지** — `/packages`(🎓🏘🎡🏢), `/partners` 혜택 카드(📋🗂🎪🧾), `/about` 사업 영역·서비스
  상세 히어로(🎪🏪🎡🌙🚚📦), `PartnerForm` 구분 선택(🚚🏪)은 **아직 이모지**다. 감정 표현은 아니라 남겨뒀으나,
  완전히 포멀하게 가려면 라인 SVG 로 교체해야 한다 (아이콘 14종 신규 제작 필요 — 별도 작업)
