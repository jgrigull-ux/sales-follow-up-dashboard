#!/usr/bin/env node
/**
 * One-time seed: read all data/*.json and upsert into Supabase calls table.
 * Preserves existing rows (upsert by date, email, start, event_title).
 *
 * Usage: node scripts/seed-supabase-from-files.mjs
 * Env:   .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'data');
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

dotenv.config({ path: join(ROOT, '.env.local') });

function toRow(dateStr, call) {
  return {
    date: dateStr,
    email: call.email,
    display_name: call.displayName || null,
    event_title: call.eventTitle,
    start: call.start,
    end: call.end ?? null,
    summary: call.summary ?? '',
  };
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing Supabase env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  if (!existsSync(DATA_DIR)) {
    console.log('No data/ directory. Nothing to seed.');
    return;
  }

  const files = readdirSync(DATA_DIR).filter(
    (f) => f.endsWith('.json') && DATE_REGEX.test(f.slice(0, -5))
  );
  if (files.length === 0) {
    console.log('No YYYY-MM-DD.json files in data/. Nothing to seed.');
    return;
  }

  const supabase = createClient(url, serviceKey);
  let total = 0;

  for (const file of files.sort()) {
    const dateStr = file.slice(0, -5);
    const path = join(DATA_DIR, file);
    let data;
    try {
      data = JSON.parse(readFileSync(path, 'utf-8'));
    } catch (err) {
      console.warn(`Skip ${file}: ${err.message}`);
      continue;
    }
    const calls = data.calls || [];
    if (calls.length === 0) {
      console.log(`${dateStr}: 0 calls (skipped)`);
      continue;
    }
    const rows = calls.map((c) => toRow(dateStr, c));
    const { error } = await supabase
      .from('calls')
      .upsert(rows, { onConflict: 'date,email,start,event_title' });
    if (error) {
      console.error(`${dateStr}: upsert failed:`, error.message);
      process.exit(1);
    }
    total += rows.length;
    console.log(`${dateStr}: ${rows.length} call(s)`);
  }

  console.log(`Done. ${total} call(s) upserted.`);
}

main();
