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
pres.title = "플릿 유니온 회사소개서";

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
  T(s, "플릿 유니온 회사소개서", { x: ML, y: H - 0.5, w: 4, h: 0.25, fontSize: 9, color: MUTED });
  T(s, String(pageNo).padStart(2, "0"), { x: W - ML - 1, y: H - 0.5, w: 1, h: 0.25, fontSize: 9, color: MUTED, align: "right" });
  return s;
}

// ───────── 1. 표지 ─────────
async function cover() {
  const s = pres.addSlide();
  pageNo++;
  s.background = { color: BRAND };
  circle(s, 8.2, -1.6, 6.8, WHITE, { fill: { color: WHITE, transparency: 90 }, line: { color: WHITE, transparency: 100 } });
  circle(s, 10.6, 3.2, 5.0, WHITE, { fill: { color: WHITE, transparency: 86 }, line: { color: WHITE, transparency: 100 } });
  circle(s, 7.4, 4.9, 2.6, WHITE, { fill: { color: WHITE, transparency: 92 }, line: { color: WHITE, transparency: 100 } });
  wordmark(s, ML, 0.7, 30, WHITE, NAVY);
  T(s, "COMPANY PROFILE  ·  2026", { x: ML, y: 2.35, w: 8, h: 0.35, fontSize: 12, bold: true, color: ICE, charSpacing: 4 });
  T(s, "공간을 마켓으로,\n행사를 경험으로 만듭니다.", { x: ML, y: 2.8, w: 9, h: 1.9, fontSize: 42, bold: true, color: WHITE, lineSpacingMultiple: 1.15 });
  T(s, "플리마켓 · 야시장 · 푸드트럭 · 행사 장비 렌탈\n검증된 셀러 네트워크 기반의 행사 운영 원스톱 대행 전문 기업", { x: ML, y: 4.85, w: 9, h: 0.9, fontSize: 16, color: ICE, lineSpacingMultiple: 1.3 });
  T(s, "플릿 유니온  |  flitunion.com", { x: ML, y: H - 0.85, w: 6, h: 0.3, fontSize: 11, color: WHITE, bold: true });
}

// ───────── 2. 목차 ─────────
function contents() {
  const s = base("CONTENTS", "목차", "플릿 유니온 회사소개서는 다음과 같은 순서로 구성되어 있습니다.");
  const items = [
    ["01", "회사 개요", "Company Overview"],
    ["02", "비전과 미션", "Vision & Mission"],
    ["03", "고객의 과제와 플릿의 해법", "Problem & Solution"],
    ["04", "사업 영역", "Business Areas"],
    ["05", "서비스 상세", "Service Details"],
    ["06", "플릿의 차별점", "Why Flit Union"],
    ["07", "운영 프로세스", "Process"],
    ["08", "주요 실적 및 사례", "Portfolio & Case Study"],
    ["09", "협업 대상과 계약 안내", "Partnership Guide"],
    ["10", "문의", "Contact"],
  ];
  const colW = 5.6, rowH = 0.82, y0 = 2.65;
  items.forEach((it, i) => {
    const col = i < 5 ? 0 : 1;
    const row = i % 5;
    const x = ML + col * (colW + 0.6), y = y0 + row * rowH;
    T(s, it[0], { x, y, w: 0.8, h: 0.5, fontSize: 24, bold: true, color: BRAND, fontFace: "Arial Black", valign: "middle" });
    T(s, it[1], { x: x + 0.95, y, w: colW - 1, h: 0.3, fontSize: 15, bold: true, color: WHITE });
    T(s, it[2], { x: x + 0.95, y: y + 0.3, w: colW - 1, h: 0.25, fontSize: 9.5, color: MUTED });
  });
  return s;
}

// ───────── 3. 회사 개요 ─────────
async function overview() {
  const s = base("01  COMPANY OVERVIEW", "회사 개요", "플릿 유니온은 공간 소유자와 행사 주최자를 위한 마켓 운영 전문 기업입니다.");
  // left: white card with key-value
  const cx = ML, cy = 2.55, cw = 5.6, ch = 4.2;
  rect(s, cx, cy, cw, ch, WHITE);
  T(s, "기업 정보", { x: cx + 0.4, y: cy + 0.28, w: 3, h: 0.35, fontSize: 15, bold: true, color: INK });
  const rows = [
    ["회사명", "플릿 유니온 (Flit Union)"],
    ["대표자", "이아로"],
    ["설립일", "2024년 8월"],
    ["사업자등록번호", "655-26-02147"],
    ["소재지", "서울특별시 도봉구"],
    ["사업 영역", "마켓 운영 대행 · 푸드트럭 섭외 · 장비 렌탈"],
    ["운영 플랫폼", "플릿(Flit) 셀러 플랫폼 · app.flitunion.com"],
    ["서비스 지역", "전국 (수도권 직영, 지방 현지 파트너 운영)"],
    ["홈페이지", "www.flitunion.com"],
    ["이메일", "hello@flitunion.com"],
  ];
  let ry = cy + 0.72;
  rows.forEach((r) => {
    const h = 0.31;
    T(s, r[0], { x: cx + 0.4, y: ry, w: 1.4, h, fontSize: 10.5, bold: true, color: BRAND });
    T(s, r[1], { x: cx + 1.8, y: ry, w: cw - 2.1, h, fontSize: 10.5, color: INK });
    ry += h + 0.04;
  });
  // right: stat tiles
  const stats = [
    ["50+", "운영 행사", "대학·아파트·축제·카페"],
    ["500+", "Flit 셀러 DB", "리뷰·참가 이력 보유 셀러"],
    ["100+", "푸드트럭 DB", "위생·허가 검증 완료"],
    ["98%", "재의뢰율", "운영 대행 고객 기준"],
  ];
  const gx = ML + cw + 0.5, gy = cy, tw = (CW - cw - 0.5 - 0.3) / 2, th = (ch - 0.3) / 2;
  stats.forEach((st, i) => {
    const x = gx + (i % 2) * (tw + 0.3), y = gy + Math.floor(i / 2) * (th + 0.3);
    rect(s, x, y, tw, th, i === 0 ? BRAND : NAVY2, i === 0 ? {} : { line: { color: BRAND_DK, width: 1 } });
    T(s, st[0], { x: x + 0.35, y: y + 0.35, w: tw - 0.7, h: 0.8, fontSize: 40, bold: true, color: WHITE, fontFace: "Arial Black" });
    T(s, st[1], { x: x + 0.35, y: y + 1.2, w: tw - 0.7, h: 0.3, fontSize: 13, bold: true, color: WHITE });
    T(s, st[2], { x: x + 0.35, y: y + 1.5, w: tw - 0.7, h: 0.3, fontSize: 10, color: i === 0 ? ICE : MUTED });
  });
  return s;
}

