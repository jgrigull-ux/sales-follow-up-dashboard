import Link from 'next/link';
import { DayDropdownWithStorage } from '@/components/DayDropdown';
import { DayViewContent } from '@/components/DayViewContent';
import { getAvailableDates } from '@/lib/dates';
import { getDayData } from '@/lib/data';

function formatDateTitle(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export default async function DayPage({
  params,
}: {
  params: { date: string };
}) {
  const date = params.date;
  const [data, availableDates] = await Promise.all([
    getDayData(date),
    getAvailableDates(),
  ]);
  const allDaysData = await Promise.all(
    availableDates.map(async (d) => ({
      date: d,
      calls: (await getDayData(d))?.calls ?? [],
    }))
  );

  return (
    <main className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link
          href="/"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
        >
          ← Back
        </Link>
        {allDaysData.length > 0 && (
          <DayDropdownWithStorage
            allDaysData={allDaysData}
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
        <DayViewContent
          date={data.date}
          dateTitle={formatDateTitle(data.date)}
          calls={data.calls}
        />
      )}
    </main>
  );
}
