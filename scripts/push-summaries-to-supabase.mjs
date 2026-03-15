#!/usr/bin/env node
/**
 * Parse data/post-call-summaries-march-9-12.md and update Supabase calls.summary
 * for each contact (email) in the date range March 9–12, 2026.
 *
 * Usage: node scripts/push-summaries-to-supabase.mjs
 * Env:   .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SUMMARY_PATH = join(ROOT, 'data', 'post-call-summaries-march-9-12.md');
const DATES = ['2026-03-09', '2026-03-10', '2026-03-11', '2026-03-12'];

dotenv.config({ path: join(ROOT, '.env.local') });

/**
 * Parse markdown: split by "## Post Call Summary — " and extract email from
 * "Name (email)" and body until next "## " or end.
 * @returns { Array<{ email: string, summary: string }> }
 */
function parseSummaryMarkdown(content) {
  const sections = content.split(/\n## Post Call Summary — /);
  const out = [];
  for (let i = 1; i < sections.length; i++) {
    const block = sections[i];
    const match = block.match(/^([^(]+)\s*\(([^)]+)\)\s*\n/);
    if (!match) continue;
    const email = match[2].trim();
    const body = block.slice(match[0].length).replace(/\n---\s*\n$/, '').trim();
    out.push({ email, summary: body });
  }
  return out;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const raw = readFileSync(SUMMARY_PATH, 'utf-8');
  const entries = parseSummaryMarkdown(raw);
  if (entries.length === 0) {
    console.log('No summary sections found in', SUMMARY_PATH);
    return;
  }

  const supabase = createClient(url, serviceKey);
  let updated = 0;

  for (const { email, summary } of entries) {
    const { data, error } = await supabase
      .from('calls')
      .update({ summary })
      .eq('email', email)
      .in('date', DATES)
      .select('id');

    if (error) {
      console.error(`Update failed for ${email}:`, error.message);
      process.exit(1);
    }
    const n = (data && data.length) || 0;
    updated += n;
    console.log(`${email}: updated ${n} row(s)`);
  }

  console.log(`Done. ${updated} call(s) updated with summaries.`);
}

main();
