import { NextResponse } from "next/server";
import { loadLandingTopTeams } from "@/lib/landing/top-teams";

export async function GET() {
  const data = await loadLandingTopTeams();

  return NextResponse.json(data);
}
