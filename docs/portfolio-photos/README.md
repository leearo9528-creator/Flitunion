# 회사소개서 포트폴리오 사진

`docs/company-profile-build.js` 가 이 폴더의 사진을 읽어 13p(주요 실적)·14p(사례 연구)에 넣습니다.
파일명은 `src/data/portfolio.ts` 의 id 와 동일하게 지정합니다 (jpg / jpeg / png / webp).

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

- 가로형(16:10 내외) 권장. 세로 사진도 가운데 기준으로 잘라 넣습니다.
- `gallery/` 하위에 사진 3장 이상을 넣으면 '현장 스케치' 슬라이드가 추가로 생성됩니다 (최대 6장).
- 사진이 없는 항목은 카메라 아이콘 자리표시로 나갑니다.

재생성: `PHOTO_DIR=docs/portfolio-photos node docs/company-profile-build.js`
