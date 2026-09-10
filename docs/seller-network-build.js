const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const Fa = require("react-icons/fa");

// ───────── palette ─────────
const NAVY = "0B1F44";
const NAVY2 = "12305F";
const BRAND = "3182F6";
const BRAND_DK = "1F5FD0";
const SKY = "93C5FD";
const ICE = "D6E4F8";
const WHITE = "FFFFFF";
const INK = "0F172A";
const GRAY = "475569";
const MUTED = "94A3B8";
const TINT = "EAF2FF";

const FONT = "Malgun Gothic";
const W = 13.333, H = 7.5;
const ML = 0.7; // left margin
const CW = W - ML * 2; // content width

const iconCache = {};
async function icon(name, color = WHITE, size = 256) {
  const key = name + color;
  if (iconCache[key]) return iconCache[key];
  const Comp = Fa[name];
  if (!Comp) throw new Error("no icon " + name);
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size }));
  const buf = await sharp(Buffer.from(svg)).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  iconCache[key] = "image/png;base64," + buf.toString("base64");
  return iconCache[key];
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 (표준 PPT 16:9)
pres.author = "Flit Union";
pres.title = "플릿 유니온 셀러·푸드트럭 네트워크 참고자료";

function T(slide, text, o) {
  slide.addText(text, Object.assign({ fontFace: FONT, isTextBox: true, margin: 0, color: WHITE, valign: "top" }, o));
}
function rect(slide, x, y, w, h, fill, extra = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, Object.assign({ x, y, w, h, fill: { color: fill }, line: { color: fill, width: 0 }, rectRadius: 0.1 }, extra));
}
function circle(slide, x, y, d, fill, extra = {}) {
  slide.addShape(pres.shapes.OVAL, Object.assign({ x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } }, extra));
}
async function iconCircle(slide, x, y, d, name, bg = BRAND, fg = WHITE) {
  circle(slide, x, y, d, bg);
  const s = d * 0.5;
  slide.addImage({ data: await icon(name, fg), x: x + (d - s) / 2, y: y + (d - s) / 2, w: s, h: s });
}
function wordmark(slide, x, y, size, flit = BRAND, union = WHITE) {
  slide.addText(
    [
      { text: "Flit", options: { color: flit, bold: true, fontFace: "Arial Black" } },
      { text: "Union", options: { color: union, bold: true, fontFace: "Arial Black" } },
    ],
    { x, y, w: size / 72 * 6.5, h: size / 72 * 1.5, fontSize: size, isTextBox: true, margin: 0, valign: "middle" }
  );
}

let pageNo = 0;
function base(label, title, sub) {
  const s = pres.addSlide();
  pageNo++;
  s.background = { color: NAVY };
  // soft glow circles
  circle(s, W - 3.2, -2.6, 5.6, NAVY2);
  circle(s, -1.8, H - 2.0, 4.0, NAVY2);
  wordmark(s, ML, 0.42, 14);
  T(s, label, { x: ML, y: 0.95, w: 6, h: 0.3, fontSize: 11, bold: true, color: SKY, charSpacing: 3 });
  T(s, title, { x: ML, y: 1.25, w: CW, h: 0.65, fontSize: 28, bold: true, color: WHITE });
  if (sub) T(s, sub, { x: ML, y: 1.9, w: CW, h: 0.45, fontSize: 13, color: ICE });
  T(s, "플릿 유니온 · 셀러·푸드트럭 네트워크 참고자료", { x: ML, y: H - 0.5, w: 4, h: 0.25, fontSize: 9, color: MUTED });
  T(s, String(pageNo).padStart(2, "0"), { x: W - ML - 1, y: H - 0.5, w: 1, h: 0.25, fontSize: 9, color: MUTED, align: "right" });
  return s;
}
// ───────── 사진 로더 ─────────
const fs = require("fs"), path = require("path");
const PHOTO_DIR = process.env.PHOTO_DIR || path.join(__dirname, "photos");
function photoFor(id) {
  // PHOTO_DIR 및 그 하위 폴더(portfolio/ sellers/ foodtruck/ ...)를 모두 뒤져 `<id>.<확장자>` 를 찾는다
  const dirs = [PHOTO_DIR];
  if (fs.existsSync(PHOTO_DIR)) {
    for (const e of fs.readdirSync(PHOTO_DIR, { withFileTypes: true })) {
      if (e.isDirectory() && e.name !== "gallery") dirs.push(path.join(PHOTO_DIR, e.name));
    }
  }
  for (const dir of dirs) {
    for (const ext of ["jpg", "jpeg", "JPG", "JPEG", "png", "PNG", "webp"]) {
      const f = path.join(dir, `${id}.${ext}`);
      if (fs.existsSync(f)) return f;
    }
  }
  return null;
}
async function photoBox(slide, id, x, y, w, h, { radius = 0.1, dy = 0 } = {}) {
  const f = photoFor(id);
  if (f) {
    slide.addImage({ path: f, x, y, w, h, sizing: { type: "cover", w, h }, rounding: false });
    return true;
  }
  rect(slide, x, y, w, h, NAVY2, { rectRadius: radius, line: { color: BRAND_DK, width: 1, dashType: "dash" } });
  const d = Math.min(0.5, h * 0.3);
  slide.addImage({ data: await icon("FaCamera", SKY), x: x + w / 2 - d / 2, y: y + h / 2 - d / 2 - 0.12 + dy, w: d, h: d });
  T(slide, "현장 사진", { x, y: y + h / 2 + d / 2 - 0.08 + dy, w, h: 0.25, fontSize: 8.5, color: SKY, align: "center" });
  return false;
}


