import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { InterviewValueSection } from "@/components/interview-value-section";
import { LandingFeatureSection } from "@/components/landing-feature-section";
import { TeamLeaderboardSection } from "@/components/team-leaderboard-section";
import type { LandingTopTeam } from "@/lib/landing/top-teams";
import heroImage from "@/images/landing-back.png";

type LandingPageProps = {
  topTeams?: LandingTopTeam[];
};

export function LandingPage({ topTeams = [] }: LandingPageProps) {
  return (
    <main className="overflow-hidden text-slate-950">
      <section className="relative min-h-[960px] overflow-hidden px-4 pt-28 text-center sm:min-h-[1040px] sm:px-6 lg:min-h-[1180px] lg:px-8">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.15] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            LeetCode 풀이를 분석하고
            <br className="hidden sm:block" />
            다음 문제를 추천받으세요
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            공개 username만 입력하면 풀이 기록, 언어 통계, 태그별 강점, 최근 Accepted 기반 추천까지 바로 확인할 수 있습니다.
          </p>

          <form
            action="/leetcode-api"
            className="mt-9 flex w-full max-w-2xl flex-col gap-3 rounded-lg border border-slate-200 bg-white/88 p-2 shadow-[0_20px_70px_rgba(37,99,235,0.12)] backdrop-blur sm:flex-row"
          >
            <label className="sr-only" htmlFor="leetcode-username">
              LeetCode username
            </label>
            <input
              id="leetcode-username"
              name="username"
              placeholder="LeetCode username"
              className="min-h-12 flex-1 rounded-md border border-transparent bg-transparent px-4 text-base text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-200 focus:bg-white"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              분석 시작
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-4 text-sm font-medium text-slate-500">
            로그인 없이 공개 프로필부터 먼저 확인할 수 있습니다.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-1/2 bottom-0 z-0 w-screen max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]">
          <Image
            src={heroImage}
            alt="코딩 학습과 LeetCode 분석을 표현한 3D 오브젝트"
            priority
            className="h-auto w-full select-none"
            sizes="100vw"
          />
        </div>
      </section>

      <LandingFeatureSection />
      <TeamLeaderboardSection topTeams={topTeams} />
      <InterviewValueSection />
    </main>
  );
}
