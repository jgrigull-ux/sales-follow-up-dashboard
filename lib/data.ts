import { getSupabase } from './supabase';
import { getAvailableDates } from './dates';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export type Call = {
  email: string;
  displayName?: string;
  eventTitle: string;
  start: string;
  end?: string | null;
  summary: string;
};

export type DayData = {
  date: string;
  calls: Call[];
};

function rowToCall(row: {
  email: string;
  display_name: string | null;
  event_title: string;
  start: string;
  end: string | null;
  summary: string | null;
}): Call {
  return {
    email: row.email,
    displayName: row.display_name ?? undefined,
    eventTitle: row.event_title,
    start: row.start,
    end: row.end ?? undefined,
    summary: row.summary ?? '',
  };
}

export async function getDayData(date: string): Promise<DayData | null> {
  if (!DATE_REGEX.test(date)) return null;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('calls')
      .select('email, display_name, event_title, start, end, summary')
      .eq('date', date)
      .order('start');

    if (error) throw error;
    if (!data || data.length === 0) return null;

    return {
      date,
      calls: data.map(rowToCall),
    };
  } catch {
    return null;
  }
}

export type DayWithPending = {
  date: string;
  pendingCalls: Call[];
};

export async function getDaysWithPendingFollowUps(): Promise<DayWithPending[]> {
  const dates = await getAvailableDates();
  const result: DayWithPending[] = [];

  for (const date of dates) {
    const day = await getDayData(date);
    if (!day) continue;
    const pendingCalls = day.calls.filter(
      (c) => !c.summary || c.summary.trim().length === 0
    );
    if (pendingCalls.length > 0) {
      result.push({ date, pendingCalls });
    }
  }

  return result;
}

/** Dates where every call has a non-empty summary (all follow-ups done). */
export async function getDatesWithAllFollowUpsComplete(): Promise<string[]> {
  const dates = await getAvailableDates();
  const result: string[] = [];

  for (const date of dates) {
    const day = await getDayData(date);
    if (!day || day.calls.length === 0) continue;
    const allHaveSummary = day.calls.every(
      (c) => c.summary && c.summary.trim().length > 0
    );
    if (allHaveSummary) result.push(date);
  }

  return result;
}
