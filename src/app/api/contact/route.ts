import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, spaceType, location, eventDate, message } = body;

  if (!name || !phone || !spaceType || !location) {
    return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const spaceTypeLabels: Record<string, string> = {
    "flea-market": "플리마켓",
    "night-market": "야시장",
    "food-truck": "푸드트럭 이벤트",
    popup: "팝업스토어",
    university: "대학교 축제",
    brand: "기업·브랜드 행사",
    "rental-only": "장비 렌탈만",
    other: "기타",
  };

  const mailOptions = {
    from: `"FlitUnion 문의" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
    subject: `[플릿유니온] 무료 상담 신청 - ${name}`,
    html: `
      <h2>무료 상담 신청이 접수되었습니다</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold">이름/담당자</td><td style="padding:8px;border:1px solid #e5e7eb">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold">연락처</td><td style="padding:8px;border:1px solid #e5e7eb">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold">행사 유형</td><td style="padding:8px;border:1px solid #e5e7eb">${spaceTypeLabels[spaceType] ?? spaceType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold">공간 위치</td><td style="padding:8px;border:1px solid #e5e7eb">${location}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold">행사 예정일</td><td style="padding:8px;border:1px solid #e5e7eb">${eventDate || "미정"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:bold">추가 문의</td><td style="padding:8px;border:1px solid #e5e7eb">${message || "없음"}</td></tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "이메일 발송에 실패했습니다." }, { status: 500 });
  }
}
