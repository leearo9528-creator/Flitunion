import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { Resend } from "resend";
import { buildProposalHtml, buildProposalSubject, ProposalData } from "@/lib/proposalTemplate";

const htmlPage = (title: string, body: string, color = "#3182f6") => `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><title>${title}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Apple SD Gothic Neo','Malgun Gothic',sans-serif;background:#f4f6fa;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;}
.card{background:#fff;border-radius:18px;padding:48px 36px;max-width:440px;width:100%;text-align:center;box-shadow:0 8px 40px rgba(0,0,0,.08);}
.icon{width:64px;height:64px;border-radius:50%;background:${color}1a;color:${color};display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:32px;font-weight:700;}
h1{margin:0 0 12px;font-size:22px;color:#0a1e3d;}
p{margin:0;color:#4b5563;font-size:14px;line-height:1.7;}
</style></head><body><div class="card">${body}</div></body></html>`;

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return new Response(
      htmlPage("오류", `<div class="icon" style="background:#fee2e2;color:#dc2626">!</div><h1>토큰이 없습니다</h1><p>승인 링크가 올바르지 않습니다.</p>`, "#dc2626"),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const approvalSecret = process.env.APPROVAL_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!approvalSecret || !resendApiKey || !fromEmail) {
    console.error("Missing env: APPROVAL_SECRET / RESEND_API_KEY / RESEND_FROM_EMAIL");
    return new Response(
      htmlPage("서버 설정 오류", `<div class="icon" style="background:#fee2e2;color:#dc2626">!</div><h1>서버 설정 오류</h1><p>환경변수가 누락되었습니다.</p>`, "#dc2626"),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  let data: ProposalData;
  try {
    const secretKey = new TextEncoder().encode(approvalSecret);
    const { payload } = await jwtVerify(token, secretKey);
    data = {
      name: String(payload.name || ""),
      phone: String(payload.phone || ""),
      email: String(payload.email || ""),
      spaceType: String(payload.spaceType || ""),
      location: String(payload.location || ""),
      eventDate: String(payload.eventDate || ""),
      message: String(payload.message || ""),
    };
  } catch (err) {
    console.error("JWT verify failed:", err);
    return new Response(
      htmlPage("토큰 오류", `<div class="icon" style="background:#fee2e2;color:#dc2626">!</div><h1>유효하지 않은 토큰</h1><p>링크가 만료되었거나 변조되었습니다.</p>`, "#dc2626"),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  if (!data.email) {
    return new Response(
      htmlPage("이메일 누락", `<div class="icon" style="background:#fee2e2;color:#dc2626">!</div><h1>이메일이 없습니다</h1><p>발송할 수신자 주소가 없습니다.</p>`, "#dc2626"),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: buildProposalSubject(data),
      html: buildProposalHtml(data),
      replyTo: "hello@flitunion.com",
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        htmlPage("발송 실패", `<div class="icon" style="background:#fee2e2;color:#dc2626">!</div><h1>이메일 발송 실패</h1><p>${String(error.message || "알 수 없는 오류")}</p>`, "#dc2626"),
        { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    return new Response(
      htmlPage(
        "발송 완료",
        `<div class="icon">✓</div><h1>맞춤 기획안 발송 완료</h1><p><strong>${data.name}</strong>님 (${data.email})에게<br>맞춤 기획안 메일이 발송되었습니다.</p>`
      ),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (err) {
    console.error("Send error:", err);
    return new Response(
      htmlPage("발송 실패", `<div class="icon" style="background:#fee2e2;color:#dc2626">!</div><h1>이메일 발송 실패</h1><p>잠시 후 다시 시도해주세요.</p>`, "#dc2626"),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}
