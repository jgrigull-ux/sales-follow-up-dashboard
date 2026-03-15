#!/usr/bin/env node
/**
 * Update the Links section in summary for all Supabase calls matching an email.
 * Reads one update from stdin or from a JSON file.
 *
 * Stdin format (one update):
 *   email: <email>
 *   <blank line>
 *   **Links**
 *   - **Salesforce Account:** ...
 *   ...
 *
 * Or JSON file (one or more updates):
 *   [ { "email": "...", "linksBlock": "**Links**\n- ..." }, ... ]
 *
 * linksBlock must include the "**Links**" heading and all bullet lines up to (but not including) "---" or "### Topics".
 *
 * Usage:
 *   node scripts/update-call-links-in-supabase.mjs                    # read stdin
 *   node scripts/update-call-links-in-supabase.mjs updates.json       # read file
 *
 * Env: .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { readFileSync, readSync, openSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

dotenv.config({ path: join(ROOT, '.env.local') });

/** Replace the **Links** section in summary with newLinksBlock (includes "**Links**" line). */
function replaceLinksSection(summary, newLinksBlock) {
  if (!summary || typeof summary !== 'string') return summary;
  const trimmed = newLinksBlock.trim();
  // Match **Links** at start of string or after newline (some summaries start with **Links**)
  const pattern = /(^|\n)\*\*Links\*\*\n[\s\S]*?(?=\n---\n|\n### Topics|\n## |$)/;
  if (!pattern.test(summary)) {
    return summary;
  }
  return summary.replace(pattern, (_, prefix) => prefix + trimmed + '\n');
}

async function applyUpdate(supabase, email, linksBlock) {
  const { data: rows, error: fetchError } = await supabase
    .from('calls')
    .select('id, date, event_title, summary')
    .eq('email', email);

  if (fetchError) {
    throw new Error(`Fetch failed for ${email}: ${fetchError.message}`);
  }
  if (!rows || rows.length === 0) {
    return { email, updated: 0, message: 'No calls found' };
  }

  let updated = 0;
  for (const row of rows) {
    const newSummary = replaceLinksSection(row.summary || '', linksBlock);
    if (newSummary === (row.summary || '')) continue;
    const { error: updateError } = await supabase
      .from('calls')
      .update({ summary: newSummary })
      .eq('id', row.id);
    if (updateError) {
      throw new Error(`Update failed for ${row.id}: ${updateError.message}`);
    }
    updated++;
  }
  return { email, updated, total: rows.length };
}

function readStdin() {
  const chunks = [];
  const buf = Buffer.alloc(4096);
  const fd = 0;
  let n;
  while ((n = readSync(fd, buf, 0, buf.length, null)) > 0) {
    chunks.push(buf.slice(0, n));
  }
  return Buffer.concat(chunks).toString('utf-8');
}

function parseStdinInput(raw) {
  const lines = raw.split(/\n/);
  const emailLine = lines.find((l) => l.startsWith('email:'));
  if (!emailLine) return null;
  const email = emailLine.replace(/^email:\s*/, '').trim();
  const rest = lines.join('\n');
  const linksStart = rest.indexOf('**Links**');
  if (linksStart === -1) return null;
  const linksBlock = rest.slice(linksStart).trim();
  return { email, linksBlock };
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  let updates;
  const fileArg = process.argv[2];
  if (fileArg) {
    const raw = readFileSync(fileArg, 'utf-8');
    const parsed = JSON.parse(raw);
    updates = Array.isArray(parsed) ? parsed : [parsed];
  } else {
    const raw = readStdin();
    const one = parseStdinInput(raw);
    updates = one ? [one] : [];
  }

  if (updates.length === 0) {
    console.error('No updates provided. Use stdin or pass a JSON file.');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);
  for (const { email, linksBlock } of updates) {
    if (!email || !linksBlock) {
      console.error('Skip: missing email or linksBlock');
      continue;
    }
    const result = await applyUpdate(supabase, email, linksBlock);
    console.log(JSON.stringify(result));
  }
}

main();
