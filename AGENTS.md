# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a **Sales Follow-Up Dashboard** — a Next.js 14 app that displays daily external sales calls with post-call summaries (Gong, Salesforce links, topics, pain points, next steps). Data lives in a Supabase `calls` table; follow-up completion state is tracked in browser localStorage.

### Services

| Service | How to run | Notes |
|---------|-----------|-------|
| Next.js dev server | `npm run dev` (port 3000) | Requires `.env.local` with Supabase credentials |
| Supabase (cloud) | Already provisioned | Project `ocnqakzsipaojnbivhxg`; `calls` table pre-seeded with 55 rows |

### Environment variables

The app requires `.env.local` at the repo root with:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase key (anon key works since RLS is disabled on the `calls` table)

### Lint / Build / Dev

Standard commands from `package.json`:
- **Lint:** `npm run lint`
- **Build:** `npm run build`
- **Dev:** `npm run dev`

### External CLIs

Two external CLIs are used by data pipeline scripts and the post-call-follow-up skill:

- **Google Workspace CLI (`gws`)** — used by `scripts/build-day.mjs` to pull calendar events. Install: `npm install -g @googleworkspace/cli`. Requires authentication (`gws auth login`) before use.
- **Salesforce CLI (`sf`)** — used by the post-call-follow-up skill to look up accounts/team IDs. Install: `npm install -g @salesforce/cli`. Requires authentication (`sf org login web`) before use.

Both CLIs require separate authentication that cannot be automated in the update script.

### Non-obvious caveats

- `next lint` requires an `.eslintrc.json` file to run non-interactively. If missing, create one with `{"extends": "next/core-web-vitals"}`.
- The `calls` table has RLS disabled, so the Supabase anon key (from `get_publishable_keys`) can be used in place of the service role key for local development.
- Data seeding (`npm run seed-supabase`) reads from `data/*.json` files and upserts to Supabase. The database is already pre-seeded; re-running is safe (upserts are idempotent).
- Follow-up completion tracking uses browser `localStorage`, not the database. Clearing browser data resets completion state.
