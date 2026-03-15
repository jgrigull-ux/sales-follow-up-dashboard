'use client';

import { useRouter } from 'next/navigation';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

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
  /** Show "View day" button (e.g. on home). When false, only the dropdown is shown and changing it navigates (e.g. on day page). */
  showViewButton?: boolean;
};

export function DayDropdown({ dates = [], defaultDate, showViewButton = true }: Props) {
  const router = useRouter();
  const sorted = [...(dates ?? [])].filter((d) => DATE_REGEX.test(d)).sort().reverse();
  const value = defaultDate && sorted.includes(defaultDate) ? defaultDate : sorted[0] ?? '';

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
      <select
        value={value}
        onChange={handleChange}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--text)] text-base font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
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
          </option>
        ))}
      </select>
      {showViewButton && (
        <button
          type="button"
          onClick={() => value && router.push(`/day/${value}`)}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        >
          View day
        </button>
      )}
    </div>
  );
}
