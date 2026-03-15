---
name: post-call-follow-up
description: Given a contact email, find the latest Gong call via a single exact Glean query (app:gong externalparticipants:"email"), find Salesforce account, resolve Cursor Team ID via Salesforce CLI (Cursor_Team__c.Id__c), analyze the call, and produce a structured post-call summary. Use when the user provides a contact email and wants a post-call summary, call recap, or Gong follow-up with topics, pain point, and next steps.
---

# Post Call Follow-Up

Produce a structured post-call summary from a contact email: (1) find the top Gong call using one exact Glean search, (2) find Salesforce account and extract Account Id, (2b) resolve Cursor Team ID via Salesforce CLI from `Cursor_Team__c.Id__c`, (3) extract topics, pain point, and next steps, (4) return the summary in the template below.

## When to Use

- User provides a **contact email** and wants a post-call summary, call recap, or Gong follow-up.
- User wants a summary tied to the **Gong call** (found via the exact search) and **Salesforce account** / **Team ID**.

## Input

- **contactEmail** (required): Email of the person they had the call with (e.g. `partht@zignuts.com`).

## Process

### 1. Find the top Gong call (exact search only)

Use **`mcp_glean_cursor_chat`** with a single `message` that is exactly the text below, with `[EMAIL]` replaced by the contact email (no other changes):

```
Run exactly this as a single Gong search query, don't modify it, don't add filters, and don't rerun with other terms if it returns nothing:
app:gong externalparticipants:"[EMAIL]"
Then give me the top matching call link.
```

- Replace `[EMAIL]` only with the actual contact email.
- Do not add filters, change wording, or run additional Gong searches if the result is empty.
- From the response: capture the **top matching Gong call URL**. If Glean also returns transcript or summary in that reply, capture it for step 3. If not, use Glean chat again in step 3 to get content for that specific call URL.

### 2. Find the matching Salesforce Account and capture Account Id

- Use **Glean** `mcp_glean_cursor_chat` (or search if available) to find the primary **Salesforce Account** record for this contact.
- Capture: **primary Account record URL** (e.g. `https://cursor.lightning.force.com/lightning/r/Account/001Hr00002GgmgaIAB/view`).
- **Extract the Salesforce Account Id** from the URL path (e.g. `001Hr00002GgmgaIAB`). You need this for step 2b.

### 2b. Resolve Cursor Team ID(s) via Salesforce CLI

- Using the **Account Id** from step 2, run the **Salesforce CLI** to get Cursor Team ID(s) from the custom object `Cursor_Team__c`, field `Id__c`.
- **Prerequisite:** Salesforce CLI (`sf`) must be installed and authenticated (e.g. `sf org login web`). If no default org is set, pass `--target-org <username-or-alias>` (e.g. `--target-org jgrigull@anysphere.co`).

**When multiple teams exist for the account (all active):**
- **Fetch all active teams** for the account, ordered by best guess for "primary": active subscription first, then largest seat count. Show **all** active teams in the output, with usage links for **each**.
- **Primary (best guess):** The first row from the ordered result set = primary (active + largest `Num_Seats__c`). Label it clearly in the output. Other rows = additional teams; list them and add a usage link for each.

**Query (all active teams — use this):** If `Cursor_Team__c` has a lookup to Account (e.g. `Account__c`), run:
  ```bash
  sf data query --query "SELECT Id__c, Num_Seats__c FROM Cursor_Team__c WHERE Account__c = 'ACCOUNT_ID' AND Subscription_Status__c = 'active' ORDER BY Num_Seats__c DESC NULLS LAST LIMIT 20" --json
  ```
  Replace `ACCOUNT_ID` with the 18-character Account Id from step 2. Add `--target-org <org>` if needed. Use a reasonable limit (e.g. 20) to get all active teams.
- **Fallback when no active team:** If the query above returns no rows (e.g. all teams are canceled), run the same query without the `Subscription_Status__c` filter but keep `ORDER BY Num_Seats__c DESC NULLS LAST LIMIT 20` to get any team(s); treat the first record as primary, rest as other teams. If still no rows, use **"Not applicable"** for Team IDs in the output.
- **Alternative (relationship on Account):** If the Account has a lookup to `Cursor_Team__c` instead, use the appropriate SOQL that returns all teams with the same ordering logic.
- Parse the CLI JSON output: collect **all** `Id__c` values. **First** record = primary (best guess). **Remaining** records = other team IDs. If the query fails (e.g. wrong relationship or field name), use **"Not applicable"** for Team IDs in the output.
- The Cursor Team value is always **`Cursor_Team__c.Id__c`**. If your org uses different field names (e.g. for status or seats), adjust the SOQL accordingly.

### 3. Get call content and analyze