// ───────── 4. 비전·미션 ─────────
async function vision() {
  const s = base("02  VISION & MISSION", "비전과 미션", "플릿 유니온이 지향하는 가치입니다.");
  rect(s, ML, 2.55, CW, 1.55, NAVY2, { line: { color: BRAND_DK, width: 1 } });
  T(s, "VISION", { x: ML + 0.45, y: 2.75, w: 2, h: 0.3, fontSize: 10, bold: true, color: SKY, charSpacing: 3 });
  T(s, "어떤 공간이든 사람이 모이는 마켓이 될 수 있습니다.", { x: ML + 0.45, y: 3.05, w: CW - 0.9, h: 0.5, fontSize: 22, bold: true, color: WHITE });
  T(s, "유휴 공간과 행사 현장에 검증된 셀러와 운영 시스템을 연결하여, 공간 소유자에게는 새로운 가치를, 셀러에게는 판매의 기회를, 방문객에게는 기억에 남는 경험을 제공합니다.", { x: ML + 0.45, y: 3.55, w: CW - 0.9, h: 0.5, fontSize: 11.5, color: ICE });
  const vals = [
    ["FaUserCheck", "검증 (Verified)", "플릿 플랫폼의 리뷰 점수와 참가 이력을 기반으로 셀러를 선발하여 불참·품질 미달 리스크를 최소화합니다."],
    ["FaLayerGroup", "원스톱 (One-Stop)", "공간 분석, 셀러 모집, 장비 렌탈, 현장 운영, 정산까지 전 과정을 하나의 창구에서 책임집니다."],
    ["FaFileInvoiceDollar", "투명 (Transparent)", "방문자 수, 셀러별 매출, 참가비 정산 내역을 담은 결과 보고서를 행사 종료 후 48시간 이내에 제공합니다."],
  ];
  const cw = (CW - 0.6) / 3, cy = 4.4, ch = 2.35;
  for (let i = 0; i < vals.length; i++) {
    const x = ML + i * (cw + 0.3);
    rect(s, x, cy, cw, ch, WHITE);
    await iconCircle(s, x + 0.35, cy + 0.35, 0.6, vals[i][0]);
    T(s, vals[i][1], { x: x + 0.35, y: cy + 1.1, w: cw - 0.7, h: 0.35, fontSize: 14, bold: true, color: INK });
    T(s, vals[i][2], { x: x + 0.35, y: cy + 1.45, w: cw - 0.7, h: 0.8, fontSize: 10.5, color: GRAY, lineSpacingMultiple: 1.25 });
  }
  return s;
}

// ───────── 5. 고객의 과제 ─────────
async function problem() {
  const s = base("03  PROBLEM & SOLUTION", "고객의 과제와 플릿의 해법", "공간은 있으나 운영이 어려운 고객의 고민을 플릿 유니온이 해결합니다.");
  const items = [
    ["FaBuilding", "유휴 공간", "수익이 발생하지 않는 유휴 공간을 어떻게 활용할 수 있습니까?", "빈 주차장, 낮 시간 한산한 카페 홀, 비어 있는 건물 로비는 정기 플리마켓의 무대가 될 수 있습니다. 플릿 유니온이 유동 인구를 분석하고 최적의 마켓 모델을 설계합니다."],
    ["FaGraduationCap", "대학 축제", "성공적인 대학 축제 플리마켓의 조건은 무엇입니까?", "학생이 원하는 콘셉트, 검증된 셀러 구성, 안전한 현장 동선 설계가 핵심입니다. 플릿 리뷰 데이터를 기반으로 평점 높은 셀러를 우선 선발하여 행사 만족도를 높입니다."],
    ["FaCoffee", "카페·상업 공간", "매출을 높이는 이벤트, 직접 기획하기에는 부담이 크지 않습니까?", "셀러 모집, SNS 홍보, 당일 운영, 정산까지 모든 과정을 플릿 유니온이 대행합니다. 의뢰인은 본업에만 집중하시면 됩니다."],
  ];
  const cw = (CW - 0.6) / 3, cy = 2.6, ch = 4.15;
  for (let i = 0; i < items.length; i++) {
    const x = ML + i * (cw + 0.3);
    rect(s, x, cy, cw, ch, WHITE);
    await iconCircle(s, x + 0.35, cy + 0.35, 0.6, items[i][0]);
    T(s, items[i][1], { x: x + 1.1, y: cy + 0.45, w: cw - 1.4, h: 0.4, fontSize: 11, bold: true, color: BRAND, valign: "middle" });
    T(s, items[i][2], { x: x + 0.35, y: cy + 1.15, w: cw - 0.7, h: 0.85, fontSize: 14, bold: true, color: INK, lineSpacingMultiple: 1.2 });
    rect(s, x + 0.35, cy + 2.1, cw - 0.7, 1.75, TINT);
    T(s, "플릿의 해법", { x: x + 0.55, y: cy + 2.25, w: 2, h: 0.25, fontSize: 9.5, bold: true, color: BRAND });
    T(s, items[i][3], { x: x + 0.55, y: cy + 2.5, w: cw - 1.1, h: 1.3, fontSize: 10.5, color: GRAY, lineSpacingMultiple: 1.25 });
  }
  return s;
}

