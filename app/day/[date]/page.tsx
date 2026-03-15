import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { CallCard } from '@/components/CallCard';
import { DayDropdown } from '@/components/DayDropdown';
import { getAvailableDates } from '@/lib/dates';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

type DayData = {
  date: string;
  calls: Array<{
    email: string;
    displayName?: string;
    eventTitle: string;
    start: string;
    end?: string | null;
    summary: string;
  }>;
};

function getDayData(date: string): DayData | null {
  if (!DATE_REGEX.test(date)) return null;
  const path = join(process.cwd(), 'data', `${date}.json`);
  if (!existsSync(path)) return null;
  try {
    const raw = readFileSync(path, 'utf-8');
    return JSON.parse(raw) as DayData;
  } catch {
    return null;
  }
}

function formatDateTitle(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export default function DayPage({
  params,
}: {
  params: { date: string };
}) {
  const date = params.date;
  const data = getDayData(date);
  const availableDates = getAvailableDates();

  return (
    <main className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link
          href="/"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
        >
          ← Back
        </Link>
        {availableDates.length > 0 && (
          <DayDropdown
            dates={availableDates}
            defaultDate={date}
            showViewButton={false}
          />
        )}
      </div>

      {!data ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
          <h1 className="text-xl font-semibold text-[var(--text)] mb-2">
            No data for this day
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-4">
            Run the build script to pull calendar events and create the day file:
          </p>
          <code className="block text-left bg-[var(--bg)] rounded-lg p-4 text-sm overflow-x-auto">
            node scripts/build-day.mjs {date || 'YYYY-MM-DD'}
          </code>
          <p className="text-[var(--text-muted)] text-sm mt-4">
            Ensure <code className="bg-[var(--bg)] px-1 rounded">gws</code> is installed and authenticated, and <code className="bg-[var(--bg)] px-1 rounded">INTERNAL_DOMAIN</code> is set if needed.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-[var(--text)] mb-8">
            {formatDateTitle(data.date)}
          </h1>
          <ul className="space-y-6 list-none p-0 m-0">
            {data.calls.map((call, i) => (
              <li key={`${call.email}-${call.start}-${i}`}>
                <CallCard call={call} />
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
