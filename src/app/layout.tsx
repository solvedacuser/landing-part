import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeetPro Landing",
  description: "상위 팀 랭킹을 보여주는 LeetPro 랜딩 페이지입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