// ───────── 6. 사업 영역 ─────────
async function business() {
  const s = base("04  BUSINESS AREAS", "사업 영역", "행사에 필요한 네 가지 영역을 개별 또는 패키지로 제공합니다.");
  const items = [
    ["FaStore", "플리마켓 운영 대행", "핵심 서비스", "유휴 공간, 대학 축제, 카페 홀 등 어떤 공간이든 플리마켓으로 전환합니다. 공간 분석부터 셀러 모집, 현장 운영, 정산까지 원스톱으로 대행합니다.", "50+ 운영 행사"],
    ["FaMoon", "야시장 & 푸드 마켓 운영", "야간 행사 특화", "야간 조명, 공연, 푸드트럭, 핸드메이드 셀러가 어우러진 복합 야시장을 기획하며, 야간 안전 관리 체계로 흥행과 안전을 함께 확보합니다.", "일 평균 3,500+ 방문"],
    ["FaTruck", "푸드트럭 섭외 & 운영", "푸드트럭 전문 연결", "한식, 디저트, 글로벌 푸드까지 100대 이상의 검증된 푸드트럭 DB를 기반으로 행사 콘셉트에 맞는 푸드트럭을 매칭하고 현장 배치까지 관리합니다.", "100+ 푸드트럭 DB"],
    ["FaBoxOpen", "행사 물품 렌탈", "원스톱 장비 지원", "부스 텐트, 테이블·의자, 조명, 배너·간판, 전기 설비까지 행사에 필요한 모든 장비를 설치·철거 인력과 함께 제공합니다.", "500+ 보유 장비"],
  ];
  const cw = (CW - 0.9) / 4, cy = 2.6, ch = 4.15;
  for (let i = 0; i < items.length; i++) {
    const x = ML + i * (cw + 0.3);
    rect(s, x, cy, cw, ch, WHITE);
    await iconCircle(s, x + 0.3, cy + 0.3, 0.6, items[i][0]);
    T(s, items[i][2], { x: x + 0.3, y: cy + 1.05, w: cw - 0.6, h: 0.25, fontSize: 9.5, bold: true, color: BRAND });
    T(s, items[i][1], { x: x + 0.3, y: cy + 1.3, w: cw - 0.6, h: 0.65, fontSize: 14, bold: true, color: INK, lineSpacingMultiple: 1.15 });
    T(s, items[i][3], { x: x + 0.3, y: cy + 1.95, w: cw - 0.6, h: 1.6, fontSize: 10, color: GRAY, lineSpacingMultiple: 1.25 });
    rect(s, x + 0.3, cy + ch - 0.7, cw - 0.6, 0.42, TINT);
    T(s, items[i][4], { x: x + 0.45, y: cy + ch - 0.7, w: cw - 0.9, h: 0.42, fontSize: 10.5, bold: true, color: BRAND, valign: "middle" });
  }
  return s;
}

// ───────── 7~10. 서비스 상세 ─────────
async function serviceDetail(no, iconName, title, subtitle, hero, stats, features) {
  const s = base(`05  SERVICE DETAIL  ·  ${no}`, title, subtitle);
  // left summary card
  const lx = ML, ly = 2.55, lw = 4.1, lh = 4.2;
  rect(s, lx, ly, lw, lh, WHITE);
  await iconCircle(s, lx + 0.35, ly + 0.35, 0.65, iconName);
  T(s, hero, { x: lx + 0.35, y: ly + 1.2, w: lw - 0.7, h: 1.6, fontSize: 11, color: GRAY, lineSpacingMultiple: 1.3 });
  const sw = (lw - 0.7 - 0.2) / 3;
  stats.forEach((st, i) => {
    const x = lx + 0.35 + i * (sw + 0.1), y = ly + lh - 1.25;
    rect(s, x, y, sw, 0.95, TINT);
    T(s, st.value, { x: x + 0.05, y: y + 0.12, w: sw - 0.1, h: 0.45, fontSize: 15, bold: true, color: BRAND, align: "center", fontFace: "Arial Black" });
    T(s, st.label, { x: x + 0.05, y: y + 0.56, w: sw - 0.1, h: 0.3, fontSize: 8.5, color: GRAY, align: "center" });
  });
  // right feature grid 3x2
  const gx = lx + lw + 0.35, gw = CW - lw - 0.35, cols = 3, rows = 2;
  const fw = (gw - (cols - 1) * 0.2) / cols, fh = (lh - 0.2) / rows;
  features.forEach((f, i) => {
    const x = gx + (i % cols) * (fw + 0.2), y = ly + Math.floor(i / cols) * (fh + 0.2);
    rect(s, x, y, fw, fh, NAVY2, { line: { color: BRAND_DK, width: 1 } });
    T(s, String(i + 1).padStart(2, "0"), { x: x + 0.25, y: y + 0.2, w: 0.6, h: 0.3, fontSize: 10, bold: true, color: SKY, fontFace: "Arial Black" });
    T(s, f.title, { x: x + 0.25, y: y + 0.5, w: fw - 0.5, h: 0.4, fontSize: 12, bold: true, color: WHITE });
    T(s, f.desc, { x: x + 0.25, y: y + 0.92, w: fw - 0.5, h: fh - 1.05, fontSize: 9.5, color: ICE, lineSpacingMultiple: 1.25 });
  });
  return s;
}

