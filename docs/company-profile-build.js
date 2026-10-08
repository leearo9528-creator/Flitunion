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


// ───────── 웹사이트 정본 데이터 로더 ─────────
// src/data/*.ts 를 TypeScript 로 그 자리에서 트랜스파일해 읽는다.
// 소개서와 웹사이트가 어긋나면 영업 현장에서 바로 티가 나므로, 문구를 여기에 다시 적지 않는다.
const ts = require("typescript");
const fs = require("fs"), path = require("path");
function loadData(name) {
  const file = path.join(__dirname, "..", "src", "data", `${name}.ts`);
  const src = fs.readFileSync(file, "utf8");
  if (/^\s*import\s/m.test(src)) throw new Error(`${name}.ts 는 import 가 있어 단독 로드 불가`);
  const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const m = { exports: {} };
  new Function("module", "exports", out)(m, m.exports);
  return m.exports;
}
const { services, flagshipService, standardServices } = loadData("services");
const company = loadData("company");
const { portfolioItems } = loadData("portfolio");

/** services.ts 의 slug → 소개서 아이콘 (react-icons/fa) */
const SERVICE_ICON = {
  "event-agency": "FaLayerGroup",
  "flea-market": "FaStore",
  "festival-booth": "FaTicketAlt",
  "experience-booth": "FaMagic",
  "stage-performance": "FaMicrophoneAlt",
  "night-market": "FaMoon",
  "food-truck": "FaTruck",
  "rental": "FaBoxOpen",
};

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
  T(s, "행사 기획부터 무대까지,\n창구 하나로 대행합니다.", { x: ML, y: 2.8, w: 9.6, h: 1.9, fontSize: 42, bold: true, color: WHITE, lineSpacingMultiple: 1.15 });
  T(s, "행사 기획 · 행사 운영 · 푸드트럭 · 체험부스 · 플리마켓 · 무대공연\n검증된 셀러 네트워크 기반의 행사 운영 원스톱 대행 전문 기업", { x: ML, y: 4.85, w: 9, h: 0.9, fontSize: 16, color: ICE, lineSpacingMultiple: 1.3 });
  T(s, "플릿 유니온  |  flitunion.com", { x: ML, y: H - 0.85, w: 6, h: 0.3, fontSize: 11, color: WHITE, bold: true });
}

