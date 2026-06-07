# LeetPro Landing Page

Minimal standalone Next.js landing page that shows only the top 3 teams leaderboard.

## Included

- Landing UI for top teams
- `GET /api/landing/top-teams`
- Supabase query logic for `team` and `team_members`
- Minimal SQL schema and seed data in `database/landing_top_teams_seed.sql`

## Environment

Copy `.env.example` to `.env.local` and fill in the values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`SUPABASE_SERVICE_ROLE_KEY` is recommended because the public landing API reads leaderboard rows server-side while returning only limited fields to the browser.

## Run

```bash
npm install
npm run dev
```
