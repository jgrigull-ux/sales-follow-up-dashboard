# Post-Call Summaries — March 9–12, 2026

External calls from gws (March 9–12); one post-call follow-up per contact.

**Source:** `node scripts/build-day.mjs` for 2026-03-09 through 2026-03-12.  
**Skill:** [.cursor/skills/post-call-follow-up/SKILL.md](.cursor/skills/post-call-follow-up/SKILL.md)  
**List all external emails:** `node scripts/list-external-emails-march-9-12.mjs`  

Completed below: 34 of 34 unique external contacts.

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

## Post Call Summary — Alef Viola (alef.viola@agrotools.com.br)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** Not found
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- No Gong call found for this contact in the search window.

### Main pain point
N/A

### Promised next steps
- N/A

---

## Post Call Summary — Anton (arevich@flow.life)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=5467126540961820000
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Moving Flow Life to the enterprise plan for Cursor; pricing structure, seat cost discounts, pre-commitment for usage.
- Payment options (quarterly, yearly, semi-annual) and effect on discounts.
- Anton requested a usage and cost report to share with leadership.
- Internal tools, dashboard access, and potential for APIs on enterprise plan.
- Coordination via Slack Connect for communication with Flow Life leadership.

### Main pain point
Flow Life leadership is concerned about losing a $20 credit and wants to optimize pricing (ideally $30–$35 per user) and needs clear usage data to decide.

### Promised next steps
- **Jon:** Send Anton a report with cost per user and total expected spend (30/60/90 day usage).
- **Anton:** Share report with Flow Life leadership for internal discussion and pre-commitment amount.
- **Jon:** Coordinate with finance for best discount once Flow Life decides; set up Slack Connect with Flow Life leadership.

---

## Post Call Summary — Ashish Zanwar (ashish.zanwar@freightify.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=4806055016114229103
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Comparison between Cursor and Amazon Q for AI-assisted development.
- Cursor Teams vs. Enterprise (features, pricing, pooled usage, API access, tracking, integration).
- Centralized context sharing, codebase indexing, and agent skills in Cursor.
- Integration with self-hosted GitLab; usage limits, pricing, and overage on Teams.

### Main pain point
Need for a scalable, centralized way to share AI context and track AI-generated code across a distributed microservices architecture, with integration flexibility (especially self-hosted GitLab) and clear usage/cost limits.

### Promised next steps
- **Ashish:** Start with Cursor Teams to evaluate before considering Enterprise.
- **Jon:** Connect Ashish with support for self-hosted GitLab integration via email.
- **Ashish:** Email Jon for further assistance with GitLab setup if needed.

---

## Post Call Summary — Bobby Mitchell (bmitchell@goamur.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=836068571116442240
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Introduction to Cursor and use cases for Salesforce development; comparison with ChatGPT, Codex, Claude, Salesforce Agentforce.
- Security, onboarding, and admin features (Teams vs. Enterprise).
- Integration with Salesforce (permissions, data storage, compliance); pricing (seat-based annual + prepaid usage pool).
- Onboarding, SSO, support; trial logistics and maximizing trial value for GoAmur.

### Main pain point
Ensuring secure, enterprise-grade admin control and integration with Salesforce (access, audit logs, plugin/extension vetting), and understanding how Cursor compares to existing tools and whether it can replace or consolidate AI tool spend.

### Promised next steps
- **GoAmur:** Internally review, discuss with managers, and determine timing for a 30-day enterprise trial.
- **Jon:** Provision trial when GoAmur is ready; assist with onboarding, SSO, and support.
- **Bobby:** Follow up on trial initiation and any further security or technical questions.

---

## Post Call Summary — Boaz (boaz@treedis.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=376846643061666115
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Transitioning Treedis from month-to-month to enterprise subscription for Cursor.
- Pricing: seat cost, usage pool commitment, discounts (seat, Bugbot, token rate); payment options (upfront vs. monthly invoicing), minimums, flexibility.
- Analytics on enterprise: enhanced analytics, API access, custom dashboards, conversation insights, usage breakdowns.

