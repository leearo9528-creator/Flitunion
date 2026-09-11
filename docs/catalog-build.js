// 푸드트럭 메뉴 / 셀러 품목 카탈로그 생성기 (16:9 PPT, 3열 3줄)
//   node docs/catalog-build.js
// 사진은 docs/photos/foodtruck-menu, docs/photos/seller-items 에 <slug>.jpg 로 넣으면
// 자동으로 들어가고, 없으면 '사진 준비 중' 자리표시로 나갑니다.

const pptx = require("pptxgenjs");
const fs = require("fs"), path = require("path");

const FT_DIR = path.join(__dirname, "photos", "foodtruck-menu");
const SL_DIR = path.join(__dirname, "photos", "seller-items");
const FONT = "Malgun Gothic";
const NAVY="0B1F44", BRAND="3182F6", INK="0F172A", GRAY="475569", MUTED="94A3B8", TINT="EAF2FF", LINE="DBE6F6";

// 16:9
const W = 13.333, H = 7.5, M = 0.5;
const COLS = 3, ROWS = 3, PER = COLS * ROWS;
const GAPX = 0.30, GAPY = 0.22;
const CW = (W - M*2 - GAPX*(COLS-1)) / COLS;      // 카드 너비
const GRID_Y = 1.50, GRID_B = 7.06;
const CH = (GRID_B - GRID_Y - GAPY*(ROWS-1)) / ROWS;  // 카드 높이
const IMG = 1.55;                                  // 정사각 썸네일
const TX = IMG + 0.16, TW = CW - TX;               // 글 영역