- If you do not yet have enough call content from step 1, use **`mcp_glean_cursor_chat`** to get the **full transcript or a detailed summary** for the Gong call URL from step 1.
- From the **Gong transcript/summary** and any **Salesforce/Team** context:
  - Extract **3–7 short bullet points** for main topics discussed.
  - Identify the **single most important pain point or challenge** raised by the prospect.
  - List **concrete next steps** (who, what, by when if stated).

### 4. Return structured output

- Present the summary as **readable markdown** using the template below.
- If step 1 returned no Gong call, write **"Not found"** for the Gong Call link and leave Topics / Main pain point / Promised next steps concise or note the gap. Do not invent data.
- **Any Usage links:** When you have one or more Team IDs from step 2b, add a link to the internal usage dashboard **for each team**. Use this URL format with **last 30 days** from the current date:
  - Base URL: `https://anyusage.fieldsphere.app/?teamId=TEAM_ID&start_date=START_DATE&end_date=END_DATE`
  - `end_date` = **today** (YYYY-MM-DD).
  - `start_date` = **today minus 30 days** (YYYY-MM-DD).
  - Example (if today is 2026-03-14): `start_date=2026-02-13`, `end_date=2026-03-14`.
  - **For each Team ID** (primary and any others), output one line: label (e.g. "Primary" or "Team 12345") and the link. If no Team IDs, use **"Not applicable"** for the Any Usage section.

## Output format

Use this structure. Use markdown headings, bullet lists, and links.

```markdown
## Post Call Summary — [Contact name or email]

**Links**
- **Salesforce Account:** [direct link to primary Account, or "Not found"]
- **Gong Call:** [direct link to call from step 1, or "Not found"]
- **Primary Team ID (best guess):** [first Team ID from step 2b — active, largest seat count; or "Not applicable"]
- **Other Team ID(s):** [comma-separated list of remaining active Team IDs; omit this line if only one team]
- **Any Usage (last 30 days):** One link per team. If one team: single link. If multiple: label each (e.g. "**Primary:** 12345 — [View usage](…)" then "**Team 67890:** [View usage](…)"). If no Team IDs: "Not applicable"

---

### Topics discussed
- [3–7 short bullet points]

### Main pain point
[1–2 sentences: the single most important pain point or challenge raised by the prospect]

### Promised next steps
- [Bullet points with who, what, and when if stated]
```

## Example flow

**Input:** `contactEmail: "partht@zignuts.com"`

1. **Glean chat (exact):** Message = `Run exactly this as a single Gong search query... app:gong externalparticipants:"partht@zignuts.com" ... Then give me the top matching call link.` → Capture top call URL (and any transcript/summary).
2. **Glean chat:** Find Salesforce Account for partht@zignuts.com / Zignuts → Capture Account URL and extract Account Id from the path.
3. **Salesforce CLI:** `sf data query --query "SELECT Id__c, Num_Seats__c FROM Cursor_Team__c WHERE Account__c = 'ACCOUNT_ID' AND Subscription_Status__c = 'active' ORDER BY Num_Seats__c DESC NULLS LAST LIMIT 20" --json` (add `--target-org` if no default). Parse JSON: all records' `Id__c` = team list; first = primary (best guess), rest = other teams. For each team, build an Any Usage link (last 30 days). If no rows, fallback query without `Subscription_Status__c`; if still none, "Not applicable".
4. **Glean chat (if needed):** Get transcript or detailed summary for the call URL from step 1.
5. **Synthesize** topics, pain point, next steps; **output** using the template above.

## Tool reference

| Goal | Tool / approach |
|------|------------------|
| Find Gong call | **`mcp_glean_cursor_chat`** with the exact message above (only [EMAIL] substituted). No other Gong queries. |
| Salesforce Account | **`mcp_glean_cursor_chat`** (or Glean search); capture Account URL and extract Account Id from path. |
| Cursor Team ID(s) | **Salesforce CLI** — All active teams: `SELECT Id__c, Num_Seats__c FROM Cursor_Team__c WHERE Account__c = 'ACCOUNT_ID' AND Subscription_Status__c = 'active' ORDER BY Num_Seats__c DESC NULLS LAST LIMIT 20`. First row = primary (best guess), rest = other teams. If no rows, same query without `Subscription_Status__c`; parse all `Id__c`. Use `--target-org` if no default org. |
| Any Usage links | For **each** Team ID (primary + others): `https://anyusage.fieldsphere.app/?teamId=TEAM_ID&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` with `end_date` = today, `start_date` = today minus 30 days. Output one link per team; "Not applicable" if no Team IDs. |
| Call transcript / summary | **`mcp_glean_cursor_chat`** with the call URL if not already returned in step 1 |
| Synthesize and format | Use captured transcript + Salesforce context; output in the template |
