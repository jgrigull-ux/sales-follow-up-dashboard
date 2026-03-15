import type { Call } from '@/components/CallCard';

export function getStorageKey(date: string): string {
  return `follow-up-status:${date}`;
}

export function getCallId(call: Call, index: number): string {
  return `${call.email}|${call.start}|${call.eventTitle}|${index}`;
}

export function readStoredStatus(date: string): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(getStorageKey(date));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const statusById: Record<string, boolean> = {};
    for (const [id, value] of Object.entries(parsed)) {
      statusById[id] = value === true;
    }
    return statusById;
  } catch {
    return {};
  }
}

/** Dates where every follow-up is marked complete in localStorage. */
export function getCompleteDates(allDaysData: { date: string; calls: Call[] }[]): string[] {
  if (typeof window === 'undefined') return [];
  const completeDates: string[] = [];
  for (const { date, calls } of allDaysData) {
    if (calls.length === 0) continue;
    const stored = readStoredStatus(date);
    const allComplete = calls.every((call, i) => stored[getCallId(call, i)]);
    if (allComplete) completeDates.push(date);
  }
  return completeDates;
}