// ───────── 11. 차별점 ─────────
async function why() {
  const s = base("06  WHY FLIT UNION", "플릿의 차별점", "직접 운영하는 셀러 플랫폼 '플릿(Flit)'의 데이터가 행사의 품질을 보증합니다.");
  // left card: platform
  const lx = ML, ly = 2.55, lw = 4.3, lh = 4.2;
  rect(s, lx, ly, lw, lh, BRAND);
  await iconCircle(s, lx + 0.35, ly + 0.35, 0.65, "FaMobileAlt", WHITE, BRAND);
  T(s, "플릿(Flit) 셀러 플랫폼", { x: lx + 0.35, y: ly + 1.15, w: lw - 0.7, h: 0.35, fontSize: 16, bold: true, color: WHITE });
  T(s, "app.flitunion.com", { x: lx + 0.35, y: ly + 1.5, w: lw - 0.7, h: 0.3, fontSize: 10.5, color: ICE });
  const pts = ["플리마켓·팝업 셀러가 행사 정보를 찾고 참가 기록을 남기는 플랫폼", "셀러의 리뷰 점수, 참가 이력, 매출 기록이 축적됩니다", "축적된 데이터를 근거로 행사 콘셉트에 맞는 셀러를 선발합니다", "모집 공고가 플랫폼에 게시되어 별도 홍보 비용 없이 셀러가 모집됩니다"];
  T(s, pts.map((p, i) => ({ text: p, options: { bullet: { code: "25A0" }, breakLine: i < pts.length - 1, paraSpaceAfter: 6 } })), { x: lx + 0.35, y: ly + 2.0, w: lw - 0.6, h: 2.1, fontSize: 10.5, color: WHITE, lineSpacingMultiple: 1.2 });
  // right: comparison table
  const tx = lx + lw + 0.35, tw = CW - lw - 0.35;
  const hdr = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: BRAND_DK }, align: "center", valign: "middle", fontSize: 11 } });
  const k = (t) => ({ text: t, options: { bold: true, color: INK, fill: { color: TINT }, valign: "middle", fontSize: 10.5 } });
  const a = (t) => ({ text: t, options: { color: GRAY, fill: { color: WHITE }, valign: "middle", fontSize: 10 } });
  const b = (t) => ({ text: t, options: { color: INK, bold: true, fill: { color: WHITE }, valign: "middle", fontSize: 10 } });
  const rows = [
    [hdr("구분"), hdr("일반 모집 방식"), hdr("플릿 유니온")],
    [k("셀러 검증"), a("SNS 지원자의 실제 품질·성실도를 사전에 확인하기 어렵습니다."), b("리뷰 점수와 참가 이력이 있는 셀러를 데이터 기반으로 선발합니다.")],
    [k("불참 대응"), a("당일 불참 시 대체 셀러·푸드트럭 확보가 어렵습니다."), b("행사별 예비 푸드트럭 1~2대를 대기시켜 즉시 대체 운영합니다.")],
    [k("현장 운영"), a("주최 측 인력이 셀러 관리와 방문객 안내를 병행해야 합니다."), b("전담 현장 매니저가 상주하여 입·퇴장, 안내, 돌발 상황을 책임집니다.")],
    [k("정산·보고"), a("참가비와 매출 집계가 수기로 이루어져 결과 파악이 늦어집니다."), b("행사 종료 후 48시간 이내에 정산서와 결과 보고서를 제공합니다.")],
    [k("홍보"), a("셀러 모집·방문객 유입 홍보에 별도 비용이 발생합니다."), b("플릿 플랫폼과 SNS 채널을 통한 모집·유입 홍보를 기본 제공합니다.")],
  ];
  s.addTable(rows, { x: tx, y: ly, w: tw, colW: [1.3, (tw - 1.3) / 2, (tw - 1.3) / 2], rowH: [0.45, 0.75, 0.75, 0.75, 0.75, 0.75], fontFace: FONT, border: { type: "solid", color: "CBD5E1", pt: 0.75 }, margin: [4, 8, 4, 8] });
  return s;
}

// ───────── 12. 프로세스 ─────────
async function processSlide() {
  const s = base("07  PROCESS", "운영 프로세스", "상담부터 결과 보고까지 다섯 단계로 진행됩니다.");
  const steps = [
    ["FaSearch", "무료 상담 및 공간 분석", "공간 위치, 면적, 유동 인구, 주변 상권을 분석하고 최적의 마켓 콘셉트를 제안합니다."],
    ["FaClipboardCheck", "기획안 확정", "날짜, 규모, 셀러 카테고리 구성, 예상 수익 구조를 포함한 기획안을 확정합니다."],
    ["FaUsers", "셀러 모집 및 심사", "플릿 플랫폼과 자체 채널로 셀러를 모집하고, 리뷰 점수를 기준으로 심사·선발합니다."],
    ["FaTools", "현장 설치 및 운영", "부스 설치, 셀러 배치, 방문자 안내, 안전 관리를 전담 매니저가 책임집니다."],
    ["FaFileAlt", "정산 및 결과 보고", "행사 종료 후 48시간 이내에 정산서와 결과 보고서를 제공합니다."],
  ];
  const n = steps.length, gap = 0.25, cw = (CW - gap * (n - 1)) / n, cy = 2.75, ch = 3.0;
  // connector line
  s.addShape(pres.shapes.LINE, { x: ML + cw / 2, y: cy + 0.45, w: CW - cw, h: 0, line: { color: BRAND_DK, width: 1.5, dashType: "dash" } });
  for (let i = 0; i < n; i++) {
    const x = ML + i * (cw + gap);
    await iconCircle(s, x + cw / 2 - 0.45, cy, 0.9, steps[i][0]);
    T(s, `STEP ${i + 1}`, { x, y: cy + 1.1, w: cw, h: 0.25, fontSize: 9.5, bold: true, color: SKY, align: "center", charSpacing: 2 });
    T(s, steps[i][1], { x, y: cy + 1.38, w: cw, h: 0.4, fontSize: 13, bold: true, color: WHITE, align: "center" });
    T(s, steps[i][2], { x: x + 0.1, y: cy + 1.85, w: cw - 0.2, h: 1.1, fontSize: 10, color: ICE, align: "center", lineSpacingMultiple: 1.25 });
  }
  // bottom notes
  const notes = [
    ["FaClock", "행사일 기준 최소 3주 전 의뢰를 권장합니다."],
    ["FaChartLine", "결과 보고서에는 방문자 수, 셀러별 매출, 정산 내역이 포함됩니다."],
    ["FaCloudRain", "야외 행사는 텐트 렌탈을 포함한 우천 대비 플랜을 사전에 수립합니다."],
  ];
  const nw = (CW - 0.6) / 3, ny = 5.95;
  for (let i = 0; i < notes.length; i++) {
    const x = ML + i * (nw + 0.3);
    rect(s, x, ny, nw, 0.85, WHITE);
    await iconCircle(s, x + 0.2, ny + 0.2, 0.45, notes[i][0]);
    T(s, notes[i][1], { x: x + 0.8, y: ny, w: nw - 0.95, h: 0.85, fontSize: 10.5, color: INK, valign: "middle", lineSpacingMultiple: 1.2 });
  }
  return s;
}

