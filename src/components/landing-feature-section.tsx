import { Search, ShieldCheck, Target } from "lucide-react";

const featureCards = [
  {
    title: "공개 프로필 분석",
    description:
      "LeetCode username만으로 풀이 수, 언어 통계, 태그별 강점을 한 화면에서 확인합니다.",
    icon: Search,
    className: "bg-blue-50 text-blue-700",
  },
  {
    title: "최근 AC 기반 추천",
    description:
      "최근 Accepted 제출을 확인해 이미 푼 문제를 최대한 제외하고 다음 문제 후보를 골라줍니다.",
    icon: Target,
    className: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "풀이 검증",
    description:
      "titleSlug가 최근 Accepted 제출에 있으면 SOLVED, 없으면 UNKNOWN으로 안전하게 표시합니다.",
    icon: ShieldCheck,
    className: "bg-violet-50 text-violet-700",
  },
];

export function LandingFeatureSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
          풀이 기록을 다음 액션으로 이어지게
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
          Solve Spot은 LeetCode 공개 데이터를 서버에서 안전하게 가져오고,
          추천과 검증 결과를 과장 없이 보여주는 학습 도구입니다.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {featureCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]"
            >
              <Icon className={`h-11 w-11 rounded-lg p-2 ${card.className}`} />
              <h3 className="mt-5 text-xl font-semibold text-slate-950">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
