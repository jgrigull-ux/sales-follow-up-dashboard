import { DayDropdown } from '@/components/DayDropdown';
import { getAvailableDates } from '@/lib/dates';

export default function HomePage() {
  const dates = getAvailableDates();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-semibold text-[var(--text)] mb-2">
        Sales Follow-Up
      </h1>
      <p className="text-[var(--text-muted)] mb-8">
        Pick a day to see call summaries and follow-up resources.
      </p>
      <DayDropdown dates={dates} />
    </main>
  );
}