// ───────── 13. 주요 실적 ─────────
const TAGC = { "야시장": "4F46E5", "캠퍼스 마켓": "3182F6", "대형 축제": "E11D48", "민속 축제": "EA580C" };
function portfolio() {
  const s = base("08  PORTFOLIO", "주요 실적", "대학교, 아파트 단지, 대형 축제 등 다양한 공간에서 행사를 운영하였습니다.");
  const items = [
    ["야시장", "강원 원주시", "원주 소재 대학교 야시장 운영", "축제 기간 저녁 시간대 푸드트럭과 플리마켓 셀러를 결합한 복합 야간 마켓을 운영하였습니다."],
    ["캠퍼스 마켓", "대구광역시", "대구 소재 대학교 플리마켓 운영", "학생 창업 셀러와 외부 플릿 인증 셀러를 조합하여 전 과정을 대행하였습니다."],
    ["대형 축제", "서울특별시", "서울 소재 대형 축제 부스 운영", "대규모 인파 동선에 맞춘 부스 배치와 안전 관리 체계를 수립하여 운영하였습니다."],
    ["야시장", "서울특별시", "서울 소재 아파트 야시장 운영", "단지 내 유휴 공간을 활용한 주민 참여형 야시장을 관리사무소와 협업하여 운영하였습니다."],
    ["야시장", "경기 하남시", "하남 소재 아파트 야시장 운영", "가족 단위 방문객을 고려한 키즈 체험·먹거리 콘텐츠로 높은 참여율을 기록하였습니다."],
    ["캠퍼스 마켓", "서울특별시", "서울 소재 대학교 플리마켓 운영", "학생 창업팀 우선 선발과 플릿 셀러 조합으로 품질 높은 캠퍼스 마켓을 구현하였습니다."],
    ["대형 축제", "충청도", "충청 소재 대형 축제 부스 운영", "지역 특산물·공예 셀러와 플릿 셀러를 조합하고 장비 렌탈을 일괄 제공하였습니다."],
    ["민속 축제", "서울특별시", "서울 소재 민속 축제 부스 운영", "전통 공예·먹거리·체험 셀러 중심으로 축제 정체성에 부합하는 부스 존을 연출하였습니다."],
  ];
  const cols = 4, gap = 0.25, cw = (CW - gap * (cols - 1)) / cols, ch = 1.95, cy = 2.6;
  items.forEach((it, i) => {
    const x = ML + (i % cols) * (cw + gap), y = cy + Math.floor(i / cols) * (ch + 0.25);
    rect(s, x, y, cw, ch, WHITE);
    rect(s, x + 0.25, y + 0.25, 1.15, 0.28, TAGC[it[0]], { rectRadius: 0.14 });
    T(s, it[0], { x: x + 0.25, y: y + 0.25, w: 1.15, h: 0.28, fontSize: 8.5, bold: true, color: WHITE, align: "center", valign: "middle" });
    T(s, it[1], { x: x + 1.5, y: y + 0.25, w: cw - 1.7, h: 0.28, fontSize: 9, color: MUTED, valign: "middle", align: "right" });
    T(s, it[2], { x: x + 0.25, y: y + 0.65, w: cw - 0.5, h: 0.35, fontSize: 11.5, bold: true, color: INK });
    T(s, it[3], { x: x + 0.25, y: y + 1.02, w: cw - 0.5, h: 0.85, fontSize: 9.5, color: GRAY, lineSpacingMultiple: 1.2 });
  });
  return s;
}

