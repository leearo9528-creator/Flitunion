// 푸드트럭 메뉴 / 셀러 품목 카탈로그 생성기 (16:9 PPT, 3열 3줄)
//   node docs/catalog-build.js
// 사진은 docs/photos/foodtruck-menu, docs/photos/seller-items 에 <slug>.jpg 로 넣으면
// 자동으로 들어가고, 없으면 '사진 준비 중' 자리표시로 나갑니다.

const pptx = require("pptxgenjs");
const fs = require("fs"), path = require("path");

const FT_DIR = path.join(__dirname, "photos", "foodtruck-menu");
const SL_DIR = path.join(__dirname, "photos", "seller-items");
const FONT = "Malgun Gothic";
const NAVY="0B1F44", BRAND="3182F6", INK="101828", GRAY="5A6B85", MUTED="A3B0C4",
      TINT="EAF2FF", LINE="E4EBF5", PAPER="FBFCFE";

// 16:9
const W = 13.333, H = 7.5, M = 0.62;
const COLS = 3, ROWS = 3, PER = COLS * ROWS;
const GAPX = 0.26, GAPY = 0.20;
const CW = (W - M*2 - GAPX*(COLS-1)) / COLS;
const GRID_Y = 1.56, GRID_B = 6.98;
const CH = (GRID_B - GRID_Y - GAPY*(ROWS-1)) / ROWS;
const PAD = 0.13;
const IMG = CH - PAD*2;                       // 카드 높이에 맞춘 정사각 썸네일
const TX = PAD + IMG + 0.18;                  // 글 시작 위치
const TW = CW - TX - 0.16;