// ───────── 1. 표지 ─────────
function cover() {
  const s = pres.addSlide(); pageNo++;
  s.background = { color: BRAND };
  circle(s, 8.2, -1.6, 6.8, WHITE, { fill: { color: WHITE, transparency: 90 }, line: { color: WHITE, transparency: 100 } });
  circle(s, 10.6, 3.2, 5.0, WHITE, { fill: { color: WHITE, transparency: 86 }, line: { color: WHITE, transparency: 100 } });
  wordmark(s, ML, 0.7, 30, WHITE, NAVY);
  T(s, "SELLER & FOOD TRUCK NETWORK  ·  2026", { x: ML, y: 2.35, w: 9, h: 0.35, fontSize: 12, bold: true, color: ICE, charSpacing: 4 });
  T(s, "셀러·푸드트럭\n네트워크 참고자료", { x: ML, y: 2.8, w: 9, h: 1.9, fontSize: 42, bold: true, color: WHITE, lineSpacingMultiple: 1.15 });
  T(s, "섭외 가능 셀러 카테고리 · 푸드트럭 운영 기준 · 모집 채널 및 공고 예시\n제안서 검토를 위한 참고 자료로, 개별 업체 정보는 협의 후 별도 제공합니다.", { x: ML, y: 4.85, w: 9.5, h: 0.9, fontSize: 15, color: ICE, lineSpacingMultiple: 1.3 });
  T(s, "플릿 유니온  |  flitunion.com  ·  app.flitunion.com", { x: ML, y: H - 0.85, w: 8, h: 0.3, fontSize: 11, color: WHITE, bold: true });
}

