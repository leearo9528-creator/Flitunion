// 맞춤 기획안 이메일 템플릿
// 폼 값으로 치환되며, 사장님 승인 후 자동 발송됩니다.

const SPACE_TYPE_LABELS: Record<string, string> = {
  "flea-market": "플리마켓",
  "night-market": "야시장",
  "food-truck": "푸드트럭 이벤트",
  popup: "팝업스토어",
  university: "대학교 축제",
  brand: "기업·브랜드 행사",
  "rental-only": "장비 렌탈만",
  other: "기타",
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type ProposalData = {
  name: string;
  phone: string;
  email: string;
  spaceType: string;
  location: string;
  eventDate: string;
  message: string;
};

export function buildProposalSubject(data: ProposalData) {
  const typeLabel = SPACE_TYPE_LABELS[data.spaceType] ?? data.spaceType;
  return `[플릿 유니온] ${escapeHtml(data.name)}님 ${typeLabel} 맞춤 기획안`;
}

export function buildProposalHtml(data: ProposalData) {
  const typeLabel = SPACE_TYPE_LABELS[data.spaceType] ?? data.spaceType;
  const name = escapeHtml(data.name);
  const location = escapeHtml(data.location);
  const eventDate = escapeHtml(data.eventDate || "협의");
  const message = escapeHtml(data.message || "");

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>플릿 유니온 맞춤 기획안</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:#1a1a1a;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;">

    <!-- Header -->
    <div style="background:linear-gradient(160deg,#050e1f 0%,#0a1e3d 60%,#0c2553 100%);padding:40px 32px;text-align:center;">
      <p style="margin:0;color:#93c5fd;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">FLIT UNION PROPOSAL</p>
      <h1 style="margin:12px 0 0;color:#ffffff;font-size:26px;font-weight:900;line-height:1.3;">
        ${name}님을 위한<br>맞춤 ${typeLabel} 기획안
      </h1>
    </div>

    <!-- Greeting -->
    <div style="padding:36px 32px 8px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#1a1a1a;">
        안녕하세요, <strong>${name}</strong>님.<br>
        플리마켓·야시장·푸드트럭 운영 대행 전문 <strong style="color:#3182f6;">플릿 유니온</strong>입니다.
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#4b5563;">
        문의 주신 내용을 검토하고, 운영 가능한 기획 방향을 정리했습니다.
        아래 내용을 살펴보시고 편하게 회신 또는 전화 주시면 더 구체적인 견적과 일정으로 답변드리겠습니다.
      </p>
    </div>

    <!-- Inquiry summary -->
    <div style="padding:24px 32px;">
      <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:20px 22px;">
        <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#3182f6;letter-spacing:0.5px;text-transform:uppercase;">문의 내용 요약</p>
        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;font-size:13px;color:#1f2937;">
          <tr><td style="padding:6px 0;width:90px;color:#6b7280;">행사 유형</td><td style="padding:6px 0;font-weight:600;">${typeLabel}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">공간 위치</td><td style="padding:6px 0;font-weight:600;">${location}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">행사 예정일</td><td style="padding:6px 0;font-weight:600;">${eventDate}</td></tr>
          ${message ? `<tr><td style="padding:6px 0;color:#6b7280;vertical-align:top;">요청사항</td><td style="padding:6px 0;line-height:1.6;">${message}</td></tr>` : ""}
        </table>
      </div>
    </div>

    <!-- Proposal -->
    <div style="padding:8px 32px 24px;">
      <h2 style="margin:0 0 16px;font-size:18px;font-weight:800;color:#0a1e3d;">제안 드리는 운영 방안</h2>

      <div style="margin-bottom:18px;padding:18px 20px;background:#eff6ff;border-radius:12px;border-left:4px solid #3182f6;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#3182f6;">① 셀러·푸드트럭 큐레이션</p>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#374151;">
          ${typeLabel} 콘셉트와 ${location} 상권 특성에 맞춰, Flit 셀러 네트워크에서 검증된 셀러와 푸드트럭을 선별 배치합니다. 평균 30~50팀 규모로 운영 가능하며, 행사 성격에 따라 조정 가능합니다.
        </p>
      </div>

      <div style="margin-bottom:18px;padding:18px 20px;background:#eff6ff;border-radius:12px;border-left:4px solid #3182f6;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#3182f6;">② 행사 장비·부스 일괄 세팅</p>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#374151;">
          천막·테이블·전기·조명·사이니지까지 모든 장비를 자체 보유 자산으로 운영합니다. 별도 외주 없이 단일 창구로 진행되어 일정·품질 관리가 안정적입니다.
        </p>
      </div>

      <div style="margin-bottom:18px;padding:18px 20px;background:#eff6ff;border-radius:12px;border-left:4px solid #3182f6;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#3182f6;">③ 현장 운영 & 사후 정산</p>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#374151;">
          행사 당일 PM 1인 + 현장 운영팀이 상주하여 셋업·진행·철수까지 전체 운영을 담당합니다. 운영 종료 후 결과 리포트(방문객·매출·이슈)도 함께 전달드립니다.
        </p>
      </div>
    </div>

    <!-- Next steps -->
    <div style="padding:0 32px 32px;">
      <div style="background:#0a1e3d;border-radius:14px;padding:24px;text-align:center;">
        <p style="margin:0 0 8px;color:#93c5fd;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Next Step</p>
        <p style="margin:0 0 18px;color:#ffffff;font-size:15px;line-height:1.6;">
          상세 견적과 운영 일정은<br>15분 내외의 상담으로 빠르게 정리해드립니다.
        </p>
        <a href="tel:+821080188492" style="display:inline-block;background:#3182f6;color:#ffffff;padding:13px 28px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:700;">
          📞 010-8018-8492 전화 상담
        </a>
        <p style="margin:14px 0 0;color:#94a3b8;font-size:12px;">또는 이 메일에 바로 회신해 주세요.</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:24px 32px;background:#f8fafc;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0 0 6px;font-size:13px;font-weight:800;color:#0a1e3d;">Flit Union 플릿 유니온</p>
      <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">
        플리마켓 · 야시장 · 푸드트럭 · 행사 장비 임대 운영 대행<br>
        <a href="https://flitunion.com" style="color:#3182f6;text-decoration:none;">flitunion.com</a> · hello@flitunion.com
      </p>
    </div>

  </div>
</body>
</html>`;
}