// ───────── 14. 사례 연구 ─────────
async function caseStudy() {
  const s = base("08  CASE STUDY", "사례 연구", "기획 배경부터 성과까지, 대표 운영 사례 두 건을 소개합니다.");
  const cases = [
    {
      tag: "야시장", title: "원주 소재 대학교 야시장", loc: "강원 원주시 · 대학 축제 기간",
      cols: [
        ["기획 배경", "대학 축제 기간 저녁 시간대에 콘텐츠가 부재한 문제를 해결하고, 학생과 지역 주민이 함께 즐길 수 있는 야시장을 기획하였습니다."],
        ["운영 방식", "저녁부터 야간까지 푸드트럭 존과 플리마켓 셀러 존을 병행 운영하고, 야간 조명 연출로 분위기를 조성하였습니다."],
        ["성과", "축제 기간 야간 방문자 유입을 크게 늘리며 대학 측으로부터 높은 만족도를 얻었습니다."],
      ],
    },
    {
      tag: "야시장", title: "하남 소재 아파트 야시장", loc: "경기 하남시 · 대규모 아파트 단지",
      cols: [
        ["기획 배경", "단지 내 커뮤니티 행사에 대한 입주민 수요가 높아 관리사무소에서 야시장 운영을 의뢰하였습니다."],
        ["운영 방식", "가족 친화 콘텐츠를 중심으로 키즈존·체험존을 별도 구성하고, 주차·소음·안전을 관리사무소와 협업하여 관리하였습니다."],
        ["성과", "입주민 참여율이 매우 높았으며, 단지 커뮤니티 활성화에 기여하였다는 평가를 받았습니다."],
      ],
    },
  ];
  const rowH = 1.95, y0 = 2.6;
  for (let r = 0; r < cases.length; r++) {
    const c = cases[r], y = y0 + r * (rowH + 0.25);
    const lw = 3.1;
    rect(s, ML, y, lw, rowH, BRAND);
    rect(s, ML + 0.3, y + 0.3, 1.0, 0.28, WHITE, { rectRadius: 0.14 });
    T(s, c.tag, { x: ML + 0.3, y: y + 0.3, w: 1.0, h: 0.28, fontSize: 8.5, bold: true, color: BRAND, align: "center", valign: "middle" });
    T(s, c.title, { x: ML + 0.3, y: y + 0.75, w: lw - 0.5, h: 0.7, fontSize: 15, bold: true, color: WHITE, lineSpacingMultiple: 1.15 });
    T(s, c.loc, { x: ML + 0.3, y: y + rowH - 0.55, w: lw - 0.5, h: 0.3, fontSize: 9.5, color: ICE });
    const gx = ML + lw + 0.25, gw = CW - lw - 0.25, cw = (gw - 0.4) / 3;
    c.cols.forEach((col, i) => {
      const x = gx + i * (cw + 0.2);
      rect(s, x, y, cw, rowH, WHITE);
      T(s, col[0], { x: x + 0.25, y: y + 0.25, w: cw - 0.5, h: 0.3, fontSize: 10, bold: true, color: BRAND });
      T(s, col[1], { x: x + 0.25, y: y + 0.6, w: cw - 0.5, h: rowH - 0.75, fontSize: 10, color: GRAY, lineSpacingMultiple: 1.25 });
    });
  }
  return s;
}

// ───────── 15. 협업 대상 ─────────
async function clients() {
  const s = base("09  PARTNERS", "협업 대상", "공간과 행사 수요를 가진 모든 기관·기업과 협업합니다.");
  const items = [
    ["FaGraduationCap", "대학교·학생회", "축제 플리마켓, 캠퍼스 야시장, 학생 창업 셀러 연계 운영"],
    ["FaHome", "아파트 단지·입주자대표회의", "주민 참여형 야시장, 커뮤니티 마켓, 정기 행사 전환"],
    ["FaLandmark", "지자체·축제 주최 기관", "대형 축제 부스 존 운영, 지역 특산물 셀러 구성, 장비 일괄 렌탈"],
    ["FaCoffee", "카페·건물주·유휴 공간", "공간 분석 기반 정기 마켓 설계, 월 정기 운영 계약"],
    ["FaBriefcase", "기업·개인 행사", "기업 행사 푸드트럭 섭외, 프로모션 마켓, 개인 행사 단독 섭외"],
  ];
  const n = items.length, gap = 0.22, cw = (CW - gap * (n - 1)) / n, cy = 2.65, ch = 3.0;
  for (let i = 0; i < n; i++) {
    const x = ML + i * (cw + gap);
    rect(s, x, cy, cw, ch, WHITE);
    await iconCircle(s, x + cw / 2 - 0.35, cy + 0.35, 0.7, items[i][0]);
    T(s, items[i][1], { x: x + 0.15, y: cy + 1.2, w: cw - 0.3, h: 0.65, fontSize: 12, bold: true, color: INK, align: "center", lineSpacingMultiple: 1.15 });
    T(s, items[i][2], { x: x + 0.2, y: cy + 1.85, w: cw - 0.4, h: 1.0, fontSize: 9.5, color: GRAY, align: "center", lineSpacingMultiple: 1.25 });
  }
  rect(s, ML, 5.95, CW, 0.85, NAVY2, { line: { color: BRAND_DK, width: 1 } });
  T(s, [
    { text: "셀러 파트너  ", options: { bold: true, color: SKY } },
    { text: "플릿 유니온의 행사에 참여하고자 하는 셀러·푸드트럭은 플릿 플랫폼(app.flitunion.com)을 통해 상시 지원하실 수 있습니다.", options: { color: WHITE } },
  ], { x: ML + 0.4, y: 5.95, w: CW - 0.8, h: 0.85, fontSize: 11, valign: "middle" });
  return s;
}

// ───────── 16. 계약 안내 ─────────
async function terms() {
  const s = base("09  PARTNERSHIP GUIDE", "계약 및 운영 안내", "협업 시 기준이 되는 주요 조건을 안내드립니다.");
  const items = [
    ["FaPercentage", "수수료 구조", "셀러 참가비의 일부를 수수료로 수취하는 수익 공유 구조가 기본입니다. 렌탈 장비, 푸드트럭 섭외 등 추가 서비스는 별도 견적으로 안내드립니다."],
    ["FaStore", "최소 운영 규모", "플리마켓 운영 대행은 10개 부스 이상부터 진행합니다. 10개 미만 소규모 행사는 컨설팅 형태로 별도 안내드립니다."],
    ["FaClock", "준비 기간", "행사일 기준 최소 3주 전 의뢰를 권장합니다. 렌탈 견적은 48시간 이내, 긴급 렌탈은 당일 대응이 가능합니다."],
    ["FaGlobeAsia", "서비스 지역", "전국 어디서나 가능합니다. 광역시 및 지역 거점 도시는 원격 기획과 현지 파트너 운영 체계로 진행하며, 출장 비용은 견적에 투명하게 포함합니다."],
    ["FaFileInvoiceDollar", "참가비 수취 방식", "셀러 참가비는 의뢰인이 직접 수취하거나, 플릿 유니온이 대행 수취 후 정산하는 두 가지 방식 중 선택하실 수 있습니다."],
    ["FaUndo", "취소 및 변경 규정", "행사일 4주 전 취소 시 계약금의 50%를 환불하며, 2주 전 취소 시 환불이 불가합니다. 셀러 모집 이전의 일정 변경은 1회 무료로 조정합니다."],
  ];
  const cols = 3, gap = 0.25, cw = (CW - gap * (cols - 1)) / cols, ch = 1.95, cy = 2.6;
  for (let i = 0; i < items.length; i++) {
    const x = ML + (i % cols) * (cw + gap), y = cy + Math.floor(i / cols) * (ch + 0.25);
    rect(s, x, y, cw, ch, WHITE);
    await iconCircle(s, x + 0.3, y + 0.3, 0.55, items[i][0]);
    T(s, items[i][1], { x: x + 1.0, y: y + 0.3, w: cw - 1.2, h: 0.55, fontSize: 13, bold: true, color: INK, valign: "middle" });
    T(s, items[i][2], { x: x + 0.3, y: y + 0.98, w: cw - 0.6, h: ch - 1.1, fontSize: 9.5, color: GRAY, lineSpacingMultiple: 1.25 });
  }
  return s;
}