### Main pain point
Treedis wants better analytics and simpler invoicing but is concerned about the large upfront commitment required for enterprise discounts.

### Promised next steps
- **Jon:** Send Boaz three contract options: (1) bare minimum enterprise, (2) minimum commitment for maximum discount (e.g. 40% off seat cost), (3) enterprise with lowest possible upfront payment.
- **Boaz:** Review options with finance team and leadership.

---

## Post Call Summary — Brian Anderson (brian.anderson@uperform.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=2939315589825285508
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Introduction to Cursor; uPerform's current usage (8+ users, Bugbot) and pain with billing (multiple invoices from overages).
- Enterprise vs. Teams: annual commitment, pooled usage, volume discounts, true-up for adding users.
- Seat fees, usage fees, Bugbot discounts; flexibility of month-to-month vs. cost benefits of enterprise; comparison to Claude Teams.

### Main pain point
Complexity and inconvenience of billing on Teams—large number of invoices from usage overages.

### Promised next steps
- **Jon:** Send summary of enterprise plan details and pricing.
- **Brian:** Discuss internally with peer about ramping users and whether annual enterprise makes sense.
- **Customer:** Decide whether to proceed with enterprise or stay on Teams and manage invoice volume.

---

## Post Call Summary — Brian Gonzalez (brian.gonzalez@curri.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=608913767901426953
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Introduction (Jon / Curri CTO Brian); Cursor features: cloud agents, automations, plugins, MCPs, marketplace.
- Teams vs. Enterprise: admin controls, billing, API access; usage analytics, seat management, billing optimization.
- Technical setup and sharing of plugins/MCPs across the organization.

### Main pain point
Need for better admin controls, analytics, and cost optimization as Curri scales—limitations of Teams vs. Enterprise (admin APIs, team-wide plugin management, flexible billing).

### Promised next steps
- **Jon:** Send follow-up docs on Teams vs. Enterprise, pricing, and contract options.
- **Brian:** Review with peers/finance and determine upfront commitment level.
- **Jon:** Facilitate contract and transition to Enterprise if Curri proceeds; potentially set up Slack for support and feedback.

---

## Post Call Summary — Covalense (cds-it@covalensedigital.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=8034743535642547352
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Enterprise vs. team plan: pricing, features, billing; usage pooling, billing groups, admin controls.
- Scalability and phased rollout; analytics, monitoring, model usage controls; security, compliance, SSO.
- Migration from team to enterprise.

### Main pain point
Inability to efficiently manage and optimize usage, cost, and admin controls for a large, variable user base on the team plan—especially when scaling to hundreds of users with diverse usage.

### Promised next steps
- **Jon:** Send follow-up with summary sheet comparing costs and benefits of team vs. enterprise for 7 users.
- **Covalense:** Review and use for internal discussions and approvals.
- **Covalense:** If moving forward, start with a small batch on enterprise and expand; Jon to support migration and rollout.

---

## Post Call Summary — Chanaka (chanaka@orangehrm.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=4609352283190383122
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Cursor team vs. enterprise plans: pricing, usage limits, differences; OrangeHRM's current usage and pain with limits.
- Comparison with competitor (Cloud) pricing and usage; recommendations for optimizing model usage and cost.

### Main pain point
Quickly hitting usage limits and unclear whether enterprise offers more included usage or cost savings vs. current team plan.

### Promised next steps
- **Jon:** Send screenshots of the model usage dashboard to Chanaka.
- **OrangeHRM:** Consider experimenting with cheaper models to optimize spend.
- **OrangeHRM:** Evaluate whether enterprise (admin controls, analytics, API) is worth the higher seat cost for their team size.

---

## Post Call Summary — Dustin Pearson (dustin.pearson@atria.org)

