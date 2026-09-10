# 사진 넣는 곳

이 폴더에 사진을 넣고 아래 명령을 실행하면 PPT에 자동으로 들어갑니다.
파일명이 곧 자리 지정입니다. 확장자는 `jpg` / `jpeg` / `png` / `webp` 모두 됩니다.
사진이 없는 자리는 카메라 아이콘 자리표시로 나갑니다.

```bash
cd /home/user/Flitunion
node docs/company-profile-build.js   # 회사소개서 → flitunion-company-profile.pptx
node docs/seller-network-build.js    # 셀러 네트워크 참고자료 → flitunion-seller-network.pptx
```

생성된 파일을 `docs/` 로 옮기면 됩니다. (스크립트는 현재 폴더에 파일을 만듭니다)

---

## 1. `portfolio/` — 회사소개서 운영 사례 사진

13페이지 주요 실적 8칸과 14페이지 사례 연구에 들어갑니다.

| 파일명 | 행사 |
|---|---|
| `wonju-univ-night.jpg` | 원주 소재 대학교 야시장 |
| `daegu-univ-flea.jpg` | 대구 소재 대학교 플리마켓 |
| `seoul-festival-booth.jpg` | 서울 소재 대형 축제 부스 |
| `seoul-apt-night.jpg` | 서울 소재 아파트 야시장 |
| `hanam-apt-night.jpg` | 하남 소재 아파트 야시장 |
| `seoul-univ-flea.jpg` | 서울 소재 대학교 플리마켓 |
| `chungcheong-festival.jpg` | 충청 소재 대형 축제 부스 |
| `seoul-folk-festival.jpg` | 서울 소재 민속 축제 부스 |

사례 연구(14p)는 `wonju-univ-night` 과 `hanam-apt-night` 두 장을 같이 씁니다.

## 2. `sellers/` — 셀러 카테고리 사진

셀러 네트워크 참고자료 5페이지 6칸에 들어갑니다. 셀러 부스나 상품 사진이면 됩니다.

| 파일명 | 카테고리 |
|---|---|
| `seller-craft.jpg` | 핸드메이드 · 공예 |
| `seller-art.jpg` | 아트 · 체험 |
| `seller-pet.jpg` | 반려동물 |
| `seller-book.jpg` | 도서 · 교육 · 키즈 |
| `seller-fashion.jpg` | 패션 · 리빙 · 빈티지 |
| `seller-food.jpg` | 디저트 · 먹거리 |

## 3. `foodtruck/` — 푸드트럭 사진

셀러 네트워크 참고자료 6페이지에 들어갑니다.

| 파일명 | 위치 |
|---|---|
| `foodtruck-1.jpg` | 푸드트럭 섭외 페이지 대표 사진 |

## 4. `gallery/` — 현장 스케치 (선택)

파일명은 자유입니다. 사진을 **3장 이상** 넣으면 회사소개서에 '현장 스케치' 슬라이드가
한 장 자동으로 추가됩니다 (이름순 최대 6장). 3장 미만이면 슬라이드를 만들지 않습니다.

---

## 사진 규격

- **가로형(16:10 내외)** 을 권장합니다. 세로 사진도 들어가지만 가운데를 기준으로 잘립니다.
- 긴 변 **1600px 이상**, 파일당 **2MB 이하** 면 충분합니다.
- 사람 얼굴이 크게 나온 사진은 외부 배포용이므로 피하시거나 사전 동의를 받아주십시오.
