#!/usr/bin/env node
/**
 * Build day data: list external calendar calls for a date via gws CLI,
 * one representative external attendee per event. Writes data/<date>.json.
 *
 * Usage: node scripts/build-day.mjs 2026-03-13
 * Env:   INTERNAL_DOMAIN (e.g. anysphere.co), TZ (optional, for day bounds)
 */

import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'data');

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function parseArgs() {
  const date = process.argv[2];
  if (!date || !DATE_REGEX.test(date)) {
    console.error('Usage: node scripts/build-day.mjs YYYY-MM-DD');
    process.exit(1);
  }
  return date;
}

function getDayBounds(dateStr, tz = 'America/Los_Angeles') {
  const [y, m, d] = dateStr.split('-').map(Number);
  const start = new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
  const end = new Date(Date.UTC(y, m - 1, d, 23, 59, 59, 999));
  return {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
  };
}

function runGws(timeMin, timeMax) {
  const params = {
    calendarId: 'primary',
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
  };
  const paramsJson = JSON.stringify(params);
  try {
    const out = execFileSync('gws', [
      'calendar',
      'events',
      'list',
      '--params',
      paramsJson,
      '--format',
      'json',
    ], { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
    return JSON.parse(out);
  } catch (err) {
    if (err.stderr) process.stderr.write(err.stderr);
    console.error('gws calendar events list failed. Ensure gws is installed and authenticated.');
    process.exit(1);
  }
}

function normalizeDomain(domain) {
  if (!domain || typeof domain !== 'string') return '';
  return domain.trim().toLowerCase().replace(/^@/, '');
}

function getDomain(email) {
  if (!email || typeof email !== 'string') return '';
  const at = email.indexOf('@');
  return at === -1 ? '' : email.slice(at + 1).toLowerCase();
}

function isExternal(email, internalDomain) {
  const d = normalizeDomain(internalDomain);
  if (!d) return true;
  return getDomain(email) !== d;
}

function pickOneExternalAttendee(attendees, organizerEmail, internalDomain) {
  const external = (attendees || []).filter((a) => {
    const email = a.email && a.email.trim();
    if (!email) return false;
    if (organizerEmail && email.toLowerCase() === organizerEmail.toLowerCase()) return false;
    return isExternal(email, internalDomain);
  });
  if (external.length === 0) return null;
  const accepted = external.find((a) => a.responseStatus === 'accepted');
  const chosen = accepted || external[0];
  return {
    email: chosen.email.trim(),
    displayName: chosen.displayName && chosen.displayName.trim() ? chosen.displayName.trim() : undefined,
  };
}

function buildCalls(eventsResponse, internalDomain) {
  const items = eventsResponse.items || [];
  const calls = [];

  for (const event of items) {
    if (event.status === 'cancelled') continue;
    const organizerEmail = event.organizer && event.organizer.email ? event.organizer.email : null;
    const attendee = pickOneExternalAttendee(event.attendees || [], organizerEmail, internalDomain);
    if (!attendee) continue;

    const start = event.start?.dateTime || event.start?.date;
    const end = event.end?.dateTime || event.end?.date;
    if (!start) continue;

    calls.push({
      email: attendee.email,
      displayName: attendee.displayName,
      eventTitle: (event.summary && event.summary.trim()) || '(No title)',
      start,
      end: end || null,
      summary: '',
    });
  }

  return calls;
}

function mergeWithExisting(dateStr, newCalls) {
  const path = join(DATA_DIR, `${dateStr}.json`);
  if (!existsSync(path)) return newCalls.map((c) => ({ ...c, summary: '' }));

  let existing;
  try {
    existing = JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return newCalls.map((c) => ({ ...c, summary: '' }));
  }

  const key = (c) => `${c.eventTitle}|${c.start}|${c.email}`;
  const byKey = new Map((existing.calls || []).map((c) => [key(c), c]));
  return newCalls.map((c) => {
    const prev = byKey.get(key(c));
    return {
      ...c,
      summary: (prev && prev.summary) ? prev.summary : '',
    };
  });
}

function main() {
  const dateStr = parseArgs();
  const internalDomain = process.env.INTERNAL_DOMAIN || '';
  const tz = process.env.TZ || 'America/Los_Angeles';

  const { timeMin, timeMax } = getDayBounds(dateStr, tz);
  const response = runGws(timeMin, timeMax);
  const newCalls = buildCalls(response, internalDomain);
  const calls = mergeWithExisting(dateStr, newCalls);

  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

  const output = { date: dateStr, calls };
  const outPath = join(DATA_DIR, `${dateStr}.json`);
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`Wrote ${outPath} (${calls.length} call(s))`);
}

main();
