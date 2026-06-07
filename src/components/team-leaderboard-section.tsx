import Link from "next/link";
import { ArrowRight, Crown, Medal, Trophy, UsersRound } from "lucide-react";
import type { LandingTopTeam } from "@/lib/landing/top-teams";

const rankStyles = [
  {
    badge: "bg-amber-100 text-amber-800 ring-amber-200",
    icon: "bg-amber-50 text-amber-600",
    border: "border-amber-200 bg-amber-50/40",
  },
  {
    badge: "bg-slate-100 text-slate-700 ring-slate-200",
    icon: "bg-slate-100 text-slate-600",
    border: "border-slate-200 bg-white",
  },
  {
    badge: "bg-orange-100 text-orange-800 ring-orange-200",
    icon: "bg-orange-50 text-orange-600",
    border: "border-orange-100 bg-white",
  },
];

type TeamLeaderboardSectionProps = {
  topTeams: LandingTopTeam[];
};

function formatLeaderName(teamLeader: string | null) {
  return teamLeader ? `@${teamLeader}` : "리더 정보 없음";
}

export function TeamLeaderboardSection({
  topTeams,
}: TeamLeaderboardSectionProps) {
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
              <Trophy className="h-4 w-4" />
              Team leaderboard
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              지금 가장 많이 푼 상위 팀
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              팀별 해결 문제 수를 기준으로 상위 3개 팀을 보여줍니다.
            </p>
          </div>
          <Link
            href="/teams"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
          >
            전체 팀 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {topTeams.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {topTeams.map((team, index) => {
              const style = rankStyles[index] ?? rankStyles[1];

              return (
                <article
                  key={team.teamId}
                  className={`rounded-lg border p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] ${style.border}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${style.icon}`}
                    >
                      {team.rank === 1 ? (
                        <Crown className="h-6 w-6" />
                      ) : (
                        <Medal className="h-6 w-6" />
                      )}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${style.badge}`}
                    >
                      {team.rank}위
                    </span>
                  </div>

                  <h3 className="mt-5 truncate text-xl font-bold text-slate-950">
                    {team.teamName}
                  </h3>
                  <p className="mt-2 truncate text-sm font-medium text-slate-500">
                    {formatLeaderName(team.teamLeader)}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-slate-200 bg-white/80 p-4">
                      <div className="text-2xl font-bold text-slate-950">
                        {team.solved.toLocaleString()}
                      </div>
                      <div className="mt-1 text-xs font-medium text-slate-500">
                        해결 문제
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white/80 p-4">
                      <div className="flex items-center gap-2 text-2xl font-bold text-slate-950">
                        <UsersRound className="h-5 w-5 text-slate-400" />
                        {team.memberCount.toLocaleString()}
                      </div>
                      <div className="mt-1 text-xs font-medium text-slate-500">
                        팀원
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-base font-semibold text-slate-800">
              아직 집계된 팀 랭킹이 없습니다.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              팀에서 문제를 해결하면 상위 3개 팀이 표시됩니다.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