// ───────── 17. Contact ─────────
async function contact() {
  const s = pres.addSlide();
  pageNo++;
  s.background = { color: BRAND };
  circle(s, -2.2, -2.4, 6.4, WHITE, { fill: { color: WHITE, transparency: 90 }, line: { color: WHITE, transparency: 100 } });
  circle(s, 9.6, 4.2, 5.4, WHITE, { fill: { color: WHITE, transparency: 88 }, line: { color: WHITE, transparency: 100 } });
  wordmark(s, ML, 0.7, 22, WHITE, NAVY);
  T(s, "10  CONTACT", { x: ML, y: 2.0, w: 6, h: 0.3, fontSize: 11, bold: true, color: ICE, charSpacing: 3 });
  T(s, "공간의 가능성을 플릿 유니온과\n함께 열어 보시기 바랍니다.", { x: ML, y: 2.4, w: 7.4, h: 1.6, fontSize: 30, bold: true, color: WHITE, lineSpacingMultiple: 1.2 });
  T(s, "무료 상담을 통해 공간에 최적화된 행사 형태와 예상 수익 구조를 제안드립니다.", { x: ML, y: 4.25, w: 7.2, h: 0.5, fontSize: 13, color: ICE });
  const rows = [
    ["FaGlobe", "홈페이지", "www.flitunion.com"],
    ["FaEnvelope", "이메일", "hello@flitunion.com"],
    ["FaPhone", "전화", "010-8018-8492"],
    ["FaComments", "카카오 오픈채팅", "open.kakao.com/o/sZ5YZ4ni"],
    ["FaMobileAlt", "셀러 플랫폼", "app.flitunion.com"],
  ];
  const cx = 8.4, cy = 1.55, cw = W - cx - ML, rh = 0.86;
  rect(s, cx, cy, cw, rh * rows.length + 0.5, WHITE);
  for (let i = 0; i < rows.length; i++) {
    const y = cy + 0.25 + i * rh;
    await iconCircle(s, cx + 0.35, y + 0.13, 0.55, rows[i][0], TINT, BRAND);
    T(s, rows[i][1], { x: cx + 1.1, y: y + 0.08, w: cw - 1.3, h: 0.28, fontSize: 9.5, color: MUTED });
    T(s, rows[i][2], { x: cx + 1.1, y: y + 0.36, w: cw - 1.3, h: 0.35, fontSize: 13, bold: true, color: INK });
  }
  T(s, "플릿 유니온  |  Flit Union", { x: ML, y: H - 0.85, w: 6, h: 0.3, fontSize: 11, color: WHITE, bold: true });
}