// ───────── 2. 목차 ─────────
function contents() {
  const s = base("CONTENTS", "목차", "플릿 유니온 회사소개서는 다음과 같은 순서로 구성되어 있습니다.");
  const items = [
    ["01", "회사 개요", "Company Overview"],
    ["02", "비전과 미션", "Vision & Mission"],
    ["03", "고객의 과제와 플릿의 해법", "Problem & Solution"],
    ["04", "대행 범위", "What We Do"],
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
  const s = base("01  COMPANY OVERVIEW", "회사 개요", "플릿 유니온은 행사 주최자를 위한 행사 기획·운영 대행 전문 기업입니다.");
  // left: white card with key-value
  const cx = ML, cy = 2.55, cw = 5.6, ch = 4.2;
  rect(s, cx, cy, cw, ch, WHITE);
  T(s, "기업 정보", { x: cx + 0.4, y: cy + 0.28, w: 3, h: 0.35, fontSize: 15, bold: true, color: INK });
  // ⚠️ 대표자·사업자등록번호·설립일·소재지는 싣지 않는다 (company.ts 주석 참조, 2026-09-22 결정)
  const rows = [
    ...company.companyInfo.filter((r) => r.label !== "이메일" && r.label !== "전화").map((r) => [r.label, r.value]),
    ["홈페이지", "www.flitunion.com"],
    ...company.companyInfo.filter((r) => r.label === "이메일" || r.label === "전화").map((r) => [r.label, r.value]),
  ];
  let ry = cy + 0.72;
  rows.forEach((r) => {
    const h = r[1].length > 30 ? 0.62 : 0.34;
    T(s, r[0], { x: cx + 0.4, y: ry, w: 1.4, h, fontSize: 10.5, bold: true, color: BRAND });
    T(s, r[1], { x: cx + 1.8, y: ry, w: cw - 2.1, h, fontSize: 10.5, color: INK, lineSpacingMultiple: 1.2 });
    ry += h + 0.06;
  });
  // right: stat tiles
  const stats = company.keyStats.map((k) => [k.value, k.label, k.desc]);
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
  T(s, company.vision.headline.replace("\n", " "), { x: ML + 0.45, y: 3.05, w: CW - 0.9, h: 0.5, fontSize: 22, bold: true, color: WHITE });
  T(s, company.vision.body, { x: ML + 0.45, y: 3.55, w: CW - 0.9, h: 0.5, fontSize: 11.5, color: ICE });
  const PRINCIPLE_ICON = { Verified: "FaUserCheck", "One-Stop": "FaLayerGroup", Transparent: "FaFileInvoiceDollar" };
  const vals = company.principles.map((p) => [PRINCIPLE_ICON[p.en], `${p.ko} (${p.en})`, p.desc]);
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
  const s = base("03  PROBLEM & SOLUTION", "고객의 과제와 플릿의 해법", "행사 담당자가 실제로 겪는 문제를 플릿 유니온이 해결합니다.");
  const PROBLEM_ICON = ["FaGraduationCap", "FaLandmark", "FaCoffee"];
  const items = company.problems.map((p, i) => [PROBLEM_ICON[i], p.target, p.question, p.solution]);
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

// ───────── 6. 대행 범위 6종 ─────────
const PILLARS = [
  ["FaLightbulb", "행사 기획", "행사 목적·대상·예산에 맞춘 콘셉트와 프로그램 구성, 인허가·안전 계획 검토까지 기획 단계를 맡습니다."],
  ["FaTasks", "행사 운영", "전담 매니저가 당일 현장에 상주하여 설치, 입·퇴장, 방문객 안내, 돌발 대응, 철수와 정산·결과 보고까지 책임집니다."],
  ["FaTruck", "푸드트럭", "100대 이상의 검증된 푸드트럭 DB에서 행사 콘셉트에 맞게 매칭하고 계약·배치·전기·용수까지 관리합니다."],
  ["FaMagic", "체험부스", "석고방향제·에코백·키링 만들기, 페이스페인팅 등 체험 프로그램을 재료·운영 인력까지 포함해 직접 운영합니다."],
  ["FaStore", "플리마켓", "플릿 플랫폼의 리뷰·참가 이력으로 검증된 셀러를 선발하고, 품목 중복 없이 배치해 마켓 존을 운영합니다."],
  ["FaMicrophoneAlt", "무대공연", "이동식 무대·음향·조명을 설치하고 버스킹·밴드·공연팀을 섭외하여 행사의 메인 프로그램을 구성합니다."],
];
async function business() {
  const s = base("04  WHAT WE DO", "대행 범위", flagshipService.description);
  const cols = 3, gap = 0.25, cw = (CW - gap * (cols - 1)) / cols, ch = 1.95, cy = 2.55;
  for (let i = 0; i < PILLARS.length; i++) {
    const x = ML + (i % cols) * (cw + gap), y = cy + Math.floor(i / cols) * (ch + 0.22);
    rect(s, x, y, cw, ch, WHITE);
    await iconCircle(s, x + 0.3, y + 0.3, 0.55, PILLARS[i][0]);
    T(s, String(i + 1).padStart(2, "0"), { x: x + cw - 0.9, y: y + 0.28, w: 0.6, h: 0.3, fontSize: 11, bold: true, color: ICE, fontFace: "Arial Black", align: "right" });
    T(s, PILLARS[i][1], { x: x + 1.0, y: y + 0.3, w: cw - 1.9, h: 0.55, fontSize: 15, bold: true, color: INK, valign: "middle" });
    T(s, PILLARS[i][2], { x: x + 0.3, y: y + 1.0, w: cw - 0.6, h: ch - 1.1, fontSize: 10, color: GRAY, lineSpacingMultiple: 1.25 });
  }
  rect(s, ML, 6.95 - 0.1, CW, 0.0, NAVY); // no-op spacer
  return s;
}

// ───────── 6b. 서비스 구성 8종 (한눈에) ─────────
async function serviceMap() {
  const s = base("04  SERVICES", "서비스 구성", "종합 대행 1종과 개별 서비스 7종으로 구성되며, 필요한 영역만 단독으로 의뢰하실 수 있습니다.");
  // flagship band
  const fy = 2.4, fh = 0.95;
  rect(s, ML, fy, CW, fh, BRAND);
  await iconCircle(s, ML + 0.3, fy + 0.175, 0.6, SERVICE_ICON[flagshipService.slug], WHITE, BRAND);
  T(s, flagshipService.subtitle, { x: ML + 1.1, y: fy + 0.14, w: 4, h: 0.26, fontSize: 9, bold: true, color: ICE, charSpacing: 2 });
  T(s, flagshipService.title, { x: ML + 1.1, y: fy + 0.4, w: 5, h: 0.4, fontSize: 17, bold: true, color: WHITE });
  T(s, flagshipService.highlight, { x: ML + 6.3, y: fy, w: CW - 6.6, h: fh, fontSize: 11.5, color: WHITE, valign: "middle", align: "right" });
  // 7 standard services in a 4+3 grid
  const cols = 4, gap = 0.22, cw = (CW - gap * (cols - 1)) / cols, ch = 1.58, cy = fy + fh + 0.2;
  for (let i = 0; i < standardServices.length; i++) {
    const sv = standardServices[i];
    const x = ML + (i % cols) * (cw + gap), y = cy + Math.floor(i / cols) * (ch + 0.2);
    rect(s, x, y, cw, ch, WHITE);
    await iconCircle(s, x + 0.25, y + 0.22, 0.42, SERVICE_ICON[sv.slug]);
    T(s, sv.subtitle, { x: x + 0.78, y: y + 0.22, w: cw - 1.0, h: 0.42, fontSize: 8.5, bold: true, color: BRAND, valign: "middle" });
    T(s, sv.title, { x: x + 0.25, y: y + 0.72, w: cw - 0.5, h: 0.3, fontSize: 11.5, bold: true, color: INK });
    T(s, fit(sv.description, 78), { x: x + 0.25, y: y + 1.03, w: cw - 0.5, h: ch - 1.08, fontSize: 8, color: GRAY, lineSpacingMultiple: 1.1 });
  }
  return s;
}

// ───────── 7~13. 서비스 상세 ─────────
/** 웹 문장을 슬라이드 칸에 맞게 줄인다 — 글자 수 상한 안에서 마지막 문장 경계("다.")까지만 남긴다 */
function fit(text, max) {
  if (text.length <= max) return text;
  const cut = text.lastIndexOf("다.", max);
  return cut > max * 0.4 ? text.slice(0, cut + 2) : text.slice(0, max - 1) + "…";
}
/** 소개서에서만 짧게 쓰는 제목·설명 (웹 정본은 그대로 두고 슬라이드 칸 폭에 맞춘 축약) */
const DECK_OVERRIDES = {
  "experience-booth": {
    0: { desc: "석고방향제, 에코백 드로잉, 키캡·키링, 뱃지, 손거울, 가면, 팽이, 하바리움펜, 말랑이 등 보유 프로그램 중 행사 성격과 연령대에 맞게 구성합니다." },
    3: { title: "무료 체험 후 유료 전환", desc: "주최 측 무료 지원 인원이 소진된 뒤에는 현장 유료 판매로 전환하여 운영 시간을 끝까지 채웁니다." },
  },
};
async function serviceDetail(sv, no) {
  const iconName = SERVICE_ICON[sv.slug], title = sv.title, subtitle = `${sv.subtitle}  ·  ${sv.description}`;
  const ov = DECK_OVERRIDES[sv.slug] || {};
  const hero = fit(sv.heroDesc, 170), stats = sv.stats;
  const features = sv.features.slice(0, 6).map((f, i) => ({ title: ov[i]?.title ?? f.title, desc: fit(ov[i]?.desc ?? f.desc, 100) }));
  const s = base(`05  SERVICE DETAIL  ·  ${no}`, title, subtitle);
  // left summary card
  const lx = ML, ly = 2.55, lw = 4.1, lh = 4.2;
  rect(s, lx, ly, lw, lh, WHITE);
  await iconCircle(s, lx + 0.35, ly + 0.35, 0.65, iconName);
  T(s, hero, { x: lx + 0.35, y: ly + 1.15, w: lw - 0.7, h: 1.7, fontSize: 10, color: GRAY, lineSpacingMultiple: 1.25 });
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
    T(s, f.title, { x: x + 0.2, y: y + 0.48, w: fw - 0.4, h: 0.36, fontSize: 11, bold: true, color: WHITE });
    T(s, f.desc, { x: x + 0.2, y: y + 0.9, w: fw - 0.4, h: fh - 1.0, fontSize: 8.5, color: ICE, lineSpacingMultiple: 1.2 });
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
  const pts = ["플리마켓·푸드트럭 셀러가 행사 정보를 찾고 참가 기록을 남기는 플랫폼", "셀러의 리뷰 점수, 참가 이력, 매출 기록이 축적됩니다", "축적된 데이터를 근거로 행사 콘셉트에 맞는 셀러를 선발합니다", "모집 공고가 플랫폼에 게시되어 별도 홍보 비용 없이 셀러가 모집됩니다"];
  T(s, pts.map((p, i) => ({ text: p, options: { bullet: { code: "25A0" }, breakLine: i < pts.length - 1, paraSpaceAfter: 6 } })), { x: lx + 0.35, y: ly + 2.0, w: lw - 0.6, h: 2.1, fontSize: 10.5, color: WHITE, lineSpacingMultiple: 1.2 });
  // right: comparison table
  const tx = lx + lw + 0.35, tw = CW - lw - 0.35;
  const hdr = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: BRAND_DK }, align: "center", valign: "middle", fontSize: 11 } });
  const k = (t) => ({ text: t, options: { bold: true, color: INK, fill: { color: TINT }, valign: "middle", fontSize: 10.5 } });
  const a = (t) => ({ text: t, options: { color: GRAY, fill: { color: WHITE }, valign: "middle", fontSize: 10 } });
  const b = (t) => ({ text: t, options: { color: INK, bold: true, fill: { color: WHITE }, valign: "middle", fontSize: 10 } });
  const rows = [
    [hdr("구분"), hdr("일반 모집 방식"), hdr("플릿 유니온")],
    ...company.comparison.map((c) => [k(c.axis), a(c.general), b(c.flit)]),
  ];
  s.addTable(rows, { x: tx, y: ly, w: tw, colW: [1.3, (tw - 1.3) / 2, (tw - 1.3) / 2], rowH: [0.45, 0.75, 0.75, 0.75, 0.75, 0.75], fontFace: FONT, border: { type: "solid", color: "CBD5E1", pt: 0.75 }, margin: [4, 8, 4, 8] });
  return s;
}