**Links**
- **Salesforce Account:** https://cursor.lightning.force.com/lightning/r/Account/001V400000pUxmwIAC/view
- **Gong Call:** https://us-4796.app.gong.io/call?id=6413569819312105692
- **Primary Team ID (best guess):** 13528881
- **Any Usage (last 30 days):** [View usage](https://anyusage.fieldsphere.app/?teamId=13528881&start_date=2026-02-13&end_date=2026-03-14)

---

### Topics discussed
- HIPAA compliance and PHI exposure with Cursor Cloud Agents; Team vs. Enterprise (compliance, cost).
- Technical and admin options: running agents in customer VPC, hooks to block PHI/PII; limitations and timeline for BAA support.

### Main pain point
Even with workarounds, Cloud Agents still send PHI to the cloud, which is not acceptable for compliance; need BAA support to adopt for their use case.

### Promised next steps
- **Jon:** Check internally and follow up with Atria on timeline for BAA support.
- **Atria:** Review docs on running agents in their own environment (not a full compliance solution).
- **Jon:** Keep Atria notified if BAA support or other compliance options become available.

---

## Post Call Summary — Edvin Curban (edvin.curban@softeh.ro)

**Links**
- **Gong Call:** Not found (no Gong result for this participant).

---

## Post Call Summary — Ettore (ettore@amphoralogistics.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=3823312153792952999
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Introduction between Jon and Ettore, including roles and company backgrounds.
- Overview of Amphora Logistics' current usage of Cursor and upcoming renewal for their yearly teams plan.
- Discussion of pricing model changes: moving from request-based to usage-based pricing, and the implications for cost and control.
- Comparison of individual, team, and enterprise plans, including seat costs, usage pools, and administrative controls.
- Considerations around security, privacy, billing, and team management.
- Potential benefits of the enterprise plan, such as discounts, account support, and access to new features.

### Main pain point
Amphora Logistics is concerned about a significant increase in costs due to the switch from request-based to usage-based pricing, and needs to balance cost control with maintaining administrative oversight and security for their engineering team.

### Promised next steps
- **Jon:** Send Ettore an email outlining the new pricing structure and options for review with their team.
- **Ettore:** Discuss internally with finance controller and founder to determine budget and preferences.
- **Both:** Reconvene in a follow-up meeting next week to review decisions and next steps.

---

## Post Call Summary — Ezequiel Morani (ezequiel.morani@lamercantil.com.ar)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=3167302287746754460
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Introduction of participants and context for the call.
- Overview of Cursor licensing options: ProPlus (individual) vs. Teams plan.
- Details on Teams plan pricing ($40/user/month with $20 included usage per user) and how overages work.
- Clarification on model access (OpenAI, Claude, Gemini) and billing structure.
- Discussion of La Mercantil's use case: starting with 7 users in the infrastructure team, with plans to expand.
- Questions about which plan (individual vs. team) best fits their needs.

### Main pain point
Uncertainty about which licensing model (individual ProPlus vs. Teams) is most cost-effective and suitable for a small but potentially growing team, especially regarding included usage and collaborative features.

### Promised next steps
- **La Mercantil:** Review options internally with their team leader to decide between Teams and individual plans.
- **Jon:** Answer any follow-up questions via email if needed.

---

## Post Call Summary — Felipe Munoz (felipe.munoz@servinformacion.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=5065528789900933584
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Internal tools at Cursor, including meeting note taker, usage calculators, and automations (cloud agents, triggers, webhooks).
- Differences between Teams and Enterprise plans (billing structure, usage restrictions, analytics, and project-based spend control).
- Analytics and ROI tracking capabilities in Cursor, especially for services companies.
- Pricing structure and projected usage/costs for Servinformacion's account.

### Main pain point
Servinformacion is unable to restrict usage/spend per person on their current plan and lacks visibility into detailed usage analytics; they are interested in the Enterprise plan for better spend control and analytics.

### Promised next steps
- **Jon:** Send Felipe a follow-up email with usage projections and analytics for the last 30/60/90 days to help decide on an annual usage commitment.
- **Felipe:** Review with their team and get back to Jon regarding the decision to switch to the Enterprise plan.
- **Jon:** Confirm the process to switch plans is quick and provide contact details for further communication.

---

## Post Call Summary — György Varga (gyorgy.varga@shiwaforce.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=982552022319616354
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Current usage of Cursor within a highly regulated banking environment (OTP Bank Group, Europe).
- Onboarding process and current seat distribution (42 seats, ~40 active users).
- Need for granular control over individual and group spending/usage limits.
- Security and compliance concerns regarding cloud indexing and data storage.
- Overview of Cursor Enterprise plan features: pooled usage, admin controls, contract structure, seat pricing, and volume discounts.
- Expansion flexibility and admin API/dashboard capabilities.

### Main pain point
Lack of granular control over individual/team usage and spending limits in the current plan, especially important due to varying needs across teams and strict regulatory requirements.

### Promised next steps
- **Jon:** Send screenshots and a brief summary via email explaining the enterprise pricing structure, admin features, and usage calculations for internal review at Shiwaforce.

---

## Post Call Summary — Guy Flenner (guy.flenner@novidea.com)

**Links**
- **Gong Call:** Not found (no Gong result for this participant).

---

## Post Call Summary — Ilia (ilia@hermeneutic.investments)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=5010718042424283566
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Differences between Cursor's Teams and Enterprise plans (billing structure, pooled usage, seat cost, feature access).
- Analytics API, conversation insights, and admin/security controls (model/MTP/repo access, audit logs, hooks).
- Plugin/marketplace features and organizational automation.
- Cost modeling for different user counts and discount structures.
- Regional processing options and AWS infrastructure.
- Admin controls for model access and custom model deployment.

### Main pain point
Evaluating whether to move from Teams to Enterprise—seeking clarity on cost structure, pooled usage benefits, admin/security controls, and whether Enterprise provides enough additional value for their usage pattern and team size.

### Promised next steps
- **Jon:** Send a detailed cost breakdown (30/60/90 day usage trends, individual names redacted).
- **Jon:** Share documentation on audit logs and relevant admin controls.
- **Jon:** Raise a ticket regarding ability to deploy custom models at the admin level for all users.
- **Jon:** Follow up via email with the requested information.

---

## Post Call Summary — Imga (imga@rushstreetinteractive.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=8127352102732680026
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Introduction and background; Mehmet's role and team structure at Rush Street Interactive.
- Current AI tool usage (Cursor, Copilot, Cloud Code) and organizational AI strategy.
- Security, legal, and regulatory requirements for AI tools (data privacy, auditability).
- Examples of similar customers in online gaming (Flutter, FanDuel, DraftKings, SuperPlay, Playtika).
- Cursor enterprise features: audit logs, hooks for security, ability to block certain MCPs, double-encrypted vector embeddings for codebase search.
- Cursor's zero retention/training policy and security documentation (trust center).
- Cursor CLI and automation features; comparison with Cloud Code.
- Plan mode, mermaid diagrams, screenshot analysis.

### Main pain point
Need for robust security, legal, and regulatory assurances to satisfy internal and external (regulator) requirements before wider adoption—auditability, data privacy, and clear documentation for legal/security review.

### Promised next steps
- **Jon:** Provide security and legal documentation (trust center, MSA, DPA) for Mehmet to share with legal and security teams.
- **Mehmet:** Direct further legal/security questions to Jon.
- **After internal approval:** Discuss structuring an enterprise agreement and contract for wider rollout.

---

## Post Call Summary — John Thompson (john.thompson@idahosif.org)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=3618954834583548814
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Introduction and context about Idaho SIF's structure and current use of Cursor.
- Evaluation of Cursor vs. Kiro and other IDE options; focus on enterprise controls and security.
- Licensing, minimum contract requirements, and features in Cursor Enterprise (model blocking, MTP/plugin controls, administrative scaffolding).
- Comparison of plan mode and spec-driven development in Cursor vs. Kiro.
- Code review challenges with AI-generated code; introduction of Cursor's Bugbot tool.
- Pricing details for enterprise and code review tools.

### Main pain point
Idaho SIF wants strong security and administrative controls for a small team (12 developers)—ability to lock down add-ons/plugins, protect data, and enforce enterprise coding standards—without the overhead of a large enterprise contract.

### Promised next steps
- **Jon:** Send John an email with breakdown of costs and details about enterprise controls/features.
- **Idaho SIF:** Review and may trial both Cursor and Kiro further before final decision.
- **Jon:** Address any further security or feasibility questions from Idaho SIF's enterprise architect via email.

---

## Post Call Summary — Ken Cavanagh (ken.cavanagh@glean.com)

**Links**
- **Gong Call:** Not found (no Gong result for this participant).

---

## Post Call Summary — Kazuhiro Takaya (k.takaya.6f@future.co.jp)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=2055250026142247229
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Initial introductions between Jon and Kazuhiro.
- Communication challenges due to language barrier (Japanese/English).
- Attempted to use Zoom translation and caption features to facilitate conversation.
- Discussion about how to enable and configure translation/caption settings in Zoom.

### Main pain point
Difficulty in establishing effective real-time communication due to lack of familiarity with Zoom's translation/caption tools and language differences.

### Promised next steps
- Agreed to try communicating via email as an alternative to resolve translation issues.
- Both parties acknowledged the technical limitations and decided to follow up outside the meeting.

---

## Post Call Summary — M. Almadhoun (m.almadhoun@walaplus.com)

**Links**
- **Gong Call:** Not found (no Gong result for this participant).

---

## Post Call Summary — Matt Hellwinkel (mhellwinkel@figure.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=4013401813661897858
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Overview of Figure's current usage of Cursor and Bugbot, including billing structure and user activity.
- Exploration of Cursor Enterprise features: billing, analytics, model restrictions, environment setup, and automations.
- Discussion of enterprise contract structure, seat pricing, discounts, and onboarding process for new users.
- Value of analytics and ROI visibility for public companies.
- Technical enablement: setting up environments, using MCPs, plugins, and cloud agents.

### Main pain point
Difficulty managing and predicting billing/usage due to lack of granular controls and model restrictions, leading to unexpected overages when new models are adopted by teams; need for better analytics and visibility to justify ROI and support internal reporting.

### Promised next steps
- **Jon:** Send a follow-up email with detailed breakdown: 30/60/90 day usage trends, enterprise benefits, discount structure (including Bugbot), and commercial terms.
- **Figure:** Review the proposal and decide on usage commitment and contract structure.
- **Jon:** Once comfortable, coordinate with finance for discounts and facilitate the backend process for switching to enterprise.
- **Jon:** Offer to connect Figure with field engineering for technical enablement and environment setup support.

---

## Post Call Summary — Milan Pandey (milan.pandey@oxanepartners.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=3254916744759415955
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Review of Oxane's trial usage data and user engagement.
- Discussion of pricing and cost structure for moving forward with 50 or more users.
- Explanation of discounting based on committed usage per user.
- Details on billing cycles (annual contract, upfront payment, quarterly true-up for new users, monthly arrears for additional usage).
- Process for contract execution and purchase order requirements.

### Main pain point
Oxane wanted clarity on the onboarding process, cost structure for different user counts, and how usage pooling and billing would work as they scale up.

### Promised next steps
- **Jon:** Send a contract for 50 users at $50/user/month, with the option to add more users later.
- **Milan:** Get the contract signed and arrange for a purchase order as required by their organization.
- **Jon:** Once the contract is signed, convert Oxane's team to an enterprise contract and attach the PO to the order form if needed.

---

## Post Call Summary — Rita (rita@revenuecat.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=6928443963149396117
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Overview of Cursor's enterprise contract structure (annual, upfront payment, seat count, usage pool).
- Pricing, discount levers, and how seat and usage fees are determined.
- Usage patterns and model selection (Opus, Sonnet, Composer, Auto).
- Bugbot licensing and discounting.
- Process for adding/removing users and quarterly true-ups.
- Access to usage data and potential for API integration.

### Main pain point
RevenueCat needs clarity on contract structure, pricing, and how to optimize costs (especially around usage and model selection).

### Promised next steps
- **RevenueCat:** Confirm seat count and desired usage commitment.
- **Jon:** Return with best pricing/discounting options once those numbers are provided.
- **RevenueCat:** Discuss internally and follow up with their decisions.

---

## Post Call Summary — Scott Bennett (scott.bennett@labor.idaho.gov)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=1288017574329266875
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Introduction to Cursor and its commercial offerings.
- Idaho Department of Labor's software development environment and needs.
- Evaluation of AI coding tools (Cursor, GitHub Copilot, etc.).
- Security and compliance requirements for government agencies (FedRAMP, SOC2, data residency, etc.).
- Differences between Cursor Teams and Enterprise plans.
- Data access, storage, and security posture (vector embeddings, no code/data retention).
- Mechanisms for enforcing architectural standards and code consistency.
- Modernizing legacy applications and using AI for refactoring.
- Availability of best practices, workshops, and trust center resources.

### Main pain point
Ensuring proper security and compliance for a government agency—protecting sensitive data and understanding how Cursor can be configured to meet these requirements without unnecessary complexity or cost.

### Promised next steps
- **Jon:** Provided links to a YouTube video on refactoring legacy codebases and to the Cursor workshops portal for best practices.
- **Jon:** Shared the Cursor trust center link for detailed security and compliance information.
- **Recommendation:** Start with the Teams plan and only consider Enterprise if stricter controls or issues arise.
- **Jon:** Offered to assist further if any security or compliance issues come up.

---

## Post Call Summary — Shashank Shetti (shashank.shetti@pgn.com)

**Links**
- **Gong Call:** Not found (no Gong result for this participant).

---

## Post Call Summary — Spanchan (spanchan@picarro.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=7602300776275962607
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Review of Picarro's Cursor contract, usage benchmarks, and adoption rates compared to industry peers.
- Discussion of true-up process, seat counts, and financial planning for the next contract period.
- Options for contract restructuring, including potential discounts, usage commitments, and payment structures.
- Analysis of active user numbers, usage patterns, and strategies for optimizing spend.
- Comparison between team and enterprise plans, and implications for support and enablement.

### Main pain point
Picarro is experiencing higher-than-expected Cursor usage and associated costs, leading to concerns about budget overruns and the need to right-size their contract; uncertainty about how to optimize seat counts, manage true-ups, and balance upfront commitments versus monthly spend.

### Promised next steps
- **Jon:** Provide a list of active users and recommendations on who to keep for the true-up.
- **Picarro:** Review user/project alignment and decide on seat reductions (ramping down from ~92 to ~58–70 users).
- **Both:** Revisit contract options and financial commitments mid-year, after internal budget reviews.
- **Jon:** Clarify expected monthly costs, true-up timing, and provide ongoing support for contract management and enablement.

---

## Post Call Summary — Yoav Tzipori (yoav.tzipori@immunai.com)

**Links**
- **Salesforce Account:** Not found
- **Gong Call:** https://us-4796.app.gong.io/call?id=8505113748733708830
- **Primary Team ID (best guess):** Not applicable
- **Any Usage (last 30 days):** Not applicable

---

### Topics discussed
- Structure and requirements of the Cursor enterprise plan, including minimum contract value and seat/usage breakdown.
- Lack of a monthly enterprise option; only yearly contracts are available.
- Flexibility in initial commitment size and options for adding users or usage over time.
- Cost optimization strategies within the enterprise plan (e.g., blocking models, setting individual spend limits, usage analytics).
- Process for contract amendments and quarterly true-ups for additional users.

### Main pain point
Immunai's concern about the high upfront commitment required for the yearly enterprise plan and desire for a more flexible or lower initial commitment.

### Promised next steps
- **Jon:** Send a contract proposal based on the minimum commitment (starting with 38 or 40 users, or a lower number if preferred).
- **Jon:** Provide a written summary explaining how the enterprise plan can help Immunai optimize costs and usage, for internal management review.
- **Immunai:** Analyze the proposal internally and confirm the preferred number of seats before proceeding.

---
