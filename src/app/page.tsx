import { TopTeamsSection } from "@/components/top-teams-section";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden text-slate-950">
      <section className="px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">LeetPro Landing</p>
            <h1 className="mt-5 text-5xl font-bold leading-[1.1] tracking-normal text-slate-950 sm:text-6xl">
              팀의 문제 해결 흐름을 한눈에 보여주세요
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              랜딩 페이지는 상위 팀 3위만 간결하게 보여줍니다. 데이터는 로컬 Route Handler를 통해
              Supabase에서 가져옵니다.
            </p>
          </div>
        </div>
      </section>
      <TopTeamsSection />
    </main>
  );
}
