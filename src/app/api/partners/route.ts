import { NextRequest, NextResponse } from "next/server";

/**
 * 협력사(푸드트럭·셀러) 등록 신청 접수.
 *
 * B2B 상담(/api/contact)과 의도적으로 분리했다 — 받는 사람도 처리 방식도 다르다.
 * 전용 채널 웹훅(DISCORD_PARTNER_WEBHOOK_URL)이 있으면 그쪽으로, 없으면 기존 문의 웹훅으로 보낸다.
 */

const PARTNER_TYPE_LABELS: Record<string, string> = {
  foodtruck: "🚚 푸드트럭",
  seller: "🏪 셀러",
};

const truncate = (s: string, max = 1000) => (s.length > max ? s.slice(0, max - 1) + "…" : s);

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const partnerType = String(body.partnerType ?? "");
  const brandName = String(body.brandName ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const items = String(body.items ?? "").trim();
  const region = String(body.region ?? "").trim();
  const link = String(body.link ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!PARTNER_TYPE_LABELS[partnerType] || !brandName || !phone || !items || !region) {
    return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  const webhookUrl = process.env.DISCORD_PARTNER_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("DISCORD_PARTNER_WEBHOOK_URL / DISCORD_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
  }

  const payload = {
    username: "FlitUnion 협력사 봇",
    embeds: [
      {
        title: "🤝 새 협력사 등록 신청",
        color: 0x22c55e,
        fields: [
          { name: "구분", value: PARTNER_TYPE_LABELS[partnerType], inline: true },
          { name: "업체명 · 활동명", value: truncate(brandName), inline: true },
          { name: "연락처", value: truncate(phone), inline: true },
          { name: "대표 품목 · 메뉴", value: truncate(items), inline: false },
          { name: "주 활동 지역", value: truncate(region), inline: true },
          { name: "사진 · SNS 링크", value: truncate(link || "미제출"), inline: false },
          { name: "하고 싶은 말", value: truncate(message || "없음"), inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "flitunion.com/partners" },
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Discord webhook error:", res.status, text);
      return NextResponse.json({ error: "알림 전송에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Discord webhook error:", err);
    return NextResponse.json({ error: "알림 전송에 실패했습니다." }, { status: 500 });
  }
}
