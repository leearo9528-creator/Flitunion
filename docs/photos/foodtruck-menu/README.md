# 푸드트럭 메뉴 사진

`docs/catalog-build.js` 가 이 폴더에서 사진을 찾아 푸드트럭 카탈로그에 넣습니다.
파일명이 곧 자리 지정입니다. 확장자는 `jpg` / `jpeg` / `png` / `webp` 모두 됩니다.
없는 자리는 '사진 준비 중' 자리표시로 나갑니다.

```bash
node docs/catalog-build.js   # pptxgenjs 필요 (npm i pptxgenjs)
```

---

## 사진이 들어와 있는 자리 (14개)

| 파일명 | 메뉴 |
|---|---|
| `gopchang.jpg` | 곱창 |
| `cozeat.jpg` | 떡튀순 |
| `dakgangjeong.jpg` | 닭강정 |
| `dutch-kkochi.jpg` | 닭꼬치 |
| `steak.jpg` | 스테이크 |
| `pizza.jpg` | 화덕피자 |
| `kebab.jpg` | 케밥 |
| `bulchobap.jpg` | 불초밥 |
| `takoyaki.jpg` | 타코야끼 |
| `takoazit.jpg` | 오코노미야끼 |
| `shasha-crepe.jpg` | 크레페 |
| `insaeng-crepe.jpg` | 과일 크레페 (예비) |
| `churros.jpg` | 츄러스 |
| `chan-cafe.jpg` | 커피 · 에이드 |

`<파일명>-truck.jpg` 는 같은 업체의 **차량 외관 사진**입니다. 카탈로그에는 쓰지 않고
제안서에서 부스 외관을 보여줘야 할 때 꺼내 씁니다.

## 아직 비어 있는 자리 (10개)

| 파일명 | 메뉴 |
|---|---|
| `udon.jpg` | 우동 |
| `yakisoba.jpg` | 야끼소바 |
| `hoeori.jpg` | 회오리감자 · 소떡소떡 |
| `hotdog.jpg` | 핫도그 |
| `eomuk.jpg` | 새우꼬치 · 부산어묵 |
| `shrimp.jpg` | 새우튀김 · 새우버거 |
| `gimbap.jpg` | 충무김밥 |
| `bingsu.jpg` | 빙수 |
| `specialty.jpg` | 스페셜티 커피 |
| `bakery-coffee.jpg` | 커피 · 베이커리 |
| `cocktail.jpg` | 칵테일 · 주류 |

---

## ⚠️ 사진 출처

현재 들어와 있는 14개는 **크러쉬 F&P 사업제안서에서 추출한 사진**입니다.
해당 트럭들은 우리 네트워크에 등록된 곳이지만 사진 자체는 크러쉬 F&P 가 만든 자료입니다.

- **내부 검토용으로만 쓰십시오.**
- 클라이언트·주최사에 배포하는 자료에 넣으려면 **각 트럭에서 직접 사진을 받아 교체**해야 합니다.
- 섭외 확정 시 업체에 사진을 요청해 이 폴더 파일을 덮어쓰면 카탈로그가 자동으로 갱신됩니다.

## 사진 규격

- **정사각형(1:1)** 권장. 가로세로 비가 1.25 를 넘으면 자르지 않고 흰 여백을 채워 넣습니다.
- 한 변 **900px 이상**이면 충분합니다.
- 음식이 크게 나온 사진이 부스 사진보다 잘 팔립니다.