// ───────── 2. 네트워크 개요 ─────────
async function overview() {
  const s = base("01  NETWORK OVERVIEW", "네트워크 개요", "플릿 유니온의 셀러·푸드트럭 섭외는 세 가지 채널을 기반으로 이루어집니다.");
  const ch = [
    ["FaMobileAlt", "플릿(Flit) 셀러 플랫폼", "app.flitunion.com", "전국 플리마켓·푸드트럭 모집 공고를 한곳에 모은 셀러용 플랫폼입니다. 셀러의 참가 이력과 매출 기록이 축적되어 검증된 셀러를 선발하는 근거가 됩니다."],
    ["FaComments", "카카오 오픈채팅 셀러·푸드트럭 커뮤니티", "셀러방 · 푸드트럭방 2개 운영", "행사 공고를 즉시 공유하고 참가 의사를 확인하는 실시간 채널입니다. 급한 섭외나 대체 셀러 확보에 활용합니다."],
    ["FaDatabase", "플릿 유니온 자체 섭외 DB", "운영 행사 참가 이력 기반", "직접 운영한 행사에 참가한 셀러·푸드트럭의 품목, 운영 품질, 재참가 의사를 관리합니다. 행사 콘셉트에 맞는 후보를 우선 추천합니다."],
  ];
  const lw = 6.3, cy = 2.55, rh = 1.35;
  for (let i = 0; i < ch.length; i++) {
    const y = cy + i * (rh + 0.12);
    rect(s, ML, y, lw, rh, WHITE);
    await iconCircle(s, ML + 0.3, y + 0.3, 0.55, ch[i][0]);
    T(s, ch[i][1], { x: ML + 1.05, y: y + 0.25, w: lw - 1.3, h: 0.3, fontSize: 12.5, bold: true, color: INK });
    T(s, ch[i][2], { x: ML + 1.05, y: y + 0.55, w: lw - 1.3, h: 0.25, fontSize: 9.5, color: BRAND, bold: true });
    T(s, ch[i][3], { x: ML + 0.3, y: y + 0.85, w: lw - 0.6, h: 0.5, fontSize: 9.5, color: GRAY, lineSpacingMultiple: 1.2 });
  }
  const stats = [
    ["500+", "Flit 셀러 DB", "리뷰·참가 이력 보유"],
    ["100+", "푸드트럭 DB", "위생·허가 확인"],
    ["127", "플랫폼 모집 공고", "누적 게시 건수"],
    ["62", "현재 모집 중", "플랫폼 OPEN 공고"],
    ["47", "등록 주최사", "지자체·대학·상업시설"],
    ["445", "등록 행사", "축제·플리마켓·푸드트럭"],
  ];
  const gx = ML + lw + 0.35, gw = CW - lw - 0.35, tw = (gw - 0.4) / 3, th = (rh * 3 + 0.24 - 0.2) / 2;
  stats.forEach((st, i) => {
    const x = gx + (i % 3) * (tw + 0.2), y = cy + Math.floor(i / 3) * (th + 0.2);
    rect(s, x, y, tw, th, i < 2 ? BRAND : NAVY2, i < 2 ? {} : { line: { color: BRAND_DK, width: 1 } });
    T(s, st[0], { x: x + 0.2, y: y + 0.3, w: tw - 0.4, h: 0.7, fontSize: 28, bold: true, color: WHITE, fontFace: "Arial Black" });
    T(s, st[1], { x: x + 0.2, y: y + 1.05, w: tw - 0.4, h: 0.3, fontSize: 11, bold: true, color: WHITE });
    T(s, st[2], { x: x + 0.2, y: y + 1.35, w: tw - 0.4, h: 0.3, fontSize: 9, color: i < 2 ? ICE : MUTED });
  });
  T(s, "* 플랫폼 수치는 2026년 9월 기준 app.flitunion.com 등록 데이터입니다.", { x: gx, y: cy + th * 2 + 0.28, w: gw, h: 0.25, fontSize: 8.5, color: MUTED });
  return s;
}

// ───────── 3. 모집 채널 (스크린샷) ─────────
async function channels() {
  const s = base("02  RECRUITMENT CHANNELS", "모집 채널 안내", "아래 페이지에서 현재 게시 중인 모집 공고와 셀러 지원 흐름을 직접 확인하실 수 있습니다.");
  const shots = [
    ["home", "플릿 홈", "app.flitunion.com", "행사 캘린더 · 모집 중 공고 피드"],
    ["search", "행사 찾기", "app.flitunion.com/search", "지역·일정·카테고리·참가비 필터"],
    ["flea", "플리마켓 셀러 모집", "app.flitunion.com/recruit/\nflea-market-seller-recruit", "플리마켓 공고 모음 랜딩"],
    ["foodtruck", "푸드트럭 섭외", "app.flitunion.com/recruit/\nfoodtruck-booking", "푸드트럭 공고 모음 랜딩"],
  ];
  const n = 4, gap = 0.3, cw = (CW - gap * (n - 1)) / n, cy = 2.4, ph = 2.7;
  for (let i = 0; i < n; i++) {
    const [key, title, url, desc] = shots[i];
    const x = ML + i * (cw + gap);
    const pw = ph * 430 / 900;
    const px = x + (cw - pw) / 2;
    rect(s, px - 0.06, cy - 0.06, pw + 0.12, ph + 0.12, WHITE, { rectRadius: 0.18 });
    s.addImage({ path: path.join(__dirname, "seller-network-shots", key + ".png"), x: px, y: cy, w: pw, h: ph, sizing: { type: "cover", w: pw, h: ph } });
    T(s, title, { x, y: cy + ph + 0.2, w: cw, h: 0.28, fontSize: 12, bold: true, color: WHITE, align: "center" });
    T(s, url, { x, y: cy + ph + 0.48, w: cw, h: 0.4, fontSize: 8.5, color: SKY, align: "center", lineSpacingMultiple: 1.1 });
    T(s, desc, { x, y: cy + ph + 0.9, w: cw, h: 0.24, fontSize: 9, color: ICE, align: "center" });
  }
  const oy = 6.35;
  rect(s, ML, oy, CW, 0.5, NAVY2, { line: { color: BRAND_DK, width: 1 } });
  T(s, [
    { text: "카카오 오픈채팅  ", options: { bold: true, color: SKY } },
    { text: "셀러 커뮤니티  open.kakao.com/o/gCXuIrGi", options: { color: WHITE } },
    { text: "     ·     ", options: { color: MUTED } },
    { text: "푸드트럭 커뮤니티  open.kakao.com/o/gNgYkBGi", options: { color: WHITE } },
  ], { x: ML + 0.3, y: oy, w: CW - 0.6, h: 0.5, fontSize: 10.5, valign: "middle" });
  return s;
}

