import { NextRequest, NextResponse } from "next/server";

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

const truncate = (s: string, max = 1000) => (s.length > max ? s.slice(0, max - 1) + "…" : s);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, spaceType, location, eventDate, message } = body;

  if (!name || !phone || !spaceType || !location) {
    return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
  }

  const payload = {
    username: "FlitUnion 문의 봇",
    embeds: [
      {
        title: "📩 새 무료 상담 신청",
        color: 0x3182f6,
        fields: [
          { name: "이름/담당자", value: truncate(String(name)), inline: true },
          { name: "연락처", value: truncate(String(phone)), inline: true },
          {
            name: "행사 유형",
            value: truncate(SPACE_TYPE_LABELS[spaceType] ?? String(spaceType)),
            inline: true,
          },
          { name: "공간 위치", value: truncate(String(location)), inline: false },
          { name: "행사 예정일", value: truncate(eventDate || "미정"), inline: true },
          { name: "추가 문의", value: truncate(message || "없음"), inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "flitunion.com" },
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
