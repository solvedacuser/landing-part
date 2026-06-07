import { LandingPage } from "@/components/landing-page";
import { loadLandingTopTeams } from "@/lib/landing/top-teams";

export default async function HomePage() {
  const { items: topTeams } = await loadLandingTopTeams();

  return <LandingPage topTeams={topTeams} />;
}