// ───────── 4. 모집 공고 예시 ─────────
function recruits() {
  const s = base("03  OPEN RECRUITMENTS", "플랫폼 모집 공고 예시", "현재 플릿 플랫폼에 게시된 모집 중 공고 일부입니다. 플릿 셀러가 실제로 지원하는 행사의 규모와 조건을 확인하실 수 있습니다.");
  const hdr = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: BRAND_DK }, align: "center", valign: "middle", fontSize: 10.5 } });
  const c = (t, o = {}) => ({ text: t, options: Object.assign({ color: INK, fill: { color: WHITE }, valign: "middle", fontSize: 9.5 }, o) });
  const rows = [
    [hdr("공고"), hdr("지역"), hdr("일정"), hdr("참가비"), hdr("규모 · 모집 품목")],
    [c("여의도 신영증권 1층 야외광장 브랜드 모집", { bold: true }), c("서울", { align: "center" }), c("11.11 ~ 11.13", { align: "center" }), c("8만원", { align: "center" }), c("40팀+ · 수공예·패션·리빙·친환경·반려동물 상품")],
    [c("성수 서울숲 언더스탠드에비뉴 플리마켓", { bold: true }), c("서울", { align: "center" }), c("10.30 ~ 11.1", { align: "center" }), c("25만원", { align: "center" }), c("카테고리 제한 없음 (즉석판매 식품 제외)")],
    [c("동탄 카림애비뉴1차 하반기 플리마켓", { bold: true }), c("경기", { align: "center" }), c("10.30 ~ 11.1", { align: "center" }), c("15만원", { align: "center" }), c("60팀 · 체험·밀키트·주류 가능")],
    [c("하남미사 파라곤스퀘어 오즈광장 플리마켓", { bold: true }), c("경기", { align: "center" }), c("10.9 ~ 10.11", { align: "center" }), c("24만원", { align: "center" }), c("50팀 · 품목 제한 없음")],
    [c("강남생활문화축제 「강남생활문화마켓」", { bold: true }), c("서울", { align: "center" }), c("10.17", { align: "center" }), c("무료", { align: "center" }), c("10팀 · 전시·체험·직접 제작 작품 판매")],
    [c("인천 연수 능허대축제 플리마켓", { bold: true }), c("인천", { align: "center" }), c("10.9 ~ 10.10", { align: "center" }), c("15만원", { align: "center" }), c("15팀 · 판매+체험 가능, 즉석조리 불가")],
    [c("아주대학교 가을축제 플리마켓", { bold: true }), c("경기", { align: "center" }), c("10.7 ~ 10.8", { align: "center" }), c("20만원", { align: "center" }), c("약 25팀 · 조리음식 불가")],
    [c("호서대학교 아산캠퍼스 가을축제 플리마켓", { bold: true }), c("충남", { align: "center" }), c("10.8", { align: "center" }), c("8만원", { align: "center" }), c("15팀 · 즉석조리식품 외 가능")],
    [c("충남 골프장 행사 푸드트럭 10대 모집", { bold: true }), c("충남", { align: "center" }), c("10.31", { align: "center" }), c("30만원 + 18%", { align: "center" }), c("10대 · 1만 명 예상")],
    [c("대구 대단지아파트 뮤직페스티벌 푸드트럭 상시", { bold: true }), c("대구", { align: "center" }), c("9 ~ 12월 · 25회", { align: "center" }), c("수수료 10~20%", { align: "center" }), c("불초밥·피자·탕수육·팟타이")],
  ];
  const colW = [4.2, 0.9, 1.6, 1.5, CW - 4.2 - 0.9 - 1.6 - 1.5];
  s.addTable(rows, { x: ML, y: 2.55, w: CW, colW, rowH: 0.36, fontFace: FONT, border: { type: "solid", color: "CBD5E1", pt: 0.75 }, margin: [3, 8, 3, 8] });
  T(s, "* 2026년 9월 기준 플랫폼 게시 공고. 참가비는 공고 기준 대표 금액이며 VAT·수수료 조건은 공고별로 상이합니다. 전체 목록: app.flitunion.com/search", { x: ML, y: 6.6, w: CW, h: 0.3, fontSize: 8.5, color: MUTED });
  return s;
}

