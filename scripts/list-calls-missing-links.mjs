#!/usr/bin/env node
/**
 * List calls in Supabase where the summary has missing links:
 * - "Not found" (Salesforce or Gong)
 * - "Not applicable" (Team ID / Any Usage)
 * Excludes internal meetings (N/A (internal)).
 *
 * Usage: node scripts/list-calls-missing-links.mjs [--json]
 * Env:   .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *
 * With --json: output full JSON. Without: human-readable summary + unique emails.
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

dotenv.config({ path: join(ROOT, '.env.local') });

function hasMissingLinks(summary) {
  if (!summary || typeof summary !== 'string') return false;
  const s = summary;
  if (s.includes('N/A (internal)')) return false;
  return (
    s.includes('Not found') ||
    s.includes('Not applicable') ||
    /Gong Call:\*\*\s*(Not found|Not applicable)/i.test(s) ||
    /Salesforce Account:\*\*\s*(Not found|Not applicable)/i.test(s) ||
    /Primary Team ID.*Not applicable/i.test(s) ||
    /Any Usage.*Not applicable/i.test(s)
  );
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);
  const { data: rows, error } = await supabase
    .from('calls')
    .select('date, email, event_title, summary')
    .not('summary', 'is', null);

  if (error) {
    console.error('Supabase error:', error.message);
    process.exit(1);
  }

  const calls = (rows || []).filter((r) => hasMissingLinks(r.summary));
  const uniqueEmails = [...new Set(calls.map((c) => c.email))];

  const out = { calls, uniqueEmails };
  const jsonOut = process.argv.includes('--json');

  if (jsonOut) {
    console.log(JSON.stringify(out, null, 2));
  } else {
    console.log(`Calls with missing links: ${calls.length}`);
    console.log(`Unique emails to backfill: ${uniqueEmails.length}`);
    console.log('');
    console.log('Unique emails:');
    uniqueEmails.forEach((e) => console.log(' ', e));
    console.log('');
    console.log('By date:');
    const byDate = {};
    for (const c of calls) {
      byDate[c.date] = byDate[c.date] || [];
      byDate[c.date].push({ email: c.email, event_title: c.event_title });
    }
    for (const [date, list] of Object.entries(byDate).sort()) {
      console.log(`  ${date}: ${list.length} call(s)`);
      list.forEach(({ email, event_title }) => console.log(`    - ${email}  ${event_title}`));
    }
  }
}

main();