(async () => {
  await cover();
  contents();
  await overview();
  await vision();
  await problem();
  await business();
  await serviceDetail("플리마켓 운영 대행", "FaStore", "플리마켓 운영 대행", "핵심 서비스  ·  공간 분석부터 셀러 모집, 현장 설치, 행사 운영, 정산까지 원스톱으로 대행합니다.",
    "유휴 공간, 대학 축제, 카페 홀 등 어떤 공간이든 플리마켓으로 전환합니다. 플릿 셀러 네트워크를 기반으로 품질 높은 플리마켓을 원스톱으로 대행하며, 의뢰인은 공간만 제공하시면 됩니다.",
    [{ value: "50+", label: "운영 행사" }, { value: "500+", label: "Flit 셀러 DB" }, { value: "98%", label: "재의뢰율" }],
    [
      { title: "Flit 기반 셀러 선발", desc: "플랫폼의 리뷰 점수와 참가 이력을 기반으로 콘셉트에 맞는 셀러를 선발하여 불참·품질 미달 리스크를 최소화합니다." },
      { title: "공간 최적화 레이아웃 설계", desc: "공간 형태, 유동 동선, 출입구 위치를 분석해 부스 배치와 동선을 설계하여 체류 시간과 셀러 매출을 함께 높입니다." },
      { title: "전담 현장 매니저 배치", desc: "행사 당일 전담 매니저가 상주하여 셀러 입·퇴장 관리, 방문객 안내, 돌발 상황 대응을 책임집니다." },
      { title: "SNS 홍보 지원", desc: "인스타그램·카카오채널을 통한 셀러 모집 공고와 방문객 유입 홍보를 별도 비용 없이 지원합니다." },
      { title: "투명한 정산과 보고서", desc: "방문자 수, 셀러별 매출, 참가비 정산 내역을 담은 결과 보고서를 제공하여 모든 수치를 투명하게 공개합니다." },
      { title: "월 정기 운영 우대", desc: "월 2회 이상 정기 운영 계약 시 운영비 할인과 전담 매니저 우선 배정 혜택을 제공합니다." },
    ]);
  await serviceDetail("야시장 & 푸드 마켓 운영", "FaMoon", "야시장 & 푸드 마켓 운영", "야간 행사 특화  ·  조명, 공연, 푸드트럭, 셀러가 어우러진 복합 야시장을 기획·운영합니다.",
    "저녁부터 밤까지 이어지는 야시장 행사를 전문적으로 기획합니다. 단순한 마켓을 넘어 방문객이 기억하는 경험을 만들며, 야간 행사 전담 시스템으로 안전과 흥행을 동시에 확보합니다.",
    [{ value: "20+", label: "야시장 운영" }, { value: "3,500+", label: "일 평균 방문자" }, { value: "100%", label: "재계약률" }],
    [
      { title: "야간 조명 연출 기획", desc: "무드등, 가랜드, 포토존 조명까지 야시장 특유의 감성적인 야간 조명 연출을 기획하고 설치합니다." },
      { title: "공연·버스킹 연계", desc: "어쿠스틱 버스커, 소규모 공연팀과 연계하여 활기를 더하며, 섭외와 무대 설치까지 대행합니다." },
      { title: "푸드트럭 통합 운영", desc: "야간 맞춤 메뉴를 보유한 푸드트럭을 섭외하여 마켓과 통합 운영하고, 전기·용수 연결을 현장에서 관리합니다." },
      { title: "야간 안전 관리 시스템", desc: "야간 행사 특성에 맞춘 안전 매뉴얼과 인력을 배치하고, 비상 대피로와 응급 대응 절차를 사전에 수립합니다." },
      { title: "SNS 바이럴 기획", desc: "포토존 설치, 해시태그 이벤트 등 인스타그램 확산을 위한 SNS 콘텐츠 기획을 포함합니다." },
      { title: "시즌 특화 기획", desc: "크리스마스, 여름 밤, 가을 축제 등 시즌에 맞는 테마 야시장을 기획합니다." },
    ]);
  await serviceDetail("푸드트럭 섭외 & 운영", "FaTruck", "푸드트럭 섭외 & 운영", "푸드트럭 전문 연결  ·  행사 콘셉트에 맞는 푸드트럭을 직접 섭외하고 현장 배치까지 관리합니다.",
    "한식, 디저트, 글로벌 푸드까지 100대 이상의 검증된 푸드트럭 DB를 보유하고 있습니다. 행사 콘셉트와 공간 조건에 맞는 푸드트럭을 신속하게 매칭하고, 계약·배치·현장 관리까지 전 과정을 대행합니다.",
    [{ value: "100+", label: "푸드트럭 DB" }, { value: "30+", label: "행사 납품 실적" }, { value: "0건", label: "당일 불참 미대체" }],
    [
      { title: "100대 이상 검증 DB", desc: "한식, 양식, 일식, 디저트, 음료 등 카테고리별 검증된 DB를 바탕으로 중복 없는 메뉴 구성을 제안합니다." },
      { title: "행사 맞춤 매칭", desc: "가족 친화, 청년 대상, 프리미엄 등 행사 콘셉트와 공간 규모에 맞는 최적의 푸드트럭 조합을 제안합니다." },
      { title: "전기·용수 조율", desc: "공간의 전기 용량과 용수 공급 여건을 사전에 확인하고 푸드트럭별 필요 설비를 조율합니다." },
      { title: "현장 배치·동선 관리", desc: "방문객 대기 줄, 혼잡 방지, 셀러 구역과 충돌 없는 동선을 설계하여 현장을 관리합니다." },
      { title: "위생·안전 기준 확인", desc: "모든 푸드트럭의 영업허가증과 위생 점검 이력을 사전에 확인하여 식품 안전 사고를 방지합니다." },
      { title: "단독 섭외 가능", desc: "1대부터 단독 섭외가 가능하며, 기업 행사, 지역 축제, 개인 행사 모두 대응합니다. 예비 차량을 대기시켜 불참 시 즉시 대체합니다." },
    ]);
  await serviceDetail("행사 물품 렌탈", "FaBoxOpen", "행사 물품 렌탈", "원스톱 장비 지원  ·  텐트, 테이블·의자, 조명, 배너·간판, 전기 설비까지 일괄 제공합니다.",
    "행사 장비를 별도로 구매하실 필요가 없습니다. 텐트, 테이블, 조명, 배너까지 한 번에 해결하며, 운영 대행 패키지와 함께 이용하시면 렌탈 비용 할인 혜택이 적용됩니다.",
    [{ value: "500+", label: "보유 장비 수량" }, { value: "당일", label: "긴급 렌탈 가능" }, { value: "100%", label: "설치 인력 포함" }],
    [
      { title: "부스 텐트·구조물", desc: "3×3m 파고라 텐트부터 대형 천막까지 다양한 규모의 부스 구조물을 설치·철거 인력과 함께 렌탈합니다." },
      { title: "테이블·의자", desc: "접이식 테이블, 좌식 테이블, 바 테이블 등 행사 성격에 맞는 가구를 셀러용·방문객용으로 제공합니다." },
      { title: "조명 장비", desc: "LED 줄조명, 무드등, 스팟 조명, 투광등까지 야외·실내 행사 모두 대응 가능한 조명을 렌탈합니다." },
      { title: "배너·간판 제작", desc: "행사 현수막, X배너, 입간판, 포토존 배경판을 디자인부터 제작·설치까지 일괄 제공합니다." },
      { title: "전기 설비·멀티탭", desc: "현장 전기 분배기, 멀티탭, 연장 코드를 안전 규격에 맞게 제공하고 설치합니다." },
      { title: "렌탈 전용 패키지", desc: "행사 규모에 맞는 렌탈 패키지를 구성하며, 운영 대행과 함께 신청 시 패키지 할인이 적용됩니다." },
    ]);
  await why();
  await processSlide();
  portfolio();
  await caseStudy();
  await clients();
  await terms();
  await contact();
  const out = process.env.OUT || "flitunion-company-profile.pptx";
  await pres.writeFile({ fileName: out });
  console.log("wrote", out, "slides:", pageNo);
})().catch((e) => { console.error(e); process.exit(1); });