// ───────── 5. 셀러 카테고리 & 예시 ─────────
async function sellers() {
  const s = base("04  SELLER CATEGORIES", "섭외 가능 셀러 카테고리 및 예시", "플릿 유니온 행사에 참가해 온 셀러 카테고리입니다. 행사 콘셉트에 맞춰 카테고리별 후보를 구성해 제안드립니다.");
  const cats = [
    ["seller-craft", "FaGem", "핸드메이드 · 공예", "가죽공예, 은반지·주얼리, 도자기·소품", "예시  제이제이 (가죽공예·핸드메이드)"],
    ["seller-art", "FaPaintBrush", "아트 · 체험", "캐리커처, 3D 피규어, 타투 스티커, 원데이 체험", "예시  3d pro. (3D 피규어)"],
    ["seller-pet", "FaPaw", "반려동물", "반려동물 수제간식, 반려용품", "예시  수제간식 셀러 (플랫폼 참가 기록 보유)"],
    ["seller-book", "FaBookOpen", "도서 · 교육 · 키즈", "도서 나눔, 교육 체험, 키즈 놀이", "예시  웅진북클럽 (도서·무료 도서 나눔)"],
    ["seller-fashion", "FaTshirt", "패션 · 리빙 · 빈티지", "의류·잡화, 빈티지, 리빙 소품, 친환경 상품", "학생 창업팀 · 지역 공예 셀러 우선 배정 가능"],
    ["seller-food", "FaCookieBite", "디저트 · 먹거리", "수제 디저트, 완제품 F&B, 지역 특산물", "즉석조리 품목은 푸드트럭 존으로 분리 운영"],
  ];
  const cols = 3, gap = 0.25, cw = (CW - gap * (cols - 1)) / cols, ch = 1.9, cy = 2.5, pw = 1.45;
  for (let i = 0; i < cats.length; i++) {
    const [id, ic, title, items, ex] = cats[i];
    const x = ML + (i % cols) * (cw + gap), y = cy + Math.floor(i / cols) * (ch + 0.22);
    rect(s, x, y, cw, ch, WHITE);
    await photoBox(s, id, x + 0.2, y + 0.2, pw, ch - 0.4, { radius: 0.08 });
    await iconCircle(s, x + pw + 0.4, y + 0.22, 0.42, ic);
    T(s, title, { x: x + pw + 0.9, y: y + 0.22, w: cw - pw - 1.05, h: 0.42, fontSize: 12, bold: true, color: INK, valign: "middle" });
    T(s, items, { x: x + pw + 0.4, y: y + 0.75, w: cw - pw - 0.6, h: 0.55, fontSize: 9.5, color: GRAY, lineSpacingMultiple: 1.2 });
    rect(s, x + pw + 0.4, y + ch - 0.62, cw - pw - 0.6, 0.42, TINT);
    T(s, ex, { x: x + pw + 0.5, y: y + ch - 0.62, w: cw - pw - 0.8, h: 0.42, fontSize: 8.5, color: BRAND, bold: true, valign: "middle" });
  }
  T(s, "* 예시 업체명은 플릿 플랫폼에 브랜드를 등록한 셀러 중 일부이며, 개별 연락처·상세 프로필은 섭외 확정 단계에서 제공합니다.", { x: ML, y: 6.62, w: CW, h: 0.25, fontSize: 8.5, color: MUTED });
  return s;
}

