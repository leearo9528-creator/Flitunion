// 푸드트럭 메뉴 / 셀러 품목 카탈로그 생성기 (A4 세로)
//   node docs/catalog-build.js
// 사진은 docs/photos/foodtruck-menu, docs/photos/seller-items 에 <slug>.jpg 로 넣으면
// 자동으로 들어가고, 없으면 '사진 준비 중' 자리표시로 나갑니다.

const pptx = require("pptxgenjs");
const fs = require("fs"), path = require("path");

const FT_DIR = path.join(__dirname, "photos", "foodtruck-menu");
const SL_DIR = path.join(__dirname, "photos", "seller-items");
const FONT = "Malgun Gothic";
const NAVY="0B1F44", BRAND="3182F6", INK="0F172A", GRAY="475569", MUTED="94A3B8", TINT="EAF2FF", LINE="DBE6F6";

// A4 portrait
const W = 8.27, H = 11.69, M = 0.62;
const COLS = 3, GAP = 0.28;
const CW = (W - M*2 - GAP*(COLS-1)) / COLS;   // card width
const IMG = CW;                                // square photo
const TITLE_H = 0.42, DESC_H = 1.05;
const CARD_H = IMG + 0.14 + TITLE_H + DESC_H;
const GRID_Y = 2.62, ROW_GAP = 0.34;

