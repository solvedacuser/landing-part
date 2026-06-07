import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const TOP_TEAM_LIMIT = 3;

const topTeamRowSchema = z.object({
  rid: z.number().int().positive(),
  teamName: z.string().nullable(),
  teamLeader: z.string().nullable(),
  UserList: z.array(z.unknown()).nullable(),
  solved: z.number().int().min(0).nullable(),
});

const teamMemberRowSchema = z.object({
  team_id: z.number().int().positive(),
});

export const landingTopTeamSchema = z.object({
  rank: z.number().int().min(1).max(TOP_TEAM_LIMIT),
  teamId: z.number().int().positive(),
  teamName: z.string().min(1),
  teamLeader: z.string().nullable(),
  solved: z.number().int().min(0),
  memberCount: z.number().int().min(0),
});

export const landingTopTeamsResponseSchema = z.object({
  items: z.array(landingTopTeamSchema).max(TOP_TEAM_LIMIT),
});

export type LandingTopTeam = z.infer<typeof landingTopTeamSchema>;
export type LandingTopTeamsResponse = z.infer<typeof landingTopTeamsResponseSchema>;

type SupabaseError = {
  message: string;
};

function createLandingSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  const key = serviceRoleKey || publishableKey;

  if (!supabaseUrl || !key) {
    return null;
  }

  return createClient(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function legacyMemberCount(userList: unknown[] | null) {
  return (userList?.length ?? 0) + 1;
}

function logLandingError(message: string, error: SupabaseError | null) {
  if (error) {
    console.error(message, error.message);
  }
}

export async function loadLandingTopTeams(): Promise<LandingTopTeamsResponse> {
  const supabase = createLandingSupabaseClient();

  if (!supabase) {
    return { items: [] };
  }

  const { data: teams, error: teamError } = await supabase
    .from("team")
    .select("rid, teamName, teamLeader, UserList, solved")
    .eq("isActivated", 1)
    .order("solved", { ascending: false })
    .order("createdAt", { ascending: true })
    .limit(TOP_TEAM_LIMIT);

  if (teamError) {
    logLandingError("Failed to load landing teams.", teamError);
    return { items: [] };
  }

  const teamRows = (teams ?? []).map((row) => topTeamRowSchema.parse(row));
  const teamIds = teamRows.map((row) => row.rid);
  const memberCounts = new Map<number, number>();

  if (teamIds.length > 0) {
    const { data: members, error: memberError } = await supabase
      .from("team_members")
      .select("team_id")
      .in("team_id", teamIds);

    if (memberError) {
      logLandingError("Failed to load landing team members.", memberError);
    } else {
      for (const member of members ?? []) {
        const row = teamMemberRowSchema.parse(member);
        memberCounts.set(row.team_id, (memberCounts.get(row.team_id) ?? 0) + 1);
      }
    }
  }

  const items = teamRows.map((team, index) =>
    landingTopTeamSchema.parse({
      rank: index + 1,
      teamId: team.rid,
      teamName: team.teamName?.trim() || `Team #${team.rid}`,
      teamLeader: team.teamLeader?.trim() || null,
      solved: team.solved ?? 0,
      memberCount: memberCounts.get(team.rid) ?? legacyMemberCount(team.UserList),
    }),
  );

  return landingTopTeamsResponseSchema.parse({ items });
}
