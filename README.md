# Sales Follow-Up Dashboard

A dashboard that lists your external calls for a given day and shows follow-up resources per call. Each call is represented by one external attendee; summaries are populated by the [post-call-follow-up](.cursor/skills/post-call-follow-up/SKILL.md) skill (Gong, Salesforce, topics, pain point, next steps).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and go to **Friday, March 13, 2026** to see example data.

## Build day data from Google Calendar

Pull external calls for a date using the Google Workspace CLI (`gws`). One representative external attendee per event is written to `data/<date>.json`.

**Prereqs**

- [Google Workspace CLI](https://github.com/googleworkspace/cli) installed and authenticated (`gws` on your PATH).
- Optional: set `INTERNAL_DOMAIN` so attendees from your org are not counted as external (see [.env.example](.env.example)).

**Run**

```bash
node scripts/build-day.mjs 2026-03-13
```

This writes or updates `data/2026-03-13.json` with one row per calendar event (each row has one external attendee). Existing `summary` fields in the JSON are preserved when re-running the script.

## Populating summaries (post-call follow-up)

Summaries come from the **post-call-follow-up** skill, which uses Glean (Gong) and Salesforce CLI. It cannot run inside Vercel.

**Manual**

1. Open the day’s JSON in `data/<date>.json`.
2. In Cursor, run: **“Post call follow up for &lt;email&gt;”** for each call you care about (e.g. `Post call follow up for jane@acme.io`).
3. Paste the returned markdown into the corresponding call’s `summary` field in the JSON.

**Automated (Cursor Cloud Agent)**

1. Run `node scripts/build-day.mjs <today>` to refresh the day’s calls (one attendee per event).
2. For each call (or a subset), invoke the post-call-follow-up skill with that attendee’s email and write the markdown into `calls[i].summary`.
3. Commit `data/YYYY-MM-DD.json` to the repo or upload to storage so the dashboard can read it.

You can limit how many calls get the skill (e.g. first N or only rows with no summary yet).

## Deploy to Vercel

```bash
npm run build
vercel
```

The app reads day data from the `data/` directory at build time. To refresh data in production, run the build script and Cloud Agent flow elsewhere, then commit updated `data/*.json` (or store in Vercel Blob/DB and add an API route that reads from there).

## Config

| Variable | Description |
|----------|-------------|
| `INTERNAL_DOMAIN` | Attendees with this email domain are not treated as external (e.g. `anysphere.co`). |
| `TZ` | Timezone for day bounds in the build script (default: `America/Los_Angeles`). |

See [.env.example](.env.example).
