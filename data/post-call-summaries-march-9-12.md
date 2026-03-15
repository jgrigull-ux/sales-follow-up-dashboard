# Post-Call Summaries — March 9–12, 2026

External calls from gws (March 9–12); one post-call follow-up per contact.

**Source:** `node scripts/build-day.mjs` for 2026-03-09 through 2026-03-12.  
**Skill:** [.cursor/skills/post-call-follow-up/SKILL.md](.cursor/skills/post-call-follow-up/SKILL.md)  
**List all external emails:** `node scripts/list-external-emails-march-9-12.mjs`  

Completed below: 5 of 34 unique external contacts. To run the skill for the rest in Cursor, say: **"Post call follow up for &lt;email&gt;"** for each email from the script output.

---

## Post Call Summary — Nir Edelman (nir.edelman@fundbox.com)

**Links**
- **Salesforce Account:** https://cursor.lightning.force.com/lightning/r/Account/001Hr00002HQYmJIAX/view
- **Gong Call:** https://us-4796.app.gong.io/call?id=2140883952741072660
- **Primary Team ID (best guess):** 3065293
- **Any Usage (last 30 days):** [View usage](https://anyusage.fieldsphere.app/?teamId=3065293&start_date=2026-02-13&end_date=2026-03-14)

---

### Topics discussed
- Fundbox's large-scale migration from AngularJS/Vue to React (motivations, progress, architectural decisions: full rebuild vs. incremental migration).
- Best practices for using Cursor agents and subagents for code migration, planning, and delegation.
- AI model selection (Opus, Codex, Gemini) for efficiency, cost, and quality in migration.
- Technical challenges: context management, planning, breaking down work for agents.
- Sharing and standardizing skills, rules, and plugins across the team.
- Enablement and troubleshooting of Cursor features (multi-model, subagents, admin permissions).

### Main pain point
Breaking down and delegating complex migration tasks with Cursor’s planning and subagent features while managing context, avoiding redundant work, and keeping quality and consistency across a large, fast-changing codebase.

### Promised next steps
- **Jon Grigull:** Check with Fundbox admins on enabling multi-model and subagent features; facilitate follow-up as needed.
- **Chris Diaz:** Send documentation/examples on migration best practices (strangler pattern, full rebuild) and links to internal plugins/skills (target: later that afternoon).
- **Fundbox team:** Start using subagents and plans in their workflow for delegation and scaling.
- **All:** Stay in touch for further enablement or deeper dives on Cursor features.

---

## Post Call Summary — Sebastien Loos (sebastien.loos@quodfinancial.com)

**Links**
- **Salesforce Account:** https://cursor.lightning.force.com/lightning/r/Account/001Hr00002CS8ZPIA1/view (Geojit Technologies — contact linked here)
- **Gong Call:** https://us-4796.app.gong.io/call?id=1508604209453665885
- **Primary Team ID (best guess):** 11685857
- **Any Usage (last 30 days):** [View usage](https://anyusage.fieldsphere.app/?teamId=11685857&start_date=2026-02-13&end_date=2026-03-14)

---

### Topics discussed
- Comparison between Cursor Teams and Enterprise plans for Geojit Technologies (QUOD Financial).
- Pricing models, usage patterns, and contract structuring (seat costs, pooled usage, discounts).
- Administrative and security controls: Enterprise vs. Teams.
- Strategies for right-sizing the contract and managing underutilized licenses.

### Main pain point
Cost inefficiency and lack of flexibility on the current Teams plan: inability to allocate more usage to the most active users without increasing cost for the whole team, leading to wasted budget on inactive users and difficulty justifying Enterprise.

### Promised next steps
- **Jon:** Send follow-up with discussed pricing and contract structure details.
- **Customer:** Consider starting with a smaller number of active users (e.g. 40), higher per-user usage pool, and quarterly true-ups to add users only if they become active.
- **Customer:** Review budget and decide whether to right-size on Teams or move to Enterprise with a tailored user count and usage commitment.

---

## Post Call Summary — Zachary Drillings (zachary.drillings@atria.org)

**Links**
- **Salesforce Account:** https://cursor.lightning.force.com/lightning/r/Account/001V400000pUxmwIAC/view
- **Gong Call:** https://us-4796.app.gong.io/call?id=6413569819312105692
- **Primary Team ID (best guess):** 13528881
- **Any Usage (last 30 days):** [View usage](https://anyusage.fieldsphere.app/?teamId=13528881&start_date=2026-02-13&end_date=2026-03-14)

---

### Topics discussed
- HIPAA compliance and need for a BAA (Business Associate Agreement) to handle PHI when using Cursor Cloud Agents.
- Differences between Cursor Team and Enterprise plans (compliance, cost, admin).
- Technical workarounds: running cloud agents in the customer’s own environment, hooks to block PHI/PII.

### Main pain point
Inability to sign a BAA with Cursor, which blocks Atria from fully using cloud agents for production debugging due to PHI compliance risk.

### Promised next steps
- **Jon:** Check internally and follow up on timeline for BAA support (last estimate ~5–6 months).
- **Customer:** Review documentation on running cloud agents in their own environment and assess if the beta meets compliance needs.
- **Jon:** Keep customer informed if BAA support or other compliance options become available.

---

## Post Call Summary — Khalid Imam (khalid@geekyants.com)

**Links**
- **Salesforce Account:** https://cursor.lightning.force.com/lightning/r/Account/001Hr00002CS8ZBIA1/view
- **Gong Call:** https://us-4796.app.gong.io/call?id=6933993496555286097
- **Primary Team ID (best guess):** 12986153
- **Other Team ID(s):** 15786173
- **Any Usage (last 30 days):** **Primary:** [View usage](https://anyusage.fieldsphere.app/?teamId=12986153&start_date=2026-02-13&end_date=2026-03-14) · **Team 15786173:** [View usage](https://anyusage.fieldsphere.app/?teamId=15786173&start_date=2026-02-13&end_date=2026-03-14)

---

### Topics discussed
- Cursor pricing and plan structures (Individual, Teams, Enterprise).
- Usage limits, overages, and billing.
- Enterprise licensing for 100 users (seat and usage costs).
- Flexibility for adding users and quarterly billing adjustments.

### Main pain point
Frequent overage charges and invoice generation on the current plan, driving interest in a more predictable, scalable enterprise solution for 100+ users.

### Promised next steps
- **Jon:** Send a quotation for the minimum enterprise contract for 100 users.
- **Customer:** Review the quotation with management and decide on moving forward with the enterprise plan.

---

## Post Call Summary — Natalia Charniauski (natalia.charniauski@prove.com)

**Links**
- **Salesforce Account:** https://cursor.lightning.force.com/lightning/r/Account/001Hr00002FDvGDIA1/view
- **Gong Call:** https://us-4796.app.gong.io/call?id=9111176980717327189
- **Primary Team ID (best guess):** 14370013
- **Any Usage (last 30 days):** [View usage](https://anyusage.fieldsphere.app/?teamId=14370013&start_date=2026-02-13&end_date=2026-03-14)

---

### Topics discussed
- Potential upgrade from Cursor Teams to Enterprise for Prove.
- Current seat usage, cost structure, benefits of pooled tokens and admin controls at Enterprise.
- True-up process, discounting, and billing/payment terms.
- Procurement and finance requirements (quarterly billing, net 60 terms).

### Main pain point
Inefficiency and cost from unused seats and lack of pooled usage on Teams, leading to wasted spend and administrative complexity.

### Promised next steps
- **Jon:** Send a detailed table with contract scoping calculator numbers and a written explanation of the true-up process; confirm net 60 payment terms with deal desk.
- **Prove:** Internally review the numbers, decide on user commitment size, and provide feedback on preferred structure and requirements.

---