// ───────── 12. 프로세스 ─────────
async function processSlide() {
  const s = base("07  PROCESS", "운영 프로세스", "상담부터 결과 보고까지 다섯 단계로 진행됩니다.");
  const STEP_ICON = ["FaSearch", "FaClipboardCheck", "FaUsers", "FaTools", "FaFileAlt"];
  const steps = company.processSteps.map((p, i) => [STEP_ICON[i], p.title, p.desc]);
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
  const NOTE_ICON = ["FaClock", "FaChartLine", "FaCloudRain"];
  const notes = company.processNotes.map((n, i) => [NOTE_ICON[i], n]);
  const nw = (CW - 0.6) / 3, ny = 5.95;
  for (let i = 0; i < notes.length; i++) {
    const x = ML + i * (nw + 0.3);
    rect(s, x, ny, nw, 0.85, WHITE);
    await iconCircle(s, x + 0.2, ny + 0.2, 0.45, notes[i][0]);
    T(s, notes[i][1], { x: x + 0.8, y: ny, w: nw - 0.95, h: 0.85, fontSize: 10.5, color: INK, valign: "middle", lineSpacingMultiple: 1.2 });
  }
  return s;
}

// ───────── 사진 로더 ─────────
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

// ───────── 13. 주요 실적 (사진 포트폴리오) ─────────
const TAGC = { "야시장": "4F46E5", "캠퍼스 마켓": "3182F6", "대형 축제": "E11D48", "민속 축제": "EA580C", "체험부스": "CA8A04" };
const PORTFOLIO = portfolioItems.map((p) => [p.id, p.tag, p.location, p.title]);
async function portfolio() {
  const s = base("08  PORTFOLIO", "주요 실적", `대학교, 아파트 단지, 대형 축제, 체험부스까지 ${portfolioItems.length}건의 운영 사례입니다.`);
  const cols = 5, gap = 0.2, cw = (CW - gap * (cols - 1)) / cols, ph = cw * 0.5, ch = ph + 0.78, cy = 2.5;
  for (let i = 0; i < PORTFOLIO.length; i++) {
    const [id, tag, loc, title] = PORTFOLIO[i];
    const x = ML + (i % cols) * (cw + gap), y = cy + Math.floor(i / cols) * (ch + 0.2);
    rect(s, x, y, cw, ch, WHITE);
    await photoBox(s, id, x, y, cw, ph);
    rect(s, x + 0.15, y + 0.15, 1.0, 0.26, TAGC[tag], { rectRadius: 0.13 });
    T(s, tag, { x: x + 0.15, y: y + 0.15, w: 1.0, h: 0.26, fontSize: 8, bold: true, color: WHITE, align: "center", valign: "middle" });
    T(s, title, { x: x + 0.15, y: y + ph + 0.08, w: cw - 0.3, h: 0.45, fontSize: 9, bold: true, color: INK, lineSpacingMultiple: 1.1 });
    T(s, loc, { x: x + 0.15, y: y + ph + 0.52, w: cw - 0.3, h: 0.22, fontSize: 8, color: MUTED });
  }
  return s;
}