// ───────── 6. 푸드트럭 ─────────
async function foodtrucks() {
  const s = base("05  FOOD TRUCKS", "푸드트럭 섭외", "100대 이상의 검증된 푸드트럭 DB에서 행사 콘셉트와 공간 조건에 맞는 차량을 매칭합니다.");
  const lw = 4.1, cy = 2.55, lh = 4.15;
  rect(s, ML, cy, lw, lh, WHITE);
  await photoBox(s, "foodtruck-1", ML + 0.25, cy + 0.25, lw - 0.5, 1.7, { radius: 0.08 });
  T(s, "메뉴 카테고리", { x: ML + 0.25, y: cy + 2.1, w: lw - 0.5, h: 0.3, fontSize: 11.5, bold: true, color: INK });
  const menus = ["한식 (불초밥·닭강정·떡볶이)", "양식 (버거·피자·스테이크)", "일식·아시안 (타코야키·팟타이)", "디저트 (츄러스·아이스크림)", "음료·커피 (커피차·에이드)", "간식 (핫도그·탕후루·붕어빵)"];
  menus.forEach((m, i) => {
    const x = ML + 0.25 + (i % 2) * ((lw - 0.5) / 2), y = cy + 2.45 + Math.floor(i / 2) * 0.5;
    rect(s, x, y, (lw - 0.5) / 2 - 0.08, 0.42, TINT);
    T(s, m, { x: x + 0.1, y, w: (lw - 0.5) / 2 - 0.28, h: 0.42, fontSize: 8.5, color: INK, valign: "middle" });
  });
  const mx = ML + lw + 0.3, mw = 3.6;
  rect(s, mx, cy, mw, lh, NAVY2, { line: { color: BRAND_DK, width: 1 } });
  T(s, "섭외 · 운영 기준", { x: mx + 0.3, y: cy + 0.3, w: mw - 0.6, h: 0.3, fontSize: 12, bold: true, color: WHITE });
  const rules = [
    ["FaClipboardCheck", "영업허가증 · 위생 점검 이력 사전 확인"],
    ["FaPlug", "전기 용량 · 용수 여건 사전 조율"],
    ["FaTruck", "행사별 예비 차량 1~2대 대기, 불참 시 즉시 대체"],
    ["FaUtensils", "중복 없는 메뉴 구성으로 방문객 만족도 확보"],
    ["FaHandshake", "1대부터 단독 섭외 가능, 10대 이상 단가 할인"],
    ["FaFileInvoiceDollar", "행사 종료 후 차량별 매출 · 정산 처리"],
  ];
  for (let i = 0; i < rules.length; i++) {
    const y = cy + 0.8 + i * 0.55;
    await iconCircle(s, mx + 0.3, y, 0.38, rules[i][0]);
    T(s, rules[i][1], { x: mx + 0.8, y, w: mw - 1.05, h: 0.38, fontSize: 9.5, color: ICE, valign: "middle" });
  }
  const rx = mx + mw + 0.3, rw = W - ML - rx;
  rect(s, rx, cy, rw, lh, WHITE);
  T(s, "플랫폼 푸드트럭 모집 공고 예시", { x: rx + 0.3, y: cy + 0.3, w: rw - 0.6, h: 0.3, fontSize: 11.5, bold: true, color: INK });
  const ex = [
    ["충남 골프장 행사 푸드트럭 10대", "10.31 · 1만 명 예상 · 시설사용료 30만원 + 18%"],
    ["김포 호수공원 지자체 행사", "10.10 · 커피·음료 제외 품목 모집"],
    ["서울 옥수동 아파트 축제 15대", "9.12 ~ 13 · 확정 외 품목 모집"],
    ["양주 덕계 ART 축제 10대", "9.12 ~ 13 · 2일 40만원 + 수수료 5%"],
    ["대구 대단지아파트 뮤직페스티벌", "9 ~ 12월 25회 상시 · 수수료 10~20%"],
    ["수원제일교회 창립 72주년", "9.12 · 무료 모집 · 커피/식사/간식"],
  ];
  ex.forEach((e, i) => {
    const y = cy + 0.75 + i * 0.55;
    rect(s, rx + 0.3, y, rw - 0.6, 0.47, TINT);
    T(s, e[0], { x: rx + 0.42, y: y + 0.03, w: rw - 0.85, h: 0.22, fontSize: 9, bold: true, color: INK });
    T(s, e[1], { x: rx + 0.42, y: y + 0.24, w: rw - 0.85, h: 0.2, fontSize: 8, color: GRAY });
  });
  return s;
}

