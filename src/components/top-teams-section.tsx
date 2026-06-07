"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Crown, Medal, Trophy, UsersRound } from "lucide-react";
import type { LandingTopTeam, LandingTopTeamsResponse } from "@/lib/landing/top-teams";

const rankStyles = [
  {
    badge: "bg-amber-100 text-amber-800 ring-amber-200",
    icon: "bg-amber-50 text-amber-600",
    border: "border-amber-200 bg-amber-50/45",
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

function formatLeaderName(teamLeader: string | null) {
  return teamLeader ? `@${teamLeader}` : "팀장 정보 없음";
}

function TopTeamCard({ team, index }: { team: LandingTopTeam; index: number }) {
  const style = rankStyles[index] ?? rankStyles[1];

  return (
    <article className={`rounded-lg border p-6 shadow-soft ${style.border}`}>
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${style.icon}`}>
          {team.rank === 1 ? <Crown className="h-6 w-6" /> : <Medal className="h-6 w-6" />}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${style.badge}`}>{team.rank}위</span>
      </div>

      <h3 className="mt-5 truncate text-xl font-bold text-slate-950">{team.teamName}</h3>
      <p className="mt-2 truncate text-sm font-medium text-slate-500">{formatLeaderName(team.teamLeader)}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white/80 p-4">
          <div className="text-2xl font-bold text-slate-950">{team.solved.toLocaleString()}</div>
          <div className="mt-1 text-xs font-medium text-slate-500">해결 문제</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white/80 p-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-slate-950">
            <UsersRound className="h-5 w-5 text-slate-400" />
            {team.memberCount.toLocaleString()}
          </div>
          <div className="mt-1 text-xs font-medium text-slate-500">팀원</div>
        </div>
      </div>
    </article>
  );
}

export function TopTeamsSection() {
  const [teams, setTeams] = useState<LandingTopTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadTeams() {
      try {
        const response = await fetch("/api/landing/top-teams", { cache: "no-store" });
        const payload = (await response.json()) as LandingTopTeamsResponse;

        if (!cancelled) {
          setTeams(Array.isArray(payload.items) ? payload.items : []);
        }
      } catch {
        if (!cancelled) {
          setTeams([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
              <Trophy className="h-4 w-4" />
              Team leaderboard
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              지금 가장 활발한 상위 팀
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              팀별 해결 문제 수를 기준으로 상위 3개 팀을 보여줍니다.
            </p>
          </div>
          <a
            href="#top-teams"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm"
          >
            랭킹 보기
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div id="top-teams" className="mt-10">
          {isLoading ? (
            <div className="grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-56 animate-pulse rounded-lg border border-slate-200 bg-white/70" />
              ))}
            </div>
          ) : teams.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {teams.map((team, index) => (
                <TopTeamCard key={team.teamId} team={team} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-base font-semibold text-slate-800">아직 집계된 팀 랭킹이 없습니다.</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                seed SQL을 실행하거나 팀이 문제를 해결하면 이곳에 상위 3개 팀이 표시됩니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