function findPhoto(dir, slug) {
  for (const ext of ["jpg","jpeg","png","JPG","PNG","webp"]) {
    const f = path.join(dir, `${slug}.${ext}`);
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function header(s, kicker, title, sub) {
  s.addText(kicker, { x:0, y:0.62, w:W, h:0.62, align:"center",
    fontFace:FONT, fontSize:34, bold:true, color:BRAND, charSpacing:1 });
  s.addText(title, { x:0, y:1.18, w:W, h:0.78, align:"center",
    fontFace:FONT, fontSize:44, bold:true, color:NAVY });
  s.addShape("roundRect", { x:(W-5.6)/2, y:2.02, w:5.6, h:0.44, rectRadius:0.22,
    fill:{color:TINT}, line:{color:TINT} });
  s.addText(sub, { x:(W-5.6)/2, y:2.02, w:5.6, h:0.44, align:"center", valign:"middle",
    fontFace:FONT, fontSize:13, bold:true, color:NAVY, isTextBox:true });
}

function card(s, item, col, row, dir) {
  const x = M + col*(CW+GAP);
  const y = GRID_Y + row*(CARD_H+ROW_GAP);
  const photo = item.slug ? findPhoto(dir, item.slug) : null;

  if (photo) {
    s.addImage({ path:photo, x, y, w:IMG, h:IMG, rounding:false });
  } else {
    s.addShape("rect", { x, y, w:IMG, h:IMG, fill:{color:"F4F7FC"}, line:{color:LINE, width:1} });
    s.addText("사진 준비 중", { x, y:y+IMG/2-0.2, w:IMG, h:0.4, align:"center",
      fontFace:FONT, fontSize:11, color:MUTED, isTextBox:true });
  }
  s.addText(item.t, { x, y:y+IMG+0.12, w:CW, h:TITLE_H, align:"left", valign:"top",
    fontFace:FONT, fontSize:15, bold:true, color:INK, isTextBox:true });
  s.addText(item.d, { x, y:y+IMG+0.12+TITLE_H, w:CW, h:DESC_H, align:"left", valign:"top",
    fontFace:FONT, fontSize:9.5, color:GRAY, lineSpacingMultiple:1.24, isTextBox:true });
}

function build(name, kicker, title, pages, dir, out) {
  const p = new pptx();
  p.defineLayout({ name:"A4P", width:W, height:H });
  p.layout = "A4P";
  pages.forEach((pg, i) => {
    const s = p.addSlide();
    s.background = { color:"FFFFFF" };
    header(s, kicker, title, pg.sub);
    pg.items.forEach((it, k) => card(s, it, k % COLS, Math.floor(k / COLS), dir));
    s.addText(`플릿 유니온 · www.flitunion.com`, { x:M, y:H-0.62, w:W-M*2, h:0.3,
      align:"left", fontFace:FONT, fontSize:8, color:MUTED, isTextBox:true });
    s.addText(`${i+1} / ${pages.length}`, { x:M, y:H-0.62, w:W-M*2, h:0.3,
      align:"right", fontFace:FONT, fontSize:8, color:MUTED, isTextBox:true });
  });
  return p.writeFile({ fileName: out }).then(() => console.log("wrote", out));
}



const FT = [
 { sub:"· 식사류 — 한식 · 양식 ·", items:[
  { slug:"gopchang", t:"곱창", d:"철판에 볶아내는 야채곱창과 곱창볶음밥. 저녁·주류 수요가 붙는 야시장형 메뉴" },
  { slug:"cozeat", t:"떡튀순", d:"떡볶이·오뎅·튀김 3종. 5,000~9,000원대로 회전이 가장 빠른 품목" },
  { slug:"dakgangjeong", t:"닭강정", d:"간장·양념 닭강정. 컵 포장이라 걸어 다니며 먹기 좋음" },
  { slug:"dutch-kkochi", t:"닭꼬치", d:"소금구이·데리야끼·매운맛 3종. 5,000원대 저단가 회전 메뉴" },
  { slug:"steak", t:"스테이크", d:"즉석 구이 스테이크와 도시락 구성. 객단가가 가장 높은 메인 메뉴" },
  { slug:"pizza", t:"화덕피자", d:"페퍼로니·버섯·고르곤졸라. 화덕 자체가 볼거리가 되는 부스" },
 ]},
 { sub:"· 식사류 — 일식 · 아시안 · 디저트 ·", items:[
  { slug:"kebab", t:"케밥", d:"치킨·램 케밥. 한 손에 들고 먹는 형태라 대기 회전이 빠름" },
  { slug:"bulchobap", t:"불초밥", d:"소고기 불초밥·연어초밥. 토치로 구워내는 과정이 그대로 노출됨" },
  { slug:"takoyaki", t:"타코야끼", d:"오리지널·매운맛. 조리 과정이 보여 대기줄이 그림이 되는 품목" },
  { slug:"takoazit", t:"오코노미야끼", d:"철판에 부쳐내는 오코노미야끼. 타코야끼와 함께 운영 가능" },
  { slug:"shasha-crepe", t:"크레페", d:"생크림·과일 크레페와 크레페 파르페. 디저트 라인 대표 메뉴" },
  { slug:"churros", t:"츄러스", d:"츄러스와 아이스크림 츄러스. 아이 동반 가족 대응" },
 ]},
 { sub:"· 음료 · 간식 ·", items:[
  { slug:"chan-cafe", t:"커피 · 에이드", d:"아메리카노·에이드·스무디. 체류 시간을 늘리는 필수 구성" },
  { slug:"udon", t:"우동", d:"기본 우동·김치우동·튀김우동. 저녁 시간대와 추운 계절에 강함" },
  { slug:"yakisoba", t:"야끼소바", d:"철판 야끼소바. 오코노미야끼와 한 부스로 묶어 운영" },
  { slug:"hoeori", t:"회오리감자 · 소떡소떡", d:"4,000~5,000원대. 아이 동반 가족이 가장 먼저 서는 부스" },
  { slug:"hotdog", t:"핫도그", d:"뉴욕핫도그·옛날핫도그. 한 손 취식형 저단가 메뉴" },
  { slug:"eomuk", t:"새우꼬치 · 부산어묵", d:"레몬새우·칠리새우와 어묵 3꼬치 4,000원 구성" },
 ]},
 { sub:"· 간식 · 음료 확장 ·", items:[
  { slug:"shrimp", t:"새우튀김 · 새우버거", d:"튀김류 중심 구성. 감자튀김 사이드 운영" },
  { slug:"gimbap", t:"충무김밥", d:"포장 도시락형. 앉을 자리가 있는 행사에 적합" },
  { slug:"bingsu", t:"빙수", d:"컵빙수·사과빙수. 여름 야외 행사 전용 라인" },
  { slug:"specialty", t:"스페셜티 커피", d:"스페셜티 수준 커피 케이터링. 기업 행사·전시에 적합" },
  { slug:"bakery-coffee", t:"커피 · 베이커리", d:"프리미엄 커피에 당일 구운 베이커리를 함께 운영" },
  { slug:"cocktail", t:"칵테일 · 주류", d:"야간 행사 전용. 주류 판매 가능 여부는 장소별 확인 필요" },
 ]},
];

const SL = [
 { sub:"· 핸드메이드 · 공예 ·", items:[
  { slug:"ceramic", t:"도자기", d:"물레·핸드빌딩으로 만든 그릇, 컵, 오브제. 도자기 취급 셀러 3곳 보유" },
  { slug:"wood", t:"목공예", d:"도마·트레이·소품 등 원목 제품. 인두기 각인 체험까지 가능" },
  { slug:"plaster", t:"석고 방향제", d:"석고 방향제·오브제. 컬러링 체험 부스로 전환 가능" },
  { slug:"beads", t:"비즈 · 주얼리", d:"비즈 악세사리, 은세공, 원석 주얼리. 보유 셀러가 가장 많은 품목" },
  { slug:"knit", t:"뜨개 · 니팅", d:"코바늘·대바늘 소품, 수세미, 가방. 겨울 행사에 강한 품목" },
  { slug:"moru", t:"모루인형", d:"철사에 털실을 감아 만드는 인형·꽃. 즉석 제작 체험 가능" },
 ]},
 { sub:"· 핸드메이드 · 공예 ·", items:[
  { slug:"rattan", t:"라탄 공예", d:"라탄 바구니·트레이·소품" },
  { slug:"felt", t:"양모펠트", d:"양모를 찔러 굳혀 만드는 인형·브로치" },
  { slug:"maedeup", t:"매듭 · 리본", d:"전통 매듭 팔찌, 리본 공예 소품" },
  { slug:"keyring", t:"키링 · 그립톡", d:"레진 그립톡, 아크릴 키링, 폰 비즈키링" },
  { slug:"candle", t:"캔들 · 디퓨저", d:"소이캔들, 디퓨저, 차량용 방향제" },
  { slug:"paper", t:"제본 · 문구", d:"수제 노트, 다이어리, 문구 소품" },
 ]},
 { sub:"· 아트 · 체험 부스 ·", items:[
  { slug:"caricature", t:"캐리커처", d:"즉석 캐리커처와 수채 초상화. 3분 내외로 완성되어 회전이 빠름" },
  { slug:"photo", t:"즉석사진", d:"현장 촬영 후 즉석 인화. 행사 기념품으로 남는 부스" },
  { slug:"henna", t:"헤나 · 페이스페인팅", d:"헤나 타투와 페이스페인팅. 아이 동반 행사 필수 부스" },
  { slug:"tufting", t:"터프팅", d:"러그 공예. 체류 시간이 길어 유입을 붙잡는 부스" },
  { slug:"gacha", t:"뽑기", d:"뽑기 체험. 키즈·가족 행사에서 대기줄이 생기는 품목" },
  { slug:"reptile", t:"파충류 체험", d:"크레스티드게코·아프리카 식물. 다른 마켓에 없는 차별화 콘텐츠" },
 ]},
 { sub:"· 패션 · 리빙 · 먹거리 ·", items:[
  { slug:"hanbok", t:"한복", d:"생활한복과 컨템포러리 한복. 전통·민속 행사에 적합" },
  { slug:"clothing", t:"의류", d:"여성 의류, 빅사이즈 의류(66 이상), 빈티지 의류" },
  { slug:"bag", t:"가방 · 잡화", d:"미니백, 파우치, 생활 잡화, 데코 소품" },
  { slug:"dessert", t:"디저트", d:"마카롱, 쿠키, 케이크, 제과. 전부 완제품 판매라 전기가 필요 없음" },
  { slug:"sweets", t:"솜사탕 · 아이스크림", d:"즉석 솜사탕과 콘 아이스크림. 전기 공급이 필요한 품목" },
  { slug:"flower", t:"플라워 · 식물", d:"생화·프리저브드 플라워, 다육식물, 가드닝 소품" },
 ]},
 { sub:"· 그 외 운영 가능 부스 ·", items:[
  { slug:"tarot", t:"타로 · 사주", d:"타로, 신점, 사주. 포화 품목이라 행사당 1~2곳으로 제한 배치" },
  { slug:"pet", t:"반려동물", d:"수제 간식, 반려동물 용품, 맞춤 인형. 반려동물 동반 행사 전용" },
  { slug:"kids", t:"키즈", d:"키즈 놀이존, 유아 용품, 교육 콘텐츠" },
  { slug:"farm", t:"농산물 · 특산물", d:"지역 과일, 건어물, 한우. 지역 축제에서 현지 농가와 함께 구성" },
  { slug:"nail", t:"네일 · 뷰티", d:"수제 네일팁 주문제작, 퍼스널컬러 진단" },
  { slug:"calli", t:"캘리그래피", d:"이름·문구 캘리그래피와 에코백·부채 드로잉" },
 ]},
];

(async () => {
  await build("ft", "플릿 유니온", "푸드트럭 메뉴", FT, FT_DIR, "flitunion-foodtruck-catalog.pptx");
  await build("sl", "플릿 유니온", "플리마켓 셀러 품목", SL, SL_DIR, "flitunion-seller-catalog.pptx");
})();