function findPhoto(dir, slug) {
  for (const ext of ["jpg","jpeg","png","JPG","PNG","webp"]) {
    const f = path.join(dir, `${slug}.${ext}`);
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function header(s, kicker, title, sub) {
  s.addText(kicker, { x:0, y:0.22, w:W, h:0.30, align:"center",
    fontFace:FONT, fontSize:16, bold:true, color:BRAND, charSpacing:1 });
  s.addText(title, { x:0, y:0.50, w:W, h:0.50, align:"center",
    fontFace:FONT, fontSize:28, bold:true, color:NAVY });
  const pw = 5.0;
  s.addShape("roundRect", { x:(W-pw)/2, y:1.02, w:pw, h:0.34, rectRadius:0.17,
    fill:{color:TINT}, line:{color:TINT} });
  s.addText(sub, { x:(W-pw)/2, y:1.02, w:pw, h:0.34, align:"center", valign:"middle",
    fontFace:FONT, fontSize:11, bold:true, color:NAVY, isTextBox:true });
}

function card(s, item, idx, dir) {
  const col = idx % COLS, row = Math.floor(idx / COLS);
  const x = M + col*(CW+GAPX);
  const y = GRID_Y + row*(CH+GAPY);
  const iy = y + (CH - IMG)/2;
  const photo = item.slug ? findPhoto(dir, item.slug) : null;

  if (photo) {
    s.addImage({ path:photo, x, y:iy, w:IMG, h:IMG });
  } else {
    s.addShape("rect", { x, y:iy, w:IMG, h:IMG, fill:{color:"F4F7FC"}, line:{color:LINE, width:1} });
    s.addText("사진 준비 중", { x, y:iy+IMG/2-0.18, w:IMG, h:0.36, align:"center",
      fontFace:FONT, fontSize:9, color:MUTED, isTextBox:true });
  }
  s.addText(item.t, { x:x+TX, y:iy, w:TW, h:0.32, align:"left", valign:"top",
    fontFace:FONT, fontSize:13, bold:true, color:INK, isTextBox:true });
  s.addText(item.d, { x:x+TX, y:iy+0.32, w:TW, h:IMG-0.32, align:"left", valign:"top",
    fontFace:FONT, fontSize:8, color:GRAY, lineSpacingMultiple:1.2, isTextBox:true });
}

function build(kicker, title, items, subs, dir, out, note) {
  const p = new pptx();
  p.defineLayout({ name:"W169", width:W, height:H });
  p.layout = "W169";
  const pages = [];
  for (let i = 0; i < items.length; i += PER) pages.push(items.slice(i, i+PER));
  pages.forEach((pg, i) => {
    const s = p.addSlide();
    s.background = { color:"FFFFFF" };
    header(s, kicker, title, subs[i] || "");
    pg.forEach((it, k) => card(s, it, k, dir));
    s.addText(note || "플릿 유니온 · www.flitunion.com", { x:M, y:H-0.40, w:W-M*2-0.7, h:0.3,
      align:"left", valign:"top", fontFace:FONT, fontSize:7.5, color:MUTED, isTextBox:true });
    s.addText(`${i+1} / ${pages.length}`, { x:M, y:H-0.40, w:W-M*2, h:0.3,
      align:"right", fontFace:FONT, fontSize:7.5, color:MUTED, isTextBox:true });
  });
  return p.writeFile({ fileName: out }).then(() => console.log("wrote", out, `(${pages.length}p)`));
}

// ───────── 푸드트럭 메뉴 24종 ─────────
const FT = [
 { slug:"gopchang", t:"곱창", d:"철판에 볶아내는 야채곱창과 곱창볶음밥. 저녁·주류 수요가 붙는 야시장형 메뉴" },
 { slug:"cozeat", t:"떡튀순", d:"떡볶이·오뎅·튀김 3종. 5,000~9,000원대로 회전이 가장 빠른 품목" },
 { slug:"dakgangjeong", t:"닭강정", d:"간장·양념 닭강정. 컵 포장이라 걸어 다니며 먹기 좋음" },
 { slug:"dutch-kkochi", t:"닭꼬치", d:"소금구이·데리야끼·매운맛 3종. 5,000원대 저단가 회전 메뉴" },
 { slug:"steak", t:"스테이크", d:"즉석 구이 스테이크와 도시락 구성. 객단가가 가장 높은 메인 메뉴" },
 { slug:"pizza", t:"화덕피자", d:"페퍼로니·버섯·고르곤졸라. 화덕 자체가 볼거리가 되는 부스" },
 { slug:"kebab", t:"케밥", d:"치킨·램 케밥. 한 손에 들고 먹는 형태라 대기 회전이 빠름" },
 { slug:"bulchobap", t:"불초밥", d:"소고기 불초밥·연어초밥. 토치로 구워내는 과정이 그대로 노출됨" },
 { slug:"takoyaki", t:"타코야끼", d:"오리지널·매운맛. 조리 과정이 보여 대기줄이 그림이 되는 품목" },
 { slug:"takoazit", t:"오코노미야끼", d:"철판에 부쳐내는 오코노미야끼. 타코야끼와 함께 운영 가능" },
 { slug:"shasha-crepe", t:"크레페", d:"생크림·과일 크레페와 크레페 파르페. 디저트 라인 대표 메뉴" },
 { slug:"churros", t:"츄러스", d:"츄러스와 아이스크림 츄러스. 아이 동반 가족 대응" },
 { slug:"chan-cafe", t:"커피 · 에이드", d:"아메리카노·에이드·스무디. 체류 시간을 늘리는 필수 구성" },
 { slug:"udon", t:"우동", d:"기본 우동·김치우동·튀김우동. 저녁 시간대와 추운 계절에 강함" },
 { slug:"yakisoba", t:"야끼소바", d:"철판 야끼소바. 오코노미야끼와 한 부스로 묶어 운영" },
 { slug:"hoeori", t:"회오리감자 · 소떡소떡", d:"4,000~5,000원대. 아이 동반 가족이 가장 먼저 서는 부스" },
 { slug:"hotdog", t:"핫도그", d:"뉴욕핫도그·옛날핫도그. 한 손 취식형 저단가 메뉴" },
 { slug:"eomuk", t:"새우꼬치 · 부산어묵", d:"레몬새우·칠리새우와 어묵 3꼬치 4,000원 구성" },
 { slug:"shrimp", t:"새우튀김 · 새우버거", d:"튀김류 중심 구성. 감자튀김 사이드 운영" },
 { slug:"gimbap", t:"충무김밥", d:"포장 도시락형. 앉을 자리가 있는 행사에 적합" },
 { slug:"bingsu", t:"빙수", d:"컵빙수·사과빙수. 여름 야외 행사 전용 라인" },
 { slug:"specialty", t:"스페셜티 커피", d:"스페셜티 수준 커피 케이터링. 기업 행사·전시에 적합" },
 { slug:"bakery-coffee", t:"커피 · 베이커리", d:"프리미엄 커피에 당일 구운 베이커리를 함께 운영" },
 { slug:"cocktail", t:"칵테일 · 주류", d:"야간 행사 전용. 주류 판매 가능 여부는 장소별 확인 필요" },
];
const FT_SUBS = ["· 식사류 — 한식 · 양식 · 일식 ·", "· 디저트 · 음료 · 간식 ·", "· 간식 · 음료 확장 ·"];

// ───────── 셀러 품목 30종 (보유 수 많은 순) ─────────
const SL = [
 { slug:"dessert", t:"디저트 · 먹거리", d:"23곳 — 마카롱, 쿠키, 케이크, 잼, 밀크티, 솜사탕, 아이스크림. 대부분 완제품이라 전기가 필요 없음" },
 { slug:"goods", t:"잡화 · 소품", d:"15곳 — 파우치, 미니백, 데코 소품, 문구, 굿즈, 지비츠" },
 { slug:"handmade", t:"핸드메이드 공방", d:"14곳 — 품목을 특정하지 않고 공방 단위로 참가하는 셀러. 행사 성격에 맞춰 품목 조율 가능" },
 { slug:"flower", t:"플라워 · 식물", d:"12곳 — 생화, 프리저브드, 실크플라워, 다육식물, 가드닝 소품" },
 { slug:"tarot", t:"타로 · 사주", d:"11곳 — 타로, 신점, 심리상담. 포화 품목이라 행사당 1~2곳으로 제한 배치" },
 { slug:"pet", t:"반려동물", d:"11곳 — 수제 간식, 수제 사료, 하네스, 맞춤 인형. 반려동물 동반 행사 전용" },
 { slug:"clothing", t:"의류 · 한복", d:"10곳 — 생활한복, 컨템포러리 한복, 여성 의류, 빅사이즈(66 이상), 직수입 빈티지" },
 { slug:"accessory", t:"악세사리 · 주얼리", d:"8곳 — 은세공, 원석 주얼리, 비녀, 블링 악세사리, 스마트폰 악세사리" },
 { slug:"keyring", t:"키링 · 그립톡", d:"8곳 — 레진 그립톡, 폰 비즈키링, 매듭 키링, 인형 키링, 지비츠" },
 { slug:"doll", t:"인형", d:"6곳 — 모루인형, 수공예 인형, 털모찌, 1:1 맞춤 제작 인형" },
 { slug:"beads", t:"비즈 · 볼펜꾸미기", d:"5곳 — 비즈 악세사리, 비즈 볼펜, 네잎클로버·꽃 비즈 소품" },
 { slug:"candle", t:"캔들 · 방향제", d:"5곳 — 소이캔들, 디퓨저, 석고 방향제, 차량용 방향제" },
 { slug:"farm", t:"농산물 · 특산물", d:"5곳 — 지역 과일, 건어물, 반건조 오징어, 한우. 지역 축제에서 현지 농가와 함께 구성" },
 { slug:"kids", t:"키즈", d:"5곳 — 키즈 놀이존, 유아 용품, 도서 나눔, 아토피 케어" },
 { slug:"ceramic", t:"도자기", d:"4곳 — 그릇, 미니어처 오브제, 리빙 소품, 페인팅 액자" },
 { slug:"knit", t:"뜨개 · 니팅", d:"4곳 — 손염색실, 뜨개 소품, 수세미, 니팅 제품" },
 { slug:"caricature", t:"캐리커처 · 초상화", d:"4곳 — 현장 캐리커처, 수채 초상화, 거리 인물화. 3분 내외로 완성돼 회전이 빠름" },
 { slug:"photo", t:"즉석사진", d:"4곳 — 현장 촬영 후 즉석 인화. 행사 기념품으로 남는 부스" },
 { slug:"figure", t:"피규어", d:"3곳 — 3D 인물 피규어 제작, 캐릭터 피규어" },
 { slug:"maedeup", t:"매듭 · 리본", d:"3곳 — 전통 매듭 팔찌·머리핀, 리본 공예" },
 { slug:"nail", t:"네일 · 뷰티", d:"3곳 — 수제 네일팁 주문제작, 더마·K뷰티 화장품" },
 { slug:"henna", t:"헤나 · 페이스페인팅", d:"2곳 — 헤나 타투와 페이스페인팅. 아이 동반 행사 필수 부스" },
 { slug:"wood", t:"목공예", d:"2곳 — 원목 소품, 바느질 도구, 데스크 오거나이저" },
 { slug:"badge", t:"뱃지", d:"2곳 — 캘리그래피·그림 뱃지 제작" },
 { slug:"tattoo", t:"타투 스티커", d:"2곳 — 주문제작 타투 스티커, 타투 아트 전시·체험" },
 { slug:"leather", t:"가죽공예", d:"1곳 — 카드지갑, 키링 등 DIY 패키지 형태의 가죽 체험" },
 { slug:"rattan", t:"라탄 공예", d:"1곳 — 라탄 바구니, 트레이, 소품" },
 { slug:"felt", t:"양모펠트", d:"1곳 — 양모를 찔러 굳혀 만드는 인형, 브로치" },
 { slug:"tufting", t:"터프팅", d:"1곳 — 러그 공예. 체류 시간이 길어 유입을 붙잡는 부스" },
 { slug:"reptile", t:"파충류 체험", d:"1곳 — 크레스티드게코, 아프리카 식물. 다른 마켓에 없는 차별화 콘텐츠" },
];
const SL_SUBS = ["· 보유 셀러가 많은 순 · 1 ~ 9 ·", "· 10 ~ 18 ·", "· 19 ~ 27 ·", "· 28 ~ 30 ·"];

(async () => {
  await build("플릿 유니온", "푸드트럭 메뉴", FT, FT_SUBS, FT_DIR, "flitunion-foodtruck-catalog.pptx");
  await build("플릿 유니온", "플리마켓 셀러 품목", SL, SL_SUBS, SL_DIR, "flitunion-seller-catalog.pptx",
    "플릿 유니온 · www.flitunion.com   |   사진은 품목 이해를 돕기 위한 예시 이미지입니다 (자유 이용 라이선스). 실제 참여 셀러의 상품 사진이 아닙니다.");
})();
