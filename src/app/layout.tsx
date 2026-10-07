import type { Metadata } from "next";
import { Geist } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "플릿 유니온(Flit Union) | 행사 대행 · 기획부터 현장 운영·정산까지",
  description:
    "행사 기획·운영부터 푸드트럭, 체험부스, 플리마켓, 무대공연까지 한 번에 대행하는 행사 대행 전문 기업. 대학 축제, 지자체 축제, 아파트·기업 행사를 기획, 섭외, 장비 렌탈, 현장 운영, 정산까지 원스톱으로 진행합니다.",
  keywords: [
    "행사 대행",
    "행사 기획 대행",
    "행사 운영 대행",
    "축제 부스 운영 대행",
    "지자체 축제 대행",
    "대학교 축제 대행",
    "기업 행사 대행",
    "플리마켓 운영 대행",
    "야시장 기획",
    "푸드트럭 섭외",
    "체험부스 운영 대행",
    "체험부스 섭외",
    "석고방향제 체험부스",
    "행사 무대 설치",
    "행사 음향 렌탈",
    "공연팀 섭외",
    "행사 장비 렌탈",
    "셀러 모집 대행",
    "유휴공간 활용",
    "플릿 유니온",
    "Flit Union",
    "플릿",
  ],
  authors: [{ name: "플릿 유니온(Flit Union)" }],
  creator: "플릿 유니온(Flit Union)",
  publisher: "플릿 유니온(Flit Union)",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://flitunion.com",
    siteName: "플릿 유니온(Flit Union)",
    title: "플릿 유니온(Flit Union) | 행사 대행 · 기획부터 현장 운영·정산까지",
    description:
      "행사 기획·운영부터 푸드트럭·체험부스·플리마켓·무대공연까지 한 번에. 대학 축제·지자체 축제·아파트·기업 행사를 기획부터 정산까지 원스톱 대행.",
  },
  twitter: {
    card: "summary_large_image",
    title: "플릿 유니온(Flit Union) | 행사 대행 · 기획부터 현장 운영·정산까지",
    description:
      "행사 기획·운영부터 푸드트럭·체험부스·플리마켓·무대공연까지 한 번에. 대학 축제·지자체 축제·아파트·기업 행사를 기획부터 정산까지 원스톱 대행.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://flitunion.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