function findPhoto(dir, slug) {
  for (const ext of ["jpg","jpeg","png","JPG","PNG","webp"]) {
    const f = path.join(dir, `${slug}.${ext}`);
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function header(s, title, lead, pageNo, pageAll) {
  s.addShape("rect", { x:0, y:0, w:W, h:0.075, fill:{color:NAVY}, line:{color:NAVY} });
  s.addShape("rect", { x:M, y:0.50, w:0.055, h:0.46, fill:{color:BRAND}, line:{color:BRAND} });
  s.addText("FLIT UNION", { x:M+0.20, y:0.42, w:4.0, h:0.22, align:"left",
    fontFace:"Arial", fontSize:8.5, bold:true, color:BRAND, charSpacing:2.4, isTextBox:true });
  s.addText(title, { x:M+0.20, y:0.60, w:7.2, h:0.40, align:"left", valign:"top",
    fontFace:FONT, fontSize:22, bold:true, color:NAVY, isTextBox:true });
  s.addText(lead, { x:W-M-5.2, y:0.66, w:5.2, h:0.30, align:"right", valign:"top",
    fontFace:FONT, fontSize:9.5, color:GRAY, isTextBox:true });
  s.addText([{ text:String(pageNo).padStart(2,"0"), options:{ fontSize:11, bold:true, color:NAVY } },
             { text:` / ${String(pageAll).padStart(2,"0")}`, options:{ fontSize:9, color:MUTED } }],
    { x:W-M-5.2, y:0.42, w:5.2, h:0.24, align:"right", fontFace:"Arial", isTextBox:true });
  s.addShape("rect", { x:M, y:1.26, w:W-M*2, h:0.012, fill:{color:LINE}, line:{color:LINE} });
}

function card(s, item, idx, dir, no) {
  const col = idx % COLS, row = Math.floor(idx / COLS);
  const x = M + col*(CW+GAPX);
  const y = GRID_Y + row*(CH+GAPY);

  s.addShape("roundRect", { x, y, w:CW, h:CH, rectRadius:0.05,
    fill:{color:PAPER}, line:{color:LINE, width:0.75} });

  const photo = item.slug ? findPhoto(dir, item.slug) : null;
  if (photo) {
    s.addImage({ path:photo, x:x+PAD, y:y+PAD, w:IMG, h:IMG });
  } else {
    s.addShape("rect", { x:x+PAD, y:y+PAD, w:IMG, h:IMG, fill:{color:"EFF3F9"}, line:{color:LINE, width:0.75} });
    s.addText("사진 준비 중", { x:x+PAD, y:y+PAD+IMG/2-0.16, w:IMG, h:0.32, align:"center",
      fontFace:FONT, fontSize:8, color:MUTED, isTextBox:true });
  }

  s.addText(String(no).padStart(2,"0"), { x:x+TX, y:y+PAD+0.02, w:TW, h:0.18, align:"left",
    fontFace:"Arial", fontSize:7.5, bold:true, color:BRAND, charSpacing:1, isTextBox:true });

  const titleRuns = [{ text:item.t, options:{ fontSize:12.5, bold:true, color:INK } }];
  if (item.n) titleRuns.push({ text:`   ${item.n}`, options:{ fontSize:8, bold:true, color:BRAND } });
  s.addText(titleRuns, { x:x+TX, y:y+PAD+0.20, w:TW, h:0.30, align:"left", valign:"top",
    fontFace:FONT, isTextBox:true });

  s.addText(item.d, { x:x+TX, y:y+PAD+0.52, w:TW, h:IMG-0.52, align:"left", valign:"top",
    fontFace:FONT, fontSize:8, color:GRAY, lineSpacingMultiple:1.22, isTextBox:true });
}

function build(title, lead, items, dir, out, note) {
  const p = new pptx();
  p.defineLayout({ name:"W169", width:W, height:H });
  p.layout = "W169";
  const pages = [];
  for (let i = 0; i < items.length; i += PER) pages.push(items.slice(i, i+PER));
  pages.forEach((pg, i) => {
    const s = p.addSlide();
    s.background = { color:"FFFFFF" };
    header(s, title, lead, i+1, pages.length);
    pg.forEach((it, k) => card(s, it, k, dir, i*PER + k + 1));
    s.addShape("rect", { x:M, y:H-0.50, w:W-M*2, h:0.012, fill:{color:LINE}, line:{color:LINE} });
    s.addText(note || "플릿 유니온   |   www.flitunion.com", { x:M, y:H-0.40, w:W-M*2-0.9, h:0.28,
      align:"left", valign:"top", fontFace:FONT, fontSize:7.5, color:MUTED, isTextBox:true });
    s.addText("FLIT UNION", { x:M, y:H-0.40, w:W-M*2, h:0.28,
      align:"right", fontFace:"Arial", fontSize:7.5, bold:true, color:MUTED, charSpacing:1.6, isTextBox:true });
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

// ───────── 셀러 품목 27종 (보유 수 많은 순) ─────────
const SL = [
 { slug:"dessert", t:"디저트 · 먹거리", n:"23곳", d:"마카롱, 쿠키, 케이크, 잼, 밀크티, 솜사탕, 아이스크림. 대부분 완제품이라 전기가 필요 없음" },
 { slug:"goods", t:"잡화 · 소품", n:"15곳", d:"파우치, 미니백, 데코 소품, 문구, 굿즈, 지비츠" },
 { slug:"handmade", t:"핸드메이드 공방", n:"14곳", d:"품목을 특정하지 않고 공방 단위로 참가하는 셀러. 행사 성격에 맞춰 품목 조율 가능" },
 { slug:"flower", t:"플라워 · 식물", n:"12곳", d:"생화, 프리저브드, 실크플라워, 다육식물, 가드닝 소품" },
 { slug:"tarot", t:"타로 · 사주", n:"11곳", d:"타로, 신점, 심리상담. 포화 품목이라 행사당 1~2곳으로 제한 배치" },
 { slug:"pet", t:"반려동물", n:"11곳", d:"수제 간식, 수제 사료, 하네스, 맞춤 인형. 반려동물 동반 행사 전용" },
 { slug:"clothing", t:"의류 · 한복", n:"10곳", d:"생활한복, 컨템포러리 한복, 여성 의류, 빅사이즈(66 이상), 직수입 빈티지" },
 { slug:"accessory", t:"악세사리 · 주얼리", n:"8곳", d:"은세공, 원석 주얼리, 비녀, 블링 악세사리, 스마트폰 악세사리" },
 { slug:"keyring", t:"키링 · 그립톡", n:"8곳", d:"레진 그립톡, 폰 비즈키링, 매듭 키링, 인형 키링, 지비츠" },
 { slug:"doll", t:"인형", n:"6곳", d:"모루인형, 수공예 인형, 털모찌, 1:1 맞춤 제작 인형" },
 { slug:"beads", t:"비즈 · 볼펜꾸미기", n:"5곳", d:"비즈 악세사리, 비즈 볼펜, 네잎클로버·꽃 비즈 소품" },
 { slug:"candle", t:"캔들 · 방향제", n:"5곳", d:"소이캔들, 디퓨저, 석고 방향제, 차량용 방향제" },
 { slug:"farm", t:"농산물 · 특산물", n:"5곳", d:"지역 과일, 건어물, 반건조 오징어, 한우. 지역 축제에서 현지 농가와 함께 구성" },
 { slug:"kids", t:"키즈", n:"5곳", d:"키즈 놀이존, 유아 용품, 도서 나눔, 아토피 케어" },
 { slug:"henna", t:"헤나 · 타투", n:"4곳", d:"헤나 타투, 페이스페인팅, 주문제작 타투 스티커. 아이 동반 행사 필수 부스" },
 { slug:"ceramic", t:"도자기", n:"4곳", d:"그릇, 미니어처 오브제, 리빙 소품, 페인팅 액자" },
 { slug:"knit", t:"뜨개 · 니팅", n:"4곳", d:"손염색실, 뜨개 소품, 수세미, 니팅 제품" },
 { slug:"caricature", t:"캐리커처 · 초상화", n:"4곳", d:"현장 캐리커처, 수채 초상화, 거리 인물화. 3분 내외로 완성돼 회전이 빠름" },
 { slug:"photo", t:"즉석사진", n:"4곳", d:"현장 촬영 후 즉석 인화. 행사 기념품으로 남는 부스" },
 { slug:"figure", t:"피규어", n:"3곳", d:"3D 인물 피규어 제작, 캐릭터 피규어" },
 { slug:"maedeup", t:"매듭 · 리본", n:"3곳", d:"전통 매듭 팔찌·머리핀, 리본 공예" },
 { slug:"nail", t:"네일 · 뷰티", n:"3곳", d:"수제 네일팁 주문제작, 더마·K뷰티 화장품" },
 { slug:"leather", t:"가죽 · 라탄 · 펠트", n:"3곳", d:"카드지갑·키링 DIY 가죽 체험, 라탄 바구니와 트레이, 양모펠트 인형과 브로치" },
 { slug:"wood", t:"목공예", n:"2곳", d:"원목 소품, 바느질 도구, 데스크 오거나이저" },
 { slug:"badge", t:"뱃지", n:"2곳", d:"캘리그래피·그림 뱃지 제작" },
 { slug:"tufting", t:"터프팅", n:"1곳", d:"러그 공예. 체류 시간이 길어 유입을 붙잡는 부스" },
 { slug:"reptile", t:"파충류 체험", n:"1곳", d:"크레스티드게코, 아프리카 식물. 다른 마켓에 없는 차별화 콘텐츠" },
];

(async () => {
  await build("푸드트럭 메뉴", "행사 섭외 가능 푸드트럭 24종", FT, FT_DIR,
    "flitunion-foodtruck-catalog.pptx");
  await build("플리마켓 셀러 품목", "보유 셀러가 많은 순 27종", SL, SL_DIR,
    "flitunion-seller-catalog.pptx",
    "사진은 품목 이해를 돕기 위한 예시 이미지입니다 (자유 이용 라이선스). 실제 참여 셀러의 상품 사진이 아닙니다.");
})();