// ───────── 14. 사례 연구 ─────────
async function caseStudy() {
  const s = base("08  CASE STUDY", "사례 연구", "야시장과 체험부스, 대표 운영 사례 두 건을 기획 배경부터 성과까지 소개합니다.");
  const pick = (id) => {
    const p = portfolioItems.find((x) => x.id === id);
    if (!p) throw new Error("portfolio id 없음: " + id);
    const d = (t) => p.details.find((x) => x.title === t)?.content ?? "";
    return { id: p.id, tag: p.tag, title: p.title, loc: p.location, cols: [["기획 배경", d("기획 배경")], ["운영 방식", d("운영 방식")], ["성과", d("성과")]] };
  };
  const cases = [pick("wonju-univ-night"), pick("wirye-experience-booth")];
  const rowH = 1.95, y0 = 2.6;
  for (let r = 0; r < cases.length; r++) {
    const c = cases[r], y = y0 + r * (rowH + 0.25);
    const lw = 3.4;
    await photoBox(s, c.id, ML, y, lw, rowH, { dy: -0.3 });
    // caption band over photo
    rect(s, ML, y + rowH - 0.75, lw, 0.75, NAVY, { rectRadius: 0, fill: { color: NAVY, transparency: 25 }, line: { color: NAVY, transparency: 100 } });
    rect(s, ML + 0.2, y + 0.2, 0.9, 0.26, WHITE, { rectRadius: 0.13 });
    T(s, c.tag, { x: ML + 0.2, y: y + 0.2, w: 0.9, h: 0.26, fontSize: 8, bold: true, color: BRAND, align: "center", valign: "middle" });
    T(s, c.title, { x: ML + 0.2, y: y + rowH - 0.68, w: lw - 0.4, h: 0.32, fontSize: 13, bold: true, color: WHITE });
    T(s, c.loc, { x: ML + 0.2, y: y + rowH - 0.36, w: lw - 0.4, h: 0.25, fontSize: 9, color: ICE });
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

// ───────── 14b. 현장 스케치 (photos/gallery/*.jpg 가 3장 이상일 때만) ─────────
async function gallery() {
  const dir = path.join(PHOTO_DIR, "gallery");
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort().slice(0, 6);
  if (files.length < 3) return null;
  const s = base("08  ON-SITE", "현장 스케치", "플릿 유니온이 운영한 행사 현장의 실제 모습입니다.");
  const cols = 3, gap = 0.22, cw = (CW - gap * (cols - 1)) / cols, ch = 2.0, cy = 2.55;
  files.forEach((f, i) => {
    const x = ML + (i % cols) * (cw + gap), y = cy + Math.floor(i / cols) * (ch + 0.22);
    s.addImage({ path: path.join(dir, f), x, y, w: cw, h: ch, sizing: { type: "cover", w: cw, h: ch } });
  });
  return s;
}

// ───────── 15. 협업 대상 ─────────
async function clients() {
  const s = base("09  PARTNERS", "협업 대상", "행사 수요를 가진 모든 기관·기업과 협업합니다.");
  const PARTNER_ICON = ["FaGraduationCap", "FaLandmark", "FaHome", "FaBriefcase", "FaCoffee"];
  const items = company.partners.map((p, i) => [PARTNER_ICON[i], p.title.replace(" · ", "·"), p.desc]);
  const n = items.length, gap = 0.22, cw = (CW - gap * (n - 1)) / n, cy = 2.65, ch = 3.0;
  for (let i = 0; i < n; i++) {
    const x = ML + i * (cw + gap);
    rect(s, x, cy, cw, ch, WHITE);
    await iconCircle(s, x + cw / 2 - 0.35, cy + 0.35, 0.7, items[i][0]);
    T(s, items[i][1], { x: x + 0.15, y: cy + 1.2, w: cw - 0.3, h: 0.65, fontSize: 12, bold: true, color: INK, align: "center", lineSpacingMultiple: 1.15 });
    T(s, items[i][2], { x: x + 0.15, y: cy + 1.85, w: cw - 0.3, h: 1.05, fontSize: 9, color: GRAY, align: "center", lineSpacingMultiple: 1.2 });
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
  const TERM_ICON = ["FaPercentage", "FaStore", "FaClock", "FaGlobeAsia", "FaFileInvoiceDollar", "FaUndo"];
  const items = company.contractTerms.map((t, i) => [TERM_ICON[i], t.title, t.desc]);
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
  T(s, "행사 준비의 전 과정을\n플릿 유니온에 맡기시기 바랍니다.", { x: ML, y: 2.4, w: 7.4, h: 1.6, fontSize: 30, bold: true, color: WHITE, lineSpacingMultiple: 1.2 });
  T(s, "무료 상담을 통해 행사에 맞는 구성과 예상 비용을 48시간 이내에 제안해 드립니다.", { x: ML, y: 4.25, w: 7.2, h: 0.5, fontSize: 13, color: ICE });
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
  await serviceMap();
  for (const sv of standardServices) await serviceDetail(sv, sv.title);
  await why();
  await processSlide();
  await portfolio();
  await caseStudy();
  await gallery();
  await clients();
  await terms();
  await contact();
  const out = process.env.OUT || path.join(__dirname, "flitunion-company-profile.pptx");
  await pres.writeFile({ fileName: out });
  console.log("wrote", out, "slides:", pageNo);
})().catch((e) => { console.error(e); process.exit(1); });
