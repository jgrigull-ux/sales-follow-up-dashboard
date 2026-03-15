import { getSupabase } from './supabase';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Returns distinct dates that have at least one call, sorted newest first.
 */
export async function getAvailableDates(): Promise<string[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('calls')
      .select('date')
      .order('date', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const dates = Array.from(new Set(data.map((r) => r.date as string))).sort().reverse();
    return dates.filter((d) => DATE_REGEX.test(d));
  } catch {
    return [];
  }
}
