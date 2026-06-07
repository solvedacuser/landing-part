import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "SolveSpot Landing",
  description: "LeetCode 풀이 기록과 팀 랭킹을 보여주는 Solve Spot 랜딩 페이지입니다.",
};

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  return (
    <html lang="ko" className={`${headingFont.variable} ${monoFont.variable}`}>
      <body className="font-sans text-ink antialiased">
        <div className="noise-overlay" />
        <SiteNav
          isAuthenticated={Boolean(user)}
          userEmail={user?.email}
          displayName={profile?.display_name}
        />
        {children}

        <Footer />
      </body>
    </html>
  );
}
