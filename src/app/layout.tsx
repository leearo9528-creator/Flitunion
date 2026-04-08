import type { Metadata } from "next";
import { Geist } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "플릿 유니온(Flit Union) | 플리마켓 운영 대행 및 유휴공간 수익화 솔루션",
  description:
    "플릿 셀러 네트워크 기반의 플리마켓 운영 대행 전문 기업. 대학교 축제, 대형 카페, 유휴공간 맞춤형 플리마켓 기획. 셀러 모집부터 현장 운영까지 원스톱 대행.",
  keywords: [
    "플리마켓 운영 대행",
    "대학교 축제 기획",
    "유휴공간 활용",
    "대형 카페 이벤트",
    "팝업스토어 기획",
    "플리마켓 업체",
    "마켓 운영",
    "공간 수익화",
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
    title: "플릿 유니온(Flit Union) | 플리마켓 운영 대행 및 유휴공간 수익화 솔루션",
    description:
      "플릿 셀러 네트워크 기반의 플리마켓 운영 대행 전문 기업. 대학교 축제, 대형 카페, 유휴공간 맞춤형 플리마켓 기획.",
  },
  twitter: {
    card: "summary_large_image",
    title: "플릿 유니온(Flit Union) | 플리마켓 운영 대행 및 유휴공간 수익화 솔루션",
    description:
      "플릿 셀러 네트워크 기반의 플리마켓 운영 대행 전문 기업. 대학교 축제, 대형 카페, 유휴공간 맞춤형 플리마켓 기획.",
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
