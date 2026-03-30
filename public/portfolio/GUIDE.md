# 포트폴리오 이미지 업데이트 가이드

## 이미지 파일 추가 방법

1. 이미지 파일을 이 폴더(`public/portfolio/`)에 넣습니다.
2. 파일명은 포트폴리오 ID와 동일하게 지정합니다.

### 현재 포트폴리오 ID 목록

| ID | 제목 | 파일명 |
|---|---|---|
| `hongik-festival` | 홍익대학교 대동제 플리마켓 | `hongik-festival.jpg` |
| `hangang-night` | 한강공원 여름 야시장 | `hangang-night.jpg` |
| `gangnam-cafe` | 강남 대형 카페 브런치 마켓 | `gangnam-cafe.jpg` |
| `seongsu-popup` | 성수동 복합문화공간 팝업마켓 | `seongsu-popup.jpg` |
| `konkuk-festival` | 건국대학교 봄 축제 플리마켓 | `konkuk-festival.jpg` |
| `bundang-outlet` | 분당 프리미엄 아울렛 팝업마켓 | `bundang-outlet.jpg` |

## 이미지 규격

- **형식:** JPG 또는 WebP
- **권장 크기:** 800x500px 이상 (가로형)
- **비율:** 16:10 또는 16:9
- **파일 크기:** 500KB 이하 (최적화)

## 이미지 적용하기

이미지 파일을 넣은 후 `src/data/portfolio.ts`에서 해당 항목의 `image` 필드를 추가합니다:

```typescript
{
  id: "hongik-festival",
  image: "/portfolio/hongik-festival.jpg",  // 이 줄 추가
  // ... 나머지 필드
}
```

## 새 포트폴리오 항목 추가하기

`src/data/portfolio.ts` 파일에 새 항목을 추가합니다:

```typescript
{
  id: "new-case",                    // 고유 ID (영문, 하이픈)
  tag: "카페 마켓",                   // 카테고리 태그
  location: "서울 강남구",             // 위치
  title: "행사 제목",                 // 카드 제목
  desc: "한 줄 요약 설명",            // 카드 설명 (1~2줄)
  fullDesc: "상세 설명...",           // 펼쳤을 때 보이는 전체 설명
  image: "/portfolio/new-case.jpg",   // 이미지 경로
  placeholderGradient: "linear-gradient(135deg, #1e3a8a 0%, #3182f6 100%)",
  stats: [
    { label: "운영 일수", value: "3일" },
    { label: "셀러", value: "50팀" },
    { label: "방문자", value: "5,000명" },
  ],
  details: [
    { title: "기획 배경", content: "..." },
    { title: "운영 방식", content: "..." },
    { title: "셀러 구성", content: "..." },
    { title: "성과", content: "..." },
  ],
  tagClass: "bg-blue-100 text-blue-700",    // 태그 색상
  borderClass: "border-blue-100",
}
```

### 사용 가능한 태그 색상

| 색상 | tagClass | 용도 |
|---|---|---|
| 파란색 | `bg-blue-100 text-blue-700` | 캠퍼스 마켓 |
| 남색 | `bg-indigo-100 text-indigo-700` | 야시장 |
| 노란색 | `bg-amber-100 text-amber-700` | 카페 마켓 |
| 초록색 | `bg-green-100 text-green-700` | 공간 수익화 |
| 보라색 | `bg-purple-100 text-purple-700` | 캠퍼스 마켓 |
| 분홍색 | `bg-rose-100 text-rose-700` | 브랜드 팝업 |
