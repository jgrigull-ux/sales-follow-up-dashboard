# Backfilling missing Salesforce / Gong / Team ID links

Many events have summaries where the **Links** section shows "Not found" or "Not applicable" for Salesforce Account, Gong Call, or Cursor Team ID. The data often exists in Glean and Salesforce; this process re-checks and updates Supabase.

## 1. List calls that need backfill

```bash
node scripts/list-calls-missing-links.mjs           # human-readable summary
node scripts/list-calls-missing-links.mjs --json   # full JSON (calls + uniqueEmails)
```

## 2. For each email: get link data (Glean + Salesforce CLI)

- **Glean (MCP or chat):** Run a single Gong search and Salesforce lookup for the contact email.
  - Gong: `Run exactly this as a single Gong search query... app:gong externalparticipants:"<EMAIL>" ... Then give me the top matching call link.`
  - Salesforce: ask for the primary Account record URL and Account Id for that contact.
- **Salesforce CLI:** With the Account Id, get Cursor Team IDs:
  ```bash
  sf data query --query "SELECT Id__c, Num_Seats__c FROM Cursor_Team__c WHERE Account__c = 'ACCOUNT_ID' AND Subscription_Status__c = 'active' ORDER BY Num_Seats__c DESC NULLS LAST LIMIT 20" --json --target-org jgrigull@anysphere.co
  ```
  If no rows, try without `AND Subscription_Status__c = 'active'`.

## 3. Build the new Links block (markdown)

Use this format (last 30 days: adjust `start_date`/`end_date` to today minus 30 / today):

```markdown
**Links**
- **Salesforce Account:** [Account Name](https://cursor.lightning.force.com/lightning/r/Account/ACCOUNT_ID/view)
- **Gong Call:** [Call title](https://us-4796.app.gong.io/call?id=GONG_ID)
- **Primary Team ID (best guess):** TEAM_ID
- **Any Usage (last 30 days):** [View usage](https://anyusage.fieldsphere.app/?teamId=TEAM_ID&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD)
```

Use "Not found" or "Not applicable" when data is missing.

## 4. Apply updates to Supabase

Create or append to a JSON file (e.g. `scripts/backfill-links-updates.json`) with one object per email:

```json
[
  {
    "email": "contact@company.com",
    "linksBlock": "**Links**\n- **Salesforce Account:** ...\n..."
  }
]
```

Then run:

```bash
node scripts/update-call-links-in-supabase.mjs scripts/backfill-links-updates.json
```

The script replaces only the **Links** section in each matching call’s summary (by email across all dates); Topics / pain point / next steps are left unchanged.

## One-off backfill that was run

- **Telenav** (kumarma@telenav.com), **Franklin Madison** (karthikeyan.senkodi@franklin-madison.com), **Meshy** (eric.li@meshy.ai), **Les Sherpas** (loup.peluso@sherpas.com) were updated with full Salesforce + Gong + Team ID links via Glean + SF CLI and `update-call-links-in-supabase.mjs`.