// ───────── 7. 섭외 절차 & 문의 ─────────
async function processContact() {
  const s = base("06  PROCESS & CONTACT", "섭외 절차 및 문의", "행사 요건을 보내주시면 후보 리스트를 구성해 제안드립니다.");
  const steps = [
    ["FaClipboardList", "행사 요건 접수", "일시·장소·규모·전기/용수 조건·희망 품목"],
    ["FaListUl", "후보 리스트 제안", "카테고리별 셀러·푸드트럭 후보와 조건 정리"],
    ["FaCheckCircle", "확정 · 계약", "의뢰인 확정 후 셀러·푸드트럭 개별 계약"],
    ["FaMapMarkedAlt", "현장 배치 · 운영", "부스 배치, 입·퇴장 관리, 전담 매니저 상주"],
    ["FaFileInvoiceDollar", "정산 · 보고", "종료 후 48시간 이내 정산서·결과 보고서"],
  ];
  const n = 5, gap = 0.25, cw = (CW - gap * (n - 1)) / n, cy = 2.65;
  s.addShape(pres.shapes.LINE, { x: ML + cw / 2, y: cy + 0.4, w: CW - cw, h: 0, line: { color: BRAND_DK, width: 1.5, dashType: "dash" } });
  for (let i = 0; i < n; i++) {
    const x = ML + i * (cw + gap);
    await iconCircle(s, x + cw / 2 - 0.4, cy, 0.8, steps[i][0]);
    T(s, `STEP ${i + 1}`, { x, y: cy + 0.95, w: cw, h: 0.25, fontSize: 9, bold: true, color: SKY, align: "center", charSpacing: 2 });
    T(s, steps[i][1], { x, y: cy + 1.2, w: cw, h: 0.35, fontSize: 12.5, bold: true, color: WHITE, align: "center" });
    T(s, steps[i][2], { x: x + 0.1, y: cy + 1.55, w: cw - 0.2, h: 0.7, fontSize: 9.5, color: ICE, align: "center", lineSpacingMultiple: 1.25 });
  }
  const cy2 = 5.15, ch = 1.75;
  rect(s, ML, cy2, CW, ch, WHITE);
  T(s, "문의", { x: ML + 0.4, y: cy2 + 0.3, w: 2, h: 0.3, fontSize: 13, bold: true, color: INK });
  const rows = [["FaGlobe", "홈페이지", "www.flitunion.com"], ["FaEnvelope", "이메일", "hello@flitunion.com"], ["FaPhone", "전화", "010-8018-8492"], ["FaComments", "카카오 오픈채팅", "open.kakao.com/o/sZ5YZ4ni"]];
  const cw2 = (CW - 0.8) / 4;
  for (let i = 0; i < rows.length; i++) {
    const x = ML + 0.4 + i * cw2, y = cy2 + 0.75;
    await iconCircle(s, x, y, 0.5, rows[i][0], TINT, BRAND);
    T(s, rows[i][1], { x: x + 0.65, y: y - 0.02, w: cw2 - 0.8, h: 0.25, fontSize: 9, color: MUTED });
    T(s, rows[i][2], { x: x + 0.65, y: y + 0.23, w: cw2 - 0.7, h: 0.3, fontSize: 10, bold: true, color: INK });
  }
  return s;
}

(async () => {
  cover();
  await overview();
  await channels();
  recruits();
  await sellers();
  await foodtrucks();
  await processContact();
  const out = process.env.OUT || "flitunion-seller-network.pptx";
  await pres.writeFile({ fileName: out });
  console.log("wrote", out, "slides:", pageNo);
})().catch((e) => { console.error(e); process.exit(1); });
