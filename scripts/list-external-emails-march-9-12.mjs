#!/usr/bin/env node
/**
 * List unique external attendee emails from March 9–12, 2026 (from data/*.json).
 * Excludes internal (anysphere.co, cursor.com) and calendar resources.
 * Use with: node scripts/list-external-emails-march-9-12.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'data');

const INTERNAL_DOMAINS = ['anysphere.co', 'cursor.com'];
const RESOURCE_PATTERN = /@resource\.calendar\.google\.com$/;

function isExternal(email) {
  if (!email || typeof email !== 'string') return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  if (RESOURCE_PATTERN.test(email)) return false;
  return !INTERNAL_DOMAINS.some((d) => domain === d);
}

const dates = ['2026-03-09', '2026-03-10', '2026-03-11', '2026-03-12'];
const allEmails = new Set();

for (const date of dates) {
  const path = join(DATA_DIR, `${date}.json`);
  try {
    const data = JSON.parse(readFileSync(path, 'utf-8'));
    for (const call of data.calls || []) {
      if (call.email && isExternal(call.email)) allEmails.add(call.email.trim());
    }
  } catch (e) {
    console.error(`Skip ${date}:`, e.message);
  }
}

const sorted = [...allEmails].sort();
console.log('# External attendee emails (March 9–12, 2026)');
console.log('# Run post-call-follow-up skill for each: "Post call follow up for <email>"');
console.log('');
sorted.forEach((e) => console.log(e));
console.log('');
console.log(`# Total: ${sorted.length} unique external emails`);
