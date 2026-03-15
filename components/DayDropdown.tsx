'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Call } from '@/components/CallCard';
import { getCompleteDates } from '@/lib/followUpStorage';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

type AllDaysData = { date: string; calls: Call[] }[];

type DayDropdownWithStorageProps = {
  allDaysData: AllDaysData;
  defaultDate?: string;
  showViewButton?: boolean;
};

export function DayDropdownWithStorage({
  allDaysData,
  defaultDate,
  showViewButton = true,
}: DayDropdownWithStorageProps) {
  const [completeDates, setCompleteDates] = useState<string[]>([]);

  useEffect(() => {
    setCompleteDates(getCompleteDates(allDaysData));
  }, [allDaysData]);

  const dates = allDaysData.map((d) => d.date);
  return (
    <DayDropdown
      dates={dates}
      defaultDate={defaultDate}
      completeDates={completeDates}
      showViewButton={showViewButton}
    />
  );
}

function formatDateLabel(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

type Props = {
  dates: string[];
  defaultDate?: string;
  /** Dates where all follow-ups are complete (show celebratory indicator). */
  completeDates?: string[];
  /** Show "View day" button (e.g. on home). When false, only the dropdown is shown and changing it navigates (e.g. on day page). */
  showViewButton?: boolean;
};

export function DayDropdown({ dates = [], defaultDate, completeDates = [], showViewButton = true }: Props) {
  const router = useRouter();
  const sorted = [...(dates ?? [])].filter((d) => DATE_REGEX.test(d)).sort().reverse();
  const value = defaultDate && sorted.includes(defaultDate) ? defaultDate : sorted[0] ?? '';
  const isCurrentDayComplete = value && completeDates.includes(value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    if (v) router.push(`/day/${v}`);
  };

  if (sorted.length === 0) {
    return (
      <p className="text-[var(--text-muted)] text-sm">
        No days with data yet. Run <code className="bg-[var(--bg)] px-1 rounded">node scripts/build-day.mjs YYYY-MM-DD</code> to add a day.
      </p>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 w-full ${showViewButton ? 'max-w-sm' : 'max-w-xs'}`}>
      <div className="w-full relative">
        <select
          value={value}
          onChange={handleChange}
          className={`w-full rounded-xl border px-4 py-3 text-base font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
            isCurrentDayComplete
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 dark:bg-emerald-500/20 dark:border-emerald-400/30'
              : 'border-[var(--border)] bg-[var(--card)] text-[var(--text)]'
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236e6e73'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '20px',
            paddingRight: '44px',
          }}
          aria-label="Select day"
        >
          {sorted.map((d) => (
            <option key={d} value={d}>
              {formatDateLabel(d)}
              {completeDates.includes(d) ? ' ✓ All done' : ''}
            </option>
          ))}
        </select>
        {isCurrentDayComplete && (
          <span
            className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600 dark:text-emerald-400"
            aria-hidden
          >
            ✓
          </span>
        )}
      </div>
      {showViewButton && (
        <button
          type="button"
          onClick={() => value && router.push(`/day/${value}`)}
          className={`w-full sm:w-auto shrink-0 rounded-xl border px-4 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent ${
            isCurrentDayComplete
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30'
              : 'border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--bg)]'
          }`}
        >
          View day
        </button>
      )}
    </div>
  );
}
